/* aula-01-interactive.js — wiring vanilla das interações bespoke da Aula 1 (Câncer de Esôfago).
   Espelha o padrão de bexiga-interactive.js / rim-interactive.js: IIFE auto-init, idempotente,
   click + teclado (Enter/Space/setas) + pointer, ZERO hex (só var(--token) via setAttribute),
   prefers-reduced-motion respeitado pelo CSS (transições) — aqui o JS só muda estado.
   Cada SVG ensina sozinho no fallback estático; o JS aprofunda.

   eso2  (p2)  hotspot por terço → revela mecanismo externo/interno + acid wash no distal
   eso3  (p3)  hotspot por fator de risco → realça desfecho (escamoso/adeno) + sinergia tabaco+álcool
   eso4  (p4)  slider/step 0–3 da disfagia progressiva (sólido→saliva); curva benigna fica de contraste
   eso6  (p6)  hotspot por camada → na adventícia dispara o vetor de invasão do mediastino (punch)
   eso7  (p7)  step-through T1→T4 no USE; tumor cresce em raio, rompe o último anel em T4
   eso8  (p8)  escada de conduta T1a→cirurgia→paliação; acende elos + mini-parede de profundidade
   eso9  (p9)  step-through 1→4 acumulativo da reconstrução (esôfago→tubo gástrico→ascensão→anastomose)
   eso10 (p10) hotspot por estrutura → veredicto T4a (verde, ressecável) × T4b (vermelho, irressecável)

   Região aria-live: usa .figure-svg__stage[aria-live] do wrapper; se faltar, cria .eso-live. */

