import test from "node:test";
import assert from "node:assert/strict";
import {prepararReserva,consumirReserva,concluirReserva,reservarBytes,solicitarReserva,POLITICA_RESERVA} from "../servidor/farol-reserva.mjs";
import {executarReserva} from "../servidor/farol-rodar-reserva.mjs";
import {criarFarol} from "../servidor/farol.mjs";
import {ALVOS_FAROL} from "../servidor/farol-http.mjs";

const T=Date.UTC(2026,10,27,12),M=60000;
function base(){
 const map=new Map();let seq=0,tempo=T;
 const store={async get(k){return structuredClone(map.get(k)?.data??null);},async getWithMetadata(k){return structuredClone(map.get(k)??null);},
 async setJSON(k,d,o){if(o.onlyIfNew&&map.has(k)||o.onlyIfMatch&&map.get(k)?.etag!==o.onlyIfMatch)return {modified:false};map.set(k,{data:structuredClone(d),etag:String(++seq)});return {modified:true};}};
 const agora=()=>tempo;
 const farol=criarFarol({store,agora});
 const r=()=>ALVOS_FAROL.map(a=>({dominio:a.dominio,estado:"operacional",tentativas:1,http:200,latenciaMs:30}));
 const rel=()=>({id:"teste:"+tempo,em:tempo,resultados:r()});
 const agendar=async()=>{const t=await prepararReserva(store,{agora,forcarPrevia:true});assert.ok(t);return consumirReserva(store,t.ticket,agora);};
 const fake=async()=>({bin:"teste",frio:false,bytes:0});
 return {store,agora,farol,r,rel,agendar,fake,somar:n=>{tempo+=n;}};
}
test("GitHub recente ou monitor não iniciado não aciona reserva; com atraso o ticket é único e não há segredo persistido",async()=>{
 const c=base();assert.equal(await prepararReserva(c.store,{agora:c.agora}),null);
 await c.farol.aplicar("http",c.rel());await c.farol.aplicar("funcional",c.rel());
 c.somar(24*M);assert.equal(await prepararReserva(c.store,{agora:c.agora}),null);c.somar(M);
 const tentativas=await Promise.all([0,1,2].map(()=>prepararReserva(c.store,{agora:c.agora})));
 assert.equal(tentativas.filter(Boolean).length,1);const t=tentativas.find(Boolean);
 assert.ok(!(JSON.stringify(await c.store.get("farol/v1/reserva")).includes(t.ticket)));
 assert.equal(await consumirReserva(c.store,"X".repeat(43),c.agora),null);
 assert.equal((await Promise.all([0,1].map(()=>consumirReserva(c.store,t.ticket,c.agora)))).filter(Boolean).length,1);
 assert.equal(await reservarBytes(c.store,t.id,30*1024*1024),true);assert.equal(await reservarBytes(c.store,t.id,4*1024*1024),false);
});
test("Chrome indisponível, pacote faltante, timeout e falhas de navegação não abrem incidentes",async()=>{
 for(const erro of ["arranque","timeout","nenhuma jornada","quota","rede"]){
  const c=base();await c.farol.aplicar("http",c.rel());const op=await c.agendar();
  const preparar=async()=>{if(erro==="arranque")throw Error("Chromium não inicia");if(erro==="quota")throw Error("Franquia diária do pacote de navegador.");return c.fake();};
  const navegar=async()=>{if(erro==="timeout")return new Promise(()=>{});if(erro==="rede")throw Error("processo indisponível");return c.r().map(x=>({...x,estado:"indisponivel",tentativas:2,http:null}));};
  const r=await executarReserva({store:c.store,op,agora:c.agora,preparar,navegar,limiteMs:20});
  assert.equal(r.positivos,0,erro);
  const p=await c.farol.painel();assert.equal(p.incidentes.length,0,erro);assert.equal(p.transicoes.length,0,erro);assert.equal(p.estado,"desconhecido",erro);
  assert.equal((await c.store.get("farol/v1/estado")).componentes[ALVOS_FAROL[0].dominio].dimensoes.funcional,undefined);
 }
});
test("reserva parcial renova somente positivos, mantém a origem e permite que GitHub e HTTP continuem",async()=>{
 const c=base();await c.farol.aplicar("http",c.rel());const op=await c.agendar();
 const r=await executarReserva({store:c.store,op,agora:c.agora,preparar:c.fake,navegar:async()=>c.r().map((x,i)=>i===2?{...x,estado:"degradado",tentativas:2,http:200}:x)});
 assert.deepEqual(r,{situacao:"parcial",positivos:7});
 let p=await c.farol.painel();assert.equal(p.incidentes.length,0);assert.equal(p.estado,"desconhecido");
 assert.equal(p.componentes[0].checagens.funcional.origem,"netlify-reserva");assert.equal(p.componentes[2].checagens.funcional.estado,"desconhecido");
 c.somar(M);await c.farol.aplicar("funcional",c.rel());p=await c.farol.painel();assert.equal(p.estado,"operacional");
 assert.ok(p.componentes.every(v=>v.checagens.funcional.origem==="github"));assert.equal(await c.farol.saude(),true);
 await assert.rejects(c.farol.aplicar("funcional",{...c.rel(),resultados:c.r().map(r=>({...r,estado:"indisponivel",tentativas:2}))},{origem:"netlify-reserva"}));
});
test("o orçamento reserva antecipadamente o teto do processo, mantém teto diário e expõe esgotamento",async()=>{
 const c=base();
 for(let i=0;i<8;i++){const op=await c.agendar();c.somar(105000);await concluirReserva(c.store,op.id,"infra-indisponivel",c.agora);}
 assert.equal(await prepararReserva(c.store,{agora:c.agora,forcarPrevia:true}),null);
 const res=(await c.farol.painel()).reserva;assert.equal(res.situacao,"limite-diario");assert.equal(res.msHoje,8*105000);
 c.somar(86400000);assert.ok(await prepararReserva(c.store,{agora:c.agora,forcarPrevia:true}));
 const store=base().store;await assert.rejects(solicitarReserva(store,{base:"https://outro.invalid",forcarPrevia:true}));
 await assert.rejects(solicitarReserva(store,{base:"https://orquestrator-contagem.netlify.app",forcarPrevia:true}));
 assert.equal(POLITICA_RESERVA.maxRodadasDia,48);
});

