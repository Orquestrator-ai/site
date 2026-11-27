const fs=require('node:fs/promises');
(async()=>{
 const rel=JSON.parse(await fs.readFile(process.argv[2]||'farol-resultado.json','utf8'));
 const alvo='https://orquestrator-contagem.netlify.app';
 const u=new URL(process.env.ACTIONS_ID_TOKEN_REQUEST_URL);
 if(u.protocol!=='https:'||!u.hostname.endsWith('.actions.githubusercontent.com'))throw Error('Emissor de execução inválido.');
 u.searchParams.set('audience','urn:orquestrator:farol:sonda');
 const cred=await fetch(u,{headers:{Authorization:'Bearer '+process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN},redirect:'error',signal:AbortSignal.timeout(10000)});
 if(!cred.ok)throw Error('O GitHub não autorizou o envio da rodada ('+cred.status+').');
 const {value}=await cred.json();if(typeof value!=='string'||!value)throw Error('Identidade da execução ausente.');
 for(let i=0;;i++){
  const r=await fetch(alvo+'/api/farol/sonda',{method:'POST',headers:{authorization:'Bearer '+value,'content-type':'application/json'},body:JSON.stringify(rel),redirect:'error',signal:AbortSignal.timeout(25000)}).catch(()=>null);
  if(r&&r.ok)break;
  if(r?.status===403){
   // Apenas identificadores públicos da execução; a credencial nunca é exibida.
   const claims=JSON.parse(Buffer.from(value.split('.')[1],'base64url').toString('utf8'));
   const campos=['repository','repository_id','repository_owner_id','ref','workflow_ref','sub','event_name','run_id','run_attempt'];
   console.log('Origem desta execução:',JSON.stringify(Object.fromEntries(campos.map(k=>[k,claims[k]]))));
  }
  if(i>=2||(r&&r.status<500 && r.status!==429))throw Error('O Farol não confirmou o relatório ('+(r?.status||'falha de rede')+').');
  await new Promise(resolve=>setTimeout(resolve,2000*(i+1)));
 }
 const saude=await fetch(alvo+'/api/saude',{redirect:'error',signal:AbortSignal.timeout(10000)});
 if(!saude.ok||(await saude.json()).ok!==true)throw Error('A API de tráfego não confirmou seu armazenamento.');
 const tentativas=process.env.GITHUB_EVENT_NAME==='push'?12:1;
 for(let i=1;i<=tentativas;i++){
  const relogio=await fetch(alvo+'/api/farol/saude',{redirect:'error',signal:AbortSignal.timeout(8000)});
  if(relogio.ok)break;
  if(i===tentativas)throw Error('O agendador de verificações HTTP do Farol não confirmou uma rodada recente.');
  await new Promise(resolve=>setTimeout(resolve,15000));
 }
 console.log('Rodada gravada. A API de tráfego e o agendador do Farol responderam.');
})().catch(e=>{console.error(e.message);process.exitCode=1});
