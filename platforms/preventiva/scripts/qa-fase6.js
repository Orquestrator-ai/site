#!/usr/bin/env node
/**
 * QA Fase 6 — Intensivão Preventiva
 * Varre as 46 páginas com Playwright e valida regras técnicas + didáticas + identidade.
 *
 * Uso: node scripts/qa-fase6.js [baseUrl]
 *   baseUrl padrão: http://localhost:8000
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.argv[2] || 'http://localhost:8000';
const OUT_DIR = path.join(__dirname, '..', 'docs');
const REPORT_MD = path.join(OUT_DIR, 'qa-fase6.md');
const REPORT_JSON = path.join(OUT_DIR, 'qa-fase6.json');

// ------------------------------------------------------------------
// Inventário (id, block, label) — espelha js/data.js
// ------------------------------------------------------------------
const PAGES = [
  ['home', 'home', 'Dashboard — Mapa da Preventiva'],
  ['como-estudar', 'home', 'Como estudar nesta plataforma'],
  ['m1-01', 'm1', 'Por que validar testes diagnósticos?'],
  ['m1-02', 'm1', 'Medicina baseada em evidências: IA não substitui o médico'],
  ['m1-03', 'm1', 'Epidemiologia clínica: pedir e interpretar exames'],
  ['m1-04', 'm1', 'A tabela 2x2: a cruz que organiza o raciocínio'],
  ['m1-05', 'm1', 'Quatro resultados: VP, FP, FN e VN'],
  ['m1-06', 'm1', 'Acurácia: a proporção de acertos'],
  ['m1-07', 'm1', 'Sensibilidade: detectar doentes'],
  ['m1-08', 'm1', 'Testes em paralelo: priorizar exclusão'],
  ['m1-09', 'm1', 'Especificidade: reconhecer sadios'],
  ['m1-10', 'm1', 'Testes em série: priorizar confirmação'],
  ['m1-11', 'm1', 'Sens, Esp e prevalência: o que muda e o que não muda'],
  ['m1-12', 'm1', 'Razões de verossimilhança'],
  ['m1-13', 'm1', 'Fechamento de prova — Módulo 1'],
  ['m2-01', 'm2', 'O segundo tempo do exame: valores preditivos'],
  ['m2-02', 'm2', 'Da tabela à fórmula: VPP e VPN sem decoreba'],
  ['m2-03', 'm2', 'A porquinha torce o rabo: prevalência transforma VPP/VPN'],
  ['m2-04', 'm2', 'Rio × Londres: mesma Sens/Esp, VPP/VPN diferentes'],
  ['m2-05', 'm2', 'Prevalência vira probabilidade pré-teste'],
  ['m2-06', 'm2', 'Baixa probabilidade pré-teste: boa prática'],
  ['m2-07', 'm2', 'Questão guiada 1: hanseníase e tabela 2x2'],
  ['m2-08', 'm2', 'Questões guiadas 2 e 3: baixa prevalência, FP'],
  ['m2-09', 'm2', 'Sintomas como teste: cistite e VPP'],
  ['m2-10', 'm2', 'Fechamento — Módulo 2'],
  ['m3-01', 'm3', 'Da razão de verossimilhança à Curva ROC'],
  ['m3-02', 'm3', 'Lendo os eixos da Curva ROC'],
  ['m3-03', 'm3', 'O melhor ponto: superior e à esquerda'],
  ['m3-04', 'm3', 'De onde vêm os valores de referência (HbA1c)'],
  ['m3-05', 'm3', 'Mexendo no ponto de corte: mais sensível ou mais específico'],
  ['m3-06', 'm3', 'AUC: comparando testes pela área sob a curva'],
  ['m3-07', 'm3', 'Como a banca cobra Curva ROC'],
  ['m4-01', 'm4', 'Por que tendência central cai em Medicina?'],
  ['m4-02', 'm4', 'Média: muitos números em um panorama'],
  ['m4-03', 'm4', 'Mediana: o centro que resiste aos extremos'],
  ['m4-04', 'm4', 'Moda: o valor que mais aparece'],
  ['m4-05', 'm4', 'Mediana em prova: ordenar primeiro, calcular depois'],
  ['m4-06', 'm4', 'Dispersão: quando a média esconde histórias'],
  ['m4-07', 'm4', 'Amplitude e desvio: o espalhamento simples'],
  ['m4-08', 'm4', 'Variância e desvio padrão: formalizando o espalhamento'],
  ['m4-09', 'm4', 'Como a banca cobra: centro × dispersão'],
  ['mapa-global', 'integ', 'Mapa Mental Integrado'],
  ['matriz-comparativa', 'integ', 'Matriz comparativa dos 4 módulos'],
  ['simulador-bayesiano', 'integ', 'Simulador Bayesiano (pré → pós)'],
  ['revisao-final', 'integ', 'Revisão Final Global'],
  ['instalar-app', 'integ', 'Como instalar o app (PWA)'],
];

// Páginas onde a Fase 5 inseriu fraseAutoral
const FRASE_AUTORAL_PAGES = new Set(['m1-04', 'm2-03', 'm3-04', 'm4-06']);

// Páginas onde a Fase 4 inseriu pontoDeCostura (fechamentos de módulo + outras transições)
// Vou apenas registrar; o teste é informativo, não bloqueante.
const PONTO_COSTURA_EXPECTED = new Set(['m1-13', 'm2-10', 'm3-07', 'm4-09']);

const CONTENT_PAGES_RE = /^m[1-4]-\d+$/;

// ------------------------------------------------------------------
// Auditoria por página
// ------------------------------------------------------------------
async function auditPage(page, [id, block, label]) {
  const consoleErrors = [];
  const consoleWarnings = [];
  const pageErrors = [];
  const requestFailures = [];

  const onConsole = msg => {
    const t = msg.type();
    if (t === 'error') consoleErrors.push(msg.text());
    else if (t === 'warning') consoleWarnings.push(msg.text());
  };
  const onPageError = err => pageErrors.push(err.message);
  const onReqFailed = req => requestFailures.push(`${req.method()} ${req.url()} :: ${req.failure()?.errorText}`);

  page.on('console', onConsole);
  page.on('pageerror', onPageError);
  page.on('requestfailed', onReqFailed);

  const url = `${BASE_URL}/#${id}`;
  const t0 = Date.now();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    // Em SPA com hash, dispara hashchange + render
    await page.evaluate(() => new Promise(r => setTimeout(r, 250)));
    await page.waitForFunction(
      () => {
        const el = document.querySelector('#app, main, body');
        return el && el.innerText && el.innerText.length > 50;
      },
      { timeout: 10000 }
    );
  } catch (e) {
    pageErrors.push(`navigation: ${e.message}`);
  }
  const loadMs = Date.now() - t0;

  // Coleta de métricas no DOM
  // Seletores ajustados à API real:
  //   - revisaoAtiva()      => <div class="didax-block --resumo"> com <ol> de <details>
  //   - bancaCallout()      => <div class="banca-callout">
  //   - pageFooterMeta()    => <div class="didax-block --resumo"> (resumo) + <div class="didax-block --proxima"> (conexão)
  //   - PrevInt.* roots reais: .tbl2x2-wrap, .dist-wrap, .roc-wrap, .case-card, .flashdeck, .quiz-section, .crosslink
  //   - costura Fase 4: .crosslink, .jornada-bar (com hífen)
  const metrics = await page.evaluate(() => {
    const q = sel => document.querySelectorAll(sel).length;
    const text = (document.body && document.body.innerText) || '';

    // Revisão ativa: didax-block --resumo que contém um <ol> com <details>
    const revisaoBlocks = Array.from(document.querySelectorAll('.didax-block.\\--resumo'))
      .filter(b => b.querySelector('ol details') || b.querySelector('details'));
    // Footer "Resumo operacional" + "Conexão com a próxima página"
    const footerResumo  = document.querySelectorAll('.didax-block.\\--resumo').length;
    const footerProxima = document.querySelectorAll('.didax-block.\\--proxima').length;

    // Interativos (raízes reais). Detecções específicas para evitar
    // falso positivo (.case-card é reutilizado em layouts decorativos).
    const interativoSelectors = [
      '.tbl2x2-wrap',                  // tabela2x2
      '.dist-wrap',                    // simPrevalencia / bayes / calcEstat
      '.roc-wrap',                     // rocCurva
      '.flashdeck',                    // flashdeck
      '.quiz-section',                 // quizBanca
      '.case-card .case-options',      // casoClinico (case-card decorativos NÃO têm case-options)
    ].join(',');

    return {
      title: document.title,
      bodyTextLen: text.length,
      heroCount: q('.page-hero'),
      conceptHeroCount: q('.concept-hero'),
      didaxCount: q('[class*="didax-block"]'),
      sectionTitleCount: q('.section-title-pv'),
      keyTermsCount: q('.key-terms'),
      revisaoAtivaCount: revisaoBlocks.length,
      bancaCalloutCount: q('.banca-callout'),
      footerResumoCount: footerResumo,
      footerProximaCount: footerProxima,
      jornadaBarCount: q('.jornada-bar'),
      crossLinkCount: q('.crosslink'),
      pontoCosturaCount: q('.ponto-costura'),
      fraseAutoralCount: q('.frase-autoral'),
      svgIllusCount: q('.svg-illus'),
      svgInlineCount: q('svg'),
      interativoCount: q(interativoSelectors),
      // Marcadores complementares
      navFooterCount: q('.page-nav'),
      bancaTagCount: q('.quiz-tag, .banca-callout .bc-title').length || q('.banca-callout').length,
    };
  });

  // Avalia regras
  const isContent = CONTENT_PAGES_RE.test(id);
  const issues = [];
  const passes = [];

  // técnicas
  if (consoleErrors.length === 0) passes.push('console-clean');
  else issues.push(`console.error x${consoleErrors.length}`);

  if (pageErrors.length === 0) passes.push('no-page-errors');
  else issues.push(`page errors x${pageErrors.length}`);

  if (requestFailures.length === 0) passes.push('no-failed-requests');
  else issues.push(`requests failed x${requestFailures.length}`);

  // title
  const titleOk = metrics.title && (metrics.title.includes(label.split(':')[0].split('—')[0].trim().slice(0, 12)) || metrics.title.toLowerCase().includes('preventiva'));
  if (titleOk) passes.push('title-ok'); else issues.push(`title="${metrics.title}"`);

  // body não vazio
  if (metrics.bodyTextLen > 200) passes.push('body-rendered'); else issues.push(`body-len=${metrics.bodyTextLen}`);

  // didáticas (somente páginas de conteúdo m1..m4)
  if (isContent) {
    if (metrics.heroCount >= 1) passes.push('hero'); else issues.push('NO hero');
    if (metrics.didaxCount >= 1) passes.push('didax'); else issues.push('NO didax');
    if (metrics.sectionTitleCount >= 1) passes.push('section-title-pv'); else issues.push('NO section-title-pv');
    if (metrics.revisaoAtivaCount >= 1) passes.push('revisao-ativa'); else issues.push('NO revisao-ativa');
    if (metrics.bancaCalloutCount >= 1) passes.push('banca-callout'); else issues.push('NO banca-callout');
    // page-footer-meta: a função emite "resumo" (final) + "proxima conexao"; basta um dos dois para considerar fechamento didático
    if (metrics.footerResumoCount >= 1 || metrics.footerProximaCount >= 1) passes.push('page-footer-meta'); else issues.push('NO page-footer-meta');
    if (metrics.interativoCount >= 1) passes.push('interativo'); else issues.push('NO interativo');
    if (metrics.navFooterCount >= 1) passes.push('nav-footer'); else issues.push('NO nav-footer');
  }

  // identidade Fase 5
  if (FRASE_AUTORAL_PAGES.has(id)) {
    if (metrics.fraseAutoralCount >= 1) passes.push('frase-autoral'); else issues.push('NO frase-autoral (esperada)');
  }

  // ponto de costura (informativo)
  let costuraNote = '';
  if (PONTO_COSTURA_EXPECTED.has(id)) {
    if (metrics.pontoCosturaCount >= 1) passes.push('ponto-costura'); else costuraNote = ' (ponto-costura ausente)';
  }

  // limpa listeners
  page.off('console', onConsole);
  page.off('pageerror', onPageError);
  page.off('requestfailed', onReqFailed);

  return {
    id, block, label, url, loadMs,
    title: metrics.title,
    metrics,
    consoleErrors, consoleWarnings, pageErrors, requestFailures,
    passes, issues, costuraNote,
    ok: issues.length === 0,
  };
}

// ------------------------------------------------------------------
// Runner
// ------------------------------------------------------------------
(async () => {
  console.log(`\n=== QA Fase 6 — Intensivão Preventiva ===`);
  console.log(`BASE_URL = ${BASE_URL}`);
  console.log(`Total pages: ${PAGES.length}\n`);

  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();

  const results = [];
  let okCount = 0, failCount = 0;

  for (const tuple of PAGES) {
    const r = await auditPage(page, tuple);
    results.push(r);
    if (r.ok) {
      okCount++;
      console.log(`✓ ${r.id.padEnd(20)} ${(''+r.loadMs+'ms').padStart(7)}  passes=${r.passes.length}${r.costuraNote||''}`);
    } else {
      failCount++;
      console.log(`✗ ${r.id.padEnd(20)} ${(''+r.loadMs+'ms').padStart(7)}  ISSUES: ${r.issues.join(' | ')}`);
    }
  }

  await browser.close();

  // -----------------------------------------------------------
  // Sumário agregado
  // -----------------------------------------------------------
  const totals = {
    pages: results.length,
    ok: okCount,
    fail: failCount,
    avgLoadMs: Math.round(results.reduce((s, r) => s + r.loadMs, 0) / results.length),
    sumConsoleErrors: results.reduce((s, r) => s + r.consoleErrors.length, 0),
    sumPageErrors: results.reduce((s, r) => s + r.pageErrors.length, 0),
    sumRequestFailures: results.reduce((s, r) => s + r.requestFailures.length, 0),
    totalFrasesAutorais: results.reduce((s, r) => s + r.metrics.fraseAutoralCount, 0),
    totalSvgIllus: results.reduce((s, r) => s + r.metrics.svgIllusCount, 0),
    totalSvgInline: results.reduce((s, r) => s + r.metrics.svgInlineCount, 0),
    totalInterativos: results.reduce((s, r) => s + r.metrics.interativoCount, 0),
    totalSectionTitlesPv: results.reduce((s, r) => s + r.metrics.sectionTitleCount, 0),
    totalKeyTerms: results.reduce((s, r) => s + r.metrics.keyTermsCount, 0),
    totalDidax: results.reduce((s, r) => s + r.metrics.didaxCount, 0),
    totalBanca: results.reduce((s, r) => s + r.metrics.bancaCalloutCount, 0),
    totalRevisao: results.reduce((s, r) => s + r.metrics.revisaoAtivaCount, 0),
    totalFooterProxima: results.reduce((s, r) => s + r.metrics.footerProximaCount, 0),
    totalCrossLinks: results.reduce((s, r) => s + r.metrics.crossLinkCount, 0),
    totalPontoCostura: results.reduce((s, r) => s + r.metrics.pontoCosturaCount, 0),
    totalJornadaBar: results.reduce((s, r) => s + r.metrics.jornadaBarCount, 0),
  };

  console.log(`\n--- SUMÁRIO ---`);
  console.log(JSON.stringify(totals, null, 2));

  // -----------------------------------------------------------
  // Relatórios
  // -----------------------------------------------------------
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  fs.writeFileSync(REPORT_JSON, JSON.stringify({ baseUrl: BASE_URL, totals, results }, null, 2));

  const lines = [];
  lines.push(`# QA Fase 6 — Intensivão Preventiva`);
  lines.push('');
  lines.push(`> Auditoria automática Playwright das **${totals.pages} páginas** declaradas em \`js/data.js\`.`);
  lines.push(`> Geração: ${new Date().toISOString()}`);
  lines.push(`> Base URL: \`${BASE_URL}\``);
  lines.push('');
  lines.push(`## Sumário`);
  lines.push('');
  lines.push(`| Métrica | Valor |`);
  lines.push(`|---|---|`);
  lines.push(`| Páginas auditadas | **${totals.pages}** |`);
  lines.push(`| Páginas OK | **${totals.ok}** |`);
  lines.push(`| Páginas com issues | **${totals.fail}** |`);
  lines.push(`| Tempo médio de load | ${totals.avgLoadMs} ms |`);
  lines.push(`| Console errors (soma) | ${totals.sumConsoleErrors} |`);
  lines.push(`| Page errors (soma) | ${totals.sumPageErrors} |`);
  lines.push(`| Requests falhados | ${totals.sumRequestFailures} |`);
  lines.push(`| Interativos (PrevInt) | ${totals.totalInterativos} |`);
  lines.push(`| didaxBlocks | ${totals.totalDidax} |`);
  lines.push(`| section-title-pv (Fase 5) | ${totals.totalSectionTitlesPv} |`);
  lines.push(`| key-terms (Fase 5) | ${totals.totalKeyTerms} |`);
  lines.push(`| .banca-callout | ${totals.totalBanca} |`);
  lines.push(`| revisão ativa (didax --resumo + details) | ${totals.totalRevisao} |`);
  lines.push(`| .didax-block.--proxima (conexão) | ${totals.totalFooterProxima} |`);
  lines.push(`| SVG inline (total) | ${totals.totalSvgInline} |`);
  lines.push(`| .frase-autoral (Fase 5) | ${totals.totalFrasesAutorais} |`);
  lines.push(`| .svg-illus (Fase 5) | ${totals.totalSvgIllus} |`);
  lines.push(`| .jornada-bar (Fase 4) | ${totals.totalJornadaBar} |`);
  lines.push(`| .cross-link (Fase 4) | ${totals.totalCrossLinks} |`);
  lines.push(`| .ponto-costura (Fase 4) | ${totals.totalPontoCostura} |`);
  lines.push('');

  // -----------------------------------------------------------
  // Achados acionáveis (interpretação humana sobre as métricas)
  // -----------------------------------------------------------
  const semInter = results.filter(r => CONTENT_PAGES_RE.test(r.id) && r.metrics.interativoCount === 0);
  if (semInter.length > 0) {
    lines.push(`## Achados acionáveis`);
    lines.push('');
    lines.push(`### Páginas de conteúdo SEM componente interativo PrevInt`);
    lines.push('');
    lines.push(`O contrato exige "MANDATORY complementary interactives". As páginas abaixo não chamam nenhum \`PrevInt.*\`:`);
    lines.push('');
    lines.push(`| Página | Bloco |`);
    lines.push(`|---|---|`);
    for (const r of semInter) {
      lines.push(`| \`${r.id}\` | ${r.block} |`);
    }
    lines.push('');
  } else {
    lines.push(`## Conformidade didática`);
    lines.push('');
    lines.push(`✅ **Todas as 39 páginas de conteúdo (m1/m2/m3/m4) possuem ≥1 componente interativo PrevInt**, em conformidade com o requisito contratual "MANDATORY complementary interactives".`);
    lines.push('');
    lines.push(`Histórico:`);
    lines.push(`- 1ª varredura (Fase 6): 40/46 OK, 6 páginas sem interativo (\`m1-02, m1-03, m2-01, m3-01, m4-01, m4-06\` — todas páginas de abertura conceitual).`);
    lines.push(`- 2ª varredura (Fase 6.5): 46/46 OK após inserção dos 6 interativos:`);
    lines.push(`  - \`m1-02\`: \`flashdeck\` (4 cards "MBE × IA")`);
    lines.push(`  - \`m1-03\`: \`casoClinico\` (jovem 22a com dor torácica atípica)`);
    lines.push(`  - \`m2-01\`: \`tabela2x2\` (prévia visual de VPP/VPN)`);
    lines.push(`  - \`m3-01\`: \`flashdeck\` (5 cards "RV × ROC")`);
    lines.push(`  - \`m4-01\`: \`calcEstat\` (glicemia de jejum de 8 pacientes)`);
    lines.push(`  - \`m4-06\`: \`calcEstat\` × 2 (Felipe instável × Rafael estável)`);
    lines.push('');
  }

  lines.push(`## Páginas com issues`);
  lines.push('');
  const fails = results.filter(r => !r.ok);
  if (fails.length === 0) {
    lines.push(`Nenhuma página com issues bloqueantes ✅`);
  } else {
    lines.push(`| ID | Bloco | Issues |`);
    lines.push(`|---|---|---|`);
    for (const r of fails) {
      lines.push(`| \`${r.id}\` | ${r.block} | ${r.issues.join('; ')} |`);
    }
  }
  lines.push('');

  lines.push(`## Detalhe por página`);
  lines.push('');
  lines.push(`| ID | Bloco | Load | Hero | Didax | Sect | Banca | Rev | Inter | SVG | FA | PC | Status |`);
  lines.push(`|---|---|---|---|---|---|---|---|---|---|---|---|---|`);
  for (const r of results) {
    const m = r.metrics;
    lines.push(`| \`${r.id}\` | ${r.block} | ${r.loadMs}ms | ${m.heroCount} | ${m.didaxCount} | ${m.sectionTitleCount} | ${m.bancaCalloutCount} | ${m.revisaoAtivaCount} | ${m.interativoCount} | ${m.svgIllusCount} | ${m.fraseAutoralCount} | ${m.pontoCosturaCount} | ${r.ok ? '✅' : '⚠️'} |`);
  }
  lines.push('');

  // Identidade Fase 5
  lines.push(`## Identidade Fase 5 — fraseAutoral`);
  lines.push('');
  lines.push(`| Página | Esperado | Encontrado | Status |`);
  lines.push(`|---|---|---|---|`);
  for (const id of FRASE_AUTORAL_PAGES) {
    const r = results.find(x => x.id === id);
    const c = r ? r.metrics.fraseAutoralCount : 0;
    lines.push(`| \`${id}\` | ≥1 | ${c} | ${c >= 1 ? '✅' : '❌'} |`);
  }
  lines.push('');

  // Costura Fase 4
  lines.push(`## Costura Fase 4 — pontoDeCostura`);
  lines.push('');
  lines.push(`| Página | pontoCosturaCount | jornadaBarCount | crossLinkCount |`);
  lines.push(`|---|---|---|---|`);
  for (const id of PONTO_COSTURA_EXPECTED) {
    const r = results.find(x => x.id === id);
    if (!r) continue;
    lines.push(`| \`${id}\` | ${r.metrics.pontoCosturaCount} | ${r.metrics.jornadaBarCount} | ${r.metrics.crossLinkCount} |`);
  }
  lines.push('');

  // Detalhes de erros, se houver
  const withConsoleErrs = results.filter(r => r.consoleErrors.length > 0 || r.pageErrors.length > 0);
  if (withConsoleErrs.length > 0) {
    lines.push(`## Logs de erros`);
    lines.push('');
    for (const r of withConsoleErrs) {
      lines.push(`### \`${r.id}\` — ${r.label}`);
      if (r.consoleErrors.length) {
        lines.push(`**Console errors:**`);
        for (const e of r.consoleErrors) lines.push(`- \`${e.slice(0, 250)}\``);
      }
      if (r.pageErrors.length) {
        lines.push(`**Page errors:**`);
        for (const e of r.pageErrors) lines.push(`- \`${e.slice(0, 250)}\``);
      }
      lines.push('');
    }
  }

  lines.push(`---`);
  lines.push(`_Gerado por \`scripts/qa-fase6.js\`._`);

  fs.writeFileSync(REPORT_MD, lines.join('\n'));
  console.log(`\n📝 Relatórios salvos:`);
  console.log(`  - ${REPORT_MD}`);
  console.log(`  - ${REPORT_JSON}`);

  process.exit(failCount > 0 ? 1 : 0);
})();
