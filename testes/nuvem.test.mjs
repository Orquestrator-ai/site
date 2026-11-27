import assert from "node:assert/strict";
import test from "node:test";
import {criarServico, listarSites} from "../servidor/nuvem.mjs";

const dominio = "orquestrator.ai";
const site = "https://" + dominio;
const token = "Bearer admin-de-teste";
const dadosGeo = {ip: "192.0.2.10", geo: {country:{code:"BR"},subdivision:{code:"SP"},city:"Cidade que não deve ficar"}};
const agente = "Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) Version/26.0 Mobile Safari/605.1";

function armazenamento() {
  const dados = new Map(); let revisao = 0;
  return {dados,
    async getWithMetadata(key) { return dados.has(key) ? structuredClone(dados.get(key)) : null; },
    async get(key) {return structuredClone(dados.get(key)?.data ?? null);},
    async setJSON(key, data, options={}) {
      if (options.onlyIfNew && dados.has(key) || options.onlyIfMatch && dados.get(key)?.etag !== options.onlyIfMatch) return {modified:false};
      const etag = String(++revisao); dados.set(key,{etag,data:structuredClone(data)}); return {etag,modified:true};
    },
    async *list({prefix}) {yield {blobs:[...dados].filter(([key])=>key.startsWith(prefix)).map(([key,v])=>({key,etag:v.etag}))};}
  };
}
function contexto() {
  let tempo = Date.parse("2026-11-27T14:00:00Z");
  const store = armazenamento();
  const criar = () => criarServico({store, rotas:Object.fromEntries(["orquestrator.ai","orquestrator.app",...["medpanel","calculadoragestacional","encontro","escala","hub","rcog"].map(s=>s+".orquestrator.ai")].map(dom=>[dom,["/","/store/","/aula.html"]])), administrador:async t=> t===token ? 200 : 403, agora:()=>++tempo});
  function req(path, data, headers={}, outroMetodo) {
    return new Request("https://contagem.test/api/"+path, {
      headers:{origin:site,"user-agent":agente,...headers},
      method:outroMetodo || (data===undefined?"GET":"POST"),
      body:data === undefined ? undefined : JSON.stringify(data)
    });
  }
  const app = criar();
  const pv = (extras={}, alternativa=app) => alternativa(req("evento",{t:"pv",s:dominio,p:"/store/",...extras}),dadosGeo);
  const painel = (endpoint,app=criar())=>app(req(endpoint,undefined,{authorization:token}),dadosGeo);
  return {store,app,criar,req,pv,painel};
}

test("admin Firebase exclusivo, origens, contrato das propriedades cadastradas e CORS nativo", async()=>{
  const {app,req,painel}=contexto();
  assert.equal((await app(req("sites"))).status,401);
  assert.equal((await app(req("sites",undefined,{authorization:"Bearer comum"}))).status,403);
  assert.equal((await app(req("sites",undefined,{origin:"https://outro.com",authorization:token}))).status,403);
  const pre=await app(req("visao",undefined,{}, "OPTIONS"));
  assert.equal(pre.status,204);assert.match(pre.headers.get("access-control-allow-headers"),/Authorization/);
  const sites=await (await painel("sites")).json();assert.equal(sites.length,10);assert.equal(sites[7].dom,"rcog.orquestrator.ai");assert.equal(sites[3].dom,"calculadoragestacional.orquestrator.ai");
  const nativo = await app(new Request("https://contagem.test/api/sites",{headers:{Authorization:token}}));
  assert.equal(nativo.status,200);
});

