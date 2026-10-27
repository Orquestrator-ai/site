/* _pages.mjs — conteúdo autoral das 11 páginas da Aula 02 "Desnutrição grave".
   Texto-aluno = canon do prompt-final (§6). Tópicos visíveis como <h3 class="topic-h">.
   Anti-metalinguagem: voz de professor direto ao aluno; o texto É o conteúdo.
   Herói (P6) e pisos (demais) embutidos inline pelos helpers do _build.mjs.
   Quiz gold (3 camadas) renderizado FIEL ao prompt-final. */

export function buildPages({ med, svgPiso, hero, notaBanca, notaValor, quiz, tag, chips, page }) {
  const P = [];

  /* ===================== PÁGINA 1 — E3 Caso clínico ===================== */
  P.push(page('p1', 1, `
    ${tag('case', 'Caso-âncora · Josué')}
    ${chips(['pré-escolar', 'anasarca', 'albumina 1,8', 'carência proteica'])}

    <article class="opener opener--case" aria-label="Caso clínico de abertura">
      <span class="opener__case-header">Ambulatório de pediatria · pré-escolar</span>
      <p class="opener__case-quote"><strong>Josué, 3 anos e meio</strong>, família com pouco recurso. A dieta não tem proteína. Chega <strong>anasarcado</strong> — todo inchado —, mas o subcutâneo parece preservado. E a albumina está no chão: <strong>1,8 g/dL</strong>.</p>
      <dl class="case-card__meta">
        <dt>Paciente</dt><dd>Josué, 3 anos e 6 meses · dieta isenta de proteína</dd>
        <dt>Exame</dt><dd>anasarca; subcutâneo relativamente preservado; cabelo seco, quebradiço e mais claro; pele com áreas hiper e hipopigmentadas; fígado a 3 cm do rebordo costal direito</dd>
        <dt>Antropometria</dt><dd>11,5 kg · 90 cm</dd>
        <dt>Laboratório</dt><dd>Ht 24% · Hb 7,8 g/dL · leucócitos 3.400 · plaquetas 450.000 · albumina 1,8 g/dL · Na 132 · K 2,6 mEq/L</dd>
      </dl>
    </article>

    <h1 class="page-title">Josué: o caso que não fecha em síndrome nefrótica</h1>

    <div class="prose">
      <h3 class="topic-h">A criança que chega inchada</h3>
      <p><span class="term">Josué</span> é pré-escolar, 3 anos e meio, de uma família com pouco recurso financeiro. A história alimentar já entrega o fio: a dieta dele <strong>não tem proteína</strong>. Ele come carboidrato — mas o cardápio é <span class="hl-bad">isento de aporte proteico</span>. Ao exame, está em <span class="term">anasarca</span>: todo inchado, edema generalizado. E aqui vem o primeiro detalhe que destoa do que se espera de uma criança desnutrida — o <span class="term">tecido celular subcutâneo está relativamente preservado</span>. Ele não parece "pele e osso". O cabelo está <strong>seco, quebradiço e mais claro</strong>; a pele tem <strong>áreas hipopigmentadas misturadas com áreas hiperpigmentadas</strong>; e o fígado é palpável a 3 cm do rebordo costal direito — <span class="term">hepatomegalia</span>.</p>

      <h3 class="topic-h">Os números que gritam carência</h3>
      <p>Os dados antropométricos: <strong>11,5 kg e 90 cm</strong>. Os exames: hematócrito 24%, hemoglobina 7,8 g/dL — <span class="hl-bad">anemia</span>. Leucócitos 3.400/mm³ (leucopenia); plaquetas 450.000/mm³. <span class="term">Albumina 1,8 g/dL</span> — hipoalbuminemia, uma queda de proteína muito importante. E os eletrólitos: <strong>sódio 132 mEq/L</strong> (a referência fica em torno de 134-135) e <strong>potássio 2,6 mEq/L</strong>. Os dois reduzidos — um distúrbio eletrolítico que anda junto da hipoalbuminemia.</p>

      <h3 class="topic-h">A tentação do diagnóstico errado</h3>
      <p>Junte as peças: hipoalbuminemia, edema e distúrbio eletrolítico. Para muita gente, isso acende imediatamente a luz da <span class="hl-warn">síndrome nefrótica</span> ou de um comprometimento renal — e é uma tentação legítima, porque o trio realmente combina. Mas o enunciado entregou um dado objetivo que não dá para ignorar: a <strong>carência de um macronutriente específico, a proteína</strong>. Quando o dado da privação está explícito na história, o raciocínio tem que correr por ali primeiro — não pela hipótese renal, que é o atalho que a banca planta justamente para ver quem morde.</p>
    </div>

    ${svgPiso(1, { caption: 'a ficha de Josué — clique em cada achado (edema, subcutâneo, cabelo, pele, fígado, laboratório) e leia por que aponta carência, não rim.', hint: 'Clique, toque ou Tab + Enter; o comutador encena a virada rim ↔ carência.' })}

    <div class="prose">
      <h3 class="topic-h">A pergunta que organiza tudo</h3>
      <p>Daí nasce a regra de ouro que vai guiar tudo: sempre que o enunciado entregar <strong>carência de um macronutriente</strong> somada a manifestações clínicas, a pergunta obrigatória é uma só — <strong>essa criança não está em <span class="hl-bad">desnutrição grave</span>?</strong> Guarde Josué inteiro: o inchaço com subcutâneo preservado, o cabelo descolorido, a hepatomegalia, a albumina no chão. Cada um desses achados vai ganhar nome e fisiopatologia adiante. No fim, voltamos para fechar as quatro perguntas que o caso dele cobra.</p>
    </div>

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text">O trio <strong>hipoalbuminemia + edema + distúrbio eletrolítico</strong> é desenhado para sugerir rim. O que desfaz a armadilha é o dado de <strong>privação proteica</strong> na história — leia a anamnese antes de pular para o exame complementar.</p>
      </div>
    </aside>

    ${med({
      file: 'p1-anasarca-kwashiorkor.jpg',
      alt: 'Criança pequena com kwashiorkor em campo de assistência, apresentando edema generalizado (anasarca), abdome distendido e cabelo descolorido e ralo.',
      achado: 'Anasarca com subcutâneo preservado — o inchaço da carência proteica, não da magreza. É o quadro que abre o caso de Josué.',
      fonte: 'CDC Public Health Image Library (Dr. Lyle Conrad), ID #6901',
      licenca: 'Domínio público',
      tarja: 'p1'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>O diagnóstico de desnutrição grave costuma estar escondido atrás de uma hipótese mais "nobre" (renal, cardíaca). Quem lê a história alimentar acha; quem corre para o complementar erra.</p>
    </aside>

    ${quiz('p1', 'Ancoragem diagnóstica: resistir ao falso atalho.', [
      {
        stem: 'Diante de Josué — pré-escolar com dieta sem proteína, anasarca, hipoalbuminemia (albumina 1,8) e distúrbio eletrolítico (Na 132, K 2,6) —, qual raciocínio diagnóstico deve guiar a conduta inicial?',
        alts: [
          { t: 'Síndrome nefrótica, pela tríade edema + hipoalbuminemia + distúrbio eletrolítico', correct: false, why: 'É a armadilha-mãe: a tríade realmente "cheira" a rim, e por isso a banca a coloca — mas faltam proteinúria nefrótica e contexto renal; o que sobra e explica tudo é a dieta sem proteína. Cai-se aqui ao disparar um padrão laboratorial decorado antes de ler a história alimentar.' },
          { t: 'Desnutrição grave, ancorada na carência proteica explícita da história', correct: true, why: 'Certa. O enunciado entrega de mão beijada o macronutriente que falta — proteína —, e é por esse dado objetivo que o raciocínio corre. Desnutrido com privação proteica + edema = desnutrição grave, ponto de partida obrigatório.' },
          { t: 'Insuficiência cardíaca congestiva, pelo edema generalizado', correct: false, why: 'Confunde a causa do edema: aqui ele é oncótico (albumina baixa puxando líquido para o interstício), não congestivo; não há sinais de falência de bomba. Cai-se ao associar "anasarca" automaticamente a coração.' },
          { t: 'Síndrome de má absorção idiopática, pela hipoalbuminemia isolada', correct: false, why: 'Pega metade do mecanismo e erra o quadro: má absorção é causa de desnutrição secundária, mas a história de Josué é de falta de ingestão proteica (primária), sem contexto desabsortivo. Cai-se ao fixar na hipoalbuminemia isolada.' },
        ]
      },
      {
        stem: 'O que, na anamnese de Josué, é o dado que desarma a hipótese de síndrome nefrótica e redireciona o raciocínio?',
        alts: [
          { t: 'A presença de hepatomegalia', correct: false, why: 'É consequência, não causa: a hepatomegalia reforça o kwashiorkor (esteatose), mas é achado de exame, não o dado anamnéstico que redireciona. Cai-se ao trocar "o achado mais chamativo no exame" pelo "dado que muda a hipótese".' },
          { t: 'A carência de proteína na dieta', correct: true, why: 'Certa. A história de dieta isenta de proteína é o dado objetivo que faz o raciocínio correr pela carência e não pelo rim. É a chave que transforma um quadro "renal por padrão" em desnutrição grave.' },
          { t: 'O potássio de 2,6 mEq/L', correct: false, why: 'É parte do quadro, não o gatilho: a hipocalemia compõe a desnutrição grave, mas isolada também caberia em outras doenças e não exclui o rim. Cai-se ao confundir "alteração presente no caso" com "pista discriminativa".' },
          { t: 'A hemoglobina de 7,8 g/dL', correct: false, why: 'Mesma armadilha do potássio: a anemia compõe o quadro, mas sozinha não direciona o raciocínio nem afasta a hipótese renal. Cai-se ao tomar um dado presente por um dado discriminativo.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 2 — E8 Erro comum desmontado ===================== */
  P.push(page('p2', 2, `
    ${tag('sys', 'Conceito · gravidade clínica')}
    ${chips(['não é peso', 'colapso metabólico', 'emergência', 'internação'])}

    <section class="opener opener--bust" aria-label="Erro comum desmontado">
      <p class="opener__bust-tag">Erro comum desmontado</p>
      <p class="opener__bust-wrong">"Desnutrição grave é só uma criança muito magra, um peso baixo no gráfico."</p>
      <p class="opener__bust-right">Está errado — e o erro é perigoso, porque faz subestimar o quadro. O peso é a consequência visível; a doença é um <strong>colapso metabólico</strong>, muito mais fundo.</p>
    </section>

    <h1 class="page-title">Desnutrição grave não é peso — é colapso metabólico</h1>

    <div class="prose">
      <h3 class="topic-h">O erro de achar que é só a balança</h3>
      <p>Muita gente acha que desnutrição grave é só uma criança muito magra, um peso baixo no gráfico. Está errado — e esse erro é perigoso, porque faz subestimar o quadro. <span class="hl-bad">Desnutrição grave não fala só sobre alteração de peso.</span> Não é apenas um dado numérico, não é só um pontinho abaixo da curva. O peso é a consequência visível; a doença é muito mais funda.</p>

      <h3 class="topic-h">O que significa "colapso metabólico"</h3>
      <p>O que define a desnutrição grave é um <span class="term">colapso metabólico</span>. O organismo deixou de usar energia de forma adequada: a célula não funciona, o metabolismo praticamente <strong>parou</strong>. Não é que falte combustível no tanque apenas — é que a máquina inteira está girando devagar, em modo de sobrevivência. Por isso a criança não responde como uma criança saudável a nada: nem à comida (que pode matá-la se vier rápido demais), nem à hidratação (que pode afogar o coração), nem à infecção (que ela não consegue mais combater). Tudo isso decorre de um metabolismo que entrou em pane.</p>
    </div>

    ${svgPiso(2, { caption: 'tanque × motor — alterne entre "falta combustível" (visão rasa do peso) e "a máquina parou" (colapso metabólico) e veja por que comida, hidratação e infecção viram risco.', hint: 'Toggle por clique, toque ou Enter / ← →; estado anunciado por leitor de tela.' })}

    <div class="prose">
      <h3 class="topic-h">Por que pode matar na sua frente</h3>
      <p>A frase para gravar: uma criança com desnutrição grave <span class="hl-bad">pode morrer na sua frente</span> se nada for feito, se não houver investigação. É grave de verdade — não é um diagnóstico ambulatorial tranquilo de ajustar dieta e mandar para casa. É um quadro que exige internação, monitorização e uma sequência de cuidados na ordem certa. Entender isso muda a postura clínica: diante de um desnutrido grave, a pressa é a inimiga, mas a vigilância é obrigatória.</p>
    </div>

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Peso baixo = sinal</h4><p>É um <em>sinal</em> de desnutrição — avisa que algo mudou.</p></div>
        <div class="dont-confuse__side"><h4>Colapso metabólico = doença</h4><p>É a <em>doença</em>. Uma criança pode estar com peso quase normal (ou edemaciada, "cheia") e estar em desnutrição grave — a gravidade está no metabolismo, não na balança.</p></div>
      </div>
    </div>

    ${med({
      file: 'p2-marasmo-hospital.jpg',
      alt: 'Lactente com desnutrição grave (marasmo), pele e osso, recebendo atendimento médico em ambiente clínico de campanha.',
      achado: 'Desnutrição grave é diagnóstico de internação — colapso metabólico, não consulta de rotina.',
      fonte: 'Capt. John Severns, U.S. Air Force',
      licenca: 'Domínio público',
      tarja: 'p2'
    })}

    <aside class="op-summary">
      <p class="op-summary__label">Resumo operacional</p>
      <p>Desnutrição grave = colapso metabólico (a célula parou), não um número de peso; é emergência que mata.</p>
    </aside>

    ${quiz('p2', 'Reconceituação e gravidade clínica.', [
      {
        stem: 'Por que afirmar que "desnutrição grave é simplesmente uma criança com peso muito baixo" é clinicamente perigoso?',
        alts: [
          { t: 'Porque o peso baixo nem sempre aparece na balança', correct: false, why: 'Inverte a relação: o peso baixo frequentemente aparece sim; o problema não é a visibilidade do número, é reduzir a doença ao número. Cai-se ao procurar uma falha técnica de medição em vez da falha conceitual.' },
          { t: 'Porque a desnutrição grave é um colapso metabólico, e a visão "só peso" leva a subestimar a gravidade e tratar de menos', correct: true, why: 'Certa. O peso é a consequência visível, mas a doença é o colapso metabólico — a célula parou de usar energia. Quem enxerga só a balança trata como ajuste de dieta e perde a janela de uma emergência que mata.' },
          { t: 'Porque o peso baixo é irrelevante no diagnóstico', correct: false, why: 'Exagera para o lado oposto: o peso não é irrelevante — é um dos critérios (Z < -3) e um sinal importante; ele só não é a essência da doença. Cai-se ao confundir "não é só peso" com "peso não importa".' },
          { t: 'Porque toda criança magra tem desnutrição grave', correct: false, why: 'Generalização falsa: magreza não é sinônimo de desnutrição grave (existe a forma edemaciada, e existe magreza constitucional); o critério é específico. Cai-se ao simplificar o diagnóstico a um único achado visual.' },
        ]
      },
      {
        tf: true,
        stem: '"Uma criança com desnutrição grave pode morrer na sua frente se nada for feito." Essa afirmação é:',
        alts: [
          { t: 'Exagerada — desnutrição é um problema crônico, nunca agudo', correct: false, why: 'Confunde a evolução com o desfecho: a desnutrição se instala de forma crônica, mas o desnutrido grave pode descompensar de forma agudíssima. Cai-se ao associar "desnutrição" a "lento".' },
          { t: 'Verdadeira — o colapso metabólico torna a criança vulnerável a hipoglicemia, hipotermia, distúrbio eletrolítico e infecção, todos potencialmente fatais de imediato', correct: true, why: 'Certa. O colapso metabólico deixa a criança incapaz de regular glicemia, temperatura, eletrólitos e defesa imune — qualquer um pode matar em horas. É o que a fase de estabilização vai atacar.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 3 — E1 Pergunta central ===================== */
  P.push(page('p3', 3, `
    ${tag('sys', 'Classificação etiológica · mecanismo')}
    ${chips(['primária × secundária', 'má absorção', 'hipermetabolismo', 'a causa muda a conduta'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Duas crianças igualmente desnutridas — uma comeu pouco, a outra comeu bem. Como a mesma desnutrição nasce de causas opostas?</p>
    </section>

    <h1 class="page-title">Por que a criança desnutriu: primária × secundária</h1>

    <div class="prose">
      <h3 class="topic-h">Primária: faltou comer</h3>
      <p>A <span class="term">desnutrição primária</span> é a mais intuitiva: a criança <strong>não ingeriu o alimento</strong>. Faltou comer — faltou carboidrato, faltou gordura ou faltou proteína (ou tudo junto). A causa está na boca para dentro: não chegou nutriente suficiente. É a desnutrição da privação alimentar, ligada ao contexto social, à pobreza, ao desmame precoce. O tratamento, aqui, passa centralmente por <span class="hl-good">oferecer o que faltou</span> — com as cautelas que vêm adiante.</p>

      <h3 class="topic-h">Secundária: comeu, mas não aproveitou</h3>
      <p>A <span class="term">desnutrição secundária</span> é a contraintuitiva, e por isso a que mais cai em prova: <strong>não é por falta de ingestão</strong>. A criança come — às vezes come bem —, mas <strong>uma doença impede o uso correto da energia ingerida</strong>. Aqui, dar mais comida não resolve, porque o problema não é o aporte; é o que o corpo faz (ou deixa de fazer) com ele. Tratar a desnutrição secundária exige tratar a <strong>doença de base</strong>.</p>

      <h3 class="topic-h">Má absorção × hipermetabolismo</h3>
      <p>A secundária tem dois mecanismos, e vale gravar os dois com exemplos:</p>
      <ul>
        <li><span class="term">Mecanismo 1 — má absorção</span> (síndrome desabsortiva): a doença impede que o nutriente ingerido seja absorvido. A criança come, mas o nutriente passa direto. Exemplos clássicos: <strong>fibrose cística</strong> e <strong>doença celíaca</strong>. O alimento entra, mas não é aproveitado.</li>
        <li><span class="term">Mecanismo 2 — hipermetabolismo</span>: a doença aumenta a <strong>taxa metabólica basal</strong>, fazendo a criança gastar muito mais energia mesmo em repouso. Exemplo clássico: <strong>cardiopatia</strong>. A criança pode comer um aporte adequado, mas o gasto energético excede o que entra — e ela desnutre por déficit, mesmo comendo.</li>
      </ul>
      <p>A lógica é elegante: na primária falta na entrada; na secundária, ou se perde na absorção (mecanismo 1) ou se gasta demais (mecanismo 2). De um jeito ou de outro, o saldo energético fica negativo.</p>
    </div>

    ${svgPiso(3, { caption: 'balanço energético — escolha a causa (não comeu / não absorve / gasta demais) e veja onde o saldo fica negativo, classificando primária ou secundária.', hint: 'Setas + Enter selecionam a causa; resultado anunciado por leitor de tela.' })}

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Não é gravidade</h4><p>Primária × secundária não é sobre gravidade — uma secundária pode ser tão grave quanto uma primária.</p></div>
        <div class="dont-confuse__side"><h4>É causa</h4><p>É sobre <strong>causa</strong>, e a causa muda o tratamento: ofertar alimento × tratar a doença de base.</p></div>
      </div>
    </div>

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>A banca adora o cenário "criança que come bem e desnutre" — é o gancho para fibrose cística, celíaca ou cardiopatia. Reconhecer a secundária evita o erro de só reforçar a dieta.</p>
    </aside>

    ${med({
      file: 'p3-celiaca-atrofia-vilositaria.jpg',
      alt: 'Lâmina histológica de mucosa duodenal na doença celíaca, mostrando atrofia das vilosidades intestinais — base da má absorção.',
      achado: 'Comeu, mas não aproveitou — a atrofia vilositária da doença celíaca: o nutriente passa direto. Substrato da desnutrição secundária por má absorção.',
      fonte: 'Samir, via Wikimedia Commons',
      licenca: 'CC BY-SA 3.0'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Confundir secundária com primária faz o médico insistir em dieta enquanto a doença de base segue corroendo. A classificação muda a conduta.</p>
    </aside>

    ${quiz('p3', 'Classificação etiológica e mecanismo.', [
      {
        stem: 'Um lactente com fibrose cística que se alimenta adequadamente, mas evolui com desnutrição, é exemplo de qual mecanismo?',
        alts: [
          { t: 'Desnutrição primária por baixa ingestão', correct: false, why: 'Erra a categoria: é primária (falta na entrada), e o enunciado diz que a criança "se alimenta adequadamente". Cai-se ao associar "desnutrição" automaticamente a "comeu pouco", ignorando que a porta da ingestão já foi fechada.' },
          { t: 'Desnutrição secundária por má absorção', correct: true, why: 'Certa. A fibrose cística cursa com insuficiência pancreática exócrina → o nutriente é ingerido mas não absorvido. Protótipo da secundária por má absorção: comer mais não resolve.' },
          { t: 'Desnutrição secundária por hipermetabolismo', correct: false, why: 'Acerta a categoria mas erra o mecanismo: hipermetabolismo é o outro braço da secundária, típico da cardiopatia (gasto aumentado), não da fibrose cística (má absorção). Cai-se ao saber que é secundária mas trocar "não absorve" por "gasta demais".' },
          { t: 'Desnutrição primária por dieta sem proteína', correct: false, why: 'Mesma falha da primeira opção: é primária, mas o enunciado já disse que a criança come bem. Cai-se ao reflexo de que "desnutrição = comeu pouco".' },
        ]
      },
      {
        stem: 'O que distingue, na essência, a desnutrição secundária da primária?',
        alts: [
          { t: 'A secundária é sempre mais grave', correct: false, why: 'Confunde causa com gravidade: a classificação é etiológica, não de gravidade — uma primária por privação total pode matar tão rápido quanto uma secundária. Cai-se ao assumir que "secundária" soa como "pior".' },
          { t: 'Na primária faltou ingerir; na secundária a criança ingere mas uma doença impede o uso correto da energia', correct: true, why: 'Certa. A linha divisória é a causa: primária = déficit de aporte (boca para fora); secundária = doença que sabota o aproveitamento (absorção ruim ou gasto excessivo), mesmo com ingestão adequada.' },
          { t: 'A secundária só ocorre em crianças maiores', correct: false, why: 'Inventa um critério etário inexistente: a secundária ocorre em qualquer idade (a fibrose cística é congênita). Cai-se ao buscar uma regra fácil de idade que não existe.' },
          { t: 'A primária não responde a oferta de alimento', correct: false, why: 'Inverte a lógica do tratamento: é justamente a primária que responde à oferta de alimento (com cautela); a secundária é que exige tratar a doença de base. Cai-se ao trocar qual das duas responde à dieta.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 4 — E4 Achado/pegadinha ===================== */
  P.push(page('p4', 4, `
    ${tag('case', 'Critério diagnóstico · OMS')}
    ${chips(['Z < -3', 'braço < 115 mm', 'edema', '"OU", não "E"'])}

    <aside class="opener opener--trap" aria-label="Achado de abertura">
      <svg class="opener__trap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="opener__trap-body">
        <p class="opener__trap-tag">A definição que engana</p>
        <p class="opener__trap-text">Existe uma criança que <strong>NÃO está magra</strong> — IMC normal ou até elevado — e mesmo assim é <strong>desnutrida grave</strong>. A banca explora exatamente essa porta.</p>
      </div>
    </aside>

    <h1 class="page-title">As três portas da OMS (e a que engana)</h1>

    <div class="prose">
      <h3 class="topic-h">Porta 1: a magreza acentuada (Z < -3)</h3>
      <p>A primeira definição da OMS é a imagem que todo mundo tem na cabeça: a <span class="term">magreza acentuada</span>. Objetivamente, é o <span class="hl-bad">IMC para a idade abaixo do escore-Z -3</span> (na prática, peso/estatura ou IMC/idade com Z < -3 desvios-padrão). É a criança muito emagrecida, claramente abaixo da faixa. Essa porta vale no contexto de carência nutricional / baixa ingestão — descreve a criança que perdeu massa.</p>

      <h3 class="topic-h">Porta 2: o braço fino (< 115 mm)</h3>
      <p>A segunda definição é prática e usada em triagem de campo: a <span class="term">circunferência braquial</span>, medida com uma fita no braço da criança, <strong>abaixo de 115 mm</strong> (11,5 cm). Vale principalmente <strong>acima dos 6 meses</strong> (validada para 6-59 meses). É barata, rápida, não depende de balança nem de gráfico — por isso é o instrumento de rastreio em larga escala. Como a definição 1, ela descreve a criança emagrecida: braço fino = pouca massa muscular e gordurosa.</p>

      <h3 class="topic-h">Porta 3: o edema — a que engana</h3>
      <p>Aqui está a virada que a banca explora. A imagem da criança muito emagrecida é verdadeira — mas existe uma definição de desnutrição grave para a criança que <strong>NÃO está emagrecida</strong>, com <strong>IMC normal ou até elevado</strong>. A terceira porta: criança com <span class="term">carência de nutriente</span> (carência proteica, principalmente) que apresenta <span class="hl-bad">edema grave / anasarca / edema generalizado</span>. Isso, <strong>por si só</strong>, já define desnutrição grave. A regra para gravar: <span class="hl-bad">criança desnutrida COM edema é criança desnutrida grave</span> — não importa se o peso parece adequado. É exatamente o caso de Josué: inchado, subcutâneo preservado, e ainda assim gravíssimo.</p>

      <h3 class="topic-h">"OU", não "E"</h3>
      <p>O ponto que separa quem entende de quem decora: as três definições são <strong>independentes</strong> e ligadas por <span class="hl-good">"OU"</span>, não por "E". Basta <strong>uma</strong> delas para definir desnutrição grave: Z < -3 <strong>OU</strong> braço < 115 mm <strong>OU</strong> edema bilateral. A banca testa exatamente isso, colocando uma criança com IMC normal + edema e perguntando se ela é grave — e a resposta é sim, pela terceira porta, sozinha.</p>
    </div>

    ${svgPiso(4, { caption: 'as três portas — ative qualquer porta isolada (magreza Z<-3 / braço<115 / edema) e veja "desnutrição grave" acender, demonstrando o "OU". Inclui o caso-desafio: IMC normal + edema = grave.', hint: 'Cada porta é um toggle independente (clique, toque, Enter); estado anunciado por leitor de tela.' })}

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text">Três portas — <strong>magro (Z<-3), fino (braço<115) ou inchado (edema)</strong>. Qualquer uma abre o diagnóstico.</p>
    </aside>

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text">"Criança com IMC normal não pode ter desnutrição grave" é <strong>falso</strong>. A definição do edema dispensa magreza. É a pegadinha-assinatura do tema.</p>
      </div>
    </aside>

    ${med({
      file: 'p4-muac-bracial.jpg',
      alt: 'Profissional de saúde medindo a circunferência do braço de uma criança com fita métrica para rastrear desnutrição grave.',
      achado: 'Circunferência braquial < 115 mm — a porta 2: triagem de campo que dispensa balança.',
      fonte: 'Russell Watkins / DFID, via Wikimedia Commons',
      licenca: 'CC BY-SA 2.0',
      tarja: 'p4'
    })}

    ${notaValor('As três definições da OMS são <strong>independentes</strong>, ligadas por "OU": WHZ/ZIMC < -3 <strong>OU</strong> circunferência braquial < 115 mm <strong>OU</strong> edema bilateral. Qualquer uma isolada já define desnutrição grave (SAM).')}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Quem só procura magreza deixa passar o kwashiorkor, que é justamente o mais grave. A terceira porta é a que salva esses casos.</p>
    </aside>

    ${quiz('p4', 'Critério diagnóstico e o "OU".', [
      {
        stem: 'Uma criança de 2 anos com IMC/idade normal apresenta edema bilateral de membros inferiores e história de dieta pobre em proteína. Pela OMS, ela:',
        alts: [
          { t: 'Não tem desnutrição grave, pois o IMC é normal', correct: false, why: 'É o erro que a banca planta: prende-se ao IMC normal e ignora que a definição do edema dispensa magreza. Cai-se ao equiparar "desnutrição grave" a "magreza visível", o estereótipo que a porta 3 quebra.' },
          { t: 'Tem desnutrição grave, pois edema com carência nutricional define o diagnóstico isoladamente', correct: true, why: 'Certa. A terceira porta — edema bilateral com carência nutricional — define desnutrição grave sozinha, independente do IMC. É a definição que engana: gravidade sem magreza.' },
          { t: 'Só teria desnutrição grave se também tivesse braço < 115 mm', correct: false, why: 'Confunde "OU" com "E": exigir uma segunda definição trata os critérios como cumulativos, quando são independentes — qualquer um isolado basta. Cai-se ao ler a lista como requisitos somados.' },
          { t: 'Precisa de escore-Z < -3 para o diagnóstico', correct: false, why: 'Mesma confusão "OU"/"E": o edema sozinho já define; não é preciso somar o Z < -3. Cai-se ao tratar as portas como uma checklist obrigatória.' },
        ]
      },
      {
        stem: 'As três definições de desnutrição grave da OMS — Z < -3, circunferência braquial < 115 mm e edema bilateral — relacionam-se entre si por:',
        alts: [
          { t: '"E" — é preciso preencher as três', correct: false, why: 'É a confusão clássica: tratar como "E" exigiria a tripla coincidência, tornando o diagnóstico quase impossível e deixando passar a maioria dos casos. Cai-se ao assumir que todos os critérios de uma lista precisam estar presentes.' },
          { t: '"OU" — qualquer uma isolada já define o diagnóstico', correct: true, why: 'Certa. São independentes, ligadas por "OU": uma só basta. É o conceito que separa quem entende de quem decora a lista.' },
          { t: 'Uma sequência obrigatória, da primeira para a terceira', correct: false, why: 'Inventa uma ordem que não existe: as portas não têm hierarquia nem sequência; qualquer uma, isolada, fecha o diagnóstico. Cai-se ao impor uma progressão à lista.' },
          { t: 'Faixa etária: cada uma vale só para uma idade', correct: false, why: 'Mistura com a ressalva da porta 2: só a circunferência braquial tem janela etária preferencial (>6 meses); isso não faz cada definição valer para uma idade. Cai-se ao generalizar a ressalva de uma porta para as três.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 5 — E2 Dado impactante ===================== */
  P.push(page('p5', 5, `
    ${tag('sys', 'Fisiopatologia → achado clínico')}
    ${chips(['forma mais comum', 'carência global', 'autoconsumo', 'face senil'])}

    <figure class="opener opener--stat" aria-label="Dado de abertura">
      <div class="opener__number">+</div>
      <div class="opener__context">O <strong>marasmo é a forma mais comum</strong> de desnutrição grave. Sua marca é a <strong>carência global</strong> — faltou tudo —, e o corpo responde se devorando por dentro: consome a própria gordura e o próprio músculo.</div>
    </figure>

    <h1 class="page-title">Marasmo: a criança que se devora por dentro</h1>

    <div class="prose">
      <h3 class="topic-h">Faltou tudo: a carência global</h3>
      <p>Existem dois espectros principais de desnutrição grave — a criança mais emagrecida e a criança edemaciada (há uma forma intermediária, mas as duas grandes são <strong>marasmo</strong> e <strong>kwashiorkor</strong>). E o <span class="term">marasmo é a forma mais comum</span>. Sua marca é a <span class="hl-bad">carência global de nutrientes</span>: a criança não comeu nada. Faltou gordura, faltou carboidrato, faltou proteína — <strong>faltou tudo</strong>. Não é uma carência seletiva; é privação alimentar completa.</p>

      <h3 class="topic-h">O corpo come o próprio estoque</h3>
      <p>A fisiopatologia é uma lógica de sobrevivência. Sem aporte calórico vindo da dieta, a criança <strong>não tem de onde tirar energia</strong> — então passa a buscar energia no que o corpo ainda tem estocado. E quem estoca energia no corpo é a <strong>gordura</strong> e o <strong>músculo</strong>. A criança então <span class="hl-bad">consome o próprio tecido gorduroso e o próprio tecido muscular</span> para gerar energia. O resultado é a magreza extrema: ela literalmente se devora por dentro, queimando as próprias reservas até ficar pele e osso.</p>

      <h3 class="topic-h">Face senil e perda de tônus</h3>
      <p>Esse autoconsumo deixa assinaturas clínicas clássicas. O consumo da estrutura muscular e gordurosa da face dá a <span class="term">face senil</span> — a criança parece um idosinho, com a face enrugada e sem volume; alguns descrevem como <strong>face simiesca</strong> pela perda da estrutura facial. O aspecto global é o do marasmo clássico: <span class="hl-bad">pele e osso, sem gordura e sem músculo, com aspecto triste</span>. E há um achado funcional importante: a perda muscular é tão intensa que a criança <strong>perde o tônus</strong> — a força muscular, inclusive em repouso. Ela fica em pé e <strong>cai muitas vezes</strong> por falta de tônus. Não é fraqueza passageira; é a musculatura consumida.</p>
    </div>

    ${svgPiso(5, { caption: 'queimando as reservas — arraste o tempo de privação e veja o estoque (gordura + músculo) esvaziar, a silhueta emagrecer e a face assumir o aspecto senil.', hint: 'Slider por setas / arraste; estado clínico narrado por leitor de tela.' })}

    ${med({
      file: 'p5-marasmo-pele-osso.jpg',
      alt: 'Criança com marasmo, magreza extrema, costelas e ossos visíveis, perda total de gordura e músculo subcutâneos.',
      achado: 'Marasmo: pele e osso, face senil — o corpo consumiu a própria gordura e músculo.',
      fonte: 'CDC Public Health Image Library (CDC/Don Eddins), ID #1702',
      licenca: 'Domínio público',
      tarja: 'p5a'
    })}

    ${med({
      file: 'p5b-face-senil-marasmo.jpg',
      alt: 'Rosto de lactente com marasmo grave, com perda da gordura facial conferindo aspecto envelhecido (face senil).',
      achado: 'Face senil — a perda da estrutura facial (bola gordurosa de Bichat) dá o aspecto de idoso.',
      fonte: 'Capt. John Severns, U.S. Air Force',
      licenca: 'Domínio público',
      tarja: 'p5b'
    })}

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text">Marasmo = <strong>"faltou tudo, o corpo se come"</strong> → pele e osso + face senil + sem tônus.</p>
    </aside>

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Não é "magrinha"</h4><p>Marasmo não é uma criança magrinha qualquer.</p></div>
        <div class="dont-confuse__side"><h4>É autoconsumo estrutural</h4><p>É magreza por <strong>consumo</strong> de músculo e gordura, com face senil e perda de tônus — um espectro de colapso, não um biotipo.</p></div>
      </div>
    </div>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Reconhecer a face senil e a perda de tônus diferencia o marasmo de uma magreza constitucional e dispara a investigação de desnutrição grave.</p>
    </aside>

    ${quiz('p5', 'Fisiopatologia e achado clínico do marasmo.', [
      {
        stem: 'Qual achado clínico é mais característico do marasmo e reflete diretamente sua fisiopatologia?',
        alts: [
          { t: 'Edema generalizado por hipoalbuminemia', correct: false, why: 'É do outro espectro: edema por hipoalbuminemia é marca do kwashiorkor (carência proteica com ingestão calórica preservada), onde o corpo acumula em vez de consumir. Cai-se ao trocar os espectros.' },
          { t: 'Face senil com perda de tônus, por consumo da gordura e músculo', correct: true, why: 'Certa. A fisiopatologia do marasmo é o autoconsumo de gordura e músculo (faltou tudo na dieta). A face senil e a perda de tônus são a tradução clínica direta desse processo.' },
          { t: 'Hepatomegalia por esteatose', correct: false, why: 'Também é do kwashiorkor: a esteatose hepática vem do acúmulo de gordura no fígado por carência proteica, não do consumo do marasmo. Cai-se ao atribuir ao marasmo achados da forma edemaciada.' },
          { t: 'Sinal da bandeira no cabelo', correct: false, why: 'É do kwashiorkor: a alternância de cor no cabelo compõe as alterações de fâneros da carência proteica, não do marasmo. Cai-se ao associar qualquer alteração de fâneros a "desnutrição" sem separar as formas.' },
        ]
      },
      {
        stem: 'No marasmo, por que a criança fica "pele e osso"?',
        alts: [
          { t: 'Porque o edema mascara a gordura preservada', correct: false, why: 'Descreve edema: não há retenção nem mascaramento no marasmo — a criança é genuinamente consumida; o edema é do kwashiorkor. Cai-se ao importar o mecanismo do líquido para uma forma que é de depleção.' },
          { t: 'Porque, sem aporte calórico na dieta, o corpo consome o próprio tecido gorduroso e muscular para gerar energia', correct: true, why: 'Certa. Faltou tudo na dieta (carência global) → o corpo busca energia nos estoques → consome gordura e músculo → magreza extrema. A criança se devora por dentro.' },
          { t: 'Porque a proteína ingerida não é absorvida', correct: false, why: 'Descreve má absorção: caberia numa desnutrição secundária desabsortiva, mas o marasmo é primário por carência global de ingestão, não por falha de absorção. Cai-se ao confundir "não aproveitou" com "não recebeu".' },
          { t: 'Porque há retenção de líquido no terceiro espaço', correct: false, why: 'Também descreve edema, não depleção: no marasmo o problema é consumo, não retenção. Cai-se ao importar o mecanismo do kwashiorkor.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 6 — HERÓI — E7 Comparação chocante ===================== */
  P.push(page('p6', 6, `
    ${tag('case', 'HERÓI · síntese diferencial')}
    ${chips(['kwashiorkor', 'cascata do edema', 'sinal da bandeira', 'consome × acumula'])}

    <section class="opener opener--vs" aria-label="Comparação de abertura">
      <div class="opener__vs-grid">
        <div class="opener__vs-side">
          <strong>MARASMO</strong> — faltou tudo. O corpo <em>consome</em> gordura e músculo. Murcha: pele e osso, face senil.
        </div>
        <div class="opener__vs-divider" aria-hidden="true">vs</div>
        <div class="opener__vs-side">
          <strong>KWASHIORKOR</strong> — faltou só a proteína. O corpo <em>acumula</em> líquido. Incha: edema, subcutâneo preservado.
        </div>
      </div>
      <p class="opener__vs-asterisk">Mesma doença — desnutrição grave — por caminhos opostos. Um murcha, o outro incha.</p>
    </section>

    <h1 class="page-title">Marasmo × Kwashiorkor lado a lado</h1>

    <div class="prose">
      <h3 class="topic-h">Kwashiorkor: comeu, mas faltou proteína</h3>
      <p>O nome vem de uma tribo africana. Observou-se que, quando nascia o <strong>segundo filho</strong>, a mãe desmamava o primeiro e amamentava só o recém-nascido; o primeiro filho perdia o aporte de proteína do leite materno e passava a comer só <strong>farinha</strong>. Por isso o kwashiorkor ficou conhecido como a <span class="term">"doença do primeiro filho quando nasce o segundo"</span>. A marca registrada: a criança <span class="hl-warn">ingere nutrientes e calorias, mas NÃO ingere proteína</span>. É o oposto do marasmo — não faltou tudo, faltou <strong>só a proteína</strong>.</p>

      <h3 class="topic-h">A cascata do edema (hipoalbuminemia + inflamação)</h3>
      <p>Aqui está a fisiopatologia que a banca cobra passo a passo. A carência proteica grave deixa o paciente em <span class="term">estado inflamatório sistêmico</span>. Falta de proteína + inflamação geram <span class="hl-bad">hipoalbuminemia</span> (a albumina é a principal proteína do plasma). Com pouca albumina dentro do vaso, cai a pressão oncótica: há mais albumina no interstício do que deveria, e <strong>por osmose o líquido passa de dentro do vaso para o meio intersticial</strong>. Esse deslocamento é <strong>facilitado pelo estado inflamatório</strong>, que aumenta a permeabilidade vascular — o vaso fica mais "vazado". O resultado é o <span class="hl-bad">edema</span>, a manifestação clínica e a marca registrada do kwashiorkor.</p>
      <p>E há a inversão de lógica em relação ao marasmo: como a ingestão calórica é até boa, o paciente <strong>não consome</strong> gordura e músculo para gerar energia — ao contrário, <span class="hl-warn">acumula</span>. Acumula gordura no tecido subcutâneo (por isso o subcutâneo é preservado) e acumula gordura no <strong>fígado</strong> — e o acúmulo de gordura no fígado produz <span class="term">hepatomegalia</span>. Por isso Josué tinha o fígado a 3 cm do rebordo.</p>

      <h3 class="topic-h">A criança que engana: fâneros e sinal da bandeira</h3>
      <p>A grande dificuldade do kwashiorkor é que a criança <strong>não parece emagrecida</strong> — parece até bem preservada em gordura e músculo. Quem espera "pele e osso" passa batido. A suspeita se faz por três alterações clássicas de <span class="term">fâneros</span>:</p>
      <ul>
        <li><strong>Pele</strong>: áreas <strong>hiperpigmentadas misturadas com hipopigmentadas</strong> (mudança de cor irregular).</li>
        <li><strong>Unhas</strong>: fragilidade ungueal.</li>
        <li><strong>Cabelo</strong>: quebradiço, com áreas mais claras e áreas mais escuras alternadas. Essa alternância de cor no cabelo tem nome semiológico — <span class="term">sinal da bandeira</span>.</li>
      </ul>

      <h3 class="topic-h">A tríade de suspeita</h3>
      <p>Grave a tríade que fecha o raciocínio do kwashiorkor: <span class="hl-good">história de carência nutricional proteica + alteração de fâneros + paciente não emagrecido</span> (edemaciado, com subcutâneo preservado). É essa combinação — e não a magreza — que levanta a suspeita. A história de privação proteica é o dado fundamental; sem ela, os fâneros sozinhos não fecham.</p>

      <h3 class="topic-h">Marasmo × kwashiorkor: o comparativo</h3>
      <p>Os dois lado a lado tornam tudo claro. <span class="hl-bad">Marasmo</span>: criança muito emagrecida, <strong>pele e osso</strong>, sem gordura e sem músculo, face senil — o corpo se <strong>consumiu</strong> (faltou tudo). <span class="hl-warn">Kwashiorkor</span>: criança <strong>inchada/edemaciada</strong>, que <strong>preserva</strong> gordura e músculo, com fâneros alterados e hepatomegalia — o corpo <strong>acumulou</strong> (faltou só proteína). A diferença de aspecto é gritante. Ambas são desnutrição grave. E um detalhe de prova: o kwashiorkor é <strong>menos comum</strong> que o marasmo, <strong>porém é até mais grave</strong> — paciente mais hiperinflamado, com evolução mais grave. Menos frequente, mais perigoso.</p>
    </div>

    <figure class="figure-svg figure-svg__embed">
      <div class="hero-stage figure-svg__stage" id="heroHK-stage" data-hs-stage="heroHK">
        ${hero('p6-marasmo-kwashiorkor')}
      </div>
      <figcaption><strong>Síntese —</strong> marasmo (consome) × kwashiorkor (acumula) lado a lado. Toque cada achado nos dois corpos para a explicação; o toggle revela a cascata do edema passo a passo. O eixo central traduz o contraste: queima estoque × retém líquido.</figcaption>
    </figure>

    <div class="prose">
      <h3 class="topic-h">A pegadinha do subcutâneo preservado</h3>
      <p>O subcutâneo preservado do kwashiorkor <strong>não</strong> significa "bem nutrido" — é gordura acumulada por não-consumo, num corpo em carência proteica grave. Aparência preservada, gravidade alta.</p>
    </div>

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text">A criança edemaciada de subcutâneo preservado é a que mais engana — parece a <strong>menos doente</strong> e é a <strong>mais grave</strong>. Procure a história de privação proteica e os fâneros.</p>
      </div>
    </aside>

    ${med({
      file: 'p6-kwashiorkor-edema.jpg',
      alt: 'Crianças com kwashiorkor, com edema e cabelo descolorido cinza-louro típico da carência proteica.',
      achado: 'Kwashiorkor: inchado e preservado — comeu, mas faltou proteína. Edema e cabelo descolorido da carência proteica.',
      fonte: 'CDC Public Health Image Library (CDC/Dr. Lyle Conrad)',
      licenca: 'Domínio público',
      tarja: 'p6'
    })}

    ${med({
      file: 'p6b-sinal-bandeira-cabelo.jpg',
      alt: 'Lactente com kwashiorkor mostrando o sinal da bandeira no cabelo — faixas de cor clara e escura alternadas pela carência proteica.',
      achado: 'Sinal da bandeira — faixas claras e escuras alternadas no cabelo; cada faixa clara marca um período de carência proteica.',
      fonte: 'CDC Public Health Image Library',
      licenca: 'Domínio público',
      tarja: 'p6b'
    })}

    ${med({
      file: 'p6c-dermatose-kwashiorkor.jpg',
      alt: 'Lesão de pele (dermatose) em lactente com kwashiorkor, manifestação cutânea da carência proteica grave.',
      achado: 'Dermatose do kwashiorkor — manifestação cutânea da carência proteica (a pele do kwashiorkor altera cor e descama).',
      fonte: 'Wawot1, via Wikimedia Commons',
      licenca: 'Domínio público'
    })}

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text"><strong>Marasmo consome (faltou tudo) · Kwashiorkor acumula (faltou proteína)</strong>. Um murcha, o outro incha.</p>
    </aside>

    <aside class="op-summary">
      <p class="op-summary__label">Resumo operacional</p>
      <p>Kwashiorkor: faltou proteína → hipoalbuminemia + inflamação → permeabilidade vascular → líquido ao interstício → edema (NÃO é renal). Subcutâneo preservado + hepatomegalia + sinal da bandeira. Menos comum que o marasmo, porém mais grave.</p>
    </aside>

    ${quiz('p6', 'Contraste fisiopatológico e síntese diferencial.', [
      {
        stem: 'Qual é o mecanismo correto do edema no kwashiorkor?',
        alts: [
          { t: 'Retenção renal de sódio por glomerulopatia', correct: false, why: 'É a armadilha renal: o edema não é por retenção glomerular de sódio — é oncótico + inflamatório; a glomerulopatia é a falsa pista do caso de Josué. Cai-se ao importar o mecanismo da síndrome nefrótica, a hipótese-isca da P1.' },
          { t: 'Hipoalbuminemia (queda da pressão oncótica) somada ao aumento da permeabilidade vascular pela inflamação, deslocando líquido para o interstício', correct: true, why: 'Certa. A cascata é dupla: carência proteica → hipoalbuminemia (cai a oncótica, líquido escapa) e inflamação sistêmica (↑ permeabilidade, facilita o escape). Os dois empurram líquido ao interstício → edema.' },
          { t: 'Insuficiência cardíaca por consumo do músculo cardíaco', correct: false, why: 'Confunde com marasmo: o consumo de músculo (inclusive cardíaco) é do marasmo; no kwashiorkor a ingestão calórica é preservada e o corpo acumula, não consome. Cai-se ao misturar a fisiopatologia das duas formas.' },
          { t: 'Obstrução linfática pela hepatomegalia', correct: false, why: 'Inverte a relação com a hepatomegalia: ela é consequência (esteatose), não causa do edema; não há obstrução linfática no mecanismo. Cai-se ao encadear dois achados verdadeiros numa relação causal que não existe.' },
        ]
      },
      {
        stem: 'Uma criança chega edemaciada, com subcutâneo e musculatura aparentemente preservados, cabelo com faixas claras e escuras, e história de dieta só de farinha após o desmame. O diagnóstico e a leitura correta são:',
        alts: [
          { t: 'Marasmo — a preservação de gordura exclui carência grave', correct: false, why: 'Inverte a regra: a preservação de gordura NÃO exclui carência grave — no kwashiorkor ela é gordura acumulada por não-consumo, num corpo em carência proteica. Cai-se ao equiparar "gordura preservada" a "bem nutrido", o erro central do tema.' },
          { t: 'Kwashiorkor — e a aparência preservada NÃO afasta gravidade; é até a forma mais grave', correct: true, why: 'Certa. A tríade está completa: privação proteica (farinha pós-desmame) + fâneros (sinal da bandeira) + não emagrecido/edemaciado. É kwashiorkor clássico — e a forma é até mais grave (mais hiperinflamada).' },
          { t: 'Criança eutrófica com dermatite — sem desnutrição', correct: false, why: 'Ignora a tríade: edema + fâneros + privação proteica não é eutrofia; a dermatose é parte do quadro, não uma dermatite isolada. Cai-se pela falsa tranquilidade da aparência "cheinha".' },
          { t: 'Desnutrição secundária por má absorção', correct: false, why: 'Erra a categoria: a história é de privação proteica na ingestão (primária), não de doença que impede a absorção. Cai-se ao disparar "secundária" diante de uma desnutrição com aparência atípica, ignorando a história alimentar.' },
        ]
      },
      {
        tf: true,
        stem: 'Comparando as duas formas, qual afirmação é correta?',
        alts: [
          { t: 'O kwashiorkor é mais comum e menos grave que o marasmo', correct: false, why: 'Inverte os dois eixos de uma vez: erra a frequência (o marasmo é o mais comum) e a gravidade (o kwashiorkor é o mais grave). Cai-se ao assumir que "mais comum" = "mais grave", quando aqui as duas coisas se dissociam.' },
          { t: 'O marasmo é mais comum; o kwashiorkor é menos comum, porém costuma ser mais grave', correct: true, why: 'Certa. O marasmo é a forma mais frequente; o kwashiorkor é menos comum, mas — por ser mais hiperinflamado, com evolução mais grave — é o quadro de maior cuidado. Menos frequente, mais perigoso.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 7 — E6 Mnemônico-âncora ===================== */
  P.push(page('p7', 7, `
    ${tag('sys', 'Estrutura sequencial · mapa do tratamento')}
    ${chips(['três fases', 'semáforo', 'vermelho → amarelo → verde', 'a ordem é sagrada'])}

    <aside class="opener opener--mnemonic" aria-label="Mnemônico-âncora de abertura">
      <p class="opener__mnemonic-quote">O tratamento é um <em>semáforo</em>: <em>vermelho (não morrer) → amarelo (recuperar) → verde (manter)</em>. As cores não são enfeite — são o risco de morte de cada fase.</p>
      <span class="opener__mnemonic-tag">âncora de memória</span>
    </aside>

    <h1 class="page-title">As três fases: o semáforo do tratamento</h1>

    <div class="prose">
      <h3 class="topic-h">Mesmo tratamento, níveis de medo diferentes</h3>
      <p>O tratamento é <strong>praticamente o mesmo</strong> para as duas formas — marasmo e kwashiorkor. A diferença não está nas etapas, está no <strong>nível de preocupação</strong>: no <span class="hl-warn">kwashiorkor a atenção é maior</span>, porque é o quadro mais hiperinflamado e mais grave. Tanto o paciente com kwashiorkor quanto o com marasmo são, em geral, <strong>internados / hospitalizados</strong> — o kwashiorkor só exige um cuidado adicional. Desnutrição grave, lembre, é diagnóstico de internação.</p>

      <h3 class="topic-h">O semáforo: vermelho → amarelo → verde</h3>
      <p>O tratamento é feito em <strong>três etapas sequenciais</strong>, e a melhor forma de fixá-las é o <span class="term">semáforo</span>:</p>
      <ul>
        <li><span class="hl-bad">Estabilização = vermelho</span>: tirar o paciente da iminência de morte. É a fase do perigo máximo.</li>
        <li><span class="hl-warn">Reabilitação = amarelo</span>: menos risco de óbito; trazer o paciente de volta ao normal, recuperar peso.</li>
        <li><span class="hl-good">Acompanhamento = verde/normal</span>: manter o paciente bem, vigiar para que não recaia.</li>
      </ul>
      <p>As cores não são enfeite — elas traduzem o <strong>risco de morte</strong> em cada fase. Vermelho = pode morrer agora. Amarelo = saiu do pior, mas ainda recupera. Verde = estável, em manutenção.</p>

      <h3 class="topic-h">Por que a ordem é sagrada</h3>
      <p>A avaliação e o tratamento são <strong>sequenciais</strong>: começa na estabilização e termina no acompanhamento, sempre nessa ordem. Não se pula a estabilização para "ganhar tempo" engordando o paciente — fazer isso é justamente o que pode matá-lo (síndrome de realimentação, sobrecarga cardíaca). Cada fase prepara o terreno para a próxima: só se passa ao amarelo quando o vermelho foi vencido; só se passa ao verde quando o amarelo cumpriu seu papel.</p>
    </div>

    ${svgPiso(7, { caption: 'semáforo das fases — clique em cada luz (vermelho/amarelo/verde) e leia o objetivo, o risco de morte e a conduta. Tentar pular do vermelho direto ao verde dispara o aviso "não se reabilita sem estabilizar".', hint: 'Cada luz é o alvo (clique, Enter, setas); step-through bloqueia o salto; estado anunciado por leitor de tela.' })}

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text"><strong>Vermelho (não morrer) → amarelo (recuperar) → verde (manter)</strong>. O semáforo do desnutrido grave.</p>
    </aside>

    ${med({
      file: 'p7-tratamento-hospitalar.jpg',
      alt: 'Criança desnutrida recebendo cuidado e monitorização em uma tenda de tratamento de campo, ilustrando o caráter hospitalar do tratamento.',
      achado: 'Tratamento hospitalar — desnutrição grave se trata internado, em fases. A criança fica sob monitorização.',
      fonte: 'Cate Turton / DFID, via Wikimedia Commons',
      licenca: 'CC BY 2.0',
      tarja: 'p7'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Tentar reabilitar (engordar) antes de estabilizar é o erro que mata — é querer acelerar no sinal vermelho.</p>
    </aside>

    ${quiz('p7', 'A lógica do semáforo e a ordem das fases.', [
      {
        stem: 'Na lógica de semáforo do tratamento da desnutrição grave, o que representa cada cor?',
        alts: [
          { t: 'Vermelho = alta; amarelo = internação; verde = óbito', correct: false, why: 'Embaralha tudo: associa as cores a desfechos administrativos (alta/internação/óbito) em vez do risco de morte de cada fase. Cai-se ao ler "semáforo" como fluxo de internação, não como gradiente de risco.' },
          { t: 'Vermelho = estabilização (risco de morte iminente); amarelo = reabilitação (recuperação); verde = acompanhamento (manutenção)', correct: true, why: 'Certa. As cores traduzem o risco de morte por fase: vermelho é o perigo máximo (estabilização), amarelo é a recuperação (reabilitação), verde é a manutenção (acompanhamento). A sequência é fixa.' },
          { t: 'As cores indicam a gravidade da forma clínica, não as fases', correct: false, why: 'Troca o eixo: o semáforo descreve as fases do tratamento, não a gravidade marasmo × kwashiorkor. Cai-se ao confundir a metáfora das fases com a comparação das formas.' },
          { t: 'Verde = estabilização; amarelo = reabilitação; vermelho = acompanhamento', correct: false, why: 'Inverte a ordem: começar pelo verde e terminar no vermelho contraria a lógica — o paciente entra no vermelho (perigo) e progride para o verde (estável). Cai-se ao decorar "três cores" sem ancorar qual ponta é o perigo.' },
        ]
      },
      {
        tf: true,
        stem: 'Por que não se deve iniciar o ganho rápido de peso (reabilitação) antes de completar a estabilização?',
        alts: [
          { t: 'Porque a reabilitação é mais barata se feita depois', correct: false, why: 'Trivializa a regra: a ordem não é por economia, é por segurança vital — uma sequência clínica, não logística. Cai-se ao procurar uma justificativa administrativa quando a razão é fisiopatológica.' },
          { t: 'Porque acelerar a alimentação antes de estabilizar pode matar o paciente (síndrome de realimentação, sobrecarga cardíaca) — é "acelerar no sinal vermelho"', correct: true, why: 'Certa. A ordem é sagrada: cada fase prepara a próxima. Pular a estabilização para engordar expõe o paciente à síndrome de realimentação e à sobrecarga do coração frágil — os riscos que a estabilização existe para evitar.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 8 — E5 Meta + checklist ===================== */
  P.push(page('p8', 8, `
    ${tag('weight', 'Conduta de emergência · pegadinhas')}
    ${chips(['4 que matam rápido', 'hidratar devagar', 'K + Mg, NÃO sódio', 'ATB sem febre'])}

    <section class="opener opener--checklist" aria-label="Meta da página">
      <p class="opener__checklist-title">Ao final desta página você vai saber:</p>
      <ul class="opener__checklist">
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>Os <strong>4 que matam rápido</strong> (hipotermia · hipoglicemia · distúrbio HE · infecção)</span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>Por que hidratar <code>devagar e por via oral</code></span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>Por que repor <code>K e Mg, mas NÃO sódio</code></span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>Por que dar <code>antibiótico mesmo sem febre</code></span></li>
      </ul>
    </section>

    <h1 class="page-title">Estabilização: o que mata em 24 horas</h1>

    <div class="prose">
      <h3 class="topic-h">Os quatro que matam rápido</h3>
      <p>A estabilização <strong>cura e previne o que pode matar o paciente de imediato</strong>. São <span class="hl-bad">quatro situações</span> que matam rápido o desnutrido grave — grave-as:</p>
      <ol>
        <li><strong>Hipotermia</strong> → agasalhar bem, leito aquecido, elevar a temperatura corporal.</li>
        <li><strong>Hipoglicemia</strong> → monitorar a glicemia com maior frequência e, se houver glicemia perigosa, repor glicose.</li>
        <li><strong>Distúrbio hidroeletrolítico</strong> → repor líquido (se há distúrbio hídrico) e repor eletrólitos.</li>
        <li><strong>Infecções</strong> → tratar (detalhado adiante).</li>
      </ol>
      <p>Essas quatro são o coração da estabilização. Tudo o que vem a seguir é detalhe de <em>como</em> atacá-las sem causar novo dano.</p>

      <h3 class="topic-h">Hidratar sem afogar o coração</h3>
      <p>Aqui mora a primeira grande pegadinha. O desnutrido grave tem a <span class="term">bomba miocárdica que não funciona 100%</span> — o coração não trabalha plenamente, pela própria desnutrição e pelo estado inflamatório sistêmico. Consequência: a hidratação tem que ser <span class="hl-warn">muito cuidadosa</span>. Hidratar rápido demais — como se faria numa criança eutrófica desidratada — pode <span class="hl-bad">jogar a criança numa insuficiência cardíaca congestiva</span>, porque o coração frágil não dá conta do volume. Por isso a hidratação inicial é feita <span class="hl-good">por via oral</span>, lenta, e não com expansão venosa agressiva.</p>

      <h3 class="topic-h">Potássio e magnésio SIM, sódio NÃO</h3>
      <p>A segunda pegadinha, clássica de prova. Na reposição de eletrólitos: <span class="hl-good">repor potássio e repor magnésio</span> — o paciente está depletado dos dois. Mas <span class="hl-bad">o sódio NÃO se repõe nesta primeira fase</span>. Por quê? Porque a hiponatremia do desnutrido grave <strong>não é por falta de sódio corporal</strong>. É uma desorganização: o sódio não está no vaso, está <strong>guardado dentro da célula</strong> (a bomba sódio-potássio falha). Não é hiponatremia verdadeira. Repor sódio aqui é perigoso: quando o paciente começar a melhorar e a bomba voltar a funcionar, o sódio sai da célula e ele pode entrar em <strong>hipernatremia</strong>. Espera-se que o sódio <strong>normalize sozinho</strong> com o andamento do tratamento. Por isso o sódio de Josué (132) não se corrige com reposição.</p>

      <h3 class="topic-h">Antibiótico mesmo sem febre</h3>
      <p>A terceira pegadinha. O desnutrido grave está em <span class="term">estado de imunossupressão</span>: infecta mais e infecta de forma mais grave. E o pior — os sinais clássicos de infecção (febre, leucocitose) podem <strong>não aparecer</strong>, justamente porque a resposta inflamatória está comprometida. Por isso: <span class="hl-bad">todo paciente desnutrido grave recebe antibiótico, mesmo que esteja assintomático</span>. Ele já tem problemas demais para somar um quadro infeccioso, que pode matá-lo. Não se espera a febre para tratar — baixa-se o limiar e cobre-se preventivamente.</p>
    </div>

    ${svgPiso(8, { caption: 'painel da estabilização — clique em cada um dos quatro setores (hipotermia / hipoglicemia / distúrbio HE / infecção) para a conduta e a pegadinha. No sub-toggle dos eletrólitos, arrastar "repor sódio" dispara o alerta de hipernatremia; repor K/Mg confirma.', hint: 'Hotspot é o setor desenhado; drag tem equivalente por teclado (Enter); estado anunciado por leitor de tela.' })}

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova · tríade de ouro da estabilização</p>
        <p class="trap__text">(1) hidratar <strong>devagar e por via oral</strong> — não expandir como em eutrófico; (2) repor <strong>K e Mg, nunca sódio</strong> na fase inicial; (3) <strong>ATB mesmo sem febre</strong>. As três derrubam aluno em prova.</p>
      </div>
    </aside>

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Hiponatremia falsa</h4><p>O sódio sérico está baixo, mas o sódio corporal não está depletado — ele está intracelular, pela bomba Na/K falhada.</p></div>
        <div class="dont-confuse__side"><h4>Por isso NÃO se repõe</h4><p>Repor sódio "porque está baixo no exame" é o erro — ele normaliza sozinho com o tratamento.</p></div>
      </div>
    </div>

    ${med({
      file: 'p8-estabilizacao-tratamento.jpg',
      alt: 'Crianças desnutridas recebendo alimento terapêutico pronto para uso em um programa de tratamento da desnutrição grave.',
      achado: 'Estabilização: tratar e vigiar — glicemia, temperatura, eletrólitos e infecção. O cuidado é hospitalar e monitorizado.',
      fonte: 'USAID Africa Bureau',
      licenca: 'Domínio público',
      tarja: 'p8'
    })}

    ${notaValor('Cutoffs oficiais que a aula trata sem nomear — <strong>hipoglicemia: glicemia < 54 mg/dL (< 3 mmol/L)</strong>; <strong>hipotermia: retal < 35,5 °C ou axilar < 35,0 °C</strong> (SBP/OMS). Números de prova ao lado dos quatro vilões.')}

    ${notaBanca('a OMS 2023 não emitiu recomendação formal de ATB de rotina para SAM <strong>ambulatorial não-complicada</strong>. Para SAM <strong>internada/com complicações</strong> (o cenário desta aula), o ATB de amplo espectro <strong>permanece padrão</strong> — a conduta ensinada não muda.')}

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>"Qual eletrólito NÃO se repõe na estabilização do desnutrido grave?" → <strong>sódio</strong>. E "por quê?" → hiponatremia falsa por disfunção da bomba Na/K.</p>
    </aside>

    ${quiz('p8', 'Conduta de emergência e as pegadinhas de manejo.', [
      {
        stem: 'Por que o sódio NÃO deve ser reposto na fase de estabilização do desnutrido grave, apesar de a dosagem mostrar hiponatremia?',
        alts: [
          { t: 'Porque o sódio causa hipotermia', correct: false, why: 'Inventa um mecanismo: sódio não causa hipotermia — é associação sem fisiopatologia. Cai-se ao chutar um efeito adverso plausível sem ancorar no mecanismo da bomba.' },
          { t: 'Porque a hiponatremia é falsa — o sódio está intracelular por falência da bomba Na/K, e repô-lo leva a hipernatremia na recuperação', correct: true, why: 'Certa. A hiponatremia não é depleção real: o sódio está sequestrado dentro da célula porque a bomba Na/K falhou. Repor enche um compartimento que não está vazio — e quando a bomba volta, o sódio sai e o paciente faz hipernatremia. Espera-se a normalização espontânea.' },
          { t: 'Porque o sódio piora a anemia', correct: false, why: 'Inventa mecanismo: sódio não piora a anemia. Cai-se ao chutar um efeito adverso genérico sem ancorar na bomba Na/K.' },
          { t: 'Porque o sódio compete com a absorção de potássio', correct: false, why: 'Confunde com a reposição correta: potássio e magnésio devem ser repostos; não há competição que justifique segurar sódio — o motivo é a hiponatremia ser falsa. Cai-se ao misturar "o que se repõe" com "o que não se repõe" e inventar uma interação.' },
        ]
      },
      {
        stem: 'Por que a hidratação do desnutrido grave deve ser cautelosa e preferencialmente por via oral?',
        alts: [
          { t: 'Porque a via venosa é dolorosa', correct: false, why: 'Troca a razão clínica por logística: o motivo não é dor, é a fragilidade cardíaca. Cai-se ao buscar uma justificativa prática quando a razão é hemodinâmica.' },
          { t: 'Porque a bomba miocárdica não funciona plenamente, e a hidratação rápida pode precipitar insuficiência cardíaca congestiva', correct: true, why: 'Certa. O coração do desnutrido grave está fragilizado (desnutrição + inflamação) e não tolera sobrecarga; expandir rápido — como num eutrófico desidratado — pode jogá-lo numa ICC. Daí a hidratação lenta e oral.' },
          { t: 'Porque o paciente não tem acesso venoso', correct: false, why: 'Também troca por logística: o motivo não é dificuldade de acesso, é a fragilidade cardíaca. Cai-se ao buscar uma razão prática em vez da hemodinâmica.' },
          { t: 'Porque a via oral repõe sódio mais rápido', correct: false, why: 'Contradiz a conduta do sódio: na estabilização justamente NÃO se quer repor sódio rápido; a via oral é escolhida pela segurança cardíaca. Cai-se ao encadear "via oral" com "repor eletrólito" ignorando que o sódio é o que se evita.' },
        ]
      },
      {
        tf: true,
        stem: 'Por que se prescreve antibiótico ao desnutrido grave mesmo quando ele está assintomático?',
        alts: [
          { t: 'Porque o antibiótico melhora o ganho de peso', correct: false, why: 'Inventa um efeito: o ATB trata/previne infecção, não engorda — isso desvia do real motivo (imunossupressão com clínica pobre). Cai-se ao associar qualquer intervenção da estabilização a "recuperar peso", que é objetivo da reabilitação.' },
          { t: 'Porque ele está imunossuprimido, infecta mais e de forma mais grave, e os sinais clássicos de infecção podem estar ausentes', correct: true, why: 'Certa. A imunossupressão faz a infecção ser mais frequente, mais grave e silenciosa — febre e leucocitose podem faltar. Esperar o sinal clássico é arriscar perder o paciente; por isso se cobre preventivamente.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 9 — E8 Erro comum desmontado ===================== */
  P.push(page('p9', 9, `
    ${tag('weight', 'Fisiopatologia → conduta cautelosa')}
    ${chips(['não "tacar comida"', 'pico de insulina', 'HIPOFOSFATEMIA', 'ferro NÃO'])}

    <section class="opener opener--bust" aria-label="Erro comum desmontado">
      <p class="opener__bust-tag">Erro comum desmontado</p>
      <p class="opener__bust-wrong">"A criança está faminta — então é só dar uma dieta hipercalórica e hiperproteica para ganhar peso rápido."</p>
      <p class="opener__bust-right">Esse instinto é justamente o que <strong>mata</strong>. Realimentar com avidez dispara a síndrome de realimentação. A alimentação inicial tem que ser <strong>balanceada: normo/normo</strong>.</p>
    </section>

    <h1 class="page-title">A armadilha da comida: síndrome de realimentação</h1>

    <div class="prose">
      <h3 class="topic-h">Por que não se "taca comida"</h3>
      <p>O instinto é claro: a criança desnutriu por falta de comida (na maioria das primárias), então <strong>é óbvio que se deve alimentar</strong> — mas com cuidado. "Tacar comida", oferecer uma dieta hipercalórica e hiperproteica logo de cara para ganhar peso rápido, é <span class="hl-bad">errado</span> na estabilização. A alimentação inicial tem que ser <span class="hl-good">balanceada: normocalórica e normoproteica</span>. Não se faz comida demais. Parece contraintuitivo dar pouco a quem está faminto — mas é exatamente esse excesso que pode matar.</p>

      <h3 class="topic-h">O pico de insulina que sequestra eletrólitos</h3>
      <p>A fisiopatologia explica a cautela. O desnutrido grave está com a <span class="term">taxa metabólica muito baixa</span> — o metabolismo lá embaixo, em modo de sobrevivência. Se você alimenta de uma vez, muito rápido, gera um <span class="hl-warn">pico de insulina</span> brusco que "acorda" o metabolismo de repente. Esse pico de insulina manda as células trabalharem "para ontem" — e elas passam a <strong>puxar eletrólitos e nutrientes para dentro de si de forma ávida</strong>. O sangue, de repente, fica depletado dos eletrólitos que migraram para dentro das células.</p>

      <h3 class="topic-h">Hipofosfatemia: a estrela da prova</h3>
      <p>Realimentar com avidez desencadeia a <span class="term">síndrome de realimentação</span>: as células puxam eletrólito rápido demais e o paciente faz <strong>hipocalemia gravíssima</strong>, <strong>hipomagnesemia grave</strong> e <strong>hipofosfatemia grave</strong>. E aqui está a <span class="hl-bad">informação de ouro</span>, o ponto mais cobrado em prova sobre o tema: o grande distúrbio eletrolítico da síndrome de realimentação é a <span class="hl-bad">HIPOFOSFATEMIA grave</span>. Se a prova perguntar qual o distúrbio-marca da síndrome de realimentação, a resposta é fósforo. Grave isso: <strong>realimentação → hipofosfatemia</strong>.</p>

      <h3 class="topic-h">Micronutrientes sim, ferro não</h3>
      <p>Junto da realimentação cautelosa, repõem-se <span class="hl-good">micronutrientes</span>: vitamina A, zinco e vitamina D — o paciente fica realmente carente deles. Mas há uma exceção que é pegadinha clássica: <span class="hl-bad">NÃO se repõe ferro na fase de estabilização</span>. O motivo é elegante: o ferro é um micronutriente <strong>inflamatório</strong> — administrá-lo aumenta a produção de <strong>radical livre</strong>. Num doente já hiperinflamado (especialmente o kwashiorkor), dar ferro <strong>piora a própria fisiopatologia</strong> da doença. Não é a hora. O ferro tem vez — mas só na reabilitação, quando a inflamação cedeu.</p>
    </div>

    ${svgPiso(9, { caption: 'o pico de insulina — escolha a velocidade de realimentação. Em "devagar/balanceada", os eletrólitos no sangue se mantêm; em "ávida/hiper", a insulina dispara, as células puxam fósforo/potássio/magnésio e o sangue despenca em hipofosfatemia (alerta vermelho).', hint: 'Slider de velocidade por setas; alerta da síndrome anunciado por leitor de tela.' })}

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova · a estrela</p>
        <p class="trap__text">O distúrbio eletrolítico-marca da síndrome de realimentação é a <strong>hipofosfatemia</strong>. É o número de ouro do tema.</p>
      </div>
    </aside>

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Micronutrientes SIM</h4><p>Vitamina A, zinco, vitamina D — repostos na estabilização.</p></div>
        <div class="dont-confuse__side"><h4>Ferro NÃO</h4><p>É pró-oxidante (aumenta radical livre) no hiperinflamado — fica para a reabilitação.</p></div>
      </div>
    </div>

    ${med({
      file: 'p9-rutf-realimentacao.jpg',
      alt: 'Sachê de alimento terapêutico pronto para uso (RUTF, à base de pasta de amendoim) usado no tratamento da desnutrição grave.',
      achado: 'Realimentação cautelosa — alimento terapêutico controlado, normocalórico/normoproteico no início. O aporte é medido, não "tacado".',
      fonte: 'Flickr user mastermaq, via Wikimedia Commons',
      licenca: 'CC BY-SA 2.0'
    })}

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text"><strong>"comida devagar, fósforo despenca"</strong> (síndrome de realimentação) · <strong>"ferro espera o amarelo"</strong> (só na reabilitação).</p>
    </aside>

    ${quiz('p9', 'Fisiopatologia, hipofosfatemia-estrela e o ferro-exceção.', [
      {
        stem: 'Qual é o distúrbio eletrolítico mais característico (a "marca") da síndrome de realimentação?',
        alts: [
          { t: 'Hipernatremia', correct: false, why: 'É o oposto do que acontece: na realimentação o problema é depleção (eletrólitos migram para dentro das células), não excesso de sódio; hipernatremia é o risco de repor sódio na estabilização, outro tema. Cai-se ao cruzar com a pegadinha do sódio da página anterior.' },
          { t: 'Hipofosfatemia', correct: true, why: 'Certa. É a informação de ouro: a realimentação ávida gera pico de insulina → as células puxam eletrólitos → o sangue despenca, e o distúrbio-marca é a hipofosfatemia grave. É o ponto mais cobrado em prova sobre o tema.' },
          { t: 'Hipercalemia', correct: false, why: 'Inverte a direção do potássio: a síndrome causa hipocalemia (o potássio entra na célula), não hiper. Cai-se ao lembrar que "potássio se mexe na realimentação" mas errar a direção.' },
          { t: 'Hipocalcemia', correct: false, why: 'Distúrbio plausível mas não a marca: o cálcio pode se alterar, mas o tripé clássico é fósforo/potássio/magnésio, com o fósforo como estrela. Cai-se ao escolher um eletrólito de provas em geral, sem fixar o específico do tema.' },
        ]
      },
      {
        stem: 'Por que NÃO se repõe ferro na fase de estabilização do desnutrido grave?',
        alts: [
          { t: 'Porque o ferro causa constipação', correct: false, why: 'Troca por um efeito menor: a constipação existe em outros contextos, mas não é a razão — o motivo é o estresse oxidativo no hiperinflamado. Cai-se ao recorrer a um efeito adverso genérico do ferro oral.' },
          { t: 'Porque o ferro é pró-oxidante (aumenta radicais livres) e, num paciente já hiperinflamado, piora a própria fisiopatologia da doença', correct: true, why: 'Certa. O ferro é um micronutriente inflamatório: aumenta a produção de radical livre. Dá-lo a um doente já hiperinflamado (sobretudo o kwashiorkor) agrava o quadro. Por isso espera a reabilitação, quando a inflamação cedeu.' },
          { t: 'Porque o ferro compete com o zinco', correct: false, why: 'Troca por uma interação menor: a interação com zinco existe, mas não é a razão — o motivo é o estresse oxidativo. Cai-se ao recorrer a um efeito genérico, ignorando a fisiopatologia específica.' },
          { t: 'Porque não há anemia nessa fase', correct: false, why: 'Factualmente falso: o desnutrido grave costuma ter anemia (Josué tinha Hb 7,8) — o ferro é adiado apesar da anemia, não por falta dela. Cai-se ao assumir que "não repõe" implica "não precisa", quando precisa, mas o momento é errado.' },
        ]
      },
      {
        tf: true,
        stem: 'Qual deve ser a característica da alimentação inicial na estabilização do desnutrido grave?',
        alts: [
          { t: 'Hipercalórica e hiperproteica, para ganho rápido de peso', correct: false, why: 'É o reflexo errado que a página desmonta: "tacar comida" em quem está faminto parece lógico, mas é justamente o que precipita o colapso eletrolítico. Cai-se ao deixar o instinto de compensar a fome ignorar o metabolismo deprimido.' },
          { t: 'Balanceada, normocalórica e normoproteica, para evitar a síndrome de realimentação', correct: true, why: 'Certa. A alimentação inicial é balanceada e moderada (normo/normo). Dieta hiper logo de cara dispara o pico de insulina e a síndrome de realimentação. O ganho de peso com dieta hiper é objetivo da reabilitação, não da estabilização.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 10 — E1 Pergunta central ===================== */
  P.push(page('p10', 10, `
    ${tag('height', 'Progressão terapêutica · critério de transição')}
    ${chips(['~7 dias', 'reabilitação: hiper + ferro', 'acompanhamento', 'alta = clínica + social'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Em que momento o pediatra pode finalmente engordar a criança e dar o ferro que estava proibido — e quem decide que esse momento chegou?</p>
    </section>

    <h1 class="page-title">Reabilitação e acompanhamento: ganhar peso, agora o ferro</h1>

    <div class="prose">
      <h3 class="topic-h">Quando o medo passa</h3>
      <p>A estabilização dura <span class="term">aproximadamente sete dias</span>; passado esse período, entra-se na fase de <strong>reabilitação</strong> (o amarelo do semáforo). Na reabilitação, o paciente <strong>já está fora de maior risco de óbito</strong>, e o objetivo muda: trazê-lo a um estado de <strong>maior normalidade</strong>. E uma mudança-chave de mentalidade: aqui <span class="hl-good">deixa-se de temer a síndrome de realimentação</span> — o metabolismo já não está naquele modo crítico em que o pico de insulina era perigoso. O sinal vermelho ficou para trás.</p>

      <h3 class="topic-h">Reabilitação: hipercalórica, hiperproteica, e o ferro entra</h3>
      <p>A grande marca da reabilitação é o <span class="hl-good">ganho de peso</span>. A criança com marasmo sai de um estado <strong>caquético</strong> para um estado <strong>eutrófico</strong> — agora sim por meio de <strong>dieta hipercalórica e hiperproteica</strong> (o que era proibido na estabilização). E é também na reabilitação que se <span class="hl-good">repõe o ferro</span> — o ferro que ficou de fora na estabilização —, porque já não há tanto medo do quadro hiperinflamatório. A inflamação cedeu, o pró-oxidante deixou de ser ameaça. Quanto tempo dura? <strong>Mais que a estabilização</strong>: pode levar <span class="term">semanas — quatro, seis semanas, às vezes mais</span> — até o paciente voltar a um estado mais normal. Recuperar peso é processo lento.</p>

      <h3 class="topic-h">Acompanhamento: alta clínica + vigilância social</h3>
      <p>A última fase é o <strong>acompanhamento</strong> (o verde). A <span class="term">alta hospitalar</span> é decidida por dois critérios: a <strong>melhora clínica</strong> e a <span class="hl-warn">garantia de que o contexto social do paciente está adequado</span> — não adianta dar alta para uma criança que vai voltar à mesma privação que a adoeceu. A fase de acompanhamento é <strong>ambulatorial</strong>: checar a vulnerabilidade e <strong>pesar o paciente regularmente</strong> para verificar se ele se mantém bem no período pós-tratamento. É a manutenção — vigiar para que a criança não recaia.</p>
    </div>

    ${svgPiso(10, { caption: 'linha do tempo do tratamento — deslize pelo tempo (estabilização ~7 dias → reabilitação 4-6 semanas → acompanhamento ambulatorial) e veja o que muda: dieta normo→hiper, ferro proibido→liberado, foco morte→peso→manutenção.', hint: 'Scrubber arrastável (setas / Home / End); a fronteira é "estabilidade clínica", não "dia 7"; estado anunciado por leitor de tela.' })}

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Estabilização</h4><p>Dieta normo/normo · ferro <strong>proibido</strong>.</p></div>
        <div class="dont-confuse__side"><h4>Reabilitação</h4><p>Dieta vira <strong>hiper/hiper</strong> · ferro <strong>entra</strong>. A mesma criança, condutas opostas — o que muda é a fase.</p></div>
      </div>
    </div>

    ${med({
      file: 'p10-recuperacao-nutricional.jpg',
      alt: 'Criança em seguimento do tratamento da desnutrição com suprimento de alimento terapêutico, na fase de reabilitação e acompanhamento.',
      achado: 'Reabilitação: ganho de peso — do caquético ao eutrófico, em semanas. O acompanhamento ambulatorial pesa a criança regularmente.',
      fonte: 'Russell Watkins / DFID, via Wikimedia Commons',
      licenca: 'CC BY 2.0',
      tarja: 'p10'
    })}

    ${notaBanca('o gatilho real da passagem para a reabilitação é a <strong>estabilidade clínica</strong> + os 7 primeiros dos 10 passos da OMS/SBP, <strong>não um dia fixo no calendário</strong> (tipicamente 2-7 dias). Em prova, "o que define a passagem para reabilitação" = estabilidade clínica, não o sétimo dia.')}

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>(1) o ferro entra na <strong>reabilitação</strong>, não antes; (2) reabilitação = ganho de peso com dieta hiper; (3) alta exige <strong>contexto social adequado</strong>, não só melhora clínica.</p>
    </aside>

    <aside class="op-summary">
      <p class="op-summary__label">Resumo operacional</p>
      <p>Reabilitação (semanas) = engordar (hiper/hiper) + ferro; acompanhamento = alta com contexto social adequado + pesagem regular ambulatorial.</p>
    </aside>

    ${quiz('p10', 'Progressão terapêutica e critério de transição.', [
      {
        stem: 'Em qual fase do tratamento o ferro finalmente é reposto, e por quê?',
        alts: [
          { t: 'Na estabilização, junto dos demais micronutrientes', correct: false, why: 'Repete o erro da estabilização: é lá que o ferro é a exceção entre os micronutrientes (vitamina A, zinco e D entram; ferro não). Cai-se ao agrupar o ferro com os outros, esquecendo que ele é a exceção.' },
          { t: 'Na reabilitação, porque a inflamação já cedeu e o ferro pró-oxidante deixa de agravar o quadro', correct: true, why: 'Certa. O ferro fica proibido na estabilização (pró-oxidante no hiperinflamado) e entra na reabilitação, quando o estado hiperinflamatório cedeu. É o "ferro espera o amarelo".' },
          { t: 'No acompanhamento, após a alta', correct: false, why: 'Atrasa demais: o ferro já é necessário na reabilitação para corrigir a anemia durante o catch-up; não se espera a alta. Cai-se ao assumir que "depois" é sempre "no fim".' },
          { t: 'Nunca, pelo risco de radicais livres', correct: false, why: 'Absolutiza a contraindicação: o ferro não é proibido para sempre — só na fase hiperinflamatória; ele é parte da reabilitação. Cai-se ao confundir "proibido agora" com "proibido sempre".' },
        ]
      },
      {
        stem: 'Além da melhora clínica, qual critério é decisivo para a alta hospitalar do desnutrido grave?',
        alts: [
          { t: 'Atingir um peso máximo predeterminado', correct: false, why: 'Crava um número que não existe: não há peso-alvo fixo; a alta é clínica + social. Cai-se ao procurar um critério numérico objetivo onde a decisão é clínica e contextual.' },
          { t: 'A garantia de que o contexto social do paciente está adequado', correct: true, why: 'Certa. A alta exige dois critérios: melhora clínica E contexto social adequado. Devolver a criança à mesma privação que a adoeceu é garantir a recaída — a vigilância social é parte do tratamento.' },
          { t: 'Normalização isolada do sódio', correct: false, why: 'Isola um dado: a normalização do sódio é esperada ao longo do tratamento, mas não é, sozinha, critério de alta. Cai-se ao eleger um marcador laboratorial específico como gatilho da alta.' },
          { t: 'Completar exatamente 6 semanas de internação', correct: false, why: 'Crava um prazo que não existe: não há tempo exato de internação; a alta é clínica + social. Cai-se ao procurar um critério temporal fixo onde a decisão é contextual.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 11 — E3 Caso clínico (fechamento) ===================== */
  P.push(page('p11', 11, `
    ${tag('case', 'Integração · aplicação ao caso')}
    ${chips(['classificação', 'forma clínica', 'exame faltante', 'conduta inicial'])}

    <article class="opener opener--case" aria-label="Caso clínico de fechamento">
      <span class="opener__case-header">Retorno de Josué · fechando o caso-âncora</span>
      <p class="opener__case-quote">Volta <strong>Josué</strong> — pré-escolar de 3 anos e meio, dieta sem proteína, anasarcado, cabelo descolorido, hepatomegalia, albumina 1,8, sódio e potássio baixos. Com a teoria fechada, as quatro perguntas se respondem sozinhas.</p>
      <dl class="case-card__meta">
        <dt>Pergunta 1</dt><dd>Qual a classificação do estado nutricional?</dd>
        <dt>Pergunta 2</dt><dd>Qual a forma clínica?</dd>
        <dt>Pergunta 3</dt><dd>Qual exame bioquímico faltou?</dd>
        <dt>Pergunta 4</dt><dd>Qual a conduta nutricional inicial?</dd>
      </dl>
    </article>

    <h1 class="page-title">As quatro perguntas de Josué, respondidas</h1>

    <div class="prose">
      <h3 class="topic-h">Classificação: desnutrido + edema = grave</h3>
      <p><strong>Pergunta 1 — qual a classificação do estado nutricional de Josué?</strong> Ele não ingeria proteína e estava anasarcado. Pela OMS, <span class="hl-bad">desnutrido + edema = desnutrição grave</span> — e isso vale <strong>mesmo sem estar emagrecido</strong> (a terceira porta, a que engana). A justificativa é direta: paciente desnutrido com edema. Não importa que o peso (11,5 kg) não pareça catastrófico; o edema, com a carência proteica, já fecha o diagnóstico de gravidade.</p>

      <h3 class="topic-h">Forma clínica: o kwashiorkor clássico</h3>
      <p><strong>Pergunta 2 — qual a forma clínica?</strong> Some os achados: anasarca, <strong>subcutâneo preservado</strong>, cabelo seco e descolorido (alteração de fâneros), alteração cutânea, hepatomegalia. Nada disso combina com marasmo (que seria pele e osso, face senil). É o quadro <span class="hl-warn">clássico de kwashiorkor</span> — a tríade completa: privação proteica + fâneros + não emagrecido. A hepatomegalia, inclusive, é a esteatose do acúmulo de gordura no fígado.</p>

      <h3 class="topic-h">O exame que faltou: a glicemia</h3>
      <p><strong>Pergunta 3 — qual exame bioquímico faltou?</strong> Josué tinha anemia dosada, plaquetas, sódio e potássio. Mas faltou a <span class="hl-bad">glicemia</span>. E não é detalhe: a <strong>hipoglicemia</strong> é uma das causas de óbito imediato que a estabilização ataca (junto de hipotermia, distúrbio hidroeletrolítico e infecção). Não dosar a glicemia de um desnutrido grave é deixar de monitorar um dos quatro vilões que matam rápido — por isso a glicemia era <strong>indispensável</strong>.</p>

      <h3 class="topic-h">A conduta que mataria: "tacar comida"</h3>
      <p><strong>Pergunta 4 — qual a conduta nutricional inicial?</strong> A tentação de "tacar comida" — dieta hiperproteica e hipercalórica para ganho de peso rápido — está <span class="hl-bad">ERRADA</span> na fase de estabilização: pode desencadear a <strong>síndrome de realimentação</strong> (com a hipofosfatemia que você já conhece). O correto inicial é <span class="hl-good">dieta balanceada, normoproteica e normocalórica</span>. A dieta hiper tem vez — mas só na reabilitação, depois que a criança estiver estável.</p>
    </div>

    ${svgPiso(11, { caption: 'as quatro perguntas de Josué — escolha a resposta de cada cartão (classificação / forma / exame faltante / conduta) e leia a justificativa ancorada no achado, com o erro destacado (rim / marasmo / esquecer glicemia / tacar comida).', hint: 'Cada opção desenhada é o alvo (clique, Enter, toque); estado anunciado por leitor de tela.' })}

    <div class="prose">
      <h3 class="topic-h">O que diferencia o aluno avançado</h3>
      <p>O iniciante vê edema + hipoalbuminemia e pensa em rim; o avançado lê a privação proteica, reconhece o kwashiorkor, lembra de dosar a glicemia (o vilão esquecido) e segura a comida na estabilização. As quatro perguntas de Josué são, juntas, o resumo de tudo o que você domina sobre desnutrição grave.</p>
    </div>

    ${med({
      file: 'p11-kwashiorkor-josue.jpg',
      alt: 'Criança com kwashiorkor apresentando edema generalizado, abdome distendido e cabelo descolorido — o conjunto de achados que define o caso de Josué.',
      achado: 'O quadro de Josué — kwashiorkor: edema, subcutâneo preservado, fâneros alterados. O conjunto que fecha as quatro perguntas.',
      fonte: 'CDC Public Health Image Library (Dr. Lyle Conrad), ID #6901',
      licenca: 'Domínio público',
      tarja: 'p11'
    })}

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>O caso de Josué é o modelo de questão integrada — classificação pela porta do edema, forma kwashiorkor, glicemia como exame faltante, e a conduta normo/normo (não hiper) na estabilização.</p>
    </aside>

    <aside class="op-summary">
      <p class="op-summary__label">Resumo operacional</p>
      <p>Josué = desnutrição grave (edema) + kwashiorkor + glicemia faltante + conduta inicial normo/normo (não hiper). Você agora reconhece, classifica e conduz a desnutrição grave do início ao fim.</p>
    </aside>

    ${quiz('p11', 'Integração: aplicar a aula ao caso paradigmático.', [
      {
        stem: 'Qual exame bioquímico faltou na investigação de Josué, e por que sua ausência é grave?',
        alts: [
          { t: 'A albumina, para confirmar a hipoalbuminemia', correct: false, why: 'Já estava feito: a albumina (1,8) consta do caso — pedir de novo o que já se tem não é o que faltou. Cai-se ao escolher um exame "importante" sem checar que ele já foi dosado no enunciado.' },
          { t: 'A glicemia, pois a hipoglicemia é uma das causas de óbito imediato tratadas na estabilização', correct: true, why: 'Certa. Faltou a glicemia. A hipoglicemia é um dos quatro vilões que matam rápido (com hipotermia, distúrbio HE e infecção); não dosá-la é deixar de monitorar uma ameaça letal imediata. Cutoff de prova: glicemia < 54 mg/dL.' },
          { t: 'O hemograma, para avaliar a anemia', correct: false, why: 'Já estava feito: o hemograma (Hb 7,8) consta do caso. Cai-se ao escolher um exame relevante sem checar que ele já foi dosado.' },
          { t: 'O sódio, para guiar a reposição', correct: false, why: 'Já estava feito e duplamente errado: o sódio (132) foi dosado, e na estabilização o sódio NÃO se repõe, então não guiaria reposição. Cai-se ao confundir "dado relevante" com "dado ausente" e ignorar que o sódio não se repõe.' },
        ]
      },
      {
        stem: 'Qual é a conduta nutricional inicial correta para Josué na fase de estabilização?',
        alts: [
          { t: 'Dieta hiperproteica e hipercalórica, para ganho rápido de peso', correct: false, why: 'É o erro que a pergunta 4 cobra: ganho rápido na estabilização é justamente o que mata; a dieta hiper fica para a reabilitação. Cai-se pelo instinto de compensar a fome com fartura, desmontado na página 9.' },
          { t: 'Dieta balanceada, normoproteica e normocalórica, para evitar a síndrome de realimentação', correct: true, why: 'Certa. Na estabilização a dieta é normo/normo e balanceada. A dieta hiper — "tacar comida" — desencadearia a síndrome de realimentação (hipofosfatemia). O ganho de peso com dieta hiper é objetivo da reabilitação.' },
          { t: 'Jejum até a normalização do sódio', correct: false, why: 'Inventa conduta perigosa: jejum priva ainda mais quem precisa de aporte controlado; e o sódio normaliza sozinho, não se espera por ele. Cai-se ao trocar "cautela" por "não alimentar".' },
          { t: 'Apenas hidratação venosa rápida', correct: false, why: 'Inventa conduta perigosa: hidratação venosa rápida precipita ICC no coração frágil, e não substitui a nutrição. Cai-se ao tratar o desnutrido como uma desidratação comum.' },
        ]
      },
      {
        tf: true,
        stem: 'Qual a forma clínica de desnutrição grave de Josué?',
        alts: [
          { t: 'Marasmo, pela hepatomegalia', correct: false, why: 'Usa um achado contra a própria forma: a hepatomegalia é típica do kwashiorkor (esteatose), não do marasmo — citá-la para defender marasmo é inverter o sinal. Cai-se ao pegar um achado isolado sem checar a que forma ele pertence.' },
          { t: 'Kwashiorkor — anasarca com subcutâneo preservado, fâneros alterados e hepatomegalia, sobre história de privação proteica', correct: true, why: 'Certa. O conjunto fecha kwashiorkor: edema com subcutâneo preservado (acúmulo, não consumo), fâneros (cabelo descolorido), hepatomegalia (esteatose) e história de dieta sem proteína. A tríade completa.' },
        ]
      },
    ])}
  `));

  return P;
}
