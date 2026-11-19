const CACHE = 'bb-v4';
const FILES = ['/baubesprechung/', '/baubesprechung/index.html', '/baubesprechung/manifest.json', '/baubesprechung/icon-192.png', '/baubesprechung/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/baubesprechung/index.html')))
  );
});
