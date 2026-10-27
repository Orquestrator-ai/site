/* _pages.mjs — conteúdo autoral das 15 páginas da Aula 05 "Síndromes genéticas".
   Texto-aluno = canon do prompt-final (§6). Tópicos visíveis como <h3 class="topic-h">.
   Anti-metalinguagem: voz de professor direto ao aluno; o texto É o conteúdo. Cross-ref de
   CONTEÚDO (neonatologia, crescimento) nomeia o conteúdo, nunca o veículo.
   Aberturas E1-E8 conforme o plano (anti-monotonia). SVGs de piso (S-01..S-11), atlas B-15
   e 2 figuras-herói (P9, P15) embutidos inline pelos helpers do _build (markup parseado,
   script self-contained roda sozinho). Quiz gold (explica TODAS as alternativas) fiel ao
   prompt-final. Eixo cromático: trissomia/GANHO (coral) × monossomia/PERDA (sky) ×
   pegadinha (âmbar) × normal/conduta (verde). */

export function buildPages({ med, svgPiso, svgHero, notaBanca, notaValor, quiz, tag, chips, page }) {
  const P = [];

  /* ===================== PÁGINA 1 — E1 Pergunta central ===================== */
  P.push(page('p1', 1, `
    ${tag('gen', 'Enquadramento · valor do diagnóstico')}
    ${chips(['centenas de síndromes', 'dismorfias', 'pediatra reconhece', 'geneticista nomeia', 'o apanhado de prova'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Se para boa parte das síndromes genéticas não existe tratamento específico, por que vale tanto a pena chegar ao diagnóstico exato?</p>
    </section>

    <h1 class="page-title">O melhor amigo do pediatra é um bom geneticista</h1>

    <div class="prose">
      <h3 class="topic-h">Centenas de síndromes, um pediatra que reconhece dismorfias</h3>
      <p>Existem <span class="term">centenas de síndromes genéticas</span> capazes de alterar o desenvolvimento e o crescimento de uma criança. Diante de tanta variedade, o pediatra não precisa — nem consegue — guardar todas. O que se espera dele na avaliação dessas crianças é mais direto e mais poderoso: <span class="hl-good">identificar a presença de dismorfias</span>, ou seja, perceber que aquela criança tem características morfológicas que fogem do esperado. Reconhecer que "há algo sindrômico" é o primeiro passo — e é tarefa do pediatra geral, não só do especialista.</p>

      <h3 class="topic-h">O geneticista nomeia; o diagnóstico já é tratamento</h3>
      <p>Quem fecha o nome da síndrome é o <span class="term">geneticista</span>. Por isso uma das maiores virtudes de um médico é cultivar bons relacionamentos com especialistas das diversas áreas — e um dos melhores amigos de um pediatra é um bom geneticista. E aqui está o ponto que a pergunta de abertura cobra: ainda que para boa parte das síndromes <span class="hl-warn">não haja tratamento específico</span>, o simples fato de <strong>ter um diagnóstico</strong> traz enorme alento às famílias. Muita família sofre por ter uma criança com atraso de desenvolvimento <strong>sem saber a causa</strong> daquele atraso. Dar o diagnóstico, nomear o que acontece, costuma ser um dos <strong>momentos mais importantes</strong> do cuidado — o diagnóstico, em si, já é parte do tratamento.</p>

      <h3 class="topic-h">Para prova: o apanhado que mais cai</h3>
      <p>Há também uma boa notícia para quem estuda. <span class="hl-good">Não é preciso dominar as centenas de síndromes</span> para fazer prova. O que importa é o <strong>apanhado do que é mais recorrente nos concursos</strong> — um conjunto pequeno e bem definido de síndromes que se repetem nas questões. Dominado esse núcleo, resolve-se a imensa maioria do que se cobra. É exatamente esse apanhado — <span class="term">Down, Turner, Klinefelter, Edwards e Patau</span> — que será construído achado por achado.</p>
    </div>

    ${med({
      file: 'p1-consulta-genetica-pediatria.jpg',
      alt: 'Pediatra examinando uma criança em consulta clínica, com a família ao lado, em cenário de avaliação do desenvolvimento.',
      achado: '<strong>O pediatra reconhece, o geneticista nomeia</strong> — consulta pediátrica de avaliação: o exame físico dirigido é onde nasce a suspeita de síndrome genética, antes do cariótipo, e onde começa o acolhimento da família.',
      fonte: 'Pediatric check-up at a clinic, by Shixart1985, via Wikimedia Commons',
      licenca: 'CC BY 2.0'
    })}

    ${svgPiso('S-12', { caption: 'o mapa das cinco — índice vivo do apanhado: clique em cada uma das cinco síndromes (Down, Turner, Klinefelter, Edwards, Patau) para revelar, antes mesmo de estudá-las, o cromossomo que a nomeia e o achado-âncora; é o esqueleto do que será construído achado por achado nas próximas páginas.', hint: 'Clique em cada síndrome do mapa, ou Tab + Enter; cada nó revela cromossomo + achado-âncora.' })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>A postura certa diante da criança sindrômica não é tentar adivinhar a síndrome rara de cabeça, e sim <strong>reconhecer as dismorfias, acionar o geneticista e acolher a família</strong> — entendendo que o diagnóstico, mesmo sem cura, muda a vida de quem o recebe.</p>
    </aside>

    ${quiz('p1', 'Enquadramento: quem faz o quê, e por que o diagnóstico vale mesmo sem cura.', [
      {
        stem: 'Qual a divisão de papéis correta diante de uma criança com possível síndrome genética?',
        alts: [
          { t: 'O pediatra deve fechar o diagnóstico da síndrome específica de cabeça', correct: false, why: 'Sobrecarrega o pediatra: não se espera (nem é viável) decorar as centenas de síndromes e fechar o nome de cabeça — seu papel é reconhecer a dismorfia. <em>Por que cair na A</em>: confunde-se "reconhecer que é sindrômico" com "nomear a síndrome".' },
          { t: 'O pediatra identifica as dismorfias e o geneticista define qual é a síndrome', correct: true, why: 'Certa. A divisão é clara: o <strong>pediatra reconhece as dismorfias</strong> (percebe que há algo sindrômico) e o <strong>geneticista nomeia</strong> a síndrome. São papéis complementares — por isso o bom relacionamento com o geneticista vale tanto.' },
          { t: 'Sem tratamento específico, não há razão para buscar o diagnóstico', correct: false, why: 'Ignora o valor do diagnóstico: mesmo sem tratamento específico, ele traz alento à família e é parte do cuidado — não buscá-lo é abandonar quem sofre sem saber a causa. <em>Por que cair na C</em>: reduz-se o diagnóstico a "serve para curar".' },
          { t: 'Apenas exames de imagem definem a síndrome, sem avaliação clínica', correct: false, why: 'Descarta a clínica: a suspeita nasce do <strong>exame clínico</strong> das dismorfias; o cariótipo confirma, mas não substitui o olhar. <em>Por que cair na D</em>: superestima-se o laboratório e apaga-se o reconhecimento clínico.' },
        ]
      },
      {
        stem: 'Por que vale a pena chegar ao diagnóstico de uma síndrome genética mesmo quando não há tratamento específico?',
        alts: [
          { t: 'Porque o diagnóstico sempre leva a uma cura', correct: false, why: 'Promete o que não existe: para boa parte das síndromes <strong>não há</strong> tratamento específico; o valor do diagnóstico não está na cura. <em>Por que cair na A</em>: associa-se "diagnóstico" a "cura" de forma automática.' },
          { t: 'Porque ter o diagnóstico traz alento à família e é, em si, parte do tratamento', correct: true, why: 'Certa. O diagnóstico, mesmo sem cura, <strong>nomeia o que acontece</strong> e tira a família do sofrimento de não saber a causa do atraso — por isso costuma ser um dos momentos mais importantes do cuidado.' },
          { t: 'Porque é obrigatório citar a síndrome em todas as provas', correct: false, why: 'Troca o motivo clínico por um motivo de prova: o valor é para a <strong>família e o cuidado</strong>, não uma exigência formal. <em>Por que cair na C</em>: reduz-se a medicina ao que a banca cobra.' },
          { t: 'Porque sem o nome da síndrome a criança não pode ser acompanhada', correct: false, why: 'Exagera a dependência do nome: a criança pode e deve ser acompanhada mesmo durante a investigação; o diagnóstico <strong>soma</strong>, não é pré-requisito para cuidar. <em>Por que cair na D</em>: confunde-se "ajuda muito" com "sem isso não se faz nada".' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 2 — E2 Dado impactante ===================== */
  P.push(page('p2', 2, `
    ${tag('gen', 'Prioridade de prova · conceito-raiz')}
    ${chips(['a rainha da prova', 'trissomia 21 ≠ único mecanismo', 'mais material do 21', 'três caminhos, um destino'])}

    <figure class="opener opener--stat" aria-label="Dado de abertura">
      <span class="opener__number">1ª</span>
      <p class="opener__context">Entre <strong>todas</strong> as síndromes genéticas, uma é abordada com muito mais detalhe nos concursos do que qualquer outra: a <strong>síndrome de Down</strong>. É a que concentra o maior número de questões — e onde vale gastar o estudo mais aprofundado.</p>
    </figure>

    <h1 class="page-title">Síndrome de Down: a rainha da prova — e a raiz no cromossomo 21</h1>

    <div class="prose">
      <h3 class="topic-h">Por que a Down domina a prova</h3>
      <p>Entre todas as síndromes genéticas, a <span class="hl-bad">síndrome de Down</span> é a <strong>mais importante para a prova</strong> — a que é abordada com <strong>maior detalhe</strong> nos concursos. Não é uma entre cinco: é a que concentra o maior número de questões, dos mecanismos genéticos ao seguimento. E há uma razão clínica por trás: a criança com Down tem uma <span class="term">série de características fenotípicas</span> reconhecíveis, muitas perceptíveis mesmo por um olho menos treinado. É uma síndrome de alto rendimento de prova e de alta presença no consultório — por isso merece o estudo mais aprofundado de todas.</p>

      <h3 class="topic-h">Trissomia 21 é a forma comum, não a única</h3>
      <p>Aqui entra a primeira pegadinha. A <span class="term">grande parte</span> das crianças com Down tem <span class="term">trissomia do 21</span> — tanto que alguns usam "trissomia do 21" como <strong>sinônimo</strong> de síndrome de Down. Mas <span class="hl-warn">essa NÃO é a única alteração genética possível</span>. A Down pode resultar de mais de um mecanismo, e tratar "trissomia 21" como o único caminho é errar exatamente o que a banca gosta de cobrar. Guarde desde já: <strong>Down ≠ apenas trissomia 21</strong> — há outros mecanismos que levam ao mesmo quadro.</p>

      <h3 class="topic-h">A raiz: mais material genético do 21</h3>
      <p>Se a forma varia, o que <span class="hl-good">não varia</span> é a raiz do quadro. A criança tem síndrome de Down porque possui, no material genético, uma <strong>maior quantidade de genes do cromossomo 21</strong>. É a <strong>expressão desses genes extras</strong> que justifica as características da síndrome. Essa é a chave que organiza todos os mecanismos que virão: <span class="term">trissomia livre</span>, <span class="term">translocação</span> e <span class="term">mosaico</span> são apenas <strong>caminhos diferentes</strong> para o <strong>mesmo destino</strong> — excesso de material do cromossomo 21. Entendida a raiz, cada mecanismo fica fácil de encaixar.</p>
    </div>

    ${med({
      file: 'p2-face-sindrome-down.jpg',
      alt: 'Menino de 8 anos com fenótipo de síndrome de Down, com a face globalmente reconhecível.',
      achado: '<strong>A síndrome mais cobrada</strong> — fenótipo da síndrome de Down (menino, 8 anos): face globalmente reconhecível (mediofacial achatado, orelhas baixas, fissuras oblíquas). A raiz está num só lugar: mais material do cromossomo 21.',
      fonte: '8-year-old boy with Down syndrome, by Vanellus Foto, via Wikimedia Commons',
      licenca: 'CC BY-SA 3.0'
    })}

    ${svgPiso('S-13', { caption: 'três caminhos, um destino — clique em cada mecanismo (trissomia livre, translocação 14;21, mosaico) para ver de onde vem o excesso de material do 21; por mais que o caminho mude, todos convergem para o mesmo destino: <strong>mais genes do cromossomo 21 → síndrome de Down</strong>.', hint: 'Clique em cada caminho, ou Tab + Enter; observe os três convergindo no mesmo destino.' })}

    <aside class="trap">
      <p class="trap__tag">Pegadinha de prova</p>
      <p class="trap__text">"Trissomia do 21" é a forma <strong>mais comum</strong>, <strong>não</strong> sinônimo absoluto de síndrome de Down — a banca explora quem trata os dois como idênticos, ignorando translocação e mosaico.</p>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Reconhecer que a raiz é "mais material do 21" (e não um mecanismo único) é o que permite entender por que o <strong>cariótipo importa</strong> — ele não só confirma a Down, mas diz <strong>qual</strong> mecanismo, e isso muda o aconselhamento da família.</p>
    </aside>

    ${quiz('p2', 'Prioridade de estudo e o conceito-raiz que organiza todos os mecanismos.', [
      {
        stem: 'Qual afirmação sobre a alteração genética da síndrome de Down está correta?',
        alts: [
          { t: 'Toda síndrome de Down é, obrigatoriamente, trissomia livre do 21', correct: false, why: 'Absolutiza a forma comum: a trissomia <em>livre</em> é a mais frequente, mas há translocação e mosaico — "obrigatoriamente" está errado. <em>Por que cair na A</em>: generaliza-se a maioria para a totalidade.' },
          { t: 'A maioria tem trissomia do 21, mas essa não é a única alteração genética possível', correct: true, why: 'Certa. A trissomia do 21 é a forma <strong>mais comum</strong>, mas <strong>não a única</strong> — a Down também ocorre por translocação e por mosaicismo. Tratar trissomia 21 como sinônimo absoluto é a pegadinha.' },
          { t: '"Trissomia do 21" e "síndrome de Down" são sinônimos exatos, sem exceção', correct: false, why: 'É a pegadinha explícita: muitos usam os termos como sinônimos, mas há exceções (translocação, mosaico). <em>Por que cair na C</em>: aceita-se o atalho de linguagem como verdade genética.' },
          { t: 'A Down decorre de menos material genético do cromossomo 21', correct: false, why: 'Inverte a raiz: a Down vem de <strong>mais</strong> material genético do 21 (excesso), não de menos. <em>Por que cair na D</em>: confunde-se trissomia (a mais) com monossomia (a menos).' },
        ]
      },
      {
        stem: 'Qual é a raiz comum a todos os mecanismos da síndrome de Down?',
        alts: [
          { t: 'A presença de mais material/genes do cromossomo 21', correct: true, why: 'Certa. Independentemente do mecanismo (trissomia livre, translocação ou mosaico), a raiz é sempre <strong>mais material genético do cromossomo 21</strong> — e é a expressão desses genes extras que produz o fenótipo.' },
          { t: 'A ausência de um cromossomo sexual', correct: false, why: 'Descreve o Turner: ausência de cromossomo sexual (45,X) é a monossomia do Turner, não a Down. <em>Por que cair na B</em>: troca-se a alteração autossômica (21) pela sexual (X).' },
          { t: 'Uma mutação pontual em um único gene', correct: false, why: 'Confunde com doença monogênica: a Down é uma alteração <strong>cromossômica</strong> (dose de cromossomo), não mutação de um gene só. <em>Por que cair na C</em>: aplica-se o modelo monogênico a uma aneuploidia.' },
          { t: 'A perda de parte do cromossomo 21', correct: false, why: 'Inverte o sinal: a Down é <strong>ganho</strong> de material do 21, não perda. <em>Por que cair na D</em>: lê-se "alteração do 21" como deleção em vez de excesso.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 3 — E7 Comparação chocante ===================== */
  P.push(page('p3', 3, `
    ${tag('gen', 'Mecanismo 1 · leitura de cariótipo')}
    ${chips(['46,XX / 46,XY', 'trissomia LIVRE', 'três no lugar de dois', 'não-disjunção', 'idade materna'])}

    <section class="opener opener--vs" aria-label="Comparação de abertura">
      <div class="opener__vs-grid">
        <div class="opener__vs-side">
          <h3>Referência</h3>
          <p>No par 21: <strong>dois</strong> cromossomos. O cariótipo é <strong>46,XX</strong> ou <strong>46,XY</strong>.</p>
        </div>
        <div class="opener__vs-divider" aria-hidden="true">vs</div>
        <div class="opener__vs-side">
          <h3>Trissomia livre</h3>
          <p>No par 21: <strong>TRÊS</strong> cromossomos. O cariótipo vira <strong>47,XX,+21</strong>.</p>
        </div>
      </div>
      <p class="opener__vs-asterisk">Dois × três no mesmo ponto. E a tensão que abre o mecanismo: por que esse "um a mais" liga a Down à idade da mãe?</p>
    </section>

    <h1 class="page-title">Mecanismo 1: a trissomia livre e a idade materna</h1>

    <div class="prose">
      <h3 class="topic-h">Como se lê um cariótipo</h3>
      <p>Antes do mecanismo, a ferramenta. No <span class="term">cariótipo</span>, os cromossomos são analisados e agrupados em <strong>pares</strong>, do <strong>1 ao 22</strong> (os cromossomos somáticos/autossomos) e, no finalzinho, os <span class="term">cromossomos sexuais</span> — <strong>XY</strong> no sexo masculino, <strong>XX</strong> no feminino. A notação resume tudo num número e nas letras sexuais: uma <span class="hl-good">menina sem síndrome de Down é 46,XX</span>; um <span class="hl-good">menino sem síndrome de Down é 46,XY</span>. Quarenta e seis cromossomos, organizados em 23 pares. Ler cariótipo é, no fundo, contar pares e checar o par sexual no fim.</p>

      <h3 class="topic-h">Três cromossomos 21 em vez de um par</h3>
      <p>A alteração genética <strong>mais frequente</strong> da síndrome de Down é a <span class="hl-bad">trissomia LIVRE do cromossomo 21</span>. "Livre" porque o cromossomo extra está solto, independente — não colado em outro (isso será a translocação, adiante). Na leitura do cariótipo, ao chegar no <span class="term">cromossomo 21</span>, em vez de um <strong>par</strong> (dois), encontram-se <span class="hl-bad">TRÊS cromossomos 21</span>. É literalmente um a mais naquele ponto: três onde deveria haver dois — o excesso de material do 21 que é a raiz da síndrome, aqui na forma mais comum.</p>

      <h3 class="topic-h">A não-disjunção meiótica e a idade materna</h3>
      <p>De onde vem esse terceiro cromossomo? O mecanismo: a criança, em vez de receber <strong>um</strong> cromossomo 21 da mãe e <strong>um</strong> do pai, recebeu <span class="hl-bad">DOIS cromossomos 21 da mãe</span> e um do pai. A falha primordial ocorreu na <strong>formação do gameta feminino</strong>: <span class="term">não houve a disjunção</span> (separação) daquele par durante a <strong>meiose</strong> que forma o gameta — resultado, um óvulo já com dois 21 que, fecundado, gera um zigoto com três. E aqui está a consequência de prova: <span class="hl-warn">quanto maior a idade materna, maior a probabilidade de a disjunção falhar</span> e maior a chance de gerar um gameta com dois cromossomos 21. <strong>É por isso que a síndrome de Down está tipicamente relacionada à idade materna mais avançada</strong> — a relação é direta e progressiva.</p>

      <h3 class="topic-h">A pegadinha: a origem também pode ser paterna</h3>
      <p>Um detalhe que a banca adora. Embora a não-disjunção seja <strong>em geral de origem materna</strong> (daí toda a ênfase na mãe e na idade materna), ela <span class="hl-warn">também pode ter origem no gameta masculino</span>. Não é exclusivo da mãe — é apenas <strong>majoritariamente</strong> materno. Quem afirma "a não-disjunção do 21 é sempre materna" cai na pegadinha: o correto é "predominantemente materna, mas pode ser paterna".</p>
    </div>

    ${med({
      file: 'p3-cariotipo-trissomia21.jpg',
      alt: 'Cariótipo humano 47,XY,+21 com o par 21 exibindo três cromossomos, evidenciando a trissomia do 21.',
      achado: '<strong>Três onde deveria haver dois</strong> — cariótipo 47,XY,+21: trissomia livre do 21, a forma mais comum da Down. O par 21 exibe três cromossomos em vez de dois.',
      fonte: 'Karyotype of trisomy 21, U.S. DOE Human Genome Program, via Wikimedia Commons',
      licenca: 'Domínio público'
    })}

    ${svgPiso('S-01', { caption: 'o cariótipo da trissomia livre — clique no próprio trio de cromossomos 21 (o elemento alterado, não um número solto) para revelar "três cromossomos 21, um a mais"; use o toggle <strong>normal × trissomia</strong> para ver o par 21 ganhando o terceiro cromossomo (46,XX → 47,XX,+21).', hint: 'Clique no trio do 21, ou Tab + Enter; o toggle alterna normal × trissomia.' })}

    <aside class="dont-confuse">
      <p class="dont-confuse__tag">Não confunda</p>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Trissomia livre</h4><p>cromossomo 21 extra <strong>solto</strong>, independente — risco de recorrência basal por idade.</p></div>
        <div class="dont-confuse__side"><h4>Translocação</h4><p>parte do 21 <strong>colada</strong> em outro cromossomo — muda o aconselhamento (próxima página).</p></div>
      </div>
    </aside>

    <aside class="trap">
      <p class="trap__tag">Pegadinha de prova</p>
      <p class="trap__text">A não-disjunção é <strong>predominantemente materna</strong> (relação com a idade da mãe), <strong>mas pode ser de origem paterna</strong> — "sempre materna" está errado.</p>
    </aside>

    ${quiz('p3', 'Mecanismo da trissomia livre e a origem do erro de disjunção.', [
      {
        stem: 'Qual é o mecanismo da trissomia livre do 21 na síndrome de Down?',
        alts: [
          { t: 'Parte do cromossomo 21 cola-se a outro cromossomo (ex.: o 14)', correct: false, why: 'Descreve a translocação: cromossomo colado em outro (21 no 14) é o mecanismo de translocação, não a trissomia livre. <em>Por que cair na A</em>: confunde-se "livre" (solto) com "translocado" (colado).' },
          { t: 'Não-disjunção meiótica: o gameta (em geral materno) leva dois cromossomos 21, e o zigoto fica com três', correct: true, why: 'Certa. Na trissomia livre, a falha é a <strong>não-disjunção</strong> na meiose de formação do gameta (predominantemente o materno): o gameta carrega <strong>dois</strong> cromossomos 21 e, somado ao um do outro genitor, o zigoto fica com <strong>três</strong> — o cromossomo extra solto/independente.' },
          { t: 'A alteração ocorre após a fecundação, na mitose, gerando várias linhagens', correct: false, why: 'Descreve o mosaicismo: alteração <strong>pós-fecundação</strong> na mitose, com várias linhagens, é o mosaico — não a trissomia livre (meiótica/pré-fecundação). <em>Por que cair na C</em>: troca-se o momento (meiose × mitose) do erro.' },
          { t: 'Falta um cromossomo 21, totalizando 45', correct: false, why: 'Descreve uma monossomia: faltar um cromossomo (45) é monossomia (como o Turner) — a trissomia é <strong>ganho</strong> (47), não perda. <em>Por que cair na D</em>: inverte-se ganho por perda de cromossomo.' },
        ]
      },
      {
        stem: 'Sobre a relação da trissomia livre do 21 com a origem do erro, qual afirmação é correta?',
        alts: [
          { t: 'A não-disjunção é sempre de origem materna, sem exceção', correct: false, why: 'Absolutiza a origem materna: é predominante, não exclusiva — a origem paterna existe. <em>Por que cair na A</em>: lê-se "ênfase na mãe" como "exclusivamente a mãe".' },
          { t: 'É predominantemente materna (relacionada à idade da mãe), mas pode ter origem paterna', correct: true, why: 'Certa. A não-disjunção é <strong>majoritariamente materna</strong> — e por isso o risco cresce com a <strong>idade da mãe</strong> —, mas <strong>também pode ser paterna</strong>. A pegadinha é justamente o "sempre materna".' },
          { t: 'É sempre de origem paterna', correct: false, why: 'Inverte a predominância: a maioria é materna, não paterna. <em>Por que cair na C</em>: superdimensiona-se a exceção (paterna) até torná-la regra.' },
          { t: 'A idade materna não tem relação com o risco de não-disjunção', correct: false, why: 'Nega a relação com a idade: quanto maior a idade materna, <strong>maior</strong> a chance de não-disjunção — é a base da associação Down ↔ idade materna. <em>Por que cair na D</em>: ignora-se a relação dose-resposta clássica.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 4 — E4 Achado típico / pegadinha ===================== */
  P.push(page('p4', 4, `
    ${tag('sys', 'Mecanismo 2 · aconselhamento')}
    ${chips(['translocação 14;21', 'portador equilibrado', 'sem Down', 'cariotipar os PAIS', 'recorrência'])}

    <aside class="opener opener--trap" aria-label="Achado de abertura">
      <svg class="opener__trap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>
      <div class="opener__trap-body">
        <p class="opener__trap-tag">O cenário que parece um paradoxo</p>
        <p class="opener__trap-text">Um pai <strong>SEM</strong> síndrome de Down, com cariótipo que <strong>em número</strong> parece normal, gera um filho <strong>com</strong> Down. Parece detalhe — é dos pontos que <strong>mais caem</strong>. A explicação está em onde o cromossomo 21 mora.</p>
      </div>
    </aside>

    <h1 class="page-title">Mecanismo 2: a translocação 14;21 e o aconselhamento do casal</h1>

    <div class="prose">
      <h3 class="topic-h">O que é uma translocação</h3>
      <p>A criança com Down também pode ter a síndrome por uma <span class="hl-bad">translocação</span> — e isso <span class="hl-warn">pode parecer detalhe, mas não é</span>: talvez seja um dos aspectos da síndrome de Down que <strong>mais vem aparecendo nas provas</strong>. A definição é simples: <span class="term">translocação</span> é quando <strong>parte de um cromossomo está colada em outro cromossomo</strong> do indivíduo. Na Down, o clássico é parte do cromossomo <strong>21</strong> deslocada para o cromossomo <strong>14</strong> (a translocação robertsoniana 14;21). Diferente da trissomia livre (onde o 21 extra está solto), aqui o material do 21 está <strong>colado</strong> em outro cromossomo.</p>

      <h3 class="topic-h">O portador equilibrado que NÃO tem Down</h3>
      <p>Aqui está a armadilha. Imagine um indivíduo <span class="hl-good">SEM síndrome de Down</span>, com cariótipo que em número parece <strong>46,XX</strong>: ele tem um cromossomo 21 inteiro e um <strong>outro</strong> cromossomo 21 que foi <strong>quebrado</strong>, com parte deslocada para o cromossomo 14. Esse é o <span class="term">portador equilibrado</span>. E por que ele <strong>não</strong> tem Down? Porque, <span class="hl-good">quantitativamente, ele NÃO tem mais material genético do 21</span> — a parte do 21 apenas mudou de endereço (foi para o 14), mas a <strong>quantidade total</strong> de material do 21 está correta. Lembre da raiz: a Down vem de <strong>mais</strong> material do 21. Sem excesso de material, sem síndrome — ainda que um pedaço do 21 esteja num lugar incomum. É "equilibrado" justamente porque não há ganho nem perda líquida.</p>

      <h3 class="topic-h">Como o portador gera um filho com Down</h3>
      <p>O problema aparece na <strong>formação do gameta</strong> do portador. Ele pode gerar um gameta que carrega: um cromossomo <strong>21 inteiro</strong>, um cromossomo <strong>14 inteiro</strong> e, <strong>ainda</strong>, <span class="hl-bad">parte de um 21 colada nesse 14</span>. Quando esse gameta é fecundado por um gameta normal (com um 21 inteiro e um 14 inteiro), o zigoto resultante terá <strong>um par de 21 MAIS um 14 com um pedaço de 21 colado</strong> — ou seja, <span class="hl-bad">mais material genético do cromossomo 21 → síndrome de Down</span>. O filho tem Down por translocação: a raiz é a mesma (excesso de material do 21), o caminho é outro.</p>

      <h3 class="topic-h">A virada do aconselhamento: cariotipar os PAIS</h3>
      <p>Esta é a implicação que a banca cobra. Na <span class="hl-good">trissomia livre</span>, o risco de o casal ter um <strong>novo</strong> filho com Down é o <strong>mesmo de um casal de mesma idade</strong> (basal por idade) — não há razão herdada. Mas se o cariótipo da criança revela Down por <span class="hl-bad">TRANSLOCAÇÃO</span>, muda tudo: deve-se realizar o <strong>cariótipo dos PAIS</strong> para identificar <strong>qual deles é portador</strong> da translocação (eventualmente <strong>ambos</strong>). O objetivo de cariotipar os pais é <strong>definir o risco real</strong> que aquele casal tem de ter um novo filho com Down — risco que, na translocação herdada, pode ser muito maior que o basal. É o cariótipo da criança que abre essa investigação: ele não só confirma a Down, ele diz <strong>qual mecanismo</strong> e, com isso, <strong>se os pais precisam ser estudados</strong>.</p>
    </div>

    ${med({
      file: 'p4-cariotipo-translocacao-14-21.jpg',
      alt: 'Cariótipo de translocação robertsoniana 14;21, com o cromossomo derivativo carregando o material do 21 fundido ao 14.',
      achado: '<strong>O 21 que mudou de endereço</strong> — cariótipo 46,XX,der(14;21)(q10;q10),+21: translocação robertsoniana; o derivativo carrega o 21 extra fundido ao 14. Na forma equilibrada, o portador não tem Down.',
      fonte: 'Kolgeci S et al., Acta Inform Med 2015;23(3):178-183, via NIH PMC',
      licenca: 'CC BY-NC 4.0'
    })}

    ${svgPiso('S-02', { caption: 'o cariótipo da translocação — clique no próprio cromossomo derivativo 14;21 desenhado (o par 14 com o pedaço de 21 colado) para revelar "parte do 21 colada no 14"; o modo <strong>portador equilibrado × filho com Down</strong> mostra, lado a lado, por que o portador (quantidade normal) não tem a síndrome e o filho (quantidade aumentada) tem.', hint: 'Clique no derivativo 14;21, ou Tab + Enter; alterne portador × filho.' })}

    ${notaValor('números de recorrência — trissomia <strong>livre ~1%</strong> (≈ basal por idade); <strong>translocação herdada</strong> muito maior, conforme o portador e os cromossomos. Clássico de prova: <strong>t(21;21) herdada ≈ 100%</strong> de recorrência; t(14;21) materna ~10-15%, paterna ~1-2%. Por isso se cariotipam os pais.')}

    <aside class="dont-confuse">
      <p class="dont-confuse__tag">Não confunda</p>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Portador equilibrado</h4><p><strong>sem</strong> Down — quantidade normal de material do 21 (apenas realocado).</p></div>
        <div class="dont-confuse__side"><h4>Filho desequilibrado</h4><p><strong>com</strong> Down — excesso de material do 21. Mesmo "21 no 14", quantidades diferentes, desfechos opostos.</p></div>
      </div>
    </aside>

    <aside class="trap">
      <p class="trap__tag">Pegadinha de prova</p>
      <p class="trap__text">Down por <strong>translocação</strong> → cariotipar os <strong>pais</strong> (risco de recorrência alterado); Down por <strong>trissomia livre</strong> → risco de recorrência <strong>basal por idade</strong> (não se cariotipa os pais por esse motivo).</p>
    </aside>

    ${quiz('p4', 'O portador equilibrado e a virada do aconselhamento na translocação.', [
      {
        stem: 'Por que um portador equilibrado da translocação 14;21 NÃO tem síndrome de Down?',
        alts: [
          { t: 'Porque ele tem um cromossomo 21 a menos', correct: false, why: 'Inverte para perda: ele não tem material a menos (isso seria monossomia) — tem a quantidade normal, só rearranjada. <em>Por que cair na A</em>: confunde-se rearranjo (equilibrado) com deleção (perda).' },
          { t: 'Porque, embora parte do 21 esteja colada no 14, a quantidade total de material do 21 é normal (não há excesso)', correct: true, why: 'Certa. O portador equilibrado tem o material do 21 <strong>realocado</strong> (parte colada no 14), mas a <strong>quantidade total</strong> é <strong>normal</strong> — e como a Down vem de <strong>excesso</strong>, sem excesso não há síndrome.' },
          { t: 'Porque a translocação nunca causa síndrome de Down', correct: false, why: 'Generaliza errado: a translocação <strong>pode sim</strong> causar Down — no filho que herda o gameta desequilibrado. O portador é que não tem. <em>Por que cair na C</em>: estende-se "o portador não tem" para "a translocação nunca causa".' },
          { t: 'Porque ele tem 47 cromossomos equilibrados', correct: false, why: 'Erra a contagem: o portador equilibrado tem em geral <strong>46</strong> cromossomos (numérico normal), com o rearranjo escondido — não 47. <em>Por que cair na D</em>: imagina-se que todo mecanismo de Down implica 47 cromossomos.' },
        ]
      },
      {
        stem: 'O cariótipo de uma criança revela síndrome de Down por translocação. Qual a conduta de aconselhamento?',
        alts: [
          { t: 'Tranquilizar o casal: o risco de recorrência é igual ao basal por idade', correct: false, why: 'Confunde com a trissomia livre: o risco basal por idade vale para a forma <strong>livre</strong>, não para a translocação herdada. <em>Por que cair na A</em>: aplica-se a regra da forma comum à exceção que muda o risco.' },
          { t: 'Cariotipar os pais para identificar o portador da translocação e definir o risco real de recorrência', correct: true, why: 'Certa. Na Down por <strong>translocação</strong>, cariotipam-se os <strong>pais</strong> para descobrir qual deles é portador (às vezes ambos) e estimar o <strong>risco real</strong> de um novo filho com Down — que pode ser muito maior que o basal.' },
          { t: 'Nenhuma investigação adicional é necessária', correct: false, why: 'Abandona a investigação devida: justamente na translocação o estudo dos pais é <strong>obrigatório</strong> para o aconselhamento. <em>Por que cair na C</em>: trata-se a translocação como se não tivesse implicação familiar.' },
          { t: 'Cariotipar apenas a mãe, pois a alteração é sempre materna', correct: false, why: 'Restringe à mãe sem base: o portador pode ser o pai, a mãe, ou ambos — cariotipam-se <strong>os dois</strong>. <em>Por que cair na D</em>: transfere-se a predominância materna da trissomia livre para a translocação (que não tem esse viés).' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 5 — E6 Mnemônico-âncora primeiro ===================== */
  P.push(page('p5', 5, `
    ${tag('sys', 'Mecanismo 3 · síntese dos três')}
    ${chips(['mosaico', 'erro pós-fecundação', 'mitose', 'várias linhagens', 'três caminhos, um destino'])}

    <aside class="opener opener--mnemonic" aria-label="Mnemônico-âncora de abertura">
      <p class="opener__mnemonic-quote"><em>Três caminhos, um destino.</em> Trissomia livre · translocação · <em>mosaico</em> → todos levam a <em>mais material do cromossomo 21 → síndrome de Down</em>. Muda o <em>como</em>; não muda a <em>raiz</em>.</p>
      <p class="opener__mnemonic-tag">Âncora da página</p>
    </aside>

    <h1 class="page-title">Mecanismo 3: o mosaico — e os três caminhos para a mesma síndrome</h1>

    <div class="prose">
      <h3 class="topic-h">Mosaicismo: a alteração que vem depois da fecundação</h3>
      <p>O terceiro mecanismo é o <span class="hl-bad">mosaico</span>. Sua marca distintiva é o <strong>momento</strong> em que o erro acontece. Na trissomia livre e na translocação, a alteração já está no <strong>gameta</strong> ou na <strong>fecundação</strong> — ou seja, <strong>antes</strong> de o embrião começar a se dividir. No mosaicismo é diferente: a alteração genética <span class="hl-warn">NÃO aconteceu na formação do gameta nem na fecundação, mas DEPOIS da fecundação</span>, durante o processo <span class="term">mitótico</span> (a divisão das células do embrião já formado). Um erro de divisão em uma célula, já no embrião, propaga o cromossomo extra apenas para a descendência <strong>daquela</strong> célula.</p>

      <h3 class="topic-h">Várias linhagens celulares no mesmo corpo</h3>
      <p>A consequência direta desse momento tardio: o indivíduo terá <span class="hl-bad">várias linhagens celulares diferentes</span>. Como o erro surgiu numa célula <strong>depois</strong> que outras já tinham se dividido normalmente, parte das células fica com a contagem normal de cromossomos e parte fica com o cromossomo 21 extra — um <span class="term">mosaico</span> de linhagens (daí o nome). É o mesmo corpo com populações celulares geneticamente distintas, ao contrário da trissomia livre e da translocação, em que <strong>todas</strong> as células carregam a alteração desde o início.</p>

      <h3 class="topic-h">Os três mecanismos, um só resultado</h3>
      <p>Fecha-se aqui o trio. <span class="hl-bad">Trissomia livre</span> (cromossomo 21 extra solto, erro na meiose materna em geral), <span class="hl-bad">translocação</span> (parte do 21 colada em outro cromossomo, com implicação para o cariótipo dos pais) e <span class="hl-bad">mosaico</span> (erro pós-fecundação na mitose, várias linhagens). Três caminhos genéticos distintos que <span class="hl-good">convergem para o mesmo destino</span>: mais material do cromossomo 21 e, portanto, síndrome de Down. É por isso que o <strong>cariótipo</strong> importa tanto — ele não diz só "é Down", diz <strong>qual</strong> dos três caminhos, e isso muda o aconselhamento (sobretudo na translocação).</p>
    </div>

    ${med({
      file: 'p5-mosaicismo-diagrama.jpg',
      alt: 'Diagrama de não-disjunção na mitose pós-zigótica, mostrando a origem do mosaicismo com uma linhagem trissômica e uma linhagem normal.',
      achado: '<strong>Um corpo, duas linhagens</strong> — não-disjunção na mitose pós-zigótica: origem do mosaicismo, com linhagem trissômica (2n+1) e linhagem normal. No mosaico o erro é mitótico, pós-fecundação; parte das células é normal.',
      fonte: 'Alex Federspiel, via Wikimedia Commons',
      licenca: 'CC BY-SA 4.0'
    })}

    ${svgPiso('S-03', { caption: 'o comparador dos três mecanismos — navegue passo a passo (anterior/próximo) por <strong>livre → translocação → mosaico</strong>; cada passo mostra o <strong>momento do erro</strong> (meiose / rearranjo / mitose pós-fecundação) e o <strong>resultado</strong> (extra solto / colado no 14 / linhagens mistas), sempre terminando na convergência "mais material do 21 → Down".', hint: 'Navegação por passos: use os botões anterior/próximo, ou as setas do teclado.' })}

    <aside class="dont-confuse">
      <p class="dont-confuse__tag">Não confunda — o momento do erro separa os mecanismos</p>
      <div class="dont-confuse__grid dont-confuse__grid--3">
        <div class="dont-confuse__side"><h4>Trissomia livre</h4><p>meiose / gameta (antes da fecundação).</p></div>
        <div class="dont-confuse__side"><h4>Translocação</h4><p>rearranjo herdado ou de novo.</p></div>
        <div class="dont-confuse__side"><h4>Mosaico</h4><p><strong>mitose pós-fecundação</strong> — linhagens celulares mistas.</p></div>
      </div>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Identificar o mecanismo pelo cariótipo orienta o aconselhamento (basal na livre × estudo dos pais na translocação) e ajuda a entender a variabilidade clínica — o mosaicismo, por ter células normais misturadas, pode cursar com fenótipo mais variável.</p>
    </aside>

    ${quiz('p5', 'O que o mosaico tem de diferente e o que une os três mecanismos.', [
      {
        stem: 'O que caracteriza o mosaicismo como mecanismo da síndrome de Down?',
        alts: [
          { t: 'A alteração ocorre na meiose, antes da fecundação', correct: false, why: 'Descreve a trissomia livre: erro na <strong>meiose</strong>, antes da fecundação — todas as células ficam alteradas. <em>Por que cair na A</em>: troca-se o momento (meiose × mitose pós-fecundação).' },
          { t: 'A alteração ocorre após a fecundação, na mitose, gerando várias linhagens celulares', correct: true, why: 'Certa. No mosaico, o erro é <strong>pós-fecundação</strong>, durante a <strong>mitose</strong> do embrião já formado — por isso o indivíduo tem <strong>várias linhagens celulares</strong> (umas normais, outras com o 21 extra).' },
          { t: 'Parte do cromossomo 21 cola-se ao cromossomo 14', correct: false, why: 'Descreve a translocação: 21 colado no 14 é translocação, não mosaico. <em>Por que cair na C</em>: confunde-se o tipo de rearranjo com o momento do erro.' },
          { t: 'Há perda de um cromossomo 21', correct: false, why: 'Descreve uma monossomia: perda de cromossomo é monossomia (Turner), não mosaico de Down (que é ganho em parte das células). <em>Por que cair na D</em>: inverte-se ganho por perda.' },
        ]
      },
      {
        stem: 'O que os três mecanismos da síndrome de Down (trissomia livre, translocação e mosaicismo) têm em comum?',
        alts: [
          { t: 'Todos resultam em mais material genético do cromossomo 21', correct: true, why: 'Certa. Os três caminhos convergem para a <strong>mesma raiz</strong>: excesso de material do cromossomo 21. Muda o <em>como</em>, não muda o <em>resultado</em>.' },
          { t: 'Todos ocorrem exclusivamente na meiose materna', correct: false, why: 'Generaliza a origem da trissomia livre: só ela é tipicamente meiótica materna; a translocação envolve rearranjo (herdado ou de novo) e o mosaico é mitótico pós-fecundação. <em>Por que cair na B</em>: estende-se o mecanismo da forma comum a todos.' },
          { t: 'Todos exigem cariotipar os pais', correct: false, why: 'Generaliza a conduta da translocação: cariotipar os pais é a conduta da <strong>translocação</strong>; na livre o risco é basal. <em>Por que cair na C</em>: aplica-se a regra de uma exceção a todos.' },
          { t: 'Todos resultam em 45 cromossomos', correct: false, why: 'Confunde com monossomia: 45 cromossomos é monossomia (Turner) — a Down é ganho de material (excesso do 21). <em>Por que cair na D</em>: troca-se ganho por perda.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 6 — E4 Achado típico / pegadinha (QUADRO-CLÍNICO-RICO) ===================== */
  P.push(page('p6', 6, `
    ${tag('case', 'Atlas fenotípico · diagnóstico clínico')}
    ${chips(['hipotonia universal', 'face: fenda oblíqua, epicanto, Brushfield', 'pseudomacroglossia', 'prega palmar única', 'sinal da sandália'])}

    <aside class="opener opener--trap" aria-label="Achado de abertura">
      <svg class="opener__trap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>
      <div class="opener__trap-body">
        <p class="opener__trap-tag">O achado que parece óbvio — e esconde a pegadinha</p>
        <p class="opener__trap-text">A língua "grande" da Down <strong>parece</strong> macroglossia. Mas é <strong>pseudo</strong>macroglossia: o tecido lingual é normal, só fica protruso. Reconhecer a face exige cuidado com o que parece e o que é.</p>
      </div>
    </aside>

    <h1 class="page-title">O rosto, as mãos e os pés da Down: o diagnóstico que se faz no olhar</h1>

    <div class="prose">
      <h3 class="topic-h">Hipotonia: o achado universal</h3>
      <p>Na prova, <strong>ou</strong> a banca mostra a <strong>imagem</strong> da criança, <strong>ou</strong> dá a <strong>descrição</strong> dos achados — e nos dois casos é preciso reconhecer o <strong>conjunto fenotípico</strong> da Down. Várias características aparecem já no <span class="term">período neonatal</span>, e há um achado que é <span class="hl-bad">UNIVERSAL</span>: a <span class="hl-bad">hipotonia</span>. <strong>Todo</strong> recém-nascido com síndrome de Down será hipotônico — uma redução do tônus muscular percebida já no <strong>primeiro exame físico</strong>, o bebê "molinho" ao manuseio. Se há um único achado para guardar como sempre presente, é a hipotonia.</p>

      <h3 class="topic-h">A face: fenda oblíqua, epicanto, braquicefalia, achatamento, hipertelorismo, Brushfield</h3>
      <p>O rosto da Down concentra vários sinais clássicos:</p>
      <ul class="find-list">
        <li><span class="term">Fenda palpebral oblíqua</span>, inclinada <strong>superiormente</strong> (as pálpebras "sobem" para fora).</li>
        <li><span class="term">Prega epicântica</span> — prega cutânea na <strong>região interna dos olhos</strong>.</li>
        <li><span class="term">Braquicefalia</span> — estreitamento/encurtamento do crânio.</li>
        <li><span class="term">Face achatada</span> — o perfil facial descrito como mais plano.</li>
        <li><span class="term">Hipertelorismo</span> — afastamento ocular aumentado, que pode acompanhar a prega epicântica.</li>
        <li><span class="term">Manchas de Brushfield</span> — pequenas manchas presentes na <strong>íris</strong>.</li>
      </ul>
      <p>São achados que, somados, compõem a face reconhecível "mesmo por um olho menos treinado".</p>

      <h3 class="topic-h">A pseudomacroglossia (a pegadinha)</h3>
      <p>Atenção ao detalhe que a banca explora: a <span class="hl-warn">pseudomacroglossia</span>. A criança <strong>PARECE</strong> ter macroglossia, mas <span class="hl-bad">NÃO tem macroglossia verdadeira</span> — <strong>não há aumento do tecido da língua</strong>. A língua apenas fica mais <strong>protrusa</strong> (para fora), dando a <strong>impressão</strong> de macroglossia. O prefixo "pseudo" carrega toda a pegadinha: a aparência sugere língua aumentada, mas o tecido lingual é normal. Quem responde "macroglossia verdadeira" cai na armadilha.</p>

      <h3 class="topic-h">Mãos e pés: prega palmar única, sinal da sandália, clinodactilia</h3>
      <p>As extremidades têm seus próprios sinais:</p>
      <ul class="find-list">
        <li><span class="term">Prega palmar única</span> — ao olhar a palma da mão, observa-se uma <strong>única</strong> prega (em vez do padrão habitual).</li>
        <li><span class="term">Sinal da sandália</span> — afastamento aumentado entre o <strong>primeiro e o segundo pododáctilo</strong>, como se coubesse uma sandália de dedo entre eles.</li>
        <li><span class="term">Clinodactilia</span> — encurvamento do <strong>quinto quirodáctilo</strong> (dedo mínimo). Atenção: é achado <span class="hl-warn">INESPECÍFICO</span>, podendo estar presente em <strong>outras</strong> síndromes — não é exclusiva da Down.</li>
      </ul>

      <h3 class="topic-h">O diagnóstico é clínico</h3>
      <p>A conclusão prática é poderosa: o <span class="hl-good">conjunto fenotípico permite o diagnóstico CLÍNICO</span> da síndrome de Down. Pode-se (e em geral se deve) confirmar laboratorialmente com o cariótipo — mas <strong>não é preciso o cariótipo para identificar</strong> essas características e suspeitar fortemente da síndrome. O olhar treinado, somando hipotonia + face + mãos/pés, fecha a hipótese clínica; o cariótipo confirma e diz o mecanismo.</p>
    </div>

    ${med({
      file: 'p6-facies-down.jpg',
      alt: 'Fácies de recém-nascido com síndrome de Down em detalhe, evidenciando fenda palpebral oblíqua, prega epicântica e raiz nasal baixa.',
      achado: '<strong>A face que se reconhece</strong> — fácies da síndrome de Down em detalhe (RN): fenda oblíqua, prega epicântica, raiz nasal baixa, braquicefalia.',
      fonte: 'A newborn with Down syndrome, by Karein (Kari Reine), via Wikimedia Commons',
      licenca: 'CC BY-SA 3.0'
    })}

    ${med({
      file: 'p6b-manchas-brushfield.jpg',
      alt: 'Detalhe ocular mostrando manchas de Brushfield: pontos esbranquiçados em anel na periferia da íris.',
      achado: '<strong>Manchas de Brushfield</strong> — pontos esbranquiçados em anel na periferia da íris; sinal de apoio da Down, não patognomônico.',
      fonte: 'Brushfield spots, by Erin Ryan, via Wikimedia Commons',
      licenca: 'Domínio público'
    })}

    ${med({
      file: 'p6c-prega-palmar-sinal-sandalia.jpg',
      alt: 'Pés de criança com síndrome de Down mostrando o sinal da sandália: espaço alargado entre o hálux e o segundo dedo.',
      achado: '<strong>Mãos e pés</strong> — sinal da sandália: espaço alargado entre o hálux e o 2º dedo; marcador menor da Down (junto da prega palmar única).',
      fonte: 'Feet of a 10-year-old boy with Down syndrome, by Loranchet, via Wikimedia Commons',
      licenca: 'CC BY 3.0'
    })}

    ${svgPiso('S-04', { caption: 'o corpo da Down — clique em cada achado desenhado (pálpebra → fenda oblíqua; canto interno → epicanto; íris → Brushfield; língua → pseudomacroglossia, "tecido normal"; palma → prega única; pé → sinal da sandália; 5º dedo → clinodactilia "inespecífica") para revelar a descrição e se é <strong>específico / inespecífico / universal</strong>; a hipotonia entra como rótulo geral "universal".', hint: 'Clique no próprio achado, ou Tab + Enter; cada hotspot diz se o sinal é universal/específico/inespecífico.' })}

    <aside class="trap">
      <p class="trap__tag">Pegadinha de prova</p>
      <p class="trap__text">A língua da Down é <strong>pseudo</strong>macroglossia (não há aumento de tecido); a clinodactilia é <strong>inespecífica</strong>; a hipotonia é <strong>universal</strong>.</p>
    </aside>

    ${quiz('p6', 'Reconhecimento do conjunto fenotípico e as duas pegadinhas (pseudomacroglossia, clinodactilia).', [
      {
        stem: 'Um recém-nascido com fenótipo de síndrome de Down tem a língua aparentemente aumentada. Qual a interpretação correta?',
        alts: [
          { t: 'Macroglossia verdadeira, por aumento do tecido lingual', correct: false, why: 'Cai na aparência: não há aumento real de tecido; chamar de macroglossia verdadeira é o erro que o "pseudo" desmonta. <em>Por que cair na A</em>: confia-se na impressão visual sem o conceito da protrusão.' },
          { t: 'Pseudomacroglossia: a língua parece aumentada, mas o tecido é normal — apenas mais protrusa', correct: true, why: 'Certa. Na Down há <strong>pseudomacroglossia</strong>: a língua <strong>parece</strong> aumentada porque fica mais <strong>protrusa</strong>, mas <strong>não há aumento do tecido lingual</strong> — o "pseudo" é a chave.' },
          { t: 'A macroglossia exclui o diagnóstico de Down', correct: false, why: 'Inverte a lógica: a pseudomacroglossia <strong>compõe</strong> o quadro da Down — não o exclui. <em>Por que cair na C</em>: trata-se um achado típico como critério de exclusão.' },
          { t: 'É um achado inespecífico sem relação com a Down', correct: false, why: 'Confunde com a clinodactilia: o achado inespecífico citado é a <strong>clinodactilia</strong>, não a pseudomacroglossia (característica da Down). <em>Por que cair na D</em>: troca-se qual achado é o inespecífico.' },
        ]
      },
      {
        stem: 'Sobre os achados fenotípicos da síndrome de Down, qual afirmação está correta?',
        alts: [
          { t: 'A clinodactilia é específica e patognomônica da Down', correct: false, why: 'Superdimensiona a clinodactilia: ela é <strong>inespecífica</strong>, não patognomônica — presente em outras síndromes. <em>Por que cair na A</em>: confunde-se "achado da Down" com "exclusivo da Down".' },
          { t: 'A hipotonia é um achado universal (presente em todo RN com Down), e a clinodactilia é inespecífica', correct: true, why: 'Certa. A <strong>hipotonia é universal</strong> (todo RN com Down é hipotônico) e a <strong>clinodactilia é inespecífica</strong> (aparece em outras síndromes). O conjunto permite o diagnóstico <strong>clínico</strong>.' },
          { t: 'O diagnóstico só pode ser feito com cariótipo, nunca clinicamente', correct: false, why: 'Nega o diagnóstico clínico: o conjunto fenotípico permite suspeitar e diagnosticar clinicamente; o cariótipo confirma e dá o mecanismo, mas não é pré-requisito. <em>Por que cair na C</em>: superestima-se o laboratório.' },
          { t: 'A fenda palpebral da Down é inclinada inferiormente', correct: false, why: 'Inverte a direção: a fenda palpebral da Down é oblíqua <strong>superiormente</strong> (sobe para fora), não inferiormente. <em>Por que cair na D</em>: troca-se o sentido da inclinação.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 7 — E2 Dado impactante ===================== */
  P.push(page('p7', 7, `
    ${tag('case', 'Comorbidade cardíaca · DSAV')}
    ${chips(['~50% têm cardiopatia', 'muitas sem sopro', 'DSAV: a mais característica', 'acianótica · ICC precoce', 'ECO para todos'])}

    <figure class="opener opener--stat" aria-label="Dado de abertura">
      <span class="opener__number">~50%</span>
      <p class="opener__context">Cerca de <strong>metade</strong> das crianças com síndrome de Down tem cardiopatia congênita — e muitas <strong>sem sopro audível</strong>. É esse número que justifica o acompanhamento diferenciado e o ecocardiograma para todos.</p>
    </figure>

    <h1 class="page-title">O coração da Down: cardiopatia em metade das crianças</h1>

    <div class="prose">
      <h3 class="topic-h">Por que o acompanhamento é diferenciado</h3>
      <p>A criança com Down tem <span class="term">maior propensão a uma série de comorbidades</span> — e é por isso que o acompanhamento dela é <strong>diferenciado</strong>, com <strong>triagens que não se fazem</strong> em crianças sem a síndrome. Não é o mesmo calendário de puericultura com um carimbo de "Down": é um seguimento próprio, com exames adicionais voltados às comorbidades esperadas. A primeira e mais marcante dessas comorbidades está no coração.</p>

      <h3 class="topic-h">~50% têm cardiopatia congênita</h3>
      <p>O número-âncora: <span class="hl-bad">cerca de 50% das crianças com síndrome de Down podem ter cardiopatias congênitas</span>. Metade. E um detalhe que pesa na conduta: muitas dessas cardiopatias existem <strong>mesmo sem sopro audível</strong> à ausculta — ou seja, não dá para confiar só no exame físico para afastar. É exatamente esse percentual elevado que justifica, mais à frente, o <span class="hl-good">ecocardiograma neonatal para todos</span> (e não apenas para os que têm sopro).</p>

      <h3 class="topic-h">O DSAV: a cardiopatia mais característica</h3>
      <p>Entre as cardiopatias, a <strong>principal</strong> é o <span class="hl-bad">defeito do septo atrioventricular (DSAV)</span> — uma cardiopatia <span class="term">ACIANÓTICA</span> que se manifesta por <strong>insuficiência cardíaca congestiva (ICC)</strong> ainda nos <strong>primeiros meses de vida</strong>. O DSAV é a cardiopatia <strong>mais característica</strong> da Down: a associação é tão forte que ele é a resposta esperada quando se pergunta "qual a cardiopatia mais associada à síndrome de Down". Acianótica e com ICC precoce — é assim que costuma se apresentar.</p>

      <h3 class="topic-h">Pode haver cianóticas (Fallot)</h3>
      <p>Cuidado para não fechar demais: além das acianóticas, <span class="hl-warn">pode haver outras cardiopatias, inclusive CIANÓTICAS</span>, como a <span class="term">tetralogia de Fallot</span>. Elas existem na Down, embora sejam minoria. Mas o <strong>conceito fundamental</strong> a guardar — o que resolve a maioria das questões — é: <strong>cardiopatia congênita em ~50% das crianças</strong>, com o <strong>DSAV</strong> como a mais característica. As cianóticas entram como complemento, não como o eixo.</p>
    </div>

    ${med({
      file: 'p7-dsav.jpg',
      alt: 'Esquema anatômico de defeito do septo atrioventricular (DSAV), mostrando a valva atrioventricular comum e a comunicação septal.',
      achado: '<strong>O DSAV</strong> — defeito do septo atrioventricular: valva AV comum e comunicação septal; a cardiopatia mais associada à Down. Acianótica, com ICC nos primeiros meses.',
      fonte: 'CDC, via Wikimedia Commons',
      licenca: 'CC0 / domínio público'
    })}

    ${svgPiso('S-05', { caption: 'o coração da Down — clique na região do septo atrioventricular desenhada para revelar o <strong>DSAV</strong> (acianótica, ICC precoce, a mais característica); um marcador secundário acende a ressalva das <strong>cianóticas (Fallot)</strong> (existem, mas são minoria), e um contador visual reforça "~50% têm cardiopatia, muitas sem sopro".', hint: 'Clique no septo desenhado, ou Tab + Enter; o marcador secundário mostra as cianóticas.' })}

    ${notaBanca('o Ministério da Saúde cita CIA/CIV/DSAV juntas entre as mais comuns; o canon de prova consagra o <strong>DSAV como a mais característica</strong> (maior especificidade: ~50% dos DSAV têm Down). O conteúdo está correto para prova.')}

    <aside class="dont-confuse">
      <p class="dont-confuse__tag">Pegadinha de mão dupla</p>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>"Cardiopatia mais associada à Down"</h4><p>→ <strong>DSAV</strong>.</p></div>
        <div class="dont-confuse__side"><h4>"Síndrome mais associada ao DSAV"</h4><p>→ <strong>Down</strong> (cerca de metade dos DSAV ocorre na Down). A associação vai nos dois sentidos.</p></div>
      </div>
    </aside>

    ${quiz('p7', 'A cardiopatia mais característica e por que o ECO é para todos.', [
      {
        stem: 'Qual a cardiopatia mais característica da síndrome de Down e como ela se apresenta?',
        alts: [
          { t: 'Tetralogia de Fallot, cianótica, desde o nascimento', correct: false, why: 'Elege a minoria: cianóticas como Fallot <strong>existem</strong> na Down, mas são minoria — não a mais característica. <em>Por que cair na A</em>: confunde-se "pode ocorrer" com "é a principal".' },
          { t: 'Defeito do septo atrioventricular (DSAV), acianótica, com ICC nos primeiros meses', correct: true, why: 'Certa. O <strong>DSAV</strong> é a cardiopatia mais característica da Down: <strong>acianótica</strong> e com <strong>ICC nos primeiros meses</strong>. A associação é tão forte que é a resposta esperada do tema.' },
          { t: 'Coarctação da aorta, com pulsos femorais reduzidos', correct: false, why: 'Descreve o coarc-Turner: coarctação com pulsos femorais reduzidos é a associação clássica do <strong>Turner</strong>, não da Down. <em>Por que cair na C</em>: misturam-se as cardiopatias das duas síndromes.' },
          { t: 'Comunicação interatrial isolada, sempre com sopro evidente', correct: false, why: 'Confia no sopro: muitas cardiopatias da Down ocorrem <strong>sem sopro</strong> — por isso o ECO é para todos; e a mais característica é o DSAV, não a CIA isolada. <em>Por que cair na D</em>: assume-se que ausência de sopro afasta cardiopatia.' },
        ]
      },
      {
        stem: 'Por que se indica ecocardiograma para toda criança com síndrome de Down, mesmo sem sopro?',
        alts: [
          { t: 'Porque todas têm cardiopatia cianótica', correct: false, why: 'Exagera e erra o tipo: não são todas, nem todas cianóticas — é ~50%, com o DSAV (acianótica) como principal. <em>Por que cair na A</em>: absolutiza o percentual e o tipo.' },
          { t: 'Porque ~50% têm cardiopatia congênita, muitas sem sopro audível', correct: true, why: 'Certa. Cerca de <strong>metade</strong> das crianças com Down tem cardiopatia congênita, e <strong>muitas não têm sopro</strong> — o exame físico normal não afasta, daí o ECO neonatal para todas.' },
          { t: 'Porque o sopro está sempre presente quando há cardiopatia', correct: false, why: 'Contradiz o motivo do ECO: justamente porque o sopro <strong>pode faltar</strong> é que se faz o ECO. <em>Por que cair na C</em>: confia-se na ausculta para afastar cardiopatia.' },
          { t: 'Porque o ECO substitui o cariótipo no diagnóstico', correct: false, why: 'Troca a função dos exames: o ECO avalia o coração; o <strong>cariótipo</strong> confirma a síndrome e o mecanismo. <em>Por que cair na D</em>: funde-se rastreio cardíaco com confirmação genética.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 8 — E8 Erro comum desmontado ===================== */
  P.push(page('p8', 8, `
    ${tag('case', 'Comorbidades multissistêmicas')}
    ${chips(['hipotireoidismo congênito E adquirido', 'curva específica', 'risco hematológico', 'atresia de duodeno', 'Hirschsprung · celíaca'])}

    <section class="opener opener--bust" aria-label="Erro comum desmontado">
      <p class="opener__bust-tag">Erro comum</p>
      <p class="opener__bust-wrong">"A criança com Down plotada na curva padrão tem baixa estatura."</p>
      <p class="opener__bust-right">Ela cresce em <strong>ritmo próprio</strong>. Sem a <strong>curva específica</strong> da síndrome, o diagnóstico de baixa estatura sai <strong>falso</strong> — e ainda mascara o que de fato pode travar o crescimento: o hipotireoidismo.</p>
    </section>

    <h1 class="page-title">Tireoide, crescimento e o intestino: as outras comorbidades da Down</h1>

    <div class="prose">
      <h3 class="topic-h">Hipotireoidismo: congênito e adquirido</h3>
      <p>A criança com Down tem mais risco de <span class="term">endocrinopatia</span>, em especial <span class="hl-bad">HIPOTIREOIDISMO</span> — e atenção: <strong>tanto congênito quanto adquirido</strong>. Não é só o que se pega no teste do pezinho ao nascer; ela pode desenvolver hipotireoidismo <strong>ao longo da vida</strong> (adquirido/autoimune). Essa dupla natureza (congênito + adquirido) é exatamente o que justifica a triagem <strong>repetida</strong> de TSH no seguimento — uma triagem só ao nascer não bastaria.</p>

      <h3 class="topic-h">A curva de crescimento específica</h3>
      <p>A criança com Down tem <span class="hl-warn">ritmo de crescimento DIFERENTE</span> do das crianças sem a síndrome. Por isso, no acompanhamento de puericultura, é preciso usar <span class="hl-good">gráficos/curvas ESPECÍFICOS</span> para a síndrome de Down — senão <strong>sempre se vai achar (erroneamente) que ela tem baixa estatura</strong>. E há um agravante a vigiar: se essa criança <span class="hl-bad">tiver hipotireoidismo</span>, ele pode <strong>comprometer ainda mais o crescimento</strong>, somando-se ao padrão próprio da síndrome. Daí a importância dupla — usar a curva certa <strong>e</strong> rastrear/tratar o hipotireoidismo, que pioraria a estatura.</p>

      <h3 class="topic-h">Sangue: risco hematológico/linfoproliferativo</h3>
      <p>A criança com Down tem mais risco de <span class="hl-bad">desordens hematológicas e linfoproliferativas</span>. É um risco aumentado de alterações da série branca/proliferativas que justifica vigilância — e que será rastreado no seguimento pelo <strong>hemograma</strong> periódico (detalhado no mapa de seguimento). Aqui basta fixar: o sangue é um dos sistemas sob vigilância na Down.</p>

      <h3 class="topic-h">Intestino: atresia de duodeno e Hirschsprung</h3>
      <p>O trato gastrointestinal é frente importante de comorbidade, com dois padrões de prova:</p>
      <ul class="find-list">
        <li><span class="hl-bad">Atresia de duodeno</span> — atenção especial. Padrão de questão: <strong>recém-nascido com fenótipo de Down que começa a apresentar VÔMITOS no primeiro dia de vida</strong> → pensar em <strong>atresia de duodeno</strong>.</li>
        <li><span class="hl-bad">Doença de Hirschsprung</span> (megacólon agangliônico) — causa de <strong>constipação crônica</strong>. Pode ser diagnosticada precocemente, em especial quando há <span class="hl-warn">ATRASO na eliminação de mecônio</span>. Conceito importante: na Down, a constipação tem <strong>maior chance de NÃO ser apenas funcional, e sim de causa ORGÂNICA</strong> (Hirschsprung, hipotireoidismo) — o limiar para investigar é menor.</li>
      </ul>

      <h3 class="topic-h">Doença celíaca</h3>
      <p>Por fim, a criança com Down tem <span class="hl-bad">mais risco de doença celíaca</span> que o restante da população — outra razão para vigilância no seguimento. Soma-se às demais comorbidades GI como motivo de atenção dirigida.</p>
    </div>

    ${med({
      file: 'p8-atresia-duodeno-dupla-bolha.jpg',
      alt: 'Radiografia de abdome em recém-nascido mostrando o sinal da dupla bolha: estômago e duodeno proximal dilatados, sem gás distal.',
      achado: '<strong>Dupla bolha</strong> — estômago e duodeno proximal dilatados, gás distal ausente: atresia de duodeno. O RN com Down que vomita no 1º dia de vida.',
      fonte: 'JasonRobertYoungMD, via Wikimedia Commons',
      licenca: 'CC BY-SA 4.0'
    })}

    ${svgPiso('S-06', { caption: 'o mapa de comorbidades — clique em cada frente (tireoide / crescimento / sangue / intestino) para revelar a comorbidade e a armadilha: hipotireoidismo congênito E adquirido; curva específica × falso diagnóstico de baixa estatura; risco hematológico; atresia de duodeno × Hirschsprung × celíaca.', hint: 'Cartões dinâmicos: clique em cada frente, ou Tab + Enter.' })}

    ${notaValor('<strong>curva específica</strong> da Down (Cronk / Zemel-AAP 2015) — a curva OMS padrão daria baixa estatura falsa · <strong>doença celíaca</strong> ~5,6% na Down (× ~1% na população) · <strong>hipotireoidismo</strong> congênito ~1% + adquirido/autoimune 14% ou mais.')}

    <aside class="dont-confuse">
      <p class="dont-confuse__tag">Não confunda — as duas frentes GI da Down</p>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Vômitos no 1º dia</h4><p>→ <strong>atresia de duodeno</strong> (obstrução alta).</p></div>
        <div class="dont-confuse__side"><h4>Atraso de mecônio / constipação que não resolve</h4><p>→ <strong>Hirschsprung</strong> (constipação <strong>orgânica</strong>, não funcional).</p></div>
      </div>
    </aside>

    ${quiz('p8', 'A curva específica e o padrão de prova dos vômitos no 1º dia.', [
      {
        stem: 'Por que a criança com síndrome de Down deve ser acompanhada com curva de crescimento específica?',
        alts: [
          { t: 'Porque ela cresce mais rápido que as demais crianças', correct: false, why: 'Inverte o ritmo: o crescimento da Down tende a ser <strong>menor/diferente</strong>, e o risco é o falso diagnóstico de baixa estatura — não crescimento acelerado. <em>Por que cair na A</em>: imagina-se ritmo aumentado.' },
          { t: 'Porque tem ritmo de crescimento diferente — na curva padrão pareceria ter baixa estatura falsamente', correct: true, why: 'Certa. A criança com Down cresce em <strong>ritmo próprio</strong>; plotada na curva <strong>padrão</strong>, pareceria ter baixa estatura <strong>falsamente</strong>. A curva específica corrige isso.' },
          { t: 'Porque a curva específica dispensa o rastreio de hipotireoidismo', correct: false, why: 'Desconecta tireoide e crescimento: a curva específica <strong>não</strong> dispensa o TSH — o hipotireoidismo pode piorar ainda mais o crescimento e precisa ser rastreado. <em>Por que cair na C</em>: separa-se o que é complementar.' },
          { t: 'Porque o crescimento da Down é idêntico ao das demais crianças', correct: false, why: 'Nega a diferença: o ritmo <strong>não</strong> é idêntico — é por ser diferente que a curva específica existe. <em>Por que cair na D</em>: ignora-se a razão de ser da curva própria.' },
        ]
      },
      {
        stem: 'Um recém-nascido com fenótipo de síndrome de Down apresenta vômitos no primeiro dia de vida. Qual a principal hipótese?',
        alts: [
          { t: 'Doença de Hirschsprung', correct: false, why: 'Erra o padrão temporal: Hirschsprung cursa com <strong>atraso na eliminação de mecônio</strong> e constipação, não vômitos no 1º dia. <em>Por que cair na A</em>: confundem-se as duas comorbidades GI da Down.' },
          { t: 'Atresia de duodeno', correct: true, why: 'Certa. RN com fenótipo de Down + <strong>vômitos no 1º dia de vida</strong> é o padrão clássico de <strong>atresia de duodeno</strong> (obstrução alta) — a Down tem risco aumentado.' },
          { t: 'Doença celíaca', correct: false, why: 'É de outra janela: a celíaca relaciona-se à introdução do glúten (mais tarde), não a vômitos no 1º dia. <em>Por que cair na C</em>: aplica-se uma comorbidade tardia a um quadro neonatal agudo.' },
          { t: 'Constipação funcional', correct: false, why: 'Subestima o quadro: na Down a constipação tende a ser <strong>orgânica</strong>, e vômitos no 1º dia não são constipação — é obstrução. <em>Por que cair na D</em>: banaliza-se um sinal de obstrução alta.' },
        ]
      },
    ])}
  `));

  // páginas 9-15 anexadas em appendTail
  appendTail({ P, med, svgPiso, svgHero, notaBanca, notaValor, quiz, tag, chips, page });

  return P;
}

/* =========================================================================
   PÁGINAS 9-15 — segunda metade da aula (heróis, Turner, Klinefelter, trissomias).
   ========================================================================= */
function appendTail({ P, med, svgPiso, svgHero, notaBanca, notaValor, quiz, tag, chips, page }) {

  /* ===================== PÁGINA 9 — E5 Meta + checklist (HERÓI H-1) ===================== */
  P.push(page('p9', 9, `
    ${tag('gen', 'Seguimento · os quatro inquestionáveis')}
    ${chips(['cariótipo sempre', 'ECO neonatal · não repete se normal', 'TSH pezinho/6m/12m/anual', 'hemograma 6m/12m/anual'])}

    <section class="opener opener--checklist" aria-label="Seguimento da síndrome de Down">
      <p class="opener__checklist-title">O seguimento da síndrome de Down, exame por exame:</p>
      <ul class="opener__checklist">
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>por que a Down tem <strong>exames adicionais</strong></span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>a regra do <strong>ecocardiograma</strong> (e por que difere do TSH)</span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>o <strong>calendário exato do TSH</strong> e do <strong>hemograma</strong></span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>os <strong>quatro exames inquestionáveis</strong> do seguimento</span></li>
      </ul>
    </section>

    <h1 class="page-title">O mapa de seguimento da Down: cada exame e sua periodicidade</h1>

    <div class="prose">
      <h3 class="topic-h">Por que exames adicionais</h3>
      <p>Pela <span class="term">maior propensão às comorbidades</span> (cardíaca, endócrina, hematológica, GI), a avaliação complementar da criança com Down inclui <span class="hl-good">exames adicionais específicos</span> — que não se fazem na criança sem a síndrome. O seguimento da Down é, antes de tudo, um <strong>calendário de rastreios</strong> dirigido às comorbidades esperadas. Quatro exames formam o núcleo: cariótipo, ecocardiograma, TSH e hemograma.</p>

      <h3 class="topic-h">Cariótipo: sempre</h3>
      <p>O exame que <span class="hl-good">SEMPRE se faz</span> é o <span class="term">cariótipo</span>. Ele <strong>confirma geneticamente</strong> a síndrome e, principalmente, <strong>identifica a alteração genética</strong> — diz qual dos três mecanismos (livre, translocação ou mosaico). E há a implicação já vista: <strong>se for translocação</strong>, essa informação é decisiva para o <strong>aconselhamento genético do casal</strong> (cariotipar os pais, estimar a recorrência). O cariótipo não é só selo diagnóstico — é o que orienta a conversa com a família sobre futuros filhos.</p>

      <h3 class="topic-h">Ecocardiograma: neonatal, não repete se normal</h3>
      <p>A criança com Down <span class="hl-good">sempre deve realizar ECOCARDIOGRAMA no período neonatal</span> — pelo risco de ~50% de cardiopatia congênita (muitas sem sopro). E aqui está a <span class="hl-warn">pegadinha de prova</span>: se o ECO neonatal <strong>NÃO mostrar cardiopatia</strong>, ele <strong>NÃO precisa ficar sendo repetido</strong>. Isso o <strong>diferencia do TSH</strong>: o ECO normal resolve (faz-se uma vez, e se normal, não repete por esse motivo); o TSH é <strong>seriado</strong> ao longo da vida. ECO normal = uma vez; TSH = sempre repetindo.</p>

      <h3 class="topic-h">TSH: pezinho / 6m / 12m / anual</h3>
      <p>Pelo risco de <strong>hipotireoidismo congênito e adquirido</strong>, a triagem da função tireoidiana (<span class="term">TSH</span>) é feita no <strong>teste do pezinho</strong> e <span class="hl-bad">repetida com 6 meses, com 12 meses e uma vez por ano</span>. Esse é o <strong>calendário de ouro</strong> do tema: <strong>pezinho → 6 meses → 12 meses → anual</strong>, vitalício. A razão do rastreio repetido: o hipotireoidismo é <strong>congênito E adquirido</strong> (pode surgir depois), e se a criança o tiver, ele <strong>prejudica o crescimento</strong> — diagnosticar cedo protege a estatura.</p>

      <h3 class="topic-h">Hemograma: 6m / 12m / anual</h3>
      <p>Para tentar identificar <span class="hl-bad">desordens mieloproliferativas/hematológicas</span>, faz-se <span class="term">HEMOGRAMA com 6 meses, com 12 meses e depois anualmente</span>. Mesma lógica de vigilância periódica do TSH, voltada agora ao risco hematológico da síndrome.</p>

      <h3 class="topic-h">Os quatro inquestionáveis</h3>
      <p>Fecha o mapa: <span class="hl-good">cariótipo, ecocardiograma, TSH e hemograma</span> são exames <strong>praticamente inquestionáveis</strong> no seguimento da síndrome de Down. Se a questão perguntar "quais exames compõem o seguimento da criança com Down", esses quatro são a resposta segura — cada um com sua regra (cariótipo sempre; ECO neonatal uma vez se normal; TSH pezinho/6m/12m/anual; hemograma 6m/12m/anual). A figura ao lado reúne os quatro num só mapa, pareando cada sistema de risco ao exame e à periodicidade.</p>
    </div>

    <aside class="op-summary">
      <p class="op-summary__label">Resumo operacional</p>
      <p><strong>Cariótipo</strong> (sempre, identifica o mecanismo, cariotipa os pais se translocação) · <strong>ECO</strong> (neonatal; normal não repete) · <strong>TSH</strong> (pezinho/6m/12m/anual) · <strong>Hemograma</strong> (6m/12m/anual).</p>
    </aside>

    ${svgHero('p9', { caption: 'o mapa de seguimento da Down — cada sistema de risco pareado ao exame e à periodicidade: genética → cariótipo (sempre); coração → ECO (neonatal; normal não repete); tireoide → TSH (pezinho/6m/12m/anual); sangue → hemograma (6m/12m/anual); e a coluna cervical → RX ~3 anos ("discutida"). A linha do tempo acende quando cada exame se repete, e a pegadinha ECO (uma vez se normal) × TSH (seriado) fica em destaque.' })}

    ${med({
      file: 'p9-seguimento-down-tabela.jpg',
      alt: 'Quadro oficial da Sociedade Brasileira de Pediatria com os cuidados e exames de seguimento da síndrome de Down por faixa etária.',
      achado: '<strong>O calendário oficial</strong> — quadro da SBP: cuidados e exames de seguimento da Down por faixa etária, com periodicidades. Cariótipo, ECO, TSH e hemograma no seguimento.',
      fonte: 'Diretrizes de Atenção à Saúde de Pessoas com Síndrome de Down, Sociedade Brasileira de Pediatria',
      licenca: 'Documento oficial'
    })}

    ${notaBanca('o TSH (pezinho/6m/12m/anual) bate <strong>palavra por palavra</strong> com o MS; o hemograma do MS é <strong>semestral nos 2 primeiros anos</strong> (0/6/12/18m) + anual — o calendário 6/12/anual captura o essencial; o "18 meses" é detalhe agregável do MS.')}

    <aside class="board-wants">
      <p class="board-wants__label">O que a banca quer</p>
      <p>O calendário exato do TSH (pezinho/6m/12m/anual); a pegadinha ECO (não repete se normal) × TSH (seriado); o cariótipo como exame que sempre se faz e identifica o mecanismo; e os quatro exames inquestionáveis.</p>
    </aside>

    ${quiz('p9', 'O calendário de ouro e a pegadinha ECO × TSH.', [
      {
        stem: 'Qual a diferença entre a conduta do ecocardiograma e a do TSH no seguimento da síndrome de Down?',
        alts: [
          { t: 'Ambos são feitos uma única vez ao nascer', correct: false, why: 'Iguala os dois ao nascer: só o ECO se resolve em uma vez (se normal); o TSH continua seriado. <em>Por que cair na A</em>: assume-se que todo rastreio neonatal é único.' },
          { t: 'O ECO é neonatal e, se normal, não precisa repetir; o TSH é seriado (pezinho/6m/12m/anual)', correct: true, why: 'Certa. O <strong>ECO</strong> neonatal, se <strong>normal</strong>, <strong>não se repete</strong> por esse motivo; o <strong>TSH</strong> é <strong>seriado</strong> ao longo da vida (pezinho → 6m → 12m → anual). É a pegadinha clássica.' },
          { t: 'Ambos são seriados com a mesma periodicidade', correct: false, why: 'Iguala as periodicidades: ECO (uma vez se normal) e TSH (seriado) têm condutas <strong>diferentes</strong>. <em>Por que cair na C</em>: ignora-se a distinção que a prova cobra.' },
          { t: 'O TSH é feito uma única vez e o ECO é repetido anualmente', correct: false, why: 'Inverte exatamente os dois: é o ECO que pode ser único (se normal) e o TSH que é seriado. <em>Por que cair na D</em>: invertem-se as regras de cada exame.' },
        ]
      },
      {
        stem: 'Qual é o calendário correto da triagem de TSH na criança com síndrome de Down, e por que ele é repetido?',
        alts: [
          { t: 'Apenas no teste do pezinho, pois o hipotireoidismo é só congênito', correct: false, why: 'Ignora o adquirido: como há hipotireoidismo <strong>adquirido</strong> (que surge ao longo da vida), o pezinho sozinho não basta. <em>Por que cair na A</em>: reduz-se o hipotireoidismo da Down ao congênito.' },
          { t: 'Pezinho, 6 meses, 12 meses e anual — porque o hipotireoidismo é congênito E adquirido e prejudica o crescimento', correct: true, why: 'Certa. O TSH é dosado no <strong>pezinho</strong> e repetido aos <strong>6m, 12m e anualmente</strong>. A repetição existe porque o hipotireoidismo na Down é <strong>congênito E adquirido</strong> e, se presente, <strong>prejudica o crescimento</strong> — diagnosticar cedo protege a estatura.' },
          { t: 'Somente aos 12 meses e depois aos 5 anos', correct: false, why: 'Erra o calendário: a periodicidade é pezinho/6m/12m/anual, não "12 meses e 5 anos". <em>Por que cair na C</em>: inventa-se um intervalo que não é o canônico.' },
          { t: 'A cada 6 meses por toda a vida, sem dosagem ao nascer', correct: false, why: 'Omite o pezinho e erra o ritmo: a triagem <strong>começa no pezinho</strong> e segue 6m/12m/anual. <em>Por que cair na D</em>: distorce-se o início e a cadência do calendário.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 10 — E3 Caso clínico em abertura ===================== */
  P.push(page('p10', 10, `
    ${tag('case', 'Coluna cervical · conduta esportiva')}
    ${chips(['RX cervical ~3 anos (discutido)', 'instabilidade atlanto-axial', 'luxação → compressão medular', 'cautela: ginástica/cambalhotas'])}

    <article class="opener opener--case" aria-label="Caso clínico de abertura">
      <span class="opener__case-header">Down · pré-escolar de ~3 anos · a pergunta prática da família</span>
      <p class="opener__case-quote">Uma criança de ~3 anos com síndrome de Down, em boa fase de desenvolvimento, e a família pergunta se pode matriculá-la na <strong>ginástica olímpica</strong>. A resposta passa por uma estrutura específica: a <strong>coluna cervical</strong>.</p>
      <dl class="case-card__meta">
        <dt>Paciente</dt><dd>criança com Down, ~3 anos, em boa fase de desenvolvimento</dd>
        <dt>Pergunta da família</dt><dd>pode entrar na ginástica olímpica?</dd>
        <dt>Estrutura em risco</dt><dd>coluna cervical (junção atlanto-axial, C1-C2)</dd>
        <dt>O que decide</dt><dd>risco de instabilidade → luxação → compressão medular</dd>
      </dl>
    </article>

    <h1 class="page-title">A coluna que pode luxar: instabilidade atlanto-axial e o cuidado com esportes</h1>

    <div class="prose">
      <h3 class="topic-h">RX cervical aos ~3 anos (a avaliação discutida)</h3>
      <p>Além dos quatro exames inquestionáveis, há uma <span class="hl-warn">última avaliação, um pouco mais duvidosa/discutida</span>: a <span class="term">radiografia da coluna cervical</span>, em geral por volta dos <span class="hl-bad">3 anos de idade</span>. "Discutida" porque sua indicação não é consensual — alguns orientam fazer, outros reservam para situações específicas. Quando feita, o <strong>radiologista mede vários ângulos/distâncias</strong> para dizer se existe ou não maior risco de luxação. É a avaliação que se faz com ressalva, diferente da segurança dos quatro exames do mapa.</p>

      <h3 class="topic-h">Instabilidade → luxação → compressão medular</h3>
      <p>Por que essa preocupação com a coluna? A criança com Down tem <span class="hl-bad">maior risco de INSTABILIDADE CERVICAL</span> (instabilidade atlanto-axial), que pode provocar <span class="hl-bad">luxação de articulações cervicais</span> — e uma luxação pode evoluir com <span class="hl-bad">compressão medular</span>. É uma cadeia de risco séria: a frouxidão/instabilidade da articulação na região alta da coluna abre caminho para a luxação, e a luxação pode comprimir a medula. É esse desfecho potencial (compressão medular) que justifica toda a cautela.</p>

      <h3 class="topic-h">Os esportes a evitar</h3>
      <p>Da instabilidade nasce a conduta: é preciso <span class="hl-warn">muito cuidado ao orientar atividade física</span>, com atenção especial a <strong>esportes que envolvam movimentação cervical importante</strong>. Os de <span class="hl-bad">risco a evitar/cautelar</span>: <strong>ginástica olímpica</strong> e esportes que envolvam <strong>muitas cambalhotas</strong> — movimentos que expõem a criança a maior risco de <strong>luxação cervical</strong>. Não é proibir toda atividade física (que é benéfica), mas <strong>selecionar</strong>: evitar o que força a coluna cervical. Respondendo ao caso de abertura: a ginástica olímpica é justamente uma das atividades a cautelar.</p>
    </div>

    ${med({
      file: 'p10-rx-cervical-atlanto-axial.jpg',
      alt: 'Radiografia de coluna cervical em perfil, evidenciando o arco anterior do atlas (C1), o odontoide do áxis (C2) e o intervalo atlanto-dental.',
      achado: '<strong>A articulação que pode luxar</strong> — RX cervical em perfil: arco anterior do atlas (C1), odontoide do áxis (C2) e o intervalo atlanto-dental; é essa distância que o rastreio de instabilidade mede (~3 anos).',
      fonte: 'Cervical spine lateral radiograph, UC San Diego Health Radiology, via Wikimedia Commons',
      licenca: 'Domínio público'
    })}

    ${svgPiso('S-07', { caption: 'a coluna cervical alta — clique na própria junção atlanto-axial desenhada (C1-C2) para revelar a cadeia <strong>instabilidade → luxação → compressão medular</strong>; depois use o seletor de esportes (ginástica/cambalhota × natação/caminhada), que acende "cautelar" (movimentação cervical) ou "ok".', hint: 'Clique na junção C1-C2, ou Tab + Enter; depois escolha um esporte no seletor.' })}

    ${notaValor('corte de prova — <strong>distância atlanto-axial ≥ 4,5 mm = anormal</strong> (MS); a SBP acrescenta reavaliação por volta dos 12-13 anos. O exame é corretamente sinalizado como discutido.')}

    <aside class="dont-confuse">
      <p class="dont-confuse__tag">Não confunda — o que liberar</p>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Atividade física em geral</h4><p><strong>desejável</strong> — benéfica para a criança.</p></div>
        <div class="dont-confuse__side"><h4>Esportes de movimentação cervical intensa</h4><p><strong>cautelar</strong> (ginástica, cambalhotas) pelo risco de luxação atlanto-axial.</p></div>
      </div>
    </aside>

    ${quiz('p10', 'A cautela esportiva e o status do RX cervical.', [
      {
        stem: 'Por que há cautela com determinados esportes na criança com síndrome de Down?',
        alts: [
          { t: 'Porque toda atividade física é proibida na Down', correct: false, why: 'Exagera a restrição: não se proíbe <strong>toda</strong> atividade física (que é benéfica) — seleciona-se, evitando a de risco cervical. <em>Por que cair na A</em>: confunde-se "cautelar alguns esportes" com "proibir tudo".' },
          { t: 'Pela instabilidade atlanto-axial, que pode levar a luxação cervical e compressão medular — daí evitar ginástica e cambalhotas', correct: true, why: 'Certa. A Down tem <strong>instabilidade cervical (atlanto-axial)</strong>, que pode causar <strong>luxação</strong> e <strong>compressão medular</strong> — por isso se evitam esportes de movimentação cervical intensa (ginástica olímpica, cambalhotas).' },
          { t: 'Porque o risco é apenas de fraturas de membros', correct: false, why: 'Erra o alvo do risco: o risco central é <strong>cervical/medular</strong> (luxação atlanto-axial), não fratura de membros. <em>Por que cair na C</em>: desloca-se o risco para o lugar errado.' },
          { t: 'Porque a atividade física piora a cardiopatia obrigatoriamente', correct: false, why: 'Inventa relação obrigatória: a cautela esportiva aqui é pela <strong>coluna</strong>, não porque atividade física necessariamente piore a cardiopatia. <em>Por que cair na D</em>: cria-se um nexo cardíaco que não é o ponto.' },
        ]
      },
      {
        stem: 'Sobre a radiografia da coluna cervical no seguimento da Down, qual afirmação está correta?',
        alts: [
          { t: 'É um exame consensual e inquestionável, feito ao nascimento', correct: false, why: 'Superdimensiona e erra a idade: ao contrário dos quatro inquestionáveis, este é <strong>discutido</strong>, e é feito por volta dos 3 anos, não ao nascimento. <em>Por que cair na A</em>: equipara-se o exame discutido aos do núcleo.' },
          { t: 'É uma avaliação discutida, feita em geral por volta dos 3 anos, em que se medem ângulos/distâncias para estimar o risco de luxação', correct: true, why: 'Certa. O RX cervical é a avaliação <strong>discutida</strong> (não consensual), feita por volta dos <strong>3 anos</strong>, com medida de ângulos/distância (atlanto-axial) para estimar o risco de luxação.' },
          { t: 'Substitui o ecocardiograma no seguimento', correct: false, why: 'Troca a função: o RX cervical avalia a coluna; o ECO avalia o coração — um não substitui o outro. <em>Por que cair na C</em>: fundem-se rastreios de sistemas diferentes.' },
          { t: 'É obrigatória mensalmente', correct: false, why: 'Inventa periodicidade: não é mensal — é por volta dos 3 anos (com eventual reavaliação tardia). <em>Por que cair na D</em>: atribui-se uma cadência irreal.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 11 — E1 Pergunta central ===================== */
  P.push(page('p11', 11, `
    ${tag('gen', 'Turner · eixo gonadotrófico')}
    ${chips(['2ª da prova', 'monossomia 45,X', 'baixa estatura + disgenesia gonadal', 'hipogonadismo hipergonadotrófico'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Como uma menina pode ter MUITA gonadotrofina circulando e, mesmo assim, ter hipogonadismo?</p>
    </section>

    <h1 class="page-title">Síndrome de Turner: a menina 45,X e a gônada que não responde</h1>

    <div class="prose">
      <h3 class="topic-h">A 2ª da prova: o DD da menina baixa e do atraso puberal</h3>
      <p>Encerrada a Down, a segunda síndrome em importância é a <span class="hl-bad">síndrome de Turner</span> — aparece na prova com frequência <strong>bem próxima</strong> à da Down. E ela entra no <span class="term">diagnóstico diferencial</span> de dois cenários clássicos: a <strong>menina com baixa estatura</strong> e a <strong>menina com atraso puberal</strong>. São essas as queixas que inicialmente trazem a paciente — e é por elas que o Turner deve ser lembrado. Diante de uma menina baixa ou com puberdade que não chega, o Turner precisa estar na lista.</p>

      <h3 class="topic-h">Monossomia do X: o cariótipo 45,X</h3>
      <p>O mecanismo do Turner é a <span class="hl-bad">MONOSSOMIA do cromossomo X</span>. Em vez de <strong>46,XX</strong> (o cariótipo de referência feminino), a menina com Turner tem <span class="hl-bad">45,X</span> — ao chegar nos cromossomos sexuais do cariótipo, há <strong>apenas UM X</strong> (percorre-se do 1 ao 22 e, no par sexual, encontra-se só um X, faltando o segundo). É a ausência do segundo cromossomo sexual que gera todo o espectro da síndrome — o oposto conceitual da Down (que é <strong>ganho</strong> de material; o Turner é <strong>perda</strong>).</p>

      <h3 class="topic-h">As duas manifestações cardinais</h3>
      <p>Há duas manifestações <span class="hl-good">CARDINAIS</span> que sempre estarão presentes:</p>
      <ul class="find-list">
        <li><span class="hl-bad">Baixa estatura</span> (grave) — pode ser acentuada.</li>
        <li><span class="hl-bad">Disgenesia gonadal</span> — não há formação de tecido ovariano com função hormonal preservada.</li>
      </ul>
      <p>Essas duas são a marca do Turner. A baixa estatura é, em geral, a primeira percebida; a disgenesia gonadal se manifesta como atraso puberal e falência da função ovariana.</p>

      <h3 class="topic-h">Hipogonadismo hipergonadotrófico: a gônada que não responde</h3>
      <p>Da disgenesia gonadal nasce o conceito que a pergunta de abertura cobra. A consequência hormonal é o <span class="term">hipogonadismo hipergonadotrófico</span>. Decompondo o nome: <span class="hl-bad">hipogonadismo</span> = a gônada <strong>não funciona</strong> (não produz hormônio); <span class="hl-warn">hipergonadotrófico</span> = há <strong>MUITA gonadotrofina</strong> circulante. Como os dois convivem? Porque o problema <span class="hl-good">não é a produção de gonadotrofina</span> (hipotálamo e hipófise produzem bastante, tentando estimular) — o problema é a <span class="hl-bad">RESPOSTA da gônada</span> ao estímulo. A gônada disgenética <strong>não responde</strong>, por mais que seja estimulada. O corpo, percebendo a falta de hormônio gonadal, <strong>aumenta</strong> a gonadotrofina para compensar — daí "hiper". Muita gonadotrofina, gônada surda: hipogonadismo hipergonadotrófico.</p>
    </div>

    ${med({
      file: 'p11-cariotipo-45x-turner.jpg',
      alt: 'Cariótipo 45,X mostrando o par sexual com um único cromossomo X, indicado por seta.',
      achado: '<strong>Falta um X</strong> — cariótipo 45,X: par sexual com um único X (seta); a monossomia do X que define o Turner.',
      fonte: 'Suttur MS et al., Indian J Hum Genet 2009;15(2):75-77, via Wikimedia Commons',
      licenca: 'CC BY 2.0'
    })}

    ${svgPiso('S-08', { caption: 'o cariótipo 45,X — clique no local do segundo X ausente (o par sexual desenhado) para revelar "monossomia: só um X, 45,X"; o esquema acoplado do eixo gonadotrófico mostra "muita gonadotrofina → gônada não responde → hipogonadismo hipergonadotrófico".', hint: 'Clique no par sexual, ou Tab + Enter; o eixo hormonal anima a compensação.' })}

    <aside class="dont-confuse">
      <p class="dont-confuse__tag">Não confunda — os dois hipogonadismos</p>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Hipergonadotrófico</h4><p>problema na <strong>gônada</strong> (não responde); gonadotrofina <strong>alta</strong> — Turner, Klinefelter.</p></div>
        <div class="dont-confuse__side"><h4>Hipogonadotrófico</h4><p>problema <strong>central</strong> (hipotálamo-hipófise); gonadotrofina <strong>baixa</strong>.</p></div>
      </div>
    </aside>

    <aside class="trap">
      <p class="trap__tag">Pegadinha de prova</p>
      <p class="trap__text">Turner = <strong>45,X</strong> (monossomia, perda) — não confundir com a Down (trissomia, ganho). As duas cardinais: <strong>baixa estatura + disgenesia gonadal</strong>.</p>
    </aside>

    ${quiz('p11', 'O cariótipo, as cardinais e o eixo hipergonadotrófico.', [
      {
        stem: 'Qual o cariótipo da síndrome de Turner e suas duas manifestações cardinais?',
        alts: [
          { t: '47,XXY; ginecomastia e infertilidade', correct: false, why: 'Descreve o Klinefelter: 47,XXY com ginecomastia e infertilidade é o Klinefelter (masculino), não o Turner. <em>Por que cair na A</em>: trocam-se as duas síndromes dos cromossomos sexuais.' },
          { t: '45,X; baixa estatura grave e disgenesia gonadal', correct: true, why: 'Certa. O Turner é a <strong>monossomia do X (45,X)</strong>, e suas duas manifestações <strong>cardinais</strong> (sempre presentes) são a <strong>baixa estatura grave</strong> e a <strong>disgenesia gonadal</strong>.' },
          { t: 'Trissomia do 21; hipotonia e cardiopatia', correct: false, why: 'Descreve a Down: trissomia do 21 com hipotonia e cardiopatia é a Down — outra síndrome, com ganho de material. <em>Por que cair na C</em>: confunde-se monossomia (Turner) com trissomia (Down).' },
          { t: '46,XX; atraso puberal isolado', correct: false, why: 'Dá o cariótipo de referência: 46,XX é o <strong>normal</strong> feminino — no Turner falta um X (45,X). <em>Por que cair na D</em>: esquece-se da perda do segundo cromossomo sexual.' },
        ]
      },
      {
        stem: 'No hipogonadismo hipergonadotrófico do Turner, por que há muita gonadotrofina apesar do hipogonadismo?',
        alts: [
          { t: 'Porque a hipófise produz gonadotrofina em excesso por um tumor', correct: false, why: 'Inventa um tumor: a gonadotrofina alta é uma resposta <strong>compensatória</strong> normal do eixo, não produção tumoral. <em>Por que cair na A</em>: busca-se uma causa central para um problema gonadal.' },
          { t: 'Porque o problema é a resposta da gônada (disgenética) ao estímulo, não a produção de gonadotrofina — que sobe para tentar compensar', correct: true, why: 'Certa. O defeito é <strong>na gônada</strong> (disgenética, que <strong>não responde</strong>). O eixo central produz gonadotrofina normalmente e, percebendo a falta de hormônio gonadal, <strong>aumenta</strong> para compensar — daí "hiper". Muita gonadotrofina, gônada surda.' },
          { t: 'Porque a gonadotrofina está baixa, não alta', correct: false, why: 'Contradiz o "hiper": no Turner a gonadotrofina está <strong>alta</strong> (hipergonadotrófico) — baixa seria o hipogonadismo <strong>hipo</strong>gonadotrófico (central). <em>Por que cair na C</em>: confundem-se os dois tipos.' },
          { t: 'Porque a gônada funciona normalmente', correct: false, why: 'Nega a disgenesia: a gônada <strong>não</strong> funciona normalmente — é disgenética e não responde; por isso o hipogonadismo. <em>Por que cair na D</em>: ignora-se o defeito gonadal que define a síndrome.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 12 — E3 Caso clínico em abertura (QUADRO-CLÍNICO-RICO) ===================== */
  P.push(page('p12', 12, `
    ${tag('case', 'Turner · fenótipo, GH e coração')}
    ${chips(['linfedema neonatal → cariótipo', 'pterígio coli · tórax em escudo', 'GH: não é deficiência, mas responde', 'bicúspide × coarctação'])}

    <article class="opener opener--case" aria-label="Caso clínico de abertura">
      <span class="opener__case-header">Turner · recém-nascida · o gatilho diagnóstico no alojamento conjunto</span>
      <p class="opener__case-quote">Uma recém-nascida no alojamento conjunto com <strong>linfedema de dorso de mãos e pés</strong>. Esse único achado, ali, já é suficiente para <strong>solicitar o cariótipo</strong> — e pensar em Turner.</p>
      <dl class="case-card__meta">
        <dt>Paciente</dt><dd>recém-nascida no alojamento conjunto</dd>
        <dt>Achado</dt><dd>linfedema de dorso de mãos e pés</dd>
        <dt>Conduta imediata</dt><dd>solicitar o cariótipo já</dd>
        <dt>Hipótese</dt><dd>síndrome de Turner (antes das cardinais, que vêm mais tarde)</dd>
      </dl>
    </article>

    <h1 class="page-title">O corpo do Turner, o GH e o coração: do linfedema neonatal ao coarc-Turner</h1>

    <div class="prose">
      <h3 class="topic-h">O linfedema neonatal que já pede o cariótipo</h3>
      <p>As primeiras características do Turner <span class="term">já podem aparecer no exame do período neonatal</span> (nem sempre, mas podem). A mais marcante: o <span class="hl-bad">linfedema das mãos e dos pés</span> na recém-nascida. Ao ver uma menina com <strong>linfedema de dorso de mãos e pés</strong> no alojamento conjunto, <span class="hl-good">já se solicita o cariótipo naquele momento</span> — é um gatilho diagnóstico precoce poderoso. Outro achado neonatal: o <span class="term">pterígio coli</span> — excesso de pele, pele redundante na região da <strong>nuca</strong>. E aqui está o <span class="hl-warn">valor de prova</span> dessas características neonatais: aparecem com frequência nas questões justamente porque são descritas <strong>já no exame do recém-nascido</strong>, <strong>muito antes</strong> do surgimento das duas cardinais (baixa estatura + disgenesia gonadal), que só se evidenciam mais tarde.</p>

      <h3 class="topic-h">Os estigmas tardios</h3>
      <p>Mais adiante surgem outras características fenotípicas:</p>
      <ul class="find-list">
        <li><span class="term">Tórax em formato de ESCUDO</span> (largo).</li>
        <li><span class="term">Hipertelorismo mamilar</span> — afastamento mamário aumentado.</li>
        <li><span class="term">Alteração na orelha</span> (eventual).</li>
        <li><span class="hl-bad">Baixa estatura</span> — que pode ser grave (uma das cardinais).</li>
      </ul>
      <p>São os estigmas que, somados, compõem o fenótipo reconhecível do Turner além das duas cardinais.</p>

      <h3 class="topic-h">GH: não é deficiência, mas responde</h3>
      <p>Ponto que a banca explora. A baixa estatura do Turner <span class="hl-warn">NÃO é por deficiência de GH</span> — essas pacientes têm <strong>mutações em genes que regulam o crescimento</strong>, não falta de hormônio do crescimento. <strong>Apesar disso</strong>, elas <span class="hl-good">RESPONDEM ao tratamento com GH</span> — fazer GH <strong>melhora sensivelmente</strong> o prognóstico de estatura na vida adulta. É o paradoxo útil: não é deficiência de GH, mas o GH ajuda. Descobrir o Turner, portanto, <strong>não é só dar o nome</strong> — é poder intervir na estatura.</p>

      <h3 class="topic-h">As comorbidades</h3>
      <p>A menina com Turner tem mais risco de algumas comorbidades, que se rastreiam:</p>
      <ul class="find-list">
        <li><span class="hl-bad">Hipotireoidismo</span> — rastreamento periódico da função tireoidiana.</li>
        <li><span class="hl-bad">Doença celíaca</span> — recomenda-se rastreamento.</li>
        <li><span class="hl-bad">Cardiopatias congênitas</span> — risco aumentado (detalhe no próximo tópico).</li>
      </ul>

      <h3 class="topic-h">Bicúspide × coarctação: a pegadinha-mestra</h3>
      <p>O detalhe cardíaco é a pegadinha-mestra do Turner — e tem <strong>duas camadas</strong>:</p>
      <ul class="find-list">
        <li>A <span class="term">válvula aórtica bicúspide</span> é a alteração cardíaca <strong>MAIS FREQUENTE</strong> no Turner — <span class="hl-warn">mas NÃO é a que mais cai na prova</span>.</li>
        <li>A alteração que <span class="hl-bad">MAIS CAI na prova</span> é a <span class="hl-bad">COARCTAÇÃO DA AORTA</span>.</li>
      </ul>
      <p>Não fundir as duas: <strong>frequência clínica</strong> (bicúspide) é diferente de <strong>incidência em prova</strong> (coarctação). E a apresentação de prova da coarctação no Turner é uma tríade: <span class="hl-bad">menina com baixa estatura + HIPERTENSÃO + hipertensão associada à DIMINUIÇÃO DE PULSO nos membros inferiores</span>. É o clássico <strong>coarc-Turner</strong>: baixa estatura + HAS + pulsos femorais reduzidos → pensar Turner.</p>
    </div>

    ${med({
      file: 'p12-linfedema-neonatal-turner.jpg',
      alt: 'Dorso dos pés de recém-nascida com linfedema bilateral firme até os tornozelos.',
      achado: '<strong>O gatilho neonatal</strong> — linfedema de dorso dos pés: edema bilateral firme até os tornozelos; estigma clássico do Turner no RN. Diante dele, já se pede o cariótipo.',
      fonte: 'Hemani et al., Cureus 2021;13(7):e16733',
      licenca: 'CC BY 4.0'
    })}

    ${med({
      file: 'p12b-pterigio-coli-torax-escudo.jpg',
      alt: 'Paciente com pterígio coli (pescoço alado): dobra cutânea lateral ampla do mastóide ao ombro.',
      achado: '<strong>Os estigmas do Turner</strong> — pterígio coli (pescoço alado): dobra cutânea lateral ampla, do mastóide ao ombro. Estigma reconhecível além das duas cardinais.',
      fonte: 'Velasco-Terrones S et al., Rev Med Hosp Gen Mex 2019;82(1):50',
      licenca: 'CC BY-NC-ND 4.0'
    })}

    ${svgPiso('S-09', { caption: 'o corpo do Turner — clique em cada estigma desenhado (mãos/pés → linfedema neonatal "pede cariótipo"; nuca → pterígio coli; tórax → escudo; mamilos → hipertelorismo mamilar; estatura → baixa estatura) e nos dois marcadores de comorbidade (tireoide → hipotireoidismo; coração → coarctação "coarc-Turner", com a tríade baixa estatura + HAS + ↓pulso MMII).', hint: 'Clique no próprio estigma, ou Tab + Enter; os marcadores de comorbidade abrem a pegadinha cardíaca.' })}

    ${notaValor('a baixa estatura do Turner é por <strong>haploinsuficiência do gene SHOX</strong>, não deficiência de GH; estatura final ≈ 143 cm sem GH, ~150 cm com GH · <strong>bicúspide</strong> = mais frequente (10-18%); <strong>coarctação</strong> = a que mais cai em prova.')}

    <aside class="dont-confuse">
      <p class="dont-confuse__tag">Não confunda — frequência ≠ incidência em prova</p>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Válvula aórtica bicúspide</h4><p>a <strong>mais frequente</strong> no Turner.</p></div>
        <div class="dont-confuse__side"><h4>Coarctação da aorta</h4><p>a que <strong>mais cai em prova</strong> (coarc-Turner: baixa estatura + HAS + ↓pulso MMII).</p></div>
      </div>
    </aside>

    ${quiz('p12', 'O gatilho neonatal e a pegadinha-mestra cardíaca.', [
      {
        stem: 'Recém-nascida com linfedema de dorso de mãos e pés no alojamento conjunto. Qual a conduta e a hipótese?',
        alts: [
          { t: 'Aguardar o surgimento da baixa estatura para investigar', correct: false, why: 'Perde a janela precoce: o valor do achado neonatal é permitir o diagnóstico <strong>antes</strong> da baixa estatura/atraso puberal — esperar contraria isso. <em>Por que cair na A</em>: subestima-se o gatilho neonatal.' },
          { t: 'Solicitar o cariótipo já, pensando em síndrome de Turner', correct: true, why: 'Certa. O <strong>linfedema neonatal de mãos e pés</strong> é um gatilho diagnóstico precoce do Turner — diante dele, <strong>já se solicita o cariótipo</strong>, sem esperar as manifestações cardinais.' },
          { t: 'Tranquilizar, pois linfedema neonatal nunca tem significado', correct: false, why: 'Ignora um sinal clássico: o linfedema de mãos/pés na RN é achado consagrado do Turner. <em>Por que cair na C</em>: descarta-se um sinal de alta especificidade.' },
          { t: 'Investigar apenas cardiopatia, sem cariótipo', correct: false, why: 'Restringe a investigação: investiga-se com <strong>cariótipo</strong> (que confirma o Turner); a cardiopatia entra no seguimento, mas o passo aqui é o cariótipo. <em>Por que cair na D</em>: pula-se o exame que fecha a síndrome.' },
        ]
      },
      {
        stem: 'Sobre o coração na síndrome de Turner, qual afirmação está correta?',
        alts: [
          { t: 'A coarctação da aorta é a alteração mais frequente e também a que mais cai na prova', correct: false, why: 'Funde frequência com prova: a mais frequente é a <strong>bicúspide</strong> (não a coarctação); a coarctação é a mais <strong>cobrada</strong> — são coisas diferentes. <em>Por que cair na A</em>: confunde-se "mais comum clinicamente" com "mais cobrada".' },
          { t: 'A válvula aórtica bicúspide é a mais frequente, mas a coarctação da aorta é a que mais cai na prova (menina + baixa estatura + HAS + ↓pulso em MMII)', correct: true, why: 'Certa. Duas camadas: a <strong>bicúspide</strong> é a <strong>mais frequente</strong>, mas a <strong>coarctação</strong> é a que <strong>mais cai em prova</strong> — com a tríade menina + baixa estatura + HAS + diminuição de pulso em MMII (coarc-Turner).' },
          { t: 'Não há associação cardíaca relevante no Turner', correct: false, why: 'Nega a associação: o Turner tem associação cardíaca <strong>relevante</strong> (bicúspide e coarctação). <em>Por que cair na C</em>: ignora-se uma das pegadinhas-mestras.' },
          { t: 'A cardiopatia do Turner é o DSAV, como na Down', correct: false, why: 'Importa a cardiopatia da Down: o DSAV é a mais característica da <strong>Down</strong>, não do Turner (cujo eixo são as lesões obstrutivas esquerdas). <em>Por que cair na D</em>: misturam-se as cardiopatias das duas síndromes.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 13 — E8 Erro comum desmontado (QUADRO-CLÍNICO-RICO) ===================== */
  P.push(page('p13', 13, `
    ${tag('gen', 'Klinefelter · aneuploidia sexual masculina')}
    ${chips(['47,XXY', 'subdiagnóstico · casal infértil', 'testículo pequeno e firme', 'virilização incompleta', 'ginecomastia']) }

    <section class="opener opener--bust" aria-label="Erro comum desmontado">
      <p class="opener__bust-tag">Erro comum</p>
      <p class="opener__bust-wrong">"Menino púbere com ginecomastia? É ginecomastia fisiológica da puberdade."</p>
      <p class="opener__bust-right">Se houver <strong>testículo pequeno e firme + virilização incompleta</strong>, isso <strong>não</strong> é fisiológico — é <strong>Klinefelter</strong> até prova em contrário. A combinação muda tudo, não a ginecomastia isolada.</p>
    </section>

    <h1 class="page-title">Síndrome de Klinefelter: o 47,XXY que só aparece na puberdade</h1>

    <div class="prose">
      <h3 class="topic-h">47,XXY: aneuploidia só do sexo masculino</h3>
      <p>A síndrome de Klinefelter é uma <span class="term">aneuploidia</span> — alteração no <strong>número</strong> de cromossomos, aqui relacionada ao <strong>cromossomo sexual</strong>. Duas marcas de identidade: é diagnosticada <span class="hl-bad">APENAS no sexo masculino</span>, e o menino apresenta um <span class="term">cromossomo X extranumerário</span> — na maior parte das vezes o cariótipo é <span class="hl-bad">47,XXY</span> (em vez de 46,XY). Um X a mais no homem: essa é a raiz do Klinefelter.</p>

      <h3 class="topic-h">A síndrome que se esconde até o casal infértil</h3>
      <p>A <span class="hl-warn">prevalência</span> do Klinefelter na população é <strong>impressionante</strong> (alta) — é, de fato, uma das alterações cromossômicas mais frequentes. Mas há um paradoxo: <span class="hl-warn">muitos homens adultos com Klinefelter NÃO são diagnosticados</span>. O diagnóstico ocorre, eventualmente, apenas durante a <strong>investigação de casal infértil</strong> — porque o Klinefelter pode ser <span class="hl-bad">causa de infertilidade no sexo masculino</span>. É uma síndrome que frequentemente passa despercebida até que a infertilidade do casal leve à investigação.</p>

      <h3 class="topic-h">Hipogonadismo, infertilidade e testículo pequeno e firme</h3>
      <p>As manifestações <span class="hl-warn">só se tornam mais evidentes na PUBERDADE</span> — nos primeiros anos de vida, em geral, não se faz o diagnóstico; conforme o menino entraria na puberdade, os sinais vão aparecendo. O cromossomo X extranumerário leva a alterações no desenvolvimento testicular, com um quadro central:</p>
      <ul class="find-list">
        <li><span class="term">Hipogonadismo hipergonadotrófico</span> — de modo <strong>semelhante ao Turner</strong> (a gônada não responde; gonadotrofina alta).</li>
        <li><span class="hl-bad">Infertilidade</span> — a espermatogênese é <strong>bloqueada</strong>: o excesso de X leva à <strong>morte das células germinativas</strong>.</li>
        <li><span class="hl-bad">Testículo pequeno e firme</span> — o excesso de X também leva à <strong>destruição de tecido testicular</strong>; com o tempo, o testículo fica pequeno e firme.</li>
      </ul>

      <h3 class="topic-h">Virilização incompleta e ginecomastia: a pegadinha</h3>
      <p>Dois achados fecham o quadro puberal — e a pegadinha:</p>
      <ul class="find-list">
        <li><span class="hl-warn">Virilização INCOMPLETA</span> — o paciente <strong>pode ter alguns sinais de virilização</strong>, porque os androgênios vêm dos testículos <strong>mas também da adrenal</strong>; porém, com a <strong>diminuição de testosterona</strong>, a virilização será <span class="hl-bad">sempre INCOMPLETA</span>.</li>
        <li><span class="hl-bad">Ginecomastia</span> — bastante comum: pela diminuição da testosterona, há <strong>desequilíbrio</strong> entre androgênio e estrogênio circulantes, e o paciente desenvolve ginecomastia.</li>
      </ul>
      <p>E aqui está o erro a desmontar: a ginecomastia é evento <strong>comum</strong> da puberdade masculina (ginecomastia puberal/fisiológica) — <span class="hl-bad">MAS</span>, diante de um menino com <strong>virilização incompleta + testículo pequeno + ginecomastia</strong>, <strong>NÃO</strong> se pode chamar de ginecomastia fisiológica. É preciso <strong>considerar a síndrome de Klinefelter</strong>. A combinação (não a ginecomastia isolada) é o que muda tudo.</p>
    </div>

    ${med({
      file: 'p13-klinefelter.jpg',
      alt: 'Cariótipo 47,XXY (Klinefelter), com o par sexual exibindo dois cromossomos X e um Y.',
      achado: '<strong>Um X a mais no homem</strong> — cariótipo 47,XXY (Klinefelter): par sexual com dois X e um Y; trissomia do sexual. Quadro puberal: ginecomastia, testículo pequeno e firme, virilização incompleta.',
      fonte: 'Karyotype 47,XXY by User:Nami-ja, via Wikimedia Commons',
      licenca: 'Domínio público'
    })}

    ${svgPiso('S-10', { caption: 'o cariótipo 47,XXY + quadro puberal — clique no X extranumerário desenhado (o par sexual) para revelar "47,XXY: um X a mais"; o painel acoplado tem hotspots nos achados puberais (testículo pequeno/firme, ginecomastia, virilização incompleta) e desmonta a pegadinha: ginecomastia + testículo pequeno + virilização incompleta ≠ fisiológica → Klinefelter.', hint: 'Clique no X extra, ou Tab + Enter; o painel puberal abre cada achado.' })}

    ${notaValor('prevalência ≈ <strong>1/660 nascidos masculinos</strong> (também citado 1/500-1000) — a aneuploidia mais comum em homens.')}

    <aside class="dont-confuse">
      <p class="dont-confuse__tag">Não confunda — as duas ginecomastias</p>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Ginecomastia puberal fisiológica</h4><p>isolada, testículos normais, virilização normal.</p></div>
        <div class="dont-confuse__side"><h4>Ginecomastia do Klinefelter</h4><p>acompanhada de <strong>testículo pequeno e firme + virilização incompleta</strong>.</p></div>
      </div>
    </aside>

    <aside class="trap">
      <p class="trap__tag">Pegadinha de prova</p>
      <p class="trap__text">Menino púbere com <strong>ginecomastia + testículo pequeno e firme + virilização incompleta</strong> → <strong>Klinefelter</strong> (não ginecomastia fisiológica). E a virilização é <strong>INCOMPLETA</strong> (há diminuição de testosterona).</p>
    </aside>

    ${quiz('p13', 'O cariótipo, a janela puberal e a pegadinha da ginecomastia.', [
      {
        stem: 'Qual o cariótipo do Klinefelter e em que momento as manifestações costumam se evidenciar?',
        alts: [
          { t: '45,X; já no período neonatal', correct: false, why: 'Dá o cariótipo do Turner: 45,X é o Turner (feminino, monossomia), com achados que podem aparecer no neonato — não o Klinefelter. <em>Por que cair na A</em>: trocam-se as aneuploidias sexuais.' },
          { t: '47,XXY; mais evidentes na puberdade', correct: true, why: 'Certa. O Klinefelter é <strong>47,XXY</strong> (X extranumerário, só no sexo masculino), e suas manifestações <strong>só se tornam mais evidentes na puberdade</strong> — nos primeiros anos, em geral, não se diagnostica.' },
          { t: 'Trissomia do 21; ao nascimento', correct: false, why: 'Dá a Down: trissomia do 21 ao nascimento é a Down — outra síndrome. <em>Por que cair na C</em>: confunde-se trissomia autossômica com aneuploidia sexual.' },
          { t: '46,XY; na vida adulta apenas', correct: false, why: 'Dá o cariótipo de referência: 46,XY é o <strong>normal</strong> masculino; o Klinefelter tem um X a mais (47,XXY). <em>Por que cair na D</em>: esquece-se do X extranumerário.' },
        ]
      },
      {
        stem: 'Um menino na puberdade tem ginecomastia, testículo pequeno e firme e virilização incompleta. Qual a interpretação correta?',
        alts: [
          { t: 'Ginecomastia puberal fisiológica, sem necessidade de investigação', correct: false, why: 'Cai na pegadinha: a presença de testículo pequeno/firme e virilização incompleta <strong>descaracteriza</strong> a ginecomastia fisiológica — investigar é obrigatório. <em>Por que cair na A</em>: rotula-se toda ginecomastia puberal como fisiológica.' },
          { t: 'Síndrome de Klinefelter — a tríade não é fisiológica; solicitar cariótipo', correct: true, why: 'Certa. Ginecomastia <strong>isolada</strong> pode ser fisiológica na puberdade — <strong>mas</strong> com <strong>testículo pequeno e firme + virilização incompleta</strong>, o conjunto aponta <strong>Klinefelter</strong>. Solicita-se o cariótipo.' },
          { t: 'Virilização completa, excluindo Klinefelter', correct: false, why: 'Inverte o achado: no Klinefelter a virilização é <strong>incompleta</strong> (diminuição de testosterona), não completa — e isso <strong>não</strong> exclui a síndrome, reforça-a. <em>Por que cair na C</em>: confunde-se "alguns sinais de virilização" com "virilização completa".' },
          { t: 'Síndrome de Turner', correct: false, why: 'Erra o sexo/cariótipo: Turner é 45,X (feminino); o quadro descrito é masculino (47,XXY). <em>Por que cair na D</em>: troca-se Klinefelter por Turner.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 14 — E7 Comparação chocante ===================== */
  P.push(page('p14', 14, `
    ${tag('grave', 'Klinefelter alto × trissomias graves')}
    ${chips(['hábito eunucoide · envergadura > estatura', 'Edwards-18: dedos sobrepostos + pé em cadeira de balanço', 'Patau-13: fenda labiopalatina/linha média'])}

    <section class="opener opener--vs" aria-label="Comparação de abertura">
      <div class="opener__vs-grid">
        <div class="opener__vs-side">
          <h3>O alto eunucoide</h3>
          <p><strong>Klinefelter</strong>: alta estatura, envergadura &gt; estatura — esqueleto que cresceu demais.</p>
        </div>
        <div class="opener__vs-divider" aria-hidden="true">vs</div>
        <div class="opener__vs-side">
          <h3>As trissomias graves</h3>
          <p><strong>Edwards (18)</strong> e <strong>Patau (13)</strong>: restrição de crescimento, gravíssimas, óbito precoce.</p>
        </div>
      </div>
      <p class="opener__vs-asterisk">Lado a lado, um quadro de excesso de crescimento e dois de restrição grave. O contraste organiza a transição entre os três.</p>
    </section>

    <h1 class="page-title">O eunucoide alto e as duas trissomias graves: Klinefelter, Edwards e Patau</h1>

    <div class="prose">
      <h3 class="topic-h">A alta estatura do Klinefelter e o hábito eunucoide</h3>
      <p>O Klinefelter cursa com <span class="hl-bad">ALTA ESTATURA</span> — e o mecanismo é elegante. Pela <span class="term">menor produção dos esteroides sexuais</span>, o <strong>fechamento das cartilagens de crescimento não ocorre de maneira adequada</strong>: as epífises permanecem abertas por mais tempo, e os ossos longos crescem mais. Tipicamente, o paciente tem <span class="hl-bad">envergadura aumentada</span> — a envergadura (distância entre as extremidades das duas mãos, braços abertos) pode ser <strong>MAIOR que a estatura</strong>. Esse padrão é o <span class="term">hábito/aspecto EUNUCOIDE</span>. O termo vem de <strong>eunuco</strong> — aquele que foi castrado e, por isso, tem menos produção de hormônio masculino. O mecanismo: menos hormônio masculino → crescimento dos <strong>MEMBROS desproporcional</strong>, porque o esqueleto <strong>AXIAL</strong> não sofre tanto esse impacto e os <strong>OSSOS LONGOS</strong> são muito mais impactados. Diante de um menino alto, eunucoide, com envergadura &gt; estatura e o quadro puberal já visto, <span class="hl-good">solicitar o cariótipo</span> para Klinefelter.</p>

      <h3 class="topic-h">Edwards (18): a trissomia da mão e do pé</h3>
      <p>Há <span class="term">duas outras aneuploidias</span> que eventualmente aparecem na prova (aneuploidia = síndrome genética por alteração no número de cromossomos). A primeira é a <span class="hl-bad">síndrome de Edwards</span>, uma síndrome <strong>bastante GRAVE</strong>, relacionada à <span class="hl-bad">trissomia do cromossomo 18</span>. A maior parte das crianças evolui para <span class="hl-bad">óbito ainda no primeiro ano de vida</span> — por isso poucas são vistas na prática. Os achados:</p>
      <ul class="find-list">
        <li><span class="term">CIUR / PIG</span> — restrição de crescimento intrauterino; nasce um bebê <strong>pequeno para a idade gestacional</strong>.</li>
        <li><span class="term">Região occipital proeminente</span>.</li>
        <li><span class="hl-bad">Dedos sobrepostos</span> com padrão <strong>MUITO característico</strong>: o <strong>QUINTO</strong> dedo cobre o <strong>quarto</strong> e o <strong>SEGUNDO</strong> cobre o <strong>polegar</strong>.</li>
        <li><span class="hl-bad">Pé em cadeira de balanço</span> — pé com <strong>calcanhar proeminente</strong>.</li>
        <li>Maior propensão a cardiopatia.</li>
      </ul>
      <p>A âncora de prova: <strong>Edwards = dedos sobrepostos + pé em cadeira de balanço</strong> (trissomia do 18).</p>

      <h3 class="topic-h">Patau (13): a trissomia da linha média</h3>
      <p>A segunda é a <span class="hl-bad">síndrome de Patau</span>, também uma trissomia — agora a <span class="hl-bad">trissomia do cromossomo 13</span>. Os achados:</p>
      <ul class="find-list">
        <li><span class="hl-bad">Microcefalia</span>.</li>
        <li>Várias malformações do <strong>sistema nervoso central</strong>.</li>
        <li><span class="hl-bad">Fenda labiopalatina</span> — a grande característica que faz pensar em Edwards e Patau (e não em outras síndromes) são as <strong>malformações OROFACIAIS</strong>; em Patau, a fenda labiopalatina. São alterações de <span class="term">LINHA MÉDIA</span>.</li>
      </ul>
      <p>A âncora de prova: <strong>Patau = malformações de SNC + fenda labiopalatina (linha média)</strong> (trissomia do 13).</p>
    </div>

    ${med({
      file: 'p14-edwards-dedos-sobrepostos.jpg',
      alt: 'Mão cerrada de recém-nascido com trissomia 18, mostrando dedos sobrepostos: indicador sobre o terceiro dedo e quinto sobre o quarto.',
      achado: '<strong>Edwards (trissomia 18)</strong> — mão cerrada com dedos sobrepostos: indicador sobre o 3º, 5º sobre o 4º. Padrão muito característico (com o pé em cadeira de balanço).',
      fonte: 'Bobjgalindo, via Wikimedia Commons',
      licenca: 'CC BY-SA 4.0'
    })}

    ${med({
      file: 'p14b-patau-fenda-labiopalatina.jpg',
      alt: 'Recém-nascido com trissomia 13, evidenciando fenda labiopalatina bilateral na linha média e hipotelorismo.',
      achado: '<strong>Patau (trissomia 13)</strong> — fenda labiopalatina bilateral (linha média), com hipotelorismo. Alteração orofacial de linha média que aponta a trissomia do 13.',
      fonte: 'Gellis SS & Feingold M, Atlas of Mental Retardation Syndromes (US PHS, 1968), via Wikimedia Commons',
      licenca: 'Domínio público',
      tarja: 'orbital'
    })}

    ${svgPiso('S-11', { caption: 'o comparador das três síndromes — clique em cada cartão para abrir os achados-âncora: <strong>Klinefelter</strong> (alta estatura, hábito eunucoide, envergadura &gt; estatura, fechamento epifisário tardio) / <strong>Edwards-18</strong> (CIUR/PIG, occipital proeminente, dedos sobrepostos, pé em cadeira de balanço, cardiopatia, óbito 1º ano) / <strong>Patau-13</strong> (microcefalia, malformações SNC, fenda labiopalatina/linha média).', hint: 'Cartões comparativos: clique em cada síndrome, ou Tab + Enter.' })}

    ${notaValor('<strong>Edwards</strong> — cardiopatia em &gt;90%; &lt;10% sobrevivem ao 1º ano (gravíssima).')}

    <aside class="dont-confuse">
      <p class="dont-confuse__tag">Não confunda — Edwards × Patau</p>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Edwards (18)</h4><p>dedos sobrepostos + pé em cadeira de balanço.</p></div>
        <div class="dont-confuse__side"><h4>Patau (13)</h4><p>microcefalia + fenda labiopalatina (linha média). Ambas gravíssimas, óbito precoce frequente.</p></div>
      </div>
    </aside>

    ${quiz('p14', 'O mecanismo da alta estatura e a ponte síndrome ↔ cromossomo ↔ achado.', [
      {
        stem: 'Por que o Klinefelter cursa com alta estatura e hábito eunucoide?',
        alts: [
          { t: 'Por excesso de hormônio do crescimento', correct: false, why: 'Inventa excesso de GH: o mecanismo é o <strong>déficit de esteroides sexuais</strong> (fechamento epifisário tardio), não excesso de GH. <em>Por que cair na A</em>: associa-se alta estatura a "muito hormônio do crescimento".' },
          { t: 'Pela menor produção de esteroides sexuais: o fechamento das epífises atrasa, os ossos longos crescem mais, e a envergadura pode superar a estatura', correct: true, why: 'Certa. Com <strong>menos esteroides sexuais</strong>, as <strong>epífises fecham mais tarde</strong>; os <strong>ossos longos</strong> (membros) crescem mais que o esqueleto axial → alta estatura e envergadura &gt; estatura (hábito eunucoide).' },
          { t: 'Por deficiência de GH tratada com sucesso', correct: false, why: 'Confunde com o Turner: deficiência de GH tratada é discurso do Turner — no Klinefelter o motor é o esteroide sexual baixo. <em>Por que cair na C</em>: importa-se o raciocínio de uma síndrome para a outra.' },
          { t: 'Porque o cromossomo X extra acelera o fechamento das epífises', correct: false, why: 'Inverte o efeito: o déficit de esteroides <strong>atrasa</strong> (não acelera) o fechamento epifisário — por isso os ossos crescem mais. <em>Por que cair na D</em>: troca-se atraso por aceleração.' },
        ]
      },
      {
        stem: 'Qual a associação correta entre síndrome, cromossomo e achado-âncora?',
        alts: [
          { t: 'Edwards = trissomia 13, fenda labiopalatina; Patau = trissomia 18, dedos sobrepostos', correct: false, why: 'Inverte os números: troca Edwards-18 por 13 e Patau-13 por 18, e cruza os achados. <em>Por que cair na A</em>: embaralha-se cromossomo e achado.' },
          { t: 'Edwards = trissomia 18, dedos sobrepostos e pé em cadeira de balanço; Patau = trissomia 13, microcefalia e fenda labiopalatina (linha média)', correct: true, why: 'Certa. <strong>Edwards = trissomia 18</strong> (dedos sobrepostos + pé em cadeira de balanço); <strong>Patau = trissomia 13</strong> (microcefalia + malformações de SNC + fenda labiopalatina, linha média).' },
          { t: 'Edwards e Patau são monossomias dos cromossomos sexuais', correct: false, why: 'Erra a natureza: Edwards e Patau são <strong>trissomias autossômicas</strong> (18 e 13), não monossomias sexuais (isso é o Turner). <em>Por que cair na C</em>: confunde-se trissomia autossômica com aneuploidia sexual.' },
          { t: 'Edwards = trissomia 21; Patau = trissomia 18', correct: false, why: 'Dá o cromossomo errado: Edwards é 18 (não 21, que é a Down), e Patau é 13 (não 18). <em>Por que cair na D</em>: desloca-se a numeração das trissomias.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 15 — E6 Mnemônico-âncora primeiro (HERÓI H-2) ===================== */
  P.push(page('p15', 15, `
    ${tag('gen', 'Síntese · a ponte das cinco')}
    ${chips(['Patau-13 / Edwards-18', 'aneuploidia = número alterado', 'trissomias → 47 · Turner → 45', 'síndrome ↔ cromossomo ↔ achado'])}

    <aside class="opener opener--mnemonic" aria-label="Mnemônico-âncora de abertura">
      <p class="opener__mnemonic-quote"><em>Patau é 13. Edwards é 18.</em> Essa simples ligação síndrome ↔ cromossomo resolve um monte de questão — e é o coração da ponte que fecha o apanhado das cinco.</p>
      <p class="opener__mnemonic-tag">Âncora da página</p>
    </aside>

    <h1 class="page-title">A ponte das cinco síndromes: cada uma, seu cromossomo, seu achado</h1>

    <div class="prose">
      <h3 class="topic-h">Edwards-18 e Patau-13: a ligação que resolve questões</h3>
      <p>Para a prova, duas associações de achado fecham as trissomias graves: associar <span class="hl-bad">EDWARDS aos dedos sobrepostos e ao pé em cadeira de balanço</span>; e associar <span class="hl-bad">PATAU às malformações variadas do sistema nervoso central, mas principalmente às fendas labiopalatinas</span> — que são alterações de <span class="term">LINHA MÉDIA</span>. E o essencial, o que mais rende: <span class="hl-good">associar PATAU com 13 e EDWARDS com 18</span>. Essa simples ligação <strong>síndrome ↔ alteração genética</strong> resolve um monte de questões — é o atalho de prova das duas trissomias graves.</p>

      <h3 class="topic-h">Aneuploidia: alteração no número de cromossomos</h3>
      <p>O conceito que organiza várias dessas síndromes: <span class="term">aneuploidia</span> é a síndrome genética causada por <strong>alteração no NÚMERO / quantidade de cromossomos</strong>. Numa aneuploidia, em vez do cariótipo normal (<strong>46,XX</strong> ou <strong>46,XY</strong>), há um cromossomo <strong>a mais</strong> — o total sobe para <span class="hl-bad">47</span>. Dois jeitos de "contar" o cromossomo extra:</p>
      <ul class="find-list">
        <li><span class="hl-bad">47,XXY</span> corresponde ao <strong>Klinefelter</strong> (cromossomo X extranumerário — a contagem aparece nas letras sexuais).</li>
        <li>Nas <span class="hl-bad">trissomias autossômicas</span>, o cromossomo extra é contado pelo <strong>número</strong>: <strong>trissomia 21 = Down; trissomia 18 = Edwards; trissomia 13 = Patau</strong>.</li>
      </ul>
      <p>(O Turner é a exceção do grupo: não é trissomia/ganho, é <strong>monossomia</strong> — 45,X, perda de um cromossomo sexual.)</p>

      <h3 class="topic-h">As cinco a dominar e a ponte síndrome ↔ cromossomo ↔ achado</h3>
      <p>Estas cinco síndromes concentram o apanhado mais recorrente em concurso. As <span class="hl-good">cinco a dominar para prova</span>: <strong>Down</strong> (a mais cobrada), <strong>Turner</strong>, <strong>Klinefelter</strong>, <strong>Edwards</strong> e <strong>Patau</strong>. E o <strong>eixo-mestre de fixação</strong> — a ponte que a figura desenha — pareia cada síndrome com sua alteração genética e seu achado-âncora:</p>
      <ul class="find-list">
        <li><span class="hl-bad">Down</span> → trissomia 21 (livre / translocação 14;21 / mosaico) → hipotonia universal, fenótipo facial, DSAV.</li>
        <li><span class="hl-bad">Turner</span> → 45,X (monossomia) → baixa estatura + disgenesia gonadal + coarc-Turner.</li>
        <li><span class="hl-bad">Klinefelter</span> → 47,XXY → hipogonadismo hipergonadotrófico + alta estatura/eunucoide + ginecomastia.</li>
        <li><span class="hl-bad">Edwards</span> → trissomia 18 → CIUR/PIG + dedos sobrepostos + pé em cadeira de balanço.</li>
        <li><span class="hl-bad">Patau</span> → trissomia 13 → microcefalia + fenda labiopalatina (linha média).</li>
      </ul>
      <p>Dominada a ponte — nome, cromossomo, achado —, o apanhado das síndromes genéticas está resolvido.</p>
    </div>

    <aside class="op-summary">
      <p class="op-summary__label">Resumo operacional</p>
      <p><strong>Down-21</strong> (a rainha) · <strong>Turner-45,X</strong> (única monossomia: baixa estatura + disgenesia gonadal) · <strong>Klinefelter-47,XXY</strong> (alto, eunucoide, ginecomastia) · <strong>Edwards-18</strong> (mão/pé: dedos sobrepostos + cadeira de balanço) · <strong>Patau-13</strong> (linha média: fenda labiopalatina). Aneuploidia = número alterado (sobe para 47, exceto o Turner, que cai para 45).</p>
    </aside>

    ${svgHero('p15', { caption: 'o painel-mestre das cinco síndromes — uma ponte de três colunas que se repete para cada síndrome: NOME ↔ ALTERAÇÃO GENÉTICA (cariótipo) ↔ ACHADO-ÂNCORA (Down, Turner, Klinefelter, Edwards, Patau). Hotspots em cada célula revelam o detalhe; um filtro "ganho × perda" separa as trissomias (→ 47) do Turner (monossomia → 45), com o destaque mnemônico Patau-13 / Edwards-18.' })}

    ${svgPiso('B-15-atlas', { doc: true, caption: 'o atlas comparativo das cinco síndromes — peça documental que reúne, lado a lado, cada síndrome com seu cromossomo e seu achado-âncora (Down-21, Turner-45,X, Klinefelter-47,XXY, Edwards-18, Patau-13). Ancoragem documental da ponte, distinta da figura-herói interativa acima.', hint: 'Quadro de referência; navegável por teclado quando há células interativas.' })}

    ${med({
      file: 'p15-cariotipo-humano-referencia.jpg',
      alt: 'Fotomicrografia de cariótipo humano normal 46,XX: 22 pares de autossomos bandeados ordenados por tamanho e o par sexual X, X.',
      achado: 'cariótipo humano normal — 46,XX. Vinte e dois pares de autossomos mais o par sexual, em metáfase bandeada. É este exame que nomeia cada uma das cinco síndromes: muda a contagem (47; trissomias 21/18/13; 47,XXY) ou a estrutura (translocação 14;21; 45,X).',
      fonte: 'Cariótipo 46,XX por Doc. RNDr. Josef Reischig, CSc., via Wikimedia Commons',
      licenca: 'CC BY-SA 3.0'
    })}

    <aside class="board-wants">
      <p class="board-wants__label">O que a banca quer</p>
      <p>A ponte síndrome ↔ cromossomo ↔ achado das cinco; Patau-13 e Edwards-18; o conceito de aneuploidia (número de cromossomos); e que o Turner é a exceção (monossomia, 45,X), enquanto as demais sobem para 47.</p>
    </aside>

    <aside class="active-review">
      <p class="active-review__label">Fechamento</p>
      <p>Você agora entende por que diagnosticar síndrome importa, domina a Down em profundidade (três mecanismos, fenótipo, comorbidades e seguimento com periodicidade exata), reconhece o Turner (45,X, disgenesia gonadal, coarc-Turner), o Klinefelter (47,XXY, hipogonadismo hipergonadotrófico, eunucoide, ginecomastia) e as duas trissomias graves (Edwards-18 e Patau-13) — e fixa tudo na ponte síndrome ↔ cromossomo ↔ achado, sem cair nas pegadinhas (trissomia 21 não é o único mecanismo da Down; ECO não repete se normal, mas TSH é seriado; virilização incompleta no Klinefelter; bicúspide mais frequente × coarctação mais cobrada no Turner).</p>
    </aside>

    ${quiz('p15', 'A ponte completa das cinco e o conceito de aneuploidia.', [
      {
        stem: 'Qual a associação correta de síndrome ↔ cromossomo ↔ achado-âncora?',
        alts: [
          { t: 'Down-21 / Turner-47,XXY / Klinefelter-45,X', correct: false, why: 'Cruza os cariótipos sexuais: dá ao Turner o 47,XXY (que é Klinefelter) e ao Klinefelter o 45,X (que é Turner). <em>Por que cair na A</em>: invertem-se as duas aneuploidias sexuais.' },
          { t: 'Down-21 (hipotonia/DSAV) · Turner-45,X (baixa estatura + disgenesia gonadal) · Klinefelter-47,XXY (eunucoide/ginecomastia) · Edwards-18 (dedos sobrepostos) · Patau-13 (fenda labiopalatina)', correct: true, why: 'Certa. A ponte completa: <strong>Down-21</strong>, <strong>Turner-45,X</strong>, <strong>Klinefelter-47,XXY</strong>, <strong>Edwards-18</strong>, <strong>Patau-13</strong>, cada uma com seu achado-âncora. É o eixo-mestre que resolve a maioria das questões.' },
          { t: 'Edwards-13 / Patau-18 / Klinefelter-46,XY', correct: false, why: 'Inverte trissomias e erra o Klinefelter: Edwards é 18 (não 13), Patau é 13 (não 18), e Klinefelter é 47,XXY (não 46,XY). <em>Por que cair na C</em>: embaralha-se a numeração e o cariótipo.' },
          { t: 'Turner-trissomia 21 / Down-45,X', correct: false, why: 'Troca Down e Turner: Down é trissomia 21 (não 45,X) e Turner é 45,X (não trissomia 21). <em>Por que cair na D</em>: cruza-se ganho (Down) com perda (Turner).' },
        ]
      },
      {
        stem: 'Sobre o conceito de aneuploidia aplicado às síndromes, qual afirmação está correta?',
        alts: [
          { t: 'Aneuploidia é sempre um cromossomo a menos (total 45)', correct: false, why: 'Reduz a só monossomia: aneuploidia inclui ganho (trissomia, 47) <strong>e</strong> perda (monossomia, 45) — não é "sempre a menos". <em>Por que cair na A</em>: generaliza-se o Turner para todas.' },
          { t: 'Aneuploidia é alteração no número de cromossomos; nas trissomias o total sobe para 47 (47,XXY = Klinefelter; trissomia 21/18/13 = Down/Edwards/Patau), e o Turner é a exceção, monossomia (45,X)', correct: true, why: 'Certa. Aneuploidia é alteração no <strong>número</strong> de cromossomos. Nas <strong>trissomias</strong> o total sobe para <strong>47</strong>; o <strong>Turner é a exceção</strong>: monossomia (45,X), perda de um cromossomo.' },
          { t: 'Todas as cinco síndromes têm 47 cromossomos', correct: false, why: 'Ignora o Turner: nem todas têm 47 — o Turner tem <strong>45</strong> (monossomia). <em>Por que cair na C</em>: esquece-se da exceção do grupo.' },
          { t: 'Aneuploidia significa mutação em um único gene', correct: false, why: 'Confunde com doença monogênica: aneuploidia é alteração de <strong>número de cromossomos</strong>, não mutação de um gene só. <em>Por que cair na D</em>: troca-se nível cromossômico por nível gênico.' },
        ]
      },
    ])}
  `));
}

