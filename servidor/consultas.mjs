// servidor/consultas.mjs — as agregações do painel em SQL puro sobre a tabela `eventos`. Tudo recebe o relógio
// (`agora`) e o site; nada aqui toca HTTP. A forma de saída é a da porta documentada em painel/demo.js.
//
// Definições (as mesmas da referência em JS dos testes):
//   sessão     = pvs do mesmo visitante com intervalo < 30 min; a origem/campanha da sessão é a do 1º pv
//   visitantes = visitantes únicos POR DIA, somados no período (o hash gira à meia-noite)
//   rejeição   = sessões com 1 pv ÷ sessões
//   duração    = média, por sessão, de (maior instante de "fim" − 1º pv), em segundos
//   entradas/saídas de uma página = sessões cujo 1º/último pv é a página
//   fuso: America/Sao_Paulo, sem horário de verão desde 2019 → offset fixo −03:00

const DIA = 864e5, FUSO_MS = -3 * 3600e3, SESSAO_MS = 30 * 60e3;
const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const SEMANA = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const SEMANA_LONGA = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
const dois = n => (n < 10 ? "0" : "") + n;
const local = t => new Date(t + FUSO_MS);   // Date cujo getUTC* é a hora local
export const inicioDoDia = t => { const l = t + FUSO_MS; return l - (l % DIA) - FUSO_MS; };
const inicioDoMes = t => { const l = local(t); return Date.UTC(l.getUTCFullYear(), l.getUTCMonth(), 1) - FUSO_MS; };
const somaMeses = (t, n) => { const l = local(t); return Date.UTC(l.getUTCFullYear(), l.getUTCMonth() + n, 1) - FUSO_MS; };
const fmtData = t => { const l = local(t); return dois(l.getUTCDate()) + "/" + dois(l.getUTCMonth() + 1); };

// o intervalo do período e do anterior, mais os "baldes" (pontos da série) de cada um
export function periodoDe(periodo, agora) {
  const hoje = inicioDoDia(agora);
  if (periodo === "hoje") {
    const b = i => ({de: hoje + i * 3600e3, ate: hoje + (i + 1) * 3600e3}), hora = local(agora).getUTCHours();
    return {de: hoje, ate: agora, deA: hoje - DIA, ateA: agora - DIA, baldes: Array.from({length: 24}, (_, i) => Object.assign(b(i), {rot: dois(i) + "h", longo: "hoje, " + dois(i) + ":00–" + dois(i) + ":59", longoA: "ontem, " + dois(i) + ":00", futuro: i > hora, deA: b(i).de - DIA, ateA: b(i).ate - DIA})),
      rotulos: ["hoje até " + dois(local(agora).getUTCHours()) + "h" + dois(local(agora).getUTCMinutes()), "ontem até " + dois(local(agora).getUTCHours()) + "h" + dois(local(agora).getUTCMinutes()), fmtData(agora) + "/" + local(agora).getUTCFullYear() + ", até " + dois(local(agora).getUTCHours()) + "h" + dois(local(agora).getUTCMinutes())]};
  }
  if (periodo === "12m") {
    const fim = somaMeses(agora, 1), ini = somaMeses(agora, -11);
    const baldes = Array.from({length: 12}, (_, i) => { const de = somaMeses(ini, i), ate = somaMeses(ini, i + 1), l = local(de), m = l.getUTCMonth(), ano = l.getUTCFullYear(); return {de, ate: Math.min(ate, agora), deA: somaMeses(de, -12), ateA: Math.min(somaMeses(ate, -12), agora - 365 * DIA), rot: MESES[m] + (m === 0 || i === 0 ? "/" + String(ano).slice(2) : ""), longo: MESES[m] + " de " + ano + (i === 11 ? " (até " + fmtData(agora) + ")" : ""), longoA: MESES[m] + " de " + (ano - 1)}; });
    const r = (t, a) => MESES[local(t).getUTCMonth()] + "/" + String(local(t).getUTCFullYear() - (a || 0)).slice(2);
    return {de: ini, ate: agora, deA: somaMeses(ini, -12), ateA: somaMeses(agora, -12), baldes, rotulos: [r(ini) + " a " + r(agora), r(ini, 1) + " a " + r(agora, 1), MESES[local(ini).getUTCMonth()] + "/" + local(ini).getUTCFullYear() + " a " + MESES[local(agora).getUTCMonth()] + "/" + local(agora).getUTCFullYear()]};
  }
  const n = periodo === "7d" ? 7 : 30, de = hoje - (n - 1) * DIA;
  const baldes = Array.from({length: n}, (_, i) => { const d = de + i * DIA, l = local(d); return {de: d, ate: Math.min(d + DIA, agora), deA: d - n * DIA, ateA: Math.min(d + DIA, agora) - n * DIA, rot: n === 7 ? SEMANA[l.getUTCDay()] + " " + l.getUTCDate() : l.getUTCDate() + " " + MESES[l.getUTCMonth()], longo: SEMANA_LONGA[l.getUTCDay()] + ", " + fmtData(d) + (i === n - 1 ? " (até " + dois(local(agora).getUTCHours()) + "h" + dois(local(agora).getUTCMinutes()) + ")" : ""), longoA: SEMANA[local(d - n * DIA).getUTCDay()] + ", " + fmtData(d - n * DIA), d}; });
  return {de, ate: agora, deA: de - n * DIA, ateA: agora - n * DIA, baldes, rotulos: [fmtData(de) + " a " + fmtData(agora), fmtData(de - n * DIA) + " a " + fmtData(agora - n * DIA), (n === 7 ? local(de).getUTCDate() + " a " : fmtData(de) + " a ") + fmtData(agora) + "/" + local(agora).getUTCFullYear()]};
}

