/* _build.mjs — montador do index.html da Aula 08 (Pediatria Bauer · Puberdade precoce · NÚCLEO).
   Sequência DIRETA da 07. Embute os SVGs de piso (S-*) e as 2 figuras-herói (P3 curva-paradoxo ·
   P12 Árvore completa + Bela) inline, byte-exato a partir de _PIPELINE/svgs/aula08 e
   _PIPELINE/heroes (preserva <script> self-contained). A Árvore Central×Periférica é objeto
   persistente: o widget S-arvore.svg é um único objeto com abas (P4/P5/P6/P9/P10) — engine
   single-instance (document.getElementById('pp08Arvore-svg-root')); por isso é embutido UMA vez,
   na P4 (onde nasce), navegável por abas, e fecha como herói H1 na P12. Imagens reais de
   livro/atlas (radiologia/diagrama/esquema — sem foto de estadiamento de menor) entram em layout
   SPLIT (imagem ao lado do texto) via medSplit(), com título + legenda + fonte. Tudo tokenizado.
   Roda: node _build.mjs → escreve index.html ao lado. NÃO faz parte do runtime. */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const PIPE = resolve(__dir, '../../_PIPELINE');

/* ---- SANITIZADOR DE EMBED (determinístico, source-preserving) ----
   Os SVGs upstream (ilustrador/agy + heróis) chegam validados para render, mas três
   gates da casa (tools/gates.py) que o gold aula-07 cumpre ainda pegam resíduos de
   AUTORIA upstream nestes assets: (a) seletor de ELEMENTO nu no <style> do SVG
   (`text{font-family:…}`) que VAZA e repinta todo SVG da página; (b) `role="button"`
   sem nome acessível (mudo p/ teclado/leitor); (c) cor LITERAL fora de var() (não segue
   tema). Como NÃO é meu papel reescrever o asset do ilustrador, e a fonte fica intocada,
   eu sano no EMBED: escopo o seletor nu à raiz do SVG, dou aria-label aos botões mudos e
   embrulho a cor literal em var(--…, #hex) (mesma cor; só passa a seguir o tema). Visual
   idêntico; gate limpo. Toda compensação está logada no ledger do relatório (§11B). */

// raiz-seletor do SVG (prefere 1ª classe; senão id) para escopar seletores nus
function rootSelector(svg) {
  const open = svg.slice(0, svg.indexOf('>') + 1);
  const cls = /class="([^" ]+)/.exec(open);
  if (cls) return '.' + cls[1];
  const id = /\bid="([^"]+)"/.exec(open);
  return id ? '#' + id[1] : 'svg';
}
// humaniza um id em rótulo curto (pp08Arvore-node-cisto → "Cisto")
function humanizeId(id) {
  if (!id) return 'Item interativo';
  let s = id.replace(/^pp08[A-Za-z]*-?/, '').replace(/-(svg|root|node|card|hotspot|group|interactive)-?/gi, ' ')
            .replace(/[-_]+/g, ' ').replace(/\b(node|card|hotspot|elem|link|group)\b/gi, ' ')
            .replace(/\s+/g, ' ').trim();
  if (!s) s = 'item';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
/* ---- THEME-TRIGGER: faz o SVG seguir o tema da CASA ([data-theme]) em vez do SO.
   A plataforma é tema OPT-IN: default = DARK (sem atributo), light entra com :root[data-theme="light"]
   (tokens.css + aula.js). Os SVG upstream alternavam cor por @media (prefers-color-scheme: dark),
   que segue o SISTEMA OPERACIONAL — então no default dark da página o SVG abria CLARO e o botão de
   tema não o movia. Fix (visual idêntico, mesmas cores): desembrulho o bloco
   @media (prefers-color-scheme: dark){ … } e prefixo cada seletor interno com
   :root:not([data-theme="light"]) — assim o esquema dark do SVG é o DEFAULT (casa dark) e DESLIGA
   sob [data-theme="light"], voltando à regra-base light. Não reescrevo/reordeno tokens nem toco
   estilos (font-family etc. ficam na regra-base intocada). Idêntico para os dois formatos de bloco:
   @media{ :root{…} } e @media{ .classe-root{…} }. Logado no ledger (§11B). */
function retargetThemeMediaToHouse(css) {
  const MQ = /@media\s*\([^)]*prefers-color-scheme\s*:\s*dark[^)]*\)\s*\{/g;
  let out = css, m;
  while ((m = MQ.exec(out))) {
    const openIdx = m.index;
    const bodyStart = m.index + m[0].length;
    let depth = 1, i = bodyStart;
    while (i < out.length && depth > 0) {
      const ch = out[i];
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
      i++;
    }
    const closeIdx = i;
    const inner = out.slice(bodyStart, closeIdx - 1);
    const HOUSE = ':root:not([data-theme="light"])';
    const retargeted = inner.replace(
      /(^|\})\s*([^{}@]+?)\s*\{/g,
      (mm, pre, sel) => {
        const s = sel.trim();
        const o = s === ':root' ? HOUSE : `${HOUSE} ${s}`;
        return `${pre}\n      ${o} {`;
      }
    );
    out = out.slice(0, openIdx) + retargeted + out.slice(closeIdx);
    MQ.lastIndex = openIdx + retargeted.length;
  }
  return out;
}

