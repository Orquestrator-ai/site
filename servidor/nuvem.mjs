import {createHash} from "node:crypto";
import {criarFarol,ErroFarol} from "./farol.mjs";
import {AREAS,pertence} from "./areas.mjs";
import {abrirBanco} from "./banco.mjs";
import {classificarOrigem, classificarUA, rotuloOrigem} from "./classificar.mjs";
import {criarConsultas, diaLocalDe, inicioDoDia, NOME_UF, periodoDe} from "./consultas.mjs";
import {criarDispositivos,uidDoIdVerificado} from "./dispositivos-iphone.mjs";
import {fonteDosMarcadores} from "./marcador-firebase.mjs";
import {criarPassesIphone, FalhaPasse} from "./passe-iphone.mjs";
import {verificarAdministrador} from "./admin-firebase.mjs";
import {criarRegistro, lerParaAtualizar} from "./registro-nuvem.mjs";

const IDS_RESERVADOS = ["orquestrator.ai", "orquestrator.app", ...["medpanel", "calculadoragestacional", "encontro", "escala", "hub", "rcog"].map(s => s + ".orquestrator.ai")];

export function listarSites(rotas) {
  const ids = new Set(AREAS.map(a=>a.id));
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
const LEITURA_IPHONE = new Set(["sites","visao","tabela","vivo"]);
const EMITIR_PASSE = "iphone/autorizar";
const GESTAO_IPHONE = new Set([EMITIR_PASSE,"iphone/dispositivos","iphone/revogar"]);
const PAREAMENTO_NATIVO = new Set(["iphone/renovar","iphone/desvincular","iphone/migrar"]);
const FAROL_AVISOS=new Set(["chave","inscrever","remover","testar","estado","recebido"].map(s=>"farol/avisos/"+s));
const ROTAS_FAROL=new Set(["farol","farol/saude","farol/sonda",...FAROL_AVISOS]);
const FAROL_POST=new Set([...FAROL_AVISOS].filter(r=>r!=="farol/avisos/chave").concat("farol/sonda"));
const ROTAS = new Set([...ROTAS_FAROL,...LEITURA_IPHONE, "anotacao", "exportar", ...GESTAO_IPHONE, ...PAREAMENTO_NATIVO]);
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

export function criarServico({store, rotas, administrador = verificarAdministrador, agora = Date.now, namespace, namespaceAnteriorCtg1, iphoneAtivo = true, marcadores = fonteDosMarcadores(), pushFarol, validarSonda}) {
  const registro = criarRegistro(store);
  let pushConfigurado=pushFarol;
  async function canalPush(){
    if(!pushConfigurado)pushConfigurado=(await import("./farol-push.mjs")).criarPushFarol({store,agora,namespace,marcadores});
    return pushConfigurado;
  }
  const farol=criarFarol({store,agora,entregar:async t=>(await canalPush()).entregar(t)});
  const passes = criarPassesIphone({store,agora,namespace});
  async function lerLegadoAtual(passe) {
    try{return await passes.abrir(passe);}
    catch(e){
      if(!(e instanceof FalhaPasse) || e.status!==401 || !namespaceAnteriorCtg1 || namespace===namespaceAnteriorCtg1 ||
        agora() >= Date.UTC(2026,10,27,5,30))throw e;
      return criarPassesIphone({store,agora,namespace:namespaceAnteriorCtg1}).abrir(passe);
    }
  }
  const dispositivos = criarDispositivos({store,agora,marcadores,uidHistorica:(passe,emissor)=>criarPassesIphone({store,agora,namespace:emissor}).uidHistorica(passe),validarLegado:async (passe,emissor)=>{
    const t=await criarPassesIphone({store,agora,namespace:emissor}).abrir(passe);
    await permitirFirebase("Bearer "+t,false);
    return t;
  }});
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
  const areas = AREAS.filter(area => idPorDominio.get(area.dominio) === area.origem);
  const areaPorId = new Map(areas.map(a=>[a.id,a]));
  const dominioPorId = new Map([...sites,...areas].map(({dom,id}) => [id,dom]));
  const origensColeta = sites.map(({dom}) => "https://" + dom);
  const autorizados = new Map(), primeiros = new Map();
  const permitidas = Object.fromEntries(Object.entries(rotas).map(([dom, lista]) => [dom, new Set(lista)]));

  async function permitirFirebase(header, usarCache) {
    if (!header || header.length > 8192) throw new Falha(401, "Entre com a Conta Orquestrator.");
    const chave = createHash("sha256").update(header).digest("hex");
    if (usarCache && (autorizados.get(chave) || 0) > agora()) return;
    const status = await administrador(header);
    if (status !== 200) throw new Falha(status, status === 403 ? "O acesso exige uma conta administradora." :
      status === 401 ? "Entre novamente com a Conta Orquestrator." : "A verificação da conta está indisponível.");
    if (!usarCache) return;
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

  async function anotacoes(banco, site, desde, ate, siteNoBanco = site) {
    // Até 30 dias por visão anotável. Os dias sem anotação ficam fora do índice.
    const notas = await store.get("anotacoes/" + site, {type:"json"}) || {};
    for (const [dia, texto] of Object.entries(notas))
      if (dia >= diaLocalDe(desde) && dia <= diaLocalDe(ate)) banco.anotar(siteNoBanco, dia, texto);
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

      if (rota === "sites") {
        const leituras = await Promise.allSettled(sites.map(({id}) => registro.carregar(banco, id, instante-300000, instante)));
        for (const leitura of leituras) if (leitura.status === "rejected") throw leitura.reason;
        const ativos = banco.db.prepare("SELECT site_id,COUNT(DISTINCT visitante) AS total FROM eventos WHERE instante >= ? AND instante < ? GROUP BY site_id").all(instante-300000, instante);
        const ativosArea=banco.db.prepare("SELECT COUNT(DISTINCT visitante) AS total FROM eventos WHERE site_id=? AND instante>=? AND instante<? AND (caminho=? OR caminho GLOB ?)");
        const secoes=areas.map(({id,origem,dom,prefixo,ini,cor})=>({id,dom,ini,cor,sitePai:origem,prefixo,
          agora:ativosArea.get(origem,instante-300000,instante,prefixo,prefixo+"/*").total}));
        return sites.map(({id,dom}) => ({id, dom, ini:dom[0].toUpperCase(), cor:CORES[(id-1) % CORES.length], agora:ativos.find(a=>a.site_id===id)?.total || 0})).concat(secoes);
      }
      const site = Number(url.searchParams.get("site")), dom = dominioPorId.get(site);
      if (!Number.isInteger(site) || !dom) throw new Falha(404,"site desconhecido");
      const area=areaPorId.get(site);
      const siteNoBanco=area?.origem ?? site;
      const dominioFisico=area?.dominio ?? dom;
      const consultas=criarConsultas(banco.db,banco,{duracaoDaArea:Boolean(area)});
      const periodo = periodoValido(url), filtro = url.searchParams.get("filtro") || null;
      if (filtro && (!permitidas[dominioFisico]?.has(filtro) || (area && !pertence(filtro,area.prefixo)))) throw new Falha(400,"página fora do catálogo público");
      const metrica = url.searchParams.get("metrica") || "visitantes";
      if (rota === "visao" && !METRICAS.includes(metrica)) throw new Falha(400,"métrica inválida");
      const nome = url.searchParams.get("nome"), abas = Object.hasOwn(TABELAS, nome) ? TABELAS[nome] : [];
      const aba = url.searchParams.get("aba") || abas[0];
      if (rota === "tabela" && !abas.includes(aba)) throw new Falha(400,"tabela inválida");
      const p = periodoDe(periodo, instante), inicio = rota === "vivo" ? Math.min(inicioDoDia(instante), instante - 3600000) :
        rota === "visao" ? p.deA : p.de;
      await registro.carregar(banco, siteNoBanco, inicio, instante,area?.prefixo);
      const args = {site:siteNoBanco, periodo, filtro, agora:instante, ...OP_ORIGEM};
      if (rota === "vivo") return consultas.vivo(args);
      if (rota === "visao") {
        if (periodo === "7d" || periodo === "30d") await anotacoes(banco, site, p.de, instante, siteNoBanco);
        const inicioPai=await primeiraVisita(siteNoBanco);
        const desde=area?await registro.inicioDaArea(area,inicioPai,instante):inicioPai;
        return {...consultas.visao({...args, metrica}), desde};
      }
      if (rota === "tabela") return consultas.tabela({...args,nome,aba});
      if (rota === "exportar") {
        const rows = [["tabela","aba","item","detalhe","visitantes"]];
        for (const [n, ab] of Object.entries(TABELAS)) for (const a of ab) {
          for (const linha of consultas.tabela({...args,nome:n,aba:a}).linhas)
            rows.push([n, a, linha.texto || linha.rotulo, linha.sigla || linha.chave || "", linha.v]);
        }
        const csv = rows.map(row => row.map(v => '"' + String(v ?? "").replace(/^([=+@-])/,"'$1").replaceAll('"','""') + '"').join(";")).join("\r\n");
        return new Response("\uFEFF"+csv+"\r\n", {headers:{"content-type":"text/csv; charset=utf-8","content-disposition":'attachment; filename="contagem-'+dom.replaceAll("/","-")+'-'+periodo+'.csv"'}});
      }
    } finally { banco.fechar(); }
  }

  async function atenderFarol(rota,req,contexto,header,sessao){
    if(rota==="farol/saude"){
      const ok=await farol.saude();
      return Response.json({ok},{status:ok?200:503});
    }
    if(rota==="farol"){
      if(sessao)await dispositivos.validarSessao(header.slice(7));else await permitirFirebase(header,false);
      return Response.json(await farol.painel());
    }
    // Os módulos de OIDC e de push só devolvem mensagens de falha de domínio; não expor resposta de provedores.
    const viaModulo=async acao=>{
      try{return await acao();}catch(e){
        if([400,401,403,404,409,413,429,503].includes(e?.status))
          throw new Falha(e.status,({400:"Dados de verificação ou avisos inválidos.",401:"Credencial não aceita.",403:"Permissão insuficiente.",
            404:"Inscrição de avisos não encontrada.",409:"A solicitação não foi concluída.",413:"Relatório muito grande.",
            429:"Aguarde antes de tentar novamente.",503:"Verificação ou entrega temporariamente indisponível."})[e.status]);
        throw e;
      }
    };
    if(rota==="farol/sonda"){
      const validar=validarSonda || (await import("./farol-sintetico.mjs")).validarSondaFarol;
      const relatorio=await viaModulo(()=>validar(req));
      const resultado=await farol.aplicar("funcional",relatorio);
      if(resultado.aplicado){
        const drenagem=farol.drenar().catch(()=>{console.error("farol: fila de avisos será retomada no próximo ciclo");});
        if(typeof contexto.waitUntil==="function")contexto.waitUntil(drenagem);else await drenagem;
      }
      return Response.json(resultado,{status:202});
    }
    const operacao=rota.slice("farol/avisos/".length);
    if(operacao==="recebido"){
      const dados=await corpo(req);
      return Response.json(await viaModulo(async()=>(await canalPush()).recebido(dados)));
    }
    await permitirFirebase(header,false);
    const push=await canalPush();
    if(operacao==="chave")return Response.json(await viaModulo(()=>push.chavePublica()));
    const idToken=header.slice(7),uid=uidDoIdVerificado(idToken),dados=await corpo(req);
    return Response.json(await viaModulo(()=>push[operacao](uid,dados,idToken)));
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
      if ((GESTAO_IPHONE.has(rota) || (FAROL_AVISOS.has(rota) && FAROL_POST.has(rota))) && origem !== "https://orquestrator.ai") throw new Falha(403,"Origem de autorização inválida.");
      const metodo = FAROL_POST.has(rota) || rota === "evento" || rota === "anotacao" || rota === EMITIR_PASSE || rota === "iphone/revogar" || PAREAMENTO_NATIVO.has(rota) ? "POST" : "GET";
      if (req.method === "OPTIONS") {
        headers.set("access-control-allow-methods",metodo);
        headers.set("access-control-allow-headers",rota === "evento" ? "Content-Type" : "Authorization, Content-Type");
        headers.set("access-control-max-age","600"); return new Response(null,{status:204,headers});
      }
      const header = req.headers.get("authorization") || "";
      const token=header.slice(7);
      const legado=/^Bearer ctg1\./i.test(header), duravel=/^Bearer ctg2\./i.test(header), sessao=/^Bearer ctg2s\./i.test(header);
      const leitura = LEITURA_IPHONE.has(rota) && req.method==="GET";
      if ((legado && !leitura && rota!=="iphone/migrar") || (sessao && !leitura && !(rota==="farol" && req.method==="GET")) ||
          (duravel && rota!=="iphone/renovar" && rota!=="iphone/desvincular")) throw new Falha(403,"Esta credencial não permite essa operação.");
      if (req.method !== metodo) throw new Falha(405,"método inválido");
      if (!iphoneAtivo && (legado || duravel || sessao || PAREAMENTO_NATIVO.has(rota) || rota===EMITIR_PASSE)) throw new Falha(503,"A autorização do iPhone está desativada.");
      if(ROTAS_FAROL.has(rota)) resposta=await atenderFarol(rota,req,contexto,header,sessao);
      else if (rota === "saude") {
        if (!await verificarArmazenamento()) throw new Falha(503,"O armazenamento está indisponível.");
        resposta = Response.json({ok:true});
      }
      else if (rota === "evento") {
        await receber(req, contexto, origem);
        resposta = new Response(null,{status:202});
      } else {
        let dado;
        if (PAREAMENTO_NATIVO.has(rota)) {
          if (rota==="iphone/migrar") {
            if (!legado) throw new Falha(401,"O passe anterior e o ticket são necessários.");
            dado=await dispositivos.migrar(token,await corpo(req));
          } else {
            if (!duravel) throw new Falha(401,"A concessão do aparelho é necessária.");
            const sair=rota==="iphone/desvincular";
            dado=await dispositivos.gerirSessao(token,await corpo(req),sair);
            if (sair)dado=new Response(null,{status:204});
          }
        } else {
          const firebase=legado?"Bearer "+await lerLegadoAtual(token):header;
          if(sessao)await dispositivos.validarSessao(token);
          else await permitirFirebase(firebase,!legado && !GESTAO_IPHONE.has(rota));
          if (rota===EMITIR_PASSE)dado=await passes.emitir(await corpo(req),firebase.slice(7),dispositivos.parear);
          else if(rota==="iphone/dispositivos")dado=await dispositivos.listar(uidDoIdVerificado(firebase.slice(7)));
          else if(rota==="iphone/revogar")dado=await dispositivos.revogar((await corpo(req)).id,uidDoIdVerificado(firebase.slice(7)));
          else if(rota==="anotacao")dado=await anotar(req);
          else dado=await consultar(rota,url,agora());
        }
        resposta = dado instanceof Response ? dado : Response.json(dado);
      }
    } catch (erro) {
      const prevista = erro instanceof Falha || erro instanceof FalhaPasse || erro instanceof ErroFarol;
      const status = prevista ? erro.status : erro instanceof RangeError ? 422 : 503;
      if (!(prevista || erro instanceof RangeError)) {
        // Só o tipo do erro operacional; sem URL de credenciais, corpo, IP ou user-agent.
        console.error("contagem: serviço indisponível", erro?.constructor?.name);
      }
      resposta = Response.json({erro:prevista || erro instanceof RangeError ? erro.message : "O serviço está temporariamente indisponível."},{status});
    }
    for (const [k,v] of headers) resposta.headers.set(k,v);
    return resposta;
  };
}
