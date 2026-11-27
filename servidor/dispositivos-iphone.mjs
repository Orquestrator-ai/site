import {createHash,createHmac,createPublicKey,randomBytes,timingSafeEqual,verify} from "node:crypto";
import {FalhaPasse} from "./passe-iphone.mjs";
import {lerParaAtualizar} from "./registro-nuvem.mjs";

const hash=d=>createHash("sha256").update(d).digest();
const b64=d=>d.toString("base64url");
const h64=d=>b64(hash(d));
const chaveDoGrant=id=>"iphone-v2/dispositivos/"+id;
const chaveDoDono=(uid,id)=>"iphone-v2/donos/"+h64(uid)+"/"+id;
const idValido=/^[A-Za-z0-9_-]{22}$/;
const conferir=(a,b)=>typeof a==="string"&&typeof b==="string"&&timingSafeEqual(hash(a),hash(b));
const falha=(status,msg)=>new FalhaPasse(status,msg);
const negado=()=>falha(401,"Este dispositivo precisa de autorização.");
function bytes64(texto,tam) {
  if(typeof texto!=="string" || texto.length!==Math.ceil(tam*4/3))return null;
  const b=Buffer.from(texto,"base64url");
  return b.length===tam && b64(b)===texto?b:null;
}
function nomeSeguro(n) {
  if(typeof n!=="string" || n.trim().length<1 || n.trim().length>45 || /[\u0000-\u001f\u007f]/.test(n))throw falha(400,"Nome de dispositivo inválido.");
  return n.trim();
}
export function uidDoIdVerificado(token) {
  try {
    const {sub}=JSON.parse(Buffer.from(token.split(".")[1],"base64url").toString("utf8"));
    if(typeof sub==="string" && sub.length<=128 && sub && !/[\/\u0000-\u001f]/.test(sub) && ![".",".."].includes(sub))return sub;
  } catch {}
  throw negado();
}
export function chaveDeDispositivo(raw) {
  const chave=bytes64(raw,65);
  if(!chave || chave[0]!==4)throw falha(400,"Chave do aparelho inválida.");
  try {return createPublicKey({format:"jwk",key:{kty:"EC",crv:"P-256",x:b64(chave.subarray(1,33)),y:b64(chave.subarray(33,65))}});}
  catch {throw falha(400,"Chave do aparelho inválida.");}
}
function verificarAssinatura(raw,mensagem,assinatura) {
  const s=bytes64(assinatura,64);
  if(!s || !verify("sha256",Buffer.from(mensagem),{key:chaveDeDispositivo(raw),dsaEncoding:"ieee-p1363"},s))throw negado();
}
async function acessoMarcador(status) {
  if(status!==200) {
    if(status===401 || status===403)throw falha(status,"A autorização administrativa não está ativa.");
    throw falha(503,"A verificação da permissão está indisponível.");
  }
}
export function criarDispositivos({store,marcadores,agora=Date.now,validarLegado,uidHistorica}) {
  const segundos=()=>Math.floor(agora()/1000);
  async function atualizar(chave,mudar) {
    for(let n=0;n<8;n++){
      const entrada=await lerParaAtualizar(store,chave);const novo=await mudar(entrada?.data);
      if(!novo)return entrada?.data;
      const r=await store.setJSON(chave,novo,entrada?{onlyIfMatch:entrada.etag}:{onlyIfNew:true});
      if(r.modified)return novo;
    }
    throw falha(503,"O dispositivo está recebendo outra atualização. Tente novamente.");
  }
  async function ativar(registro,token,preautorizado=false) {
    if(registro.revogadoEm)throw falha(403,"Este dispositivo foi desvinculado.");
    if(registro.ativo) {await acessoMarcador(await marcadores.conferir(registro.uid,registro.marcador));return registro;}
    await acessoMarcador(preautorizado ? await marcadores.conferir(registro.uid,registro.marcador) : await marcadores.criar(registro.uid,registro.marcador,token));
    await store.setJSON(chaveDoDono(registro.uid,registro.id),true,{onlyIfNew:true});
    return atualizar(chaveDoGrant(registro.id),r=>{
      if(!r || r.revogadoEm)throw falha(403,"Este dispositivo foi desvinculado.");
      return r.ativo?null:{...r,ativo:true};
    });
  }
  function base(uid,id,deviceKey,nome,segredo) {
    return {uid,id,deviceKey,nome:nomeSeguro(nome),criadoEm:segundos(),revogadoEm:null,ativo:false,marcador:b64(randomBytes(32)),hash:h64(segredo),sessoes:[]};
  }
  async function parear({token,deviceKey,nome,state,key,entregar}) {
    chaveDeDispositivo(deviceKey); const uid=uidDoIdVerificado(token);
    const id=b64(hash("par/v2\n"+uid+"\n"+state+"\n"+key+"\n"+deviceKey).subarray(0,16));
    const segredo=b64(randomBytes(32));
    const novo=base(uid,id,deviceKey,nome,segredo);
    novo.envelope=entregar({passe:"ctg2."+id+"."+segredo,dispositivo:id,nome:novo.nome});
    const r=await atualizar(chaveDoGrant(id),atual=>atual?null:novo);
    return (await ativar(r,token)).envelope;
  }
  function identificar(passe,prefixo,partes) {
    if(typeof passe!=="string" || passe.length>200)throw negado();
    const r=passe.split(".");
    if(r.length!==partes || r[0]!==prefixo || !bytes64(r[1],16) || !bytes64(r.at(-1),32))throw negado();
    return r;
  }
  async function obter(id) {const r=await store.get(chaveDoGrant(id),{type:"json"});if(!r)throw negado();return r;}
  function ativo(r) {if(!r || !r.ativo || r.revogadoEm)throw falha(403,"Este dispositivo foi desvinculado.");}
  async function gerirSessao(passe,dados,desvincular=false) {
    const [,id,segredo]=identificar(passe,"ctg2",3), r=await obter(id);
    if(!conferir(h64(segredo),r.hash))throw negado();
    const quando=segundos();
    if(!Number.isSafeInteger(dados.instante)||Math.abs(quando-dados.instante)>120 || !bytes64(dados.nonce,16))throw negado();
    const operacao=desvincular?"desvincular":"renovar";
    const mensagem="orquestrator.ai/contagem/"+operacao+"/v2\n"+id+"\n"+dados.instante+"\n"+dados.nonce;
    verificarAssinatura(r.deviceKey,mensagem,dados.assinatura);
    if(desvincular){await revogar(id,r.uid);return;}
    ativo(r);
    await acessoMarcador(await marcadores.conferir(r.uid,r.marcador));
    // Repetir a mesma requisição após perda da resposta entrega a mesma sessão. Só os hashes ficam no registro.
    const sessao=b64(createHmac("sha256",Buffer.from(segredo,"base64url")).update("sessao/v2\n"+mensagem).digest());
    const gravado=await atualizar(chaveDoGrant(id),atual=>{
      ativo(atual);
      const sessoes=atual.sessoes.filter(s=>s.expiraEm>quando);
      const existente=sessoes.find(s=>s.nonce===dados.nonce);
      if(existente){if(!conferir(existente.hash,h64(sessao)))throw negado();return null;}
      sessoes.push({nonce:dados.nonce,hash:h64(sessao),expiraEm:quando+900});
      return {...atual,sessoes:sessoes.slice(-12)};
    });
    return {passe:"ctg2s."+id+"."+dados.nonce+"."+sessao,expiraEm:gravado.sessoes.find(s=>s.nonce===dados.nonce).expiraEm};
  }
  async function validarSessao(passe) {
    const [,id,nonce,segredo]=identificar(passe,"ctg2s",4);
    if(!bytes64(nonce,16))throw negado();
    const r=await obter(id);ativo(r);
    const s=r.sessoes.find(v=>v.nonce===nonce);
    if(!s || s.expiraEm<=segundos() || !conferir(h64(segredo),s.hash))throw negado();
    await acessoMarcador(await marcadores.conferir(r.uid,r.marcador));
  }
  async function listar(uid) {
    const dispositivos=[], prefix="iphone-v2/donos/"+h64(uid)+"/";
    for await(const page of store.list({prefix,paginate:true})){
      for(let i=0;i<page.blobs.length;i+=12){
        const ids=page.blobs.slice(i,i+12).map(b=>b.key.slice(prefix.length)).filter(id=>idValido.test(id));
        const grupo=await Promise.all(ids.map(id=>store.get(chaveDoGrant(id),{type:"json"})));
        for(const r of grupo)if(r?.uid===uid && (r.ativo||r.revogadoEm))dispositivos.push({id:r.id,nome:r.nome,criadoEm:r.criadoEm,revogadoEm:r.revogadoEm});
      }
    }
    return {dispositivos:dispositivos.sort((a,b)=>b.criadoEm-a.criadoEm||a.id.localeCompare(b.id))};
  }
  async function revogar(id,uid) {
    if(!idValido.test(id))throw falha(404,"Dispositivo desconhecido.");
    const r=await atualizar(chaveDoGrant(id),atual=>{
      if(!atual || atual.uid!==uid)throw falha(404,"Dispositivo desconhecido.");
      return atual.revogadoEm?null:{...atual,ativo:false,revogadoEm:segundos(),sessoes:[],envelope:null};
    });
    return {id,revogadoEm:r.revogadoEm};
  }
  async function migrar(passe,dados) {
    if(typeof dados.ticket!=="string" || !/^ctgm\.[A-Za-z0-9_-]{43}$/.test(dados.ticket))throw falha(410,"O ticket de migração venceu ou não existe.");
    const nome=nomeSeguro(dados.nome),deviceKey=dados.deviceKey,ticket=dados.ticket;
    verificarAssinatura(deviceKey,"orquestrator.ai/contagem/migrar/v2\n"+ticket+"\n"+deviceKey,dados.assinatura);
    const hashTicket=h64(ticket), chaveTicket="iphone-v2/migracao/"+hashTicket;
    const inicial=await store.get(chaveTicket,{type:"json"});const esgotado=()=>falha(410,"O ticket de migração venceu ou não existe.");
    if(!inicial||inicial.ate<=segundos())throw esgotado();
    const fingerprint=h64(passe);
    if(!conferir(inicial.chaveEsperada,deviceKey) || !conferir(inicial.legadoEsperado,fingerprint))throw falha(403,"Este ticket não corresponde ao aparelho autorizado.");
    if(inicial.deviceKey && (inicial.deviceKey!==deviceKey || !conferir(inicial.legado,fingerprint)))throw falha(409,"Este ticket já pertence a outro pareamento.");
    const uid=inicial.uid,id=b64(hash("usb/v2\n"+uid+"\n"+hashTicket+"\n"+deviceKey).subarray(0,16));
    const segredo=b64(createHmac("sha256",Buffer.from(ticket.slice(5),"base64url")).update("concessao/v2\n"+passe+"\n"+deviceKey).digest());
    async function entregar(r){ativo(r);await acessoMarcador(await marcadores.conferir(r.uid,r.marcador));return {passe:"ctg2."+id+"."+segredo,dispositivo:id,nome:r.nome};}
    if(inicial.deviceKey){
      const r=await store.get(chaveDoGrant(id),{type:"json"});
      if(r?.ativo || r?.revogadoEm)return entregar(r);
    }
    const preautorizado=Boolean(inicial.marcador);
    let token,identidade;
    if(preautorizado){
      await acessoMarcador(await marcadores.conferir(uid,inicial.marcador));
      identidade=await uidHistorica(passe,inicial.deploy);
    } else {token=await validarLegado(passe,inicial.deploy);identidade=uidDoIdVerificado(token);}
    if(identidade!==uid)throw falha(403,"Este ticket pertence a outra conta.");
    await atualizar(chaveTicket,t=>{
      if(!t||t.ate<=segundos())throw esgotado();
      if(t.deviceKey && (t.deviceKey!==deviceKey || !conferir(t.legado,fingerprint)))throw falha(409,"Este ticket já pertence a outro pareamento.");
      return t.deviceKey?null:{...t,deviceKey,legado:fingerprint};
    });
    const r=await atualizar(chaveDoGrant(id),atual=>{
      if(atual)return null;
      const novo=base(uid,id,deviceKey,nome,segredo);if(preautorizado)novo.marcador=inicial.marcador;
      return novo;
    });
    return entregar(await ativar(r,token,preautorizado));
  }
  return {parear,gerirSessao,validarSessao,listar,revogar,migrar};
}
export async function provisionarTicket(store,{uid,deploy,deviceKey,legadoHash,agora=Date.now,ttl=900,acessoOperador,marcadores}) {
  if(typeof uid!=="string"||!uid||[".",".."].includes(uid)||uid.length>128||/[\/\u0000-\u001f]/.test(uid) ||
     typeof deploy!=="string" || !/^[A-Za-z0-9_-]{8,128}$/.test(deploy) || !Number.isInteger(ttl) || ttl<60 || ttl>(acessoOperador?86400:1200) || !bytes64(legadoHash,32))
    throw Error("Identidade, deploy ou validade inválidos.");
  chaveDeDispositivo(deviceKey);
  let marcador=null;
  if(acessoOperador){
    marcador=b64(randomBytes(32));
    await acessoMarcador(await marcadores.provisionarComoOperador(uid,marcador,acessoOperador));
  }
  const ticket="ctgm."+b64(randomBytes(32)), ate=Math.floor(agora()/1000)+ttl;
  const r=await store.setJSON("iphone-v2/migracao/"+h64(ticket),{uid,deploy,ate,chaveEsperada:deviceKey,legadoEsperado:legadoHash,marcador},{onlyIfNew:true});
  if(!r.modified)throw Error("Ticket indisponível.");
  return {ticket};
}
