/* _pages.mjs — conteúdo autoral das 13 páginas da Aula 01.
   Texto-aluno = canon do prompt-final (§6). Tópicos visíveis como <h3 class="topic-h">.
   Anti-metalinguagem: voz de professor direto ao aluno; o texto É o conteúdo.
   Heróis (P8/P12) e pisos (demais) embutidos inline pelos helpers do _build.mjs. */

export function buildPages({ med, svgPiso, hero, notaBanca, quiz, tag, chips, page }) {
  const P = [];

  /* ===================== PÁGINA 1 — E1 Pergunta central ===================== */
  P.push(page('p1', 1, `
    ${tag('sys', 'Enquadramento · Puericultura')}
    ${chips(['puericultura', 'peso · estatura · PC', 'estado de saúde', 'medir sempre'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Por que a primeira coisa que um bom pediatra olha numa criança não é a garganta — é o gráfico?</p>
    </section>

    <h1 class="page-title">Por que o crescimento é o primeiro exame da criança</h1>

    <div class="prose">
      <h3 class="topic-h">Da UTI neonatal ao ambulatório: o que é puericultura</h3>
      <p>Depois de dominar o recém-nascido — infecção neonatal, classificação do RN, icterícia, as complicações dos primeiros dias —, o olhar muda de cenário. Sai da maternidade e entra no ambulatório, onde a criança chega andando (ou no colo), crescendo, vivendo. Esse acompanhamento global da criança nos primeiros anos de vida tem nome: <span class="term">puericultura</span>. Ela cobre a criança pequena, o pré-escolar, o escolar e a entrada na adolescência. E o tema que abre a puericultura é o <strong>crescimento</strong> e seus distúrbios.</p>

      <h3 class="topic-h">Crescimento não é número, é estado de saúde</h3>
      <p>Aqui está a virada de chave que separa quem decora de quem entende: o peso e a estatura de uma criança não são dados burocráticos para preencher a caderneta. <strong>Crescimento é um indicador de estado de saúde.</strong> A criança que cresce bem tende a ser mais saudável, com menos complicações e menos quadros infecciosos de repetição. Quando o crescimento trava, ele está contando algo sobre o corpo inteiro — má absorção, doença crônica, problema social.</p>
      <p>Os distúrbios do crescimento são comuns no consultório e caem em prova com frequência alta. Por isso vale o preço de entrada: existe uma <strong>leve decoreba</strong> de números do crescimento normal que precisa ser vencida primeiro. O raciocínio dos distúrbios flui sozinho depois — mas só fica de pé se os números estiverem firmes.</p>

      <h3 class="topic-h">Os três parâmetros que você vai dominar</h3>
      <p>São três, e só três, os parâmetros que sustentam tudo: <strong>peso, estatura e perímetro cefálico</strong>. Cada um conta uma história diferente do mesmo corpo — o peso fala do <span class="hl-bad">agudo</span>, a estatura fala do <span class="hl-warn">crônico</span> e o perímetro cefálico fala do <span class="hl-good">cérebro</span>. Domine os três e nenhuma classificação nutricional te pega.</p>
    </div>

    ${svgPiso(1, { caption: 'os três parâmetros — vire cada cartão e veja o que cada um detecta melhor (agudo / crônico / cérebro).', hint: 'Clique, toque ou Tab + Enter para virar.' })}

    <div class="prose">
      <h3 class="topic-h">Por que medir SEMPRE, até no pronto-socorro</h3>
      <p>Tem uma armadilha de mentalidade aqui: muita gente acha que crescimento só se avalia na consulta de rotina. Errado. Peso e estatura se olham em <strong>qualquer</strong> atendimento — inclusive no pronto-atendimento e no pronto-socorro. O motivo é prático e poderoso: uma criança pode passar anos sem voltar ao pediatra. Se naquele único contato você olha o gráfico, flagra um distúrbio que ninguém mais ia pegar — e garante diagnóstico e encaminhamento. O olho no gráfico é barato; a criança que passa despercebida, não.</p>
    </div>

    ${med({
      file: 'p1-caderneta-peso-idade.png',
      alt: 'Página da Caderneta de Saúde da Criança com o gráfico de peso para a idade de 0 a 2 anos, mostrando cinco curvas coloridas de escore-z em uma grade quadriculada.',
      achado: 'Caderneta de Saúde da Criança (MS) — gráfico Peso × Idade (0 a 2 anos), curvas de escore-z (preta ±3, vermelha ±2, verde 0), referência OMS 2006. Onde os três parâmetros viram um gráfico longitudinal.',
      fonte: 'Caderneta de Saúde da Criança, 12ª ed. Ministério da Saúde, 2023',
      licenca: 'Material oficial do MS (público)'
    })}

    <aside class="op-summary">
      <p class="op-summary__label">Resumo operacional</p>
      <p>Crescimento = estado de saúde em três medidas (peso, estatura, PC). Avalie sempre, em qualquer atendimento.</p>
    </aside>

    ${quiz('p1', 'Duas questões para fixar o enquadramento.', [
      {
        stem: 'A avaliação do crescimento de uma criança deve ser feita:',
        alts: [
          { t: 'Apenas nas consultas de puericultura agendadas', correct: false, why: 'Limita o rastreio justamente quando ele mais salva — a criança que aparece só uma vez precisa ser flagrada nesse contato.' },
          { t: 'Apenas quando os pais relatam queixa de peso', correct: false, why: 'O distúrbio quase nunca é a queixa; é o achado de quem olha o gráfico mesmo sem reclamação.' },
          { t: 'Em qualquer atendimento, inclusive pronto-socorro', correct: true, why: 'Certa. Um único olhar no gráfico em PA/PS pode ser a única chance de diagnóstico daquela criança.' },
          { t: 'Apenas a partir dos 2 anos de idade', correct: false, why: 'Erra a faixa: o crescimento se avalia desde o nascimento.' },
        ]
      },
      {
        tf: true,
        stem: '"Crescimento é apenas um dado numérico de acompanhamento." A afirmação é:',
        alts: [
          { t: 'Verdadeira — serve só para preencher a caderneta', correct: false, why: 'Reproduz exatamente o erro de mentalidade que precisa ser desmontado.' },
          { t: 'Falsa — crescimento é um indicador de estado de saúde', correct: true, why: 'Certa. Crescer bem correlaciona com menos infecção e menos complicação; o gráfico é leitura de saúde global, não burocracia.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 2 — E3 Caso clínico ===================== */
  P.push(page('p2', 2, `
    ${tag('case', 'Caso-âncora · Josias')}
    ${chips(['pré-escolar', '9,8 kg · 82 cm', 'sinal × ruído', 'pergunta-guia'])}

    <article class="opener opener--case" aria-label="Caso clínico de abertura">
      <span class="opener__case-header">Ambulatório de pediatria · pré-escolar</span>
      <p class="opener__case-quote">Josias, <strong>2 anos e meio</strong>, chega por febre, tosse e coriza há 3 dias. O resfriado é banal. O que liga o alarme está na ficha, não na queixa: <strong>peso 9,8 kg</strong>.</p>
      <dl class="case-card__meta">
        <dt>Paciente</dt><dd>Josias, masculino, 2 anos e 6 meses (30 meses)</dd>
        <dt>Queixa</dt><dd>febre, tosse e coriza há 3 dias</dd>
        <dt>Exame</dt><dd>afebril, acianótico, anictérico, levemente hipocorado; FC 130, FR 30; roncos leves; abdome globoso, flácido, indolor, sem visceromegalia</dd>
        <dt>Antropometria</dt><dd>peso 9,8 kg · estatura 82 cm</dd>
      </dl>
    </article>

    <h1 class="page-title">O caso que liga o alarme: Josias, 2 anos e meio, menos de 10 kg</h1>

    <div class="prose">
      <h3 class="topic-h">A consulta inocente</h3>
      <p>A mãe, Sra. Altineia, leva Josias ao ambulatório por febre, tosse e coriza há 3 dias. No exame, ele está afebril, acianótico, anictérico, levemente hipocorado; FC 130, FR 30. Ausculta com leves roncos; abdome globoso, flácido, indolor, sem massa, sem hepatosplenomegalia. A Dra. Saraney levanta a hipótese de resfriado comum e prescreve sintomáticos. Para o quadro agudo — três dias de sintomas brandos de via aérea —, a hipótese é razoável. Resfriado é resfriado.</p>

      <h3 class="topic-h">O dado que incomoda fora do problema agudo</h3>
      <p>Mas tem um número na ficha que não tem nada a ver com a tosse e que faz qualquer pediatra parar: <strong>peso 9,8 kg, estatura 82 cm</strong>. Uma criança de <strong>2 anos e 6 meses com menos de 10 kg</strong> liga o alarme. Esse peso não combina com essa idade. O problema que trouxe Josias ao consultório (o resfriado) é o ruído; o achado de verdade está escondido na antropometria. É a lição clínica mais valiosa daqui: o motivo da consulta nem sempre é o que importa — quem olha o gráfico encontra o que a queixa não conta.</p>
    </div>

    ${svgPiso(2, { caption: 'a ficha de Josias — destaque o que incomoda e veja o par peso/estatura saltar do resto.', hint: 'Botão de destaque acessível; estado anunciado por leitor de tela.' })}

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>A banca adora esconder o achado relevante atrás de uma queixa banal. Treine ler a antropometria mesmo quando o paciente "veio por outra coisa".</p>
    </aside>

    <div class="prose">
      <h3 class="topic-h">A pergunta que organiza tudo o que vem</h3>
      <p>Daí nasce a pergunta-guia: <strong>qual é o diagnóstico do estado nutricional de Josias segundo o Ministério da Saúde?</strong> Responder a ela exige dois passos: (1) saber <strong>quanto</strong> a criança deveria crescer em cada período da vida; (2) <strong>classificar</strong> a criança aplicando os dados nos gráficos. Guarde Josias. Ele volta no fim, com diagnóstico fechado.</p>
    </div>

    ${med({
      file: 'p2-preescolar-consulta.jpg',
      alt: 'Criança pequena deitada em maca de consultório, com a mão de um profissional usando estetoscópio sobre o tórax.',
      achado: 'Lactente em consulta ambulatorial pediátrica — a queixa aguda no primeiro plano, o achado antropométrico no segundo.',
      fonte: 'Ragesoss, via Wikimedia Commons',
      licenca: 'CC BY-SA 3.0',
      tarja: 'p2'
    })}

    ${quiz('p2', 'Discriminação sinal × ruído na história.', [
      {
        stem: 'Na história de Josias, o dado que mais deve preocupar o pediatra é:',
        alts: [
          { t: 'FC de 130 e FR de 30', correct: false, why: 'Está dentro do esperado/limítrofe para a idade e a febre recente — não é o alarme.' },
          { t: 'Tosse e coriza há 3 dias', correct: false, why: 'É o motivo da consulta, mas é banal — resfriado é resfriado.' },
          { t: 'Peso de 9,8 kg para 2 anos e 6 meses', correct: true, why: 'Certa. Menos de 10 kg aos 30 meses é o achado antropométrico que dispara a investigação nutricional.' },
          { t: 'Abdome globoso', correct: false, why: 'Abdome globoso e flácido em pré-escolar é achado inocente.' },
        ]
      },
      {
        stem: 'A conduta correta diante do caso é:',
        alts: [
          { t: 'Ignorar a antropometria, pois a queixa é respiratória', correct: false, why: 'Repete o erro de só olhar a queixa.' },
          { t: 'Tratar o resfriado E investigar o estado nutricional', correct: true, why: 'Certa. O resfriado se trata com sintomáticos E o achado de peso obriga a classificação nutricional — as duas coisas convivem.' },
          { t: 'Encaminhar à UTI imediatamente', correct: false, why: 'Desproporcional — nada no caso sugere gravidade aguda.' },
          { t: 'Solicitar tomografia de crânio', correct: false, why: 'Sem base — não há sinal neurológico estrutural.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 3 — E4 Achado/pegadinha ===================== */
  P.push(page('p3', 3, `
    ${tag('weight', 'Peso · sensibilidade & técnica')}
    ${chips(['mais sensível', 'agudo', 'balança < 2a / 16 kg', 'sem fralda'])}

    <aside class="opener opener--trap" aria-label="Achado de abertura">
      <svg class="opener__trap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="opener__trap-body">
        <p class="opener__trap-tag">Achado contra-intuitivo</p>
        <p class="opener__trap-text">Toda vez que uma criança pega um resfriado, ela <strong>emagrece um pouquinho</strong> — e isso não é coincidência. O peso é o primeiro a sentir.</p>
      </div>
    </aside>

    <h1 class="page-title">Peso: o parâmetro que sente primeiro</h1>

    <div class="prose">
      <h3 class="topic-h">Por que o peso é o mais sensível (e fala do agudo)</h3>
      <p>Dos três parâmetros, o peso é o <strong>mais sensível</strong> a qualquer alteração de saúde. Toda infecção aguda — viral, resfriado, pneumonia, gripe — provoca variação de peso, com perda relativa num período curto. Por isso o peso é o dado mais sensível tanto para distúrbio nutricional agudo quanto crônico, mas fala <strong>especialmente do agudo</strong>: ele cai rápido e se recupera rápido. É o termômetro de curto prazo do estado da criança. Guarde o contraste que volta na página da estatura: <span class="hl-bad">peso = agudo</span>; <span class="hl-warn">estatura = crônico</span>.</p>

      <h3 class="topic-h">Balança certa para cada criança</h3>
      <p>A técnica não é detalhe — é o que torna o número confiável. A criança deve ser pesada em <strong>balança pediátrica (de mesa)</strong> sempre que tiver <strong>menos de 2 anos ou até 16 kg</strong>; acima disso, <strong>balança de chão</strong>. O motivo é físico: peso muito pequeno em balança de chão dá variação pouco fidedigna, e a criança até 2 anos não se equilibra nem fica parada na plataforma.</p>
    </div>

    ${svgPiso(3, { caption: 'qual balança? arraste a idade e o peso e veja o corte (16 kg / 2 anos) decidir entre mesa e chão.', hint: 'Setas movem os sliders; resultado anunciado por leitor de tela.' })}

    <div class="prose">
      <h3 class="topic-h">Como pesar a criança pequena</h3>
      <p>O ideal é pesar a criança pequena <strong>sentada</strong>, preferencialmente <strong>sem fralda</strong> e sem nada que adicione peso além do próprio corpo, na balança pediátrica. Fralda cheia, roupa pesada, sapato — tudo isso é peso falso que contamina o gráfico.</p>
    </div>

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Peso sensível</h4><p>Qualquer alteração de saúde o mexe — por isso ele avisa cedo.</p></div>
        <div class="dont-confuse__side"><h4>Peso específico</h4><p>Justamente por ser sensível, ele não diz <em>o que</em> está errado — só que algo está. O diagnóstico vem do conjunto.</p></div>
      </div>
    </div>

    ${med({
      file: 'p3-balanca-pediatrica.jpg',
      alt: 'Enfermeira anotando dados em uma ficha enquanto um bebê é pesado deitado em uma balança pediátrica eletrônica de mesa, em hospital.',
      achado: 'Balança pediátrica eletrônica de mesa — obrigatória para crianças com menos de 2 anos ou até 16 kg.',
      fonte: 'Oliver H, via Wikimedia Commons',
      licenca: 'CC BY-SA 3.0'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Uma queda de peso entre duas consultas é, muitas vezes, o primeiro e único sinal de que algo mudou na criança.</p>
    </aside>

    ${quiz('p3', 'Sensibilidade, temporalidade e técnica.', [
      {
        stem: 'O peso é considerado o parâmetro mais sensível porque:',
        alts: [
          { t: 'Demora a se alterar, refletindo só doença crônica', correct: false, why: 'Descreve a estatura, não o peso.' },
          { t: 'Varia rapidamente com qualquer alteração aguda de saúde', correct: true, why: 'Certa. Cai e recupera rápido, sentindo o agudo antes de todos.' },
          { t: 'Mede o crescimento do cérebro', correct: false, why: 'Isso é o perímetro cefálico.' },
          { t: 'Só muda na desnutrição grave', correct: false, why: 'Subestima a sensibilidade — o peso muda até num resfriado banal.' },
        ]
      },
      {
        stem: 'Uma criança de 18 meses pesando 11 kg deve ser pesada em:',
        alts: [
          { t: 'Balança de chão, por já andar', correct: false, why: 'Erra o critério: o corte é < 2 anos OU até 16 kg — 18 meses já satisfaz.' },
          { t: 'Balança pediátrica de mesa', correct: true, why: 'Certa. Acerta nos dois critérios: < 2 anos e abaixo de 16 kg.' },
          { t: 'Qualquer uma, é indiferente', correct: false, why: 'Ignora que a balança errada gera número não fidedigno.' },
          { t: 'Balança de chão, pois passa de 10 kg', correct: false, why: 'O limiar não é 10 kg; é 16 kg (ou 2 anos).' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 4 — E6 Mnemônico-âncora ===================== */
  P.push(page('p4', 4, `
    ${tag('weight', 'Ganho ponderal · 1º ano')}
    ${chips(['rápido e desacelerado', '700-600-500-300', 'dobra (4-5m) · triplica (12m)', 'paradoxo 30 g/dia'])}

    <aside class="opener opener--mnemonic" aria-label="Mnemônico-âncora de abertura">
      <p class="opener__mnemonic-quote">"Rápido e <em>desacelerado</em>." Toda a decoreba do crescimento cabe nessas três palavras. O número-mestre do peso: <em>700 – 600 – 500 – … 300</em>. Repare no degrau no fim.</p>
      <span class="opener__mnemonic-tag">âncora de memória</span>
    </aside>

    <h1 class="page-title">A lógica que dispensa decorar: rápido e desacelerado</h1>

    <div class="prose">
      <h3 class="topic-h">A perda fisiológica dos primeiros dias</h3>
      <p>Antes de ganhar, a criança <strong>perde</strong> — e está tudo certo. Nos primeiros 10 dias / primeira semana de vida, ela pode perder <strong>até 10% do peso de nascimento</strong> sem que isso seja problema: é perda fisiológica. O motivo é mecânico: o bebê nasce inchado do pós-parto e pode nascer com mecônio já digerido; nos primeiros dias se livra desse inchaço e perde peso. Passados esses dias, recupera o que perdeu e entra na fase de ganho ao longo do 1º ano.</p>

      <h3 class="topic-h">700-600-500-300: o degrau do último trimestre</h3>
      <p>A frase-mestra é "<strong>rápido e desacelerado</strong>": no 1º ano a criança ganha muito, mas a cada mês ganha <strong>menos</strong>. O 1º ano é, disparado, o período de ganho ponderal mais cobrado em prova. O ganho por trimestre:</p>
      <div class="seq" aria-label="Ganho ponderal por trimestre, em gramas por mês">
        <div class="seq__step"><div class="seq__num">700</div><div class="seq__lbl">1º tri (g/mês)</div></div>
        <div class="seq__step"><div class="seq__num">600</div><div class="seq__lbl">2º tri</div></div>
        <div class="seq__step"><div class="seq__num">500</div><div class="seq__lbl">3º tri</div></div>
        <div class="seq__step seq__step--drop"><div class="seq__num">300</div><div class="seq__lbl">4º tri · o degrau</div></div>
      </div>
      <p>A sequência seria "bonita" se terminasse em 400 (700-600-500-400). Mas <strong>não</strong> termina: o último trimestre dá um <span class="hl-bad">degrau</span> e cai para <strong>300</strong>. É exatamente esse degrau que a prova cobra — quem decora a sequência "lisa" erra. Lembre: o último trimestre não acompanha os anteriores.</p>
    </div>

    ${notaBanca('a sequência clássica (escola Marcondes) é <strong>700-600-500-300</strong>, e é o que vale aqui. A SBP atual tabela <strong>700-500-400-350 g/mês</strong> — o 1º trimestre coincide nas duas, os outros três divergem. Se a questão citar explicitamente "segundo a SBP", a referência é 700-500-400-350.')}

    ${svgPiso(4, { caption: 'calculadora de ganho ponderal — entre o peso de nascimento, veja a curva em degraus, os marcos dobra/triplica e o paradoxo dos 30 g/dia.', hint: '−/+ recalculam; marcos focáveis por teclado; recálculo anunciado por leitor de tela.' })}

    <div class="prose">
      <h3 class="topic-h">Dobra e triplica: as duas âncoras</h3>
      <p>Duas âncoras fecham o ganho ponderal do 1º ano:</p>
      <ul>
        <li>A criança <strong>dobra (duplica)</strong> o peso de nascimento por volta de <strong>4 a 5 meses</strong>. Ex.: nasceu 3 kg → ~6 kg no 5º mês.</li>
        <li>A criança <strong>triplica</strong> o peso de nascimento ao completar <strong>12 meses</strong>. Ex.: nasceu 3 kg → 9 kg ao fim do 1º ano (3 × 3 = 9).</li>
      </ul>
    </div>

    ${notaBanca('a SBP usa <strong>4 a 6 meses</strong> para a duplicação; a faixa clássica (4-5) fica no limite inferior dela. Em prova, "4 meses" e "~5 meses" são ambos aceitos. A triplicação aos 12 meses é idêntica nas duas referências.')}

    <div class="prose">
      <h3 class="topic-h">O paradoxo dos 30 g/dia</h3>
      <p>No 1º trimestre, a criança ganha em torno de <strong>25 a 30 g/dia</strong> — e é o que mais cai em g/dia. Aqui mora uma aparente contradição: 30 g/dia × 30 dias = <strong>900 g</strong> no 1º mês, mas o ganho de referência é <strong>700 g/mês</strong>. Não há erro. A estimativa em g/dia não desconta a perda fisiológica dos primeiros dias nem outras perdas. O g/dia é um dado mais <strong>bruto</strong>, útil para avaliar pequenos intervalos de tempo; o g/mês já vem "líquido". Os dois convivem.</p>
    </div>

    ${notaBanca('a SBP fixa <strong>30 g/dia</strong> no 1º trimestre (o limite superior da faixa clássica coincide). Para os trimestres seguintes a SBP tabela 20/15/10 g/dia — não cobrados aqui.')}

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text">"Sete-seis-cinco… e o degrau pro três." O quarto trimestre é o traidor da sequência.</p>
    </aside>

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text">O <strong>degrau</strong> (300, não 400) e o <strong>paradoxo 30 g/dia × 30 ≠ 700 g/mês</strong> são os dois pontos preferidos da banca no ganho ponderal.</p>
      </div>
    </aside>

    ${med({
      file: 'p4-curva-peso-1ano.png',
      alt: 'Gráfico oficial da OMS de peso para a idade de meninos de 0 a 5 anos, com curvas de escore-z preta, vermelha e verde, subida íngreme no primeiro ano seguida de desaceleração.',
      achado: 'WHO Child Growth Standards — Peso × Idade, meninos, 0 a 5 anos (escore-z). A curva sobe rápido no 1º ano e desacelera em degraus decrescentes.',
      fonte: 'WHO Child Growth Standards, weight-for-age',
      licenca: 'CC BY-NC-SA 3.0 IGO (uso educacional)'
    })}

    ${quiz('p4', 'Os números do ganho ponderal e os dois pontos onde a banca arma.', [
      {
        stem: 'A sequência de ganho ponderal por trimestre no 1º ano (referência clássica) é:',
        alts: [
          { t: '700 - 600 - 500 - 400 g/mês', correct: false, why: 'É a armadilha da sequência "lisa" — o erro mais comum, pois ignora o degrau.' },
          { t: '700 - 600 - 500 - 300 g/mês', correct: true, why: 'Certa. Acerta a sequência clássica com o degrau no fim (4º tri cai para 300).' },
          { t: '700 - 500 - 400 - 350 g/mês', correct: false, why: 'É a tabela da SBP — correta só se a questão pedir "segundo a SBP", mas não a referência clássica.' },
          { t: '600 - 500 - 400 - 300 g/mês', correct: false, why: 'Inventa o 1º trimestre errado (começa em 700).' },
        ]
      },
      {
        stem: 'Uma criança nasceu com 3,2 kg. Pela regra, ao completar 12 meses ela deve pesar aproximadamente:',
        alts: [
          { t: '6,4 kg', correct: false, why: 'É a duplicação (~4-6 meses), não os 12 meses.' },
          { t: '8,0 kg', correct: false, why: 'Não corresponde a múltiplo correto.' },
          { t: '9,6 kg', correct: true, why: 'Certa. Triplica aos 12 meses → 3,2 × 3 = 9,6 kg.' },
          { t: '12,8 kg', correct: false, why: 'Seria quadruplicar — não é a regra.' },
        ]
      },
      {
        stem: '30 g/dia × 30 dias dá 900 g no 1º mês, mas o ganho de referência é 700 g/mês. Isso ocorre porque:',
        alts: [
          { t: 'Há um erro nas tabelas oficiais', correct: false, why: 'Nega o consenso sem motivo.' },
          { t: 'O g/dia não desconta a perda fisiológica e outras perdas', correct: true, why: 'Certa. O g/dia é estimativa bruta; o g/mês já é líquido das perdas — granularidade, não contradição.' },
          { t: 'A criança ganha mais peso do que o esperado sempre', correct: false, why: 'Inverteria a lógica do dado.' },
          { t: 'O g/mês está subestimado', correct: false, why: 'O g/mês é o valor de referência líquido — não está subestimado.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 5 — E7 Comparação chocante ===================== */
  P.push(page('p5', 5, `
    ${tag('height', 'Estatura · crônico & técnica')}
    ${chips(['crônico', 'comprimento × altura', 'deitado até 2 anos', '0,7 cm'])}

    <section class="opener opener--vs" aria-label="Comparação de abertura">
      <div class="opener__vs-grid">
        <div class="opener__vs-side">
          <h3>Deitada</h3>
          <p>A mesma criança, medida deitada, é cerca de <strong>0,7 cm mais alta</strong>.</p>
        </div>
        <div class="opener__vs-divider" aria-hidden="true">vs</div>
        <div class="opener__vs-side">
          <h3>Em pé</h3>
          <p>Em pé, a gravidade "encolhe" — e o peso despenca num resfriado, mas a estatura nem se mexe.</p>
        </div>
      </div>
      <p class="opener__vs-asterisk">Mesma criança, números diferentes. Por quê? É o que a página resolve.</p>
    </section>

    <h1 class="page-title">Estatura: por que deitado a criança é mais alta</h1>

    <div class="prose">
      <h3 class="topic-h">Estatura fala do crônico, não do agudo</h3>
      <p>A estatura é um bom parâmetro, mas <strong>não para alterações agudas</strong> — a criança demora a alterar a estatura. Justamente por ser lenta, ela é interessante para <strong>doenças crônicas</strong>: um processo crônico de má absorção de nutriente gera variação de estatura ao longo do tempo, servindo de pista para suspeitar de algo arrastado em curso. Eis o par perfeito com o peso: <span class="hl-bad">peso = agudo</span>, <span class="hl-warn">estatura = crônico</span>. Uma criança que perdeu peso recentemente teve algo agora; uma criança baixa para a idade carrega algo há tempo.</p>

      <h3 class="topic-h">Comprimento × altura: deitado até 2 anos</h3>
      <p>A estatura mede-se de duas formas, com dois nomes:</p>
      <ul>
        <li>Criança <strong>deitada</strong> → chama-se <strong>comprimento</strong>.</li>
        <li>Criança <strong>em pé</strong> → chama-se <strong>altura</strong>.</li>
      </ul>
      <p>A regra de quando usar cada um: <strong>até 2 anos</strong>, mede-se deitada (régua antropométrica horizontal — comprimento); <strong>depois dos 2 anos</strong>, em pé (régua vertical — altura). Medir a criança pequena deitada é um momento delicado da consulta: ela chora e se debate, é difícil — mas tem que ser assim até os 2 anos.</p>
    </div>

    ${svgPiso(5, { caption: 'comparador deitado × em pé — alterne a posição e veja a diferença de +0,7 cm aplicada/removida pela gravidade.', hint: 'Toggle acessível; valores anunciados por leitor de tela.' })}

    <div class="prose">
      <h3 class="topic-h">Os 0,7 cm que já caíram em prova</h3>
      <p>As medidas deitada e em pé têm equivalência, mas <strong>não são iguais</strong>: a deitada é <strong>maior</strong>. O motivo é a gravidade — em pé, ela empurra o corpo para baixo e "encolhe" a pessoa. A diferença é de cerca de <strong>0,7 cm</strong>: deitada a criança tem ~0,7 cm a mais do que em pé. Essa equivalência importa para montar tabela de conversão e não superestimar nem subestimar ao trocar de método de medida. E não é teórico: a variação de 0,7 cm <strong>já caiu em questão de prova recente</strong>.</p>
    </div>

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Comprimento</h4><p>Deitado, até 2 anos — e é o <strong>maior</strong> (+0,7 cm).</p></div>
        <div class="dont-confuse__side"><h4>Altura</h4><p>Em pé, depois dos 2 anos — o <strong>menor</strong>. O nome muda com a posição; o número também muda em 0,7 cm.</p></div>
      </div>
    </div>

    ${med({
      file: 'p5-estadiometro-crianca.jpg',
      alt: 'Criança em pé sobre a base de um estadiômetro encostada na parede, com uma profissional agachada à frente, em clínica.',
      achado: 'Aferição de estatura em pé (altura) em criança maior de 2 anos sobre plataforma de estadiômetro — depois dos 2 anos, mede-se em pé.',
      fonte: 'USDA Food and Nutrition Service (WIC), San Diego',
      licenca: 'Domínio público',
      tarja: 'p5'
    })}

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text">Trocar comprimento por altura, ou esquecer que <strong>deitado é o maior</strong>, é o erro clássico — a banca já cobrou os 0,7 cm diretamente.</p>
      </div>
    </aside>

    ${quiz('p5', 'Contraste temporal, técnica e a equivalência de 0,7 cm.', [
      {
        stem: 'A estatura é o parâmetro mais indicado para suspeitar de:',
        alts: [
          { t: 'Um resfriado iniciado há 2 dias', correct: false, why: 'Agudo — quem sente o agudo é o peso.' },
          { t: 'Uma desidratação aguda', correct: false, why: 'Também agudo; a estatura não se mexe em horas/dias.' },
          { t: 'Um processo crônico de má absorção', correct: true, why: 'Certa. A estatura só se altera com o tempo, então variação dela aponta processo crônico.' },
          { t: 'Uma infecção respiratória aguda', correct: false, why: 'Agudo — território do peso.' },
        ]
      },
      {
        stem: 'Sobre a medida da estatura, é correto afirmar:',
        alts: [
          { t: 'Até 2 anos mede-se em pé (altura)', correct: false, why: 'Inverte o corte: deitado até 2 anos.' },
          { t: 'Deitado a criança mede ~0,7 cm a MENOS que em pé', correct: false, why: 'Inverte o sinal — deitado é maior, não menor.' },
          { t: 'Até 2 anos mede-se deitada (comprimento), ~0,7 cm maior que em pé', correct: true, why: 'Certa. Acerta nos dois pontos: comprimento até 2 anos e deitado ~0,7 cm maior.' },
          { t: 'Comprimento e altura dão exatamente o mesmo valor', correct: false, why: 'Ignora a diferença de 0,7 cm.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 6 — E1 Pergunta central ===================== */
  P.push(page('p6', 6, `
    ${tag('height', 'Ganho de estatura · ano a ano')}
    ${chips(['50 cm ao nascer', '+25 cm (15+10)', 'metade no 2º ano', '7-8 / 6-7 cm/ano'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Se o peso desacelera em degraus, a altura faz o mesmo — e quanto exatamente a criança ganha por ano?</p>
    </section>

    <h1 class="page-title">Quanto a criança cresce em altura, ano a ano</h1>

    <div class="prose">
      <h3 class="topic-h">50 cm ao nascer, +25 no 1º ano</h3>
      <p>A criança nasce, em média, com cerca de <strong>50 cm</strong> — valor médio, não regra. No 1º ano, ganha cerca de <strong>50% da estatura de nascimento</strong>: 50% de 50 cm ≈ <strong>25 cm</strong>. Ou seja, sai de ~50 e chega a ~75 cm ao fim do 1º ano. Esse ganho de 25 cm é o número-âncora da estatura.</p>

      <h3 class="topic-h">15 + 10: a desaceleração dentro do 1º ano</h3>
      <p>A mesma lógica "rápido e desacelerado" reparte esses 25 cm de forma <strong>desigual</strong> dentro do 1º ano: <strong>1º semestre 15 cm, 2º semestre 10 cm</strong> (15 + 10 = 25). Cresce mais rápido na primeira metade, como sempre.</p>
      <div class="seq" aria-label="Ganho de estatura no 1º ano por semestre">
        <div class="seq__step"><div class="seq__num">15</div><div class="seq__lbl">1º semestre (cm)</div></div>
        <div class="seq__step"><div class="seq__num">10</div><div class="seq__lbl">2º semestre (cm)</div></div>
        <div class="seq__step"><div class="seq__num">25</div><div class="seq__lbl">total 1º ano</div></div>
      </div>

      <h3 class="topic-h">Metade no 2º ano</h3>
      <p>No <strong>2º ano</strong>, a criança ganha em média <strong>metade</strong> do que ganhou no 1º: metade de 25 cm ≈ <strong>12,5 cm</strong>. A desaceleração continua ano a ano.</p>
    </div>

    ${svgPiso(6, { caption: 'timeline de estatura — avance a idade e veja a estatura acumular (50 → 75 → ~87,5 → reta de 7-8/6-7 cm/ano), com a parcela de cada período destacada.', hint: 'Setas avançam a idade; valor anunciado por leitor de tela.' })}

    <div class="prose">
      <h3 class="topic-h">Velocidade pré-escolar × escolar</h3>
      <p>A partir daí o crescimento deixa de ser muito rápido e passa a ser <strong>constante e linear</strong> — e ganha um nome próprio: <span class="term">velocidade de crescimento</span> (quanto a criança ganha por ano). Dois números para guardar:</p>
      <ul>
        <li><strong>Pré-escolar (≈2 a 5 anos): 7 a 8 cm/ano.</strong></li>
        <li><strong>Escolar (após 5 anos, antes da puberdade): 6 a 7 cm/ano.</strong></li>
      </ul>
      <p>Memorize <strong>especialmente a do escolar, 6 a 7 cm/ano</strong> — ela é a chave para explicar um distúrbio do crescimento mais adiante. No pré-escolar e no escolar o crescimento já não dá saltos; vira uma reta.</p>
    </div>

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text">"Metade no 1º ano (25), metade disso no 2º (12,5), depois uma reta de 7-8 e 6-7."</p>
    </aside>

    ${med({
      file: 'p6-medindo-estatura.jpg',
      alt: 'Profissional de saúde mede a altura de uma criança em pé encostada em uma régua vertical de parede, posicionando a mão sobre a cabeça da criança.',
      achado: 'Medida de estatura em pé contra régua antropométrica vertical, com alinhamento do vértice da cabeça — a técnica que acompanha a velocidade de crescimento ano a ano.',
      fonte: 'MC3 Samantha J. Webb, U.S. Navy (Pacific Partnership 2013)',
      licenca: 'Domínio público',
      tarja: 'p6'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Uma criança que sai da velocidade esperada (cresce &lt; 6 cm/ano no escolar, por exemplo) acende a suspeita de distúrbio de crescimento.</p>
    </aside>

    ${quiz('p6', 'Os números da estatura, derivados pela mesma desaceleração.', [
      {
        stem: 'Uma criança nasce com 50 cm. Pela regra, ao completar 1 ano ela deve medir aproximadamente:',
        alts: [
          { t: '60 cm', correct: false, why: 'Subestima — o ganho é ~25 cm (50% de 50).' },
          { t: '65 cm', correct: false, why: 'Ainda subestima o ganho de 25 cm.' },
          { t: '75 cm', correct: true, why: 'Certa. 50 + 25 = 75 cm.' },
          { t: '100 cm', correct: false, why: 'Dobraria a estatura — não é a regra do 1º ano.' },
        ]
      },
      {
        stem: 'A velocidade de crescimento no escolar (antes da puberdade) é, classicamente:',
        alts: [
          { t: '7 a 8 cm/ano', correct: false, why: 'É a velocidade do pré-escolar.' },
          { t: '6 a 7 cm/ano', correct: true, why: 'Certa — e é justamente o número a memorizar para distúrbios de crescimento.' },
          { t: '12,5 cm/ano', correct: false, why: 'É o ganho do 2º ano inteiro, não velocidade escolar.' },
          { t: '25 cm/ano', correct: false, why: 'É o ganho do 1º ano.' },
        ]
      },
      {
        stem: 'O ganho de 25 cm do 1º ano divide-se por semestre como:',
        alts: [
          { t: '12,5 + 12,5 cm', correct: false, why: 'Ignora a desaceleração (não é metade-metade).' },
          { t: '10 + 15 cm', correct: false, why: 'Inverte a ordem — o 1º semestre cresce mais.' },
          { t: '15 + 10 cm', correct: true, why: 'Certa. 15 no 1º semestre, 10 no 2º, somando 25 — fiel ao "rápido e desacelerado".' },
          { t: '20 + 5 cm', correct: false, why: 'Exagera o degrau entre os semestres.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 7 — E8 Erro desmontado ===================== */
  P.push(page('p7', 7, `
    ${tag('pc', 'Perímetro cefálico · neurodesenvolvimento')}
    ${chips(['mede o cérebro', 'glabela → occipital', '2-1-0,5 cm/mês', '~12 cm/ano'])}

    <section class="opener opener--bust" aria-label="Erro comum desmontado">
      <p class="opener__bust-tag">Erro comum desmontado</p>
      <p class="opener__bust-wrong">"O perímetro cefálico é o número menos importante — dá para deixar em branco."</p>
      <p class="opener__bust-right">Muita caderneta vem com o PC em branco — e isso é um erro. O número que parece o menos importante é, na verdade, <strong>o que mede o cérebro</strong>.</p>
    </section>

    <h1 class="page-title">Perímetro cefálico: o número que mede o cérebro</h1>

    <div class="prose">
      <h3 class="topic-h">Por que esquecer o PC é um erro</h3>
      <p>O perímetro cefálico é frequentemente subestimado e deixado de lado — muitas cadernetas têm o PC não avaliado. Esse é um erro relevante, porque o PC é um <strong>dado de neurodesenvolvimento</strong>. A medida da cabeça reflete o crescimento da calota craniana, e o crescimento da calota reflete o crescimento <strong>do que está dentro dela: o cérebro</strong>. PC que cresce bem indica cérebro se desenvolvendo bem. Por isso ele não pode ser esquecido.</p>

      <h3 class="topic-h">Como se mede: glabela ao occipital</h3>
      <p>O PC é a medida da cabeça, obtida passando uma fita da <strong>glabela até o occipital</strong>, medindo quanto a calota craniana aumenta ao longo dos primeiros <strong>dois anos</strong> de vida.</p>

      <h3 class="topic-h">A regra do "diminuir pela metade": 2-1-0,5</h3>
      <p>O ganho de PC no 1º ano segue a <strong>mesma lógica</strong> do peso e da estatura: rápido e desacelerado. A criança nasce com PC em torno de <strong>~35 cm</strong> (varia) e ganha, ao longo de <strong>todo o 1º ano, cerca de 12 cm</strong>. A regra de memória é "<strong>diminuir pela metade</strong>":</p>
      <div class="seq" aria-label="Ganho de perímetro cefálico no 1º ano">
        <div class="seq__step"><div class="seq__num">2</div><div class="seq__lbl">1º tri (cm/mês)</div></div>
        <div class="seq__step"><div class="seq__num">1</div><div class="seq__lbl">2º tri</div></div>
        <div class="seq__step"><div class="seq__num">0,5</div><div class="seq__lbl">3º tri</div></div>
        <div class="seq__step"><div class="seq__num">0,5</div><div class="seq__lbl">4º tri</div></div>
      </div>
      <p>Cada degrau é metade do anterior: 2 → 1 → 0,5. Simples e fiel à desaceleração.</p>
    </div>

    ${notaBanca('a SBP não publica a regra trimestral 2-1-0,5; ela dá o <strong>total de 10 a 12 cm no 1º ano</strong> e uma tabela por idade. O atalho 2-1-0,5 reproduz bem o total (≈12 cm), mas superestima ~1 cm no 1º trimestre. O dado mais seguro para marcar em prova é o <strong>total de 10-12 cm no 1º ano</strong>.')}

    ${svgPiso(7, { caption: 'contador de PC — escolha o mês e veja o PC acumular aplicando 2-1-0,5, com o 2º semestre destacado como DOIS trimestres a 0,5.', hint: 'Teclado acessível; total anunciado por leitor de tela.' })}

    <div class="prose">
      <h3 class="topic-h">A pegadinha do segundo semestre</h3>
      <p>Cuidado com a contagem: o <strong>segundo semestre contém dois trimestres</strong> (3º e 4º), e <strong>ambos</strong> ficam em 0,5 cm/mês. Quem confunde "trimestre" com "semestre" erra a conta. Não é "0,5 só no 4º trimestre" — é 0,5 nos dois últimos trimestres.</p>
    </div>

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text">"Dois, um, meio — o PC desce pela metade a cada degrau."</p>
    </aside>

    ${med({
      file: 'p7-caderneta-perimetro-cefalico.png',
      alt: 'Gráfico de perímetro cefálico para a idade de meninos de 0 a 2 anos da Caderneta de Saúde da Criança, com curvas coloridas de escore-z (vermelha e verde), eixo vertical em centímetros e eixo horizontal em meses.',
      achado: 'Caderneta de Saúde da Criança (MS) — gráfico Perímetro Cefálico × Idade (0 a 2 anos), curvas de escore-z; o PC é a terceira medida obrigatória do menor de 2 anos.',
      fonte: 'Caderneta de Saúde da Criança, 12ª ed. Ministério da Saúde, 2023',
      licenca: 'Material oficial do MS (público)'
    })}

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text">Contar o 2º semestre como um trimestre só (e perder 3 cm de conta) é o erro armado; e cobrar o <strong>total (~12 cm / SBP 10-12)</strong> é o ângulo seguro da banca.</p>
      </div>
    </aside>

    ${quiz('p7', 'Função, regra 2-1-0,5, total e a pegadinha do semestre.', [
      {
        stem: 'O perímetro cefálico é importante porque reflete:',
        alts: [
          { t: 'O estado nutricional agudo', correct: false, why: 'Isso é o peso.' },
          { t: 'O crescimento do cérebro / neurodesenvolvimento', correct: true, why: 'Certa. A calota cresce porque o cérebro cresce — PC é dado de neurodesenvolvimento.' },
          { t: 'A massa muscular da criança', correct: false, why: 'Não é o que a calota craniana mede.' },
          { t: 'A reserva de gordura', correct: false, why: 'Também não — isso se aproxima do IMC, não do PC.' },
        ]
      },
      {
        stem: 'A regra do ganho de PC no 1º ano ("diminuir pela metade") é:',
        alts: [
          { t: '1 - 0,5 - 0,25 cm/mês', correct: false, why: 'Começa baixo demais.' },
          { t: '2 - 1 - 0,5 cm/mês', correct: true, why: 'Certa. 2 (1º tri) → 1 (2º tri) → 0,5 (2º semestre), totalizando ~12 cm.' },
          { t: '2 - 2 - 1 cm/mês', correct: false, why: 'Não desacelera no 2º trimestre.' },
          { t: '3 - 2 - 1 cm/mês', correct: false, why: 'Não segue o "metade a cada degrau".' },
        ]
      },
      {
        stem: 'No 2º semestre do 1º ano, o ganho de PC é:',
        alts: [
          { t: '0,5 cm/mês apenas no 4º trimestre', correct: false, why: 'É a pegadinha da página — o semestre tem dois trimestres, não um.' },
          { t: '0,5 cm/mês nos dois trimestres (3º e 4º)', correct: true, why: 'Certa. Ambos os trimestres do 2º semestre ficam em 0,5 cm/mês.' },
          { t: '1 cm/mês nos dois trimestres', correct: false, why: 'É o valor do 2º trimestre, não do 2º semestre.' },
          { t: 'Não há ganho de PC no 2º semestre', correct: false, why: 'Falso — o PC continua crescendo (0,5 cm/mês).' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 8 — E5 Meta + checklist · HERÓI A ===================== */
  P.push(page('p8', 8, `
    ${tag('sys', 'Síntese · Herói A')}
    ${chips(['rápido e desacelerado', 'tri-parâmetro', 'totais do 1º ano', 'onde a prova arma'])}

    <section class="opener opener--checklist" aria-label="Meta da página">
      <p class="opener__checklist-title">Ao final desta página você vai ler de cabeça:</p>
      <ul class="opener__checklist">
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>Peso: <code>700-600-500-300</code> g/mês e dobra/triplica</span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>Estatura: <code>+25 cm (15+10)</code>, metade no 2º ano, velocidade 7-8 / 6-7</span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>PC: <code>2-1-0,5</code> cm/mês, ~12 cm/ano</span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>A lógica única que gera os três: <strong>rápido e desacelerado</strong></span></li>
      </ul>
    </section>

    <h1 class="page-title">O mapa da desaceleração: três parâmetros, uma só lógica</h1>

    <div class="prose">
      <h3 class="topic-h">A lógica única em uma imagem</h3>
      <p>Os três parâmetros parecem três decorebas separadas, mas são <strong>uma só lógica vestida de três jeitos</strong>: rápido e desacelerado. Cada um começa rápido e perde força em degraus. O peso cai 700 → 600 → 500 → 300. A estatura reparte 25 cm em 15 + 10 e depois cai pela metade ano a ano. O PC desce 2 → 1 → 0,5. Se você ancora a frase-mestra, não decora três tabelas — você <strong>deriva</strong> as três.</p>

      <h3 class="topic-h">Lendo os três eixos juntos</h3>
      <p>Lado a lado, no 1º ano:</p>
      <table class="comparison-table">
        <thead><tr><th>Parâmetro</th><th>1º tri</th><th>2º tri</th><th>3º tri</th><th>4º tri</th><th>Total 1º ano</th><th>Âncoras</th></tr></thead>
        <tbody>
          <tr><td><strong>Peso</strong></td><td>700 g/mês</td><td>600 g/mês</td><td>500 g/mês</td><td class="col-bad">300 g/mês</td><td>triplica (×3)</td><td>dobra ~4-5m</td></tr>
          <tr><td><strong>Estatura</strong></td><td>15 cm (1º sem.)</td><td>—</td><td>10 cm (2º sem.)</td><td>—</td><td><strong>+25 cm</strong></td><td>metade no 2º ano (~12,5)</td></tr>
          <tr><td><strong>PC</strong></td><td>2 cm/mês</td><td>1 cm/mês</td><td>0,5 cm/mês</td><td>0,5 cm/mês</td><td><strong>~12 cm</strong></td><td>2 anos de avaliação</td></tr>
        </tbody>
      </table>
      <p>E adiante: a estatura ganha <strong>velocidade</strong> (pré-escolar 7-8, escolar 6-7 cm/ano). Os três contam a mesma história de freio progressivo.</p>
    </div>

    <figure class="figure-svg figure-svg__embed">
      <div class="hero-stage figure-svg__stage" id="heroA-stage" data-hs-stage="heroA">
        ${hero('A-p8')}
      </div>
      <div class="hero-controls">
        <label class="toggle-pill">
          <input type="checkbox" id="heroA-logic">
          <span class="sw" aria-hidden="true"></span>
          <span>Mostrar lógica única <span class="toggle-pill__sub">(sobrepõe a curva de desaceleração comum)</span></span>
        </label>
        <span class="hero-hint">Toque os números de cada eixo para a sequência e a pegadinha.</span>
      </div>
      <div class="hotspot-detail" data-hs-detail-for="heroA" aria-live="polite">
        <div class="hotspot-detail__label">Mapa da desaceleração</div>
        <p class="hotspot-detail__text">Toque um eixo (peso, estatura, PC) ou um ponto de pegadinha (o degrau dos 300; o 2º semestre do PC) para ler a sequência e o que a banca arma.</p>
      </div>
      <figcaption><strong>Síntese —</strong> os três parâmetros são a mesma curva de desaceleração em três escalas. Hotspots nos três eixos e nos pontos de pegadinha; o toggle sobrepõe a curva única.</figcaption>
    </figure>

    <div class="prose">
      <h3 class="topic-h">Onde a prova arma</h3>
      <p>Três armadilhas favoritas, todas no cruzamento:</p>
      <ol>
        <li><strong>O degrau do peso</strong> (300, não 400) — quem decora "liso" erra.</li>
        <li><strong>O paradoxo do g/dia</strong> (30 × 30 = 900 ≠ 700) — esquecer a perda fisiológica.</li>
        <li><strong>O 2º semestre do PC</strong> (dois trimestres a 0,5, não um).</li>
      </ol>
    </div>

    ${notaBanca('os totais são o terreno mais seguro contra a SBP: peso triplica aos 12 m (igual nas duas referências); PC 10-12 cm no 1º ano (SBP); estatura ~25 cm (consenso). Onde a referência clássica e a SBP divergem é nos g/mês por trimestre do peso (clássica 700-600-500-300 × SBP 700-500-400-350).')}

    ${med({
      file: 'p8-caderneta-comprimento-idade.png',
      alt: 'Gráfico de comprimento para a idade da Caderneta da Criança, de 1 a 2 anos, com curvas coloridas de escore-z e legenda em português.',
      achado: 'Caderneta da Criança — gráfico Comprimento × Idade (escore-z, OMS 2006): a mesma desaceleração que rege peso e PC, vista na estatura.',
      fonte: 'Caderneta de Saúde da Criança, 12ª ed. Ministério da Saúde, 2023',
      licenca: 'Material oficial do MS (público)'
    })}

    <aside class="op-summary">
      <p class="op-summary__label">Resumo operacional</p>
      <p>Uma frase ("rápido e desacelerado") + três sequências (700-600-500-300 · 15+10 · 2-1-0,5) cobrem o crescimento normal inteiro.</p>
    </aside>

    ${quiz('p8', 'A lógica única e os totais do 1º ano.', [
      {
        stem: 'A "lógica única" que governa peso, estatura e PC no 1º ano é:',
        alts: [
          { t: 'Crescimento linear e constante', correct: false, why: 'Descreve o pré-escolar/escolar, não o 1º ano.' },
          { t: 'Crescimento rápido e desacelerado', correct: true, why: 'Certa. Rápido no começo, freando em degraus — a frase-mestra que gera as três sequências.' },
          { t: 'Crescimento lento que acelera', correct: false, why: 'Inverte a lógica.' },
          { t: 'Crescimento em saltos aleatórios', correct: false, why: 'Nega a regularidade dos degraus.' },
        ]
      },
      {
        stem: 'Qual conjunto de "totais do 1º ano" está correto?',
        alts: [
          { t: 'Peso dobra · estatura +25 cm · PC ~12 cm', correct: false, why: 'Erra o peso: aos 12 m ele triplica; dobrar é ~4-5 m.' },
          { t: 'Peso triplica · estatura +25 cm · PC ~12 cm', correct: true, why: 'Certa. Acerta os três totais do 1º ano.' },
          { t: 'Peso triplica · estatura +50 cm · PC ~6 cm', correct: false, why: 'Dobra a estatura e corta o PC pela metade.' },
          { t: 'Peso dobra · estatura +12,5 cm · PC ~12 cm', correct: false, why: 'Usa a duplicação e o ganho do 2º ano de estatura.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 9 — E2 Dado impactante ===================== */
  P.push(page('p9', 9, `
    ${tag('sys', 'Sistema de leitura · OMS')}
    ${chips(['escore-Z', 'cor = desvio-padrão', 'percentil', 'soma 100'])}

    <figure class="opener opener--stat" aria-label="Dado de abertura">
      <div class="opener__number">7</div>
      <div class="opener__context">Cada cor no gráfico da caderneta não é decoração — é um <strong>desvio-padrão exato</strong>. <strong>Sete curvas</strong>, de Z+3 a Z-3, e a OMS já fez o trabalho por você.</div>
    </figure>

    <h1 class="page-title">Escore-Z e percentil: o sistema que a OMS te dá pronto</h1>

    <div class="prose">
      <h3 class="topic-h">O gráfico da caderneta: cores de cima para baixo</h3>
      <p>Existem várias formas de análise, mas as que mais se fazem e mais se cobram são as recomendações do <strong>Ministério da Saúde</strong> e da <strong>Sociedade Brasileira de Pediatria</strong> — que são congruentes, falam a mesma coisa, e mandam analisar pelos <strong>gráficos da OMS</strong> (azuis para meninos, rosa para meninas), presentes na caderneta. De cima para baixo, o gráfico tem: uma <span class="hl-bad">curva preta superior</span>, duas <span class="hl-bad">vermelhas</span>, duas <span class="hl-warn">amarelas</span>, uma <span class="hl-good">verde central</span>, e embaixo o espelho — amarela, vermelha e preta inferior.</p>

      <h3 class="topic-h">Escore-Z: distância da média em desvios</h3>
      <p>Essas curvas medem o <span class="term">escore-Z</span>: o quanto a criança, naquele valor, está perto ou longe da <strong>média</strong> para a idade dela. <strong>Z0 é a média</strong>. Acima da média a criança se distancia para cima; abaixo, para baixo. Em desvios-padrão: Z+3 = 3 acima · Z+2 = 2 acima · Z+1 = 1 acima · Z0 = na média; para baixo espelha (Z-1, Z-2, Z-3). O escore-Z é o parâmetro <strong>mais cobrado</strong> em prova — e é fácil de construir.</p>

      <h3 class="topic-h">Cada cor é um Z</h3>
      <p>Cada escore-Z corresponde a uma curva (acima da média): <strong>Z+3 = preta de cima</strong>, <strong>Z+2 = vermelha de cima</strong>, <strong>Z+1 = amarela de cima</strong>. Para baixo, a mesma lógica espelhada (amarela de baixo = Z-1, vermelha de baixo = Z-2, preta de baixo = Z-3). A curva <span class="hl-good">verde central</span> é a média (Z0).</p>
    </div>

    ${svgPiso(9, { caption: 'gráfico OMS interativo — clique numa curva e leia o Z, a cor, o percentil equivalente e a soma-100 com a curva espelhada; o slider posiciona um ponto-criança.', hint: 'Tab entre curvas, Enter revela; slider por teclado com aria-valuetext.' })}

    <div class="prose">
      <h3 class="topic-h">Percentil: a soma que sempre dá 100</h3>
      <p>Algumas questões não usam escore-Z e cobram o <span class="term">percentil</span>. Ele não fala rigorosamente da mesma coisa: o percentil avalia um valor <strong>mediano</strong> (P50) em vez de <strong>médio</strong> (diferença estatística), mas há correlação fidedigna entre os dois. As equivalências (acima): <strong>Z+3 ≈ P99,9 · Z+2 ≈ P97 · Z+1 ≈ P85 · Z0 = P50</strong>.</p>
      <p>E o mnemônico que resolve tudo: <strong>percentil fala de porcentagem, e a curva de cima completa 100% com a equivalente de baixo.</strong></p>
      <ul>
        <li>Amarela de cima P85 ↔ amarela de baixo <strong>P15</strong> (85 + 15 = 100)</li>
        <li>Vermelha de cima P97 ↔ vermelha de baixo <strong>P3</strong> (97 + 3 = 100)</li>
        <li>Preta de cima P99,9 ↔ preta de baixo <strong>~P0,1</strong> (99,9 + 0,1 = 100)</li>
      </ul>
      <p>Sabendo essas equivalências, nenhuma questão confunde a análise — peça Z ou percentil, a leitura é a mesma.</p>
    </div>

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Escore-Z</h4><p>Fala de <strong>média</strong> — distância em desvios-padrão.</p></div>
        <div class="dont-confuse__side"><h4>Percentil</h4><p>Fala de <strong>mediana</strong>. Correlacionam, mas não são a mesma grandeza estatística.</p></div>
      </div>
    </div>

    ${med({
      file: 'p9-caderneta-altura-idade.png',
      alt: 'Gráfico de altura para a idade de meninos de 2 a 5 anos, com curvas de escore-z preta, vermelha e verde e legenda explicando cada faixa.',
      achado: 'Caderneta da Criança — Altura × Idade (2 a 5 anos), curvas de escore-z: preta (±3), vermelha (±2), verde (0). Cada cor é um desvio-padrão.',
      fonte: 'Caderneta de Saúde da Criança, 12ª ed. Ministério da Saúde, 2023',
      licenca: 'Material oficial do MS (público)'
    })}

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text">A banca troca de moeda (pede percentil onde você esperava Z); o mnemônico da <strong>soma 100</strong> é o conversor.</p>
      </div>
    </aside>

    ${quiz('p9', 'A malha cor ↔ Z ↔ percentil.', [
      {
        stem: 'A curva verde central do gráfico da OMS corresponde a:',
        alts: [
          { t: 'Z+1 / P85', correct: false, why: 'É a amarela de cima.' },
          { t: 'Z0 / P50 (a média/mediana)', correct: true, why: 'Certa. Verde central = Z0 = P50, o eixo da normalidade.' },
          { t: 'Z-2 / P3', correct: false, why: 'É a vermelha de baixo.' },
          { t: 'Z+3 / P99,9', correct: false, why: 'É a preta de cima.' },
        ]
      },
      {
        stem: 'A curva amarela de cima é Z+1 ≈ P85. Sua espelhada (amarela de baixo) corresponde ao percentil:',
        alts: [
          { t: 'P50', correct: false, why: 'É o centro (verde).' },
          { t: 'P3', correct: false, why: 'É a vermelha de baixo (espelho da P97).' },
          { t: 'P15', correct: true, why: 'Certa. Pela soma 100: 85 + 15 = 100, então amarela de baixo = P15.' },
          { t: 'P85', correct: false, why: 'Repetiria a curva de cima.' },
        ]
      },
      {
        stem: 'Sobre escore-Z e percentil, é correto:',
        alts: [
          { t: 'São a mesma grandeza estatística', correct: false, why: 'Ignora a diferença estatística (média × mediana).' },
          { t: 'Z fala de mediana e percentil de média', correct: false, why: 'Inverte os conceitos.' },
          { t: 'Z fala de média e percentil de mediana, mas correlacionam', correct: true, why: 'Certa. Grandezas diferentes com correspondência fidedigna.' },
          { t: 'Não há relação entre eles', correct: false, why: 'Nega a correlação confiável.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 10 — E1 Pergunta central ===================== */
  P.push(page('p10', 10, `
    ${tag('weight', 'Classificação · P/I e E/I')}
    ${chips(['3 índices', 'peso/idade 0-10a', 'baixo × muito baixo', 'prefixo "muito"'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Por que existe "muito baixo peso" mas não existe "muito peso para a idade"?</p>
    </section>

    <h1 class="page-title">Peso e estatura para a idade: e o prefixo "muito"</h1>

    <div class="prose">
      <h3 class="topic-h">Os três índices (e o quarto que você ignora)</h3>
      <p>Avaliado o crescimento, falta <strong>classificar</strong>: dizer o quanto a criança está nutricionalmente certa ou errada, para cima ou para baixo. São <strong>três índices principais</strong>: <strong>peso para a idade, estatura para a idade e IMC para a idade</strong>. Existe um quarto, <strong>peso para estatura</strong>, mas ele não é tão relevante — foque nos três.</p>

      <h3 class="topic-h">Peso/idade: 0 a 10 anos</h3>
      <p>O peso para a idade é análise importante dos <strong>0 aos 10 anos</strong>. Os cortes:</p>
      <ul>
        <li>Acima de <strong>Z+2</strong> = <strong>peso elevado para a idade</strong> (não importa se passa do Z+3 ou não — <strong>não existe</strong> "muito peso para a idade"; só "peso elevado").</li>
        <li>Abaixo de <strong>Z-2</strong> mas <strong>não</strong> abaixo de Z-3 (faixa <span class="hl-bad">vermelha</span>) = <strong>baixo peso para a idade</strong>.</li>
        <li>Abaixo de <strong>Z-3</strong> (faixa preta) = <strong>muito baixo peso para a idade</strong>.</li>
      </ul>

      <h3 class="topic-h">Estatura/idade</h3>
      <p>A estatura para a idade segue a mesma estrutura abaixo da média:</p>
      <ul>
        <li>Abaixo de <strong>Z-2</strong>, não abaixo de Z-3 (vermelha) = <strong>baixa estatura para a idade</strong>.</li>
        <li>Abaixo de <strong>Z-3</strong> (preta) = <strong>muito baixa estatura para a idade</strong>.</li>
      </ul>
    </div>

    ${svgPiso(10, { caption: 'classificador peso/idade + estatura/idade — arraste o ponto pela curva e veja a nomenclatura correta (peso elevado / eutrofia / baixo / muito baixo).', hint: 'Teclado acessível; classificação anunciada por leitor de tela.' })}

    <div class="prose">
      <h3 class="topic-h">O paralelo da nomenclatura "muito"</h3>
      <p>Aqui está o padrão que responde à pergunta de abertura: abaixo do <strong>baixo peso</strong> vem <strong>muito baixo peso</strong>; abaixo da <strong>baixa estatura</strong> vem <strong>muito baixa estatura</strong>. O prefixo de agravamento é "<strong>muito</strong>". Mas para <strong>cima</strong>, no peso/idade, não há subdivisão: passou do Z+2, é "peso elevado", ponto. Por isso não existe "muito peso para a idade" — a graduação fina para cima fica por conta do IMC, na próxima página.</p>
    </div>

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text">"Para baixo, o agravamento é 'muito' (muito baixo peso, muito baixa estatura). Para cima, no peso/idade, só 'elevado'."</p>
    </aside>

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Baixo peso</h4><p>Z-2 a Z-3 (faixa vermelha) — um grau de alerta.</p></div>
        <div class="dont-confuse__side"><h4>Muito baixo peso</h4><p>Abaixo de Z-3 (faixa preta) — a faixa preta é sempre o extremo.</p></div>
      </div>
    </div>

    ${med({
      file: 'p10-caderneta-peso-idade-5a10.png',
      alt: 'Gráfico de peso para a idade de meninos de 5 a 10 anos, com curvas coloridas de escore-z indicando faixas de classificação.',
      achado: 'Caderneta da Criança — Peso × Idade (5 a 10 anos): faixa vermelha = baixo peso; faixa preta = muito baixo peso para a idade.',
      fonte: 'Caderneta de Saúde da Criança, 12ª ed. Ministério da Saúde, 2023',
      licenca: 'Material oficial do MS (público)'
    })}

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>A nomenclatura exata é o que a banca cobra na alternativa — trocar "baixo" por "muito baixo" custa a questão.</p>
    </aside>

    ${quiz('p10', 'Cortes de P/I e E/I e a lógica do "muito".', [
      {
        stem: 'Uma criança de 7 anos com peso/idade abaixo do Z-3 é classificada como:',
        alts: [
          { t: 'Baixo peso para a idade', correct: false, why: 'É a faixa Z-2 a Z-3 (vermelha), um grau acima.' },
          { t: 'Muito baixo peso para a idade', correct: true, why: 'Certa. Abaixo de Z-3 (preta) é o extremo, "muito baixo peso".' },
          { t: 'Peso elevado para a idade', correct: false, why: 'É o oposto (acima de Z+2).' },
          { t: 'Eutrófica', correct: false, why: 'Estaria dentro da faixa normal, não abaixo de Z-3.' },
        ]
      },
      {
        stem: 'Sobre o peso para a idade acima da média, é correto:',
        alts: [
          { t: 'Acima de Z+3 = "muito peso para a idade"', correct: false, why: 'Inventa um termo que não existe.' },
          { t: 'Acima de Z+2 = "peso elevado para a idade", sem subdivisão acima', correct: true, why: 'Certa. Passou de Z+2 é "peso elevado", e não há graduação fina acima nesse índice.' },
          { t: 'Acima de Z+2 = sobrepeso', correct: false, why: 'Confunde com a classificação de IMC, não de peso/idade.' },
          { t: 'Acima de Z+1 = peso elevado', correct: false, why: 'Erra o corte (é Z+2).' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 11 — E7 Comparação chocante ===================== */
  P.push(page('p11', 11, `
    ${tag('weight', 'IMC para a idade · bifurcação')}
    ${chips(['0-5 × 5-19', 'um degrau acima', 'eutrofia (verde)', 'magreza acentuada'])}

    <section class="opener opener--vs" aria-label="Comparação de abertura">
      <div class="opener__vs-grid">
        <div class="opener__vs-side">
          <h3>3 anos</h3>
          <p>Mesmo IMC, mesmo escore-Z: chama-se <strong>risco de sobrepeso</strong>.</p>
        </div>
        <div class="opener__vs-divider" aria-hidden="true">vs</div>
        <div class="opener__vs-side">
          <h3>8 anos</h3>
          <p>Mesmíssimo Z: agora chama-se <strong>sobrepeso</strong>. A idade muda o nome.</p>
        </div>
      </div>
      <p class="opener__vs-asterisk">O mesmo intervalo de Z, dois nomes — porque a faixa etária mudou. É o coração da página.</p>
    </section>

    <h1 class="page-title">IMC para a idade: a tabela que muda aos 5 anos</h1>

    <div class="prose">
      <h3 class="topic-h">Por que o IMC bifurca por idade</h3>
      <p>O IMC para a idade tem uma dificuldade a mais: <strong>acima da média</strong>, ele divide a criança em <strong>duas faixas etárias — 0 a 5 anos e 5 a 19 anos</strong> — e dá nomes diferentes ao mesmo intervalo de Z. Abaixo da média, não há divisão (isso facilita, e fica para o fim da página).</p>

      <h3 class="topic-h">Acima da média: um estágio de diferença</h3>
      <p>O padrão-mestre: <strong>a criança de 5 a 19 anos está sempre um estágio acima da de 0 a 5 anos no mesmo intervalo de curvas.</strong> Veja lado a lado:</p>
      <table class="comparison-table">
        <thead><tr><th>Intervalo de Z (faixa)</th><th>0 a 5 anos</th><th>5 a 19 anos</th></tr></thead>
        <tbody>
          <tr><td>Z+1 a Z+2 (amarela)</td><td>risco de sobrepeso</td><td>sobrepeso</td></tr>
          <tr><td>Z+2 a Z+3 (vermelha)</td><td>sobrepeso</td><td>obesidade</td></tr>
          <tr><td>Acima de Z+3 (preta)</td><td>obesidade</td><td>obesidade grave</td></tr>
        </tbody>
      </table>
      <p>A lógica de gravidade crescente: antes da obesidade vem o sobrepeso; antes do sobrepeso, o <strong>risco</strong> de sobrepeso; antes da obesidade grave, a obesidade. A faixa de 5-19 anos "sobe um degrau" em cada intervalo.</p>

      <h3 class="topic-h">Eutrofia: a faixa verde</h3>
      <p>A <span class="hl-good">eutrofia</span> é a faixa verde: criança <strong>acima do Z-2 e até o Z+1</strong> (não passa de Z+1 para cima nem cai abaixo de Z-2). E <strong>vale para as duas faixas etárias</strong> — a eutrofia não se divide por idade.</p>
    </div>

    ${svgPiso(11, { caption: 'tabela dinâmica de IMC/idade — escolha a faixa etária (0-5 ou 5-19) e arraste o escore-Z; veja a classificação e o "degrau" de diferença no mesmo Z.', hint: 'Teclado acessível; classificação anunciada por leitor de tela.' })}

    <div class="prose">
      <h3 class="topic-h">Abaixo da média: magreza sem divisão de idade</h3>
      <p>Abaixo da média, o IMC <strong>não</strong> divide por idade — facilita. Dois estados, valendo para qualquer idade:</p>
      <ul>
        <li>Abaixo de <strong>Z-2</strong>, não abaixo de Z-3 (vermelha) = <strong>magreza</strong>.</li>
        <li>Abaixo de <strong>Z-3</strong> (preta) = <strong>magreza acentuada</strong>.</li>
      </ul>
      <p>Repare no paralelo de nomenclatura: abaixo da magreza <strong>não</strong> vem "muita magreza", vem <strong>magreza acentuada</strong> (uma magreza muito intensa). É o mesmo espírito do "muito" do peso/idade, com a palavra "acentuada".</p>
    </div>

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text">"5-19 está sempre um degrau acima de 0-5 (risco → sobrepeso → obesidade → obesidade grave). Abaixo da média, só magreza e magreza acentuada, pra todo mundo."</p>
    </aside>

    ${med({
      file: 'p11-caderneta-imc-idade.png',
      alt: 'Gráfico de IMC para a idade da Caderneta da Criança com seis curvas coloridas (preta, vermelha, amarela, verde) e legenda das classificações de obesidade a magreza acentuada.',
      achado: 'Caderneta da Criança — IMC × Idade com as seis faixas: obesidade, sobrepeso, risco de sobrepeso, IMC adequado (verde), magreza e magreza acentuada. Curva amarela = +1 escore-z.',
      fonte: 'Caderneta de Saúde da Criança, 12ª ed. Ministério da Saúde, 2023',
      licenca: 'Material oficial do MS (público)'
    })}

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text">Dar a classificação de 0-5 para uma criança de 8 anos (ou vice-versa) é o erro armado; e trocar "magreza acentuada" por "muita magreza" derruba a questão.</p>
      </div>
    </aside>

    ${quiz('p11', 'A bifurcação por idade, a eutrofia comum e a magreza.', [
      {
        stem: 'Uma criança de 8 anos com IMC/idade entre Z+1 e Z+2 (faixa amarela) é classificada como:',
        alts: [
          { t: 'Risco de sobrepeso', correct: false, why: 'É a classificação dessa mesma faixa em 0-5 anos — a pegadinha da idade.' },
          { t: 'Sobrepeso', correct: true, why: 'Certa. 5-19 anos está um degrau acima, então amarela = sobrepeso.' },
          { t: 'Obesidade', correct: false, why: 'Seria Z+2 a Z+3 em 5-19, não a amarela.' },
          { t: 'Eutrofia', correct: false, why: 'Eutrofia é abaixo de Z+1.' },
        ]
      },
      {
        stem: 'A eutrofia no IMC/idade corresponde a:',
        alts: [
          { t: 'Z-2 a Z+1, válida para ambas as faixas etárias', correct: true, why: 'Certa. Acima de Z-2 e até Z+1, verde, sem divisão etária.' },
          { t: 'Z0 a Z+1, só para 0-5 anos', correct: false, why: 'Estreita errado o limite inferior e inventa divisão de idade.' },
          { t: 'Z-3 a Z-2, faixa vermelha', correct: false, why: 'Isso é magreza.' },
          { t: 'Z+1 a Z+2, faixa amarela', correct: false, why: 'Isso é risco de sobrepeso / sobrepeso.' },
        ]
      },
      {
        stem: 'Abaixo do Z-3 no IMC/idade, a classificação é:',
        alts: [
          { t: 'Muita magreza', correct: false, why: 'Usa o termo errado — "muita magreza" não existe.' },
          { t: 'Magreza acentuada', correct: true, why: 'Certa. Abaixo de Z-3 é "magreza acentuada", para qualquer idade.' },
          { t: 'Magreza grave para 0-5 e acentuada para 5-19', correct: false, why: 'Inventa divisão de idade que não existe abaixo da média.' },
          { t: 'Baixo peso', correct: false, why: 'Confunde com peso/idade.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 12 — E3 Caso (retomada) · HERÓI C ===================== */
  P.push(page('p12', 12, `
    ${tag('case', 'Integração diagnóstica · Herói C')}
    ${chips(['IMC = 9,8 ÷ 0,82²', 'baixo peso + baixa estatura', 'eutrófico', 'pequeno mas proporcional'])}

    <article class="opener opener--case" aria-label="Retomada do caso">
      <span class="opener__case-header">Caso de Josias · retomada</span>
      <p class="opener__case-quote">Josias volta. Peso <strong>9,8 kg</strong>, estatura <strong>82 cm</strong>, 2 anos e meio. Agora você tem tudo para classificá-lo — e a resposta surpreende.</p>
      <dl class="case-card__meta">
        <dt>Idade</dt><dd>30 meses (menino)</dd>
        <dt>Peso/idade</dt><dd>9,8 kg → faixa vermelha (Z-2 a Z-3)</dd>
        <dt>Estatura/idade</dt><dd>82 cm → faixa vermelha (Z-2 a Z-3)</dd>
        <dt>IMC/idade</dt><dd>14,5 → faixa verde (eutrofia)</dd>
      </dl>
    </article>

    <h1 class="page-title">A matriz que classifica Josias</h1>

    <div class="prose">
      <h3 class="topic-h">Lendo os três gráficos de Josias</h3>
      <p>Com peso 9,8 kg, estatura 82 cm e 2 anos e meio (30 meses), lançamos cada dado no seu gráfico:</p>
      <ul>
        <li><strong>Peso/idade</strong>: 9,8 kg aos 30 meses cai <strong>entre Z-2 e Z-3</strong> (abaixo de Z-2, não abaixo de Z-3) → <span class="hl-bad">baixo peso para a idade</span>.</li>
        <li><strong>Estatura/idade</strong>: 82 cm aos 30 meses cai <strong>abaixo de Z-2, não abaixo de Z-3</strong> → <span class="hl-bad">baixa estatura para a idade</span>.</li>
      </ul>
      <p>Até aqui, o quadro parece feio: baixo peso E baixa estatura. Mas falta o índice que cruza os dois.</p>

      <h3 class="topic-h">A matriz de decisão</h3>
      <p>O IMC não veio pronto — e muitas questões fazem isso de propósito, para o aluno <strong>calcular</strong>. IMC = peso ÷ estatura²:</p>
      <p class="calc">IMC de Josias = 9,8 ÷ (0,82)² = 9,8 ÷ 0,6724 = <strong>14,5</strong></p>
      <p>Lançado o <strong>IMC 14,5 aos 30 meses</strong>, ele cai <strong>acima do Z-2 e abaixo do Z+1</strong> → <span class="hl-good">eutrofia</span>. (Acima de Z+1 seria risco de sobrepeso/sobrepeso; abaixo de Z-2 seria magreza.) A matriz dos três índices fica assim:</p>
      <table class="comparison-table">
        <thead><tr><th>Índice de Josias</th><th>Valor</th><th>Faixa</th><th>Classificação</th></tr></thead>
        <tbody>
          <tr><td>Peso/idade</td><td>9,8 kg</td><td>Z-2 a Z-3 (vermelha)</td><td class="col-bad"><strong>baixo peso para a idade</strong></td></tr>
          <tr><td>Estatura/idade</td><td>82 cm</td><td>Z-2 a Z-3 (vermelha)</td><td class="col-bad"><strong>baixa estatura para a idade</strong></td></tr>
          <tr><td>IMC/idade</td><td>14,5</td><td>Z-2 a Z+1 (verde)</td><td class="col-good"><strong>eutrofia</strong></td></tr>
        </tbody>
      </table>
    </div>

    <figure class="figure-svg figure-svg__embed">
      <div class="hero-stage">
        ${hero('C-p12')}
      </div>
      <div class="hero-controls">
        <button id="heroC-contra" class="toggle-btn" type="button" aria-pressed="false" aria-controls="contra-overlay">
          <svg class="tb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16v-4"/><path d="M12 8h.01"/><circle cx="12" cy="12" r="9"/></svg>
          <span id="heroC-contra-label">Por que não é contradição?</span>
        </button>
        <span class="hero-hint">Passe o mouse, toque ou navegue por Tab nos pontos coloridos.</span>
      </div>
      <figcaption><strong>Matriz —</strong> os três índices de Josias plotados nas curvas OMS; o toggle sobrepõe a explicação população × proporção própria.</figcaption>
    </figure>

    <div class="static-legend" aria-label="Leitura do caso (referência rápida)">
      <h3>Leitura do caso — referência rápida</h3>
      <div class="leg-row"><span class="leg-sw" style="background:rgba(244,113,90,.30);border-color:var(--err-red)"></span><span><b>Peso/idade — 9,8 kg:</b> faixa vermelha (Z-2 a Z-3) → <b>baixo peso para a idade</b>.</span></div>
      <div class="leg-row"><span class="leg-sw" style="background:rgba(244,113,90,.30);border-color:var(--err-red)"></span><span><b>Estatura/idade — 82 cm:</b> faixa vermelha (Z-2 a Z-3) → <b>baixa estatura para a idade</b>.</span></div>
      <div class="leg-row"><span class="leg-sw" style="background:rgba(95,223,160,.30);border-color:var(--ok-green)"></span><span><b>IMC/idade — 14,5:</b> faixa verde (Z-2 a Z+1) → <b>eutrofia</b>. IMC = 9,8 ÷ 0,82² = 14,5.</span></div>
    </div>

    <div class="prose">
      <h3 class="topic-h">O diagnóstico que parece contraditório (e não é)</h3>
      <p>Diagnóstico nutricional final de Josias: <strong>baixo peso para a idade, baixa estatura para a idade, paciente eutrófico.</strong> Parece contradição — como ter baixo peso e baixa estatura e ser eutrófico ao mesmo tempo? Não é. Peso/idade e estatura/idade comparam Josias com <strong>outras crianças da idade dele</strong>: ele é menor que os pares (baixo nos dois). Mas o IMC compara o <strong>peso dele com a própria estatura</strong>: para o tamanho que ele tem, o peso é proporcional. Josias é uma criança <strong>pequena, mas proporcional</strong> — não é desnutrido agudo (não está magro), é uma criança que cresceu pouco em peso e em estatura de forma harmônica. Esse é o "aha" da matriz: os três índices contam histórias diferentes, e só lendo os três juntos se fecha o diagnóstico.</p>
    </div>

    ${med({
      file: 'p12-oms-estatura-idade.png',
      alt: 'Gráfico oficial da OMS de comprimento/estatura para a idade de meninos de 0 a 5 anos, com curvas de escore-z preta, vermelha e verde.',
      achado: 'WHO Child Growth Standards — Comprimento/Estatura × Idade, meninos, 0 a 5 anos (escore-z): um dos três gráficos usados para fechar o diagnóstico de Josias.',
      fonte: 'WHO Child Growth Standards, length/height-for-age',
      licenca: 'CC BY-NC-SA 3.0 IGO (uso educacional)'
    })}

    <aside class="practice">
      <p class="practice__label">O que diferencia o aluno avançado</p>
      <p>Reconhecer que peso/idade e estatura/idade comparam com a população, enquanto o IMC compara a criança consigo mesma — daí a coexistência sem contradição.</p>
    </aside>

    ${quiz('p12', 'O cálculo do IMC e a leitura cruzada dos três índices.', [
      {
        stem: 'O IMC de Josias (peso 9,8 kg; estatura 0,82 m) é:',
        alts: [
          { t: '11,9', correct: false, why: 'Não corresponde ao cálculo 9,8 ÷ 0,82².' },
          { t: '14,5', correct: true, why: 'Certa. 9,8 ÷ (0,82)² = 9,8 ÷ 0,6724 ≈ 14,5.' },
          { t: '16,0', correct: false, why: 'Acima do valor real.' },
          { t: '12,0', correct: false, why: 'Abaixo do valor real.' },
        ]
      },
      {
        stem: 'O diagnóstico nutricional final de Josias é:',
        alts: [
          { t: 'Desnutrição grave com magreza acentuada', correct: false, why: 'Erra porque o IMC é eutrófico, não magro.' },
          { t: 'Baixo peso + baixa estatura + eutrófico', correct: true, why: 'Certa. É a tripla leitura: baixo nos dois índices de idade, eutrófico no IMC.' },
          { t: 'Eutrófico em todos os índices', correct: false, why: 'Ignora que peso/idade e estatura/idade estão baixos.' },
          { t: 'Sobrepeso para a idade', correct: false, why: 'Inverte o quadro.' },
        ]
      },
      {
        stem: 'Josias é "baixo peso e baixa estatura" mas "eutrófico" ao mesmo tempo porque:',
        alts: [
          { t: 'Há erro no cálculo do IMC', correct: false, why: 'Nega o cálculo correto (14,5).' },
          { t: 'Peso/idade e estatura/idade o comparam com os pares; o IMC compara o peso dele com a própria estatura', correct: true, why: 'Certa. É uma criança pequena mas proporcional — população × proporção própria.' },
          { t: 'O IMC não serve para crianças', correct: false, why: 'Falso — IMC/idade é índice central.' },
          { t: 'Ele está desidratado', correct: false, why: 'Sem base no caso.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 13 — E4 Pergunta da família ===================== */
  P.push(page('p13', 13, `
    ${tag('sys', 'Previsão · fechamento')}
    ${chips(['regra do retrospecto', 'triplica o peso', '+25 cm', 'matemática, não chute'])}

    <aside class="opener opener--trap" aria-label="Pergunta de abertura">
      <svg class="opener__trap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/><circle cx="12" cy="12" r="10"/></svg>
      <div class="opener__trap-body">
        <p class="opener__trap-tag">A pergunta da mãe</p>
        <p class="opener__trap-text">"Doutora, quanto ele deveria ter pesado e medido com 1 ano?" E a resposta <strong>não é chute — é conta.</strong></p>
      </div>
    </aside>

    <h1 class="page-title">A regra do retrospecto: o pediatra não é vidente</h1>

    <div class="prose">
      <h3 class="topic-h">A pergunta da mãe</h3>
      <p>A Sra. Altineia informa que Josias, ao nascer, pesava <strong>2 kg e 600 g</strong> e media <strong>48 cm</strong>, e pergunta quanto ele deveria pesar e medir <strong>ao 1 ano</strong>. A resposta sai das duas âncoras já dominadas — triplicação do peso e +25 cm de estatura.</p>

      <h3 class="topic-h">Previsão do peso pela triplicação</h3>
      <p>A criança <strong>triplica</strong> o peso de nascimento ao 1 ano. Logo:</p>
      <p class="calc">2,6 kg × 3 = <strong>7,8 kg</strong> → Josias deveria pesar <strong>7 kg e 800 g</strong> ao 1 ano.</p>

      <h3 class="topic-h">Previsão da estatura pelos +25 cm</h3>
      <p>A criança ganha <strong>~25 cm</strong> de estatura no 1º ano. Logo:</p>
      <p class="calc">48 cm + 25 cm = <strong>73 cm</strong> → Josias deveria medir <strong>73 cm</strong> ao 1 ano.</p>
      <p>Resposta à mãe: ao 1 ano, Josias deveria ter pesado <strong>7,8 kg</strong> e medido <strong>73 cm</strong>. Não é clarividência — pediatra não é vidente. É <strong>matemática aplicada à puericultura</strong>: conhecendo os dados de nascimento e as regras do crescimento normal, o esperado se calcula.</p>
    </div>

    ${svgPiso(13, { caption: 'calculadora do retrospecto — entre o peso e o comprimento de nascimento e veja o esperado ao 1 ano (×3 no peso, +25 cm na estatura); compare com um valor real.', hint: 'Inputs e resultado acessíveis por teclado; saída anunciada por leitor de tela.' })}

    <div class="prose">
      <h3 class="topic-h">O que você venceu até aqui</h3>
      <p>Com o caso de Josias está coberto tudo sobre <strong>crescimento</strong> e <strong>classificação</strong>: as duas grandes resistências da puericultura foram vencidas. Você sabe quanto a criança deveria crescer em peso, estatura e PC; sabe ler escore-Z, percentil e curvas da OMS; sabe classificar nos três índices e calcular o IMC; e sabe prever o esperado a partir do nascimento. É a base que torna possível o passo seguinte — os distúrbios do crescimento, a parte mais médica e prática.</p>
    </div>

    ${med({
      file: 'p13-caderneta-identificacao.png',
      alt: 'Página de identificação da Caderneta de Saúde da Criança, com campos para nome, data de nascimento, município, filiação e números de registro.',
      achado: 'Caderneta de Saúde da Criança — página de Identificação (nome, data de nascimento, registro civil): o ponto de partida do acompanhamento longitudinal a partir do qual se calcula o esperado.',
      fonte: 'Caderneta de Saúde da Criança, 12ª ed. Ministério da Saúde, 2023',
      licenca: 'Material oficial do MS (público)'
    })}

    <aside class="practice">
      <p class="practice__label">O que diferencia o aluno avançado</p>
      <p>Usar as regras nos dois sentidos — para frente (prever o esperado) e para trás (checar se o crescido bate com o nascido), flagrando incoerências no histórico.</p>
    </aside>

    <aside class="op-summary">
      <p class="op-summary__label">Resumo operacional</p>
      <p>Dados de nascimento + regras (triplica o peso, +25 cm) = peso e estatura esperados ao 1 ano. Conta, não adivinhação.</p>
    </aside>

    ${quiz('p13', 'A regra do retrospecto aplicada.', [
      {
        stem: 'Uma criança nasceu com 3 kg e 50 cm. Pela regra, ao 1 ano deve pesar e medir aproximadamente:',
        alts: [
          { t: '6 kg e 75 cm', correct: false, why: 'Usa a duplicação do peso (~4-6 meses), não os 12 meses.' },
          { t: '9 kg e 75 cm', correct: true, why: 'Certa. Triplica o peso (3 × 3 = 9 kg) e +25 cm (50 + 25 = 75 cm).' },
          { t: '9 kg e 100 cm', correct: false, why: 'Acerta o peso mas exagera a estatura (dobraria).' },
          { t: '6 kg e 100 cm', correct: false, why: 'Erra os dois — duplica o peso e dobra a estatura.' },
        ]
      },
      {
        stem: 'A "regra do retrospecto" da puericultura é melhor descrita como:',
        alts: [
          { t: 'Uma intuição clínica do pediatra experiente', correct: false, why: 'Nega a base objetiva — não é intuição.' },
          { t: 'Matemática aplicada às regras do crescimento normal', correct: true, why: 'Certa. Previsibilidade vinda de regras numéricas (triplica, +25 cm), não clarividência.' },
          { t: 'Um exame laboratorial de previsão', correct: false, why: 'Inventa um exame que não existe.' },
          { t: 'Uma estimativa sem base nas curvas', correct: false, why: 'Nega a base nas regras de crescimento.' },
        ]
      },
    ])}
  `));

  return P;
}
