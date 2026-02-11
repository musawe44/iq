const CACHE = "igdl-cache-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./info.html",
  "./manifest.json",
  "./js/config.js",
  "./js/tools.js",
  "./js/audio.js",
  "./js/event1111.js",
  "./js/more-info-button.js",
  "./js/base.js",
  "./js/info-page.js",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/avatar.jpg",
  "./assets/bg.mp4",
  "./assets/audio.mp3",
  "./assets/eleven.mp3"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
