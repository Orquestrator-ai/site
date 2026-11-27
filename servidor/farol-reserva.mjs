// Somente tickets efêmeros, a lista fixa de sites e a franquia do dia autorizam o navegador.
import {createHash,randomBytes,timingSafeEqual} from "node:crypto";
import {lerParaAtualizar} from "./registro-nuvem.mjs";
import {ALVOS_FAROL} from "./farol-http.mjs";

const CHAVE="farol/v1/reserva", ESTADO="farol/v1/estado", MIN=60_000;
export const POLITICA_RESERVA=Object.freeze({idadeMs:25*MIN,intervaloMs:30*MIN,prazoMs:105_000,
  limiteMsDia:15*MIN,maxRodadasDia:48,bytesFriasDia:32*1024*1024});
const hash=s=>createHash("sha256").update(s).digest("hex");
const diaUTC=t=>new Date(t).toISOString().slice(0,10);
function base(dia){return {dia,rodadas:0,msReservados:0,bytesFrias:0,ultimaTentativaEm:null,ultimoSucessoEm:null,ultimaSituacao:null,execucao:null};}
function iguais(a,b){
  return typeof a==="string"&&a.length===b.length&&timingSafeEqual(Buffer.from(a),Buffer.from(b));
}
async function transacao(store,transformar){
  for(let i=0;i<7;i++){
    const atual=await lerParaAtualizar(store,CHAVE);
    const r=transformar(atual?.data);
    if(!r.salvar)return r.valor;
    const w=await store.setJSON(CHAVE,r.salvar,atual?{onlyIfMatch:atual.etag}:{onlyIfNew:true});
    if(w.modified)return r.valor;
  }
  throw new Error("Outra execução está atualizando a reserva.");
}
export function resumoReserva(s,agora=Date.now()){
  if(!s)return {ultimaTentativaEm:null,ultimoSucessoEm:null,situacao:"aguardando",rodadasHoje:0,msHoje:0,msLimiteDia:POLITICA_RESERVA.limiteMsDia};
  const hoje=s.dia===diaUTC(agora);
  return {ultimaTentativaEm:s.ultimaTentativaEm,ultimoSucessoEm:s.ultimoSucessoEm,situacao:s.ultimaSituacao,
    rodadasHoje:hoje?s.rodadas:0,msHoje:hoje?s.msReservados:0,msLimiteDia:POLITICA_RESERVA.limiteMsDia};
}
export async function prepararReserva(store,{agora=Date.now,forcarPrevia=false}={}){
  const tempo=agora();
  const historico=await store.get(ESTADO,{type:"json"});
  if(!forcarPrevia){
    if(!historico?.ultimoHTTP)return null;
    const precisa=ALVOS_FAROL.some(({dominio})=>{
      const t=historico.componentes[dominio]?.dimensoes?.funcional?.verificadoEm;
      return t==null || tempo-t>=POLITICA_RESERVA.idadeMs;
    });
    if(!precisa)return null;
  }
  return transacao(store,old=>{
    const s=old?.dia===diaUTC(tempo)?old:{...base(diaUTC(tempo)),ultimaTentativaEm:old?.ultimaTentativaEm??null,
      ultimoSucessoEm:old?.ultimoSucessoEm??null,ultimaSituacao:old?.ultimaSituacao??null,
      execucao:old?.execucao?.ate>tempo?old.execucao:null};
    const suspeitasAtivas=Object.values(s.suspeitas||{}).filter(v=>!v.confirmada&&!v.rechecagemPedida&&tempo-v.em<2*3600_000);
    const intervalo=suspeitasAtivas.length?10*MIN:POLITICA_RESERVA.intervaloMs;
    if(s.execucao?.ate>tempo || (!forcarPrevia&&s.ultimaTentativaEm!==null&&tempo-s.ultimaTentativaEm<intervalo))return {valor:null};
    if(s.rodadas>=POLITICA_RESERVA.maxRodadasDia || s.msReservados+POLITICA_RESERVA.prazoMs>POLITICA_RESERVA.limiteMsDia){
      if(s.ultimaSituacao==="limite-diario")return {valor:null};
      s.ultimaSituacao="limite-diario";return {salvar:s,valor:null};
    }
    for(const v of suspeitasAtivas)v.rechecagemPedida=true;
    const ticket=randomBytes(32).toString("base64url");
    s.execucao={id:"reserva:"+Math.floor(tempo/1000)+":"+hash(ticket).slice(0,8),prova:hash(ticket),fase:"aguardando",ate:tempo+4*MIN};
    s.rodadas++;s.msReservados+=POLITICA_RESERVA.prazoMs;s.ultimaTentativaEm=tempo;s.ultimaSituacao="agendada";
    return {salvar:s,valor:{ticket,id:s.execucao.id}};
  });
}
export async function consumirReserva(store,ticket,agora=Date.now){
  if(typeof ticket!=="string"||!/^[A-Za-z0-9_-]{43}$/.test(ticket))return null;
  return transacao(store,s=>{
    const op=s?.execucao;if(!op||op.fase!=="aguardando"||op.ate<=agora()||!iguais(op.prova,hash(ticket)))return {valor:null};
    op.fase="executando";op.inicioEm=agora();delete op.prova;s.ultimaSituacao="executando";
    return {salvar:s,valor:{id:op.id,inicioEm:op.inicioEm}};
  });
}
export function reservarBytes(store,id,tamanho){
  if(!Number.isSafeInteger(tamanho)||tamanho<=0)return false;
  return transacao(store,s=>{
    if(s?.execucao?.id!==id || s.bytesFrias+tamanho>POLITICA_RESERVA.bytesFriasDia)return {valor:false};
    s.bytesFrias+=tamanho;return {salvar:s,valor:true};
  });
}
// A reserva só confirma uma degradação após provas específicas concordantes, sem transformar uma falha
// de processo, rede ou prazo em falha de site. Rodadas GitHub saudáveis mais recentes invalidam a suspeita.
export async function qualificarResultados(store,op,resultados,assinaturas,agora=Date.now){
  const instante=agora(),principal=await store.get(ESTADO,{type:"json"}),positivos=resultados.filter(v=>v.estado==="operacional");
  return transacao(store,s=>{
    if(s?.execucao?.id!==op.id)return {valor:{aceitos:[],confirmadas:[],suspeitas:[]}};
    const mapa=s.suspeitas??={};
    for(const [dom,v] of Object.entries(mapa)){
      const funcional=principal?.componentes?.[dom]?.dimensoes?.funcional;
      const externa=funcional?.ultimaExternaEm??(funcional?.origem!=="netlify-reserva"?funcional?.verificadoEm:null);
      if(instante-v.em>2*3600_000 || (funcional?.estado==="operacional" && externa>v.em))delete mapa[dom];
    }
    for(const item of positivos)delete mapa[item.dominio];
    const aceitos=[...positivos],confirmadas=[];
    if(positivos.length>=5)for(const item of resultados){
      if(item.estado!=="degradado" || item.tentativas!==2)continue;
      const assinatura=assinaturas[item.dominio];
      if(typeof assinatura!=="string"||!/^([a-f0-9]{24})$/.test(assinatura))continue;
      const alvo=principal?.componentes?.[item.dominio]?.dimensoes;
      const externa=alvo?.funcional?.ultimaExternaEm??(alvo?.funcional?.origem!=="netlify-reserva"?alvo?.funcional?.verificadoEm:null);
      if(externa!=null && externa>=op.inicioEm)continue;
      const previa=mapa[item.dominio];
      const repetida=previa?.assinatura===assinatura&&previa.rodada!==op.id&&instante>previa.em;
      const http=alvo?.http,httpRuim=["degradado","indisponivel"].includes(http?.estado)&&instante-http.verificadoEm<=11*MIN;
      // Conserva idempotência quando a entrega do mesmo relatório for repetida.
      const confirmada=repetida||httpRuim||(previa?.rodada===op.id && previa.confirmada===true);
      mapa[item.dominio]={assinatura,rodada:op.id,em:instante,confirmada};
      if(confirmada){
        confirmadas.push(item.dominio);
        aceitos.push({...item,motivo:httpRuim?"Duas tentativas no mesmo controle da página falharam, com falha HTTP recente também confirmada.":"A mesma etapa funcional falhou duas vezes em cada uma de duas rodadas de reserva independentes."});
      }
    }
    return {salvar:s,valor:{aceitos,confirmadas,suspeitas:Object.entries(mapa).filter(([,v])=>!v.confirmada).map(([dom])=>dom)}};
  });
}
export function concluirReserva(store,id,situacao,agora=Date.now,detalhes){
  const fim=agora();
  return transacao(store,s=>{
    if(s?.execucao?.id!==id)return {valor:false};
    const gasto=s.execucao.inicioEm?Math.max(1000,Math.min(POLITICA_RESERVA.prazoMs,fim-s.execucao.inicioEm)):1000;
    s.msReservados=Math.max(0,s.msReservados-POLITICA_RESERVA.prazoMs+gasto);
    s.execucao=null;s.ultimaSituacao=situacao;
    if(detalhes)s.ultimaMedicao=detalhes;
    if(situacao==="operacional"||situacao==="parcial")s.ultimoSucessoEm=fim;
    return {salvar:s,valor:true};
  });
}
export function nomeStore(req,ctx){
  const nome="orquestrator-contagem", id=ctx?.deploy?.id;
  if(typeof id!=="string"||!/^\w{8,80}$/.test(id))throw Error("Deploy inválido.");
  const host=new URL(req.url).hostname;
  if((ctx.deploy.published||ctx.deploy.context==="production") && host===nome+".netlify.app")return "trafego-v1";
  if(host===id+"--"+nome+".netlify.app")return "trafego-preview-"+id;
  throw Error("Origem de execução inválida.");
}
export async function solicitarReserva(store,{base="https://orquestrator-contagem.netlify.app",requisitar=fetch,agora=Date.now,forcarPrevia=false}={}){
  if(!/^https:\/\/(?:[a-zA-Z0-9]{8,80}--)?orquestrator-contagem\.netlify\.app$/.test(base))throw Error("Destino de reserva inválido.");
  if(forcarPrevia && !new URL(base).hostname.includes("--"))throw Error("Execução forçada apenas em prévia.");
  const r=await prepararReserva(store,{agora,forcarPrevia});if(!r)return false;
  try{
    const res=await requisitar(base+"/.netlify/functions/farol-reserva-background",{method:"POST",redirect:"error",cache:"no-store",
      headers:{authorization:"Bearer "+r.ticket},signal:AbortSignal.timeout(3500)});
    if(res.status!==202)throw Error("A reserva não foi aceita.");
  }catch{
    // A aceitação 202 pode ter se perdido. O lease evita que uma segunda tarefa seja disparada na mesma janela.
    // O custo máximo já está reservado inclusive se o processo falhar antes de informar sua duração.
    return false;
  }
  return true;
}
