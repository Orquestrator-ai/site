/* =========================================
   INTENSIVÃO PREVENTIVA — BIBLIOTECA DE SVGs
   SVGs delicados, médicos, com cores funcionais.
   Cada função retorna uma string SVG pronta para
   ser embutida nas páginas.
   ========================================= */

window.PrevSVG = {};

/* ─────────────────────────────────────────
   Padrão-ouro × Teste alternativo (M1-01)
───────────────────────────────────────── */
PrevSVG.padraoOuroVsTeste = function() {
  return `
  <svg viewBox="0 0 600 280" role="img" aria-label="Padrão-ouro caro versus teste alternativo barato">
    <defs>
      <linearGradient id="gold-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#fbbf24"/><stop offset="100%" stop-color="#f59e0b"/>
      </linearGradient>
    </defs>
    <!-- Coluna padrão-ouro -->
    <g transform="translate(40 40)">
      <rect x="0" y="0" width="240" height="200" rx="16" fill="var(--c-amber-soft)" stroke="var(--c-amber)" stroke-width="1.5"/>
      <text x="120" y="28" font-size="14" font-weight="800" fill="var(--c-amber)" text-anchor="middle">PADRÃO-OURO</text>
      <text x="120" y="50" font-size="11" fill="currentColor" text-anchor="middle" opacity=".75">Colonoscopia</text>
      <!-- icone endoscopio -->
      <g transform="translate(60 70)">
        <circle cx="60" cy="40" r="32" fill="url(#gold-grad)" opacity=".9"/>
        <path d="M 60 8 q -20 0 -20 20 q 0 25 20 32 q 20 -7 20 -32 q 0 -20 -20 -20 z" fill="none" stroke="#fff" stroke-width="2"/>
        <circle cx="60" cy="35" r="6" fill="#fff"/>
      </g>
      <text x="120" y="178" font-size="20" font-weight="800" fill="var(--c-amber)" text-anchor="middle">R$ 600+</text>
      <text x="120" y="194" font-size="10" fill="currentColor" text-anchor="middle" opacity=".7">preparo · sedação · agenda</text>
    </g>

    <!-- Vs -->
    <text x="300" y="148" font-size="22" font-weight="800" fill="currentColor" opacity=".4" text-anchor="middle">vs</text>

    <!-- Coluna teste alternativo -->
    <g transform="translate(320 40)">
      <rect x="0" y="0" width="240" height="200" rx="16" fill="var(--c-teal-soft)" stroke="var(--c-teal)" stroke-width="1.5"/>
      <text x="120" y="28" font-size="14" font-weight="800" fill="var(--c-teal)" text-anchor="middle">TESTE ALTERNATIVO</text>
      <text x="120" y="50" font-size="11" fill="currentColor" text-anchor="middle" opacity=".75">Sangue oculto nas fezes</text>
      <!-- tubo de coleta -->
      <g transform="translate(85 70)">
        <rect x="0" y="0" width="20" height="60" rx="4" fill="var(--c-teal)" opacity=".15" stroke="var(--c-teal)" stroke-width="1.5"/>
        <rect x="0" y="20" width="20" height="40" rx="0" fill="var(--c-teal)" opacity=".4"/>
        <rect x="-4" y="-6" width="28" height="10" rx="3" fill="var(--c-teal)"/>
      </g>
      <g transform="translate(160 80)">
        <circle cx="0" cy="20" r="22" fill="#fff" stroke="var(--c-teal)" stroke-width="2"/>
        <text x="0" y="26" font-size="20" text-anchor="middle" fill="var(--c-teal)" font-weight="800">$</text>
      </g>
      <text x="120" y="178" font-size="20" font-weight="800" fill="var(--c-teal)" text-anchor="middle">R$ 5–15</text>
      <text x="120" y="194" font-size="10" fill="currentColor" text-anchor="middle" opacity=".7">simples · escalável · sem preparo</text>
    </g>
  </svg>`;
};

/* ─────────────────────────────────────────
   Pilares da Medicina Baseada em Evidências (M1-02)
───────────────────────────────────────── */
PrevSVG.tripeMBE = function() {
  return `
  <svg viewBox="0 0 600 320" role="img" aria-label="Tripé da medicina baseada em evidências">
    <!-- Triângulo central -->
    <g transform="translate(300 170)">
      <circle r="80" fill="var(--c-violet-soft)" stroke="var(--c-violet)" stroke-width="2" opacity=".5"/>
      <text y="-8" font-size="13" font-weight="800" fill="var(--c-violet)" text-anchor="middle">MBE</text>
      <text y="12" font-size="11" fill="currentColor" text-anchor="middle" opacity=".75">Decisão clínica</text>
    </g>

    <!-- Pilar 1 -->
    <g transform="translate(120 90)">
      <circle r="55" fill="var(--c-blue-soft)" stroke="var(--c-blue)" stroke-width="2"/>
      <text font-size="22" text-anchor="middle" dy="-6">📚</text>
      <text font-size="11" font-weight="800" fill="var(--c-blue)" text-anchor="middle" dy="14">EVIDÊNCIA</text>
      <text font-size="10" fill="currentColor" text-anchor="middle" dy="28" opacity=".75">melhor disponível</text>
    </g>

    <!-- Pilar 2 -->
    <g transform="translate(480 90)">
      <circle r="55" fill="var(--c-green-soft)" stroke="var(--c-green)" stroke-width="2"/>
      <text font-size="22" text-anchor="middle" dy="-6">👨‍⚕️</text>
      <text font-size="11" font-weight="800" fill="var(--c-green)" text-anchor="middle" dy="14">EXPERIÊNCIA</text>
      <text font-size="10" fill="currentColor" text-anchor="middle" dy="28" opacity=".75">do médico</text>
    </g>

    <!-- Pilar 3 -->
    <g transform="translate(300 280)">
      <circle r="55" fill="var(--c-teal-soft)" stroke="var(--c-teal)" stroke-width="2"/>
      <text font-size="22" text-anchor="middle" dy="-6">🤝</text>
      <text font-size="11" font-weight="800" fill="var(--c-teal)" text-anchor="middle" dy="14">PACIENTE</text>
      <text font-size="10" fill="currentColor" text-anchor="middle" dy="28" opacity=".75">decisão compartilhada</text>
    </g>

    <!-- Linhas conectoras -->
    <line x1="172" y1="115" x2="247" y2="155" stroke="var(--c-violet)" stroke-width="1.5" opacity=".4" stroke-dasharray="3 3"/>
    <line x1="428" y1="115" x2="353" y2="155" stroke="var(--c-violet)" stroke-width="1.5" opacity=".4" stroke-dasharray="3 3"/>
    <line x1="300" y1="225" x2="300" y2="225" stroke="var(--c-violet)" stroke-width="1.5" opacity=".4" stroke-dasharray="3 3"/>
  </svg>`;
};

