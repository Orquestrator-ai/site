// Lista fechada: cada verificação parte do domínio e caminho definidos no código.
// O corpo das respostas é usado só para validar a página e não é guardado.
const lista = [
  [1,"orquestrator.ai","Orquestrator","orquestrator","sala","a seção Sala"],
  [2,"orquestrator.app","Orquestrator App","orquestrator","mov-chat","a apresentação do Chat"],
  [3,"medpanel.orquestrator.ai","MedPanel","medpanel","mp-puericultura","o painel de puericultura"],
  [4,"calculadoragestacional.orquestrator.ai","Calculadora Gestacional","calculadora gestacional","idade-gestacional","o resultado de idade gestacional"],
  [5,"encontro.orquestrator.ai","Agenda Med","agenda med","cs-espelho","o espelho da agenda"],
  [6,"escala.orquestrator.ai","Escala","escala","semana-titulo","a seção da escala semanal"],
  [7,"hub.orquestrator.ai","Medical HUB","medical hub","hub-doencas","o catálogo de doenças"],
  [8,"rcog.orquestrator.ai","Score TEV RCOG","rcog","total","o total do escore"]
];
export const ALVOS_FAROL=Object.freeze(lista.map(([siteId,dominio,nome,titulo,marco,descricao])=>Object.freeze({
  siteId,dominio,nome,titulo,marco,url:"https://"+dominio+"/",descricao:"GET da página inicial, conferindo o título e "+descricao+"."
})));
const MAX_HTML=768*1024;
function normalizar(s){return s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();}
async function htmlPublico(response) {
  if (!response.body)return null;
  const leitor=response.body.getReader(), partes=[];let tamanho=0;
  try{
    while(true){const {value,done}=await leitor.read();if(done)break;
      const trecho=value.subarray(0,MAX_HTML-tamanho);
      partes.push(trecho);tamanho+=trecho.byteLength;
      if(tamanho===MAX_HTML){await leitor.cancel();break;}}
    return Buffer.concat(partes).toString("utf8");
  }finally{leitor.releaseLock();}
}
async function verificar(alvo,{requisitar,agora,timeoutMs}){
  const inicio=agora(),sinal=AbortSignal.timeout(timeoutMs);
  try{
    const r=await requisitar(alvo.url,{method:"GET",redirect:"manual",cache:"no-store",credentials:"omit",referrerPolicy:"no-referrer",
      headers:{accept:"text/html","user-agent":"Orquestrator-Farol/1.0 (monitor de disponibilidade)"},signal:sinal});
    const resultado=(estado,motivo)=>({estado,motivo,http:r.status,latenciaMs:Math.max(0,Math.round(agora()-inicio))});
    if(!r.ok){
      await r.body?.cancel();
      return resultado("indisponivel","A página inicial respondeu com HTTP "+r.status+".");
    }
    if(!/\btext\/html\b/i.test(r.headers.get("content-type")||"")){await r.body?.cancel();return resultado("degradado","A página inicial não retornou HTML.");}
    const html=await htmlPublico(r);
    if(html===null)return resultado("degradado","Não foi possível conferir o conteúdo da página inicial.");
    const titulo=/<title[^>]*>([^<]*)<\/title\s*>/i.exec(html)?.[1] || "";
    if(!normalizar(titulo).includes(alvo.titulo) || !html.includes('id="'+alvo.marco+'"'))
      return resultado("degradado","O conteúdo esperado da página inicial não foi encontrado.");
    return resultado("operacional",null);
  }catch{return {estado:"indisponivel",motivo:sinal.aborted?"O site não respondeu dentro do tempo limite.":"Não foi possível concluir a conexão HTTPS.",http:null,latenciaMs:null};}
}
// Os alvos chegam sempre da lista interna. Uma falha ou uma recuperação após falha exige nova amostra.
export async function sondarSites(ultimos={}, {requisitar=fetch,agora=Date.now,timeoutMs=3800,pausa=ms=>new Promise(ok=>setTimeout(ok,ms))}={}){
  const saida=new Array(ALVOS_FAROL.length);let proximo=0;
  async function trabalhador(){
    while(proximo<ALVOS_FAROL.length){
      const i=proximo++, alvo=ALVOS_FAROL[i],op={requisitar,agora,timeoutMs};
      const primeira=await verificar(alvo,op);let final=primeira, tentativas=1;
      const estavaFalhando=["degradado","indisponivel"].includes(ultimos[alvo.dominio]);
      if(primeira.estado!=="operacional" || estavaFalhando){
        await pausa(180);const repetida=await verificar(alvo,op);tentativas=2;
        if(primeira.estado!=="operacional" && repetida.estado!=="operacional")final=repetida;
        else if(primeira.estado==="operacional" && repetida.estado==="operacional")final=repetida;
        else if(estavaFalhando)final={...repetida,estado:"inconclusivo",motivo:"As duas tentativas divergiram durante a confirmação da recuperação."};
        else final=primeira.estado==="operacional"?primeira:repetida;
      }
      saida[i]={dominio:alvo.dominio,tentativas,...final};
    }
  }
  await Promise.all(Array.from({length:4},trabalhador));return saida;
}