(function () {
  'use strict';
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var isKey = function (e) { return e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar'; };

  /* Torna um elemento acionável por click + teclado (idempotente). */
  function activable(el, handler) {
    if (!el || el.dataset.act === '1') return;
    el.dataset.act = '1';
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
    el.addEventListener('click', handler);
    el.addEventListener('keydown', function (e) { if (isKey(e)) { e.preventDefault(); handler(e); } });
  }

  /* Navegação por setas entre um grupo de alvos (roving focus). */
  function arrowNav(items) {
    items.forEach(function (it, i) {
      it.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
      });
    });
  }

  /* Região aria-live: reaproveita a stage live do wrapper; senão cria uma. */
  function liveFor(svg) {
    var stage = svg.closest ? svg.closest('.figure-svg__stage') : null;
    if (stage && stage.getAttribute('aria-live')) {
      var hidden = stage.querySelector('.eso-live');
      if (!hidden) {
        hidden = document.createElement('span');
        hidden.className = 'eso-live';
        hidden.style.position = 'absolute';
        hidden.style.width = '1px'; hidden.style.height = '1px';
        hidden.style.overflow = 'hidden'; hidden.style.clip = 'rect(0 0 0 0)';
        stage.appendChild(hidden);
      }
      return hidden;
    }
    var fig = svg.closest ? svg.closest('.figure-svg') : svg.parentElement;
    if (!fig) return null;
    var live = fig.querySelector('.eso-live');
    if (!live) {
      live = document.createElement('p');
      live.className = 'eso-live';
      live.setAttribute('aria-live', 'polite');
      live.setAttribute('role', 'status');
      live.style.position = 'absolute';
      live.style.width = '1px'; live.style.height = '1px';
      live.style.overflow = 'hidden'; live.style.clip = 'rect(0 0 0 0)';
      fig.appendChild(live);
    }
    return live;
  }

  /* ===== eso2 (p2) — terços do esôfago × mecanismo externo/interno ===== */
  function initEso2(root) {
    var svg = $('.il-eso2', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var thirds = $$('.eso2-third', svg);
    var mechs = $$('.eso2-mech', svg);
    var wash = $('.eso2-acidwash', svg);
    var status = $('.eso2-status', svg);
    var MSG = {
      proximal: 'Terço proximal: carcinoma escamoso, agressão externa (tabaco, álcool, bebida quente).',
      medio: 'Terço médio: carcinoma escamoso, o mais comum no Brasil; agressão externa.',
      distal: 'Terço distal e transição esofagogástrica: adenocarcinoma, agressão ácida interna (refluxo → Barrett).'
    };
    function mechHas(g, key) {
      var d = (g.getAttribute('data-mech') || '').split(/\s+/);
      return d.indexOf(key) !== -1;
    }
    function select(t) {
      var key = t.getAttribute('data-third');
      thirds.forEach(function (x) { x.setAttribute('aria-pressed', String(x === t)); });
      mechs.forEach(function (g) {
        var on = mechHas(g, key);
        g.classList.toggle('is-on', on);
        g.setAttribute('opacity', on ? '1' : '0');
      });
      if (wash) { var d = key === 'distal'; wash.classList.toggle('is-on', d); wash.setAttribute('opacity', d ? '0.85' : '0'); }
      if (status) status.textContent = key === 'distal'
        ? 'Distal: adenocarcinoma — o ácido sobe de dentro.'
        : 'Proximal / médio: escamoso — a agressão chega de fora.';
      if (live) live.textContent = MSG[key] || '';
    }
    thirds.forEach(function (t) {
      activable(t, function () { select(t); });
      t.addEventListener('focus', function () { select(t); });
    });
    arrowNav(thirds);
  }

  /* ===== eso3 (p3) — fatores de risco → desfecho escamoso/adeno ===== */
  function initEso3(root) {
    var svg = $('.il-eso3', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var factors = $$('.eso3-factor', svg);
    var outcomes = {
      ext: svg.querySelector('[data-outcome="ext"]') || null,
      int: svg.querySelector('[data-outcome="int"]') || null
    };
    var picked = { tabaco: false, alcool: false };
    function dimSide(activeSide) {
      factors.forEach(function (f) {
        var same = f.getAttribute('data-side') === activeSide;
        f.classList.toggle('is-dim', activeSide && !same);
      });
    }
    function synergy() {
      var both = picked.tabaco && picked.alcool;
      factors.forEach(function (f) {
        var k = f.getAttribute('data-factor');
        if (k === 'tabaco' || k === 'alcool') {
          var r = f.querySelector('rect');
          if (r) r.setAttribute('stroke', both ? 'var(--coral-50)' : 'var(--border-soft)');
          if (r) r.setAttribute('stroke-width', both ? '2.4' : '1.2');
        }
      });
      if (both && live) live.textContent = 'Tabaco + álcool: sinergia multiplicativa para carcinoma escamoso.';
      return both;
    }
    function select(f) {
      var key = f.getAttribute('data-factor');
      var side = f.getAttribute('data-side');
      factors.forEach(function (x) { x.setAttribute('aria-pressed', String(x === f)); });
      dimSide(side);
      if (outcomes.ext) outcomes.ext.classList.toggle('is-on', side === 'ext');
      if (outcomes.int) outcomes.int.classList.toggle('is-on', side === 'int');
      if (key === 'tabaco') picked.tabaco = true;
      if (key === 'alcool') picked.alcool = true;
      var syn = synergy();
      if (live && !syn) live.textContent = f.getAttribute('aria-label') || '';
    }
    factors.forEach(function (f) {
      activable(f, function () { select(f); });
      f.addEventListener('focus', function () { select(f); });
    });
    arrowNav(factors);
  }

  /* ===== eso4 (p4) — disfagia progressiva (step/slider 0–3) ===== */
  function initEso4(root) {
    var svg = $('.il-eso4', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var stops = $$('.eso4-stop', svg);
    var cursor = $('.eso4-cursor', svg);
    var capT = $('.eso4-cap-title', svg);
    var capB = $('.eso4-cap-body', svg);
    var X = [190, 340, 500, 620];
    var TITLE = ['Disfagia para sólidos', 'Disfagia para pastosos', 'Disfagia para líquidos', 'Afagia — nem saliva'];
    function select(idx) {
      idx = Math.max(0, Math.min(3, idx));
      stops.forEach(function (s) {
        var on = +s.getAttribute('data-stop') === idx;
        s.setAttribute('aria-pressed', String(on));
        s.classList.toggle('is-on', on);
      });
      if (cursor) { cursor.setAttribute('x1', String(X[idx])); cursor.setAttribute('x2', String(X[idx])); cursor.setAttribute('opacity', '0.9'); }
      if (capT) capT.textContent = TITLE[idx];
      var lab = stops[idx] ? (stops[idx].getAttribute('aria-label') || '') : '';
      if (capB) capB.textContent = 'A curva maligna só desce — fase ' + (idx + 1) + ' de 4.';
      if (live) live.textContent = lab;
    }
    stops.forEach(function (s) {
      activable(s, function () { select(+s.getAttribute('data-stop')); });
      s.addEventListener('focus', function () { select(+s.getAttribute('data-stop')); });
    });
    arrowNav(stops);
    /* arraste pelo trilho: clique no SVG move para o stop mais próximo no eixo X */
    svg.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.eso4-stop')) return;
      var r = svg.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width * 760;
      var best = 0, bd = Infinity;
      X.forEach(function (xv, i) { var d = Math.abs(px - xv); if (d < bd) { bd = d; best = i; } });
      select(best);
    });
  }

  /* ===== eso6 (p6) — parede sem serosa: camada → invasão do mediastino ===== */
  function initEso6(root) {
    var svg = $('.il-eso6', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var layers = $$('.eso6-layer', svg);
    var invasion = $('.eso6-invasion', svg);
    var status = $('.eso6-status', svg);
    function select(l) {
      var key = l.getAttribute('data-layer');
      layers.forEach(function (x) { x.setAttribute('aria-pressed', String(x === l)); x.classList.toggle('is-on', x === l); });
      var adv = key === 'adventicia';
      if (invasion) { invasion.classList.toggle('is-on', adv); invasion.setAttribute('opacity', adv ? '1' : '0'); }
      if (status) status.textContent = adv
        ? 'Sem serosa: depois da adventícia, o tumor atinge o mediastino por contiguidade.'
        : 'Camada selecionada — avance até a adventícia para ver a invasão.';
      if (live) live.textContent = l.getAttribute('aria-label') || '';
    }
    layers.forEach(function (l) {
      activable(l, function () { select(l); });
      l.addEventListener('focus', function () { select(l); });
    });
    arrowNav(layers);
  }

  /* ===== eso7 (p7) — USE: step-through T1→T4 (tumor cresce, rompe anel em T4) ===== */
  function initEso7(root) {
    var svg = $('.il-eso7', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var steps = $$('.eso7-step', svg);
    var tumor = $('.eso7-tumor', svg);
    var readT = $('.eso7-readout-t', svg);
    var readB = $('.eso7-readout-b', svg);
    /* raio interno do setor por T: quanto mais fundo, menor o raio interno (mais invasão) */
    var GEOM = {
      T1: { ri: 150, outer: 174, color: 'var(--coral-60)' },
      T2: { ri: 124, outer: 174, color: 'var(--coral-60)' },
      T3: { ri: 106, outer: 174, color: 'var(--coral-60)' },
      T4: { ri: 80, outer: 174, color: 'var(--coral-60)' }
    };
    var READOUT = {
      T1: ['T1 · mucosa / submucosa', 'A sombra hipoecogênica fica nos anéis internos: mucosa (T1a) ou submucosa (T1b). A parede ainda contém o tumor.'],
      T2: ['T2 · muscular própria', 'A sombra invade o anel da muscular própria. Já não é superficial, mas a parede ainda não foi rompida.'],
      T3: ['T3 · adventícia', 'A sombra alcança o último anel, a adventícia. É a camada mais externa do esôfago — não há serosa depois dela.'],
      T4: ['T4 · estruturas adjacentes', 'A sombra rompe o último anel: o tumor saiu da parede e invade estruturas vizinhas. T4 muda a estratégia.']
    };
    function arcPath(ri, outer) {
      /* setor superior centrado no topo, espelhando o path original (ângulo ~ ±17°) */
      var x = 52, yOuter = -outer, yInner = -ri, xi = Math.round(36 * ri / 150);
      return 'M -' + x + ' ' + yOuter + ' A ' + outer + ' ' + outer + ' 0 0 1 ' + x + ' ' + yOuter +
             ' L ' + xi + ' ' + yInner + ' A ' + ri + ' ' + ri + ' 0 0 0 -' + xi + ' ' + yInner + ' Z';
    }
    function apply(st) {
      var g = GEOM[st];
      steps.forEach(function (s) {
        var on = s.getAttribute('data-eso7-step') === st;
        s.setAttribute('aria-pressed', String(on));
        s.classList.toggle('is-on', on);
        s.style.opacity = on ? '1' : '0.5';
      });
      if (tumor && g) {
        tumor.setAttribute('data-eso7-depth', st);
        tumor.setAttribute('d', arcPath(g.ri, g.outer));
        tumor.setAttribute('fill', g.color);
        tumor.classList.toggle('is-break', st === 'T4');
      }
      var r = READOUT[st];
      if (readT) { readT.textContent = r[0]; readT.setAttribute('fill', st === 'T4' ? 'var(--coral-60)' : 'var(--teal-60)'); }
      if (readB) readB.textContent = r[1];
      if (live) live.textContent = r[0] + '. ' + r[1];
    }
    steps.forEach(function (s) {
      activable(s, function () { apply(s.getAttribute('data-eso7-step')); });
      s.addEventListener('focus', function () { apply(s.getAttribute('data-eso7-step')); });
    });
    arrowNav(steps);
    apply('T1');
  }

  /* ===== eso8 (p8) — escada de conduta por profundidade ===== */
  function initEso8(root) {
    var svg = $('.il-eso8', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var steps = $$('.eso8-step', svg);
    var links = $$('.eso8-link', svg);
    var minis = $$('.eso8-mini', svg);
    var status = $('.eso8-status', svg);
    /* até qual elo acende e quais minis pintar por degrau */
    var STAGE = {
      'T1a': { links: 0, mini: ['mucosa'], msg: 'T1a, restrito à mucosa: ressecção endoscópica preserva o órgão.' },
      'cirurgia': { links: 1, mini: ['mucosa', 'submucosa', 'muscular'], msg: 'T1b, T2 ou T3: esofagectomia, em geral após quimiorradioterapia neoadjuvante.' },
      'paliacao': { links: 2, mini: ['mucosa', 'submucosa', 'muscular', 'alem'], msg: 'T4b ou metástase: paliação — prótese, QRT paliativa, suporte nutricional.' }
    };
    function apply(st) {
      var cfg = STAGE[st];
      steps.forEach(function (s) {
        var on = s.getAttribute('data-eso8-step') === st;
        s.setAttribute('aria-pressed', String(on));
        s.classList.toggle('is-on', on);
        s.style.opacity = on ? '1' : '0.55';
      });
      links.forEach(function (lk) {
        var on = +lk.getAttribute('data-link') <= cfg.links;
        lk.classList.toggle('is-on', on);
        lk.setAttribute('opacity', on ? '1' : '0.18');
      });
      minis.forEach(function (m) {
        var on = cfg.mini.indexOf(m.getAttribute('data-mini')) !== -1;
        m.classList.toggle('is-on', on);
        m.setAttribute('fill', on ? 'var(--coral-60)' : 'var(--bg-elevated-2)');
      });
      if (status) status.textContent = cfg.msg;
      var active = steps.filter(function (s) { return s.getAttribute('data-eso8-step') === st; })[0];
      if (live) live.textContent = (active && active.getAttribute('aria-label')) || cfg.msg;
    }
    steps.forEach(function (s) {
      activable(s, function () { apply(s.getAttribute('data-eso8-step')); });
      s.addEventListener('focus', function () { apply(s.getAttribute('data-eso8-step')); });
    });
    arrowNav(steps);
    apply('T1a');
  }

  /* ===== eso9 (p9) — reconstrução: reveal acumulado 1→4 ===== */
  function initEso9(root) {
    var svg = $('.il-eso9', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var stages = $$('.eso9-stage', svg);
    var esophagus = $('.eso9-esophagus', svg);
    var stepN = $('.eso9-step-n', svg);
    var stepTxt = $('.eso9-step-txt', svg);
    var ctrl = svg.closest('.figure-svg') ? svg.closest('.figure-svg').querySelector('[data-eso9-ctl]') : null;
    var TXT = {
      1: 'Ressecção do esôfago doente entre as linhas de secção, deixando o coto cervical.',
      2: 'Tubuliza-se a grande curvatura do estômago, mantendo viva a artéria gastroepiploica direita como pedículo.',
      3: 'O tubo gástrico ascende pelo mediastino em direção ao pescoço; o esôfago doente já saiu.',
      4: 'Anastomose cervical: o tubo se costura ao coto e o trânsito entre boca e estômago é restabelecido.'
    };
    var cur = 1;
    function apply(n) {
      cur = Math.max(1, Math.min(4, n));
      stages.forEach(function (g) {
        var s = +g.getAttribute('data-eso9-stage');
        g.setAttribute('opacity', s <= cur ? '1' : '0');
        g.classList.toggle('is-on', s <= cur);
      });
      if (esophagus) esophagus.setAttribute('opacity', cur >= 3 ? '0.35' : '1'); /* esmaece ao ascender */
      if (stepN) stepN.textContent = 'Etapa ' + cur + ' de 4';
      if (stepTxt) stepTxt.textContent = TXT[cur];
      if (live) live.textContent = 'Etapa ' + cur + ' de 4: ' + TXT[cur];
      if (ctrl) {
        var prev = ctrl.querySelector('[data-eso9-prev]');
        var next = ctrl.querySelector('[data-eso9-next]');
        if (prev) prev.disabled = cur <= 1;
        if (next) next.disabled = cur >= 4;
      }
    }
    if (ctrl) {
      var prev = ctrl.querySelector('[data-eso9-prev]');
      var next = ctrl.querySelector('[data-eso9-next]');
      if (prev) prev.addEventListener('click', function () { apply(cur - 1); });
      if (next) next.addEventListener('click', function () { apply(cur + 1); });
    }
    /* clicar uma etapa já revelada/futura também salta para ela */
    stages.forEach(function (g) {
      activable(g, function () { apply(+g.getAttribute('data-eso9-stage')); });
    });
    apply(1);
  }

  /* ===== eso10 (p10) — ressecável × irressecável (T4a × T4b) ===== */
  function initEso10(root) {
    var svg = $('.il-eso10', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var structs = $$('.eso10-struct', svg);
    var spot = $('.eso10-spot', svg);
    var vT = $('.eso10-verdict-t', svg);
    var vT2 = $('.eso10-verdict-t2', svg);
    var vB = $('.eso10-verdict-b', svg);
    /* centro aproximado de cada estrutura para posicionar o glow */
    var CENTER = {
      pleura: [185, 190], pericardio: [300, 175], diafragma: [300, 400],
      aorta: [380, 230], traqueia: [250, 195], bronquio: [370, 320], vertebra: [300, 369]
    };
    function select(s) {
      var key = s.getAttribute('data-eso10-struct');
      var cls = s.getAttribute('data-eso10-class'); /* resec | irresec */
      var resec = cls === 'resec';
      structs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === s)); x.classList.toggle('is-on', x === s); });
      if (spot && CENTER[key]) {
        spot.setAttribute('cx', String(CENTER[key][0]));
        spot.setAttribute('cy', String(CENTER[key][1]));
        spot.setAttribute('opacity', '0.9');
        spot.setAttribute('fill', resec ? 'var(--ok-green-dim)' : 'var(--err-red-dim)');
      }
      if (vT) { vT.textContent = resec ? 'T4a' : 'T4b'; vT.setAttribute('fill', resec ? 'var(--ok-green)' : 'var(--err-red)'); }
      if (vT2) { vT2.textContent = resec ? 'ressecável' : 'irressecável'; vT2.setAttribute('fill', resec ? 'var(--ok-green)' : 'var(--err-red)'); }
      if (vB) vB.textContent = s.getAttribute('aria-label') || '';
      if (live) live.textContent = s.getAttribute('aria-label') || '';
    }
    structs.forEach(function (s) {
      activable(s, function () { select(s); });
      s.addEventListener('focus', function () { select(s); });
    });
    arrowNav(structs);
  }

  /* ===== eso1 (p1) — mapa do caso: três pistas → conclusão (hotspot exclusivo) ===== */
  function initEso1(root) {
    var svg = $('.il-eso1', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var clues = $$('.eso1-clue', svg);
    var links = $$('.eso1-link', svg);
    var targets = $$('.eso1-target', svg);
    var status = $('.eso1-status', svg);
    var MSG = {
      tilose: 'Tilose: queratodermia palmoplantar hereditária — aponta o tipo histológico escamoso.',
      disfagia: 'Disfagia progressiva de sólidos para líquidos — aponta obstrução mecânica da luz.',
      perda: 'Perda de 20 quilos em 3 meses — aponta doença consumptiva avançada.'
    };
    function select(c) {
      var key = c.getAttribute('data-clue');
      clues.forEach(function (x) { x.setAttribute('aria-pressed', String(x === c)); });
      links.forEach(function (lk) { var on = lk.getAttribute('data-link') === key; lk.setAttribute('opacity', on ? '1' : '0.18'); });
      targets.forEach(function (t) { var on = t.getAttribute('data-target') === key; t.setAttribute('opacity', on ? '1' : '0.4'); });
      if (status) status.textContent = key === 'tilose'
        ? 'A tilose é a única pista que entrega o tipo escamoso.'
        : MSG[key] || '';
      if (live) live.textContent = MSG[key] || '';
    }
    clues.forEach(function (c) {
      activable(c, function () { select(c); });
      c.addEventListener('focus', function () { select(c); });
    });
    arrowNav(clues);
    select(clues.filter(function (c) { return c.getAttribute('data-clue') === 'tilose'; })[0] || clues[0]);
  }

  /* ===== eso12 (p12) — matriz das 5 armadilhas (hotspot exclusivo) ===== */
  function initEso12(root) {
    var svg = $('.il-eso12', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var traps = $$('.eso12-trap', svg);
    var status = $('.eso12-status', svg);
    function select(t) {
      traps.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-pressed', String(on));
        var w = x.querySelector('.eso12-wrong');
        var r = x.querySelector('.eso12-right');
        if (w) w.setAttribute('opacity', on ? '1' : '0');
        if (r) r.setAttribute('opacity', on ? '1' : '0');
      });
      if (status) status.textContent = (t.getAttribute('aria-label') || '').replace(/^Armadilha [^.]*\. /, '');
      if (live) live.textContent = t.getAttribute('aria-label') || '';
    }
    traps.forEach(function (t) {
      activable(t, function () { select(t); });
      t.addEventListener('focus', function () { select(t); });
    });
    arrowNav(traps);
    select(traps.filter(function (t) { return t.getAttribute('data-trap') === 'relogio'; })[0] || traps[0]);
  }

  /* Helper genérico de step-through cumulativo com step-ctl externo (prev/next + contador).
     Acende grupos [data-step] <= passo atual; idempotente; teclado pelos próprios botões. */
  function initStepThrough(root, sel, ctlId, noun, max) {
    var svg = $(sel, root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var fig = svg.closest('.figure-svg');
    var ctl = fig ? fig.querySelector('[data-step-ctl="' + ctlId + '"]') : null;
    var prev = ctl ? ctl.querySelector('[data-step-prev]') : null;
    var next = ctl ? ctl.querySelector('[data-step-next]') : null;
    var count = ctl ? ctl.querySelector('[data-step-count]') : null;
    var groups = $$('[data-step]', svg);
    var status = $('[class$="-status"]', svg);
    var cur = 1;
    function apply(n) {
      cur = Math.max(1, Math.min(max, n));
      groups.forEach(function (g) {
        var s = +g.getAttribute('data-step');
        var on = s <= cur;
        g.setAttribute('opacity', on ? '1' : '0.16');
        g.classList.toggle('is-on', on);
      });
      svg.setAttribute('data-step', String(cur));
      if (count) count.textContent = noun + ' ' + cur + ' de ' + max;
      if (prev) prev.disabled = cur <= 1;
      if (next) next.disabled = cur >= max;
      var msg = noun.charAt(0).toUpperCase() + noun.slice(1) + ' ' + cur + ' de ' + max + '.';
      if (status) status.textContent = msg;
      if (live) live.textContent = msg;
    }
    if (prev) prev.addEventListener('click', function () { apply(cur - 1); });
    if (next) next.addEventListener('click', function () { apply(cur + 1); });
    apply(1);
  }

  /* eso5 (p5) — portões da biópsia (4 passos) · eso11 (p11) — cadeia (5 elos) */
  function initEso5(root)  { initStepThrough(root, '.il-eso5',  'eso5',  'passo', 4); }
  function initEso11(root) { initStepThrough(root, '.il-eso11', 'eso11', 'elo',   5); }

  function initAll(root) {
    root = root || document;
    initEso1(root); initEso2(root); initEso3(root); initEso4(root);
    initEso5(root); initEso6(root); initEso7(root); initEso8(root);
    initEso9(root); initEso10(root); initEso11(root); initEso12(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initAll(document); });
  } else { initAll(document); }

  window.Aula01Interactive = { initAll: initAll };
})();