/* ─────────────────────────────────────────
   Tabela 2x2 estática conceitual (M1-04)
───────────────────────────────────────── */
PrevSVG.tabela2x2Concept = function() {
  return `
  <svg viewBox="0 0 520 360" role="img" aria-label="Tabela 2x2 conceitual: VP FP FN VN">
    <!-- header -->
    <text x="260" y="22" font-size="12" font-weight="800" fill="var(--c-blue)" text-anchor="middle">PADRÃO-OURO</text>
    <text x="170" y="48" font-size="11" font-weight="700" fill="var(--c-blue)" text-anchor="middle">DOENTE</text>
    <text x="350" y="48" font-size="11" font-weight="700" fill="var(--c-blue)" text-anchor="middle">SADIO</text>

    <text transform="translate(28 200) rotate(-90)" font-size="12" font-weight="800" fill="var(--c-blue)" text-anchor="middle">TESTE</text>
    <text x="68" y="125" font-size="11" font-weight="700" fill="var(--c-blue)" text-anchor="middle">+</text>
    <text x="68" y="245" font-size="11" font-weight="700" fill="var(--c-blue)" text-anchor="middle">−</text>

    <!-- VP -->
    <rect x="100" y="65" width="140" height="120" rx="14" fill="var(--c-green-soft)" stroke="var(--c-green)" stroke-width="2"/>
    <text x="170" y="105" font-size="13" font-weight="800" fill="var(--c-green)" text-anchor="middle">VP</text>
    <text x="170" y="128" font-size="10" fill="var(--c-green)" text-anchor="middle">Verdadeiro Positivo</text>
    <text x="170" y="156" font-size="11" fill="currentColor" text-anchor="middle" opacity=".75">doente que testou +</text>
    <text x="170" y="172" font-size="13" font-weight="800" fill="var(--c-green)" text-anchor="middle">✓ acerto</text>

    <!-- FP -->
    <rect x="280" y="65" width="140" height="120" rx="14" fill="var(--c-red-soft)" stroke="var(--c-red)" stroke-width="2"/>
    <text x="350" y="105" font-size="13" font-weight="800" fill="var(--c-red)" text-anchor="middle">FP</text>
    <text x="350" y="128" font-size="10" fill="var(--c-red)" text-anchor="middle">Falso Positivo</text>
    <text x="350" y="156" font-size="11" fill="currentColor" text-anchor="middle" opacity=".75">sadio que testou +</text>
    <text x="350" y="172" font-size="13" font-weight="800" fill="var(--c-red)" text-anchor="middle">✗ erro</text>

    <!-- FN -->
    <rect x="100" y="200" width="140" height="120" rx="14" fill="var(--c-red-soft)" stroke="var(--c-red)" stroke-width="2"/>
    <text x="170" y="240" font-size="13" font-weight="800" fill="var(--c-red)" text-anchor="middle">FN</text>
    <text x="170" y="263" font-size="10" fill="var(--c-red)" text-anchor="middle">Falso Negativo</text>
    <text x="170" y="291" font-size="11" fill="currentColor" text-anchor="middle" opacity=".75">doente que testou −</text>
    <text x="170" y="307" font-size="13" font-weight="800" fill="var(--c-red)" text-anchor="middle">✗ erro</text>

    <!-- VN -->
    <rect x="280" y="200" width="140" height="120" rx="14" fill="var(--c-green-soft)" stroke="var(--c-green)" stroke-width="2"/>
    <text x="350" y="240" font-size="13" font-weight="800" fill="var(--c-green)" text-anchor="middle">VN</text>
    <text x="350" y="263" font-size="10" fill="var(--c-green)" text-anchor="middle">Verdadeiro Negativo</text>
    <text x="350" y="291" font-size="11" fill="currentColor" text-anchor="middle" opacity=".75">sadio que testou −</text>
    <text x="350" y="307" font-size="13" font-weight="800" fill="var(--c-green)" text-anchor="middle">✓ acerto</text>
  </svg>`;
};

