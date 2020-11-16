const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BNEZUUI36qu8ycaaxMlwf59FO6D7ykSxHEHgajBkgzfgQabBax84WKwWIIpIAKCQG_Q5Rah3f0hEvt-cdus2cQ4",
    "privateKey": "JmhAMMtrxGsW_rnPhpkY60LT_ojriiZ-6wGu9SGz2mY"
};


webPush.setVapidDetails(
    'mailto:ardhiansyahmalik1200@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/f7tgnf34NTQ:APA91bHhUvCZgeqWv9WcCEwevZ2R0yDIceRUVynB0IwLxdCsnELFhBSKoMLP6d8v7aE7QmwT3snDvhvO_HgXJ-b1GL-MTSM_FOAXILMJfw8-Ag4E0MIt4EE7CRzA6qm-4eU1NpXAk9cd",
    "keys": {
        "p256dh": "BOdSxLVG4WcIy49Bxhwk7PdoxfrMSo4ge7ukTQFXah8ar9rnsKVcfnEYECKfCm0moNpZDZ/XL53CuNOW03I5EPo=",
        "auth": "z+A17uUTxXR2Aoj3uEXjRA=="
    }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
    gcmAPIKey: '288265354857',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);