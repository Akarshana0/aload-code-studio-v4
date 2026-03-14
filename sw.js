/**
 * ALONE CODE STUDIO v4 — sw.js
 * Service Worker: Offline caching & PWA support
 */

const CACHE_NAME = 'acs-v4-cache-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './main.js',
  './style.css',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

// ── Install: cache core assets ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: clean old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for local assets, network-first for external ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // For external CDN/API requests (CodeMirror esm.sh, Piston, Anthropic) — network only
  const externalHosts = ['esm.sh', 'emkc.org', 'api.anthropic.com', 'fonts.googleapis.com', 'fonts.gstatic.com', 'unpkg.com'];
  if (externalHosts.some(h => url.host.includes(h))) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response('{"error":"offline"}', { headers: { 'Content-Type': 'application/json' } })
      )
    );
    return;
  }

  // Cache-first for local assets
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        }
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