test("duas rodadas independentes repetem o mesmo passo, com cinco controles saudáveis, antes de degradar",async()=>{
 const c=base(),alvo=ALVOS_FAROL[0].dominio,h="a".repeat(24),h2="b".repeat(24);
 const rodar=async({sig=h,positivos=7}={})=>{
   const op=await c.agendar(),r=c.r().map((x,i)=>i>0&&i<=positivos?x:{...x,estado:"degradado",tentativas:2});
   await executarReserva({store:c.store,op,agora:c.agora,preparar:c.fake,navegar:async()=>({resultados:r,assinaturas:{[alvo]:sig}})});
   return c.farol.painel();
 };
 await c.farol.aplicar("http",c.rel());let a=await rodar({positivos:3});assert.equal(a.incidentes.length,0);
 c.somar(26*M);await c.farol.aplicar("http",c.rel());a=await rodar();assert.equal(a.incidentes.length,0);
 c.somar(26*M);await c.farol.aplicar("http",c.rel());a=await rodar({sig:h2});assert.equal(a.incidentes.length,0);
 c.somar(26*M);await c.farol.aplicar("http",c.rel());a=await rodar({sig:h2});
 assert.equal(a.incidentes.length,1);assert.equal(a.incidentes[0].componente,alvo);assert.equal(a.incidentes[0].impacto,"degradado");assert.equal(a.transicoes.filter(t=>t.tipo==="falha").length,1);
 c.somar(M);const op=await c.agendar();await executarReserva({store:c.store,op,agora:c.agora,preparar:c.fake,navegar:async()=>c.r()});
 a=await c.farol.painel();assert.equal(a.incidentes[0].estado,"resolvido");assert.equal((await c.store.get("farol/v1/reserva")).suspeitas[alvo],undefined);
});
test("uma nova prova externa limpa a suspeita; erro interno, passo desconhecido e prazo nunca são prova de quebra",async()=>{
 const c=base(),alvo=ALVOS_FAROL[0].dominio,h="a".repeat(24);
 const rodar=async()=>{
   const op=await c.agendar();const r=c.r().map((v,i)=>i? v:{...v,estado:"degradado",tentativas:2});
   return executarReserva({store:c.store,op,agora:c.agora,preparar:c.fake,navegar:async()=>({resultados:r,assinaturas:{[alvo]:h}})});
 };
 await c.farol.aplicar("http",c.rel());await rodar();c.somar(10*M);await c.farol.aplicar("funcional",c.rel());
 c.somar(26*M);await c.farol.aplicar("http",c.rel());await rodar();assert.equal((await c.farol.painel()).incidentes.length,0);
 const {assinaturaDoPasso}=await import("../servidor/farol-prova-comportamento.mjs");
 const prova={dominio:alvo,http:200,carregou:true,saudavel:true,erro:{name:"TimeoutError",message:"locator.waitFor: Timeout 7500ms exceeded.",stack:"Timeout\n    at async fazer (/var/task/sonda/checar.cjs:41:22)"}};
 assert.match(assinaturaDoPasso(prova),/^[a-f0-9]{24}$/);
 for(const correcao of [{saudavel:false},{http:500},{carregou:false},{erro:{...prova.erro,message:"locator.waitFor: Target page, context or browser has been closed"}},{erro:{...prova.erro,message:"page.goto: Timeout"}},{erro:{...prova.erro,stack:"at newContext (...)"}},{erro:{...prova.erro,message:"unexpected failure"}}]){
   assert.equal(assinaturaDoPasso({...prova,...correcao}),null);
 }
});
test("o mesmo site com HTTP degradado e comportamento comprovado guarda o detalhe funcional, sem aviso duplicado",async()=>{
 const c=base(),alvo=ALVOS_FAROL[0].dominio;const h=c.rel();h.resultados[0]={...h.resultados[0],estado:"indisponivel",http:503,tentativas:2};
 await c.farol.aplicar("http",h);const op=await c.agendar();const r=c.r();r[0]={...r[0],estado:"degradado",tentativas:2};
 await executarReserva({store:c.store,op,agora:c.agora,preparar:c.fake,navegar:async()=>({resultados:r,assinaturas:{[alvo]:"9".repeat(24)}})});
 const p=await c.farol.painel();assert.equal(p.incidentes.length,1);assert.equal(p.componentes[0].checagens.funcional.estado,"degradado");assert.equal(p.transicoes.filter(t=>t.tipo==="falha").length,1);
});