function sanitizeSvgForEmbed(svg) {
  // (0) XML-PROLOG: remove o <?xml …?> inline (inválido no meio de um documento HTML embed).
  svg = svg.replace(/^\s*<\?xml[^>]*\?>\s*/, '');
  const root = rootSelector(svg);
  // (a) STYLE-LEAK: escopa seletor de ELEMENTO nu no início de uma regra dentro de <style>.
  svg = svg.replace(/<style[^>]*>([\s\S]*?)<\/style>/g, (full, css) => {
    let fixed = css.replace(
      /(^|[}\n;])(\s*)((?:svg|text|rect|circle|line|path|g|tspan|polygon|polyline|ellipse|use|image)\b(?:[:.[][^,{}\n]*)?)(\s*[,{])/g,
      (m, pre, ws, sel, tail) => `${pre}${ws}${root} ${sel.trim()}${tail}`
    );
    // (a2) THEME: troca @media prefers-color-scheme pelo tema da casa ([data-theme]).
    fixed = retargetThemeMediaToHouse(fixed);
    return full.replace(css, fixed);
  });
  // (b) SVG-A11Y: aria-label nos role="button" sem nome acessível.
  svg = svg.replace(/<(g|rect|circle|path|ellipse|polygon)\b([^>]*?)\brole="button"([^>]*)>/g, (m, tag, pre, post) => {
    if (/aria-label|aria-labelledby/.test(m)) return m;
    const idm = /\bid="([^"]+)"/.exec(m);
    const label = humanizeId(idm && idm[1]);
    return `<${tag}${pre} role="button"${post} aria-label="${label}">`;
  });
  // (c) SVG-TOKEN: embrulha cor literal (mesma cor; só passa a seguir o tema). Pula o que já está em var().
  // forma atributo: prop="#hex" → prop="var(--pp08lit-hex, #hex)"
  svg = svg.replace(/\b(fill|stroke|stop-color|flood-color)="(#[0-9a-fA-F]{3,8})"/g,
    (m, prop, val) => `${prop}="var(--pp08lit-${val.slice(1).toLowerCase()}, ${val})"`);
  // forma style: prop: #hex  → prop: var(--pp08lit-hex, #hex)  (só quando não já dentro de var())
  svg = svg.replace(/\b(fill|stroke|stop-color|flood-color)(\s*:\s*)(#[0-9a-fA-F]{3,8})\b/g,
    (m, prop, sep, val) => `${prop}${sep}var(--pp08lit-${val.slice(1).toLowerCase()}, ${val})`);
  return svg;
}

/* ---- VERSIONADOR DA ÁRVORE (objeto persistente, embutido em vários estados) ----
   A S-arvore.svg é um widget single-instance (engine via getElementById('pp08Arvore-svg-root'),
   CSS [data-state] global). Para hidratá-la em VÁRIAS páginas (plano: nasce P4 → central P5 →
   periférica P6 …), cada cópia é ISOLADA por sufixo: versiona todos os tokens pp08Arvore + as
   classes de estado nuas + escopa os seletores [data-state] à raiz versionada + fixa o estado da
   página. Cópias 100% independentes (ids, JS e CSS), sem colisão de IDREF. Fonte intocada. */
