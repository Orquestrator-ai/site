/* aula-12.js — interações leves e fail-soft da Aula 12. */
(function () {
  'use strict';
  function uiKey(name) {
    var page = document.body.getAttribute('data-page-id') || 'p1';
    var nn = ('0' + page.replace(/\D/g, '')).slice(-2);
    return 'obstetricia-premium:a12:p' + nn + ':ui:' + name + ':v1';
  }
  function save(name, value) { try { localStorage.setItem(uiKey(name), value); } catch (_) {} }
  function load(name) { try { return localStorage.getItem(uiKey(name)); } catch (_) { return null; } }

  // Clinical hooks → SVG highlight
  document.querySelectorAll('[data-hook-target]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-hook-target');
      document.querySelectorAll('[data-hook-target]').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      var root = document.querySelector('[data-svg-tokenized], .a12-inline-svg, svg[class*="a12p"]');
      if (root) root.setAttribute('data-active', target || 'all');
      save('hook', target || 'all');
    });
  });
  var hook = load('hook');
  if (hook) {
    var match = document.querySelector('[data-hook-target="' + hook + '"]');
    if (match) match.click();
  }

  // Generic toggle groups
  document.querySelectorAll('[data-a12-toggle-group]').forEach(function (group) {
    var name = group.getAttribute('data-a12-toggle-group');
    var buttons = group.querySelectorAll('[data-a12-toggle]');
    function apply(val) {
      buttons.forEach(function (b) {
        var on = b.getAttribute('data-a12-toggle') === val;
        b.setAttribute('aria-pressed', String(on));
      });
      var targetSel = group.getAttribute('data-a12-toggle-target');
      if (targetSel) {
        document.querySelectorAll(targetSel).forEach(function (el) {
          el.setAttribute('data-active', val);
        });
      }
      save(name, val);
    }
    buttons.forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-a12-toggle')); });
    });
    var saved = load(name);
    if (saved) apply(saved);
  });

  // Subtraction lab P14
  var subBtn = document.getElementById('a12-subtract-floor');
  if (subBtn) {
    var lab = document.querySelector('.a12-subtraction-lab');
    function setFloor(on) {
      if (!lab) return;
      lab.setAttribute('data-floor', on ? 'on' : 'off');
      subBtn.setAttribute('aria-pressed', String(!on));
      subBtn.textContent = on ? 'Retirar o chão' : 'Repor o chão';
      var live = document.getElementById('a12-subtract-live');
      if (live) live.textContent = on ? 'Chão presente: órgãos sustentados.' : 'Chão retirado: órgãos descem.';
      save('floor', on ? 'on' : 'off');
    }
    subBtn.addEventListener('click', function () {
      var on = lab.getAttribute('data-floor') !== 'off';
      setFloor(!on);
    });
    setFloor(load('floor') !== 'off');
  }

  // Layer controller P14
  var layerBtns = document.querySelectorAll('[data-a12-layer]');
  if (layerBtns.length) {
    function setLayer(n) {
      layerBtns.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-a12-layer') === String(n)));
      });
      var hero = document.querySelector('[data-layer-root], .a12p14h-root, #a12p14h-svg');
      if (hero) hero.setAttribute('data-active-level', String(n));
      document.querySelectorAll('[data-layer-panel]').forEach(function (p) {
        var lv = parseInt(p.getAttribute('data-layer-panel'), 10);
        p.hidden = lv > n;
        p.classList.toggle('is-dim', lv < n);
      });
      save('layer', String(n));
    }
    layerBtns.forEach(function (b) {
      b.addEventListener('click', function () { setLayer(parseInt(b.getAttribute('data-a12-layer'), 10)); });
    });
    setLayer(parseInt(load('layer') || '1', 10));
  }

  // Smellie calculator P11
  var calcIn = document.getElementById('a12-smellie-input');
  var calcOut = document.getElementById('a12-smellie-output');
  if (calcIn && calcOut) {
    function runCalc() {
      var v = parseFloat(String(calcIn.value).replace(',', '.'));
      if (!isFinite(v) || v <= 0) {
        calcOut.textContent = 'Informe a conjugata diagonal medida (cm).';
        return;
      }
      var trueC = (v - 1.5).toFixed(1);
      calcOut.textContent = 'Conjugata diagonal ' + v.toFixed(1) + ' cm − 1,5 cm = conjugata vera obstétrica ' + trueC + ' cm.';
      save('smellie', String(v));
    }
    calcIn.addEventListener('input', runCalc);
    var s = load('smellie');
    if (s) { calcIn.value = s; runCalc(); }
  }

  // Station reader P12
  document.querySelectorAll('[data-a12-station]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var st = btn.getAttribute('data-a12-station');
      document.querySelectorAll('[data-a12-station]').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      var out = document.getElementById('a12-station-out');
      var map = {
        '-2': 'Estação −2: polo cefálico acima do plano das espinhas; ainda não insinuado.',
        '0': 'Estação 0: polo no plano das espinhas — zero da régua de De Lee; insinuação no plano do estreito médio.',
        '+1': 'Estação +1: polo abaixo das espinhas; já passou o gargalo ósseo do médio.',
        '+3': 'Estação +3: polo bem abaixo; próximo do assoalho e da saída.'
      };
      if (out) out.textContent = map[st] || st;
      save('station', st);
    });
  });
  var st = load('station');
  if (st) {
    var b = document.querySelector('[data-a12-station="' + st + '"]');
    if (b) b.click();
  }

  // Incision tracer P19
  var traceBtn = document.getElementById('a12-show-trace');
  if (traceBtn) {
    var root = document.querySelector('[data-incision-root]');
    function setTrace(on) {
      if (root) root.setAttribute('data-trace', on ? 'on' : 'off');
      traceBtn.setAttribute('aria-pressed', String(on));
      traceBtn.textContent = on ? 'Ocultar traçado' : 'Mostrar traçado';
      save('trace', on ? 'on' : 'off');
    }
    traceBtn.addEventListener('click', function () {
      setTrace(root && root.getAttribute('data-trace') !== 'on');
    });
    setTrace(load('trace') === 'on');
  }

  // Dual-mode sheet P22
  var modeBtn = document.getElementById('a12-mode-toggle');
  if (modeBtn) {
    var sheet = document.querySelector('.a12-dual-mode-sheet');
    function setMode(filled) {
      if (sheet) sheet.setAttribute('data-mode', filled ? 'filled' : 'blank');
      modeBtn.textContent = filled ? 'Modo em branco' : 'Revelar gabarito';
      modeBtn.setAttribute('aria-pressed', String(filled));
      save('mode', filled ? 'filled' : 'blank');
    }
    modeBtn.addEventListener('click', function () {
      setMode(!(sheet && sheet.getAttribute('data-mode') === 'filled'));
    });
    setMode(load('mode') === 'filled');
  }
})();
