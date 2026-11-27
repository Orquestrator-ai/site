import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createECDH,randomBytes} from 'node:crypto';
import {criarPushFarol} from '../servidor/farol-push.mjs';
import {conferirIdentidadeFarol,conferirRelatorioFarol} from '../servidor/farol-sintetico.mjs';

function memoria(){
 const dados=new Map();let rev=0;
 return {async get(k){return structuredClone(dados.get(k)?.data??null)},async getWithMetadata(k){return structuredClone(dados.get(k)??null)},
 async setJSON(k,v,op){const a=dados.get(k);if(op?.onlyIfNew&&a||op?.onlyIfMatch&&a?.etag!==op.onlyIfMatch)return {modified:false};dados.set(k,{data:structuredClone(v),etag:String(++rev)});return {modified:true}}};
}
function sub(sufixo='um'){const k=createECDH('prime256v1');k.generateKeys();return {endpoint:'https://web.push.apple.com/Q'+sufixo,keys:{p256dh:k.getPublicKey().toString('base64url'),auth:randomBytes(16).toString('base64url')}};}
const admin={criar:async()=>200,conferir:async()=>200};
test('VAPID estável em instâncias concorrentes e inscrições privadas por administrador',async()=>{
 const store=memoria(),a=criarPushFarol({store,marcadores:admin}),b=criarPushFarol({store,marcadores:admin});
 const chaves=await Promise.all([a.chavePublica(),b.chavePublica()]);assert.deepEqual(chaves[0],chaves[1]);assert.equal(chaves[0].publicKey.length,87);
 const s=sub(),{id}=await a.inscrever('owner',{subscription:s},'token-de-teste');
 assert.equal((await b.inscrever('owner',{subscription:s},'token-de-teste')).id,id);
 await assert.rejects(b.estado('outra',{id}),e=>e.status===404);await assert.rejects(b.remover('outra',{id}),e=>e.status===404);
 await assert.rejects(b.inscrever('owner',{subscription:{...s,endpoint:'https://example.org/a'}},'teste'),e=>e.status===400);
 assert.deepEqual(await a.remover('owner',{id}),{ativo:false});
});
test('envio de teste e recibo assíncrono verificável, com limite de frequência',async()=>{
 const store=memoria(),msgs=[],a=criarPushFarol({store,marcadores:admin,enviar:async(s,body)=>msgs.push(JSON.parse(body))});
 const {id}=await a.inscrever('owner',{subscription:sub()},'teste');const res=await a.testar('owner',{id});
 assert.equal(res.enviado,true);assert.equal((await a.estado('owner',{id})).recebidoEm,null);
 const payload=msgs[0];assert.equal(payload.tipo,'teste');assert.equal(payload.id,res.testeId);
 await a.recebido({recibo:id+'.'+randomBytes(32).toString('base64url')});assert.equal((await a.estado('owner',{id})).recebidoEm,null);
 await a.recebido({recibo:payload.recibo});assert.ok((await a.estado('owner',{id})).recebidoEm);
 await assert.rejects(a.testar('owner',{id}),e=>e.status===429);
});
test('falha, recuperação, retry parcial e inscrição revogada ou expirada',async()=>{
 let agora=100000, falhar=true;const store=memoria(),recebidos=[],admins=new Set(['a','b','revogado','expirado']);
 const a=criarPushFarol({store,agora:()=>agora,marcadores:{criar:async()=>200,conferir:async uid=>admins.has(uid)?200:403},enviar:async(s,msg)=>{
  if(s.endpoint.endsWith('expirado'))throw Object.assign(Error(),{statusCode:410});
  if(s.endpoint.endsWith('b')&&falhar)throw Object.assign(Error(),{statusCode:503});
  recebidos.push([s.endpoint,JSON.parse(msg).tipo]);}});
 for(const uid of admins)await a.inscrever(uid,{subscription:sub(uid)},'teste');admins.delete('revogado');
 const f={id:'inc1-falha',dominio:'orquestrator.ai',tipo:'falha',em:++agora};
 await assert.rejects(a.entregar(f),e=>e.status===503);assert.equal(recebidos.length,1);falhar=false;agora+=26000;
 await a.entregar(f);await a.entregar(f);assert.equal(recebidos.length,2);
 await a.entregar({...f,id:'inc1-volta',tipo:'recuperacao',em:++agora});assert.deepEqual(recebidos.map(r=>r[1]).sort(),['falha','falha','recuperacao','recuperacao']);
});
test('relatório exige as oito jornadas da execução e duas tentativas nas falhas',()=>{
 const c={repository_id:'1435087329',repository_owner_id:'348571377',repository:'Orquestrator-ai/site',ref:'refs/heads/main',workflow_ref:'Orquestrator-ai/site/.github/workflows/farol.yml@refs/heads/main',sub:'repo:Orquestrator-ai@348571377/site@1435087329:ref:refs/heads/main',event_name:'schedule',run_id:'123',run_attempt:'1'};
 conferirIdentidadeFarol(c);assert.throws(()=>conferirIdentidadeFarol({...c,event_name:'pull_request'}));
 const dom=['orquestrator.ai','orquestrator.app',...['calculadoragestacional','encontro','escala','hub','medpanel','rcog'].map(x=>x+'.orquestrator.ai')];
 const rel={id:'123:1',em:Date.now(),resultados:dom.map(dominio=>({dominio,estado:'operacional',http:200,tentativas:1,motivo:'Conferido',descricao:'Jornada pública',latenciaMs:50}))};
 assert.equal(conferirRelatorioFarol(rel,c).resultados.length,8);
 assert.throws(()=>conferirRelatorioFarol({...rel,resultados:rel.resultados.slice(1)},c));
 rel.resultados[0].estado='degradado';assert.throws(()=>conferirRelatorioFarol(rel,c));rel.resultados[0].tentativas=2;conferirRelatorioFarol(rel,c);
});