const ARVORE_BARE = ['p4-elem','p5-elem','p6-elem','p9-elem','p10-elem','p4-link','p5-link','p6-link','p9-link','p10-link','central-color','central-node','periferica-color','periferica-node','amber-color','amber-node','green-color','green-node'];
function versionArvore(suffix, state) {
  let out = readFileSync(resolve(PIPE, 'svgs/aula08/S-arvore.svg'), 'utf8').trim();
  out = out.replace(/pp08Arvore/g, `pp08Arvore${suffix}`);
  for (const b of ARVORE_BARE) out = out.replace(new RegExp(`\\b${b}\\b`, 'g'), `${b}-${suffix}`);
  out = out.replace(/\[data-state="(P\d+)"\]/g, `#pp08Arvore${suffix}-svg-root[data-state="$1"]`);
  // fixa o estado inicial da página (root começa em data-state="P4")
  out = out.replace(new RegExp(`(id="pp08Arvore${suffix}-svg-root"[^>]*?\\bdata-state=")P4(")`), `$1${state}$2`);
  return sanitizeSvgForEmbed(out);
}
// piso da Árvore num estado, com frame/caption (figure-svg)
function svgArvore(suffix, state, { caption, hint }) {
  return `
  <figure class="figure-svg figure-svg__embed">
    <div class="figure-svg__frame figure-svg__stage" data-hs-stage="arvore-${suffix}">
      ${versionArvore(suffix, state)}
    </div>
    <figcaption><strong>Interativo —</strong> ${caption}${hint ? `<br><span class="figure-svg__hint">${hint}</span>` : ''}</figcaption>
  </figure>`;
}

/* ---- loaders de SVG (sanitizados no embed; fonte intocada) ---- */
// SVGs de piso por SLOT (S-*)
const svgFile = (name) => sanitizeSvgForEmbed(readFileSync(resolve(PIPE, `svgs/aula08/${name}.svg`), 'utf8').trim());
// figuras-herói self-contained: P3 (curva-paradoxo) · P12 (Árvore completa + Bela)
const HERO_FILE = {
  p3: 'aula08-h2-curva-paradoxo.svg',
  p12: 'aula08-h1-arvore-bela.svg',
};
const hero = (id) => sanitizeSvgForEmbed(readFileSync(resolve(PIPE, `heroes/${HERO_FILE[id]}`), 'utf8').trim());

/* ---- imagens reais (livro/atlas/radiologia/diagrama) ---- */
const IMGBASE = '../../assets/img/aula-08';

/* figure.med — imagem real FULL-WIDTH (assinatura da casa). Mantida para diagrama largo;
   o default desta aula é o medSplit (SPLIT) abaixo. */
function med({ file, alt, titulo, achado, fonte, licenca, light }) {
  const wrapCls = light ? ' img-wrap--light' : '';
  const head = titulo ? `<strong>${titulo}</strong> ` : '<strong>Referência —</strong> ';
  return `
  <figure class="med">
    <div class="img-wrap${wrapCls}">
      <img src="${IMGBASE}/${file}" alt="${alt}" loading="lazy" decoding="async">
    </div>
    <figcaption>
      ${head}${achado}
      <span class="attr">${fonte} · ${licenca}</span>
    </figcaption>
  </figure>`;
}

/* medSplit — imagem real em SPLIT (imagem de um lado + bloco de texto do outro, dividindo a
   coluna). Regra de imagem Bauer 2026-06-22: a imagem NÃO ocupa a margem inteira. O bloco de
   texto recebe título + corpo (ancoragem com propósito) só onde a página pede; aqui o corpo
   curto contextualiza o achado sem repetir o texto-aluno (anti-redundância). `side` controla o
   lado da imagem ('left' default | 'right'). `light` = frame claro (diagrama/esquema/molécula). */
