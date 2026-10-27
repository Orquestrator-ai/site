/* _build.mjs — montador do index.html da Aula 05 (Pediatria Bauer · Síndromes genéticas).
   Embute os SVGs de piso (S-01..S-11 + atlas B-15) e as 2 figuras-herói inline, byte-exato
   a partir de _PIPELINE/svgs/aula05 e _PIPELINE/heroes (preserva CDATA/<script> self-contained).
   Roda: node _build.mjs → escreve index.html ao lado. NÃO faz parte do runtime. */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const PIPE = resolve(__dir, '../../_PIPELINE');

/* ---- loaders de SVG (verbatim, self-contained) ---- */
// SVGs de piso por SLOT do manifesto (S-01..S-11) + atlas B-15
const svgFile = (name) => readFileSync(resolve(PIPE, `svgs/aula05/${name}.svg`), 'utf8').trim();
// figuras-herói self-contained: P9 (mapa de seguimento Down) · P15 (painel-mestre das 5 síndromes)
const HERO_FILE = {
  p9: 'aula05-h1-seguimento-down.svg',
  p15: 'aula05-h2-painel-sindromes.svg',
};
const hero = (id) => readFileSync(resolve(PIPE, `heroes/${HERO_FILE[id]}`), 'utf8').trim();

/* ---- componentes reutilizáveis ---- */
const IMGBASE = '../../assets/img/aula-05-sindromes-geneticas';

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

// piso SVG inline por SLOT (S-01..S-11 / B-15) com frame + caption + hint
function svgPiso(slot, { caption, hint, doc }) {
  const label = doc ? 'Documental —' : 'Interativo —';
  return `
  <figure class="figure-svg figure-svg__embed">
    <div class="figure-svg__frame figure-svg__stage" data-hs-stage="piso-${slot}">
      ${svgFile(slot)}
    </div>
    <figcaption><strong>${label}</strong> ${caption}${hint ? `<br><span class="figure-svg__hint">${hint}</span>` : ''}</figcaption>
  </figure>`;
}

// figura-herói inline (self-contained: engine no próprio SVG)
function svgHero(id, { caption }) {
  return `
  <figure class="figure-svg figure-svg__embed">
    <div class="hero-stage figure-svg__stage" id="hero${id}-stage" data-hs-stage="hero-${id}">
      ${hero(id)}
    </div>
    <figcaption><strong>Síntese —</strong> ${caption}</figcaption>
  </figure>`;
}

// nota-banca (blindagem de prova discreta, ledger §0)
function notaBanca(html) {
  return `
  <aside class="nota-banca">
    <svg class="nota-banca__shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    <div class="nota-banca__body"><p><span class="nota-banca__label">Atenção de banca</span>${html}</p></div>
  </aside>`;
}

// nota-valor (número de prova, ícone "+", cor de acento)
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
// páginas com herói/atlas/comparadores largos ganham container mais amplo
const WIDE = ['p9', 'p15', 'p14', 'p5'];
const page = (id, idx, body) => `
    <article class="page page--${id}" id="page-${id}" role="region" aria-label="${id}">
      <div class="page__container${WIDE.includes(id) ? ' page__container--wide' : ''}">
        ${body}
        ${nav(idx, TOTAL)}
      </div>
    </article>`;

/* =========================================================================
   PÁGINAS — texto autoral (texto-aluno canon §6, anti-metalinguagem).
   Aberturas E1-E8 conforme o plano; tópicos visíveis = <h3 class="topic-h">.
   Cada página termina no quiz gold. Eixo cromático: trissomia/ganho (coral) ×
   monossomia/perda (sky) × pegadinha (âmbar) × normal/conduta (verde).
   ========================================================================= */
import { buildPages } from './_pages.mjs';
const built = buildPages({ med, svgPiso, svgHero, notaBanca, notaValor, quiz, tag, chips, page, IMGBASE });

/* ---- menu lateral (15 títulos reais — §5/§6 do prompt-final) ---- */
const MENU_ITEMS = [
  ['p1', 'O melhor amigo do pediatra é um geneticista'],
  ['p2', 'Síndrome de Down: a rainha da prova'],
  ['p3', 'Mecanismo 1: trissomia livre e idade materna'],
  ['p4', 'Mecanismo 2: translocação 14;21'],
  ['p5', 'Mecanismo 3: o mosaico'],
  ['p6', 'O rosto, as mãos e os pés da Down'],
  ['p7', 'O coração da Down: cardiopatia em metade'],
  ['p8', 'Tireoide, crescimento e intestino'],
  ['p9', 'O mapa de seguimento da Down'],
  ['p10', 'A coluna que pode luxar'],
  ['p11', 'Síndrome de Turner: a menina 45,X'],
  ['p12', 'O corpo do Turner, o GH e o coração'],
  ['p13', 'Síndrome de Klinefelter: o 47,XXY'],
  ['p14', 'Klinefelter alto, Edwards e Patau'],
  ['p15', 'A ponte das cinco síndromes'],
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
  <meta name="description" content="Síndromes genéticas em pediatria: o apanhado que cai em prova. Down (trissomia 21 livre/translocação 14;21/mosaico; hipotonia universal, fenótipo, DSAV, seguimento com cariótipo/ECO/TSH/hemograma, instabilidade atlanto-axial), Turner (45,X, baixa estatura + disgenesia gonadal, hipogonadismo hipergonadotrófico, linfedema neonatal, coarc-Turner), Klinefelter (47,XXY, eunucoide, ginecomastia), Edwards (18, dedos sobrepostos + pé em cadeira de balanço) e Patau (13, fenda labiopalatina/linha média) — cada síndrome, seu cromossomo e o achado que a entrega.">
  <title>Síndromes genéticas — Pediatria Bauer</title>
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
          <span class="site-header__title">Síndromes genéticas</span>
          <span class="site-header__subtitle">Aula 5 · Bônus</span>
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
      <p class="menu-panel__title">Síndromes genéticas</p>
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
      <div>Pediatria Bauer · Aula 5 — Síndromes genéticas</div>
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
