(function () {
  'use strict';

  const NS = 'fm3-gbs-';
  const pageMatch = location.pathname.match(/\/p(\d+)\.html$/);
  const pageNumber = pageMatch ? pageMatch[1] : '1';

  function readResult(key) {
    try {
      return localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  }

  function saveResult(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (_) {
      // O quiz continua funcional quando o navegador bloqueia armazenamento local.
    }
  }

  window.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-quiz]').forEach(function (quiz) {
      quiz.querySelectorAll('.quiz__pergunta').forEach(function (question, index) {
        const questionId = NS + 'p' + pageNumber + '-q' + (index + 1);
        const alternatives = [];
        let verifyButton = null;
        let explanation = null;
        let node = question.nextElementSibling;

        while (node && !node.classList.contains('quiz__pergunta')) {
          if (node.matches('button.alt')) alternatives.push(node);
          if (node.matches('[data-quiz-verificar]')) verifyButton = node;
          if (node.matches('[data-quiz-explicacao]')) explanation = node;
          node = node.nextElementSibling;
        }

        if (!alternatives.length || !verifyButton || !explanation) return;

        const live = document.createElement('p');
        live.dataset.quizLive = '';
        live.id = questionId + '-status';
        live.setAttribute('role', 'status');
        live.setAttribute('aria-live', 'polite');
        verifyButton.insertAdjacentElement('afterend', live);

        explanation.hidden = true;
        explanation.setAttribute('aria-hidden', 'true');

        alternatives.forEach(function (alternative) {
          alternative.type = 'button';
          alternative.setAttribute('aria-pressed', 'false');
          alternative.setAttribute('aria-describedby', live.id);
          alternative.addEventListener('click', function () {
            alternatives.forEach(function (item) {
              item.classList.remove('alt--marcada', 'alt--certa');
              item.setAttribute('aria-pressed', 'false');
            });
            alternative.classList.add('alt--marcada');
            alternative.setAttribute('aria-pressed', 'true');
            live.textContent = 'Alternativa ' + alternative.dataset.l + ' selecionada.';
          });
        });

        verifyButton.type = 'button';
        verifyButton.addEventListener('click', function () {
          const selected = alternatives.find(function (item) {
            return item.getAttribute('aria-pressed') === 'true';
          });

          if (!selected) {
            live.textContent = 'Escolha uma alternativa para verificar.';
            return;
          }

          const correct = selected.dataset.gabarito === '1';
          alternatives.forEach(function (item) {
            item.classList.toggle('alt--certa', item.dataset.gabarito === '1');
          });
          explanation.hidden = false;
          explanation.setAttribute('aria-hidden', 'false');
          live.textContent = correct
            ? 'Resposta correta.'
            : 'Resposta incorreta — confira a explicação.';
          saveResult(NS + 'quiz:' + questionId, correct ? '1' : '0');
        });

        if (readResult(NS + 'quiz:' + questionId) === '1') {
          alternatives.forEach(function (item) {
            item.classList.toggle('alt--certa', item.dataset.gabarito === '1');
          });
          explanation.hidden = false;
          explanation.setAttribute('aria-hidden', 'false');
          live.textContent = 'Resposta correta salva anteriormente.';
        }
      });
    });
  });
})();
