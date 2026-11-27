import test from "node:test";
import assert from "node:assert/strict";
import {randomBytes,createECDH,createHash,createDecipheriv,generateKeyPairSync,sign,pbkdf2Sync,hkdfSync} from "node:crypto";
import {criarServico} from "../servidor/nuvem.mjs";
import {provisionarTicket} from "../servidor/dispositivos-iphone.mjs";
import {fonteDosMarcadores} from "../servidor/marcador-firebase.mjs";

const b64=b=>Buffer.from(b).toString("base64url");
const origem="https://orquestrator.ai";
function banco(){
  const docs=new Map();let versao=0;
  async function set(k,d,c={}){if((c.onlyIfNew&&docs.has(k))||(c.onlyIfMatch&&c.onlyIfMatch!==docs.get(k)?.etag))return {modified:false};docs.set(k,{data:structuredClone(d),etag:String(++versao)});return {modified:true};}
  return {docs,set,setJSON:set,async get(k){return structuredClone(docs.get(k)?.data??null);},async getWithMetadata(k){return structuredClone(docs.get(k)??null);},
    async *list({prefix}){yield {blobs:[...docs].filter(([key])=>key.startsWith(prefix)).map(([key,v])=>({key,etag:v.etag})),directories:[]};}};
}
function aparelho(){
  const sig=generateKeyPairSync("ec",{namedCurve:"prime256v1"}), point=sig.publicKey.export({format:"jwk"}),
    deviceKey=b64(Buffer.concat([Buffer.from([4]),Buffer.from(point.x,"base64url"),Buffer.from(point.y,"base64url")]));
  const e=createECDH("prime256v1");e.generateKeys();const estado=randomBytes(32),codigo="004925";
  const assinar=m=>b64(sign("sha256",Buffer.from(m),{key:sig.privateKey,dsaEncoding:"ieee-p1363"}));
  const pedido=(v2=true)=>({state:b64(estado),key:b64(e.getPublicKey()),codigo,
    proof:b64(pbkdf2Sync(codigo,Buffer.concat([estado,e.getPublicKey(),...(v2?[Buffer.from(deviceKey,"base64url")]:[])]),100000,32,"sha256")),
    ...(v2?{nome:"Meu iPhone",versao:2,deviceKey}:{})});
  function abrir(x){assert.equal(x.state,b64(estado));const bytes=Buffer.from(x.box,"base64url"),aes=hkdfSync("sha256",e.computeSecret(Buffer.from(x.key,"base64url")),estado,Buffer.from("orquestrator.ai/contagem/ios/v1"),32);
    const d=createDecipheriv("aes-256-gcm",aes,bytes.subarray(0,12));d.setAAD(Buffer.from(x.state));d.setAuthTag(bytes.subarray(-16));return JSON.parse(Buffer.concat([d.update(bytes.subarray(12,-16)),d.final()]));}
  function autorizar(id,instante,op="renovar",nonce=b64(randomBytes(16))){return {instante,nonce,assinatura:assinar("orquestrator.ai/contagem/"+op+"/v2\n"+id+"\n"+instante+"\n"+nonce)};}
  function migrar(ticket){return {ticket,deviceKey,nome:"Meu iPhone",assinatura:assinar("orquestrator.ai/contagem/migrar/v2\n"+ticket+"\n"+deviceKey)};}
  return {deviceKey,pedido,abrir,autorizar,migrar};
}
function cenario(ponte=false) {
  const store=banco(), inicio=Date.parse(ponte?"2026-11-27T03:10:00Z":"2026-11-27T13:00:00Z");let tempo=inicio,admin=true,firestore=true;
  const markers=new Set();
  const marcadores={criar:async(u,m)=>{if(!admin)return 403;markers.add(u+m);return 200;},conferir:async(u,m)=>firestore?(admin && markers.has(u+m)?200:403):503,
    provisionarComoOperador:async(u,m,a)=>{if(a!=="operador"||!admin)return 403;markers.add(u+m);return 200;}};
  const jwt=(uid)=>"e30."+b64(JSON.stringify({sub:uid,aud:"orquestrator-61836",iss:"https://securetoken.google.com/orquestrator-61836",exp:Math.floor(tempo/1000)+180} ))+".teste";
  const apps=deploy=>criarServico({store,rotas:{"orquestrator.ai":["/"]},agora:()=>tempo,namespace:deploy,namespaceAnteriorCtg1:ponte && deploy==="deploy-novo"?"6b08f09eceff1b60d74346fe":undefined,marcadores,administrador:async h=>{
    try{const cl=JSON.parse(Buffer.from(h.split(".")[1],"base64url"));return !admin?403:cl.exp>tempo/1000?200:401;}catch{return 401;}}});
  const req=(rota,auth,{body,origin,deploy="deploy-00001"}={})=>{
    const headers={authorization:"Bearer "+auth};if(origin)headers.origin=origin;
    return apps(deploy)(new Request("https://contagem.test/api/"+rota,{method:body?"POST":"GET",headers,body:body?JSON.stringify(body):undefined}));};
  const emitir=(a,v2=true,uid="dono")=>req("iphone/autorizar",jwt(uid),{body:a.pedido(v2),origin:origem});
  const sec=()=>Math.floor(tempo/1000);
  return {store,marcadores,markers,req,emitir,sec,jwt,mudarMs:n=>{tempo+=n;},setAdmin:v=>{admin=v;},setFirestore:v=>{firestore=v;},agora:()=>tempo};
}
test("pareamento v2 idempotente, sem token geral no telefone ou no armazenamento; catálogo por dono e renovação dias depois",async()=>{
  const c=cenario(),a=aparelho(),outra=aparelho();
  const p=a.pedido();assert.equal((await c.req("iphone/autorizar",c.jwt("dono"),{body:{...p,deviceKey:outra.deviceKey},origin:origem})).status,400);
  const respostas=await Promise.all([c.emitir(a),c.emitir(a)]);assert.ok(respostas.every(x=>x.status===200));
  const en=await Promise.all(respostas.map(r=>r.json()));assert.deepEqual(en[0],en[1]);
  const grant=a.abrir(en[0]),id=grant.dispositivo;assert.match(grant.passe,/^ctg2\./); assert.equal(c.markers.size,1);
  assert.ok(!JSON.stringify([...c.store.docs]).includes(grant.passe.split(".").at(-1)));assert.ok(!JSON.stringify([...c.store.docs]).includes(c.jwt("dono")));
  assert.equal((await c.req("sites",grant.passe)).status,403);assert.equal((await c.req("iphone/dispositivos",grant.passe,{origin:origem})).status,403);
  const listar=async uid=>(await c.req("iphone/dispositivos",c.jwt(uid),{origin:origem})).json();
  assert.deepEqual((await listar("outro")).dispositivos,[]);assert.deepEqual(Object.keys((await listar("dono")).dispositivos[0]).sort(),["criadoEm","id","nome","revogadoEm"]);
  const renovar=(dados,deploy="deploy-00002")=>c.req("iphone/renovar",grant.passe,{body:dados,deploy});
  assert.equal((await renovar(outra.autorizar(id,c.sec()))).status,401);
  assert.equal((await renovar(a.autorizar(id,c.sec()-121))).status,401);
  const d=a.autorizar(id,c.sec()); const rs=await Promise.all([renovar(d),renovar(d)]);const ss=await Promise.all(rs.map(r=>r.json()));assert.deepEqual(ss[0],ss[1]);assert.match(ss[0].passe,/^ctg2s\./);
  assert.equal((await c.req("sites",ss[0].passe)).status,200);assert.equal((await c.req("exportar?site=1",ss[0].passe)).status,403);
  assert.equal((await c.req("farol",ss[0].passe)).status,200);
  assert.equal((await c.req("farol/avisos/chave",ss[0].passe)).status,403);
  c.mudarMs(4*86400000);assert.equal((await c.req("sites",ss[0].passe)).status,401);
  const nova=await(await renovar(a.autorizar(id,c.sec()))).json();assert.equal((await c.req("sites",nova.passe)).status,200);
  c.setAdmin(false);assert.equal((await c.req("sites",nova.passe)).status,403);assert.equal((await c.req("farol",nova.passe)).status,403);assert.equal((await renovar(a.autorizar(id,c.sec()))).status,403);
  c.setAdmin(true);c.setFirestore(false);assert.equal((await c.req("sites",nova.passe)).status,503);c.setFirestore(true);
  assert.equal((await c.req("iphone/revogar",c.jwt("outro"),{origin:origem,body:{id}})).status,404);
  const rem=await Promise.all([1,2].map(()=>c.req("iphone/revogar",c.jwt("dono"),{origin:origem,body:{id}})));
  assert.deepEqual(await rem[0].json(),await rem[1].json());assert.equal((await c.req("sites",nova.passe)).status,403);
  assert.equal((await renovar(a.autorizar(id,c.sec()))).status,403);
  assert.equal((await c.req("iphone/desvincular",grant.passe,{body:a.autorizar(id,c.sec(),"desvincular")})).status,204);
});
test("migração com ticket único amarrado ao iPhone via hardware, inclusive idempotência e prova histórica exclusiva IAM",async()=>{
 const c=cenario(),a=aparelho(),b=aparelho(),old=a.abrir(await(await c.emitir(a,false)).json()).passe,old2=b.abrir(await(await c.emitir(b,false)).json()).passe;
 const op={uid:"dono",deploy:"deploy-00001",deviceKey:a.deviceKey,legadoHash:b64(createHash("sha256").update(old).digest()),agora:c.agora,marcadores:c.marcadores,acessoOperador:"operador",ttl:86400};
 const {ticket}=await provisionarTicket(c.store,op);assert.ok(!JSON.stringify([...c.store.docs]).includes(ticket));
 const req=(g,params)=>c.req("iphone/migrar",g,{body:params,deploy:"deploy-novo"});
 const payload=a.migrar(ticket);
 assert.equal((await req(old,b.migrar(ticket))).status,403);
 assert.equal((await req(old2,payload)).status,403);
 assert.equal((await req(old,{...payload,assinatura:b.migrar(ticket).assinatura})).status,401);
 assert.equal((await req("invalido",payload)).status,401);
 const errado=await provisionarTicket(c.store,{...op,uid:"outro"});assert.equal((await req(old,a.migrar(errado.ticket))).status,403);
 const curto=await provisionarTicket(c.store,{...op,acessoOperador:null,ttl:1200});
 c.mudarMs(5*60000);assert.equal((await c.req("sites",old)).status,401);
 assert.equal((await req(old,a.migrar(curto.ticket))).status,401);
 c.mudarMs(8*3600000);
 c.setAdmin(false);assert.equal((await req(old,payload)).status,403);c.setAdmin(true);
 const r=await Promise.all([req(old,payload),req(old,payload)]);assert.ok(r.every(x=>x.status===200));const dados=await Promise.all(r.map(x=>x.json()));assert.deepEqual(dados[0],dados[1]);
 assert.equal((await req(old2,payload)).status,403);
 const g=dados[0]; c.mudarMs(16*3600000);assert.equal((await req(old,payload)).status,410);
 const renovar=()=>c.req("iphone/renovar",g.passe,{body:a.autorizar(g.dispositivo,c.sec())});assert.equal((await renovar()).status,200);
 await c.req("iphone/desvincular",g.passe,{body:a.autorizar(g.dispositivo,c.sec(),"desvincular")});
 assert.equal((await renovar()).status,403);
});
test("marcador usa mesmo UID, confirma Firestore sem credenciais nas leituras e falha fechado em indisponibilidade",async()=>{
 const chamadas=[];
 const fonte=fonteDosMarcadores({requisitar:async (url,opts)=>{
   chamadas.push({url,opts});return Response.json(url.includes("?mask.")?{fields:{enabled:{booleanValue:true}}}:{fields:{v:{integerValue:"1"}}});}});
 assert.equal(await fonte.provisionarComoOperador("dono","abc","oauth-exemplo"),200);
 assert.equal(chamadas.length,3);assert.equal(chamadas[0].opts.headers.authorization,"Bearer oauth-exemplo");
 assert.equal(chamadas[1].opts.headers.Authorization,"Bearer oauth-exemplo");assert.equal(chamadas[2].opts.headers,undefined);
 assert.ok(chamadas[2].url.endsWith("/admins/dono/contagemLeituras/abc"));
 for(const [codigo,esperado] of [[403,403],[404,403],[500,503]]) {
  const f=fonteDosMarcadores({requisitar:async()=>new Response(null,{status:codigo})});
  assert.equal(await f.conferir("dono","abc"),esperado);
 }
});

test("ponte transitória lê apenas o passe válido do deploy de produção anterior e exige admin habilitado",async()=>{
  const c=cenario(true),a=aparelho();
  const emitir=async deploy=>a.abrir(await(await c.req("iphone/autorizar",c.jwt("dono"),{origin:origem,body:a.pedido(false),deploy})).json()).passe;
  const anterior=await emitir("6b08f09eceff1b60d74346fe"), estranho=await emitir("deploy-nao-permitido");
  const ler=p=>c.req("sites",p,{deploy:"deploy-novo"});
  assert.equal((await ler(anterior)).status,200);
  assert.equal((await ler(estranho)).status,401);
  assert.equal((await c.req("sites",anterior,{deploy:"preview-isolado"})).status,401);
  c.setAdmin(false);assert.equal((await ler(anterior)).status,403);
  c.setAdmin(true);c.mudarMs(4*60000);assert.equal((await ler(anterior)).status,401);
  c.mudarMs(3*3600000); const tardio=await emitir("6b08f09eceff1b60d74346fe");assert.equal((await ler(tardio)).status,401);
});
