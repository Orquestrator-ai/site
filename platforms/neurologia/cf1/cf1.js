(function () {
  "use strict";
  var page = document.body.getAttribute("data-page-id") || "p1";
  var nn = (page.replace("p", "") || "1").padStart(2, "0");
  var quizKey = "neurologia-cefaleia:cf1:p" + nn + ":quiz:v1";
  var uiKey = "neurologia-cefaleia:cf1:p" + nn + ":ui:v1";

  var lightContrastStyle = document.createElement("style");
  lightContrastStyle.id = "cf1-light-contrast";
  lightContrastStyle.textContent =
    ':root[data-theme="light"], body[data-theme="light"] {' +
    "--ciano:#0e7490;--indigo:#4338ca;--verde:#047857;" +
    "--coral:#be123c;--amber:#92400e;" +
    "}" +
    ".cf1-inline-svg [tabindex]:focus-visible{" +
    "outline:3px solid var(--amber);outline-offset:3px;" +
    "filter:drop-shadow(0 0 4px var(--amber)) brightness(1.1);" +
    "}";
  document.head.appendChild(lightContrastStyle);

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* Espelha o tema do chassi no <html>, usado pelos SVGs self-contained. */
  function syncSvgTheme() {
    var theme = document.body.getAttribute("data-theme") || "dark";
    document.documentElement.setAttribute("data-theme", theme);
  }
  syncSvgTheme();
  new MutationObserver(syncSvgTheme).observe(document.body, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });

  /* Mantém controles SVG com alvo mínimo de 24 px mesmo quando a peça encolhe no mobile. */
  function expandSvgHitAreas() {
    document.querySelectorAll(".cf1-inline-svg").forEach(function (svg) {
      svg.style.overflow = "hidden";
    });
    document.querySelectorAll(
      ".cf1-inline-svg g[role='button'], .cf1-inline-svg g[onclick], .cf1-inline-svg g.hotspot"
    ).forEach(function (target) {
      var previous = target.querySelector(".cf1-hit-area");
      if (previous) previous.remove();
      if (target.closest("[hidden]") || target.getClientRects().length === 0) return;

      var matrix = target.getScreenCTM();
      if (!matrix) return;
      var scaleX = Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b);
      var scaleY = Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d);
      if (!scaleX || !scaleY) return;

      var box = target.getBBox();
      var minWidth = 26 / scaleX;
      var minHeight = 26 / scaleY;
      if (box.width >= minWidth && box.height >= minHeight) return;

      var width = Math.max(box.width, minWidth);
      var height = Math.max(box.height, minHeight);
      var hitArea = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      hitArea.setAttribute("class", "cf1-hit-area");
      hitArea.setAttribute("x", String(box.x - (width - box.width) / 2));
      hitArea.setAttribute("y", String(box.y - (height - box.height) / 2));
      hitArea.setAttribute("width", String(width));
      hitArea.setAttribute("height", String(height));
      hitArea.setAttribute("fill", "transparent");
      hitArea.setAttribute("pointer-events", "all");
      hitArea.setAttribute("aria-hidden", "true");
      hitArea.setAttribute("focusable", "false");
      target.insertBefore(hitArea, target.firstChild);
    });
  }

  var hitAreaTimer = 0;
  function scheduleSvgHitAreas() {
    window.clearTimeout(hitAreaTimer);
    hitAreaTimer = window.setTimeout(expandSvgHitAreas, 50);
  }
  window.requestAnimationFrame(expandSvgHitAreas);
  window.addEventListener("load", expandSvgHitAreas);
  window.addEventListener("resize", scheduleSvgHitAreas);

  /* Impede que os dois botões da navegação alarguem a página em telas de 320 px. */
  function syncCompactNavigation() {
    var compact = window.matchMedia("(max-width: 380px)").matches;
    document.querySelectorAll(".page-nav__btn").forEach(function (button) {
      button.style.minWidth = compact ? "0" : "";
      button.style.flex = compact ? "1 1 0" : "";
      button.style.paddingInline = compact ? "8px" : "";
    });
  }
  syncCompactNavigation();
  window.addEventListener("resize", syncCompactNavigation);

  /* Menu */
  var menuBtn = document.getElementById("menu-toggle");
  var overlay = document.getElementById("menu-overlay");
  function closeMenu() {
    if (!overlay || !menuBtn) return;
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    overlay.inert = true;
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    menuBtn.focus();
  }
  function openMenu() {
    if (!overlay || !menuBtn) return;
    overlay.inert = false;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    var firstLink = overlay.querySelector("a[href]");
    if (firstLink) firstLink.focus();
  }
  if (menuBtn && overlay) {
    overlay.inert = true;
    menuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (overlay.classList.contains("is-open")) closeMenu(); else openMenu();
    });
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closeMenu(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  /* Quiz */
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
        if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); (alts[idx + 1] || alts[0]).focus(); }
        else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); (alts[idx - 1] || alts[alts.length - 1]).focus(); }
        else if (e.key === " " || e.key === "Enter") { e.preventDefault(); reveal(btn); }
      });
    });
    var st = quizState[qn];
    if (st && st.choice) {
      var match = alts.find(function (a) { return a.textContent.trim().charAt(0) === st.choice; });
      if (match) reveal(match);
    }
  });

  /* UI state (checkboxes + toggles persistentes) */
  var uiState = {};
  try { uiState = JSON.parse(lsGet(uiKey) || "{}") || {}; } catch (e) { uiState = {}; }
  document.querySelectorAll("input[data-ui]").forEach(function (inp) {
    var k = inp.getAttribute("data-ui");
    if (uiState[k]) inp.checked = true;
    inp.addEventListener("change", function () { uiState[k] = inp.checked; lsSet(uiKey, JSON.stringify(uiState)); });
  });

  /* P1 / P8 — funil-PS toggle */
  var funilOut = document.getElementById("cf1-funil-out");
  if (funilOut) {
    var funilMsgs = window.CF1_FUNIL_MSGS || {};
    document.querySelectorAll(".funil-btn").forEach(function (btn) {
      var k = btn.getAttribute("data-funil");
      if (uiState["funil-" + k]) btn.setAttribute("aria-pressed", "true");
      function setFunil() {
        document.querySelectorAll(".funil-btn").forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
        uiState["funil-active"] = k; lsSet(uiKey, JSON.stringify(uiState));
        if (funilMsgs[k]) funilOut.innerHTML = funilMsgs[k];
      }
      btn.addEventListener("click", setFunil);
      btn.addEventListener("keydown", function (e) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); setFunil(); } });
    });
    var akt = uiState["funil-active"];
    if (akt) { var ab = document.querySelector('.funil-btn[data-funil="' + akt + '"]'); if (ab) ab.click(); }
  }

  /* P2 — flip-cards */
  document.querySelectorAll(".flip-card").forEach(function (fc) {
    fc.setAttribute("aria-pressed", "false");
    function flip() {
      var next = fc.getAttribute("aria-pressed") === "true" ? "false" : "true";
      fc.setAttribute("aria-pressed", next);
    }
    fc.addEventListener("click", flip);
    fc.addEventListener("keydown", function (e) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); } });
  });

  /* P4 — curve toggle */
  var curveOut = document.getElementById("cf1-curve-out");
  if (curveOut) {
    var curveMsgs = window.CF1_CURVE_MSGS || {};
    document.querySelectorAll(".curve-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".curve-btn").forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var k = btn.getAttribute("data-curve");
        if (curveMsgs[k]) curveOut.innerHTML = curveMsgs[k];
      });
    });
  }

  /* P7 — context grid expand */
  document.querySelectorAll(".ctx-item").forEach(function (it) {
    it.setAttribute("aria-expanded", "false");
    function tog() {
      var n = it.getAttribute("aria-expanded") === "true" ? "false" : "true";
      it.setAttribute("aria-expanded", n);
    }
    it.addEventListener("click", tog);
    it.addEventListener("keydown", function (e) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); tog(); } });
  });

  /* P9 — raias */
  document.querySelectorAll(".rai").forEach(function (r) {
    r.setAttribute("aria-pressed", "false");
    function tog() {
      var n = r.getAttribute("aria-pressed") === "true" ? "false" : "true";
      r.setAttribute("aria-pressed", n);
    }
    r.addEventListener("click", tog);
    r.addEventListener("keydown", function (e) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); tog(); } });
  });

  /* P10 — tabelão filter */
  var filterBtns = document.querySelectorAll(".filter-btn");
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var axis = btn.getAttribute("data-filter");
        document.querySelectorAll(".tabelao__card, .tabelao__table tbody tr").forEach(function (row) {
          var ra = row.getAttribute("data-axis") || "all";
          if (axis === "all" || ra.indexOf(axis) !== -1) { row.style.display = ""; }
          else { row.style.display = "none"; }
        });
      });
    });
  }
})();