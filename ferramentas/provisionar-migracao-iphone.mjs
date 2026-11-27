// Uso: node ferramentas/provisionar-migracao-iphone.mjs UID DEPLOY_EMISSOR PEDIDO_USB.json SAIDA_NOVA.json
// NETLIFY_SITE_ID e NETLIFY_AUTH_TOKEN são injetados pelo operador. No modo IAM injete também
// CONTAGEM_OAUTH_OPERADOR (OAuth Google de operador já autorizado). Nenhuma credencial é impressa.
import {getStore} from "@netlify/blobs";
import {readFile,open,unlink} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import {resolve} from "node:path";
import {provisionarTicket} from "../servidor/dispositivos-iphone.mjs";
import {fonteDosMarcadores} from "../servidor/marcador-firebase.mjs";

export async function emitirArquivoTicket({store,uid,deploy,pedidoPath,saida,acessoOperador,ttl=acessoOperador?86400:1200}) {
  const pedido=JSON.parse(await readFile(pedidoPath,"utf8"));
  if(Object.keys(pedido).sort().join(",")!=="deviceKey,legadoHash")throw Error("O pedido USB deve conter somente as duas provas públicas.");
  const arquivo=await open(saida,"wx",0o600);
  try {
    const dados=await provisionarTicket(store,{uid,deploy,ttl,deviceKey:pedido.deviceKey,legadoHash:pedido.legadoHash,acessoOperador,marcadores:fonteDosMarcadores()});
    await arquivo.writeFile(JSON.stringify(dados)+"\n");
  } catch {
    await unlink(saida).catch(()=>{});
    throw Error("Não foi possível comprovar a conta, o marcador e o pedido. Nenhum ticket foi entregue.");
  } finally {await arquivo.close();}
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const [uid,deploy,pedidoPath,saida]=process.argv.slice(2);
  if(!uid||!deploy||!pedidoPath||!saida||!process.env.NETLIFY_SITE_ID||!process.env.NETLIFY_AUTH_TOKEN)throw Error("Informe UID, deploy emissor, pedido e destino novo; configure a sessão Netlify.");
  const store=getStore({siteID:process.env.NETLIFY_SITE_ID,token:process.env.NETLIFY_AUTH_TOKEN,name:"trafego-v1",region:"us-east-2",consistency:"strong"});
  await emitirArquivoTicket({store,uid,deploy,pedidoPath,saida,acessoOperador:process.env.CONTAGEM_OAUTH_OPERADOR});
  console.log("Ticket de uso único disponível no arquivo protegido solicitado.");
}
