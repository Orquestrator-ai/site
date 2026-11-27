// Assinaturas e chaves ficam no Blobs privado do deploy. Somente os serviços de push dos navegadores recebem notificações.
import {createHash,randomBytes,ECDH} from 'node:crypto';
import {sendNotification,generateVAPIDKeys} from 'web-push';
import {lerParaAtualizar} from './registro-nuvem.mjs';
import {fonteDosMarcadores} from './marcador-firebase.mjs';

const cadastro='farol/push/v1/assinantes', chaveVapid='farol/push/v1/vapid';
const digest=s=>createHash('sha256').update(s).digest('base64url');
const aleatorio=()=>randomBytes(32).toString('base64url');
const falha=(status,message)=>Object.assign(new Error(message),{status});
const idValido=s=>typeof s==='string' && /^[A-Za-z0-9_-]{43}$/.test(s);
const servicos=['push.apple.com','push.services.mozilla.com','notify.windows.com','push.microsoft.com'];
const permitida=host=>host==='fcm.googleapis.com'||servicos.some(s=>host===s||host.endsWith('.'+s));
function assinatura(valor) {
  let u; try {u=new URL(valor?.endpoint);} catch {throw falha(400,'Assinatura inválida.');}
  const keys=valor?.keys;
  if(u.protocol!=='https:'||u.port||u.password||u.username||u.hash||u.href.length>2048||u.pathname==='/'||!permitida(u.hostname))
    throw falha(400,'Serviço de notificações incompatível.');
  const chave=keys?.p256dh, segredo=keys?.auth;
  if(!/^[A-Za-z0-9_-]{87}$/.test(chave||'')||!/^[A-Za-z0-9_-]{22}$/.test(segredo||''))throw falha(400,'Chaves de assinatura inválidas.');
  try {const bytes=Buffer.from(chave,'base64url');if(bytes.length!==65||bytes[0]!==4||ECDH.convertKey(bytes,'prime256v1').length!==65||Buffer.from(segredo,'base64url').length!==16)throw Error();}catch{throw falha(400,'Chaves de assinatura inválidas.');}
  return {endpoint:u.href,keys:{p256dh:chave,auth:segredo}};
}
const ler=(store,key)=>store.get(key,{type:'json'});
async function transacao(store,key,mudar) {
  for(let n=0;n<12;n++){
    const anterior=await lerParaAtualizar(store,key);
    const atual=anterior?.data??{};
    const resultado=mudar(atual);
    if(!resultado.gravar)return resultado.valor;
    const op=await store.setJSON(key,atual,anterior?{onlyIfMatch:anterior.etag}:{onlyIfNew:true});
    if(op.modified)return resultado.valor;
    await new Promise(r=>setTimeout(r,10+n*6));
  }
  throw falha(503,'As notificações estão ocupadas. Tente novamente.');
}
export function criarPushFarol({store,agora=Date.now,marcadores=fonteDosMarcadores(),enviar=sendNotification}) {
  let promessaVapid;
  function vapid() {
    if(!promessaVapid)promessaVapid=transacao(store,chaveVapid,atual=>{
      if(atual.publicKey && atual.privateKey)return {valor:atual};
      Object.assign(atual,generateVAPIDKeys());return {gravar:true,valor:atual};
    }).catch(err=>{promessaVapid=undefined;throw err;});
    return promessaVapid;
  }
  function dono(map,id,uid) {
    if(!idValido(id)||!Object.hasOwn(map,id)||map[id].uid!==uid)throw falha(404,'Este aparelho não está inscrito.');
    return map[id];
  }
  async function enviarPush(sub,mensagem) {
    const k=await vapid();
    try{
      await enviar(sub,JSON.stringify(mensagem),{TTL:mensagem.tipo==='teste'?300:3600,urgency:'high',timeout:6000,
        vapidDetails:{subject:'https://orquestrator.ai/admin/farol/',publicKey:k.publicKey,privateKey:k.privateKey}});
      return 'aceito';
    }catch(e){if(e?.statusCode===404||e?.statusCode===410)return 'expirado';throw falha(503,'O provedor de notificações não confirmou o envio.');}
  }
  async function removerRegistro(id,marca) {
    return transacao(store,cadastro,map=>{if(map[id]?.marca!==marca)return {};delete map[id];return {gravar:true};});
  }
  async function inscrever(uid,corpo,token) {
    const sub=assinatura(corpo?.subscription),id=digest(uid+'\n'+sub.endpoint);
    const marca=await transacao(store,cadastro,map=>{
      if(map[id])return {valor:map[id].marca};
      for(const [k,v] of Object.entries(map))if(!v.ativa&&v.criado<agora()-3600000)delete map[k];
      if(Object.values(map).filter(v=>v.uid===uid).length>=16||Object.keys(map).length>=128)throw falha(409,'Limite de aparelhos atingido.');
      const marca=aleatorio();map[id]={uid,marca,sub,criado:agora(),ativa:false,feitos:[]};return {gravar:true,valor:marca};
    });
    const r=await marcadores.criar(uid,marca,token);
    if(r!==200)throw falha(r===403?403:503,'A autorização de avisos está indisponível.');
    await transacao(store,cadastro,map=>{const v=dono(map,id,uid);if(v.marca!==marca)throw falha(409,'A inscrição foi alterada.');
      if(v.ativa&&v.sub.keys.p256dh===sub.keys.p256dh&&v.sub.keys.auth===sub.keys.auth)return {};
      v.sub=sub;v.ativa=true;return {gravar:true};});
    return {id};
  }
  async function remover(uid,corpo) {
    await transacao(store,cadastro,map=>{dono(map,corpo?.id,uid);delete map[corpo.id];return {gravar:true};});return {ativo:false};
  }
  async function estado(uid,corpo){const v=dono(await ler(store,cadastro)||{},corpo?.id,uid);
    return {ativo:v.ativa,testeId:v.teste?.id??null,recebidoEm:v.teste?.recebido??null};}
  async function testar(uid,corpo) {
    const id=corpo?.id,segredo=aleatorio(),testeId=aleatorio();
    const v=await transacao(store,cadastro,map=>{const a=dono(map,id,uid);
      if(!a.ativa)throw falha(409,'Ative a inscrição primeiro.');
      if(a.teste && agora()-a.teste.enviado<20000)throw falha(429,'Aguarde alguns segundos antes de testar novamente.');
      a.teste={id:testeId,enviado:agora(),hash:digest(segredo),recebido:null};return {gravar:true,valor:a};});
    const ok=await enviarPush(v.sub,{id:testeId,tipo:'teste',titulo:'Farol · aviso de teste',corpo:'Os avisos de falha e recuperação chegam por aqui.',url:'/admin/farol/',recibo:id+'.'+segredo});
    if(ok==='expirado'){await removerRegistro(id,v.marca);throw falha(410,'Esta inscrição expirou. Ative os avisos novamente.');}
    return {enviado:true,testeId};
  }
  async function recebido(corpo){
    const partes=typeof corpo?.recibo==='string'?corpo.recibo.split('.'):[];
    if(partes.length!==2||!partes.every(idValido))throw falha(400,'Recibo inválido.');
    const [id,segredo]=partes;
    await transacao(store,cadastro,map=>{const t=map[id]?.teste;
      if(!t||!t.hash||t.hash!==digest(segredo)||agora()-t.enviado>900000)return {};
      t.recebido=agora();delete t.hash;return {gravar:true};});return {ok:true};
  }
  async function entregarUma(id,a,evento,mensagem){
    const h=digest(evento.id),lease=aleatorio();
    const tem=await transacao(store,cadastro,map=>{const v=map[id];
      if(!v?.ativa||v.marca!==a.marca||v.criado>evento.em||v.feitos.includes(h))return {valor:false};
      v.pendentes??={};
      if(v.pendentes[h]?.ate>agora())throw falha(503,'Envio já em andamento.');
      for(const [k,p] of Object.entries(v.pendentes))if(p.ate<=agora())delete v.pendentes[k];
      v.pendentes[h]={lease,ate:agora()+25000};return {gravar:true,valor:true};});
    if(!tem)return;
    const acesso=await marcadores.conferir(a.uid,a.marca);
    if(acesso===403){await removerRegistro(id,a.marca);return;}
    if(acesso!==200)throw falha(503,'Não foi possível verificar a permissão da assinatura.');
    const res=await enviarPush(a.sub,mensagem);
    if(res==='expirado'){await removerRegistro(id,a.marca);return;}
    await transacao(store,cadastro,map=>{const v=map[id];if(v?.marca!==a.marca||v.pendentes?.[h]?.lease!==lease)return {};
      delete v.pendentes[h];v.feitos=[...v.feitos.slice(-127),h];return {gravar:true};});
  }
  async function entregar(ev){
    if(!ev||!['falha','recuperacao'].includes(ev.tipo)||!Number.isFinite(ev.em)||typeof ev.id!=='string'||!ev.id)throw Error('Transição Farol inválida.');
    const mensagem={id:ev.id,tipo:ev.tipo,titulo:(ev.tipo==='falha'?'Falha em ':'Voltou a funcionar: ')+String(ev.dominio).slice(0,90),
      corpo:String(ev.texto||ev.motivo||(ev.tipo==='falha'?'O Farol confirmou a falha.':'O Farol confirmou a recuperação.')).slice(0,190),url:'/admin/farol/'};
    const todos=Object.entries(await ler(store,cadastro)||{}).filter(([,a])=>a.ativa&&a.criado<=ev.em);
    let falhou=false;
    for(let i=0;i<todos.length;i+=4){const resultados=await Promise.allSettled(todos.slice(i,i+4).map(([id,a])=>entregarUma(id,a,ev,mensagem)));
      if(resultados.some(r=>r.status==='rejected'))falhou=true;}
    if(falhou)throw falha(503,'Há avisos de incidente pendentes.');return {destinos:todos.length};
  }
  return {chavePublica:async()=>({publicKey:(await vapid()).publicKey}),inscrever,remover,testar,estado,recebido,entregar};
}