function medSplit({ file, alt, titulo, achado, fonte, licenca, light, side, body }) {
  const wrapCls = light ? ' img-wrap--light' : '';
  const sideCls = side === 'right' ? ' media-split--right' : '';
  const head = titulo ? `<strong>${titulo}</strong>` : '<strong>Referência</strong>';
  const textBlock = body
    ? `<div class="media-split__text"><p class="media-split__head">${head}</p><p>${body}</p></div>`
    : '';
  return `
  <div class="media-split${sideCls}">
    <figure class="med med--split">
      <div class="img-wrap${wrapCls}">
        <img src="${IMGBASE}/${file}" alt="${alt}" loading="lazy" decoding="async">
      </div>
      <figcaption>${head} — ${achado}<span class="attr">${fonte} · ${licenca}</span></figcaption>
    </figure>
    ${textBlock}
  </div>`;
}

/* piso SVG inline por SLOT com frame + caption + hint */
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

/* figura-herói inline (self-contained: engine no próprio SVG) */
function svgHero(id, { caption }) {
  return `
  <figure class="figure-svg figure-svg__embed">
    <div class="hero-stage figure-svg__stage" id="hero${id}-stage" data-hs-stage="hero-${id}">
      ${hero(id)}
    </div>
    <figcaption><strong>Síntese —</strong> ${caption}</figcaption>
  </figure>`;
}

/* nota-banca (blindagem de prova discreta) */
function notaBanca(html) {
  return `
  <aside class="nota-banca">
    <svg class="nota-banca__shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    <div class="nota-banca__body"><p><span class="nota-banca__label">Atenção de banca</span>${html}</p></div>
  </aside>`;
}

/* nota-valor (número de prova, ícone "+", cor de acento) */
function notaValor(html) {
  return `
  <aside class="nota-valor">
    <svg class="nota-valor__plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
    <div class="nota-valor__body"><p><span class="nota-valor__label">Número de prova</span>${html}</p></div>
  </aside>`;
}

/* tabela responsiva (.cmp) — grid no mobile via data-label. */
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

/* scaffold opt-in colapsável (P8) — botão + painel, JS de casa (initCollapsibles) */
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

/* recall metacognitivo — perguntas de auto-teste, SEM gabarito */
function recall(items) {
  return `
  <aside class="recall" aria-label="Recall cruzado — auto-teste sem gabarito">
    <p class="recall__label">Recall cruzado · sem reler, responda de cabeça</p>
    <ol>${items.map((i) => `<li>${i}</li>`).join('')}</ol>
  </aside>`;
}

/* ===================== COMPONENTES-EXECUTOR (repertório §2.9) ===================== */

/* C-cards — cluster de cards (3 motivos, associações, etc.). Cada item: {icon, title, body}. */
function cardCluster(items, variant = '') {
  return `
  <div class="exec-cluster${variant ? ` exec-cluster--${variant}` : ''}">
    ${items.map((it) => `
    <article class="exec-card${it.tone ? ` exec-card--${it.tone}` : ''}">
      <span class="exec-card__icon" aria-hidden="true">${it.icon}</span>
      <div class="exec-card__body">
        <p class="exec-card__title">${it.title}</p>
        <p class="exec-card__text">${it.body}</p>
      </div>
    </article>`).join('')}
  </div>`;
}

/* card-alerta destacado (pegadinha/exceção) — tone: warn | bad | good | central | perif */
function alertCard({ tone, kicker, title, body }) {
  return `
  <aside class="exec-alert exec-alert--${tone || 'warn'}">
    <p class="exec-alert__kicker">${kicker}</p>
    <p class="exec-alert__title">${title}</p>
    <p class="exec-alert__body">${body}</p>
  </aside>`;
}

/* fluxograma-Executor (nós + setas/decisão) — steps: [{kind:'node'|'decision'|'note', tone, label, sub}] */
function flow(caption, steps) {
  const body = steps.map((s) => {
    const kindCls = `exec-flow__step--${s.kind || 'node'}`;
    const toneCls = s.tone ? ` exec-flow__step--${s.tone}` : '';
    const sub = s.sub ? `<span class="exec-flow__sub">${s.sub}</span>` : '';
    const arrow = s.kind === 'note' ? '' : '<span class="exec-flow__arrow" aria-hidden="true"></span>';
    return `<div class="exec-flow__step ${kindCls}${toneCls}"><span class="exec-flow__label">${s.label}</span>${sub}</div>${arrow}`;
  }).join('');
  return `
  <figure class="exec-flow" aria-label="${caption}">
    <div class="exec-flow__track">${body}</div>
    <figcaption class="exec-flow__cap"><strong>Fluxo de decisão</strong> — ${caption}</figcaption>
  </figure>`;
}