/* ─────────────────────────────────────────
   "Teste sensível exclui (SnNout) / Específico confirma (SpPin)" (M1-07/09)
───────────────────────────────────────── */
PrevSVG.snnoutSpinDual = function() {
  return `
  <svg viewBox="0 0 600 300" role="img" aria-label="SnNout e SpPin: lógica de exclusão e confirmação">
    <g transform="translate(20 30)">
      <rect width="260" height="240" rx="20" fill="var(--c-green-soft)" stroke="var(--c-green)" stroke-width="2"/>
      <text x="130" y="34" font-size="13" font-weight="800" fill="var(--c-green)" text-anchor="middle">SnNOUT</text>
      <text x="130" y="54" font-size="11" fill="currentColor" text-anchor="middle" opacity=".7">Sensível Negativo Exclui</text>
      <g transform="translate(60 80)">
        <rect x="0" y="0" width="40" height="40" rx="10" fill="var(--c-green)"/>
        <text x="20" y="26" font-size="22" text-anchor="middle" font-weight="800" fill="#fff">↓</text>
      </g>
      <text x="170" y="106" font-size="13" font-weight="700" fill="currentColor" text-anchor="middle">teste − descarta a doença</text>
      <text x="130" y="160" font-size="11" font-weight="700" fill="var(--c-green)" text-anchor="middle">"Se eu confio no negativo,"</text>
      <text x="130" y="178" font-size="11" font-weight="700" fill="var(--c-green)" text-anchor="middle">"é porque o teste é sensível."</text>
      <text x="130" y="220" font-size="11" fill="currentColor" text-anchor="middle" opacity=".75">Triagem · exclusão · rastreio</text>
    </g>
    <g transform="translate(320 30)">
      <rect width="260" height="240" rx="20" fill="var(--c-violet-soft)" stroke="var(--c-violet)" stroke-width="2"/>
      <text x="130" y="34" font-size="13" font-weight="800" fill="var(--c-violet)" text-anchor="middle">SpPIN</text>
      <text x="130" y="54" font-size="11" fill="currentColor" text-anchor="middle" opacity=".7">Específico Positivo Confirma (Rules IN)</text>
      <g transform="translate(60 80)">
        <rect x="0" y="0" width="40" height="40" rx="10" fill="var(--c-violet)"/>
        <text x="20" y="26" font-size="22" text-anchor="middle" font-weight="800" fill="#fff">↑</text>
      </g>
      <text x="170" y="106" font-size="13" font-weight="700" fill="currentColor" text-anchor="middle">teste + confirma a doença</text>
      <text x="130" y="160" font-size="11" font-weight="700" fill="var(--c-violet)" text-anchor="middle">"Se eu confio no positivo,"</text>
      <text x="130" y="178" font-size="11" font-weight="700" fill="var(--c-violet)" text-anchor="middle">"é porque o teste é específico."</text>
      <text x="130" y="220" font-size="11" fill="currentColor" text-anchor="middle" opacity=".75">Confirmação · decisão terapêutica</text>
    </g>
  </svg>`;
};

/* ─────────────────────────────────────────
   Testes em paralelo vs série (M1-08/10)
───────────────────────────────────────── */
PrevSVG.paraleloSerie = function() {
  return `
  <svg viewBox="0 0 600 320" role="img" aria-label="Testes em paralelo versus testes em série">
    <!-- Paralelo -->
    <g transform="translate(20 30)">
      <text x="130" y="-2" font-size="13" font-weight="800" fill="var(--c-blue)" text-anchor="middle">EM PARALELO — maximiza Sens</text>
      <circle cx="20" cy="60" r="14" fill="var(--c-blue)"/>
      <text x="20" y="65" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">P</text>
      <line x1="34" y1="60" x2="80" y2="32" stroke="var(--c-blue)" stroke-width="2"/>
      <line x1="34" y1="60" x2="80" y2="88" stroke="var(--c-blue)" stroke-width="2"/>
      <rect x="80" y="20" width="80" height="28" rx="6" fill="var(--c-blue-soft)" stroke="var(--c-blue)"/>
      <text x="120" y="38" font-size="11" font-weight="700" fill="var(--c-blue)" text-anchor="middle">Teste A</text>
      <rect x="80" y="76" width="80" height="28" rx="6" fill="var(--c-blue-soft)" stroke="var(--c-blue)"/>
      <text x="120" y="94" font-size="11" font-weight="700" fill="var(--c-blue)" text-anchor="middle">Teste B</text>
      <line x1="160" y1="34" x2="200" y2="60" stroke="var(--c-blue)" stroke-width="2"/>
      <line x1="160" y1="90" x2="200" y2="60" stroke="var(--c-blue)" stroke-width="2"/>
      <text x="220" y="64" font-size="12" font-weight="800" fill="var(--c-blue)">⊕</text>
      <text x="200" y="130" font-size="10" font-weight="700" fill="currentColor" text-anchor="middle">se QUALQUER der +,</text>
      <text x="200" y="146" font-size="10" font-weight="700" fill="currentColor" text-anchor="middle">considera positivo</text>
      <text x="130" y="200" font-size="11" fill="currentColor" text-anchor="middle" opacity=".7">⬆ sensibilidade · ⬇ especificidade</text>
      <text x="130" y="220" font-size="11" fill="var(--c-blue)" text-anchor="middle" font-weight="700">para EXCLUIR doença grave</text>
      <text x="130" y="248" font-size="10" fill="currentColor" text-anchor="middle" opacity=".7">Ex.: emergência, suspeita de SCA</text>
    </g>

    <!-- Série -->
    <g transform="translate(320 30)">
      <text x="130" y="-2" font-size="13" font-weight="800" fill="var(--c-violet)" text-anchor="middle">EM SÉRIE — maximiza Esp</text>
      <circle cx="20" cy="60" r="14" fill="var(--c-violet)"/>
      <text x="20" y="65" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">P</text>
      <line x1="34" y1="60" x2="60" y2="60" stroke="var(--c-violet)" stroke-width="2"/>
      <rect x="60" y="46" width="70" height="28" rx="6" fill="var(--c-violet-soft)" stroke="var(--c-violet)"/>
      <text x="95" y="64" font-size="11" font-weight="700" fill="var(--c-violet)" text-anchor="middle">Teste A</text>
      <line x1="130" y1="60" x2="160" y2="60" stroke="var(--c-violet)" stroke-width="2"/>
      <text x="145" y="55" font-size="10" fill="var(--c-violet)" text-anchor="middle" font-weight="800">se +</text>
      <rect x="160" y="46" width="70" height="28" rx="6" fill="var(--c-violet-soft)" stroke="var(--c-violet)"/>
      <text x="195" y="64" font-size="11" font-weight="700" fill="var(--c-violet)" text-anchor="middle">Teste B</text>
      <line x1="230" y1="60" x2="252" y2="60" stroke="var(--c-violet)" stroke-width="2"/>
      <text x="245" y="64" font-size="12" font-weight="800" fill="var(--c-violet)">⊕</text>
      <text x="130" y="130" font-size="10" font-weight="700" fill="currentColor" text-anchor="middle">só se AMBOS derem +,</text>
      <text x="130" y="146" font-size="10" font-weight="700" fill="currentColor" text-anchor="middle">considera positivo</text>
      <text x="130" y="200" font-size="11" fill="currentColor" text-anchor="middle" opacity=".7">⬆ especificidade · ⬇ sensibilidade</text>
      <text x="130" y="220" font-size="11" fill="var(--c-violet)" text-anchor="middle" font-weight="700">para CONFIRMAR antes de tratar</text>
      <text x="130" y="248" font-size="10" fill="currentColor" text-anchor="middle" opacity=".7">Ex.: HIV (ELISA→Western), Câncer (rastreio→biópsia)</text>
    </g>
  </svg>`;
};

