/* aula-02-interactive.js — wiring vanilla das interações bespoke da Aula 2 (Câncer Gástrico).
   Espelha aula-01-interactive.js: IIFE auto-init, idempotente, click + teclado (Enter/Space/setas) + pointer,
   ZERO hex (só var(--token) via setAttribute), prefers-reduced-motion respeitado pelo CSS (transições) —
   aqui o JS só muda estado. Cada SVG ensina sozinho no fallback estático; o JS aprofunda.

   gast1  (p1)  step-through 1→4 da "linha do tempo da praga" (doença afunda × sintoma plano)
   gast2  (p2)  hotspot por pista → trajeto + entrega no hub (modelo eso1); Virchow default aceso
   gast3  (p3)  hotspot por via → acende trajeto + destinos; transcelômica default acesa
   gast4  (p4)  toggle de coluna (hábitos | H. pylori | pegadinha das fibras)
   gast5  (p5)  toggle de camada (consumptiva genérica | dispepsia localizadora)
   gast6  (p6)  hotspot por marcador no corpo → 5 sinais; Virchow default aceso
   gast7  (p7)  step-through 1→4 da EDA com biópsia das BORDAS (não o centro necrótico)
   gast10 (p10) matriz esôfago × gástrico clicável por linha (repete=verde / muda=coral)
   gast14 (p14) hotspot por cenário → conduta (mucosectomia / D2 / paliação); M1 default aceso

   Região aria-live: usa .figure-svg__stage[aria-live] do wrapper; se faltar, cria .gast-live. */

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
      var hidden = stage.querySelector('.gast-live');
      if (!hidden) {
        hidden = document.createElement('span');
        hidden.className = 'gast-live';
        hidden.style.position = 'absolute';
        hidden.style.width = '1px'; hidden.style.height = '1px';
        hidden.style.overflow = 'hidden'; hidden.style.clip = 'rect(0 0 0 0)';
        stage.appendChild(hidden);
      }
      return hidden;
    }
    var fig = svg.closest ? svg.closest('.figure-svg') : svg.parentElement;
    if (!fig) return null;
    var live = fig.querySelector('.gast-live');
    if (!live) {
      live = document.createElement('p');
      live.className = 'gast-live';
      live.setAttribute('aria-live', 'polite');
      live.setAttribute('role', 'status');
      live.style.position = 'absolute';
      live.style.width = '1px'; live.style.height = '1px';
      live.style.overflow = 'hidden'; live.style.clip = 'rect(0 0 0 0)';
      fig.appendChild(live);
    }
    return live;
  }

  /* ===== gast2 (p2) — mapa do caso: pistas → entrega no hub (hotspot exclusivo) ===== */
  function initGast2(root) {
    var svg = $('.il-gast2', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var clues = $$('.gast2-clue', svg);
    var links = $$('.gast2-link', svg);
    var targets = $$('.gast2-target', svg);
    var status = $('.gast2-status', svg);
    var MSG = {
      consumptiva: 'Síndrome consumptiva — dá o cenário de doença avançada, mas não diz de onde vem.',
      virchow: 'Linfonodo de Virchow (supraclavicular ESQUERDO) — drena as vísceras abdominais. É a pista que aponta o primário no abdome.',
      ascite: 'Ascite com cirrose já afastada — fala de disseminação peritoneal, não localiza o sítio.',
      ovario: 'Implante no ovário (não primário) — metástase transcelômica gástrica: tumor de Krukenberg.'
    };
    function select(c) {
      var key = c.getAttribute('data-clue');
      clues.forEach(function (x) { x.setAttribute('aria-pressed', String(x === c)); });
      links.forEach(function (lk) { lk.setAttribute('opacity', lk.getAttribute('data-link') === key ? '1' : '0.18'); });
      targets.forEach(function (t) { t.setAttribute('opacity', t.getAttribute('data-target') === key ? '1' : '0.4'); });
      if (status) status.textContent = MSG[key] || (c.getAttribute('aria-label') || '');
      if (live) live.textContent = MSG[key] || '';
    }
    clues.forEach(function (c) {
      activable(c, function () { select(c); });
      c.addEventListener('focus', function () { select(c); });
    });
    arrowNav(clues);
    select(clues.filter(function (c) { return c.getAttribute('data-clue') === 'virchow'; })[0] || clues[0]);
  }

  /* ===== gast3 (p3) — três vias de disseminação (hotspot exclusivo por trajeto) ===== */
  function initGast3(root) {
    var svg = $('.il-gast3', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var vias = $$('.gast3-via', svg);
    var status = $('.gast3-status', svg);
    var MSG = {
      linfatica: 'Linfática → linfonodo. Comum a quase todos os tumores; produz o Virchow (supraclavicular esquerdo).',
      hematogenica: 'Hematogênica → fígado (e às vezes pulmão). Órgãos à distância pela corrente sanguínea.',
      transcelomica: 'Transcelômica → peritônio + ovário (Krukenberg) + umbigo. Assinatura do estômago e do ovário; explica ascite e implante ovariano.'
    };
    function select(v) {
      var key = v.getAttribute('data-via');
      vias.forEach(function (x) {
        var on = x === v;
        x.classList.toggle('is-on', on);
        x.setAttribute('aria-pressed', String(on));
      });
      if (status) status.textContent = MSG[key] || (v.getAttribute('aria-label') || '');
      if (live) live.textContent = MSG[key] || '';
    }
    /* alvo de clique/foco = o grupo da via (e o stroke largo .gast3-hit também aponta o grupo) */
    vias.forEach(function (v) {
      activable(v, function () { select(v); });
      v.addEventListener('focus', function () { select(v); });
    });
    arrowNav(vias);
    select(vias.filter(function (v) { return v.getAttribute('data-via') === 'transcelomica'; })[0] || vias[0]);
  }

  /* ===== gast6 (p6) — 5 sinais sobre o corpo (hotspot exclusivo por marcador) ===== */
  function initGast6(root) {
    var svg = $('.il-gast6', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var signs = $$('.gast6-sign', svg);
    var status = $('.gast6-status', svg);
    var MSG = {
      virchow: 'Virchow — supraclavicular ESQUERDO. Drenagem abdominal vai para a esquerda. À direita = pulmão. Aumentado = câncer.',
      irish: 'Irish — axilar ESQUERDO. Mesma lógica da drenagem linfática abdominal à esquerda.',
      'maria-jose': 'Irmã Maria José — NÓDULO no umbigo, não linfonodo (não há cadeia no umbigo). Tumor sobe pelo ligamento falciforme. Transcelômica.',
      blumer: 'Prateleira de Blumer — fundo de saco retal ao toque. Células caem no ponto mais baixo da cavidade. A paciente recusou o toque.',
      krukenberg: 'Krukenberg — metástase ovariana transcelômica. É o implante ovariano do caso.'
    };
    function select(s) {
      var key = s.getAttribute('data-sign');
      signs.forEach(function (x) {
        var on = x === s;
        x.classList.toggle('is-on', on);
        x.setAttribute('aria-pressed', String(on));
      });
      if (status) status.textContent = MSG[key] || (s.getAttribute('aria-label') || '');
      if (live) live.textContent = MSG[key] || '';
    }
    signs.forEach(function (s) {
      activable(s, function () { select(s); });
      s.addEventListener('focus', function () { select(s); });
    });
    arrowNav(signs);
    select(signs.filter(function (s) { return s.getAttribute('data-sign') === 'virchow'; })[0] || signs[0]);
  }

  /* ===== gast10 (p10) — matriz esôfago × gástrico (linha clicável, exclusiva) ===== */
  function initGast10(root) {
    var svg = $('.il-gast10', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var rows = $$('.gast10-row', svg);
    var status = $('.gast10-status', svg);
    var MSG = {
      t: 'Melhor exame do T = USE nos dois. REPETE do esôfago — nada muda aqui.',
      avancado: 'MUDA: no esôfago temia-se aorta/brônquio; no estômago, o peritônio (transcelômica).',
      exame: 'MUDA: lá TC+broncoscopia; aqui a avaliação é do peritônio (videolaparoscopia).',
      tc: 'MUDA — pegadinha: TC SÓ de abdome. NÃO se faz TC de tórax no gástrico (tumor é abdominal).'
    };
    function select(r) {
      var key = r.getAttribute('data-row');
      rows.forEach(function (x) {
        var on = x === r;
        x.classList.toggle('is-active', on);
        x.setAttribute('aria-pressed', String(on));
        var bg = x.querySelector('.gast10-bg');
        if (bg) bg.setAttribute('opacity', on ? '0.14' : '0');
      });
      if (status) status.textContent = MSG[key] || (r.getAttribute('aria-label') || '');
      if (live) live.textContent = MSG[key] || '';
    }
    rows.forEach(function (r) {
      activable(r, function () { select(r); });
      r.addEventListener('focus', function () { select(r); });
    });
    arrowNav(rows);
    select(rows.filter(function (r) { return r.getAttribute('data-row') === 'tc'; })[0] || rows[0]);
  }

  /* ===== gast14 (p14) — decisão por extensão (hotspot exclusivo por cenário) ===== */
  function initGast14(root) {
    var svg = $('.il-gast14', root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var cases = $$('.gast14-case', svg);
    var status = $('.gast14-status', svg);
    var MSG = {
      precoce: 'Muito precoce (T1a N0 + critérios): mucosectomia endoscópica — poupa o estômago.',
      ressecavel: 'Ressecável: QT neoadjuvante → gastrectomia (total/subtotal pela topografia) + D2 ≥ 16 linfonodos.',
      m1: 'M1 / carcinomatose = incurável → PALIAÇÃO. Não há T4B típico: a disseminação é que tira da cirurgia.'
    };
    function select(c) {
      var key = c.getAttribute('data-case');
      cases.forEach(function (x) {
        var on = x === c;
        x.classList.toggle('is-on', on);
        x.setAttribute('aria-pressed', String(on));
      });
      if (status) { status.textContent = MSG[key] || (c.getAttribute('aria-label') || ''); status.setAttribute('opacity', '1'); }
      if (live) live.textContent = MSG[key] || '';
    }
    cases.forEach(function (c) {
      activable(c, function () { select(c); });
      c.addEventListener('focus', function () { select(c); });
    });
    arrowNav(cases);
    select(cases.filter(function (c) { return c.getAttribute('data-case') === 'm1'; })[0] || cases[0]);
  }

  /* ===== toggle de coluna/camada genérico (gast4/gast5) ===== */
  function initToggle(root, sel, ctlId, groupSel, defaultVisible, msgMap) {
    var svg = $(sel, root);
    if (!svg || svg.dataset.init) return; svg.dataset.init = '1';
    var live = liveFor(svg);
    var fig = svg.closest('.figure-svg');
    var ctl = fig ? fig.querySelector('[data-gast-toggle="' + ctlId + '"]') : null;
    var btns = ctl ? $$('button', ctl) : [];
    var groups = $$(groupSel, svg);
    var status = $('[class$="-status"]', svg);
    var attr = groupSel.indexOf('col') !== -1 ? 'data-col' : 'data-layer';
    function select(key) {
      groups.forEach(function (g) {
        var same = g.getAttribute(attr) === key;
        g.classList.toggle('is-dim', !same);
      });
      btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-key') === key)); });
      var msg = msgMap[key] || '';
      if (status) { status.textContent = msg; status.setAttribute('opacity', '1'); }
      if (live) live.textContent = msg;
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () { select(b.getAttribute('data-key')); });
    });
    arrowNav(btns);
    /* default = nenhum dim (fallback estático ensina sozinho) */
  }

  function initGast4(root) {
    initToggle(root, '.il-gast4', 'gast4', '.gast4-col', true, {
      habitos: 'Hábitos: nitrogenados, conservantes, defumados, tabaco, álcool.',
      hpylori: 'H. pylori é risco do estômago (gastrite atrófica, complicações) — não do esôfago.',
      pegadinha: 'Fibra é protetora. "Dieta rica em fibras" como risco é a armadilha clássica.'
    });
  }
  function initGast5(root) {
    initToggle(root, '.il-gast5', 'gast5', '.gast5-layer', true, {
      consumptiva: 'Camada genérica: consome o paciente, mas aparece em mil doenças — não localiza.',
      localizador: 'Camada localizadora: dispepsia (sem regurgitação) mira o estômago; sinais de alarme disparam a EDA.'
    });
    /* a faixa de alarme acompanha a camada localizadora */
    var svg = $('.il-gast5', root);
    if (svg) {
      var fig = svg.closest('.figure-svg');
      var ctl = fig ? fig.querySelector('[data-gast-toggle="gast5"]') : null;
      if (ctl) {
        $$('button', ctl).forEach(function (b) {
          b.addEventListener('click', function () {
            var key = b.getAttribute('data-key');
            $$('.gast5-alarm', svg).forEach(function (a) {
              a.classList.toggle('is-dim', a.getAttribute('data-layer') !== key);
            });
          });
        });
      }
    }
  }

  /* Helper genérico de step-through cumulativo com step-ctl externo (prev/next + contador).
     Acende grupos [data-step] <= passo atual; idempotente; teclado pelos próprios botões. */
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

  /* gast1 (p1) — linha do tempo da praga (4 fases) */
  function initGast1(root) {
    initStepThrough(root, '.il-gast1', 'gast1', 'fase', 4, {
      1: '1 · Restrito à mucosa. Paciente assintomático — só pega quem faz rastreio (por isso o Japão rastreia).',
      2: '2 · Invade submucosa e muscular. Continua silencioso, mas já pode haver linfonodo.',
      3: '3 · Atinge a serosa. Aqui surgem os primeiros sintomas, vagos: fadiga, saciedade precoce, perda de peso.',
      4: '4 · Quando o sintoma finalmente leva o paciente ao médico, a doença já se disseminou — peritônio, Virchow, ovário. Esse é o "tumor praga".'
    });
  }

  /* gast7 (p7) — EDA + biópsia das BORDAS (4 passos) */
  function initGast7(root) {
    initStepThrough(root, '.il-gast7', 'gast7', 'passo', 4, {
      1: 'O endoscópio desce pelo esôfago até o estômago — víscera oca, acessível e biopsiável.',
      2: 'Localiza a lesão de mucosa; o centro pode estar necrótico.',
      3: 'A pinça morde as BORDAS da lesão (verde) — o centro necrótico daria falso-negativo.',
      4: 'Fragmentos das bordas → histopatológico = adenocarcinoma. Diagnóstico fechado.'
    });
  }

  function initAll(root) {
    root = root || document;
    initGast1(root); initGast2(root); initGast3(root); initGast4(root);
    initGast5(root); initGast6(root); initGast7(root); initGast10(root);
    initGast14(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initAll(document); });
  } else { initAll(document); }

  window.Aula02Interactive = { initAll: initAll };
})();
