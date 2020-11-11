function detailSavedMatches(result) {
    let data = result;
    let dateTime = new Date(data.utcDate);
    date = dateTime.toLocaleDateString();
    time = dateTime.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    let savedmatchesHTML = "";

    const images = document.querySelectorAll('img');
    images.forEach((img) => {
        img.addEventListener('error', () => {
            img.src = './img/club.png';
        });
    });

    if (data.length === 0) {
        console.log('Masuk');
        savedmatchesHTML += `
            <div class="valign-wrapper" style="display: flex; color: #90a4ae; margin-top: 50px; justify-content: center;">
                <i class="material-icons">info</i>
                <h5>Nothing's followed match!</h5>
            </div>
        `;
    }

    data.forEach(match => {
        savedmatchesHTML += `
            <table class="centered stripped">
                <tr class="hide-on-small-only">
                    <td style="padding: 0px;">
                        <div class="card horizontal hoverable" style="padding: 20px 0px; border-radius: 10px;">
                            <div class="col s5" style="margin-right: auto;">
                                <img src="https://crests.football-data.org/${match.homeTeam.id}.svg" height="80" alt="${match.homeTeam.name}">
                                <h6>
                                    <b>${match.homeTeam.name}</b>
                                </h6>
                                <small>HOME</small>
                            </div>
                            <div class="col 2 valign-wrapper">
                                <span>
                                    <b>Vs</b><br>
                                    <a href="./matches.html?id=${match.id}">
                                        Detail
                                    </a><br><br>
                                    <a class="btn-floating pulse red darken-3" id="delete-match" data-id="${match.id}">
                                        <i class="material-icons">delete</i>
                                    </a>
                                </span>
                            </div>
                            <div class="col s5" style="margin-right: auto;">
                                <img src="https://crests.football-data.org/${match.awayTeam.id}.svg" height="80">
                                <h6>
                                    <b>${match.awayTeam.name}</b>
                                </h6>
                                <small>AWAY</small>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr class="hide-on-med-and-up">
                    <td style="padding: 0px;">
                        <div class="card horizontal hoverable" style="padding: 20px 0px; border-radius: 10px;">
                            <div class="col s5" style="margin-right: auto;">
                                <img src="https://crests.football-data.org/${match.homeTeam.id}.svg" height="50" alt="${match.homeTeam.name}">
                                <p>
                                    <b>${match.homeTeam.name}</b>                                    
                                </p>
                                <small>HOME</small>
                            </div>
                            <div class="col 2 valign-wrapper">
                                <span>
                                    <b>Vs</b><br>
                                    <a href="./matches.html?id=${match.id}">
                                        Detail
                                    </a><br><br>
                                    <a class="btn-floating pulse red darken-3" id="delete-match" data-id="${match.id}">
                                        <i class="material-icons">delete</i>
                                    </a>
                                </span>
                            </div>
                            <div class="col s5" style="margin-right: auto;">
                                <img src="https://crests.football-data.org/${match.awayTeam.id}.svg" height="50" alt="${match.awayTeam.name}">
                                <p>
                                    <b>${match.awayTeam.name}</b>
                                </p>
                                <small>AWAY</small>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        `;
    });

    document.getElementById("followed").innerHTML = savedmatchesHTML;

    document.querySelectorAll("#delete-match").forEach(function(elm) {
        elm.addEventListener("click", (event) => {
            let id = event.target.parentElement.getAttribute("data-id");
            console.log(id);
            id = parseInt(id);
            deleteMatch(id);
            setTimeout(() => {
                location.reload();
            }, 1);
        })
    })
}