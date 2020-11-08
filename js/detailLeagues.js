function detailLeagues(data) {
    if (data.season.winner == null) {
        winner = "<i>Wait for the league to finish</i>"
    } else {
        winner = data.season.winner
    }

    const images = document.querySelectorAll('img');
    images.forEach((img) => {
        img.addEventListener('error', () => {
            img.src = './img/club.png';
        });
    });

    // Menyusun komponen card artikel secara dinamis
    let leagueHTML = "";
    leagueHTML = `
    <div class="row detail-league" style="margin-top: 50px;">
        <div class="col s12 m4">
            <img class="responsive-img" src="./img/leagues/${data.competition.id}.png" alt="${data.competition.name}" width="200" />
        </div>
        <div class="col s12 m8">
            <ul>
                <li>
                    <h5 class="text-center">${data.competition.name}</h5>
                </li>
                <li>
                    <img src="./img/flags/${data.competition.id}.svg" width="30" alt="${data.competition.area.name}"/>
                    <h6>${data.competition.area.name}</h6>
                </li>
                <li class="hide-on-med-and-up">
                    <span>Matchday - ${data.season.currentMatchday}</span>
                </li>
                <li>
                    <span class="hide-on-small-only">Matchday - ${data.season.currentMatchday}</span>
                </li>
                <li>
                    <span>Started</span> : ${data.season.startDate}
                </li>
                <li>
                    <span>Ended</span>   : ${data.season.endDate}
                </li>
                <li>
                    <span>Winner</span>  : ${winner}
                </li>
        </div>
    </div>
    <div class="row">
        <div class="col s12 m12 l12 xl12 container">
            <ul class="tabs" id="tabs-swipe-demo">
                <li class="tab col s4"><a class="active" href="#standings">STANDINGS</a></li>
                <li class="tab col s4"><a href="#scorers">TOP SCORER</a></li>
                <li class="tab col s4"><a href="#matches">MATCHES</a></li>
            </ul>
        </div>
        <div class="col s12" id="standings">
            <table class="centered highlight responsive-table">
                <thead style="background-color: #092c72; color: white;">
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Teams</th>
                        <th class="hide-on-large-only" height="1"></th>
                        <th>P</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>Pts</th>
                        <th>G</th>
                        <th>GA</th>
                        <th>GD</th>
                    </tr>
                </thead>
                <tbody id="standings-detail"></tbody>
            </table>
        </div>
        <div class="col s12" id="scorers">
            <table class="centered highlight responsive-table">
                <thead style="background-color: #092c72; color: white;">
                    <tr>
                        <th>Players</th>
                        <th>Team</th>
                        <th>Goals</th>
                    </tr>
                </thead>
                <tbody id="scorers-detail"></tbody>
            </table>
        </div>
        <div class="col s12" id="matches">
            <table class="centered striped">
                <thead style="background-color: #092c72; color: white;">
                    <tr>
                        <th>List of All Matches</th>
                    </tr>
                </thead>
                <tbody id="matches-detail"></tbody>
            </table>
        </div>
    </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = leagueHTML;

    // Inisialisasi Tabs
    let elm = document.querySelectorAll('.tabs');
    let instance = M.Tabs.init(elm);
    // Mengambil data standings
    let standingsHTML = "";
    data.standings[0].table.forEach(standing => {
        let teamsLogo = standing.team.crestUrl.replace(/^http:\/\//i, 'https://');
        standingsHTML += `
            <tr>
                <td>
                    ${standing.position}
                </td>
                <td>
                    <img src="${teamsLogo}" alt="${standing.team.name}" height="40">
                </td>
                <td class="left-align">
                    <a href="teams.html?id=${standing.team.id}">
                        <h6>${standing.team.name}</h6>
                    </a>
                </td>
                <td>
                    ${standing.playedGames}
                </td>
                <td>
                    ${standing.won}
                </td>
                <td>
                    ${standing.draw}
                </td>
                <td>
                    ${standing.lost}
                </td>
                <td>
                    <b>${standing.points}</b>
                </td>
                <td>
                    ${standing.goalsFor}
                </td>
                <td>
                    ${standing.goalsAgainst}
                </td>
                <td>
                    ${standing.goalDifference}
                </td>
            </tr>
        `;
    })
    document.getElementById("standings-detail").innerHTML = standingsHTML;
}

function listMatches(result) {
    let data = result.matches;
    let matchesHTML = "";
    data.forEach(data => {
        matchesHTML += `
                    <tr>
                        <td style="padding: 0px;">
                            <div class="card horizontal hoverable hide-on-small-only" style="padding: 20px 0; border-radius: 10px;">
                                <div class="col s5">
                                    <img src="https://crests.football-data.org/${data.homeTeam.id}.svg" height="80" alt="${data.homeTeam.name}">
                                    <h6>
                                        <b>${data.homeTeam.name}</b>
                                    </h6>
                                    <small>HOME</small>
                                </div>
                                <div class="col s2 center" style="margin: auto 0px;">
                                    <span>
                                        <b>Vs</b><br>
                                        <a href="./matches.html?id=${data.id}">
                                            Detail
                                        </a>
                                    </span>
                                </div>
                                <div class="col s5">
                                    <img src="https://crests.football-data.org/${data.awayTeam.id}.svg" height="80" alt="${data.awayTeam.name}">
                                    <h6>
                                        <b>${data.awayTeam.name}</b>
                                    </h6>
                                    <small>AWAY</small>
                                </div>
                            </div>

                            <div class="card horizontal hoverable hide-on-med-and-up" style="padding: 20px 0; border-radius: 10px;">
                                <div class="col s5">
                                    <img src="https://crests.football-data.org/${data.homeTeam.id}.svg" height="25">
                                    <span>
                                        <p><b>${data.homeTeam.name}</b><p>
                                        <small>HOME</small>
                                    </span>
                                </div>
                                <div class="col s2 valign-wrapper">
                                    <small>
                                        <b>Vs</b>
                                        <a href="./matches.html?id=${data.id}" class="valign-wrapper">
                                            Detail
                                        </a>
                                    </small>
                                </div>
                                <div class="col s5">
                                    <img src="https://crests.football-data.org/${data.awayTeam.id}.svg" height="25">
                                    <span>
                                        <p><b>${data.awayTeam.name}</b></p>
                                        <small>AWAY</small>
                                    </span>                                    
                                </div>
                            </div>
                        </td>
                    </tr>
                `;
    })
    document.getElementById("matches-detail").innerHTML = matchesHTML;
}

function listScorers(result) {
    let data = result.scorers
    let playersHTML = "";
    data.forEach(data => {
        // for (let no = 1; no < 9; no++) {}
        playersHTML += `
                <tr>
                    <td>
                        <b>${data.player.name}</b>
                    </td>
                    <td>
                        ${data.team.name}
                    </td>
                    <td>
                        ${data.numberOfGoals}
                    </td>
                </tr>
                `;
    })
    document.getElementById("scorers-detail").innerHTML = playersHTML;
}