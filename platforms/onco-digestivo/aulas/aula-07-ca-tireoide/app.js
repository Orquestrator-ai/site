/* app.js — bootstrap da Aula 07 (Nódulo e Câncer de tireoide)
   Reusa o chassi compartilhado: router · quiz universal · interativos (hotspots).
   Adiciona interações próprias desta aula (regra Bauer anti-default-hotspot):
   slider arrastável · calculadora · tabela dinâmica · step-through.
   Página única long-scroll com 14 seções (p1…p14), hash-router SPA.
   Header (brand · tema · home · hambúrguer direita) + menu overlay + page-nav + progress + PWA. */

import { HashRouter } from '../../assets/js/router.js';
import { initQuiz } from '../../assets/js/components/quiz.js';
import { initInteractive } from '../../assets/js/components/interactive.js';

const PAGES = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14'];
const PAGE_TITLES = {
  p1: 'Uma mulher, um nódulo de 1 cm, duas perguntas',
  p2: 'Comece pela funcionalidade: o TSH abre a porta',
  p3: 'O ultrassom vem antes da agulha, e o ANEI mora aqui',
  p4: 'TI-RADS: só o ANEI com pontos',
  p5: 'Bethesda: a citologia vira conduta',
  p6: 'O caso fecha e a árvore se abre',
  p7: 'Papilífero × folicular: por que o prognóstico muda',
  p8: 'Como o diagnóstico sai: PAF no papilífero, peça no folicular',
  p9: 'A virada para a lobectomia: conduta por tamanho',
  p10: 'Seguimento do diferenciado: suprimir, ablar, vigiar',
  p11: 'Medular: a célula C, a calcitonina, o RET e a NEM2',
  p12: 'Medular: tratar amplo e rastrear a família',
  p13: 'Anaplásico: o relógio contra o paciente',
  p14: 'O espectro inteiro num só olhar',
};
const NAMESPACE = 'cironco2-aula-07';
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
const prefersReduced = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* === Header / Menu (hambúrguer à direita) === */
function initHeader() {
  const menuBtn = $('#menu-toggle');
  const menuOverlay = $('#menu-overlay');
  const menuPanel = $('#menu-panel');
  const themeBtn = $('#theme-toggle');

  function closeMenu() {
    menuOverlay.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function openMenu() {
    menuOverlay.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const first = menuPanel.querySelector('a, button');
    if (first) first.focus();
  }
  menuBtn.addEventListener('click', () => {
    menuBtn.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });
  document.addEventListener('click', (e) => {
    if (menuOverlay.getAttribute('aria-hidden') === 'false' &&
        !menuPanel.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.getAttribute('aria-hidden') === 'false') { closeMenu(); menuBtn.focus(); }
  });
  menuPanel.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });

  // Tema (compartilha chave com o HUB e as demais aulas)
  const KEY = 'cironco2-theme';
  if (localStorage.getItem(KEY) === 'light') document.documentElement.setAttribute('data-theme', 'light');
  themeBtn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    if (cur === 'light') { document.documentElement.removeAttribute('data-theme'); localStorage.setItem(KEY, 'dark'); }
    else { document.documentElement.setAttribute('data-theme', 'light'); localStorage.setItem(KEY, 'light'); }
  });
}

/* === Header auto-hide (some ao descer, volta ao subir) === */
function initHeaderAutohide() {
  const header = $('.site-header');
  if (!header) return;
  let lastY = window.scrollY;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y > lastY && y > 120) header.setAttribute('data-hidden', 'true');
      else header.removeAttribute('data-hidden');
      lastY = y;
      ticking = false;
    });
  }, { passive: true });
}

/* === Renderização da página ativa === */
function renderActivePage(pageId) {
  $$('.page').forEach((p) => {
    const active = p.id === `page-${pageId}`;
    p.setAttribute('data-active', active ? 'true' : 'false');
    if (active) p.setAttribute('aria-current', 'page'); else p.removeAttribute('aria-current');
  });
  const idx = PAGES.indexOf(pageId);
  const total = PAGES.length;
  const counter = $('#progress-counter'); if (counter) counter.textContent = `${idx + 1} / ${total}`;
  const fill = $('#progress-fill'); if (fill) fill.style.width = `${((idx + 1) / total) * 100}%`;
  $$('.menu-panel__link').forEach((l) => {
    if (l.dataset.page === pageId) l.setAttribute('aria-current', 'page'); else l.removeAttribute('aria-current');
  });
  document.title = `${PAGE_TITLES[pageId]} — Cirurgia Oncológica 2 Bauer`;
  window.scrollTo({ top: 0, behavior: 'auto' });
  localStorage.setItem(`${NAMESPACE}-last-page`, pageId);
}

