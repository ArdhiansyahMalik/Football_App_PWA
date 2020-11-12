function detailTeams(result) {
    let data = result;

    const images = document.querySelectorAll('img');
    images.forEach((img) => {
        img.addEventListener('error', () => {
            img.src = './img/club.png';
        });
    });

    let teamHTML = "";
    teamHTML += `
                <div class="row detail-team" style="margin-top: 50px;">
                    <div class="col s12 m4">
                        <img class="responsive-img" src="${data.crestUrl}" alt="${data.name}" width="200" />
                    </div>
                    <div class="col s12 m8">
                        <ul>
                            <li>
                                <h5 class="text-center">${data.name}</h5>
                            </li>
                            <li>
                                <h6>${data.area.name}</h6>
                            </li>
                            <li>
                                <span>Venue - ${data.venue}</span>
                            </li>
                            <li>
                                <span>Club Colors : ${data.clubColors}</span>
                            </li>
                            <li>
                            <span>Website : ${data.website}</span>
                            </li>
                            <li>
                                <span>Email : ${data.email}</span>
                            </li>
                            <li>
                                <span>Address : ${data.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row detail-squad">
                    <div class="col s12">
                        <div class="container" id="compt-active">
                            <h5>Squad Team</h4>
                            <table class="centered">
                                <thead style="background-color: #092c72; color: white;">
                                    <tr>
                                        <th>Squad Name</th>
                                        <th>Position</th>
                                        <th>Nationality</th>
                                    </tr>
                                </thead>
                                <tbody id="squad-list"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
    document.getElementById("body-content").innerHTML = teamHTML;

    let squad = "";
    data.squad.forEach(data => {
        if (data.position === null) {
            position = "Coach";
        } else {
            position = data.position;
        }
        squad += `
            <tr>
                <td>${data.name}</td>
                <td>${position}</td>
                <td>${data.nationality}</td>
            </tr>
        `;
    })
    document.getElementById("squad-list").innerHTML = squad;
}