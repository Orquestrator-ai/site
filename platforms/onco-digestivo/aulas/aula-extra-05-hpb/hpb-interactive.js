/* hpb-interactive.js — wiring vanilla das interações bespoke da Aula Extra 5 (HPB).
   Os hotspots simples (SVG-1, SVG-3) usam o módulo compartilhado interactive.js via
   .figure-svg__stage + .hs-shape. Aqui ficam as interações que aquele módulo não cobre:
   step-through (SVG-2, 10, 14), slider de dados (SVG-4), slider arrastável (SVG-5),
   calculadora de complacência (SVG-6), diagrama causal (SVG-7, 12), tabela clicável
   (SVG-8, 11), calculadora IPSS (SVG-9), bexigoma+conduta (SVG-13), toque+polpas (SVG-15),
   quiz-caso (SVG-16). Tudo funciona por click + teclado + touch (pointer), respeita
   prefers-reduced-motion e é idempotente. */

(function () {
  'use strict';
  // animações respeitam prefers-reduced-motion via @media no CSS (cmplTremor, b13Pulse);
  // nenhuma animação é disparada por JS, então não há gate JS aqui.
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const key = (e) => e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar';

  /* Helper: torna um <g>/elemento SVG um botão acionável por click+teclado. */
  function activable(el, handler) {
    if (!el || el.dataset.act === '1') return;
    el.dataset.act = '1';
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
    el.addEventListener('click', handler);
    el.addEventListener('keydown', (e) => { if (key(e)) { e.preventDefault(); handler(e); } });
  }

  /* ============ SVG-1 e SVG-3 — hotspot com painel próprio (g.hotspot + g.reveal) ============
     Estes SVGs trazem g.hotspot[data-target] + g.reveal[data-reveal-for]; o módulo
     compartilhado espera .hs-shape/.figure-svg__stage, então wiramos aqui o painel HTML
     ao lado (o detail vive num .hotspot-detail externo). */
  const REVEAL_TEXT = {
    svg1: {
      bexiga: { label: 'Bexiga', text: 'Armazena urina (cerca de 400–500 ml) e fica logo acima da próstata.' },
      prostata: { label: 'Próstata', text: '20–30 g, do tamanho de uma noz. Abraça a uretra logo abaixo da bexiga.' },
      uretra: { label: 'Uretra prostática', text: 'Primeiro trecho da uretra. A urina atravessa o miolo da próstata antes de seguir.' },
    },
    svg3: {
      transicao: { label: 'Zona de transição', text: 'A HPB cresce aqui. Encosta na uretra → comprime cedo → sintoma precoce.' },
      periferica: { label: 'Zona periférica', text: 'O câncer cresce aqui, longe da uretra → fica calado por anos → sintoma tardio. HPB e câncer nascem em zonas distintas: a HPB não é fator de risco para câncer.' },
    },
  };

  function initSimpleHotspots(root) {
    $$('svg[data-svg]', root).forEach((svg) => {
      const id = svg.dataset.svg;
      const map = REVEAL_TEXT[id];
      if (!map) return;
      const spots = $$('.hotspot[data-target]', svg);
      if (!spots.length) return;
      const detail = root.querySelector(`.hotspot-detail[data-hs-detail-for="${id}"]`);
      const setActive = (target) => {
        spots.forEach((s) => {
          const on = s.dataset.target === target;
          s.classList.toggle('is-active', on);
          s.setAttribute('aria-pressed', String(on));
        });
        const info = map[target];
        if (detail && info) {
          detail.innerHTML =
            `<div class="hotspot-detail__label">${info.label}</div>` +
            `<p class="hotspot-detail__text">${info.text}</p>`;
        }
      };
      spots.forEach((s) => {
        activable(s, () => {
          if (s.classList.contains('is-active')) {
            s.classList.remove('is-active'); s.setAttribute('aria-pressed', 'false');
            if (detail) detail.innerHTML = '<p class="hotspot-detail__text">Toque numa estrutura para ver sua função.</p>';
          } else setActive(s.dataset.target);
        });
        if (!s.dataset.focusBound) {
          s.dataset.focusBound = '1';
          s.addEventListener('focus', () => setActive(s.dataset.target));
        }
      });
    });
  }

  /* ============ SVG-2 — step-through da uretra (4 trechos + 2 traumas) ============ */
  function initSvg2(root) {
    const svg = $('svg[data-svg="svg2"]', root);
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const ctl = root.querySelector('[data-step-ctl="svg2"]');
    if (!ctl) return;
    const segs = $$('.seg', svg), labels = $$('.seg-label', svg);
    const traumaB = $('.trauma[data-trauma="bulbar"]', svg);
    const traumaM = $('.trauma[data-trauma="membranosa"]', svg);
    const out = ctl.querySelector('[data-step-count]');
    const microcopy = [
      'Trecho 1 · prostática — o mais interno, dentro da próstata.',
      'Trecho 2 · membranosa — porção fixa, posterior.',
      'Trecho 3 · bulbar — porção anterior do bulbo.',
      'Trecho 4 · peniana — até o meato. Os 4 trechos completos.',
      'Queda a cavaleiro lesa a uretra bulbar ("bubu da bulbar").',
      'Fratura de pelve lesa a uretra membranosa.',
    ];
    let cur = 1; const MAX = 6;
    const apply = () => {
      segs.forEach((s) => {
        const st = +s.dataset.step;
        s.classList.toggle('is-lit', st <= Math.min(cur, 4));
        s.classList.toggle('is-on', st === cur && cur <= 4);
      });
      labels.forEach((l) => l.classList.toggle('is-on', +l.dataset.step === cur && cur <= 4));
      if (traumaB) traumaB.setAttribute('opacity', cur >= 5 ? '1' : '0');
      if (traumaM) traumaM.setAttribute('opacity', cur >= 6 ? '1' : '0');
      if (out) out.textContent = `passo ${cur} de ${MAX} — ${microcopy[cur - 1]}`;
    };
    activable(ctl.querySelector('[data-step-prev]'), () => { cur = Math.max(1, cur - 1); apply(); });
    activable(ctl.querySelector('[data-step-next]'), () => { cur = Math.min(MAX, cur + 1); apply(); });
    apply();
  }

  /* ============ SVG-4 — slider idade × receptores × prevalência ============ */
  function initSvg4(root) {
    const svg = $('svg[data-svg="svg4"]', root);
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const slider = root.querySelector('[data-slider="svg4"]');
    if (!slider) return;
    const DATA = { 40: [18, 8], 50: [34, 25], 60: [52, 50], 70: [70, 65], 80: [86, 80], 90: [95, 90], 100: [100, 100] };
    const lerp = (age) => {
      const ks = Object.keys(DATA).map(Number).sort((a, b) => a - b);
      let lo = ks[0], hi = ks[ks.length - 1];
      for (let i = 0; i < ks.length - 1; i++) { if (age >= ks[i] && age <= ks[i + 1]) { lo = ks[i]; hi = ks[i + 1]; break; } }
      const t = hi === lo ? 0 : (age - lo) / (hi - lo);
      const rec = Math.round(DATA[lo][0] + t * (DATA[hi][0] - DATA[lo][0]));
      const prev = Math.round(DATA[lo][1] + t * (DATA[hi][1] - DATA[lo][1]));
      return [rec, prev];
    };
    const marker = $('[data-svg4-marker]', svg);
    const prevDot = $('[data-prev-dot]', svg), recDot = $('[data-rec-dot]', svg);
    const line = marker ? marker.querySelector('line') : null;
    const readout = $('[data-svg4-readout]', svg);
    const apply = (age) => {
      const x = 90 + ((age - 40) / 60) * 630;
      const [rec, prev] = lerp(age);
      const yPrev = 360 - (prev / 100) * 300, yRec = 360 - (rec / 100) * 300;
      if (line) { line.setAttribute('x1', x); line.setAttribute('x2', x); }
      if (prevDot) { prevDot.setAttribute('cx', x); prevDot.setAttribute('cy', yPrev); }
      if (recDot) { recDot.setAttribute('cx', x); recDot.setAttribute('cy', yRec); }
      if (readout) {
        readout.innerHTML = `<tspan fill="var(--warn-amber)" font-weight="700">${age} anos</tspan> · receptores ${rec} · prevalência ~${prev}%`;
        readout.setAttribute('fill', age >= 100 ? 'var(--coral-50)' : 'var(--ink-100)');
      }
    };
    slider.addEventListener('input', () => apply(+slider.value));
    apply(+slider.value || 60);
  }

  /* ============ SVG-5 — slider arrastável: luz da uretra círculo → fenda ============ */
  function initSvg5(root) {
    const svg = $('svg[data-svg="svg5"]', root);
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const slider = root.querySelector('[data-slider="svg5"]');
    if (!slider) return;
    const lumen = $('[data-lumen]', svg), state = $('[data-svg5-state]', svg);
    const left = $('[data-lobe="left"]', svg), right = $('[data-lobe="right"]', svg);
    const apply = (v) => {
      const t = v / 100;
      const rx = 46 - 42 * t, ry = 46 - 6 * t;
      if (lumen) {
        lumen.setAttribute('rx', rx.toFixed(1)); lumen.setAttribute('ry', ry.toFixed(1));
        lumen.setAttribute('fill', t > 0.7 ? 'var(--coral-50)' : 'var(--warn-amber)');
      }
      if (left) left.setAttribute('transform', `translate(${(30 * t).toFixed(1)},0)`);
      if (right) right.setAttribute('transform', `translate(${(-30 * t).toFixed(1)},0)`);
      if (state) {
        let txt = 'luz aberta · círculo', fill = 'var(--warn-amber)';
        if (t > 0.7) { txt = 'fenda estrangulada'; fill = 'var(--coral-50)'; }
        else if (t >= 0.33) { txt = 'luz achatada'; fill = 'var(--warn-amber)'; }
        state.textContent = txt; state.setAttribute('fill', fill);
      }
      svg.setAttribute('data-growth', v);
    };
    slider.addEventListener('input', () => apply(+slider.value));
    apply(+slider.value || 0);
  }

  /* ============ SVG-6 — calculadora de complacência ============ */
  function initSvg6(root) {
    const svg = $('svg[data-svg="svg6"]', root) || $('[data-svg6]', root);
    const inV = root.querySelector('[data-cmpl="v"]'), inP = root.querySelector('[data-cmpl="p"]');
    if (!inV || !inP || inV.dataset.bound) return; inV.dataset.bound = '1';
    const valV = $('#cmpl-val-v'), valP = $('#cmpl-val-p'), out = $('#cmpl-out-val');
    const verdict = $('#cmpl-verdict'), sub = $('#cmpl-verdict-sub'), box = $('#cmpl-out-box');
    const tremor = $('#cmpl-tremor');
    // normaliza vírgula decimal PT-BR → ponto, e respeita limites min/max do <input>
    const num = (input) => {
      const raw = String(input.value).trim().replace(',', '.');
      let n = parseFloat(raw);
      if (isNaN(n)) return NaN;
      const lo = parseFloat(input.min), hi = parseFloat(input.max);
      if (!isNaN(lo)) n = Math.max(lo, n);
      if (!isNaN(hi)) n = Math.min(hi, n);
      return n;
    };
    const apply = () => {
      const v = num(inV), p = num(inP);
      if (valV) valV.textContent = isNaN(v) ? '—' : v;
      if (valP) valP.textContent = isNaN(p) ? '—' : p;
      if (!p || p <= 0 || isNaN(v) || v < 0) { if (out) out.textContent = '—'; return; }
      const c = v / p;
      if (out) out.textContent = c.toFixed(1).replace('.', ',');
      let txt, subtxt, col;
      if (c >= 30) { txt = 'complacência alta'; subtxt = 'enche sem dar vontade'; col = 'var(--state-correct)'; }
      else if (c >= 12) { txt = 'complacência reduzida'; subtxt = 'vontade chega cedo'; col = 'var(--warn-amber)'; }
      else { txt = 'complacência baixa'; subtxt = 'bexiga hipertrofiada, perde luz'; col = 'var(--coral-60)'; }
      if (verdict) { verdict.textContent = txt; verdict.setAttribute('fill', col); }
      if (sub) sub.textContent = subtxt;
      if (box) box.setAttribute('stroke', col);
      if (tremor) tremor.classList.toggle('cmpl-tremor--fast', c < 12);
    };
    inV.addEventListener('input', apply); inP.addEventListener('input', apply);
    apply();
  }

  /* ============ SVG-7 — diagrama causal 3 colunas (acende a linha) ============ */
  function initSvg7(root) {
    const svg = $('svg[data-svg="svg7"]', root) || root.querySelector('[data-caus="svg7"] svg');
    const anchor = root.querySelector('[data-caus="svg7"]') || (svg && svg.closest('.figure-svg__frame'));
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const rows = $$('.caus-row', svg);
    rows.forEach((r) => activable(r, () => {
      const on = r.classList.contains('is-on');
      rows.forEach((x) => { x.classList.remove('is-on'); x.setAttribute('aria-pressed', 'false'); });
      if (!on) { r.classList.add('is-on'); r.setAttribute('aria-pressed', 'true'); }
      if (anchor) anchor.classList.toggle('has-active', !on);
    }));
  }

  /* ============ SVG-8 — tabela LUTS clicável (micro-caso) ============ */
  function initSvg8(root) {
    const svg = $('svg[data-svg="svg8"]', root) || root.querySelector('[data-luts] svg');
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const chips = $$('.luts-chip', svg);
    const tag = $('#luts-case-tag'), t1 = $('#luts-case-txt'), t2 = $('#luts-case-txt2');
    const wrap = (txt) => { // quebra ~62 chars em 2 linhas
      if (txt.length <= 62) return [txt, ''];
      let cut = txt.lastIndexOf(' ', 62); if (cut < 0) cut = 62;
      return [txt.slice(0, cut), txt.slice(cut + 1)];
    };
    chips.forEach((chip) => activable(chip, () => {
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const cls = (chip.closest('.luts-col') || {}).dataset ? chip.closest('.luts-col').dataset.class : '';
      if (tag) { tag.textContent = cls === 'irritativo' ? 'IRRITATIVO · enchimento' : 'OBSTRUTIVO · esvaziamento'; tag.setAttribute('fill', cls === 'irritativo' ? 'var(--coral-80)' : 'var(--teal-80)'); }
      const [a, b] = wrap(chip.dataset.case || '');
      if (t1) t1.textContent = a; if (t2) t2.textContent = b;
    }));
  }

  /* ============ SVG-9 — calculadora IPSS ============ */
  function initSvg9(root) {
    const svg = $('svg[data-svg="svg9"]', root) || root.querySelector('[data-ipss] svg');
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const answers = {};
    const rows = $$('.ipss-opts', svg);
    const total = $('#ipss-total'), verdict = $('#ipss-verdict'), bar = $('#ipss-bar');
    const recompute = () => {
      let sum = 0; Object.values(answers).forEach((v) => { sum += v; });
      if (total) total.textContent = sum;
      if (bar) bar.setAttribute('width', (sum / 35 * 552).toFixed(0));
      let txt, col;
      if (sum < 8) { txt = 'leve · vigilância ativa'; col = 'var(--state-correct)'; }
      else if (sum <= 19) { txt = 'moderado · tratar (farmacológico)'; col = 'var(--warn-amber)'; }
      else { txt = 'severo · avaliar conduta'; col = 'var(--coral-60)'; }
      if (verdict) { verdict.textContent = txt; verdict.setAttribute('fill', col); }
      if (total) total.setAttribute('fill', sum >= 8 ? col : 'var(--teal-80)');
    };
    rows.forEach((rowG) => {
      const q = rowG.dataset.q;
      const dots = $$('.ipss-dot', rowG);
      rowG.setAttribute('role', 'radiogroup');
      dots.forEach((dot) => {
        dot.setAttribute('role', 'radio'); dot.setAttribute('aria-checked', 'false');
        activable(dot, () => {
          dots.forEach((d) => { d.classList.remove('is-sel'); d.setAttribute('aria-checked', 'false'); });
          dot.classList.add('is-sel'); dot.setAttribute('aria-checked', 'true');
          answers[q] = +dot.dataset.v; recompute();
        });
      });
    });
    // QoL 1-6 (NÃO soma)
    const qol = $$('.ipss-qoldot', svg);
    qol.forEach((dot) => {
      dot.setAttribute('role', 'radio'); dot.setAttribute('aria-checked', 'false');
      activable(dot, () => {
        qol.forEach((d) => { d.classList.remove('is-sel'); d.setAttribute('aria-checked', 'false'); });
        dot.classList.add('is-sel'); dot.setAttribute('aria-checked', 'true'); // não recomputa total
      });
    });
    recompute();
  }

  /* ============ SVG-10 — fluxograma + step do α-bloqueador ============ */
  function initSvg10(root) {
    const svg = $('svg[data-svg="svg10"]', root) || root.querySelector('[data-cond] svg');
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    // degraus (realce)
    $$('.cond-step', svg).forEach((step) => activable(step, () => {
      $$('.cond-step', svg).forEach((s) => s.classList.remove('is-active'));
      step.classList.add('is-active');
    }));
    // step-through das 3 etapas
    const nodes = $$('.cond-node', svg), etapas = $$('.cond-etapa', svg);
    const count = $('#cond-stepcount', svg);
    let cur = 1; const MAX = 3;
    const apply = () => {
      nodes.forEach((n) => n.classList.toggle('is-on', +n.dataset.node === cur));
      etapas.forEach((e) => e.classList.toggle('is-dim', +e.dataset.node !== cur));
      if (count) count.textContent = `etapa ${cur} de ${MAX}`;
    };
    activable($('#cond-prev', svg), () => { cur = Math.max(1, cur - 1); apply(); });
    activable($('#cond-next', svg), () => { cur = Math.min(MAX, cur + 1); apply(); });
    apply();
  }

  /* ============ SVG-11 — tabela fármacos com filtro por perfil ============ */
  function initSvg11(root) {
    const svg = $('svg[data-svg="svg11"]', root) || root.querySelector('[data-interactive="filtro-perfil"]');
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const chips = $$('.f11-chip', svg), rows = $$('.f11-row', svg);
    const apply = (filter) => {
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.filter === filter)));
      chips.forEach((c) => c.classList.toggle('is-on', c.dataset.filter === filter));
      rows.forEach((r) => {
        const tags = (r.dataset.rows || '').split(/\s+/);
        const hit = filter === 'todos' || tags.includes(filter);
        r.classList.toggle('f11-dim', !hit);
        r.classList.toggle('f11-hit', filter !== 'todos' && hit);
      });
    };
    chips.forEach((c) => activable(c, () => apply(c.dataset.filter)));
    apply('todos');
  }

  /* ============ SVG-12 — cadeia causal da falência pós-renal ============ */
  function initSvg12(root) {
    const svg = $('svg[data-svg="svg12"]', root) || root.querySelector('[data-interactive="cadeia-causal"]');
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const steps = $$('.c12-step', svg);
    const title = $('.c12-panel-title', svg), body = $('.c12-panel-body', svg), foot = $('.c12-panel-foot', svg);
    const PANEL = {
      1: ['Obstrução prostática', 'A próstata aumentada comprime a uretra e cria resistência fixa à saída de urina.', 'No enunciado: sintomas clássicos de HPB de longa data.'],
      2: ['Bexiga não esvazia', 'Contra a resistência, sobra urina residual a cada micção; o resíduo cresce.', 'No enunciado: esvaziamento incompleto persistente.'],
      3: ['Engarrafamento retrógrado', 'A urina represada sobe de forma retrógrada pelos ureteres, pressionando o sistema acima.', 'No enunciado: dilatação a montante.'],
      4: ['Refluxo vesicoureteral', 'A pressão vence o mecanismo antirefluxo e a urina reflui em direção aos rins.', 'Atenção: dano de pressão sobre o parênquima.'],
      5: ['Falência pós-renal', 'O rim sofre por obstrução a jusante, não por doença renal primária. Creatinina e ureia sobem.', 'No enunciado: Cr/ureia subindo na HPB = indicação de cirurgia.'],
    };
    steps.forEach((s) => activable(s, () => {
      steps.forEach((x) => x.classList.remove('is-on'));
      s.classList.add('is-on');
      const p = PANEL[s.dataset.step];
      if (p) { if (title) title.textContent = p[0]; if (body) body.textContent = p[1]; if (foot) foot.textContent = p[2]; }
    }));
  }

  /* ============ SVG-13 — bexigoma hotspot + conduta ============ */
  function initSvg13(root) {
    const svg = $('svg[data-svg="svg13"]', root) || root.querySelector('[data-interactive="hotspot-step"]');
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const hs = $('.b13-hotspot', svg);
    const detail = root.querySelector('.hotspot-detail[data-hs-detail-for="svg13"]');
    activable(hs, () => {
      const on = hs.classList.toggle('is-active');
      hs.setAttribute('aria-pressed', String(on));
      if (detail) detail.innerHTML = on
        ? '<div class="hotspot-detail__label">Globo vesical</div><p class="hotspot-detail__text">Bexiga distendida na retenção urinária aguda. A massa palpável no hipogástrio é o bexigoma.</p>'
        : '<p class="hotspot-detail__text">Toque no abaulamento para identificá-lo.</p>';
    });
    // as 3 cards de conduta ficam todas visíveis (errado coral × certo verde); foco só realça
    $$('.s13-card', svg).forEach((c) => { c.setAttribute('tabindex', '0'); });
  }

  /* ============ SVG-14 — step RTU + cadeia da síndrome ============ */
  function initSvg14(root) {
    const svg = $('svg[data-svg="svg14"]', root) || root.querySelector('[data-interactive="step-cadeia"]');
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const ctl = root.querySelector('[data-step-ctl="svg14"]');
    const labels = $$('.rtu-step-label', svg), lobes = $$('.rtu-lobe', svg), scope = $('.rtu-scope', svg);
    const out = ctl ? ctl.querySelector('[data-step-count]') : null;
    const micro = [
      '1 · O cistoscópio entra pela uretra na linha média.',
      '2 · Visualiza os lóbulos prostáticos que obstruem.',
      '3 · Raspa com a alça ("tirar manteiga") e cauteriza.',
      '4 · A solução isotônica corre sob pressão o tempo todo.',
    ];
    let cur = 1; const MAX = 4;
    const apply = () => {
      labels.forEach((l) => l.classList.toggle('is-on', +l.dataset.step === cur));
      if (scope) scope.classList.toggle('is-on', cur === 1);
      lobes.forEach((lb) => lb.classList.toggle('is-rasp', cur >= 2));
      if (out) out.textContent = `passo ${cur} de ${MAX} — ${micro[cur - 1]}`;
    };
    if (ctl) {
      activable(ctl.querySelector('[data-step-prev]'), () => { cur = Math.max(1, cur - 1); apply(); });
      activable(ctl.querySelector('[data-step-next]'), () => { cur = Math.min(MAX, cur + 1); apply(); });
    }
    apply();
    // cadeia da síndrome: clicável, revela micro-explicação
    const SYN = {
      1: 'Veia aberta: ao raspar, abrem-se veias; a coluna de água tem pressão maior que a venosa.',
      2: 'O irrigante sob pressão flui direto para a circulação.',
      3: 'Excesso de água livre dilui os eletrólitos; o sódio é o que mais cai.',
      4: 'Hiponatremia dilucional. Em prova: RTU > 2h + náusea/vômito na recuperação. Por isso a RTU não é sob anestesia geral.',
    };
    const synDetail = root.querySelector('.hotspot-detail[data-hs-detail-for="svg14"]');
    $$('.syn-step', svg).forEach((s) => activable(s, () => {
      $$('.syn-step', svg).forEach((x) => x.classList.remove('is-on'));
      s.classList.add('is-on');
      if (synDetail) synDetail.innerHTML = `<p class="hotspot-detail__text">${SYN[s.dataset.syn]}</p>`;
    }));
  }

  /* ============ SVG-15 — toque retal hotspot + calculadora de polpas ============ */
  function initSvg15(root) {
    const svg = $('svg[data-svg="svg15"]', root) || root.querySelector('[data-interactive="hotspot-calc"]');
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const hs = $('.t15-hotspot', svg);
    const detail = root.querySelector('.hotspot-detail[data-hs-detail-for="svg15"]');
    activable(hs, () => {
      const on = hs.classList.toggle('is-active'); hs.setAttribute('aria-pressed', String(on));
      if (detail) detail.innerHTML = on
        ? '<div class="hotspot-detail__label">Próstata ao toque</div><p class="hotspot-detail__text">Palpável pela parede anterior do reto; o dedo aponta para a cicatriz umbilical.</p>'
        : '<p class="hotspot-detail__text">Toque na próstata desenhada.</p>';
    });
    const polpasT = $('.t15-polpas', svg), volT = $('.t15-volume', svg);
    const vbox = $('.t15-verdict-box', svg), vtit = $('.t15-verdict-title', svg), vbody = $('.t15-verdict-body', svg), vfoot = $('.t15-verdict-foot', svg);
    let n = 3; const MIN = 1, MAX = 6;
    const apply = () => {
      if (polpasT) polpasT.textContent = n;
      if (volT) volT.textContent = `≈ ${n * 10} g`;
      if (n <= 3) {
        if (vbox) { vbox.setAttribute('fill', 'var(--state-correct-fill)'); vbox.setAttribute('stroke', 'var(--state-correct)'); }
        if (vtit) { vtit.textContent = 'Tamanho normal'; vtit.setAttribute('fill', 'var(--state-correct)'); }
        if (vbody) vbody.textContent = n === 3 ? '3 polpas ≈ 30 g — bate com a noz.' : `${n} polpa${n > 1 ? 's' : ''} ≈ ${n * 10} g.`;
        if (vfoot) vfoot.textContent = 'Mais que 3 polpas já sugere HPB.';
      } else {
        if (vbox) { vbox.setAttribute('fill', 'var(--warn-amber-fill)'); vbox.setAttribute('stroke', 'var(--warn-amber)'); }
        if (vtit) { vtit.textContent = 'Sugere HPB'; vtit.setAttribute('fill', 'var(--warn-amber)'); }
        if (vbody) vbody.textContent = `${n} polpas ≈ ${n * 10} g — próstata aumentada.`;
        if (vfoot) vfoot.textContent = 'Mais que 3 polpas: acima do normal.';
      }
    };
    activable($('.t15-minus', svg), () => { n = Math.max(MIN, n - 1); apply(); });
    activable($('.t15-plus', svg), () => { n = Math.min(MAX, n + 1); apply(); });
    apply();
  }

  /* ============ SVG-16 — quiz-caso UNIFESP/UEPA ============ */
  function initSvg16(root) {
    const svg = $('svg[data-svg="svg16"]', root) || root.querySelector('[data-interactive="quiz-caso"]');
    if (!svg || svg.dataset.bound) return; svg.dataset.bound = '1';
    const FB = {
      unifesp: {
        A: ['Não há retenção nem complicação; não se opera.', false],
        B: ['LUTS misto sem complicação = degrau farmacológico. α-bloqueador, o remédio de todos. Propedêutica: anamnese + IPSS + toque.', true],
        C: ['Anticolinérgico isolado não cobre a obstrução; só entra se muito irritativo.', false],
        D: ['CVD é para retenção aguda, que aqui não existe.', false],
      },
      uepa: {
        A: ['α-bloqueador não resolve a retenção aguda instalada.', false],
        B: ['Diurético piora — empurra para insuficiência renal pós-renal.', false],
        C: ['Retenção urinária aguda com globo vesical = CVD, cateter que fica.', true],
        D: ['Tomografia é absurda para um bexigoma óbvio ao exame.', false],
      },
    };
    const letterOf = (opt) => {
      const explicit = opt.dataset.letter;
      if (explicit) return explicit.trim().toUpperCase();
      // fallback: raspa "A)" do texto se data-letter ausente
      return (opt.textContent.match(/[A-D]\)/) || [''])[0].replace(')', '').trim();
    };
    $$('.q16-opt', svg).forEach((opt) => activable(opt, () => {
      const q = opt.dataset.q;
      const correct = opt.dataset.correct === 'true';
      $$(`.q16-opt[data-q="${q}"]`, svg).forEach((o) => { o.classList.remove('is-correct', 'is-wrong'); });
      opt.classList.add(correct ? 'is-correct' : 'is-wrong');
      const fb = $(`.q16-feedback[data-q="${q}"]`, svg);
      const L = letterOf(opt);
      const data = (FB[q] || {})[L];
      if (fb && data) { fb.textContent = data[0]; fb.setAttribute('fill', data[1] ? 'var(--state-correct)' : 'var(--coral-80)'); }
    }));
  }

  function initAll(root) {
    root = root || document;
    initSimpleHotspots(root);
    initSvg2(root); initSvg4(root); initSvg5(root); initSvg6(root); initSvg7(root);
    initSvg8(root); initSvg9(root); initSvg10(root); initSvg11(root); initSvg12(root);
    initSvg13(root); initSvg14(root); initSvg15(root); initSvg16(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll(document));
  } else { initAll(document); }

  window.HPBInteractive = { initAll };
})();
