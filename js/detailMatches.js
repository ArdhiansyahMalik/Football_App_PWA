function detailMatches(result) {
    let data = result.match;
    let dateTime = new Date(data.utcDate);
    date = dateTime.toLocaleDateString();
    time = dateTime.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    let detailmatchHTML = "";
    detailmatchHTML += `
                <div class="row hide-on-small-only" style="margin: 20px 0px;">
                    <div class="col s12 center valign-wrapper" style="margin-top: 30px;">
                        <div class="col s1">
                            <img src="./img/leagues/${data.competition.id}.png" alt="${data.competition.name}" height="50">
                        </div>
                        <div class="col s6">
                            <h6 class="left"><b>${data.competition.name}</b></h6>
                        </div>
                        <div class="col s5">
                            <span class="right">${data.group} - Matchday ${data.matchday}</span>
                        </div>
                    </div>
                    <div class="col s12">
                        <hr>
                    </div>
                    <div class="col s12">
                        <div class="col s10">
                            <p>
                                Venue | <b><i> ${data.venue}</i></b>
                            </p>
                        </div>
                        <div class="col s2" id="button-act1">
                            <a class="btn-floating pulse right blue darken-3">
                                <i class="material-icons" id="save-button">star</i>
                            </a>
                        </div>
                    </div>
                    <div class="col s12 valign-wrapper" style="margin: 20px 0px; border: 1px solid #bdbdbd; border-radius: 3px; padding: 20px 0px;">
                        <div class="col s5 center">
                            <img src="https://crests.football-data.org/${data.homeTeam.id}.svg" alt="${data.homeTeam.name}" height="200" />
                            <h6><b>${data.homeTeam.name}</b></h6>
                        </div>
                        <div class="col s2 center">
                            <h5><b>VS</b></h5>
                            <span><i>${date}</i></span><br>
                            <span><i>${time} WIB</i></span>
                        </div>
                        <div class="col s5 center">
                            <img src="https://crests.football-data.org/${data.awayTeam.id}.svg" alt="${data.awayTeam.name}" height="200" />
                            <h6><b>${data.awayTeam.name}</b></h6>
                        </div>
                    </div>
                </div>

                <div class="row hide-on-med-and-up" style="margin: 20px 0px;">
                    <div class="col s12 center valign-wrapper" style="margin-top: 30px;">
                        <div class="col s1">
                            <img src="./img/leagues/${data.competition.id}.png" alt="${data.competition.name}" height="25">
                        </div>
                        <div class="col s7">
                            <small><h6 class="left"><b>${data.competition.name}</b></h6></small>
                        </div>
                        <div class="col s4">
                            <small><span class="right">${data.group} - Matchday ${data.matchday}</span></small>
                        </div>
                    </div>
                    <div class="col s12">
                        <hr>
                    </div>
                    <div class="col s12">
                        <div class="col s9">
                            <p class="valign-wrapper">Venue |</p>
                            <p>
                                <b><i> ${data.venue}</i></b>
                            </p>
                        </div>
                        <div class="col s3" id="button-act2">
                            <a class="btn-floating pulse right blue darken-3">
                                <i class="material-icons" id="save-button">star</i>
                            </a>
                        </div>
                    </div>
                    <div class="col s12" style="margin: 20px 0px; border: 1px solid #bdbdbd; border-radius: 3px; padding: 20px 0px;">
                        <div class="col s12 center" style="margin: 20px 0px;">
                            <img src="https://crests.football-data.org/${data.homeTeam.id}.svg" alt="${data.homeTeam.name}" height="125" />
                            <h6><b>${data.homeTeam.name}</b></h6>
                        </div>
                        <div class="col s12 center" style="margin: 20px 0px;">
                            <h6><b>VS</b></h6>
                            <small>
                                <span><i>${date}</i></span><br>
                                <span><i>${time} WIB</i></span>
                            </small>
                        </div>
                        <div class="col s12 center" style="margin: 20px 0px;">
                            <img src="https://crests.football-data.org/${data.awayTeam.id}.svg" alt="${data.awayTeam.name}" height="125" />
                            <h6><b>${data.awayTeam.name}</b></h6>
                        </div>
                    </div>
                </div>
            `;
    document.getElementById("body-content").innerHTML = detailmatchHTML;
    savdelMatch(data);
}

async function savdelMatch(data) {
    const button1 = document.getElementById('button-act1');
    const button2 = document.getElementById('button-act2');

    if (await getMatch(data.id)) {
        button1.innerHTML = `<a class="btn-floating pulse right red darken-3"><i class="material-icons" id="delete-button">delete</i></a>`;
        button2.innerHTML = `<a class="btn-floating pulse right red darken-3"><i class="material-icons" id="delete-button">delete</i></a>`;
    }

    button1.addEventListener('click', async() => {
        if (await getMatch(data.id)) {
            deleteMatch(parseInt(data.id));
            console.log('Tombol Delete di klik!');
            button1.innerHTML = `<a class="btn-floating pulse right blue darken-3"><i class="material-icons" id="save-button">star</i></a>`;
            button2.innerHTML = `<a class="btn-floating pulse right blue darken-3"><i class="material-icons" id="save-button">star</i></a>`;
        } else {
            saveMatches(data);
            button1.innerHTML = `<a class="btn-floating pulse right red darken-3"><i class="material-icons" id="delete-button">delete</i></a>`;
            button2.innerHTML = `<a class="btn-floating pulse right red darken-3"><i class="material-icons" id="delete-button">delete</i></a>`;
            console.log('Tombol Save di klik!');
        }
    })
    button2.addEventListener('click', async() => {
        if (await getMatch(data.id)) {
            deleteMatch(parseInt(data.id));
            console.log('Tombol Delete di klik!');
            button1.innerHTML = `<a class="btn-floating pulse right blue darken-3"><i class="material-icons" id="save-button">star</i></a>`;
            button2.innerHTML = `<a class="btn-floating pulse right blue darken-3"><i class="material-icons" id="save-button">star</i></a>`;
        } else {
            saveMatches(data);
            button1.innerHTML = `<a class="btn-floating pulse right red darken-3"><i class="material-icons" id="delete-button">delete</i></a>`;
            button2.innerHTML = `<a class="btn-floating pulse right red darken-3"><i class="material-icons" id="delete-button">delete</i></a>`;
            console.log('Tombol Save di klik!');
        }
    })
}

// Menampilkan Detail Match berdasarkan ID
document.addEventListener("DOMContentLoaded", function() {
    getMatchById();
});