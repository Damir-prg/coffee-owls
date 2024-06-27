const CACHE_NAME = 'coffee-owls-v1.0.1';

const URLS = ['/', '/profile', '/game', '/sign-in', '/sign-up', 'rating', '/forum', '/internal-error'];

self.addEventListener('install', event => {
  const addCache = async () => {
    const cache = await caches.open(CACHE_NAME);

    return cache.addAll(URLS);
  };

  event.waitUntil(addCache());
});

self.addEventListener('fetch', async event => {
  if (event.request.method !== 'GET') return;

  caches.match(event.request).then(cacheResponse => {
    if (cacheResponse) {
      return cacheResponse;
    }

    const fetchRequest = event.request.clone();

    return fetch(fetchRequest)
      .then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      })
      .catch(error => {
        console.log(error);
      });
  });
});

self.addEventListener('activate', event => {
  const cleanCache = async () => {
    const cacheNames = await caches.keys();

    return Promise.all(cacheNames.filter(cacheName => cacheName !== CACHE_NAME).map(cache => caches.delete(cache)));
  };

  event.waitUntil(cleanCache());
});
