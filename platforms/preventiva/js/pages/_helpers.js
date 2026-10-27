/* =========================================
   INTENSIVÃO PREVENTIVA — HELPERS DE RENDERIZAÇÃO
   Funções utilitárias usadas por todos os módulos.
   ========================================= */

window.GO_RENDER = window.GO_RENDER || {};

/* ─────────────────────────────────────────
   Escape / utils
───────────────────────────────────────── */
function _e(s) {
  return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;')
    .replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
}

/* ─────────────────────────────────────────
   pageHero — abertura premium de cada página
───────────────────────────────────────── */
function pageHero(opts) {
  const { module = 'm1', moduleLabel = 'Módulo', pageNum = '', title, lead, grad } = opts;
  return `
  <div class="page-hero febris-hero has-aurora" style="--grad-current:${grad || 'var(--grad-m1)'}; position: relative;">
    <span class="mod-pill --${module}">${_e(moduleLabel)}${pageNum ? ` · Página ${pageNum}` : ''}</span>
    <h1>${title}</h1>
    ${lead ? `<p class="subtitle">${lead}</p>` : ''}
  </div>`;
}

/* ─────────────────────────────────────────
   conceptHero — pergunta provocadora + lead
───────────────────────────────────────── */
function conceptHero(opts) {
  const { question, title, lead, glow = 'rgba(37,99,235,.18)' } = opts;
  return `
  <div class="concept-hero" style="--hero-glow:${glow}">
    ${question ? `<div class="ch-q">${_e(question)}</div>` : ''}
    <h2>${title}</h2>
    ${lead ? `<p class="ch-lead">${lead}</p>` : ''}
  </div>`;
}

/* ─────────────────────────────────────────
   didaxBlock — bloco didático com variante
───────────────────────────────────────── */
function didaxBlock(variant, icon, title, html) {
  return `
  <div class="didax-block --${variant}">
    <div class="didax-block-title"><span class="ico">${icon}</span>${_e(title)}</div>
    <div class="didax-block-body">${html}</div>
  </div>`;
}

/* ─────────────────────────────────────────
   sectionTitle — título de seção interna
   color aceita 'var(--c-blue)'/'var(--c-teal)'/etc OU um módulo ('m1'..'m4').
   Renderiza usando classe .section-title-pv (Fase 5).
───────────────────────────────────────── */
function sectionTitle(icon, title, color = 'var(--c-blue)') {
  // Detecta se o color é uma chave de módulo (m1..m4)
  const modKey = /^m[1-4]$/.test(color) ? color : null;
  const modClass = modKey ? ` --${modKey}` : '';
  const inlineColor = modKey ? '' : ` style="--stp-color:${color}"`;
  return `<div class="section-title-pv${modClass}"${inlineColor}>
    <div class="stp-ico"></div>
    <span class="stp-emoji">${icon}</span>
    <h3>${_e(title)}</h3>
  </div>`;
}

