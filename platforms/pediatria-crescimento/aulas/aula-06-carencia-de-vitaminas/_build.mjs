/* _build.mjs — montador do index.html da Aula 06 (Pediatria Bauer · Carência de vitaminas · BÔNUS).
   Embute os SVGs de piso (S-01..S-13) e as 2 figuras-herói (P3 eixo PTH · P13 Tabelão) inline,
   byte-exato a partir de _PIPELINE/svgs/aula06 e _PIPELINE/heroes (preserva <script> self-contained).
   Roda: node _build.mjs → escreve index.html ao lado. NÃO faz parte do runtime. */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const PIPE = resolve(__dir, '../../_PIPELINE');

/* ---- loaders de SVG (verbatim, self-contained) ---- */
// SVGs de piso por SLOT (S-01..S-13)
const svgFile = (name) => readFileSync(resolve(PIPE, `svgs/aula06/${name}.svg`), 'utf8').trim();
// figuras-herói self-contained: P3 (eixo PTH da vit. D) · P13 (Tabelão completo)
const HERO_FILE = {
  p3: 'aula06-h2-eixo-pth.svg',
  p13: 'aula06-h1-tabelao.svg',
};
const hero = (id) => readFileSync(resolve(PIPE, `heroes/${HERO_FILE[id]}`), 'utf8').trim();

/* ---- componentes reutilizáveis ---- */
const IMGBASE = '../../assets/img/aula-06-carencia-de-vitaminas';

// figure.med — imagem real com caption "Achado:" + fonte/licença + cueing/overlay + tarja opcional.
// cues: [{ x, y, label?, lx?, ly?, r? }] em % do quadro (overlay §4.8.3).
function med({ file, alt, achado, fonte, licenca, tarja, tarjas, cues, plate, inset }) {
  const mod = plate ? ' med--plate' : (inset ? ' med--inset' : '');
  // tarja: variante nomeada (CSS posiciona). tarjas: array livre posicionado em % (left/top/w/h + label opcional).
  const tarjaNamed = tarja ? `<span class="med__tarja med__tarja--${tarja}" data-label="privacidade" aria-hidden="true"></span>` : '';
  const tarjaFree = (tarjas || []).map((t) =>
    `<span class="med__tarja" data-label="${t.label ?? ''}" aria-hidden="true" style="left:${t.left}%;top:${t.top}%;width:${t.w}%;height:${t.h}%"></span>`
  ).join('');
  const tarjaEl = tarjaNamed + tarjaFree;
  const cueEls = (cues || []).map((c) => {
    const ring = c.r ? `<span class="med__cue-ring" style="left:${c.x}%;top:${c.y}%;width:${c.r}%;height:${c.r}%"></span>` : '';
    const dot = `<span class="med__cue-dot" style="left:${c.x}%;top:${c.y}%"></span>`;
    const label = c.label ? `<span class="med__cue-label" style="left:${c.lx ?? c.x}%;top:${c.ly ?? (c.y + 6)}%">${c.label}</span>` : '';
    return ring + dot + label;
  }).join('');
  return `
  <figure class="med${mod}">
    <div class="img-wrap">
      <img src="${IMGBASE}/${file}" alt="${alt}" loading="lazy" decoding="async">
      ${tarjaEl}
      <div class="med__cue" aria-hidden="true">${cueEls}</div>
    </div>
    <figcaption>
      <strong>Achado:</strong> ${achado}
      <span class="attr">${fonte} · ${licenca}</span>
    </figcaption>
  </figure>`;
}

// piso SVG inline por SLOT (S-01..S-13) com frame + caption + hint
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

// nota-banca (blindagem de prova discreta)
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

// tabela responsiva (.cmp) — grid no mobile via data-label.
// caption: título · head: [colunas] · rows: [[{t, label?, cls?}...]]
function cmp(caption, head, rows) {
  const thead = `<thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>`;
  const tbody = rows.map((r) => {
    const rowCls = r.__cls ? ` class="${r.__cls}"` : '';
    const cells = r.cells.map((c, i) => {
      const tag = i === 0 ? 'th' : 'td';
      const scope = i === 0 ? ' scope="row"' : '';
      const cls = c.cls ? ` class="${c.cls}"` : '';
      const dl = ` data-label="${c.label ?? head[i]}"`;
      return `<${tag}${scope}${cls}${dl}>${c.t}</${tag}>`;
    }).join('');
    return `<tr${rowCls}>${cells}</tr>`;
  }).join('');
  return `<table class="cmp">${caption ? `<caption>${caption}</caption>` : ''}${thead}<tbody>${tbody}</tbody></table>`;
}

