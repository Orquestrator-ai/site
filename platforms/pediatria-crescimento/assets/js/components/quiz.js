/* quiz.js — quiz universal (portado do template antibioticoterapia)
   Suporta DUAS convenções no mesmo DOM:
   (A) Antibio: .quiz__question + .quiz__alt[data-correct] + .quiz__feedback
   (B) Legada Bauer: .quiz .opt[data-correct] + (.opt-comment por alternativa)

   v2 (Ajuste Bauer — quiz por alternativa profundo):
   Ao responder, revela o comentário de TODAS as alternativas (.opt-comment),
   não só a escolhida — o aluno vê por que cada letra está certa/errada.
   Mantém veredito (Correto/Reveja), destaque visual correta/incorreta,
   idempotência, teclado e localStorage. Compatível com quizzes antigos que
   ainda só tenham .explain (fallback: revela o .explain). */

export function initQuiz({ namespace = 'cironco2' } = {}) {
  const NS = namespace + ':quiz:';
  const save = (k, v) => { try { localStorage.setItem(NS + k, JSON.stringify(v)); } catch (_) {} };
  const load = (k) => { try { return JSON.parse(localStorage.getItem(NS + k) || 'null'); } catch (_) { return null; } };

  // ---- Convenção A: .quiz__question ----
  document.querySelectorAll('.quiz__question:not([data-bound])').forEach((q, qi) => {
    q.setAttribute('data-bound', '1');
    const id = q.dataset.qid || ('qa-' + qi);
    const alts = Array.from(q.querySelectorAll('.quiz__alt'));
    const feedback = q.querySelector('.quiz__feedback');
    const reveal = (chosen) => {
      alts.forEach((a) => {
        a.setAttribute('data-revealed', 'true');
        a.disabled = true;
        if (a === chosen) a.setAttribute('aria-checked', 'true');
      });
      if (feedback) {
        feedback.hidden = false;
        const ok = chosen && chosen.dataset.correct === 'true';
        const verdict = feedback.querySelector('.quiz__verdict');
        if (verdict) { verdict.dataset.tone = ok ? 'ok' : 'err'; verdict.textContent = ok ? 'Correto' : 'Reveja'; }
      }
      save(id, { answered: true, choice: chosen ? alts.indexOf(chosen) : -1 });
    };
    alts.forEach((a) => a.addEventListener('click', () => reveal(a)));
    const st = load(id);
    if (st && st.answered) reveal(st.choice >= 0 ? alts[st.choice] : null);
  });

  // ---- Convenção B: .quiz .opt (legada, feedback por alternativa) ----
  document.querySelectorAll('.quiz:not([data-bound-legacy])').forEach((quiz) => {
    const opts = Array.from(quiz.querySelectorAll('.opt'));
    if (!opts.length) return; // é quiz convenção A, ignora
    quiz.setAttribute('data-bound-legacy', '1');
    const id = quiz.dataset.quizId || quiz.dataset.qid || Math.random().toString(36).slice(2);

    // Comentário específico de cada alternativa (logo após o botão .opt).
    const commentFor = (opt) => {
      const next = opt.nextElementSibling;
      return next && next.classList && next.classList.contains('opt-comment') ? next : null;
    };
    const explain = quiz.querySelector('.explain'); // fallback (quizzes ainda não migrados)

    // Veredito geral (Correto/Reveja) — injetado uma única vez, idempotente.
    let verdict = quiz.querySelector('.quiz-verdict');
    if (!verdict) {
      verdict = document.createElement('p');
      verdict.className = 'quiz-verdict';
      verdict.setAttribute('aria-live', 'polite');
      verdict.hidden = true;
      const anchor = explain || quiz.lastElementChild;
      if (explain) quiz.insertBefore(verdict, explain);
      else quiz.appendChild(verdict);
    }

    const reveal = (chosen) => {
      opts.forEach((o) => {
        const correct = o.dataset.correct === 'true';
        if (correct) o.classList.add('correct');
        if (o === chosen && !correct) o.classList.add('incorrect');
        o.setAttribute('aria-pressed', String(o === chosen));
        o.disabled = true;
        // revela o comentário de TODAS as alternativas
        const c = commentFor(o);
        if (c) {
          c.setAttribute('data-show', 'true');
          if (correct) c.classList.add('opt-comment--correct');
          if (o === chosen && !correct) c.classList.add('opt-comment--chosen');
        }
      });
      const ok = chosen && chosen.dataset.correct === 'true';
      if (verdict) {
        verdict.hidden = false;
        verdict.dataset.tone = ok ? 'ok' : 'err';
        verdict.textContent = ok ? 'Correto' : 'Reveja — confira os comentários abaixo';
      }
      // fallback: se não há .opt-comment, ainda revela o .explain antigo
      const hasComments = opts.some((o) => commentFor(o));
      if (!hasComments && explain) explain.removeAttribute('hidden');
      save(id, { answered: true, choice: chosen ? opts.indexOf(chosen) : -1 });
    };

    opts.forEach((o, i) => {
      o.setAttribute('type', 'button');
      o.addEventListener('click', () => reveal(o));
      o.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault(); (opts[(i + 1) % opts.length]).focus();
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault(); (opts[(i - 1 + opts.length) % opts.length]).focus();
        }
      });
    });

    const st = load(id);
    if (st && st.answered) reveal(st.choice >= 0 ? opts[st.choice] : null);
  });
}
