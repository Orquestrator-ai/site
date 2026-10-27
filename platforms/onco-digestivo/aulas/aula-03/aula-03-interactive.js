/* aula-03-interactive.js — wiring vanilla das interações bespoke da Aula 3 (Endocardite por S. bovis + CCR).
   Espelha aula-02-interactive.js: IIFE auto-init, idempotente, click + teclado (Enter/Space/setas) + pointer,
   ZERO hex (só var(--token) via setAttribute), prefers-reduced-motion respeitado pelo CSS (transições) —
   aqui o JS só muda estado. Cada SVG ensina sozinho no fallback estático; o JS aprofunda.

   ccr1  (p1)  hotspot exclusivo: o elo coração ↔ S. bovis ↔ cólon (acende arestas; bovis default aceso)
   ccr2  (p2)  step-through 1→4: linha do tempo do caso do Sr. Luiz
   ccr4  (p4)  reveal: hemocultura S. bovis → colonoscopia (a bandeira vermelha)
   ccr6  (p6)  hotspot exclusivo: balança dos fatores de risco + fibra protetora
   ccr7  (p7)  slider 40→60: janela adenoma→carcinoma e o corte etário 45/50
   ccr9  (p9)  toggle: colonoscopia diagnostica × CEA segue
   ccr10 (p10) hotspot exclusivo por órgão: fígado/pulmão hematogênico + mapa de exame (fígado default)
   ccr13 (p13) slider 1→5: régua ressecável ↔ irressecável da metástase hepática
   ccr14 (p14) decision-reveal por linha: matriz erro × correto (6 armadilhas)

   Região aria-live: usa .figure-svg__stage[aria-live] do wrapper; se faltar, cria .ccr-live. */

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
      var hidden = stage.querySelector('.ccr-live');
      if (!hidden) {
        hidden = document.createElement('span');
        hidden.className = 'ccr-live';
        hidden.style.position = 'absolute';
        hidden.style.width = '1px'; hidden.style.height = '1px';
        hidden.style.overflow = 'hidden'; hidden.style.clip = 'rect(0 0 0 0)';
        stage.appendChild(hidden);
      }
      return hidden;
    }
    var fig = svg.closest ? svg.closest('.figure-svg') : svg.parentElement;
    if (!fig) return null;
    var live = fig.querySelector('.ccr-live');
    if (!live) {
      live = document.createElement('p');
      live.className = 'ccr-live';
      live.setAttribute('aria-live', 'polite');
      live.setAttribute('role', 'status');
      live.style.position = 'absolute';
      live.style.width = '1px'; live.style.height = '1px';
      live.style.overflow = 'hidden'; live.style.clip = 'rect(0 0 0 0)';
      fig.appendChild(live);
    }
    return live;
  }

  /* ===== ccr1 (p1) — o elo (hotspot exclusivo por nó; acende arestas) ===== */
  function initCcr1(root) {
    var svg = $('.il-ccr1', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var nodes = $$('.ccr1-node', svg);
    var edges = $$('.ccr1-edge', svg);
    var status = $('.ccr1-status', svg);
    var EDGES = { coracao: ['bovis-coracao'], colon: ['colon-bovis'], bovis: ['colon-bovis', 'bovis-coracao'] };
    var MSG = {
      coracao: 'Coração: febre + sopro novo + vegetação na valva = endocardite. Mas qual bactéria? Se vier S. bovis, o coração está apontando o cólon.',
      colon: 'Cólon: o tumor ulcera e imunossuprime — abre a porta para a flora entrar no sangue. É a porta de entrada, não a vítima da bactéria.',
      bovis: 'Bovis (gallolyticus) é a ponte: o cólon doente o lança no sangue e ele cola no endocárdio. Achou bovis na endocardite → peça colonoscopia.'
    };
    function select(n) {
      var key = n.getAttribute('data-node');
      var on = EDGES[key] || [];
      nodes.forEach(function (x) {
        var sel = x === n;
        x.classList.toggle('is-on', sel);
        x.classList.toggle('is-dim', !sel);
        x.setAttribute('aria-pressed', String(sel));
      });
      edges.forEach(function (e) {
        e.classList.toggle('is-on', on.indexOf(e.getAttribute('data-edge')) !== -1);
      });
      if (status) status.textContent = MSG[key] || (n.getAttribute('aria-label') || '');
      if (live) live.textContent = MSG[key] || '';
    }
    nodes.forEach(function (n) {
      activable(n, function () { select(n); });
      n.addEventListener('focus', function () { select(n); });
    });
    arrowNav(nodes);
    select(nodes.filter(function (n) { return n.getAttribute('data-node') === 'bovis'; })[0] || nodes[0]);
  }

  /* ===== ccr4 (p4) — reveal da conduta (a bandeira vermelha) ===== */
  function initCcr4(root) {
    var svg = $('.il-ccr4', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var target = $('.ccr4-target', svg);
    var status = $('.ccr4-status', svg);
    if (!target) return;
    var MSG = 'S. bovis (gallolyticus) na endocardite = bandeira vermelha → colonoscopia obrigatória. A renomeação não muda a conduta.';
    function toggle() {
      var on = !target.classList.contains('is-revealed');
      target.classList.toggle('is-revealed', on);
      svg.classList.toggle('is-revealed', on);
      target.setAttribute('aria-pressed', String(on));
      if (status) { status.textContent = on ? MSG : ''; status.setAttribute('opacity', on ? '1' : '0'); }
      if (live) live.textContent = on ? MSG : '';
    }
    activable(target, toggle);
  }

  /* ===== ccr6 (p6) — balança dos fatores de risco (hotspot exclusivo) ===== */
  function initCcr6(root) {
    var svg = $('.il-ccr6', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var factors = $$('.ccr6-factor', svg);
    var status = $('.ccr6-status', svg);
    var MSG = {
      habitos: 'Dieta processada (defumados, nitrogenados, industrializados) + tabagismo + etilismo. Pesa no prato de risco.',
      hereditarias: 'PAF e Lynch — peso crescente em prova. A PAF, sem intervenção, quase 100% evolui para CCR.',
      polipos: 'Pólipos adenomatosos não são câncer, mas são a base da sequência adenoma → carcinoma e do rastreio.',
      dii: 'Doença inflamatória intestinal aumenta o risco; a RCU pesa MAIS que o Crohn (mucosa contínua e extensa).',
      fibra: 'Pegadinha: fibra é PROTETORA. A banca a disfarça de "dieta rica em fibras" como se fosse risco — não é.'
    };
    function select(f) {
      var key = f.getAttribute('data-factor');
      factors.forEach(function (x) {
        var on = x === f;
        x.classList.toggle('is-on', on);
        x.classList.toggle('is-dim', !on);
        x.setAttribute('aria-pressed', String(on));
      });
      if (status) status.textContent = MSG[key] || (f.getAttribute('aria-label') || '');
      if (live) live.textContent = MSG[key] || '';
    }
    factors.forEach(function (f) {
      activable(f, function () { select(f); });
      f.addEventListener('focus', function () { select(f); });
    });
    arrowNav(factors);
    /* default = nenhum (fallback estático ensina sozinho) */
  }

  /* ===== ccr10 (p10) — fígado/pulmão hematogênico (hotspot exclusivo por órgão) ===== */
  function initCcr10(root) {
    var svg = $('.il-ccr10', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var targets = $$('.ccr10-target', svg);
    var trails = $$('.ccr10-trail', svg);
    var status = $('.ccr10-status', svg);
    var MSG = {
      figado: "Fígado: principal alvo hematogênico do CCR → TC de abdome. Foi o que ficou 'pipocado' no Sr. Luiz.",
      pulmao: 'Pulmão: segundo alvo hematogênico → TC de tórax. Por isso o estadiamento a distância é TC tórax + abdome.',
      pelve: "Pelve: RM SÓ para o reto — o reto mora num 'balde' (sacro, bexiga/próstata/útero, ureteres). Avalia invasão para planejar a cirurgia, não muda a conduta. Cólon/sigmoide/reto superior não pedem RM de pelve."
    };
    function select(t) {
      var key = t.getAttribute('data-target');
      targets.forEach(function (x) {
        var on = x === t;
        x.classList.toggle('is-on', on);
        x.classList.toggle('is-dim', !on);
        x.setAttribute('aria-pressed', String(on));
      });
      trails.forEach(function (tr) { tr.classList.toggle('is-on', tr.getAttribute('data-trail') === key); });
      if (status) status.textContent = MSG[key] || (t.getAttribute('aria-label') || '');
      if (live) live.textContent = MSG[key] || '';
    }
    targets.forEach(function (t) {
      activable(t, function () { select(t); });
      t.addEventListener('focus', function () { select(t); });
    });
    arrowNav(targets);
    select(targets.filter(function (t) { return t.getAttribute('data-target') === 'figado'; })[0] || targets[0]);
  }

  /* ===== ccr14 (p14) — matriz erro × correto (decision-reveal por linha) ===== */
  function initCcr14(root) {
    var svg = $('.il-ccr14', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var rows = $$('.ccr14-row', svg);
    var status = $('.ccr14-status', svg);
    var MSG = {
      bovis: 'O bovis é MARCADOR, não causa. O câncer (imunossupressão + úlcera) é a porta; o bovis só tem tropismo pelo endocárdio.',
      fibra: 'Fibra PROTEGE. O risco está em processados, defumados, nitrogenados, tabaco.',
      neo: 'Cólon entra operando (colectomia é fácil). Só o reto baixo faz neoadjuvância QT+RT — único adeno do tubo com radioterapia.',
      miles: "Ressecção abdominoperineal = cirurgia de MILES. 'Myers' é só como soa — pegadinha de grafia.",
      idade: 'Brasil/MS: rastreio aos 50. Internacional (ACS/USPSTF): 45. Em prova nacional, responda 50.',
      m1: 'No CCR, metástase hepática RESSECÁVEL pode curar — único do tubo digestivo assim. M1 não é sempre paliação.'
    };
    function reveal(r) {
      var key = r.getAttribute('data-row');
      var wrong = r.querySelector('.ccr14-wrong');
      var right = r.querySelector('.ccr14-right');
      if (wrong) { wrong.setAttribute('fill', 'var(--err-red-dim)'); wrong.setAttribute('stroke', 'var(--err-red)'); }
      if (right) { right.setAttribute('fill', 'var(--ok-green-dim)'); right.setAttribute('stroke', 'var(--ok-green)'); }
      $$('.ccr14-right-txt', r).forEach(function (t) { t.setAttribute('fill', 'var(--ok-green)'); t.setAttribute('font-weight', '700'); });
      r.setAttribute('aria-pressed', 'true');
      r.dataset.answered = '1';
      if (status) status.textContent = MSG[key] || (r.getAttribute('aria-label') || '');
      if (live) live.textContent = MSG[key] || '';
    }
    rows.forEach(function (r) {
      activable(r, function () { reveal(r); });
      r.addEventListener('focus', function () { if (!r.dataset.answered) { /* foco apenas posiciona; revela ao acionar */ } });
    });
    arrowNav(rows);
  }

  /* ===== toggle de painel genérico (ccr9) ===== */
  function initToggle(root, sel, ctlId, sideSel, attr, msgMap) {
    var svg = $(sel, root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var fig = svg.closest('.figure-svg');
    var ctl = fig ? fig.querySelector('[data-toggle-ctl="' + ctlId + '"]') : null;
    var btns = ctl ? $$('button', ctl) : [];
    var sides = $$(sideSel, svg);
    var status = $('[class$="-status"]', svg);
    function select(key) {
      sides.forEach(function (g) { g.classList.toggle('is-dim', g.getAttribute(attr) !== key); });
      btns.forEach(function (b) {
        var on = b.getAttribute('data-key') === key;
        b.setAttribute('aria-selected', String(on));
        b.setAttribute('aria-pressed', String(on));
      });
      var msg = msgMap[key] || '';
      if (status) { status.textContent = msg; status.setAttribute('opacity', '1'); }
      if (live) live.textContent = msg;
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { select(b.getAttribute('data-key')); }); });
    arrowNav(btns);
    /* default = nenhum dim (fallback estático ensina sozinho) */
  }

  function initCcr9(root) {
    initToggle(root, '.il-ccr9', 'ccr9', '.ccr9-side', 'data-side', {
      colono: 'Colonoscopia com biópsia: vê, localiza, mede a distância à margem e fecha o diagnóstico pela histologia. Igual à EDA do esôfago/estômago — aqui não muda nada.',
      cea: 'CEA: NÃO diagnostica. É prognóstico e seguimento — dosar após a ressecção; subir = recidiva. Marca toda neoplasia mucinosa → sensível, mas inespecífico.'
    });
  }

  /* Helper genérico de step-through cumulativo com step-ctl externo (prev/next + contador). */
  function initStepThrough(root, sel, ctlId, noun, max, msgs) {
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
        g.classList.toggle('is-on', s <= cur);
      });
      svg.setAttribute('data-step', String(cur));
      if (count) count.textContent = noun + ' ' + cur + ' de ' + max;
      if (prev) prev.disabled = cur <= 1;
      if (next) next.disabled = cur >= max;
      var msg = (msgs && msgs[cur]) || (noun.charAt(0).toUpperCase() + noun.slice(1) + ' ' + cur + ' de ' + max + '.');
      if (status) status.textContent = msg;
      if (live) live.textContent = msg;
    }
    if (prev) prev.addEventListener('click', function () { apply(cur - 1); });
    if (next) next.addEventListener('click', function () { apply(cur + 1); });
    apply(1);
  }

  function initCcr2(root) {
    initStepThrough(root, '.il-ccr2', 'ccr2', 'marco', 4, {
      1: 'Internação por endocardite: febre + sopro novo + edema. O eco confirma; inicia-se antibiótico.',
      2: 'Melhora cardíaca em 5 dias. Pedem complementação — o paciente foge do hospital sem investigar o cólon.',
      3: 'Sete meses de silêncio. É a janela perdida: nesse intervalo o CCR cresce e semeia o fígado.',
      4: 'Retorno com dor abdominal. TC: fígado pipocado de metástases — agora irressecável. A colonoscopia precoce teria mudado o desfecho.'
    });
  }

  /* Helper genérico de slider externo (range) que move um cursor e troca estados. */
  function initSlider(root, sel, ctlId, conf) {
    var svg = $(sel, root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var fig = svg.closest('.figure-svg');
    var ctl = fig ? fig.querySelector('[data-slider-ctl="' + ctlId + '"]') : null;
    var range = ctl ? ctl.querySelector('input[type="range"]') : (fig ? fig.querySelector('input[data-slider="' + ctlId + '"]') : null);
    var cursor = $('.' + ctlId + '-cursor', svg);
    var status = $('[class$="-status"]', svg);
    function apply(val) {
      var step = conf.resolve(val);
      if (cursor) cursor.setAttribute('transform', 'translate(' + step.x + ',0)');
      if (conf.onApply) conf.onApply(svg, step, val);
      if (range) range.setAttribute('aria-valuetext', step.msg);
      if (status) status.textContent = step.msg;
      if (live) live.textContent = step.msg;
    }
    if (range) {
      range.addEventListener('input', function () { apply(+range.value); });
      range.addEventListener('change', function () { apply(+range.value); });
      apply(+range.value);
    }
  }

  function initCcr7(root) {
    initSlider(root, '.il-ccr7', 'ccr7', {
      resolve: function (v) {
        var X = { 40: 140, 45: 248, 50: 360, 55: 500, 60: 640 };
        var MSG = {
          40: '40 anos: antes do corte de risco médio. Aqui só se rastreia mais cedo por alto risco (história familiar/síndrome).',
          45: '45 anos: porta internacional (ACS/USPSTF). Em prova nacional, responda 50; reconheça 45 como tendência.',
          50: '50 anos: porta do rastreio no Brasil (MS). Métodos: sangue oculto nas fezes e/ou colonoscopia.',
          55: 'Já dentro da faixa de rastreio. Atenção: se houver sintoma de alarme, deixa de ser rastreio e vira investigação ativa — colonoscopia agora.',
          60: 'Já dentro da faixa de rastreio. Atenção: se houver sintoma de alarme, deixa de ser rastreio e vira investigação ativa — colonoscopia agora.'
        };
        return { x: X[v] || 360, msg: MSG[v] || MSG[50], age: v };
      },
      onApply: function (svg, step) {
        var age = $('.ccr7-age', svg);
        if (age) age.textContent = step.age + 'a';
        $$('.ccr7-gate', svg).forEach(function (g) {
          var key = g.getAttribute('data-gate');
          var on = (key === 'intl' && step.age >= 45) || (key === 'br' && step.age >= 50);
          g.classList.toggle('is-on', on);
        });
      }
    });
  }

  function initCcr13(root) {
    initSlider(root, '.il-ccr13', 'ccr13', {
      resolve: function (v) {
        var X = { 1: 130, 2: 255, 3: 380, 4: 505, 5: 630 };
        var load = v <= 1 ? 'res' : (v >= 4 ? 'pip' : 'lim');
        var MSG = {
          1: 'Metástase única e limitada, parênquima e margem suficientes → RESSECÁVEL → intenção curativa. A marca registrada do CCR.',
          2: 'Doença limitada a moderada: a decisão pesa número, distribuição e fígado funcionante. Ressecável enquanto sobrar fígado sadio com margem.',
          3: 'Doença limitada a moderada: a decisão pesa número, distribuição e fígado funcionante. Ressecável enquanto sobrar fígado sadio com margem.',
          4: "Fígado multinodular difuso, dois lobos tomados — o 'pipocado'. IRRESSECÁVEL → paliação. Foi o desfecho do Sr. Luiz.",
          5: "Fígado multinodular difuso, dois lobos tomados — o 'pipocado'. IRRESSECÁVEL → paliação. Foi o desfecho do Sr. Luiz."
        };
        return { x: X[v] || 380, msg: MSG[v] || MSG[3], load: load };
      },
      onApply: function (svg, step) {
        $$('.ccr13-state', svg).forEach(function (s) {
          s.classList.toggle('is-on', s.getAttribute('data-load') === step.load);
        });
      }
    });
  }

  function initAll(root) {
    root = root || document;
    initCcr1(root); initCcr2(root); initCcr4(root); initCcr6(root); initCcr7(root);
    initCcr9(root); initCcr10(root); initCcr13(root); initCcr14(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initAll(document); });
  } else { initAll(document); }

  window.Aula03Interactive = { initAll: initAll };
})();
