// Ambil nilai query parameter (?id=)
let urlParams = new URLSearchParams(window.location.search);
let idParam = urlParams.get("id");

const api_token = "90254dfb2c894138bbb9284f1a00799f";
const base_url = `https://api.football-data.org/v2/`;
const leagues = `${base_url}competitions?plan=TIER_ONE&areas=2077`;
const standings = `${base_url}competitions/${idParam}/standings`;
const matches = `${base_url}competitions/${idParam}/matches?status=SCHEDULED`;
const scorers = `${base_url}competitions/${idParam}/scorers`;
const teams = `${base_url}teams/${idParam}`;
const matches_byID = `${base_url}matches/${idParam}`;
let url = "";

const fetchApi = function(url) {
    return fetch(url, {
        headers: {
            'X-Auth-Token': api_token
        }
    })
};

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
    // Inisialisasi endpoint
    url = leagues;

    if ('caches' in window) {
        caches.match(url).then((response) => {
            if (response) {
                response.json().then((data) => {
                    dataLeagues(data);
                });
            }
        });
    }

    fetchApi(url)
        .then(status)
        .then(json)
        .then((data) => {
            dataLeagues(data);
        })
        .catch(error);
}

function getLeagueById() {
    if ('caches' in window) {
        caches.match(url = standings).then((response) => {
            if (response) {
                response.json().then((data) => {
                    detailLeagues(data);
                });
            }
        });
    }
    if ('caches' in window) {
        caches.match(url = matches).then((response) => {
            if (response) {
                response.json().then((data) => {
                    listMatches(data);
                });
            }
        });
    }
    if ('caches' in window) {
        caches.match(url = scorers).then((response) => {
            if (response) {
                response.json().then((data) => {
                    listScorers(data);
                });
            }
        });
    }

    fetch(url = standings, {
            headers: {
                "X-Auth-Token": api_token
            }
        })
        .then(status)
        .then(json)
        .then((data) => {
            detailLeagues(data);
        });
    fetch(url = matches, {
            headers: {
                "X-Auth-Token": api_token
            }
        })
        .then(status)
        .then(json)
        .then((data) => {
            listMatches(data);
        })
    fetch(url = scorers, {
            headers: {
                "X-Auth-Token": api_token
            }
        })
        .then(status)
        .then(json)
        .then((data) => {
            listScorers(data);
        });
}

function getTeamsById() {
    // Inisialisasi url
    url = teams;

    if ('caches' in window) {
        caches.match(url).then((response) => {
            if (response) {
                response.json().then((data) => {
                    detailTeams(data);
                });
            }
        });
    }

    fetchApi(url)
        .then(status)
        .then(json)
        .then((data) => {
            detailTeams(data);
        })
}

function getMatchById() {
    return new Promise((resolve, reject) => {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");
        // Inisialisasi url
        url = matches_byID;

        if ('caches' in window) {
            caches.match(url).then((response) => {
                if (response) {
                    response.json().then((data) => {
                        detailMatches(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchApi(url)
            .then(status)
            .then(json)
            .then((data) => {
                detailMatches(data);
                resolve(data);
            });
    });
}

function getSavedMatches() {
    getMatches().then((data) => {
        console.log(data);
        detailSavedMatches(data);
    });
}