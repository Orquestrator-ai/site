# Operação do Contagem nos sites Orquestrator

O painel web fica em `https://orquestrator.ai/admin/contagem/`. O app para iPhone e o painel usam `https://orquestrator-contagem.netlify.app`. O catálogo de domínios e páginas públicas está em `servidor/rotas-publicas.json`. O painel exige a sessão administrativa do projeto Firebase `orquestrator-61836` e a concessão habilitada em `admins/{uid}`. O serviço verifica o token com as regras do próprio Firestore. A verificação fica em cache por até dez segundos.

## Fluxo de uma visita

O coletor em `coletor/orquestrator/visitas.js` registra uma visualização depois que o visitante aceita a medição nas preferências do site. A recusa, a falta de escolha, a opção de exclusão local e os sinais GPC/DNT impedem o envio. Apenas rotas do catálogo podem ser medidas. Cada export recebe uma cópia estática do coletor com o seu domínio, as suas rotas e o endereço do serviço. O registro contém a página pública e, quando disponíveis, origem reduzida ao domínio, tipo de dispositivo, navegador, país e estado. A saída da página permite calcular duração e rolagem. O servidor usa o endereço IP e o agente de usuário para derivar um identificador diário por site e persiste apenas o identificador e as categorias.

O armazenamento fica em Netlify Blobs, região `us-east-2` (Estados Unidos). As consultas usam SQLite em memória para calcular os totais com o mesmo SQL do servidor local. Às 06h13 UTC uma função examina os diretórios mensais e remove em lotes os blocos e anotações anteriores a 24 meses civis completos mais o mês corrente. Os lotes pendentes seguem na execução diária seguinte. A retenção permite comparar 12 meses com o ano anterior.

## Ativação central

Os oito coletores consultam `https://orquestrator.ai/assets/contagem/config.json` somente em uma página pública visível, depois do consentimento para medição. A leitura usa CORS, sem credenciais ou referenciador. A configuração precisa trazer `coletaAtiva: true` e `apiBase: "https://orquestrator-contagem.netlify.app"`. Os navegadores reavaliam essa decisão a cada cinco minutos enquanto a página está visível. A configuração desligada, indisponível ou incompatível impede o envio de eventos. Ao ativar, o painel passa a receber as visitas daquele instante em diante. Publique o valor verdadeiro somente depois de validar o serviço e a autorização administrativa.

## Autorizar um iPhone para leitura

Ao entrar pelo app, o iPhone gera uma chave P-256 temporária e um código aleatório de seis dígitos. O administrador entra em `https://orquestrator.ai/admin/contagem/iphone/`, digita o código mostrado no aparelho e confirma. Na rota `POST /api/iphone/autorizar`, a API verifica a sessão administrativa Firebase e o compromisso criptográfico do código, do estado e da chave pública recebidos. O navegador recebe somente um envelope cifrado para o aparelho. O iPhone retoma a sessão de autorização pelo retorno `br.bauer.contagem://login`. O app dessa versão pode ser assinado por equipe pessoal.

O passe permite apenas `GET /api/sites`, `GET /api/visao`, `GET /api/tabela` e `GET /api/vivo`. Ele expira em até uma hora ou antes, junto com o ID token Firebase que o autorizou. Cada leitura com passe revalida a administração no Firestore. O passe funciona como uma credencial de portador e deve permanecer no armazenamento protegido do aparelho. Perde a validade também em uma nova implantação. As chaves privadas do serviço são aleatórias, criadas por implantação e dia UTC, com escrita condicional em Blobs. A limpeza diária descarta as chaves antigas. Defina `CONTAGEM_IPHONE_DESATIVADO=1` na configuração de funções e publique a configuração caso seja necessário suspender a emissão e a leitura com passe.

## Preparar e testar

Use Node 24 e a raiz do projeto.

```sh
npm ci
node --test testes/admin-firebase.test.mjs testes/nuvem.test.mjs testes/retencao.test.mjs testes/passe-iphone.test.mjs testes/netlify-blobs.test.mjs
node --test coletor/orquestrator/testar-coletor.mjs
```

O teste de Blobs usa o emulador HTTP local da biblioteca Netlify e descarta os dados temporários ao terminar. O serviço SQLite de desenvolvimento continua disponível pelo comando de `servidor/app.mjs` documentado no README.

Para incluir novas páginas, rode `node ferramentas/catalogar-exports.mjs` com os caminhos de **todos** os checkouts publicados, cada um com seu `CNAME`. Em cópias próprias desses exports, rode `python3 coletor/orquestrator/materializar.py --catalogo servidor/rotas-publicas.json` seguido dos mesmos caminhos. Faça a conferência de consentimento, CSP e carregamento de cada página antes de promover os exports produzidos.

## Publicação e conferência

O projeto Netlify de destino é `orquestrator-contagem`. Com a CLI autenticada pelo operador e o site de destino confirmado, o comando da raiz é `netlify deploy --prod --site orquestrator-contagem --dir publico --functions netlify/functions`. O arquivo `netlify.toml` define o diretório estático e as funções. O diretório `publico` inclui o arquivo Apple de associação do domínio, a rota de retorno do login `/iphone/retorno/` e seus cabeçalhos.

Confirme HTTP 200 no `GET /api/saude`, que consulta os metadados do armazenamento. Um `GET /api/sites` sem sessão deve retornar 401. A prova de escrita e leitura exige uma visita consentida em uma página pública e a conferência do resultado sob a conta administrativa no painel ou no iPhone. O endpoint de saúde verifica apenas a disponibilidade de leitura do armazenamento.

A coleta usa `POST /api/evento`. As consultas administrativas são `GET /api/sites`, `GET /api/visao`, `GET /api/tabela`, `GET /api/vivo` e `GET /api/exportar`. A gravação de notas usa `POST /api/anotacao`. O cabeçalho das rotas administrativas é `Authorization: Bearer <ID token Firebase>`. Períodos que excedem 200 mil eventos ou 3 mil blocos numa única consulta retornam HTTP 422 para que o administrador possa escolher um período menor. Ao vivo considera ativos nos últimos cinco minutos.
