import test from "node:test";
import assert from "node:assert/strict";
import {ALVOS_FAROL,sondarSites} from "../servidor/farol-http.mjs";
import {criarFarol} from "../servidor/farol.mjs";
import {criarServico} from "../servidor/nuvem.mjs";

const INICIO=Date.parse("2026-11-27T02:59:30Z"),MIN=60000, dom=ALVOS_FAROL[0].dominio;
function blobs(){
  const dados=new Map();let v=0;
  return {dados,async get(k){return structuredClone(dados.get(k)?.data??null);},async getWithMetadata(k){return structuredClone(dados.get(k)??null);},
    async setJSON(k,data,cond){if(cond.onlyIfNew&&dados.has(k)||cond.onlyIfMatch&&dados.get(k)?.etag!==cond.onlyIfMatch)return {modified:false};
      dados.set(k,{data:structuredClone(data),etag:String(++v)});return {modified:true};}};
}
const resultados=()=>ALVOS_FAROL.map(s=>({dominio:s.dominio,estado:"operacional",http:200,latenciaMs:140,tentativas:1}));
function relatorio(id,em,estado="operacional",dominio=dom){
  return {id,em,resultados:resultados().map(x=>x.dominio===dominio && estado!=="operacional"?{...x,estado,tentativas:2,http:503,motivo:"Falha confirmada na verificação."}:x)};
}
test("HTTP consulta apenas oito origens estáticas, valida conteúdo, ignora redirecionamento e confirma falha",async()=>{
  const chamadas=new Map();let ativas=0,pico=0;
  const requisitar=async(url,op)=>{
    const a=ALVOS_FAROL.find(v=>v.url===url);assert.ok(a);
    assert.equal(op.method,"GET");assert.equal(op.redirect,"manual");assert.equal(op.credentials,"omit");
    const n=(chamadas.get(url)||0)+1;chamadas.set(url,n);pico=Math.max(pico,++ativas);
    await new Promise(r=>setImmediate(r));ativas--;
    if(a.siteId===2)return new Response(null,{status:302,headers:{location:"https://fora.invalid/"}});
    if(a.siteId===3)return new Response("<title>Outra página</title>",{headers:{"content-type":"text/html"}});
    if(a.siteId===4 && n===1)throw new Error("falha inicial");
    if(a.siteId===5 && n===2)throw new Error("segunda verificação");
    return new Response("<title>"+a.titulo+"</title><main id=\""+a.marco+"\">conteúdo</main>",{headers:{"content-type":"text/html"}});
  };
  const r=await sondarSites({[ALVOS_FAROL[4].dominio]:"indisponivel"},{requisitar,pausa:async()=>{}});
  assert.equal(chamadas.size,8);assert.ok(pico<=4);
  assert.equal(r[0].tentativas,1);assert.equal(r[1].estado,"indisponivel");assert.equal(r[1].tentativas,2);
  assert.equal(r[2].estado,"degradado");assert.equal(r[2].tentativas,2);assert.equal(r[3].estado,"operacional");
  assert.equal(r[4].estado,"inconclusivo");assert.ok(!JSON.stringify(r).includes("fora.invalid"));
});
test("estado sem amostras, dias locais, expiração de cada dimensão e incidência/recuperação independentes",async()=>{
  const store=blobs();let agora=INICIO;
  const app=criarFarol({store,agora:()=>agora});
  const foto=await app.painel();assert.equal(foto.estado,"desconhecido");assert.equal(foto.componentes.length,8);
  assert.ok(foto.componentes.every(c=>c.historico.length===90 && c.historico.every(d=>d.disponibilidadePct===null && !d.verificacoes)));
  assert.equal(await app.saude(),false);
  await app.aplicar("http",relatorio("a",agora));assert.equal((await app.painel()).estado,"desconhecido");assert.equal(await app.saude(),true);
  await app.aplicar("funcional",relatorio("b",agora));assert.equal((await app.painel()).estado,"operacional");
  agora+=MIN;await app.aplicar("http",relatorio("c",agora,"indisponivel"));
  const baixo=await app.painel();assert.equal(baixo.estado,"indisponivel");assert.equal(baixo.incidentes.length,1);
  assert.equal(baixo.componentes[0].historico.at(-1).dia,"2026-11-27");assert.equal(baixo.componentes[0].historico.at(-2).dia,"2026-11-26");
  assert.equal(baixo.componentes[0].historico.at(-1).indisponiveis,1);
  agora+=MIN;await app.aplicar("funcional",relatorio("d",agora,"degradado"));
  agora+=MIN;await app.aplicar("http",relatorio("e",agora));assert.equal((await app.painel()).estado,"degradado");
  agora+=MIN;await app.aplicar("funcional",relatorio("f",agora));
  const final=await app.painel();assert.equal(final.estado,"operacional");assert.equal(final.incidentes[0].estado,"resolvido");assert.equal(final.incidentes[0].impacto,"indisponivel");
  assert.equal(final.transicoes.filter(x=>x.tipo==="falha").length,1);assert.equal(final.transicoes.filter(x=>x.tipo==="recuperacao").length,1);
  assert.ok(final.incidentes[0].atualizacoes.length>=3);
  agora+=46*MIN;const velho=await app.painel();assert.equal(velho.estado,"desconhecido");assert.ok(velho.atrasado);assert.equal(await app.saude(),false);
});
test("CAS entre instâncias, duplicatas, relatório antigo e fila persistente em ordem mesmo com falha de entrega",async()=>{
  const store=blobs(),envios=[];let agora=INICIO,erro=true;
  const criar=()=>criarFarol({store,agora:()=>agora,entregar:async t=>{envios.push(t.id);if(erro)throw Error("indisponível");}});
  await Promise.all([1,2,3,4].map(()=>criar().aplicar("http",relatorio("1",agora))));
  await criar().aplicar("funcional",relatorio("2",agora));
  agora+=1000;const baixo=relatorio("3",agora,"degradado");
  await Promise.all([criar().aplicar("http",baixo),criar().aplicar("http",baixo)]);
  const ha=await criar().painel();assert.equal(ha.componentes[0].historico.at(-1).verificacoes,3);assert.equal(ha.transicoes.length,1);
  const falha=ha.transicoes[0].id;
  await Promise.all([criar().drenar(),criar().drenar()]);assert.deepEqual(envios,[falha]);
  agora+=1000;await criar().aplicar("http",relatorio("4",agora));
  const rec=(await criar().painel()).transicoes[0].id;
  assert.equal((await criar().aplicar("http",baixo)).aplicado,false);
  await criar().drenar();assert.deepEqual(envios,[falha]);
  erro=false;agora+=31000;await criar().drenar();assert.deepEqual(envios,[falha,falha,rec]);
  await criar().drenar();assert.equal(envios.length,3);
  const invasao={...baixo,id:"5",resultados:[{...baixo.resultados[0],dominio:"fora.invalid"}]};await assert.rejects(criar().aplicar("funcional",invasao),e=>e.status===400);
  await assert.rejects(criar().aplicar("funcional",{...baixo,resultados:[{...baixo.resultados[0],tentativas:1}]}),e=>e.status===400);
});
test("a rodada agendada sonda uma vez por janela; estado sobrevive a uma nova instância",async()=>{
 let chamadas=0,agora=INICIO;const store=blobs();
 const criar=()=>criarFarol({store,agora:()=>agora,sondar:async()=>{chamadas++;return resultados();}});
 await criar().monitorar();await criar().monitorar();assert.equal(chamadas,1);assert.equal((await criar().painel()).ultimaChecagemEm,agora);
 agora+=5*MIN;await criar().monitorar();assert.equal(chamadas,2);
});
test("roteador exige a identidade correta para painel, gestão de avisos, recibo e escrita OIDC",async()=>{
 const store=blobs();let agora=INICIO,verificarOIDC=0;const chamadas=[];
 const key="e30."+Buffer.from(JSON.stringify({sub:"admin-teste"})).toString("base64url")+".teste";
 const push=new Proxy({},{get:(_,op)=>op==="then"?undefined:async(...args)=>{chamadas.push([op,...args]);return {ok:true};}});
 const serv=criarServico({store,agora:()=>agora,rotas:{},pushFarol:push,administrador:async h=>h==="Bearer "+key?200:403,validarSonda:async r=>{
   verificarOIDC++;if(r.headers.get("authorization")!=="Bearer oidc-valido")throw Object.assign(Error("negado"),{status:401});return relatorio("oidc",agora);}});
 const req=(rota,{bearer,origem,body,method=body?"POST":"GET"}={})=>{const headers={};if(bearer)headers.authorization="Bearer "+bearer;if(origem)headers.origin=origem;
   return serv(new Request("https://servico.ficticio/api/"+rota,{headers,method,body:body?JSON.stringify(body):undefined}));};
 assert.equal((await req("farol")).status,401);assert.equal((await req("farol",{bearer:key})).status,200);assert.equal((await req("farol",{bearer:"ctg1.123.algum"})).status,403);
 assert.equal((await req("farol/saude")).status,503);
 assert.equal((await req("farol/sonda",{bearer:key,body:{}})).status,401);
 assert.equal((await req("farol/sonda",{bearer:"oidc-valido",body:{}})).status,202);assert.equal(verificarOIDC,2);
 for(const op of ["inscrever","remover","testar","estado","recebido"]){
   assert.equal((await req("farol/avisos/"+op,{bearer:key,body:{}})).status,403);
   assert.equal((await req("farol/avisos/"+op,{origem:"https://orquestrator.ai",bearer:op==="recebido"?undefined:key,body:{id:"teste"}})).status,200);
 }
 assert.equal((await req("farol/avisos/chave",{bearer:key})).status,200);
 assert.ok(chamadas.some(c=>c[0]==="inscrever"&&c[1]==="admin-teste"&&c[3]===key));
 assert.equal((await req("farol/avisos/estado",{bearer:"ctg2s.abc",origem:"https://orquestrator.ai",body:{}})).status,403);
});

test("a primeira sonda funcional atualiza o horário público antes da estreia do agendador HTTP",async()=>{
 const f=criarFarol({store:blobs(),agora:()=>INICIO});await f.aplicar("funcional",relatorio("browser",INICIO));
 const v=await f.painel();assert.equal(v.ultimaChecagemEm,INICIO);assert.equal(v.ultimaRodadaHttpEm,null);assert.equal(v.estado,"desconhecido");assert.equal(await f.saude(),false);
});