test("coleta concorrente e repetida, persistência após cold start, sem identificadores ou textos arbitrários", async()=>{
  const {store,criar,pv,painel}=contexto(), outro=criar();
  const evento={r:"https://www.google.com/caminho-privado?consulta=segredo",q:"?nome=Paciente Exemplo",tt:"Paciente Exemplo",u:"https://site/?nome=Paciente",x:"privado"};
  const ids=Array.from({length:6},(_,i)=>"12345678-b203-46e0-a138-12345678901"+i);
  const respostas=await Promise.all(ids.map((id,i)=>pv({...evento,id},i%2 ? outro : criar())));
  assert.ok(respostas.every(r=>r.status===202));
  assert.equal((await pv({...evento,id:ids[0]})).status,202);
  const v=await(await painel("visao?site=1&periodo=hoje")).json();
  assert.equal(v.totais.visitantes[0],1);assert.equal(v.totais.visualizacoes[0],6);assert.ok(v.desde);
  assert.equal((await(await painel("visao?site=2&periodo=hoje")).json()).totais.visitantes[0],0);
  const vivo=await(await painel("vivo?site=1")).json();assert.equal(vivo.agora,1);assert.equal(vivo.visualizacoesHora,6);assert.equal(vivo.uf.SP,1);
  const origens=await(await painel("tabela?site=1&nome=origens")).json();assert.equal(origens.linhas[0].rotulo,"Google");
  const exportacao=await painel("exportar?site=1");assert.match(await exportacao.text(),/Google/);
  const dump=JSON.stringify([...store.dados.values()]);
  for(const texto of ["192.0.2.10","Mozilla","Paciente","privado","Cidade que não deve ficar","?consulta"]) assert.ok(!dump.includes(texto),texto);
});
test("recusa caminhos sensíveis, domínio trocado, metadados de conversão e payloads excessivos",async()=>{
  const {app,req,pv}=contexto();
  assert.equal((await pv({p:"/store/?nome=Bauer"})).status,400);
  assert.equal((await pv({s:"orquestrator.app"})).status,403);
  assert.equal((await pv({t:"ev",e:"texto-pessoal"})).status,400);
  assert.equal((await pv({tt:"x".repeat(5000)})).status,413);
  const res=await app(req("evento",{s:dominio,p:"/",t:"pv"},{origin:"https://orquestrator.ai.outro.tld"}),dadosGeo);
  assert.equal(res.status,403);
});
test("uma anotação administrativa persiste, aparece no gráfico e permite remoção",async()=>{
  const {app,req,painel}=contexto(), data={site:1,dia:"2026-11-27",texto:"Lançamento"};
  assert.equal((await app(req("anotacao",data))).status,401);
  assert.equal((await app(req("anotacao",data,{authorization:token}))).status,200);
  const visao=await(await painel("visao?site=1&periodo=7d")).json();
  assert.ok(visao.marcos.some(m=>m.texto==="Lançamento"));
  assert.equal((await app(req("anotacao",{...data,texto:""},{authorization:token}))).status,200);
  assert.equal((await(await painel("visao?site=1&periodo=7d")).json()).marcos.length,0);
});

test("novos subdomínios mantêm IDs estáveis e recebem aulas .html sem cruzar domínios", async () => {
  const a = listarSites({"novo.orquestrator.ai":[], "rcog.orquestrator.ai":[]});
  const b = listarSites({"antes.orquestrator.ai":[], "novo.orquestrator.ai":[], "rcog.orquestrator.ai":[]});
  assert.equal(a[0].id,8);
  assert.equal(a.find(v=>v.dom.startsWith("novo")).id,b.find(v=>v.dom.startsWith("novo")).id);
  assert.throws(()=>listarSites({"orquestrator.ai.invalido":[]}));
  const {app,req,painel}=contexto(), dom="rcog.orquestrator.ai";
  const aceita=await app(req("evento",{t:"pv",s:dom,p:"/aula.html"},{origin:"https://"+dom}),dadosGeo);
  assert.equal(aceita.status,202);
  assert.equal((await(await painel("visao?site=8&periodo=hoje&filtro=/aula.html")).json()).totais.visualizacoes[0],1);
  assert.equal((await(await painel("visao?site=1&periodo=hoje&filtro=/aula.html")).json()).totais.visualizacoes[0],0);
});

test("saúde exige uma leitura de Blobs, sem gravar ou revelar dados e sem repetir sondas simultâneas", async () => {
  for (const disponivel of [false,true]) {
    let sondas=0, agora=0;
    const app=criarServico({rotas:{}, agora:()=>agora, store:{async getMetadata(key) {
      assert.equal(key,"controle/saude"); sondas++;
      if (!disponivel) throw new Error("acesso negado");
      return null;
    }}});
    const consultar=()=>app(new Request("https://contagem.test/api/saude"));
    const respostas=await Promise.all([consultar(),consultar()]);
    assert.deepEqual(respostas.map(r=>r.status),[disponivel?200:503,disponivel?200:503]);
    assert.equal(sondas,1);
    agora+=16000;await consultar();assert.equal(sondas,2);
  }
});
