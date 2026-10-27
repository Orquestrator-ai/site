/* _build.mjs — montador do index.html da Aula 03 (Pediatria Bauer · Baixa estatura).
   Embute os SVGs (pisos + heróis) byte-exato a partir do _PIPELINE/aula03 (preserva CDATA/<script>).
   Roda: node _build.mjs  →  escreve index.html ao lado.
   NÃO faz parte do runtime; é ferramenta de build do Executor. */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const PIPE = resolve(__dir, '../../_PIPELINE/aula03');

/* ---- loaders de SVG (verbatim) ---- */
const piso = (n) => readFileSync(resolve(PIPE, `piso-svgs/p${n}-piso.svg`), 'utf8').trim();
// heróis self-contained: página → arquivo (P14 fluxograma; P15 curvas + Manu)
const HERO_FILE = {
  p14: 'heroi-p14-fluxograma.svg',
  p15: 'heroi-p15-curvas-manu.svg',
};
const hero = (id) => readFileSync(resolve(PIPE, `heroes/${HERO_FILE[id]}`), 'utf8').trim();

/* ---- componentes reutilizáveis ---- */
const IMGBASE = '../../assets/img/aula-03-baixa-estatura';

// figure.med — imagem real com caption "Achado:" + fonte/licença + tarja opcional
function med({ file, alt, achado, fonte, licenca, tarja }) {
  const tarjaEl = tarja ? `<span class="med__tarja med__tarja--${tarja}" data-label="privacidade" aria-hidden="true"></span>` : '';
  return `
  <figure class="med">
    <div class="img-wrap">
      <img src="${IMGBASE}/${file}" alt="${alt}" loading="lazy" decoding="async">
      ${tarjaEl}
    </div>
    <figcaption>
      <strong>Achado:</strong> ${achado}
      <span class="attr">${fonte} · ${licenca}</span>
    </figcaption>
  </figure>`;
}

// piso SVG inline com frame + caption + hint
function svgPiso(n, { caption, hint }) {
  return `
  <figure class="figure-svg figure-svg__embed">
    <div class="figure-svg__frame figure-svg__stage" data-hs-stage="piso-p${n}">
      ${piso(n)}
    </div>
    <figcaption><strong>Interativo —</strong> ${caption}${hint ? `<br><span class="figure-svg__hint">${hint}</span>` : ''}</figcaption>
  </figure>`;
}

// nota-banca (blindagem SBP discreta, ledger §0)
function notaBanca(html) {
  return `
  <aside class="nota-banca">
    <svg class="nota-banca__shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    <div class="nota-banca__body"><p><span class="nota-banca__label">Atenção de banca</span>${html}</p></div>
  </aside>`;
}

// nota-valor (bônus do laudo: agrega valor, ícone "+", cor de acento — distinta da nota-banca)
function notaValor(html) {
  return `
  <aside class="nota-valor">
    <svg class="nota-valor__plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
    <div class="nota-valor__body"><p><span class="nota-valor__label">Número de prova</span>${html}</p></div>
  </aside>`;
}

// quiz universal gold — explica TODAS as alternativas
// questions: [{ stem, tf?, alts:[{t, correct, why}] }]
function quiz(pageId, intro, questions) {
  const qs = questions.map((q, qi) => {
    const tfClass = q.tf ? ' quiz__alternatives--tf' : '';
    const alts = q.alts.map((a, ai) => {
      const letter = String.fromCharCode(65 + ai);
      return `
          <button class="quiz__alt" type="button" role="radio" aria-checked="false" data-correct="${a.correct ? 'true' : 'false'}">
            <span class="quiz__alt-letter">${letter}</span><span>${a.t}</span>
          </button>`;
    }).join('');
    const why = q.alts.map((a, ai) => {
      const letter = String.fromCharCode(65 + ai);
      return `<li><strong>${letter})</strong> ${a.why}</li>`;
    }).join('');
    return `
      <li class="quiz__question" data-qid="${pageId}-q${qi + 1}" data-q="${qi + 1}">
        <p class="quiz__stem">${q.stem}</p>
        <div class="quiz__alternatives${tfClass}" role="radiogroup" aria-label="Alternativas da questão ${qi + 1}">
          ${alts}
        </div>
        <div class="quiz__feedback" aria-live="polite" hidden>
          <p class="quiz__verdict"></p>
          <p class="quiz__justification">Por que cada alternativa:</p>
          <ul class="quiz__why">${why}</ul>
        </div>
      </li>`;
  }).join('');
  return `
  <section class="quiz" data-quiz-id="${pageId}" aria-labelledby="${pageId}-quiz-title">
    <h2 class="quiz__title" id="${pageId}-quiz-title">Quiz <span class="quiz__badge">fixação</span></h2>
    <p class="quiz__intro">${intro}</p>
    <ol class="quiz__questions">${qs}</ol>
  </section>`;
}

// nav inter-páginas
function nav(idx, total) {
  return `
  <nav class="page-nav" aria-label="Navegação entre páginas">
    <button class="page-nav__btn page-nav__btn--prev" type="button">← Anterior</button>
    <span class="page-nav__counter">${idx} / ${total}</span>
    <button class="page-nav__btn page-nav__btn--next" type="button">Próxima →</button>
  </nav>`;
}

// page-tag (kicker de identidade)
function tag(variant, label) {
  return `<span class="page-tag page-tag--${variant}"><span class="page-tag__dot" aria-hidden="true"></span>${label}</span>`;
}

// chipset de palavras-chave por página (identidade)
function chips(list) {
  return `<div class="chipset" aria-label="Palavras-chave da página">${list.map((c) => `<span class="chip chip--topic">${c}</span>`).join('')}</div>`;
}