// scaffold opt-in colapsável (P3) — botão + painel, JS de casa (initCollapsibles)
function collapsible(title, panelHTML) {
  return `
  <div class="collapsible">
    <button class="collapsible__btn" type="button" aria-expanded="false">
      <svg class="collapsible__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
      ${title}
    </button>
    <div class="collapsible__panel">${panelHTML}</div>
  </div>`;
}

// recall metacognitivo (P12) — perguntas de auto-teste, SEM gabarito
function recall(items) {
  return `
  <aside class="recall" aria-label="Recall cruzado — auto-teste sem gabarito">
    <p class="recall__label">Recall cruzado · sem reler, responda de cabeça</p>
    <ol>${items.map((i) => `<li>${i}</li>`).join('')}</ol>
  </aside>`;
}

// caso-síntese de 3 pacientes (P13)
function synthCases(cases) {
  return `
  <div class="synth-cases">
    ${cases.map((c, i) => `<div class="synth-case"><span class="synth-case__n">${i + 1}</span><div class="synth-case__body">${c}</div></div>`).join('')}
  </div>`;
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

const TOTAL = 13;
// páginas com herói/tabelas largas ganham container mais amplo
const WIDE = ['p3', 'p13', 'p6', 'p4'];
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
   Cada página termina no quiz gold. Eixo cromático: lipo ADEK (sky/teal) ×
   hidro B+C (coral) × pegadinha (âmbar) × conduta/profilaxia (verde).
   ========================================================================= */
import { buildPages } from './_pages.mjs';
const built = buildPages({ med, svgPiso, svgHero, notaBanca, notaValor, cmp, collapsible, recall, synthCases, quiz, tag, chips, page, IMGBASE });

/* ---- menu lateral (13 títulos reais) ---- */
const MENU_ITEMS = [
  ['p1', 'Decore pouco, acerte muito: o padrão de prova'],
  ['p2', 'Vitamina A: a vitamina da visão'],
  ['p3', 'Vitamina D (1): o eixo que explica cada exame'],
  ['p4', 'Vitamina D (2): raquitismo, laboratório e a dose'],
  ['p5', 'Vitamina E: o prematuro que hemolisa'],
  ['p6', 'Vitamina K: por que o recém-nascido sangra'],
  ['p7', 'Caso USP: de quem é esse sangue?'],
  ['p8', 'Vitamina C: escorbuto e o rosário que engana'],
  ['p9', 'Complexo B: a poda que vira duas vitaminas'],
  ['p10', 'Vitamina B1: beri-béri seco, úmido e Wernicke'],
  ['p11', 'Vitamina B3: pelagra e os três Ds'],
  ['p12', 'Não confunda: os pares que a banca troca'],
  ['p13', 'O Tabelão das vitaminas'],
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
  <meta name="description" content="Carência de vitaminas na infância (aula bônus): a associação clínica ↔ deficiência que resolve a prova. Lipossolúveis ADEK — A (retinol/visão: xeroftalmia, manchas de Bitot, nictalopia; megadose e profilaxia N/NE), D (calciferol: eixo PTH, raquitismo, cortes <12/<20 ng/mL, profilaxia 400/600 UI), E (tocoferol: prematuro hemolítico com edema), K (naftoquinona: fatores 2-7-9-10 e as 3 formas da doença hemorrágica do RN; teste de APT) — e hidrossolúveis B+C — C (ácido ascórbico/escorbuto, posição de RAM), B1 (tiamina/beri-béri e Wernicke), B3 (niacina/pelagra, 3 Ds, colar de Casal), B6 (piridoxina/convulsão neonatal), B9-B12 (anemia megaloblástica). Fecha no Tabelão das vitaminas.">
  <title>Carência de vitaminas — Pediatria Bauer</title>
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
          <span class="site-header__title">Carência de vitaminas</span>
          <span class="site-header__subtitle">Aula 6 · Bônus</span>
        </span>
      </a>
      <div class="site-header__spacer"></div>
      <span class="site-header__progress" id="progress-counter" aria-live="polite">1 / 13</span>
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
      <p class="menu-panel__title">Carência de vitaminas</p>
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
      <div>Pediatria Bauer · Aula 6 — Carência de vitaminas</div>
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
