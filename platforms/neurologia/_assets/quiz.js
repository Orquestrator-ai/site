/* quiz.js — quiz universal Bauer
   - cada pergunta é um <form class="quiz__q" data-quiz data-gabarito="B">
   - alternativas: <label class="alt"><input type="radio" name="qN" value="A"><span>...</span></label>
   - botão [data-quiz-verificar]
   - explicação verbatim em [data-quiz-explicacao] (hidden até revelar)
   - persiste acertos em localStorage (namespace neuro-dm)
   - ARIA: role=group, aria-live, operável por teclado (radio nativo)
*/
(function(){
  'use strict';
  const NS = 'neuro-dm';
  function fecharResposta(form, chave, correta){
    const gabarito = form.dataset.gabarito;
    form.querySelectorAll('.alt').forEach(l=>{
      const inp = l.querySelector('input[type=radio]');
      if (!inp) return;
      const v = inp.value;
      l.classList.remove('alt--certa','alt--errada','alt--marcada');
      if (v === gabarito) l.classList.add('alt--certa');
      if (inp.checked && v !== gabarito) l.classList.add('alt--marcada');
    });
    const exp = form.parentElement.querySelector('[data-quiz-explicacao]');
    if (exp){
      exp.hidden = false;
      exp.setAttribute('aria-hidden','false');
    }
    // persiste
    const key = NS+':quiz:'+chave;
    const acertou = correta ? 1 : 0;
    localStorage.setItem(key, String(acertou));
    // anúncio
    const live = form.parentElement.querySelector('[data-quiz-live]');
    if (live){
      live.textContent = correta ? 'Resposta correta.' : 'Resposta incorreta — veja a explicação de cada alternativa.';
    }
  }
  window.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('[data-quiz-verificar]').forEach(btn=>{
      // se já respondido, marca estado
      const form = btn.closest('form');
      if (!form) return;
      const chave = form.dataset.quizId || form.dataset.gabarito;
      const prev = localStorage.getItem(NS+':quiz:'+(form.dataset.quizId||''));
      if (prev !== null){
        // restaura visual sem bloquear re-interação
      }
      btn.addEventListener('click', ()=>{
        const gabarito = form.dataset.gabarito;
        const sel = form.querySelector('input[type=radio]:checked');
        if (!sel){
          const live = form.parentElement.querySelector('[data-quiz-live]');
          if (live) live.textContent = 'Escolha uma alternativa para verificar.';
          return;
        }
        const correta = sel.value === gabarito;
        fecharResposta(form, form.dataset.quizId||'', correta);
        btn.disabled = true;
        btn.textContent = correta ? '✓ Correto' : '✗ Verificar novamente';
        if (!correta){
          // permite tentar de novo após revelar
          setTimeout(()=>{ btn.disabled = false; btn.textContent='Verificar resposta'; }, 900);
        }
      });
    });
  });
})();