/* === Navegação inter-páginas === */
function initPageNav(router) {
  $$('.page-nav__btn--prev').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); router.prev(); }));
  $$('.page-nav__btn--next').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); router.next(); }));
  function updateNavStates() {
    $$('.page-nav__btn--prev').forEach((b) => router.hasPrev() ? b.removeAttribute('data-state') : b.setAttribute('data-state', 'disabled'));
    $$('.page-nav__btn--next').forEach((b) => router.hasNext() ? b.removeAttribute('data-state') : b.setAttribute('data-state', 'disabled'));
  }
  window.addEventListener('hashchange', updateNavStates);
  updateNavStates();
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea, button, select, a, [role="slider"]')) return;
    if (e.key === 'ArrowRight') router.next();
    if (e.key === 'ArrowLeft') router.prev();
  });
}

/* ====================================================================== */
/* INTERAÇÕES PRÓPRIAS DA AULA 07 (anti-default-hotspot)                   */
/* ====================================================================== */

/* === STEP-THROUGH ===
   Marcação:
   <div class="stepper" data-stepper>
     <div class="stepper__stage"> ...svg com nós data-step="1..N"... </div>
     <p class="stepper__live" aria-live="polite"></p>
     <div class="stepper__controls">
       <button data-step-prev>Voltar</button>
       <button data-step-next>Avançar</button>
       <button data-step-reset>Reiniciar</button>
     </div>
   </div>
   Cada nó com data-step="K" e data-step-say="frase" acende em ordem (K ascendente).
   Nós com mesmo K acendem juntos (bifurcação). data-step-final="true" no nó revela ao fim. */
function initSteppers(root = document) {
  root.querySelectorAll('.stepper:not([data-stp-bound])').forEach((block) => {
    block.setAttribute('data-stp-bound', '1');
    const stage = block.querySelector('.stepper__stage');
    const live = block.querySelector('.stepper__live');
    const btnPrev = block.querySelector('[data-step-prev]');
    const btnNext = block.querySelector('[data-step-next]');
    const btnReset = block.querySelector('[data-step-reset]');
    const nodes = Array.from(stage.querySelectorAll('[data-step]'));
    const steps = [...new Set(nodes.map((n) => parseInt(n.dataset.step, 10)))].sort((a, b) => a - b);
    const max = steps.length;
    let cur = 0; // 0 = nada revelado

    const apply = () => {
      nodes.forEach((n) => {
        const k = parseInt(n.dataset.step, 10);
        const on = steps.indexOf(k) < cur;
        n.classList.toggle('is-on', on);
        if (n.matches('[role="link"], a, button')) n.setAttribute('aria-current', on ? 'step' : 'false');
      });
      if (btnPrev) btnPrev.disabled = cur <= 0;
      if (btnNext) btnNext.disabled = cur >= max;
      if (live) {
        if (cur === 0) live.textContent = 'Toque em Avançar para percorrer o passo a passo.';
        else {
          const k = steps[cur - 1];
          const sayNode = nodes.find((n) => parseInt(n.dataset.step, 10) === k && n.dataset.stepSay);
          live.textContent = sayNode ? sayNode.dataset.stepSay : `Passo ${cur} de ${max}.`;
        }
      }
    };
    const go = (v) => { cur = Math.max(0, Math.min(max, v)); apply(); };
    if (btnNext) btnNext.addEventListener('click', () => go(cur + 1));
    if (btnPrev) btnPrev.addEventListener('click', () => go(cur - 1));
    if (btnReset) btnReset.addEventListener('click', () => go(0));
    apply();
  });
}

/* === SLIDER ARRASTÁVEL (paradas discretas) ===
   Marcação:
   <div class="dslider" data-slider data-stops="80,380,680">
     <svg> ... <g class="dslider__knob" role="slider" tabindex="0"
                 aria-valuemin=0 aria-valuemax=N-1 aria-valuenow=0 aria-label="..."> ...
     <div class="dslider__cards"> <div class="dslider__card" data-stop="0">...</div> ... </div>
   </div>
   O knob faz snap nas paradas; arrasto (pointer), setas e Home/End. Card do índice ativo aparece. */
