/* PAT LED Sign - service worker. Chỉ cache tài nguyên tĩnh của app shell; không đụng vào IndexedDB/localStorage. */
var PREFIX = 'pat-led-sign-cache-';
var CACHE_NAME = PREFIX + 'v1';
var SHELL = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png'
  /* không có thư viện CDN nào cần cache */
];
var SHELL_URLS = SHELL.map(function (p) { return new URL(p, self.location).href; });

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(function (c) { return c.addAll(SHELL); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(names.map(function (n) {
        if (n.startsWith(PREFIX) && n !== CACHE_NAME) return caches.delete(n);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  var isNav = req.mode === 'navigate';
  var base = url.origin + url.pathname;
  if (!isNav && SHELL_URLS.indexOf(base) < 0) return; /* mọi request khác đi thẳng ra mạng */
  e.respondWith(
    caches.open(CACHE_NAME).then(function (c) {
      return c.match(isNav ? './index.html' : base).then(function (hit) {
        if (hit) return hit;
        return fetch(req).catch(function () {
          return c.match('./index.html');
        });
      });
    })
  );
});
