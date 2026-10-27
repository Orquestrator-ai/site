/* app.js — bootstrap da Aula 08 (Câncer de próstata)
   Reusa o chassi compartilhado: router · quiz universal · interativos (hotspots).
   Interações próprias desta aula (regra Bauer anti-default-hotspot, variedade):
     tabela dinâmica (pg1,4,6,12,13) · slider arrastável (pg2,7,9) ·
     calculadora (pg8,10,11) · step-through (pg5,14) · hotspot anatômico (pg3, ÚNICO).
   Página única long-scroll com 14 seções (p1…p14), hash-router SPA.
   Header (brand · tema · home · hambúrguer direita) + menu overlay + page-nav + progress + PWA.

   Decisões Bauer travadas (texto-aluno grep 0): "D'Amico" / "ISUP" / "grade group" / "GG".
   Slots desligados ficam hidden e pré-cabeados (data-*) mas nunca renderizam texto. */

import { HashRouter } from '../../assets/js/router.js';
import { initQuiz } from '../../assets/js/components/quiz.js';
import { initInteractive } from '../../assets/js/components/interactive.js';

const PAGES = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14'];
const PAGE_TITLES = {
  p1: 'O nódulo que mudou a manhã do paciente',
  p2: 'O câncer mais comum que mata pouco',
  p3: 'Por que o câncer se esconde — e o dedo o encontra',
  p4: 'Quando o osso brilha branco',
  p5: 'Fechando o diagnóstico: o fragmento que confirma',
  p6: 'Rastrear ou não rastrear: a briga das diretrizes',
  p7: 'Quando enfiar a agulha: toque, PSA e a zona cinzenta',
  p8: 'Quando o PSA mente: o refinamento dos 3 fatores',
  p9: 'A ressonância que mapeia o risco antes da agulha',
  p10: 'Em que pé está a doença: estratificar o risco',
  p11: 'Gleason: a soma que esconde uma pegadinha',
  p12: 'Tratar ou observar: a conta do dano',
  p13: 'Quando não há mais cura: derrubar a testosterona',
  p14: 'O pulo do gato: por que o remédio contínuo desliga o testículo',
};
const NAMESPACE = 'cironco2-aula-08';
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
const prefersReduced = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fmt = (n, dec = 2) => Number(n).toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });

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
/* INTERAÇÕES PRÓPRIAS DA AULA 08                                         */
/* ====================================================================== */

/* === STEP-THROUGH (pg5 fluxo dx · pg14 eixo HHG) ===
   Reusa o contrato do template:
   <div class="stepper" data-stepper>
     <div class="stepper__stage"> ...svg com nós data-step="1..N" data-step-say="frase"... </div>
     <p class="stepper__live" aria-live="polite"></p>
     <div class="stepper__controls">
       <button data-step-prev>Voltar</button><button data-step-next>Avançar</button><button data-step-reset>Reiniciar</button>
     </div>
   </div>
   Nós com mesmo K acendem juntos (bifurcação). data-step-final dispara o card-veredito (pg14). */