function initSliders(root = document) {
  root.querySelectorAll('.dslider:not([data-sl-bound])').forEach((block) => {
    block.setAttribute('data-sl-bound', '1');
    const knob = block.querySelector('[role="slider"]');
    const svg = block.querySelector('svg');
    const stops = (block.dataset.stops || '').split(',').map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));
    const cards = Array.from(block.querySelectorAll('.dslider__card'));
    const live = block.querySelector('.dslider__live');
    if (!knob || !svg || stops.length < 2) return;
    const knobY = knob.transform && knob.transform.baseVal.length
      ? knob.transform.baseVal[0].matrix.f : 71;
    let idx = parseInt(knob.getAttribute('aria-valuenow') || '0', 10);

    const setIdx = (n, focus) => {
      idx = Math.max(0, Math.min(stops.length - 1, n));
      const x = stops[idx];
      knob.setAttribute('transform', `translate(${x},${knobY})`);
      knob.setAttribute('aria-valuenow', String(idx));
      const card = cards[idx];
      knob.setAttribute('aria-valuetext', card ? (card.dataset.label || card.textContent.trim().slice(0, 80)) : String(idx));
      cards.forEach((c, i) => c.classList.toggle('is-on', i === idx));
      if (live && card) live.textContent = card.dataset.label || '';
      if (focus) knob.focus();
    };

    // teclado
    knob.addEventListener('keydown', (e) => {
      let handled = true;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') setIdx(idx + 1, true);
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') setIdx(idx - 1, true);
      else if (e.key === 'Home') setIdx(0, true);
      else if (e.key === 'End') setIdx(stops.length - 1, true);
      else handled = false;
      if (handled) e.preventDefault();
    });

    // pointer drag → snap na parada mais próxima
    const xToIdx = (clientX) => {
      const rect = svg.getBoundingClientRect();
      const vb = svg.viewBox.baseVal;
      const vx = ((clientX - rect.left) / rect.width) * vb.width;
      let best = 0, bestD = Infinity;
      stops.forEach((sx, i) => { const d = Math.abs(sx - vx); if (d < bestD) { bestD = d; best = i; } });
      return best;
    };
    let dragging = false;
    const onMove = (e) => { if (!dragging) return; setIdx(xToIdx(e.clientX), false); };
    const onUp = () => { dragging = false; window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
    const startDrag = (e) => {
      dragging = true; setIdx(xToIdx(e.clientX), true);
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      e.preventDefault();
    };
    knob.style.cursor = 'grab';
    knob.addEventListener('pointerdown', startDrag);
    svg.addEventListener('pointerdown', (e) => { if (e.target !== knob && !knob.contains(e.target)) startDrag(e); });

    setIdx(idx, false);
  });
}

/* === TABELA DINÂMICA (cards/linhas expansíveis) ===
   Cards expansíveis: <button class="dyn-card" data-dyn aria-expanded="false"> ... <div class="dyn-card__body" hidden>...</div></button>
   Linhas de tabela reveláveis por clique: <tr class="dyn-row" data-dyn-row tabindex=0>...</tr> com .dyn-row__more hidden. */
function initDynTables(root = document) {
  root.querySelectorAll('.dyn-card:not([data-dc-bound])').forEach((card) => {
    card.setAttribute('data-dc-bound', '1');
    if (card.tagName.toLowerCase() === 'button') card.setAttribute('type', 'button');
    const body = card.querySelector('.dyn-card__body');
    const toggle = () => {
      const open = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', String(!open));
      if (body) body.hidden = open;
    };
    card.addEventListener('click', toggle);
  });
  // linha de tabela revelável (TI-RADS / NEM em modo tabela)
  root.querySelectorAll('[data-dyn-row]:not([data-dr-bound])').forEach((row) => {
    row.setAttribute('data-dr-bound', '1');
    row.setAttribute('tabindex', '0');
    row.setAttribute('role', 'button');
    const reveal = () => row.classList.toggle('is-open');
    row.addEventListener('click', reveal);
    row.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reveal(); } });
  });
}

