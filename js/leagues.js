function dataLeagues(data) {
    let leaguesHTML = "";
    data.competitions.forEach(function(league) {
        if (league.id === 2016 || league.id === 2017 || league.id === 2018 || league.id === 2019) {
            return
        }
        leaguesHTML += `
                <div class="col s12 m6 xl4">
                    <div class="card hoverable" style="border-radius: 10px;">
                        <a href="./league.html?id=${league.id}">
                            <div class="card-image" style="padding: 8px;">
                                <img src="./img/leagues/${league.id}.png" alt="${league.name}" />
                            </div>
                            <div class="card-content">
                                <span class="card-title grey-text text-darken-4">
                                    <h6 class="center-align">
                                        <b>${league.name}</b>
                                    </h6>
                                    <p class="center-align" style="font-size: 14px;">
                                        ${league.area.name}
                                    </p>
                                </span>
                            </div>
                        </a>
                    </div>
                </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen id leagues
    document.getElementById("leagues").innerHTML = leaguesHTML;
}