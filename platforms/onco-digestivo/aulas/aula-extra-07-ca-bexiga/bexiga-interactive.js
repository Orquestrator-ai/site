/* bexiga-interactive.js — wiring vanilla das interações bespoke da Aula Extra 7 (Câncer de Bexiga).
   Cada SVG tem interação de propósito distinto, conforme o SPEC dos assets (05-svg-A/B/C):
   SVG-1 (P1) hover/click-reveal das barras incidência×prova ·
   SVG-2 (P2) slider contínuo de tempo de contato (mucosa teal→coral) ·
   SVG-3 (P3) hotspot-no-elemento por fator de risco (painel de mecanismo) ·
   SVG-4 (P4) step-through dos 3 epitélios ·
   SVG-5 (P5) scrubber temporal da hematúria (falsa melhora) ·
   SVG-6 (P6) toggle vegetante×CIS + hotspots de sintoma ·
   SVG-7 (P7) fluxograma navegável (nós + ramo de exceções) ·
   SVG-8 (P8 ÂNCORA) step-through Ta→T4 com gatilho no divisor T2 ·
   SVG-9 (P9) classificador de risco NMI (toggles → conduta) ·
   SVG-10 (P10) toggle sexo + hotspot por estrutura + seletor de derivação ·
   SVG-11 (P11) grafo de 3 nós (HPB/bexiga/rim) ·
   SVG-12 (P12) quiz-âncora do divisor T2 (seleção → feedback por distractor).
   MC-1..MC-7 são 2ª peças estáticas (realce por CSS :hover/:focus, sem JS aqui).
   Tudo por click + teclado (Enter/Space/setas) + touch (pointer), respeita prefers-reduced-motion
   (via @media no CSS) e é IDEMPOTENTE (guarda dataset.bound / dataset.act / dataset.focusBound).
   INIT ÚNICA: este arquivo é a fonte única de initAll (IIFE auto-init no fim).
   ZERO hex: nenhuma cor literal — só var(--token) via setAttribute. */

