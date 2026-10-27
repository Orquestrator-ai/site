/* aula-13.js — interações leves e fail-soft da Aula 13. */
(function () {
  'use strict';
  function uiKey(name) {
    var page = document.body.getAttribute('data-page-id') || 'p1';
    var nn = ('0' + page.replace(/\D/g, '')).slice(-2);
    return 'obstetricia-premium:a13:p' + nn + ':ui:' + name + ':v1';
  }
  function save(name, value) { try { localStorage.setItem(uiKey(name), value); } catch (_) {} }
  function load(name) { try { return localStorage.getItem(uiKey(name)); } catch (_) { return null; } }

  // Hotspot opcional no sagital P1 (toque em cada bloco revela o sistema)
  document.querySelectorAll('[data-a13-hotspot]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-a13-hotspot');
      document.querySelectorAll('[data-a13-hotspot]').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      var svgRoot = document.querySelector('.a13-inline-svg, svg[class*="a13p"]');
      if (svgRoot) svgRoot.setAttribute('data-active', target || 'all');
      save('hotspot', target || 'all');
    });
  });
  var hs = load('hotspot');
  if (hs) {
    var m = document.querySelector('[data-a13-hotspot="' + hs + '"]');
    if (m) m.click();
  }
})();