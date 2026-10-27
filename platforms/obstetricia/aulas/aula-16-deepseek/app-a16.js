/* AULA 16 — JS compartilhado — obstetricia-premium */
(function(){
  'use strict';
  const STORAGE_KEY = 'obstetricia-premium:a16:';
  const TOTAL_PAGES = 15;

  // Tema
  const themeToggle = document.getElementById('theme-toggle');
  function applyTheme(t){
    document.documentElement.setAttribute('data-theme', t);
    if(themeToggle) themeToggle.setAttribute('aria-pressed', t === 'light' ? 'true' : 'false');
    localStorage.setItem(STORAGE_KEY + 'theme', t);
  }
  const savedTheme = localStorage.getItem(STORAGE_KEY + 'theme') || 'dark';
  applyTheme(savedTheme);
  if(themeToggle){
    themeToggle.addEventListener('click', function(){
      const cur = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(cur === 'dark' ? 'light' : 'dark');
    });
  }

  // Menu
  const menuToggle = document.getElementById('menu-toggle');
  const menuOverlay = document.getElementById('menu-overlay');
  if(menuToggle && menuOverlay){
    menuToggle.addEventListener('click', function(){
      const open = menuOverlay.getAttribute('aria-hidden') !== 'true';
      menuOverlay.setAttribute('aria-hidden', open ? 'true' : 'false');
      menuToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
    menuOverlay.addEventListener('click', function(e){
      if(e.target === menuOverlay){
        menuOverlay.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Progresso
  const pageEl = document.querySelector('.page.is-active');
  const progressEl = document.getElementById('progress');
  if(pageEl && progressEl){
    const pageId = pageEl.getAttribute('data-page');
    if(pageId){
      const num = pageId === 'p1' ? 1 : parseInt(pageId.replace('p',''),10);
      progressEl.textContent = num + '/' + TOTAL_PAGES;
    }
  }

  // Quiz
  document.querySelectorAll('.a16-quiz').forEach(function(quiz){
    const pageId = quiz.getAttribute('data-page');
    if(!pageId) return;
    const quizKey = STORAGE_KEY + pageId + ':quiz:v1';
    const saved = JSON.parse(localStorage.getItem(quizKey) || '{}');

    quiz.querySelectorAll('.a16-quiz__q').forEach(function(q, qi){
      const qKey = 'q' + qi;
      const opts = q.querySelectorAll('.a16-quiz__opt');
      const fb = q.querySelector('.a16-quiz__feedback');

      // Restore saved state
      if(saved[qKey] !== undefined){
        opts.forEach(function(o){
          if(o.getAttribute('data-value') === saved[qKey]){
            o.classList.add('is-selected');
            if(o.getAttribute('data-correct') === 'true'){
              o.classList.add('is-correct');
              if(fb){ fb.classList.add('is-visible','a16-quiz__feedback--correct'); }
            } else {
              o.classList.add('is-wrong');
              if(fb){ fb.classList.add('is-visible','a16-quiz__feedback--wrong'); }
            }
          }
        });
      }

      opts.forEach(function(opt){
        opt.addEventListener('click', function(){
          if(saved[qKey] !== undefined) return; // já respondida
          const val = opt.getAttribute('data-value');
          const correct = opt.getAttribute('data-correct') === 'true';

          opts.forEach(function(o){ o.classList.remove('is-selected'); });
          opt.classList.add('is-selected');

          if(correct){
            opt.classList.add('is-correct');
            if(fb){ fb.classList.add('is-visible','a16-quiz__feedback--correct'); }
          } else {
            opt.classList.add('is-wrong');
            if(fb){ fb.classList.add('is-visible','a16-quiz__feedback--wrong'); }
            // highlight correct
            opts.forEach(function(o){
              if(o.getAttribute('data-correct') === 'true') o.classList.add('is-correct');
            });
          }

          saved[qKey] = val;
          localStorage.setItem(quizKey, JSON.stringify(saved));
        });

        // Keyboard
        opt.addEventListener('keydown', function(e){
          if(e.key === 'Enter' || e.key === ' '){
            e.preventDefault();
            opt.click();
          }
        });
      });
    });
  });
})();
