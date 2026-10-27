/* _build.mjs — montador do index.html da Aula 09 (Pediatria Bauer · Desenvolvimento neuropsicomotor
   · NÚCLEO · domínio NOVO/independente — sem link-back cross-aula). Embute os 14 SVGs de piso (S-*,
   silhueta neutra sem rosto) e a figura-herói (P13 mapa-mestre marcos+reflexos+condutas) inline,
   byte-exato a partir de _PIPELINE/svgs/aula09 e _PIPELINE/heroes (preserva <script> self-contained).
   O "Instrumento dos Marcos" (tabela viva idade × 4-áreas) é OBJETO PERSISTENTE — mas, ao contrário
   da Árvore da 08, NÃO é SVG: é componente-Executor (grid HTML/CSS/JS). Nasce vazio na P3, hidrata
   faixa a faixa (P4-P8) e recebe os 3 casos plotados na P11. Cada instância é versionada por sufixo
   de página (ids isolados) via tabelaViva(suffix, faixaAtiva, casos). Imagens reais (Caderneta/MS +
   pranchas de atlas — zero foto de menor) entram em layout SPLIT via medSplit(), com título + legenda
   + fonte/licença. Onde a imagem real ficou PENDENTE (busca inconclusiva), pendingReal() planta um
   marcador HONESTO e visível (sem inventar imagem). Tudo tokenizado.
   Roda: node _build.mjs → escreve index.html ao lado. NÃO faz parte do runtime. */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const PIPE = resolve(__dir, '../../_PIPELINE');

/* ---- SANITIZADOR DE EMBED (determinístico, source-preserving) ----
   Idêntico em espírito ao da aula-08: os SVGs upstream chegam validados para render, mas três
   gates da casa ainda pegam resíduos de AUTORIA upstream — (a) seletor de ELEMENTO nu no <style>
   do SVG que VAZA e repinta a página; (b) role="button" sem nome acessível; (c) cor LITERAL fora
   de var(). Sano no EMBED (fonte intocada): escopo o seletor nu à raiz do SVG, dou aria-label aos
   botões mudos e embrulho a cor literal em var(--pp09lit-…, #hex) (mesma cor; só passa a seguir o
   tema). Prefixo pp09lit- (não pp08) p/ não colidir com a aula-08. Toda compensação logada no
   ledger do relatório (§11B). NÃO toco em @import (não casa o regex de seletor de elemento). */
function rootSelector(svg) {
  // pega a TAG <svg ...> de abertura — pula o prolog <?xml ...?> e comentários,
  // senão o id/class do root (que vive na <svg>, não no prolog) não é achado.
  const svgTagStart = svg.indexOf('<svg');
  const from = svgTagStart >= 0 ? svgTagStart : 0;
  const open = svg.slice(from, svg.indexOf('>', from) + 1);
  const cls = /class="([^" ]+)/.exec(open);
  if (cls) return '.' + cls[1];
  const id = /\bid="([^"]+)"/.exec(open);
  return id ? '#' + id[1] : 'svg';
}
function humanizeId(id) {
  if (!id) return 'Item interativo';
  let s = id.replace(/^npm09[A-Za-z]*-?/, '').replace(/-(svg|root|node|card|hotspot|group|interactive)-?/gi, ' ')
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
  // re-busca a cada iteração porque o tamanho da string muda ao reescrever
  while ((m = MQ.exec(out))) {
    const openIdx = m.index;
    const bodyStart = m.index + m[0].length;
    // acha o '}' que fecha o @media por balanço de chaves
    let depth = 1, i = bodyStart;
    while (i < out.length && depth > 0) {
      const ch = out[i];
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
      i++;
    }
    const closeIdx = i;                 // posição logo APÓS o '}' do @media
    const inner = out.slice(bodyStart, closeIdx - 1); // corpo sem o '}' final
    // prefixa cada seletor de regra do corpo: "SEL {" -> ":root:not([data-theme="light"]) SEL {"
    // (só seletores no nível do corpo; declarações --x:… vivem DENTRO de chaves e não casam)
    const HOUSE = ':root:not([data-theme="light"])';
    const retargeted = inner.replace(
      /(^|\})\s*([^{}@]+?)\s*\{/g,
      (mm, pre, sel) => {
        const s = sel.trim();
        // seletor :root nu colapsa no gatilho da casa (evita ":root:not(...) :root", que nunca casa)
        const out = s === ':root' ? HOUSE : `${HOUSE} ${s}`;
        return `${pre}\n      ${out} {`;
      }
    );
    out = out.slice(0, openIdx) + retargeted + out.slice(closeIdx);
    MQ.lastIndex = openIdx + retargeted.length; // segue após o trecho reescrito
  }
  return out;
}

