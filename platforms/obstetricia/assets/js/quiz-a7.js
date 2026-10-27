/* quiz-a7.js — quiz gold da Aula 7 (Incontinência urinária): feedback imediato, revela TODAS as
   alternativas (gabarito + porquê de cada distrator), persistência localStorage por página, ARIA
   (radiogroup/radio) + teclado. Namespace próprio go-a7-quiz-* (não colide com as Aulas 1–6).
   Clone de quiz-a6.js. NÃO editar quiz.js genérico. */
(function () {
  'use strict';
  var NS = 'go-a7-quiz-';

  function keyFor(quiz, q) {
    return NS + (quiz.getAttribute('data-quiz-id') || 'q') + '-' + q.getAttribute('data-q');
  }

  function reveal(quiz, q, chosenIdx) {
    var alts = Array.prototype.slice.call(q.querySelectorAll('.quiz__alt'));
    var correctIdx = -1;
    alts.forEach(function (a, i) {
      var correct = a.getAttribute('data-correct') === 'true';
      if (correct) correctIdx = i;
      a.classList.remove('correct', 'wrong');
      a.setAttribute('aria-checked', String(i === chosenIdx));
      if (correct) a.classList.add('correct');
      if (i === chosenIdx && !correct) a.classList.add('wrong');
      a.setAttribute('disabled', '');
      a.setAttribute('tabindex', i === chosenIdx ? '0' : '-1');
    });
    var fb = q.querySelector('.quiz__fb');
    if (fb) {
      fb.classList.add('show');
      var verdict = fb.querySelector('.quiz__verdict');
      if (verdict) {
        var ok = chosenIdx === correctIdx;
        verdict.classList.toggle('ok', ok);
        verdict.classList.toggle('no', !ok);
        verdict.textContent = ok ? 'Correto.' : 'Não é essa — veja por quê:';
      }
    }
  }

  function save(quiz, q, idx) { try { localStorage.setItem(keyFor(quiz, q), String(idx)); } catch (_) {} }
  function load(quiz, q) { try { var v = localStorage.getItem(keyFor(quiz, q)); return v === null ? -1 : parseInt(v, 10); } catch (_) { return -1; } }

  document.querySelectorAll('.quiz').forEach(function (quiz) {
    quiz.querySelectorAll('.quiz__q').forEach(function (q) {
      var alts = Array.prototype.slice.call(q.querySelectorAll('.quiz__alt'));
      var altsBox = q.querySelector('.quiz__alts');
      if (altsBox) {
        altsBox.setAttribute('role', 'radiogroup');
        var stem = q.querySelector('.quiz__stem');
        if (stem) {
          if (!stem.id) {
            stem.id = (quiz.getAttribute('data-quiz-id') || 'quiz') + '-' + (q.getAttribute('data-q') || '0') + '-stem';
          }
          altsBox.setAttribute('aria-labelledby', stem.id);
        }
      }
      alts.forEach(function (alt, i) {
        alt.setAttribute('role', 'radio');
        alt.setAttribute('aria-checked', 'false');
        alt.setAttribute('tabindex', i === 0 ? '0' : '-1');
        alt.addEventListener('click', function () {
          if (alt.hasAttribute('disabled')) return;
          reveal(quiz, q, i); save(quiz, q, i);
        });
        alt.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); alt.click(); return; }
          var dir = 0;
          if (e.key === 'ArrowDown' || e.key === 'ArrowRight') dir = 1;
          if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') dir = -1;
          if (dir === 0) return;
          e.preventDefault();
          var n = (i + dir + alts.length) % alts.length;
          alts.forEach(function (a, j) { a.setAttribute('tabindex', j === n ? '0' : '-1'); });
          alts[n].focus();
        });
      });
      var prev = load(quiz, q);
      if (prev >= 0 && prev < alts.length) reveal(quiz, q, prev);
    });
  });
})();
