const CACHE_NAME = 'baralho-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/jogo.html',
  '/css/style.css',
  '/js/jogo.js',
  '/asserts/icons/cartas-16.png',
  '/asserts/icons/cartas-32.png',
  '/asserts/icons/cartas-64.png',
  '/asserts/icons/cartas-96.png',
  '/baralhos/malvadao.json',
  '/baralhos/quebra-gelo.json',
  '/baralhos/casal.json',
  '/baralhos/familia.json',
  '/manifest.json',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
];

// Instala o service worker e faz cache dos arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Ativa o novo service worker e remove caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});

// Intercepta requisições e responde com cache se disponível
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});