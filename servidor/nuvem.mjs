import {createHash} from "node:crypto";
import {abrirBanco} from "./banco.mjs";
import {classificarOrigem, classificarUA, rotuloOrigem} from "./classificar.mjs";
import {criarConsultas, diaLocalDe, inicioDoDia, NOME_UF, periodoDe} from "./consultas.mjs";
import {verificarAdministrador} from "./admin-firebase.mjs";
import {criarRegistro, lerParaAtualizar} from "./registro-nuvem.mjs";

const IDS_RESERVADOS = ["orquestrator.ai", "orquestrator.app", ...["medpanel", "calculadoragestacional", "encontro", "escala", "hub", "rcog"].map(s => s + ".orquestrator.ai")];

export function listarSites(rotas) {
  const ids = new Set();
  return Object.keys(rotas).map(dom => {
    if (!/^(?:[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?\.)*orquestrator\.(?:ai|app)$/.test(dom) || dom.length > 253)
      throw new Error("domínio inválido no catálogo");
    // Os identificadores enviados ao iPhone e gravados nos Blobs independem de ordenação, exclusão ou acréscimo de sites.
    const reservado = IDS_RESERVADOS.indexOf(dom) + 1;
    const id = reservado || 100 + createHash("sha256").update(dom).digest().readUIntBE(0, 6);
    if (ids.has(id)) throw new Error("conflito de identificadores no catálogo");
    ids.add(id);
    return {id, dom};
  }).sort((a,b) => a.id - b.id);
}
const PERIODOS = ["hoje", "7d", "30d", "12m"];
const METRICAS = ["visitantes", "visualizacoes", "duracao", "rejeicao"];
const TABELAS = {paginas: ["vistas", "entrada", "saida"], origens: ["origem", "campanha"], locais: ["estados", "cidades", "paises"], aparelhos: ["tipo", "navegador", "sistema"], metas: ["conversoes"]};
const CORES = ["#7340ae", "#a8491c", "#3a7352", "#4e56bf", "#9b3c68", "#006d83", "#786028"];
const OP_ORIGEM = {rotuloOrigem, corOrigem: () => "#5551a6", inicialOrigem: nome => nome === "direto" ? "→" : nome[0].toUpperCase()};
const METAS = new Set(["abrir-app", "baixar-app", "instalar-app", "abrir-produto", "cadastro", "contato", "download"]);
const ROTAS = new Set(["sites", "visao", "tabela", "vivo", "anotacao", "exportar"]);
const DIA = 86_400_000;

function inteiro(valor, teto) {
  return Number.isFinite(valor) ? Math.max(0, Math.min(teto, Math.round(valor))) : null;
}

class Falha extends Error {
  constructor(status, mensagem) { super(mensagem); this.status = status; }
}

async function corpo(req) {
  if (Number(req.headers.get("content-length")) > 4096) throw new Falha(413, "mensagem muito grande");
  if (!req.body) throw new Falha(400, "mensagem vazia");
  const leitor = req.body.getReader(), partes = [];
  let tamanho = 0;
  try {
    while (true) {
      const {done, value} = await leitor.read();
      if (done) break;
      tamanho += value.byteLength;
      if (tamanho > 4096) { await leitor.cancel(); throw new Falha(413, "mensagem muito grande"); }
      partes.push(value);
    }
  } finally { leitor.releaseLock(); }
  try {
    const valor = JSON.parse(Buffer.concat(partes).toString("utf8"));
    if (!valor || typeof valor !== "object" || Array.isArray(valor)) throw new Error();
    return valor;
  } catch { throw new Falha(400, "mensagem inválida"); }
}

function periodoValido(url) {
  const periodo = url.searchParams.get("periodo") || "30d";
  if (!PERIODOS.includes(periodo)) throw new Falha(400, "período inválido");
  return periodo;
}

export function criarServico({store, rotas, administrador = verificarAdministrador, agora = Date.now}) {
  const registro = criarRegistro(store);
  let proximaSonda = 0, sonda;
  function verificarArmazenamento() {
    if (sonda && agora() < proximaSonda) return sonda;
    proximaSonda = agora() + 15_000;
    // HEAD em chave reservada comprova que esta função consegue ler este store e região.
    // Tanto uma resposta 200 quanto uma 404 do store acessível são válidas; não cria objetos de teste.
    sonda = store.getMetadata("controle/saude").then(() => true, () => false);
    return sonda;
  }
  const sites = listarSites(rotas);
  const idPorDominio = new Map(sites.map(({dom,id}) => [dom,id]));
  const dominioPorId = new Map(sites.map(({dom,id}) => [id,dom]));
  const origensColeta = sites.map(({dom}) => "https://" + dom);
  const autorizados = new Map(), primeiros = new Map();
  const permitidas = Object.fromEntries(Object.entries(rotas).map(([dom, lista]) => [dom, new Set(lista)]));

  async function permitir(req) {
    const header = req.headers.get("authorization");
    if (!header || header.length > 8192) throw new Falha(401, "Entre com a Conta Orquestrator.");
    const chave = createHash("sha256").update(header).digest("hex");
    if ((autorizados.get(chave) || 0) > agora()) return;
    const status = await administrador(header);
    if (status !== 200) throw new Falha(status, status === 403 ? "O acesso exige uma conta administradora." :
      status === 401 ? "Entre novamente com a Conta Orquestrator." : "A verificação da conta está indisponível.");
    if (autorizados.size > 32) autorizados.clear();
    // A revogação de uma concessão passa a valer no máximo dez segundos depois.
    autorizados.set(chave, agora() + 10000);
  }

  async function primeiraVisita(site, instante) {
    if (primeiros.has(site)) return primeiros.get(site);
    const chave = "inicio/" + site;
    if (instante !== undefined) await store.setJSON(chave, instante, {onlyIfNew: true});
    const registrado = await store.get(chave, {type: "json"});
    if (registrado != null) primeiros.set(site, registrado);
    return registrado;
  }

  async function receber(req, contexto, origem) {
    const b = await corpo(req);
    const dom = origem?.slice(8);
    const site = idPorDominio.get(dom);
    if (!site || b.s !== dom || (b.h && b.h !== dom)) throw new Falha(403, "origem inválida");
    const rota = b.p;
    if (!permitidas[dom]?.has(rota)) throw new Falha(400, "página fora do catálogo público");
    if (!["pv", "fim", "ev"].includes(b.t)) throw new Falha(400, "tipo de evento inválido");
    if (b.t === "ev" && !METAS.has(b.e)) throw new Falha(400, "meta fora do catálogo");
    if (b.id != null && !/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(b.id)) throw new Falha(400, "id de evento inválido");
    const ua = (req.headers.get("user-agent") || "").slice(0, 1024), dispositivo = classificarUA(ua);
    if (dispositivo.bot) return;
    if (!contexto.ip) throw new Falha(503, "origem de rede indisponível");
    const instante = agora(), visitante = await registro.identificar(site, instante, contexto.ip, ua);
    const pais = /^[A-Z]{2}$/.test(contexto.geo?.country?.code) ? contexto.geo.country.code : null;
    const uf = contexto.geo?.subdivision?.code;
    const evento = {site_id: site, instante, tipo: b.t, visitante, caminho: rota, origem: "direto", campanha: null,
      pais, uf: pais === "BR" && Object.hasOwn(NOME_UF, uf) ? uf : null, cidade: null,
      aparelho: dispositivo.aparelho, navegador: dispositivo.navegador, sistema: dispositivo.sistema};
    if (b.t === "pv") {
      let ref = "";
      try { const u = new URL(b.r); if (["http:", "https:"].includes(u.protocol)) ref = u.origin; } catch {}
      const origem = classificarOrigem({referenciador: ref, hostProprio: dom});
      // Termos de busca, URLs completas, props, título da janela e texto de formulário nunca entram no registro.
      evento.origem = origem.origem;
      evento.largura = inteiro(b.w, 10000);
    } else if (b.t === "fim") {
      evento.duracao_s = inteiro(b.d, 86400);
      evento.rolagem = inteiro(b.r, 100);
    } else evento.meta = b.e;
    await registro.gravar(evento, b.id);
    await primeiraVisita(site, instante);
  }

  async function anotacoes(banco, site, desde, ate) {
    // Até 30 dias por visão anotável. Os dias sem anotação ficam fora do índice.
    const notas = await store.get("anotacoes/" + site, {type:"json"}) || {};
    for (const [dia, texto] of Object.entries(notas))
      if (dia >= diaLocalDe(desde) && dia <= diaLocalDe(ate)) banco.anotar(site, dia, texto);
  }

  async function anotar(req) {
    const b = await corpo(req), site = Number(b.site), dia = b.dia;
    if (!Number.isInteger(site) || !dominioPorId.has(site)) throw new Falha(404,"site desconhecido");
    if (typeof dia !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(dia) || !Number.isFinite(Date.parse(dia)) ||
        new Date(dia).toISOString().slice(0,10) !== dia || dia < diaLocalDe(agora() - 731 * DIA) || dia > diaLocalDe(agora()))
      throw new Falha(400,"data inválida");
    if (typeof b.texto !== "string" || b.texto.length > 80) throw new Falha(400,"anotação inválida");
    const texto = b.texto.replace(/\s+/g, " ").trim(), chave = "anotacoes/" + site;
    for (let tentativa = 0; tentativa < 6; tentativa++) {
      const anterior = await lerParaAtualizar(store, chave);
      const notas = anterior?.data || {};
      if (texto) notas[dia] = texto; else delete notas[dia];
      const resultado = await store.setJSON(chave, notas, anterior ? {onlyIfMatch: anterior.etag} : {onlyIfNew:true});
      if (resultado.modified) return {site, dia, texto: texto || null};
    }
    throw new Falha(503,"edição simultânea, tente novamente");
  }

  async function consultar(rota, url, instante) {
    const banco = abrirBanco(":memory:");
    try {
      const incluir = banco.db.prepare("INSERT INTO sites(id, dominio) VALUES (?, ?)");
      for (const {id,dom} of sites) incluir.run(id,dom);
      const consultas = criarConsultas(banco.db, banco);
      if (rota === "sites") {
        const leituras = await Promise.allSettled(sites.map(({id}) => registro.carregar(banco, id, instante-300000, instante)));
        for (const leitura of leituras) if (leitura.status === "rejected") throw leitura.reason;
        const ativos = banco.db.prepare("SELECT site_id,COUNT(DISTINCT visitante) AS total FROM eventos WHERE instante >= ? AND instante < ? GROUP BY site_id").all(instante-300000, instante);
        return sites.map(({id,dom}) => ({id, dom, ini:dom[0].toUpperCase(), cor:CORES[(id-1) % CORES.length], agora:ativos.find(a=>a.site_id===id)?.total || 0}));
      }
      const site = Number(url.searchParams.get("site")), dom = dominioPorId.get(site);
      if (!Number.isInteger(site) || !dom) throw new Falha(404,"site desconhecido");
      const periodo = periodoValido(url), filtro = url.searchParams.get("filtro") || null;
      if (filtro && !permitidas[dom]?.has(filtro)) throw new Falha(400,"página fora do catálogo público");
      const metrica = url.searchParams.get("metrica") || "visitantes";
      if (rota === "visao" && !METRICAS.includes(metrica)) throw new Falha(400,"métrica inválida");
      const nome = url.searchParams.get("nome"), abas = Object.hasOwn(TABELAS, nome) ? TABELAS[nome] : [];
      const aba = url.searchParams.get("aba") || abas[0];
      if (rota === "tabela" && !abas.includes(aba)) throw new Falha(400,"tabela inválida");
      const p = periodoDe(periodo, instante), inicio = rota === "vivo" ? Math.min(inicioDoDia(instante), instante - 3600000) :
        rota === "visao" ? p.deA : p.de;
      await registro.carregar(banco, site, inicio, instante);
      const args = {site, periodo, filtro, agora:instante, ...OP_ORIGEM};
      if (rota === "vivo") return consultas.vivo(args);
      if (rota === "visao") {
        if (periodo === "7d" || periodo === "30d") await anotacoes(banco, site, p.de, instante);
        return {...consultas.visao({...args, metrica}), desde: await primeiraVisita(site)};
      }
      if (rota === "tabela") return consultas.tabela({...args,nome,aba});
      if (rota === "exportar") {
        const rows = [["tabela","aba","item","detalhe","visitantes"]];
        for (const [n, ab] of Object.entries(TABELAS)) for (const a of ab) {
          for (const linha of consultas.tabela({...args,nome:n,aba:a}).linhas)
            rows.push([n, a, linha.texto || linha.rotulo, linha.sigla || linha.chave || "", linha.v]);
        }
        const csv = rows.map(row => row.map(v => '"' + String(v ?? "").replace(/^([=+@-])/,"'$1").replaceAll('"','""') + '"').join(";")).join("\r\n");
        return new Response("\uFEFF"+csv+"\r\n", {headers:{"content-type":"text/csv; charset=utf-8","content-disposition":'attachment; filename="contagem-'+dom+'-'+periodo+'.csv"'}});
      }
    } finally { banco.fechar(); }
  }

  return async function atender(req, contexto = {}) {
    const url = new URL(req.url), rota = url.pathname.replace(/^\/api\//, "");
    const origem = req.headers.get("origin");
    const origens = rota === "evento" ? origensColeta : ["https://orquestrator.ai"];
    const headers = new Headers({"cache-control":"no-store","vary":"Origin","x-content-type-options":"nosniff"});
    let resposta;
    try {
      if (origem && !origens.includes(origem)) throw new Falha(403,"origem inválida");
      if (origem) {
        headers.set("access-control-allow-origin",origem);
        if (rota === "evento") headers.set("access-control-allow-credentials","true");
      }
      if (rota !== "evento" && rota !== "saude" && !ROTAS.has(rota)) throw new Falha(404,"rota inexistente");
      if (req.method === "OPTIONS") {
        headers.set("access-control-allow-methods",rota === "evento" || rota === "anotacao" ? "POST" : "GET");
        headers.set("access-control-allow-headers",rota === "evento" ? "Content-Type" : "Authorization, Content-Type");
        headers.set("access-control-max-age","600"); return new Response(null,{status:204,headers});
      }
      if (req.method !== (rota === "evento" || rota === "anotacao" ? "POST" : "GET")) throw new Falha(405,"método inválido");
      if (rota === "saude") {
        if (!await verificarArmazenamento()) throw new Falha(503,"O armazenamento está indisponível.");
        resposta = Response.json({ok:true});
      }
      else if (rota === "evento") {
        await receber(req, contexto, origem);
        resposta = new Response(null,{status:202});
      } else {
        await permitir(req);
        const dado = rota === "anotacao" ? await anotar(req) : await consultar(rota,url,agora());
        resposta = dado instanceof Response ? dado : Response.json(dado);
      }
    } catch (erro) {
      const status = erro instanceof Falha ? erro.status : erro instanceof RangeError ? 422 : 503;
      if (!(erro instanceof Falha || erro instanceof RangeError)) {
        // Só o tipo do erro operacional; sem URL de credenciais, corpo, IP ou user-agent.
        console.error("contagem: serviço indisponível", erro?.constructor?.name);
      }
      resposta = Response.json({erro:erro instanceof Falha || erro instanceof RangeError ? erro.message : "O serviço está temporariamente indisponível."},{status});
    }
    for (const [k,v] of headers) resposta.headers.set(k,v);
    return resposta;
  };
}