/* === CALCULADORA P9 — conduta por tamanho === */
function initCalcConduta(root = document) {
  const box = root.querySelector('#cc9');
  if (!box || box.dataset.bound) return; box.dataset.bound = '1';
  const tam = box.querySelector('#cc-tam');
  const mets = box.querySelector('#cc-mets');
  const risco = box.querySelector('#cc-risco');
  const linfo = box.querySelector('#cc-linfo');
  const out = box.querySelector('#cc-out');
  const compute = () => {
    const t = tam.value;
    let conduta, tone, nota = '';
    if (t === 'gt4' || mets.checked || risco.checked) {
      const motivos = [];
      if (t === 'gt4') motivos.push('tumor > 4 cm');
      if (mets.checked) motivos.push('metástase');
      if (risco.checked) motivos.push('histologia de alto risco');
      conduta = 'Tireoidectomia total obrigatória';
      tone = 'err';
      nota = 'Disparada por: ' + motivos.join(' · ') + '.';
    } else if (t === 'lt1') {
      conduta = 'Vigilância ativa';
      tone = 'ok';
      nota = 'Não é só pelo tamanho: o tumor precisa ser de baixo risco (sem extensão extratireoidiana, sem linfonodo acometido, longe de traqueia e nervo).';
    } else if (t === 'le2') {
      conduta = 'Lobectomia preferencial';
      tone = 'accent';
    } else {
      conduta = 'Lobectomia (melhor opção); tireoidectomia total como alternativa';
      tone = 'accent';
    }
    let adicional = '';
    if (linfo.checked) adicional = ' + Linfadenectomia da cadeia acometida';
    out.dataset.tone = tone;
    out.innerHTML =
      `<span class="cc-out__verdict">${conduta}${adicional ? '<b>' + adicional + '</b>' : ''}</span>` +
      (nota ? `<span class="cc-out__nota">${nota}</span>` : '') +
      (linfo.checked ? `<span class="cc-out__nota">Linfadenectomia responde a linfonodo acometido — não é extensão da tireoidectomia.</span>` : '');
  };
  [tam, mets, risco, linfo].forEach((el) => el.addEventListener('change', compute));
  compute();
}

/* === CALCULADORA P12 — fluxo familiar do medular === */
function initCalcMedular(root = document) {
  const box = root.querySelector('#mt12');
  if (!box || box.dataset.bound) return; box.dataset.bound = '1';
  const hered = box.querySelector('#mt-hered');
  const step2 = box.querySelector('#mt-step2');
  const alto = box.querySelector('#mt-altorisco');
  const out = box.querySelector('#mt-out');
  const compute = () => {
    if (step2) step2.hidden = !hered.checked;
    if (!hered.checked) { out.textContent = ''; out.dataset.tone = ''; if (alto) alto.checked = false; return; }
    if (alto && alto.checked) {
      out.dataset.tone = 'err';
      out.textContent = 'Tireoidectomia profilática — retirar a tireoide antes de o câncer aparecer.';
    } else {
      out.dataset.tone = 'accent';
      out.textContent = 'Rastrear o gene RET nos familiares; a conduta depende do resultado.';
    }
  };
  hered.addEventListener('change', compute);
  if (alto) alto.addEventListener('change', compute);
  compute();
}

/* === TABELA DINÂMICA P4 — score TI-RADS (sem %) === */
function initTirads(root = document) {
  const box = root.querySelector('#tirads4');
  if (!box || box.dataset.bound) return; box.dataset.bound = '1';
  const selects = Array.from(box.querySelectorAll('select[data-cat]'));
  const marker = box.querySelector('#p4-marker');
  const outText = box.querySelector('#p4-out');
  const live = box.querySelector('.tirads__live');
  const shortcut = box.querySelector('.tirads__shortcut');
  // paradas x para TR1..TR5 (régua de 30..570)
  const STOPS = { 1: 30, 2: 165, 3: 300, 4: 435, 5: 570 };
  const compute = () => {
    const pts = selects.reduce((s, sel) => s + (parseInt(sel.value, 10) || 0), 0);
    let tr;
    if (pts <= 1) tr = 1; else if (pts === 2) tr = 2; else if (pts === 3) tr = 3; else if (pts <= 6) tr = 4; else tr = 5;
    if (marker) marker.setAttribute('transform', `translate(${STOPS[tr]},48)`);
    if (outText) outText.textContent = `TI-RADS ${tr}`;
    const adj = { 1: 'benigno', 2: 'não suspeito', 3: 'levemente suspeito', 4: 'moderadamente suspeito', 5: 'alto risco' }[tr];
    box.dataset.tr = String(tr);
    if (shortcut) shortcut.classList.toggle('is-hot', tr === 5);
    if (live) live.textContent = tr === 5
      ? 'TI-RADS 5: alto risco. Com nódulo de pelo menos 1 cm, indica PAF.'
      : `TI-RADS ${tr}: ${adj}.`;
  };
  selects.forEach((sel) => sel.addEventListener('change', compute));
  compute();
}

/* === Bootstrap === */
document.addEventListener('DOMContentLoaded', () => {
  const router = new HashRouter({ pages: PAGES, onChange: renderActivePage });
  initHeader();
  initHeaderAutohide();
  initPageNav(router);
  initQuiz({ namespace: NAMESPACE });
  initInteractive(document);   // hotspots compartilhados (p3, p9b, p11b)
  initSteppers(document);      // p1, p2, p6, p8, p10, p13
  initSliders(document);       // p7, p14
  initDynTables(document);     // p5 Bethesda, p11 NEM
  initTirads(document);        // p4
  initCalcConduta(document);   // p9
  initCalcMedular(document);   // p12
  router.init();
});
