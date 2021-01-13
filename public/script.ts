const fetchServerData = async (target: string) => {
    const response = await fetch(target);

    try {
        return response.json();
    } catch (error) {
        console.error(error);
    }

    return null;
};

let timerContainer = [];
const timerData = (distance, target) => {
    const startTime = new Date().getTime() + distance;

    const timer = setInterval(() => {
        let now = new Date().getTime();
        let distance = startTime - now;
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById(target).innerHTML = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById(target).innerHTML = "00:00:00";
        }
    }, 1000);

    timerContainer.push(timer);
}

const fetchDriverData = async (drivers): Promise<DriverRating[]> => {
    const data: DriverRating[] = [];

    for (const value of drivers) {
        const driver = await fetchServerData(`/userId/${value}`);
        data.push(driver);
    }

    return data;
};

const fillTemplateData = async (data: Server, tracks: Track[], key) => {


    let session = null, border = null;
    switch (data.Server.CurrentSession) {
        case 0: session = "Pratice"; border = "success"; break;
        case 256: session = "Qualify"; border = "warning"; break;
        case 768: session = "Race"; border = "danger"; break;
    }
    
    let trackDetails: Track;
    trackDetails = tracks.find(value => (data.Server.Settings.TrackLayoutId[0] - 1 === value.cid || data.Server.Settings.TrackLayoutId[0] - 2 === value.cid));

    const driverData: DriverRating[] = await fetchDriverData(data.Server.Players);

    let sof = 0, rep = 0;
    driverData.map(driver => {sof += driver.Rating; rep += driver.Reputation});
    sof /= driverData.length;
    rep /= driverData.length;

    const template = ` 
    <div class="col-12 col-md-6 col-lg-6 col-xl-4">
    <div class="card border-${border} mx-md-2 my-2">
    <img src="${data.Server.Settings.Thumbnail}" class="card-img-top" alt="${data.Server.Settings.ServerName}">
        <div class="card-body">
            <div class="row">
                <div class="col-12">
                    <h4 class="text-center">
                        ${data.Server.Settings.ServerName}
                    </h4>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <button class="btn btn-block" type="button" data-toggle="collapse" data-target="#track-info-${key}" aria-expanded="false" aria-controls="track-info-${key}">
                        <h5 class="text-center dropdown-toggle">Track Info</h5>
                      </button>
                </div>
            </div>
            <div class="collapse" id="track-info-${key}">
                <div class="row justify-content-center">
                    <div class="col-4">
                        <img class="img-fluid" src="${trackDetails?.image.logo}" />              
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <h6 class="text-center">Name</h6>
                    <p class="text-center">${trackDetails?.content_info.name}</p>
                </div>
                <div class="col-6">
                    <h6 class="text-center">Country</h6>
                    <p class="text-center">${trackDetails?.content_info.country.name}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                <h6 class="text-center">Max Players</h6>
                <p class="text-center">${data.Server.Settings.MaxNumberOfPlayers}</p>
                </div>
            </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-12">
                    <button class="btn btn-block" type="button" data-toggle="collapse" data-target="#session-info-${key}" aria-expanded="false" aria-controls="session-info-${key}">
                        <h5 class="text-center dropdown-toggle">Session Info</h5>
                      </button>
                </div>
            </div>
            <div class="collapse" id="session-info-${key}">
                <div class="row mt-3">
                    <div class="col-6">
                        <h6 class="text-center">Session</h6>
                        <p class="text-center">${session}</p>
                    </div>  
                    <div class="col-6">
                        <h6 class="text-center">Time Left</h6>
                        <p class="text-center" id="time-left-${key}"></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <h6 class="text-center">P</h6>
                        <p class="text-center">${data.Server.Settings.PracticeDuration} min</p>
                    </div>
                    <div class="col-4">
                        <h6 class="text-center">Q</h6>
                        <p class="text-center">${data.Server.Settings.QualifyDuration} min</p>
                    </div>
                    <div class="col-4">
                        <h6 class="text-center">R</h6>
                        <p class="text-center">${data.Server.Settings.Race1Duration} min</p>
                    </div>
                    ${data.Server.Settings.Race2Duration !== 0 ? `
                    <div class="col-4">
                        <h6 class="text-center">R2</h6>
                        <p class="text-center">${data.Server.Settings.Race2Duration} min</p>
                    </div>` : ""}

                    ${data.Server.Settings.Race3Duration !== 0 ? `
                    <div class="col-4">
                        <h6 class="text-center">R3</h6>
                        <p class="text-center">${data.Server.Settings.Race3Duration} min</p>
                    </div>` : ""}
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <h6 class="text-center">Tyre Wear</h6>
                        <p class="text-center">${data.Server.Settings.TireWear}x</p>
                    </div>  
                    <div class="col-6">
                        <h6 class="text-center">Fuel Usage</h6>
                        <p class="text-center">${data.Server.Settings.FuelUsage}x</p>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-12>
                        <h6 class="text-center">Car Classes</h6>
                    </div>
                </div>
            </div>
            <hr/>
            <div class="row justify-content-center">
                <div class="col-4">
                    <h6 class="text-center">Players Connected</h6>
                    <p class="text-center">${data.Server.PlayersOnServer}</p>
                </div>
                <div class="col-4">
                    <h6 class="text-center">SoF</h6>
                    <p class="text-center">${sof === NaN ? 0 : sof.toFixed(3)}</p>
                </div>
                <div class="col-4">
                    <h6 class="text-center">Average Rep.</h6>
                    <p class="text-center">${rep === NaN ? 0 : rep.toFixed(3)}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <button ${data.Server.PlayersOnServer === 0 ? "disabled" : ""} class="btn btn-block" type="button" data-toggle="collapse" data-target="#driver-info-${key}" aria-expanded="false" aria-controls="driver-info-${key}">
                        <h5 class="text-center dropdown-toggle">Driver Info</h5>
                      </button>
                </div>
            </div>
            <div class="collapse" id="driver-info-${key}">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Reputation</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${driverData.sort((a, b) => b.Rating - a.Rating).map(driver => `
                            <tr>
                                <td>${driver.Fullname}</td>
                                <td>${driver.Rating}</td>
                                <td>${driver.Reputation}</td>
                            </tr>
                        `).join("")
        }
                    <tbody>
                </table>
            </div>
        </div>
        <div class="card-footer">
            ${session === "Pratice" ?
            `
            <a class="btn btn-success btn-lg btn-block" href="rrre://multiplayer/join?data={"MultiplayerJoin":{"Address":"${data.Server.ServerIp}:${data.Server.Port}"}}">
                Join server
            </a>`
            :
            `
            <button class="btn btn-danger btn-lg btn-block" disabled>Session Closed</button>
            `}
        </div>
    </div> 
</div>
    `;

    $("#servers-available").prepend(template);
    timerData(data.Server.TimeLeft, `time-left-${key}`);
};

const render = async (region: string = "All") => {
    try {
        const serverData: { result: Server[] } = await fetchServerData(`/server/${region}`);
        serverData.result.sort((a, b) => b.Server.PlayersOnServer - a.Server.PlayersOnServer);
        const tracks = await fetchServerData("/tracks");
        serverData.result.map(async (data: Server, key: number) => await fillTemplateData(data, tracks, key));
    } catch (err) {
        console.error(err);        
    }
    
}

(async () => { 
    $('#last-update').text(new Date().toUTCString());

    const $regionSelect: JQuery<HTMLSelectElement> = $("#region-select");

    $regionSelect.on("change", (value) => {
        timerContainer.map(timer => clearInterval(timer));
        timerContainer = [];
        $("#servers-available").empty();
        render(value.currentTarget.value);
    });

    await render($regionSelect.val().toString());    
})();