(function () {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const isKey = (e) => e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar';

  /* Helper: torna um elemento acionável por click + teclado (idempotente). */
  function activable(el, handler) {
    if (!el || el.dataset.act === '1') return;
    el.dataset.act = '1';
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
    el.addEventListener('click', handler);
    el.addEventListener('keydown', (e) => { if (isKey(e)) { e.preventDefault(); handler(e); } });
  }

  /* Helper: anuncia texto numa região aria-live anexa ao stage (cria se faltar). */
  function liveRegionFor(svg) {
    const fig = svg.closest('.figure-svg') || svg.parentElement;
    if (!fig) return null;
    let live = fig.querySelector('.bx-live');
    if (!live) {
      live = document.createElement('p');
      live.className = 'bx-live';
      live.setAttribute('aria-live', 'polite');
      live.setAttribute('role', 'status');
      fig.appendChild(live);
    }
    return live;
  }

  /* ============ SVG-1 (P1) — barras incidência × prova (hover/click-reveal) ============
     Cada .il-bar revela o seu .il-tip (opacity). Incidência já nasce revelada (fallback). */
  function initSvg1(root) {
    const svg = $('.il-svg1', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    const live = liveRegionFor(svg);
    const bars = $$('.il-bar', svg);
    const tipOf = (bar) => $(`.il-tip[data-tip="${bar.dataset.bar}"]`, svg);
    const setOpen = (bar, open) => {
      const tip = tipOf(bar);
      if (tip) tip.setAttribute('opacity', open ? '1' : '0');
      bar.setAttribute('aria-expanded', String(open));
      if (open && live) {
        const t = tip ? tip.textContent.replace(/\s+/g, ' ').trim() : '';
        live.textContent = `${bar.dataset.bar === 'prova' ? 'Peso em prova' : 'Incidência'}: ${t}`;
      }
    };
    bars.forEach((bar) => {
      bar.addEventListener('mouseenter', () => setOpen(bar, true));
      bar.addEventListener('mouseleave', () => {
        if (bar.dataset.bar !== 'incidencia') setOpen(bar, false);
      });
      activable(bar, () => setOpen(bar, bar.getAttribute('aria-expanded') !== 'true'));
      bar.addEventListener('focus', () => setOpen(bar, true));
    });
  }

  /* ============ SVG-2 (P2) — slider de tempo de contato ============
     v (0–100): move o thumb entre x=160..600, preenche a mucosa (dasharray) teal→coral,
     atualiza o readout textual e o estado da mucosa. Default v=8 (segundos / saudável). */
  function initSvg2(root) {
    const svg = $('.il-svg2', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    const thumb = $('#il-svg2-thumb', svg);
    const mucosa = $('#il-svg2-mucosa', svg);
    const track = $('#il-svg2-track', svg);
    const stateT = $('#il-svg2-state', svg);
    const live = liveRegionFor(svg);
    const X0 = 160, X1 = 600;
    const stateFor = (v) => v <= 25 ? 'mucosa saudável'
      : v <= 60 ? 'metaplasia inicial' : 'lesão / risco de neoplasia';
    const apply = (v) => {
      v = Math.max(0, Math.min(100, Math.round(v)));
      if (thumb) {
        thumb.setAttribute('cx', String(X0 + (X1 - X0) * v / 100));
        thumb.setAttribute('aria-valuenow', String(v));
        thumb.setAttribute('aria-valuetext', `${v}% do tempo de contato — ${stateFor(v)}`);
      }
      if (mucosa) mucosa.setAttribute('stroke-dasharray', `${v} 100`);
      if (track) track.setAttribute('stroke-dasharray', `${v} 100`);
      if (stateT) {
        stateT.textContent = stateFor(v);
        stateT.setAttribute('fill', v <= 25 ? 'var(--teal-80)' : v <= 60 ? 'var(--warn-amber)' : 'var(--coral-80)');
      }
      if (live) live.textContent = `Tempo de contato ${v}% — ${stateFor(v)}.`;
    };
    let cur = 8;
    const fromPointer = (clientX) => {
      const r = svg.getBoundingClientRect();
      const px = (clientX - r.left) / r.width * 760; /* viewBox width */
      cur = (px - X0) / (X1 - X0) * 100;
      apply(cur);
    };
    if (thumb) {
      let dragging = false;
      thumb.addEventListener('pointerdown', (e) => { dragging = true; thumb.setPointerCapture(e.pointerId); });
      thumb.addEventListener('pointermove', (e) => { if (dragging) fromPointer(e.clientX); });
      thumb.addEventListener('pointerup', () => { dragging = false; });
      thumb.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); cur = Math.min(100, cur + 5); apply(cur); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); cur = Math.max(0, cur - 5); apply(cur); }
        if (e.key === 'Home') { e.preventDefault(); cur = 0; apply(cur); }
        if (e.key === 'End') { e.preventDefault(); cur = 100; apply(cur); }
      });
    }
    svg.addEventListener('click', (e) => { if (e.target !== thumb) fromPointer(e.clientX); });
    apply(cur);
  }

  /* ============ SVG-3 (P3) — fatores de risco (hotspot-no-elemento) ============
     Cada .il-factor é o alvo; abre o mecanismo no painel. "aminas" pré-selecionado. */
  function initSvg3(root) {
    const svg = $('.il-svg3', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    const titleEl = $('#il-svg3-title', svg);
    const bodyEl = $('#il-svg3-body', svg);
    const live = liveRegionFor(svg);
    const MECH = {
      aminas: ['Aminas aromáticas', 'Carcinógeno ocupacional clássico, eliminado pela urina e concentrado na bexiga. Ofícios: tinta, couro, borracha, corante e têxtil. Quando o enunciado descreve a profissão, está entregando o diagnóstico.'],
      idade: ['Idade e sexo', 'Acima de 60 anos o risco sobe; sexo masculino pesa 4 para 1. Homem, idoso, fumante é o retrato padrão da banca.'],
      cistite: ['Cistite crônica / ITU', 'Irritação crônica da mucosa por inflamação/infecção repetida — mesma lógica do tempo de contato.'],
      calculo: ['Cálculo vesical', 'Anda junto da hiperplasia prostática; o cálculo fica muito tempo batendo na mucosa, agressão mecânica repetida.'],
      radio: ['Radioterapia pélvica', 'Radioterapia prévia, sobretudo de tumores ginecológicos, irradia a pelve e eleva o risco.'],
      dieta: ['Dieta', 'Dieta rica em carnes e gorduras, fator bem documentado.'],
      fenacetina: ['Fenacetina', 'Analgésicos derivados da fenacetina (paracetamol entre eles) em altas doses.'],
      raca: ['Raça branca', 'Raça branca como fator de maior chance — termo pouco usado na clínica, mas que ainda aparece em prova.'],
    };
    const factors = $$('.il-factor', svg);
    const select = (f) => {
      const key = f.dataset.factor;
      factors.forEach((x) => {
        const on = x === f;
        x.setAttribute('aria-pressed', String(on));
        const r = x.querySelector('rect');
        if (r) {
          if (on) { r.setAttribute('stroke', 'var(--warn-amber)'); r.setAttribute('stroke-width', '2.4'); }
          else if (key === 'aminas' && x.dataset.factor === 'aminas') { /* noop */ }
          else { r.setAttribute('stroke', x.dataset.factor === 'aminas' ? 'var(--warn-amber)' : 'var(--teal-30)'); r.setAttribute('stroke-width', x.dataset.factor === 'aminas' ? '2' : '1.5'); }
        }
      });
      const m = MECH[key] || ['', ''];
      if (titleEl) titleEl.textContent = m[0];
      if (bodyEl) bodyEl.textContent = m[1];
      if (live) live.textContent = `${m[0]}: ${m[1]}`;
    };
    factors.forEach((f, i) => {
      activable(f, () => select(f));
      f.addEventListener('focus', () => select(f));
      f.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); const n = factors[(i + 1) % factors.length]; n.focus(); }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); const n = factors[(i - 1 + factors.length) % factors.length]; n.focus(); }
      });
    });
  }

  /* ============ SVG-4 (P4) — epitélio em transição (step-through 1→2→3) ============
     Realça [data-step] ativo; atenua os demais. Default = passo 2 (urotélio). */
  function initSvg4(root) {
    const svg = $('.il-svg4', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    const steps = $$('.il-step', svg);
    const live = liveRegionFor(svg);
    const NAME = { 1: 'Epitélio cilíndrico simples — sistema tubular renal (acima).', 2: 'Urotélio transicional — bexiga, no meio do caminho entre os dois.', 3: 'Epitélio estratificado — uretra distal (abaixo).' };
    const select = (s) => {
      steps.forEach((x) => {
        const on = x === s;
        x.classList.toggle('il-step--active', on);
        x.style.opacity = on ? '1' : '0.45';
        x.setAttribute('aria-pressed', String(on));
      });
      const n = s.dataset.step;
      if (live) live.textContent = NAME[n] || '';
    };
    steps.forEach((s, i) => {
      activable(s, () => select(s));
      s.addEventListener('focus', () => select(s));
      s.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); const n = steps[(i + 1) % steps.length]; n.focus(); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); const n = steps[(i - 1 + steps.length) % steps.length]; n.focus(); }
      });
    });
    /* fallback: deixa os 3 visíveis (não atenua) até a 1ª interação */
  }

  /* ============ SVG-5 (P5) — timeline da hematúria (scrubber) ============
     Mover/clicar nó move o cursor e atualiza a legenda. Default nó 0. */
  function initSvg5(root) {
    const svg = $('.il-svg5', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    const cursor = $('#il-svg5-cursor', svg);
    const capT = $('#il-svg5-cap-title', svg);
    const capB = $('#il-svg5-cap-body', svg);
    const live = liveRegionFor(svg);
    const nodes = $$('.il-node', svg);
    const CX = [150, 330, 510, 650];
    const CAP = [
      ['Dia 0 — sangue vivo na urina', 'Hematúria macroscópica indolor; achado clássico, 80% a 90% dos casos sintomáticos. Sem dor, o paciente subestima.', 'var(--coral-80)'],
      ['Dia 3-4 — coágulos saem e para', 'Hematúria autolimitada: cessa sozinha. O sangramento parar não significa cura.', 'var(--teal-80)'],
      ['Falsa melhora', 'Começou a beber água e o sangue sumiu — coincidência com a fase de remissão natural, não cura. Aqui mora a armadilha; há quem fique assim 5–6 anos.', 'var(--warn-amber)'],
      ['Semanas depois — volta a sangrar', 'Padrão recorrente. A partir dos 40 anos, hematúria macroscópica obriga a afastar câncer de bexiga.', 'var(--coral-80)'],
    ];
    const select = (idx) => {
      if (cursor) cursor.setAttribute('cx', String(CX[idx]));
      nodes.forEach((n) => n.setAttribute('aria-pressed', String(+n.dataset.node === idx)));
      const c = CAP[idx];
      if (capT) { capT.textContent = c[0]; capT.setAttribute('fill', c[2]); }
      if (capB) capB.textContent = c[1];
      if (live) live.textContent = `${c[0]}. ${c[1]}`;
    };
    nodes.forEach((n, i) => {
      activable(n, () => select(+n.dataset.node));
      n.addEventListener('focus', () => select(+n.dataset.node));
      n.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); const x = nodes[(i + 1) % nodes.length]; x.focus(); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); const x = nodes[(i - 1 + nodes.length) % nodes.length]; x.focus(); }
      });
    });
  }

  /* ============ SVG-6 (P6) — vegetante × CIS (toggle + hotspots) ============
     Toggle externo realça uma lesão; cada .bz6-hotspot abre painel com seu aria-label. */
  function initSvg6(root) {
    const svg = $('.bz-svg6', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    const live = liveRegionFor(svg);
    const ctl = root.querySelector('[data-bz-toggle-ctl="svg6"]');
    const sides = { vegetante: $('.bz6-vegetante', svg), cis: $('.bz6-cis', svg) };
    const setState = (key) => {
      svg.setAttribute('data-bz-state', key);
      Object.entries(sides).forEach(([k, g]) => { if (g) g.style.opacity = (k === key) ? '1' : '0.4'; });
      if (ctl) $$('.bx-seg__btn', ctl).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.key === key)));
      if (live) live.textContent = key === 'vegetante'
        ? 'Lesão vegetante couve-flor: sintomática, irritativa/obstrutiva.'
        : 'Carcinoma in situ plano: silencioso, de pior prognóstico.';
    };
    if (ctl) {
      const btns = $$('.bx-seg__btn', ctl);
      btns.forEach((b, i) => {
        b.addEventListener('click', () => setState(b.dataset.key));
        b.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); const n = btns[(i + 1) % btns.length]; n.focus(); setState(n.dataset.key); }
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); const n = btns[(i - 1 + btns.length) % btns.length]; n.focus(); setState(n.dataset.key); }
        });
      });
    }
    $$('.bz6-hotspot', svg).forEach((h) => activable(h, () => {
      if (live) live.textContent = h.getAttribute('aria-label') || '';
      h.setAttribute('aria-pressed', 'true');
    }));
  }

  /* ============ SVG-7 (P7) — fluxograma navegável (nós + ramo exceções) ============
     Clica nó → painel/aria-live com o papel; ramo exceções alterna .bz7-detail. */
  function initSvg7(root) {
    const svg = $('.bz-svg7', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    const live = liveRegionFor(svg);
    const detail = $('.bz7-detail[data-bz-detail="excecoes"]', svg);
    const nodes = $$('.bz7-node, .bz7-branch', svg);
    nodes.forEach((n) => activable(n, () => {
      nodes.forEach((x) => x.setAttribute('aria-pressed', String(x === n)));
      const isExc = n.classList.contains('bz7-branch');
      if (detail) { detail.setAttribute('aria-hidden', String(!isExc)); detail.classList.toggle('is-on', isExc); }
      if (live) live.textContent = n.getAttribute('aria-label') || '';
    }));
  }

  /* ============ SVG-8 (P8 ÂNCORA) — parede vesical / estágio T (step-through) ============
     Ordem Ta→Tis→T1→T2→T2a→T2b→T3a→T3b→T4. Ao cruzar a muscular (≥T2): mostra invasão,
     flash do divisor (uma vez na transição), sidebar coral "Músculo-invasivo". Antes: teal NMI.
     NUNCA suavizar o alerta no cruzamento. */
  function initSvg8(root) {
    const svg = $('.bz-svg8', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    const live = liveRegionFor(svg);
    const ORDER = ['Ta', 'Tis', 'T1', 'T2', 'T2a', 'T2b', 'T3a', 'T3b', 'T4'];
    const DEPTH = { /* y, h da banda de invasão por estágio */
      Ta: [90, 40], Tis: [90, 40], T1: [134, 56],
      T2: [194, 96], T2a: [194, 48], T2b: [242, 48],
      T3a: [294, 64], T3b: [294, 64], T4: [362, 46],
    };
    const LABEL = {
      Ta: 'Ta · papilar não invasivo', Tis: 'Tis · carcinoma in situ plano', T1: 'T1 · invade a lâmina própria',
      T2: 'T2 · invade o detrusor', T2a: 'T2a · muscular superficial', T2b: 'T2b · muscular profunda',
      T3a: 'T3a · gordura perivesical micro', T3b: 'T3b · gordura perivesical macro', T4: 'T4 · estruturas adjacentes',
    };
    const isMI = (st) => ORDER.indexOf(st) >= ORDER.indexOf('T2');
    const invasion = $('.bz8-invasion', svg);
    const depthRect = $('.bz8-depth', svg);
    const flash = $('.bz8-flash', svg);
    const sideLabel = $('.bz8-sidebar-label', svg);
    const sideStage = $('.bz8-sidebar-stage', svg);
    const steps = $$('.bz8-step', svg);
    let prevMI = true; /* default render = T2 (já MI) */
    const apply = (st, animateFlash) => {
      svg.setAttribute('data-bz-stage', st);
      const mi = isMI(st);
      const d = DEPTH[st];
      if (invasion && d) {
        invasion.setAttribute('aria-hidden', 'false');
        if (depthRect) {
          depthRect.setAttribute('y', String(d[0]));
          depthRect.setAttribute('height', String((d[0] + d[1]) - 90));
        }
      }
      if (flash) {
        const show = mi && animateFlash && !prevMI;
        flash.setAttribute('aria-hidden', String(!mi));
        flash.style.opacity = mi ? '1' : '0';
        if (show) { flash.classList.remove('is-flash'); void flash.offsetWidth; flash.classList.add('is-flash'); }
      }
      if (sideLabel) {
        sideLabel.textContent = mi ? 'Músculo-invasivo' : 'Não-músculo-invasivo';
        sideLabel.setAttribute('fill', mi ? 'var(--coral-100)' : 'var(--teal-80)');
        sideLabel.setAttribute('data-bz-side', mi ? 'MI' : 'NMI');
      }
      if (sideStage) { sideStage.textContent = LABEL[st]; sideStage.setAttribute('data-bz-curr', st); }
      steps.forEach((g) => g.setAttribute('aria-pressed', String(g.dataset.bzStep === st)));
      if (live) live.textContent = `${LABEL[st]}. ${mi ? 'Músculo-invasivo: conduta radical (cistectomia).' : 'Não-músculo-invasivo: conduta conservadora.'}`;
      prevMI = mi;
    };
    steps.forEach((g, i) => {
      activable(g, () => apply(g.dataset.bzStep, true));
      g.addEventListener('focus', () => apply(g.dataset.bzStep, true));
      g.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); const n = steps[(i + 1) % steps.length]; n.focus(); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); const n = steps[(i - 1 + steps.length) % steps.length]; n.focus(); }
      });
    });
    apply('T2', false); /* estado-conceito inicial (divisor já aceso, sem flash forçado) */
  }

  /* ============ SVG-9 (P9) — classificador de risco NMI (toggles → conduta) ============
     alto = (grau=='alto grau') || (estagio=='T1') || (cis=='presente'). */
  function initSvg9(root) {
    const svg = $('.bz-svg9', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    const live = liveRegionFor(svg);
    const toggles = $$('.bz9-toggle', svg);
    const result = $('.bz9-result', svg);
    const box = result ? result.querySelector('rect') : null;
    const cls = $('.bz9-class', svg);
    const sub = $('.bz9-sub', svg);
    const cond = $('.bz9-conduta', svg);
    const condD = $('.bz9-conduta-detail', svg);
    const LOWVAL = { grau: 'baixo grau', estagio: 'Ta', cis: 'ausente', recorrencia: 'primeira aparição', tamanho: 'pequeno', foco: 'único' };
    const state = {};
    const recompute = () => {
      const alto = state.grau === 'alto grau' || state.estagio === 'T1' || state.cis === 'presente';
      svg.setAttribute('data-bz-risco', alto ? 'alto' : 'baixo');
      if (result) result.setAttribute('data-bz-result', alto ? 'alto' : 'baixo');
      if (box) { box.setAttribute('fill', alto ? 'url(#bz9-high)' : 'url(#bz9-low)'); box.setAttribute('stroke', alto ? 'var(--coral-50)' : 'var(--teal-60)'); }
      if (cls) cls.textContent = alto ? 'Alto risco' : 'Baixo risco';
      if (sub) sub.textContent = alto ? 'alto grau OU T1 OU carcinoma in situ' : 'baixo grau · Ta · não-CIS · não-recorrente · pequeno · único';
      if (cond) cond.textContent = alto ? 'RTU → re-RTU 4-6 sem → BCG intravesical' : 'RTU de bexiga + QT intravesical';
      if (condD) condD.textContent = alto ? 're-RTU confirma que nada músculo-invasivo passou; BCG é exclusiva do alto risco' : 'feito assim, dificilmente recorre';
      if (live) live.textContent = `${alto ? 'Alto risco' : 'Baixo risco'}: ${alto ? 'RTU, re-RTU em 4 a 6 semanas e BCG intravesical.' : 'RTU mais quimioterapia intravesical.'}`;
    };
    toggles.forEach((t) => {
      const crit = t.dataset.bzCrit;
      const high = t.dataset.bzHigh; /* valor "alto" quando definido */
      const valEl = t.querySelector('.bz9-val');
      const ALT = {
        grau: ['baixo grau', 'alto grau'], estagio: ['Ta', 'T1'], cis: ['ausente', 'presente'],
        recorrencia: ['primeira aparição', 'recorrente'], tamanho: ['pequeno', 'grande'], foco: ['único', 'múltiplo'],
      };
      state[crit] = LOWVAL[crit];
      activable(t, () => {
        const opts = ALT[crit] || [LOWVAL[crit], LOWVAL[crit]];
        const next = state[crit] === opts[0] ? opts[1] : opts[0];
        state[crit] = next;
        if (valEl) {
          valEl.textContent = next;
          const isHigh = high && next === high;
          valEl.setAttribute('fill', isHigh ? 'var(--coral-80)' : (next === opts[1] ? 'var(--warn-amber)' : 'var(--teal-80)'));
        }
        t.setAttribute('aria-checked', String(state[crit] === (ALT[crit] ? ALT[crit][1] : LOWVAL[crit])));
        recompute();
      });
    });
    recompute();
  }

  /* ============ SVG-10 (P10) — cistectomia: toggle sexo + hotspot + derivação ============ */
  function initSvg10(root) {
    const svg = $('.bz-svg10', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    const live = liveRegionFor(svg);
    const scenes = { homem: $('.bz10-homem', svg), mulher: $('.bz10-mulher', svg) };
    const toggle = $('.bz10-toggle', svg);
    const knob = $('.bz10-knob', svg);
    const setSexo = (key) => {
      svg.setAttribute('data-bz-sexo', key);
      Object.entries(scenes).forEach(([k, g]) => {
        if (!g) return;
        const on = k === key;
        g.setAttribute('aria-hidden', String(!on));
        g.style.display = on ? '' : 'none';
      });
      if (knob) knob.setAttribute('x', key === 'homem' ? '564' : '670');
      if (toggle) toggle.setAttribute('aria-pressed', String(key === 'mulher'));
      if (live) live.textContent = key === 'homem'
        ? 'Homem: retira bexiga, próstata, vesículas seminais, ductos deferentes e uretra proximal.'
        : 'Mulher: retira bexiga, uretra, útero, trompas, ovários e parede vaginal anterior.';
    };
    if (toggle) activable(toggle, () => setSexo(svg.getAttribute('data-bz-sexo') === 'homem' ? 'mulher' : 'homem'));
    $$('.bz10-organ', svg).forEach((o) => activable(o, () => {
      if (live) live.textContent = o.getAttribute('aria-label') || '';
      o.setAttribute('aria-pressed', 'true');
    }));
    const derivOpts = $$('.bz10-deriv-opt', svg);
    derivOpts.forEach((d) => activable(d, () => {
      svg.setAttribute('data-bz-deriv', d.dataset.bzDerivOpt);
      derivOpts.forEach((x) => {
        const on = x === d;
        x.setAttribute('aria-checked', String(on));
        const r = x.querySelector('rect');
        if (r) { r.setAttribute('stroke', on ? 'var(--warn-amber)' : 'var(--border-mid)'); r.setAttribute('stroke-width', on ? '2' : '1.5'); r.setAttribute('fill', on ? 'var(--teal-10)' : 'var(--bg-elevated)'); }
      });
      if (live) live.textContent = d.getAttribute('aria-label') || '';
    }));
    setSexo('homem');
  }

  /* ============ SVG-11 (P11) — grafo de 3 nós (bexiga/HPB/rim) ============ */
  function initSvg11(root) {
    const svg = $('.bx-svg11', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    const live = liveRegionFor(svg);
    const nodes = $$('.bx-node', svg);
    const panels = { hpb: $('.bx-panel--hpb', svg), rim: $('.bx-panel--rim', svg) };
    const edges = { hpb: $('[data-edge="hpb"]', svg), rim: $('[data-edge="rim"]', svg) };
    const show = (key) => {
      /* nó bexiga (central) abre o painel HPB por default; alterna não aplicável p/ ele */
      const panelKey = key === 'bexiga' ? 'hpb' : key;
      nodes.forEach((n) => {
        const on = n.dataset.node === key;
        n.setAttribute('aria-pressed', String(on));
        n.classList.toggle('bx-node--active', on);
      });
      Object.entries(panels).forEach(([k, p]) => { if (p) { p.hidden = (k !== panelKey); } });
      Object.entries(edges).forEach(([k, e]) => { if (e) e.classList.toggle('is-on', k === panelKey); });
      if (live) live.textContent = panelKey === 'hpb'
        ? 'Paralelo de mecanismo com a HPB: obstrução, estase, irritação crônica, risco de tumor.'
        : 'Contraste de conduta com o câncer de rim: a bexiga biopsia por cistoscopia; a lesão sólida renal não se biopsia.';
    };
    nodes.forEach((n) => activable(n, () => show(n.dataset.node)));
  }

  /* ============ SVG-12 (P12) — quiz-âncora do divisor T2 (seleção → feedback) ============ */
  function initSvg12(root) {
    const svg = $('.bx-svg12', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    const live = liveRegionFor(svg);
    const opts = $$('.bx-opt', svg);
    const feedbacks = $$('.bx-feedback', svg);
    let answered = false;
    const reveal = (opt) => {
      if (answered) return; answered = true;
      const chosen = opt.dataset.opt;
      opts.forEach((o) => {
        const correct = o.dataset.correct === 'true';
        o.setAttribute('aria-checked', String(o === opt));
        const r = o.querySelector('rect');
        const dot = o.querySelector('circle');
        if (correct) {
          if (r) { r.setAttribute('fill', 'url(#g12-correct)'); r.setAttribute('stroke', 'var(--warn-amber)'); r.setAttribute('stroke-width', '2.4'); }
          if (dot) { dot.setAttribute('fill', 'var(--teal-60)'); dot.setAttribute('stroke', 'var(--teal-60)'); }
        } else if (o === opt) {
          if (r) { r.setAttribute('fill', 'var(--coral-dim)'); r.setAttribute('stroke', 'var(--coral-50)'); r.setAttribute('stroke-width', '2'); }
          if (dot) { dot.setAttribute('fill', 'var(--coral-50)'); dot.setAttribute('stroke', 'var(--coral-50)'); }
        }
      });
      feedbacks.forEach((f) => { f.hidden = (f.dataset.feedback !== chosen); });
      const fb = svg.querySelector(`.bx-feedback[data-feedback="${chosen}"]`);
      if (live && fb) live.textContent = fb.textContent.replace(/\s+/g, ' ').trim();
    };
    opts.forEach((o, i) => {
      activable(o, () => reveal(o));
      o.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); opts[(i + 1) % opts.length].focus(); }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); opts[(i - 1 + opts.length) % opts.length].focus(); }
      });
    });
  }

  function initAll(root) {
    root = root || document;
    initSvg1(root); initSvg2(root); initSvg3(root); initSvg4(root);
    initSvg5(root); initSvg6(root); initSvg7(root); initSvg8(root);
    initSvg9(root); initSvg10(root); initSvg11(root); initSvg12(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll(document));
  } else { initAll(document); }

  window.BexigaInteractive = { initAll };
})();
