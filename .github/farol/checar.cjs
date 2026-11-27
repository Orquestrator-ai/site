// O monitor navega apenas nas oito origens cadastradas. Não entra em contas, envia formulários ou alimenta a contagem.
const {chromium}=require('playwright-core');
const {setTimeout:aguardar}=require('node:timers/promises');
const fs=require('node:fs/promises');
const assert=require('node:assert/strict');
const alvos=[
 ['orquestrator.ai','Abre uma ficha da Store e confere o acesso à Calculadora na página Medicina.'],
 ['orquestrator.app','Abre a apresentação do Chat a partir do site do aplicativo.'],
 ['calculadoragestacional.orquestrator.ai','Preenche uma DUM de teste e confere a DPP calculada.'],
 ['encontro.orquestrator.ai','Avança o calendário da página de agendamento.'],
 ['escala.orquestrator.ai','Abre a seção que apresenta a semana de plantões.'],
 ['hub.orquestrator.ai','Expande a lista de documentos da unidade.'],
 ['medpanel.orquestrator.ai','Alterna a visibilidade do painel demonstrativo.'],
 ['rcog.orquestrator.ai','Marca um item do escore e confere a soma e a limpeza.']
];
async function fazer(p,d){
 if(d==='orquestrator.ai'){
  await p.locator('a[href="/store/"]:visible').first().click();await p.waitForURL('**/store/');
  await p.locator('a[href="/store/cofre/"]:visible').first().click();await p.waitForURL('**/store/cofre/');
  await p.getByRole('heading',{name:/cofre/i}).first().waitFor();
  const med=await p.goto('https://orquestrator.ai/medicina/',{waitUntil:'domcontentloaded'});assert.ok(med?.ok());
  await p.locator('a[href="https://calculadoragestacional.orquestrator.ai/"]:visible').first().waitFor();return;
 }
 if(d==='orquestrator.app'){
  await p.locator('a[href="/chat/"]:visible').first().click();await p.waitForURL('**/chat/');
  await p.getByRole('heading',{name:/chat/i}).first().waitFor();return;
 }
 if(d.startsWith('calculadoragestacional.')){
  const campo=p.locator('#ig-dum'),seletor=p.getByText('DUM',{exact:true}).first();
  await p.waitForLoadState('load');
  for(let i=0;i<4&&!await campo.isVisible();i++){await seletor.click();await campo.waitFor({timeout:1200}).catch(()=>{});}
  await campo.fill('');await campo.pressSequentially('01032026');assert.equal(await campo.inputValue(),'01/03/2026');
  await p.getByText('06/12/2026',{exact:true}).first().waitFor();return;
 }
 if(d.startsWith('encontro.')){
  const grupo=p.getByRole('group',{name:'Escolha o dia'});
  const meses=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  const titulo=grupo.locator('p[aria-live="polite"]').first();
  await grupo.getByText(/(?:19|20|21)\d{2}/).first().waitFor();
  const partes=(await titulo.innerText()).trim().toLocaleLowerCase('pt-BR').split(/\s+/);
  const mes=meses.indexOf(partes[0]),ano=Number(partes.at(-1));assert.ok(mes>=0 && Number.isInteger(ano));
  const esperado=meses[(mes+1)%12]+' '+(ano+Number(mes===11));
  await grupo.getByRole('button',{name:/próximo mês|mês seguinte/i}).first().click();
  await p.waitForFunction(t=>document.querySelector('[role="group"][aria-label="Escolha o dia"] p[aria-live="polite"]')?.textContent.trim().toLowerCase()===t,esperado);return;
 }
 if(d.startsWith('escala.')){
  await p.locator('a[href="#semana"]:visible').first().click();await p.waitForURL('**/#semana');await p.locator('#semana').waitFor();return;
 }
 if(d.startsWith('hub.')){
  const b=p.getByRole('button',{name:/Documentos da unidade/i}).first();await b.waitFor();const antes=await b.getAttribute('aria-expanded');
  assert.ok(['true','false'].includes(antes));await b.click();
  await p.waitForFunction(a=>[...document.querySelectorAll('button[aria-expanded]')].some(b=>/Documentos da unidade/i.test(b.textContent)&&b.getAttribute('aria-expanded')!==a),antes);return;
 }
 if(d.startsWith('medpanel.')){
  const b=p.getByRole('button',{name:/mostrar ou esconder o painel/i}).first();await b.waitFor();const antes=await b.getAttribute('aria-pressed');assert.ok(['true','false'].includes(antes));
  await b.click();await p.waitForFunction(a=>[...document.querySelectorAll('button[aria-label]')].some(b=>/mostrar ou esconder o painel/i.test(b.getAttribute('aria-label'))&&b.getAttribute('aria-pressed')!==a),antes);return;
 }
 const cb=p.locator('input.score[data-points]').first(),total=p.locator('#total');
 const pontos=Number(await cb.getAttribute('data-points'));assert.ok(pontos>0);await cb.check();await p.waitForFunction(n=>Number(document.querySelector('#total').textContent)===n,pontos);
 await p.locator('#clear').click();assert.equal((await total.textContent()).trim(),'0');
}
async function executar(b,dominio,descricao,observar,opcoesDoRunner={}){
 for(let i=1;i<=2;i++){
  const inicio=Date.now();let http=null,carregou=false;const perfil={viewport:{width:1280,height:840},locale:'pt-BR',timezoneId:'America/Sao_Paulo',serviceWorkers:'block',reducedMotion:'reduce'};
  const contexto=b.contextoParaJornada?await b.contextoParaJornada(perfil,{dominio,tentativa:i}):await b.newContext(perfil);
  try{
   const p=await contexto.newPage();p.setDefaultTimeout(opcoesDoRunner.acaoMs??7500);p.setDefaultNavigationTimeout(opcoesDoRunner.navegacaoMs??12000);
   await p.route('**/*',route=>{
    const r=route.request(),u=new URL(r.url());
    if(!['GET','HEAD'].includes(r.method())||u.origin!=='https://'+dominio||['image','media','font'].includes(r.resourceType()))return route.abort();
    return route.continue();
   });
   const resp=await p.goto('https://'+dominio+'/',{waitUntil:'domcontentloaded'});http=resp?.status()??null;if(!resp?.ok())throw Error('HTTP');
   carregou=true;
   if(opcoesDoRunner.esperarCarregamento)await p.waitForLoadState('load',{timeout:opcoesDoRunner.navegacaoMs??12000});
   await fazer(p,dominio);
   return {dominio,descricao,estado:'operacional',tentativas:i,http,latenciaMs:Date.now()-inicio,motivo:'A jornada de teste terminou com o resultado esperado.'};
  }catch(e){
   if(observar)observar({dominio,tentativa:i,http,carregou,saudavel:contexto.saudavel?.()===true,erro:e});
   if(process.env.FAROL_DIAGNOSTICO==='1')console.error(dominio,i,e.message.split('\n').slice(0,4).join(' '));
   if(i===2)return {dominio,descricao,estado:carregou?'degradado':'indisponivel',tentativas:2,http,latenciaMs:Date.now()-inicio,
    motivo:carregou?'O site abriu, mas a jornada não chegou ao resultado esperado em duas tentativas.':'A página inicial não respondeu corretamente em duas tentativas.'};
  }finally{await contexto.close();}
  await aguardar(1200);
 }
}
// A mesma lista e as mesmas jornadas são usadas pelo GitHub Actions e pela reserva.
async function rodarJornadas(b,concorrencia=4,observar,opcoesDoRunner={}) {
 const resultados=[];
 for(let i=0;i<alvos.length;i+=concorrencia)
   resultados.push(...await Promise.all(alvos.slice(i,i+concorrencia).map(([d,t])=>executar(b,d,t,observar,opcoesDoRunner).then(r=>{opcoesDoRunner.concluida?.(r);return r;}))));
 return resultados;
}
module.exports={alvos,rodarJornadas};
if(require.main===module)(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROME_BIN||'/usr/bin/google-chrome',headless:true});
 try{
  const resultados=await rodarJornadas(b);
  const rel={id:(process.env.GITHUB_RUN_ID||'local')+':'+(process.env.GITHUB_RUN_ATTEMPT||'1'),em:Date.now(),resultados};
  await fs.writeFile(process.argv[2]||'farol-resultado.json',JSON.stringify(rel,null,2));console.log(resultados.map(x=>x.dominio+' · '+x.estado).join('\n'));
 }finally{await b.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
