import test from "node:test";
import assert from "node:assert/strict";
import {mkdtemp,rm} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {getStore} from "@netlify/blobs";
import {BlobsServer} from "@netlify/blobs/server";
import {criarFarol} from "../servidor/farol.mjs";
import {ALVOS_FAROL} from "../servidor/farol-http.mjs";

test("duas instâncias do Farol preservam incidentes, histórico e a fila no Blobs HTTP oficial",async()=>{
 const pasta=await mkdtemp(join(tmpdir(),"farol-blobs-")),servidor=new BlobsServer({directory:pasta,token:"apenas-teste",logger:()=>{}});
 try{
  const {address}=await servidor.start();
  const store=()=>getStore({name:"trafego-preview-teste",edgeURL:address,uncachedEdgeURL:address,siteID:"95ae2612-0000-4000-bd66-69775b168ca7",token:"apenas-teste",consistency:"strong"});
  let tempo=Date.parse("2026-11-27T12:00:00Z");
  const entregues=[];
  const novo=()=>criarFarol({store:store(),agora:()=>tempo,entregar:async e=>entregues.push(e.id)});
  const resultados=ALVOS_FAROL.map(a=>({dominio:a.dominio,estado:"operacional",tentativas:1,http:200,latenciaMs:5}));
  const rodada=(id,lista=resultados)=>({id,em:tempo,resultados:lista});
  await novo().aplicar("http",rodada("http-1"));await novo().aplicar("funcional",rodada("browser-1"));
  tempo+=300000;await novo().aplicar("http",rodada("http-2",resultados.map((s,i)=>i===1?{...s,estado:"indisponivel",tentativas:2,http:503,motivo:"HTTP 503."}:s)));
  const p=await novo().painel();assert.equal(p.estado,"indisponivel");assert.equal(p.incidentes.length,1);
  await novo().drenar();assert.deepEqual(entregues,[p.transicoes[0].id]);
  await novo().drenar();assert.equal(entregues.length,1);
  tempo+=300000;await novo().aplicar("http",rodada("http-3"));
  const ok=await novo().painel();assert.equal(ok.estado,"operacional");assert.equal(ok.transicoes[0].tipo,"recuperacao");
  assert.equal(ok.incidentes[0].estado,"resolvido");
 }finally{await servidor.stop();await rm(pasta,{recursive:true,force:true});}
});
