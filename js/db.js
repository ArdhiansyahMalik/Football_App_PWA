const dbPromised = idb.open("FA-db", 1, function(upgradeDb) {
    let savedOS = upgradeDb.createObjectStore("saved", {
        keyPath: "id"
    });
    savedOS.createIndex("match.name", "match.name", { unique: false });
});

function saveMatches(match) {
    dbPromised
        .then((db) => {
            let tx = db.transaction("saved", "readwrite");
            let store = tx.objectStore("saved");
            console.log(match);
            store.put(match);
            return tx.complete;
        })
        .then(() => {
            M.toast({
                html: `${match.homeTeam.name} Vs ${match.awayTeam.name} match has been saved!`,
            });
        })
        .catch((error) => {
            console.error('Failed to save Match', error);
        });
}

function getMatch(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then((db) => {
                let tx = db.transaction("saved", "readonly");
                let store = tx.objectStore("saved");
                return store.get(id);
            })
            .then((matches) => {
                resolve(matches);
            })
            .catch((error) => {
                reject('Cannot display saved matches', error);
            });
    });
}

function getMatches() {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then((db) => {
                let tx = db.transaction("saved", "readonly");
                let store = tx.objectStore("saved");
                return store.getAll();
            })
            .then((matches) => {
                resolve(matches);
            })
            .catch((error) => {
                reject('Cannot display saved matches', error);
            });
    });
}

function deleteMatch(id) {
    dbPromised
        .then((db) => {
            let tx = db.transaction("saved", "readwrite");
            let store = tx.objectStore("saved");
            store.delete(id);
            return tx.complete;
        })
}