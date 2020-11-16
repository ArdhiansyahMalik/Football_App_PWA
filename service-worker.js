importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log('Workbox berhasil dimuat!');
} else {
    console.log('Workbox gagal dimuat!');
}

workbox.precaching.precacheAndRoute([{
        url: '/',
        revision: '2'
    },
    {
        url: '/nav.html',
        revision: '1'
    },
    {
        url: '/index.html',
        revision: '1'
    },
    {
        url: '/league.html',
        revision: '1'
    },
    {
        url: '/teams.html',
        revision: '1'
    },
    {
        url: '/matches.html',
        revision: '1'
    },
    {
        url: '/manifest.json',
        revision: '1'
    },
    {
        url: '/pages/home.html',
        revision: '1'
    },
    {
        url: '/pages/followed.html',
        revision: '1'
    },
    {
        url: '/css/materialize.min.css',
        revision: '1'
    },
    {
        url: '/js/materialize.min.js',
        revision: '1'
    },
    {
        url: '/js/jquery-3.5.1.min.js',
        revision: '1'
    },
    {
        url: '/js/nav.js',
        revision: '1'
    },
    {
        url: '/js/leagues.js',
        revision: '1'
    },
    {
        url: '/js/detailLeagues.js',
        revision: '1'
    },
    {
        url: '/js/teams.js',
        revision: '1'
    },
    {
        url: '/js/detailMatches.js',
        revision: '1'
    },
    {
        url: '/js/followed.js',
        revision: '1'
    },
    {
        url: '/js/api.js',
        revision: '1'
    },
    {
        url: '/js/idb.js',
        revision: '1'
    },
    {
        url: '/js/db.js',
        revision: '2'
    },
    {
        url: '/js/reg-sw.js',
        revision: '2'
    },
    {
        url: '/img/club.png',
        revision: '1'
    },
    {
        url: '/img/logo/logo.png',
        revision: '1'
    },
    {
        url: '/img/logo/logo384.png',
        revision: '1'
    },
    {
        url: '/img/logo/logo256.png',
        revision: '1'
    },
    {
        url: '/img/logo/logo192.png',
        revision: '1'
    },
    {
        url: '/img/logo/logo144.png',
        revision: '1'
    },
    {
        url: '/img/logo/logo128.png',
        revision: '1'
    },
    {
        url: '/img/logo/logo96.png',
        revision: '1'
    },
    {
        url: '/img/logo/logo72.png',
        revision: '1'
    },
    {
        url: '/img/logo/logo32.png',
        revision: '1'
    },
    {
        url: '/img/leagues/2001.png',
        revision: '1'
    },
    {
        url: '/img/leagues/2002.png',
        revision: '1'
    },
    {
        url: '/img/leagues/2003.png',
        revision: '1'
    },
    {
        url: '/img/leagues/2014.png',
        revision: '1'
    },
    {
        url: '/img/leagues/2015.png',
        revision: '1'
    },
    {
        url: '/img/leagues/2021.png',
        revision: '1'
    },
    {
        url: '/img/flags/2001.svg',
        revision: '1'
    },
    {
        url: '/img/flags/2002.svg',
        revision: '1'
    },
    {
        url: '/img/flags/2003.svg',
        revision: '1'
    },
    {
        url: '/img/flags/2014.svg',
        revision: '1'
    },
    {
        url: '/img/flags/2015.svg',
        revision: '1'
    },
    {
        url: '/img/flags/2021.svg',
        revision: '1'
    },
    {
        url: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        revision: '1'
    },
    {
        url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
        revision: '1'
    },
    {
        url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
        revision: '1'
    },
]);

workbox.routing.registerRoute(new RegExp('/'),
    async({
        event
    }) => {
        return await workbox.strategies.staleWhileRevalidate({
            cacheName: 'Football-App',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
                }),
            ],
        }).handle({
            event
        });
    }
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'data-api-football',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    })
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
    new RegExp('https://fonts.gstatic.com/'),
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

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