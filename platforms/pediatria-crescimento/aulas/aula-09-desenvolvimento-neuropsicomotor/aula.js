/* aula.js — bootstrap da Aula 09 "Desenvolvimento neuropsicomotor" (Pediatria Bauer · NÚCLEO ·
   domínio NOVO/independente — sem link-back cross-aula). Reusa o chassi: HashRouter + initQuiz +
   initInteractive (hotspots/.hs-shape, se houver). Adiciona: header/menu/tema/auto-hide, page-nav,
   progresso, collapsibles (scaffold opt-in), reveal-by-par do "Não confunda", o realce da TABELA
   VIVA (objeto persistente: clicar numa idade realça os 4 marcos da faixa + a faixa à esquerda) e o
   preenchimento do checklist da abertura E5 ao entrar no viewport. Os SVGs de piso (S-*) e a
   figura-herói (P13 mapa-mestre) são SELF-CONTAINED: o engine vive dentro do <script>/CDATA do
   próprio SVG; cada um se auto-wira ao ser embutido como markup parseado. THEME_KEY compartilha
   com o HUB. */

import { HashRouter } from '../../assets/js/router.js';
import { initQuiz } from '../../assets/js/components/quiz.js';
import { initInteractive } from '../../assets/js/components/interactive.js';

const PAGES = ['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12','p13'];
const PAGE_TITLES = {
  p1: 'Crescer tem número; desenvolver, não — e é aí que mora a dificuldade',
  p2: 'As 4 áreas e a lei crânio-caudal: a cabeça vai na frente, sempre',
  p3: 'A tabela viva: o gesto único que diz se a criança está bem',
  p4: '1 e 2 meses: a postura do esgrimista deitado e o sorriso social',
  p5: '3 e 4 meses: a cabeça volta ao meio e a mão começa a agarrar',
  p6: '5 e 6 meses: rola, localiza o som — e começam os acidentes',
  p7: '7 a 9 meses: permanência do objeto e o engatinhar opcional',
  p8: '10 a 15 meses: pinça, com apoio aos 12, sem apoio aos 15',
  p9: 'A escada da linguagem: do choro ao jargão à primeira palavra',
  p10: 'As 3 cores: adequado, alerta, provável atraso',
  p11: 'Sofia, Paulo e Carlos: a tabela aberta do lado',
  p12: 'Reflexos primitivos: normal hoje, doença amanhã',
  p13: 'O paraquedista que fica para a vida + o mapa-mestre',
};
const NAMESPACE = 'pediatria-aula-09-desenvolvimento-neuropsicomotor';
const THEME_KEY = 'neonato-theme'; // compartilha chave com o HUB
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

/* === Header / Menu (hambúrguer à direita) === */
function initHeader() {
  const menuBtn = $('#menu-toggle');
  const menuOverlay = $('#menu-overlay');
  const menuPanel = $('#menu-panel');
  const themeBtn = $('#theme-toggle');

  function closeMenu() {
    menuOverlay.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function openMenu() {
    menuOverlay.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const first = menuPanel.querySelector('a, button');
    if (first) first.focus();
  }
  menuBtn.addEventListener('click', () => {
    menuBtn.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });
  document.addEventListener('click', (e) => {
    if (menuOverlay.getAttribute('aria-hidden') === 'false' &&
        !menuPanel.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.getAttribute('aria-hidden') === 'false') { closeMenu(); menuBtn.focus(); }
  });
  menuPanel.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });

  if (localStorage.getItem(THEME_KEY) === 'light') document.documentElement.setAttribute('data-theme', 'light');
  themeBtn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    if (cur === 'light') { document.documentElement.removeAttribute('data-theme'); localStorage.setItem(THEME_KEY, 'dark'); }
    else { document.documentElement.setAttribute('data-theme', 'light'); localStorage.setItem(THEME_KEY, 'light'); }
  });
}

/* === Header auto-hide === */
function initHeaderAutohide() {
  const header = $('.site-header');
  if (!header) return;
  let lastY = window.scrollY, ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y > lastY && y > 120) header.setAttribute('data-hidden', 'true');
      else header.removeAttribute('data-hidden');
      lastY = y; ticking = false;
    });
  }, { passive: true });
}

/* === Página ativa === */
function renderActivePage(pageId) {
  $$('.page').forEach((p) => {
    const active = p.id === `page-${pageId}`;
    p.setAttribute('data-active', active ? 'true' : 'false');
    if (active) p.setAttribute('aria-current', 'page'); else p.removeAttribute('aria-current');
  });
  const idx = PAGES.indexOf(pageId), total = PAGES.length;
  const counter = $('#progress-counter'); if (counter) counter.textContent = `${idx + 1} / ${total}`;
  const fill = $('#progress-fill'); if (fill) fill.style.width = `${((idx + 1) / total) * 100}%`;
  $$('.menu-panel__link').forEach((l) => {
    if (l.dataset.page === pageId) l.setAttribute('aria-current', 'page'); else l.removeAttribute('aria-current');
  });
  document.title = `${PAGE_TITLES[pageId]} — Pediatria Bauer`;
  window.scrollTo({ top: 0, behavior: 'auto' });
  try { localStorage.setItem(`${NAMESPACE}-last-page`, pageId); } catch (_) {}
}