const diaLocalDe = t => { const l = local(t); return l.getUTCFullYear() + "-" + dois(l.getUTCMonth() + 1) + "-" + dois(l.getUTCDate()); };
const diaParaInstante = dia => { const [a, m, d] = dia.split("-").map(Number); return Date.UTC(a, m - 1, d) - FUSO_MS; };
export {diaLocalDe};

export function criarConsultas(db, banco = null) {
  // sessões de um site num intervalo: CTE que marca o início de sessão por LAG do visitante (30 min)
  const SESSOES = `
    WITH pv AS (
      SELECT id, visitante, instante, caminho, origem, campanha, pais, uf, cidade, aparelho, navegador, sistema, largura,
             CASE WHEN instante - LAG(instante) OVER (PARTITION BY visitante ORDER BY instante) > ${SESSAO_MS} OR LAG(instante) OVER (PARTITION BY visitante ORDER BY instante) IS NULL THEN 1 ELSE 0 END AS comeca
      FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate
    ), num AS (
      SELECT *, SUM(comeca) OVER (PARTITION BY visitante ORDER BY instante ROWS UNBOUNDED PRECEDING) AS n FROM pv
    ), num2 AS (
      SELECT *, LAST_VALUE(caminho) OVER (PARTITION BY visitante, n ORDER BY instante ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS ultimoCaminho FROM num
    ), sess AS (
      SELECT visitante, n, MIN(instante) AS inicio, MAX(instante) AS fim, COUNT(*) AS pvs,
             MIN(caminho) FILTER (WHERE comeca = 1) AS entrada,
             MIN(ultimoCaminho) AS saida,
             MIN(origem) FILTER (WHERE comeca = 1) AS origem, MIN(campanha) FILTER (WHERE comeca = 1) AS campanha,
             MIN(pais) AS pais, MIN(uf) AS uf, MIN(cidade) AS cidade, MIN(aparelho) AS aparelho, MIN(navegador) AS navegador, MIN(sistema) AS sistema, MIN(largura) AS largura
      FROM num2 GROUP BY visitante, n
    ), sdur AS (
      SELECT s.*, COALESCE((SELECT MAX(f.instante) FROM eventos f WHERE f.site_id = @site AND f.tipo = 'fim' AND f.visitante = s.visitante AND f.instante >= s.inicio AND f.instante < s.fim + ${SESSAO_MS} AND f.instante < @ate + ${SESSAO_MS}), s.inicio) AS ultimoFim
      FROM sess s
    )`;
  const q = {
    totais: db.prepare(SESSOES + `
      SELECT (SELECT COUNT(DISTINCT ((instante + ${FUSO_MS}) / ${DIA}) || '|' || visitante) FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate AND (@filtro IS NULL OR caminho = @filtro)) AS visitantes,
             (SELECT COUNT(*) FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate AND (@filtro IS NULL OR caminho = @filtro)) AS visualizacoes,
             COUNT(*) AS sessoes,
             COALESCE(AVG(CASE WHEN pvs = 1 THEN 1.0 ELSE 0.0 END), 0) AS rejeicao,
             COALESCE(AVG((ultimoFim - inicio) / 1000.0), 0) AS duracao,
             COALESCE(SUM(CASE WHEN entrada = @filtro THEN 1 ELSE 0 END), 0) AS entradas,
             COALESCE(SUM(CASE WHEN saida = @filtro THEN 1 ELSE 0 END), 0) AS saidas
      FROM sdur WHERE @filtro IS NULL OR EXISTS (SELECT 1 FROM num x WHERE x.visitante = sdur.visitante AND x.n = sdur.n AND x.caminho = @filtro)`),
    // página em foco: tempo médio e rolagem média vêm dos "fim" daquela página
    pagina: db.prepare(`SELECT MAX(titulo) AS titulo, AVG(duracao_s) AS tempo, AVG(rolagem) / 100.0 AS rolagem FROM eventos WHERE site_id = @site AND instante >= @de AND instante < @ate AND caminho = @filtro AND (tipo = 'fim' OR (tipo = 'pv' AND titulo IS NOT NULL))`),
    tituloPagina: db.prepare(`SELECT titulo FROM eventos WHERE site_id = @site AND caminho = @filtro AND tipo = 'pv' AND titulo IS NOT NULL ORDER BY instante DESC LIMIT 1`),
    porBalde: {
      visitantes: db.prepare(`SELECT COUNT(DISTINCT ((instante + ${FUSO_MS}) / ${DIA}) || '|' || visitante) AS v FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate AND (@filtro IS NULL OR caminho = @filtro)`),
      visualizacoes: db.prepare(`SELECT COUNT(*) AS v FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate AND (@filtro IS NULL OR caminho = @filtro)`),
      rejeicao: db.prepare(SESSOES + ` SELECT AVG(CASE WHEN pvs = 1 THEN 100.0 ELSE 0.0 END) AS v FROM sdur WHERE @filtro IS NULL OR EXISTS (SELECT 1 FROM num x WHERE x.visitante = sdur.visitante AND x.n = sdur.n AND x.caminho = @filtro)`),
      duracao: db.prepare(SESSOES + ` SELECT AVG((ultimoFim - inicio) / 1000.0) AS v FROM sdur WHERE @filtro IS NULL OR EXISTS (SELECT 1 FROM num x WHERE x.visitante = sdur.visitante AND x.n = sdur.n AND x.caminho = @filtro)`)
    },
    tabelas: {
      paginas_vistas: db.prepare(`SELECT caminho AS chave, COUNT(DISTINCT ((instante + ${FUSO_MS}) / ${DIA}) || '|' || visitante) AS v FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate GROUP BY caminho ORDER BY v DESC`),
      paginas_entrada: db.prepare(SESSOES + ` SELECT entrada AS chave, COUNT(*) AS v FROM sess WHERE entrada IS NOT NULL GROUP BY entrada ORDER BY v DESC`),
      paginas_saida: db.prepare(SESSOES + ` SELECT saida AS chave, COUNT(*) AS v FROM sess WHERE saida IS NOT NULL GROUP BY saida ORDER BY v DESC`),
      origens_origem: db.prepare(SESSOES + ` SELECT origem AS chave, COUNT(DISTINCT ((inicio + ${FUSO_MS}) / ${DIA}) || '|' || visitante) AS v FROM sess WHERE @filtro IS NULL OR EXISTS (SELECT 1 FROM num x WHERE x.visitante = sess.visitante AND x.n = sess.n AND x.caminho = @filtro) GROUP BY origem ORDER BY v DESC`),
      origens_campanha: db.prepare(SESSOES + ` SELECT campanha AS chave, COUNT(DISTINCT ((inicio + ${FUSO_MS}) / ${DIA}) || '|' || visitante) AS v FROM sess WHERE campanha IS NOT NULL AND (@filtro IS NULL OR EXISTS (SELECT 1 FROM num x WHERE x.visitante = sess.visitante AND x.n = sess.n AND x.caminho = @filtro)) GROUP BY campanha ORDER BY v DESC`),
      locais_estados: db.prepare(`SELECT uf AS chave, COUNT(DISTINCT ((instante + ${FUSO_MS}) / ${DIA}) || '|' || visitante) AS v FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate AND uf IS NOT NULL AND (@filtro IS NULL OR caminho = @filtro) GROUP BY uf ORDER BY v DESC`),
      locais_cidades: db.prepare(`SELECT cidade || '|' || COALESCE(uf, '') AS chave, COUNT(DISTINCT ((instante + ${FUSO_MS}) / ${DIA}) || '|' || visitante) AS v FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate AND cidade IS NOT NULL AND (@filtro IS NULL OR caminho = @filtro) GROUP BY cidade, uf ORDER BY v DESC`),
      locais_paises: db.prepare(`SELECT pais AS chave, COUNT(DISTINCT ((instante + ${FUSO_MS}) / ${DIA}) || '|' || visitante) AS v FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate AND pais IS NOT NULL AND (@filtro IS NULL OR caminho = @filtro) GROUP BY pais ORDER BY v DESC`),
      aparelhos_tipo: db.prepare(`SELECT aparelho AS chave, COUNT(DISTINCT ((instante + ${FUSO_MS}) / ${DIA}) || '|' || visitante) AS v FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate AND (@filtro IS NULL OR caminho = @filtro) GROUP BY aparelho ORDER BY v DESC`),
      aparelhos_navegador: db.prepare(`SELECT navegador AS chave, COUNT(DISTINCT ((instante + ${FUSO_MS}) / ${DIA}) || '|' || visitante) AS v FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate AND (@filtro IS NULL OR caminho = @filtro) GROUP BY navegador ORDER BY v DESC`),
      aparelhos_sistema: db.prepare(`SELECT sistema AS chave, COUNT(DISTINCT ((instante + ${FUSO_MS}) / ${DIA}) || '|' || visitante) AS v FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate AND (@filtro IS NULL OR caminho = @filtro) GROUP BY sistema ORDER BY v DESC`)
    },
    metas: db.prepare(`SELECT meta AS chave, COUNT(*) AS v, COUNT(DISTINCT ((instante + ${FUSO_MS}) / ${DIA}) || '|' || visitante) AS visitantes, MAX(instante) AS ultima FROM eventos WHERE site_id = @site AND tipo = 'ev' AND instante >= @de AND instante < @ate AND meta IS NOT NULL AND (@filtro IS NULL OR caminho = @filtro) GROUP BY meta ORDER BY v DESC`),
    larguraCelular: db.prepare(`SELECT largura FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate AND aparelho = 'celular' AND largura IS NOT NULL ORDER BY largura LIMIT 1 OFFSET (SELECT COUNT(*) / 2 FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate AND aparelho = 'celular' AND largura IS NOT NULL)`),
    maisVistaNoCelular: db.prepare(`SELECT caminho, COUNT(*) AS v FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate AND aparelho = 'celular' GROUP BY caminho ORDER BY v DESC LIMIT 1`),
    diaDominante: db.prepare(`SELECT origem, campanha, COUNT(*) AS v FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate AND (@filtro IS NULL OR caminho = @filtro) AND origem != 'direto' GROUP BY origem, campanha ORDER BY v DESC LIMIT 1`),
    // tempo real
    agora: db.prepare(`SELECT COUNT(DISTINCT visitante) AS n FROM eventos WHERE site_id = @site AND instante >= @de AND instante < @ate`),
    vivoUf: db.prepare(`SELECT uf, COUNT(DISTINCT visitante) AS n FROM eventos WHERE site_id = @site AND instante >= @de AND instante < @ate AND uf IS NOT NULL GROUP BY uf`),
    vivoPag: db.prepare(`SELECT caminho, COUNT(DISTINCT visitante) AS n FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate GROUP BY caminho`),
    vivoOrg: db.prepare(`SELECT origem, COUNT(DISTINCT visitante) AS n FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate AND origem != 'direto' GROUP BY origem`),
    vivoMinutos: db.prepare(`SELECT (instante - @de) / 60000 AS m, COUNT(*) AS n FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate GROUP BY m`),
    vivoFeed: db.prepare(`SELECT instante, caminho, origem, cidade, uf, aparelho, navegador, sistema FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate ORDER BY instante DESC LIMIT 12`),
    vivoHora: db.prepare(`SELECT COUNT(*) AS n FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate`),
    primeiroEvento: db.prepare(`SELECT MIN(instante) AS t FROM eventos WHERE site_id = @site`),
    picoHoje: db.prepare(`SELECT (instante + ${FUSO_MS}) / 60000 AS m, COUNT(DISTINCT visitante) AS n FROM eventos WHERE site_id = @site AND tipo = 'pv' AND instante >= @de AND instante < @ate GROUP BY (instante + ${FUSO_MS}) / 300000 ORDER BY n DESC, m LIMIT 1`)
  };
  // node:sqlite rejeita parâmetro nomeado que a query não declara: cada statement recebe só os seus
  const todos = [];
  (function colher(o) { for (const v of Object.values(o)) { if (v && typeof v.sourceSQL === "string") todos.push(v); else if (v && typeof v === "object") colher(v); } })(q);
  // node:sqlite vincula todo number JS como REAL (até 60000): divisões inteiras no SQL virariam fração e GROUP BY
  // por minuto/dia se desfaria. Instantes e ids vão como BigInt, que vincula como INTEGER.
  const int = n => (typeof n === "number" && Number.isInteger(n) ? BigInt(n) : n);
  const P = (site, de, ate, filtro = null) => ({site: int(site), de: int(de), ate: int(ate), filtro});
  // cada statement recebe só os parâmetros que declara (node:sqlite rejeita nome a mais)
  const declarados = new Map(todos.map(st => [st, new Set((st.sourceSQL.match(/@\w+/g) || []).map(x => x.slice(1)))]));
  const exec = (st, modo, p) => { const quer = declarados.get(st); const q = {}; for (const k of quer) q[k] = p[k]; return st[modo](q); };

  function totais(site, de, ate, filtro = null) {
    const t = exec(q.totais, "get", P(site, de, ate, filtro));
    return {visitantes: t.visitantes, visualizacoes: t.visualizacoes, sessoes: t.sessoes, rejeicao: t.rejeicao, duracao: t.duracao, entradas: t.entradas, saidas: t.saidas};
  }

  function visao({site, periodo = "30d", metrica = "visitantes", filtro = null, agora}) {
    const p = periodoDe(periodo, agora);
    const atual = totais(site, p.de, p.ate, filtro), anterior = totais(site, p.deA, p.ateA, filtro);
    const sel = q.porBalde[metrica] || q.porBalde.visitantes;
    const serie = p.baldes.map(b => {
      const v = b.futuro ? null : (exec(sel, "get", P(site, b.de, b.ate, filtro)).v ?? 0), a = exec(sel, "get", P(site, b.deA, b.ateA, filtro)).v ?? 0;
      return {rot: b.rot, longo: b.longo, longoA: b.longoA, v, a, d: b.d != null ? b.d : null};
    });
    // marco: o dia que mais se destaca (≥ 1,8× a mediana dos dias com dado) — anotado com a origem/campanha dominante
    let marco = null;
    if (periodo === "7d" || periodo === "30d") {
      const vals = serie.map(s => s.v).filter(v => v != null && v > 0).sort((x, y) => x - y);
      const mediana = vals.length ? vals[Math.floor(vals.length / 2)] : 0;
      let melhor = null;
      // o maior dia do período, se destoa de verdade (≥ 1,5× a mediana): flutuação normal não ganha anotação
      serie.forEach((s, i) => { if (s.v != null && mediana && s.v >= mediana * 1.5 && (!melhor || s.v > melhor.v)) melhor = {v: s.v, i}; });
      if (melhor) {
        const b = p.baldes[melhor.i], dom = exec(q.diaDominante, "get", P(site, b.de, b.ate, filtro));
        const rot = {google: "Busca no Google", instagram: "Instagram", pinterest: "Pinterest", newsletter: "Newsletter", whatsapp: "WhatsApp", facebook: "Facebook", x: "X (Twitter)", youtube: "YouTube", tiktok: "TikTok", bing: "Bing"};
        marco = {d: b.d, texto: dom ? (dom.campanha ? dom.campanha : (rot[dom.origem] || dom.origem)) : "Pico do período"};
      }
    }
    // anotações manuais (por dia) entram como marcos e vencem o automático no mesmo dia
    const anotacoes = (p.baldes[0].d != null && banco) ? banco.anotacoes(site, diaLocalDe(p.de), diaLocalDe(agora)) : [];
    const marcos = [];
    if (marco) marcos.push(Object.assign({auto: true}, marco));
    for (const a of anotacoes) { const dia = diaParaInstante(a.dia); const i = marcos.findIndex(m => m.d === dia); const m = {d: dia, texto: a.texto, manual: true}; if (i >= 0) marcos[i] = m; else marcos.push(m); }
    marcos.sort((x, y) => x.d - y.d);
    marco = marcos.length ? marcos[marcos.length - 1] : null;
    const primeiro = exec(q.primeiroEvento, "get", {site: int(site)});
    let pagina = null;
    if (filtro) {
      const pg = exec(q.pagina, "get", P(site, p.de, p.ate, filtro)), tit = q.tituloPagina.get({site: int(site), filtro});
      pagina = {cam: filtro, tit: (tit && tit.titulo) || filtro, entradas: atual.entradas, saidas: atual.saidas, tempo: pg && pg.tempo != null ? pg.tempo : 0, rolagem: pg && pg.rolagem != null ? pg.rolagem : 0};
    }
    return {
      serie,
      totais: {visitantes: [atual.visitantes, anterior.visitantes], visualizacoes: [atual.visualizacoes, anterior.visualizacoes], rejeicao: [atual.rejeicao, anterior.rejeicao], duracao: [atual.duracao, anterior.duracao]},
      rotulos: p.rotulos, marco, marcos, pagina,
      desde: primeiro && primeiro.t != null ? primeiro.t : null   // quando o site começou a contar (null = nunca)
    };
  }

  const ICONE = {celular: "celular", computador: "computador", tablet: "tablet"};
  const ROTULO_AP = {celular: "Celular", computador: "Computador", tablet: "Tablet"};
  function tabela({site, periodo = "30d", filtro = null, nome, aba, agora, rotuloOrigem = x => x, corOrigem = () => "#6a6d87", inicialOrigem = x => x.slice(0, 1).toUpperCase()}) {
    const p = periodoDe(periodo, agora);
    if (nome === "metas") {
      const t = exec(q.totais, "get", P(site, p.de, p.ate, filtro));
      const linhas = exec(q.metas, "all", P(site, p.de, p.ate, filtro)).map(r => ({tipo: "texto", rotulo: r.chave, chave: r.chave, v: r.v, visitantes: r.visitantes, taxa: t.sessoes ? r.v / t.sessoes : 0, ultima: r.ultima}));
      return {linhas, leitura: null, sessoes: t.sessoes};
    }
    const chaveQ = nome + "_" + aba;
    const st = q.tabelas[chaveQ];
    if (!st) return null;
    const params = P(site, p.de, p.ate, filtro);
    const linhas = exec(st, "all", params).map(r => {
      if (nome === "paginas") return {tipo: "codigo", chave: r.chave, texto: r.chave, v: r.v, pagina: true, foco: !!filtro && r.chave === filtro};
      if (nome === "origens" && aba === "campanha") return {tipo: "codigo", texto: r.chave, v: r.v};
      if (nome === "origens") return {tipo: "origem", rotulo: rotuloOrigem(r.chave), cor: corOrigem(r.chave), ini: inicialOrigem(r.chave), v: r.v};
      if (nome === "locais" && aba === "cidades") { const [cid, uf] = r.chave.split("|"); return {tipo: "sigla", sigla: uf || "–", rotulo: cid, v: r.v}; }
      if (nome === "locais") return {tipo: "sigla", sigla: r.chave, rotulo: nome === "locais" && aba === "estados" ? (NOME_UF[r.chave] || r.chave) : (NOME_PAIS[r.chave] || r.chave), v: r.v};
      if (nome === "aparelhos" && aba === "tipo") return {tipo: "icone", icone: ICONE[r.chave] || "computador", rotulo: ROTULO_AP[r.chave] || r.chave, v: r.v};
      return {tipo: "texto", rotulo: r.chave, v: r.v};
    });
    const leitura = nome === "aparelhos" ? leituraAparelhos({site, de: p.de, ate: p.ate, filtro, aba, linhas}) : null;
    return {linhas, leitura};
  }

  // a "Leitura do mês": regras em ordem, com os números reais; null quando há pouco dado
  function leituraAparelhos({site, de, ate, filtro, aba, linhas}) {
    const soma = linhas.reduce((t, r) => t + r.v, 0);
    if (soma < 20) return null;
    const pctDe = chave => Math.round((linhas.find(r => (r.rotulo === chave || r.icone === chave)) || {v: 0}).v / soma * 100);
    if (aba === "sistema") { const m = pctDe("Android") + pctDe("iOS"); return m >= 50 ? "Android e iOS somam " + m + "% das visitas. Vale testar o checkout nos dois antes da próxima campanha." : "Windows e macOS somam " + (pctDe("Windows") + pctDe("macOS")) + "% das visitas: a maioria lê no computador."; }
    if (aba === "navegador") { const l = linhas[0]; return l ? l.rotulo + " é o navegador de " + Math.round(l.v / soma * 100) + "% das visitas. Teste o site nele primeiro." : null; }
    const cel = pctDe("celular"), comp = pctDe("computador");
    if (filtro) {
      const geral = exec(q.tabelas.aparelhos_tipo, "all", P(site, de, ate, null)), somaG = geral.reduce((t, r) => t + r.v, 0);
      const compGeral = somaG ? Math.round((geral.find(r => r.chave === "computador") || {v: 0}).v / somaG * 100) : 0;
      if (comp > compGeral + 5) return "Quem lê esta página usa mais o computador do que a média do site: " + comp + "% contra " + compGeral + "%. Textos longos pedem tela grande.";
      if (cel > 0) return cel + "% de quem abre esta página está no celular. Confira como ela fica em " + (exec(q.larguraCelular, "get", P(site, de, ate, null)) || {largura: 390}).largura + " px.";
    }
    if (cel >= 50) {
      const mv = exec(q.maisVistaNoCelular, "get", P(site, de, ate, null)), lg = exec(q.larguraCelular, "get", P(site, de, ate, null));
      return cel + "% das visitas chegam pelo celular" + (mv ? ", e " + (mv.caminho === "/" ? "a página inicial é a mais vista nele" : mv.caminho + " é a página mais vista nele") : "") + ". Confira a vitrine em " + (lg ? lg.largura : 390) + " px antes de cada lançamento.";
    }
    return comp + "% das visitas chegam pelo computador. Vale conferir a tela larga primeiro, sem esquecer o celular (" + cel + "%).";
  }

  function vivo({site, agora, rotuloOrigem = x => x, corOrigem = () => "#6a6d87", inicialOrigem = x => x.slice(0, 1).toUpperCase()}) {
    const de5 = agora - 5 * 60e3, de30 = agora - 30 * 60e3, de60 = agora - 3600e3, hoje = inicioDoDia(agora);
    const n = exec(q.agora, "get", P(site, de5, agora)).n, antes = exec(q.agora, "get", P(site, de5 - 5 * 60e3, de5)).n;
    const uf = {}; for (const r of exec(q.vivoUf, "all", P(site, de5, agora))) uf[r.uf] = r.n;
    const pag = {}; for (const r of exec(q.vivoPag, "all", P(site, de5, agora))) pag[r.caminho] = r.n;
    const org = {}; for (const r of exec(q.vivoOrg, "all", P(site, de5, agora))) org[r.origem] = r.n;
    const minutos = new Array(30).fill(0); for (const r of exec(q.vivoMinutos, "all", P(site, de30, agora))) if (r.m >= 0 && r.m < 30) minutos[r.m] = r.n;
    const feed = exec(q.vivoFeed, "all", P(site, de30, agora)).map(r => ({cidade: r.cidade || (r.uf ? NOME_UF[r.uf] : (r.pais ? NOME_PAIS[r.pais] || r.pais : "Local desconhecido")), uf: r.uf || "", pag: r.caminho, org: {id: r.origem, rot: rotuloOrigem(r.origem), cor: corOrigem(r.origem), ini: inicialOrigem(r.origem)}, ap: [r.aparelho, ROTULO_AP[r.aparelho] || r.aparelho], nav: r.navegador + " no " + r.sistema, t: r.instante}));
    const pico = exec(q.picoHoje, "get", P(site, hoje, agora));
    return {agora: n, variacao5min: n - antes, uf, pag, origens: Object.keys(org).map(k => ({id: k, rot: rotuloOrigem(k), cor: corOrigem(k), ini: inicialOrigem(k), v: org[k]})), minutos, feed, visualizacoesHora: exec(q.vivoHora, "get", P(site, de60, agora)).n,
      visitantesHoje: totais(site, hoje, agora).visitantes, picoHoje: pico ? {n: pico.n, hora: dois(Math.floor((pico.m % 1440) / 60)) + ":" + dois(pico.m % 60)} : null};
  }

  return {totais, visao, tabela, vivo, periodoDe};
}