/* ─────────────────────────────────────────
   Diagrama Bayesiano: pré → RV → pós
───────────────────────────────────────── */
PrevSVG.bayesFluxo = function() {
  return `
  <svg viewBox="0 0 640 240" role="img" aria-label="Fluxo Bayesiano: probabilidade pré-teste vezes RV produz probabilidade pós-teste">
    <g transform="translate(30 70)">
      <rect width="160" height="100" rx="14" fill="var(--c-teal-soft)" stroke="var(--c-teal)" stroke-width="2"/>
      <text x="80" y="34" font-size="11" font-weight="800" fill="var(--c-teal)" text-anchor="middle">PROB. PRÉ-TESTE</text>
      <text x="80" y="64" font-size="22" font-weight="800" fill="var(--c-teal)" text-anchor="middle">P(D)</text>
      <text x="80" y="86" font-size="10" fill="currentColor" text-anchor="middle" opacity=".7">prevalência local · clínica</text>
    </g>

    <text x="222" y="125" font-size="24" font-weight="800" fill="currentColor" opacity=".4">×</text>

    <g transform="translate(250 70)">
      <rect width="160" height="100" rx="14" fill="var(--c-violet-soft)" stroke="var(--c-violet)" stroke-width="2"/>
      <text x="80" y="34" font-size="11" font-weight="800" fill="var(--c-violet)" text-anchor="middle">RAZÃO DE</text>
      <text x="80" y="50" font-size="11" font-weight="800" fill="var(--c-violet)" text-anchor="middle">VEROSSIMILHANÇA</text>
      <text x="80" y="78" font-size="20" font-weight="800" fill="var(--c-violet)" text-anchor="middle">RV+ ou RV−</text>
    </g>

    <text x="442" y="125" font-size="24" font-weight="800" fill="currentColor" opacity=".4">→</text>

    <g transform="translate(470 70)">
      <rect width="150" height="100" rx="14" fill="var(--c-green-soft)" stroke="var(--c-green)" stroke-width="2"/>
      <text x="75" y="34" font-size="11" font-weight="800" fill="var(--c-green)" text-anchor="middle">PROB. PÓS-TESTE</text>
      <text x="75" y="64" font-size="22" font-weight="800" fill="var(--c-green)" text-anchor="middle">P(D | teste)</text>
      <text x="75" y="86" font-size="10" fill="currentColor" text-anchor="middle" opacity=".7">decisão clínica</text>
    </g>

    <!-- legenda -->
    <text x="320" y="210" font-size="11" fill="currentColor" opacity=".7" text-anchor="middle">odds pós = odds pré × RV  ·  prob = odds / (1+odds)</text>
  </svg>`;
};

