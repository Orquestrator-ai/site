/* aula-14.js — interações leves e fail-soft da Aula 14.
   Namespace: a14. Estado UI em obstetricia-premium:a14:pNN:ui:<componente>:v1 */
(function () {
  'use strict';
  function uiKey(name) {
    var page = document.body.getAttribute('data-page-id') || 'p1';
    var nn = ('0' + page.replace(/\D/g, '')).slice(-2);
    return 'obstetricia-premium:a14:p' + nn + ':ui:' + name + ':v1';
  }
  function save(name, value) { try { localStorage.setItem(uiKey(name), value); } catch (_) {} }
  function load(name) { try { return localStorage.getItem(uiKey(name)); } catch (_) { return null; } }

  // Hotspot interativo genérico (quando uma página tiver SVG com data-a14-hotspot)
  document.querySelectorAll('[data-a14-hotspot]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-a14-hotspot');
      document.querySelectorAll('[data-a14-hotspot]').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      var svgRoot = document.querySelector('.a14-inline-svg, svg[class*="a14p"]');
      if (svgRoot) svgRoot.setAttribute('data-active', target || 'all');
      save('hotspot', target || 'all');
    });
  });
  var hs = load('hotspot');
  if (hs) {
    var m = document.querySelector('[data-a14-hotspot="' + hs + '"]');
    if (m) m.click();
  }
})();
