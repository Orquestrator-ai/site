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

// Ambiente GLOBAL (Bauer 2026-06-05): os DOIS efeitos em TODA página — mesh (efeito de cima, que se
// mexe) + aurora de rodapé (com movimento), SEM estrelinhas. Idempotente: se a página já tem o
// elemento (HUB tem o mesh inline), não duplica. CSS no base.css. Aposentou os page-orb.
(function () {
  function add() {
    // 1) Mesh (efeito de cima) — HUB já tem inline, então só injeta onde falta
    if (!document.querySelector('.mesh-bg')) {
      var m = document.createElement('div');
      m.className = 'mesh-bg';
      m.setAttribute('aria-hidden', 'true');
      m.innerHTML = '<span class="mesh-blob mesh-blob--1"></span>' +
        '<span class="mesh-blob mesh-blob--2"></span>' +
        '<span class="mesh-blob mesh-blob--3"></span>';
      document.body.insertBefore(m, document.body.firstChild);
    }
    // 2) Aurora de rodapé (sem estrelinhas)
    if (!document.querySelector('.bottom-aurora')) {
      var a = document.createElement('div');
      a.className = 'bottom-aurora';
      a.setAttribute('aria-hidden', 'true');
      a.innerHTML = '<div class="aurora-blur-layer">' +
        '<div class="aurora-blob aurora-blob--warm"></div>' +
        '<div class="aurora-blob aurora-blob--sky"></div>' +
        '<div class="aurora-blob aurora-blob--cyan"></div>' +
        '</div>';
      document.body.insertBefore(a, document.body.firstChild);
    }
  }
  if (document.body) add();
  else document.addEventListener('DOMContentLoaded', add);
})();