/* ─────────────────────────────────────────
   Curva ROC didática (M3-01/02)
───────────────────────────────────────── */
PrevSVG.rocDidatica = function() {
  return `
  <svg viewBox="0 0 480 320" role="img" aria-label="Curva ROC didática">
    <defs>
      <marker id="arrow-roc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--c-orange)"/>
      </marker>
    </defs>
    <!-- caixa -->
    <rect x="60" y="40" width="360" height="240" fill="none" stroke="currentColor" stroke-width="1" opacity=".4"/>
    <!-- diagonal -->
    <line x1="60" y1="280" x2="420" y2="40" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4" opacity=".35"/>
    <text x="220" y="170" font-size="10" fill="currentColor" opacity=".55" transform="rotate(-30 220 170)">teste sem valor (acaso)</text>
    <!-- curva -->
    <path d="M 60 280 Q 80 80 180 60 T 420 40" fill="none" stroke="var(--c-violet)" stroke-width="3"/>
    <!-- ponto melhor -->
    <circle cx="110" cy="80" r="7" fill="var(--c-green)" stroke="#fff" stroke-width="2"/>
    <text x="125" y="76" font-size="11" font-weight="800" fill="var(--c-green)">melhor corte</text>
    <text x="125" y="92" font-size="10" fill="currentColor" opacity=".7">superior-esquerdo</text>
    <line x1="120" y1="78" x2="142" y2="76" stroke="var(--c-green)" stroke-width="1"/>

    <!-- pontos extremos -->
    <circle cx="60" cy="280" r="5" fill="var(--c-orange)"/>
    <text x="50" y="296" font-size="9" fill="var(--c-orange)" text-anchor="end">corte alto: poucos +</text>
    <circle cx="420" cy="40" r="5" fill="var(--c-orange)"/>
    <text x="430" y="34" font-size="9" fill="var(--c-orange)">corte baixo: tudo +</text>

    <!-- eixos -->
    <text x="240" y="306" font-size="11" fill="currentColor" text-anchor="middle" opacity=".75">1 − Especificidade (FPR)</text>
    <text transform="translate(28 160) rotate(-90)" font-size="11" fill="currentColor" text-anchor="middle" opacity=".75">Sensibilidade (TPR)</text>

    <!-- AUC label -->
    <text x="260" y="200" font-size="20" font-weight="800" fill="var(--c-violet)" opacity=".9">AUC</text>
    <text x="260" y="220" font-size="10" fill="currentColor" opacity=".7">área sob a curva</text>
  </svg>`;
};

/* ─────────────────────────────────────────
   Distribuição com média e mediana (M4)
───────────────────────────────────────── */
PrevSVG.assimetrias = function() {
  return `
  <svg viewBox="0 0 600 240" role="img" aria-label="Três tipos de distribuição: simétrica, assimétrica à direita, assimétrica à esquerda">
    <!-- simétrica -->
    <g transform="translate(20 20)">
      <text x="80" y="14" font-size="11" font-weight="800" fill="var(--c-green)" text-anchor="middle">SIMÉTRICA</text>
      <path d="M 10 180 Q 80 30 150 180 Z" fill="var(--c-green-soft)" stroke="var(--c-green)" stroke-width="2"/>
      <line x1="80" y1="40" x2="80" y2="180" stroke="var(--c-orange)" stroke-width="2.5"/>
      <line x1="80" y1="40" x2="80" y2="180" stroke="var(--c-violet)" stroke-width="2.5" stroke-dasharray="3 3"/>
      <text x="80" y="208" font-size="10" fill="currentColor" text-anchor="middle">média = mediana</text>
    </g>
    <!-- direita -->
    <g transform="translate(220 20)">
      <text x="80" y="14" font-size="11" font-weight="800" fill="var(--c-amber)" text-anchor="middle">CAUDA À DIREITA</text>
      <path d="M 10 180 Q 50 30 100 90 Q 130 160 150 180 Z" fill="var(--c-amber-soft)" stroke="var(--c-amber)" stroke-width="2"/>
      <line x1="55" y1="80" x2="55" y2="180" stroke="var(--c-violet)" stroke-width="2.5" stroke-dasharray="3 3"/>
      <text x="42" y="76" font-size="9" fill="var(--c-violet)" text-anchor="end">mediana</text>
      <line x1="85" y1="80" x2="85" y2="180" stroke="var(--c-orange)" stroke-width="2.5"/>
      <text x="100" y="76" font-size="9" fill="var(--c-orange)">média ↗</text>
      <text x="80" y="208" font-size="10" fill="currentColor" text-anchor="middle">média &gt; mediana</text>
    </g>
    <!-- esquerda -->
    <g transform="translate(420 20)">
      <text x="80" y="14" font-size="11" font-weight="800" fill="var(--c-red)" text-anchor="middle">CAUDA À ESQUERDA</text>
      <path d="M 10 180 Q 30 160 60 90 Q 110 30 150 180 Z" fill="var(--c-red-soft)" stroke="var(--c-red)" stroke-width="2"/>
      <line x1="105" y1="80" x2="105" y2="180" stroke="var(--c-violet)" stroke-width="2.5" stroke-dasharray="3 3"/>
      <text x="118" y="76" font-size="9" fill="var(--c-violet)">mediana</text>
      <line x1="75" y1="80" x2="75" y2="180" stroke="var(--c-orange)" stroke-width="2.5"/>
      <text x="62" y="76" font-size="9" fill="var(--c-orange)" text-anchor="end">média ↙</text>
      <text x="80" y="208" font-size="10" fill="currentColor" text-anchor="middle">média &lt; mediana</text>
    </g>
  </svg>`;
};

