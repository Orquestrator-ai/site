/* _pages.mjs — conteúdo autoral das 15 páginas da Aula 03 "Baixa estatura".
   Texto-aluno = canon do prompt-final (§6). Tópicos visíveis como <h3 class="topic-h">.
   Anti-metalinguagem: voz de professor direto ao aluno; o texto É o conteúdo.
   Heróis (P14 fluxograma, P15 curvas+Manu) e pisos (P1-P13) embutidos inline pelos
   helpers do _build.mjs (markup parseado, script self-contained roda sozinho).
   Quiz gold (3 camadas) renderizado FIEL ao prompt-final.
   Cada página tem chips/tópicos PRÓPRIOS (regra Bauer: didática única por página). */

export function buildPages({ med, svgPiso, hero, notaBanca, notaValor, quiz, tag, chips, page }) {
  const P = [];

  /* ===================== PÁGINA 1 — E3 Caso clínico ===================== */
  P.push(page('p1', 1, `
    ${tag('case', 'Caso-âncora · Manu')}
    ${chips(['5 anos', '99 cm < P3', 'eutrófica', 'pais baixos', 'IO compatível'])}

    <article class="opener opener--case" aria-label="Caso clínico de abertura">
      <span class="opener__case-header">Endócrino-pediatria · pré-escolar</span>
      <p class="opener__case-quote"><strong>Manu, 5 anos</strong>, encaminhada "porque estava baixinha". Peso <strong>15,5 kg</strong> (P15); estatura <strong>99 cm, abaixo do P3</strong>. Eutrófica, sem broto mamário. Mãe 1,50 m, pai 1,61 m. Idade óssea compatível com 5 anos.</p>
      <dl class="case-card__meta">
        <dt>Paciente</dt><dd>Manu, 5 anos · sempre saudável (mãe: Marina Maria)</dd>
        <dt>Antropometria atual</dt><dd>15,5 kg (P15) · 99 cm (abaixo do P3)</dd>
        <dt>Medida anterior</dt><dd>aos 4 anos e 6 meses: 14,5 kg · 95,5 cm</dd>
        <dt>Exame</dt><dd>eutrófica; sem broto mamário; pelugem pubiana fina/clara/esparsa (sem puberdade)</dd>
        <dt>Pistas</dt><dd>pais baixos (mãe 1,50 m, pai 1,61 m) · idade óssea compatível com 5 anos</dd>
      </dl>
    </article>

    <h1 class="page-title">Manu: a menina que veio "porque estava baixinha"</h1>

    <div class="prose">
      <h3 class="topic-h">A menina e os números</h3>
      <p><span class="term">Manu</span> é uma menina de 5 anos, encaminhada ao laboratório de endócrino-pediatria com uma queixa simples e direta: <strong>"estava baixinha"</strong>. Os números atuais: peso <strong>15,5 kg</strong> (percentil 15) e estatura <span class="hl-bad">99 cm, abaixo do percentil 3</span>. Há também a medida anterior — aos 4 anos e meio ela tinha <strong>14,5 kg e 95,5 cm</strong>. Guarde essas duas estaturas (95,5 cm e 99 cm) e as duas idades (4,5 e 5 anos): elas vão fechar a etiologia mais à frente, quando calcularmos o quanto ela cresceu por ano. A mãe, <strong>Marina Maria</strong>, conta que Manu sempre foi uma criança <strong>saudável</strong>, sem nenhuma alteração que chamasse atenção.</p>

      <h3 class="topic-h">O exame que não acende alarme</h3>
      <p>Ao exame físico, Manu é <span class="hl-good">eutrófica</span> — peso adequado para o tamanho dela, sem magreza nem obesidade. Não há <span class="term">broto mamário</span>; a pelugem pubiana é fina, clara e esparsa — ou seja, <span class="term">sem sinais de início de puberdade</span>, o que é esperado para a idade. Em resumo: uma menina de 5 anos clinicamente bem, sem estigmas, sem desnutrição, sem nada de "doente" no exame. O único dado que destoa é a estatura. Isso já adianta um caminho — quando o exame é limpo e a história é de criança saudável, a baixa estatura tende a não ser a ponta de uma doença sistêmica óbvia.</p>

      <h3 class="topic-h">Os pais, também baixos</h3>
      <p>Um dado de ouro da anamnese: a estatura dos pais. A mãe (Marina Maria) tem <span class="term">1,50 m</span>; o pai, <span class="term">1,61 m</span>. <strong>Ambos baixos.</strong> Esse detalhe não é decorativo — é a matéria-prima do <strong>alvo genético</strong>, a estatura que os pais "programaram" para a filha. Some-se a isso a <span class="term">idade óssea da Manu, compatível com 5 anos</span> (igual à idade cronológica). São duas pistas que, mais à frente, vão apontar exatamente para um diagnóstico — mas ainda é cedo para nomeá-lo.</p>
    </div>

    ${svgPiso(1, { caption: 'a ficha da Manu — clique em cada dado (estatura 99 cm, peso/percentil, eutrofia, ausência de puberdade, estatura dos pais, idade óssea) e leia o que ele significa e qual ferramenta de avaliação vai usar mais tarde.', hint: 'Clique, toque ou Tab + Enter; cada dado revela seu papel no raciocínio.' })}

    <div class="prose">
      <h3 class="topic-h">Por onde o raciocínio começa</h3>
      <p>De todos os dados, <span class="hl-bad">o que mais chama atenção é a estatura abaixo do P3</span>. É por ali que o raciocínio começa: primeiro confirmar e nomear o problema (o diagnóstico sindrômico), depois caçar a etiologia específica. Guarde Manu inteira — os 99 cm abaixo do P3, a eutrofia, a ausência de puberdade, os pais baixos, a idade óssea compatível. Cada um desses achados vai ganhar peso quando aplicarmos as ferramentas de avaliação. No fim, voltamos para responder as duas perguntas que o caso dela cobra: <strong>qual o diagnóstico sindrômico</strong> e <strong>qual a etiologia</strong>.</p>
    </div>

    ${med({
      file: 'p1-afericao-estatura.jpg',
      alt: 'Profissional de saúde aferindo a estatura de uma criança em pé contra uma régua vertical durante triagem de saúde.',
      achado: 'Medir antes de concluir — a baixa estatura se confirma na régua e na curva, não no relato. É o gesto que abre o caso da Manu.',
      fonte: 'MC3 Samantha J. Webb, U.S. Navy / U.S. Department of Defense',
      licenca: 'Domínio público',
      tarja: 'p1'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>A baixa estatura é uma das queixas mais comuns do ambulatório pediátrico, e o erro frequente é pular para exames (dosar GH, pedir cariótipo) antes de organizar o raciocínio pela estatura, pela velocidade de crescimento e pelo alvo genético. Manu ensina a sequência certa.</p>
    </aside>

    ${quiz('p1', 'Ancoragem do raciocínio: o dado que dispara a investigação.', [
      {
        stem: 'Diante de Manu — 5 anos, 99 cm (abaixo do P3), eutrófica, sem puberdade, pais baixos e idade óssea compatível com a idade —, qual dado deve ancorar o início do raciocínio diagnóstico?',
        alts: [
          { t: 'A eutrofia ao exame físico', correct: false, why: 'Descreve normalidade, não o problema: a eutrofia é tranquilizadora (afasta desnutrição como causa óbvia), mas não é o achado que motiva a investigação — é justamente o que torna a baixa estatura "isolada". Cai-se ao confundir "dado que organiza a conduta" com "dado mais reconfortante".' },
          { t: 'A estatura abaixo do percentil 3', correct: true, why: 'Certa. A baixa estatura é um diagnóstico que parte da estatura: o achado que define o problema e dispara toda a investigação é estar abaixo do P3. Os demais dados entram depois, para classificar o tipo — mas o ponto de partida é a estatura.' },
          { t: 'A ausência de broto mamário', correct: false, why: 'É achado esperado para a idade: aos 5 anos a ausência de puberdade é o normal — não acende alarme nem ancora raciocínio. Cai-se ao superdimensionar um achado fisiológico da idade como se fosse pista.' },
          { t: 'A idade óssea compatível com 5 anos', correct: false, why: 'É uma ferramenta, não o ponto de partida: a idade óssea entra para diferenciar variantes mais adiante; sozinha, no início, não define que há um problema a investigar. Cai-se ao antecipar uma ferramenta de etapa avançada para o lugar do gatilho inicial.' },
        ]
      },
      {
        stem: 'Por que a estatura dos pais (mãe 1,50 m; pai 1,61 m) é um dado relevante na avaliação da Manu?',
        alts: [
          { t: 'Porque define isoladamente o diagnóstico de baixa estatura familiar', correct: false, why: 'Crava o diagnóstico cedo demais: pais baixos sugerem familiar, mas o diagnóstico exige também velocidade normal e idade óssea compatível — uma peça só não fecha. Cai-se ao saltar da pista para a conclusão sem as outras ferramentas.' },
          { t: 'Porque é a matéria-prima para calcular o alvo genético — até onde os pais "programaram" a filha crescer', correct: true, why: 'Certa. A estatura dos pais alimenta o alvo genético (a média corrigida das alturas), que estima até onde a criança pode chegar. Pais baixos → alvo baixo → uma das peças (não a única) que apontará a baixa estatura familiar.' },
          { t: 'Porque indica que a Manu tem uma doença genética', correct: false, why: 'Inverte o sentido do dado: pais baixos apontam para a variante fisiológica (familiar), não para doença genética — esta se suspeita por fenótipo alterado, não por pais baixos. Cai-se ao associar "genético" (herança normal de baixa estatura) a "doença genética".' },
          { t: 'Porque substitui a necessidade de medir a velocidade de crescimento', correct: false, why: 'Descarta uma ferramenta essencial: o alvo genético e a velocidade de crescimento são ferramentas distintas e complementares — uma não substitui a outra. Cai-se ao tratar as quatro ferramentas como intercambiáveis.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 2 — E1 Pergunta central ===================== */
  P.push(page('p2', 2, `
    ${tag('sys', 'Definição · equivalência estatística')}
    ${chips(['estatura < P3', 'P3 = Z-2', 'sindrômico', 'falta a etiologia'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Por que dizer "abaixo do percentil 3" e "abaixo do escore-Z menos 2" é dizer exatamente a mesma coisa — e por que isso importa?</p>
    </section>

    <h1 class="page-title">Baixa estatura é abaixo do P3 — e o P3 é o Z-2</h1>

    <div class="prose">
      <h3 class="topic-h">A linha que define: P3</h3>
      <p>Baixa estatura tem uma definição objetiva, e ela mora na curva de crescimento: <span class="hl-bad">estatura abaixo do percentil 3 (P3)</span>. Não é "achar que a criança é baixinha" — é plotar a estatura na curva apropriada para sexo e idade e verificar se o ponto cai abaixo da linha do P3. Acima dela, mesmo que a criança esteja entre as menores, ainda está dentro da faixa de normalidade estatística. Abaixo dela, há baixa estatura por definição. A Manu, com 99 cm aos 5 anos, está <strong>abaixo do P3</strong> — e por isso entra nesta categoria.</p>

      <h3 class="topic-h">P3 é o mesmo que Z-2</h3>
      <p>Aqui está a ponte que vale ouro e que a banca adora: na tabela de equivalências entre <span class="term">percentil</span> e <span class="term">escore-Z</span>, o <span class="hl-bad">percentil 3 corresponde ao escore-Z −2</span>. São duas linguagens para o mesmo ponto da curva. Portanto, estar abaixo do P3 é estar abaixo do Z-2 — e as duas frases são intercambiáveis. Manu está abaixo do P3, logo está abaixo do Z-2: <span class="hl-bad">baixa estatura</span>. Esse é o <strong>diagnóstico sindrômico</strong>. (É a mesma lógica de leitura de curva que define os pontos de corte da desnutrição — só que ali a linha de interesse é outra, mais baixa.)</p>

      <h3 class="topic-h">Sindrômico não basta: falta o tipo</h3>
      <p>Dizer apenas "baixa estatura" ainda é <span class="hl-warn">pouco</span>. É como dizer "febre" sem dizer a causa: descreve o problema, não o resolve. É preciso saber o <span class="term">tipo</span> de baixa estatura — estudar as características do paciente, calcular as ferramentas e buscar a <strong>etiologia específica</strong>. A baixa estatura pode ser uma variante completamente normal (a criança é baixa porque tem que ser) ou a ponta de uma doença. O diagnóstico sindrômico abre a porta; o diagnóstico etiológico é o que muda a conduta. É para esse segundo passo que todo o raciocínio caminha.</p>
    </div>

    ${svgPiso(2, { caption: 'tradutor percentil ↔ Z — arraste o marcador na curva esquemática: no P3 mostra "= Z-2 = baixa estatura"; em P50/Z0 e P97/Z+2, as equivalências correspondentes. P3 e Z-2 são o mesmo ponto.', hint: 'Arraste, ou Tab + setas; a equivalência é anunciada por leitor de tela.' })}

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Não são dois critérios</h4><p>Percentil 3 e escore-Z −2 <strong>não são cortes diferentes</strong>.</p></div>
        <div class="dont-confuse__side"><h4>É o mesmo ponto</h4><p>São o <strong>mesmo ponto da curva</strong> em duas escalas. Quem trata como distintos cria uma confusão que não existe.</p></div>
      </div>
    </div>

    ${med({
      file: 'p2-curva-meninas-zscore.png',
      alt: 'Gráfico oficial da OMS de estatura-para-idade para meninas de 5 a 19 anos, com curvas de escore-Z: mediana (0), +1, -1, -2 (vermelha) e -3, indicando os limites de normalidade do crescimento.',
      achado: 'A linha do Z-2 (vermelha) é o piso da normalidade — abaixo dela, baixa estatura. O P3 é o mesmo ponto que o Z-2 nesta curva oficial.',
      fonte: 'WHO Growth Reference 5–19 years (z-scores), 2007 · World Health Organization',
      licenca: 'OMS — uso educacional com atribuição'
    })}

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>A equivalência <strong>P3 = Z-2</strong> é número de ouro. Se a questão der "abaixo de Z-2", está dizendo "abaixo do P3", e vice-versa — define baixa estatura nas duas formas.</p>
    </aside>

    ${quiz('p2', 'Definição e equivalência estatística.', [
      {
        stem: 'Uma menina tem estatura plotada exatamente no escore-Z −2 para a idade. Em termos de percentil, isso corresponde a qual ponto, e qual o diagnóstico?',
        alts: [
          { t: 'Percentil 50; estatura normal', correct: false, why: 'Troca pelo centro da curva: o P50/Z0 é a mediana, o ponto médio — o oposto da borda inferior. Cai-se ao confundir "o percentil mais citado" (50) com o ponto de corte do problema.' },
          { t: 'Percentil 3; limite que define baixa estatura', correct: true, why: 'Certa. O escore-Z −2 é, por convenção estatística das curvas OMS, o mesmo ponto que o percentil 3 — a linha que define baixa estatura. As duas escalas descrevem a mesma posição na curva.' },
          { t: 'Percentil 97; estatura elevada', correct: false, why: 'Inverte a cauda: P97/Z+2 é a borda superior (estatura elevada), simétrica ao Z-2 do outro lado. Cai-se ao trocar o sinal do escore-Z e ir parar na cauda oposta.' },
          { t: 'Percentil 15; ainda dentro da normalidade', correct: false, why: 'Escolhe um percentil baixo, mas normal: o P15 é baixo, porém ainda dentro da faixa de normalidade — não é a linha de corte. Cai-se ao associar "percentil baixinho" a "baixa estatura" sem fixar que a linha é o P3.' },
        ]
      },
      {
        stem: 'Por que afirmar apenas "a criança tem baixa estatura" é considerado um diagnóstico incompleto?',
        alts: [
          { t: 'Porque baixa estatura não é um diagnóstico válido', correct: false, why: 'Nega um diagnóstico real: baixa estatura é, sim, um diagnóstico (sindrômico) legítimo — só não é o ponto final. Cai-se ao confundir "incompleto" com "inválido".' },
          { t: 'Porque é o diagnóstico sindrômico — descreve o problema, mas falta a etiologia (variante fisiológica ou causa patológica)', correct: true, why: 'Certa. "Baixa estatura" nomeia que a estatura está abaixo do P3, mas não diz por quê. O passo seguinte — distinguir variante fisiológica de causa patológica e achar a etiologia — é o que de fato orienta a conduta.' },
          { t: 'Porque o termo correto seria "nanismo"', correct: false, why: 'Troca por um termo mais restrito e errado: "nanismo" não é sinônimo de baixa estatura nem é a etiologia; é terminologia imprecisa. Cai-se ao buscar um rótulo mais "técnico" em vez da etiologia.' },
          { t: 'Porque sem dosar o GH nenhum diagnóstico pode ser feito', correct: false, why: 'Absolutiza um exame: dosar GH é etapa específica de uma minoria de casos (e nem é a principal causa endócrina) — não é pré-requisito de todo diagnóstico. Cai-se justamente na pegadinha do GH, desmontada adiante.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 3 — E7 Comparação chocante ===================== */
  P.push(page('p3', 3, `
    ${tag('sys', 'A grande bifurcação · natureza')}
    ${chips(['fisiológico × patológico', 'variantes normais', 'familiar', 'constitucional'])}

    <section class="opener opener--vs" aria-label="Comparação de abertura">
      <div class="opener__vs-grid">
        <div class="opener__vs-side">
          <h3>Fisiológico</h3>
          <p>A criança é baixa <strong>porque tem que ser</strong> — ou só por enquanto. Não há doença: há fisiologia.</p>
        </div>
        <div class="opener__vs-divider" aria-hidden="true">vs</div>
        <div class="opener__vs-side">
          <h3>Patológico</h3>
          <p>A criança é baixa porque está <strong>doente</strong> — desnutrição, endócrina ou genética.</p>
        </div>
      </div>
      <p class="opener__vs-asterisk">Mesmo achado — uma criança baixa no consultório —, naturezas opostas. A bifurcação que organiza tudo.</p>
    </section>

    <h1 class="page-title">Nem toda criança baixa está doente</h1>

    <div class="prose">
      <h3 class="topic-h">Muitas causas, dois grandes caminhos</h3>
      <p>A baixa estatura tem <strong>muitas causas e muitos tipos</strong> — várias doenças podem levar a ela. Mas, antes de listar doenças, é preciso traçar a divisão mestra do tema, a que organiza todo o raciocínio: as causas se dividem em <span class="hl-good">fisiológicas (normais)</span> e <span class="hl-bad">patológicas (mórbidas, doenças de fato)</span>. Toda a investigação que vem a seguir existe para responder, primeiro, em qual desses dois caminhos a criança está. Errar essa bifurcação é tratar uma criança normal como doente — ou deixar passar uma doença achando que é normal.</p>

      <h3 class="topic-h">Variantes fisiológicas: baixa porque tem que ser</h3>
      <p>Aqui está o conceito-chave de abertura, e a primeira grande pegadinha: <span class="hl-good">nem toda etiologia de baixa estatura é doença</span>. Existem causas <strong>completamente normais</strong>. Elas se chamam <span class="term">variantes fisiológicas (ou normais) do crescimento</span>. A lógica é direta: a criança está baixa <strong>porque tem que estar baixa</strong> — foi programada para isso — ou porque está baixa <strong>temporariamente</strong>, e ainda vai recuperar. Em nenhum dos dois casos há doença; há fisiologia. Reconhecer isso evita uma cascata de exames desnecessários e de ansiedade familiar injustificada.</p>

      <h3 class="topic-h">As duas normais (familiar × constitucional)</h3>
      <p>São <span class="hl-good">duas</span> as variantes fisiológicas — duas condições normais, não doenças:</p>
      <ul>
        <li><span class="term">Baixa estatura familiar</span>: a criança é baixa porque foi <strong>programada geneticamente</strong> para ser baixa (será uma adulta baixa). É o "baixa porque tem que ser".</li>
        <li><span class="term">Atraso constitucional do crescimento e da puberdade</span>: a criança está baixa <strong>temporariamente</strong>, por uma maturação mais lenta — vai "acordar" e atingir estatura normal na vida adulta. É o "baixa por enquanto".</li>
      </ul>
      <p>As duas produzem uma criança baixa no consultório, mas têm desfechos opostos: uma será baixa para sempre (e isso é normal para ela), a outra não. Diferenciá-las é uma das tarefas centrais da investigação — e cada uma terá sua assinatura nas ferramentas de avaliação.</p>
    </div>

    ${svgPiso(3, { caption: 'a grande bifurcação — duas portas: FISIOLÓGICO (verde) × PATOLÓGICO (vermelho). Clique em cada porta e veja o que há atrás (fisiológico → familiar + constitucional; patológico → desnutrição + endócrina + genética).', hint: 'Clique, toque ou Enter por porta; o conteúdo expande com aria-live.' })}

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Fisiológica ≠ leve</h4><p>Variante fisiológica <strong>não significa "leve"</strong> nem "sem importância".</p></div>
        <div class="dont-confuse__side"><h4>Fisiológica = não-doença</h4><p>Significa <strong>não-doença</strong>: a criança não precisa de tratamento da estatura — precisa de diagnóstico correto e de não ser submetida a investigação desnecessária.</p></div>
      </div>
    </div>

    ${med({
      file: 'p3-criancas-variacao-normal.jpg',
      alt: 'Grupo de quatro crianças saudáveis de idades próximas em pé juntas, com estaturas naturalmente diferentes, ilustrando a variação normal do crescimento.',
      achado: 'Baixa nem sempre é doente — crianças saudáveis de idade próxima têm alturas naturalmente diferentes. Variantes fisiológicas produzem crianças baixas saudáveis.',
      fonte: 'Helgi Halldórsson (Freddi), via Wikimedia Commons',
      licenca: 'CC BY-SA 2.0',
      tarja: 'p3'
    })}

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>A existência de <strong>causas normais</strong> de baixa estatura é a pegadinha conceitual de abertura. A banca planta uma criança baixa saudável e testa se o aluno corre para "doença" ou reconhece a variante fisiológica.</p>
    </aside>

    ${quiz('p3', 'Classificação por natureza: desfazer a falsa premissa.', [
      {
        stem: 'Sobre as causas de baixa estatura, qual afirmação está correta?',
        alts: [
          { t: 'Toda baixa estatura é manifestação de uma doença subjacente', correct: false, why: 'É a falsa premissa que a página desmonta: a maioria das crianças baixas tem variante fisiológica, não doença. Cai-se aqui pelo instinto de que "baixo demais = doente", que ignora a fisiologia da variação normal.' },
          { t: 'Existem causas completamente normais (variantes fisiológicas), além das causas patológicas', correct: true, why: 'Certa. A divisão mestra do tema é fisiológico × patológico: há causas normais (variantes fisiológicas — familiar e constitucional) e causas patológicas (doenças). Reconhecer que a baixa estatura pode ser normal é o conceito de abertura.' },
          { t: 'As variantes fisiológicas são formas leves de doença', correct: false, why: 'Confunde não-doença com doença leve: variante fisiológica é ausência de doença, não uma doença atenuada — a criança não tem patologia alguma. Cai-se ao ler "fisiológico" como "patológico de menor grau".' },
          { t: 'Só se considera baixa estatura quando há causa patológica', correct: false, why: 'Inverte a definição: a baixa estatura é definida pela estatura < P3, independentemente da causa — vale tanto para a normal quanto para a patológica. Cai-se ao amarrar erroneamente o sindrômico à existência de doença.' },
        ]
      },
      {
        stem: 'As duas variantes fisiológicas (normais) de baixa estatura são:',
        alts: [
          { t: 'Desnutrição e hipotireoidismo', correct: false, why: 'Lista causas patológicas (nutricional e endócrina): desnutrição e hipotireoidismo são doenças (patológicas), não variantes normais. Cai-se ao misturar a lista das patológicas com a das fisiológicas.' },
          { t: 'Baixa estatura familiar e atraso constitucional do crescimento e da puberdade', correct: true, why: 'Certa. As duas variantes fisiológicas são a baixa estatura familiar (programada, será adulta baixa) e o atraso constitucional (maturação lenta, será adulto normal). Nenhuma é doença.' },
          { t: 'Acondroplasia e síndrome de Turner', correct: false, why: 'Lista causas genéticas patológicas: acondroplasia e Turner são doenças genéticas — patológicas por definição. Cai-se ao confundir "causa genética" (que pode ser doença) com "variante fisiológica familiar" (herança normal de baixa estatura).' },
          { t: 'Deficiência de GH e hipercortisolismo', correct: false, why: 'Lista causas endócrinas patológicas: deficiência de GH e hipercortisolismo são doenças, não variantes normais. Cai-se ao misturar a lista das patológicas endócrinas com a das fisiológicas.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 4 — E2 Dado impactante ===================== */
  P.push(page('p4', 4, `
    ${tag('fisio', 'Variante normal · herança genética')}
    ${chips(['programada', 'sempre < Z-2', 'alvo baixo', 'janela dos 2 anos'])}

    <figure class="opener opener--stat" aria-label="Dado de abertura">
      <div class="opener__number">2</div>
      <div class="opener__context">anos é a virada: <strong>depois dos 2 anos quem mais manda na estatura são os genes</strong>; antes, manda o ambiente. Por isso a criança com baixa estatura familiar pode ser <strong>a maior da creche</strong> — e só depois descer para o seu canal baixo.</div>
    </figure>

    <h1 class="page-title">Baixa estatura familiar: programada para ser baixa</h1>

    <div class="prose">
      <h3 class="topic-h">Os genes mandam (depois dos 2 anos)</h3>
      <p>A baixa estatura familiar tem uma lógica simples: a criança é baixa porque foi <span class="hl-good">programada geneticamente pela família</span> para ser baixa. E há um dado fisiológico que sustenta isso: <span class="term">depois dos 2 anos de idade, o fator que mais influencia a estatura são os genes</span> (herdados do pai e da mãe). Se os pais são geneticamente baixos e "programaram" a criança para ser baixa, ela <strong>não consegue</strong> ser uma adulta alta — será uma <span class="hl-good">adulta baixa</span>. Não é doença: é a expressão de um patrimônio genético baixo. Criança baixa, pais baixos, e ela será uma adulta baixa porque foi programada para isso.</p>

      <h3 class="topic-h">A curva clássica: sempre abaixo do Z-2</h3>
      <p>No gráfico, a baixa estatura familiar tem uma assinatura inconfundível. Os eixos de referência da curva são <span class="term">escore-Z +2, escore-Z 0 e escore-Z −2</span>. Na familiar, o <span class="hl-bad">alvo genético está abaixo da linha do Z-2</span> — ou seja, dentro da faixa de baixa estatura. A criança <strong>cresceu a vida toda abaixo do Z-2</strong> e atingiu esse alvo, seguindo seu desenvolvimento habitual. O traçado é uma linha que acompanha a própria faixa baixa, paralela às curvas normais, sem quedas nem desvios bruscos: ela cresce de forma constante, só que num canal baixo. É essa regularidade — sempre abaixo do Z-2, rumo a um alvo baixo — que caracteriza a variante.</p>

      <h3 class="topic-h">A pegadinha dos 2 anos: pode ser a maior da creche</h3>
      <p>Aqui mora um detalhe que a banca explora. <span class="hl-warn">Antes dos 2 anos, a criança com baixa estatura familiar pode estar dentro da faixa normal</span> da curva — pode até ser <strong>a maior da creche</strong>. Por quê? Porque <strong>antes dos 2 anos quem mais influencia a estatura é o fator <span class="term">ambiental</span></strong> (alimentação, exposição a risco ambiental), <strong>não os genes</strong>. Só depois dessa idade o canal genético "assume o comando" e a criança desce para o seu canal baixo. Por isso o resumo da familiar precisa do recorte temporal: <strong>depois dos 2 anos</strong>, criança que fica abaixo do Z-2 e cresce sempre abaixo do Z-2 até atingir seu alvo genético (que também é baixo). Antes dos 2, o dado da curva pode enganar.</p>
    </div>

    ${svgPiso(4, { caption: 'canalização aos 2 anos — arraste a idade de 0 a 6 anos: antes dos 2 anos a criança aparece na faixa normal (ambiente domina); ao cruzar os 2, o traçado desce e se fixa no canal abaixo do Z-2 (genes assumem).', hint: 'Arraste, ou Tab + setas; a virada dos 2 anos é anunciada por leitor de tela.' })}

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text">Familiar = <strong>"baixa porque tem que ser"</strong> → pais baixos + alvo abaixo do Z-2 + cresce sempre abaixo do Z-2.</p>
    </aside>

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Não parou de crescer</h4><p>Baixa estatura familiar <strong>não é "a criança parou de crescer"</strong>: a velocidade é normal.</p></div>
        <div class="dont-confuse__side"><h4>Cresce em canal baixo</h4><p>Ela <strong>cresce normalmente</strong> — só num canal baixo, rumo a um alvo baixo. O que é baixo é o destino, não o ritmo.</p></div>
      </div>
    </div>

    ${med({
      file: 'p10-curva-velocidade-canal-baixo.jpg',
      alt: 'Curva de estatura de menina com medições seriadas plotadas em um canal baixo do gráfico, com marcação de idade óssea e inset de velocidade de crescimento.',
      achado: 'Medidas seriadas reais num canal baixo, regular e paralelo às linhas — o padrão de quem cresce no piso da curva sem despencar (correlata do traçado da baixa estatura familiar).',
      fonte: 'Diseases 2026 (MDPI), Figura 4 · via PMC',
      licenca: 'CC BY 4.0'
    })}

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text">Lactente (< 2 anos) na faixa normal da curva <strong>não exclui</strong> baixa estatura familiar — antes dos 2 anos o ambiente domina, e o canal genético baixo só se expressa depois.</p>
      </div>
    </aside>

    ${quiz('p4', 'O padrão de curva e a janela dos 2 anos.', [
      {
        stem: 'Na baixa estatura familiar, qual é o comportamento esperado da curva de crescimento da criança?',
        alts: [
          { t: 'Queda progressiva e acelerada, cruzando canais para baixo', correct: false, why: 'Descreve um padrão patológico: queda acelerada cruzando canais para baixo é sinal de causa patológica (velocidade alterada), não da familiar, em que a velocidade é normal. Cai-se ao associar "baixa estatura" a "está caindo na curva".' },
          { t: 'Crescimento regular dentro de um canal abaixo do Z-2, rumo a um alvo genético baixo', correct: true, why: 'Certa. A familiar tem traçado regular e estável, só que num canal baixo: cresce paralela às curvas normais, sempre abaixo do Z-2, até o alvo genético baixo. O ritmo é normal; o destino é que é baixo.' },
          { t: 'Crescimento normal até a puberdade, com queda abrupta depois', correct: false, why: 'Inventa uma queda puberal: não há queda abrupta na puberdade na familiar — o canal baixo é mantido do começo ao fim. Cai-se ao importar a ideia de "evento na puberdade" e invertê-la.' },
          { t: 'Oscilação entre faixas, sem padrão definido', correct: false, why: 'Descreve ausência de canalização: a familiar é justamente canalizada (estável num canal); oscilação errática não é o padrão. Cai-se ao confundir variabilidade de medição com o padrão da variante.' },
        ]
      },
      {
        stem: 'Por que uma criança com baixa estatura familiar pode estar na faixa normal da curva (ou até ser "a maior da creche") antes dos 2 anos?',
        alts: [
          { t: 'Porque antes dos 2 anos a estatura é determinada principalmente pelo fator ambiental, e só depois os genes assumem o comando', correct: true, why: 'Certa. Antes dos 2 anos, quem mais influencia a estatura é o ambiente (alimentação, condições); o canal genético baixo só passa a dominar depois dos 2 anos. Por isso a criança pode estar normal — ou acima — no início e só então descer.' },
          { t: 'Porque a baixa estatura familiar só se inicia após os 5 anos', correct: false, why: 'Crava uma idade de início errada: a familiar não "começa aos 5 anos" — a programação genética é desde sempre; o que muda aos 2 anos é qual fator domina a expressão. Cai-se ao confundir a idade de investigação com a idade em que o canal genético assume.' },
          { t: 'Porque antes dos 2 anos a curva de crescimento não é confiável', correct: false, why: 'Desqualifica a curva: ela é confiável antes dos 2 anos — reflete corretamente que o ambiente domina nessa fase; não é erro de medição. Cai-se ao trocar "o fator que domina é outro" por "a medida está errada".' },
          { t: 'Porque toda criança é alta antes dos 2 anos', correct: false, why: 'Generaliza um falso fato: nem toda criança é alta antes dos 2 anos — a afirmação específica é que a familiar pode estar na faixa normal nessa janela, pelo predomínio ambiental. Cai-se ao superdimensionar a pegadinha para uma regra universal falsa.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 5 — E1 Pergunta central ===================== */
  P.push(page('p5', 5, `
    ${tag('fisio', 'Variante normal · maturação lenta')}
    ${chips(['vai "acordar"', 'atrasa crescimento E puberdade', 'alvo normal', 'curva que sobe'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Como uma criança pode estar baixa hoje e, ao mesmo tempo, estar destinada a ser um adulto de estatura normal?</p>
    </section>

    <h1 class="page-title">Atraso constitucional: a criança que vai "acordar"</h1>

    <div class="prose">
      <h3 class="topic-h">Não foi programada — só está lenta</h3>
      <p>O atraso constitucional do crescimento e da puberdade <span class="hl-warn">NÃO tem relação com a baixa estatura familiar</span> — são coisas completamente diferentes, e confundi-las é erro clássico. Aqui a criança <span class="hl-good">NÃO foi programada para ser baixa</span>: ela tem apenas um <span class="term">atraso / lentificação / maturação mais lenta</span> do desenvolvimento (ósseo e orgânico). É uma criança baixa <strong>no momento</strong>, mas que <strong>NÃO se tornará um adulto baixo</strong>: ela vai "acordar" na sua maturação, entrar num canal de crescimento normal e ser um adulto de <strong>estatura normal</strong>. A diferença com a familiar é de destino: a familiar chega baixa porque o alvo é baixo; o atraso constitucional só chega mais tarde a um alvo normal.</p>

      <h3 class="topic-h">Atrasa o crescimento E a puberdade</h3>
      <p>A lentificação não é só do crescimento — é da <span class="term">fisiologia inteira</span>. Por isso ela não acomete apenas a estatura; <strong>acomete também a puberdade</strong>. A criança tem, junto, <span class="hl-warn">atraso puberal</span>. E o próprio nome carrega a chave do diagnóstico: <span class="term">"atraso constitucional do crescimento E da puberdade"</span> — atrasa os <strong>dois</strong>. Esse "E" é um lembrete embutido: se há atraso de crescimento sem nenhum sinal de atraso de maturação (puberdade, idade óssea), a hipótese perde força. A maturação lenta é o fio que une todos os achados da variante.</p>

      <h3 class="topic-h">A curva que sobe: alvo normal, só mais tarde</h3>
      <p>No gráfico, o atraso constitucional tem o padrão oposto ao da familiar. A criança <strong>passou boa parte da infância abaixo do Z-2</strong> (era baixa), mas em certo ponto <span class="hl-good">amadureceu, entrou num canal de crescimento melhor e subiu</span> para uma faixa acima do Z-2, atingindo seu <strong>alvo genético — que é NORMAL</strong> (os pais geralmente têm altura normal). A criança chega ao alvo, só que <strong>um pouco mais tarde</strong>, com mais tempo que as demais da idade dela. Resumindo o contraste das duas variantes normais: na <span class="hl-good">familiar</span> o alvo é baixo (abaixo do Z-2) e a criança será baixa inevitavelmente, sempre abaixo do Z-2; no <span class="hl-good">atraso constitucional</span> o alvo é normal, a criança NÃO será adulto baixo — apenas levou mais tempo para chegar lá.</p>
    </div>

    ${svgPiso(5, { caption: 'familiar × constitucional — alterne as duas curvas: uma estável abaixo do Z-2 (familiar, alvo baixo), a outra começa baixa e sobe cruzando o Z-2 (constitucional, alvo normal). Cada uma exibe alvo, idade óssea e status puberal.', hint: 'Clique, toque ou Enter para alternar; cada curva é descrita por leitor de tela.' })}

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text">Constitucional = <strong>"baixa por enquanto, vai acordar"</strong> → atrasa crescimento E puberdade + alvo normal + curva sobe.</p>
    </aside>

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Familiar: alvo baixo</h4><p>Será baixa (curva estável e baixa). Idade óssea compatível, sem atraso puberal.</p></div>
        <div class="dont-confuse__side"><h4>Constitucional: alvo normal</h4><p>Será normal (curva que sobe depois de amadurecer). O atraso puberal acompanha o constitucional, não a familiar.</p></div>
      </div>
    </div>

    ${med({
      file: 'p2-curva-meninas-zscore.png',
      alt: 'Gráfico oficial da OMS de estatura-para-idade para meninas de 5 a 19 anos, com as curvas de escore-Z (mediana, +1, -1, -2 e -3).',
      achado: 'A curva real da OMS, com os eixos Z+2 / Z0 / Z−2 — a régua sobre a qual se lê tanto o canal baixo e estável da familiar quanto a subida (catch-up) tardia do atraso constitucional rumo ao alvo normal.',
      fonte: 'WHO Growth Reference 5–19 years (z-scores), 2007 · World Health Organization',
      licenca: 'OMS — uso educacional com atribuição'
    })}

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>O atraso constitucional é a variante normal em que a <strong>idade óssea estará atrasada</strong> (a maturação lenta tem tradução radiológica) e a puberdade chega tarde — diferente da familiar, em que tudo é compatível com a idade. Esse contraste é o ponto cobrado.</p>
    </aside>

    ${quiz('p5', 'Lentificação da maturação e desfecho.', [
      {
        stem: 'Qual característica distingue o atraso constitucional do crescimento e da puberdade da baixa estatura familiar?',
        alts: [
          { t: 'No atraso constitucional o alvo genético é baixo; na familiar é normal', correct: false, why: 'Inverte exatamente os dois alvos: é o contrário — constitucional = alvo normal; familiar = alvo baixo. Cai-se ao trocar a atribuição dos alvos entre as duas variantes.' },
          { t: 'No atraso constitucional o alvo genético é normal e a criança será um adulto de estatura normal; na familiar o alvo é baixo e a criança será baixa', correct: true, why: 'Certa. A linha divisória é o destino: no constitucional o alvo é normal (a criança "acorda" e atinge estatura normal, só mais tarde); na familiar o alvo é baixo (será uma adulta baixa). Uma sobe na curva; a outra mantém o canal baixo.' },
          { t: 'Ambas levam invariavelmente a adulto baixo', correct: false, why: 'Iguala os desfechos: só a familiar leva a adulto baixo; o constitucional leva a adulto normal. Cai-se ao assumir que "baixa estatura na infância" implica "adulto baixo" nas duas.' },
          { t: 'O atraso constitucional não afeta a puberdade', correct: false, why: 'Nega a marca da variante: o atraso constitucional afeta crescimento E puberdade — o atraso puberal é parte definidora. Cai-se ao esquecer que a lentificação é da fisiologia inteira, não só da estatura.' },
        ]
      },
      {
        stem: 'No atraso constitucional, por que há atraso puberal além do atraso de crescimento?',
        alts: [
          { t: 'Porque a puberdade depende da estatura atingida', correct: false, why: 'Cria uma dependência inexistente: a puberdade não atrasa "porque a criança está baixa" — ambos atrasam por uma causa comum (a maturação lenta), não um por causa do outro. Cai-se ao encadear causalmente dois achados que têm a mesma raiz.' },
          { t: 'Porque a lentificação é da maturação fisiológica inteira, e a puberdade é parte dessa maturação', correct: true, why: 'Certa. O atraso constitucional é uma lentificação global da maturação — não acomete só o osso/estatura, mas a fisiologia inteira, incluindo a puberdade. Por isso crescimento e puberdade atrasam juntos, e o próprio nome carrega esse "E".' },
          { t: 'Porque há deficiência associada de hormônios sexuais', correct: false, why: 'Inventa uma deficiência hormonal: não há deficiência de hormônios sexuais — é apenas um cronograma mais lento de uma fisiologia normal. Cai-se ao patologizar uma variante que é, por definição, não-doença.' },
          { t: 'Porque a criança tem baixa estatura familiar concomitante', correct: false, why: 'Confunde as duas variantes: o atraso puberal é do constitucional, não da familiar; não há "familiar concomitante" explicando isso. Cai-se ao misturar as duas variantes que a página acabou de separar.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 6 — E8 Erro comum desmontado ===================== */
  P.push(page('p6', 6, `
    ${tag('pato', 'Causas patológicas · pegadinha do GH')}
    ${chips(['três grupos', 'desnutrição primeiro', 'GH NÃO é a principal', 'hipotireoidismo'])}

    <section class="opener opener--bust" aria-label="Erro comum desmontado">
      <p class="opener__bust-tag">Erro comum desmontado</p>
      <p class="opener__bust-wrong">"Criança baixa? É falta de hormônio do crescimento — vamos dosar o GH."</p>
      <p class="opener__bust-right">Está errado — e na ordem errada. A principal causa endócrina de baixa estatura é o <strong>hipotireoidismo</strong>, não o GH. E antes do endócrino, lembre-se da <strong>desnutrição</strong>.</p>
    </section>

    <h1 class="page-title">As causas patológicas e a pegadinha do GH</h1>

    <div class="prose">
      <h3 class="topic-h">Os três grupos patológicos</h3>
      <p>Além das variantes fisiológicas, existem as <span class="hl-bad">causas patológicas (mórbidas)</span> de baixa estatura — doenças de fato. São <strong>três grandes grupos</strong>, e vale fixá-los como blocos: <span class="term">desnutrição</span>, <span class="term">causas endócrinas</span> e <span class="term">causas genéticas</span>. Toda a investigação das causas patológicas vai transitar entre essas três caixas. A regra mental é: confirmada a baixa estatura patológica (a velocidade de crescimento dirá isso, mais à frente), o trabalho é decidir em qual das três caixas a criança se encaixa.</p>

      <h3 class="topic-h">Antes do endócrino, a desnutrição</h3>
      <p>A <span class="hl-bad">tentação imediata</span> ao ver baixa estatura é pensar em causa endócrina — e logo no GH. Mas é preciso <strong>cautela</strong> antes de pular para o endócrino: a primeira lembrança tem que ser a <strong>desnutrição</strong>. Um paciente desnutrido pode ter baixa estatura, sem dúvida. E vale para os dois tipos: <span class="term">desnutrição primária</span> (não ingeriu o nutriente) e <span class="term">desnutrição secundária</span> (tem doença que não deixa absorver, ou que faz gastar muita energia). É a mesma lógica de causa da desnutrição já conhecida — só que agora ela aparece como <strong>causa de baixa estatura</strong>. Antes de exames endócrinos sofisticados, a pergunta barata e essencial é: essa criança está se alimentando e aproveitando o que come?</p>

      <h3 class="topic-h">A pegadinha: o GH não é a principal endócrina</h3>
      <p>Aqui está a pegadinha clássica do tema, a que mais derruba aluno: <span class="hl-bad">o GH (hormônio do crescimento) NÃO é a principal causa endócrina de baixa estatura</span>. O reflexo de associar "baixa estatura" a "falta de hormônio do crescimento" é forte — e errado como primeira aposta. A <span class="hl-good">principal causa endócrina é o hipotireoidismo</span> (a tireoide). Por isso é <strong>fundamental solicitar <span class="term">TSH e T4 livre</span></strong> na investigação de baixa estatura: o hipotireoidismo, sendo a principal endócrina, é barato de rastrear e tratável. Quem pede dosagem de GH antes de dosar a tireoide está investigando na ordem errada.</p>

      <h3 class="topic-h">Hipotireoidismo, GH e hipercortisolismo</h3>
      <p>A hierarquia das causas endócrinas, em ordem de importância para o raciocínio:</p>
      <ul>
        <li><span class="hl-good">1º — Hipotireoidismo</span>: a principal. Rastreio com <strong>TSH e T4 livre</strong>.</li>
        <li><span class="term">2º — Deficiência de GH</span>: vem <strong>depois</strong> do hipotireoidismo, e tem investigações mais <strong>pormenorizadas / específicas</strong> (não é um exame simples de triagem).</li>
        <li><span class="term">3º — Hipercortisolismo</span>: excesso tão grande de cortisol que impacta a estatura. Suspeitar <strong>não é difícil</strong>: geralmente é a criança que <strong>usou muito corticoide</strong> e tem outros estigmas — <span class="hl-warn">estria violácea, obesidade, estigmas de Cushing</span>. O fenótipo entrega o diagnóstico.</li>
      </ul>
    </div>

    ${svgPiso(6, { caption: 'as três caixas patológicas — abra desnutrição / endócrina / genética. Na caixa endócrina, a hierarquia se revela (hipotireoidismo 1º → GH 2º → hipercortisolismo 3º), com a pegadinha do GH destacada em vermelho ("NÃO é a principal").', hint: 'Clique, toque ou Enter por caixa; sub-toggle endócrino com aria-live.' })}

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text">"Baixa estatura → deficiência de GH" é o atalho que a banca planta. A principal endócrina é o <strong>hipotireoidismo</strong>; o GH vem depois. Dosar <strong>TSH/T4 livre</strong> é o primeiro passo endócrino.</p>
      </div>
    </aside>

    ${med({
      file: 'p6-cushing-lactente.jpg',
      alt: 'Lactente com síndrome de Cushing mostrando face arredondada (em lua cheia), pletora e obesidade central — estigmas do hipercortisolismo.',
      achado: 'O fenótipo entrega — face em lua cheia, pletora e obesidade central apontam hipercortisolismo, a 3ª causa endócrina (clinicamente óbvia).',
      fonte: 'Fudge EB et al. (2009), Int J Pediatr Endocrinol · via Wikimedia Commons',
      licenca: 'CC BY 3.0',
      tarja: 'p6'
    })}

    ${med({
      file: 'p6b-hipotireoidismo-congenito.jpg',
      alt: 'Lactente de 3 meses com hipotireoidismo congênito não tratado, mostrando fácies mixedematosa e macroglossia.',
      achado: 'Hipotireoidismo — fácies mixedematosa e macroglossia no lactente não tratado: a principal causa endócrina de baixa estatura, rastreada com TSH e T4 livre.',
      fonte: 'Rastogi MV, LaFranchi SH (2010), Orphanet J Rare Dis · via Wikimedia Commons',
      licenca: 'CC BY 2.5',
      tarja: 'p6b'
    })}

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Desnutrição = doença</h4><p>A criança desnutrida está doente; precisa de tratamento da causa.</p></div>
        <div class="dont-confuse__side"><h4>Familiar = não-doença</h4><p>Não confundir a desnutrição (patológica nutricional) com a baixa estatura familiar de uma criança eutrófica saudável.</p></div>
      </div>
    </div>

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>(1) os três grupos patológicos (desnutrição, endócrina, genética); (2) a principal endócrina = <strong>hipotireoidismo</strong> (não GH); (3) <strong>TSH e T4 livre</strong> na investigação; (4) o fenótipo de Cushing entregando o hipercortisolismo.</p>
    </aside>

    ${quiz('p6', 'Classificação patológica e a ordem da investigação endócrina.', [
      {
        stem: 'Qual é a principal causa endócrina de baixa estatura, e qual o primeiro exame a solicitar na suspeita endócrina?',
        alts: [
          { t: 'Deficiência de GH; dosagem de GH basal', correct: false, why: 'Cai na isca do GH: a deficiência de GH é a 2ª causa endócrina, com investigação pormenorizada — não é a principal nem o primeiro exame. O reflexo "baixa estatura = hormônio do crescimento" é exatamente o que a banca explora.' },
          { t: 'Hipotireoidismo; TSH e T4 livre', correct: true, why: 'Certa. A principal endócrina não é o GH, é o hipotireoidismo. Por isso o primeiro passo endócrino é dosar TSH e T4 livre — barato, tratável e a causa mais frequente. O GH vem depois, com investigação específica.' },
          { t: 'Hipercortisolismo; cortisol salivar', correct: false, why: 'Escolhe a 3ª causa: o hipercortisolismo é a terceira endócrina e costuma ser clinicamente óbvio (estigmas de Cushing) — não é a principal nem o rastreio inicial. Cai-se ao confundir a causa de fenótipo chamativo com a mais frequente.' },
          { t: 'Deficiência de GH; teste de estímulo de GH', correct: false, why: 'Mesma isca do GH, agora com o exame específico: o teste de estímulo de GH é etapa avançada da 2ª causa, não o primeiro passo. Cai-se ao inverter a ordem racional (do caro antes do barato).' },
        ]
      },
      {
        stem: 'Antes de partir para investigação endócrina sofisticada em uma criança com baixa estatura, qual causa patológica deve ser lembrada primeiro?',
        alts: [
          { t: 'Acondroplasia', correct: false, why: 'É causa genética de fenótipo próprio: a acondroplasia se suspeita por desproporção de segmentos, não como "primeira lembrança" genérica antes do endócrino. Cai-se ao saltar para causas genéticas chamativas em vez da desnutrição.' },
          { t: 'Desnutrição (primária ou secundária)', correct: true, why: 'Certa. Antes do endócrino, a desnutrição é a lembrança obrigatória — primária (não ingeriu) ou secundária (não absorve / gasta demais). É a pergunta barata e essencial que precede qualquer exame endócrino caro.' },
          { t: 'Síndrome de Turner', correct: false, why: 'É causa genética com fenótipo próprio: o Turner se suspeita por achados morfológicos e sexo, não como primeira lembrança genérica. Cai-se ao priorizar uma síndrome específica sobre a desnutrição, mais prevalente e simples de checar.' },
          { t: 'Deficiência de GH', correct: false, why: 'É justamente o que se deve adiar: a deficiência de GH é investigação endócrina sofisticada — o oposto do "lembrar primeiro do simples". Cai-se ao inverter a ordem, indo ao caro antes do barato.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 7 — E4 Achado típico / pegadinha ===================== */
  P.push(page('p7', 7, `
    ${tag('pato', 'Genética I · displasia óssea')}
    ${chips(['ossos longos não crescem', 'desproporcional', 'segmentos SS/SI', 'relação não cai a 1'])}

    <aside class="opener opener--trap" aria-label="Achado de abertura">
      <svg class="opener__trap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="opener__trap-body">
        <p class="opener__trap-tag">Achado típico</p>
        <p class="opener__trap-text">A relação segmento superior/inferior normal <strong>cai para ≈ 1 na puberdade</strong>. Na acondroplasia ela <strong>não cai</strong> — fica persistentemente aumentada, porque o segmento inferior (as pernas) não cresce.</p>
      </div>
    </aside>

    <h1 class="page-title">Acondroplasia: baixa porque é desproporcional</h1>

    <div class="prose">
      <h3 class="topic-h">Ossos longos que não crescem</h3>
      <p>A terceira caixa patológica é a das <span class="hl-bad">causas genéticas</span> — alterações da formação genética que impactam a estatura. Existem milhares de doenças genéticas; para a prova, é preciso conhecer <strong>dois grupos</strong>. O primeiro são as <span class="term">displasias ósseas</span>: condição em que os ossos da criança — principalmente os <span class="term">ossos longos</span> (tíbia, fíbula, fêmur) — <strong>não crescem</strong>. O raciocínio é direto: ossos longos que não crescem geram <strong>membros curtos</strong> (pernas e braços curtos), e isso produz baixa estatura, porque os ossos não se desenvolvem <strong>longitudinalmente</strong>. Dentro das displasias ósseas, a mais importante para prova é a <span class="hl-bad">acondroplasia</span>.</p>

      <h3 class="topic-h">Os dois segmentos corporais</h3>
      <p>A marca da acondroplasia é uma <span class="hl-bad">baixa estatura desproporcional</span>: o paciente é baixo porque é <strong>desproporcional</strong>, não porque é uniformemente pequeno. Para entender a desproporção, é preciso definir os dois segmentos:</p>
      <ul>
        <li><span class="term">Segmento superior</span> = do <strong>púbis à cabeça</strong> (tronco + cabeça).</li>
        <li><span class="term">Segmento inferior</span> = do <strong>púbis aos pés</strong> (membros inferiores).</li>
      </ul>
      <p>Na acondroplasia, o <strong>segmento inferior (as pernas) é persistentemente muito menor</strong> que o superior. Numa imagem comparativa de duas crianças de mesma idade, a menor (com acondroplasia) tem o <strong>segmento inferior nitidamente encurtado</strong>, enquanto o segmento superior parece do mesmo tamanho nas duas. É a desproporção, não a redução global, que define o quadro.</p>

      <h3 class="topic-h">A relação SS/SI persistentemente aumentada</h3>
      <p>Aqui está o ponto de prova a fixar com ênfase. Como o segmento inferior é persistentemente menor que o superior, a <span class="hl-bad">relação segmento superior / segmento inferior (SS/SI) fica persistentemente aumentada</span>. Para entender por que isso é anormal, é preciso o contexto fisiológico: ao <strong>nascer</strong>, é normal a criança ter o segmento superior maior que o inferior (relação alta). Mas, ao se <span class="term">aproximar da puberdade</span>, os segmentos praticamente <strong>se igualam</strong> e a relação SS/SI vira <span class="hl-good">≈ 1</span> (iguais). No paciente com acondroplasia isso <strong>não acontece</strong>: ele entra na puberdade, vai crescendo, mas o <strong>segmento inferior permanece pequeno</strong> — por isso a relação SS/SI fica <strong>persistentemente aumentada</strong>, em vez de cair para ≈ 1 como deveria. Essa não-normalização da relação é a assinatura quantitativa da displasia.</p>
    </div>

    ${svgPiso(7, { caption: 'a relação SS/SI ao longo da vida — arraste a idade (nascimento → puberdade): na criança normal a relação parte alta e cai para ≈ 1; ative "acondroplasia" e a linha NÃO cai, com o segmento inferior visivelmente curto.', hint: 'Arraste a idade + alterne normal/acondroplasia; valores anunciados por leitor de tela.' })}

    ${med({
      file: 'p7-acondroplasia-corpo.jpg',
      alt: 'Paciente com acondroplasia em corpo inteiro, mostrando membros curtos com tronco de tamanho preservado — desproporção rizomélica.',
      achado: 'Baixa estatura desproporcional — membros curtos, segmento inferior encurtado, tronco preservado: a marca da acondroplasia (imagem de atlas clássico).',
      fonte: 'Gellis & Feingold, "Atlas of Mental Retardation Syndromes" (US Dept. of HEW, 1968)',
      licenca: 'Domínio público',
      tarja: 'p7'
    })}

    <aside class="finding">
      <p class="finding__label">Achado típico</p>
      <p>Relação SS/SI <strong>persistentemente aumentada</strong> (não cai para ≈ 1 na puberdade) = displasia óssea / acondroplasia. Comparar duas crianças de mesma idade evidencia o segmento inferior encurtado.</p>
    </aside>

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Desproporcional</h4><p>Acondroplasia: segmento inferior curto, relação SS/SI alta — a desproporção aponta a displasia óssea.</p></div>
        <div class="dont-confuse__side"><h4>Proporcional</h4><p>Variantes fisiológicas, endócrinas e desnutrição: redução uniforme, sem desproporção de segmentos.</p></div>
      </div>
    </div>

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>(1) acondroplasia = displasia óssea, a mais cobrada; (2) baixa estatura <strong>desproporcional</strong> por encurtamento dos ossos longos; (3) relação SS/SI normal cai para ≈ 1 na puberdade, mas na acondroplasia permanece <strong>aumentada</strong>.</p>
    </aside>

    ${quiz('p7', 'Achado morfológico e o mecanismo da desproporção.', [
      {
        stem: 'Na acondroplasia, o que acontece com a relação segmento superior/segmento inferior (SS/SI) ao longo do desenvolvimento?',
        alts: [
          { t: 'Cai para ≈ 1 na puberdade, como no desenvolvimento normal', correct: false, why: 'Descreve o normal: cair para ≈ 1 na puberdade é o comportamento fisiológico; é justamente o que NÃO ocorre na acondroplasia. Cai-se ao aplicar a regra da criança normal ao paciente com displasia.' },
          { t: 'Permanece persistentemente aumentada, porque o segmento inferior não cresce adequadamente', correct: true, why: 'Certa. No normal a relação parte alta e cai para ≈ 1 na puberdade. Na acondroplasia, como o segmento inferior (membros) permanece curto, a relação não normaliza e fica persistentemente aumentada — a assinatura quantitativa da displasia.' },
          { t: 'Torna-se persistentemente diminuída (< 1)', correct: false, why: 'Inverte a desproporção: relação < 1 significaria segmento superior menor — o oposto da acondroplasia, em que o inferior é o curto (relação alta). Cai-se ao trocar qual segmento está encurtado.' },
          { t: 'Não pode ser avaliada antes da puberdade', correct: false, why: 'Nega a avaliação: a relação SS/SI pode e deve ser avaliada em qualquer idade — o normal inclusive parte de uma relação alta ao nascer. Cai-se ao confundir "a relação muda com a idade" com "não pode ser medida".' },
        ]
      },
      {
        stem: 'Por que a baixa estatura da acondroplasia é classificada como desproporcional?',
        alts: [
          { t: 'Porque a cabeça é menor que o esperado', correct: false, why: 'Erra o achado craniano: a desproporção na acondroplasia é dos membros (segmento inferior curto); a cabeça inclusive costuma ser relativamente grande, não menor. Cai-se ao chutar um achado craniano sem ancorar no encurtamento dos membros.' },
          { t: 'Porque os ossos longos não crescem, gerando membros curtos com encurtamento persistente do segmento inferior em relação ao superior', correct: true, why: 'Certa. A displasia óssea impede o crescimento longitudinal dos ossos longos → membros curtos → segmento inferior persistentemente menor que o superior. A baixa estatura vem da desproporção, não de uma redução uniforme.' },
          { t: 'Porque o tronco é encurtado e os membros são longos', correct: false, why: 'Inverte os segmentos: na acondroplasia os membros é que são curtos (segmento inferior), não o tronco; membros longos seriam o oposto do quadro. Cai-se ao trocar qual parte é encurtada.' },
          { t: 'Porque a criança é uniformemente pequena em todos os segmentos', correct: false, why: 'Descreve baixa estatura proporcional: "uniformemente pequena em todos os segmentos" é o padrão proporcional (variantes, endócrinas) — o contrário da acondroplasia. Cai-se ao confundir proporcional com desproporcional.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 8 — E2 Dado impactante ===================== */
  P.push(page('p8', 8, `
    ${tag('pato', 'Genética II · cromossomopatia')}
    ${chips(['exceção: queixa cardinal', 'monossomia 45,X', 'pescoço alado · hipertelorismo · cúbito valgo', 'coarc-Turner'])}

    <figure class="opener opener--stat" aria-label="Dado de abertura">
      <div class="opener__number">45,X</div>
      <div class="opener__context">Entre todas as cromossomopatias, <strong>só uma tem a baixa estatura como queixa cardinal</strong>: a síndrome de Turner, monossomia do X (45,X). Na Down a baixa estatura é só consequência acompanhada — no Turner, é a principal manifestação.</div>
    </figure>

    <h1 class="page-title">Turner: a cromossomopatia da baixa estatura</h1>

    <div class="prose">
      <h3 class="topic-h">A exceção entre as cromossomopatias</h3>
      <p>O segundo grupo genético são as <span class="term">cromossomopatias</span> — doenças em que a divisão dos cromossomos não está adequada (cromossomos sexuais X ou Y aumentados ou diminuídos: um X a mais, um X a menos). Várias cromossomopatias podem causar baixa estatura. Mas há uma regra geral importante: <span class="hl-warn">a baixa estatura não é a queixa cardinal delas — exceto por UMA</span>. Tome a <strong>síndrome de Down</strong> como exemplo: cursa com estatura reduzida, mas <strong>NÃO se suspeita de Down pela baixa estatura</strong> — suspeita-se pelo conjunto de <strong>alterações morfológicas</strong>, e a baixa estatura aparece depois como consequência acompanhada. A exceção a essa regra é a <span class="hl-bad">síndrome de Turner</span>: a cromossomopatia cuja <strong>principal manifestação / queixa mais importante é a baixa estatura</strong>.</p>

      <h3 class="topic-h">Monossomia do X (45,X) e a queixa cardinal</h3>
      <p>O mecanismo do Turner é a <span class="term">monossomia do cromossomo X</span> — meninas com cariótipo <span class="hl-bad">45,X</span> (falta um cromossomo). A falta desse cromossomo gera todo o espectro clínico da síndrome, cuja principal manifestação é a baixa estatura; o <span class="term">atraso puberal</span> também é marca fundamental. E há uma lógica temporal interessante: o atraso puberal <strong>demora a dar o diagnóstico</strong> — geralmente feito <strong>após os 13 anos</strong>, quando a ausência de desenvolvimento puberal chama atenção. Por isso, na prática, a <strong>primeira queixa cardinal percebida acaba sendo mesmo a baixa estatura</strong>. A estatura do Turner é importante: as mulheres ficam em torno de <span class="term">1,50 m, 1,40 m, às vezes menos (1,30 m)</span>.</p>

      <h3 class="topic-h">Os três estigmas a memorizar</h3>
      <p>O Turner tem estigmas físicos clássicos que, somados à baixa estatura, fecham a suspeita. São três a memorizar:</p>
      <ul>
        <li><span class="term">Pescoço alado</span>: pescoço com diâmetro muito aumentado, como uma hipertrofia da região, em <strong>formato de asa</strong>.</li>
        <li><span class="term">Hipertelorismo mamário</span>: distância <strong>aumentada</strong> entre os mamilos (mamilos mais lateralizados).</li>
        <li><span class="term">Cúbito valgo</span>: o antebraço assume posição <strong>lateralizada</strong> — a postura clássica do paciente com Turner.</li>
      </ul>
      <p>O espectro completo a guardar: <span class="hl-bad">baixa estatura + atraso puberal + pescoço alado + hipertelorismo mamário + cúbito valgo</span>. Essa combinação, numa menina, deve disparar a suspeita de Turner.</p>

      <h3 class="topic-h">Por que importa: comorbidades e o coarc-Turner</h3>
      <p>Descobrir o Turner <strong>não é só dar o nome da síndrome</strong> — é <span class="hl-good">intervir e melhorar o prognóstico</span>. Existe o que fazer pela estatura: as pacientes com Turner são <strong>responsivas ao GH</strong>, e fazer GH pode melhorar um pouco a estatura delas. Mas a <span class="hl-warn">maior preocupação no Turner não é a estatura — são as comorbidades associadas</span>:</p>
      <ul>
        <li><span class="term">Hipotireoidismo</span>: a paciente pode tê-lo como comorbidade, e ele <strong>potencializa</strong> a baixa estatura (lembrando que o hipotireoidismo é a principal causa endócrina de baixa estatura). Identificá-lo e tratá-lo melhora a paciente.</li>
        <li><span class="hl-bad">Coarctação da aorta (COAo)</span>: comorbidade <strong>cardíaca</strong>. Pode gerar síndromes hipertensivas e, ao exame físico, <strong>pulso reduzido em membros inferiores</strong>.</li>
      </ul>
      <p>Daí o atalho de prova: diante de <strong>menina com baixa estatura em que se percebe coarctação da aorta</strong>, ligar o alarme para Turner — associação tão importante que se cunhou o mnemônico <span class="hl-bad">"coarc-Turner"</span>.</p>
    </div>

    ${svgPiso(8, { caption: 'o corpo do Turner — hotspots nos três estigmas (pescoço alado, hipertelorismo mamário, cúbito valgo) + dois marcadores de comorbidade (tireoide, coração/coarctação). Clique em cada um para a descrição e por que importa; o marcador cardíaco destaca o "coarc-Turner".', hint: 'Clique no estigma desenhado, ou Tab + Enter; descrição com aria-live.' })}

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text">"coarc-Turner" — menina + baixa estatura + coarctação da aorta (pulso fino em MMII) → síndrome de Turner.</p>
    </aside>

    ${med({
      file: 'p8-turner-montagem.jpg',
      alt: 'Montagem de várias meninas e mulheres com síndrome de Turner, evidenciando o fenótipo característico: pescoço curto/alado, tórax em escudo e baixa estatura.',
      achado: 'Os estigmas do Turner — baixa estatura, pescoço curto/alado e tórax em escudo (hipertelorismo mamário), documentados em montagem fenotípica.',
      fonte: 'Kruszka P et al. (NIH), "Turner syndrome across world populations"',
      licenca: 'Domínio público (NIH)'
    })}

    ${med({
      file: 'p8b-coarctacao-aorta-esquema.jpg',
      alt: 'Esquema do coração mostrando coarctação da aorta — estreitamento da aorta logo após o arco, com detalhe ampliado da indentação.',
      achado: 'Coarctação da aorta — estreitamento logo após o arco; em menina com baixa estatura, fecha o raciocínio para o coarc-Turner (pulso reduzido em MMII).',
      fonte: 'Ilustração de BruceBlaus · via Wikimedia Commons',
      licenca: 'CC BY 3.0'
    })}

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Turner</h4><p>Baixa estatura é a <strong>queixa cardinal</strong> (exceção entre as cromossomopatias). Cariótipo 45,X.</p></div>
        <div class="dont-confuse__side"><h4>Down</h4><p>Baixa estatura é <strong>consequência acompanhada</strong> — suspeita-se pelo conjunto morfológico, não pela estatura.</p></div>
      </div>
    </div>

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>(1) Turner = monossomia <strong>45,X</strong>; (2) baixa estatura como queixa cardinal (exceção entre as cromossomopatias); (3) a tríade de estigmas (pescoço alado, hipertelorismo mamário, cúbito valgo); (4) coarc-Turner e o hipotireoidismo como comorbidades; (5) responsividade ao GH.</p>
    </aside>

    ${notaValor('o cariótipo <strong>45,X</strong> é a forma clássica/mais comum (~45%); os ~55% restantes são <strong>mosaicismos</strong> (45,X/46,XX) ou alterações estruturais do X. Em prova: "forma mais comum" = 45,X; "todas as formas" = citar mosaicismo.')}

    ${notaValor('número fechado de prova da estatura final do Turner ≈ <strong>143 cm sem tratamento</strong>, podendo chegar a <strong>~150 cm com GH</strong> (responsividade ao GH já citada). A faixa apresentada (1,30-1,50 m) engloba esse valor.')}

    ${quiz('p8', 'A síndrome de Turner: exceção, cariótipo, estigmas e comorbidades.', [
      {
        stem: 'Por que, entre as cromossomopatias, a síndrome de Turner é a exceção em que a baixa estatura é a queixa cardinal?',
        alts: [
          { t: 'Porque o Turner não cursa com outras manifestações', correct: false, why: 'Nega o espectro do Turner: ele tem, sim, várias manifestações (estigmas, comorbidades) — só que a baixa estatura é a queixa cardinal, não a única. Cai-se ao confundir "principal manifestação" com "única manifestação".' },
          { t: 'Porque na maioria das cromossomopatias a baixa estatura é consequência acompanhada (suspeita-se pelo conjunto morfológico), enquanto no Turner ela é a principal manifestação, e o atraso puberal só dá o diagnóstico após os 13 anos', correct: true, why: 'Certa. Em cromossomopatias como a Down, a baixa estatura é consequência acompanhada — a suspeita vem do conjunto morfológico. No Turner, ela é a principal manifestação, e como o atraso puberal só chama atenção após os ~13 anos, a estatura acaba sendo a queixa cardinal percebida.' },
          { t: 'Porque o Turner é a única cromossomopatia que existe', correct: false, why: 'É factualmente absurda: há muitas cromossomopatias (Down, Klinefelter, etc.) — o Turner é apenas a exceção quanto à queixa cardinal. Cai-se ao exagerar "exceção" para "única".' },
          { t: 'Porque a baixa estatura do Turner é leve e passa despercebida', correct: false, why: 'Inverte a relevância: a baixa estatura do Turner é importante e marcante (chega a 1,30-1,50 m), não leve nem despercebida — é por isso que é a queixa cardinal. Cai-se ao subestimar o achado que define a exceção.' },
        ]
      },
      {
        stem: 'Diante de uma menina com baixa estatura, atraso puberal e coarctação da aorta (pulso reduzido em membros inferiores), qual a principal hipótese?',
        alts: [
          { t: 'Acondroplasia', correct: false, why: 'Erra o quadro genético: acondroplasia é displasia óssea (baixa estatura desproporcional), sem coarctação nem atraso puberal como marca. Cai-se ao associar "baixa estatura genética" à displasia, ignorando a comorbidade cardíaca que aponta Turner.' },
          { t: 'Síndrome de Turner — a associação "coarc-Turner"', correct: true, why: 'Certa. Menina + baixa estatura + coarctação da aorta é o clássico coarc-Turner: a coarctação é uma das comorbidades cardíacas do Turner, e somada à baixa estatura e ao atraso puberal aponta fortemente para a síndrome (45,X).' },
          { t: 'Síndrome de Down', correct: false, why: 'Confunde as cromossomopatias: a Down não tem a coarctação como associação clássica nem a baixa estatura como queixa cardinal; suspeita-se dela pelo conjunto morfológico próprio. Cai-se ao agrupar qualquer cromossomopatia com baixa estatura sob o mesmo guarda-chuva.' },
          { t: 'Atraso constitucional do crescimento', correct: false, why: 'Ignora a comorbidade e o sexo: atraso constitucional é variante fisiológica, sem coarctação nem estigmas — a presença de cardiopatia exclui a hipótese de normalidade. Cai-se ao ler "baixa + atraso puberal" como constitucional e esquecer o dado patológico.' },
        ]
      },
      {
        stem: 'Qual é o cariótipo clássico da síndrome de Turner e qual a maior preocupação clínica na paciente?',
        alts: [
          { t: '47,XXY; a infertilidade', correct: false, why: 'Dá o cariótipo de Klinefelter: 47,XXY é o Klinefelter (masculino), não o Turner. Cai-se ao trocar as duas cromossomopatias sexuais clássicas.' },
          { t: '45,X; as comorbidades associadas (cardíaca e tireoidiana), mais do que a própria estatura', correct: true, why: 'Certa. O Turner é a monossomia do X (45,X). Embora a baixa estatura seja a queixa cardinal, a maior preocupação são as comorbidades — coarctação da aorta e hipotireoidismo —, que representam o real risco e mudam o prognóstico ao serem tratadas.' },
          { t: 'Trissomia do 21; a cardiopatia', correct: false, why: 'Dá o cariótipo da Down: trissomia do 21 é a Down — outra cromossomopatia, com baixa estatura como consequência, não como queixa cardinal. Cai-se ao confundir as síndromes cromossômicas.' },
          { t: '45,X; exclusivamente a baixa estatura', correct: false, why: 'Acerta o cariótipo mas erra a preocupação: a baixa estatura é a queixa cardinal, porém a maior preocupação são as comorbidades, não a estatura isolada. Cai-se ao parar na queixa cardinal e ignorar o que de fato ameaça a paciente.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 9 — E5 Meta + checklist ===================== */
  P.push(page('p9', 9, `
    ${tag('fisio', 'O arsenal · ferramenta 1')}
    ${chips(['quatro ferramentas', 'estatura = 1º passo', 'medir e confirmar', 'não fecha sozinha'])}

    <section class="opener opener--checklist" aria-label="Meta da página">
      <p class="opener__checklist-title">Ao final desta página você vai saber:</p>
      <ul class="opener__checklist">
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>Quais são as <strong>quatro ferramentas</strong> de avaliação</span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>Por que a estatura é o <strong>primeiro passo</strong> (mas não o principal)</span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>Por que confirmar a baixa estatura <strong>não basta</strong> para o diagnóstico</span></li>
      </ul>
    </section>

    <h1 class="page-title">As quatro ferramentas (e a primeira: a estatura)</h1>

    <div class="prose">
      <h3 class="topic-h">O arsenal de quatro</h3>
      <p>Conhecidas as principais causas (desnutrição, endócrinas, genéticas), o desafio passa a ser <strong>descobrir a etiologia específica</strong>: primeiro fisiológica × patológica, e dentro de cada uma o diagnóstico exato. Para isso existem <span class="hl-good">quatro ferramentas de avaliação</span> que, dominadas, permitem acertar <strong>qualquer</strong> diagnóstico de baixa estatura em prova. São elas:</p>
      <ol>
        <li><span class="term">Estatura atual</span> do paciente</li>
        <li><span class="term">Velocidade de crescimento</span></li>
        <li><span class="term">Alvo genético</span></li>
        <li><span class="term">Idade óssea</span></li>
      </ol>
      <p>Cada uma responde uma pergunta diferente, e juntas constroem o raciocínio diagnóstico. Cada ferramenta é dissecada a seguir, uma a uma.</p>

      <h3 class="topic-h">Ferramenta 1: medir e confirmar</h3>
      <p>A primeira ferramenta é a <strong>avaliação da estatura</strong> — a mais óbvia, o <span class="hl-good">primeiro passo</span> (mas <strong>não a principal</strong>). E ela tem uma regra de postura clínica: <strong>não basta acreditar no relato</strong> da mãe de que "a criança é baixa". Valoriza-se o relato, mas é preciso <span class="hl-good">medir e confirmar</span>. Confirmar significa <strong>plotar na curva</strong>: estatura <span class="hl-bad">abaixo do escore-Z −2</span> (= abaixo do P3) = diagnóstico de baixa estatura. É o gesto que transforma uma queixa subjetiva ("acho minha filha baixinha") em um diagnóstico objetivo.</p>

      <h3 class="topic-h">Por que a estatura sozinha não fecha</h3>
      <p>Confirmar a baixa estatura é o <strong>primeiro passo, mas não é suficiente</strong>. Por quê? Porque <span class="hl-warn">há crianças baixas sem doença e crianças baixas com doença</span> — a estatura sozinha não distingue uma da outra. Saber que a criança está abaixo do Z-2 diz que ela tem baixa estatura (o sindrômico), mas não diz se é variante fisiológica ou causa patológica. Para isso entram as outras três ferramentas — e, em especial, a velocidade de crescimento, que é a que separa o normal do doente. A estatura abre o caso; as outras três o resolvem.</p>
    </div>

    ${svgPiso(9, { caption: 'o arsenal de quatro — abra cada cartão (estatura / velocidade / alvo genético / idade óssea) e veja o que aquela ferramenta responde: estatura confirma o sindrômico; velocidade separa fisiológico × patológico; alvo diz até onde chega; idade óssea mostra a maturação.', hint: 'Clique, toque ou Enter por cartão; prévia com aria-live.' })}

    ${med({
      file: 'p9-afericao-estatura.jpg',
      alt: 'Profissional medindo a estatura de uma criança com a régua de um estadiômetro apoiada na cabeça, criança em pé.',
      achado: 'Medir e plotar — régua no occipício, plano de Frankfurt, calcanhares na escala. A estatura confirma o sindrômico, mas o número só vale plotado na curva; e ainda não fecha a etiologia.',
      fonte: 'U.S. Navy photo (110426-N-00332-114) · via Wikimedia Commons',
      licenca: 'Domínio público',
      tarja: 'p9'
    })}

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Primeiro passo</h4><p>A estatura (ferramenta 1) confirma o sindrômico — é por onde se começa.</p></div>
        <div class="dont-confuse__side"><h4>Não é a principal</h4><p>Quem decide fisiológico × patológico é a velocidade de crescimento (ferramenta 2), não a estatura plotada.</p></div>
      </div>
    </div>

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>As quatro ferramentas (estatura, velocidade de crescimento, alvo genético, idade óssea) e a noção de que confirmar a baixa estatura (plotar < Z-2) não basta — é só o ponto de partida.</p>
    </aside>

    ${quiz('p9', 'O método de quatro ferramentas e o papel da estatura.', [
      {
        stem: 'Quais são as quatro ferramentas de avaliação da baixa estatura?',
        alts: [
          { t: 'Estatura atual, peso, perímetro cefálico e IMC', correct: false, why: 'Lista parâmetros antropométricos genéricos: peso, perímetro cefálico e IMC são medidas úteis, mas não são as quatro ferramentas específicas da baixa estatura. Cai-se ao confundir "medidas da puericultura" com "as quatro ferramentas do raciocínio".' },
          { t: 'Estatura atual, velocidade de crescimento, alvo genético e idade óssea', correct: true, why: 'Certa. O arsenal de quatro é estatura atual, velocidade de crescimento, alvo genético e idade óssea — ferramentas clínicas/antropométricas que, juntas, resolvem o raciocínio de qualquer baixa estatura.' },
          { t: 'TSH, GH, cariótipo e idade óssea', correct: false, why: 'Mistura exames laboratoriais: TSH, GH e cariótipo são exames etiológicos solicitados depois que as ferramentas apontam o caminho — não são as ferramentas de avaliação inicial. Cai-se ao saltar direto para exames específicos.' },
          { t: 'Velocidade de crescimento, IMC, cortisol e cariótipo', correct: false, why: 'Mesma armadilha: cortisol e cariótipo são exames específicos; IMC é medida geral. Não compõem o método clínico de quatro ferramentas. Cai-se ao pular o raciocínio para os exames.' },
        ]
      },
      {
        stem: 'Por que confirmar que a estatura está abaixo do Z-2 (primeira ferramenta) não é suficiente para o diagnóstico?',
        alts: [
          { t: 'Porque a curva de crescimento é imprecisa', correct: false, why: 'Culpa o instrumento: a curva é precisa; a limitação não é de medição, é que a estatura sozinha não informa a etiologia. Cai-se ao trocar "insuficiente para a etiologia" por "instrumento ruim".' },
          { t: 'Porque há crianças baixas sem doença e crianças baixas com doença — a estatura confirma o sindrômico, mas não distingue fisiológico de patológico', correct: true, why: 'Certa. A estatura confirma o diagnóstico sindrômico (< Z-2 = baixa estatura), mas existem crianças baixas normais (variantes) e doentes (patológicas). A estatura não separa as duas — quem faz isso é a velocidade de crescimento e as demais ferramentas.' },
          { t: 'Porque o Z-2 não define baixa estatura', correct: false, why: 'Nega a definição: o Z-2 (= P3) define baixa estatura — esse é justamente o sindrômico que a estatura confirma. Cai-se ao confundir "não basta para a etiologia" com "não define o sindrômico".' },
          { t: 'Porque a estatura é a ferramenta mais importante e basta sozinha', correct: false, why: 'Contradiz o texto: a estatura é o primeiro passo, não a principal — a principal é a velocidade de crescimento; e ela não basta sozinha. Cai-se ao superdimensionar a ferramenta inicial.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 10 — E8 Erro comum desmontado ===================== */
  P.push(page('p10', 10, `
    ${tag('sys', 'Ferramenta 2 · a chave do fluxograma')}
    ${chips(['dado mais sensível', '×2 dos 6 meses', 'VC alterada = patológico', 'dois cortes: > 5 × < 4'])}

    <section class="opener opener--bust" aria-label="Erro comum desmontado">
      <p class="opener__bust-tag">Erro comum desmontado</p>
      <p class="opener__bust-wrong">"O que importa é a estatura plotada — a velocidade de crescimento é um dado secundário."</p>
      <p class="opener__bust-right">Está errado. A velocidade é o dado <strong>mais sensível</strong> (muda antes de a estatura cair) e é o <strong>divisor</strong> fisiológico × patológico. Sem ela, não há bifurcação.</p>
    </section>

    <h1 class="page-title">Velocidade de crescimento: a chave que separa normal de doente</h1>

    <div class="prose">
      <h3 class="topic-h">O dado mais sensível</h3>
      <p>A segunda ferramenta é a <span class="hl-good">velocidade de crescimento (VC)</span> — e é o dado <strong>MAIS SENSÍVEL</strong> para a avaliação da baixa estatura. O motivo: a velocidade de crescimento <span class="hl-bad">altera-se ANTES mesmo de a estatura cair</span>. É um sinal <strong>precoce</strong> — a criança vai dando sinais de que será baixa antes de a estatura plotada despencar. Por isso a VC capta o problema mais cedo que a régua. Mas a importância maior é outra: é o dado que <span class="hl-bad">divide o raciocínio entre causa fisiológica e causa patológica</span>. Sem a VC, não há como fazer a bifurcação mestra do raciocínio.</p>

      <h3 class="topic-h">Como se calcula (o ×2 dos 6 meses)</h3>
      <p>Obter a VC é simples: medir a estatura atual e comparar com a estatura de um intervalo, calculando o <strong>ganho em centímetros</strong>. Pode ser <span class="term">retrospectiva</span> (quanto a criança tinha há ~6 meses) ou <span class="term">prospectiva</span> (medir hoje e remedir em ~6 meses). A VC é sempre expressa em <span class="hl-good">centímetros POR ANO</span>. Daí a regra de conversão:</p>
      <ul>
        <li>Se o dado é de <strong>6 meses</strong>, multiplica-se o ganho por <strong>2</strong> para ter a velocidade anual. Ex.: ganhou <strong>3 cm em 6 meses → ×2 = 6 cm/ano</strong>.</li>
        <li>Se a questão já dá o dado de <strong>1 ano</strong> (ex.: media 90 cm e no ano anterior 80 cm → ganhou <strong>10 cm/ano</strong>), o cálculo é <strong>direto</strong>, sem multiplicar.</li>
      </ul>
      <p>É exatamente esse cálculo que se aplicará à Manu: ela cresceu 3,5 cm em 6 meses → ×2 = 7 cm/ano.</p>

      <h3 class="topic-h">A regra de ouro: VC alterada = patológico</h3>
      <p>Aqui está a regra de ouro do tema, a que comanda o fluxograma: <span class="hl-bad">velocidade de crescimento ALTERADA em paciente com baixa estatura = causa PATOLÓGICA</span>. Se a VC está alterada, já <strong>não é</strong> baixa estatura familiar nem atraso constitucional — as duas variantes fisiológicas cursam com velocidade <strong>normal</strong>. Em outras palavras: a criança com variante fisiológica é baixa, mas <strong>cresce na velocidade certa</strong>; a criança com causa patológica é baixa <strong>e</strong> cresce devagar demais. A velocidade é o que separa um grupo do outro.</p>

      <h3 class="topic-h">Os dois cortes que circulam</h3>
      <p>E aqui entra o ponto mais cobrado e mais confuso do tema. A referência geral de VC do escolar é de <span class="term">6 a 7 cm por ano</span>. Mas no <strong>fluxograma de baixa estatura</strong> adota-se um corte um pouco diferente: <span class="hl-good">velocidade NORMAL no escolar = maior que 5 cm/ano</span>. Abaixo de 5 cm/ano → VC <strong>alterada</strong>. (A investigação de baixa estatura é feita geralmente no paciente <strong>acima de 5 anos / escolar</strong>, por isso o corte de > 5 cm/ano se aplica a esse grupo.) Exemplo de cálculo: paciente cresceu <strong>2 cm em 6 meses → ×2 = 4 cm/ano → abaixo de 5 → VC ALTERADA</strong>. Atenção, porque circula um <strong>segundo corte</strong>, de propósito diferente — e a banca pode usar qualquer um.</p>
    </div>

    ${svgPiso(10, { caption: 'calculadora de velocidade de crescimento — insira duas estaturas e o intervalo (6 meses ou 1 ano): calcula a VC em cm/ano (×2 quando 6 meses) e classifica contra os dois cortes — verde se > 5 (normal), vermelho se < 4 (alarme), amarelo na zona 4-5 (cinzenta, mostra os dois veredictos). Pré-carregado com a Manu (3,5 cm em 6 meses → 7 cm/ano → normal).', hint: 'Campos numéricos + intervalo; resultado classificado anunciado por leitor de tela.' })}

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova (a mestra do tema)</p>
        <p class="trap__text">Existem <strong>dois cortes de velocidade de crescimento</strong> com propósitos distintos. <strong>&gt; 5 cm/ano = limiar de normalidade do fluxograma</strong> de baixa estatura (o corte usado aqui). <strong>&lt; 4 cm/ano = sinal de alarme / gatilho de investigação</strong> (referência clássica). A <strong>zona 4-5 cm/ano</strong> é a cinzenta perigosa: uma banca pode classificar de um jeito (anormal pelo fluxograma de > 5) ou de outro (ainda não-alarme por ≥ 4). A Manu, com 7 cm/ano, está acima dos dois — seu desfecho não muda. Saiba os dois e a fonte de cada.</p>
      </div>
    </aside>

    ${med({
      file: 'p10-curva-velocidade-canal-baixo.jpg',
      alt: 'Curva de estatura de menina com medições seriadas plotadas em um canal baixo do gráfico, com marcação de idade óssea e inset de velocidade de crescimento.',
      achado: 'A inclinação importa mais que o ponto — medidas seriadas num canal baixo, idade óssea marcada (X vermelho), velocidade no inset; a trajetória é que diagnostica.',
      fonte: 'Diseases 2026 (MDPI), Figura 4 · via PMC',
      licenca: 'CC BY 4.0'
    })}

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>VC alterada</h4><p>Aponta causa <strong>patológica</strong> (cresce devagar demais).</p></div>
        <div class="dont-confuse__side"><h4>VC normal</h4><p>Aponta variante <strong>fisiológica</strong> (familiar ou constitucional). Não se decide pela estatura plotada, e sim pela velocidade.</p></div>
      </div>
    </div>

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>(1) a VC é o dado mais sensível e o divisor fisiológico × patológico; (2) o cálculo (×2 para 6 meses); (3) o corte do fluxograma (> 5 cm/ano = normal); (4) a existência do corte de alarme (< 4 cm/ano) e a zona cinzenta entre 4 e 5.</p>
    </aside>

    ${quiz('p10', 'Cálculo, regra de ouro e os dois cortes da velocidade.', [
      {
        stem: 'Uma criança escolar cresceu 2 cm nos últimos 6 meses. Qual a velocidade de crescimento anualizada e a interpretação pelo corte do fluxograma de baixa estatura?',
        alts: [
          { t: '2 cm/ano; normal', correct: false, why: 'Esquece a anualização: 2 cm em 6 meses não são 2 cm/ano — é preciso multiplicar por 2 para expressar em cm/ano. Cai-se ao usar o ganho do intervalo direto, sem converter para o ano.' },
          { t: '4 cm/ano; velocidade alterada (abaixo de 5 cm/ano) → causa patológica', correct: true, why: 'Certa. Dado de 6 meses → ×2: 2 cm × 2 = 4 cm/ano. Pelo corte do fluxograma (normal > 5), 4 está abaixo de 5 → VC alterada → causa patológica. A velocidade alterada já exclui as variantes fisiológicas.' },
          { t: '4 cm/ano; normal', correct: false, why: 'Acerta o cálculo mas erra a interpretação: 4 cm/ano está abaixo do corte de 5 do fluxograma → é alterada, não normal. Cai-se ao anualizar certo, mas confundir o corte (lembra-se da faixa 6-7 e acha 4 "quase normal").' },
          { t: '6 cm/ano; alterada', correct: false, why: 'Erra a conta: 2 × 2 = 4, não 6 — embora a conclusão "alterada" coincida, o número está errado. Cai-se ao misturar a referência do escolar (6-7) com o resultado do cálculo.' },
        ]
      },
      {
        stem: 'Por que a velocidade de crescimento é considerada o dado mais importante para separar causa fisiológica de patológica?',
        alts: [
          { t: 'Porque é mais fácil de medir que a estatura', correct: false, why: 'Troca por facilidade técnica: a VC exige duas medidas e um cálculo — não é "mais fácil"; sua importância é diagnóstica (separa os grupos), não logística. Cai-se ao confundir relevância clínica com praticidade.' },
          { t: 'Porque VC alterada indica causa patológica, enquanto as variantes fisiológicas (familiar e constitucional) cursam com VC normal', correct: true, why: 'Certa. A regra de ouro: VC alterada = patológico. As duas variantes fisiológicas crescem na velocidade certa (são baixas, mas crescem normalmente); a criança com causa patológica cresce devagar demais. A velocidade é o divisor exato.' },
          { t: 'Porque substitui a necessidade de plotar a estatura', correct: false, why: 'Descarta a estatura: a VC complementa a estatura (que confirma o sindrômico), não a substitui — são ferramentas distintas. Cai-se ao tratar as ferramentas como excludentes.' },
          { t: 'Porque a VC só se altera nas variantes fisiológicas', correct: false, why: 'Inverte a regra: é o contrário — VC normal nas fisiológicas; VC alterada nas patológicas. Cai-se ao trocar qual grupo tem a velocidade alterada.' },
        ]
      },
      {
        stem: 'Sobre os cortes de velocidade de crescimento no escolar, qual afirmação está correta?',
        alts: [
          { t: 'Existe um único corte universal de 5 cm/ano para tudo', correct: false, why: 'Simplifica demais: não é um corte único — são dois, e ignorar o de alarme (< 4) deixa o aluno desarmado na zona cinzenta. Cai-se ao buscar um único número "limpo" para decorar.' },
          { t: 'Coexistem dois cortes de propósitos diferentes: > 5 cm/ano = normalidade no fluxograma de baixa estatura, e < 4 cm/ano = sinal de alarme/investigação', correct: true, why: 'Certa. Há dois cortes que coexistem, com finalidades distintas: > 5 cm/ano é o limiar de normalidade no fluxograma; < 4 cm/ano é o sinal de alarme/gatilho de investigação. A zona 4-5 cm/ano é a cinzenta. Saber os dois e a fonte de cada evita erro na prova.' },
          { t: 'Abaixo de 7 cm/ano a velocidade é sempre patológica', correct: false, why: 'Usa a referência geral como corte de anormalidade: 6-7 cm/ano é a referência do escolar, não o limiar de anormalidade — abaixo de 7 não é "sempre patológico" (5-6 ainda pode ser normal). Cai-se ao transformar o valor central esperado em ponto de corte.' },
          { t: 'Os cortes de 5 e de 4 cm/ano são a mesma coisa, apenas arredondamentos', correct: false, why: 'Funde dois cortes que não se fundem: 5 e 4 cm/ano têm propósitos diferentes (normalidade do fluxograma × alarme) — não são o mesmo número arredondado. Cai-se ao assumir que números próximos são intercambiáveis, perdendo a distinção de propósito.' },
        ]
      },
    ])}

    ${notaBanca('circula um <strong>segundo corte de propósito diferente</strong> — a SBP/literatura BR usa <strong>VC < 4 cm/ano</strong> como <em>sinal de alarme / gatilho de investigação</em>. Coexistem: <strong>&gt; 5 cm/ano = normalidade no fluxograma</strong>; <strong>&lt; 4 cm/ano = alarme</strong>. A <strong>zona 4-5 cm/ano</strong> é a cinzenta — a banca pode classificar de qualquer um dos dois jeitos. A Manu (7 cm/ano) está acima dos dois; o desfecho dela não muda.')}

    ${notaBanca('a referência do escolar de <strong>6-7 cm/ano</strong> (texto) está dentro da faixa que a SBP publica, <strong>5-7 cm/ano</strong> (3 anos → puberdade) — é arredondamento do valor central esperado.')}
  `));

  /* ===================== PÁGINA 11 — E6 Mnemônico-âncora ===================== */
  P.push(page('p11', 11, `
    ${tag('sys', 'Ferramenta 3 · alvo genético')}
    ${chips(['não é média simples', '13 sempre', '+13 mãe / −13 pai', 'pisos 1,63 / 1,51 m'])}

    <aside class="opener opener--mnemonic" aria-label="Mnemônico-âncora de abertura">
      <p class="opener__mnemonic-quote">"<em>13 sempre.</em>" <strong>+13 na mãe</strong> → alvo do <strong>menino</strong>. <strong>−13 no pai</strong> → alvo da <strong>menina</strong>. O resto da fórmula é só a média das alturas dos pais.</p>
      <span class="opener__mnemonic-tag">âncora de memória</span>
    </aside>

    <h1 class="page-title">Alvo genético: até onde os pais "mandaram" crescer</h1>

    <div class="prose">
      <h3 class="topic-h">Por que não é média simples</h3>
      <p>A terceira ferramenta é o <span class="term">alvo genético</span> — deve ser determinado em <strong>toda consulta pediátrica</strong>. Ele serve para saber <span class="hl-good">até onde a criança pode chegar</span> de estatura (o que os pais "mandaram" de estrutura genética). Há um princípio clínico embutido: <strong>não se pode cobrar que a criança tenha estatura muito acima do seu alvo genético</strong>. Como quem determina o alvo é principalmente pai e mãe, a base é a <strong>média das estaturas dos pais</strong>. Mas há um <span class="hl-warn">cuidado</span>: <strong>NÃO se pode fazer média simples</strong>, porque a puberdade do menino é diferente da puberdade da menina. A puberdade masculina gera, em geral, <strong>crescimento maior e mais prolongado</strong> — meninos crescem mais e por mais tempo, ficando geralmente maiores que as meninas. Por isso a média crua dos pais distorceria o alvo: é preciso corrigir.</p>

      <h3 class="topic-h">A fórmula e a correção de 13 cm</h3>
      <p>A correção usa a constante de <strong>13 cm</strong>, sempre, aplicada conforme o sexo da criança:</p>
      <ul>
        <li><span class="term">Alvo do MENINO</span> = [altura do pai + (altura da mãe <strong>+ 13</strong>)] / 2. Soma-se 13 cm à mãe — corrige-se a mãe "como se ela tivesse tido <strong>puberdade masculina</strong>".</li>
        <li><span class="term">Alvo da MENINA</span> = [(altura do pai <strong>− 13</strong>) + altura da mãe] / 2. Subtrai-se 13 cm do pai — corrige-se o pai "como se ele tivesse tido <strong>puberdade feminina</strong>".</li>
      </ul>
      <p>A lógica da dedução: a constante "masculiniza" ou "feminiliza" o progenitor do sexo oposto, equilibrando a diferença puberal entre os sexos antes de tirar a média. <strong>+13 na mãe</strong> (menino) · <strong>−13 no pai</strong> (menina).</p>

      <h3 class="topic-h">Os pisos: 1,63 m e 1,51 m</h3>
      <p>O alvo genético não é só curiosidade — serve para saber se a criança tem alvo <span class="hl-good">acima</span> ou <span class="hl-bad">abaixo</span> do mínimo esperado para o sexo. As referências de estatura mínima esperada: <span class="term">menino deve crescer no mínimo 1,63 m; menina no mínimo 1,51 m</span> (a expectativa é de mais do que isso). A interpretação: se o alvo do menino cai <strong>abaixo de 1,63 m</strong>, espera-se que ele seja um adulto com baixa estatura; se o alvo da menina cai <strong>abaixo de 1,51 m</strong>, suspeita-se de baixa estatura na fase adulta. É a ferramenta que prevê o desfecho de estatura antes de ele acontecer — e que vai apontar, no caso da Manu, um alvo abaixo do piso feminino.</p>
    </div>

    ${svgPiso(11, { caption: 'calculadora de alvo genético — insira altura do pai e da mãe e escolha o sexo: aplica a correção de 13 cm (mostrando o passo a passo) e compara o alvo ao piso do sexo (1,63 / 1,51 m) — verde se acima, vermelho se abaixo —, com a margem ±5 cm. Pré-carregada com a Manu (pai 1,61 / mãe 1,50 / menina → 1,49 m, abaixo de 1,51).', hint: 'Campos numéricos + sexo; alvo, comparação ao piso e margem anunciados por leitor de tela.' })}

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text">"13 sempre" — soma 13 na mãe para alvo de menino; subtrai 13 do pai para alvo de menina.</p>
    </aside>

    ${med({
      file: 'p9-afericao-estatura.jpg',
      alt: 'Profissional medindo a estatura de uma criança com a régua de um estadiômetro, criança em pé.',
      achado: 'O alvo nasce de medidas reais — a média corrigida em 13 cm parte das alturas aferidas dos pais e da criança. O cálculo prevê até onde a criança chega (correlata: a aferição que alimenta o alvo).',
      fonte: 'U.S. Navy photo (110426-N-00332-114) · via Wikimedia Commons',
      licenca: 'Domínio público',
      tarja: 'p9'
    })}

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text"><strong>Não fazer média simples</strong> das alturas dos pais — é preciso a correção de 13 cm conforme o sexo da criança. E cuidado com o sinal: <strong>+13</strong> para menino (na mãe), <strong>−13</strong> para menina (no pai).</p>
      </div>
    </aside>

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Alvo = destino</h4><p>O alvo prevê <strong>até onde a criança pode chegar</strong>, não a velocidade nem a estatura atual.</p></div>
        <div class="dont-confuse__side"><h4>Não fecha sozinho</h4><p>Alvo baixo aponta familiar (combina com pais baixos), mas não substitui a velocidade na bifurcação fisiológico × patológico.</p></div>
      </div>
    </div>

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>(1) por que não é média simples (diferença puberal entre sexos); (2) a fórmula com <strong>+13 na mãe</strong> (menino) / <strong>−13 no pai</strong> (menina); (3) os pisos 1,63 m (menino) / 1,51 m (menina) e a interpretação (alvo abaixo do piso → suspeita de baixa estatura adulta).</p>
    </aside>

    ${quiz('p11', 'A fórmula do alvo genético e a leitura dos pisos.', [
      {
        stem: 'Para calcular o alvo genético de uma MENINA cujo pai mede 1,74 m e a mãe 1,60 m, qual o cálculo correto?',
        alts: [
          { t: '(1,74 + 1,60) / 2 = 1,67 m', correct: false, why: 'Faz a média simples proibida: ignora a correção de 13 cm — exatamente o erro que a página alerta, pois a diferença puberal entre os sexos distorce a média crua. Cai-se ao tirar a média direta sem lembrar da correção.' },
          { t: '[(1,74 − 0,13) + 1,60] / 2 = 1,605 m', correct: true, why: 'Certa. Para menina, subtrai-se 13 cm do pai (feminiliza-se o progenitor masculino) e tira-se a média: [(1,74 − 0,13) + 1,60] / 2 = (1,61 + 1,60)/2 = 1,605 m. A correção de 13 cm é obrigatória e o sinal é −13 no pai.' },
          { t: '[(1,74 + 0,13) + 1,60] / 2 = 1,735 m', correct: false, why: 'Erra o sinal: para menina o pai é corrigido com −13, não +13 (o +13 vai na mãe, e só para alvo de menino). Cai-se ao trocar o sinal da correção.' },
          { t: '[(1,60 − 0,13) + 1,74] / 2 = 1,605 m, mas corrigindo a mãe', correct: false, why: 'Corrige o progenitor errado: para menina corrige-se o pai (−13), não a mãe; embora o número final coincida por reordenação, a justificativa ("corrigindo a mãe") está errada. Cai-se ao acertar a aritmética mas inverter qual progenitor recebe a correção.' },
        ]
      },
      {
        stem: 'O alvo genético calculado de um menino resulta em 1,58 m. Como interpretar?',
        alts: [
          { t: 'Estatura normal garantida, pois está acima de 1,51 m', correct: false, why: 'Usa o piso do sexo errado: 1,51 m é o piso feminino; para menino o piso é 1,63 m, e 1,58 está abaixo dele. Cai-se ao aplicar o piso da menina ao menino.' },
          { t: 'Abaixo do piso masculino (1,63 m) → espera-se um adulto com baixa estatura', correct: true, why: 'Certa. O piso de estatura mínima esperada do menino é 1,63 m. Um alvo de 1,58 m cai abaixo desse piso → espera-se um adulto com baixa estatura (provável baixa estatura familiar, se os pais forem baixos).' },
          { t: 'Acima do piso, sem necessidade de acompanhamento', correct: false, why: 'Ignora o significado: alvo abaixo do piso exige atenção (sinaliza baixa estatura adulta), não dispensa acompanhamento. Cai-se ao confundir "alvo calculado" com "tudo normal".' },
          { t: 'O cálculo está errado, pois alvo de menino não pode ser abaixo de 1,63 m', correct: false, why: 'Nega um resultado possível: o alvo pode, sim, cair abaixo de 1,63 m — é justamente o que aponta baixa estatura familiar (pais baixos). Cai-se ao assumir que o piso é um valor garantido, não uma referência que pode não ser atingida.' },
        ]
      },
    ])}

    ${notaBanca('tratar <strong>1,63 m / 1,51 m</strong> como <strong>referência de alvo mínimo</strong> (≈ −2DP / P3 da estatura adulta brasileira por sexo). São números de prova BR consolidados, <strong>sem atribuição a uma diretriz nominal</strong>. A âncora conceitual: alvo abaixo do piso → suspeita de baixa estatura adulta.')}

    ${notaValor('a SBP cita uma <strong>margem aceitável de ± 5 cm</strong> em torno do alvo genético — a "faixa-alvo" de prova. O número calculado é o centro; o intervalo aceitável vai de −5 a +5 cm dele.')}
  `));

  /* ===================== PÁGINA 12 — E3 Caso clínico ===================== */
  P.push(page('p12', 12, `
    ${tag('case', 'Caso-âncora · aplicação à Manu')}
    ${chips(['(161 − 13 + 150)/2', 'alvo 1,49 m', 'abaixo de 1,51', 'falta a velocidade'])}

    <article class="opener opener--case" aria-label="Caso clínico de abertura">
      <span class="opener__case-header">De volta à Manu · aplicando a fórmula</span>
      <p class="opener__case-quote">Manu é menina → correção <strong>−13 no pai</strong>. Pai 1,61 m, mãe 1,50 m. Alvo = (161 − 13 + 150)/2 = <strong>1,49 m</strong> — abaixo do piso feminino de 1,51 m. O patrimônio genético aponta uma adulta baixa.</p>
      <dl class="case-card__meta">
        <dt>Sexo</dt><dd>menina → correção −13 no pai</dd>
        <dt>Pais</dt><dd>pai 1,61 m (161 cm) · mãe 1,50 m (150 cm)</dd>
        <dt>Cálculo</dt><dd>(161 − 13 + 150) / 2 = 298 / 2 = 149 cm</dd>
        <dt>Leitura</dt><dd>1,49 m < piso feminino (1,51 m) → adulta baixa esperada</dd>
      </dl>
    </article>

    <h1 class="page-title">O alvo da Manu cai abaixo do P3</h1>

    <div class="prose">
      <h3 class="topic-h">O cálculo da Manu (1,49 m)</h3>
      <p>Manu é menina, então a correção é <span class="term">−13 no pai</span>. O pai tem 1,61 m (161 cm) e a mãe 1,50 m (150 cm). Aplicando a fórmula do alvo da menina — [(altura do pai − 13) + altura da mãe] / 2, o cálculo é direto: (161 − 13 + 150) / 2 = (148 + 150) / 2 = 298 / 2 = <span class="hl-bad">149 cm = 1,49 m</span>. O alvo genético da Manu é <strong>1,49 m</strong>. É o ponto onde, equilibrando a altura do pai com a da mãe na puberdade, a estrutura genética "manda" a Manu chegar.</p>
    </div>

    <aside class="op-summary">
      <p class="op-summary__label">O cálculo da Manu</p>
      <p>(161 − 13 + 150) / 2 = 298 / 2 = <strong>149 cm = 1,49 m</strong> — abaixo do piso feminino (1,51 m).</p>
    </aside>

    <div class="prose">

      <h3 class="topic-h">Abaixo do piso feminino</h3>
      <p>Agora a interpretação. O piso de estatura mínima esperada da menina é <strong>1,51 m</strong>. O alvo da Manu — <span class="hl-bad">1,49 m — cai abaixo de 1,51 m</span>, e portanto abaixo do percentil 3 / escore-Z −2 da estatura adulta. Ou seja: o patrimônio genético dela aponta para uma <strong>adulta baixa</strong>. Plotada na curva, se a Manu crescer conforme a anatomia normal da curva dela, ela chega ao seu alvo <span class="hl-bad">sempre abaixo do escore-Z −2</span> — será baixa na idade adulta porque foi programada para isso.</p>

      <h3 class="topic-h">Liga o alerta — mas ainda falta a velocidade</h3>
      <p>A anatomia do gráfico da Manu — alvo genético baixo, curva sempre abaixo do Z-2 — <span class="hl-good">lembra exatamente a curva de baixa estatura familiar</span>. Com o alvo genético baixo (e os pais baixos), já se <strong>liga o alerta</strong> de baixa estatura familiar no caso da Manu. <span class="hl-warn">Mas ainda não é suficiente</span>: falta a peça que faz a bifurcação mestra — a <strong>velocidade de crescimento</strong>. O alvo baixo é compatível com a familiar, mas só a velocidade confirma que estamos numa variante fisiológica, e não numa causa patológica que por acaso também deixaria a criança baixa. O caso aponta para familiar; falta cravar.</p>
    </div>

    ${svgPiso(12, { caption: 'o cálculo da Manu, passo a passo — anime: altura do pai (161) → aplica −13 (148) → soma à mãe (150) → divide por 2 → 1,49 m; o resultado é plotado contra o piso de 1,51 m (cai abaixo, em vermelho) e contra o Z-2 da curva.', hint: 'Avance o passo com clique/Enter; cada etapa do cálculo é anunciada por leitor de tela.' })}

    ${med({
      file: 'p12-curva-oms-meninas-alvo-baixo.jpg',
      alt: 'Curva oficial da OMS de estatura por idade para meninas de 5 a 19 anos, com as linhas dos percentis 3, 15, 50, 85 e 97.',
      achado: 'O alvo da Manu: 1,49 m — quando o alvo genético cai na faixa do P3, o canal esperado da menina já nasce no piso da curva oficial (a marcação do alvo é overlay didático sobre a curva real da OMS).',
      fonte: 'WHO Growth Reference 5–19 years (percentis), 2007 · World Health Organization',
      licenca: 'OMS — uso educacional com atribuição'
    })}

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Alvo baixo sugere</h4><p>Aponta baixa estatura familiar — combina com pais baixos.</p></div>
        <div class="dont-confuse__side"><h4>Mas não fecha</h4><p>Uma criança com alvo baixo poderia, em tese, ter também causa patológica somada — quem exclui isso é a velocidade normal. Alvo é peça, não veredito.</p></div>
      </div>
    </div>

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>O cálculo correto do alvo da menina (−13 no pai) dando <strong>1,49 m</strong>, a interpretação (abaixo do piso de 1,51 m → baixa estatura adulta esperada) e o reconhecimento de que isso <strong>aponta</strong> familiar mas exige a velocidade para confirmar.</p>
    </aside>

    ${quiz('p12', 'Aplicação da fórmula ao caso e interpretação parcial.', [
      {
        stem: 'O alvo genético da Manu é 1,49 m (pai 1,61 m, mãe 1,50 m). O que esse valor indica?',
        alts: [
          { t: 'Estatura adulta normal esperada', correct: false, why: 'Ignora o piso: 1,49 m está abaixo de 1,51 m — não é estatura adulta normal esperada. Cai-se ao não comparar o alvo ao piso do sexo.' },
          { t: 'Alvo abaixo do piso feminino (1,51 m) → adulta com baixa estatura esperada, padrão compatível com baixa estatura familiar', correct: true, why: 'Certa. 1,49 m está abaixo do piso feminino de 1,51 m → aponta uma adulta com baixa estatura. Somado a pais baixos e curva sempre abaixo do Z-2, o padrão é compatível com baixa estatura familiar — mas ainda falta a velocidade para confirmar.' },
          { t: 'Diagnóstico fechado de causa patológica', correct: false, why: 'Fecha cedo demais e no sentido errado: alvo baixo aponta variante fisiológica (familiar), não patológica; e nenhum diagnóstico se fecha só com o alvo — falta a velocidade. Cai-se ao confundir "alvo baixo" com "doença".' },
          { t: 'Erro de cálculo, pois alvo não pode ser tão baixo', correct: false, why: 'Nega um resultado válido: o cálculo está correto (1,49 m) e o alvo pode cair abaixo do piso — é o que define a familiar. Cai-se ao assumir que o piso é um mínimo garantido.' },
        ]
      },
      {
        stem: 'Por que o alvo genético baixo da Manu, embora aponte para baixa estatura familiar, ainda não fecha o diagnóstico?',
        alts: [
          { t: 'Porque é preciso dosar o GH antes', correct: false, why: 'Inverte a investigação: dosar GH não é o passo que falta — o que falta é uma ferramenta clínica (velocidade), e o GH nem é a principal causa endócrina. Cai-se ao recorrer ao exame sofisticado em vez da ferramenta básica.' },
          { t: 'Porque falta a velocidade de crescimento, que é o que distingue variante fisiológica de causa patológica', correct: true, why: 'Certa. O alvo baixo é compatível com a familiar, mas a bifurcação fisiológico × patológico é feita pela velocidade de crescimento — uma causa patológica também poderia deixar a criança baixa. Sem a velocidade normal, o diagnóstico fica em aberto.' },
          { t: 'Porque o cálculo do alvo precisa ser refeito', correct: false, why: 'Duvida de um cálculo correto: o alvo (1,49 m) está certo; refazê-lo não é o que falta. Cai-se ao confundir "diagnóstico incompleto" com "cálculo errado".' },
          { t: 'Porque a idade óssea já excluiu a familiar', correct: false, why: 'Inventa um resultado de idade óssea: a idade óssea ainda não foi aplicada nesta etapa (e, quando for, na Manu será compatível, apontando familiar). Cai-se ao antecipar uma ferramenta que ainda não entrou no raciocínio.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 13 — E4 Achado típico / pegadinha ===================== */
  P.push(page('p13', 13, `
    ${tag('fisio', 'Ferramenta 4 · idade óssea')}
    ${chips(['cartilagem → osso', 'Rx mão e punho ESQ', 'atraso ≥ 2 anos', 'chave do constitucional'])}

    <aside class="opener opener--trap" aria-label="Achado de abertura">
      <svg class="opener__trap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="opener__trap-body">
        <p class="opener__trap-tag">Definição que cai em prova</p>
        <p class="opener__trap-text">A definição rigorosa de atraso de idade óssea é <strong>&gt; 2 DP</strong>; mas a banca dá as idades, não o desvio-padrão. A regra prática (uniforme): atraso quando a diferença for de <strong>2 anos OU MAIS</strong>.</p>
      </div>
    </aside>

    <h1 class="page-title">Idade óssea: o osso também tem idade</h1>

    <div class="prose">
      <h3 class="topic-h">Por que o osso "envelhece" (cartilagem → osso)</h3>
      <p>A quarta ferramenta é a <span class="term">idade óssea</span> — serve para avaliar a <strong>maturação do esqueleto</strong>. (Sim, o osso tem "idade".) A fisiologia: a criança cresce porque os <strong>ossos longos</strong> têm, nas extremidades, <span class="term">cartilagens de crescimento</span>; enquanto há cartilagem, o osso tem "para onde crescer". Em certa idade, o tecido cartilaginoso é <strong>substituído por tecido ósseo</strong> — e, sem cartilagem de crescimento, o osso longo não tem mais para onde crescer e a pessoa <span class="hl-bad">para de crescer</span>. A idade óssea olha exatamente para isso: o <strong>quanto há de tecido cartilaginoso comparado à formação de tecido ósseo</strong> em determinado local, gerando um dado <strong>objetivo</strong> sobre a maturação do esqueleto. E a maturação do esqueleto <span class="hl-good">traduz a maturação fisiológica do organismo</span> — é um espelho do "quão maduro" o corpo está.</p>

      <h3 class="topic-h">Como se lê: Rx de mão e punho esquerdos</h3>
      <p>O estudo da idade óssea é feito por uma radiografia <span class="term">padronizada de MÃO e PUNHO ESQUERDOS</span>. No raio-x, o <span class="hl-good">osso aparece branco</span>; as áreas de densidade diferente (não-osso) são <span class="term">cartilagem</span>. A radiografia é então <strong>comparada a um atlas</strong> que traz imagens de punho para cada idade — e assim se diz que aquela radiografia é <strong>compatível com determinada idade esperada</strong>. A leitura comparativa é intuitiva: punho com <strong>muita ossificação / muitos núcleos de ossificação</strong> = maturação maior (idade óssea <strong>avançada</strong>); punho com <strong>menos ossificação</strong> = idade óssea mais <strong>jovem</strong>. Quanto mais osso (branco) e menos cartilagem, mais "velho" é o esqueleto.</p>

      <h3 class="topic-h">O que importa: o atraso ≥ 2 anos</h3>
      <p>O esperado no normal é a <span class="hl-good">idade óssea compatível com a idade cronológica</span> (a idade real, do nascimento até hoje) — a maturação deve estar mais ou menos igual à idade. Não precisa ser <strong>exatamente</strong> igual (raramente é), mas <strong>compatível</strong>. O dado que importa buscar é o <span class="hl-bad">ATRASO</span> da idade óssea em relação à cronológica: idade óssea atrasada = paciente com lentificação / atraso da maturação. A definição rigorosa: atraso quando há <strong>mais de 2 desvios-padrão</strong> da idade óssea em relação à cronológica. Como as bancas não trazem desvio-padrão (trazem a idade da criança), usa-se a <span class="hl-good">regra prática uniforme para todas as idades</span>: idade óssea <strong>atrasada quando a diferença for de 2 anos OU MAIS</strong>. Exemplos: criança de <strong>10 anos com idade óssea de 8 anos</strong> → 2 anos de atraso → atrasada; criança de <strong>8 anos com idade óssea de 6 anos</strong> → atrasada também.</p>

      <h3 class="topic-h">A chave do atraso constitucional</h3>
      <p>A idade óssea atrasada é um dado <span class="hl-bad">importantíssimo para o atraso constitucional do crescimento</span> — cuja essência é exatamente a <strong>lentificação da maturação fisiológica</strong>. Faz todo sentido: se a fisiologia inteira está lenta, o esqueleto também amadurece devagar, e a idade óssea fica atrás da cronológica. É a assinatura radiológica do atraso constitucional. Na baixa estatura <strong>familiar</strong>, ao contrário, a idade óssea é <span class="hl-good">compatível</span> com a cronológica (não há motivo para atraso — a criança cresce dentro da própria fisiologia, é baixa porque tem que ser). Esse contraste — idade óssea <strong>atrasada</strong> (constitucional) × <strong>compatível</strong> (familiar) — é o que diferencia as duas variantes normais. Com as quatro ferramentas em mãos (estatura + velocidade de crescimento + alvo genético + idade óssea), constrói-se o raciocínio diagnóstico completo.</p>
    </div>

    ${svgPiso(13, { caption: 'compatível ou atrasada? — insira a idade cronológica e a idade óssea estimada: a ferramenta calcula a diferença e classifica em compatível (< 2 anos, verde) ou atrasada (≥ 2 anos, vermelho), lembrando que idade óssea atrasada + velocidade normal aponta atraso constitucional. Pré-carregada com a Manu (5 anos / IO 5 anos → compatível → familiar).', hint: 'Campos numéricos; a diferença e a classificação são anunciadas por leitor de tela.' })}

    ${med({
      file: 'p13-rx-idade-ossea-mao-punho-esq.jpg',
      alt: 'Radiografia da mão e punho esquerdos mostrando placas de crescimento abertas e núcleos de ossificação dos ossos do carpo, usada para estudo de idade óssea.',
      achado: 'A idade do osso — Rx de mão e punho ESQUERDOS (marcador "Sin"): fises abertas e núcleos do carpo visíveis. Na Manu, idade óssea = idade cronológica → afasta atraso constitucional.',
      fonte: 'Mikael Häggström · via Wikimedia Commons',
      licenca: 'CC0 (domínio público)'
    })}

    ${med({
      file: 'p13b-comparativo-maturacao-ossea.jpg',
      alt: 'Comparação de duas radiografias de mão: à esquerda a de uma criança, com poucos ossos do carpo ossificados e fises largas; à direita a de um adulto, com ossificação completa.',
      achado: 'Menos ossificada × mais ossificada — mão de criança (poucos núcleos do carpo, fises largas) × mão de adulto (carpos completos, fises fechadas). A maturação é o relógio: mais osso, mais idade.',
      fonte: 'Dr. W. W. Seibert, "The Human Body and Health" (Davison, 1908) · via Wikimedia Commons',
      licenca: 'Domínio público'
    })}

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>IO atrasada + VC normal</h4><p>= atraso constitucional (variante fisiológica).</p></div>
        <div class="dont-confuse__side"><h4>IO atrasada + VC alterada</h4><p>= causa patológica. Causas patológicas também atrasam a idade óssea — quem desempata é a velocidade. A idade óssea sozinha não fecha.</p></div>
      </div>
    </div>

    <aside class="finding">
      <p class="finding__label">Achado típico</p>
      <p>Na radiografia de mão e punho, <strong>muitos núcleos de ossificação = idade óssea avançada</strong>; poucos = atrasada. A comparação com atlas define a idade óssea estimada.</p>
    </aside>

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text">A definição rigorosa de atraso é <strong>&gt; 2 DP</strong>, mas a regra prática de prova (uniforme para todas as idades) é <strong>diferença ≥ 2 anos</strong> entre idade óssea e cronológica. Use a regra dos 2 anos quando a banca der as idades.</p>
      </div>
    </aside>

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>(1) método = Rx de mão e punho <strong>esquerdos</strong> comparado a atlas; (2) normal = idade óssea <strong>compatível</strong> com a cronológica; (3) atraso = <strong>≥ 2 anos</strong> (prática) ou > 2 DP (rigorosa); (4) idade óssea atrasada é a chave do <strong>atraso constitucional</strong>.</p>
    </aside>

    ${quiz('p13', 'Método, definição de atraso e a chave do atraso constitucional.', [
      {
        stem: 'Uma criança de 9 anos tem idade óssea estimada em 7 anos. Pela regra prática de prova, a idade óssea está:',
        alts: [
          { t: 'Compatível com a idade cronológica', correct: false, why: 'Ignora o corte: 2 anos de diferença atinge exatamente o limiar de atraso — não é compatível. Cai-se ao tratar "2 anos" como "pequena diferença aceitável".' },
          { t: 'Atrasada (diferença de 2 anos ou mais)', correct: true, why: 'Certa. A regra prática (uniforme): atraso quando a diferença é de 2 anos ou mais. 9 − 7 = 2 anos → idade óssea atrasada. (Atrasada + velocidade normal apontaria atraso constitucional.)' },
          { t: 'Avançada', correct: false, why: 'Inverte o sentido: idade óssea menor que a cronológica é atraso (esqueleto mais jovem), não avanço. Cai-se ao confundir a direção (avançada seria IO > cronológica).' },
          { t: 'Indeterminada, pois falta o desvio-padrão', correct: false, why: 'Exige o DP desnecessariamente: a regra prática existe justamente porque a banca dá as idades, não o DP — a diferença de 2 anos basta. Cai-se ao aplicar a definição rigorosa quando a prática resolve.' },
        ]
      },
      {
        stem: 'A idade óssea atrasada é a chave diagnóstica de qual condição, e o que é preciso para não confundir com causa patológica?',
        alts: [
          { t: 'Baixa estatura familiar; basta a idade óssea atrasada', correct: false, why: 'Erra a variante e dispensa o desempate: na familiar a idade óssea é compatível, não atrasada; e a idade óssea atrasada sozinha não fecha — precisa da velocidade. Cai-se ao trocar as duas variantes e ignorar a necessidade do desempate.' },
          { t: 'Atraso constitucional do crescimento; é preciso a velocidade de crescimento NORMAL para diferenciar de causa patológica (que também pode atrasar a idade óssea)', correct: true, why: 'Certa. Idade óssea atrasada é a assinatura do atraso constitucional (lentificação da maturação). Mas causas patológicas (desnutrição, endócrinas) também podem atrasar a idade óssea — então o desempate é a velocidade: normal = constitucional; alterada = patológica.' },
          { t: 'Acondroplasia; a relação SS/SI', correct: false, why: 'Troca o achado por outro quadro: a relação SS/SI é da acondroplasia, que não se diagnostica pela idade óssea atrasada. Cai-se ao associar qualquer achado genético à idade óssea, sem ancorar no atraso constitucional.' },
          { t: 'Síndrome de Turner; o cariótipo', correct: false, why: 'Troca o achado por outro quadro: o cariótipo é do Turner, que não se diagnostica pela idade óssea atrasada. Cai-se ao associar qualquer achado genético à idade óssea.' },
        ]
      },
      {
        stem: 'O estudo da idade óssea é feito por qual exame, e qual o achado esperado no normal?',
        alts: [
          { t: 'Rx de coluna; idade óssea sempre igual à cronológica', correct: false, why: 'Erra o sítio e absolutiza: não é coluna, e "sempre igual" é exigência irreal — o normal é compatível, não idêntico. Cai-se ao confundir "compatível" com "idêntico".' },
          { t: 'Rx de mão e punho esquerdos comparado a atlas; idade óssea compatível (não necessariamente idêntica) com a cronológica', correct: true, why: 'Certa. O método padronizado é a radiografia de mão e punho esquerdos, comparada a um atlas de maturação. No normal, a idade óssea é compatível com a cronológica — não precisa ser exatamente igual (raramente é), mas próxima.' },
          { t: 'Tomografia de crânio; idade óssea avançada', correct: false, why: 'Troca por método e achado errados: idade óssea não se avalia por TC de crânio, e o esperado no normal não é avanço. Cai-se ao chutar um exame de imagem qualquer.' },
          { t: 'Rx de joelho; idade óssea atrasada em 2 anos', correct: false, why: 'Erra o sítio e crava um anormal como esperado: o sítio é mão/punho, não joelho; e o esperado no normal é compatível, não atrasado em 2 anos. Cai-se ao misturar o método com a definição de atraso.' },
        ]
      },
    ])}

    ${notaValor('a idade óssea tem <strong>dois critérios coincidentes</strong> — rigoroso (<strong>&gt; 2 DP</strong> da cronológica) e prático (<strong>diferença ≥ 2 anos</strong>). Para prova vale a regra dos 2 anos (a banca dá as idades). É a mesma lógica do "−2 DP" que define o Z-2.')}
  `));

  /* ===================== PÁGINA 14 — E1 Pergunta central · HERÓI fluxograma ===================== */
  P.push(page('p14', 14, `
    ${tag('sys', 'Síntese · fluxograma de dois passos')}
    ${chips(['passo 1: a velocidade', 'passo 2A: IO + alvo', 'passo 2B: fenótipo → IMC → endócrino', 'a velocidade desempata'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Diante de qualquer criança com baixa estatura, qual a sequência de duas decisões que leva ao diagnóstico — e qual ferramenta comanda cada uma?</p>
    </section>

    <h1 class="page-title">O fluxograma diagnóstico em dois passos</h1>

    <div class="prose">
      <h3 class="topic-h">Passo 1: fisiológico × patológico (a velocidade decide)</h3>
      <p>O raciocínio tem <span class="hl-good">dois momentos de análise</span>. O <strong>passo 1</strong> responde apenas: a causa é <strong>fisiológica</strong> (variantes normais — baixa estatura familiar, atraso constitucional) ou <strong>patológica</strong> (desnutrição, endócrina, genética)? Esse passo usa duas ferramentas: a <strong>estatura</strong> (que confirma a baixa estatura) e a <span class="hl-bad">velocidade de crescimento</span> (a mais importante, que diz se é patológico). A regra:</p>
      <ul>
        <li>Baixa estatura + <span class="hl-good">velocidade NORMAL</span> (> 5 cm/ano no escolar) = <strong>variante normal</strong> (familiar ou constitucional).</li>
        <li>Baixa estatura + <span class="hl-bad">velocidade ALTERADA</span> (< 5 cm/ano) = <strong>causa PATOLÓGICA</strong>.</li>
      </ul>
      <p>A velocidade é a chave que abre uma de duas portas. Tudo o que vem depois depende de qual porta se abriu.</p>

      <h3 class="topic-h">Passo 2A: dentro das variantes normais (idade óssea + alvo)</h3>
      <p>Se o passo 1 levou às <strong>variantes normais</strong> (velocidade normal), o passo 2A diferencia <strong>baixa estatura familiar × atraso constitucional</strong>, usando <span class="term">idade óssea e alvo genético</span>:</p>
      <ul>
        <li><span class="hl-good">Baixa estatura familiar</span> = velocidade normal + <strong>idade óssea COMPATÍVEL</strong> com a cronológica (não há motivo para atraso — a criança cresce dentro da própria fisiologia) + <strong>pais baixos / alvo genético baixo</strong>.</li>
        <li><span class="hl-good">Atraso constitucional</span> = velocidade normal + <strong>idade óssea ATRASADA</strong> (≥ 2 anos, pela lentificação da maturação) + <strong>pais de altura normal / alvo genético normal</strong> (criança baixa agora, adulto de altura normal ao amadurecer).</li>
      </ul>
      <p>A idade óssea é o que desempata: compatível → familiar; atrasada → constitucional.</p>

      <h3 class="topic-h">Passo 2B: dentro das patológicas (fenótipo → IMC → endócrino)</h3>
      <p>Se o passo 1 levou às <strong>causas patológicas</strong> (velocidade alterada), o passo 2B segue uma cascata de decisões:</p>
      <ol>
        <li><strong>Menina?</strong> Pensar primeiro no <span class="hl-bad">Turner</span> — a doença genética importantíssima de baixa estatura. O ideal é <strong>solicitar cariótipo</strong>, mais ainda se houver estigma (hipertelorismo mamário, pescoço alado).</li>
        <li><strong>Alteração fenotípica?</strong> Qualquer paciente com baixa estatura + velocidade anormal + <strong>algo estranho na morfologia</strong> → suspeitar de <strong>causa GENÉTICA</strong> e investigar.</li>
        <li><strong>Sem alteração fenotípica?</strong> Restam duas caixinhas — <strong>desnutrição</strong> e <strong>endocrinopatia</strong> — e decide-se pelo <span class="term">IMC</span>:
          <ul>
            <li>Paciente <span class="hl-bad">EMAGRECIDO</span> → <strong>desnutrição</strong> como causa.</li>
            <li>Paciente <span class="hl-warn">EUTRÓFICO ou OBESO</span> → não é desnutrição, é <strong>processo ENDÓCRINO</strong> (e aqui lembrar que a principal causa é o <strong>hipotireoidismo</strong> → dosar <strong>TSH e T4 livre</strong> já no início).</li>
          </ul>
        </li>
      </ol>

      <h3 class="topic-h">A velocidade que desempata</h3>
      <p>Uma atenção fina fecha o fluxograma e evita a confusão mais traiçoeira do tema. A baixa estatura <strong>patológica</strong> (por desnutrição ou endócrina) <strong>PODE cursar com idade óssea atrasada</strong> — igual ao atraso constitucional. Como não confundir? Pela <span class="hl-bad">velocidade de crescimento</span>: no <strong>atraso constitucional</strong> (fisiológico) a velocidade é <strong>NORMAL</strong>; na <strong>causa patológica</strong> ela é <strong>ALTERADA</strong>. A velocidade <strong>desempata</strong>. É por isso que ela é a chave do passo 1 e a guardiã contra o erro: a idade óssea atrasada não decide sozinha — a velocidade é quem diz se o atraso é fisiológico (constitucional) ou patológico.</p>
    </div>

    <figure class="figure-svg figure-svg__embed">
      <div class="hero-stage figure-svg__stage" id="heroFLX-stage" data-hs-stage="heroFLX">
        ${hero('p14')}
      </div>
      <figcaption><strong>Síntese —</strong> o fluxograma diagnóstico mestre em dois passos. A velocidade abre o passo 1 (normal → fisiológico / alterada → patológico); a idade óssea + alvo desempatam as normais (2A); fenótipo → IMC → endócrino desempatam as patológicas (2B). Navegue cada nó de decisão; a velocidade é destacada como chave e desempate.</figcaption>
    </figure>

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text">A <strong>velocidade abre a porta</strong> (normal → fisiológico / alterada → patológico); a <strong>idade óssea desempata as normais</strong> (compatível → familiar / atrasada → constitucional); o <strong>fenótipo e o IMC desempatam as patológicas</strong> (fenótipo → genético; emagrecido → desnutrição; eutrófico/obeso → endócrino).</p>
    </aside>

    ${med({
      file: 'p2-curva-meninas-zscore.png',
      alt: 'Curva oficial da OMS de estatura-para-idade para meninas com curvas de escore-Z, base documental da avaliação de baixa estatura.',
      achado: 'O caminho diagnóstico parte da curva — confirmar a baixa estatura (< Z-2 / P3) na curva oficial da OMS é a entrada do fluxograma, antes da velocidade decidir o ramo. Ancoragem documental das quatro ferramentas.',
      fonte: 'WHO Growth Reference 5–19 years (z-scores), 2007 · World Health Organization',
      licenca: 'OMS — uso educacional com atribuição'
    })}

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>IO atrasada não é exclusiva</h4><p>Causas patológicas também atrasam a idade óssea, não só o atraso constitucional.</p></div>
        <div class="dont-confuse__side"><h4>A velocidade desempata</h4><p>Normal = constitucional; alterada = patológica. Nunca diagnostique constitucional só pela idade óssea atrasada.</p></div>
      </div>
    </div>

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>(1) passo 1 pela velocidade (fisiológico × patológico); (2) passo 2A pela idade óssea + alvo (familiar × constitucional); (3) passo 2B pela cascata fenótipo → IMC → endócrino (com Turner na menina); (4) a velocidade como desempate entre atraso constitucional e patológico de idade óssea atrasada.</p>
    </aside>

    ${quiz('p14', 'O algoritmo de dois passos e a velocidade como desempate.', [
      {
        stem: 'No fluxograma de baixa estatura, qual ferramenta comanda o passo 1 (fisiológico × patológico) e como?',
        alts: [
          { t: 'A idade óssea: atrasada = patológico', correct: false, why: 'Usa a ferramenta do passo 2A: a idade óssea diferencia as variantes normais entre si (familiar × constitucional), não o passo 1 — e atraso de IO ocorre tanto no constitucional (fisiológico) quanto em patológicas. Cai-se ao antecipar a ferramenta de desempate para a decisão inicial.' },
          { t: 'A velocidade de crescimento: normal = variante fisiológica; alterada = causa patológica', correct: true, why: 'Certa. O passo 1 é comandado pela velocidade de crescimento: normal (> 5 cm/ano) → variante fisiológica; alterada (< 5 cm/ano) → causa patológica. É a chave que abre uma de duas portas.' },
          { t: 'O alvo genético: baixo = patológico', correct: false, why: 'Confunde alvo com natureza: alvo baixo aponta familiar (fisiológico), não patológico — e o alvo não decide fisiológico × patológico. Cai-se ao associar "baixo" a "doente".' },
          { t: 'O IMC: baixo = fisiológico', correct: false, why: 'Usa o IMC no passo errado: o IMC entra no passo 2B (dentro das patológicas, para separar desnutrição de endócrino), não no passo 1. Cai-se ao saltar uma ferramenta de etapa posterior para a inicial.' },
        ]
      },
      {
        stem: 'Uma criança patológica (velocidade alterada), sem alteração fenotípica, eutrófica. Qual o próximo passo do raciocínio?',
        alts: [
          { t: 'Diagnosticar atraso constitucional', correct: false, why: 'Escolhe uma variante fisiológica: a criança tem velocidade alterada → é patológica, não fisiológica; constitucional está excluído. Cai-se ao ignorar que a velocidade alterada já fechou a porta das variantes normais.' },
          { t: 'Investigar causa endócrina (eutrófico/obeso afasta desnutrição), lembrando o hipotireoidismo e dosando TSH e T4 livre', correct: true, why: 'Certa. No passo 2B, sem alteração fenotípica, decide-se pelo IMC: emagrecido → desnutrição; eutrófico ou obeso → processo endócrino. Como a principal causa endócrina é o hipotireoidismo, dosa-se TSH e T4 livre no início.' },
          { t: 'Solicitar cariótipo imediatamente', correct: false, why: 'Pula etapas: o cariótipo é o passo da menina com suspeita de Turner ou de alteração fenotípica — aqui não há fenótipo alterado e o IMC já direciona ao endócrino. Cai-se ao disparar o exame genético sem o gatilho (sexo + fenótipo).' },
          { t: 'Diagnosticar baixa estatura familiar', correct: false, why: 'Escolhe uma variante fisiológica: velocidade alterada exclui familiar e constitucional — o ramo é patológico. Cai-se ao ignorar que o passo 1 já apontou patológico.' },
        ]
      },
      {
        stem: 'Tanto o atraso constitucional quanto algumas causas patológicas podem cursar com idade óssea atrasada. O que desempata entre eles?',
        alts: [
          { t: 'O alvo genético', correct: false, why: 'Usa um dado que não desempata aqui: o alvo (baixo/normal) ajuda a separar familiar de constitucional, mas não distingue constitucional de patológico — os dois podem ter alvos variados. Cai-se ao aplicar o alvo a uma decisão que é da velocidade.' },
          { t: 'A velocidade de crescimento: normal no atraso constitucional (fisiológico), alterada na causa patológica', correct: true, why: 'Certa. A idade óssea atrasada não é exclusiva do atraso constitucional — patológicas também atrasam. O desempate é a velocidade: normal → constitucional (fisiológico); alterada → patológico. Por isso a velocidade é a guardiã contra esse erro.' },
          { t: 'A idade óssea, repetida após 6 meses', correct: false, why: 'Só atrasa a decisão: repetir a idade óssea não responde se a causa é fisiológica ou patológica — a velocidade resolve diretamente. Cai-se ao buscar mais do mesmo dado ambíguo.' },
          { t: 'O sexo do paciente', correct: false, why: 'É insuficiente: o sexo orienta a suspeita de Turner, mas não desempata constitucional × patológico de idade óssea atrasada. Cai-se ao usar um dado de outra ramificação.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 15 — E3 Caso clínico · HERÓI curvas + Manu ===================== */
  P.push(page('p15', 15, `
    ${tag('case', 'Fechamento · o veredito da Manu')}
    ${chips(['sindrômico: < P3', 'VC 7 → fisiológica', 'IO compatível → familiar', 'as três curvas'])}

    <article class="opener opener--case" aria-label="Caso clínico de abertura">
      <span class="opener__case-header">De volta à Manu · as duas perguntas</span>
      <p class="opener__case-quote">Manu, 5 anos, 99 cm, eutrófica, sem puberdade, pais baixos (mãe 1,50 m, pai 1,61 m), idade óssea compatível com 5 anos. Com o fluxograma na mão, as duas perguntas do caso se respondem ponto a ponto.</p>
      <dl class="case-card__meta">
        <dt>Sindrômico</dt><dd>99 cm aos 5 anos, < P3 / Z−2 = baixa estatura</dd>
        <dt>Velocidade</dt><dd>(99 − 95,5) × 2 = 7 cm/ano (> 5 → normal → fisiológica)</dd>
        <dt>Idade óssea</dt><dd>compatível com 5 anos (= cronológica) → familiar</dd>
        <dt>Alvo</dt><dd>1,49 m (abaixo do P3) + pais baixos → confirmam</dd>
      </dl>
    </article>

    <h1 class="page-title">As curvas e o veredito da Manu</h1>

    <div class="prose">
      <p>Volta a Manu — a menina de 5 anos, 99 cm, eutrófica, sem puberdade, pais baixos (mãe 1,50 m, pai 1,61 m), idade óssea compatível com 5 anos. Com o fluxograma na mão, as duas perguntas do caso se respondem ponto a ponto.</p>

      <h3 class="topic-h">Pergunta 1: o sindrômico (baixa estatura)</h3>
      <p><strong>Pergunta 1 — qual o diagnóstico sindrômico?</strong> Manu tem <span class="hl-bad">99 cm aos 5 anos, abaixo do percentil 3 / escore-Z −2</span>. Aplicação direta da definição: estatura abaixo do P3 = <strong>baixa estatura</strong>. Esse é o diagnóstico sindrômico — o ponto de partida confirmado. Mas, como sabemos, isso ainda não diz o tipo; é preciso a etiologia.</p>

      <h3 class="topic-h">Pergunta 2: a etiologia (VC 7 → fisiológica)</h3>
      <p><strong>Pergunta 2 — qual a etiologia?</strong> Aplica-se o <strong>passo 1</strong> do fluxograma — a <strong>velocidade de crescimento</strong>. Manu tem 99 cm aos 5 anos e tinha 95,5 cm aos 4 anos e meio → ganho de <span class="term">3,5 cm em 6 meses → ×2 = 7 cm/ano</span>. E <span class="hl-good">7 cm/ano é maior que 5 cm/ano</span> → velocidade de crescimento <strong>NORMAL</strong> → Manu tem uma <strong>variante fisiológica</strong> do crescimento (não patológica). (A velocidade de 7 está acima dos dois cortes — > 5 do fluxograma e ≥ 4 do alarme —, então não há ambiguidade.) O passo 1 abriu a porta das variantes normais.</p>

      <h3 class="topic-h">O desempate: idade óssea compatível</h3>
      <p>Agora o <strong>passo 2A</strong> — diferenciar familiar × constitucional pela <strong>idade óssea</strong>. A idade óssea da Manu é <span class="hl-good">compatível com 5 anos</span> (= idade cronológica), ou seja, <strong>compatível, não atrasada</strong>. Isso aponta <strong>baixa estatura familiar</strong> (no atraso constitucional ela estaria <strong>atrasada</strong> ≥ 2 anos). Some-se o <strong>alvo genético de 1,49 m</strong> (abaixo do P3) e os <strong>pais baixos</strong>: tudo converge. O fechamento da etiologia: <span class="hl-good">velocidade normal + idade óssea compatível com a cronológica + pais baixos / alvo abaixo do P3 → diagnóstico de BAIXA ESTATURA FAMILIAR</span>. Manu é baixa porque foi programada para ser — e isso é uma variante fisiológica, não uma doença.</p>

      <h3 class="topic-h">As três curvas lado a lado, com a Manu</h3>
      <p>Vendo as três curvas juntas, o lugar da Manu fica visualmente óbvio:</p>
      <ul>
        <li><span class="hl-good">Baixa estatura familiar</span> (a curva da Manu): sempre <strong>abaixo do Z-2</strong>, regular, rumo a um alvo baixo. Idade óssea compatível.</li>
        <li><span class="hl-good">Atraso constitucional</span>: começa abaixo do Z-2 e <strong>sobe</strong> ao amadurecer, rumo a um alvo normal. Idade óssea atrasada.</li>
        <li><strong>Normal</strong>: dentro da faixa entre Z-2 e Z+2 desde sempre.</li>
      </ul>
      <p>A curva da Manu acompanha o canal baixo e estável da <strong>familiar</strong> — não sobe como a constitucional, não está na faixa normal. Ela cresce na velocidade certa (7 cm/ano), mas no canal que herdou. É o retrato da variante fisiológica: baixa, saudável, e exatamente onde deveria estar.</p>
    </div>

    <figure class="figure-svg figure-svg__embed">
      <div class="hero-stage figure-svg__stage" id="heroCRV-stage" data-hs-stage="heroCRV">
        ${hero('p15')}
      </div>
      <figcaption><strong>Síntese —</strong> as três curvas (familiar × constitucional × normal) com a Manu sobreposta (95,5 cm aos 4,5 anos; 99 cm aos 5 anos; alvo 1,49 m). Acenda cada traçado para comparar; ative a Manu para o veredito: baixa estatura familiar (VC 7 cm/ano normal + idade óssea compatível + alvo 1,49 m + pais baixos).</figcaption>
    </figure>

    <aside class="practice">
      <p class="practice__label">O que diferencia o aluno avançado</p>
      <p>O iniciante vê "criança baixa" e dispara exames (GH, cariótipo); o avançado confirma o sindrômico (P3/Z-2), calcula a velocidade (7 → fisiológica), faz a idade óssea (compatível → familiar) e o alvo (1,49 m → coerente), e fecha <strong>baixa estatura familiar</strong> sem submeter a Manu a investigação desnecessária. As duas perguntas da Manu são, juntas, o resumo de tudo o que você domina sobre baixa estatura.</p>
    </aside>

    ${med({
      file: 'p15-curva-oms-meninas-familiar.jpg',
      alt: 'Curva oficial da OMS de estatura por idade para meninas, base para representar o canal de crescimento baixo e estável da baixa estatura familiar.',
      achado: 'A curva da Manu — canal baixo, porém estável e paralelo às linhas; cresce no piso, mas não despenca. É o padrão da baixa estatura familiar sobre a curva oficial OMS/SUS (o canal é overlay didático sobre a curva real).',
      fonte: 'WHO Growth Reference 5–19 years (percentis), 2007 · adotada pelo SISVAN/SUS · World Health Organization',
      licenca: 'OMS — uso educacional com atribuição'
    })}

    <aside class="op-summary">
      <p class="op-summary__label">Resumo operacional</p>
      <p>Manu = baixa estatura (sindrômico, < P3) + variante fisiológica (VC 7 cm/ano > 5) + idade óssea compatível + alvo 1,49 m + pais baixos = <strong>BAIXA ESTATURA FAMILIAR</strong>.</p>
    </aside>

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>O caso da Manu é o modelo de questão integrada — sindrômico pela estatura (< P3), etiologia pelo passo 1 (VC 7 → fisiológica) e passo 2A (idade óssea compatível → familiar), com o alvo (1,49 m) e os pais baixos confirmando.</p>
    </aside>

    ${quiz('p15', 'Aplicação do fluxograma completo ao caso e leitura das curvas.', [
      {
        stem: 'Manu cresceu de 95,5 cm (4,5 anos) para 99 cm (5 anos). Qual sua velocidade de crescimento e o que ela indica?',
        alts: [
          { t: '3,5 cm/ano; velocidade alterada', correct: false, why: 'Esquece a anualização: 3,5 cm foi o ganho em 6 meses — precisa multiplicar por 2 (= 7 cm/ano); 3,5 cm/ano seria metade do real. Cai-se ao usar o ganho do intervalo direto sem converter para o ano.' },
          { t: '7 cm/ano; velocidade normal → variante fisiológica', correct: true, why: 'Certa. Ganho de 3,5 cm em 6 meses → ×2 = 7 cm/ano. Como 7 > 5 (corte do fluxograma) → velocidade normal → variante fisiológica. Inclusive acima dos dois cortes (> 5 e ≥ 4), sem ambiguidade.' },
          { t: '3,5 cm/ano; velocidade normal', correct: false, why: 'Esquece a anualização e ainda interpreta mal: 3,5 cm/ano (sem o ×2) é metade do real, e estaria abaixo de 5. Cai-se ao não converter o ganho de 6 meses para o ano.' },
          { t: '7 cm/ano; velocidade alterada → patológica', correct: false, why: 'Acerta o número, erra a interpretação: 7 cm/ano é normal (> 5) → fisiológica, não patológica. Cai-se ao anualizar certo mas inverter o veredito do corte.' },
        ]
      },
      {
        stem: 'Qual o diagnóstico etiológico final da Manu, e qual achado diferencia da outra variante fisiológica?',
        alts: [
          { t: 'Atraso constitucional; idade óssea atrasada', correct: false, why: 'Inverte o achado da idade óssea: a Manu tem idade óssea compatível, não atrasada — atrasada seria constitucional, que não é o caso. Cai-se ao trocar compatível por atrasada e cair na outra variante.' },
          { t: 'Baixa estatura familiar; idade óssea compatível com a cronológica (no atraso constitucional estaria atrasada)', correct: true, why: 'Certa. Velocidade normal (7 cm/ano) → variante fisiológica; idade óssea compatível (5 anos = cronológica) → baixa estatura familiar. No atraso constitucional a idade óssea estaria atrasada (≥ 2 anos) — esse é o achado que diferencia. Alvo baixo (1,49 m) e pais baixos confirmam.' },
          { t: 'Causa endócrina; TSH elevado', correct: false, why: 'Ignora a velocidade normal: causa endócrina é patológica (velocidade alterada); a Manu tem velocidade normal, o que exclui o ramo patológico inteiro. Cai-se ao saltar para causas patológicas ignorando que o passo 1 já apontou fisiológico.' },
          { t: 'Síndrome de Turner; cariótipo 45,X', correct: false, why: 'Ignora a velocidade normal: Turner é patológica (velocidade alterada); a velocidade normal da Manu exclui o ramo patológico. Cai-se ao saltar para a causa genética sem checar o passo 1.' },
        ]
      },
      {
        stem: 'Por que a Manu NÃO precisou de dosagem de GH nem de cariótipo para o diagnóstico?',
        alts: [
          { t: 'Porque esses exames não existem na pediatria', correct: false, why: 'É factualmente falsa: os exames existem e são úteis — só não são indicados aqui, porque o ramo é fisiológico. Cai-se ao confundir "não indicado" com "inexistente".' },
          { t: 'Porque o fluxograma fechou o diagnóstico clinicamente: velocidade normal (fisiológica) + idade óssea compatível + alvo baixo + pais baixos = baixa estatura familiar, sem critério para investigação patológica', correct: true, why: 'Certa. A velocidade normal já colocou a Manu no ramo fisiológico — não há critério para investigar causas patológicas (GH, cariótipo). A idade óssea compatível, o alvo baixo e os pais baixos fecham baixa estatura familiar com as ferramentas clínicas. Investigar mais seria desnecessário.' },
          { t: 'Porque a mãe recusou os exames', correct: false, why: 'Inventa um dado: não há recusa no caso — o motivo é clínico (diagnóstico fechado pelas ferramentas), não logístico. Cai-se ao buscar uma explicação externa para uma decisão clínica.' },
          { t: 'Porque a idade da Manu é baixa demais para esses exames', correct: false, why: 'Inventa uma restrição etária: não há limite de idade que impeça os exames; o que dispensa é o diagnóstico já fechado pela via fisiológica. Cai-se ao criar uma barreira inexistente em vez de reconhecer o raciocínio.' },
        ]
      },
    ])}

    <div class="prose">
      <h3 class="topic-h">Fechamento</h3>
      <p>Você agora reconhece, classifica e investiga a baixa estatura do início ao fim — separa o fisiológico do patológico pela velocidade, diferencia as variantes pela idade óssea e pelo alvo, e navega as causas patológicas pelo fenótipo e pelo IMC, sem cair nas pegadinhas (o GH que não é a principal, os dois cortes de velocidade, a idade óssea que não desempata sozinha).</p>
    </div>
  `));

  return P;
}
