/* =========================================
   INTENSIVÃO PREVENTIVA — DADOS GLOBAIS
   Fonte única de verdade. Define páginas, blocos,
   módulos e gradientes. Os renderizadores em
   js/pages/* leem essas estruturas.
   ========================================= */

/* ─────────────────────────────────────────
   GRAD_MAP — gradientes por bloco
───────────────────────────────────────── */
const GRAD_MAP = {
  home:     'var(--grad-prev-home)',
  integ:    'var(--grad-prev-revisao)',
  m1:       'var(--grad-m1)',
  m2:       'var(--grad-m2)',
  m3:       'var(--grad-m3)',
  m4:       'var(--grad-m4)',
  revisao:  'var(--grad-prev-revisao)',
};

/* ─────────────────────────────────────────
   GO_BLOCKS — agrupamento da sidebar
───────────────────────────────────────── */
const GO_BLOCKS = {
  home:  { label: 'Início',                          color: '#6366f1', pages: [] },
  m1:    { label: '1. Validação de Testes',          color: '#2563eb', pages: [] },
  m2:    { label: '2. Valores Preditivos & Prevalência', color: '#14b8a6', pages: [] },
  m3:    { label: '3. Curva ROC e Pontos de Corte',  color: '#f97316', pages: [] },
  m4:    { label: '4. Tendência Central e Dispersão', color: '#8b5cf6', pages: [] },
  integ: { label: '★ Integração Global',             color: '#10b981', pages: [] },
};