export const NOME_UF = {AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia", CE: "Ceará", DF: "Distrito Federal", ES: "Espírito Santo", GO: "Goiás", MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul", MG: "Minas Gerais", PA: "Pará", PB: "Paraíba", PR: "Paraná", PE: "Pernambuco", PI: "Piauí", RJ: "Rio de Janeiro", RN: "Rio Grande do Norte", RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima", SC: "Santa Catarina", SP: "São Paulo", SE: "Sergipe", TO: "Tocantins"};
export const NOME_PAIS = {BR: "Brasil", PT: "Portugal", US: "Estados Unidos", AR: "Argentina", DE: "Alemanha", JP: "Japão", ES: "Espanha", FR: "França", IT: "Itália", GB: "Reino Unido", CA: "Canadá", MX: "México", CL: "Chile", CO: "Colômbia", UY: "Uruguai", PY: "Paraguai", PE: "Peru", NL: "Países Baixos", IE: "Irlanda", AU: "Austrália", CN: "China", IN: "Índia", AO: "Angola", MZ: "Moçambique", CH: "Suíça", BE: "Bélgica", SE: "Suécia", NO: "Noruega", DK: "Dinamarca", FI: "Finlândia", PL: "Polônia", RU: "Rússia", KR: "Coreia do Sul", ZA: "África do Sul", IL: "Israel", TR: "Turquia", AE: "Emirados Árabes", SG: "Singapura", NZ: "Nova Zelândia", BO: "Bolívia", EC: "Equador", VE: "Venezuela", CV: "Cabo Verde", TL: "Timor-Leste", GW: "Guiné-Bissau", ST: "São Tomé e Príncipe", MO: "Macau"};
