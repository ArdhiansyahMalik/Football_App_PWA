const CACHE_NAME = "FA-v0.2";

var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/league.html",
    "/teams.html",
    "/matches.html",
    "/manifest.json",
    "/pages/home.html",
    "/pages/followed.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/leagues.js",
    "/js/detailLeagues.js",
    "/js/teams.js",
    "/js/detailMatches.js",
    "/js/followed.js",
    "/js/api.js",
    "/js/idb.js",
    "/js/db.js",
    "/js/reg-sw.js",
    "/img/club.png",
    "/img/logo/logo.png",
    "/img/logo/logo384.png",
    "/img/logo/logo256.png",
    "/img/logo/logo192.png",
    "/img/logo/logo144.png",
    "/img/logo/logo128.png",
    "/img/logo/logo96.png",
    "/img/logo/logo72.png",
    "/img/logo/logo32.png",
    "/img/leagues/2001.png",
    "/img/leagues/2002.png",
    "/img/leagues/2003.png",
    "/img/leagues/2014.png",
    "/img/leagues/2015.png",
    "/img/leagues/2021.png",
    "/img/flags/2001.svg",
    "/img/flags/2002.svg",
    "/img/flags/2003.svg",
    "/img/flags/2014.svg",
    "/img/flags/2015.svg",
    "/img/flags/2021.svg",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
];


self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    const base_url1 = "https://api.football-data.org/v2/";
    const base_url2 = "https://crests.football-data.org";
    if (event.request.url.indexOf(base_url1) > -1 || event.request.url.indexOf(base_url2) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(function(response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("push", function(event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body: body,
        icon: 'img/logo/logo.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});

// Mengatasi event click 
self.addEventListener('notificationclick', function(event) {
    if (!event.action) {
        // Pengguna mengklik notifikasi di luar action
        console.log('Notification Click');
        return;
    }

    switch (event.action) {
        case 'yes-action':
            console.log('Let`s check match followed!');
            clients.openWindow('/#followed');
            break;
        case 'no-action':
            break;
        default:
            console.log('I`m fine.');
            break;
    }
});