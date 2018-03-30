let cacheName = 'notes-son.v.1.0.0';
let filesToCache = [
    './',
    'index.html',
    'css/colors.css',
    'css/styles.css',
    'js/array.observe.polyfill.js',
    'js/object.observe.polyfill.js',
    'js/scrips.js'
];

self.addEventListener('install', function(e){
    console.log('[Service Worker] Install');
    
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        }).catch(function(err){
            console.log('[ServiceWorker] Error: '+ err);
        })
    );
});

self.addEventListener('activate', function(e){
    console.log('[Service Worker] Activate');

    e.waitUntil(
        caches.keys().then(function(keyLis){
            return Promise.all(keyLis.map(function(key){
                if(key !== cacheName){
                    console.log('[Service Worker] Removing old cache');
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fecth', function(e){
    console.log('[Service Worker] Fetch', e.request.url);

    e.respondWith(
        caches.match(e.request)
        .then(function(response) {
            return response || fetch(e.request);
        })
        .catch(function(err){
            console.log('[Service Worker] Fetch Error: '+ err)
        })
    );
});