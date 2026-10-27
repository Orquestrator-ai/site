/* aula-08.js — componentes-Executor interativos da Aula 8 (Ginecologia · Módulo III):
   Prolapsos / distopia genital. O interativo-estrela é a RÉGUA/SIMULADOR POP-Q, que atravessa
   P1 (leitura) → P9 (boneco) → P10 (calculadora) → P11 (simulador) → P13 (síntese).

   INEGOCIÁVEIS travados aqui:
   (1) O estágio é SEMPRE CALCULADO: o corte do estágio 4 = CVT − 2 a cada input, JAMAIS +6 fixo.
   (2) A regra dos 4 cm é um VETO SEPARADO: |D − C| > 4 (MÓDULO da diferença) sinaliza alongamento,
       NÃO altera o número do estágio.
   Namespace de estado: go-a8-*. Element-scoped: cada bloco só age se seu componente existe na página.
   Lê e ESTENDE o estado go-a7-* (objetos persistentes que nasceram na Aula 7) — não recria. */
(function () {
  'use strict';

  /* ============ NÚCLEO POP-Q (compartilhado por P1/P9/P10/P11/P13) ============ */

  // Estágio pelo PONTO ISOLADO MAIS DISTAL (maior valor com sinal entre Aa/Ba/Ap/Bp/C).
  // O corte do estágio 4 é CVT − 2 — CALCULADO a cada chamada, nunca hardcodado.
  function stageFromLeading(lead, cvt) {
    var cut4 = cvt - 2;               // ← INEGOCIÁVEL: calculado, nunca +6 fixo
    var stage;
    if (lead <= -3) stage = 0;        // tudo em −3 (ou mais dentro) = sem prolapso
    else if (lead < -1) stage = 1;    // < −1
    else if (lead <= 1) stage = 2;    // −1 a +1
    else if (lead < cut4) stage = 3;  // ≥ +2 e < CVT − 2
    else stage = 4;                   // ≥ CVT − 2
    return { stage: stage, cut4: cut4 };
  }

  // Leading = ponto mais distal entre as paredes e o ápice (C). D fica de fora do estadiamento
  // (é o detetive colo × cúpula e entra no veto de alongamento, não no degrau).
  function leadingPoint(p) {
    var keys = ['Aa', 'Ba', 'Ap', 'Bp', 'C'];
    var best = null, bestK = null;
    keys.forEach(function (k) {
      if (typeof p[k] === 'number' && isFinite(p[k])) {
        if (best === null || p[k] > best) { best = p[k]; bestK = k; }
      }
    });
    return { val: best, key: bestK };
  }

  // Veto de alongamento — SEPARADO do estágio. Usa o MÓDULO de (D − C).
  function alongamento(p) {
    if (typeof p.D !== 'number' || typeof p.C !== 'number' || !isFinite(p.D) || !isFinite(p.C)) return null;
    var diff = Math.abs(p.D - p.C);
    return { diff: diff, flag: diff > 4 };
  }

  function fmt(v) { return (v > 0 ? '+' : '') + v; }

  /* ============ 1. RÉGUA POP-Q EM MODO LEITURA — P1 (nasce o interativo-estrela) ============ */
  (function reguaLeitura() {
    var reg = document.querySelector('.a8-regua[data-mode="read"]');
    if (!reg) return;
    var axis = reg.querySelector('.a8-regua__track');
    if (!axis) return;
    var MIN = -8, MAX = 8;                 // cobre D −7 … Ba +5, com folga
    var pts = Array.prototype.slice.call(reg.querySelectorAll('.a8-regua__pt'));
    pts.forEach(function (el) {
      var v = parseFloat(el.getAttribute('data-val'));
      var pct = ((v - MIN) / (MAX - MIN)) * 100;
      el.style.left = pct + '%';
      el.classList.toggle('is-out', v > 0);
      el.classList.toggle('is-in', v < 0);
    });
    // marca 0 = carúncula himenal
    var zero = reg.querySelector('.a8-regua__caruncula');
    if (zero) zero.style.left = (((0 - MIN) / (MAX - MIN)) * 100) + '%';
  })();

  /* ============ 2. BONECO POP-Q — P9 (6 pontos + hotspots dentro/fora) ============ */
  (function boneco() {
    var box = document.querySelector('.a8-boneco');
    if (!box) return;
    var chips = Array.prototype.slice.call(box.querySelectorAll('.a8-boneco__pt'));
    var out = box.querySelector('.a8-boneco__read');
    function show(chip) {
      chips.forEach(function (c) { c.classList.toggle('on', c === chip); c.setAttribute('aria-pressed', String(c === chip)); });
      if (!out) return;
      out.querySelector('.a8-boneco__pt-name').textContent = chip.getAttribute('data-name');
      out.querySelector('.a8-boneco__pt-mede').textContent = chip.getAttribute('data-mede');
      out.querySelector('.a8-boneco__pt-sinal').textContent = chip.getAttribute('data-sinal');
      out.classList.add('show');
    }
    chips.forEach(function (chip) {
      chip.setAttribute('role', 'button');
      chip.setAttribute('tabindex', '0');
      chip.setAttribute('aria-pressed', 'false');
      chip.addEventListener('click', function () { show(chip); });
      chip.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(chip); } });
    });
  })();

  /* ============ 3. RÉGUA-CALCULADORA POP-Q — P10 (o interativo-estrela no ápice) ============ */
  (function calculadora() {
    var calc = document.querySelector('.a8-calc');
    if (!calc) return;
    var inputs = {};
    ['Aa', 'Ba', 'Ap', 'Bp', 'C', 'D', 'CVT'].forEach(function (k) {
      inputs[k] = calc.querySelector('.a8-calc__in[data-pt="' + k + '"]');
    });
    var elStage = calc.querySelector('[data-out="stage"]');
    var elLead = calc.querySelector('[data-out="lead"]');
    var elCut = calc.querySelector('[data-out="cut4"]');
    var elVeto = calc.querySelector('[data-out="veto"]');
    var outBox = calc.querySelector('.a8-calc__out');
    var STAGE_TXT = [
      'Estágio 0 — tudo em −3, sem prolapso (o “tudo normal”).',
      'Estágio 1 — ponto mais distal < −1: pequeno deslocamento, provavelmente nem opera.',
      'Estágio 2 — ponto mais distal entre −1 e +1, em torno da carúncula himenal.',
      'Estágio 3 — ponto mais distal ≥ +2: a parede já saiu, mas ainda não é procidência total.',
      'Estágio 4 — ponto mais distal ≥ CVT − 2: procidência total.'
    ];
    function num(el) { if (!el) return NaN; var v = parseFloat(String(el.value).replace(',', '.')); return isFinite(v) ? v : NaN; }
    function compute() {
      var p = {};
      ['Aa', 'Ba', 'Ap', 'Bp', 'C', 'D'].forEach(function (k) { p[k] = num(inputs[k]); });
      var cvt = num(inputs.CVT);
      if (!isFinite(cvt) || cvt <= 0) {
        elStage.textContent = '—'; elLead.textContent = '—'; elCut.textContent = '—';
        elVeto.textContent = 'informe o CVT para calcular o corte do estágio 4';
        elVeto.className = 'a8-calc__veto'; outBox.className = 'a8-calc__out';
        return;
      }
      var lead = leadingPoint(p);
      if (lead.val === null) {
        elStage.textContent = '—'; elLead.textContent = '—';
        elCut.textContent = fmt(cvt - 2);
        elVeto.textContent = 'informe ao menos um ponto de parede/ápice';
        elVeto.className = 'a8-calc__veto'; outBox.className = 'a8-calc__out';
        return;
      }
      var res = stageFromLeading(lead.val, cvt);
      elStage.textContent = 'Estágio ' + res.stage;
      elLead.textContent = lead.key + ' ' + fmt(lead.val);
      elCut.textContent = 'CVT − 2 = ' + fmt(res.cut4);
      // classe de cor por estágio
      outBox.className = 'a8-calc__out is-s' + res.stage;
      outBox.setAttribute('title', STAGE_TXT[res.stage]);
      var caption = calc.querySelector('.a8-calc__stage-txt');
      if (caption) caption.textContent = STAGE_TXT[res.stage];
      // veto de alongamento — SEPARADO
      var al = alongamento(p);
      if (al && al.flag) {
        elVeto.textContent = '|D − C| = ' + al.diff + ' cm > 4 → alongamento hipertrófico do colo (colo comprido, NÃO prolapso) — veto separado do estágio.';
        elVeto.className = 'a8-calc__veto is-warn';
      } else if (al) {
        elVeto.textContent = '|D − C| = ' + al.diff + ' cm ≤ 4 → colo de comprimento normal (não é alongamento).';
        elVeto.className = 'a8-calc__veto is-ok';
      } else {
        elVeto.textContent = 'informe C e D para checar a regra dos 4 cm (|D − C| > 4 = alongamento).';
        elVeto.className = 'a8-calc__veto';
      }
    }
    Object.keys(inputs).forEach(function (k) { if (inputs[k]) inputs[k].addEventListener('input', compute); });
    var reset = calc.querySelector('[data-action="lurdinha"]');
    if (reset) reset.addEventListener('click', function () {
      var seed = { Aa: 3, Ba: 5, Ap: -3, Bp: -3, C: -6, D: -7, CVT: 7 };
      Object.keys(seed).forEach(function (k) { if (inputs[k]) inputs[k].value = seed[k]; });
      compute();
    });
    compute();
  })();

  /* ============ 4. SIMULADOR POP-Q — P11 (desafios com feedback verbatim) ============ */
  (function simulador() {
    var sim = document.querySelector('.a8-sim');
    if (!sim) return;
    var cards = Array.prototype.slice.call(sim.querySelectorAll('.a8-sim__case'));
    cards.forEach(function (card) {
      var btn = card.querySelector('.a8-sim__reveal');
      var fb = card.querySelector('.a8-sim__fb');
      if (!btn || !fb) return;
      // veto |D−C| vivo quando C e D estão declarados no data-*
      var c = parseFloat(card.getAttribute('data-c'));
      var d = parseFloat(card.getAttribute('data-d'));
      var vetoEl = card.querySelector('.a8-sim__veto');
      if (vetoEl && isFinite(c) && isFinite(d)) {
        var diff = Math.abs(d - c);
        vetoEl.textContent = '|D − C| = ' + diff + ' → ' + (diff > 4 ? 'alongamento (colo comprido)' : 'não é alongamento (colo normal)');
        vetoEl.classList.add(diff > 4 ? 'is-warn' : 'is-ok');
      }
      btn.addEventListener('click', function () {
        var open = fb.classList.toggle('show');
        btn.setAttribute('aria-expanded', String(open));
        btn.textContent = open ? 'Ocultar diagnóstico' : 'Revelar diagnóstico';
      });
    });
  })();

  /* ============ 5. obj-mapa-assoalho-pelvico — HIDRATA a versão anatômica (lê go-a7-mapa) ==== */
  (function mapaHidrata() {
    var el = document.querySelector('.a8-mapa[data-mapa]');
    var touch = document.querySelectorAll('.a8-mapa-touch[data-mapa-touch]');
    if (!el && !touch.length) return;
    // Link-back: lê os marcos que a A7 registrou (não recria — estende).
    var A7 = 'go-a7-mapa', A8 = 'go-a8-mapa';
    var herdados = [];
    try { herdados = JSON.parse(localStorage.getItem(A7) || '[]'); } catch (_) { herdados = []; }
    var visited = [];
    try { visited = JSON.parse(localStorage.getItem(A8) || '[]'); } catch (_) { visited = []; }
    function mark(id) { if (id && visited.indexOf(id) === -1) visited.push(id); }
    if (el) mark(el.getAttribute('data-mapa'));
    touch.forEach(function (t) { mark(t.getAttribute('data-mapa-touch')); });
    try { localStorage.setItem(A8, JSON.stringify(visited)); } catch (_) {}
    if (el) {
      var meta = el.querySelector('[data-mapa-meta]');
      if (meta) meta.textContent = 'anatômico · ' + visited.length + ' marco(s) hidratado(s) · herdou ' + herdados.length + ' da versão funcional';
    }
  })();

  /* ============ 6. obj-corredor-casos-gineco (Lurdinha) — CARREGA (P1) / FECHA (P13) ======== */
  (function corredor() {
    var el = document.querySelector('.a8-caso[data-corredor]');
    if (!el) return;
    var A7 = 'go-a7-corredor', A8 = 'go-a8-corredor';
    var stage = el.getAttribute('data-corredor') || 'carrega';
    // Lê o estado herdado da Aula 7 (não recontar do zero).
    var herdado = {};
    try { herdado = JSON.parse(localStorage.getItem(A7) || '{}'); } catch (_) { herdado = {}; }
    var state = {};
    try { state = JSON.parse(localStorage.getItem(A8) || '{}'); } catch (_) { state = {}; }
    state.caso = 'Lurdinha';
    state.herdadoDeA7 = !!(herdado && herdado.caso);
    state.popqCru = 'Aa+3 Ba+5 Ap−3 Bp−3 C−6 D−7 CVT7';
    if (stage === 'carrega') {
      state.estado = 'carregado';
    } else if (stage === 'fecha') {
      state.estado = 'resolvido';
      state.diagnostico = 'prolapso de parede vaginal anterior acentuado (cistocele avançada) · apical e posterior poupados · estágio 4 na fronteira III↔IV';
      state.conduta = 'colpoperineoplastia anterior + fáscia pubovesicocervical + correção do períneo — sem histerectomia nem sacrocolpopexia';
    }
    try { localStorage.setItem(A8, JSON.stringify(state)); } catch (_) {}
    var meta = el.querySelector('[data-corredor-meta]');
    if (meta) {
      meta.textContent = stage === 'fecha'
        ? 'estado: resolvido · decodificado por inteiro (fecha o Corredor gineco)'
        : (state.herdadoDeA7
            ? 'estado: carregado da Aula 7 · enigma aberto, decodificação prometida'
            : 'estado: carregado · enigma aberto, decodificação prometida');
    }
  })();
})();
