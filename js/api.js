let base_url = "https://api.football-data.org/v2/";
const api_token = "90254dfb2c894138bbb9284f1a00799f";

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function getLeagues() {
    if ('caches' in window) {
        caches.match(base_url + "competitions?plan=TIER_ONE&areas=2077").then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    dataLeagues(data);
                });
            }
        });
    }
    fetch(base_url + "competitions?plan=TIER_ONE&areas=2077", {
            headers: {
                "X-Auth-Token": api_token
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            dataLeagues(data);
        })
        .catch(error);
}

function getLeagueById() {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ('caches' in window) {
        caches.match(base_url + "competitions/" + idParam + "/standings").then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    detailLeagues(data);
                });
            }
        });
    }
    if ('caches' in window) {
        caches.match(base_url + "competitions/" + idParam + "/matches?status=SCHEDULED").then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    listMatches(data);
                });
            }
        });
    }
    if ('caches' in window) {
        caches.match(base_url + "competitions/" + idParam + "/scorers").then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    listScorers(data);
                });
            }
        });
    }
    fetch(base_url + "competitions/" + idParam + "/standings", {
            headers: {
                "X-Auth-Token": api_token
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            detailLeagues(data);
        });
    fetch(base_url + "competitions/" + idParam + "/matches?status=SCHEDULED", {
            headers: {
                "X-Auth-Token": api_token
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            listMatches(data);
        })
    fetch(base_url + "competitions/" + idParam + "/scorers", {
            headers: {
                "X-Auth-Token": api_token
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            listScorers(data);
        });
}

function getTeamsById() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ('caches' in window) {
        caches.match(base_url + "teams/" + idParam).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    detailTeams(data);
                });
            }
        });
    }
    fetch(base_url + "teams/" + idParam, {
            headers: {
                "X-Auth-Token": api_token
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            detailTeams(data);
        })
}

function getMatchById() {
    return new Promise(function(resolve, reject) {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        if ('caches' in window) {
            caches.match(base_url + "matches/" + idParam).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        detailMatches(data);
                        resolve(data);
                    });
                }
            });
        }

        fetch(base_url + "matches/" + idParam, {
                headers: {
                    "X-Auth-Token": api_token
                }
            })
            .then(status)
            .then(json)
            .then(function(data) {
                detailMatches(data);
                resolve(data);
            });
    });
}

function getSavedMatches() {
    getMatches().then(function(data) {
        console.log(data);
        detailSavedMatches(data);
    });
}