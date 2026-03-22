const cacheName = 'tu-mundo-v2';
self.addEventListener('install', e => {
  self.skipWaiting(); // Esto obliga a la nueva versión a activarse ya
});

self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
