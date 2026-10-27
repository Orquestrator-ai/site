/* quiz-a16.js — quiz universal da Aula 16. */
(function () {
  'use strict';
  function storageKey(quiz, q) {
    var page = document.body.getAttribute('data-page-id') || 'p1';
    var nn = ('0' + page.replace(/\D/g, '')).slice(-2);
    var qid = q.getAttribute('data-q') || '1';
    return 'obstetricia-premium:a16:p' + nn + ':quiz:v1:q' + qid;
  }
  function reveal(quiz, q, chosenIdx) {
    var alts = Array.prototype.slice.call(q.querySelectorAll('.quiz__alt'));
    var correctIdx = -1;
    alts.forEach(function (alt, i) {
      var correct = alt.getAttribute('data-correct') === 'true';
      if (correct) correctIdx = i;
      alt.classList.remove('correct', 'wrong');
      alt.setAttribute('aria-checked', String(i === chosenIdx));
      if (correct) alt.classList.add('correct');
      if (i === chosenIdx && !correct) alt.classList.add('wrong');
      alt.setAttribute('disabled', '');
      alt.setAttribute('tabindex', i === chosenIdx ? '0' : '-1');
    });
    var fb = q.querySelector('.quiz__fb');
    if (fb) {
      fb.classList.add('show');
      fb.removeAttribute('hidden');
      var verdict = fb.querySelector('.quiz__verdict');
      if (verdict) {
        var ok = chosenIdx === correctIdx;
        verdict.classList.toggle('ok', ok);
        verdict.classList.toggle('no', !ok);
        verdict.textContent = ok ? 'Correto.' : 'Não é essa — veja por quê:';
      }
    }
  }
  function save(quiz, q, idx) { try { localStorage.setItem(storageKey(quiz, q), String(idx)); } catch (_) {} }
  function load(quiz, q) { try { var v = localStorage.getItem(storageKey(quiz, q)); return v === null ? -1 : parseInt(v, 10); } catch (_) { return -1; } }
  document.querySelectorAll('.quiz').forEach(function (quiz) {
    quiz.querySelectorAll('.quiz__q').forEach(function (q) {
      var alts = Array.prototype.slice.call(q.querySelectorAll('.quiz__alt'));
      var altsBox = q.querySelector('.quiz__alts');
      if (altsBox) {
        altsBox.setAttribute('role', 'radiogroup');
        var stem = q.querySelector('.quiz__stem');
        if (stem) {
          if (!stem.id) stem.id = (quiz.getAttribute('data-quiz-id') || 'quiz') + '-' + (q.getAttribute('data-q') || '0') + '-stem';
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
        alt.addEventListener('keydown', function (event) {
          if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); alt.click(); return; }
          var dir = 0;
          if (event.key === 'ArrowDown' || event.key === 'ArrowRight') dir = 1;
          if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') dir = -1;
          if (!dir) return;
          event.preventDefault();
          var next = (i + dir + alts.length) % alts.length;
          alts.forEach(function (node, j) { node.setAttribute('tabindex', j === next ? '0' : '-1'); });
          alts[next].focus();
        });
      });
      var previous = load(quiz, q);
      if (previous >= 0 && previous < alts.length) reveal(quiz, q, previous);
    });
  });
})();