const TOTAL = 15;
// páginas com herói/curvas largas ganham container mais amplo
const WIDE = ['p8', 'p14', 'p15'];
const page = (id, idx, body) => `
    <article class="page page--${id}" id="page-${id}" role="region" aria-label="${id}">
      <div class="page__container${WIDE.includes(id) ? ' page__container--wide' : ''}">
        ${body}
        ${nav(idx, TOTAL)}
      </div>
    </article>`;

/* =========================================================================
   PÁGINAS — texto autoral (texto-aluno canon, anti-metalinguagem).
   Tópicos visíveis = <h3 class="topic-h">. Cada página termina no quiz gold.
   ========================================================================= */
import { buildPages } from './_pages.mjs';
const built = buildPages({ med, svgPiso, hero, notaBanca, notaValor, quiz, tag, chips, page, IMGBASE });

/* ---- menu lateral (15 títulos reais — §5/§6 do prompt-final) ---- */
const MENU_ITEMS = [
  ['p1', 'Manu: a menina baixinha'],
  ['p2', 'Baixa estatura é abaixo do P3 (= Z-2)'],
  ['p3', 'Nem toda criança baixa está doente'],
  ['p4', 'Baixa estatura familiar'],
  ['p5', 'Atraso constitucional'],
  ['p6', 'Patológicas e a pegadinha do GH'],
  ['p7', 'Acondroplasia: desproporcional'],
  ['p8', 'Turner: a cromossomopatia'],
  ['p9', 'As quatro ferramentas (e a estatura)'],
  ['p10', 'Velocidade de crescimento'],
  ['p11', 'Alvo genético'],
  ['p12', 'O alvo da Manu abaixo do P3'],
  ['p13', 'Idade óssea'],
  ['p14', 'O fluxograma em dois passos'],
  ['p15', 'As curvas e o veredito da Manu'],
];
const menu = MENU_ITEMS.map(([id, t], i) =>
  `<li class="menu-panel__item"><a class="menu-panel__link" href="#/${id}" data-page="${id}"><span class="menu-panel__index">${String(i + 1).padStart(2, '0')}</span><span>${t}</span></a></li>`
).join('\n          ');

/* ---- shell ---- */
const HTML = `<!DOCTYPE html>
<html lang="pt-BR" data-platform="neonatologia">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="theme-color" content="#0a1826">
  <meta name="description" content="Baixa estatura na pediatria: do diagnóstico sindrômico (< P3 / Z-2) às variantes fisiológicas (familiar × atraso constitucional) e causas patológicas (desnutrição, endócrinas, Turner, acondroplasia); as quatro ferramentas (estatura, velocidade, alvo genético, idade óssea) e o fluxograma de dois passos — do caso da Manu ao veredito.">
  <title>Baixa estatura — Pediatria Bauer</title>
  <link rel="manifest" href="../../manifest.webmanifest">
  <link rel="icon" type="image/png" href="../../assets/img/icon-192.png">
  <link rel="apple-touch-icon" href="../../assets/img/icon-512.png">
  <link rel="stylesheet" href="../../assets/css/tokens.css">
  <link rel="stylesheet" href="../../assets/css/base.css">
  <link rel="stylesheet" href="../../assets/css/components.css">
  <link rel="stylesheet" href="aula.css">
</head>
<body>
  <a href="#main" class="skip-link">Pular para o conteúdo principal</a>

  <header class="site-header" role="banner">
    <div class="site-header__row">
      <a class="site-header__brand" href="../../index.html" aria-label="Pediatria Bauer — capa da plataforma">
        <span class="site-header__logo" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M19.5 5.5v12.2a6.3 6.3 0 1 1-6.3-6.3" stroke="#62bdf3" stroke-width="3.1" stroke-linecap="round"/><circle cx="19.5" cy="6.2" r="3.1" fill="#62bdf3"/></svg>
        </span>
        <span class="site-header__titles">
          <span class="site-header__title">Baixa estatura</span>
          <span class="site-header__subtitle">Aula 3 · Puericultura</span>
        </span>
      </a>
      <div class="site-header__spacer"></div>
      <span class="site-header__progress" id="progress-counter" aria-live="polite">1 / 15</span>
      <a class="icon-btn" id="home-btn" href="../../index.html" aria-label="Voltar ao hub da plataforma" title="Hub">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9"/></svg>
      </a>
      <button class="icon-btn" id="theme-toggle" type="button" aria-label="Alternar tema claro/escuro">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
      </button>
      <button class="icon-btn" id="menu-toggle" type="button" aria-label="Abrir menu de páginas" aria-expanded="false" aria-controls="menu-panel">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
  </header>

  <div class="progress-bar" aria-hidden="true"><div class="progress-bar__fill" id="progress-fill"></div></div>

  <div class="menu-overlay" id="menu-overlay" aria-hidden="true">
    <nav class="menu-panel" id="menu-panel" aria-label="Páginas da aula">
      <p class="menu-panel__title">Baixa estatura</p>
      <ul class="menu-panel__list">
          ${menu}
      </ul>
    </nav>
  </div>

  <main id="main">
${built.join('\n')}
  </main>

  <footer class="site-footer">
    <div class="container">
      <div>Pediatria Bauer · Aula 3 — Baixa estatura</div>
      <div>Conteúdo educacional · Não substitui diretriz oficial</div>
    </div>
  </footer>

  <script type="module" src="aula.js"></script>
  <script src="../../assets/js/pwa-bootstrap.js"></script>
</body>
</html>
`;

writeFileSync(resolve(__dir, 'index.html'), HTML, 'utf8');
console.log('index.html escrito —', built.length, 'páginas');
