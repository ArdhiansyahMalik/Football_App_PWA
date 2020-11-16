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
    "endpoint": "https://fcm.googleapis.com/fcm/send/e_YY6_Pu2_4:APA91bHF3d05lUa0L_A9iukGk3HO3LVYiAH4V4y8YRrBhta0I96wervQ-Hj-SP83pV2363Om_KSQUT7YOatJpIz3zT54oR8mo3w6pf1mazTof34I6VUN01xFuRBVnHAVRbiARRhZ--bu",
    "keys": {
        "p256dh": "BJSR+3TMYYrLXfU+tM896XVfFxIjeMzL0RPIiHlVzpUUYZqhXAvDixCQSf2N9/4x66koYrnhlqYLQX5r/NG85AM=",
        "auth": "wwF3JvDsNQN2v/Yt7ZhaVA=="
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