function initSteppers(root = document) {
  root.querySelectorAll('.stepper:not([data-stp-bound])').forEach((block) => {
    block.setAttribute('data-stp-bound', '1');
    const stage = block.querySelector('.stepper__stage');
    const live = block.querySelector('.stepper__live');
    const btnPrev = block.querySelector('[data-step-prev]');
    const btnNext = block.querySelector('[data-step-next]');
    const btnReset = block.querySelector('[data-step-reset]');
    // card-veredito opcional (pg14): revela ao chegar no último passo
    const verdictCard = block.querySelector('[data-step-verdict]');
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
      if (verdictCard) verdictCard.hidden = cur < max;
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

/* === TABELA DINÂMICA (pg1,4,6,12,13) ===
   Linhas/células expansíveis por clique e teclado.
   (A) .bt-row (button): alterna aria-expanded → revela .bt-why. (pg1, pg4)
   (B) .bc-cell (célula comparativa): mostra data-detail no .bc-detail-box + toggle decisão compartilhada. (pg6)
   (C) .dyn-card (button): alterna aria-expanded → revela .dyn-card__body. (pg12, pg13)
   Tudo idempotente, sem reflow de vizinhos. */
function initDynTables(root = document) {
  // (A) linhas de tabela expansíveis (achado→decisão / mecanismo→sintoma)
  root.querySelectorAll('.bt-row:not([data-bt-bound])').forEach((row) => {
    row.setAttribute('data-bt-bound', '1');
    if (row.tagName.toLowerCase() === 'button') row.setAttribute('type', 'button');
    const toggle = () => {
      const open = row.getAttribute('aria-expanded') === 'true';
      row.setAttribute('aria-expanded', String(!open));
    };
    row.addEventListener('click', toggle);
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  // (C) cards expansíveis (risco→conduta / cirúrgica×química)
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
}

/* === TABELA DINÂMICA COMPARATIVA (pg6) — MS/INCA × SBU/AUA === */
function initCompare(root = document) {
  root.querySelectorAll('.bauer-compare:not([data-cmp-bound])').forEach((box) => {
    box.setAttribute('data-cmp-bound', '1');
    const cells = Array.from(box.querySelectorAll('.bc-cell'));
    const detailBox = box.querySelector('.bc-detail-box');
    const toggle = box.querySelector('.bc-toggle');

    const showDetail = (cell) => {
      cells.forEach((c) => c.classList.toggle('is-active', c === cell));
      if (detailBox) {
        detailBox.hidden = false;
        detailBox.textContent = cell.dataset.detail || '';
      }
    };
    cells.forEach((cell, i) => {
      cell.setAttribute('tabindex', '0');
      cell.setAttribute('role', 'button');
      cell.addEventListener('click', () => showDetail(cell));
      cell.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showDetail(cell); }
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); cells[(i + 1) % cells.length].focus(); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); cells[(i - 1 + cells.length) % cells.length].focus(); }
      });
    });

    if (toggle) {
      toggle.setAttribute('type', 'button');
      toggle.addEventListener('click', () => {
        const on = toggle.getAttribute('aria-pressed') === 'true';
        toggle.setAttribute('aria-pressed', String(!on));
        box.classList.toggle('show-common', !on);
        if (!on && detailBox) {
          detailBox.hidden = false;
          detailBox.textContent = 'Paciente informado pode optar por rastrear — ambos os lados convergem aqui.';
        }
      });
    }
  });
}

/* === SLIDER idade × prevalência (pg2) ===
   <input type="range"> nativo (0..4). Move o marcador SVG ao longo da curva, troca rótulo e callout. */
function initSliderIdade(root = document) {
  const box = root.querySelector('[data-visual="idade-prev"]');
  if (!box || box.dataset.bound) return; box.dataset.bound = '1';
  const range = box.querySelector('.prev-range');
  const marker = box.querySelector('#prev-marker');
  const callout = box.querySelector('#prev-callout');
  const ageEl = box.querySelector('.prev-age');
  const labelEl = box.querySelector('.prev-label');
  // pontos (x,y) do marcador ao longo da curva por parada
  const PTS = [[70, 240], [230, 228], [390, 188], [550, 118], [710, 52]];
  const META = [
    { age: '40 anos', label: 'raro / incipiente', tone: 'low' },
    { age: '50 anos', label: 'incomum', tone: 'low' },
    { age: '60 anos', label: 'começa a importar', tone: 'mid' },
    { age: '70 anos', label: 'provável', tone: 'mid' },
    { age: '80+ anos', label: 'muito provável', tone: 'high' },
  ];
  const apply = (i) => {
    const idx = Math.max(0, Math.min(4, i));
    const [x, y] = PTS[idx];
    if (marker) marker.setAttribute('transform', `translate(${x},${y})`);
    if (callout) callout.setAttribute('opacity', idx === 4 ? '1' : '0');
    const m = META[idx];
    if (ageEl) ageEl.textContent = m.age;
    if (labelEl) { labelEl.textContent = m.label; labelEl.className = `prev-label prev-label--${m.tone}`; }
    range.setAttribute('aria-valuetext', `${m.age}, prevalência ${m.label}`);
  };
  range.addEventListener('input', () => apply(parseInt(range.value, 10)));
  apply(parseInt(range.value, 10) || 0);
}

/* === SLIDER de PSA com zonas (pg7) ===
   <input type="range"> contínuo (0..14, step 0.1). Marcador SVG segue o valor; veredito por faixa.
   Toggle "paciente jovem (<50)" desloca o limiar de atenção (4 → 2,5) e recalibra o veredito. */
