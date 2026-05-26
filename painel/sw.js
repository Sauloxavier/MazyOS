// Service Worker mínimo do painel Marco Xavier
// Estratégia: network-first com fallback pra cache (offline)

const CACHE = 'mx-painel-v1';
const CORE = [
  './',
  './index.html',
  './app.js',
  './supabase-client.js',
  './assets/logo-azul.png',
  './assets/logo-branco.png',
  './manifest.json',
];

self.addEventListener('install', (ev) => {
  ev.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (ev) => {
  const req = ev.request;
  // Só GET de mesma origem ou CDNs estáticos
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Não cacheia requests do Supabase, WAHA, APIs em geral
  if (url.pathname.includes('/api/') || url.pathname.includes('/rest/v1') || url.pathname.includes('/auth/v1') || url.pathname.includes('/storage/v1') || url.pathname.includes('/realtime')) {
    return;
  }
  ev.respondWith(
    fetch(req)
      .then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return resp;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match('./index.html')))
  );
});
