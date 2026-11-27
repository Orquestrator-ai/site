import {getStore} from "@netlify/blobs";
import {criarFarol} from "../../servidor/farol.mjs";

export default async function monitorar(_req,contexto){
  // A função agendada não tem rota de invocação pública. Nenhum dado da requisição escolhe o alvo.
  if(!contexto.deploy?.published && contexto.deploy?.context!=="production")return;
  const store=getStore({name:"trafego-v1",region:"us-east-2",consistency:"strong"});
  let push;
  const farol=criarFarol({store,entregar:async t=>{
    if(!push)push=(await import("../../servidor/farol-push.mjs")).criarPushFarol({store,namespace:contexto.deploy.id});
    return push.entregar(t);
  }});
  await farol.monitorar();
}
export const config={schedule:"*/5 * * * *"};
