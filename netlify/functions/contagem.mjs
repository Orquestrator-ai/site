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
  const ponteLegada = publicado && new URL(req.url).hostname === "orquestrator-contagem.netlify.app";
  const chaveDaInstancia=namespace+(ponteLegada?":publico":":isolado");
  if (!instancias.has(chaveDaInstancia)) instancias.set(chaveDaInstancia, criarServico({
    store:getStore({name:nome, region:"us-east-2", consistency:"strong"}), rotas, namespace,
    namespaceAnteriorCtg1:ponteLegada?"6b08f09eceff1b60d74346fe":undefined,
    iphoneAtivo:process.env.CONTAGEM_IPHONE_DESATIVADO !== "1"
  }));
  return instancias.get(chaveDaInstancia)(req,contexto);
}
export const config = {path:"/api/*", rateLimit:{action:"rate_limit", aggregateBy:["ip","domain"], windowSize:60, windowLimit:300}};
