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
    "endpoint": "https://fcm.googleapis.com/fcm/send/deqq8i1O-Xc:APA91bFaXwJqwhlJF5Vf8e4t4VUo4tjh20PojEBV29V57iJ8V7NUcfZnLPCPBkSEvO2Jqwuptv0z33y4j7Fcgfw0ich2gFS63ZXGlyLlbN-oDvhZBThSahZBjgnGw25ARyJZMC9j5WR2",
    "keys": {
        "p256dh": "BKGKukWjkiNZ55VtXi8t7UjTsy2ESPRGZZ9/cO3InxblYZBgq/zsd9nCYcTT780tz/PLI6sAxEDAZTyYJzfo4FQ=",
        "auth": "XljoiqBZhLEsafRYlj+CXA=="
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