import test from "node:test";
import assert from "node:assert/strict";
import {criarServico} from "../servidor/nuvem.mjs";

const hora=Date.parse("2026-11-27T13:32:00Z"), dia=86400000;
function fixture(){
 const docs=new Map();let revisao=0;
 async function setJSON(k,data,o={}){
   if(o.onlyIfNew&&docs.has(k)||o.onlyIfMatch&&docs.get(k)?.etag!==o.onlyIfMatch)return {modified:false};
   docs.set(k,{etag:String(++revisao),data:structuredClone(data)});return {modified:true};
 }
 const store={setJSON,async get(k){return structuredClone(docs.get(k)?.data??null);},async getWithMetadata(k){return structuredClone(docs.get(k)??null);},
   async *list({prefix}){yield {blobs:[...docs].filter(([k])=>k.startsWith(prefix)).map(([key,x])=>({key,etag:x.etag}))};}};
 // Formato histórico de produção: nenhum evento traz o ID das novas propriedades.
 const eventos=[];
 function evento(segundos,tipo,v,caminho,extra={}){eventos.push({site_id:1,instante:hora+segundos*1000,tipo,visitante:v,caminho,origem:"direto",pais:"BR",uf:"SP",cidade:null,aparelho:"celular",navegador:"Safari",sistema:"iOS",...extra});}
 evento(-95*dia/1000,"pv","antigo","/");evento(-64*dia/1000,"pv","antigo","/medicina/aula.html");
 evento(-63*dia/1000,"pv","antigo","/store/app/");evento(-dia/1000,"pv","antigo","/storefront/");
 evento(-290,"pv","A","/");evento(-280,"fim","A","/",{duracao_s:10});
 evento(-260,"pv","A","/store/",{origem:"google"});evento(-252,"fim","A","/store/",{duracao_s:8});
 evento(-245,"pv","A","/storefront/");evento(-145,"fim","A","/storefront/",{duracao_s:100});
 evento(-135,"pv","A","/store/app/");evento(-125,"fim","A","/store/app/",{duracao_s:10});
 evento(-124,"ev","A","/store/app/",{meta:"download"});
 evento(-120,"pv","A","/medicina/");evento(-117,"fim","A","/medicina/",{duracao_s:3});
 evento(-110,"pv","A","/medicinal/");evento(-50,"pv","B","/store",{origem:"instagram"});
 evento(-45,"fim","B","/store",{duracao_s:5});evento(-25,"pv","C","/medicina/aula.html");
 evento(-20,"pv","D","/stores");evento(-18,"pv","E","/medicina",{site_id:3,origem:"youtube"});
 const buckets=new Map();for(const e of eventos){const dt=new Date(e.instante).toISOString();const k="eventos/"+e.site_id+"/"+dt.slice(0,7)+"/"+dt.slice(8,10)+"-"+dt.slice(11,13)+"/000";if(!buckets.has(k))buckets.set(k,[]);buckets.get(k).push(e);}
 for(const [k,ev] of buckets)setJSON(k,ev);
 setJSON("inicio/1",eventos[0].instante);setJSON("inicio/3",eventos.at(-1).instante);
 const snapshot=()=>JSON.stringify([...docs].filter(([k])=>k.startsWith("eventos/")));
 const rotas={"orquestrator.ai":[...new Set(eventos.filter(e=>e.site_id===1).map(e=>e.caminho))],"medpanel.orquestrator.ai":["/medicina"],"orquestrator.app":["/"]};
 function instancia(){return criarServico({store,rotas,agora:()=>hora,administrador:async()=>200});}
 const req=(path,dado,handler=instancia(),origin="https://orquestrator.ai")=>handler(new Request("https://contagem.test/api/"+path,{headers:{origin,authorization:"Bearer fixture"},method:dado?"POST":"GET",body:dado?JSON.stringify(dado):undefined}));
 const get=async path=>{const r=await req(path);assert.equal(r.status,200,path);return r.json();};
 return {req,get,docs,snapshot,instancia};
}
test("histórico anterior ao deploy, ativos, totais e duração dentro da área sem duplicar o domínio nem misturar subdomínios",async()=>{
 const {req,get,snapshot}=fixture(),antes=snapshot();
 const sites=await get("sites");const map=Object.fromEntries(sites.map(s=>[s.id,s]));
 assert.equal(map[1].agora,4);assert.equal(map[3].agora,1);assert.equal(map[9].agora,2);assert.equal(map[10].agora,2);
 assert.equal(map[9].dom,"orquestrator.ai/store");assert.equal(map[10].dom,"orquestrator.ai/medicina");
 const [pai,loja,med]=await Promise.all([1,9,10].map(id=>get("visao?site="+id+"&periodo=hoje")));
 assert.equal(pai.totais.visualizacoes[0],9);assert.equal(pai.totais.visitantes[0],4);
 assert.equal(loja.totais.visualizacoes[0],3);assert.equal(loja.totais.visitantes[0],2);assert.equal(loja.totais.duracao[0],11.5);assert.equal(loja.totais.rejeicao[0],.5);
 assert.equal(med.totais.visualizacoes[0],2);assert.equal(med.totais.visitantes[0],2);
 assert.equal(loja.desde,hora-63*dia);assert.equal(med.desde,hora-64*dia);assert.equal(pai.desde,hora-95*dia);
 assert.equal((await get("visao?site=9&periodo=hoje&filtro=/store/app/")).totais.visualizacoes[0],1);
 assert.equal((await req("visao?site=9&filtro=/storefront/")).status,400);
 assert.equal((await req("tabela?site=10&nome=paginas&filtro=/store/")).status,400);
 const v=await get("vivo?site=9");assert.equal(v.agora,2);assert.equal(v.visualizacoesHora,3);assert.equal(v.visitantesHoje,2);assert.deepEqual(Object.keys(v.pag).sort(),["/store","/store/","/store/app/"]);
 assert.equal(v.uf.SP,2);assert.ok(v.feed.every(l=>l.pag==="/store"||l.pag.startsWith("/store/")));
 const origens=(await get("tabela?site=9&periodo=hoje&nome=origens")).linhas;assert.deepEqual(origens.map(x=>x.rotulo).sort(),["Google","Instagram"]);
 const metas=(await get("tabela?site=9&periodo=hoje&nome=metas")).linhas;assert.equal(metas[0].chave,"download");
 const r=await req("exportar?site=9&periodo=hoje");const csv=await r.text();assert.ok(csv.includes('"/store/app/"'));assert.ok(!csv.includes("storefront")&&!csv.includes("/medicina"));assert.match(r.headers.get("content-disposition"),/orquestrator.ai-store-/);
 assert.equal((await req("evento",{t:"pv",s:"orquestrator.ai/store",p:"/store/"})).status,403);
 assert.equal((await req("evento",{t:"pv",s:"orquestrator.ai/store",p:"/store/"},undefined,"https://orquestrator.ai/store")).status,403);
 assert.equal(snapshot(),antes);
});
test("anotações por seção ficam isoladas e não criam registros de tráfego artificiais",async()=>{
 const {req,get,docs}=fixture();
 for(const [site,texto] of [[1,"portal"],[9,"store"],[10,"medicina"]])assert.equal((await req("anotacao",{site,dia:"2026-11-27",texto})).status,200);
 for(const [site,texto] of [[1,"portal"],[9,"store"],[10,"medicina"]]){
  const v=await get("visao?site="+site+"&periodo=7d");assert.deepEqual(v.marcos.filter(m=>m.manual).map(m=>m.texto),[texto]);
 }
 assert.ok([...docs.keys()].every(k=>!k.startsWith("eventos/9/")&&!k.startsWith("eventos/10/")));
});
