const dbPromised = idb.open("FA-db", 1, function(upgradeDb) {
    let savedOS = upgradeDb.createObjectStore("saved", {
        keyPath: "id"
    });
    savedOS.createIndex("match.name", "match.name", { unique: false });
});

function saveMatches(match) {
    dbPromised
        .then(function(db) {
            let tx = db.transaction("saved", "readwrite");
            let store = tx.objectStore("saved");
            console.log(match);
            store.put(match);
            return tx.complete;
        })
        .then(function() {
            const title = "Match Saved Successfully!";
            console.log(title);
            const options = {
                body: `${match.homeTeam.name} Vs ${match.awayTeam.name} match has been saved, Check it now!`,
                badge: "./img/logo/logo32.png",
                icon: "./img/logo/logo32.png",
                actions: [{
                        action: "yes-action",
                        title: "Okey"
                    },
                    {
                        action: "no-action",
                        title: "Later"
                    },
                ],
            };
            if (Notification.permission === "granted") {
                navigator.serviceWorker.ready.then(function(registration) {
                    registration.showNotification(title, options);
                });
            } else {
                M.toast({
                    html: `${match.homeTeam.name} Vs ${match.awayTeam.name} match has been saved, Check it now!`,
                });
            }
        })
        .catch(function(err) {
            console.error('Failed to save Match', err);
        });
}

function getMatch(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                let tx = db.transaction("saved", "readonly");
                let store = tx.objectStore("saved");
                return store.get(id);
            })
            .then(function(matches) {
                resolve(matches);
            })
            .catch(function(err) {
                reject('Cannot display saved matches', err);
            });
    });
}

function getMatches() {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                let tx = db.transaction("saved", "readonly");
                let store = tx.objectStore("saved");
                return store.getAll();
            })
            .then(function(matches) {
                resolve(matches);
            })
            .catch(function(err) {
                reject('Cannot display saved matches', err);
            });
    });
}

function deleteMatch(id) {
    dbPromised
        .then(function(db) {
            let tx = db.transaction("saved", "readwrite");
            let store = tx.objectStore("saved");
            store.delete(id);
            return tx.complete;
        })
}