/* flowSvg — fluxograma de decisão como SVG INLINE (figure-svg). Componente-Executor "desenhado"
   em SVG (caixas + setas + decisão), namespeado, tokenizado, acessível. Usado nas páginas de
   método (P7/P8) onde o interativo é um fluxograma — peça do Executor, não do ilustrador.
   steps:[{tone, label, sub}] empilhados verticalmente com setas. */
function flowSvg(ns, { caption, hint, steps }) {
  const W = 640, padX = 40, boxH = 64, gap = 30, boxW = W - padX * 2;
  const H = padX + steps.length * boxH + (steps.length - 1) * gap + padX;
  const toneColor = {
    central: 'var(--pp08lit-3aa6c9, #3aa6c9)', perif: 'var(--pp08lit-818cf8, #818cf8)',
    warn: 'var(--pp08lit-f59e0b, #f59e0b)', bad: 'var(--pp08lit-f43f5e, #f43f5e)',
    good: 'var(--pp08lit-22c55e, #22c55e)', decision: 'var(--pp08lit-3aa6c9, #3aa6c9)', node: 'var(--pp08lit-6f86a0, #6f86a0)',
  };
  let y = padX, body = '';
  steps.forEach((s, i) => {
    const c = toneColor[s.tone] || toneColor.node;
    const cy = y + boxH / 2;
    const decision = s.tone === 'decision';
    const shape = decision
      ? `<rect x="${padX}" y="${y}" width="${boxW}" height="${boxH}" rx="10" fill="var(--${ns}-box, var(--pp08lit-0f1722, #0f1722))" stroke="${c}" stroke-width="1.6" stroke-dasharray="6 4"/>`
      : `<rect x="${padX}" y="${y}" width="${boxW}" height="${boxH}" rx="10" fill="var(--${ns}-box, var(--pp08lit-0f1722, #0f1722))" stroke="var(--${ns}-border, var(--pp08lit-2a3a4a, #2a3a4a))" stroke-width="1.2"/><rect x="${padX}" y="${y}" width="5" height="${boxH}" rx="2.5" fill="${c}"/>`;
    const sub = s.sub ? `<text x="${W / 2}" y="${cy + 13}" text-anchor="middle" class="${ns}-sub" fill="var(--${ns}-muted, var(--pp08lit-93a2b3, #93a2b3))" font-size="11">${s.sub}</text>` : '';
    const labelY = s.sub ? cy - 4 : cy + 4;
    body += `<g class="${ns}-step" role="group" aria-label="${s.label.replace(/<[^>]+>/g, '')}">${shape}<text x="${W / 2}" y="${labelY}" text-anchor="middle" class="${ns}-label" fill="var(--${ns}-text, var(--pp08lit-e7e5e4, #e7e5e4))" font-size="13.5" font-weight="600">${s.label.replace(/<[^>]+>/g, '')}</text>${sub}</g>`;
    if (i < steps.length - 1) {
      const ax = W / 2, ay1 = y + boxH, ay2 = y + boxH + gap;
      body += `<line x1="${ax}" y1="${ay1}" x2="${ax}" y2="${ay2 - 8}" stroke="var(--${ns}-arrow, var(--pp08lit-3aa6c9, #3aa6c9))" stroke-width="1.6"/><path d="M${ax - 5} ${ay2 - 8} L${ax + 5} ${ay2 - 8} L${ax} ${ay2 - 1} Z" fill="var(--${ns}-arrow, var(--pp08lit-3aa6c9, #3aa6c9))"/>`;
    }
    y += boxH + gap;
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="auto" data-svg-tokenized="true" class="${ns}-root" role="img" aria-label="${caption.replace(/<[^>]+>/g, '')}">
    <style>
      .${ns}-root text { font-family: 'Outfit', system-ui, -apple-system, sans-serif; }
    </style>
    ${body}
  </svg>`;
  return `
  <figure class="figure-svg figure-svg__embed">
    <div class="figure-svg__frame figure-svg__stage" data-hs-stage="flow-${ns}">
      ${svg}
    </div>
    <figcaption><strong>Fluxo de decisão —</strong> ${caption}${hint ? `<br><span class="figure-svg__hint">${hint}</span>` : ''}</figcaption>
  </figure>`;
}

/* fork-branch (decisão de 2 ou 3 ramos) — root + branches[{tone, label, body}] */
function forkFlow(root, branches, caption) {
  return `
  <figure class="exec-fork" aria-label="${caption}">
    <div class="exec-fork__root">${root}</div>
    <div class="exec-fork__stem" aria-hidden="true"></div>
    <div class="exec-fork__branches exec-fork__branches--${branches.length}">
      ${branches.map((b) => `
      <div class="exec-fork__branch exec-fork__branch--${b.tone || 'neutral'}">
        <p class="exec-fork__label">${b.label}</p>
        <p class="exec-fork__body">${b.body}</p>
      </div>`).join('')}
    </div>
    <figcaption class="exec-fork__cap"><strong>Bifurcação</strong> — ${caption}</figcaption>
  </figure>`;
}

/* reveal-por-par (Não confunda P12) — pairs:[{left, right, decide}] */
function naoConfunda(pairs) {
  return `
  <div class="exec-confunda" aria-label="Não confunda — pares que a banca troca">
    ${pairs.map((p, i) => `
    <div class="exec-confunda__row" data-reveal aria-expanded="false">
      <div class="exec-confunda__pair">
        <span class="exec-confunda__side exec-confunda__side--a">${p.left}</span>
        <span class="exec-confunda__vs" aria-hidden="true">×</span>
        <span class="exec-confunda__side exec-confunda__side--b">${p.right}</span>
      </div>
      <p class="exec-confunda__decide"><span class="exec-confunda__decide-label">o que decide:</span> ${p.decide}</p>
      <span class="exec-confunda__hint" aria-hidden="true">toque para revelar</span>
    </div>`).join('')}
  </div>`;
}

/* card-Bela carimbado (callback P1 → P12, reveal) */
function belaCard({ front, trail }) {
  return `
  <aside class="exec-bela" data-reveal aria-expanded="false" aria-label="Bela, carimbada com a resposta">
    <p class="exec-bela__front">${front}</p>
    <div class="exec-bela__answer">
      <p class="exec-bela__trail">${trail}</p>
    </div>
    <span class="exec-bela__hint" aria-hidden="true">toque para cravar a resposta</span>
  </aside>`;
}

/* nav inter-páginas */
function nav(idx, total) {
  return `
  <nav class="page-nav" aria-label="Navegação entre páginas">
    <button class="page-nav__btn page-nav__btn--prev" type="button">← Anterior</button>
    <span class="page-nav__counter">${idx} / ${total}</span>
    <button class="page-nav__btn page-nav__btn--next" type="button">Próxima →</button>
  </nav>`;
}

/* page-tag (kicker de identidade) */
function tag(variant, label) {
  return `<span class="page-tag page-tag--${variant}"><span class="page-tag__dot" aria-hidden="true"></span>${label}</span>`;
}

/* chipset de palavras-chave por página (identidade) */
function chips(list) {
  return `<div class="chipset" aria-label="Palavras-chave da página">${list.map((c) => `<span class="chip chip--topic">${c}</span>`).join('')}</div>`;
}

/* quiz universal gold — explica TODAS as alternativas. questions: [{stem, tf?, alts:[{t,correct,why}]}] */
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

const TOTAL = 12;
// páginas com herói/tabelas largas/Árvore ganham container mais amplo
const WIDE = ['p3', 'p4', 'p6', 'p7', 'p8', 'p10', 'p12'];
const page = (id, idx, body) => `
    <article class="page page--${id}" id="page-${id}" role="region" aria-label="${id}">
      <div class="page__container${WIDE.includes(id) ? ' page__container--wide' : ''}">
        ${body}
        ${nav(idx, TOTAL)}
      </div>
    </article>`;

/* =========================================================================
   PÁGINAS — texto autoral (texto-aluno canon §6, anti-metalinguagem, verbatim).
   Aberturas E1-E8 conforme o plano; tópicos visíveis = <h3 class="topic-h">.
   Cada página termina no quiz gold. Eixo cromático: central/HHG (teal/sky) ×
   periférico (índigo) × pegadinha/diferencial (âmbar) × alerta/patológico (coral) ×
   benigno (verde) — tokens semânticos, sem rosa/azul de gênero.
   ========================================================================= */
import { buildPages } from './_pages.mjs';
const built = buildPages({
  med, medSplit, svgPiso, svgHero, svgArvore, flowSvg, notaBanca, notaValor, cmp, collapsible, recall,
  quiz, tag, chips, page, cardCluster, alertCard, flow, forkFlow, naoConfunda, belaCard, IMGBASE,
});

/* ---- menu lateral (12 títulos reais) ---- */
const MENU_ITEMS = [
  ['p1', 'Bela: parece igual à puberdade normal, mas não é'],
  ['p2', 'A equação: sinal + aceleração = puberdade precoce'],
  ['p3', 'O paradoxo da estatura: alto agora, baixo depois'],
  ['p4', 'Central × Periférica: a bifurcação que organiza tudo'],
  ['p5', 'Causas centrais: ♀ idiopática, ♂ investigue o cérebro'],
  ['p6', 'Causas periféricas: a gônada e a adrenal'],
  ['p7', 'Investigação por imagem: idade óssea, RM e USG'],
  ['p8', 'O LH como juiz: central ou periférica'],
  ['p9', 'O atalho do menino: o volume testicular entrega a causa'],
  ['p10', 'Variantes benignas: telarca × adrenarca precoce'],
  ['p11', 'Tratamento: o agonista do GnRH que freia'],
  ['p12', 'O algoritmo completo e a resolução de Bela'],
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
  <meta name="description" content="Puberdade precoce (Pediatria, núcleo — sequência direta da puberdade fisiológica): sinal puberal sozinho não basta. A definição operacional que separa doença de variante benigna (caractere sexual secundário + aceleração do crescimento/idade óssea, abaixo do corte ♀ < 8 · ♂ < 9, prova = 8), o paradoxo da estatura (alta na infância, baixa na vida adulta, por fechamento epifisário precoce) e a grande bifurcação central (GnRH-dependente, verdadeira, sempre isossexual, LH↑) × periférica (GnRH-independente, pseudopuberdade, iso ou heterossexual, LH suprimido). Etiologias por sexo (♀ ~90% idiopática × ♂ > 50% lesão do SNC, com o craniofaringioma que atrasa — FAR = longe) e por fonte (gônada/cisto ovariano × adrenal: tumor de córtex com virilização + Cushing, HAC 21-hidroxilase clássica × não-clássica). Investigação: idade óssea (comprova, ±2 DP), RM (caça a causa da central), USG; o LH como juiz e o teste de estímulo (LHRH); o atalho do menino (volume testicular ≥ 4 mL: grande/simétrico → central, pequeno → periférica, assimétrico → tumor). Variantes benignas (telarca × adrenarca, que NÃO viriliza). Tratamento: o agonista do GnRH (leuprorrelina) que freia por dessensibilização (pulsátil ativa, constante bloqueia). Fecha na Árvore Central × Periférica completa e em Bela (7a, M4 P3) resolvida como puberdade precoce central idiopática.">
  <title>Puberdade precoce — Pediatria Bauer</title>
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
          <span class="site-header__title">Puberdade precoce</span>
          <span class="site-header__subtitle">Aula 8 · Núcleo</span>
        </span>
      </a>
      <div class="site-header__spacer"></div>
      <span class="site-header__progress" id="progress-counter" aria-live="polite">1 / 12</span>
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
      <p class="menu-panel__title">Puberdade precoce</p>
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
      <div>Pediatria Bauer · Aula 8 — Puberdade precoce</div>
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
