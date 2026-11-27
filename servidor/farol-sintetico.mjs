import {createRemoteJWKSet,jwtVerify} from 'jose';

const issuer='https://token.actions.githubusercontent.com', audience='urn:orquestrator:farol:sonda';
const chaves=createRemoteJWKSet(new URL(issuer+'/.well-known/jwks'),{timeoutDuration:6000});
const origem='Orquestrator-ai/site',ref='refs/heads/main';
const alvos=new Set(['orquestrator.ai','orquestrator.app',...['calculadoragestacional','encontro','escala','hub','medpanel','rcog'].map(x=>x+'.orquestrator.ai')]);
const rejeitar=(status,m)=>Object.assign(new Error(m),{status});
export function conferirIdentidadeFarol(c){
  if(c.repository_id!=='1435087329'||c.repository_owner_id!=='348571377'||c.repository!==origem||c.ref!==ref||
     c.workflow_ref!==origem+'/.github/workflows/farol.yml@'+ref||c.sub!=='repo:Orquestrator-ai@348571377/site@1435087329:ref:'+ref||
     !['schedule','workflow_dispatch','push'].includes(c.event_name)||!/^\d{1,22}$/.test(c.run_id||'')||!/^\d{1,7}$/.test(c.run_attempt||''))
    throw rejeitar(403,'Origem da verificação não autorizada.');
}
async function corpo(req) {
  if(!req.body || Number(req.headers.get('content-length'))>14000)throw rejeitar(400,'Relatório inválido.');
  const reader=req.body.getReader();const blocos=[];let n=0;
  try{while(true){const {done,value}=await reader.read();if(done)break;n+=value.byteLength;if(n>14000){await reader.cancel();throw rejeitar(413,'Relatório muito grande.');} blocos.push(value)}}finally{reader.releaseLock()}
  try{return JSON.parse(Buffer.concat(blocos).toString('utf8'));}catch{throw rejeitar(400,'Relatório inválido.');}
}
function textoValido(s,n){return typeof s==='string'&&s.length>0&&s.length<=n&&!/[\u0000-\u001f\u007f]/.test(s);}
export function conferirRelatorioFarol(b,c,agora=Date.now()){
  if(b?.id!==c.run_id+':'+c.run_attempt||!Number.isSafeInteger(b.em)||b.em<agora-12*60000||b.em>agora+30000||
    !Array.isArray(b.resultados)||b.resultados.length!==alvos.size)throw rejeitar(400,'Identificação ou data da verificação inválida.');
  const vistos=new Set();
  const resultados=b.resultados.map(x=>{
    if(!x||!alvos.has(x.dominio)||vistos.has(x.dominio)||!['operacional','indisponivel','degradado'].includes(x.estado)||
       ![1,2].includes(x.tentativas)||(x.estado!=='operacional'&&x.tentativas!==2)||
       !(x.latenciaMs===null||(Number.isSafeInteger(x.latenciaMs)&&x.latenciaMs>=0&&x.latenciaMs<=90000))||
       !(x.http===null||(Number.isInteger(x.http)&&x.http>=100&&x.http<=599))||
       !textoValido(x.motivo,160)||!textoValido(x.descricao,140))throw rejeitar(400,'Resultado funcional inválido.');
    vistos.add(x.dominio);
    return {dominio:x.dominio,estado:x.estado,tentativas:x.tentativas,latenciaMs:x.latenciaMs,http:x.http,motivo:x.motivo,descricao:x.descricao};
  });
  return {id:b.id,em:b.em,resultados};
}
export async function validarSondaFarol(req){
  const a=req.headers.get('Authorization')||'';
  if(a.length>12000||!/^Bearer [\w.-]+$/.test(a))throw rejeitar(401,'Identidade do monitor necessária.');
  let c;
  try {c=(await jwtVerify(a.slice(7),chaves,{issuer,audience,algorithms:['RS256'],clockTolerance:5,maxTokenAge:'7m',
      requiredClaims:['iat','nbf','exp','sub','repository_id','repository_owner_id','ref','workflow_ref','run_id','run_attempt']})).payload;}
  catch(e){throw rejeitar(e?.code==='ERR_JWKS_TIMEOUT'?503:401,'Não foi possível validar a identidade do monitor.');}
  conferirIdentidadeFarol(c);return conferirRelatorioFarol(await corpo(req),c);
}