/* ─────────────────────────────────────────
   GO_PAGES — ordem de navegação da plataforma
───────────────────────────────────────── */
const GO_PAGES = [
  /* HOME / DASHBOARD */
  { id: 'home',            block: 'home',  icon: '⌂', label: 'Dashboard — Mapa da Preventiva', grad: 'home' },
  { id: 'como-estudar',    block: 'home',  icon: '✦', label: 'Como estudar nesta plataforma',  grad: 'home' },

  /* MÓDULO 1 — Validação de Testes Diagnósticos (13 páginas) */
  { id: 'm1-01', block: 'm1', icon: '1',  label: 'Por que validar testes diagnósticos?',                          grad: 'm1' },
  { id: 'm1-02', block: 'm1', icon: '2',  label: 'Medicina baseada em evidências: IA não substitui o médico',     grad: 'm1' },
  { id: 'm1-03', block: 'm1', icon: '3',  label: 'Epidemiologia clínica: pedir e interpretar exames',             grad: 'm1' },
  { id: 'm1-04', block: 'm1', icon: '4',  label: 'A tabela 2x2: a cruz que organiza o raciocínio',                grad: 'm1' },
  { id: 'm1-05', block: 'm1', icon: '5',  label: 'Quatro resultados: VP, FP, FN e VN',                            grad: 'm1' },
  { id: 'm1-06', block: 'm1', icon: '6',  label: 'Acurácia: a proporção de acertos',                              grad: 'm1' },
  { id: 'm1-07', block: 'm1', icon: '7',  label: 'Sensibilidade: detectar doentes',                               grad: 'm1' },
  { id: 'm1-08', block: 'm1', icon: '8',  label: 'Testes em paralelo: priorizar exclusão',                        grad: 'm1' },
  { id: 'm1-09', block: 'm1', icon: '9',  label: 'Especificidade: reconhecer sadios',                             grad: 'm1' },
  { id: 'm1-10', block: 'm1', icon: '10', label: 'Testes em série: priorizar confirmação',                        grad: 'm1' },
  { id: 'm1-11', block: 'm1', icon: '11', label: 'Sens, Esp e prevalência: o que muda e o que não muda',          grad: 'm1' },
  { id: 'm1-12', block: 'm1', icon: '12', label: 'Razões de verossimilhança',                                     grad: 'm1' },
  { id: 'm1-13', block: 'm1', icon: '13', label: 'Fechamento de prova — Módulo 1',                                grad: 'm1' },

  /* MÓDULO 2 — Valores Preditivos, Prevalência e Pré-Teste (10 páginas) */
  { id: 'm2-01', block: 'm2', icon: '1',  label: 'O segundo tempo do exame: valores preditivos',                  grad: 'm2' },
  { id: 'm2-02', block: 'm2', icon: '2',  label: 'Da tabela à fórmula: VPP e VPN sem decoreba',                    grad: 'm2' },
  { id: 'm2-03', block: 'm2', icon: '3',  label: 'A porquinha torce o rabo: prevalência transforma VPP/VPN',       grad: 'm2' },
  { id: 'm2-04', block: 'm2', icon: '4',  label: 'Rio × Londres: mesma Sens/Esp, VPP/VPN diferentes',              grad: 'm2' },
  { id: 'm2-05', block: 'm2', icon: '5',  label: 'Prevalência vira probabilidade pré-teste',                       grad: 'm2' },
  { id: 'm2-06', block: 'm2', icon: '6',  label: 'Baixa probabilidade pré-teste: boa prática',                     grad: 'm2' },
  { id: 'm2-07', block: 'm2', icon: '7',  label: 'Questão guiada 1: hanseníase e tabela 2x2',                      grad: 'm2' },
  { id: 'm2-08', block: 'm2', icon: '8',  label: 'Questões guiadas 2 e 3: baixa prevalência, FP',                  grad: 'm2' },
  { id: 'm2-09', block: 'm2', icon: '9',  label: 'Sintomas como teste: cistite e VPP',                             grad: 'm2' },
  { id: 'm2-10', block: 'm2', icon: '10', label: 'Fechamento — Módulo 2',                                          grad: 'm2' },

  /* MÓDULO 3 — Curva ROC, Cortes e AUC (7 páginas) */
  { id: 'm3-01', block: 'm3', icon: '1',  label: 'Da razão de verossimilhança à Curva ROC',                        grad: 'm3' },
  { id: 'm3-02', block: 'm3', icon: '2',  label: 'Lendo os eixos da Curva ROC',                                    grad: 'm3' },
  { id: 'm3-03', block: 'm3', icon: '3',  label: 'O melhor ponto: superior e à esquerda',                          grad: 'm3' },
  { id: 'm3-04', block: 'm3', icon: '4',  label: 'De onde vêm os valores de referência (HbA1c)',                   grad: 'm3' },
  { id: 'm3-05', block: 'm3', icon: '5',  label: 'Mexendo no ponto de corte: mais sensível ou mais específico',    grad: 'm3' },
  { id: 'm3-06', block: 'm3', icon: '6',  label: 'AUC: comparando testes pela área sob a curva',                   grad: 'm3' },
  { id: 'm3-07', block: 'm3', icon: '7',  label: 'Como a banca cobra Curva ROC',                                    grad: 'm3' },

  /* MÓDULO 4 — Tendência Central e Dispersão (9 páginas) */
  { id: 'm4-01', block: 'm4', icon: '1',  label: 'Por que tendência central cai em Medicina?',                     grad: 'm4' },
  { id: 'm4-02', block: 'm4', icon: '2',  label: 'Média: muitos números em um panorama',                            grad: 'm4' },
  { id: 'm4-03', block: 'm4', icon: '3',  label: 'Mediana: o centro que resiste aos extremos',                      grad: 'm4' },
  { id: 'm4-04', block: 'm4', icon: '4',  label: 'Moda: o valor que mais aparece',                                  grad: 'm4' },
  { id: 'm4-05', block: 'm4', icon: '5',  label: 'Mediana em prova: ordenar primeiro, calcular depois',             grad: 'm4' },
  { id: 'm4-06', block: 'm4', icon: '6',  label: 'Dispersão: quando a média esconde histórias',                     grad: 'm4' },
  { id: 'm4-07', block: 'm4', icon: '7',  label: 'Amplitude e desvio: o espalhamento simples',                      grad: 'm4' },
  { id: 'm4-08', block: 'm4', icon: '8',  label: 'Variância e desvio padrão: formalizando o espalhamento',          grad: 'm4' },
  { id: 'm4-09', block: 'm4', icon: '9',  label: 'Como a banca cobra: centro × dispersão',                           grad: 'm4' },

  /* INTEGRAÇÃO GLOBAL */
  { id: 'mapa-global',       block: 'integ', icon: '◇', label: 'Mapa Mental Integrado',                grad: 'revisao' },
  { id: 'matriz-comparativa', block: 'integ', icon: '≋', label: 'Matriz comparativa dos 4 módulos',     grad: 'revisao' },
  { id: 'simulador-bayesiano', block: 'integ', icon: '▣', label: 'Simulador Bayesiano (pré → pós)',     grad: 'revisao' },
  { id: 'revisao-final',     block: 'integ', icon: '✓', label: 'Revisão Final Global',                  grad: 'revisao' },
  { id: 'instalar-app',      block: 'integ', icon: '⇩', label: 'Como instalar o app (PWA)',            grad: 'revisao' },
];

