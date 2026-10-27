/* =========================================================================
   GO PREMIUM · DOENÇAS CLÍNICAS NA GRAVIDEZ — SERVICE WORKER
   -------------------------------------------------------------------------
   Estratégia:
   · Cache versionado (CACHE_NAME). Mude a versão ao alterar arquivos.
   · install:  pré-cache do app shell (best-effort — falha em asset opcional
               não derruba a instalação).
   · activate: limpa caches antigos do MESMO projeto e claim() dos clientes.
   · fetch:    GET apenas. Para navegação (HTML), network-first com fallback
               para `./index.html` cacheado (preserva router por hash).
               Para assets estáticos (CSS/JS/PNG/SVG/manifest), cache-first
               com fallback para rede e atualização do cache.
               Recursos cross-origin não são cacheados (apenas repassados).

   Como atualizar:
   · Quando alterar qualquer arquivo da plataforma, incremente CACHE_VERSION.
     A próxima visita do usuário ativa o novo SW e descarta o cache antigo.
   · Não force reload automático — preserva a sessão de estudo.
   ========================================================================= */

"use strict";

const CACHE_VERSION = "v5";
const PROJECT_PREFIX = "go-doencas-clinicas-gravidez-premium-";
const CACHE_NAME = PROJECT_PREFIX + CACHE_VERSION;

/* App shell · arquivos essenciais para a plataforma rodar offline.
   O service worker fica na raiz, então caminhos são relativos a `./`. */
const SHELL_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./scripts.js",
  "./content-data.js",
  "./sections-1.js",
  "./sections-2.js",
  "./sections-3.js",
  "./manifest.webmanifest",
  "./pwa-register.js",
  "./assets/icons/apple-touch-icon-180.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/maskable-192.png",
  "./assets/icons/maskable-512.png",
  "./assets/icons/favicon.svg"
];

/* INSTALL · pré-cache em best-effort. Cada asset é tentado individualmente
   para que um item ausente não derrube a instalação inteira. */
self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const results = await Promise.allSettled(
      SHELL_ASSETS.map(async (url) => {
        try {
          const resp = await fetch(url, { cache: "reload" });
          if (!resp.ok) throw new Error("HTTP " + resp.status + " · " + url);
          await cache.put(url, resp.clone());
          return url;
        } catch (e) {
          console.warn("[GO SW] skip asset:", url, e && e.message);
          return null;
        }
      })
    );
    const ok = results.filter(r => r.status === "fulfilled" && r.value).length;
    console.info("[GO SW] install cached", ok, "/", SHELL_ASSETS.length, "assets ·", CACHE_NAME);
    // Ativa imediatamente o novo SW para a próxima navegação
    await self.skipWaiting();
  })());
});

/* ACTIVATE · limpa caches antigos do mesmo projeto, mantém o atual.
   Não toca em caches de outros projetos hospedados no mesmo domínio. */
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => {
      if (k.startsWith(PROJECT_PREFIX) && k !== CACHE_NAME) {
        console.info("[GO SW] removing stale cache:", k);
        return caches.delete(k);
      }
      return null;
    }));
    await self.clients.claim();
    console.info("[GO SW] active ·", CACHE_NAME);
  })());
});

/* Util · checa se a URL é do mesmo origin (evita cachear cross-origin) */
function isSameOrigin(url) {
  try { return new URL(url).origin === self.location.origin; }
  catch { return false; }
}

/* FETCH · roteamento por tipo
   1. Apenas GET é cacheado.
   2. Cross-origin segue rede direto (sem cache).
   3. Navegação (modo "navigate" ou Accept: text/html): network-first → cache → index.html.
   4. Demais (CSS/JS/imagens/manifest): cache-first → rede → atualiza cache. */
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  if (!isSameOrigin(req.url)) return; // segue normalmente

  // Ignorar internals do navegador (chrome-extension, devtools etc.)
  const url = new URL(req.url);
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  const accept = req.headers.get("accept") || "";
  const isNavigation = req.mode === "navigate" || accept.includes("text/html");

  if (isNavigation) {
    event.respondWith(networkFirstWithFallback(req));
  } else {
    event.respondWith(cacheFirstWithUpdate(req));
  }
});

/* Estratégia · NETWORK-FIRST para HTML.
   Tenta rede; se falhar (offline), serve do cache; se não tiver cached
   para a URL exata, devolve `./index.html` (router por hash continua
   funcionando). */
async function networkFirstWithFallback(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) {
      // Atualiza cache em background
      cache.put(request, fresh.clone()).catch(() => {});
    }
    return fresh;
  } catch (e) {
    // Offline · tentar cache exato, depois index.html
    const cached = await cache.match(request);
    if (cached) return cached;
    const fallback = await cache.match("./index.html");
    if (fallback) return fallback;
    return Response.error();
  }
}

/* Estratégia · CACHE-FIRST com revalidação para assets estáticos.
   Devolve do cache imediatamente se houver, e atualiza em background
   (stale-while-revalidate). Se não estiver em cache, busca na rede e
   guarda. */
async function cacheFirstWithUpdate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const networkPromise = fetch(request).then((resp) => {
    if (resp && resp.ok) {
      cache.put(request, resp.clone()).catch(() => {});
    }
    return resp;
  }).catch(() => null);

  if (cached) {
    // Mantém a revalidação em background sem bloquear
    networkPromise.catch(() => {});
    return cached;
  }
  const fresh = await networkPromise;
  if (fresh) return fresh;
  return Response.error();
}

/* MESSAGE · permite que páginas do mesmo origin solicitem ações específicas
   (skipWaiting controlado, limpeza manual de cache). API simples, opcional. */
self.addEventListener("message", (event) => {
  if (!event.data || typeof event.data !== "object") return;
  if (event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  } else if (event.data.type === "CLEAR_CACHE") {
    event.waitUntil(caches.keys().then(keys =>
      Promise.all(keys.filter(k => k.startsWith(PROJECT_PREFIX)).map(k => caches.delete(k)))
    ));
  }
});
