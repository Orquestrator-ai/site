import {getStore} from "@netlify/blobs";
import {consumirReserva,nomeStore} from "../../servidor/farol-reserva.mjs";

export default async function atender(req,contexto){
  const auth=/^Bearer ([A-Za-z0-9_-]{43})$/.exec(req.headers.get("authorization")||"");
  if(req.method!=="POST" || !auth)return;
  const nome=nomeStore(req,contexto);
  const store=getStore({name:nome,region:"us-east-2",consistency:"strong"});
  const op=await consumirReserva(store,auth[1]);if(!op)return;
  // O processo Chromium e o módulo Playwright só são abertos depois do ticket válido, uma única vez.
  const {executarReserva}=await import("../../servidor/farol-rodar-reserva.mjs");
  const binarios=getStore({name:"farol-navegador",region:"us-east-2",consistency:"strong"});
  await executarReserva({op,store,binarios,diagnosticoPrevia:nome.startsWith("trafego-preview-")});
}
export const config={background:true,method:"POST",rateLimit:{action:"rate_limit",aggregateBy:["domain","ip"],windowSize:60,windowLimit:12}};
