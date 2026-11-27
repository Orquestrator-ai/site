import test from "node:test";
import assert from "node:assert/strict";
import {mkdtemp, rm} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {getStore} from "@netlify/blobs";
import {BlobsServer} from "@netlify/blobs/server";
import {expurgarVencidos} from "../servidor/retencao.mjs";
import {criarServico} from "../servidor/nuvem.mjs";

// Passa pelo cliente e pelo servidor HTTP de desenvolvimento oficiais da Netlify.
test("Blobs guarda o evento e o oferece a uma segunda instância do painel", async () => {
  const pasta = await mkdtemp(join(tmpdir(), "contagem-blobs-"));
  const servidor = new BlobsServer({directory:pasta,token:"apenas-teste",logger:()=>{}});
  try {
    const {address} = await servidor.start();
    const siteID = "95ae2612-0000-4000-bd66-69775b168ca7";
    const store = () => getStore({name:"teste",edgeURL:address, uncachedEdgeURL:address,siteID,token:"apenas-teste",consistency:"strong"});
    let instante = Date.now();
    const criar = () => criarServico({store:store(),rotas:{"orquestrator.ai":["/"]},administrador:async()=>200,agora:()=>++instante});
    const url = "https://contagem.teste/api/";
    const headers={origin:"https://orquestrator.ai","user-agent":"Mozilla/5.0 Macintosh Safari/605.1"};
    const req = () => new Request(url+"evento",{method:"POST",headers,body:JSON.stringify({s:"orquestrator.ai",p:"/",t:"pv"})});
    assert.equal((await criar()(req(),{ip:"192.0.2.2"})).status,202);
    assert.equal((await criar()(req(),{ip:"192.0.2.2"})).status,202);
    const listagem=await store().list();
    assert.ok(listagem.blobs.some(b=>b.key.startsWith("eventos/")),JSON.stringify(listagem));
    const resposta = await criar()(new Request(url+"visao?site=1&periodo=hoje",{headers:{authorization:"Bearer teste"}}));
    assert.equal(resposta.status,200);
    assert.equal((await resposta.json()).totais.visualizacoes[0],2);
    const vencido = "eventos/88/2020-01/01-00/000";
    await store().setJSON(vencido,[]);
    await store().setJSON("anotacoes/88",{"2020-01-01":"expirada"});
    const limpeza = await expurgarVencidos(store());
    assert.equal(limpeza.blocos,1);
    assert.equal(limpeza.notas,1);
    assert.equal(await store().get(vencido),null);
    const atual = await criar()(new Request(url+"visao?site=1&periodo=hoje",{headers:{authorization:"Bearer teste"}}));
    assert.equal((await atual.json()).totais.visualizacoes[0],2);
  } finally { await servidor.stop(); await rm(pasta,{recursive:true,force:true}); }
});