function initSliderPsa(root = document) {
  const box = root.querySelector('[data-visual="psa-zonas"]');
  if (!box || box.dataset.bound) return; box.dataset.bound = '1';
  const range = box.querySelector('.psa-range');
  const marker = box.querySelector('#psa-marker');
  const limiar = box.querySelector('#psa-limiar');
  const valEl = box.querySelector('.psa-val');
  const verdEl = box.querySelector('.psa-verdict');
  const jovemBtn = box.querySelector('.psa-jovem');
  const jovemNote = box.querySelector('.psa-note--jovem');
  // escala: PSA 0..14 → x 40..720 ; marcador y=65
  const xFor = (psa) => 40 + (Math.max(0, Math.min(14, psa)) * (680 / 14));
  let jovem = false;

  const verdictFor = (psa) => {
    if (jovem) {
      if (psa < 2.5) return ['Baixo — mesmo em jovem, tranquiliza', 'low'];
      if (psa < 4) return ['Atenção: jovem sem HPB, valor já relevante', 'gray'];
      return ['Claramente alto — biopsiar', 'high'];
    }
    if (psa < 2.5) return ['Baixo', 'low'];
    if (psa < 4) return ['Limítrofe — zona cinzenta, pede refinamento', 'mid'];
    if (psa <= 10) return ['Zona cinzenta alta — refinar / considerar biópsia', 'gray'];
    return ['Claramente alto — biopsiar', 'high'];
  };

  const apply = () => {
    const psa = parseFloat(range.value) || 0;
    if (marker) marker.setAttribute('transform', `translate(${xFor(psa)},65)`);
    const [text, tone] = verdictFor(psa);
    if (valEl) valEl.textContent = `PSA ${fmt(psa, 1)}`;
    if (verdEl) { verdEl.textContent = text; verdEl.className = `psa-verdict psa-verdict--${tone}`; }
    range.setAttribute('aria-valuetext', `${fmt(psa, 1)} ng/mL — ${text}`);
  };

  range.addEventListener('input', apply);
  if (jovemBtn) {
    jovemBtn.setAttribute('type', 'button');
    jovemBtn.addEventListener('click', () => {
      jovem = !jovem;
      jovemBtn.setAttribute('aria-pressed', String(jovem));
      if (limiar) { const lx = jovem ? xFor(2.5) : xFor(4); limiar.setAttribute('x1', lx); limiar.setAttribute('x2', lx); }
      if (jovemNote) jovemNote.hidden = !jovem;
      apply();
    });
  }
  apply();
}

/* === SLIDER PI-RADS 1→5 (pg9) ===
   <input type="range"> discreto (1..5). Acende segmentos, troca o painel principal e o espelho TI-RADS. */
function initSliderPirads(root = document) {
  const box = root.querySelector('[data-visual="pirads"]');
  if (!box || box.dataset.bound) return; box.dataset.bound = '1';
  const range = box.querySelector('.bp-range');
  const segs = Array.from(box.querySelectorAll('.bp-seg'));
  const numEl = box.querySelector('.bp-num');
  const numTiEl = box.querySelector('.bp-num-ti');
  const riskEl = box.querySelector('.bp-risk');
  const RISK = {
    1: 'Muito baixo risco — câncer clinicamente significativo muito improvável.',
    2: 'Baixo risco — câncer significativo improvável.',
    3: 'Indeterminado — risco intermediário, a conduta pesa o conjunto.',
    4: 'Alto risco — câncer clinicamente significativo provável.',
    5: 'Muito alto risco — câncer clinicamente significativo muito provável.',
  };
  const apply = () => {
    const r = parseInt(range.value, 10) || 1;
    segs.forEach((s) => s.classList.toggle('is-on', parseInt(s.dataset.r, 10) <= r));
    if (numEl) numEl.textContent = String(r);
    if (numTiEl) numTiEl.textContent = String(r);
    if (riskEl) { riskEl.textContent = RISK[r]; riskEl.className = `bp-risk bp-risk--${r}`; }
    range.setAttribute('aria-valuetext', `PI-RADS ${r} — ${RISK[r]}`);
  };
  range.addEventListener('input', apply);
  apply();
}

/* === CALCULADORA pg8 — refinamento do PSA (3 fatores) ===
   3 fatores independentes; cada um vira verde (tranquiliza) / vermelho (sugere câncer) ao cruzar o cutoff.
   Veredito-síntese conta quantos sugerem câncer. */
