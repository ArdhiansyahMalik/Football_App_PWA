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
            console.log("Match Saved Successfully!");
        })
        .catch(function(err) {
            console.error('Failed to save Match', err);
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
        .catch(() => {
            console.error("Can`t delete this match");
        })
}