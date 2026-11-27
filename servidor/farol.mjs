import {createHash, randomUUID} from "node:crypto";
import {ALVOS_FAROL,sondarSites} from "./farol-http.mjs";
import {resumoReserva} from "./farol-reserva.mjs";
import {lerParaAtualizar} from "./registro-nuvem.mjs";

const CHAVE="farol/v1/estado", DIA=86400000, MIN=60000;
const INTERVALO=5*MIN, VALIDADE={http:11*MIN,funcional:45*MIN};
const DOMINIOS=new Set(ALVOS_FAROL.map(c=>c.dominio));
const RISCO={desconhecido:0,operacional:1,degradado:2,indisponivel:3};
const SEM="desconhecido",RUIM=new Set(["degradado","indisponivel"]);
const diaLocal=ms=>new Date(ms-3*3600000).toISOString().slice(0,10);
const curta=(s,n)=>String(s??"").replace(/[\u0000-\u001f\u007f]/g," ").replace(/https?:\/\/[^\s]+/gi,"[endereço]")
  .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,"[e-mail]").replace(/\s+/g," ").trim().slice(0,n);
const tokenId=s=>createHash("sha256").update(s).digest("hex").slice(0,32);
const porcento=(a,b)=>b?Math.round(10000*a/b)/100:null;
const novoEstado=()=>({versao:1,ultimoHTTP:null,componentes:{},incidentes:[],transicoes:[],outbox:{}});
const novaLinha=()=>({dimensoes:{},dias:{},latencias:[],aberto:null,ultimoEvento:null});
export class ErroFarol extends Error {constructor(status,texto){super(texto);this.status=status;}}
function consolidar(linha,em){
  const valores=Object.keys(VALIDADE).map(f=>linha.dimensoes[f]);
  const falha=valores.filter(v=>RUIM.has(v?.estado)).sort((a,b)=>RISCO[b.estado]-RISCO[a.estado])[0];
  // Um incidente confirmado permanece conhecido até uma confirmação de recuperação da mesma dimensão.
  if(falha)return {estado:falha.estado,motivo:falha.motivo};
  if(valores.some((v,i)=>!v || v.estado!=="operacional" || em-v.verificadoEm>Object.values(VALIDADE)[i]))return {estado:SEM,motivo:null};
  return {estado:"operacional",motivo:null};
}
function dadosDia(dia){return {dia,estado:SEM,verificacoes:0,operacionais:0,degradadas:0,indisponiveis:0,desconhecidas:0,msTotal:0,msN:0};}
function resumoDia(d){
  const {msTotal,msN,...parte}=d;return {...parte,disponibilidadePct:porcento(d.operacionais,d.verificacoes-d.desconhecidas),latenciaMediaMs:msN?Math.round(msTotal/msN):null};
}
function normalizarRelatorio(fonte,r,agora){
  if(!Object.hasOwn(VALIDADE,fonte)||!r||typeof r.id!=="string"||!/^[\w:.-]{1,128}$/.test(r.id)||
      !Number.isSafeInteger(r.em)||r.em>agora+MIN||r.em<agora-60*MIN||!Array.isArray(r.resultados)||
      !r.resultados.length||r.resultados.length>ALVOS_FAROL.length)throw new ErroFarol(400,"Relatório de verificação inválido.");
  const vistos=new Set();
  const resultados=r.resultados.map(x=>{
    if(!x||!DOMINIOS.has(x.dominio)||vistos.has(x.dominio)||!["operacional","degradado","indisponivel","inconclusivo"].includes(x.estado)||
        (x.tentativas!==1&&x.tentativas!==2)||(RUIM.has(x.estado)&&x.tentativas!==2)||
        (x.http!=null&&(!Number.isInteger(x.http)||x.http<100||x.http>599))||
        (x.latenciaMs!=null&&(!Number.isFinite(x.latenciaMs)||x.latenciaMs<0||x.latenciaMs>600000)))throw new ErroFarol(400,"Componente ou comprovação inválidos.");
    vistos.add(x.dominio);
    return {dominio:x.dominio,estado:x.estado,tentativas:x.tentativas,motivo:curta(x.motivo,180)||null,descricao:curta(x.descricao,220)||null,
      http:x.http??null,latenciaMs:x.latenciaMs==null?null:Math.round(x.latenciaMs)};
  });
  return {id:r.id,em:r.em,resultados};
}
function transicao(estado,linha,dom,consolidado,em,fonte,idRodada){
  const atual=consolidado.estado, aberto=linha.aberto && estado.incidentes.find(i=>i.id===linha.aberto);
  const falhou=RUIM.has(atual);
  if(!aberto && !falhou)return;
  if(aberto && (atual===SEM || atual===(aberto.atual??aberto.impacto)))return;
  const tipo=!aberto?"falha":falhou?"atualizacao":"recuperacao", anterior=aberto?.atual??aberto?.impacto??(linha.ultimoEvento||SEM);
  const id=tokenId([dom,fonte,idRodada,tipo,atual].join("|")), incidenteId=aberto?.id??id;
  const mensagem=tipo==="recuperacao"?"As verificações HTTP e funcional estão operacionais.":consolidado.motivo||"Falha confirmada nas verificações.";
  const evento={id,tipo,site:dom,dominio:dom,componente:dom,de:anterior,para:atual,em,incidenteId,motivo:mensagem,texto:mensagem,fonte};
  if(!aberto){
    estado.incidentes.push({id,componente:dom,estado:"aberto",impacto:atual,atual,inicioEm:em,fimEm:null,motivo:mensagem,atualizacoes:[{em,estado:"detectado",mensagem}]});
    linha.aberto=id;
  }else{
    aberto.atualizacoes.push({em,estado:tipo==="recuperacao"?"resolvido":"atualizado",mensagem});
    if(falhou){aberto.atual=atual;if(RISCO[atual]>RISCO[aberto.impacto])aberto.impacto=atual;}
    else{aberto.estado="resolvido";aberto.fimEm=em;linha.aberto=null;}
  }
  estado.transicoes.push(evento);
  if(tipo!=="atualizacao")estado.outbox[id]={evento,tentativas:0,proximaEm:em};
}
function registrar(estado,fonte,r,agora,origem){
  let aplicado=false;
  const limite=diaLocal(agora-89*DIA);
  for(const x of r.resultados){
    const linha=estado.componentes[x.dominio]??=novaLinha(),old=linha.dimensoes[fonte];
    if(origem==="netlify-reserva" && old?.verificadoEm && old.origem!=="netlify-reserva" && r.em-old.verificadoEm<25*MIN)continue;
    if(old && (old.rodada===r.id || r.em<=old.tentativaEm))continue;
    aplicado=true;
    const ultima=old?.verificadoEm??null, confirmado=x.estado!=="inconclusivo";
    linha.dimensoes[fonte]={
      estado:confirmado?x.estado:(old?.estado??SEM),verificadoEm:confirmado?r.em:ultima,tentativaEm:r.em,
      rodada:r.id,origem,ultimaExternaEm:fonte==="funcional"?(origem==="github"?r.em:(old?.ultimaExternaEm??(old && old.origem!=="netlify-reserva"?old.verificadoEm:null))):null,latenciaMs:x.latenciaMs,http:x.http,motivo:confirmado?x.motivo:(old?.motivo??x.motivo),descricao:x.descricao||old?.descricao||null
    };
    const cons=consolidar(linha,agora);
    const anteriorAberto=linha.aberto && estado.incidentes.find(i=>i.id===linha.aberto);
    const impactoIgual=anteriorAberto && (anteriorAberto.atual??anteriorAberto.impacto)===cons.estado;
    if(confirmado && impactoIgual && old?.estado!==x.estado){
      anteriorAberto.atualizacoes.push({em:agora,estado:"atualizado",mensagem:(fonte==="http"?"Verificação HTTP: ":"Teste funcional: ")+(x.motivo || "operacional.")});
    }
    transicao(estado,linha,x.dominio,cons,agora,fonte,r.id);
    if(cons.estado!==SEM)linha.ultimoEvento=cons.estado;
    const dia=diaLocal(r.em), d=linha.dias[dia]??=dadosDia(dia);
    const falhaRecente=Object.keys(VALIDADE).some(f=>RUIM.has(linha.dimensoes[f]?.estado) && agora-linha.dimensoes[f].verificadoEm<=VALIDADE[f]);
    const observado=confirmado && (!RUIM.has(cons.estado) || falhaRecente) ? cons.estado : SEM;
    d.verificacoes++;d[{operacional:"operacionais",degradado:"degradadas",indisponivel:"indisponiveis",desconhecido:"desconhecidas"}[observado]]++;
    if(RISCO[observado]>RISCO[d.estado])d.estado=observado;
    if(fonte==="http" && x.latenciaMs!==null){
      d.msTotal+=x.latenciaMs;d.msN++;linha.latencias.push({em:r.em,ms:x.latenciaMs});linha.latencias=linha.latencias.slice(-48);
    }
    for(const data of Object.keys(linha.dias))if(data<limite)delete linha.dias[data];
  }
  if(aplicado){
    if(fonte==="http" && r.resultados.length===ALVOS_FAROL.length)estado.ultimoHTTP=Math.max(estado.ultimoHTTP??0,r.em);
    estado.incidentes=estado.incidentes.filter(i=>!i.fimEm||diaLocal(i.fimEm)>=limite);
    estado.transicoes=estado.transicoes.filter(e=>diaLocal(e.em)>=limite);
  }
  return aplicado;
}
function snapshot(db,agora){
  const datas=Array.from({length:90},(_,i)=>diaLocal(agora-(89-i)*DIA));
  const componentes=ALVOS_FAROL.map(alvo=>{
    const l=db.componentes[alvo.dominio]||novaLinha(),cons=consolidar(l,agora);
    const checagens={};
    for(const fonte of ["http","funcional"]){
      const v=l.dimensoes[fonte],verificadoEm=v?.verificadoEm??null,venceEm=verificadoEm!==null?verificadoEm+VALIDADE[fonte]:null;
      checagens[fonte]={estado:v?.estado||SEM,verificadoEm,venceEm,atrasado:venceEm===null||agora>venceEm,motivo:v?.motivo??null,
        descricao:fonte==="http"?alvo.descricao:(v?.descricao||"Verificação de uso em navegador independente."),
        http:v?.http??null,latenciaMs:v?.latenciaMs??null,origem:v?.origem??(v?(fonte==="funcional"?"github":"netlify"):null),ultimaExternaEm:v?.ultimaExternaEm??null};
    }
    const hist=datas.map(d=>resumoDia(l.dias[d]||dadosDia(d)));
    const somar=k=>hist.reduce((a,v)=>a+v[k],0);
    return {id:alvo.dominio,siteId:alvo.siteId,nome:alvo.nome,dominio:alvo.dominio,url:alvo.url,
      estado:cons.estado,ultimoEstado:l.ultimoEvento??SEM,atrasado:Object.values(checagens).some(c=>c.atrasado),
      verificadoEm:Math.max(0,...Object.values(checagens).map(c=>c.verificadoEm||0))||null,
      latenciaMs:checagens.http.latenciaMs,http:checagens.http.http,motivo:cons.motivo,
      disponibilidadePct:porcento(somar("operacionais"),somar("verificacoes")-somar("desconhecidas")),historico:hist,latencias:l.latencias,checagens};
  });
  const pior=componentes.filter(c=>RUIM.has(c.estado)).sort((a,b)=>RISCO[b.estado]-RISCO[a.estado])[0];
  return {versao:1,agoraEm:agora,ultimaChecagemEm:Math.max(0,...componentes.map(c=>c.verificadoEm||0))||null,ultimaRodadaHttpEm:db.ultimoHTTP??null,intervaloSegundos:INTERVALO/1000,intervaloFuncionalSegundos:900,
    atrasado:componentes.some(c=>c.atrasado),fuso:"America/Sao_Paulo",estado:pior?.estado||(componentes.every(c=>c.estado==="operacional")?"operacional":SEM),
    componentes,incidentes:[...db.incidentes].filter(i=>!i.fimEm||i.fimEm>=agora-90*DIA).sort((a,b)=>b.inicioEm-a.inicioEm),
    transicoes:[...db.transicoes].filter(t=>t.em>=agora-90*DIA).sort((a,b)=>b.em-a.em)};
}
export function criarFarol({store,agora=Date.now,entregar=async()=>{throw new Error("Canal de avisos indisponível.");},sondar=sondarSites}){
  const ler=async()=>await store.get(CHAVE,{type:"json"})||novoEstado();
  async function mudar(mutacao){
    for(let n=0;n<9;n++){
      const anterior=await lerParaAtualizar(store,CHAVE),estado=anterior?.data??novoEstado();
      const mudanca=mutacao(estado);
      if(!mudanca.gravar)return mudanca.resultado;
      const r=await store.setJSON(CHAVE,estado,anterior?{onlyIfMatch:anterior.etag}:{onlyIfNew:true});
      if(r.modified)return mudanca.resultado;
    }
    throw new ErroFarol(503,"Aguarde a sincronização das verificações.");
  }
  async function aplicar(fonte,relatorio,{origem=fonte==="funcional"?"github":"netlify",confirmadas=[]}={}){
    if(origem==="netlify-reserva" && (fonte!=="funcional" || relatorio.resultados?.some(x=>x.estado!=="operacional" && !(x.estado==="degradado" && confirmadas.includes(x.dominio) && x.tentativas===2))))throw new ErroFarol(400,"A reserva exige prova específica para registrar a falha da jornada.");
    const r=normalizarRelatorio(fonte,relatorio,agora());
    return mudar(estado=>{const gravar=registrar(estado,fonte,r,agora(),origem);return {gravar,resultado:{aplicado:gravar}};});
  }
  async function drenar(){
    const lease=randomUUID(), agoraMs=agora();
    const lote=await mudar(s=>{
      const itens=[], bloqueados=new Set();
      for(const item of Object.values(s.outbox).sort((a,b)=>a.evento.em-b.evento.em)){
        if((item.proximaEm||0)>agoraMs||(item.leaseAte||0)>agoraMs)bloqueados.add(item.evento.dominio);
        if(!bloqueados.has(item.evento.dominio))itens.push(item);
        if(itens.length>=16)break;
      }
      for(const i of itens){i.lease=lease;i.leaseAte=agoraMs+100000;}
      return {gravar:itens.length>0,resultado:itens.map(i=>i.evento)};
    });
    if(!lote.length)return {pendentesProcessadas:0};
    // Conserva a ordem de emissão para cada domínio. A chave estável é usada pelo canal para deduplicar destinatários.
    const grupos=Map.groupBy(lote,e=>e.dominio);
    const respostas=new Map();
    await Promise.all([...grupos.values()].map(async eventos=>{
      let parou=false;
      for(const evento of eventos){
        if(parou){respostas.set(evento.id,false);continue;}
        try{await entregar(evento);respostas.set(evento.id,true);}catch{respostas.set(evento.id,false);parou=true;}
      }
    }));
    await mudar(s=>{
      let gravar=false;
      for(const [id,ok] of respostas){
        const p=s.outbox[id];if(p?.lease!==lease)continue;
        gravar=true;
        if(ok)delete s.outbox[id];
        else{p.tentativas++;p.proximaEm=agora()+Math.min(3600000,30000*(2**Math.min(7,p.tentativas-1)));delete p.lease;delete p.leaseAte;}
      }
      return {gravar,resultado:null};
    });
    return {pendentesProcessadas:lote.length};
  }
  async function monitorar(){
    const inicio=agora(),id="http:"+Math.floor(inicio/INTERVALO),db=await ler();
    if(ALVOS_FAROL.every(c=>db.componentes[c.dominio]?.dimensoes?.http?.rodada===id))return drenar();
    const ultimos=Object.fromEntries(ALVOS_FAROL.map(c=>[c.dominio,db.componentes[c.dominio]?.dimensoes?.http?.estado]));
    const resultados=await sondar(ultimos);
    await aplicar("http",{id,em:agora(),resultados});
    return drenar();
  }
  return {aplicar,drenar,monitorar,painel:async()=>{
    const [estado,reserva]=await Promise.all([ler(),store.get("farol/v1/reserva",{type:"json"}).catch(()=>null)]);
    return {...snapshot(estado,agora()),reserva:resumoReserva(reserva,agora())};
  },
    saude:async()=>{const t=(await ler()).ultimoHTTP;return Boolean(t && agora()-t<=VALIDADE.http);}};
}