/* === Navegação inter-páginas === */
function initPageNav(router) {
  $$('.page-nav__btn--prev').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); router.prev(); }));
  $$('.page-nav__btn--next').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); router.next(); }));
  function updateNavStates() {
    $$('.page-nav__btn--prev').forEach((b) => router.hasPrev() ? b.removeAttribute('data-state') : b.setAttribute('data-state', 'disabled'));
    $$('.page-nav__btn--next').forEach((b) => router.hasNext() ? b.removeAttribute('data-state') : b.setAttribute('data-state', 'disabled'));
  }
  window.addEventListener('hashchange', updateNavStates);
  updateNavStates();
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea, button, select, a')) return;
    if (e.key === 'ArrowRight') router.next();
    if (e.key === 'ArrowLeft') router.prev();
  });
}

/* === Collapsibles (scaffold opt-in) === */
function initCollapsibles() {
  $$('.collapsible__btn').forEach((btn) => {
    if (btn.dataset.bound) return; btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
    });
  });
}

/* === Reveal por par (componente-Executor: "Não confunda") === */
function initReveals() {
  $$('[data-reveal]').forEach((el) => {
    if (el.dataset.bound) return; el.dataset.bound = '1';
    const set = (on) => {
      el.setAttribute('data-open', on ? 'true' : 'false');
      el.setAttribute('aria-expanded', on ? 'true' : 'false');
    };
    set(false);
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.addEventListener('click', () => set(el.getAttribute('data-open') !== 'true'));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set(el.getAttribute('data-open') !== 'true'); }
    });
  });
}

/* === TABELA VIVA (objeto persistente) — realce de faixa ===
   Clicar/Enter numa idade do topo realça os 4 quadradinhos daquela faixa (a coluna) e, como manda
   a regra-mestre, a faixa imediatamente à esquerda (a anterior). Estado por instância (id único). */
const FAIXA_ORDER = ['1m','2m','3-4m','5-6m','7-9m','10-12m','13-15m'];
function initTabelaViva() {
  $$('.tabviva').forEach((tab) => {
    if (tab.dataset.bound) return; tab.dataset.bound = '1';
    const highlight = (faixa) => {
      const idx = FAIXA_ORDER.indexOf(faixa);
      const prev = idx > 0 ? FAIXA_ORDER[idx - 1] : null;
      tab.dataset.faixaAtiva = faixa;
      $$('.tabviva__faixa-btn', tab).forEach((b) => {
        const f = b.closest('[data-faixa]').dataset.faixa;
        b.setAttribute('aria-pressed', f === faixa ? 'true' : 'false');
      });
      $$('.tabviva__cell', tab).forEach((c) => {
        c.classList.remove('is-active', 'is-prev');
        if (c.dataset.faixa === faixa) c.classList.add('is-active');
        else if (prev && c.dataset.faixa === prev) c.classList.add('is-prev');
      });
      $$('.tabviva__faixa', tab).forEach((th) => {
        th.classList.remove('is-active', 'is-prev');
        if (th.dataset.faixa === faixa) th.classList.add('is-active');
        else if (prev && th.dataset.faixa === prev) th.classList.add('is-prev');
      });
    };
    $$('.tabviva__faixa-btn', tab).forEach((b) => {
      b.addEventListener('click', () => highlight(b.closest('[data-faixa]').dataset.faixa));
    });
    // estado inicial da página, se houver
    if (tab.dataset.faixaAtiva) highlight(tab.dataset.faixaAtiva);
  });
}

/* === Checklist da abertura E5 — preenche ao entrar no viewport ===
   Usa a marcação base (.opener__checklist-item com um .opener__check[data-checked] dentro). */
function initChecklist() {
  const items = $$('.opener--checklist .opener__checklist-item');
  if (!items.length) return;
  const tick = (li) => { const c = li.querySelector('.opener__check'); if (c) c.setAttribute('data-checked', 'true'); };
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) { items.forEach(tick); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const li = e.target;
        const idx = items.indexOf(li);
        setTimeout(() => tick(li), Math.max(0, idx) * 140);
        io.unobserve(li);
      }
    });
  }, { threshold: 0.6 });
  items.forEach((i) => io.observe(i));
}

/* === Opener sheen (vida COM função) — o sheen radial do opener segue o cursor. === */
function initOpenerSheen() {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  let raf = 0, pending = null;
  document.addEventListener('pointermove', (e) => {
    const op = e.target.closest && e.target.closest('.opener');
    if (!op) return;
    pending = { op, e };
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      if (!pending) return;
      const { op, e } = pending; pending = null;
      const r = op.getBoundingClientRect();
      op.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      op.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  }, { passive: true });
}

/* === Bootstrap === */
document.addEventListener('DOMContentLoaded', () => {
  const router = new HashRouter({ pages: PAGES, onChange: renderActivePage });
  initHeader();
  initHeaderAutohide();
  initOpenerSheen();
  initPageNav(router);
  initQuiz({ namespace: NAMESPACE });
  initInteractive(document); // hotspots .hs-shape (se houver); pisos e herói se auto-wiram pelo script do próprio SVG
  initCollapsibles();
  initReveals();
  initTabelaViva();
  initChecklist();
  router.init();
});
