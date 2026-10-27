/* =========================================================================
   GO PREMIUM · DOENÇAS CLÍNICAS NA GRAVIDEZ — RUNTIME
   Router por hash · sidebar · tema · componentes interativos
   -------------------------------------------------------------------------
   Esta camada de infraestrutura é genérica (theme + sidebar + router +
   componentes reutilizáveis: flashcards, quiz, case-match, hotspots,
   stepper, layer-toggle, filter-table, reveal-on-scroll).
   Os componentes específicos da plataforma — listados em
   docs/componentes-interativos.md — são registrados como stubs neste
   ciclo (Prompt 1) e implementados em conteúdo no Prompt 2.
   ========================================================================= */

(function(){
  "use strict";

  // ---------- THEME (dark/light via body.dark-mode) ----------
  const themeBtn = document.getElementById("themeBtn");
  const savedTheme = localStorage.getItem("go-theme");
  const prefDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialDark = savedTheme ? savedTheme === "dark" : prefDark;
  if (initialDark) document.body.classList.add("dark-mode");
  if (themeBtn) themeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("go-theme", isDark ? "dark" : "light");
  });

  // ---------- MENU MOBILE ----------
  const menuBtn = document.getElementById("menuBtn");
  const scrim = document.getElementById("scrim");
  function setMenu(open){
    document.body.dataset.menu = open ? "open" : "closed";
  }
  if (menuBtn) menuBtn.addEventListener("click", () => setMenu(document.body.dataset.menu !== "open"));
  if (scrim) scrim.addEventListener("click", () => setMenu(false));

  // ---------- SIDEBAR COLLAPSE (desktop) ----------
  const savedCollapsed = localStorage.getItem("go-collapsed") === "1";
  if (savedCollapsed) document.body.classList.add("sidebar-collapsed");
  function toggleCollapse(){
    const c = document.body.classList.toggle("sidebar-collapsed");
    localStorage.setItem("go-collapsed", c ? "1" : "0");
  }
  const topCollapseBtn = document.getElementById("topCollapseBtn");
  if (topCollapseBtn) topCollapseBtn.addEventListener("click", toggleCollapse);

  // ---------- SIDEBAR ----------
  const sidebarEl = document.getElementById("sidebar");
  function buildSidebar(){
    const pages = window.GO_PAGES || window.EPI_PAGES || window.NEFRO_PAGES || [];
    const ICONS = window.GO_ICONS || window.EPI_ICONS || window.NEFRO_ICONS || {};
    const sections = [];
    const seen = new Map();
    pages.forEach(p => {
      if (!seen.has(p.section)){
        seen.set(p.section, { name: p.section, items: [] });
        sections.push(seen.get(p.section));
      }
      seen.get(p.section).items.push(p);
    });

    let html = `
      <div class="sidebar-panel">
        <div class="sidebar-panel__top">
          <a href="#hero" class="brand" aria-label="Voltar à capa">
            <div class="brand__orb">${ICONS.compass || "GO"}</div>
            <div class="brand__copy">
              <h1>GO Premium</h1>
              <p>doenças clínicas na gravidez</p>
            </div>
          </a>
          <div class="sidebar-toolbar">
            <span class="sidebar-kicker">${pages.length} páginas</span>
            <button id="collapseBtn" class="icon-btn sidebar-collapse-btn" aria-label="Recolher menu lateral" title="Recolher menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 6l-6 6 6 6"/></svg>
            </button>
          </div>
        </div>
        <nav class="sidebar-nav" aria-label="Navegação principal">`;

    sections.forEach(s => {
      html += `<div class="nav-section">
        <div class="nav-section-title">${s.name}</div>`;
      s.items.forEach(p => {
        const ic = ICONS[p.icon] || `<span>${p.num}</span>`;
        html += `<a class="nav-link" href="#${p.id}" data-page="${p.id}" data-tooltip="${p.title}" aria-label="${p.title}">
          <span class="nav-link__icon">${ic}</span>
          <span class="nav-link__copy">
            <strong>${p.title}</strong>
            <small>Página ${p.num}</small>
          </span>
          <span class="nav-link__meta">${p.num}</span>
        </a>`;
      });
      html += `</div>`;
    });

    html += `</nav>
      </div>`;
    sidebarEl.innerHTML = html;

    const cb = document.getElementById("collapseBtn");
    if (cb && !cb.dataset.bound){
      cb.dataset.bound = "1";
      cb.addEventListener("click", () => {
        const c = document.body.classList.toggle("sidebar-collapsed");
        localStorage.setItem("go-collapsed", c ? "1" : "0");
      });
    }
  }
  buildSidebar();

  // ---------- ROUTER ----------
  const host = document.getElementById("pageHost");
  const sectionRoot = document.getElementById("sectionRoot");
  function getDefaultId(){ return (window.GO_PAGES?.[0]?.id) || "hero"; }
  function show(id){
    const pages = window.GO_PAGES || [];
    const page = pages.find(p => p.id === id) || pages[0];
    if (!page) return;
    const tpl = sectionRoot.querySelector(`section.section[data-id="${page.id}"]`);
    if (!tpl){
      host.innerHTML = `<div class="card" style="text-align:center; padding:48px 22px;">
        <h2>Página em construção</h2><p class="muted">A seção <code>${page.id}</code> está prevista no plano e será preenchida em breve.</p>
        <a class="btn primary" href="#${getDefaultId()}">Voltar à capa</a></div>`;
    } else {
      host.innerHTML = "";
      const clone = tpl.cloneNode(true);
      clone.classList.add("active");
      host.appendChild(clone);
    }
    document.querySelectorAll(".nav-link").forEach(a => a.classList.toggle("is-active", a.dataset.page === page.id));
    const tbcopy = document.getElementById("topbarCopy");
    if (tbcopy){
      tbcopy.innerHTML = `
        <span class="topbar-kicker">${page.section}</span>
        <h2>${page.title}</h2>
        <p>Página ${page.num} · GO Premium · Doenças Clínicas na Gravidez</p>`;
    }
    if (page.block) document.body.dataset.block = page.block;
    const pf = document.getElementById("progFill");
    const total = pages.length || 34;
    const idx = pages.findIndex(p => p.id === page.id);
    if (pf){
      const pct = Math.max(3, Math.round(((idx + 1) / total) * 100));
      pf.style.width = pct + "%";
    }
    const pc = document.getElementById("progCount");
    if (pc) pc.textContent = `${idx + 1} / ${total}`;
    initComponents(host);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function onHash(){
    const id = (location.hash || "").replace("#","") || getDefaultId();
    show(id);
  }
  window.addEventListener("hashchange", onHash);
  window.addEventListener("DOMContentLoaded", () => setTimeout(onHash, 0));
  if (document.readyState !== "loading") setTimeout(onHash, 0);

  // ---------- COMPONENTS ----------
  function initComponents(scope){
    // Componentes genéricos reutilizáveis
    initFlashcards(scope);
    initQuiz(scope);
    initCaseMatch(scope);
    initHotspots(scope);
    initStepper(scope);
    initLayerToggle(scope);
    initFilterTable(scope);
    initRevealOnScroll(scope);

    /* ----------------------------------------------------------------
       Componentes implementados no Prompt 2 (rodam ANTES dos stubs
       para que componentes com data-implemented="1" sejam pulados
       pelo stub generator).
       ---------------------------------------------------------------- */
    if (Array.isArray(window._GO_block1Inits)){
      window._GO_block1Inits.forEach(fn => { try { fn(scope); } catch(e){ console.warn("[GO]", fn.name, e); } });
    }
    if (Array.isArray(window._GO_block2Inits)){
      window._GO_block2Inits.forEach(fn => { try { fn(scope); } catch(e){ console.warn("[GO]", fn.name, e); } });
    }
    if (Array.isArray(window._GO_block3Inits)){
      window._GO_block3Inits.forEach(fn => { try { fn(scope); } catch(e){ console.warn("[GO]", fn.name, e); } });
    }
    if (Array.isArray(window._GO_block4Inits)){
      window._GO_block4Inits.forEach(fn => { try { fn(scope); } catch(e){ console.warn("[GO]", fn.name, e); } });
    }
    if (Array.isArray(window._GO_block5Inits)){
      window._GO_block5Inits.forEach(fn => { try { fn(scope); } catch(e){ console.warn("[GO]", fn.name, e); } });
    }

    /* ----------------------------------------------------------------
       Componentes ainda não implementados — registrados como stubs.
       Cada init* abaixo encontra blocos com data-component="NomeDoComponente"
       e injeta um placeholder didático. Substituídos por implementação
       real conforme as sub-fases 2A → 2E avançam.
       ---------------------------------------------------------------- */
    initStub(scope, "GOHeroMap",                    "Mapa hero materno-fetal: gestante → pistas → diagnóstico → gravidade → conduta → parto/puerpério → gabarito.");
    initStub(scope, "ClinicalCaseMatcher",          "Match de quatro gestantes (hipertensão, hiperêmese, diabetes, gemelar) com diagnóstico, exame-chave, conduta inicial e palavra-chave.");
    initStub(scope, "HypertensionDiagnosisTree",    "Árvore diagnóstica: PA confirmada → antes/depois de 20 semanas → proteinúria/lesão sistêmica → puerpério até 12 semanas.");
    initStub(scope, "PreeclampsiaVsChronicComparator", "Comparador lado a lado: idade, paridade, semana de início, proteinúria, calciúria, ácido úrico, resolução puerperal.");
    initStub(scope, "ProteinuriaLab",               "Ranking dos métodos: urina de 24h → relação proteína/creatinina → fita; cenário ambulatorial × emergência.");
    initStub(scope, "SystemicInjuryChecklist",      "Checklist da pré-eclâmpsia sem proteinúria: EAP, plaquetopenia, creatinina, transaminases, sintomas cerebrais/visuais.");
    initStub(scope, "PreeclampsiaScreeningBuilder", "Construtor de risco: clínica → PA → Doppler uterino/oftálmica → biomarcadores (PAPP-A, PLGF).");
    initStub(scope, "PreventionControversyPanel",   "AAS 100–150 mg (12–16 sem até 36 sem) · cálcio 1 g · controvérsia FEBRASGO × Ministério da Saúde · atividade física.");
    initStub(scope, "SeverityTriageBoard",          "Semáforo de gravidade: PA ≥160/110, EAP, oligúria, transaminases, plaquetopenia, sintomas cerebrais/visuais, epigastralgia.");
    initStub(scope, "HELLPDifferentialPanel",       "Classificador HELLP × esteatose hepática aguda × pré-eclâmpsia grave: hemólise, LDH, esquizócitos, AST/TGO, plaquetas.");
    initStub(scope, "AntihypertensiveCrisisSimulator", "Simulador de PA: 150/100, 160/110, hipertensa crônica, pré-eclâmpsia, lactação · hidralazina IV × nifedipina rápida × manutenção.");
    initStub(scope, "MedicationSafetyTable",        "Tabela de medicações permitidas e proibidas: metildopa, nifedipina, hidralazina, pindolol, IECA/BRA, hidroclorotiazida.");
    initStub(scope, "MagnesiumProtocolLab",         "Laboratório do sulfato: dose de ataque/manutenção, Pritchard × Zuspan, transferência, coagulopatia, recorrência.");
    initStub(scope, "MagnesiumToxicitySimulator",   "Simulador dos 3 Rs: reflexo patelar, frequência respiratória (<12), diurese/oligúria, gluconato de cálcio.");
    initStub(scope, "DeliveryTimingPreeclampsiaStepper", "Stepper por idade gestacional e gravidade: <34 sem (corticoide/conservador) × ≥34 sem (parto) × HELLP × eclâmpsia.");
    initStub(scope, "PuerperiumReclassificationTimeline", "Linha do tempo gestação → parto → 12 semanas: hipertensão gestacional × pré-eclâmpsia × pré-eclâmpsia sobreposta.");
    initStub(scope, "HyperemesisDecisionLab",       "Checklist da hiperêmese: vômitos incoercíveis, intolerância via oral, perda de peso ≥5%, desidratação, cetonúria.");
    initStub(scope, "HCGThyroidDifferentialMap",    "Mapa HCG → tireoide (TSH suprimido / T4 livre normal) → vômitos → diferenciais (mola, gemelar, pancreatite).");
    initStub(scope, "HyperemesisTreatmentProtocol", "Protocolo em camadas: internar → hidratar → tiamina (encefalopatia) → antieméticos → reintroduzir via oral.");
    initStub(scope, "DiabetesRiskClassifier",       "Cartão de anamnese: macrossomia prévia, óbito fetal tardio, obesidade, hipertensão, familiar de 1º grau (tia-avó não conta).");
    initStub(scope, "GestationalDiabetesDiagnosisFlow", "Fluxograma: jejum <20 sem (<92 / 92–125 / ≥126) e TOTG 24–28 sem (jejum, 1h, 2h) · DMG × diabetes prévio.");
    initStub(scope, "OGTTInteractiveCurve",         "Curva interativa do TOTG 75 g: jejum, 1 hora, 2 horas; classificação automática.");
    initStub(scope, "GlycemicProfileDashboard",     "Dashboard de perfil glicêmico: jejum <95, 1h <140, 2h <120 · diagnóstico × acompanhamento × hipoglicemia.");
    initStub(scope, "ThirtyPercentRuleSimulator",   "Simulador da regra dos 30%: o aluno altera medidas e o sistema decide se entra medicação.");
    initStub(scope, "DiabetesTreatmentNavigator",   "Mapa de tratamento e encaminhamento: dieta/exercício → metformina (lugar específico) → insulina · UBS × alto risco.");
    initStub(scope, "InsulinPregnancyTimeline",     "Escadinha de insulina por trimestre: ↓ no 1º (náusea/baixa ingesta), ↑ no 2º/3º (resistência), ↓ no pós-parto.");
    initStub(scope, "DiabetesDeliveryTimingStepper","Régua 37–40 semanas: DMG sem medicação (40), com medicação e bom controle (39), mal controlado (37–38).");
    initStub(scope, "DiabeticFetusComplicationMap", "Fluxo mãe hiperglicêmica → feto hiperinsulinêmico → macrossomia, polidrâmnio, hipoglicemia neonatal, policitemia, regressão caudal.");
    initStub(scope, "ShoulderDystociaSimulator",    "Simulador anatômico simplificado da pelve e ombro: chamar ajuda (1ª conduta) → McRoberts (1ª manobra) → suprapúbica → Jacquemier → rotacional → Gaskin.");
    initStub(scope, "DiabetesPuerperiumClassifier", "Trilhas pós-parto: DM1 (dose pré-gestacional), DM2 (½ dose final/oral), DMG (dieta normal · suspender insulina · TOTG em 6 sem).");
    initStub(scope, "TwinClassificationMap",        "Mapa zigoto × córion × âmnio: monozigótica × dizigótica × polizigótica · dicoriônica × monocoriônica · diamniótica × monoamniótica.");
    initStub(scope, "EmbryoSplitTimeline",          "Slider de divisão embrionária: ≤72h (DC/DA) · 4–8d (MC/DA) · 8–12d (MC/MA) · >12d (gêmeos conjugados).");
    initStub(scope, "ChorionicityUltrasoundLab",    "Ultrassom estilizado: dois sacos × um saco, vesículas vitelínicas, sinal do lambda/Y/twin peak × sinal do T.");
    initStub(scope, "TwinRiskCardGame",             "Jogo \"conta ou não conta?\": história familiar (só dizigóticos), etnia, idade, indução de ovulação, FIV.");
    initStub(scope, "TwinDeliveryRouteSimulator",   "Régua por corionicidade: dicoriônica até 38 sem · monocoriônica diamniótica até 36 sem · monoamniótica 32–34 sem · cesárea obrigatória em monoamniótica/conjugados/≥3 fetos/1º não cefálico.");
    initStub(scope, "TTTSSimulator",                "Placenta única com anastomoses: doador (oligo) × receptor (poli/hidropsia) · amniocentese seriada × fotocoagulação a laser.");
    initStub(scope, "GOProofSimulator",             "Cockpit clínico: idade gestacional, PA, proteinúria, sintomas, plaquetas, creatinina, transaminases, AAS/cálcio, vômitos, glicemias, TOTG, insulina, USG, gemelaridade, oligo/poli discordante → 9 outputs.");
    initStub(scope, "QuickRevisionFlashcards",      "Flashcards de revisão ativa cobrindo as quatro trilhas + simulador.");
  }

  /* ====================== Componentes genéricos ====================== */

  // Flashcards (data-component="flashcard")
  function initFlashcards(scope){
    scope.querySelectorAll('[data-component="flashcard"]').forEach(card => {
      card.addEventListener("click", () => card.classList.toggle("flipped"));
    });
  }

  // Quiz (data-component="quiz")
  function initQuiz(scope){
    scope.querySelectorAll('[data-component="quiz"]').forEach(quiz => {
      const correct = quiz.dataset.correct;
      const fb = quiz.querySelector(".quiz-feedback");
      quiz.querySelectorAll(".quiz-options button").forEach(btn => {
        btn.addEventListener("click", () => {
          quiz.querySelectorAll(".quiz-options button").forEach(b => b.classList.remove("correct","wrong"));
          if (btn.dataset.k === correct){
            btn.classList.add("correct");
            if (fb){ fb.classList.add("show"); fb.innerHTML = `<b style="color:var(--ok)">Correto.</b> ${btn.dataset.why || ""}`; }
          } else {
            btn.classList.add("wrong");
            if (fb){ fb.classList.add("show"); fb.innerHTML = `<b style="color:var(--danger)">Não é por aí.</b> ${btn.dataset.why || ""}`; }
          }
        });
      });
    });
  }

  // Case match (página 01)
  function initCaseMatch(scope){
    const wrapper = scope.querySelector('[data-component="case-match"]');
    if (!wrapper) return;
    let selected = null;
    const fb = wrapper.querySelector("#caseFeedback");
    const explainer = {
      hipertensao: "<b>Hipertensão crônica.</b> PA elevada antes de 20 semanas, sem proteinúria nem lesão sistêmica, em primigesta jovem. Pode virar <b>pré-eclâmpsia sobreposta</b> a partir de 20 semanas — vigie proteinúria, calciúria e ácido úrico.",
      hiperemese:  "<b>Hiperêmese gravídica.</b> Vômitos incoercíveis + intolerância via oral + perda de peso ≥5% + cetonúria fecham o diagnóstico. Pense também em <b>HCG alto</b> (mola, gemelar) e <b>hipertireoidismo transitório</b> (TSH suprimido com T4 livre normal). Não esqueça <b>tiamina</b>.",
      diabetes:    "<b>Diabetes gestacional.</b> Antes de 20 semanas, jejum 92–125 mg/dL fecha DMG; ≥126 mg/dL fecha diabetes prévio não diagnosticado. Macrossomia anterior + óbito fetal tardio são pistas clássicas.",
      gemelar:     "<b>Gemelar dicoriônica.</b> Dois sacos gestacionais ao USG precoce indicam <b>dicorionicidade</b> — e toda dicoriônica é <b>diamniótica</b>. FIV com transferência de dois embriões reforça dizigoticidade. Próximos passos: lambda/Y nas 11–14 semanas e definir momento do parto (até 38 sem)."
    };
    wrapper.querySelectorAll(".patient-card").forEach(p => {
      p.addEventListener("click", () => {
        wrapper.querySelectorAll(".patient-card").forEach(x => x.style.outline = "");
        p.style.outline = "2px solid var(--accent)";
        selected = p.dataset.key;
        if (fb){ fb.classList.add("show"); fb.innerHTML = `Caso selecionado. Agora clique no raciocínio.`; }
      });
    });
    wrapper.querySelectorAll(".target").forEach(t => {
      t.addEventListener("click", () => {
        if (!selected){ if (fb){ fb.classList.add("show"); fb.innerHTML = "Escolha uma gestante primeiro."; } return; }
        if (t.dataset.target === selected){
          fb.classList.add("show"); fb.innerHTML = `<span class="tag t-ok">acerto</span> ${explainer[selected]}`;
        } else {
          fb.classList.add("show"); fb.innerHTML = `<span class="tag t-danger">erro</span> A pista não fecha. Releia o detalhe que separa os diagnósticos. <br><br>${explainer[selected]}`;
        }
      });
    });
  }

  // Hotspots
  function initHotspots(scope){
    scope.querySelectorAll('[data-component="hotspots"]').forEach(stage => {
      const info = stage.querySelector(".hotspot-info");
      stage.querySelectorAll(".hotspot").forEach(h => {
        h.addEventListener("click", () => {
          stage.querySelectorAll(".hotspot").forEach(x => x.classList.remove("active"));
          h.classList.add("active");
          if (info){
            info.innerHTML = `<h4>${h.dataset.title || ""}</h4><p>${h.dataset.desc || ""}</p>`;
          }
        });
      });
    });
  }

  // Stepper genérico
  function initStepper(scope){
    scope.querySelectorAll('[data-component="stepper"]').forEach(stp => {
      const btns = stp.querySelectorAll(".stepper-bar button");
      const panes = stp.querySelectorAll(".step-pane");
      btns.forEach(b => b.addEventListener("click", () => {
        btns.forEach(x => x.classList.remove("active"));
        panes.forEach(x => x.style.display = "none");
        b.classList.add("active");
        const target = stp.querySelector(`.step-pane[data-step="${b.dataset.step}"]`);
        if (target) target.style.display = "";
      }));
      if (btns[0]) btns[0].click();
    });
  }

  // Layer toggle genérico (camadas SVG)
  function initLayerToggle(scope){
    scope.querySelectorAll('[data-component="layer-toggle"]').forEach(blk => {
      const checks = blk.querySelectorAll('input[type="checkbox"][data-layer]');
      const svg = blk.querySelector("svg");
      const info = blk.querySelector(".layer-info");
      const apply = () => {
        if (!svg) return;
        checks.forEach(c => {
          const layer = svg.querySelector(`[data-layer="${c.dataset.layer}"]`);
          if (layer) layer.style.display = c.checked ? "" : "none";
        });
        const active = Array.from(checks).filter(c => c.checked).map(c => c.dataset.layer);
        if (info){
          info.innerHTML = active.length
            ? `<b>${active.length}</b> camada(s) ativa(s).`
            : `<b>Sem camadas ativas.</b> Marque pelo menos uma para ver o efeito.`;
        }
      };
      checks.forEach(c => c.addEventListener("change", apply));
      apply();
    });
  }

  // Tabela filtrável
  function initFilterTable(scope){
    scope.querySelectorAll('[data-component="filter-table"]').forEach(blk => {
      const filterChips = blk.querySelectorAll("[data-filter]");
      const search = blk.querySelector("input[type=search]");
      const rows = blk.querySelectorAll("tbody tr");
      const apply = () => {
        const active = Array.from(filterChips).filter(c => c.classList.contains("active")).map(c => c.dataset.filter);
        const q = (search?.value || "").toLowerCase().trim();
        rows.forEach(r => {
          const matchesFilter = active.length === 0 || active.includes(r.dataset.tag);
          const text = r.textContent.toLowerCase();
          const matchesQ = !q || text.includes(q);
          r.style.display = matchesFilter && matchesQ ? "" : "none";
        });
      };
      filterChips.forEach(c => c.addEventListener("click", () => { c.classList.toggle("active"); apply(); }));
      if (search) search.addEventListener("input", apply);
      apply();
    });
  }

  // Reveal on scroll
  function initRevealOnScroll(scope){
    if (!("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("reveal-in");
      });
    }, { threshold: 0.1 });
    scope.querySelectorAll(".card, .svg-card, .timeline .tl-row, .flashcard").forEach(el => obs.observe(el));
  }

  /* ====================== Placeholder helper ======================
     Exposto em window.GORender para uso pelos bundles sections-X.js
     ao construir os 32 placeholders premium do Prompt 1C. Recebe um
     objeto com os metadados da página e injeta a <section> no
     #sectionRoot. O conteúdo final substitui esses placeholders no
     Prompt 2 mantendo a marcação data-id intacta. */
  window.GORender = function(p){
    const root = document.getElementById("sectionRoot");
    if (!root) return;

    const tagMap = {
      "cai-pouco":      ["r-cai-pouco",     "cai pouco"],
      "pegadinha":      ["r-pegadinha",     "pegadinha"],
      "aprofundamento": ["r-aprofundamento","aprofundamento"],
      "atualizacao":    ["r-atualizacao",   "atualização"],
      "banca-grande":   ["r-banca-grande",  "banca grande"]
    };
    const tags = (p.relevanceTags || []).map(t => {
      const [cls, label] = tagMap[t] || ["", t];
      return `<span class="relevance-tag ${cls}">${label}</span>`;
    }).join(" ");

    const cobertura = (p.cobertura || []).map(c => `<li>${c}</li>`).join("");

    const sec = document.createElement("section");
    sec.className = "section";
    sec.dataset.id = p.id;
    sec.innerHTML = `
      <div class="page-header">
        <div class="ph-meta">
          <span class="kicker ${p.kickerClass || ""}">${p.kicker}</span>
          <h1>${p.title}</h1>
          <p class="lead">${p.lead}</p>
          ${tags ? `<div class="hero-tags" style="margin-top:10px">${tags}</div>` : ""}
        </div>
      </div>

      <div class="q-central"><span class="q-icon">?</span><p>${p.perguntaCentral}</p></div>

      <div class="grid cols-2">
        <div class="card glass" data-component="${p.visualComponent || p.componentName}">
          <span class="kicker ${p.kickerClass || ""}">Visual reservado</span>
          <h3>${p.visualTitle || "Visual principal"}</h3>
          <p class="text-sm muted">${p.visualLegend}</p>
          <div class="component-stub"></div>
        </div>
        <div class="card" data-component="${p.componentName}">
          <span class="kicker">Interação reservada</span>
          <h3>${p.interacaoTitle || "Interação principal"}</h3>
          <p class="text-sm muted">${p.interacaoLegend}</p>
          <div class="component-stub"></div>
        </div>
      </div>

      <div class="card" style="margin-top:18px">
        <span class="kicker">Objetivo desta página</span>
        <h3>O aluno termina esta página sabendo…</h3>
        <p>${p.objetivo}</p>
        ${cobertura ? `
        <h4 style="margin-top:14px">Cobertura textual reservada</h4>
        <ul class="list">${cobertura}</ul>
        ` : ""}
      </div>

      <div class="page-dock">
        <a class="dock-link" href="#${p.prev.id}"><small>Anterior</small>← ${p.prev.label}</a>
        <a class="dock-link next" href="#${p.next.id}"><small>Próximo</small>${p.next.label} →</a>
      </div>
    `;
    root.appendChild(sec);
  };

  /* ====================== Stub generator ====================== */
  /* Escreve um placeholder didático em qualquer bloco que use
     data-component="NomeDoComponente" e que ainda não tenha sido
     implementado (data-implemented="1"). Componentes implementados
     no Prompt 2 são marcados antes do scope ser percorrido pelo
     stub generator, evitando sobrescrita. */
  function initStub(scope, name, copy){
    scope.querySelectorAll(`[data-component="${name}"]`).forEach(blk => {
      if (blk.dataset.implemented === "1") return;
      const slot = blk.querySelector(".component-stub") || blk;
      slot.innerHTML = `
        <div class="placeholder-pane">
          <div class="placeholder-pane__head">
            <span class="tag">Componente · em construção</span>
            <code>${name}</code>
          </div>
          <p>${copy}</p>
          <small class="muted">Implementação completa nos próximos sub-prompts (conteúdo, visual e interação).</small>
        </div>`;
    });
  }

  /* =========================================================================
     COMPONENTES DO BLOCO 1 — HIPERTENSÃO E PRÉ-ECLÂMPSIA (Sub-fase 2A.1)
     -------------------------------------------------------------------------
     Cada init* abaixo sobrescreve o stub correspondente quando o markup
     da página marca data-implemented="1". As funções leem a estrutura
     HTML embutida em sections-1.js (descrita em
     docs/componentes-interativos.md) e aplicam o comportamento.
     ========================================================================= */

  // 02 · HypertensionDiagnosisTree — seletor guiado (semana × proteinúria × lesão)
  function initHypertensionDiagnosisTree(scope){
    scope.querySelectorAll('[data-component="HypertensionDiagnosisTree"][data-implemented="1"]').forEach(blk => {
      const state = { week: null, proteinuria: null, lesion: null };
      const out = blk.querySelector(".hdt-output");
      const decide = () => {
        if (state.week === null) return null;
        const before20 = state.week === "before20";
        if (before20 && state.proteinuria !== "yes" && state.lesion !== "yes")
          return { name: "Hipertensão crônica", color: "rose", desc: "PA ≥140/90 antes de 20 semanas, sem proteinúria significativa nem lesão sistêmica. Vigilância, anti-hipertensivo se mantida; rastreio de pré-eclâmpsia sobreposta após 20 semanas.", caveat: "Mola é a única exceção que abre PE antes de 20 semanas." };
        if (before20 && (state.proteinuria === "yes" || state.lesion === "yes"))
          return { name: "Hipertensão crônica com possível PE sobreposta antes do tempo", color: "rose", desc: "Proteinúria/lesão sistêmica antes de 20 semanas em hipertensa crônica reforça doença renal pré-existente. Investigar nefropatia, LES, SAF, mola.", caveat: "Não chame de PE antes de 20 semanas — exceção apenas para mola hidatiforme." };
        if (!before20 && state.proteinuria !== "yes" && state.lesion !== "yes")
          return { name: "Hipertensão gestacional", color: "amber", desc: "PA ≥140/90 após 20 semanas sem proteinúria significativa nem lesão sistêmica. Reavaliar até 12 semanas de puerpério: se persiste, reclassifica como crônica.", caveat: "20 a 50% evoluem para pré-eclâmpsia — vigilância seriada." };
        if (!before20 && (state.proteinuria === "yes" || state.lesion === "yes"))
          return { name: "Pré-eclâmpsia (clássica ou sem proteinúria)", color: "danger", desc: "PA ≥140/90 após 20 semanas + proteinúria significativa OU lesão sistêmica (EAP, plaqueta <100k, creatinina ↑, transaminases ↑, sintomas cerebrais/visuais). Doença multissistêmica.", caveat: "Edema de membros não fecha diagnóstico — é fisiológico." };
        return null;
      };
      const render = () => {
        // estado dos botões
        blk.querySelectorAll(".hdt-step").forEach(s => {
          const k = s.dataset.step;
          const v = state[k];
          s.querySelectorAll("button[data-val]").forEach(b => {
            b.classList.toggle("is-active", b.dataset.val === v);
          });
        });
        const r = decide();
        if (!out) return;
        if (!r){
          out.innerHTML = `<div class="hdt-empty"><strong>Selecione semana, proteinúria e lesão sistêmica</strong> para ver a classificação.</div>`;
          return;
        }
        out.innerHTML = `
          <div class="hdt-result hdt-${r.color}">
            <span class="kicker">Classificação provável</span>
            <h4>${r.name}</h4>
            <p>${r.desc}</p>
            ${r.caveat ? `<p class="hdt-caveat"><b>Pegadinha:</b> ${r.caveat}</p>` : ""}
          </div>`;
      };
      blk.querySelectorAll(".hdt-step button[data-val]").forEach(b => {
        b.addEventListener("click", () => {
          const step = b.closest(".hdt-step").dataset.step;
          state[step] = b.dataset.val;
          render();
        });
      });
      const reset = blk.querySelector(".hdt-reset");
      if (reset) reset.addEventListener("click", () => {
        state.week = state.proteinuria = state.lesion = null;
        render();
      });
      render();
    });
  }

  // 03 · PreeclampsiaVsChronicComparator — slider de semana
  function initPreeclampsiaVsChronicComparator(scope){
    scope.querySelectorAll('[data-component="PreeclampsiaVsChronicComparator"][data-implemented="1"]').forEach(blk => {
      const slider = blk.querySelector("input[type=range]");
      const out = blk.querySelector(".pvc-output");
      const marker = blk.querySelector(".pvc-marker");
      const explain = (w) => {
        if (w < 20) return { label: "antes de 20 semanas", txt: "PA elevada agora aponta para <b>hipertensão crônica</b> (mola é a única exceção). Calciúria de 24h e ácido úrico ajudam a distinguir." };
        if (w < 34) return { label: "20–34 semanas", txt: "Janela em que <b>pré-eclâmpsia</b> e <b>hipertensão gestacional</b> se manifestam. Avaliar proteinúria e lesão sistêmica para definir." };
        if (w <= 41) return { label: "≥34 semanas", txt: "PE com gravidade nesta janela vai a parto após estabilização. Sem gravidade, vigilância até termo." };
        return { label: "puerpério (>0 sem)", txt: "<b>Puerpério até 12 semanas</b>: hipertensão gestacional pode resolver. Se persiste após 12 semanas, reclassifica como <b>crônica</b>." };
      };
      const render = () => {
        const w = parseInt(slider.value, 10);
        if (marker) marker.style.left = ((w - 4) / (44 - 4) * 100) + "%";
        const e = explain(w);
        out.innerHTML = `<strong>Semana ${w}:</strong> ${e.label}.<br>${e.txt}`;
      };
      if (slider){
        slider.addEventListener("input", render);
        render();
      }
    });
  }

  // 04 · SystemicInjuryChecklist — checklist multissistêmico
  function initSystemicInjuryChecklist(scope){
    scope.querySelectorAll('[data-component="SystemicInjuryChecklist"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".sic-output");
      const checks = blk.querySelectorAll('input[type="checkbox"][data-criterion]');
      const apply = () => {
        const active = Array.from(checks).filter(c => c.checked).map(c => c.dataset.criterion);
        const hasPA = active.includes("pa20");
        const hasProt = active.includes("proteinuria");
        const lesion = active.filter(c => ["eap","plaq","cre","tgo","cerebral"].includes(c));
        let verdict = "<b>Diagnóstico em aberto.</b> Marque PA + (proteinúria OU lesão sistêmica) para fechar pré-eclâmpsia.";
        let cls = "";
        if (hasPA && hasProt && lesion.length === 0){
          verdict = "<b>Pré-eclâmpsia clássica.</b> PA + proteinúria significativa após 20 semanas. Avalie gravidade.";
          cls = "sic-ok";
        } else if (hasPA && lesion.length > 0){
          verdict = `<b>Pré-eclâmpsia sem proteinúria.</b> PA + ${lesion.length} lesão(ões) sistêmica(s). Doença multissistêmica — interne e estabilize.`;
          cls = "sic-ok";
        } else if (hasPA && !hasProt && lesion.length === 0){
          verdict = "<b>Hipertensão gestacional.</b> PA ≥140/90 após 20 semanas sem proteinúria nem lesão sistêmica. Vigilância e proteinúria seriada.";
          cls = "sic-warn";
        } else if (!hasPA && (hasProt || lesion.length)){
          verdict = "<b>Sem PA documentada.</b> Proteinúria ou lesão sistêmica isoladas não fecham PE — confirme PA em duas aferições.";
          cls = "sic-warn";
        }
        out.className = "sic-output " + cls;
        out.innerHTML = verdict;
      };
      checks.forEach(c => c.addEventListener("change", apply));
      apply();
    });
  }

  // 05 · ProteinuriaLab — cenário ambulatorial × emergência
  function initProteinuriaLab(scope){
    scope.querySelectorAll('[data-component="ProteinuriaLab"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".pl-output");
      const map = {
        amb_estavel: "<b>Urina de 24 horas.</b> Ambulatório com paciente estável: tempo permite, padrão-ouro confirma proteinúria significativa (≥300 mg/24h).",
        amb_pressa:  "<b>Relação proteína/creatinina (P/Cr).</b> Triagem rápida em consulta: ≥0,3 sugere significativa; pede confirmação por 24h depois.",
        emergencia:  "<b>P/Cr em amostra única.</b> Emergência com PA grave, sintomas ou plaqueta caindo: P/Cr resolve em horas e dispara conduta. Não esperar urina de 24h.",
        triagem:     "<b>Fita urinária.</b> Triagem grosseira: ≥1+ sugestivo, mas falso-positivo (urina concentrada) e falso-negativo (urina diluída). Sempre confirmar por método quantitativo."
      };
      blk.querySelectorAll(".pl-scenario").forEach(b => {
        b.addEventListener("click", () => {
          blk.querySelectorAll(".pl-scenario").forEach(x => x.classList.remove("is-active"));
          b.classList.add("is-active");
          out.innerHTML = map[b.dataset.scenario] || "";
        });
      });
    });
  }

  // 06 · PreeclampsiaScreeningBuilder — construtor de risco em camadas
  function initPreeclampsiaScreeningBuilder(scope){
    scope.querySelectorAll('[data-component="PreeclampsiaScreeningBuilder"][data-implemented="1"]').forEach(blk => {
      const checks = blk.querySelectorAll('input[type="checkbox"][data-risk]');
      const out = blk.querySelector(".psb-output");
      const apply = () => {
        const active = Array.from(checks).filter(c => c.checked);
        const score = active.reduce((s,c) => s + parseInt(c.dataset.weight || "1", 10), 0);
        let level = "Risco basal", color = "ok", action = "Atividade física regular. Cálcio conforme protocolo (MS recomenda 1 g/dia em populações com baixa ingesta). Não há indicação de AAS profilático.";
        if (score >= 2 && score <= 3){ level = "Risco intermediário"; color = "warn"; action = "Considerar AAS 100–150 mg/dia entre 12 e 16 semanas até 36 semanas, especialmente se houver fator clínico de peso (HAS crônica, DM prévio) ou achados em USG/Doppler. Cálcio mantido."; }
        if (score >= 4){ level = "Alto risco"; color = "danger"; action = "AAS 100–150 mg/dia entre 12 e 16 semanas até 36 semanas. Cálcio. Acompanhamento em alto risco com Doppler de artéria uterina (22–24 semanas) e biomarcadores quando disponíveis."; }
        out.className = "psb-output psb-" + color;
        out.innerHTML = `<span class="kicker">${level} (score ${score})</span><p>${action}</p>`;
      };
      checks.forEach(c => c.addEventListener("change", apply));
      apply();
    });
  }

  // 07 · PreventionControversyPanel — simulador de banca AAS/cálcio
  function initPreventionControversyPanel(scope){
    scope.querySelectorAll('[data-component="PreventionControversyPanel"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".pcp-output");
      const map = {
        ms: "<b>Pelo Ministério da Saúde:</b> cálcio 1 g/dia para todas as gestantes em populações com baixa ingesta, junto com AAS 100–150 mg/dia em alto risco entre 12 e 16 semanas até 36 semanas.",
        febrasgo: "<b>Pela FEBRASGO (atualizado):</b> cálcio NÃO é mais recomendado de rotina; reservar para alto risco com baixa ingesta documentada. AAS mantém indicação em alto risco entre 12 e 16 semanas.",
        evidencia: "<b>Pelas evidências atuais:</b> AAS tem evidência sólida para prevenção em alto risco. Cálcio tem benefício mais claro em populações com baixa ingesta — evidência menos consistente em populações suficientes.",
        sem_ref: "<b>Banca sem referência explícita:</b> resolva pelo critério mais cobrado historicamente — AAS 100–150 mg/dia em alto risco (12–16 sem até 36 sem) é consenso. Para cálcio, opte pela alternativa que cite o cenário (baixa ingesta) ou que mencione \"cálcio em alto risco\"."
      };
      blk.querySelectorAll(".pcp-bench").forEach(b => {
        b.addEventListener("click", () => {
          blk.querySelectorAll(".pcp-bench").forEach(x => x.classList.remove("is-active"));
          b.classList.add("is-active");
          out.innerHTML = map[b.dataset.bench] || "";
        });
      });
    });
  }

  // 08 · SeverityTriageBoard — triagem de gravidade
  function initSeverityTriageBoard(scope){
    scope.querySelectorAll('[data-component="SeverityTriageBoard"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".stb-output");
      const checks = blk.querySelectorAll('input[type="checkbox"][data-severity]');
      const apply = () => {
        const active = Array.from(checks).filter(c => c.checked).map(c => c.dataset.severity);
        let verdict = "<b>Sem critérios de gravidade marcados.</b> PE leve (sem gravidade) → vigilância ambulatorial criteriosa, anti-hipertensivo se necessário, parto a termo.";
        let cls = "";
        if (active.includes("eclampsia")){
          verdict = "<b>Eclâmpsia.</b> Estabilização imediata (sulfato de magnésio + via aérea + anti-hipertensivo IV se PA grave) e parto após estabilização.";
          cls = "stb-danger";
        } else if (active.includes("hellp")){
          verdict = "<b>HELLP.</b> Internar, estabilizar; se <34 semanas com mãe e feto estáveis, considerar corticoide e conduta conservadora curta. Caso contrário, parto.";
          cls = "stb-danger";
        } else if (active.length > 0){
          verdict = `<b>Pré-eclâmpsia com gravidade</b> (${active.length} critério(s)). Internar, sulfato, anti-hipertensivo IV (hidralazina ou nifedipina rápida), corticoide se <34 semanas. Decidir momento do parto.`;
          cls = "stb-warn";
        }
        out.className = "stb-output " + cls;
        out.innerHTML = verdict;
      };
      checks.forEach(c => c.addEventListener("change", apply));
      apply();
    });
  }

  // 09 · HELLPDifferentialPanel — classificador HELLP × esteatose × PE
  function initHELLPDifferentialPanel(scope){
    scope.querySelectorAll('[data-component="HELLPDifferentialPanel"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".hdp-output");
      const score = (state) => {
        let h = 0, e = 0;
        if (state.ldh) h++;
        if (state.tgo) h++;
        if (state.plaq) h++;
        if (state.glic) e++;
        if (state.inr) e++;
        if (state.amonia) e++;
        return { h, e };
      };
      const apply = () => {
        const state = {};
        blk.querySelectorAll('input[type="checkbox"]').forEach(c => state[c.dataset.lab] = c.checked);
        const s = score(state);
        let verdict = "Marque achados laboratoriais para diferenciar.";
        if (s.h >= 2 && s.e === 0) verdict = "<b>Síndrome HELLP.</b> Hemólise (LDH ↑, esquizócitos), enzimas hepáticas elevadas (TGO ≥2×) e plaquetas <100.000. Pode ocorrer SEM hipertensão.";
        else if (s.e >= 2 && s.h <= 1) verdict = "<b>Esteatose hepática aguda da gestação.</b> Hipoglicemia, coagulopatia (INR ↑) e hiperamonemia. Plaquetas inicialmente normais. Doença grave do 3º trimestre.";
        else if (s.h >= 1 && s.e >= 1) verdict = "<b>Sobreposição clínica.</b> Lab pede ampliação: hemograma seriado, função hepática completa, INR, glicemia, amônia. Considere os dois diagnósticos até a próxima leitura.";
        else if (s.h === 0 && s.e === 0) verdict = "<b>Sem hemólise nem hepatopatia franca.</b> Pré-eclâmpsia grave isolada permanece como hipótese. Reavalie em 6h.";
        out.innerHTML = verdict;
      };
      blk.querySelectorAll('input[type="checkbox"]').forEach(c => c.addEventListener("change", apply));
      apply();
    });
  }

  // 10 · AntihypertensiveCrisisSimulator — PA → medicação
  function initAntihypertensiveCrisisSimulator(scope){
    scope.querySelectorAll('[data-component="AntihypertensiveCrisisSimulator"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".acs-output");
      const map = {
        pa_150_100:    { c: "warn", t: "PE leve sem gravidade — manutenção", d: "Considere <b>metildopa</b> (250 mg 3×/dia, ajustar) ou <b>nifedipina LP</b>. Meta: PA <140/90 sem hipotensão. Não usar IECA/BRA." },
        pa_160_110:    { c: "danger", t: "Crise hipertensiva — emergência", d: "<b>Hidralazina IV 5 mg</b>, repetir a cada 20 minutos se necessário (até 4 doses). Alternativa: <b>nifedipina rápida</b> 10 mg VO. Meta: reduzir 15–25% na 1ª hora, NÃO derrubar para 110/70." },
        cronica:       { c: "info", t: "Hipertensa crônica engravidando", d: "Manter <b>metildopa</b>, <b>nifedipina LP</b> ou <b>pindolol</b>. <b>Hidroclorotiazida</b> pode ser mantida se já em uso. <b>IECA/BRA suspender</b> ao confirmar gestação (ou ideal: pré-concepcional)." },
        pe_lactante:   { c: "ok", t: "Lactação", d: "Compatíveis: <b>metildopa</b>, <b>nifedipina</b>, <b>captopril/enalapril</b> (sim, IECA são liberados na lactação — diferente da gestação), <b>hidroclorotiazida</b> em doses baixas. Avaliar individualmente." }
      };
      blk.querySelectorAll(".acs-scenario").forEach(b => {
        b.addEventListener("click", () => {
          blk.querySelectorAll(".acs-scenario").forEach(x => x.classList.remove("is-active"));
          b.classList.add("is-active");
          const r = map[b.dataset.scenario];
          if (!r) return;
          out.className = "acs-output acs-" + r.c;
          out.innerHTML = `<span class="kicker">${r.t}</span><p>${r.d}</p>`;
        });
      });
    });
  }

  // 11 · MagnesiumProtocolLab — comparador Pritchard × Zuspan
  function initMagnesiumProtocolLab(scope){
    scope.querySelectorAll('[data-component="MagnesiumProtocolLab"][data-implemented="1"]').forEach(blk => {
      blk.querySelectorAll(".mpl-tab").forEach(t => {
        t.addEventListener("click", () => {
          const target = t.dataset.tab;
          blk.querySelectorAll(".mpl-tab").forEach(x => x.classList.toggle("is-active", x === t));
          blk.querySelectorAll(".mpl-pane").forEach(p => p.style.display = p.dataset.tab === target ? "" : "none");
        });
      });
      const first = blk.querySelector(".mpl-tab");
      if (first) first.click();
    });
  }

  // 11b · MagnesiumToxicitySimulator — 3 Rs + gluconato
  function initMagnesiumToxicitySimulator(scope){
    scope.querySelectorAll('[data-component="MagnesiumToxicitySimulator"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".mts-output");
      const state = { reflexo: "presente", fr: 14, diurese: "ok" };
      const sliderFR = blk.querySelector('input[data-axis="fr"]');
      const apply = () => {
        let alerts = [];
        if (state.reflexo === "abolido") alerts.push("<b>Reflexo patelar abolido.</b> Suspender sulfato imediatamente.");
        if (state.fr < 12) alerts.push(`<b>FR ${state.fr} irpm (<12).</b> Risco de depressão respiratória — suspender sulfato.`);
        if (state.diurese === "oliguria") alerts.push("<b>Oligúria (<25 mL/h).</b> Risco de acúmulo — reavaliar dose, monitorar magnesemia.");
        if (alerts.length === 0){
          out.className = "mts-output mts-ok";
          out.innerHTML = `<b>3 Rs preservados.</b> Reflexo patelar presente, FR ≥12, diurese adequada. Manter sulfato e reavaliar em horários regulares.`;
        } else {
          const isToxic = state.reflexo === "abolido" || state.fr < 12;
          out.className = "mts-output " + (isToxic ? "mts-danger" : "mts-warn");
          out.innerHTML = alerts.join(" ") + (isToxic ? `<br><br><b>Antídoto:</b> gluconato de cálcio 1 g IV lento (10 mL a 10%).` : "");
        }
        // sync UI
        blk.querySelectorAll('button[data-axis="reflexo"]').forEach(b => b.classList.toggle("is-active", b.dataset.val === state.reflexo));
        blk.querySelectorAll('button[data-axis="diurese"]').forEach(b => b.classList.toggle("is-active", b.dataset.val === state.diurese));
        const frLbl = blk.querySelector(".mts-fr-label");
        if (frLbl) frLbl.textContent = state.fr + " irpm";
      };
      blk.querySelectorAll("button[data-axis]").forEach(b => {
        b.addEventListener("click", () => { state[b.dataset.axis] = b.dataset.val; apply(); });
      });
      if (sliderFR){
        sliderFR.addEventListener("input", () => { state.fr = parseInt(sliderFR.value, 10); apply(); });
      }
      apply();
    });
  }

  // 12 · DeliveryTimingPreeclampsiaStepper — momento do parto na PE
  function initDeliveryTimingPreeclampsiaStepper(scope){
    scope.querySelectorAll('[data-component="DeliveryTimingPreeclampsiaStepper"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".dtp-output");
      const state = { week: 32, severe: false, hellp: false, eclampsia: false, stable: true };
      const slider = blk.querySelector("input[type=range]");
      const apply = () => {
        let verdict = "", cls = "";
        if (state.eclampsia){
          verdict = "<b>Eclâmpsia.</b> Estabilizar (sulfato, anti-hipertensivo IV, via aérea) e <b>parto após estabilização</b>, independentemente da idade gestacional. Cesárea só se houver indicação obstétrica.";
          cls = "dtp-danger";
        } else if (state.hellp && state.week < 34 && state.stable){
          verdict = `<b>HELLP <34 sem · estável.</b> Corticoide para maturação pulmonar; conduta conservadora <b>curta</b> (24–48h) e <b>parto</b>.`;
          cls = "dtp-warn";
        } else if (state.hellp){
          verdict = "<b>HELLP ≥34 sem ou instável.</b> Estabilizar e parto. Cesárea não é automática — via vaginal possível.";
          cls = "dtp-danger";
        } else if (state.severe && state.week < 34 && state.stable){
          verdict = `<b>PE com gravidade <34 sem · estável.</b> Internar, sulfato, anti-hipertensivo, <b>corticoide</b> e <b>conduta conservadora</b> sob vigilância intensiva. Parto se piora materna ou fetal.`;
          cls = "dtp-warn";
        } else if (state.severe){
          verdict = "<b>PE com gravidade ≥34 sem ou instável.</b> Estabilizar e parto.";
          cls = "dtp-danger";
        } else {
          verdict = `<b>PE sem gravidade · ${state.week} semanas.</b> Vigilância (semanal/quinzenal), anti-hipertensivo se necessário, parto a termo (≥37 sem).`;
          cls = "dtp-ok";
        }
        out.className = "dtp-output " + cls;
        out.innerHTML = verdict;
        const wlbl = blk.querySelector(".dtp-week-label");
        if (wlbl) wlbl.textContent = state.week + " semanas";
        blk.querySelectorAll("button[data-toggle]").forEach(b => b.classList.toggle("is-active", state[b.dataset.toggle]));
      };
      if (slider){
        slider.addEventListener("input", () => { state.week = parseInt(slider.value, 10); apply(); });
      }
      blk.querySelectorAll("button[data-toggle]").forEach(b => {
        b.addEventListener("click", () => { state[b.dataset.toggle] = !state[b.dataset.toggle]; apply(); });
      });
      apply();
    });
  }

  // 13 · PuerperiumReclassificationTimeline — classificador puerperal
  function initPuerperiumReclassificationTimeline(scope){
    scope.querySelectorAll('[data-component="PuerperiumReclassificationTimeline"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".prt-output");
      const slider = blk.querySelector("input[type=range]");
      const state = { week: 6, paAlta: false };
      const apply = () => {
        let txt = "";
        if (state.week < 6 && state.paAlta) txt = "<b>Puerpério precoce (<6 sem) com PA elevada.</b> Manter anti-hipertensivo compatível com lactação. Reavaliar em 6 semanas.";
        else if (state.week < 12 && state.paAlta) txt = "<b>6 a 12 semanas pós-parto · PA persistente.</b> Ainda há tempo de resolver. Sigam acompanhamento clínico — não reclassifique como crônica antes das 12 semanas.";
        else if (state.week >= 12 && state.paAlta) txt = "<b>Após 12 semanas com PA elevada.</b> Reclassificar como <b>hipertensão crônica</b>. Encaminhar à clínica para investigação completa e seguimento.";
        else if (!state.paAlta) txt = `<b>Semana ${state.week} pós-parto · PA controlada.</b> Caso teve hipertensão gestacional, preliminar para alta da PE/HG. Mantenha rastreio cardiovascular ao longo da vida (risco aumentado).`;
        out.innerHTML = txt;
        const lbl = blk.querySelector(".prt-week-label");
        if (lbl) lbl.textContent = state.week + " semanas pós-parto";
        blk.querySelectorAll("button[data-pa]").forEach(b => b.classList.toggle("is-active", (state.paAlta ? "alta" : "ok") === b.dataset.pa));
      };
      if (slider){
        slider.addEventListener("input", () => { state.week = parseInt(slider.value, 10); apply(); });
      }
      blk.querySelectorAll("button[data-pa]").forEach(b => {
        b.addEventListener("click", () => { state.paAlta = b.dataset.pa === "alta"; apply(); });
      });
      apply();
    });
  }

  /* =========================================================================
     COMPONENTES DO BLOCO 2 — HIPERÊMESE GRAVÍDICA (Sub-fase 2B.1)
     ========================================================================= */

  // 14 · HyperemesisDecisionLab — checklist de decisão (orientar/ajustar/internar)
  function initHyperemesisDecisionLab(scope){
    scope.querySelectorAll('[data-component="HyperemesisDecisionLab"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".hdl-output");
      const checks = blk.querySelectorAll('input[type="checkbox"][data-criterion]');
      const apply = () => {
        const active = Array.from(checks).filter(c => c.checked).map(c => c.dataset.criterion);
        const internCriteria = ["incoercivel", "via_oral", "perda_5", "desidratacao", "cetonuria", "disturbio"];
        const internCount = active.filter(c => internCriteria.includes(c)).length;
        let verdict = "", cls = "";
        if (active.length === 0){
          verdict = "<b>Nenhum critério marcado.</b> Marque os achados presentes para classificar.";
        } else if (internCount === 0){
          verdict = "<b>Náusea/vômito fisiológico do 1º trimestre.</b> Orientação dietética (refeições pequenas, frias, secas, evitar gatilhos), reforçar hidratação. Pode-se prescrever piridoxina (B6) ± anti-histamínico (meclizina, dimenidrinato).";
          cls = "hdl-ok";
        } else if (internCount <= 2){
          verdict = `<b>Quadro intermediário — ajustar antiemético em ambulatório.</b> ${internCount} critério(s) presente(s). Iniciar metoclopramida ou anti-histamínico, monitorar tolerância via oral em 24–48h. Reavaliar em consulta. Internar se piorar.`;
          cls = "hdl-warn";
        } else {
          verdict = `<b>Hiperêmese gravídica — internar.</b> ${internCount} critério(s) presente(s). Internação para reposição hidroeletrolítica, tiamina antes/junto de glicose, antieméticos e reintrodução progressiva da via oral.`;
          cls = "hdl-danger";
        }
        out.className = "hdl-output " + cls;
        out.innerHTML = verdict;
      };
      checks.forEach(c => c.addEventListener("change", apply));
      apply();
    });
  }

  // 15 · HCGThyroidDifferentialMap — diferenciais HCG / tireoide
  function initHCGThyroidDifferentialMap(scope){
    scope.querySelectorAll('[data-component="HCGThyroidDifferentialMap"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".htm-output");
      const map = {
        mola: { c: "warn", t: "Mola hidatiforme",
          d: "Útero <b>aumentado para a idade gestacional</b>, sangramento vaginal, β-HCG <b>muito elevado</b> (acima do esperado), USG com vesículas em <b>cacho de uva</b>. Pode cursar com hiperêmese e hipertireoidismo transitório. <b>Conduta:</b> esvaziamento uterino e seguimento β-HCG até negativar. Risco de mola invasora/coriocarcinoma." },
        gemelar: { c: "info", t: "Gestação gemelar",
          d: "USG confirma. β-HCG <b>elevado</b> (mais alto que em única). Pode haver hiperêmese mais intensa e/ou hipertireoidismo transitório. <b>Conduta:</b> pré-natal de risco, definir corionicidade no USG precoce, seguimento mais próximo." },
        tireoide_transitorio: { c: "warn", t: "Hipertireoidismo transitório por HCG",
          d: "TSH <b>suprimido</b> com T4 livre <b>normal</b> ou levemente elevado, sem bócio, sem oftalmopatia, anticorpos anti-receptor de TSH (TRAb) <b>negativos</b>. Cursa com vômitos, taquicardia leve. <b>Conduta:</b> NÃO tratar com antitireoidiano de rotina. Tratar a hiperêmese; tireoide volta ao normal após 1º trimestre." },
        tireoide_graves: { c: "danger", t: "Doença de Graves verdadeira",
          d: "TSH suprimido, T4 livre <b>elevado</b>, <b>bócio</b>, <b>oftalmopatia</b>, TRAb <b>positivo</b>, sintomas adrenérgicos significativos. <b>Conduta:</b> propiltiouracil (1º trimestre) ou metimazol (2º/3º trimestre), monitorização materno-fetal, risco de tireotoxicose neonatal." },
        pancreatite: { c: "danger", t: "Pancreatite gestacional",
          d: "Dor abdominal <b>em barra</b>, irradiada para dorso, vômitos, <b>amilase/lipase elevadas</b> (≥3× o limite). Causa mais frequente: <b>colelitíase</b>. <b>Conduta:</b> jejum, hidratação, analgesia, suporte; cuidado obstétrico; tratar causa base." },
        hiperemese_isolada: { c: "ok", t: "Hiperêmese isolada",
          d: "Sem útero aumentado para IG, β-HCG compatível com IG, USG com gestação única, TSH/T4L normais ou com padrão de transitório, amilase normal. <b>Conduta:</b> internar, repor volume, tiamina, antieméticos." }
      };
      blk.querySelectorAll(".htm-dx").forEach(b => {
        b.addEventListener("click", () => {
          blk.querySelectorAll(".htm-dx").forEach(x => x.classList.remove("is-active"));
          b.classList.add("is-active");
          const r = map[b.dataset.dx];
          if (!r) return;
          out.className = "htm-output htm-" + r.c;
          out.innerHTML = `<span class="kicker">${r.t}</span><p>${r.d}</p>`;
        });
      });
    });
  }

  // 16 · HyperemesisTreatmentProtocol — ordem correta da conduta
  function initHyperemesisTreatmentProtocol(scope){
    scope.querySelectorAll('[data-component="HyperemesisTreatmentProtocol"][data-implemented="1"]').forEach(blk => {
      const list = blk.querySelector(".htp-list");
      const out = blk.querySelector(".htp-output");
      const correctOrder = ["internar","hidratar","tiamina","antiemetico","reintroduzir"];
      let chosen = [];

      const renderChosen = () => {
        const display = blk.querySelector(".htp-chosen");
        display.innerHTML = chosen.length === 0
          ? "<small class=\"muted\">Clique nas etapas na ordem correta…</small>"
          : chosen.map((c, i) => `<span class="htp-chip">${i+1}. ${c.label}</span>`).join("");
      };

      const validate = () => {
        if (chosen.length !== correctOrder.length) return;
        const ok = chosen.every((c, i) => c.id === correctOrder[i]);
        if (ok){
          out.className = "htp-output htp-ok";
          out.innerHTML = "<b>Ordem correta!</b> Internar → hidratar → tiamina → antiemético → reintroduzir VO. <br><b>Detalhe crítico:</b> tiamina ANTES ou junto da glicose para prevenir encefalopatia de Wernicke.";
        } else {
          out.className = "htp-output htp-danger";
          const wrongIdx = chosen.findIndex((c, i) => c.id !== correctOrder[i]);
          const expected = correctOrder[wrongIdx];
          const expectedLabel = ({internar:"internar",hidratar:"hidratar",tiamina:"tiamina (antes da glicose)",antiemetico:"antiemético",reintroduzir:"reintroduzir VO"})[expected];
          out.innerHTML = `<b>Ordem errada na etapa ${wrongIdx+1}.</b> O correto seria: <b>${expectedLabel}</b>. <br>Clique em "Reiniciar" e tente novamente.`;
        }
      };

      blk.querySelectorAll(".htp-step").forEach(s => {
        s.addEventListener("click", () => {
          if (s.classList.contains("is-used")) return;
          s.classList.add("is-used");
          chosen.push({ id: s.dataset.step, label: s.dataset.label });
          renderChosen();
          validate();
        });
      });

      const reset = blk.querySelector(".htp-reset");
      if (reset) reset.addEventListener("click", () => {
        chosen = [];
        blk.querySelectorAll(".htp-step").forEach(s => s.classList.remove("is-used"));
        out.className = "htp-output";
        out.innerHTML = "";
        renderChosen();
      });

      renderChosen();
    });
  }

  window._GO_block2Inits = [
    initHyperemesisDecisionLab,
    initHCGThyroidDifferentialMap,
    initHyperemesisTreatmentProtocol
  ];

  /* =========================================================================
     COMPONENTES DO BLOCO 3 — DIABETES NA GESTAÇÃO (Sub-fase 2C.1)
     ========================================================================= */

  // 17 · DiabetesRiskClassifier — verdadeiro × falso de fatores de risco
  function initDiabetesRiskClassifier(scope){
    scope.querySelectorAll('[data-component="DiabetesRiskClassifier"][data-implemented="1"]').forEach(blk => {
      const explain = {
        macrossomia: { ok: true, txt: "<b>Verdadeiro.</b> Macrossomia em gestação anterior (RN ≥4.000 g) é fator de risco clássico — denuncia DMG não diagnosticado anteriormente." },
        obito: { ok: true, txt: "<b>Verdadeiro.</b> Óbito fetal tardio inexplicado é fator de risco — pode ter ocorrido por descompensação metabólica." },
        obesidade: { ok: true, txt: "<b>Verdadeiro.</b> IMC pré-gestacional ≥30 aumenta risco de DMG." },
        hipertensao: { ok: true, txt: "<b>Verdadeiro.</b> HAS é fator de risco. A síndrome metabólica conecta os dois." },
        familiar1: { ok: true, txt: "<b>Verdadeiro.</b> Diabetes em familiar de 1º grau (pai, mãe, irmãos) é fator de risco." },
        tiavo: { ok: false, txt: "<b>FALSO.</b> Tia-avó é parente de 4º grau — não conta. A pegadinha é colocar parentes distantes para induzir o aluno ao erro." },
        sop: { ok: true, txt: "<b>Verdadeiro.</b> Síndrome dos ovários policísticos compartilha resistência insulínica e aumenta risco." },
        idade: { ok: true, txt: "<b>Verdadeiro.</b> Idade materna avançada (≥35 anos) é fator de risco." },
        glicemia_previa: { ok: true, txt: "<b>Verdadeiro.</b> Glicemia de jejum prévia alterada (pré-diabetes) é fator de risco." },
        rastreio: { ok: false, txt: "<b>FALSO.</b> Mesmo SEM fator de risco, todas as gestantes devem ser rastreadas — o rastreio é universal." }
      };
      const out = blk.querySelector(".drc-output");
      blk.querySelectorAll(".drc-factor").forEach(b => {
        b.addEventListener("click", () => {
          blk.querySelectorAll(".drc-factor").forEach(x => x.classList.remove("is-active"));
          b.classList.add("is-active");
          const r = explain[b.dataset.factor];
          if (!r) return;
          out.className = "drc-output " + (r.ok ? "drc-ok" : "drc-danger");
          out.innerHTML = r.txt;
        });
      });
    });
  }

  // 18 · GestationalDiabetesDiagnosisFlow — calculadora diagnóstica
  function initGestationalDiabetesDiagnosisFlow(scope){
    scope.querySelectorAll('[data-component="GestationalDiabetesDiagnosisFlow"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".gdd-output");
      const fields = ["jejum_inicial", "totg_jejum", "totg_1h", "totg_2h"].map(id => blk.querySelector(`input[data-field="${id}"]`));
      const evaluate = () => {
        const [ji, tj, t1, t2] = fields.map(f => f && f.value !== "" ? parseFloat(f.value) : null);
        let lines = [], cls = "";

        // Jejum inicial (<20 sem)
        if (ji !== null){
          if (ji >= 126){ lines.push("<b>Jejum inicial ≥126 mg/dL</b> → <b>Diabetes prévio</b> não diagnosticado. Encaminhar alto risco; considerar hemoglobina glicada para confirmar."); cls = "gdd-danger"; }
          else if (ji >= 92){ lines.push("<b>Jejum inicial 92–125 mg/dL</b> → <b>Diabetes mellitus gestacional (DMG)</b>. Iniciar dieta + atividade física e perfil glicêmico."); cls = cls || "gdd-warn"; }
          else { lines.push("<b>Jejum inicial &lt;92 mg/dL</b> → normal nessa janela. Solicitar TOTG entre 24 e 28 semanas."); cls = cls || "gdd-ok"; }
        }

        // TOTG 75 g
        const totgValues = [tj, t1, t2];
        if (totgValues.some(v => v !== null)){
          let alteredCount = 0;
          let prevCriteria = false;
          if (tj !== null){
            if (tj >= 126){ prevCriteria = true; alteredCount++; }
            else if (tj >= 92) alteredCount++;
          }
          if (t1 !== null && t1 >= 180) alteredCount++;
          if (t2 !== null){
            if (t2 >= 200){ prevCriteria = true; alteredCount++; }
            else if (t2 >= 153) alteredCount++;
          }
          if (prevCriteria){
            lines.push("<b>TOTG 75 g:</b> jejum ≥126 OU 2h ≥200 → <b>Diabetes prévio</b> não diagnosticado.");
            cls = "gdd-danger";
          } else if (alteredCount > 0){
            lines.push(`<b>TOTG 75 g:</b> ${alteredCount} valor(es) alterado(s) (jejum ≥92 / 1h ≥180 / 2h ≥153) → <b>DMG confirmado</b>.`);
            cls = cls === "gdd-danger" ? "gdd-danger" : "gdd-warn";
          } else {
            lines.push("<b>TOTG 75 g:</b> todos os valores dentro do alvo → <b>normal</b>.");
            cls = cls || "gdd-ok";
          }
        }

        if (lines.length === 0){
          out.className = "gdd-output";
          out.innerHTML = "<small class=\"muted\">Insira valores nos campos acima para calcular.</small>";
          return;
        }
        out.className = "gdd-output " + cls;
        out.innerHTML = lines.map(l => `<p>${l}</p>`).join("");
      };
      fields.forEach(f => f && f.addEventListener("input", evaluate));
      evaluate();
    });
  }

  // 19 · GlycemicProfileDashboard — diagnóstico × acompanhamento
  function initGlycemicProfileDashboard(scope){
    scope.querySelectorAll('[data-component="GlycemicProfileDashboard"][data-implemented="1"]').forEach(blk => {
      blk.querySelectorAll(".gpd-tab").forEach(t => {
        t.addEventListener("click", () => {
          const target = t.dataset.tab;
          blk.querySelectorAll(".gpd-tab").forEach(x => x.classList.toggle("is-active", x === t));
          blk.querySelectorAll(".gpd-pane").forEach(p => p.style.display = p.dataset.tab === target ? "" : "none");
        });
      });
      const first = blk.querySelector(".gpd-tab");
      if (first) first.click();
    });
  }

  // 20 · ThirtyPercentRuleSimulator — regra dos 30%
  function initThirtyPercentRuleSimulator(scope){
    scope.querySelectorAll('[data-component="ThirtyPercentRuleSimulator"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".tpr-output");
      const counter = blk.querySelector(".tpr-counter");
      const cells = blk.querySelectorAll(".tpr-cell");
      const apply = () => {
        const total = cells.length;
        const altered = Array.from(cells).filter(c => c.classList.contains("is-altered")).length;
        const pct = total > 0 ? (altered / total) * 100 : 0;
        if (counter) counter.textContent = `${altered} de ${total} medidas alteradas (${pct.toFixed(0)}%)`;
        let verdict, cls;
        if (pct === 0){
          verdict = "<b>Perfil glicêmico controlado.</b> Manter dieta e atividade física. Reavaliar em 1–2 semanas.";
          cls = "tpr-ok";
        } else if (pct <= 30){
          verdict = `<b>${pct.toFixed(0)}% das medidas fora do alvo.</b> Ainda dentro do limite — manter dieta e atividade, reforçar adesão. Reavaliar em 1 semana.`;
          cls = "tpr-warn";
        } else {
          verdict = `<b>${pct.toFixed(0)}% das medidas fora do alvo (>30%).</b> Indicação de medicação: insulina como principal escolha. Encaminhar ao alto risco.`;
          cls = "tpr-danger";
        }
        out.className = "tpr-output " + cls;
        out.innerHTML = verdict;
      };
      cells.forEach(c => c.addEventListener("click", () => {
        c.classList.toggle("is-altered");
        apply();
      }));
      apply();
    });
  }

  // 21 · DiabetesTreatmentNavigator — UBS × alto risco
  function initDiabetesTreatmentNavigator(scope){
    scope.querySelectorAll('[data-component="DiabetesTreatmentNavigator"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".dtn-output");
      const map = {
        dmg_dieta: { c: "ok", t: "DMG controlado com dieta · UBS", d: "DMG sem medicação, perfil glicêmico controlado: pode seguir na UBS conforme protocolo local. Manter dieta fracionada, atividade física, perfil glicêmico seriado, USG seriada para crescimento fetal." },
        dmg_med: { c: "warn", t: "DMG com medicação · alto risco", d: "DMG que precisou de medicação (insulina ou metformina) deve ser encaminhada ao alto risco. Acompanhamento conjunto com obstetra e endocrinologista. Ajustes de dose semanais nos primeiros tempos, depois quinzenais." },
        dm_previo: { c: "danger", t: "Diabetes prévio · alto risco sempre", d: "Diabetes prévio (DM1 ou DM2) sempre vai para alto risco, independentemente do controle. Riscos aumentados: malformações (se mau controle periconcepcional), pré-eclâmpsia, restrição de crescimento, óbito fetal. Avaliar fundo de olho (retinopatia), função renal." }
      };
      blk.querySelectorAll(".dtn-case").forEach(b => {
        b.addEventListener("click", () => {
          blk.querySelectorAll(".dtn-case").forEach(x => x.classList.remove("is-active"));
          b.classList.add("is-active");
          const r = map[b.dataset.case];
          if (!r) return;
          out.className = "dtn-output dtn-" + r.c;
          out.innerHTML = `<span class="kicker">${r.t}</span><p>${r.d}</p>`;
        });
      });
    });
  }

  // 22 · InsulinPregnancyTimeline — escadinha por trimestre
  function initInsulinPregnancyTimeline(scope){
    scope.querySelectorAll('[data-component="InsulinPregnancyTimeline"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".ipt-output");
      const map = {
        t1: { c: "info", t: "1º trimestre · ↓ dose", d: "Reduzir a dose pré-gestacional. Náusea, vômitos e baixa ingesta tornam a gestante mais sensível a hipoglicemia. Monitorar glicemias capilares com mais frequência. Em DMG novo, geralmente ainda não há insulina nesta fase." },
        t2: { c: "warn", t: "2º trimestre · ↑ dose", d: "Aumentar a dose. A placenta começa a produzir hormônios contra-insulínicos (lactogênio placentário, cortisol, GH placentário) com pico entre 24 e 28 semanas. Resistência insulínica progressiva." },
        t3: { c: "danger", t: "3º trimestre · ↑↑ dose, mas atenção", d: "Continuar aumentando até 36–37 semanas. <b>Hipoglicemia inesperada com mesma dose e mesma dieta</b> nesta fase é sinal de alarme: <b>insuficiência placentária</b> (placenta sofrendo, produzindo menos hormônios contra-insulínicos). Avaliar vitalidade fetal." },
        pp: { c: "ok", t: "Pós-parto · ↓ dose imediata", d: "Reduzir dose drasticamente após o parto. Em DMG, geralmente <b>suspender insulina</b>. Em DM1, voltar à dose pré-gestacional ou metade da dose final da gestação. Em DM2, metade da dose final ou retornar a antidiabético oral conforme contexto e amamentação. TOTG em 6 sem na DMG." }
      };
      blk.querySelectorAll(".ipt-step").forEach(s => {
        s.addEventListener("click", () => {
          blk.querySelectorAll(".ipt-step").forEach(x => x.classList.remove("is-active"));
          s.classList.add("is-active");
          const r = map[s.dataset.step];
          if (!r) return;
          out.className = "ipt-output ipt-" + r.c;
          out.innerHTML = `<span class="kicker">${r.t}</span><p>${r.d}</p>`;
        });
      });
    });
  }

  // 23 · DiabetesDeliveryTimingStepper — momento do parto
  function initDiabetesDeliveryTimingStepper(scope){
    scope.querySelectorAll('[data-component="DiabetesDeliveryTimingStepper"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".dds-output");
      const state = { type: "dmg_dieta", control: "good", complications: false };
      const apply = () => {
        let week, txt, cls;
        if (state.type === "dmg_dieta" && state.control === "good" && !state.complications){
          week = "40 sem"; cls = "dds-ok";
          txt = "<b>DMG sem medicação · bom controle.</b> Aguardar parto espontâneo até 40 semanas. Indução se ultrapassar termo.";
        } else if ((state.type === "dmg_med" || state.type === "dm_previo") && state.control === "good" && !state.complications){
          week = "39 sem"; cls = "dds-ok";
          txt = "<b>DMG com medicação ou diabetes prévio · bom controle.</b> Programar parto até 39 semanas. Pode ser via vaginal — cesárea por critério obstétrico.";
        } else if (state.control === "bad" || state.complications){
          week = "37–38 sem"; cls = "dds-warn";
          txt = "<b>Mau controle ou complicação ultrassonográfica</b> (macrossomia, polidrâmnio): antecipar parto entre 37 e 38 semanas após avaliação de maturidade.";
        } else {
          week = "—"; cls = "";
          txt = "Selecione tipo, controle e complicações.";
        }
        out.className = "dds-output " + cls;
        out.innerHTML = `<span class="kicker">Momento provável: ${week}</span><p>${txt}</p>`;
        blk.querySelectorAll("button[data-axis]").forEach(b => {
          if (b.dataset.axis === "complications") b.classList.toggle("is-active", state.complications && b.dataset.val === "yes" || !state.complications && b.dataset.val === "no");
          else b.classList.toggle("is-active", state[b.dataset.axis] === b.dataset.val);
        });
      };
      blk.querySelectorAll("button[data-axis]").forEach(b => {
        b.addEventListener("click", () => {
          if (b.dataset.axis === "complications"){ state.complications = b.dataset.val === "yes"; }
          else { state[b.dataset.axis] = b.dataset.val; }
          apply();
        });
      });
      apply();
    });
  }

  // 24 · DiabeticFetusComplicationMap — mecanismo × complicação
  function initDiabeticFetusComplicationMap(scope){
    scope.querySelectorAll('[data-component="DiabeticFetusComplicationMap"][data-implemented="1"]').forEach(blk => {
      const explain = {
        macrossomia: "<b>Macrossomia.</b> Glicose materna atravessa a placenta livremente; o pâncreas fetal responde com hiperinsulinismo. Insulina é o hormônio anabólico fetal por excelência → ganho de peso desproporcional.",
        polidramnio: "<b>Polidrâmnio.</b> Hiperglicemia fetal → diurese osmótica → aumento do volume de líquido amniótico.",
        distocia: "<b>Distócia de ombros.</b> Macrossomia + ganho de gordura no tronco e ombros → ombro anterior preso na sínfise púbica durante o parto. Risco de lesão de plexo braquial e fratura de clavícula.",
        hipoglicemia: "<b>Hipoglicemia neonatal.</b> Ao cortar o cordão, a glicose materna acaba subitamente, mas o pâncreas fetal continua produzindo insulina por inércia → hipoglicemia nas primeiras horas de vida.",
        policitemia: "<b>Policitemia neonatal.</b> Hipóxia crônica intrauterina (causada por hiperinsulinismo e maior consumo de O2) estimula eritropoetina → policitemia.",
        regressao: "<b>Síndrome da regressão caudal.</b> Malformação rara associada a diabetes prévio mal controlado <b>periconcepcional</b>. Outras malformações: cardiopatias congênitas, defeitos do tubo neural. Hemoglobina glicada baixa antes de engravidar é a melhor prevenção."
      };
      const out = blk.querySelector(".dfc-output");
      blk.querySelectorAll(".dfc-comp").forEach(b => {
        b.addEventListener("click", () => {
          blk.querySelectorAll(".dfc-comp").forEach(x => x.classList.remove("is-active"));
          b.classList.add("is-active");
          out.innerHTML = explain[b.dataset.comp] || "";
        });
      });
    });
  }

  // 25 · ShoulderDystociaSimulator — sequência de manobras
  function initShoulderDystociaSimulator(scope){
    scope.querySelectorAll('[data-component="ShoulderDystociaSimulator"][data-implemented="1"]').forEach(blk => {
      const correctOrder = ["ajuda","mcroberts","suprapubica","jacquemier","rotacional","gaskin"];
      let chosen = [];
      const display = blk.querySelector(".sds-chosen");
      const out = blk.querySelector(".sds-output");

      const renderChosen = () => {
        display.innerHTML = chosen.length === 0
          ? "<small class=\"muted\">Comece pela primeira CONDUTA, não pela primeira força…</small>"
          : chosen.map((c, i) => `<span class="sds-chip">${i+1}. ${c.label}</span>`).join("");
      };

      const validate = () => {
        if (chosen.length === 0) return;
        const ok = chosen.every((c, i) => c.id === correctOrder[i]);
        if (chosen.length === correctOrder.length && ok){
          out.className = "sds-output sds-ok";
          out.innerHTML = "<b>Sequência completa correta!</b> Chamar ajuda → McRoberts → suprapúbica → Jacquemier → rotacional → Gaskin. <br><b>Lema:</b> parto é jeito, não força.";
        } else if (!ok){
          const wrongIdx = chosen.findIndex((c, i) => c.id !== correctOrder[i]);
          const expected = correctOrder[wrongIdx];
          const expectedLabel = ({ajuda:"chamar ajuda (1ª conduta)", mcroberts:"McRoberts (1ª manobra)", suprapubica:"pressão suprapúbica", jacquemier:"Jacquemier (braço posterior)", rotacional:"manobra rotacional (saca-rolha)", gaskin:"Gaskin (4 apoios)"})[expected];
          out.className = "sds-output sds-danger";
          out.innerHTML = `<b>Ordem errada na etapa ${wrongIdx+1}.</b> O correto seria: <b>${expectedLabel}</b>. <br>Pegadinha clássica: confundir 1ª <b>conduta</b> (chamar ajuda) com 1ª <b>manobra</b> (McRoberts). Reinicie e tente novamente.`;
        } else {
          out.className = "sds-output sds-warn";
          out.innerHTML = `<b>Até aqui, ordem correta.</b> Próximo passo esperado: ${({ajuda:"chamar ajuda", mcroberts:"McRoberts", suprapubica:"pressão suprapúbica", jacquemier:"Jacquemier", rotacional:"rotacional/saca-rolha", gaskin:"Gaskin"})[correctOrder[chosen.length]]}.`;
        }
      };

      blk.querySelectorAll(".sds-step").forEach(s => {
        s.addEventListener("click", () => {
          if (s.classList.contains("is-used")) return;
          s.classList.add("is-used");
          chosen.push({ id: s.dataset.step, label: s.dataset.label });
          renderChosen();
          validate();
        });
      });

      const reset = blk.querySelector(".sds-reset");
      if (reset) reset.addEventListener("click", () => {
        chosen = [];
        blk.querySelectorAll(".sds-step").forEach(s => s.classList.remove("is-used"));
        out.className = "sds-output";
        out.innerHTML = "";
        renderChosen();
      });

      renderChosen();
    });
  }

  // 26 · DiabetesPuerperiumClassifier — DM1 / DM2 / DMG
  function initDiabetesPuerperiumClassifier(scope){
    scope.querySelectorAll('[data-component="DiabetesPuerperiumClassifier"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".dpc-output");
      const map = {
        dm1: { c: "info", t: "DM1 no puerpério",
          d: "Voltar à dose pré-gestacional <b>ou</b> metade da dose final da gestação como ponto de partida. Atenção a hipoglicemia (lactação aumenta sensibilidade). Manter monitorização capilar frequente. <b>Não suspender insulina</b> — DM1 é insulinodependente." },
        dm2: { c: "info", t: "DM2 no puerpério",
          d: "Reduzir para metade da dose final ou retornar a antidiabético oral conforme contexto e amamentação. <b>Metformina compatível com lactação.</b> Avaliar conjuntamente com endocrinologista." },
        dmg: { c: "ok", t: "DMG no puerpério",
          d: "<b>Suspender insulina</b> e <b>liberar dieta normal</b> (NÃO manter dieta hipoglicemiante — pegadinha clássica). Solicitar <b>TOTG 75 g em 6 semanas</b> para reclassificação. Lembrar a paciente do risco aumentado de DM2 ao longo da vida — rastreio cardiovascular periódico." }
      };
      blk.querySelectorAll(".dpc-trail").forEach(b => {
        b.addEventListener("click", () => {
          blk.querySelectorAll(".dpc-trail").forEach(x => x.classList.remove("is-active"));
          b.classList.add("is-active");
          const r = map[b.dataset.trail];
          if (!r) return;
          out.className = "dpc-output dpc-" + r.c;
          out.innerHTML = `<span class="kicker">${r.t}</span><p>${r.d}</p>`;
        });
      });
    });
  }

  window._GO_block3Inits = [
    initDiabetesRiskClassifier,
    initGestationalDiabetesDiagnosisFlow,
    initGlycemicProfileDashboard,
    initThirtyPercentRuleSimulator,
    initDiabetesTreatmentNavigator,
    initInsulinPregnancyTimeline,
    initDiabetesDeliveryTimingStepper,
    initDiabeticFetusComplicationMap,
    initShoulderDystociaSimulator,
    initDiabetesPuerperiumClassifier
  ];

  /* =========================================================================
     COMPONENTES DO BLOCO 4 — GEMELARIDADE (Sub-fase 2D.1)
     ========================================================================= */

  // 27 · TwinClassificationMap — seletor de achados × classificação
  function initTwinClassificationMap(scope){
    scope.querySelectorAll('[data-component="TwinClassificationMap"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".tcm-output");
      const state = { sex: null, sacs: null, placentas: null, sign: null };
      const decide = () => {
        // 1) Sexo diferente → DEFINITIVO dizigótica e dicoriônica/diamniótica
        if (state.sex === "diferente"){
          return { c: "info", t: "Dizigótica · dicoriônica e diamniótica",
            d: "Sexos diferentes confirmam <b>dizigoticidade</b> (e, por consequência, dicorionicidade e diamnionicidade — uma placenta para cada). Nenhum achado adicional é necessário para essa conclusão." };
        }
        // 2) Dois sacos no USG precoce ou duas placentas → dicoriônica diamniótica
        if (state.sacs === "dois" || state.placentas === "duas" || state.sign === "lambda"){
          return { c: "warn", t: "Dicoriônica e diamniótica",
            d: "<b>Dois sacos gestacionais no USG precoce</b>, OU <b>duas placentas</b>, OU <b>sinal do lambda/Y/twin peak</b> nas 11–14 sem confirmam corionicidade <b>dicoriônica</b>. Toda dicoriônica é diamniótica. <b>Atenção:</b> isso NÃO prova dizigoticidade — pode ser monozigótica com divisão precoce (≤72h)." };
        }
        // 3) Um saco com sinal do T → monocoriônica diamniótica
        if (state.sign === "t"){
          return { c: "danger", t: "Monocoriônica e diamniótica",
            d: "Sinal do T (membrana fina perpendicular à placenta única) confirma <b>monocoriônica e diamniótica</b>. Risco de <b>transfusão feto-fetal</b> — USG/Doppler seriada (15/15 dias) e parto até 36 sem." };
        }
        // 4) Um saco sem membrana visível → monocoriônica monoamniótica
        if (state.sacs === "um" && state.sign === "ausente"){
          return { c: "danger", t: "Monocoriônica e monoamniótica (rara)",
            d: "Saco único <b>sem membrana intermediária</b> identificável aponta para monoamniótica. <b>Risco máximo</b> (enovelamento de cordão). Internação no 3º trimestre, cesárea entre 32–34 sem." };
        }
        return null;
      };
      const render = () => {
        // sync UI
        ["sex","sacs","placentas","sign"].forEach(k => {
          blk.querySelectorAll(`button[data-axis="${k}"]`).forEach(b => {
            b.classList.toggle("is-active", state[k] === b.dataset.val);
          });
        });
        const r = decide();
        if (!r){
          out.className = "tcm-output";
          out.innerHTML = "<small class=\"muted\">Selecione achados para classificar.</small>";
          return;
        }
        out.className = "tcm-output tcm-" + r.c;
        out.innerHTML = `<span class="kicker">${r.t}</span><p>${r.d}</p>`;
      };
      blk.querySelectorAll("button[data-axis]").forEach(b => {
        b.addEventListener("click", () => {
          const k = b.dataset.axis;
          state[k] = state[k] === b.dataset.val ? null : b.dataset.val;
          render();
        });
      });
      const reset = blk.querySelector(".tcm-reset");
      if (reset) reset.addEventListener("click", () => {
        state.sex = state.sacs = state.placentas = state.sign = null;
        render();
      });
      render();
    });
  }

  // 28 · EmbryoSplitTimeline — slider de divisão
  function initEmbryoSplitTimeline(scope){
    scope.querySelectorAll('[data-component="EmbryoSplitTimeline"][data-implemented="1"]').forEach(blk => {
      const slider = blk.querySelector("input[type=range]");
      const out = blk.querySelector(".est-output");
      const marker = blk.querySelector(".est-marker");
      const explain = (d) => {
        if (d <= 3) return { c: "info", t: "Dicoriônica e diamniótica (DC/DA)", d: "Divisão até 72 horas (≤3 dias). Cada embrião gera seu próprio córion e seu próprio âmnio. <b>Risco mais baixo</b> entre as monozigóticas. Atenção: morfologicamente é idêntica a uma gemelar dizigótica DC/DA — só sexos diferentes ou DNA confirmam zigoticidade." };
        if (d <= 8) return { c: "warn", t: "Monocoriônica e diamniótica (MC/DA)", d: "Divisão entre 4 e 8 dias. Compartilham córion (uma placenta) mas têm cavidades amnióticas separadas. Forma <b>mais comum</b> de gemelar monocoriônica. <b>Risco principal: transfusão feto-fetal</b>." };
        if (d <= 12) return { c: "danger", t: "Monocoriônica e monoamniótica (MC/MA)", d: "Divisão entre 8 e 12 dias. Compartilham placenta E cavidade amniótica. <b>Risco máximo de enovelamento de cordão</b> e óbito intrauterino. Internação no 3º trimestre, cesárea 32–34 sem." };
        return { c: "danger", t: "Gêmeos conjugados (siameses)", d: "Divisão após 12 dias. Não há separação completa do disco embrionário. Classificação por região de fusão (toracópagos, onfalópagos etc.). Cesárea sempre — idade gestacional individualizada." };
      };
      const render = () => {
        const d = parseInt(slider.value, 10);
        if (marker) marker.style.left = ((d - 1) / (15 - 1) * 100) + "%";
        const e = explain(d);
        out.className = "est-output est-" + e.c;
        out.innerHTML = `<span class="kicker">Divisão no dia ${d}</span><h4>${e.t}</h4><p>${e.d}</p>`;
      };
      if (slider){
        slider.addEventListener("input", render);
        render();
      }
    });
  }

  // 29 · ChorionicityUltrasoundLab — laboratório de imagem
  function initChorionicityUltrasoundLab(scope){
    scope.querySelectorAll('[data-component="ChorionicityUltrasoundLab"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".cul-output");
      const map = {
        dois_sacos: { c: "warn", t: "Dois sacos gestacionais (USG 6–9 sem)",
          d: "Achado mais confiável e precoce: <b>dois sacos</b> = <b>dicoriônica</b>. Toda dicoriônica é diamniótica. Não diferencia entre mono e dizigótica — só sexos diferentes ou DNA." },
        um_saco_2_vesiculas: { c: "danger", t: "Um saco com 2 vesículas vitelínicas",
          d: "Saco único + duas vesículas vitelínicas → <b>monocoriônica e diamniótica</b>. Avaliar membrana intermediária no USG seguinte (~11–14 sem)." },
        um_saco_1_vesicula: { c: "danger", t: "Um saco com 1 vesícula vitelínica",
          d: "Saco único + uma vesícula vitelínica → <b>monocoriônica e monoamniótica</b> (rara). Risco máximo." },
        lambda: { c: "warn", t: "Sinal do lambda / Y / twin peak (11–14 sem)",
          d: "Membrana intermediária <b>espessa em forma de cunha</b> entrando entre os córions. Confirma <b>dicoriônica</b>. Após 14 sem, a placenta dicoriônica que se fundiu pode mascarar o sinal." },
        t: { c: "danger", t: "Sinal do T (11–14 sem)",
          d: "Membrana intermediária <b>fina e perpendicular</b> à placenta única, sem cunha. Confirma <b>monocoriônica e diamniótica</b>." },
        sem_membrana: { c: "danger", t: "Sem membrana intermediária identificável",
          d: "Após avaliação cuidadosa, ausência de membrana sugere <b>monoamniótica</b>. Confirmar com USG seriado e considerar discordância de movimento entre os fetos." }
      };
      blk.querySelectorAll(".cul-finding").forEach(b => {
        b.addEventListener("click", () => {
          blk.querySelectorAll(".cul-finding").forEach(x => x.classList.remove("is-active"));
          b.classList.add("is-active");
          const r = map[b.dataset.finding];
          if (!r) return;
          out.className = "cul-output cul-" + r.c;
          out.innerHTML = `<span class="kicker">${r.t}</span><p>${r.d}</p>`;
        });
      });
    });
  }

  // 30 · TwinRiskCardGame — verdadeiro × falso
  function initTwinRiskCardGame(scope){
    scope.querySelectorAll('[data-component="TwinRiskCardGame"][data-implemented="1"]').forEach(blk => {
      const explain = {
        familiar_dz: { ok: true, txt: "<b>Verdadeiro.</b> História familiar de gêmeos <b>dizigóticos</b> (mãe ou avó materna) aumenta risco — herda-se a tendência a poliovulação." },
        familiar_mz: { ok: false, txt: "<b>FALSO.</b> História familiar de gêmeos <b>idênticos</b> (monozigóticos) <b>não aumenta risco</b> — a divisão é evento aleatório do zigoto." },
        idade: { ok: true, txt: "<b>Verdadeiro.</b> Idade materna avançada (≈35 anos) aumenta risco de gemelar dizigótica — múltiplas ovulações por ciclo são mais frequentes." },
        etnia: { ok: true, txt: "<b>Verdadeiro.</b> Existe variação populacional — algumas etnias têm taxa basal mais alta de gemelar dizigótica (ex.: Yoruba, na Nigéria, com a taxa mais alta documentada)." },
        inducao: { ok: true, txt: "<b>Verdadeiro.</b> Indução de ovulação (citrato de clomifeno, gonadotrofinas) aumenta a chance de poliovulação e gemelar dizigótica." },
        fiv: { ok: true, txt: "<b>Verdadeiro · com nuance.</b> FIV aumenta dizigoticidade pela transferência de múltiplos embriões — <b>e também</b> aumenta a chance de divisão monozigótica posterior. É a única intervenção que aumenta os dois tipos." },
        dieta_amido: { ok: false, txt: "<b>FALSO.</b> Mitos populares (\"comer batata-doce\", \"dieta\") não têm evidência. Pegadinha de banca para confundir." },
        gemelar_anterior: { ok: true, txt: "<b>Verdadeiro.</b> Gestação gemelar prévia (especialmente dizigótica) aumenta risco de nova gemelar." }
      };
      const out = blk.querySelector(".trc-output");
      blk.querySelectorAll(".trc-card").forEach(b => {
        b.addEventListener("click", () => {
          blk.querySelectorAll(".trc-card").forEach(x => x.classList.remove("is-active"));
          b.classList.add("is-active");
          const r = explain[b.dataset.factor];
          if (!r) return;
          out.className = "trc-output " + (r.ok ? "trc-ok" : "trc-danger");
          out.innerHTML = r.txt;
        });
      });
    });
  }

  // 31 · TwinDeliveryRouteSimulator — corionicidade × via
  function initTwinDeliveryRouteSimulator(scope){
    scope.querySelectorAll('[data-component="TwinDeliveryRouteSimulator"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".tds-output");
      const state = { type: "dc_da", first: "cefalico", complications: false, count: "2" };
      const apply = () => {
        let week, route, txt, cls;
        // cesárea obrigatória
        if (state.count === "3"){
          week = "individualizado"; route = "cesárea (obrigatória)"; cls = "tds-danger";
          txt = "<b>≥3 fetos:</b> cesárea sempre. Programação individualizada (geralmente entre 34 e 36 sem).";
        } else if (state.type === "mc_ma"){
          week = "32–34 sem"; route = "cesárea (obrigatória)"; cls = "tds-danger";
          txt = "<b>Monoamniótica:</b> cesárea sempre — risco de enovelamento de cordão impede via vaginal. Internação no 3º trimestre.";
        } else if (state.type === "conjugados"){
          week = "individualizado"; route = "cesárea (obrigatória)"; cls = "tds-danger";
          txt = "<b>Gêmeos conjugados:</b> cesárea sempre. Avaliação multidisciplinar para definir momento e técnica.";
        } else if (state.first === "nao_cefalico"){
          week = "conforme corionicidade"; route = "cesárea (obrigatória)"; cls = "tds-danger";
          txt = "<b>Primeiro feto não cefálico:</b> cesárea — não se tenta via vaginal com 1º não cefálico em gemelar.";
        } else if (state.complications){
          week = "antecipado"; route = "cesárea (obrigatória)"; cls = "tds-danger";
          txt = "<b>Gemelar complicada</b> (TFF grave, CIUR seletivo grave, sofrimento fetal): cesárea após estabilização. Idade depende da gravidade.";
        } else {
          // sem indicação obrigatória — via vaginal possível
          if (state.type === "dc_da"){ week = "até 38 sem"; cls = "tds-ok"; }
          else if (state.type === "mc_da"){ week = "até 36 sem"; cls = "tds-warn"; }
          route = "via vaginal possível";
          txt = `<b>Sem indicação obrigatória de cesárea</b>. Via vaginal possível com primeiro feto cefálico, equipe preparada para parto gemelar e UTI neonatal disponível. Cesárea por critério obstétrico após o nascimento do 1º feto se houver intercorrência com o 2º.`;
        }
        out.className = "tds-output " + cls;
        out.innerHTML = `<span class="kicker">Momento: ${week} · Via: ${route}</span><p>${txt}</p>`;
        // sync UI
        blk.querySelectorAll("button[data-axis]").forEach(b => {
          if (b.dataset.axis === "complications"){
            b.classList.toggle("is-active", state.complications && b.dataset.val === "yes" || !state.complications && b.dataset.val === "no");
          } else {
            b.classList.toggle("is-active", state[b.dataset.axis] === b.dataset.val);
          }
        });
      };
      blk.querySelectorAll("button[data-axis]").forEach(b => {
        b.addEventListener("click", () => {
          if (b.dataset.axis === "complications"){ state.complications = b.dataset.val === "yes"; }
          else { state[b.dataset.axis] = b.dataset.val; }
          apply();
        });
      });
      apply();
    });
  }

  // 32 · TTTSSimulator — oligo × poli
  function initTTTSSimulator(scope){
    scope.querySelectorAll('[data-component="TTTSSimulator"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".ttts-output");
      const stage = blk.querySelector(".ttts-stage");
      const slDoador = blk.querySelector("input[data-axis='doador']");
      const slReceptor = blk.querySelector("input[data-axis='receptor']");
      const apply = () => {
        const d = parseInt(slDoador.value, 10);   // ILA doador (cm)
        const r = parseInt(slReceptor.value, 10); // ILA receptor (cm)
        // Critérios simplificados: oligodrâmnio <2cm (max bolsão) e polidrâmnio >8cm
        const oligo = d <= 2;
        const poli = r >= 8;
        if (stage){
          stage.querySelector(".ttts-d-label").textContent = d + " cm";
          stage.querySelector(".ttts-r-label").textContent = r + " cm";
          const dEl = stage.querySelector(".ttts-d-bolsa");
          const rEl = stage.querySelector(".ttts-r-bolsa");
          if (dEl) dEl.style.height = (d * 6) + "px";
          if (rEl) rEl.style.height = (r * 6) + "px";
        }
        let verdict, cls;
        if (!oligo && !poli){
          verdict = "<b>Sem TFF identificável.</b> Sem critério de oligo/polidrâmnio discordante. Manter USG/Doppler seriada (15/15 dias) em monocoriônica. Diferença de tamanho isolada NÃO fecha TFF.";
          cls = "ttts-ok";
        } else if (oligo && poli){
          verdict = "<b>TFF confirmada.</b> Doador com oligodrâmnio (≤2 cm) + receptor com polidrâmnio (≥8 cm) = <b>síndrome da transfusão feto-fetal</b>. Estadiamento de Quintero: avaliar bexiga (estágio II), Doppler (III), hidropsia do receptor (IV), óbito (V). <b>Conduta:</b> casos leves — amniocentese seriada; casos graves — fotocoagulação a laser das anastomoses.";
          cls = "ttts-danger";
        } else if (oligo){
          verdict = "<b>Oligodrâmnio isolado no doador.</b> Pode ser TFF inicial ou outra causa (CIUR, ruptura de membrana, malformação renal). Investigar e seguir.";
          cls = "ttts-warn";
        } else {
          verdict = "<b>Polidrâmnio isolado no receptor.</b> Pode ser fase precoce de TFF ou outra causa (DMG, malformações). Investigar.";
          cls = "ttts-warn";
        }
        out.className = "ttts-output " + cls;
        out.innerHTML = verdict;
      };
      [slDoador, slReceptor].forEach(s => s && s.addEventListener("input", apply));
      apply();
    });
  }

  window._GO_block4Inits = [
    initTwinClassificationMap,
    initEmbryoSplitTimeline,
    initChorionicityUltrasoundLab,
    initTwinRiskCardGame,
    initTwinDeliveryRouteSimulator,
    initTTTSSimulator
  ];

  /* =========================================================================
     COMPONENTES DO BLOCO 5 — REVISÃO FINAL (Sub-fase 2E.1)
     ========================================================================= */

  // 33 · GOProofSimulator — cockpit clínico (18 inputs → 9 outputs)
  function initGOProofSimulator(scope){
    scope.querySelectorAll('[data-component="GOProofSimulator"][data-implemented="1"]').forEach(blk => {
      const out = blk.querySelector(".gps-output");
      const reset = blk.querySelector(".gps-reset");

      // Estado inicial: tudo nulo (não respondido)
      const state = {
        // Geral
        ig: null,                // semana gestacional
        // Bloco 1 - Hipertensão
        pa: null,                // null | "normal" | "leve" (140-159/90-109) | "grave" (>=160/110)
        proteinuria: null,       // null | "yes" | "no"
        cerebral: null,          // null | "yes" | "no"
        plaq: null,              // null | "yes" | "no" (<100k)
        cr: null,                // null | "yes" | "no" (alta)
        tgo: null,               // null | "yes" | "no" (>=2x)
        eap: null,               // null | "yes" | "no"
        aas: null,               // null | "yes" | "no"
        // Bloco 2 - Hiperêmese
        vomitos: null,           // null | "yes" | "no"
        perda5: null,            // null | "yes" | "no"
        cetonuria: null,         // null | "yes" | "no"
        // Bloco 3 - Diabetes
        jejum: null,             // null | "<92" | "92-125" | ">=126"
        totg: null,              // null | "normal" | "dmg" | "previo"
        regra30: null,           // null | "yes" (>30% fora) | "no"
        insulina: null,          // null | "yes" | "no"
        macrossomia: null,       // null | "yes" | "no"
        // Bloco 4 - Gemelar
        gemelar: null,           // null | "unica" | "dc_da" | "mc_da" | "mc_ma" | "conjugados"
        primeiroFeto: null,      // null | "cefalico" | "nao_cefalico"
        tff: null                // null | "yes" | "no"
      };

      // Função decisora — produz lista de outputs por trilha
      function decide(){
        const results = [];
        const ig = state.ig ? parseInt(state.ig, 10) : null;

        // ===== TRILHA 1: HIPERTENSÃO =====
        if (state.pa && state.pa !== "normal"){
          const after20 = ig != null && ig >= 20;
          const before20 = ig != null && ig < 20;
          const lesionList = [];
          if (state.eap === "yes") lesionList.push("EAP");
          if (state.plaq === "yes") lesionList.push("plaq <100k");
          if (state.cr === "yes") lesionList.push("Cr alta");
          if (state.tgo === "yes") lesionList.push("TGO ≥2×");
          if (state.cerebral === "yes") lesionList.push("sintomas cerebrais/visuais");
          const hasLesion = lesionList.length > 0;
          const hasProt = state.proteinuria === "yes";
          const isSevere = state.pa === "grave" || hasLesion;

          let dx, exame, conduta, momento, via, peg, palavra, link;
          if (before20 && !hasProt && !hasLesion){
            dx = "Hipertensão crônica";
            exame = "Calciúria 24h, função renal, P/Cr (basal)";
            conduta = "Vigilância seriada · anti-hipertensivo de manutenção (metildopa, nifedipina LP) se necessário · profilaxia de PE sobreposta com AAS 100–150 mg (12–16 sem)";
            momento = "Termo (≥37 sem) salvo intercorrência";
            via = "Vaginal possível";
            peg = "PA antes de 20 sem com proteinúria não é PE — pode ser nefropatia/SAF/LES";
            palavra = "antes de 20 sem";
            link = "mapa-hipertensivo";
          } else if (after20 && hasProt && !isSevere && !hasLesion){
            dx = "Pré-eclâmpsia clássica (sem gravidade)";
            exame = "Plaquetas, transaminases, creatinina, proteinúria 24h, USG fetal";
            conduta = "Vigilância criteriosa · anti-hipertensivo se PA ≥140/90 mantido · acompanhamento próximo";
            momento = "≥37 sem (parto a termo)";
            via = "Vaginal possível · cesárea por critério obstétrico";
            peg = "Edema de membros não fecha PE — é fisiológico";
            palavra = "PA + proteinúria ≥20 sem";
            link = "preeclampsia-diagnostico";
          } else if (after20 && (hasLesion || isSevere)){
            const eclampsia = false; // não há input direto de convulsão
            const hellp = state.tgo === "yes" && state.plaq === "yes";
            dx = hellp ? "HELLP (subset de PE com gravidade)" : "Pré-eclâmpsia COM gravidade" + (hasLesion ? ` (${lesionList.join(", ")})` : "");
            exame = "Lab seriada (Hb, plaquetas, LDH, esquizócitos, AST/TGO, bilirrubina, Cr, EAS, P/Cr) + USG fetal/Doppler";
            conduta = "Internar · sulfato de magnésio (Pritchard ou Zuspan) · anti-hipertensivo IV se PA ≥160/110 (hidralazina IV ou nifedipina rápida) · corticoide se <34 sem";
            momento = ig != null && ig < 34 ? "Conduta conservadora <34 sem se mãe/feto estáveis · parto se piorar"
                  : ig != null && ig >= 34 ? "Estabilizar e parto"
                  : "Conforme idade gestacional";
            via = "Vaginal possível após estabilização · cesárea por critério obstétrico";
            peg = "Cesárea NÃO é automática · estabilizar antes da via";
            palavra = "PA + lesão sistêmica (mesmo sem proteinúria)";
            link = hellp ? "hellp-diferenciais" : "criterios-gravidade";
          } else if (after20 && !hasProt && !hasLesion){
            dx = "Hipertensão gestacional";
            exame = "Proteinúria 24h, P/Cr, plaquetas, função hepática, função renal seriadas";
            conduta = "Vigilância · proteinúria a cada consulta · anti-hipertensivo se PA mantida ≥140/90 · reclassificar até 12 sem PP";
            momento = "≥37 sem";
            via = "Vaginal possível";
            peg = "20–50% evoluem para PE — vigilância seriada";
            palavra = "PA ≥140/90 ≥20 sem sem proteinúria/lesão";
            link = "cronica-vs-gestacional";
          }
          if (dx) results.push({ trilha: "Hipertensão & PE", color: "rose", dx, exame, conduta, momento, via, peg, palavra, link });
        }

        // ===== TRILHA 2: HIPERÊMESE =====
        if (state.vomitos === "yes"){
          const score = (state.perda5 === "yes" ? 1 : 0) + (state.cetonuria === "yes" ? 1 : 0);
          let dx, exame, conduta, momento, via, peg, palavra, link;
          if (score >= 1){
            dx = "Hiperêmese gravídica";
            exame = "Eletrólitos, EAS (cetonúria), TSH+T4 livre, USG (descartar mola/gemelar), amilase/lipase se dor em barra";
            conduta = "Internar · hidratação IV (SF/Ringer + reposição de K+) · TIAMINA antes/junto da glicose · antieméticos por linha (B6/anti-histamínico → metoclopramida → clorpromazina → ondansetrona) · reintroduzir VO";
            momento = "Não muda o momento do parto · doença do 1º trimestre";
            via = "Não aplicável neste contexto";
            peg = "Tiamina antes da glicose · risco de Wernicke se não";
            palavra = "perda ≥5% + intolerância VO + cetonúria";
            link = "hiperemese-conduta";
          } else {
            dx = "Náusea/vômito do 1º trimestre (fisiológico)";
            exame = "Não obrigatórios · USG de rotina";
            conduta = "Orientação dietética · piridoxina (B6) ± anti-histamínico em casa";
            momento = "Não muda";
            via = "Não aplicável";
            peg = "Hiperêmese exige perda ≥5% + intolerância VO";
            palavra = "vômitos sem critério objetivo";
            link = "hiperemese-vs-nausea";
          }
          results.push({ trilha: "Hiperêmese", color: "teal", dx, exame, conduta, momento, via, peg, palavra, link });
        }

        // ===== TRILHA 3: DIABETES =====
        const dmTrigger = state.jejum || state.totg || state.regra30 || state.insulina || state.macrossomia;
        if (dmTrigger){
          let dx, exame, conduta, momento, via, peg, palavra, link;
          if (state.jejum === ">=126" || state.totg === "previo"){
            dx = "Diabetes prévio (não diagnosticado anteriormente)";
            exame = "HbA1c · fundo de olho · função renal · ECG";
            conduta = "Encaminhar ao alto risco · iniciar/ajustar insulina · alvos jejum <95 / 1h <140 / 2h <120";
          } else if (state.jejum === "92-125" || state.totg === "dmg"){
            const onMed = state.insulina === "yes" || state.regra30 === "yes";
            dx = "Diabetes mellitus gestacional (DMG)" + (onMed ? " com necessidade de medicação" : "");
            exame = "Perfil glicêmico (jejum, 1h ou 2h pós-refeições principais) · USG seriada · HbA1c se diabetes prévio dúbio";
            conduta = onMed
              ? "Encaminhar ao alto risco · insulina como pilar (NPH 2×/dia ± regular) · metformina em situações específicas"
              : "Dieta fracionada (6 refeições · 50/30/20) + atividade física · perfil 1–2 sem · manter UBS se controlado";
          } else if (state.jejum === "<92" && !state.totg){
            dx = "Glicemia de jejum normal antes de 20 sem";
            exame = "Solicitar TOTG 75 g entre 24 e 28 sem";
            conduta = "Manter pré-natal e ajustar conforme TOTG";
          } else if (state.totg === "normal"){
            dx = "TOTG normal — sem DMG";
            exame = "Pré-natal padrão";
            conduta = "Vigilância de fatores de risco · seguir protocolo";
          } else {
            dx = "Avaliação diabética inconclusiva — completar exames";
            exame = "Glicemia de jejum venosa e/ou TOTG 75 g 24–28 sem";
            conduta = "Aguardar exames antes de classificar";
          }

          // momento e via
          if (state.jejum === ">=126" || state.totg === "previo"){
            momento = "39 sem (bom controle) · 37–38 sem (mau controle)";
          } else if (state.jejum === "92-125" || state.totg === "dmg"){
            const onMed = state.insulina === "yes" || state.regra30 === "yes";
            const macro = state.macrossomia === "yes";
            if (macro) momento = "37–38 sem (mau controle/macrossomia)";
            else if (onMed) momento = "Até 39 sem (DMG com medicação · bom controle)";
            else momento = "Até 40 sem (DMG sem medicação · bom controle)";
          } else {
            momento = "Conforme protocolo geral";
          }
          via = state.macrossomia === "yes" ? "Considerar cesárea se macrossomia >4.500 g (ou >4.000 g em diabéticas)" : "Vaginal possível · cesárea por critério obstétrico";
          peg = state.macrossomia === "yes"
            ? "Distócia de ombros — primeira CONDUTA é chamar ajuda · primeira MANOBRA é McRoberts"
            : "Diagnóstico é 92; acompanhamento é 95";
          palavra = state.macrossomia === "yes" ? "macrossomia denuncia mau controle" : "regra dos 30%";
          link = state.macrossomia === "yes" ? "distocia-ombros" : "diabetes-diagnostico";
          results.push({ trilha: "Diabetes", color: "emerald", dx, exame, conduta, momento, via, peg, palavra, link });
        }

        // ===== TRILHA 4: GEMELAR =====
        if (state.gemelar && state.gemelar !== "unica"){
          let dx, exame, conduta, momento, via, peg, palavra, link;
          const t = state.gemelar;
          if (state.tff === "yes" && (t === "mc_da" || t === "mc_ma")){
            dx = "Gemelar monocoriônica COM transfusão feto-fetal (TFF)";
            exame = "USG/Doppler seriada · medida de bolsões · estadiamento de Quintero · ecocardio fetal";
            conduta = "Casos leves (Quintero I): amniocentese seriada · Casos graves (Quintero II–IV): fotocoagulação a laser das anastomoses";
            momento = t === "mc_ma" ? "32–34 sem (cesárea)" : "Antecipar conforme estabilidade · até 36 sem";
            via = "Cesárea (gemelar complicada e/ou monoamniótica)";
            peg = "TFF é exclusiva da monocoriônica · critério é oligo+poli discordantes (não diferença de tamanho)";
            palavra = "uma placenta + um oligo + um poli";
            link = "gemelar-tttf";
          } else if (t === "dc_da"){
            dx = "Gemelar dicoriônica diamniótica";
            exame = "USG seriada · monitorização fetal";
            conduta = "Pré-natal de risco · USG mensal";
            momento = "Até 38 sem";
            via = state.primeiroFeto === "cefalico" ? "Vaginal possível" : "Cesárea (1º não cefálico)";
            peg = "Dois sacos não provam dois zigotos · DC pode ser monozigótica com divisão precoce";
            palavra = "DC sempre DA · até 38 sem";
            link = "gemelar-classificacao";
          } else if (t === "mc_da"){
            dx = "Gemelar monocoriônica diamniótica";
            exame = "USG/Doppler 15/15 dias (TFF) · medida de bolsões · ecocardio fetal";
            conduta = "Pré-natal de alto risco · vigilância de TFF e CIUR seletivo";
            momento = "Até 36 sem";
            via = state.primeiroFeto === "cefalico" ? "Vaginal possível" : "Cesárea (1º não cefálico)";
            peg = "MC/DA tem risco de TFF · sinal do T no USG";
            palavra = "uma placenta · risco de TFF";
            link = "gemelar-ultrassom";
          } else if (t === "mc_ma"){
            dx = "Gemelar monocoriônica monoamniótica";
            exame = "USG/Doppler frequente · cardiotocografia · ecocardio fetal";
            conduta = "Pré-natal de altíssimo risco · internação no 3º trimestre · monitorização contínua";
            momento = "32–34 sem";
            via = "Cesárea SEMPRE (risco de enovelamento de cordão)";
            peg = "MC/MA é cesárea obrigatória · enovelamento de cordão é a sombra";
            palavra = "uma cavidade · cesárea sempre";
            link = "gemelar-parto";
          } else if (t === "conjugados"){
            dx = "Gêmeos conjugados";
            exame = "USG detalhada · RM fetal · avaliação multidisciplinar";
            conduta = "Pré-natal de alta complexidade · planejamento cirúrgico individualizado";
            momento = "Individualizado";
            via = "Cesárea sempre";
            peg = "Conjugados surgem após 12 dias de divisão";
            palavra = "divisão tardia";
            link = "gemelar-divisao";
          }
          if (dx) results.push({ trilha: "Gemelaridade", color: "purple", dx, exame, conduta, momento, via, peg, palavra, link });
        }

        return results;
      }

      function render(){
        const r = decide();
        if (r.length === 0){
          out.className = "gps-output";
          out.innerHTML = `
            <div class="gps-empty">
              <strong>Preencha pelo menos uma trilha</strong> para receber diagnóstico, gravidade, exame-chave, conduta, momento e via de parto, pegadinha, palavra-chave e link de revisão.
              <p class="muted">Trilhas disponíveis: <b>Hipertensão & PE</b> · <b>Hiperêmese</b> · <b>Diabetes</b> · <b>Gemelaridade</b>.</p>
            </div>`;
          return;
        }
        out.className = "gps-output gps-active";
        out.innerHTML = r.map(x => `
          <div class="gps-card gps-${x.color}">
            <div class="gps-card-head">
              <span class="kicker">${x.trilha}</span>
              <h4>${x.dx}</h4>
            </div>
            <div class="gps-rows">
              <div><strong>Exame-chave:</strong> ${x.exame}</div>
              <div><strong>Conduta inicial:</strong> ${x.conduta}</div>
              <div><strong>Momento do parto:</strong> ${x.momento}</div>
              <div><strong>Via de parto:</strong> ${x.via}</div>
              <div class="gps-peg"><strong>Pegadinha:</strong> ${x.peg}</div>
              <div class="gps-key"><strong>Palavra-chave:</strong> ${x.palavra}</div>
              <div><a class="btn ghost" href="#${x.link}">Ir para a página de revisão →</a></div>
            </div>
          </div>
        `).join("");
      }

      // wiring inputs
      blk.querySelectorAll("[data-input]").forEach(el => {
        if (el.tagName === "SELECT" || el.tagName === "INPUT"){
          el.addEventListener("change", () => {
            state[el.dataset.input] = el.value === "" ? null : el.value;
            render();
          });
        } else if (el.classList.contains("gps-toggle")){
          el.addEventListener("click", () => {
            const k = el.dataset.input;
            const v = el.dataset.val;
            state[k] = state[k] === v ? null : v;
            // sync sibling buttons
            blk.querySelectorAll(`.gps-toggle[data-input="${k}"]`).forEach(b => b.classList.toggle("is-active", state[k] === b.dataset.val));
            render();
          });
        }
      });

      if (reset) reset.addEventListener("click", () => {
        Object.keys(state).forEach(k => state[k] = null);
        blk.querySelectorAll(".gps-toggle").forEach(b => b.classList.remove("is-active"));
        blk.querySelectorAll("input, select").forEach(el => { if (el.dataset.input) el.value = ""; });
        render();
      });

      render();
    });
  }

  // 33b · QuickRevisionFlashcards — flashcards de revisão integrada
  function initQuickRevisionFlashcards(scope){
    scope.querySelectorAll('[data-component="QuickRevisionFlashcards"][data-implemented="1"]').forEach(blk => {
      const cards = blk.querySelectorAll(".qrf-card");
      cards.forEach(c => {
        c.addEventListener("click", () => c.classList.toggle("is-flipped"));
      });
      // navegação por trilha (filtro)
      blk.querySelectorAll(".qrf-filter").forEach(f => {
        f.addEventListener("click", () => {
          const key = f.dataset.filter;
          blk.querySelectorAll(".qrf-filter").forEach(x => x.classList.toggle("is-active", x === f));
          cards.forEach(c => {
            const show = key === "all" || c.dataset.trail === key;
            c.style.display = show ? "" : "none";
          });
        });
      });
    });
  }

  window._GO_block5Inits = [
    initGOProofSimulator,
    initQuickRevisionFlashcards
  ];

  // Expor componentes do Bloco 1 para chamada centralizada em initComponents
  window._GO_block1Inits = [
    initHypertensionDiagnosisTree,
    initPreeclampsiaVsChronicComparator,
    initSystemicInjuryChecklist,
    initProteinuriaLab,
    initPreeclampsiaScreeningBuilder,
    initPreventionControversyPanel,
    initSeverityTriageBoard,
    initHELLPDifferentialPanel,
    initAntihypertensiveCrisisSimulator,
    initMagnesiumProtocolLab,
    initMagnesiumToxicitySimulator,
    initDeliveryTimingPreeclampsiaStepper,
    initPuerperiumReclassificationTimeline
  ];

})();