function initCalcRefino(root = document) {
  const box = root.querySelector('[data-visual="refino-psa"]');
  if (!box || box.dataset.bound) return; box.dataset.bound = '1';
  const inVel = box.querySelector('[data-factor="vel"]');
  const inPsa = box.querySelector('[data-factor="psa"]');
  const inPeso = box.querySelector('[data-factor="peso"]');
  const inFl = box.querySelector('[data-factor="fl"]');
  const outVel = box.querySelector('[data-out="vel"]');
  const outDens = box.querySelector('[data-out="dens"]');
  const outFl = box.querySelector('[data-out="fl"]');
  const sintese = box.querySelector('.bc-sintese-text');

  const setOut = (el, bad, text) => {
    if (!el) return;
    el.className = `bc-out ${bad ? 'bc-out--bad' : 'bc-out--ok'}`;
    el.textContent = text;
  };

  const compute = () => {
    const reasons = [];
    // velocidade
    const vel = parseFloat(inVel.value);
    const velBad = !isNaN(vel) && vel > 0.75;
    setOut(outVel, velBad, isNaN(vel) ? '—' : (velBad ? '> 0,75: sugere câncer' : '≤ 0,75: tranquiliza'));
    if (velBad) reasons.push('velocidade alta');
    // densidade = PSA / peso
    const psa = parseFloat(inPsa.value);
    const peso = parseFloat(inPeso.value);
    let densBad = false, densText = '—';
    if (!isNaN(psa) && !isNaN(peso) && peso >= 1) {
      const dens = psa / peso;
      densBad = dens > 0.15;
      densText = `densidade ${fmt(dens, 2)} — ${densBad ? 'sugere câncer' : 'tranquiliza'}`;
    }
    setOut(outDens, densBad, densText);
    if (densBad) reasons.push('densidade alta');
    // fração livre
    const fl = parseFloat(inFl.value);
    const flBad = !isNaN(fl) && fl < 25;
    setOut(outFl, flBad, isNaN(fl) ? '—' : `${fmt(fl, 0)}% — ${flBad ? 'sugere câncer (< 25)' : 'tranquiliza (≥ 25)'}`);
    if (flBad) reasons.push('fração livre baixa');
    // síntese
    if (sintese) {
      sintese.textContent = reasons.length === 0
        ? 'nenhum fator sugere câncer — refinamento tranquilizador.'
        : `${reasons.length} fator(es) sugere(m) câncer (${reasons.join(' · ')}) — reforça indicação de biópsia.`;
    }
  };
  [inVel, inPsa, inPeso, inFl].forEach((el) => el && el.addEventListener('input', compute));
  compute();
}

/* === CALCULADORA pg10 — estratificação de risco (E vs OU) ===
   Régua do professor (= D'Amico, NÃO nomeado no texto-aluno):
     Baixo  = Gleason ≤ 6  E  PSA < 10   (E: ambos)
     Alto   = Gleason ≥ 8  OU PSA > 20   (OU: qualquer um)
     Intermediário = o que sobra.
   Slot de epônimo pré-cabeado e oculto (data-dado-tooltip vazio). */
function initCalcRisco(root = document) {
  const box = root.querySelector('[data-visual="risco-estrat"]');
  if (!box || box.dataset.bound) return; box.dataset.bound = '1';
  const selGleason = box.querySelector('[data-risk="gleason"]');
  const inPsa = box.querySelector('[data-risk="psa"]');
  const out = box.querySelector('.risk-out');
  const ruleLow = box.querySelector('[data-rule="low"]');
  const ruleHigh = box.querySelector('[data-rule="high"]');

  const compute = () => {
    const g = parseInt(selGleason.value, 10);   // 6,7,8 (≤6 / 7 / ≥8 representados)
    const psa = parseFloat(inPsa.value);
    let tier, tone, why;
    const lowG = g <= 6, lowP = !isNaN(psa) && psa < 10;
    const highG = g >= 8, highP = !isNaN(psa) && psa > 20;

    if (highG || highP) {
      tier = 'Alto risco';
      tone = 'err';
      const m = [];
      if (highG) m.push('Gleason ≥ 8');
      if (highP) m.push('PSA > 20');
      why = `Basta UM critério: ${m.join(' ou ')}. Por isso o "OU".`;
    } else if (lowG && lowP) {
      tier = 'Baixo risco';
      tone = 'ok';
      why = 'Exige os DOIS: Gleason ≤ 6 E PSA < 10. Por isso o "E".';
    } else {
      tier = 'Risco intermediário';
      tone = 'accent';
      why = 'Não fecha baixo (faltou um dos dois) nem dispara alto — cai no meio.';
    }
    // realce visual das réguas
    if (ruleLow) ruleLow.classList.toggle('is-hot', tier === 'Baixo risco');
    if (ruleHigh) ruleHigh.classList.toggle('is-hot', tier === 'Alto risco');
    if (out) {
      out.dataset.tone = tone;
      out.innerHTML = `<span class="risk-out__verdict">${tier}</span><span class="risk-out__why">${why}</span>`;
    }
  };
  selGleason.addEventListener('change', compute);
  inPsa.addEventListener('input', compute);
  compute();
}