function sanitizeSvgForEmbed(svg) {
  // (0) XML-PROLOG: remove o <?xml …?> inline (inválido no meio de um documento HTML embed).
  svg = svg.replace(/^\s*<\?xml[^>]*\?>\s*/, '');
  const root = rootSelector(svg);
  // (a) STYLE-LEAK: escopa seletor de ELEMENTO nu no início de uma regra dentro de <style>.
  //     @import / @font-face / @media não casam (não começam por nome de elemento).
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
  svg = svg.replace(/\b(fill|stroke|stop-color|flood-color)="(#[0-9a-fA-F]{3,8})"/g,
    (m, prop, val) => `${prop}="var(--pp09lit-${val.slice(1).toLowerCase()}, ${val})"`);
  svg = svg.replace(/\b(fill|stroke|stop-color|flood-color)(\s*:\s*)(#[0-9a-fA-F]{3,8})\b/g,
    (m, prop, sep, val) => `${prop}${sep}var(--pp09lit-${val.slice(1).toLowerCase()}, ${val})`);
  return svg;
}

/* ---- loaders de SVG (sanitizados no embed; fonte intocada) ---- */
const svgFile = (name) => sanitizeSvgForEmbed(readFileSync(resolve(PIPE, `svgs/aula09/${name}.svg`), 'utf8').trim());
const HERO_FILE = { p13: 'aula09-h1-mapamestre.svg' };
const hero = (id) => sanitizeSvgForEmbed(readFileSync(resolve(PIPE, `heroes/${HERO_FILE[id]}`), 'utf8').trim());

/* ---- imagens reais (Caderneta/MS + pranchas de atlas — zero foto de menor) ---- */
const IMGBASE = '../../assets/img/aula-09';

/* figure.med — imagem real FULL-WIDTH (assinatura da casa); o default desta aula é o medSplit. */
function med({ file, alt, titulo, achado, fonte, licenca, light }) {
  const wrapCls = light ? ' img-wrap--light' : '';
  const head = titulo ? `<strong>${titulo}</strong> ` : '<strong>Referência —</strong> ';
  return `
  <figure class="med">
    <div class="img-wrap${wrapCls}">
      <img src="${IMGBASE}/${file}" alt="${alt}" loading="lazy" decoding="async">
    </div>
    <figcaption>${head}${achado}<span class="attr">${fonte} · ${licenca}</span></figcaption>
  </figure>`;
}

/* medSplit — imagem real em SPLIT (imagem de um lado + bloco de texto do outro). Título + corpo +
   fonte/licença. `side` = lado da imagem ('left' default | 'right'). `light` = frame claro.
   `lic` = badge de licença comercial ('ok' verde | 'nc' âmbar). */
function medSplit({ file, alt, titulo, achado, fonte, licenca, light, side, body, lic }) {
  const wrapCls = light ? ' img-wrap--light' : '';
  const sideCls = side === 'right' ? ' media-split--right' : '';
  const head = titulo ? `<strong>${titulo}</strong>` : '<strong>Referência</strong>';
  const licBadge = lic
    ? `<span class="lic-badge lic-badge--${lic === 'ok' ? 'ok' : 'nc'}">${lic === 'ok' ? 'uso comercial · ok' : 'uso não comercial (NC)'}</span>`
    : '';
  const textBlock = body
    ? `<div class="media-split__text"><p class="media-split__head">${head}</p><p>${body}</p>${licBadge}</div>`
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

/* pendingReal — slot HONESTO para imagem real PENDENTE (busca inconclusiva). NÃO inventa imagem,
   NÃO usa foto de menor. Mostra: aviso visível "ilustração de referência pendente", o que se
   buscava, a flag para o Bauer e o caminho de resolução (método ChatGPT). O SVG autoral + o texto
   rico carregam a página sem a imagem (texto soberano). Marcador HTML-comment para grep do Bauer. */
function pendingReal({ rid, titulo, oque, body }) {
  return `
  <!-- IMAGEM REAL DE REFERÊNCIA PENDENTE: ${rid} — flag pro Bauer, método ChatGPT -->
  <div class="media-split media-split--right">
    <figure class="med med--split med--pending" aria-label="Imagem de referência pendente">
      <div class="img-wrap img-wrap--pending">
        <div class="pending-real" role="note">
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 16l5-5 4 4 3-3 6 6"/><circle cx="8.5" cy="8.5" r="1.4"/></svg>
          <p class="pending-real__title">Ilustração de referência pendente</p>
          <p class="pending-real__sub">${oque}</p>
          <p class="pending-real__flag">Busca documentada inconclusiva — a ancoragem desta faixa está no esquema autoral e no texto.</p>
        </div>
      </div>
      <figcaption><strong>Referência</strong> — imagem documentada em curadoria; ${titulo}.<span class="attr">Pendência sinalizada · ${rid}</span></figcaption>
    </figure>
    <div class="media-split__text"><p class="media-split__head"><strong>Reconhecer mesmo sem a foto</strong></p><p>${body}</p></div>
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

/* nota-banca / nota-valor (blindagem de prova discreta) */
function notaBanca(html) {
  return `
  <aside class="nota-banca">
    <svg class="nota-banca__shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    <div class="nota-banca__body"><p><span class="nota-banca__label">Atenção de banca</span>${html}</p></div>
  </aside>`;
}
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

/* scaffold opt-in colapsável — botão + painel, JS de casa (initCollapsibles) */
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

/* cluster de cards. Cada item: {icon, title, body, tone}. */
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

/* fluxograma-Executor (nós + setas/decisão). steps: [{kind:'node'|'decision'|'note', tone, label, sub}] */
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

/* reveal-por-par (Não confunda) — pairs:[{left, right, decide}] */
function naoConfunda(pairs) {
  return `
  <div class="exec-confunda" aria-label="Não confunda — pares que a banca troca">
    ${pairs.map((p) => `
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

/* ===== NOVOS componentes-Executor da aula-09 ===== */

/* divCard — card de divergência MS × Nelson (par cromático consistente: MS=primária/teal · Nelson=
   contraste/índigo). cols:[{label, rows:[{k,v}], note}] — 2 colunas pareadas. */
function divCard({ titulo, ms, nelson, foot }) {
  const col = (c, kind) => `
    <div class="div-card__col div-card__col--${kind}">
      <p class="div-card__src">${c.label}</p>
      <dl class="div-card__list">${c.rows.map((r) => `<dt>${r.k}</dt><dd>${r.v}</dd>`).join('')}</dl>
      ${c.note ? `<p class="div-card__note">${c.note}</p>` : ''}
    </div>`;
  return `
  <aside class="div-card" aria-label="Divergência MS × Nelson — ${titulo}">
    <p class="div-card__kicker"><span class="div-card__dot" aria-hidden="true"></span>Divergência MS × Nelson · ${titulo}</p>
    <div class="div-card__grid">
      ${col(ms, 'ms')}
      <span class="div-card__vs" aria-hidden="true">×</span>
      ${col(nelson, 'nelson')}
    </div>
    ${foot ? `<p class="div-card__foot">${foot}</p>` : ''}
  </aside>`;
}

/* checklistOpener — abertura E5: "Ao final desta página você vai saber:" com itens que preenchem
   ao scroll (initChecklist via IntersectionObserver). Usa a marcação BASE da casa
   (opener__checklist-item + opener__check), mas começa data-checked="false" para o efeito de
   preenchimento progressivo. items: [string]. */
function checklistOpener(intro, items) {
  const check = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg>';
  return `
  <section class="opener opener--checklist" aria-label="Meta da página">
    <p class="opener__checklist-title">${intro}</p>
    <ul class="opener__checklist">
      ${items.map((i) => `<li class="opener__checklist-item"><span class="opener__check" data-checked="false" aria-hidden="true">${check}</span><span>${i}</span></li>`).join('')}
    </ul>
  </section>`;
}

/* escada — timeline horizontal de degraus (linguagem P9, preensão, etc.). steps:[{age,label,sub,tone}] */
function escada({ caption, steps, hint }) {
  return `
  <figure class="escada" aria-label="${caption}">
    <ol class="escada__track">
      ${steps.map((s) => `
      <li class="escada__step${s.tone ? ` escada__step--${s.tone}` : ''}">
        <span class="escada__age">${s.age}</span>
        <span class="escada__dot" aria-hidden="true"></span>
        <span class="escada__label">${s.label}</span>
        ${s.sub ? `<span class="escada__sub">${s.sub}</span>` : ''}
      </li>`).join('')}
    </ol>
    <figcaption class="escada__cap"><strong>Escada</strong> — ${caption}${hint ? `<br><span class="escada__hint">${hint}</span>` : ''}</figcaption>
  </figure>`;
}

/* trilhaReflexos — timeline 0→15m com N trilhas (Moro/RTCA/preensões/paraquedista). tracks:[{name,
   tone, from, to, fica, note}] (from/to em meses 0-15; fica=true → barra que não termina). */
function trilhaReflexos({ caption, tracks, hint }) {
  const SCALE = 15;
  const bars = tracks.map((t) => {
    const left = (t.from / SCALE) * 100;
    const w = ((t.fica ? SCALE : t.to) - t.from) / SCALE * 100;
    const ficaCls = t.fica ? ' trilha__bar--fica' : '';
    return `
    <div class="trilha__row">
      <span class="trilha__name trilha__name--${t.tone}">${t.name}</span>
      <div class="trilha__lane">
        <div class="trilha__bar trilha__bar--${t.tone}${ficaCls}" style="left:${left}%;width:${w}%" aria-label="${t.name}: ${t.note}"></div>
      </div>
      <span class="trilha__note">${t.note}</span>
    </div>`;
  }).join('');
  const ticks = [0, 3, 6, 9, 12, 15].map((m) => `<span class="trilha__tick" style="left:${(m / SCALE) * 100}%">${m}m</span>`).join('');
  return `
  <figure class="trilha" aria-label="${caption}">
    <div class="trilha__axis" aria-hidden="true">${ticks}</div>
    <div class="trilha__rows">${bars}</div>
    <figcaption class="trilha__cap"><strong>Linha do tempo dos reflexos</strong> — ${caption}${hint ? `<br><span class="trilha__hint">${hint}</span>` : ''}</figcaption>
  </figure>`;
}

/* semaforo — tabela-semáforo das 3 categorias do MS (adequado/alerta/provável atraso). rows:[{tone,
   nome, def, conduta}]. cor da própria Caderneta: verde/âmbar/coral. */
function semaforo(rows) {
  return `
  <div class="semaforo" aria-label="As 3 categorias de classificação do desenvolvimento (MS)">
    ${rows.map((r) => `
    <div class="semaforo__row semaforo__row--${r.tone}">
      <span class="semaforo__light" aria-hidden="true"></span>
      <div class="semaforo__body">
        <p class="semaforo__nome">${r.nome}</p>
        <p class="semaforo__def">${r.def}</p>
        <p class="semaforo__conduta"><span class="semaforo__conduta-label">conduta:</span> ${r.conduta}</p>
      </div>
    </div>`).join('')}
  </div>`;
}

/* ===== INSTRUMENTO DOS MARCOS — tabela viva idade × 4-áreas (OBJETO PERSISTENTE) =====
   Componente-Executor (grid HTML/CSS/JS), NÃO SVG. Nasce vazia na P3, hidrata faixa a faixa
   (P4-P8), recebe os 3 casos na P11. Cada instância é versionada por sufixo (ids isolados),
   como a Árvore da 08 (lá era SVG-versionado; aqui é grid-versionado). Eixo X = faixas; eixo Y =
   4 áreas. clicar numa faixa realça os 4 marcos dela (+ a faixa imediatamente à esquerda).
   args: suffix (id único), faixaAtiva (faixa em foco), filled (faixas hidratadas), casos? */
const FAIXAS = [
  { id: '1m', label: '1 mês' },
  { id: '2m', label: '2 meses' },
  { id: '3-4m', label: '3-4 meses' },
  { id: '5-6m', label: '5-6 meses' },
  { id: '7-9m', label: '7-9 meses' },
  { id: '10-12m', label: '10-12 meses' },
  { id: '13-15m', label: '13-15 meses' },
];
const AREAS = ['Motor grosseiro', 'Fino-adaptativo', 'Pessoal-social', 'Linguagem'];
/* marcos[faixaId] = [motor, fino, social, linguagem] */
const MARCOS = {
  '1m':     ['PTC; eleva a cabeça em prono', 'mãos fechadas (preensão palmar)', 'fixa o rosto; preferência pela face', 'chora; reage ao som'],
  '2m':     ['movimenta os membros', 'abre as mãos às vezes', 'sorriso social (estimulado)', 'vocaliza (vogais)'],
  '3-4m':   ['perde a PTC; simétrica; apoia-se nos antebraços', 'pega cubital (Nelson, 4m)', 'contato social sustentado', 'fonemas (gugu); ri alto (4m)'],
  '5-6m':   ['rola (e começam os acidentes)', 'leva à boca; pega radial', 'busca ativa; senta com apoio (Nelson 6-7m)', 'localiza o som'],
  '7-9m':   ['senta sem apoio; engatinhar opcional', 'solta e transfere (lei da selva)', 'esconde-achou (permanência do objeto)', 'duplica sílabas (mamá)'],
  '10-12m': ['anda COM apoio (12m = limite)', 'pinça (polegar + indicador)', 'imita gestos', 'jargão'],
  '13-15m': ['anda SEM apoio (15m)', 'blocos na caneca', 'mostra o que quer; aponta', 'diz uma palavra; nomeia a família'],
};
function tabelaViva(suffix, { faixaAtiva, filled, casos, caption, hint } = {}) {
  const fillSet = new Set(filled || FAIXAS.map((f) => f.id)); // default: tudo hidratado
  const head = `<tr><th scope="col" class="tabviva__corner">Área ↓ / Idade →</th>${FAIXAS.map((f) =>
    `<th scope="col" class="tabviva__faixa" data-faixa="${f.id}"><button type="button" class="tabviva__faixa-btn"${f.id === faixaAtiva ? ' aria-pressed="true"' : ' aria-pressed="false"'}>${f.label}</button></th>`
  ).join('')}</tr>`;
  const rows = AREAS.map((area, ai) => {
    const cells = FAIXAS.map((f) => {
      const on = fillSet.has(f.id);
      const marco = on ? MARCOS[f.id][ai] : '<span class="tabviva__todo">a preencher</span>';
      // estado por caso (P11): casos[f.id]?.[ai] = 'P' | 'A' | 'N' (presente/ausente/neutro)
      let stateCls = '';
      let stateMark = '';
      if (casos && casos[f.id] && casos[f.id][ai]) {
        const st = casos[f.id][ai];
        stateCls = st === 'P' ? ' tabviva__cell--present' : st === 'A' ? ' tabviva__cell--absent' : ' tabviva__cell--neutral';
        stateMark = st === 'P' ? '<span class="tabviva__badge tabviva__badge--p" aria-label="presente">P</span>'
          : st === 'A' ? '<span class="tabviva__badge tabviva__badge--a" aria-label="ausente">A</span>'
          : '<span class="tabviva__badge tabviva__badge--n" aria-label="não esperado ainda">—</span>';
      }
      return `<td class="tabviva__cell${on ? '' : ' tabviva__cell--empty'}${stateCls}" data-faixa="${f.id}" data-area="${ai}">${stateMark}<span class="tabviva__marco">${marco}</span></td>`;
    }).join('');
    return `<tr><th scope="row" class="tabviva__area" data-area="${ai}">${area}</th>${cells}</tr>`;
  }).join('');
  return `
  <figure class="figure-svg figure-svg__embed tabviva-wrap">
    <div class="tabviva" id="tabviva-${suffix}" data-faixa-ativa="${faixaAtiva || ''}">
      <div class="tabviva__scroll">
        <table class="tabviva__table">
          <caption class="tabviva__caption">Instrumento dos Marcos · idade × 4 áreas</caption>
          <thead>${head}</thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
    <figcaption><strong>Interativo —</strong> ${caption || 'a tabela viva dos marcos. Toque numa idade para realçar os 4 quadradinhos da faixa (e a faixa imediatamente à esquerda).'}${hint ? `<br><span class="figure-svg__hint">${hint}</span>` : ''}</figcaption>
  </figure>`;
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

const TOTAL = 13;
/* páginas com herói/tabelas largas/tabela viva ganham container mais amplo */
const WIDE = ['p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p10', 'p11', 'p13'];
const page = (id, idx, body) => `
    <article class="page page--${id}" id="page-${id}" role="region" aria-label="${id}">
      <div class="page__container${WIDE.includes(id) ? ' page__container--wide' : ''}">
        ${body}
        ${nav(idx, TOTAL)}
      </div>
    </article>`;

import { buildPages } from './_pages.mjs';
const built = buildPages({
  med, medSplit, pendingReal, svgPiso, svgHero, notaBanca, notaValor, cmp, collapsible, recall,
  quiz, tag, chips, page, cardCluster, alertCard, flow, forkFlow, naoConfunda,
  divCard, checklistOpener, escada, trilhaReflexos, semaforo, tabelaViva, IMGBASE,
});

/* ---- menu lateral (13 títulos reais) ---- */
const MENU_ITEMS = [
  ['p1', 'Crescer tem número; desenvolver, não'],
  ['p2', 'As 4 áreas e a lei crânio-caudal'],
  ['p3', 'A tabela viva: o gesto que diz se está bem'],
  ['p4', '1-2 meses: a PTC e o sorriso social'],
  ['p5', '3-4 meses: simetria e a primeira pega'],
  ['p6', '5-6 meses: rola, localiza o som — e cai'],
  ['p7', '7-9 meses: permanência do objeto e o engatinhar opcional'],
  ['p8', '10-15 meses: pinça, com apoio aos 12, sem apoio aos 15'],
  ['p9', 'A escada da linguagem: do choro ao jargão'],
  ['p10', 'As 3 cores: adequado, alerta, provável atraso'],
  ['p11', 'Sofia, Paulo e Carlos: a tabela aberta'],
  ['p12', 'Reflexos primitivos: normal hoje, doença amanhã'],
  ['p13', 'O paraquedista que fica + o mapa-mestre'],
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
  <meta name="description" content="Desenvolvimento neuropsicomotor (Pediatria, núcleo): avaliar desenvolvimento é qualitativo, não quantitativo. A moldura (4 áreas — motor grosseiro, fino-adaptativo, pessoal-social, linguagem — e as 2 leis: sequencial/previsível/não-pula-etapa e crânio-caudal). A ferramenta-mestre — o Instrumento de Vigilância do Desenvolvimento da Caderneta de Saúde da Criança (MS): acha a idade, desce a coluna, avalia os 4 quadradinhos da faixa; faz tudo? encerra; faltou? olha a faixa anterior. O conteúdo faixa a faixa de 1 a 15 meses, com a divergência MS/Caderneta × Nelson em cada faixa como conteúdo de prova (sorriso social 2m × espontâneo 1m; pega cubital 4m/radial 6m; transferência 9m × 7m; com apoio 12m × sem apoio 15m; palavra 15m × 12m). A classificação que vira conduta — adequado (puericultura), alerta (reavalia em 30 dias), provável atraso (encaminha à equipe multidisciplinar) — com os cortes (PC > +2 ou < −2 escore-z; ≥3 alterações fenotípicas; ≥2/≥1 marcos da faixa anterior). Os 4 casos (Sofia 9m alerta, Paulo 4m15d adequado, Carlos 10m provável atraso) plotados na tabela viva. Os reflexos primitivos (Moro, RTCA/esgrimista, preensões — tripé presente/simétrico/some na hora; persistência = doença) e o paraquedista, o reflexo postural que surge no fim do 1º ano e fica para a vida.">
  <title>Desenvolvimento neuropsicomotor — Pediatria Bauer</title>
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
          <span class="site-header__title">Desenvolvimento neuropsicomotor</span>
          <span class="site-header__subtitle">Aula 9 · Núcleo</span>
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
      <p class="menu-panel__title">Desenvolvimento neuropsicomotor</p>
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
      <div>Pediatria Bauer · Aula 9 — Desenvolvimento neuropsicomotor</div>
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
