/* PWA bootstrap canônico Bauer — auto-update ABSOLUTO (sem clique manual).
   Resolve sw.js na raiz da plataforma a partir de qualquer profundidade (HUB ou /aulas/aula-XX/).
   Também injeta o ambiente (2 orbs branco+rosa + campo de rachaduras) em TODA página. */
(function () {
  if (!('serviceWorker' in navigator)) return;
  function swPath() {
    var m = location.pathname.match(/\/aulas\/[^/]+\//);
    return m ? '../../sw.js' : 'sw.js';
  }
  function swScope() {
    var p = location.pathname, m = p.match(/^(.*\/)aulas\/[^/]+\//);
    return m ? m[1] : p.replace(/[^/]*$/, '');
  }
  var refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return; refreshing = true; window.location.reload();
  });
  // AUTO-UPDATE ABSOLUTO: novo SW instalado -> SKIP_WAITING -> activate/claim -> controllerchange -> reload. Zero clique.
  window.addEventListener('load', async function () {
    try {
      var reg = await navigator.serviceWorker.register(swPath(), { scope: swScope() });
      setInterval(function () { reg.update().catch(function () {}); }, 30 * 1000);
      function activateNow(worker) {
        if (!worker) return;
        worker.addEventListener('statechange', function () {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            worker.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      }
      if (reg.waiting && navigator.serviceWorker.controller) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      reg.addEventListener('updatefound', function () { activateNow(reg.installing); });
    } catch (_) {}
  });
  // Botão instalar (id btnInstall, no HUB)
  var deferred = null, btn = document.getElementById('btnInstall');
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; if (btn) btn.classList.add('show'); });
  if (btn) btn.addEventListener('click', async function () { if (!deferred) return; deferred.prompt(); await deferred.userChoice; deferred = null; btn.classList.remove('show'); });
})();

/* Ambiente: 2 orbs (branco superior + rosa inferior) + campo de rachaduras neon (idempotente). */
(function () {
  var CRACKS = '<svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMin slice" aria-hidden="true">' +
    '<path d="M-20 90 L180 150 L260 120 L330 210 L300 300 L420 360"/>' +
    '<path d="M180 150 L150 250 L60 300"/>' +
    '<path d="M1460 120 L1250 200 L1180 160 L1090 250 L1140 330 L1020 400"/>' +
    '<path d="M1250 200 L1290 320 L1380 360"/>' +
    '<path d="M720 -20 L690 120 L760 200 L700 300"/>' +
    '<path d="M760 200 L860 240"/>' +
    '<path d="M-20 640 L200 600 L300 660 L360 560"/>' +
    '<path d="M1460 620 L1230 640 L1130 580 L1080 660"/>' +
    '<path d="M420 360 L520 420 L470 520"/>' +
    '</svg>';
  function add() {
    if (!document.body) return;
    if (!document.querySelector('.crack-field')) {
      var cf = document.createElement('div');
      cf.className = 'crack-field'; cf.setAttribute('aria-hidden', 'true');
      cf.innerHTML = CRACKS;
      document.body.insertBefore(cf, document.body.firstChild);
    }
    if (!document.querySelector('.page-orb')) {
      var rose = document.createElement('div');
      rose.className = 'page-orb page-orb--rose'; rose.setAttribute('aria-hidden', 'true');
      var white = document.createElement('div');
      white.className = 'page-orb'; white.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(rose, document.body.firstChild);
      document.body.insertBefore(white, document.body.firstChild);
    }
  }
  if (document.body) add(); else document.addEventListener('DOMContentLoaded', add);
})();