/* ─────────────────────────────────────────
   keyTerms — chips com palavras-chave
───────────────────────────────────────── */
function keyTerms(arr, color = 'blue') {
  return `<div class="key-terms">
    ${arr.map(t => `<span class="didax-chip --${color}"><span class="ico">#</span>${_e(t)}</span>`).join('')}
  </div>`;
}

/* ─────────────────────────────────────────
   fraseAutoral — voz fundadora da Preventiva (Fase 5)
   Inserir 1× por módulo (idealmente em página-âncora).
   opts: { tag?, body (HTML), assinatura? }
───────────────────────────────────────── */
function fraseAutoral(opts) {
  const { tag = 'Voz Preventiva', body, assinatura = 'Intensivão Preventiva — voz editorial' } = opts;
  return `<div class="frase-autoral" role="note" aria-label="Frase autoral da Preventiva">
    <span class="fa-tag">${_e(tag)}</span>
    <div class="fa-body">${body}</div>
    <div class="fa-sig">${_e(assinatura)}</div>
  </div>`;
}

/* ─────────────────────────────────────────
   svgIllus — wrapper padronizado para SVGs (Fase 5)
───────────────────────────────────────── */
function svgIllus(svgString, caption) {
  return `<div class="svg-illus">${svgString}${caption ? `<div class="svg-caption">${_e(caption)}</div>` : ''}</div>`;
}

/* ─────────────────────────────────────────
   formulaBox
───────────────────────────────────────── */
function formulaBox(name, htmlFormula, note) {
  return `<div class="formula-box">
    <span class="name">${_e(name)}</span>
    <div>${htmlFormula}</div>
    ${note ? `<div style="margin-top:8px; font-family:Inter,sans-serif; font-size:12px; color: var(--text-muted);">${note}</div>` : ''}
  </div>`;
}

/* Fração HTML helper */
function frac(num, den) { return `<span class="frac"><span class="num">${num}</span><span class="den">${den}</span></span>`; }

/* ─────────────────────────────────────────
   revisaoAtiva — perguntas com toggle de resposta
───────────────────────────────────────── */
function revisaoAtiva(perguntasERespostas) {
  // perguntasERespostas: [{q, a}]
  return didaxBlock('resumo', '🧠', 'Revisão ativa — responda mentalmente antes de abrir',
    `<ol style="margin: 6px 0 0 18px;">
      ${perguntasERespostas.map((qa, i) => {
        const id = 'ra-' + Math.random().toString(36).slice(2,8) + '-' + i;
        return `<li style="margin: 6px 0;">
          <div style="font-weight: 600; color: var(--text-primary);">${qa.q}</div>
          <details style="margin-top: 4px;"><summary style="cursor: pointer; font-size: 13px; color: var(--c-blue); font-weight: 700;">Ver resposta</summary>
            <div style="margin-top: 6px; font-size: 14px; color: var(--text-secondary); padding: 8px 12px; background: var(--c-green-soft); border-radius: 8px; border-left: 3px solid var(--c-green);">${qa.a}</div>
          </details>
        </li>`;
      }).join('')}
    </ol>`);
}

/* ─────────────────────────────────────────
   bancaCallout — bloco "o que a banca quer"
───────────────────────────────────────── */
function bancaCallout(htmlContent) {
  return `<div class="banca-callout"><div class="bc-title">O que a banca quer</div><div style="font-size:14px; line-height:1.65; color:var(--text-secondary)">${htmlContent}</div></div>`;
}

/* ─────────────────────────────────────────
   navFooter — anterior / próxima
───────────────────────────────────────── */
function navFooter(currentPageId) {
  const idx = GO_PAGES.findIndex(p => p.id === currentPageId);
  if (idx === -1) return '';
  const prev = GO_PAGES[idx - 1];
  const next = GO_PAGES[idx + 1];
  return `<div class="page-nav" style="margin-top: 30px;">
    ${prev ? `<button class="page-nav-btn" data-goto="${prev.id}">← ${_e(prev.label)}</button>` : '<div></div>'}
    ${next ? `<button class="page-nav-btn" data-goto="${next.id}">${_e(next.label)} →</button>` : '<div></div>'}
  </div>`;
}

/* ─────────────────────────────────────────
   pageFooterMeta — checagem + conexão próxima
───────────────────────────────────────── */
function pageFooterMeta(opts) {
  const { resumo, proximaConexao, nextId } = opts;
  return `
  ${resumo ? didaxBlock('resumo', '✓', 'Resumo operacional', `<p>${resumo}</p>`) : ''}
  ${proximaConexao ? didaxBlock('proxima', '→', 'Conexão com a próxima página', `<p>${proximaConexao}</p>${nextId ? `<button class="page-nav-btn" style="margin-top:8px" data-goto="${nextId}">Continuar →</button>` : ''}`) : ''}
  `;
}

/* ─────────────────────────────────────────
   crossLink — link cruzado entre módulos (revisão ou conexão)
   Usado para reconectar conceitos âncora dos módulos anteriores.
   variant: 'recap' (revisão) | 'bridge' (ponte para próximo)
   ───────────────────────────────────────── */
function crossLink(opts) {
  const { module = 'm1', pageId, label, hint, variant = 'recap' } = opts;
  const icon = variant === 'bridge' ? '→' : '↺';
  const verb = variant === 'bridge' ? 'Avance para' : 'Revise';
  return `<a class="crosslink crosslink--${variant} crosslink--${module}" data-goto="${pageId}" role="button" tabindex="0">
    <span class="cl-ico">${icon}</span>
    <span class="cl-body">
      <span class="cl-hint">${verb} · ${_e(module.toUpperCase())}</span>
      <span class="cl-label">${_e(label)}</span>
      ${hint ? `<span class="cl-note">${hint}</span>` : ''}
    </span>
  </a>`;
}

/* ─────────────────────────────────────────
   jornadaBar — barra de continuidade entre módulos
   Mostra "Você vem de ... · está em ... · próximo será ..."
   Apenas para páginas de abertura/fechamento de módulo.
   ───────────────────────────────────────── */
function jornadaBar(opts) {
  const { from, current, next } = opts;
  // from/current/next: { module: 'm1', label: '...' } | null
  const cell = (item, role) => {
    if (!item) return `<div class="jb-cell jb-empty"></div>`;
    const verb = role === 'from' ? 'Você vem de' : role === 'current' ? 'Você está em' : 'Em seguida';
    return `<div class="jb-cell jb-${role} jb-${item.module}">
      <span class="jb-verb">${verb}</span>
      <span class="jb-mod">${_e(item.module.toUpperCase())}</span>
      <span class="jb-label">${_e(item.label)}</span>
    </div>`;
  };
  return `<div class="jornada-bar" role="navigation" aria-label="Continuidade entre módulos">
    ${cell(from, 'from')}
    <span class="jb-arrow" aria-hidden="true">›</span>
    ${cell(current, 'current')}
    <span class="jb-arrow" aria-hidden="true">›</span>
    ${cell(next, 'next')}
  </div>`;
}

/* ─────────────────────────────────────────
   pontoDeCostura — bloco-ponte temático
   Mostra a transição conceitual com cor do módulo de destino.
   ───────────────────────────────────────── */
function pontoDeCostura(opts) {
  const { fromModule, toModule, fromTitle, toTitle, ponte, links = [] } = opts;
  return `<div class="ponto-costura ponto-costura--${toModule || fromModule}">
    <div class="pc-header">
      <span class="pc-tag">↪ Ponto de costura</span>
      <span class="pc-route">
        <span class="pc-from">${_e(fromTitle)}</span>
        <span class="pc-arrow">→</span>
        <span class="pc-to">${_e(toTitle)}</span>
      </span>
    </div>
    <div class="pc-body">${ponte}</div>
    ${links.length ? `<div class="pc-links">${links.map(l => crossLink(l)).join('')}</div>` : ''}
  </div>`;
}

/* ─────────────────────────────────────────
   Helper: renderiza uma página inteira com padrão completo
   Cada renderer chama esta função apenas se quiser.
   ─────────────────────────────────────────  */
function renderStandard(container, page, body) {
  container.innerHTML = body + navFooter(page.id);
}
