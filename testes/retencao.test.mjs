import test from "node:test";
import assert from "node:assert/strict";
import {expurgarVencidos,inicioDaRetencao} from "../servidor/retencao.mjs";

function blobsFalsos(chaves,anotacoes) {
  const apagados=[],listagens=[], notas=new Map(Object.entries(anotacoes));
  const conteudo = new Set(chaves), revisao=()=>"r1";
  return {apagados,listagens,notas,conteudo,
    async *list({prefix,directories}){
      listagens.push({prefix,directories});
      const itens=[...conteudo,...notas.keys()].filter(k=>k.startsWith(prefix));
      if (directories) yield {blobs:[],directories:[...new Set(itens.filter(k=>k.slice(prefix.length).includes("/")).map(k=>prefix+k.slice(prefix.length).split("/")[0]))]};
      else yield {blobs:itens.map(key=>({key})),directories:[]};
    },
    async delete(key){apagados.push(key);conteudo.delete(key);},
    async getWithMetadata(key){return notas.has(key)?{etag:revisao(),data:structuredClone(notas.get(key))}:null;},
    async setJSON(key,data,{onlyIfMatch}){assert.equal(onlyIfMatch,revisao());notas.set(key,data);return {modified:true};}
  };
}
test("a retenção vira no mês civil de São Paulo e preserva dois anos completos para comparação",()=>{
  assert.equal(inicioDaRetencao(Date.parse("2026-12-01T02:59Z")),"2024-11-01");
  assert.equal(inicioDaRetencao(Date.parse("2026-12-01T03:00Z")),"2024-12-01");
});
test("limpeza em lotes reinicia após o limite, inclui site desativado, mantém blocos novos e não lista eventos vigentes",async()=>{
  const store=blobsFalsos(["eventos/1/2024-10/31-23/000","eventos/1/2024-10/31-23/001","eventos/1/2024-11/01-00/000","eventos/499/2024-09/01-10/000"],
    {"anotacoes/1":{"2024-10-03":"anterior","2024-11-01":"vigente"},"anotacoes/88":{"2024-04-01":"apenas notas"}});
  const data=Date.parse("2026-11-27T16:00:00Z");
  const primeira=await expurgarVencidos(store,{data,maxBlocos:1});
  assert.equal(primeira.blocos,1);assert.equal(primeira.pendente,true);
  const segunda=await expurgarVencidos(store,{data});
  assert.equal(segunda.blocos,2);assert.equal(segunda.pendente,false);
  assert.deepEqual([...store.conteudo],["eventos/1/2024-11/01-00/000"]);
  assert.deepEqual(store.notas.get("anotacoes/1"),{"2024-11-01":"vigente"});
  assert.deepEqual(store.notas.get("anotacoes/88"),{});
  assert.ok(!store.listagens.some(l=>l.prefix==="eventos/1/2024-11/"));
});
