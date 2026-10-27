/* sw.js — PWA Neurologia · Síndromes Demenciais
   CACHE_NAME versionado. Sempre que publicar mudança visual, bump deste valor.
   03/08/2026 — v2: o v1 nunca foi bumpado apesar de todas as mudanças de chassi
   de 02-03/08, e os assets eram cache-first PURO: uma vez cacheado, style/app
   congelavam para sempre e nenhum fix visual chegava ao aluno sem limpar cache.
   Agora o chassi mutável é network-first com fallback offline — o fix chega no
   próprio load, sem depender de bump manual nem de o usuário limpar nada. */
const CACHE_NAME = 'neuro-demencias-v2';
const CORE = [
  './',
  './index.html',
  './_assets/style.css',
  './_assets/style.css?v=2',
  './_assets/app.js',
  './_assets/app.js?v=2',
  './_assets/quiz.js',
  './manifest.json'
];
const MUTABLE_ASSETS = [
  '/_assets/style.css',
  '/_assets/app.js',
  '/_assets/quiz.js',
  '/manifest.json'
];

async function atualizaCache(request, response){
  if (!response || !response.ok) return;
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response.clone());
}

async function redePrimeiro(request){
  try {
    const response = await fetch(request, {cache:'no-store'});
    if (response.ok) {
      await atualizaCache(request, response);
      return response;
    }
    return (await caches.match(request)) || response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw error;
  }
}

self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open(CACHE_NAME).then(c=>c.addAll(CORE))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))
    )).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', e=>{
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // HTML e chassi mutável consultam a rede; o cache mantém o fallback offline.
  if (url.origin === self.location.origin){
    if (req.destination === 'document' || req.headers.get('accept')?.includes('text/html')){
      e.respondWith(redePrimeiro(req).catch(()=>caches.match('./index.html')));
      return;
    }
    if (MUTABLE_ASSETS.some(path=>url.pathname.endsWith(path))){
      e.respondWith(redePrimeiro(req));
      return;
    }
    // Imagens e SVG locais continuam cache-first.
    e.respondWith(
      caches.match(req).then(c=>c || fetch(req).then(r=>{
        atualizaCache(req, r);
        return r;
      }).catch(()=>caches.match(req)))
    );
    return;
  }
  // imagens remotas (wikimedia etc.): stale-while-revalidate, fallback cache
  if (req.destination === 'image'){
    e.respondWith(
      caches.match(req).then(c=>{
        const net = fetch(req).then(r=>{
          if (r && r.status === 200){
            const copy = r.clone();
            caches.open(CACHE_NAME).then(c=>c.put(req, copy));
          }
          return r;
        }).catch(()=>c);
        return c || net;
      })
    );
  }
});