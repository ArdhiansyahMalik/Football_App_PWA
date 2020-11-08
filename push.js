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
    "endpoint": "https://fcm.googleapis.com/fcm/send/c6ROQlY66lw:APA91bEZjrxWOlp3WxAnsj74Fu6ZZWS-yP1xpgeZkPvOJxnWbZFgTiCJTZJ1jlkFwuFZo-NzzgEV87FopMK3p6PWOQolcffdeYyrFXWx237tSJo4T8LyTUhxgQqPh3jrw1otPTEzQFj-",
    "keys": {
        "p256dh": "BIfDKOD5UtDrYz+CAQBJAcqO8zd+4i+r0lGfbVE0pJc1StbCBQXntrCsA1dXx2YwFUl72poHSTuVwoY4s5/vTpQ=",
        "auth": "/TOLwE4C/pk8aM6Jv82ZcA=="
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