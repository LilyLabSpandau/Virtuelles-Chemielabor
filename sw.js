// Netzwerk zuerst, damit Änderungen sofort ankommen; ohne Netz kommt die zuletzt geladene Fassung aus dem Zwischenspeicher.
const CACHE = 'chemielabor-v3';
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./index.html', './lab-table.jpg', './impressum.html', './manifest.webmanifest', './icons/icon-192.png'])).catch(() => {}));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || !r.url.startsWith('http')) return;
  // Bilder, Stile und Skripte: sofort aus dem Zwischenspeicher, im Hintergrund aktualisieren (schnelleres Laden)
  const path = new URL(r.url).pathname, live = /\/kolbi\/|pinnwand\.js$/.test(path); // Maskottchen-Skripte immer frisch (netzwerk zuerst)
  if (!live && /\.(jpe?g|png|webp|svg|css|js)$/i.test(path) && new URL(r.url).origin === location.origin) {
    e.respondWith(caches.open(CACHE).then(ch => ch.match(r).then(m => {
      const net = fetch(r).then(res => { if (res.ok) ch.put(r, res.clone()); return res; }).catch(() => m);
      return m || net;
    })));
    return;
  }
  e.respondWith(
    fetch(r).then(res => {
      if (res.ok && new URL(r.url).origin === location.origin) { const c = res.clone(); caches.open(CACHE).then(ch => ch.put(r, c)); }
      return res;
    }).catch(() => caches.match(r).then(m => m || caches.match('./index.html')))
  );
});