/* === CALCULADORA pg11 — score de Gleason (pegadinha 4+3 > 3+4) ===
   Soma = padrão dominante (maior área) + segundo padrão (na biópsia, o pior dos restantes).
   A ORDEM importa: 4+3 é pior que 3+4 mesmo somando 7.
   Slot ISUP/grade group pré-cabeado e oculto (data-isup hidden) — NUNCA renderiza texto. */
function initCalcGleason(root = document) {
  const box = root.querySelector('[data-visual="gleason"]');
  if (!box || box.dataset.bound) return; box.dataset.bound = '1';
  const selDom = box.querySelector('[data-gl="dom"]');
  const selSec = box.querySelector('[data-gl="sec"]');
  const out = box.querySelector('.gl-out');
  const sumEl = box.querySelector('.gl-sum');
  const isupSlot = box.querySelector('[data-isup]'); // pré-cabeado, permanece hidden

  const compute = () => {
    const dom = parseInt(selDom.value, 10);
    const sec = parseInt(selSec.value, 10);
    const sum = dom + sec;
    if (sumEl) sumEl.textContent = `${dom} + ${sec} = ${sum}`;

    let tier, tone, why;
    if (sum <= 6) {
      tier = 'Gleason baixo (≤ 6)';
      tone = 'ok';
      why = 'Bem diferenciado — o de melhor comportamento.';
    } else if (sum === 7) {
      // pegadinha da ordem
      if (dom === 4 && sec === 3) {
        tier = 'Gleason 7 (4+3) — mais agressivo';
        tone = 'err';
        why = 'O padrão dominante é o 4. Pior que 3+4, mesmo somando 7 — a ordem importa.';
      } else if (dom === 3 && sec === 4) {
        tier = 'Gleason 7 (3+4) — menos agressivo';
        tone = 'accent';
        why = 'O dominante é o 3. Menos agressivo que 4+3, embora a soma seja a mesma.';
      } else {
        tier = `Gleason 7 (${dom}+${sec})`;
        tone = 'accent';
        why = 'O primeiro número é o padrão dominante — é ele que pesa.';
      }
    } else {
      tier = `Gleason alto (${sum})`;
      tone = 'err';
      why = 'Pouco diferenciado — comportamento mais agressivo.';
    }
    if (out) {
      out.dataset.tone = tone;
      out.innerHTML = `<span class="gl-out__verdict">${tier}</span><span class="gl-out__why">${why}</span>`;
    }
    // slot ISUP fica desligado: jamais escreve texto, apenas mantém o atributo cabeado
    if (isupSlot && !isupSlot.hidden) isupSlot.hidden = true;
  };
  selDom.addEventListener('change', compute);
  selSec.addEventListener('change', compute);
  compute();
}

/* === Bootstrap === */
document.addEventListener('DOMContentLoaded', () => {
  const router = new HashRouter({ pages: PAGES, onChange: renderActivePage });
  initHeader();
  initHeaderAutohide();
  initPageNav(router);
  initQuiz({ namespace: NAMESPACE });
  initInteractive(document);   // hotspots compartilhados (p3 anatomia zonal — ÚNICO hotspot)
  initSteppers(document);      // p5 fluxo dx · p14 eixo HHG + card-veredito
  initDynTables(document);     // p1 achado→decisão · p4 sintoma→mecanismo · p12 risco→conduta · p13 cirúrgica×química
  initCompare(document);       // p6 MS/INCA × SBU/AUA
  initSliderIdade(document);   // p2 idade × prevalência
  initSliderPsa(document);     // p7 PSA com zonas
  initSliderPirads(document);  // p9 PI-RADS 1→5
  initCalcRefino(document);    // p8 refinamento (3 fatores)
  initCalcRisco(document);     // p10 estratificação de risco (E vs OU)
  initCalcGleason(document);   // p11 Gleason (4+3 > 3+4)
  router.init();
});
