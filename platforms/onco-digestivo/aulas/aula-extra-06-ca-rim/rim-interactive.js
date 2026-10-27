/* rim-interactive.js — wiring vanilla das interações bespoke da Aula Extra 6 (Câncer de Rim).
   Cada SVG tem interação de propósito distinto, conforme o SPEC dos assets:
   SVG-1 (P2) tabela genética clicável por linha · SVG-2 (P4) card-âncora revela "até 10%" ·
   SVG-3 (P5) hotspot na VEIA desenhada (trajeto E/D mutuamente exclusivos) ·
   SVG-4 (P6) step-through causal Stauffer · SVG-5 (P8) toggle sólido×cístico ·
   SVG-6 (P9) escada Bozniak step/slider · SVG-7 (P10) fluxograma decisão clicável ·
   SVG-8 (P1) painel pesa-risco toggle-acúmulo · SVG-9 (P3) Venn da tríade reveal+convergência ·
   SVG-10 (P7) trilha diagnóstica com bifurcação · MC-2 (P5) venografia step T3a→T3b→T4 ·
   SVG-11 (P11) quiz-caso decision-reveal por cartão. (MC-1, P11, é mapa estático sem JS.)
   Tudo por click + teclado (Enter/Space) + touch (pointer), respeita prefers-reduced-motion
   (via @media no CSS) e é IDEMPOTENTE (guarda dataset.bound / dataset.act / dataset.focusBound).
   INIT ÚNICA: este arquivo é a fonte única de initAll (IIFE auto-init no fim). */

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

  /* ============ SVG-1 (P2) — tabela genética VHL × esclerose tuberosa ============
     Cada linha de achado (.vhl-row) toggla um realce (.row-bg opacity). A linha-chave
     (tumor renal típico, coral) já nasce destacada permanentemente. Fallback: tabela
     100% legível sem JS — o realce é só reforço. */
  function initSvg1(root) {
    const svg = $('svg[data-svg="svg1"]', root) || (root.querySelector('.vhl-row') && root.querySelector('.vhl-row').ownerSVGElement);
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const rows = $$('.vhl-row', svg);
    rows.forEach((r) => {
      activable(r, () => {
        const on = r.classList.contains('is-active');
        rows.forEach((x) => { x.classList.remove('is-active'); x.setAttribute('aria-pressed', 'false'); });
        if (!on) { r.classList.add('is-active'); r.setAttribute('aria-pressed', 'true'); }
      });
    });
  }

  /* ============ SVG-2 (P4) — card-âncora varicocele → rim ============
     Clique no card revela o selo "até 10%" (oculto por padrão) e esconde o hint.
     O texto da página já traz "até 10%", então a revelação é reforço mnemônico. */
  function initSvg2(root) {
    const card = $('#svg2-card', root);
    if (!card || card.dataset.bound) return; card.dataset.bound = '1';
    activable(card, () => {
      const on = card.classList.toggle('is-revealed');
      card.setAttribute('aria-pressed', String(on));
    });
  }

  /* ============ SVG-3 (P5) — anatomia venosa gonadal/renal/cava (HOTSPOT na VEIA) ============
     Clica a gonadal E → acende todo [data-path="left"] + [data-thrombus="left"] em coral e
     mostra #svg3-tip-left. Clica a gonadal D → acende [data-path="right"] em teal e mostra
     #svg3-tip-right. Mutuamente exclusivos. O alvo de clique é a área transparente sobre a
     veia desenhada (stroke largo transparente), não um número sobreposto. */
  function initSvg3(root) {
    const svg = $('svg[data-svg="svg3"]', root) || (root.querySelector('[data-vein$="-gonadal"]') && root.querySelector('[data-vein$="-gonadal"]').ownerSVGElement);
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const tipL = $('#svg3-tip-left', svg), tipR = $('#svg3-tip-right', svg);
    const setSide = (side) => {
      const other = side === 'left' ? 'right' : 'left';
      $$(`[data-path="${side}"], [data-thrombus="${side}"]`, svg).forEach((el) => el.classList.add('is-on'));
      $$(`[data-path="${other}"], [data-thrombus="${other}"]`, svg).forEach((el) => el.classList.remove('is-on'));
      if (tipL) tipL.classList.toggle('is-on', side === 'left');
      if (tipR) tipR.classList.toggle('is-on', side === 'right');
      $$('[data-vein="left-gonadal"], [data-vein="right-gonadal"]', svg).forEach((v) => {
        v.setAttribute('aria-pressed', String(v.dataset.vein === `${side}-gonadal`));
      });
    };
    const left = $('[data-vein="left-gonadal"]', svg);
    const right = $('[data-vein="right-gonadal"]', svg);
    if (left) activable(left, () => setSide('left'));
    if (right) activable(right, () => setSide('right'));
    [left, right].forEach((v) => {
      if (v && !v.dataset.focusBound) {
        v.dataset.focusBound = '1';
        v.addEventListener('focus', () => setSide(v.dataset.vein === 'left-gonadal' ? 'left' : 'right'));
      }
    });
  }

  /* ============ SVG-4 (P6) — diagrama causal Stauffer (step-through 1→6) ============
     Botões prev/next (criados no HTML, fora do SVG) avançam `cur`. Nós com data-step<=cur
     ficam is-on; a aresta que LEVA ao nó N tem data-step="N". aria-live anuncia o passo.
     "TTPa" preservado no SVG (fidelidade-professor). */
  function initSvg4(root) {
    const svg = $('svg[data-svg="svg4"]', root);
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const ctl = root.querySelector('[data-step-ctl="svg4"]');
    if (!ctl) return;
    const nodes = $$('.stf-node', svg), edges = $$('.stf-edge', svg);
    const out = ctl.querySelector('[data-step-count]');
    const micro = [
      '1 · Carcinoma de células renais — o tumor primário.',
      '2 · Por mecanismo desconhecido (o "?"), o tumor age à distância.',
      '3 · Colestase intra-hepática — sem implante, sem obstrução.',
      '4 · Laboratório: fosfatase alcalina ▲, alfa-2-globulina ▲, albumina ▼, TTPa ▲.',
      '5 · Nefrectomia remove o tumor primário.',
      '6 · O quadro regride e o laboratório normaliza — paraneoplásica confirmada.',
    ];
    let cur = 1; const MAX = 6;
    const apply = () => {
      nodes.forEach((n) => n.classList.toggle('is-on', +n.dataset.step <= cur));
      edges.forEach((e) => e.classList.toggle('is-on', +e.dataset.step <= cur));
      if (out) out.textContent = `passo ${cur} de ${MAX} — ${micro[cur - 1]}`;
    };
    activable(ctl.querySelector('[data-step-prev]'), () => { cur = Math.max(1, cur - 1); apply(); });
    activable(ctl.querySelector('[data-step-next]'), () => { cur = Math.min(MAX, cur + 1); apply(); });
    apply();
  }

  /* ============ SVG-5 (P8) — toggle lesão sólida × cística ============
     Segmented control "Sólida | Cística" (HTML, fora do SVG) foca um lado por vez:
     atenua (.is-dim) o grupo [data-state] não-selecionado. Default = ambos visíveis. */
  function initSvg5(root) {
    const svg = $('svg[data-svg="svg5"]', root);
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const ctl = root.querySelector('[data-toggle-ctl="svg5"]');
    if (!ctl) return;
    const btns = $$('.rim-toggle__btn', ctl);
    const groups = { solido: $('[data-state="solido"]', svg), cistico: $('[data-state="cistico"]', svg) };
    const select = (key) => {
      btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.key === key)));
      Object.entries(groups).forEach(([k, g]) => { if (g) g.classList.toggle('is-dim', k !== key); });
    };
    btns.forEach((b, i) => {
      b.addEventListener('click', () => select(b.dataset.key));
      b.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); const n = btns[(i + 1) % btns.length]; n.focus(); select(n.dataset.key); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); const n = btns[(i - 1 + btns.length) % btns.length]; n.focus(); select(n.dataset.key); }
      });
    });
    // default: ambos visíveis (fallback estático)
  }

  /* ============ SVG-6 (P9) — escada de Bozniak (step/slider) ============
     Slider 1..5 → 1/2/2F/3/4. O degrau ativo recebe .is-on (glow por tom) e os demais
     reduzem opacidade. aria-live + painel textual espelham estrato/%/conduta. Fallback:
     escada completa legível sem JS. Percentuais clássicos do professor (NÃO alterar). */
  function initSvg6(root) {
    const svg = $('svg[data-svg="svg6"]', root);
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const slider = root.querySelector('[data-slider="svg6"]');
    const readout = root.querySelector('[data-boz-readout]');
    const steps = $$('[data-step]', svg);
    const ORDER = ['1', '2', '2F', '3', '4'];
    const INFO = {
      '1':  { tone: 'teal',  txt: '<strong>Bozniak 1</strong> · cisto simples, homogêneo, sem separação · malignidade ~0% · conduta: alta, sem seguimento ("tchau e bênção").' },
      '2':  { tone: 'teal',  txt: '<strong>Bozniak 2</strong> · levemente complexo · malignidade <5% · conduta: alta, sem seguimento.' },
      '2F': { tone: 'amber', txt: '<strong>Bozniak 2F</strong> · indeterminado (criado pela dúvida 2↔3) · malignidade até 25% · conduta: seguimento por imagem 6/6 meses (ideal TC).' },
      '3':  { tone: 'coral', txt: '<strong>Bozniak 3</strong> · cisto complexo · malignidade 45–60% · conduta: cirurgia (nefrectomia).' },
      '4':  { tone: 'coral', txt: '<strong>Bozniak 4</strong> · cisto complexo · malignidade até 95% · conduta: cirurgia (nefrectomia).' },
    };
    const apply = (key) => {
      svg.classList.add('has-active');
      steps.forEach((s) => {
        const on = s.dataset.step === key;
        s.classList.toggle('is-on', on);
        if (on) s.setAttribute('data-tone', INFO[key].tone);
      });
      if (readout) readout.innerHTML = INFO[key].txt;
      if (slider) slider.setAttribute('aria-valuetext', INFO[key].txt.replace(/<[^>]+>/g, ''));
    };
    if (slider) {
      slider.addEventListener('input', () => apply(ORDER[Math.max(0, Math.min(4, (+slider.value || 1) - 1))]));
    }
    // degraus também são clicáveis diretamente
    steps.forEach((s) => activable(s, () => {
      apply(s.dataset.step);
      if (slider) slider.value = String(ORDER.indexOf(s.dataset.step) + 1);
    }));
    apply('1');
  }

  /* ============ SVG-7 (P10) — fluxograma decisão parcial × radical ============
     Cada losango [data-decision] é clicável: "sim" num critério realça o ramo coral até
     RADICAL; acumular "não" em todos acende o caminho teal até PARCIAL + nó âmbar do clamp.
     Aqui: clicar um losango = critério positivo (→ realça RADICAL); botão "todos não" =
     caminho PARCIAL. Fallback: árvore inteira legível sem JS. "~30 min" preservado. */
  function initSvg7(root) {
    const svg = $('svg[data-svg="svg7"]', root);
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const decisions = $$('[data-decision]', svg);
    const readout = root.querySelector('[data-flx-readout]');
    const CRIT = {
      tamanho:  'Tumor gigante (15–20 cm) → pró-RADICAL. A massa não comporta poupar parênquima.',
      posicao:  'Central ou >50% endofítico → pró-RADICAL. A lesão iatrogênica para chegar até ele supera tirar o rim.',
      linfonodo:'Linfonodo positivo → pró-RADICAL.',
      trombo:   'Trombo em veia → pró-RADICAL.',
    };
    const setRadical = (key) => {
      svg.classList.remove('path-parcial'); svg.classList.add('path-radical');
      decisions.forEach((d) => { d.classList.toggle('is-on', d.dataset.decision === key); d.setAttribute('aria-pressed', String(d.dataset.decision === key)); });
      if (readout) readout.innerHTML = `<strong>NEFRECTOMIA RADICAL.</strong> ${CRIT[key]}`;
    };
    const setParcial = () => {
      svg.classList.remove('path-radical'); svg.classList.add('path-parcial');
      decisions.forEach((d) => { d.classList.remove('is-on'); d.setAttribute('aria-pressed', 'false'); });
      if (readout) readout.innerHTML = '<strong>NEFRECTOMIA PARCIAL</strong> (poupadora de néfrons). Periférico · exofítico · pequeno (<7 cm) · linfonodos negativos · rim único / doença bilateral / renal crônico. Clamp da artéria renal: isquemia quente, no máximo ~30 min.';
    };
    decisions.forEach((d) => activable(d, () => setRadical(d.dataset.decision)));
    const parcialBtn = root.querySelector('[data-flx-parcial]');
    if (parcialBtn) activable(parcialBtn, setParcial);
  }

  /* ============ SVG-8 (P1) — painel pesa-risco (toggle-acúmulo) ============
     5 chips-fator (.bz-chip) com data-weight; alternar acumula carga. O rim central
     escala a cor por classe .risk-lvl-N (0..6) conforme a soma dos pesos ativos; barra
     e textos espelham. Tabagismo (data-weight 3) já nasce aceso (fallback estático ensina
     "o que mais pesa" sem JS). aria-live no stage anuncia a carga e o último fator. */
  function initSvg8(root) {
    const svg = $('svg[data-svg="svg8"]', root);
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const chips = $$('.bz-chip', svg);
    const kidney = $('.bz-kidney-body', svg);
    const core = $('.bz-kidney-core', svg);
    const loadTxt = $('.bz-kidney-load', svg);
    const bar = $('.bz-load-bar', svg);
    const status = $('.bz-load-text', svg);
    const TOTAL = chips.reduce((s, c) => s + (+c.dataset.weight || 0), 0);
    const CORE_OP = [0, 0.18, 0.32, 0.46, 0.62, 0.8, 1];
    const apply = () => {
      const active = chips.filter((c) => c.getAttribute('aria-pressed') === 'true');
      const load = active.reduce((s, c) => s + (+c.dataset.weight || 0), 0);
      const count = active.length;
      const lvl = Math.max(0, Math.min(6, Math.round((load / Math.max(1, TOTAL)) * 6)));
      if (core) core.setAttribute('opacity', String(CORE_OP[lvl]));
      if (kidney) kidney.setAttribute('fill', lvl === 0 ? 'var(--teal-10)' : lvl <= 2 ? 'var(--coral-dim)' : lvl <= 4 ? 'var(--coral-50)' : 'var(--coral-60)');
      if (loadTxt) loadTxt.textContent = `carga ${count}/5`;
      if (bar) bar.setAttribute('width', String(Math.round((load / Math.max(1, TOTAL)) * 632)));
      if (status) {
        if (count === 0) status.textContent = 'Nenhum fator ativo — ligue o tabagismo, que é o que mais pesa.';
        else {
          const last = active[active.length - 1];
          const lbl = last.dataset.factor === 'tabagismo' ? 'tabagismo (o que mais pesa)' : last.dataset.factor === 'ocupacional' ? 'exposição ocupacional (a pegadinha de SP)' : last.dataset.factor;
          status.textContent = `${count} fator(es) ativo(s) · último: ${lbl}. A carga renal acumula.`;
        }
      }
    };
    chips.forEach((c) => activable(c, () => {
      const on = c.getAttribute('aria-pressed') === 'true';
      c.setAttribute('aria-pressed', String(!on));
      const r = c.querySelector('rect');
      if (r) {
        if (!on) { r.setAttribute('fill', 'var(--coral-dim)'); r.setAttribute('stroke', 'var(--coral-50)'); }
        else if (c.dataset.amber === '1') { r.setAttribute('fill', 'var(--warn-amber-dim)'); r.setAttribute('stroke', 'var(--warn-amber)'); }
        else if (c.dataset.lead === '1') { r.setAttribute('fill', 'var(--coral-dim)'); r.setAttribute('stroke', 'var(--coral-50)'); }
        else { r.setAttribute('fill', 'var(--bg-elevated-2)'); r.setAttribute('stroke', 'var(--border-mid)'); }
      }
      apply();
    }));
    apply();
  }

  /* ============ SVG-9 (P3) — tríade clássica (Venn reveal + convergência) ============
     3 anéis (.bz-ring) reveláveis; quando os 3 ficam aria-pressed=true, o SVG ganha
     .all-on → o núcleo (.bz-core-glow) acende (interseção <5–10%) e o status muda.
     Clicar o núcleo antes dos três explica que precisa dos três. Fallback: %s legíveis. */
  function initSvg9(root) {
    const svg = $('svg[data-svg="svg9"]', root);
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const rings = $$('.bz-ring', svg);
    const coreG = $('.bz-core', svg);
    const status = $('.bz-venn-status', svg);
    const refresh = () => {
      const all = rings.every((r) => r.getAttribute('aria-pressed') === 'true');
      svg.classList.toggle('all-on', all);
      if (status) status.textContent = all
        ? 'Tríade completa — praticamente patognomônica, mas <5–10% dos casos: doença avançada.'
        : 'A sobreposição dos três é mínima — quando aparece, sinaliza doença avançada.';
    };
    rings.forEach((r) => activable(r, () => {
      const on = r.getAttribute('aria-pressed') === 'true';
      r.setAttribute('aria-pressed', String(!on));
      r.classList.toggle('is-on', !on);
      refresh();
    }));
    if (coreG) activable(coreG, () => {
      const all = rings.every((r) => r.getAttribute('aria-pressed') === 'true');
      if (!all && status) status.textContent = 'Ative os três anéis para a interseção acender — é a tríade completa.';
    });
    refresh();
  }

  /* ============ SVG-10 (P7) — trilha diagnóstica (percurso + bifurcação) ============
     3 nós (.bz-node) navegáveis; ativar a etapa 3 (.bz-fork) abre a bifurcação
     (.fork-open) → os dois destinos (.bz-dest) acendem (aria-hidden=false) e o status
     muda. Fallback: trilha e setas legíveis, destinos em opacity base. */
  function initSvg10(root) {
    const svg = $('svg[data-svg="svg10"]', root);
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const nodes = $$('.bz-node', svg);
    const dests = $$('.bz-dest', svg);
    const status = $('.bz-trail-status', svg);
    const MSG = {
      1: 'Etapa 1 — achado acidental no ultrassom de rotina. Siga para a caracterização.',
      2: 'Etapa 2 — caracterização pelo padrão-ouro (uro-TC, TC com contraste ou uro-RM).',
      3: 'Bifurcação: sólido → cirurgia direta · cístico → classificar por Bozniak.',
    };
    nodes.forEach((n) => activable(n, () => {
      nodes.forEach((x) => { x.classList.remove('is-on'); x.setAttribute('aria-pressed', 'false'); });
      n.classList.add('is-on'); n.setAttribute('aria-pressed', 'true');
      const step = +n.dataset.step;
      const fork = n.classList.contains('bz-fork');
      svg.classList.toggle('fork-open', fork);
      dests.forEach((d) => d.setAttribute('aria-hidden', String(!fork)));
      if (status) status.textContent = MSG[step] || MSG[1];
    }));
  }

  /* ============ MC-2 (P5) — venografia: step de extensão T3a→T3b→T4 ============
     Marcadores de nível (rect[data-step]) são o alvo (o marcador É o alvo, não número solto).
     Ativar um nível acende esse trecho de trombo (.thr[data-ext]) e todos abaixo + o tooltip
     correspondente (.thr-tip), mutuamente exclusivos. ORDER define a hierarquia caudal→cranial.
     Fallback: trombo em opacity base do rim ao átrio + rótulos T3a/T3b/T4 legíveis. */
  function initMc2(root) {
    const svg = $('svg[data-svg="mc2"]', root);
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const ORDER = ['t3a', 't3b', 't4'];
    const steps = $$('rect[data-step]', svg);
    const segs = $$('.thr', svg);
    const tips = { t3a: $('#mc2-tip-t3a', svg), t3b: $('#mc2-tip-t3b', svg), t4: $('#mc2-tip-t4', svg) };
    const apply = (cur) => {
      const idx = ORDER.indexOf(cur);
      segs.forEach((s) => s.classList.toggle('is-on', ORDER.indexOf(s.dataset.ext) <= idx));
      Object.entries(tips).forEach(([k, t]) => { if (t) t.classList.toggle('is-on', k === cur); });
      steps.forEach((r) => {
        const on = r.dataset.step === cur;
        r.setAttribute('aria-pressed', String(on));
        if (on) r.setAttribute('aria-current', 'true'); else r.removeAttribute('aria-current');
      });
    };
    steps.forEach((r) => activable(r, () => apply(r.dataset.step)));
  }

  /* ============ SVG-11 (P11) — quiz-caso (decision-reveal por cartão) ============
     Cada cartão (.bz-case) tem data-correct; clicar uma opção (.bz-opt) compara data-opt.
     Acerto → verde (--ok-green); erro → coral (--err-red) e revela a correta em verde.
     Após responder, trava o cartão (idempotente por caso). aria-pressed nas opções. */
  function initSvg11(root) {
    const svg = $('svg[data-svg="svg11"]', root);
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    $$('.bz-case', svg).forEach((kase) => {
      const correct = kase.dataset.correct;
      const opts = $$('.bz-opt', kase);
      const answered = () => kase.dataset.answered === '1';
      const paint = (g, kind) => {
        const r = g.querySelector('rect');
        if (!r) return;
        if (kind === 'right') { r.setAttribute('fill', 'var(--ok-green-dim)'); r.setAttribute('stroke', 'var(--ok-green)'); }
        else if (kind === 'wrong') { r.setAttribute('fill', 'var(--err-red-dim)'); r.setAttribute('stroke', 'var(--err-red)'); }
      };
      opts.forEach((opt) => activable(opt, () => {
        if (answered()) return;
        kase.dataset.answered = '1';
        opts.forEach((o) => o.setAttribute('aria-pressed', 'true'));
        const chosen = opt.dataset.opt;
        if (chosen === correct) {
          paint(opt, 'right');
          const why = opt.querySelector('.bz-opt-why'); if (why) why.setAttribute('opacity', '1');
        } else {
          paint(opt, 'wrong');
          const right = opts.find((o) => o.dataset.opt === correct);
          if (right) { paint(right, 'right'); const w = right.querySelector('.bz-opt-why'); if (w) w.setAttribute('opacity', '1'); }
        }
      }));
    });
  }

  /* prefers-reduced-motion: o pulso da massa sólida (SVG-5) é SMIL <animate>,
     que NÃO obedece animation:none do CSS. Pausa via setAttribute begin="indefinite". */
  function applyReducedMotion(root) {
    if (!window.matchMedia || !matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // O pulso da massa sólida (SVG-5) já roda (begin="0s"); só trocar begin não para.
    // Removemos os <animate> e congelamos o anel no estado base (sem pulso).
    $$('svg[data-svg="svg5"]', root).forEach((svg) => {
      if (typeof svg.pauseAnimations === 'function') { try { svg.pauseAnimations(); } catch (_) {} }
      $$('animate, animateTransform', svg).forEach((a) => a.remove());
    });
  }

  function initAll(root) {
    root = root || document;
    initSvg1(root); initSvg2(root); initSvg3(root); initSvg4(root);
    initSvg5(root); initSvg6(root); initSvg7(root);
    initSvg8(root); initSvg9(root); initSvg10(root); initMc2(root); initSvg11(root);
    applyReducedMotion(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll(document));
  } else { initAll(document); }

  window.RimInteractive = { initAll };
})();
