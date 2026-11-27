import {test} from "node:test";
import assert from "node:assert/strict";
import {randomBytes,webcrypto} from "node:crypto";
import {criarServico} from "../servidor/nuvem.mjs";

const sut = webcrypto.subtle, api = "https://contagem.test/api/";
const origem = "https://orquestrator.ai", instante = Date.parse("2026-11-27T23:59:55.000Z");
const seguro = bytes => Buffer.from(bytes).toString("base64url");
const projeto = "orquestrator-61836";
function jwt(exp) {
  return "e30." + seguro(JSON.stringify({sub:"operador-sintetico",aud:projeto,iss:"https://securetoken.google.com/"+projeto,exp})) + ".amostra";
}
function blobs() {
  const db = new Map();
  return {db,
    async get(k){return db.get(k)??null;},
    async set(k,v,{onlyIfNew}) {assert.equal(onlyIfNew,true);if(db.has(k))return {modified:false};db.set(k,v);return {modified:true};},
    async *list(){yield {blobs:[],directories:[]};}
  };
}
async function aparelho() {
  const par=await sut.generateKey({name:"ECDH",namedCurve:"P-256"},true,["deriveBits"]);
  const publica=await sut.exportKey("raw",par.publicKey), estado=randomBytes(32), codigo="003951";
  const password=await sut.importKey("raw",Buffer.from(codigo),"PBKDF2",false,["deriveBits"]);
  const proof=await sut.deriveBits({name:"PBKDF2",salt:Buffer.concat([estado,Buffer.from(publica)]),iterations:100000,hash:"SHA-256"},password,256);
  return {
    pedido:{key:seguro(publica),state:seguro(estado),codigo,proof:seguro(proof)},
    async receber(envelope) {
      assert.deepEqual(Object.keys(envelope).sort(),["box","key","state"]);
      assert.equal(envelope.state, seguro(estado));
      const remota=await sut.importKey("raw",Buffer.from(envelope.key,"base64url"),{name:"ECDH",namedCurve:"P-256"},false,[]);
      const compartilhada=await sut.deriveBits({name:"ECDH",public:remota},par.privateKey,256);
      const material=await sut.importKey("raw",compartilhada,"HKDF",false,["deriveKey"]);
      const aes=await sut.deriveKey({name:"HKDF",hash:"SHA-256",salt:estado,info:Buffer.from("orquestrator.ai/contagem/ios/v1")},material,{name:"AES-GCM",length:256},false,["decrypt"]);
      const caixa=Buffer.from(envelope.box,"base64url");
      const claro=await sut.decrypt({name:"AES-GCM",iv:caixa.subarray(0,12),additionalData:Buffer.from(envelope.state)},aes,caixa.subarray(12));
      return JSON.parse(Buffer.from(claro).toString("utf8"));
    }};
}
function contexto(tempoToken=7200) {
  const store=blobs();
  let data=instante,statusAdmin=200;
  const token=jwt(Math.floor(instante/1000)+tempoToken);
  const chamadas=[];
  const criar=(extra={})=>criarServico({store,rotas:{"orquestrator.ai":["/"]},namespace:"deploy-A",
    agora:()=>data,administrador:async h=>{chamadas.push(h);return h==="Bearer "+token?statusAdmin:401;}, ...extra});
  const app=criar();
  const pedir=(rota,{dado,credencial=token,metodo=dado?"POST":"GET",origin=origem,handler=app}={})=>{
    const headers={}; if(origin)headers.origin=origin;if(credencial)headers.authorization="Bearer "+credencial;
    return handler(new Request(api+rota,{method:metodo,headers,body:dado?JSON.stringify(dado):undefined}));
  };
  const autorizar=(pedido,opts)=>pedir("iphone/autorizar",{dado:pedido,...opts});
  return {store,criar,pedir,autorizar,token,chamadas,agora:s=>{data=s;},admin:s=>{statusAdmin=s;}};
}
test("emissão exige admin ativo, origem exata, confirmação, P256 válida, código aleatório e chave vinculada",async()=>{
  const c=contexto(),a=await aparelho(),b=await aparelho(),p=a.pedido;
  for(const origin of [null,"https://orquestrator.app","https://orquestrator.ai.example"])assert.equal((await c.autorizar(p,{origin})).status,403);
  assert.equal((await c.autorizar(p,{credencial:"sem-acesso"})).status,401);
  assert.equal((await c.autorizar(p,{credencial:""})).status,401);
  c.admin(403);assert.equal((await c.autorizar(p)).status,403);c.admin(200);
  for(const erro of [{codigo:3951},{codigo:"000000"},{key:b.pedido.key},{proof:"x"},{state:p.state+"="},{key:seguro(Buffer.alloc(65,4))},{refreshToken:"nao-aceitar"}])
    assert.equal((await c.autorizar({...p,...erro})).status,400);
  assert.equal(c.store.db.size,0);
  const r=await c.autorizar(p);assert.equal(r.status,200);assert.equal(r.headers.get("cache-control"),"no-store");
  const envelope=await r.json();
  assert.ok(!JSON.stringify(envelope).includes(c.token));assert.ok(!JSON.stringify(envelope).includes("ctg1."));
  await assert.rejects(b.receber({...envelope,state:b.pedido.state}));
  const claro=await a.receber(envelope);assert.deepEqual(Object.keys(claro).sort(),["expiraEm","passe"]);assert.match(claro.passe,/^ctg1\.[a-z0-9]+\.[A-Za-z0-9_-]+$/);
  assert.ok(!Buffer.from(claro.passe.split(".")[2],"base64url").includes(Buffer.from(c.token)));
  assert.ok(!JSON.stringify([...c.store.db]).includes(c.token));
});
test("passe só permite quatro leituras, reconsulta administração inclusive após revogação e valida adulteração/deploy",async()=>{
  const c=contexto(),a=await aparelho(), envelope=await(await c.autorizar(a.pedido)).json();
  const {passe,expiraEm}=await a.receber(envelope);
  assert.equal(expiraEm,Math.floor(instante/1000)+3600);
  for(const rota of ["sites","visao?site=1&periodo=hoje","vivo?site=1","tabela?site=1&nome=origens"]) {
    const n=c.chamadas.length;
    assert.equal((await c.pedir(rota,{credencial:passe,origin:null})).status,200);
    assert.equal(c.chamadas.length,n+1);
    assert.equal(c.chamadas.at(-1),"Bearer "+c.token);
  }
  for(const [rota,metodo] of [["exportar?site=1","GET"],["anotacao","POST"],["iphone/autorizar","POST"],["evento","POST"]])
    assert.equal((await c.pedir(rota,{metodo,credencial:passe})).status,403);
  c.admin(403);assert.equal((await c.pedir("sites",{credencial:passe})).status,403);
  c.admin(503);assert.equal((await c.pedir("sites",{credencial:passe})).status,503);
  c.admin(200);const partes=passe.split(".");const bruto=Buffer.from(partes[2],"base64url");bruto[14]^=1;
  assert.equal((await c.pedir("sites",{credencial:partes[0]+"."+partes[1]+"."+seguro(bruto)})).status,401);
  assert.equal((await c.pedir("sites",{credencial:passe,handler:c.criar({namespace:"deploy-B"})})).status,401);
  assert.equal((await c.pedir("sites",{credencial:passe,handler:c.criar({iphoneAtivo:false})})).status,503);
  assert.equal((await c.autorizar(a.pedido,{handler:c.criar({iphoneAtivo:false})})).status,503);
  assert.equal((await c.pedir("sites",{handler:c.criar({iphoneAtivo:false})})).status,200);
  c.agora(expiraEm*1000);assert.equal((await c.pedir("sites",{credencial:passe})).status,401);
});
test("limite de expiração segue o Firebase; duas instâncias concordam com a chave e sobrevivem à virada UTC",async()=>{
  const c=contexto(60),a=await aparelho(),b=await aparelho();
  const dispositivos=[a,b,a,b];
  const passes=await Promise.all(dispositivos.map(async x=>x.receber(await(await c.autorizar(x.pedido,{handler:c.criar()})).json())));
  assert.equal(c.store.db.size,1);assert.equal(new Set(passes.map(v=>v.passe)).size,4);
  assert.ok(passes.every(v=>v.expiraEm===Math.floor(instante/1000)+60));
  c.agora(instante+10000);
  const novo=await a.receber(await(await c.autorizar(a.pedido)).json());
  assert.equal(c.store.db.size,2); assert.notEqual(novo.passe.split(".")[1],passes[0].passe.split(".")[1]);
  for(const {passe} of [...passes,novo]) assert.equal((await c.pedir("sites",{credencial:passe,handler:c.criar()})).status,200);
  c.agora(instante+60000);assert.equal((await c.pedir("sites",{credencial:novo.passe})).status,401);
  assert.equal((await c.autorizar(a.pedido)).status,401);
});
