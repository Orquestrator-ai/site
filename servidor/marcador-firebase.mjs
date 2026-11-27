// O endereço do marcador é uma capability interna de 256 bits. A resposta pública contém unicamente v=1.
// As regras exigem que o administrador ainda esteja habilitado em cada GET.
const BASE = "https://firestore.googleapis.com/v1/projects/orquestrator-61836/databases/(default)/documents";
export function fonteDosMarcadores({requisitar=fetch}={}) {
  const endpoint = (uid,segredo) => BASE+"/admins/"+encodeURIComponent(uid)+"/contagemLeituras/"+segredo;
  async function conferir(uid,segredo) {
    try {
      const r=await requisitar(endpoint(uid,segredo),{cache:"no-store",redirect:"error",signal:AbortSignal.timeout(5000)});
      if(r.status===401 || r.status===403 || r.status===404) return 403;
      if(!r.ok)return 503;
      return (await r.json())?.fields?.v?.integerValue==="1"?200:403;
    } catch {return 503;}
  }
  async function criar(uid,segredo,token) {
    try {
      const r=await requisitar(endpoint(uid,segredo)+"?currentDocument.exists=false",{method:"PATCH",headers:{
        Authorization:"Bearer "+token,"Content-Type":"application/json"},body:JSON.stringify({fields:{v:{integerValue:"1"}}}),
        redirect:"error",cache:"no-store",signal:AbortSignal.timeout(5000)});
      if(r.ok || r.status===409 || r.status===412) return conferir(uid,segredo);
      if(r.status===401 || r.status===403)return r.status;
      return 503;
    } catch {return 503;}
  }
  async function provisionarComoOperador(uid,segredo,acessoOAuth) {
    try {
      const r=await requisitar(BASE+"/admins/"+encodeURIComponent(uid)+"?mask.fieldPaths=enabled",{
        headers:{authorization:"Bearer "+acessoOAuth},cache:"no-store",redirect:"error",signal:AbortSignal.timeout(5000)});
      if(!r.ok)return r.status===401||r.status===403||r.status===404?403:503;
      if((await r.json())?.fields?.enabled?.booleanValue!==true)return 403;
      return criar(uid,segredo,acessoOAuth);
    } catch{return 503;}
  }
  return {criar,conferir,provisionarComoOperador};
}