/* Index para lookup */
GO_PAGES.forEach((p, i) => {
  p.index = i;
  if (GO_BLOCKS[p.block]) GO_BLOCKS[p.block].pages.push(p);
});

/* ─────────────────────────────────────────
   MODULE_DATA — metadados pedagógicos
───────────────────────────────────────── */
const MODULE_DATA = {
  m1: {
    label: 'Validação de Testes Diagnósticos',
    short: 'Módulo 1',
    accent: '#2563eb',
    icon: '🧪',
    route: 'm1-01',
    thesis: 'Decidir bem qual exame pedir começa antes do laboratório: começa em entender por que um teste foi validado.',
    pages: 13,
    tag: 'MBE · Tabela 2x2 · Sens/Esp · RV'
  },
  m2: {
    label: 'Valores Preditivos, Prevalência e Pré-Teste',
    short: 'Módulo 2',
    accent: '#14b8a6',
    icon: '🎯',
    route: 'm2-01',
    thesis: 'O exame não fala sozinho. O contexto — quem você está examinando — define o que o resultado significa.',
    pages: 10,
    tag: 'VPP · VPN · Prevalência · Probabilidade pré-teste'
  },
  m3: {
    label: 'Curva ROC, Pontos de Corte e AUC',
    short: 'Módulo 3',
    accent: '#f97316',
    icon: '📈',
    route: 'm3-01',
    thesis: 'A curva ROC traduz, em uma imagem, o dilema de toda decisão diagnóstica: detectar mais doente custa especificidade.',
    pages: 7,
    tag: 'ROC · AUC · Corte · HbA1c'
  },
  m4: {
    label: 'Tendência Central e Dispersão',
    short: 'Módulo 4',
    accent: '#8b5cf6',
    icon: '📊',
    route: 'm4-01',
    thesis: 'Antes de comparar tratamentos, é preciso saber descrever a amostra. Centro e dispersão são a língua da bioestatística.',
    pages: 9,
    tag: 'Média · Mediana · Moda · Variância · DP'
  }
};

/* ─────────────────────────────────────────
   GLOBAL_BRIDGES — costura editorial entre módulos
   (referenciados no Dashboard e nas páginas-ponte)
───────────────────────────────────────── */
const GLOBAL_BRIDGES = [
  {
    from: 'm1', to: 'm2',
    title: 'Da Sens/Esp para os valores preditivos',
    msg: 'Sensibilidade e especificidade são propriedades do teste. Valores preditivos dependem de quem você examina.',
    target: 'm2-01'
  },
  {
    from: 'm2', to: 'm3',
    title: 'Da prevalência ao ponto de corte',
    msg: 'Probabilidade pré-teste organiza a leitura do resultado. A curva ROC mostra como o corte muda o jogo.',
    target: 'm3-01'
  },
  {
    from: 'm3', to: 'm4',
    title: 'Da curva à descrição populacional',
    msg: 'Antes de comparar curvas ou tratamentos, é preciso descrever amostras com medidas de centro e dispersão.',
    target: 'm4-01'
  },
  {
    from: 'm1', to: 'm4',
    title: 'O elo bayesiano',
    msg: 'Razão de verossimilhança × probabilidade pré-teste = probabilidade pós-teste. O simulador bayesiano amarra tudo.',
    target: 'simulador-bayesiano'
  }
];