/* ─────────────────────────────────────────
   Espalhamento (DP) — mesma média, dispersão diferente
───────────────────────────────────────── */
PrevSVG.dispersaoDP = function() {
  return `
  <svg viewBox="0 0 600 240" role="img" aria-label="Comparativo de dispersão: mesma média, desvio padrão diferente">
    <text x="300" y="20" font-size="12" fill="currentColor" font-weight="800" text-anchor="middle">Mesma média (μ=50), dispersões diferentes</text>
    <!-- linha de média -->
    <line x1="280" y1="40" x2="320" y2="40" stroke="var(--c-orange)" stroke-width="2"/>
    <text x="300" y="36" font-size="10" font-weight="700" fill="var(--c-orange)" text-anchor="middle">μ</text>

    <!-- amostra 1 (DP baixo) -->
    <g transform="translate(0 70)">
      <text x="20" y="26" font-size="10" font-weight="800" fill="var(--c-green)">DP baixo (s≈2)</text>
      <line x1="60" y1="50" x2="540" y2="50" stroke="currentColor" stroke-width="1" opacity=".25"/>
      ${[290,295,300,300,300,305,310,300,302,298].map((cx,i) => `<circle cx="${cx}" cy="50" r="6" fill="var(--c-green)" opacity=".8"/>`).join('')}
    </g>

    <!-- amostra 2 (DP médio) -->
    <g transform="translate(0 130)">
      <text x="20" y="26" font-size="10" font-weight="800" fill="var(--c-amber)">DP médio (s≈8)</text>
      <line x1="60" y1="50" x2="540" y2="50" stroke="currentColor" stroke-width="1" opacity=".25"/>
      ${[260,280,295,305,300,310,320,290,308,295].map((cx,i) => `<circle cx="${cx}" cy="50" r="6" fill="var(--c-amber)" opacity=".8"/>`).join('')}
    </g>

    <!-- amostra 3 (DP alto) -->
    <g transform="translate(0 190)">
      <text x="20" y="26" font-size="10" font-weight="800" fill="var(--c-red)">DP alto (s≈18)</text>
      <line x1="60" y1="50" x2="540" y2="50" stroke="currentColor" stroke-width="1" opacity=".25"/>
      ${[180,230,260,290,310,330,360,400,250,335].map((cx,i) => `<circle cx="${cx}" cy="50" r="6" fill="var(--c-red)" opacity=".8"/>`).join('')}
    </g>
  </svg>`;
};

/* ─────────────────────────────────────────
   VPP / VPN / Prevalência — funil (M2)
   Mostra como a prevalência altera VPP/VPN mesmo
   com Sens/Esp fixos.
───────────────────────────────────────── */
PrevSVG.vppFunil = function() {
  return `
  <svg viewBox="0 0 600 280" role="img" aria-label="Funil mostrando o efeito da prevalência sobre VPP e VPN">
    <defs>
      <linearGradient id="vpp-grad-low" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="var(--c-teal)" stop-opacity=".2"/>
        <stop offset="100%" stop-color="var(--c-red)" stop-opacity=".7"/>
      </linearGradient>
      <linearGradient id="vpp-grad-high" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="var(--c-teal)" stop-opacity=".2"/>
        <stop offset="100%" stop-color="var(--c-green)" stop-opacity=".8"/>
      </linearGradient>
    </defs>

    <!-- Cenário 1: prevalência BAIXA -->
    <g transform="translate(20 30)">
      <text x="130" y="0" font-size="12" font-weight="800" fill="var(--c-teal)" text-anchor="middle">RASTREIO POPULACIONAL</text>
      <text x="130" y="16" font-size="10" fill="currentColor" text-anchor="middle" opacity=".7">Prevalência ≈ 1%</text>
      <!-- funil -->
      <path d="M 20 40 L 240 40 L 180 140 L 80 140 Z" fill="url(#vpp-grad-low)" stroke="var(--c-teal)" stroke-width="1.5"/>
      <text x="130" y="70" font-size="11" font-weight="700" fill="currentColor" text-anchor="middle">10.000 testados +</text>
      <text x="130" y="118" font-size="14" font-weight="800" fill="var(--c-red)" text-anchor="middle">VPP ≈ 9%</text>
      <text x="130" y="170" font-size="10" fill="currentColor" text-anchor="middle" opacity=".75">→ muito falso positivo</text>
      <text x="130" y="186" font-size="10" fill="currentColor" text-anchor="middle" opacity=".75">→ confiar pouco no +</text>
    </g>

    <text x="300" y="120" font-size="22" font-weight="800" fill="currentColor" opacity=".35" text-anchor="middle">vs</text>

    <!-- Cenário 2: prevalência ALTA -->
    <g transform="translate(330 30)">
      <text x="130" y="0" font-size="12" font-weight="800" fill="var(--c-teal)" text-anchor="middle">PRÉ-TESTE ALTA</text>
      <text x="130" y="16" font-size="10" fill="currentColor" text-anchor="middle" opacity=".7">Prevalência ≈ 40%</text>
      <path d="M 20 40 L 240 40 L 180 140 L 80 140 Z" fill="url(#vpp-grad-high)" stroke="var(--c-teal)" stroke-width="1.5"/>
      <text x="130" y="70" font-size="11" font-weight="700" fill="currentColor" text-anchor="middle">100 testados +</text>
      <text x="130" y="118" font-size="14" font-weight="800" fill="var(--c-green)" text-anchor="middle">VPP ≈ 88%</text>
      <text x="130" y="170" font-size="10" fill="currentColor" text-anchor="middle" opacity=".75">→ pouco falso positivo</text>
      <text x="130" y="186" font-size="10" fill="currentColor" text-anchor="middle" opacity=".75">→ confiar muito no +</text>
    </g>

    <!-- Legenda inferior -->
    <text x="300" y="252" font-size="11" fill="var(--c-violet)" font-weight="700" text-anchor="middle">Mesma Sens/Esp · prevalência muda tudo</text>
    <text x="300" y="268" font-size="10" fill="currentColor" text-anchor="middle" opacity=".7">VPP sobe com prevalência · VPN desce com prevalência</text>
  </svg>`;
};

