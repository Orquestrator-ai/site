import {getStore} from "@netlify/blobs";
import rotas from "../../servidor/rotas-publicas.json" with {type: "json"};
import {criarServico} from "../../servidor/nuvem.mjs";

const instancias = new Map();
export default async function atender(req, contexto) {
  // Um preview jamais grava visitas no tráfego publicado. A URL real da função vem do contexto do Netlify.
  const publicado = contexto.deploy.published || contexto.deploy.context === "production";
  const nome = publicado ? "trafego-v1" : "trafego-preview-" + contexto.deploy.id;
  const namespace = contexto.deploy.id;
  if (!namespace) return Response.json({erro:"Identificação do deploy indisponível."},{status:503});
  if (!instancias.has(namespace)) instancias.set(namespace, criarServico({
    store:getStore({name:nome, region:"us-east-2", consistency:"strong"}), rotas, namespace,
    iphoneAtivo:process.env.CONTAGEM_IPHONE_DESATIVADO !== "1"
  }));
  return instancias.get(namespace)(req,contexto);
}
export const config = {path:"/api/*", rateLimit:{action:"rate_limit", aggregateBy:["ip","domain"], windowSize:60, windowLimit:300}};
