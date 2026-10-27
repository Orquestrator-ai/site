/* aula-09.js — componentes-Executor interativos da Aula 9 (Ginecologia · Módulo III, sub-bloco
   III.b): REVISÃO DO CICLO MENSTRUAL. A interação-âncora é a LINHA DO CICLO (P7): 4–5 curvas
   hormonais sincronizadas com scrub folicular↔lútea.

   INEGOCIÁVEIS travados aqui:
   (1) O limiar ≥200 pg/mL × ~48-50h é do ESTRADIOL (o gatilho que dispara o pico de LH). Na Linha
       do Ciclo o marcador do limiar ANCORA na curva do estradiol — nunca na do LH. A inversão é a
       pegadinha da banca (nota neutra de olho-de-banca; NUNCA "lapso do professor").
   (2) A9 é ILHA: o Corredor de Casos gineco abre/fecha SÓ o Caso 2 (Rafaela) num namespace PRÓPRIO
       (go-a9-corredor), SEM ler nem herdar estado da Lurdinha (go-a7/go-a8). NÃO toca o mapa do
       assoalho nem objetos obstétricos.
   Namespace de estado: go-a9-*. Element-scoped: cada bloco só age se seu componente existe. */
(function () {
  'use strict';
  var SVGNS = 'http://www.w3.org/2000/svg';
  function el(tag, attrs) {
    var n = document.createElementNS(SVGNS, tag);
    if (attrs) for (var k in attrs) if (attrs.hasOwnProperty(k)) n.setAttribute(k, attrs[k]);
    return n;
  }

  /* ============ 1. MINI-SIMULADO DDx "pensa comigo" — P1 (recuperação ativa) ============ */
  (function ddx() {
    var box = document.querySelector('.a9-ddx');
    if (!box) return;
    var ramos = Array.prototype.slice.call(box.querySelectorAll('.a9-ramo'));
    var KEY = 'go-a9-ddx';
    var opened = [];
    try { opened = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (_) { opened = []; }
    function persist() { try { localStorage.setItem(KEY, JSON.stringify(opened)); } catch (_) {} }
    ramos.forEach(function (r) {
      var id = r.getAttribute('data-ramo');
      r.setAttribute('role', 'button');
      r.setAttribute('tabindex', '0');
      r.setAttribute('aria-expanded', 'false');
      function toggle() {
        var open = r.classList.toggle('is-open');
        r.setAttribute('aria-expanded', String(open));
        if (open && opened.indexOf(id) === -1) { opened.push(id); persist(); }
        else if (!open) { var ix = opened.indexOf(id); if (ix > -1) { opened.splice(ix, 1); persist(); } }
      }
      r.addEventListener('click', toggle);
      r.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
      if (opened.indexOf(id) > -1) { r.classList.add('is-open'); r.setAttribute('aria-expanded', 'true'); }
    });
  })();

  /* ============ 2. RÉGUA DOS 14 DIAS — P6 (folicular VARIA · lútea FIXA ~14d) ============ */
  (function regua14() {
    var reg = document.querySelector('.a9-regua');
    if (!reg) return;
    var slider = reg.querySelector('input[type="range"]');
    var read = reg.querySelector('.a9-regua__read');
    var foliSub = reg.querySelector('.a9-regua__seg.foli .sub');
    if (!slider) return;
    var LUT = 14; // fixa
    function update() {
      var total = parseInt(slider.value, 10);
      var foli = total - LUT; // só a metade esquerda estica
      // razão de colunas para o grid (folicular : ovulação(auto) : lútea)
      reg.style.setProperty('--a9-foli-fr', foli + 'fr');
      reg.style.setProperty('--a9-lut-fr', LUT + 'fr');
      if (read) read.textContent = 'ciclo de ' + total + ' dias · folicular ' + foli + 'd (varia) · lútea ' + LUT + 'd (fixa)';
      if (foliSub) foliSub.textContent = foli + ' dias';
    }
    slider.addEventListener('input', update);
    update();
  })();

  /* ============ 3. A LINHA DO CICLO — P7 (interação-âncora · herói-síntese) ============ */
  (function linhaDoCiclo() {
    var box = document.querySelector('.a9-ciclo');
    if (!box) return;
    var svg = box.querySelector('.a9-ciclo__svg');
    if (!svg) return;

    /* --- geometria (viewBox 0 0 1000 520) --- */
    var W = 1000, H = 520, padL = 72, padR = 34, padT = 96, padB = 66;
    var plotW = W - padL - padR, plotH = H - padT - padB, D = 28;
    function X(day) { return padL + ((day - 1) / (D - 1)) * plotW; }
    function Y(v) { return padT + (1 - v) * plotH; }

    /* --- séries normalizadas 0..1 (dia 1..28), fiéis à narrativa qualitativa --- */
    var SER = {
      fsh:  [0.52,0.55,0.50,0.46,0.42,0.38,0.34,0.31,0.30,0.30,0.32,0.38,0.46,0.52,0.40,0.28,0.22,0.20,0.19,0.19,0.20,0.21,0.22,0.24,0.27,0.32,0.40,0.48],
      lh:   [0.18,0.18,0.18,0.19,0.19,0.20,0.20,0.21,0.22,0.24,0.30,0.45,0.72,1.00,0.55,0.30,0.24,0.22,0.21,0.20,0.20,0.20,0.19,0.19,0.18,0.18,0.18,0.18],
      e2:   [0.16,0.15,0.15,0.16,0.18,0.22,0.28,0.36,0.48,0.64,0.82,0.95,0.90,0.60,0.42,0.40,0.46,0.55,0.62,0.66,0.64,0.58,0.50,0.42,0.34,0.28,0.22,0.18],
      prog: [0.10,0.10,0.10,0.10,0.10,0.10,0.10,0.10,0.11,0.11,0.12,0.13,0.15,0.18,0.28,0.42,0.58,0.72,0.84,0.90,0.88,0.80,0.68,0.54,0.40,0.28,0.18,0.12],
      inh:  [0.20,0.24,0.30,0.38,0.44,0.50,0.54,0.56,0.56,0.54,0.52,0.50,0.46,0.40,0.34,0.36,0.42,0.50,0.58,0.62,0.60,0.54,0.46,0.38,0.30,0.26,0.22,0.20]
    };
    var STROKE = { fsh: 'var(--a9-fsh)', lh: 'var(--a9-lh)', e2: 'var(--a9-e2)', prog: 'var(--a9-prog)', inh: 'var(--a9-inh)' };
    var DASH = { fsh: '', lh: '', e2: '', prog: '', inh: '6 5' };
    var WIDTH = { fsh: 3, lh: 3.4, e2: 3.4, prog: 3, inh: 2.2 };

    function smoothPath(arr) {
      var pts = arr.map(function (v, i) { return [X(i + 1), Y(v)]; });
      var d = 'M ' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
      for (var i = 0; i < pts.length - 1; i++) {
        var p0 = pts[i], p1 = pts[i + 1];
        var mx = (p0[0] + p1[0]) / 2;
        d += ' Q ' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) + ' ' + mx.toFixed(1) + ' ' + ((p0[1] + p1[1]) / 2).toFixed(1);
      }
      d += ' T ' + pts[pts.length - 1][0].toFixed(1) + ' ' + pts[pts.length - 1][1].toFixed(1);
      return d;
    }

    /* --- fundo: faixas de fase --- */
    var bands = [
      { from: 1, to: 5,  fill: 'var(--a9-band-mens)', label: 'menstrual' },
      { from: 5, to: 13, fill: 'var(--a9-band-foli)', label: 'folicular / proliferativa' },
      { from: 13, to: 15, fill: 'var(--a9-band-ovu)', label: 'ovulação' },
      { from: 15, to: 28, fill: 'var(--a9-band-lut)', label: 'lútea / secretora' }
    ];
    var gBands = el('g', {});
    bands.forEach(function (b) {
      var x0 = X(b.from), x1 = X(b.to);
      gBands.appendChild(el('rect', { x: x0.toFixed(1), y: padT, width: (x1 - x0).toFixed(1), height: plotH, fill: b.fill }));
      var t = el('text', { x: ((x0 + x1) / 2).toFixed(1), y: (padT - 10), 'text-anchor': 'middle', 'font-size': '13', 'font-weight': '700', fill: 'var(--ink-70)' });
      t.textContent = b.label; gBands.appendChild(t);
    });
    svg.appendChild(gBands);

    /* --- grade + eixo de dias --- */
    var gAxis = el('g', {});
    [1, 7, 14, 21, 28].forEach(function (day) {
      var x = X(day);
      gAxis.appendChild(el('line', { x1: x, y1: padT, x2: x, y2: padT + plotH, stroke: 'var(--a9-axis)', 'stroke-width': '1', 'stroke-dasharray': '2 5' }));
      var t = el('text', { x: x, y: padT + plotH + 22, 'text-anchor': 'middle', 'font-size': '13', fill: 'var(--ink-70)', 'font-family': 'var(--font-mono)' });
      t.textContent = 'dia ' + day; gAxis.appendChild(t);
    });
    gAxis.appendChild(el('line', { x1: padL, y1: padT + plotH, x2: padL + plotW, y2: padT + plotH, stroke: 'var(--a9-axis)', 'stroke-width': '1.5' }));
    svg.appendChild(gAxis);

    /* --- curvas --- */
    var order = ['inh', 'fsh', 'prog', 'lh', 'e2'];
    order.forEach(function (h) {
      var p = el('path', { d: smoothPath(SER[h]), fill: 'none', stroke: STROKE[h], 'stroke-width': WIDTH[h], 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'data-h': h });
      if (DASH[h]) p.setAttribute('stroke-dasharray', DASH[h]);
      svg.appendChild(p);
      // rótulo curto ao lado direito de cada curva
      var last = SER[h].length - 1;
      var lab = el('text', { x: (X(28) + 6), y: (Y(SER[h][last]) + 4), 'font-size': '13', 'font-weight': '700', fill: STROKE[h] });
      lab.textContent = ({ fsh: 'FSH', lh: 'LH', e2: 'E2', prog: 'P4', inh: 'inib.' })[h];
      // rótulos que caem fora da área à direita: reancorar à esquerda do fim
      lab.setAttribute('x', (X(28) - 2).toFixed(1)); lab.setAttribute('text-anchor', 'end');
      svg.appendChild(lab);
    });

    /* --- marcador do limiar ≥200 pg/mL ANCORADO na curva do ESTRADIOL (dia 12, pico) ---
       smoothPath desenha Bézier de midpoint: o ponto de dado é PONTO DE CONTROLE, não vértice
       on-curve — no pico o traço renderizado passa abaixo do dado cru e o marcador flutuava.
       Ancoro o círculo no ponto SOBRE a curva no dia-pico: B(0.5)=¼·S+½·C+¼·E do segmento cujo
       controle é o pico (S/E = midpoints com os vizinhos). Puro reposicionamento visual — nenhum
       valor de SER.e2 é alterado (o dia-pico e o ≥200 pg/mL permanecem intocados). */
    var e2peakDay = 12;
    function e2OnCurve(day) {
      var j = day - 1;
      var C = [X(day), Y(SER.e2[j])];
      var S = [(X(day - 1) + C[0]) / 2, (Y(SER.e2[j - 1]) + C[1]) / 2];
      var E = [(C[0] + X(day + 1)) / 2, (C[1] + Y(SER.e2[j + 1])) / 2];
      return [0.25 * S[0] + 0.5 * C[0] + 0.25 * E[0], 0.25 * S[1] + 0.5 * C[1] + 0.25 * E[1]];
    }
    var e2pt = e2OnCurve(e2peakDay), mx = e2pt[0], my = e2pt[1];
    var gMark = el('g', {});
    gMark.appendChild(el('circle', { cx: mx, cy: my, r: 6.5, fill: 'none', stroke: 'var(--a9-e2)', 'stroke-width': '2.5' }));
    gMark.appendChild(el('circle', { cx: mx, cy: my, r: 2.5, fill: 'var(--a9-e2)' }));
    gMark.appendChild(el('line', { x1: mx, y1: my, x2: mx + 40, y2: my - 34, stroke: 'var(--a9-e2)', 'stroke-width': '1.5' }));
    var mlbl = el('text', { x: mx + 44, y: my - 40, 'font-size': '14', 'font-weight': '800', fill: 'var(--a9-e2)' });
    mlbl.textContent = '≥200 pg/mL · ~48-50h';
    gMark.appendChild(mlbl);
    var msub = el('text', { x: mx + 44, y: my - 24, 'font-size': '12', 'font-weight': '600', fill: 'var(--a9-e2)' });
    msub.textContent = 'do estradiol — a banca inverte p/ LH';
    gMark.appendChild(msub);
    svg.appendChild(gMark);

    /* --- cursor de scrub --- */
    var gCur = el('g', {});
    var curLine = el('line', { x1: X(13), y1: padT, x2: X(13), y2: padT + plotH, stroke: 'var(--rose)', 'stroke-width': '2' });
    gCur.appendChild(curLine);
    var curDot = el('circle', { cx: X(13), cy: padT, r: 5, fill: 'var(--rose)' });
    gCur.appendChild(curDot);
    svg.appendChild(gCur);

    /* --- readout (DOM) --- */
    var dEl = box.querySelector('.a9-ciclo__day .d');
    var phEl = box.querySelector('.a9-ciclo__day .ph b') || box.querySelector('.a9-ciclo__day .ph');
    var ovaEl = box.querySelector('[data-phase="ovariana"]');
    var uteEl = box.querySelector('[data-phase="uterina"]');
    var hEls = {
      fsh: box.querySelector('.a9-ciclo__h[data-h="fsh"] .hv'),
      lh: box.querySelector('.a9-ciclo__h[data-h="lh"] .hv'),
      e2: box.querySelector('.a9-ciclo__h[data-h="e2"] .hv'),
      prog: box.querySelector('.a9-ciclo__h[data-h="prog"] .hv')
    };
    var noteEl = box.querySelector('.a9-ciclo__note');

    function info(day) {
      var d = Math.round(day), o;
      if (d <= 5) o = { fase: 'Fase menstrual', ova: 'Recrutamento — o FSH (que subiu no fim do ciclo anterior) afina a coorte folicular', ute: 'Menstrual — descamação, endométrio fino',
        fsh: 'alto, recrutando a coorte', lh: 'baixo', e2: 'baixo, começando a subir', prog: 'baixa (o corpo lúteo do ciclo anterior já regrediu)', note: '' };
      else if (d <= 9) o = { fase: 'Fase folicular', ova: 'Um folículo dominante emerge (mais receptores de FSH, sobrevive à queda)', ute: 'Proliferativa inicial — glândulas alongam, endométrio saindo do fino',
        fsh: 'CAINDO — feedback negativo do estradiol', lh: 'baixo', e2: 'subindo (os folículos produzem)', prog: 'basal', note: '' };
      else if (d <= 12) o = { fase: 'Folicular tardia (pré-ovulatória)', ova: 'Folículo dominante pré-ovulatório', ute: 'Proliferativa tardia — aspecto TRILAMINAR (beira de ovular)',
        fsh: 'baixo', lh: 'começando a subir', e2: 'PICO pré-ovulatório — ≥200 pg/mL sustentado ~48-50h', prog: 'basal',
        note: 'O ≥200 pg/mL × ~48-50h é do ESTRADIOL — o gatilho. A banca inverte e atribui ao LH: não caia.' };
      else if (d === 13) o = { fase: 'O disparo', ova: 'O feedback inverte (− → +): o estradiol sustentado dispara o pico de LH', ute: 'Proliferativa tardia — trilaminar, prestes a ovular',
        fsh: 'pequeno pico junto com o LH', lh: 'subindo ao pico', e2: 'pico ≥200 pg/mL sustentado — o gatilho', prog: 'basal',
        note: 'Sem pico de estradiol → sem pico de LH → sem ovulação. O número (≥200 pg/mL) é do estradiol.' };
      else if (d === 14) o = { fase: 'Ovulação', ova: 'O folículo rompe — ~32-36h após o início do aumento do LH / ~10-12h após o pico', ute: 'Transição proliferativa → secretora',
        fsh: 'pequeno pico periovulatório', lh: 'PICO — o divisor do ciclo (LH = liberador de óvulo)', e2: 'caindo do pico', prog: 'começando a subir', note: '' };
      else if (d <= 20) o = { fase: 'Fase lútea', ova: 'Corpo lúteo (folículo roto) — prepara para a gestação', ute: 'Secretora — glândulas tortuosas, endométrio espesso/ecogênico (já ovulou)',
        fsh: 'baixo — a progesterona inibe', lh: 'baixo — a progesterona inibe', e2: '2ª elevação (lútea)', prog: 'SUBINDO ao pico', note: '' };
      else if (d <= 24) o = { fase: 'Fase lútea (pico)', ova: 'Corpo lúteo maduro — inibina A (after) na segunda fase', ute: 'Secretora — terreno pronto para implantação',
        fsh: 'baixo', lh: 'baixo', e2: 'elevado (lútea)', prog: 'PICO (~dia 21) — marca de que ovulou', note: '' };
      else o = { fase: 'Lútea tardia (regressão)', ova: 'Sem hCG → o corpo lúteo REGRIDE (vira corpo albicans)', ute: 'Secretora tardia — sem embrião, prestes a descamar e reiniciar',
        fsh: 'voltando a subir — reinicia o ciclo', lh: 'baixo', e2: 'caindo', prog: 'caindo (regressão)', note: '' };
      return o;
    }

    function setDay(day) {
      day = Math.max(1, Math.min(D, Math.round(day)));
      var x = X(day);
      curLine.setAttribute('x1', x); curLine.setAttribute('x2', x);
      curDot.setAttribute('cx', x);
      var o = info(day);
      if (dEl) dEl.textContent = 'dia ' + day;
      if (phEl) phEl.textContent = o.fase;
      if (ovaEl) ovaEl.textContent = o.ova;
      if (uteEl) uteEl.textContent = o.ute;
      if (hEls.fsh) hEls.fsh.textContent = o.fsh;
      if (hEls.lh) hEls.lh.textContent = o.lh;
      if (hEls.e2) hEls.e2.textContent = o.e2;
      if (hEls.prog) hEls.prog.textContent = o.prog;
      if (noteEl) { if (o.note) { noteEl.textContent = o.note; noteEl.style.display = ''; } else { noteEl.style.display = 'none'; } }
      box.setAttribute('data-day', String(day));
      if (svg) {
        svg.setAttribute('aria-valuenow', String(day));
        svg.setAttribute('aria-valuetext', 'dia ' + day + ' — ' + o.fase);
      }
    }

    function dayFromEvent(clientX) {
      var rect = svg.getBoundingClientRect();
      var scale = W / rect.width;
      var vx = (clientX - rect.left) * scale;
      var day = 1 + ((vx - padL) / plotW) * (D - 1);
      return day;
    }

    var dragging = false;
    function onDown(e) { dragging = true; var cx = e.touches ? e.touches[0].clientX : e.clientX; setDay(dayFromEvent(cx)); if (e.cancelable && e.touches) e.preventDefault(); }
    function onMove(e) { if (!dragging) return; var cx = e.touches ? e.touches[0].clientX : e.clientX; setDay(dayFromEvent(cx)); if (e.cancelable && e.touches) e.preventDefault(); }
    function onUp() { dragging = false; }
    svg.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    svg.addEventListener('touchstart', onDown, { passive: false });
    svg.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
    // clique simples também posiciona
    svg.addEventListener('click', function (e) { setDay(dayFromEvent(e.clientX)); });
    // teclado: setas movem o cursor (a11y)
    svg.setAttribute('tabindex', '0');
    svg.setAttribute('role', 'slider');
    svg.setAttribute('aria-label', 'Arraste ao longo do ciclo (dias 1 a 28) para ver o que cada hormônio faz e a fase correspondente');
    svg.setAttribute('aria-valuemin', '1'); svg.setAttribute('aria-valuemax', '28');
    svg.addEventListener('keydown', function (e) {
      var cur = parseInt(box.getAttribute('data-day') || '13', 10);
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { setDay(cur + 1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { setDay(cur - 1); e.preventDefault(); }
    });

    setDay(13); // default: o momento do disparo (estradiol → LH) — setDay sincroniza aria-valuenow/-valuetext em ponteiro, toque, clique e teclado
  })();

  /* ============ 4. obj-corredor-casos-gineco — Caso 2 · RAFAELA (ABRE P1 / FECHA P9) ========= */
  /* A9 é ILHA: namespace PRÓPRIO go-a9-corredor. NÃO lê go-a7/go-a8, NÃO herda a Lurdinha. */
  (function corredor() {
    var elc = document.querySelector('.a9-caso[data-corredor]');
    if (!elc) return;
    var A9 = 'go-a9-corredor';
    var stage = elc.getAttribute('data-corredor') || 'abre';
    var state = {};
    try { state = JSON.parse(localStorage.getItem(A9) || '{}'); } catch (_) { state = {}; }
    state.caso = 'Rafaela';
    state.numero = 2;
    state.ficha = '12a · menarca 11a · ciclos 20–50d / 3–10d · nega sexarca · exame normal · hemograma e coagulograma normais';
    if (stage === 'abre') {
      state.estado = 'aberto';
      state.hipotese = 'imaturidade / descontrole do eixo (padrão anovulatório)';
    } else if (stage === 'fecha') {
      state.estado = 'resolvido';
      state.diagnostico = 'sangramento anovulatório NÃO estrutural por imaturidade do eixo (normaliza em ~2 anos)';
      state.conduta = 'registrar e tranquilizar; ACO opcional (regulariza + contracepção, não necessário sem vida sexual ativa); reavaliar';
      state.ponte = 'base fisiológica para Gineco 4 (amenorreia/SOP/contracepção) e Gineco 5 (sangramento estrutural)';
      elc.classList.add('is-resolved');
    }
    try { localStorage.setItem(A9, JSON.stringify(state)); } catch (_) {}
    var meta = elc.querySelector('[data-corredor-meta]');
    if (meta) {
      meta.textContent = stage === 'fecha'
        ? 'estado: resolvido · Caso 2 decodificado (fecha o Corredor gineco · fecha o bookend)'
        : 'estado: aberto · Caso 2 novo no Corredor gineco · decodificação prometida (paga em P9)';
    }
  })();
})();