/* ─────────────────────────────────────────
   Distribuições sãos × doentes que GERAM a ROC (M3)
   Curva ROC nasce da sobreposição de duas distribuições
───────────────────────────────────────── */
PrevSVG.distribuicoesROC = function() {
  return `
  <svg viewBox="0 0 600 300" role="img" aria-label="Duas distribuições sãos versus doentes que dão origem à curva ROC">
    <text x="300" y="18" font-size="12" font-weight="800" fill="var(--c-orange)" text-anchor="middle">O QUE GERA A CURVA ROC</text>
    <text x="300" y="34" font-size="10" fill="currentColor" text-anchor="middle" opacity=".7">duas distribuições — uma de sãos, outra de doentes — sobrepostas</text>

    <!-- eixo X -->
    <line x1="60" y1="220" x2="540" y2="220" stroke="currentColor" stroke-width="1.5" opacity=".5"/>
    <text x="300" y="248" font-size="10" fill="currentColor" text-anchor="middle" opacity=".7">valor medido (ex.: glicemia, PSA, troponina)</text>
    <text x="60" y="240" font-size="9" fill="currentColor" opacity=".55">baixo</text>
    <text x="540" y="240" font-size="9" fill="currentColor" text-anchor="end" opacity=".55">alto</text>

    <!-- Distribuição SÃOS (à esquerda) -->
    <path d="M 80 220 Q 160 90 240 220 Z" fill="var(--c-green-soft)" stroke="var(--c-green)" stroke-width="2" opacity=".85"/>
    <text x="160" y="120" font-size="11" font-weight="800" fill="var(--c-green)" text-anchor="middle">SÃOS</text>
    <text x="160" y="134" font-size="9" fill="var(--c-green)" text-anchor="middle">μ=baixo · σ</text>

    <!-- Distribuição DOENTES (à direita) -->
    <path d="M 280 220 Q 360 70 440 220 Z" fill="var(--c-red-soft)" stroke="var(--c-red)" stroke-width="2" opacity=".85"/>
    <text x="360" y="100" font-size="11" font-weight="800" fill="var(--c-red)" text-anchor="middle">DOENTES</text>
    <text x="360" y="114" font-size="9" fill="var(--c-red)" text-anchor="middle">μ=alto · σ</text>

    <!-- Zona de sobreposição (cinza) -->
    <path d="M 240 220 Q 260 170 280 220 Z" fill="var(--c-amber-soft)" stroke="var(--c-amber)" stroke-width="1.5" opacity=".7"/>
    <text x="260" y="195" font-size="9" font-weight="700" fill="var(--c-amber)" text-anchor="middle">ÁREA DE</text>
    <text x="260" y="207" font-size="9" font-weight="700" fill="var(--c-amber)" text-anchor="middle">CONFUSÃO</text>

    <!-- Linha do corte -->
    <line x1="260" y1="60" x2="260" y2="220" stroke="var(--c-violet)" stroke-width="2.5" stroke-dasharray="5 4"/>
    <text x="260" y="54" font-size="11" font-weight="800" fill="var(--c-violet)" text-anchor="middle">ponto de corte</text>

    <!-- Anotação -->
    <text x="300" y="278" font-size="11" fill="currentColor" text-anchor="middle" opacity=".75" font-style="italic">Quanto mais separadas as duas curvas, maior a AUC.</text>
  </svg>`;
};

