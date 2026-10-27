/* _pages.mjs — conteúdo autoral das 11 páginas da Aula 04 "Obesidade infantil".
   Texto-aluno = canon do prompt-final (§6). Tópicos visíveis como <h3 class="topic-h">.
   Anti-metalinguagem: voz de professor direto ao aluno; o texto É o conteúdo. Cross-ref de
   CONTEÚDO (caso da Manu/Maju, IMC, classificação nutricional, desnutrição) nomeia o conteúdo,
   nunca o veículo.
   Pisos (P1-P10) e figura-herói (P11 painel-mestre) embutidos inline pelos helpers do _build
   (markup parseado, script self-contained roda sozinho — sem engine de herói no aula.js).
   Quiz gold (3 camadas) renderizado FIEL ao prompt-final.
   Eixo cromático = escala de gravidade: verde normal → âmbar sobrepeso/risco → vermelho
   obesidade → preto obesidade grave. Cada página tem chips/tópicos PRÓPRIOS. */

export function buildPages({ med, svgPiso, svgHero, notaBanca, notaValor, quiz, tag, chips, page }) {
  const P = [];

  /* ===================== PÁGINA 1 — E3 Caso clínico ===================== */
  P.push(page('p1', 1, `
    ${tag('case', 'Caso-âncora · Maju')}
    ${chips(['Maju, 5 anos', 'irmã da Manu', '"gordinha"', 'peso + altura', 'IMC a calcular'])}

    <article class="opener opener--case" aria-label="Caso clínico de abertura">
      <span class="opener__case-header">Puericultura · pré-escolar · a segunda dúvida da mesma consulta</span>
      <p class="opener__case-quote">Na mesma consulta da <strong>Manu</strong>, a mãe trouxe uma segunda preocupação: a outra filha, a <strong>Maju</strong> (irmã gêmea), que ela acha "muito gordinha". Trouxe <strong>peso e altura objetivos</strong> — então dá para classificar. Os números fecham o caso mais à frente.</p>
      <dl class="case-card__meta">
        <dt>Paciente</dt><dd>Maju, 5 anos · irmã gêmea da Manu</dd>
        <dt>Queixa</dt><dd>a mãe acha que está "tão gordinha"</dd>
        <dt>Dados trazidos</dt><dd>peso e altura objetivos (a conta do IMC é feita à mão)</dd>
        <dt>Lógica</dt><dd>queixa subjetiva → resposta numérica (IMC plotado na curva por idade)</dd>
        <dt>Onde entra</dt><dd>obesidade = o último dos distúrbios do crescimento</dd>
      </dl>
    </article>

    <h1 class="page-title">Maju: a irmã da Manu que a mãe acha "gordinha"</h1>

    <div class="prose">
      <h3 class="topic-h">A segunda dúvida da mesma consulta</h3>
      <p>A consulta da <span class="term">Manu</span> não terminou na avaliação da baixa estatura. Na mesma sala, a mãe trouxe uma <strong>segunda preocupação</strong> — desta vez sobre a outra filha, a <span class="term">Maju</span>, irmã gêmea da Manu. A queixa veio em palavras simples: a mãe quer saber por que a Maju está <span class="hl-warn">"tão gordinha"</span>. É uma das perguntas mais comuns do ambulatório de pediatria — e, como toda queixa de peso, não se responde no olho. Se há uma filha que veio por ser baixa demais e outra que vem por parecer pesada demais, as duas pontas dos <strong>distúrbios do crescimento</strong> se encontram na mesma família.</p>

      <h3 class="topic-h">O que resolve a queixa: peso, altura e o IMC</h3>
      <p>A boa notícia é que a mãe trouxe <span class="term">dados objetivos de peso e altura</span> da Maju. Com peso e estatura na mão, não se fica no "acho que está gordinha": calcula-se o <span class="term">índice de massa corporal (IMC)</span> — e muitas vezes essa conta é feita <strong>à mão</strong>, ali mesmo. É a partir desse número que se classifica o <span class="term">distúrbio nutricional</span> da criança e se decide se há, de fato, um problema ou não. Guarde a lógica: a queixa é subjetiva ("gordinha"), mas a resposta é numérica (IMC plotado na curva). Os números da Maju vão fechar o caso mais à frente.</p>

      <h3 class="topic-h">Onde a Maju entra: o último distúrbio do crescimento</h3>
      <p>O quadro em foco aqui é o de <span class="hl-bad">obesidade</span> — o <strong>último</strong> dos distúrbios relacionados ao crescimento. Depois de reconhecer a baixa estatura (a história da Manu) e a desnutrição, fecha-se o ciclo com a outra ponta da balança: a criança que ganha peso demais para o tamanho dela. A Maju é o caso que vai amarrar tudo — peso, altura, IMC, classificação por faixa etária — e mostrar, no fim, que o mesmo número pode significar coisas diferentes dependendo de quem o lê e da idade de quem o carrega.</p>
    </div>

    ${svgPiso(1, { caption: 'a ficha da Maju — clique em cada dado (peso, altura, idade, IMC ainda como "?", queixa da mãe, irmã da Manu) e leia o que ele serve e em que momento vai ser usado: o peso e a altura entram no IMC; a idade define a faixa de classificação; o IMC é o dado objetivo que resolve a queixa.', hint: 'Clique, toque ou Tab + Enter; cada dado revela seu papel no raciocínio.' })}

    ${med({
      file: 'p1-afericao-puericultura.jpg',
      alt: 'Enfermeira aferindo peso e altura de uma criança pré-escolar numa balança de coluna com régua de estatura, em consulta de saúde infantil.',
      achado: '<strong>Aferição antropométrica em puericultura</strong> — criança em idade pré-escolar na balança de coluna, com a régua de altura (estadiômetro) abaixada sobre a cabeça; peso e estatura na mesma consulta. É daqui que sai o IMC: sem medir, não há diagnóstico nutricional.',
      fonte: 'Nurse weighing child, U.S. Children\'s Bureau / U.S. National Library of Medicine, via Wikimedia Commons',
      licenca: 'Domínio público'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>A queixa de "criança gordinha" chega todo dia ao consultório, e o erro frequente é responder pela aparência (tranquilizar ou assustar a família no olho) em vez de medir, calcular o IMC e plotar. A Maju ensina a sequência certa desde a primeira frase: dado objetivo antes de conclusão.</p>
    </aside>

    ${quiz('p1', 'Ancoragem do raciocínio: a queixa subjetiva que se resolve por número.', [
      {
        stem: 'A mãe diz que a Maju está "muito gordinha". Qual é a conduta correta para responder objetivamente a essa queixa?',
        alts: [
          { t: 'Tranquilizar a mãe se a criança "não parece" obesa ao exame', correct: false, why: 'Decide pela ectoscopia: julgar "no olho" é justamente o erro que este raciocínio desmonta — a impressão visual não fecha nem afasta obesidade. <em>Por que cair na A</em>: confunde-se "parecer" com "ser", ignorando que o corte é numérico.' },
          { t: 'Aferir peso e altura, calcular o IMC e plotá-lo na curva por idade', correct: true, why: 'Certa. A virada do raciocínio inteiro está aqui: obesidade é <strong>diagnóstico numérico</strong>. A queixa subjetiva ("gordinha") só se resolve com peso, altura e IMC plotado na curva por idade — é o dado objetivo que classifica e diz se há ou não distúrbio.' },
          { t: 'Solicitar de imediato lipidograma e glicemia', correct: false, why: 'Pula etapas: lipidograma e glicemia são investigação de <strong>comorbidade</strong> — entram depois de classificar e em faixas etárias próprias (lipidograma > 2 anos), não como primeiro passo. <em>Por que cair na C</em>: antecipa-se a investigação de comorbidade ao lugar do diagnóstico.' },
          { t: 'Encaminhar para nutrólogo antes de qualquer avaliação', correct: false, why: 'Terceiriza o raciocínio: a classificação inicial é do próprio pediatra, com peso/altura/IMC — encaminhar sem avaliar inverte a ordem. <em>Por que cair na D</em>: troca-se a conduta básica por uma referência precoce.' },
        ]
      },
      {
        stem: 'A partir de quais dados se calcula o IMC e se classifica o distúrbio nutricional da Maju?',
        alts: [
          { t: 'Apenas o peso da criança', correct: false, why: 'Usa só metade da conta: peso isolado não dá IMC nem classifica — sem a estatura ao quadrado no denominador, o número não existe. <em>Por que cair na A</em>: simplifica-se o IMC a "quanto a criança pesa".' },
          { t: 'Peso e estatura da criança', correct: true, why: 'Certa. O IMC se calcula com peso e estatura (peso ÷ estatura²); é esse número, plotado na curva por idade, que classifica o distúrbio nutricional. Os dados objetivos que a mãe trouxe são exatamente o que basta para classificar.' },
          { t: 'Peso, estatura e circunferência abdominal', correct: false, why: 'Acrescenta um dado de etapa posterior: a circunferência abdominal entra na síndrome metabólica (> 10 anos), não no cálculo do IMC. <em>Por que cair na C</em>: mistura-se um parâmetro de comorbidade com a fórmula básica.' },
          { t: 'A impressão clínica do examinador', correct: false, why: 'Recai na ectoscopia: impressão clínica não calcula IMC — é o oposto do dado objetivo. <em>Por que cair na D</em>: volta-se a julgar no olho.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 2 — E2 Dado impactante ===================== */
  P.push(page('p2', 2, `
    ${tag('sys', 'Epidemiologia · mecanismo · nomenclatura')}
    ${chips(['epidemia', 'balanço energético +', 'hipercalórico + sedentarismo', 'primária = exógena'])}

    <figure class="opener opener--stat" aria-label="Dado de abertura">
      <span class="opener__number">+</span>
      <p class="opener__context">Hoje, no consultório pediátrico, chega <strong>muito mais obesidade e sobrepeso</strong> do que desnutrição grave. A epidemia inverteu a balança — e a causa, na imensa maioria, <strong>vem de fora</strong>.</p>
    </figure>

    <h1 class="page-title">A epidemia que chega ao consultório — e por que ela é "de fora"</h1>

    <div class="prose">
      <h3 class="topic-h">Hoje é a obesidade que lota a sala</h3>
      <p>A obesidade é, hoje, uma <span class="hl-bad">epidemia</span>. A desnutrição grave continua preocupando muito — <span class="term">marasmo</span> e <span class="term">kwashiorkor</span> seguem acontecendo —, mas a realidade diária do consultório pediátrico inverteu-se: é <strong>muito mais comum</strong> receber crianças e adolescentes com <span class="hl-bad">obesidade (e sobrepeso)</span> do que crianças com desnutrição grave de fato. As duas pontas da balança nutricional coexistem na população, mas a que mais chega à sala de espera, no dia a dia, é o excesso de peso. É contra esse pano de fundo que se aprende a classificar e investigar a criança obesa.</p>

      <h3 class="topic-h">O balanço energético positivo</h3>
      <p>A causa moderna tem uma mecânica simples e direta. De um lado, <span class="hl-bad">excesso de ingestão</span> de alimentos hipercalóricos (ultraprocessados); do outro, uma criança <span class="hl-bad">muito sedentária</span> — na frente de telas, sem atividade física. Soma-se ingestão alta com gasto baixo e fecha-se um <span class="term">balanço energético muito positivo</span>: entra muito mais energia do que se gasta. O excedente não some — é <strong>acumulado como gordura</strong>. É esse desequilíbrio entre o que se come e o que se gasta que leva ao quadro de obesidade na grande maioria das crianças.</p>

      <h3 class="topic-h">Primária = exógena: vem de fora</h3>
      <p>A criança fica obesa, na imensa maioria das vezes, pelo <strong>mesmo motivo do adulto</strong>: a <span class="term">obesidade primária</span>. Ela tem um segundo nome que carrega a explicação inteira — <span class="term">obesidade exógena</span>. "Exógena" porque <strong>vem de fora</strong>: o problema é o excesso de ingestão de alimentos hipercalóricos, não um processo interno do corpo da pessoa. Primária e exógena são o mesmo: a obesidade do balanço energético positivo, a causa <strong>mais comum</strong> de obesidade na criança — a mesma do adulto. Guardar o par "primária = exógena = vem de fora" resolve metade das questões de classificação etiológica.</p>

      <h3 class="topic-h">Por que para prova isso é simples</h3>
      <p>A obesidade é um tema <strong>complexo</strong> — existem livros inteiros sobre ela. Mas há uma boa notícia para quem estuda: para prova, o número de informações a saber é <span class="hl-good">bastante limitado</span>. Poucas informações diretas — a causa primária/exógena, a classificação por faixa etária, o mapa comorbidade-exame, a escada de tratamento — resolvem a <strong>totalidade</strong> das questões. Não é preciso dominar a obesidade em toda a sua complexidade fisiopatológica; é preciso dominar bem um conjunto pequeno e objetivo de regras. É esse conjunto que está aqui.</p>
    </div>

    ${svgPiso(2, { caption: 'a balança energética — arraste os dois pratos (ingestão de calorias × gasto por atividade). Ao subir a ingestão e baixar o gasto, a balança pende para "acúmulo de gordura → obesidade primária/exógena"; ao equilibrar, mostra "balanço neutro".', hint: 'Arraste, ou Tab + setas; o estado do balanço é anunciado por leitor de tela.' })}

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text"><strong>"Primária = exógena = vem de fora"</strong> — a causa mais comum, igual à do adulto: come muito, gasta pouco, sobra gordura.</p>
    </aside>

    ${med({
      file: 'p2-prevalencia-obesidade-infantil-owid.png',
      alt: 'Mapa-múndi colorido mostrando a proporção de crianças menores de 5 anos com sobrepeso por país em 2018, segundo os padrões de crescimento da OMS.',
      achado: '<strong>O mapa da epidemia</strong> — proporção de crianças menores de 5 anos com sobrepeso (peso-para-estatura acima de +2 DP, padrão OMS), 2018. A obesidade infantil é problema de saúde pública global, não caso isolado de consultório.',
      fonte: 'Share of children who are overweight, 2018, Our World in Data (dados: UN Statistics Division), via Wikimedia Commons',
      licenca: 'CC BY 3.0'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Reconhecer que a maioria esmagadora é primária/exógena evita partir para investigação de causa rara (endócrina, genética) em toda criança obesa — a investigação dirigida começa pela suspeita certa, e a suspeita certa, por estatística, é a exógena.</p>
    </aside>

    ${quiz('p2', 'Epidemiologia → mecanismo → nomenclatura.', [
      {
        stem: 'No consultório pediátrico atual, qual afirmação reflete a realidade epidemiológica e a causa mais comum de obesidade na criança?',
        alts: [
          { t: 'A desnutrição grave é mais comum que a obesidade, e a causa principal é endócrina', correct: false, why: 'Inverte a frequência e a causa: a desnutrição grave existe, mas não é a mais comum no consultório atual; e a causa de obesidade é a exógena, não a endócrina (rara). <em>Por que cair na A</em>: confunde-se "ainda preocupa" (desnutrição) com "é a mais frequente".' },
          { t: 'A obesidade (e o sobrepeso) é mais comum que a desnutrição grave no dia a dia, e a causa mais comum é a primária/exógena', correct: true, why: 'Certa. A inversão epidemiológica é o ponto: hoje chega muito mais obesidade/sobrepeso do que desnutrição grave, e a causa mais comum é a primária (exógena) — balanço energético positivo, a mesma do adulto.' },
          { t: 'Marasmo e kwashiorkor desapareceram, e a obesidade é sempre genética', correct: false, why: 'Exagera e generaliza: marasmo e kwashiorkor continuam acontecendo (não desapareceram), e a obesidade é majoritariamente exógena, não genética. <em>Por que cair na C</em>: absolutiza-se a epidemia até apagar a desnutrição e troca-se a causa comum pela rara.' },
          { t: 'A causa mais comum de obesidade infantil difere da do adulto', correct: false, why: 'Cria uma diferença que não existe: a causa mais comum na criança é a mesma do adulto (primária/exógena). <em>Por que cair na D</em>: supõe-se que a pediatria sempre tem mecanismo próprio, quando aqui ela coincide com o adulto.' },
        ]
      },
      {
        stem: 'Por que a obesidade primária também é chamada de "exógena"?',
        alts: [
          { t: 'Porque decorre de uma doença endócrina interna', correct: false, why: 'Descreve a secundária endócrina: doença endócrina interna é causa <strong>secundária</strong>, o oposto de exógena. <em>Por que cair na A</em>: troca-se "exógena" (de fora) por "endógena" (de dentro).' },
          { t: 'Porque vem de fora — do excesso de ingestão de alimentos hipercalóricos —, não de um processo interno do corpo', correct: true, why: 'Certa. "Exógena" diz literalmente <strong>de fora</strong>: o motor é o excesso de ingestão (hipercalóricos) somado ao baixo gasto, não um processo interno. Primária = exógena = balanço energético positivo.' },
          { t: 'Porque é causada por uma síndrome genética', correct: false, why: 'Descreve a secundária genética: síndrome genética (ex.: Prader-Willi) é causa <strong>secundária</strong>, não a primária/exógena. <em>Por que cair na C</em>: associa-se "primária" a "genética", quando primária = exógena ambiental.' },
          { t: 'Porque ocorre apenas em adultos, não em crianças', correct: false, why: 'Inventa uma restrição etária: a exógena ocorre em crianças e adultos — o raciocínio enfatiza justamente que é a mesma causa nos dois. <em>Por que cair na D</em>: limita-se indevidamente a obesidade exógena ao adulto.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 3 — E8 Erro comum desmontado ===================== */
  P.push(page('p3', 3, `
    ${tag('pato', 'Causas secundárias · a regra da altura')}
    ${chips(['endócrina + genética', 'Prader-Willi', 'IMC pelo denominador', 'alta × baixa'])}

    <section class="opener opener--bust" aria-label="Erro comum desmontado">
      <p class="opener__bust-tag">Erro comum</p>
      <p class="opener__bust-wrong">"A endocrinopatia engorda porque a doença aumenta o peso direto."</p>
      <p class="opener__bust-right">Quase sempre é o contrário: a endocrinopatia <strong>trava a estatura</strong>, o peso segue subindo, e o IMC dispara pelo <strong>denominador parado</strong> — não por ganho de peso explosivo.</p>
    </section>

    <h1 class="page-title">Quando a obesidade é sintoma de outra doença — e a regra da altura</h1>

    <div class="prose">
      <h3 class="topic-h">As causas secundárias (endócrina e genética)</h3>
      <p>Embora a maioria seja exógena, existem também <span class="term">causas secundárias</span>: uma <span class="term">patologia subjacente</span> que justifica o desenvolvimento da obesidade. Dois grandes grupos:</p>
      <ul>
        <li><span class="hl-bad">Doenças endócrinas (endocrinopatias)</span> — o <strong>hipotireoidismo</strong>, inclusive, leva a quadro de obesidade.</li>
        <li><span class="hl-bad">Síndromes genéticas</span> — o exemplo clássico é a <span class="term">síndrome de Prader-Willi</span>, que cursa com obesidades <strong>bem massivas</strong> na criança.</li>
      </ul>
      <p>Quando a obesidade vem acompanhada de outros sinais (uma criança que parou de crescer, fenótipo sindrômico), a suspeita de causa secundária sobe — e a investigação muda de rota.</p>

      <h3 class="topic-h">A pegadinha: a endocrinopatia engorda pela baixa estatura</h3>
      <p>Aqui está o cuidado conceitual que a banca explora. As endocrinopatias geralmente <span class="hl-warn">NÃO causam obesidade</span> porque a própria doença endócrina "aumente o peso" diretamente. O que ocorre é mais sutil: as endocrinopatias que <strong>cursam com baixa estatura</strong> levam <strong>secundariamente</strong> à obesidade. A lógica está no IMC: a criança <span class="hl-bad">para de crescer</span> (a estatura estaciona), mas <strong>continua ganhando peso</strong> — perde-se o equilíbrio entre estatura e peso. Como o IMC é peso ÷ estatura², um <strong>denominador parado</strong> com numerador subindo eleva o IMC. Resultado: criança <strong>muito pesada para a idade</strong>, com <strong>IMC muito elevado para a idade</strong> — não porque engordou de forma explosiva, mas porque parou de crescer enquanto o peso seguiu. O motor é o <strong>denominador</strong>, não só o numerador.</p>

      <h3 class="topic-h">Primária = alta, secundária = baixa (não é regra absoluta)</h3>
      <p>Daí nasce uma informação <strong>muito útil para raciocínio de caso clínico</strong> — e o aviso vem junto: <span class="hl-warn">não é regra absoluta</span>, não vale para 100% dos casos. Em geral:</p>
      <ul>
        <li>A criança/adolescente com <span class="hl-good">obesidade primária tende a ser MAIS ALTA</span> — costuma ser uma das maiores da turma. A lógica: a primária vem de excesso de ingestão; essa criança se nutriu muito bem, e o excesso de nutrição leva, em geral, a estatura maior (ou ao menos normal). Ressalva: isso <strong>não garante</strong> que ela será um adulto alto — é uma tendência da infância, não do desfecho adulto.</li>
        <li>A criança com <span class="hl-bad">obesidade secundária tende a ser BAIXA</span> — porque a causa secundária frequentemente é uma <strong>endocrinopatia que provoca baixa estatura</strong>. É a criança que se olha e se vê pequenininha, e ainda assim pesada para o tamanho.</li>
      </ul>
      <p>Em linhas gerais: <span class="term">obesidade primária → crianças altas; obesidade secundária → crianças baixas</span>. Repetindo: é conceito que ajuda no raciocínio, <strong>não</strong> uma regra fechada (há obesidade primária em criança baixa).</p>
    </div>

    ${svgPiso(3, { caption: 'a gangorra do IMC — escolha o cenário "primária" (peso sobe + estatura sobe = criança alta) ou "secundária endócrina" (peso sobe + estatura trava = IMC dispara). Veja por que a baixa estatura eleva o IMC: é o denominador parado, não o ganho de peso explosivo.', hint: 'Alterne o cenário e observe o IMC; o estado é anunciado por leitor de tela.' })}

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Não é o hormônio engordando</h4><p>"Endocrinopatia causa obesidade" <strong>não</strong> significa que o hormônio engorda diretamente.</p></div>
        <div class="dont-confuse__side"><h4>É a estatura travada</h4><p>Na maioria das vezes a endocrinopatia <strong>trava a estatura</strong>, e é o IMC que sobe pelo denominador parado. Confundir os mecanismos leva a interpretar errado o caso.</p></div>
      </div>
    </div>

    ${med({
      file: 'p3-prader-willi-obesidade-central.png',
      alt: 'Criança de 8 anos com síndrome de Prader-Willi mostrando obesidade central (troncular) e baixa estatura; tarja preta sobre os olhos preservando a identidade.',
      achado: '<strong>Síndrome de Prader-Willi (paciente de 8 anos)</strong> — obesidade troncular/central, baixa estatura e adiposidade desproporcional. Causa secundária: aqui a obesidade é parte de uma síndrome genética (hiperfagia por desregulação hipotalâmica), não erro alimentar puro.',
      fonte: 'Cortés F. et al., Revista Médica de Chile (2005), via SciELO / Wikimedia Commons',
      licenca: 'CC BY 4.0 (tarjada na origem)'
    })}

    ${notaValor('Na obesidade secundária endócrina, o motor do IMC elevado costuma ser o <strong>denominador</strong> (estatura parada pela baixa estatura endócrina), não só o numerador (peso) — a mesma lógica da regra de altura, e o gancho com o caso da Manu (baixa estatura).')}

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text">Criança <strong>obesa e baixa</strong> acende a suspeita de causa <strong>secundária</strong> (endócrina); criança <strong>obesa e alta</strong> combina com a <strong>primária/exógena</strong>. Mas o examinador pode plantar a exceção — a regra é pista, não veredito.</p>
      </div>
    </aside>

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>As duas causas secundárias (endócrina/genética, com hipotireoidismo e Prader-Willi), o mecanismo desmontado (a baixa estatura eleva o IMC pelo denominador) e a regra de altura com a ressalva de <strong>não ser absoluta</strong>.</p>
    </aside>

    ${quiz('p3', 'Classificação etiológica e desmontagem do mecanismo.', [
      {
        stem: 'Por que uma endocrinopatia (como o hipotireoidismo) costuma levar à obesidade na criança?',
        alts: [
          { t: 'Porque o distúrbio hormonal aumenta diretamente a massa de gordura, independentemente da estatura', correct: false, why: 'É a pegadinha desmontada: na maioria das vezes não é o hormônio "engordando" direto — é a estatura travada que faz o IMC subir. <em>Por que cair na A</em>: assume-se o caminho intuitivo (doença → ganho de peso) ignorando o papel do denominador.' },
          { t: 'Porque cursa com baixa estatura: a criança para de crescer, continua ganhando peso e o IMC sobe pelo denominador parado', correct: true, why: 'Certa. O mecanismo real é indireto: a endocrinopatia trava a estatura, o peso segue subindo, e como IMC = peso ÷ estatura², o denominador parado eleva o IMC. A criança fica pesada para a idade não por engordar explosivamente, mas por parar de crescer.' },
          { t: 'Porque toda endocrinopatia causa síndrome de Prader-Willi', correct: false, why: 'Confunde os dois grupos secundários: Prader-Willi é causa <strong>genética</strong>, não consequência de endocrinopatia; nem toda endócrina vira Prader-Willi. <em>Por que cair na C</em>: mistura-se a síndrome genética com o grupo endócrino.' },
          { t: 'Porque aumenta a estatura e, com ela, o peso', correct: false, why: 'Inverte o efeito sobre a estatura: a endocrinopatia que engorda <strong>reduz/trava</strong> a estatura — não a aumenta; é justamente o oposto. <em>Por que cair na D</em>: troca-se "para de crescer" por "cresce mais".' },
        ]
      },
      {
        stem: 'Sobre a regra de altura na obesidade infantil, qual afirmação está correta?',
        alts: [
          { t: 'É regra absoluta: toda criança obesa alta tem causa primária e toda baixa tem secundária', correct: false, why: 'Absolutiza a pista: tratá-la como regra fechada ignora as exceções que a própria regra sublinha. <em>Por que cair na A</em>: confunde-se "tendência útil" com "lei sem exceção".' },
          { t: 'Em geral, obesidade primária tende a criança mais alta e secundária a criança mais baixa — mas não é regra absoluta', correct: true, why: 'Certa. A regra é uma <strong>pista de raciocínio</strong>, não um veredito: primária/exógena (bem nutrida) → tende a alta; secundária/endócrina (baixa estatura) → tende a baixa. A própria regra lembra que não é absoluta (há primária em criança baixa).' },
          { t: 'Obesidade primária sempre cursa com baixa estatura', correct: false, why: 'Inverte a primária: a primária tende a estatura <strong>maior</strong> (excesso de nutrição), não baixa. <em>Por que cair na C</em>: troca-se o lado da regra.' },
          { t: 'A altura da criança não tem nenhuma relação com a etiologia da obesidade', correct: false, why: 'Descarta uma pista válida: a altura <strong>ajuda</strong> no raciocínio etiológico, mesmo sem ser determinística. <em>Por que cair na D</em>: do "não é absoluta" salta-se para "não serve para nada".' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 4 — E1 Pergunta central ===================== */
  P.push(page('p4', 4, `
    ${tag('sys', 'Método diagnóstico · cálculo')}
    ${chips(['não é ectoscopia', 'IMC = peso ÷ estatura²', 'calcular à mão', 'plotar na curva'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Por que não dá para diagnosticar obesidade olhando para a criança — e por que vale a pena ter as continhas do IMC na ponta da língua na hora da prova?</p>
    </section>

    <h1 class="page-title">O diagnóstico não está no olho — está no IMC</h1>

    <div class="prose">
      <h3 class="topic-h">Por que a ectoscopia não fecha</h3>
      <p>O diagnóstico de obesidade <span class="hl-bad">NÃO se fecha</span> olhando a pessoa — não é pela <span class="term">ectoscopia</span>, pelo "físico", pela impressão de que a criança "parece gordinha". É preciso um <span class="term">dado numérico objetivo</span>: o <span class="term">índice de massa corporal (IMC)</span>. A impressão pode enganar nos dois sentidos — uma criança musculosa ou de compleição forte pode parecer mais pesada do que é; uma criança com adiposidade central pode não saltar aos olhos. O número corrige o olho. Por isso a primeira regra do tema é: mediu, calculou, plotou — só então classifica.</p>

      <h3 class="topic-h">A fórmula: peso ÷ estatura²</h3>
      <p>A fórmula é a universal, a mesma do adulto: <span class="term">IMC = peso (em quilos) ÷ estatura ao quadrado</span> (o quadrado da altura da criança, em metros). É uma divisão simples — peso sobre estatura vezes estatura. O resultado é um número (14, 15, 16, 19...) que, sozinho, ainda não diz nada na criança: ele só ganha significado quando <strong>plotado na curva por idade</strong>. Guarde a fórmula como reflexo: diante de peso e altura, o IMC é uma conta de segundos.</p>

      <h3 class="topic-h">Treinar a conta: a prova nem sempre dá o IMC pronto</h3>
      <p>Aqui está a dica prática que vale pontos. A questão <strong>pode</strong> fornecer o IMC já calculado (14, 15, 16) — mas <strong>muitíssimas questões NÃO dão</strong> o IMC pronto. Nesses casos, é preciso <strong>fazer a conta na hora</strong> da prova. E há um macete: as continhas se <span class="hl-good">repetem muito</span> (0,9 × 0,9; 0,9 × 0,8; quadrados de estaturas comuns de pré-escolares e escolares). Ter esses quadrados memorizados faz a conta sair <strong>muito mais rápido</strong>. Calcular o IMC ao resolver questões treina exatamente isso — quando o número não vem de bandeja, quem treinou não perde tempo. Uma vez calculado o IMC, é a partir dele que se classifica a criança.</p>
    </div>

    ${svgPiso(4, { caption: 'calculadora de IMC infantil — entre com peso (kg) e estatura (m); a saída mostra o IMC passo a passo (peso ÷ estatura²), com os quadrados frequentes destacados. Vem pré-carregada com os dados da Maju (20 kg / 1,02 m → 19,22) e lembra: "agora plote na curva por idade".', hint: 'Digite os valores ou use os exemplos; o resultado é anunciado por leitor de tela.' })}

    ${med({
      file: 'p4-formula-imc.png',
      alt: 'Gráfico ilustrando a fórmula do Índice de Massa Corporal, IMC igual a peso em quilogramas dividido pela altura em metros ao quadrado, com faixas de classificação.',
      achado: '<strong>A fórmula do IMC</strong> — IMC = peso (kg) ÷ altura² (m × m). O cálculo é igual em criança e adulto; o que muda é a interpretação: na criança o número entra na <strong>curva por idade e sexo</strong> (escore-Z / percentil), nunca nos cortes fixos do adulto que aparecem neste gráfico.',
      fonte: 'Body mass index, by LaurensvanLieshout, via Wikimedia Commons',
      licenca: 'CC BY-SA 3.0'
    })}

    ${notaBanca('Atenção ao gráfico ao lado: as faixas 18/25/30/40 são <strong>cortes de adulto</strong> e <strong>não valem para criança</strong>. A fórmula kg/m² é universal; a classificação pediátrica é por <strong>escore-Z / percentil por idade e sexo</strong> (curvas das páginas seguintes), nunca pelos cortes fixos do adulto.')}

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>A banca adora <strong>não</strong> dar o IMC pronto e fornecer peso e altura — testando se o aluno sabe a fórmula e calcula sem hesitar. Saber <strong>IMC = peso ÷ estatura²</strong> e ter os quadrados frequentes na ponta da língua é diferença de tempo (e de acerto) na prova.</p>
    </aside>

    ${quiz('p4', 'Método diagnóstico e cálculo do IMC.', [
      {
        stem: 'Como se fecha o diagnóstico de obesidade em uma criança?',
        alts: [
          { t: 'Pela ectoscopia — a impressão clínica de que a criança está acima do peso', correct: false, why: 'É o erro central desmontado: a ectoscopia engana nos dois sentidos e não substitui o IMC. <em>Por que cair na A</em>: confia-se na impressão visual, justamente o que o raciocínio proíbe.' },
          { t: 'Por um dado numérico objetivo: o IMC (peso ÷ estatura²) plotado na curva por idade', correct: true, why: 'Certa. Obesidade é diagnóstico <strong>numérico</strong>: calcula-se o IMC = peso ÷ estatura² e plota-se na curva por idade. A aparência não fecha — o número corrige o olho.' },
          { t: 'Apenas pela circunferência abdominal', correct: false, why: 'Usa um parâmetro de etapa posterior: a circunferência abdominal entra na síndrome metabólica (> 10 anos), não no diagnóstico de obesidade. <em>Por que cair na C</em>: antecipa-se um dado de comorbidade ao diagnóstico.' },
          { t: 'Pelo peso isolado comparado à média da turma', correct: false, why: 'Compara peso solto: peso isolado não é IMC nem se classifica por "média da turma" — é a curva por idade que padroniza. <em>Por que cair na D</em>: reduz-se o diagnóstico a uma comparação informal de peso.' },
        ]
      },
      {
        stem: 'Uma questão fornece peso 20 kg e estatura 1,02 m, mas não dá o IMC. Qual a conduta e o cálculo?',
        alts: [
          { t: 'Não é possível classificar sem o IMC fornecido pela questão', correct: false, why: 'Trava sem necessidade: a fórmula permite calcular com peso e altura; faltar o IMC pronto não impede classificar. <em>Por que cair na A</em>: ignora-se que a conta pode (e deve) ser feita.' },
          { t: 'Calcular o IMC: 20 ÷ (1,02)² = 20 ÷ 1,0404 ≈ 19,22', correct: true, why: 'Certa. Quando a questão não dá o IMC, calcula-se na hora: peso ÷ estatura² = 20 ÷ (1,02)² = 20 ÷ 1,0404 ≈ <strong>19,22</strong>. É exatamente o caso da Maju — ter os quadrados na ponta da língua agiliza.' },
          { t: 'Usar o peso (20 kg) diretamente como índice', correct: false, why: 'Usa só metade: peso isolado não é IMC; falta dividir pela estatura ao quadrado. <em>Por que cair na C</em>: confunde-se peso com índice.' },
          { t: 'Multiplicar peso por estatura: 20 × 1,02', correct: false, why: 'Erra a operação: IMC <strong>divide</strong> por estatura² — não multiplica peso por estatura. <em>Por que cair na D</em>: troca-se a divisão pela multiplicação e esquece-se o quadrado.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 5 — E7 Comparação chocante ===================== */
  P.push(page('p5', 5, `
    ${tag('sys', 'Classificação MS · escore-Z em duas faixas')}
    ${chips(['0–5 × 5–19 anos', 'Z+1 / Z+2 / Z+3', 'sobe um degrau', 'sobrepeso = risco'])}

    <section class="opener opener--vs" aria-label="Comparação de abertura">
      <div class="opener__vs-grid">
        <div class="opener__vs-side">
          <h3>0 a 5 anos</h3>
          <p>Entre <strong>Z+2 e Z+3</strong>? O rótulo é <strong>sobrepeso</strong>.</p>
        </div>
        <div class="opener__vs-divider" aria-hidden="true">vs</div>
        <div class="opener__vs-side">
          <h3>5 a 19 anos</h3>
          <p>O <strong>mesmo</strong> Z+2 a Z+3? Agora é <strong>obesidade</strong>.</p>
        </div>
      </div>
      <p class="opener__vs-asterisk">Mesmo escore-Z, idades vizinhas — rótulos diferentes. A pegadinha-âncora do tema: a idade muda o nome.</p>
    </section>

    <h1 class="page-title">A tabela do Ministério: o mesmo escore-Z muda de nome com a idade</h1>

    <div class="prose">
      <h3 class="topic-h">A classificação depende da idade: duas faixas</h3>
      <p>A classificação nutricional <strong>principal</strong> é a do <span class="term">Ministério da Saúde</span>, feita pelo IMC <strong>plotado na tabela/curva</strong> — a mesma curva usada na avaliação do crescimento. E a primeira regra é decisiva: a classificação <span class="hl-warn">depende da idade</span>. Existem <strong>duas</strong> tabelas:</p>
      <ul>
        <li><span class="term">0 a 5 anos incompletos</span> (ou seja, de 0 até 4 anos, 11 meses e 29 dias);</li>
        <li><span class="term">5 anos completos a 19 anos</span>.</li>
      </ul>
      <p>O mesmo IMC, no mesmo escore-Z, <strong>recebe um nome diferente</strong> conforme em qual dessas faixas a criança cai. Errar a faixa é errar o rótulo.</p>

      <h3 class="topic-h">A escada de gravidade (Z+1 → Z+2 → Z+3)</h3>
      <p>Os cortes são os mesmos escores-Z nas duas faixas — <strong>Z+1, Z+2, Z+3</strong> —, mas os rótulos mudam. Lado a lado:</p>
    </div>

    <div class="zscore-table">
      <div class="zscore-table__scroll">
        <table>
          <caption>Classificação nutricional do MS por escore-Z — as duas faixas etárias</caption>
          <thead>
            <tr><th scope="col">Escore-Z</th><th scope="col">0 a 5 anos</th><th scope="col">5 a 19 anos</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">acima de Z+1 (e ≤ Z+2)</th><td class="z-cell z-cell--warn">Risco de sobrepeso</td><td class="z-cell z-cell--warn">Sobrepeso</td></tr>
            <tr><th scope="row">acima de Z+2 (e ≤ Z+3)</th><td class="z-cell z-cell--warn">Sobrepeso</td><td class="z-cell z-cell--bad">Obesidade</td></tr>
            <tr><th scope="row">acima de Z+3</th><td class="z-cell z-cell--bad">Obesidade</td><td class="z-cell z-cell--grave">Obesidade grave</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="prose">
      <p>Item a item: <strong>0–5 anos</strong> — acima de Z+3 = obesidade; entre Z+2 e Z+3 = sobrepeso; entre Z+1 e Z+2 = risco de sobrepeso. <strong>5–19 anos</strong> — acima de Z+3 = obesidade grave; entre Z+2 e Z+3 = obesidade; entre Z+1 e Z+2 = sobrepeso.</p>

      <h3 class="topic-h">Por que cada faixa "sobe um degrau"</h3>
      <p>A lógica que amarra a tabela inteira: a criança <strong>maior (5–19)</strong> tem obesidade <strong>"maior"</strong> — por isso o mesmo corte de Z, nela, já significa um degrau <strong>acima</strong> de gravidade. O que na faixa pequena é "risco de sobrepeso", na faixa grande é "sobrepeso"; o que na pequena é "sobrepeso", na grande é "obesidade"; o que na pequena é "obesidade", na grande é "obesidade grave". É só <strong>somar um degrau</strong> ao passar da faixa de baixo para a de cima — no 0–5: Z+1 risco de sobrepeso → Z+2 sobrepeso → Z+3 obesidade; no 5–19: Z+1 sobrepeso → Z+2 obesidade → Z+3 obesidade grave. Entender a lógica do degrau dispensa decorar as seis células soltas.</p>

      <h3 class="topic-h">Sobrepeso = o estado de risco</h3>
      <p>Por que o <span class="hl-warn">sobrepeso</span> importa tanto e ganha rótulo próprio? Porque ele é um <strong>estado de risco</strong> para a pessoa <strong>se tornar obesa</strong>. Não é "ainda não é nada" — é o degrau anterior à obesidade, o sinal de que a trajetória está subindo. E na faixa pequena (0–5), há até um degrau <strong>antes</strong> do sobrepeso: o <span class="hl-warn">risco de sobrepeso</span> (a classificação anterior ao sobrepeso é justamente a de risco de desenvolvê-lo). É a lógica preventiva da tabela: marcar a subida antes de a criança chegar ao topo. E vale o conselho prático: habituar-se a usar essas tabelas <span class="hl-good">perde o medo</span> delas; o que assusta de longe é trivial de perto.</p>
    </div>

    ${svgPiso(5, { caption: 'a tabela em escada — deslize o marcador de escore-Z e alterne a faixa etária (0–5 × 5–19) com o toggle; o rótulo correspondente acende em cada coluna, mostrando que o mesmo Z "sobe um degrau" ao mudar de faixa. Reforça a pegadinha do limiar dos 5 anos.', hint: 'Slider + toggle, ou teclado; o rótulo é anunciado por leitor de tela.' })}

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>O escore-Z não tem rótulo fixo</h4><p>"Entre Z+2 e Z+3" é <strong>sobrepeso</strong> aos 4 anos e <strong>obesidade</strong> aos 5.</p></div>
        <div class="dont-confuse__side"><h4>Não é uma coluna só</h4><p>Tratar a tabela como uma coluna única é o erro que a banca planta — a faixa etária decide o nome.</p></div>
      </div>
    </div>

    ${med({
      file: 'p5-curva-imc-meninos-zscore-sisvan.png',
      alt: 'Gráfico oficial da OMS de IMC-para-idade para meninos de 5 a 19 anos em escore-Z, com as linhas +3, +2, +1, 0, -2 e -3 e o eixo de IMC contra a idade.',
      achado: '<strong>Curva IMC-para-idade, meninos, 5–19 anos (escore-Z)</strong> — base OMS adotada pelo MS/SISVAN. Linhas +3, +2 (sobrepeso/obesidade), +1, 0, −2 e −3 visíveis. Na faixa 5–19, <strong>Z entre +2 e +3 = obesidade</strong> (mesmo critério aplicado à Maju na curva de meninas).',
      fonte: 'BMI-for-age BOYS 5–19 years (z-scores), © WHO 2007 Growth Reference (base MS/SISVAN)',
      licenca: 'OMS — uso educacional com atribuição'
    })}

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>A banca dá um IMC/escore-Z <strong>e uma idade no limiar</strong> (4a11m × 5 anos) e testa se o aluno troca a faixa — e, com ela, o rótulo. A tabela lado a lado é a defesa.</p>
    </aside>

    ${quiz('p5', 'Classificação por faixa etária e a lógica do degrau.', [
      {
        stem: 'Uma criança tem IMC entre o escore-Z +2 e o +3. Qual o diagnóstico nutricional?',
        alts: [
          { t: 'Obesidade, independentemente da idade', correct: false, why: 'Fixa um rótulo único: ignora que o rótulo depende da faixa — não é "sempre obesidade". <em>Por que cair na A</em>: lê-se a tabela como coluna única, esquecendo o degrau etário.' },
          { t: 'Depende da idade: aos 4a11m (faixa 0–5) = sobrepeso; aos 5 anos (faixa 5–19) = obesidade', correct: true, why: 'Certa. A virada do tema: o mesmo escore-Z muda de nome com a idade. Entre Z+2 e Z+3 é <strong>sobrepeso</strong> na faixa 0–5 e <strong>obesidade</strong> na faixa 5–19. Sem a idade, não se nomeia.' },
          { t: 'Sempre sobrepeso, em qualquer faixa', correct: false, why: 'Fixa o outro rótulo único: também ignora o degrau — não é "sempre sobrepeso". <em>Por que cair na C</em>: lê-se só a coluna 0–5 e generaliza.' },
          { t: 'Obesidade grave, em qualquer faixa', correct: false, why: 'Sobe dois degraus: obesidade grave é <strong>acima de Z+3</strong> na faixa 5–19 — não no intervalo Z+2 a Z+3. <em>Por que cair na D</em>: confunde-se o degrau do topo com o intermediário.' },
        ]
      },
      {
        stem: 'Por que, no mesmo corte de escore-Z, a faixa 5–19 anos recebe sempre um rótulo "um degrau acima" da faixa 0–5?',
        alts: [
          { t: 'Porque a faixa 5–19 usa percentis e a 0–5 usa escore-Z', correct: false, why: 'Inventa uma troca de sistema: <strong>as duas faixas do MS usam escore-Z</strong> — percentil é o sistema do CDC, não a diferença entre as faixas. <em>Por que cair na A</em>: mistura-se o sistema alternativo (CDC) com a divisão etária do MS.' },
          { t: 'Porque a criança maior tem obesidade "maior", então o mesmo Z já indica gravidade um degrau acima', correct: true, why: 'Certa. A lógica do "sobe um degrau": na criança maior, o mesmo escore-Z significa gravidade maior — Z+1 vira sobrepeso (não risco), Z+2 vira obesidade (não sobrepeso), Z+3 vira obesidade grave (não obesidade).' },
          { t: 'Porque o Ministério não classifica crianças menores de 5 anos', correct: false, why: 'Nega a faixa pequena: o MS <strong>classifica</strong> 0–5 anos (com rótulos próprios, incluindo risco de sobrepeso). <em>Por que cair na C</em>: confunde-se "rótulos diferentes" com "não classifica".' },
          { t: 'Porque o IMC só é válido acima dos 5 anos', correct: false, why: 'Restringe o IMC indevidamente: o IMC se aplica e classifica também antes dos 5 anos no MS; a restrição a > 2 anos é do CDC. <em>Por que cair na D</em>: importa-se um corte do CDC para o MS.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 6 — E6 Mnemônico-âncora ===================== */
  P.push(page('p6', 6, `
    ${tag('sys', 'O sistema alternativo · CDC por percentil')}
    ${chips(['CDC / Nelson', 'percentil', 'P85–P94 / ≥P95', '94/95 só no CDC'])}

    <aside class="opener opener--mnemonic" aria-label="Mnemônico-âncora de abertura">
      <p class="opener__mnemonic-quote">Viu <em>percentil 94 ou 95</em> numa questão de classificação nutricional? É <em>CDC</em>, nunca Ministério. O MS não usa 94/95 — ele usa P85, P97 e P99,9.</p>
      <p class="opener__mnemonic-tag">Pista de ouro do sistema</p>
    </aside>

    <h1 class="page-title">O outro sistema: quando a prova fala em percentil 95</h1>

    <div class="prose">
      <h3 class="topic-h">O CDC do Nelson: percentil, não escore-Z</h3>
      <p>Para acertar <strong>100%</strong>, há um detalhe: mais raramente, uma questão pode cobrar a classificação do <span class="term">CDC americano</span> — não a do Ministério. É o dado que consta no tratado de pediatria do <span class="term">Nelson</span>. A diferença de língua é a chave: o CDC usa <span class="term">PERCENTIS</span>, não escore-Z. E considera percentis que o Ministério <strong>não</strong> usa — em especial o <strong>percentil 94</strong> (além do 85). São questões mais raras, mas valem o "detalhe do detalhe" para quem busca o gabarito perfeito.</p>

      <h3 class="topic-h">P85–P94 sobrepeso, ≥P95 obesidade (só >2 anos)</h3>
      <p>Os cortes do CDC, para memorizar:</p>
      <ul>
        <li>entre o <span class="hl-warn">percentil 85 e o 94</span> = <strong>SOBREPESO</strong>;</li>
        <li>percentil <span class="hl-bad">maior ou igual a 95 (≥ P95)</span> = <strong>OBESIDADE</strong>.</li>
      </ul>
      <p>E um limite etário próprio: pelo CDC, só se dá o diagnóstico de <strong>obesidade acima de 2 anos</strong> — <span class="hl-warn">abaixo de 2 anos não se fala em obesidade</span> (usa-se peso/comprimento, não IMC). Resumo do CDC: P85–P94 sobrepeso; ≥P95 obesidade; só > 2 anos.</p>

      <h3 class="topic-h">A pista de ouro: P94/P95 não existe no Ministério</h3>
      <p>Aqui está o que mais cai. O Ministério da Saúde usa <strong>suas próprias</strong> equivalências de percentil ↔ escore-Z para sobrepeso/obesidade: <span class="term">percentil 85 = Z+1; percentil 97 = Z+2; percentil 99,9 = Z+3</span>. Repare: o MS fala em <strong>P85, P97 e P99,9</strong> — <span class="hl-bad">nunca em P94 nem em P95</span>. Esses dois pertencem <strong>só ao CDC</strong>. Daí a pista de prova: se a questão de classificação nutricional menciona <strong>percentil 94 ou 95</strong>, isso já denuncia que a classificação cobrada é a do <strong>CDC</strong> — porque 94/95 <strong>não tem como ser Ministério</strong>. E cuidado para não fundir: o <strong>P97 do MS ≠ P95 do CDC</strong> — são pontos e sistemas distintos, mesmo parecendo vizinhos.</p>
    </div>

    ${svgPiso(6, { caption: 'qual sistema é esse? — receba um percentil (ou escore-Z) e arraste para uma de duas caixas (MINISTÉRIO × CDC). Ao soltar, o painel acende a resposta e a regra (94/95 → CDC; 97/99,9 ou escore-Z → MS) com a equivalência. Um quadro lateral mostra os dois sistemas lado a lado, sem fundir.', hint: 'Arraste ou selecione; o sistema e a regra são anunciados por leitor de tela.' })}

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Ministério (escore-Z)</h4><p>Eixo é o <strong>escore-Z</strong>, com P85/P97/P99,9 atrelados. Nunca P94/P95.</p></div>
        <div class="dont-confuse__side"><h4>CDC (percentil puro)</h4><p>Eixo é o <strong>percentil</strong> (P85/P95). Não se traduz "P95 do CDC" para "P97 do MS" — são referências diferentes.</p></div>
      </div>
    </div>

    ${med({
      file: 'p6-cdc-imc-percentil-meninos.png',
      alt: 'Gráfico clínico do CDC de IMC-para-idade para meninos de 2 a 20 anos, com as curvas de percentil 5, 10, 25, 50, 75, 85, 90 e 95 e o boxe de cálculo do IMC.',
      achado: '<strong>Curva CDC de IMC-para-idade, meninos 2–20 anos (percentis)</strong> — referência por percentil. Os cortes da classificação americana: <strong>P85 = sobrepeso</strong> e <strong>P95 = obesidade</strong>. Inclui o boxe de cálculo do IMC. Contraponto à leitura por escore-Z da OMS/MS.',
      fonte: '2 to 20 years: Boys BMI-for-age percentiles, National Center for Health Statistics / CDC (2000)',
      licenca: 'Domínio público (CDC/NCHS)'
    })}

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text">Percentil <strong>94 ou 95</strong> na questão = <strong>CDC</strong> (Nelson). Se aparecer P97 ou P99,9, ou se falar em escore-Z, é <strong>Ministério</strong>.</p>
      </div>
    </aside>

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>A banca usa o número do percentil como <strong>assinatura do sistema</strong>. Saber que 94/95 é exclusivo do CDC e que 97/99,9 é do MS resolve a questão sem decorar as duas tabelas inteiras.</p>
    </aside>

    ${quiz('p6', 'Distinção dos dois sistemas e a assinatura do percentil.', [
      {
        stem: 'Uma questão classifica uma criança como "sobrepeso entre o percentil 85 e 94 e obesidade no percentil ≥ 95". Qual sistema está sendo usado?',
        alts: [
          { t: 'Ministério da Saúde, por escore-Z', correct: false, why: 'Atribui ao MS números que não são dele: o MS usa <strong>escore-Z</strong> e P85/P97/P99,9 — nunca P94/P95. <em>Por que cair na A</em>: assume-se que toda classificação BR é do MS, ignorando a assinatura do percentil.' },
          { t: 'CDC (Nelson), por percentil — o P94/P95 é exclusivo dele', correct: true, why: 'Certa. Os cortes P85–P94 / ≥P95 são a assinatura do <strong>CDC</strong> (Nelson), que trabalha por percentil. O percentil 94/95 não existe no MS — logo, ver esses números denuncia o sistema CDC.' },
          { t: 'Os dois sistemas, que usam exatamente os mesmos cortes', correct: false, why: 'Funde os sistemas: MS e CDC têm cortes e linguagens <strong>diferentes</strong> (escore-Z × percentil; P97 × P95) — não são os mesmos. <em>Por que cair na C</em>: trata-se os dois como versões idênticas.' },
          { t: 'Nenhum sistema reconhecido', correct: false, why: 'Nega um sistema real: o CDC é referência reconhecida (consta no Nelson). <em>Por que cair na D</em>: confunde-se "menos cobrado" com "inexistente".' },
        ]
      },
      {
        stem: 'Quais são as equivalências de percentil ↔ escore-Z usadas pelo Ministério da Saúde?',
        alts: [
          { t: 'P85 = Z+1; P95 = Z+2; P99 = Z+3', correct: false, why: 'Troca os percentis altos: o MS usa <strong>P97 e P99,9</strong>, não P95/P99 — e P95 é justamente o corte do CDC. <em>Por que cair na A</em>: contamina-se a tabela do MS com o P95 do CDC.' },
          { t: 'P85 = Z+1; P97 = Z+2; P99,9 = Z+3', correct: true, why: 'Certa. As equivalências do MS são P85 = Z+1 · P97 = Z+2 · P99,9 = Z+3. Note que o MS usa P97 e P99,9 — e <strong>nunca</strong> P94 ou P95 (esses são do CDC).' },
          { t: 'P94 = Z+2; P95 = Z+3', correct: false, why: 'Usa os percentis do CDC: 94/95 pertencem ao CDC, não ao MS, e não correspondem a Z+2/Z+3 do MS. <em>Por que cair na C</em>: aplica-se a assinatura do CDC ao sistema errado.' },
          { t: 'O Ministério não usa percentis, apenas escore-Z', correct: false, why: 'Nega um fato do tema: o MS <strong>publica</strong> equivalências de percentil atreladas ao escore-Z (P85/P97/P99,9) — usa, sim, percentis nessa tradução. <em>Por que cair na D</em>: confunde-se "o eixo principal é o escore-Z" com "não há percentis".' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 7 — E4 Achado típico / pegadinha ===================== */
  P.push(page('p7', 7, `
    ${tag('pato', 'Comorbidades · macete comorbidade → exame (parte 1)')}
    ${chips(['não é estética', 'HAS → PA', 'dislipidemia → lipidograma', 'esteatose → ALT'])}

    <aside class="opener opener--trap" aria-label="Achado de abertura">
      <svg class="opener__trap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="opener__trap-body">
        <p class="opener__trap-tag">Achado típico · pegadinha</p>
        <p class="opener__trap-text">Na esteatose, o ultrassom <strong>parece</strong> o exame óbvio — mas o inicial de rotina é a <strong>ALT</strong>. O macete que organiza tudo: lembre a <strong>comorbidade</strong>, ache o <strong>exame</strong>.</p>
      </div>
    </aside>

    <h1 class="page-title">Não é estética: as comorbidades e seus exames (parte 1)</h1>

    <div class="prose">
      <h3 class="topic-h">Por que se investiga: as comorbidades</h3>
      <p>Diagnosticar obesidade <span class="hl-warn">não</span> é por <strong>estética</strong>. A preocupação real são as <span class="term">comorbidades</span> — os problemas que a obesidade traz junto e que geram <strong>impacto na vida futura</strong> da criança. É por isso que, depois de classificar pelo IMC, o tema <strong>muito cobrado</strong> (várias questões) é: o que <strong>pedir de avaliação complementar</strong> no paciente obeso, além da mera classificação. A obesidade não é o fim da investigação; é a porta para procurar ativamente o que ela costuma arrastar consigo.</p>

      <h3 class="topic-h">O macete: lembrar a comorbidade traz o exame</h3>
      <p>A lista de exames pode <strong>"fugir da mente"</strong> na hora da prova. O macete que resolve: é mais fácil lembrar das <span class="hl-good">comorbidades</span> e, para <strong>cada uma</strong>, associar o <strong>exame óbvio</strong> que se pede. Não se decora uma lista solta de exames — <strong>raciocina-se</strong> o exame a partir da comorbidade. A sequência que organiza tudo: hipertensão → PA; dislipidemia → lipidograma; esteatose → ALT; diabetes/resistência insulínica → glicemia; síndrome metabólica → circunferência abdominal. Definir as comorbidades é o passo fundamental — inclusive para, depois, traçar os objetivos de tratamento.</p>

      <h3 class="topic-h">Hipertensão → PA em toda consulta</h3>
      <p><span class="hl-bad">Comorbidade 1 — HIPERTENSÃO.</span> O paciente obeso tem risco <strong>bem maior</strong> de ser hipertenso. Exame complementar óbvio = <span class="term">aferição da pressão arterial</span>. E aqui mora um detalhe de prova: numa criança <strong>não</strong> obesa e <strong>não</strong> hipertensa, <strong>não</strong> se afere a PA em toda consulta — faz-se de forma mais <strong>espaçada</strong>, às vezes anualmente. Já no paciente <span class="hl-bad">obeso</span> — mesmo o obeso <strong>não</strong> hipertenso — a aferição da PA deve ser feita em <span class="hl-bad">TODA consulta</span>, para <strong>buscar ativamente</strong> o desenvolvimento da hipertensão. A obesidade muda a periodicidade: o que era anual vira rotina de toda visita.</p>

      <h3 class="topic-h">Dislipidemia → lipidograma (>2a)</h3>
      <p><span class="hl-bad">Comorbidade 2 — DISLIPIDEMIA.</span> Obesidade é gordura — então o paciente pode ter dislipidemia. Exame complementar = <span class="term">lipidograma</span> (triglicerídeo, colesterol total e frações — HDL, LDL). Detalhe de prova: a avaliação costuma ser feita para crianças <span class="hl-warn">acima de 2 anos</span> — <strong>não</strong> se costuma pedir lipidograma para criança <strong>menor de 2 anos</strong>, porque os resultados podem vir alterados <strong>sem significado objetivo</strong>. Acima de 2 anos é que se avalia.</p>

      <h3 class="topic-h">Esteatose → ALT, não ultrassom</h3>
      <p><span class="hl-bad">Comorbidade 3 — ESTEATOSE HEPÁTICA.</span> A criança pode acumular gordura no fígado. E aqui está a <strong>pegadinha forte</strong>: o <strong>ultrassom</strong> é ótimo para ver gordura no fígado, <span class="hl-bad">MAS não é o exame de rotina/inicial</span>. Pelas diretrizes do Ministério e, principalmente, da <span class="term">SBP</span>, o exame <strong>inicial de rotina</strong> é a dosagem da <span class="term">ALT</span> (nome mais moderno da TGP), que avalia a <strong>inflamação hepática</strong>. A conduta é <strong>sequencial</strong>: avalia-se a esteatose pela ALT; se houver <strong>alteração importante</strong>, suspeita-se de esteatose e <strong>nada impede</strong> pedir a ultrassonografia hepática. (Algumas sociedades podem incluir o ultrassom já na análise inicial; mas pela SBP o inicial é a <strong>ALT</strong>, não o ultrassom.)</p>
    </div>

    ${svgPiso(7, { caption: 'comorbidade → exame (parte 1) — três cartões (hipertensão, dislipidemia, esteatose). Clique em cada um e revele o exame óbvio e a pegadinha: PA em toda consulta no obeso; lipidograma > 2a; ALT antes do ultrassom. Reforça o raciocínio "a comorbidade traz o exame".', hint: 'Toque/clique cada cartão, ou Tab + Enter; exame e pegadinha anunciados por leitor de tela.' })}

    ${med({
      file: 'p7-esteatose-hepatica-us.jpg',
      alt: 'Ultrassonografia hepática mostrando esteatose grau 2: fígado difusamente hiperecogênico (brilhante) com atenuação posterior, achado de gordura no fígado.',
      achado: '<strong>Esteatose hepática ao ultrassom (grau 2)</strong> — fígado difusamente hiperecogênico, com perda da definição do lobo posterior. No obeso, a PA é de toda consulta — e na esteatose o <strong>primeiro exame é a ALT, não o ultrassom</strong>.',
      fonte: 'Ultrasound of grade 2 fatty right liver lobe, by Cerevisae, via Wikimedia Commons',
      licenca: 'CC BY-SA 4.0'
    })}

    ${notaValor('<strong>PA na criança</strong> é interpretada por <strong>percentis para idade, sexo e estatura</strong> (SBP/AAP): ≥ P95 = hipertensão; P90–P95 = pré-hipertensão/limítrofe. O ensino "aferir em toda consulta no obeso" se complementa com este corte.')}

    ${notaBanca('Confirmação SBP da esteatose: a <strong>ALT/AST é screening universal</strong> do obeso (Quadro 3); o <strong>ultrassom tem baixa sensibilidade/especificidade</strong> para esteatohepatite; biópsia não é rotina. Confirma o ensino — a ALT é o exame inicial, não o ultrassom.')}

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>A banca cobra o <strong>exame inicial</strong> de cada comorbidade — e adora a troca ALT × ultrassom na esteatose e o corte de 2 anos do lipidograma. O macete comorbidade → exame é a defesa contra o branco.</p>
    </aside>

    ${quiz('p7', 'O macete comorbidade → exame e as pegadinhas (parte 1).', [
      {
        stem: 'Qual é o exame inicial de rotina para investigar esteatose hepática em uma criança obesa, segundo a SBP?',
        alts: [
          { t: 'Ultrassonografia hepática', correct: false, why: 'É a armadilha: o ultrassom parece o exame óbvio da gordura hepática, mas não é o inicial de rotina. <em>Por que cair na A</em>: associa-se "ver gordura no fígado" diretamente a "ultrassom", pulando o screening laboratorial.' },
          { t: 'Dosagem de ALT (TGP) — o ultrassom entra depois, se a ALT estiver alterada', correct: true, why: 'Certa. A pegadinha-âncora: o exame <strong>inicial</strong> é a ALT (TGP), que avalia inflamação hepática. O ultrassom vê bem a gordura, mas não é o rastreio inicial pela SBP — entra depois, se a ALT vier alterada.' },
          { t: 'Biópsia hepática', correct: false, why: 'Escala demais: a biópsia <strong>não é rotina</strong> — é exceção. <em>Por que cair na C</em>: confunde-se o exame mais específico com o exame de triagem.' },
          { t: 'Tomografia de abdome', correct: false, why: 'Usa um método não indicado: TC não é o rastreio inicial de esteatose pediátrica; o caminho é ALT → (se alterada) ultrassom. <em>Por que cair na D</em>: busca-se uma imagem "potente" em vez do exame inicial correto.' },
        ]
      },
      {
        stem: 'Sobre a aferição de PA e o lipidograma no paciente pediátrico obeso, qual conduta está correta?',
        alts: [
          { t: 'Aferir PA só anualmente, como na criança não obesa, e pedir lipidograma em qualquer idade', correct: false, why: 'Mantém o espaçamento errado e ignora o corte: a obesidade <strong>muda</strong> a periodicidade da PA (anual → toda consulta); e o lipidograma não é "qualquer idade". <em>Por que cair na A</em>: trata-se o obeso como a criança não obesa.' },
          { t: 'Aferir PA em toda consulta (mesmo sem hipertensão) e pedir lipidograma acima de 2 anos', correct: true, why: 'Certa. No obeso, a PA é de <strong>toda consulta</strong> (busca ativa de hipertensão, mesmo no não hipertenso), diferente do espaçamento anual da criança não obesa; e o lipidograma se pede <strong>acima de 2 anos</strong> (antes disso pode vir alterado sem significado).' },
          { t: 'Aferir PA apenas se houver sintomas e nunca pedir lipidograma', correct: false, why: 'Subnotifica a busca: a PA não espera sintoma no obeso — é busca ativa; e o lipidograma é, sim, indicado (> 2a). <em>Por que cair na C</em>: confunde-se rastreio com investigação sintomática.' },
          { t: 'Aferir PA em toda consulta e pedir lipidograma já no primeiro mês de vida', correct: false, why: 'Erra o corte do lipidograma: lipidograma no primeiro mês não tem significado objetivo — o corte é <strong>> 2 anos</strong>. <em>Por que cair na D</em>: acerta a PA mas antecipa o lipidograma para idade onde não se faz.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 8 — E4 Achado típico / pegadinha (fecha o mapa) ===================== */
  P.push(page('p8', 8, `
    ${tag('pato', 'Comorbidades · fechamento do mapa (parte 2)')}
    ${chips(['diabetes/RI → glicemia', 'acantose nigricans', 'síndrome metabólica >10a', 'CA por percentil'])}

    <aside class="opener opener--trap" aria-label="Achado de abertura">
      <svg class="opener__trap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="opener__trap-body">
        <p class="opener__trap-tag">Achado típico</p>
        <p class="opener__trap-text">Pescoço e axilas escurecidos = <strong>acantose nigricans</strong>, a marca da <strong>resistência insulínica</strong> na pele. A pele entrega o pâncreas — antes mesmo do laboratório.</p>
      </div>
    </aside>

    <h1 class="page-title">Diabetes, síndrome metabólica e o fechamento do mapa (parte 2)</h1>

    <div class="prose">
      <h3 class="topic-h">Diabetes e resistência insulínica → glicemia</h3>
      <p><span class="hl-bad">Comorbidade 4 — DIABETES e RESISTÊNCIA INSULÍNICA.</span> O paciente obeso tem risco <strong>muito maior</strong> de ser diabético e, <strong>antes disso</strong>, de desenvolver <span class="term">resistência insulínica</span>. O mecanismo: a <strong>glicose em excesso</strong> sobrecarrega o pâncreas, que produz <strong>mais insulina</strong> para contrabalançar — instala-se um processo inicial de <strong>resistência à insulina</strong>. A investigação básica e fácil é a <span class="term">glicemia</span> (a mera glicemia). O paciente obeso deve fazê-la com <strong>certa frequência</strong> — é o exame simples que rastreia o caminho do pâncreas sobrecarregado para o diabetes.</p>

      <h3 class="topic-h">A marca na pele: acantose nigricans</h3>
      <p>A resistência insulínica tem uma <span class="term">assinatura cutânea</span>: a <span class="hl-bad">acantose nigricans</span> — um <strong>escurecimento da pele</strong> em algumas áreas, classicamente <strong>pescoço</strong> e <strong>axila</strong>. É a marca clínica da resistência à insulina: vendo a acantose, pensa-se no pâncreas sobrecarregado. É um achado de ouro porque é visível ao exame — uma pista que aponta para a glicemia e para o risco metabólico antes mesmo do laboratório.</p>

      <h3 class="topic-h">Síndrome metabólica (só >10a) → circunferência abdominal</h3>
      <p><span class="hl-bad">Comorbidade 5 — SÍNDROME METABÓLICA.</span> Detalhe etário decisivo: ela só deve ser diagnosticada em paciente obeso <span class="hl-warn">acima de 10 anos</span>. Sua investigação <strong>reúne vários exames já citados</strong> — lipidograma, avaliação do fígado, avaliação da pressão arterial, glicemia. E acrescenta um parâmetro próprio e <strong>muito importante</strong> para fechar o diagnóstico: a <span class="term">circunferência abdominal</span>. Mas atenção ao jeito de medir na pediatria: a circunferência abdominal <span class="hl-warn">NÃO tem valor padrão fechado</span> — avalia-se por <strong>percentis</strong> (varia por idade e outros parâmetros). Quase tudo na pediatria é avaliado por percentil, e a CA não foge à regra: não se busca um número único em centímetros como no adulto.</p>

      <h3 class="topic-h">O mapa fechado, comorbidade por comorbidade</h3>
      <p>Fechando o macete que evita o branco na prova — raciocinar os exames <strong>pelas comorbidades</strong>:</p>
      <ul>
        <li><span class="hl-bad">Hipertensão</span> → <strong>PA</strong> (em toda consulta no obeso)</li>
        <li><span class="hl-bad">Dislipidemia</span> → <strong>lipidograma</strong> (> 2 anos)</li>
        <li><span class="hl-bad">Esteatose</span> → <strong>ALT</strong> (antes do ultrassom)</li>
        <li><span class="hl-bad">Diabetes / resistência insulínica</span> → <strong>glicemia</strong> (+ acantose nigricans ao exame)</li>
        <li><span class="hl-bad">Síndrome metabólica</span> → <strong>circunferência abdominal</strong> (por percentil, só > 10 anos)</li>
      </ul>
      <p>Definir as comorbidades não é só diagnóstico — é o passo <strong>fundamental</strong> para, em seguida, traçar os <strong>objetivos de tratamento</strong>.</p>
    </div>

    ${svgPiso(8, { caption: 'o mapa comorbidade → exame (fechado) — cinco comorbidades; clique em cada uma e acende o exame e o detalhe (PA toda consulta; lipidograma > 2a; ALT; glicemia + acantose; CA por percentil, > 10a). "Revelar tudo" monta o mapa inteiro — antecipa o painel-mestre.', hint: 'Toque/clique ou Tab + Enter; exame e detalhe anunciados por leitor de tela.' })}

    ${med({
      file: 'p8-acantose-nigricans-pescoco.jpg',
      alt: 'Pescoço de paciente pediátrico com acantose nigricans: pele escurecida, espessada e aveludada com acentuação das linhas cutâneas — sinal cutâneo de resistência insulínica.',
      achado: '<strong>Acantose nigricans no pescoço</strong> — pele escurecida, espessada e aveludada, com acentuação das linhas (papilomatose), em paciente pediátrico. A pele entrega o pâncreas: marca da resistência insulínica.',
      fonte: 'Pollock S. et al., "Acanthosis nigricans in the pediatric population", Pediatric Medicine (AME), via PMC (PMC9678372)',
      licenca: 'CC BY-NC-ND 4.0 (uso educacional não-comercial)'
    })}

    ${notaValor('<strong>Glicemia de jejum (cortes SBP / Quadro 3)</strong>: &lt; 100 adequada · 100–126 alterada · ≥ 126 = DM. TTOG: ≥ 140 a &lt; 200 (intolerância) · ≥ 200 (DM). O ensino traz "a mera glicemia"; estes são os cortes de prova.')}

    ${notaValor('<strong>Síndrome metabólica (critério SBP/IDF 2007, 10–16 anos)</strong>: <strong>CC ≥ P90 + 2 de</strong> — TG ≥ 150 · HDL &lt; 40 · PA ≥ 130/85 · glicemia ≥ 100. É o critério oficial BR; a circunferência abdominal entra por percentil (corte operacional <strong>CC ≥ P90</strong>), não por cm fixo.')}

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Corte de 2 anos</h4><p>Lipidograma e classificação CDC — um limiar.</p></div>
        <div class="dont-confuse__side"><h4>Corte de 10 anos</h4><p>Síndrome metabólica — outro limiar, de propósito diferente. Síndrome metabólica só se fecha <strong>acima de 10 anos</strong>. Não misture os dois.</p></div>
      </div>
    </div>

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>A banca cobra o <strong>corte de 10 anos</strong> da síndrome metabólica, a <strong>acantose nigricans</strong> como sinal de resistência insulínica e a <strong>circunferência abdominal por percentil</strong> (não cm fixo). O mapa fechado comorbidade → exame resolve a maioria das questões.</p>
    </aside>

    ${quiz('p8', 'Diabetes/RI, síndrome metabólica e o fechamento do mapa.', [
      {
        stem: 'Um adolescente obeso de 13 anos apresenta escurecimento da pele no pescoço e nas axilas. Qual o significado desse achado e o exame associado?',
        alts: [
          { t: 'Sinal de dislipidemia; pedir lipidograma', correct: false, why: 'Troca a comorbidade: a acantose marca resistência insulínica/risco de diabetes, não dislipidemia; o lipidograma é de outra comorbidade. <em>Por que cair na A</em>: associa-se qualquer achado cutâneo a "gordura/lipídio".' },
          { t: 'Acantose nigricans, marca de resistência insulínica; investigar com glicemia', correct: true, why: 'Certa. O escurecimento de pescoço e axilas é a <strong>acantose nigricans</strong>, marca clínica da resistência insulínica — aponta para o pâncreas sobrecarregado e indica a <strong>glicemia</strong> como investigação básica.' },
          { t: 'Sinal de esteatose; pedir ultrassom hepático', correct: false, why: 'Troca o órgão: a acantose é cutânea e metabólica (insulina), não hepática; esteatose se rastreia por ALT. <em>Por que cair na C</em>: confunde-se um sinal de pele com acúmulo de gordura no fígado.' },
          { t: 'Achado sem significado clínico', correct: false, why: 'Ignora um sinal de ouro: a acantose é altamente significativa — é justamente a pista visual da resistência insulínica. <em>Por que cair na D</em>: subestima-se um achado patognomônico.' },
        ]
      },
      {
        stem: 'Sobre a síndrome metabólica e a circunferência abdominal na pediatria, qual afirmação está correta?',
        alts: [
          { t: 'A síndrome metabólica pode ser diagnosticada em qualquer idade, e a CA tem valor fixo em cm como no adulto', correct: false, why: 'Erra os dois pontos: há corte etário (> 10a) e a CA é por percentil — não vale "qualquer idade" nem "cm fixo". <em>Por que cair na A</em>: importa-se a lógica do adulto (CA em cm) e ignora-se o limiar de 10 anos.' },
          { t: 'A síndrome metabólica só se diagnostica acima de 10 anos, e a CA é avaliada por percentil (não por cm fixo)', correct: true, why: 'Certa. Dois pontos: a síndrome metabólica só se diagnostica <strong>acima de 10 anos</strong>, e a circunferência abdominal pediátrica é avaliada por <strong>percentil</strong> (varia por idade/sexo), não por um cm fixo de adulto.' },
          { t: 'A CA não faz parte da avaliação da síndrome metabólica', correct: false, why: 'Retira um parâmetro central: a CA é <strong>muito importante</strong> para fechar a síndrome metabólica — não está de fora. <em>Por que cair na C</em>: esquece-se o parâmetro que o tema destaca como decisivo.' },
          { t: 'A síndrome metabólica dispensa lipidograma, PA e glicemia', correct: false, why: 'Descarta os exames que a compõem: a síndrome metabólica <strong>reúne</strong> lipidograma, PA, glicemia e avaliação do fígado — mais a CA. <em>Por que cair na D</em>: confunde-se "acrescenta a CA" com "substitui os demais".' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 9 — E1 Pergunta central ===================== */
  P.push(page('p9', 9, `
    ${tag('sys', 'Tratamento · idade × comorbidade')}
    ${chips(['nem todo obeso perde', 'manter <7a', 'perder gradual >7a', 'nunca dieta <2a'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Se o adulto obeso deve perder peso, por que numa criança pequena obesa o objetivo pode ser exatamente o contrário — manter o peso?</p>
    </section>

    <h1 class="page-title">A pegadinha do tratamento: nem toda criança obesa perde peso</h1>

    <div class="prose">
      <h3 class="topic-h">O conceito contraintuitivo</h3>
      <p>Aqui está o conceito que a banca adora porque contraria o instinto: <span class="hl-warn">nem toda criança obesa deve perder peso</span>. A regra "perder peso" vale muito para o <strong>adulto</strong>, mas na criança <strong>não é assim</strong>. O objetivo do tratamento <span class="term">depende de dois fatores</span>: a <strong>idade</strong> da criança e se ela <strong>já desenvolveu ou não alguma comorbidade</strong>. É a combinação desses dois eixos que decide se o alvo é <strong>manter</strong> o peso ou <strong>perder</strong> peso — e por isso o tratamento da obesidade infantil não tem uma resposta única.</p>

      <h3 class="topic-h">Sem comorbidade e pequena (&lt;7a): MANTER o peso</h3>
      <p>Criança obesa <strong>sem comorbidade</strong> e <strong>pequena (menos de 7 anos)</strong>: o objetivo é <span class="hl-good">MANTER</span> o peso — não ganhar, não perder. A lógica é elegante: a criança abaixo de 7 anos ainda tem <strong>muito o que crescer</strong>. Mantendo o peso enquanto <strong>cresce em estatura</strong>, ela equilibra o quadro — o IMC (peso ÷ estatura²) <strong>começa a normalizar</strong> porque a <strong>estatura aumenta</strong> e o peso se mantém, invertendo a relação do IMC. É o mesmo denominador da pegadinha endócrina, agora trabalhando a favor: deixar a estatura crescer "dilui" o IMC. E há um motivo forte para <strong>não restringir calorias</strong> na criança pequena: o medo é <strong>desacelerar/retardar o metabolismo e o crescimento</strong>. Uma dieta de perda de peso numa criança menor de 7 anos pode <strong>retardar o crescimento</strong> e, por isso, até <strong>piorar</strong> o quadro de obesidade. Não é o que se quer.</p>

      <h3 class="topic-h">Sem comorbidade e >7a: PERDER gradual</h3>
      <p>Criança obesa <strong>sem comorbidade</strong> e com <strong>mais de 7 anos</strong>: já se considera criança <strong>"grande"</strong>. Aí sim o objetivo é <span class="hl-warn">PERDER</span> peso — mas de forma <strong>gradativa</strong>, nada abrupto. Reeducação e perda de peso <strong>aos poucos</strong>. A diferença para a criança pequena é o potencial de crescimento: a maior já não "dilui" tanto o IMC pela estatura, então a perda gradual entra como objetivo, sem pressa e sem restrição agressiva.</p>

      <h3 class="topic-h">Com comorbidade e >2a: PERDER — mas nunca &lt;2a</h3>
      <p>Criança obesa <strong>COM comorbidade</strong> (já tem resistência insulínica, diabetes, hipertensão ou dislipidemia) e <strong>acima de 2 anos</strong>: a recomendação é <strong>unânime</strong> — <span class="hl-bad">PERDER</span> peso (gradativamente, mas tem que perder). Sinal vermelho ligado: a comorbidade antecipa a indicação de perda. Mas há um piso etário inviolável: <span class="hl-bad">NÃO se faz dieta de perda de peso para criança menor de 2 anos</span> — <strong>mesmo com comorbidade</strong>. Por quê? Porque a criança menor de 2 anos está em <span class="term">neurodesenvolvimento</span> (período de crescimento do cérebro — daí o perímetro cefálico ser obrigatório pelo menos até os 2 anos). Restrição energética abaixo de 2 anos <strong>prejudica o neurodesenvolvimento</strong>. Por isso ninguém faz isso abaixo de 2 anos, comorbidade ou não.</p>
    </div>

    ${svgPiso(9, { caption: 'a escada do objetivo — defina dois eixos: idade (slider) e comorbidade (sim/não); a saída acende o objetivo (MANTER × PERDER gradual × PERDER × nunca dieta &lt;2a) com a justificativa. Cenários-chave pré-carregados (5a sem comorbidade → manter; 9a sem comorbidade → perder gradual; 12a com comorbidade → perder; 1a → nunca dieta).', hint: 'Slider + toggle, ou teclado; objetivo e motivo anunciados por leitor de tela.' })}

    ${med({
      file: 'p9-alimentacao-saudavel-frutas.jpg',
      alt: 'Crianças em idade escolar comendo pêssegos frescos no refeitório, ilustrando alimentação equilibrada na infância.',
      achado: '<strong>Alimentação equilibrada na infância</strong> — crianças comendo fruta fresca no contexto escolar. Na criança pequena, manter o peso enquanto a estatura sobe já dilui o IMC.',
      fonte: 'CPS Students Enjoying Fresh Peaches, U.S. Department of Agriculture (USDA), via Wikimedia Commons',
      licenca: 'CC BY 2.0 / domínio público federal US',
      tarja: 'p9'
    })}

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Corte de 7 anos</h4><p>Separa "manter" de "perder" na criança <strong>sem</strong> comorbidade.</p></div>
        <div class="dont-confuse__side"><h4>Corte de 2 anos</h4><p>Piso absoluto abaixo do qual <strong>nunca</strong> se faz dieta de perda (nem com comorbidade). São limiares diferentes, de propósitos diferentes.</p></div>
      </div>
    </div>

    <aside class="trap">
      <svg class="trap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text">Criança obesa <strong>pequena (&lt;7a) sem comorbidade</strong> → <strong>manter</strong> o peso (não perder); <strong>&lt;2 anos</strong> → <strong>nunca</strong> dieta de perda, mesmo com comorbidade.</p>
      </div>
    </aside>

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>A banca cobra a <strong>escada idade × comorbidade</strong> — e adora a contraintuição do "manter o peso" na criança pequena e o piso dos 2 anos pelo neurodesenvolvimento.</p>
    </aside>

    ${quiz('p9', 'A escada de objetivo por idade × comorbidade.', [
      {
        stem: 'Criança de 5 anos, obesa, sem nenhuma comorbidade. Qual o objetivo do tratamento?',
        alts: [
          { t: 'Perder peso de forma agressiva', correct: false, why: 'Aplica a regra do adulto: perda agressiva numa criança pequena pode desacelerar o crescimento e <strong>piorar</strong> o quadro. <em>Por que cair na A</em>: transfere-se a conduta do adulto ("obeso perde peso") para a criança pequena.' },
          { t: 'Manter o peso, deixando a estatura crescer para normalizar o IMC', correct: true, why: 'Certa. Criança pequena (&lt;7a) sem comorbidade: o objetivo é <strong>manter</strong> o peso. Como ela ainda cresce muito, manter o peso enquanto a estatura sobe normaliza o IMC (peso ÷ estatura²) — e restringir calorias poderia retardar o crescimento.' },
          { t: 'Ganhar peso para acompanhar o crescimento', correct: false, why: 'Inverte o objetivo: o alvo é <strong>manter</strong> (não ganhar) — ganhar peso pioraria a obesidade. <em>Por que cair na C</em>: confunde-se "não restringir" com "estimular ganho".' },
          { t: 'Iniciar medicamento para perda de peso', correct: false, why: 'Salta para o fármaco: medicamento não é primeira linha (e nem regulamentado nessa idade) — o caminho é não medicamentoso. <em>Por que cair na D</em>: antecipa-se o medicamento à conduta de base.' },
        ]
      },
      {
        stem: 'Por que não se prescreve dieta de perda de peso para uma criança menor de 2 anos, mesmo que ela tenha comorbidade?',
        alts: [
          { t: 'Porque abaixo de 2 anos a obesidade não existe', correct: false, why: 'Nega um fato: excesso de peso existe antes dos 2 anos (a classificação do MS começa em 0–5); o motivo do "não fazer dieta" é o neurodesenvolvimento, não a inexistência. <em>Por que cair na A</em>: confunde-se "não se restringe" com "não há obesidade".' },
          { t: 'Porque está em neurodesenvolvimento (crescimento cerebral), e a restrição energética o prejudica', correct: true, why: 'Certa. O piso dos 2 anos é absoluto: a criança está em <strong>neurodesenvolvimento</strong> (crescimento do cérebro — por isso o perímetro cefálico é obrigatório até os 2 anos), e a restrição energética prejudica esse processo. Por isso não se faz dieta de perda &lt;2a, mesmo com comorbidade.' },
          { t: 'Porque a comorbidade abaixo de 2 anos é sempre leve', correct: false, why: 'Inventa uma gravidade: o motivo não é a comorbidade ser leve — é a proteção do cérebro em desenvolvimento. <em>Por que cair na C</em>: cria-se uma justificativa clínica inexistente.' },
          { t: 'Porque o objetivo nessa idade é sempre ganhar peso', correct: false, why: 'Generaliza um objetivo errado: o objetivo &lt;2a não é "ganhar peso" — é não restringir energia (proteger o neurodesenvolvimento). <em>Por que cair na D</em>: troca-se "não fazer dieta de perda" por "estimular ganho".' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 10 — E5 Meta + checklist ===================== */
  P.push(page('p10', 10, `
    ${tag('fisio', 'Tratamento · o tripé não medicamentoso')}
    ${chips(['dieta + atividade + menos tela', 'atividade DIÁRIA', 'tela zero <2a', 'remédio não é 1ª linha'])}

    <section class="opener opener--checklist" aria-label="Meta da página">
      <p class="opener__checklist-title">Ao final desta página você domina:</p>
      <ul class="opener__checklist">
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>as <strong>três pernas do tripé</strong> do tratamento</span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>o número da <strong>atividade física (diária)</strong> e o da <strong>tela (zero &lt;2a)</strong></span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>por que o <strong>medicamento não é a primeira linha</strong> na criança</span></li>
      </ul>
    </section>

    <h1 class="page-title">O tripé que reverte o balanço (e por que o remédio não é o caminho)</h1>

    <div class="prose">
      <h3 class="topic-h">O tripé: dieta + atividade física + menos sedentarismo</h3>
      <p>O tratamento para reduzir o peso é um <span class="term">tripé</span> de medidas do dia a dia que comprovadamente reduzem peso — a maior obviedade da matéria, mas que cai e tem detalhes. As três pernas:</p>
      <ul>
        <li><span class="hl-good">Perna 1 — Planejamento dietético</span>: diminuir a ingestão de calorias e de ultraprocessados; <strong>aumentar</strong> a ingestão de fibras, legumes, frutas e proteínas.</li>
        <li><span class="hl-good">Perna 2 — Atividade física</span>: fazer a criança <strong>gastar energia</strong>.</li>
        <li><span class="hl-good">Perna 3 — Redução do sedentarismo</span>: o sedentarismo vem do excesso de <strong>telas</strong> e de ficar o dia dentro de casa.</li>
      </ul>
      <p>A lógica fecha o ciclo do tema: a principal causa de obesidade infantil é a <strong>primária/exógena</strong> (come muita caloria, gasta pouca); o tratamento <strong>inverte</strong> isso — <strong>comer menos caloria, gastar mais energia</strong>.</p>

      <h3 class="topic-h">Os números: atividade diária, tela zero &lt;2a</h3>
      <p>Os detalhes que a banca cobra dentro do tripé:</p>
      <ul>
        <li><span class="hl-bad">Atividade física é DIÁRIA</span>. Não é duas vezes por semana, <strong>não</strong> é a educação física do colégio — para perda de peso significativa, a recomendação é atividade física <strong>todos os dias</strong>.</li>
        <li><span class="hl-bad">Tela zero abaixo de 2 anos</span>: a recomendação da SBP é que crianças menores de 2 anos <strong>não tenham contato com tela</strong> — <strong>zero tela</strong>. É o mesmo piso dos 2 anos do neurodesenvolvimento, agora aplicado às telas.</li>
      </ul>

      <h3 class="topic-h">Medicamento não é primeira linha</h3>
      <p>E o remédio? Aqui a informação-chave: <span class="hl-bad">não existe medicamento para perda de peso bem regulamentado para criança abaixo de 10 anos</span>. Existem <strong>algumas opções</strong> de medicamento na criança (algumas ainda em <strong>desenvolvimento / em fase de aprovação</strong>), mas o ponto que resolve a questão é: <span class="hl-bad">medicamento NÃO é opção de primeira linha</span> de perda de peso na criança. O medicamento é opção <strong>apenas acima de certas idades</strong> e <strong>quando as medidas não medicamentosas (o tripé) não funcionaram</strong>. Na criança, o que se faz são <strong>reeducações e orientações</strong> — o tripé primeiro, sempre.</p>
    </div>

    ${svgPiso(10, { caption: 'monte o tripé — ative as três pernas (dieta, atividade física, redução do sedentarismo); ao montar as três, a "mesa" do tratamento fica de pé e o painel mostra a reversão do balanço (come menos / gasta mais). O quarto botão "medicamento" aparece apagado, com a nota "não é primeira linha — só depois do tripé, acima de certas idades".', hint: 'Toque/clique cada perna, ou Tab + Enter; o estado do tripé é anunciado por leitor de tela.' })}

    ${med({
      file: 'p10-atividade-fisica-crianca.jpeg',
      alt: 'Grupo de crianças em idade pré-escolar correndo ao ar livre durante um festival esportivo, ilustrando atividade física diária.',
      achado: '<strong>Atividade física diária ao ar livre</strong> — crianças correndo num festival esportivo escolar. Gastar energia todo dia é a perna do tripé que a banca cobra (diária, não 2×/semana).',
      fonte: 'Kindergarten Sports Festival, September 2013, by MIKI Yoshihito, via Wikimedia Commons',
      licenca: 'CC BY 2.0',
      tarja: 'p10'
    })}

    ${notaValor('<strong>Atividade física = 60 min/dia</strong> moderada-vigorosa (OMS/SBP). O ensino enfatiza "diária"; este é o número de duração. <strong>Escada de telas SBP</strong>: &lt; 2a zero tela · 2–5a máx. 1h/dia supervisionada · adolescentes lazer sedentário ≤ 2h/dia.')}

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text">O tripé = <strong>dieta + atividade física (diária) + menos tela</strong>; reverte o balanço (come menos, gasta mais). Medicamento? <strong>não é a primeira linha</strong>.</p>
    </aside>

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>A banca cobra a <strong>frequência diária</strong> da atividade física, a <strong>tela zero &lt;2a</strong> e o lugar do <strong>medicamento</strong> (não primeira linha, depois do tripé). O tripé é a base; o fármaco é exceção tardia.</p>
    </aside>

    ${quiz('p10', 'O tripé não medicamentoso e a hierarquia de tratamento.', [
      {
        stem: 'Sobre a atividade física no tratamento da obesidade infantil, qual é a recomendação para perda de peso significativa?',
        alts: [
          { t: 'Duas vezes por semana', correct: false, why: 'Subdimensiona a frequência: 2×/semana é insuficiente para a meta de perda — a recomendação é diária. <em>Por que cair na A</em>: confunde-se "fazer exercício às vezes" com a frequência recomendada.' },
          { t: 'Atividade física diária', correct: true, why: 'Certa. Para perda de peso significativa, a recomendação é atividade física <strong>diária</strong> — todos os dias. Não basta 2×/semana nem a educação física escolar.' },
          { t: 'Apenas a educação física do colégio', correct: false, why: 'Terceiriza para a escola: a educação física do colégio não substitui a atividade diária recomendada. <em>Por que cair na C</em>: assume-se que a educação física escolar, sozinha, já cumpre a meta.' },
          { t: 'Somente após iniciar medicamento', correct: false, why: 'Inverte a hierarquia: a atividade física é parte do <strong>tripé de primeira linha</strong> — não depende de medicamento (que nem é primeira linha). <em>Por que cair na D</em>: coloca-se o fármaco antes da medida de base.' },
        ]
      },
      {
        stem: 'Sobre o tratamento medicamentoso da obesidade na criança, qual afirmação está correta?',
        alts: [
          { t: 'É a primeira linha de tratamento em qualquer idade', correct: false, why: 'Absolutiza o fármaco: ele não é primeira linha nem está liberado para todas as idades — abaixo de 10 anos não há regulamentação. <em>Por que cair na A</em>: assume-se que existe "remédio para emagrecer" pediátrico de uso amplo.' },
          { t: 'Não é primeira linha; não há fármaco bem regulamentado abaixo de 10 anos, e o tripé vem antes', correct: true, why: 'Certa. O medicamento <strong>não é primeira linha</strong> na criança: não há fármaco bem regulamentado &lt;10 anos, as opções existem (algumas em desenvolvimento), e o caminho é o tripé/reeducação primeiro — o fármaco entra só acima de certas idades e quando as medidas não medicamentosas falharam.' },
          { t: 'Está liberado e regulamentado para todas as idades pediátricas', correct: false, why: 'Absolutiza na outra ponta: não está liberado para todas as idades — abaixo de 10 anos não há regulamentação. <em>Por que cair na C</em>: confunde-se "existem opções" com "liberado para todos".' },
          { t: 'Substitui a necessidade do tripé não medicamentoso', correct: false, why: 'Descarta a base: o medicamento não substitui o tripé — ele é exceção tardia, sempre em conjunto com (e depois de) as medidas de estilo de vida. <em>Por que cair na D</em>: confunde-se "opção em casos refratários" com "substituto do tratamento de base".' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 11 — E3 Caso clínico (fechamento) · HERÓI ===================== */
  P.push(page('p11', 11, `
    ${tag('case', 'Fechamento · o veredito da Maju')}
    ${chips(['IMC 19,22', '5 anos → 5–19', 'entre Z+2 e Z+3', 'OBESIDADE', 'painel-mestre'])}

    <article class="opener opener--case" aria-label="Caso clínico de abertura">
      <span class="opener__case-header">De volta à Maju · o número agora calculado</span>
      <p class="opener__case-quote">A queixa subjetiva ("gordinha") virou número: <strong>20 kg / 102 cm → IMC 19,22</strong>. Mas o número solto engana — aos 5 anos, jogado na curva por idade, ele decide o rótulo. O caso da Maju abriu o raciocínio e agora o fecha.</p>
      <dl class="case-card__meta">
        <dt>Dados</dt><dd>20 kg · 102 cm (1,02 m) · 5 anos completos</dd>
        <dt>Cálculo</dt><dd>20 ÷ (1,02)² = 20 ÷ 1,0404 = IMC 19,22</dd>
        <dt>Faixa</dt><dd>5 anos completos → 5–19 anos</dd>
        <dt>Posição</dt><dd>entre escore-Z +2 e +3</dd>
        <dt>Diagnóstico</dt><dd>OBESIDADE (se tivesse 4a11m, seria sobrepeso)</dd>
      </dl>
    </article>

    <h1 class="page-title">Fechando a Maju: o número solto que engana e o mapa que decide</h1>

    <div class="prose">
      <h3 class="topic-h">O cálculo: 20 kg, 102 cm → IMC 19,22</h3>
      <p>Hora de fechar a Maju com os números que a mãe trouxe. Dados: <span class="term">20 kg</span> e <span class="term">102 cm</span> (1,02 m). Aplicando a fórmula — peso ÷ estatura² — a conta é <strong>20 ÷ (1,02)²</strong> = 20 ÷ 1,0404 = <span class="term">19,22</span>. Esse é o IMC da Maju, calculado à mão, exatamente o tipo de continha que a prova pede quando não dá o número pronto.</p>

      <h3 class="topic-h">A armadilha do IMC isolado (lógica de adulto ≠ criança)</h3>
      <p>E aqui está a <span class="hl-bad">armadilha</span> que a banca planta. Para um <strong>adulto</strong> — uma mulher, por exemplo — um IMC de <strong>19,22</strong> pareceria <strong>ótimo/bom</strong>, dentro da faixa normal. Mas essa é <strong>lógica de adulto</strong>. Na <span class="hl-bad">criança</span>, é <strong>obrigatório jogar o valor no gráfico</strong> — <span class="hl-bad">não se interpreta o número solto</span>. O mesmo 19,22 que tranquilizaria num adulto pode significar obesidade numa criança, dependendo da idade. O número sozinho não diz nada; o gráfico por idade é quem decide. Quem lê o IMC infantil com régua de adulto erra o diagnóstico.</p>

      <h3 class="topic-h">A idade decide o rótulo: 5 anos → OBESIDADE</h3>
      <p>A Maju tem <span class="term">5 anos</span> (irmã gêmea da Manu). Cinco anos <strong>completos</strong> a colocam na faixa <span class="term">5–19 anos</span> — e isso muda tudo. Plotado o IMC 19,22 no gráfico, a Maju está <span class="hl-bad">acima do escore-Z +2</span> e ainda <strong>abaixo do escore-Z +3</strong> — ou seja, <strong>entre Z+2 e Z+3</strong>. Na faixa 5–19, esse degrau é <span class="hl-bad">OBESIDADE</span> (não sobrepeso). O detalhe fino: se a Maju tivesse <strong>4 anos e 11 meses</strong> (faixa 0–5), o <strong>mesmo</strong> IMC entre Z+2 e Z+3 seria <span class="hl-warn">sobrepeso</span>, não obesidade. É o limiar dos 5 anos fazendo o rótulo trocar — a pegadinha-mestra do tema, ao vivo. Diagnóstico da Maju: <span class="hl-bad">OBESIDADE</span>. Com isso, encerra-se a avaliação dos distúrbios do crescimento.</p>

      <h3 class="topic-h">O painel-mestre que sintetiza tudo</h3>
      <p>A Maju amarra o tema inteiro: a queixa subjetiva ("gordinha") virou número (IMC 19,22), o número solto enganaria pela lógica de adulto, e foi a <strong>faixa etária</strong> (5 anos → 5–19) que decidiu o rótulo (obesidade). O painel-mestre ao lado reúne os três eixos do tema num só mapa — a classificação nas duas faixas etárias, o mapa comorbidade → exame e a árvore de objetivo de tratamento — com a Maju plotada exatamente no degrau que a classifica.</p>
    </div>

    ${svgHero('p11', { caption: 'o painel-mestre da obesidade infantil — três eixos integrados num só mapa: (1) a classificação nas duas faixas etárias (0–5 × 5–19) com os cortes Z+1/Z+2/Z+3 e a equivalência de percentis MS × CDC, sem fundir; (2) o mapa comorbidade → exame (PA, lipidograma, ALT, glicemia, circunferência abdominal); (3) a árvore de objetivo de tratamento por idade/comorbidade. Ative o toggle de faixa etária para ver o mesmo Z trocar de rótulo; ative a Maju (IMC 19,22, 5 anos) para o veredito: OBESIDADE.' })}

    ${med({
      file: 'p11-imc-meninas-zscore.png',
      alt: 'Gráfico oficial da OMS de IMC-para-idade para meninas de 5 a 19 anos em escore-Z, com as linhas +2 (vermelha), +1, 0, -2 e -3 e as zonas de obesidade, sobrepeso, normal e magreza.',
      achado: '<strong>A Maju no gráfico</strong> — curva IMC-para-idade, meninas, 5–19 anos (escore-Z). Aos 5 anos, um IMC de 19,22 cai <strong>entre Z+2 e Z+3</strong> — na zona de <strong>obesidade</strong> (a linha +2 vermelha está em ~19 aos 5 anos).',
      fonte: 'BMI-for-age GIRLS 5–19 years (z-scores), © WHO 2007 Growth Reference (base MS/SISVAN)',
      licenca: 'OMS — uso educacional com atribuição'
    })}

    <div class="dont-confuse">
      <div class="dont-confuse__label">Não confunda</div>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side"><h4>Não é "normal" porque parece bom no adulto</h4><p>IMC 19,22 pareceria ótimo num adulto.</p></div>
        <div class="dont-confuse__side"><h4>Na criança, decide o gráfico por idade</h4><p>Aos 5 anos (faixa 5–19), entre Z+2 e Z+3, é <strong>obesidade</strong>. O número solto não classifica.</p></div>
      </div>
    </div>

    <aside class="op-summary">
      <p class="op-summary__label">Resumo operacional</p>
      <p>Maju = 20 kg / 102 cm → <strong>IMC 19,22</strong>; não se lê o número solto (lógica de adulto engana); <strong>5 anos → faixa 5–19</strong> → entre <strong>Z+2 e Z+3</strong> → <strong>OBESIDADE</strong>.</p>
    </aside>

    <aside class="board-wants">
      <span class="board-wants__label"><span class="board-wants__target" aria-hidden="true"></span>O que a banca quer</span>
      <p>A banca dá peso e altura (forçando o cálculo do IMC), planta a armadilha do "número que parece bom de adulto" e coloca a idade <strong>no limiar dos 5 anos</strong> — testando se o aluno calcula, joga no gráfico e troca a faixa (e o rótulo) corretamente.</p>
    </aside>

    <aside class="practice">
      <p class="practice__label">O que diferencia o aluno avançado</p>
      <p>Calcula o IMC sem hesitar, recusa a leitura do número solto, identifica a faixa etária certa pela idade exata (5 anos completos × 4a11m), aplica o degrau correto da tabela do MS e sabe que o mesmo escore-Z mudaria de rótulo se a faixa mudasse. No fim: reconhece a obesidade como diagnóstico numérico, classifica pelos dois sistemas (MS por escore-Z em duas faixas × CDC por percentil) sem fundi-los, investiga as comorbidades pelo mapa comorbidade → exame, traça o objetivo de tratamento pela escada idade × comorbidade e fecha o caso aplicando a faixa etária certa — sem cair nas pegadinhas (o número solto que engana, o rótulo que muda com a idade, o ultrassom que não é o exame inicial da esteatose, o medicamento que não é a primeira linha).</p>
    </aside>

    ${quiz('p11', 'O fechamento da Maju: cálculo, faixa etária e a armadilha do número solto.', [
      {
        stem: 'Maju pesa 20 kg e mede 102 cm. Qual o seu IMC?',
        alts: [
          { t: '17,5', correct: false, why: 'Erra a conta: não resulta de 20 ÷ 1,0404 — é um valor "de chute" que não bate com a divisão correta. <em>Por que cair na A</em>: estima-se o IMC sem fazer a divisão exata pelo quadrado da estatura.' },
          { t: '19,22', correct: true, why: 'Certa. IMC = peso ÷ estatura² = 20 ÷ (1,02)² = 20 ÷ 1,0404 ≈ <strong>19,22</strong>. É a conta à mão que a prova cobra quando não dá o IMC pronto.' },
          { t: '20,4', correct: false, why: 'Erra a conta: também não resulta de 20 ÷ 1,0404 — valor plausível "de chute" que não bate. <em>Por que cair na C</em>: estima-se o IMC sem fazer a divisão exata pelo quadrado da estatura.' },
          { t: '10,2', correct: false, why: 'Ignora o quadrado: 10,2 sugere ter dividido por 2 ou confundido a operação — em todo caso, não elevou a estatura ao quadrado. <em>Por que cair na D</em>: esquece-se de elevar a estatura ao quadrado.' },
        ]
      },
      {
        stem: 'Maju tem 5 anos e IMC entre o escore-Z +2 e o +3. Qual o diagnóstico, e o que aconteceria se ela tivesse 4 anos e 11 meses?',
        alts: [
          { t: 'Sobrepeso aos 5 anos; obesidade aos 4a11m', correct: false, why: 'Inverte os rótulos: aos 5 anos é obesidade (não sobrepeso) e aos 4a11m é sobrepeso (não obesidade) — exatamente o contrário. <em>Por que cair na A</em>: troca-se a direção do degrau etário.' },
          { t: 'Obesidade aos 5 anos (faixa 5–19); aos 4a11m (faixa 0–5) o mesmo IMC seria sobrepeso', correct: true, why: 'Certa. Aos 5 anos completos, a Maju está na faixa <strong>5–19</strong>, onde "entre Z+2 e Z+3" = obesidade. Se tivesse 4a11m (faixa 0–5), o mesmo IMC/escore-Z seria <strong>sobrepeso</strong>. A idade troca o rótulo — a pegadinha-mestra ao vivo.' },
          { t: 'Obesidade em qualquer idade, pois o escore-Z é o mesmo', correct: false, why: 'Ignora a faixa etária: o mesmo escore-Z <strong>não</strong> dá o mesmo rótulo nas duas faixas — aos 4a11m seria sobrepeso. <em>Por que cair na C</em>: lê-se a tabela como coluna única, esquecendo o degrau.' },
          { t: 'Sobrepeso em qualquer idade', correct: false, why: 'Subdimensiona aos 5 anos: aos 5 anos, entre Z+2 e Z+3 é obesidade, não sobrepeso. <em>Por que cair na D</em>: aplica-se o rótulo da faixa pequena à faixa grande.' },
        ]
      },
      {
        stem: 'Por que não se pode dizer que o IMC 19,22 da Maju é "normal/bom" como seria em um adulto?',
        alts: [
          { t: 'Porque o IMC não se aplica a crianças', correct: false, why: 'Nega o uso do IMC: o IMC <strong>se aplica</strong> à criança — só que interpretado por idade na curva, não como valor absoluto. <em>Por que cair na A</em>: confunde-se "interpreta diferente" com "não se aplica".' },
          { t: 'Porque na criança o IMC se interpreta plotando no gráfico por idade — o número solto (lógica de adulto) engana', correct: true, why: 'Certa. Na criança, o IMC <strong>só</strong> se interpreta plotado no gráfico por idade — o número isolado, lido com régua de adulto, engana. 19,22 pareceria bom num adulto, mas aos 5 anos (faixa 5–19), entre Z+2 e Z+3, é obesidade.' },
          { t: 'Porque 19,22 é sempre obesidade, em qualquer pessoa', correct: false, why: 'Absolutiza o número: 19,22 não é "sempre obesidade" — num adulto seria normal; o rótulo depende de idade/curva. <em>Por que cair na C</em>: trata-se o número como rótulo fixo, o erro oposto.' },
          { t: 'Porque a Maju tem comorbidades que mudam o valor', correct: false, why: 'Inventa um dado: o que classifica a Maju como obesa é o IMC plotado na faixa etária, não comorbidades (o enunciado não as cita). <em>Por que cair na D</em>: busca-se uma causa externa para o diagnóstico que o gráfico já dá.' },
        ]
      },
    ])}
  `));

  return P;
}
