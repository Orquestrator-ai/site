/* app.js — chassi Bauer: navegação, tema, progresso, routing por hash */
(function(){
  'use strict';
  const NS = 'neuro-dm';

  // ---- tema (claro/escuro) ----
  // ⚠️ 02/08/2026 — o tema tem que ir no <html> E no <body>, nunca só no body.
  // O :root É o <html>. Escrevendo só no body, o :root ficava congelado no tema do
  // SISTEMA enquanto o body virava o tema do TOGGLE — e tudo que resolve no :root
  // (os alias de token que cada aula declara na sua camada) congelava junto.
  // Resultado medido nas 9 aulas: texto de um tema sobre card do outro, ilegível,
  // sempre que a escolha do usuário divergia da preferência do sistema. A obstetrícia
  // nunca teve isso porque sempre escreveu no documentElement.
  // Gate que prova: ~/.claude/scripts/medir-contraste.mjs (estados sodark-light e solight-dark).
  function aplicaTema(t){
    document.documentElement.setAttribute('data-theme', t);
    if (document.body) document.body.setAttribute('data-theme', t);
  }
  function temaSalvo(){
    try {
      const value = localStorage.getItem(NS+':theme');
      return value === 'light' || value === 'dark' ? value : null;
    } catch (error) {
      console.warn('Tema salvo indisponível; usando a preferência do sistema.', error);
      return null;
    }
  }
  function salvaTema(t){
    try {
      localStorage.setItem(NS+':theme', t);
    } catch (error) {
      console.warn('Não foi possível persistir o tema; a página atual continua correta.', error);
    }
  }
  const savedTheme = temaSalvo();
  if (savedTheme) aplicaTema(savedTheme);
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches)
    aplicaTema('light');
  else aplicaTema('dark');

  function toggleTheme(){
    const cur = document.documentElement.getAttribute('data-theme') ||
      document.body.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    const next = cur === 'dark' ? 'light' : 'dark';
    aplicaTema(next);
    salvaTema(next);
    document.querySelectorAll('[data-theme-btn]').forEach(b=>{
      b.setAttribute('aria-pressed', next==='light' ? 'true' : 'false');
      b.setAttribute('title', next==='light' ? 'Tema claro' : 'Tema escuro');
    });
  }
  window.addEventListener('DOMContentLoaded', ()=>{
    if (savedTheme) aplicaTema(savedTheme);   // o body só existe agora, se o script correu no <head>
    document.querySelectorAll('[data-theme-btn]').forEach(b=>{
      const light = (document.documentElement.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light':'dark')) === 'light';
      b.setAttribute('aria-pressed', light ? 'true' : 'false');
      b.setAttribute('title', light ? 'Tema claro' : 'Tema escuro');
      b.addEventListener('click', toggleTheme);
    });
    // progresso de páginas visitadas
    const path = location.pathname;
    const m = path.match(/aula(\d+)\/p(\d+)\.html/);
    if (m){
      const aula = m[1], pag = m[2];
      const key = NS+':a'+aula+':visited';
      const seen = JSON.parse(localStorage.getItem(key)||'[]');
      if (!seen.includes(pag)){ seen.push(pag); localStorage.setItem(key, JSON.stringify(seen)); }
    }
    // marcar links visitados no hub
    document.querySelectorAll('.pagina-card').forEach(a=>{
      const href = a.getAttribute('href')||'';
      const mm = href.match(/aula(\d+)\/p(\d+)\.html/);
      if (mm){
        const seen = JSON.parse(localStorage.getItem(NS+':a'+mm[1]+':visited')||'[]');
        if (seen.includes(mm[2])) a.classList.add('visitada');
      }
    });
    // progresso no topbar
    document.querySelectorAll('[data-progresso]').forEach(el=>{
      const aula = el.dataset.progresso;
      const total = parseInt(el.dataset.total||'0',10);
      const seen = JSON.parse(localStorage.getItem(NS+':a'+aula+':visited')||'[]');
      el.textContent = seen.length + '/' + total;
    });
  });
})();
/* ── Header que sai da frente ao descer e volta ao subir ────────────────────
   Pedido dele (01/08). Mesmo comportamento do chassi de gineco.
   Regras que evitam o header "tremendo":
     · só reage depois de 80px de rolagem — no topo ele fica sempre visível
     · precisa de 6px de movimento no mesmo sentido para trocar de estado
     · a leitura do scroll é jogada para o próximo frame (rAF), não a cada evento */
(function () {
  var header = document.getElementById('site-header');
  if (!header) return;
  var ultimo = window.scrollY, agendado = false;

  function avalia() {
    agendado = false;
    var y = window.scrollY;
    var delta = y - ultimo;
    if (Math.abs(delta) < 6) return;          // ruído de trackpad
    if (y < 80) {                             // perto do topo, sempre à mostra
      header.classList.remove('site-header--oculto');
    } else if (delta > 0) {
      header.classList.add('site-header--oculto');     // descendo → sai
    } else {
      header.classList.remove('site-header--oculto');  // subindo → volta
    }
    ultimo = y;
  }

  window.addEventListener('scroll', function () {
    if (!agendado) { agendado = true; requestAnimationFrame(avalia); }
  }, { passive: true });
})();