/* ─────────────────────────────────────────
   Histograma de classes (M4) — mostra moda, mediana, média
───────────────────────────────────────── */
PrevSVG.histogramaTendencia = function() {
  return `
  <svg viewBox="0 0 600 280" role="img" aria-label="Histograma mostrando moda, mediana e média sobre as classes">
    <text x="300" y="18" font-size="12" font-weight="800" fill="var(--c-violet)" text-anchor="middle">HISTOGRAMA · três medidas em um só gráfico</text>

    <!-- eixo X com classes -->
    <line x1="60" y1="220" x2="540" y2="220" stroke="currentColor" stroke-width="1.5" opacity=".5"/>

    <!-- barras -->
    <g>
      <rect x="80"  y="180" width="50" height="40"  fill="var(--c-violet-soft)" stroke="var(--c-violet)" stroke-width="1.5"/>
      <text x="105" y="240" font-size="10" fill="currentColor" text-anchor="middle">10-20</text>
      <text x="105" y="176" font-size="9" fill="currentColor" text-anchor="middle" opacity=".7">n=4</text>

      <rect x="140" y="140" width="50" height="80"  fill="var(--c-violet-soft)" stroke="var(--c-violet)" stroke-width="1.5"/>
      <text x="165" y="240" font-size="10" fill="currentColor" text-anchor="middle">20-30</text>
      <text x="165" y="136" font-size="9" fill="currentColor" text-anchor="middle" opacity=".7">n=8</text>

      <rect x="200" y="80"  width="50" height="140" fill="var(--c-violet-soft)" stroke="var(--c-violet)" stroke-width="2"/>
      <text x="225" y="240" font-size="10" font-weight="800" fill="var(--c-violet)" text-anchor="middle">30-40</text>
      <text x="225" y="76" font-size="10" font-weight="800" fill="var(--c-violet)" text-anchor="middle">n=14</text>

      <rect x="260" y="120" width="50" height="100" fill="var(--c-violet-soft)" stroke="var(--c-violet)" stroke-width="1.5"/>
      <text x="285" y="240" font-size="10" fill="currentColor" text-anchor="middle">40-50</text>
      <text x="285" y="116" font-size="9" fill="currentColor" text-anchor="middle" opacity=".7">n=10</text>

      <rect x="320" y="160" width="50" height="60"  fill="var(--c-violet-soft)" stroke="var(--c-violet)" stroke-width="1.5"/>
      <text x="345" y="240" font-size="10" fill="currentColor" text-anchor="middle">50-60</text>
      <text x="345" y="156" font-size="9" fill="currentColor" text-anchor="middle" opacity=".7">n=6</text>

      <rect x="380" y="190" width="50" height="30"  fill="var(--c-violet-soft)" stroke="var(--c-violet)" stroke-width="1.5"/>
      <text x="405" y="240" font-size="10" fill="currentColor" text-anchor="middle">60-70</text>
      <text x="405" y="186" font-size="9" fill="currentColor" text-anchor="middle" opacity=".7">n=3</text>
    </g>

    <!-- Moda (classe mais frequente) -->
    <g>
      <line x1="225" y1="80" x2="225" y2="60" stroke="var(--c-green)" stroke-width="2"/>
      <rect x="195" y="44" width="60" height="18" rx="6" fill="var(--c-green)"/>
      <text x="225" y="57" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">MODA</text>
    </g>

    <!-- Mediana -->
    <g>
      <line x1="270" y1="220" x2="270" y2="260" stroke="var(--c-amber)" stroke-width="2.5" stroke-dasharray="3 3"/>
      <rect x="240" y="258" width="70" height="18" rx="6" fill="var(--c-amber)"/>
      <text x="275" y="271" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">MEDIANA</text>
    </g>

    <!-- Média (puxada à direita pela cauda) -->
    <g>
      <line x1="295" y1="220" x2="295" y2="260" stroke="var(--c-orange)" stroke-width="2.5"/>
      <rect x="305" y="258" width="60" height="18" rx="6" fill="var(--c-orange)"/>
      <text x="335" y="271" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">MÉDIA</text>
    </g>

    <!-- legenda -->
    <text x="480" y="100" font-size="10" font-weight="700" fill="var(--c-green)">● Moda = classe mais alta</text>
    <text x="480" y="116" font-size="10" font-weight="700" fill="var(--c-amber)">● Mediana = centro de massa</text>
    <text x="480" y="132" font-size="10" font-weight="700" fill="var(--c-orange)">● Média = centro de gravidade</text>
    <text x="480" y="156" font-size="9" fill="currentColor" opacity=".7">cauda à direita →</text>
    <text x="480" y="170" font-size="9" fill="currentColor" opacity=".7">média &gt; mediana &gt; moda</text>
  </svg>`;
};

/* ─────────────────────────────────────────
   Mapa-Hero dos 4 módulos
───────────────────────────────────────── */
PrevSVG.heroMapa = function() {
  return `
  <svg viewBox="0 0 800 320" role="img" aria-label="Mapa visual dos 4 módulos da plataforma">
    <defs>
      <linearGradient id="hm-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#2563eb"/>
        <stop offset="35%" stop-color="#14b8a6"/>
        <stop offset="70%" stop-color="#f97316"/>
        <stop offset="100%" stop-color="#8b5cf6"/>
      </linearGradient>
    </defs>
    <path d="M 60 220 Q 200 80 400 200 T 740 100" fill="none" stroke="url(#hm-grad)" stroke-width="3" stroke-linecap="round"/>

    <!-- 4 marcos -->
    <g transform="translate(80 200)"><circle r="36" fill="var(--c-blue)" stroke="#fff" stroke-width="4"/><text y="6" font-size="18" font-weight="800" fill="#fff" text-anchor="middle">1</text><text y="62" font-size="11" font-weight="700" fill="var(--c-blue)" text-anchor="middle">Validação</text><text y="76" font-size="10" fill="currentColor" text-anchor="middle" opacity=".7">Sens/Esp/RV</text></g>

    <g transform="translate(280 130)"><circle r="36" fill="var(--c-teal)" stroke="#fff" stroke-width="4"/><text y="6" font-size="18" font-weight="800" fill="#fff" text-anchor="middle">2</text><text y="62" font-size="11" font-weight="700" fill="var(--c-teal)" text-anchor="middle">Valores Preditivos</text><text y="76" font-size="10" fill="currentColor" text-anchor="middle" opacity=".7">VPP·VPN·Prevalência</text></g>

    <g transform="translate(520 190)"><circle r="36" fill="var(--c-orange)" stroke="#fff" stroke-width="4"/><text y="6" font-size="18" font-weight="800" fill="#fff" text-anchor="middle">3</text><text y="62" font-size="11" font-weight="700" fill="var(--c-orange)" text-anchor="middle">Curva ROC</text><text y="76" font-size="10" fill="currentColor" text-anchor="middle" opacity=".7">AUC · ponto de corte</text></g>

    <g transform="translate(720 100)"><circle r="36" fill="var(--c-violet)" stroke="#fff" stroke-width="4"/><text y="6" font-size="18" font-weight="800" fill="#fff" text-anchor="middle">4</text><text y="62" font-size="11" font-weight="700" fill="var(--c-violet)" text-anchor="middle">Tendência & Dispersão</text><text y="76" font-size="10" fill="currentColor" text-anchor="middle" opacity=".7">média·mediana·DP</text></g>
  </svg>`;
};
