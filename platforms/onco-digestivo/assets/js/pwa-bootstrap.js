// PWA bootstrap canônico Bauer — auto-update ABSOLUTO (sem clique manual obrigatório).
// Resolve sw.js na raiz da plataforma a partir de qualquer profundidade (HUB ou /aulas/aulaN/).

(function () {
  if (!('serviceWorker' in navigator)) return;

  // Caminho do SW na raiz: conta a profundidade relativa ao scope.
  // HUB: index.html na raiz -> 'sw.js'. Aula: /aulas/aula-01/ -> '../../sw.js'.
  function swPath() {
    const p = location.pathname;
    const m = p.match(/\/aulas\/[^/]+\//);
    return m ? '../../sw.js' : 'sw.js';
  }
  function swScope() {
    const p = location.pathname;
    const m = p.match(/^(.*\/)aulas\/[^/]+\//);
    if (m) return m[1];
    return p.replace(/[^/]*$/, '');
  }

  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return; refreshing = true; window.location.reload();
  });

  // AUTO-UPDATE ABSOLUTO SEM BOTÃO (regra inviolável Bauer): novo SW instalado →
  // SKIP_WAITING automático → activate/clients.claim → controllerchange → reload. Zero clique, zero toast.
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register(swPath(), { scope: swScope() });
      setInterval(() => reg.update().catch(() => {}), 30 * 1000);
      function activateNow(worker) {
        if (!worker) return;
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            worker.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      }
      if (reg.waiting && navigator.serviceWorker.controller) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      reg.addEventListener('updatefound', () => activateNow(reg.installing));
    } catch (_) { /* silencioso */ }
  });

  // Botão instalar (id btnInstall, presente no HUB se houver)
  let deferred = null;
  const btn = document.getElementById('btnInstall');
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e; if (btn) btn.classList.add('show'); });
  btn?.addEventListener('click', async () => { if (!deferred) return; deferred.prompt(); await deferred.userChoice; deferred = null; btn.classList.remove('show'); });
})();

// Orb ambiente padronizado: injeta os 2 halos que respiram em qualquer página (idempotente).
// CSS vive no base.css (.page-orb). Se a página já tiver os orbs (HUB/tireoide), não duplica.
(function () {
  function add() {
    if (document.querySelector('.page-orb')) return;
    var teal = document.createElement('div');
    teal.className = 'page-orb'; teal.setAttribute('aria-hidden', 'true');
    var gold = document.createElement('div');
    gold.className = 'page-orb page-orb--gold'; gold.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(gold, document.body.firstChild);
    document.body.insertBefore(teal, document.body.firstChild);
  }
  if (document.body) add();
  else document.addEventListener('DOMContentLoaded', add);
})();
