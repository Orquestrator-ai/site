// Service Worker — Pediatria/Neonatologia Bauer (HUB + aulas).
// Incrementar CACHE_NAME a cada aula/release dispara auto-update nos usuários da versão anterior.
const CACHE_NAME = 'pediatria-bauer-v33';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/css/tokens.css',
  './assets/css/base.css',
  './assets/css/components.css',
  './assets/js/router.js',
  './assets/js/components/quiz.js',
  './assets/js/components/interactive.js',
  './assets/js/pwa-bootstrap.js',
  './assets/img/icon-192.png',
  './assets/img/icon-512.png',

  // --- Aula 01 — Avaliação do Crescimento ---
  './aulas/aula-01-crescimento/index.html',
  './aulas/aula-01-crescimento/aula.css',
  './aulas/aula-01-crescimento/aula.js',
  './assets/img/aula-01-crescimento/p1-caderneta-peso-idade.png',
  './assets/img/aula-01-crescimento/p2-preescolar-consulta.jpg',
  './assets/img/aula-01-crescimento/p3-balanca-pediatrica.jpg',
  './assets/img/aula-01-crescimento/p4-curva-peso-1ano.png',
  './assets/img/aula-01-crescimento/p5-estadiometro-crianca.jpg',
  './assets/img/aula-01-crescimento/p6-medindo-estatura.jpg',
  './assets/img/aula-01-crescimento/p7-caderneta-perimetro-cefalico.png',
  './assets/img/aula-01-crescimento/p8-caderneta-comprimento-idade.png',
  './assets/img/aula-01-crescimento/p9-caderneta-altura-idade.png',
  './assets/img/aula-01-crescimento/p10-caderneta-peso-idade-5a10.png',
  './assets/img/aula-01-crescimento/p11-caderneta-imc-idade.png',
  './assets/img/aula-01-crescimento/p12-oms-estatura-idade.png',
  './assets/img/aula-01-crescimento/p13-caderneta-identificacao.png',

  // --- Aula 02 — Desnutrição grave ---
  './aulas/aula-02-desnutricao/index.html',
  './aulas/aula-02-desnutricao/aula.css',
  './aulas/aula-02-desnutricao/aula.js',
  './assets/img/aula-02-desnutricao/p1-anasarca-kwashiorkor.jpg',
  './assets/img/aula-02-desnutricao/p2-marasmo-hospital.jpg',
  './assets/img/aula-02-desnutricao/p3-celiaca-atrofia-vilositaria.jpg',
  './assets/img/aula-02-desnutricao/p4-muac-bracial.jpg',
  './assets/img/aula-02-desnutricao/p5-marasmo-pele-osso.jpg',
  './assets/img/aula-02-desnutricao/p5b-face-senil-marasmo.jpg',
  './assets/img/aula-02-desnutricao/p6-kwashiorkor-edema.jpg',
  './assets/img/aula-02-desnutricao/p6b-sinal-bandeira-cabelo.jpg',
  './assets/img/aula-02-desnutricao/p6c-dermatose-kwashiorkor.jpg',
  './assets/img/aula-02-desnutricao/p7-tratamento-hospitalar.jpg',
  './assets/img/aula-02-desnutricao/p8-estabilizacao-tratamento.jpg',
  './assets/img/aula-02-desnutricao/p9-rutf-realimentacao.jpg',
  './assets/img/aula-02-desnutricao/p10-recuperacao-nutricional.jpg',
  './assets/img/aula-02-desnutricao/p11-kwashiorkor-josue.jpg',

  // --- Aula 03 — Baixa estatura ---
  './aulas/aula-03-baixa-estatura/index.html',
  './aulas/aula-03-baixa-estatura/aula.css',
  './aulas/aula-03-baixa-estatura/aula.js',
  './assets/img/aula-03-baixa-estatura/p1-afericao-estatura.jpg',
  './assets/img/aula-03-baixa-estatura/p2-curva-meninas-zscore.png',
  './assets/img/aula-03-baixa-estatura/p3-criancas-variacao-normal.jpg',
  './assets/img/aula-03-baixa-estatura/p6-cushing-lactente.jpg',
  './assets/img/aula-03-baixa-estatura/p6b-hipotireoidismo-congenito.jpg',
  './assets/img/aula-03-baixa-estatura/p7-acondroplasia-corpo.jpg',
  './assets/img/aula-03-baixa-estatura/p8-turner-montagem.jpg',
  './assets/img/aula-03-baixa-estatura/p8b-coarctacao-aorta-esquema.jpg',
  './assets/img/aula-03-baixa-estatura/p8b-turner-pescoco-alado.jpg',
  './assets/img/aula-03-baixa-estatura/p9-afericao-estatura.jpg',
  './assets/img/aula-03-baixa-estatura/p10-curva-velocidade-canal-baixo.jpg',
  './assets/img/aula-03-baixa-estatura/p12-curva-oms-meninas-alvo-baixo.jpg',
  './assets/img/aula-03-baixa-estatura/p13-rx-idade-ossea-mao-punho-esq.jpg',
  './assets/img/aula-03-baixa-estatura/p13b-comparativo-maturacao-ossea.jpg',
  './assets/img/aula-03-baixa-estatura/p15-curva-oms-meninas-familiar.jpg',

  // --- Aula 04 — Obesidade infantil ---
  './aulas/aula-04-obesidade-infantil/index.html',
  './aulas/aula-04-obesidade-infantil/aula.css',
  './aulas/aula-04-obesidade-infantil/aula.js',
  './assets/img/aula-04-obesidade-infantil/p1-afericao-puericultura.jpg',
  './assets/img/aula-04-obesidade-infantil/p2-prevalencia-obesidade-infantil-owid.png',
  './assets/img/aula-04-obesidade-infantil/p3-prader-willi-obesidade-central.png',
  './assets/img/aula-04-obesidade-infantil/p4-formula-imc.png',
  './assets/img/aula-04-obesidade-infantil/p5-curva-imc-meninos-zscore-sisvan.png',
  './assets/img/aula-04-obesidade-infantil/p6-cdc-imc-percentil-meninos.png',
  './assets/img/aula-04-obesidade-infantil/p7-esteatose-hepatica-us.jpg',
  './assets/img/aula-04-obesidade-infantil/p8-acantose-nigricans-pescoco.jpg',
  './assets/img/aula-04-obesidade-infantil/p9-alimentacao-saudavel-frutas.jpg',
  './assets/img/aula-04-obesidade-infantil/p10-atividade-fisica-crianca.jpeg',
  './assets/img/aula-04-obesidade-infantil/p11-imc-meninas-zscore.png',

  './aulas/aula-05-sindromes-geneticas/index.html',
  './aulas/aula-05-sindromes-geneticas/aula.css',
  './aulas/aula-05-sindromes-geneticas/aula.js',
  './assets/img/aula-05-sindromes-geneticas/p1-consulta-genetica-pediatria.jpg',
  './assets/img/aula-05-sindromes-geneticas/p2-face-sindrome-down.jpg',
  './assets/img/aula-05-sindromes-geneticas/p3-cariotipo-trissomia21.jpg',
  './assets/img/aula-05-sindromes-geneticas/p4-cariotipo-translocacao-14-21.jpg',
  './assets/img/aula-05-sindromes-geneticas/p5-mosaicismo-diagrama.jpg',
  './assets/img/aula-05-sindromes-geneticas/p6-facies-down.jpg',
  './assets/img/aula-05-sindromes-geneticas/p6b-manchas-brushfield.jpg',
  './assets/img/aula-05-sindromes-geneticas/p6c-prega-palmar-sinal-sandalia.jpg',
  './assets/img/aula-05-sindromes-geneticas/p7-dsav.jpg',
  './assets/img/aula-05-sindromes-geneticas/p8-atresia-duodeno-dupla-bolha.jpg',
  './assets/img/aula-05-sindromes-geneticas/p9-seguimento-down-tabela.jpg',
  './assets/img/aula-05-sindromes-geneticas/p10-rx-cervical-atlanto-axial.jpg',
  './assets/img/aula-05-sindromes-geneticas/p11-cariotipo-45x-turner.jpg',
  './assets/img/aula-05-sindromes-geneticas/p12-linfedema-neonatal-turner.jpg',
  './assets/img/aula-05-sindromes-geneticas/p12b-pterigio-coli-torax-escudo.jpg',
  './assets/img/aula-05-sindromes-geneticas/p13-klinefelter.jpg',
  './assets/img/aula-05-sindromes-geneticas/p14-edwards-dedos-sobrepostos.jpg',
  './assets/img/aula-05-sindromes-geneticas/p14b-patau-fenda-labiopalatina.jpg',
  './assets/img/aula-05-sindromes-geneticas/p15-cariotipo-humano-referencia.jpg',

  // --- Aula 06 — Carência de vitaminas (BÔNUS) ---
  './aulas/aula-06-carencia-de-vitaminas/index.html',
  './aulas/aula-06-carencia-de-vitaminas/aula.css',
  './aulas/aula-06-carencia-de-vitaminas/aula.js',
  './assets/img/aula-06-carencia-de-vitaminas/p1-marasmo-desnutricao.jpg',
  './assets/img/aula-06-carencia-de-vitaminas/p2-mancha-bitot-xeroftalmia.jpg',
  './assets/img/aula-06-carencia-de-vitaminas/p3-metabolismo-vitamina-d.jpg',
  './assets/img/aula-06-carencia-de-vitaminas/p4-raquitismo-geno-varo.jpg',
  './assets/img/aula-06-carencia-de-vitaminas/p5-esfregaco-picnocitos.jpg',
  './assets/img/aula-06-carencia-de-vitaminas/p6-injecao-im-vasto-lateral.png',
  './assets/img/aula-06-carencia-de-vitaminas/p7-melena-sangue-mecanio.jpg',
  './assets/img/aula-06-carencia-de-vitaminas/p8-escorbuto-gengiva.jpg',
  './assets/img/aula-06-carencia-de-vitaminas/p9-neutrofilo-hipersegmentado.png',
  './assets/img/aula-06-carencia-de-vitaminas/p10-beriberi-umido.jpg',
  './assets/img/aula-06-carencia-de-vitaminas/p11-pelagra-colar-casal.jpg',
  './assets/img/aula-06-carencia-de-vitaminas/p12-queilite-angular.jpg',
  './assets/img/aula-06-carencia-de-vitaminas/p13-fontes-alimentares.jpg',

  // --- Aula 07 — Puberdade (NÚCLEO) — 13 imagens reais de livro/atlas ---
  './aulas/aula-07-puberdade/index.html',
  './aulas/aula-07-puberdade/aula.css',
  './aulas/aula-07-puberdade/aula.js',
  './assets/img/aula-07-puberdade/p2-eixo-hormonal-puberdade-hhg.png',
  './assets/img/aula-07-puberdade/p3-eixo-hhg-gonadal-controle-hormonal.jpg',
  './assets/img/aula-07-puberdade/p4-histologia-adrenal-zona-reticular.jpg',
  './assets/img/aula-07-puberdade/p5-curva-velocidade-crescimento-feminina.jpg',
  './assets/img/aula-07-puberdade/p6-proporcoes-corporais-idade-crescimento.png',
  './assets/img/aula-07-puberdade/p7-estrogenio-por-estagio-tanner-feminino.png',
  './assets/img/aula-07-puberdade/p8-tanner-feminino-esquema-M1-5-P1-5.png',
  './assets/img/aula-07-puberdade/p9-hormonios-menarca-anovulacao-progesterona.png',
  './assets/img/aula-07-puberdade/p10-tanner-masculino-esquema-G1-5-volumes.png',
  './assets/img/aula-07-puberdade/p10-orquidometro-prader-esquema.png',
  './assets/img/aula-07-puberdade/p11-ginecomastia-bilateral-adulto.jpg',
  './assets/img/aula-07-puberdade/p12-cariotipo-turner-45-X.jpg',
  './assets/img/aula-07-puberdade/p13-cariotipo-klinefelter-47-xxy.jpg',

  // --- Aula 08 — Puberdade precoce (NÚCLEO) — 11 imagens reais (radiologia/diagrama/esquema) ---
  './aulas/aula-08-puberdade-precoce/index.html',
  './aulas/aula-08-puberdade-precoce/aula.css',
  './aulas/aula-08-puberdade-precoce/aula.js',
  './assets/img/aula-08/p1-tanner-feminino.svg',
  './assets/img/aula-08/p2-idade-ossea-avancada.png',
  './assets/img/aula-08/p3-curva-estatura-meninos.png',
  './assets/img/aula-08/p5-hamartoma-hipotalamico-mri.png',
  './assets/img/aula-08/p5b-craniofaringioma-mri.jpg',
  './assets/img/aula-08/p6-usg-cisto-ovariano.png',
  './assets/img/aula-08/p7-rx-idade-ossea-sotos.jpeg',
  './assets/img/aula-08/p8-curva-lh-estimulo.png',
  './assets/img/aula-08/p9-orquidometro-prader.jpg',
  './assets/img/aula-08/p11-leuprorrelina.svg',
  './assets/img/aula-08/p12-fluxograma-manejo.png',

  // --- Aula 09 — Desenvolvimento neuropsicomotor (NÚCLEO) — 8 imagens reais (Caderneta MS + pranchas de atlas) ---
  './aulas/aula-09-desenvolvimento-neuropsicomotor/index.html',
  './aulas/aula-09-desenvolvimento-neuropsicomotor/aula.css',
  './aulas/aula-09-desenvolvimento-neuropsicomotor/aula.js',
  './assets/img/aula-09/r3-tabela-instrumento-0-6m.png',
  './assets/img/aula-09/r6-rolar-sentar.png',
  './assets/img/aula-09/r7-marcos-7-12m.png',
  './assets/img/aula-09/r8-andar-10-15m.png',
  './assets/img/aula-09/r9-instrumento-linguagem.png',
  './assets/img/aula-09/r11-tabela-6-9m.jpg',
  './assets/img/aula-09/r12-reflexos-primitivos.jpg',
  './assets/img/aula-09/r13-paraquedista-marcha.jpg',
];

// Install: precache resiliente — um asset que falhe não derruba a instalação inteira.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(PRECACHE_ASSETS.map((url) => cache.add(url)))
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// Stale-while-revalidate para same-origin GET
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req).then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
