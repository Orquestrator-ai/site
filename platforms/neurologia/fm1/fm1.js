(function () {
  "use strict";
  var page = document.body.getAttribute("data-page-id") || "p1";
  var nn = (page.replace("p", "") || "1").padStart(2, "0");
  var quizKey = "neurologia-fraqueza:fm1:p" + nn + ":quiz:v1";
  var uiKey = "neurologia-fraqueza:fm1:p" + nn + ":ui:v1";
  var themeKey = "neurologia-fraqueza:fm1:theme:v1";

  function lsGet(k) {
    try { return localStorage.getItem(k); } catch (e) { return null; }
  }
  function lsSet(k, v) {
    try { localStorage.setItem(k, v); } catch (e) {}
  }

  // Theme
  var root = document.body;
  var savedTheme = lsGet(themeKey);
  if (savedTheme === "light" || savedTheme === "dark") root.setAttribute("data-theme", savedTheme);
  var themeBtn = document.getElementById("theme-toggle");
  function syncThemeBtn() {
    if (!themeBtn) return;
    var light = root.getAttribute("data-theme") === "light";
    themeBtn.setAttribute("aria-pressed", light ? "true" : "false");
  }
  syncThemeBtn();
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      lsSet(themeKey, next);
      syncThemeBtn();
    });
  }

  // Menu
  var menuBtn = document.getElementById("menu-toggle");
  var overlay = document.getElementById("menu-overlay");
  function closeMenu() {
    if (!overlay || !menuBtn) return;
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  function openMenu() {
    if (!overlay || !menuBtn) return;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  if (menuBtn && overlay) {
    menuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (overlay.classList.contains("is-open")) closeMenu(); else openMenu();
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  // Quiz
  var quizState = {};
  try { quizState = JSON.parse(lsGet(quizKey) || "{}") || {}; } catch (e) { quizState = {}; }

  document.querySelectorAll(".quiz__question").forEach(function (qEl) {
    var qn = qEl.getAttribute("data-q");
    var alts = Array.prototype.slice.call(qEl.querySelectorAll(".quiz__alt"));
    var fb = qEl.querySelector(".quiz__feedback");
    var verdict = qEl.querySelector(".quiz__verdict");

    function reveal(btn) {
      var ok = btn.getAttribute("data-correct") === "true";
      alts.forEach(function (a) {
        a.setAttribute("aria-checked", a === btn ? "true" : "false");
        a.classList.remove("is-correct", "is-wrong");
        if (a.getAttribute("data-correct") === "true") a.classList.add("is-correct");
        if (a === btn && !ok) a.classList.add("is-wrong");
      });
      if (fb) {
        fb.hidden = false;
        if (verdict) {
          verdict.textContent = ok ? "Correto" : "Não é essa";
          verdict.classList.toggle("is-ok", ok);
          verdict.classList.toggle("is-bad", !ok);
        }
      }
      quizState[qn] = { choice: btn.textContent.trim().charAt(0), correct: ok };
      lsSet(quizKey, JSON.stringify(quizState));
    }

    alts.forEach(function (btn, idx) {
      btn.addEventListener("click", function () { reveal(btn); });
      btn.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          (alts[idx + 1] || alts[0]).focus();
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          (alts[idx - 1] || alts[alts.length - 1]).focus();
        } else if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          reveal(btn);
        }
      });
    });

    // restore
    var st = quizState[qn];
    if (st && st.choice) {
      var match = alts.find(function (a) { return a.textContent.trim().charAt(0) === st.choice; });
      if (match) reveal(match);
    }
  });

  // UI checkboxes P1
  var uiState = {};
  try { uiState = JSON.parse(lsGet(uiKey) || "{}") || {}; } catch (e) { uiState = {}; }
  document.querySelectorAll("input[data-ui]").forEach(function (inp) {
    var k = inp.getAttribute("data-ui");
    if (uiState[k]) inp.checked = true;
    inp.addEventListener("change", function () {
      uiState[k] = inp.checked;
      lsSet(uiKey, JSON.stringify(uiState));
    });
  });

  // Chain hero P4
  var chain = document.getElementById("fm1p4h-chain");
  if (chain) {
    var note = document.getElementById("fm1p4h-note");
    var msgs = {
      "1": "1º NMS: comando cortical até a sinapse medular — mesmo sítio (AVE/tumor/TRM) = mesma síndrome piramidal.",
      "2": "2º NMS: corno anterior / nervo — flácido, hiporreflexo, atrofia grave ± fasciculação.",
      "3": "Placa: ACh na fenda — força que varia com o uso (MG até prova em contrário).",
      "4": "Músculo: última peça — proximal simétrico + CPK; a ‘sacola’ depende da massa muscular."
    };
    chain.querySelectorAll(".chain-hero__floor").forEach(function (btn) {
      btn.addEventListener("click", function () {
        chain.querySelectorAll(".chain-hero__floor").forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        if (note) note.textContent = msgs[btn.getAttribute("data-floor")] || note.textContent;
      });
    });
  }

  // Curve toggle P8
  var curveOut = document.getElementById("fm1-p08-curve");
  if (curveOut) {
    document.querySelectorAll(".curve-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".curve-btn").forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        if (btn.getAttribute("data-curve") === "facil") {
          curveOut.innerHTML = "Facilitação: quanto mais usa, <strong class=\"term\">mais forte</strong> — também existe em doença de placa (menos o default prático).";
        } else {
          curveOut.innerHTML = "Quanto mais usa, <strong class=\"term\">mais fraco</strong> — marca prática da placa (MG até prova em contrário).";
        }
      });
    });
  }

  // O header do chassi sai durante a descida e volta quando a leitura sobe.
  var header = document.getElementById("site-header");
  if (header) {
    var lastScrollY = window.scrollY;
    var scrollScheduled = false;

    function updateHeader() {
      scrollScheduled = false;
      var currentScrollY = window.scrollY;
      var delta = currentScrollY - lastScrollY;
      if (Math.abs(delta) < 6) return;

      if (currentScrollY < 80 || delta < 0) {
        header.classList.remove("site-header--oculto");
      } else {
        header.classList.add("site-header--oculto");
      }
      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", function () {
      if (!scrollScheduled) {
        scrollScheduled = true;
        window.requestAnimationFrame(updateHeader);
      }
    }, { passive: true });
  }
})();
