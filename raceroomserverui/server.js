const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const CircularJSON = require("circular-json");
const path = require('path');
const fs = require("fs");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// call the API

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'assets')));

let driverRatings = null;

app.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.get("/server/:region", async (req, res) => {
    if(driverRatings == null) {
        const response = await axios.get('http://game.raceroom.com/multiplayer-rating/ratings.json', cors());
        driverRatings = await response.data;
    }

    axios.get("http://game.raceroom.com/multiplayer-rating/servers/", cors())
        .then(data => {
            try {
                let region = null;
                switch (parseInt(req.params.region)) {
                    case 1:
                        region = "Europe";
                        break;
                    case 2:
                        region = "Brazil";
                        break;
                    case 3:
                        region = "U.S. West";
                        break;
                    case 4:
                        region = "Oceania";
                        break;
                    case 5:
                        region = "Rating";
                        break;
                    default:
                        region = "All";
                        break;
                }

                if (region !== "All") {
                    const response = { result: [] };
                    response.result = data.data.result.filter(server => server.Server.Settings.ServerName.includes(region));
                    response.result.sort((a, b) => a.Server.Settings.ServerName.localeCompare(b.Server.Settings.ServerName))
                    res.send(CircularJSON.stringify(response));
                }
                else {
                    res.send(CircularJSON.stringify(data.data));
                }
            } catch (e) {
                res.status(500).send(e.message);
            }
        })
        .catch(e => {
            console.error(e.message)
            res.status(500);
        });
})

app.get('/userId/:userId', async (req, res) => {
    try {
        const driverArray = JSON.parse(decodeURIComponent(req.params.userId));

        const data = {
            drivers: [],
            sof: 0,
            rep: 0
        };

        driverArray.forEach(driver => {
            const newData = driverRatings.find((value) => value.UserId === driver)
            if(newData !== undefined)
                data.drivers.push(newData);
        })

        if(data.drivers.length > 0) {
            data.drivers.forEach(driver => {
                if (driver !== undefined) {
                    data.sof += driver.Rating;
                    data.rep += driver.Reputation;
                }
            })

            data.sof /= data.drivers.length;
            data.rep /= data.drivers.length;

            data.drivers.sort((a, b) => b.Rating - a.Rating);
        }

        res.send(JSON.stringify(data))
    } catch (e) {
        console.error(e.message)
        res.status(500);
    }
});

app.get('/tracks', (req, res) => {
    let rawdata = fs.readFileSync('assets/r3e-data.json');
    let data = JSON.parse(rawdata);
    res.send(CircularJSON.stringify(data.tracks))
})

app.get("/tracks/image/:trackId", ((req, res) => {
    axios.get("https://game.raceroom.com/store/tracks/all/" + req.params.trackId + "?json", cors())
        .then(data => {
            res.send(CircularJSON.stringify(data.data.context.c.item.image.logo))
        })
        .catch(e => console.error(e));
}));

app.get('/classes/:liveryArray', ((req, res) => {
    try {
        let rawdata = fs.readFileSync('assets/r3e-data.json');
        let data = JSON.parse(rawdata);
        const classes = data.cars;

        const liveryArray = JSON.parse(decodeURIComponent(req.params.liveryArray));
        const classAvailable = new Set();

            liveryArray.forEach(value => {
                for (const key in classes) {
                    const data = classes[key].liveries.find(val => value === val.Id);
                    if(data !== undefined) {
                        classAvailable.add(data.Class);
                    }
                }
            });

        res.send(CircularJSON.stringify([...classAvailable]));
    } catch (e) {
        res.status(500);
    }
}));

app.get('/user/:userName', async (req, res) => {
    try {
        const response = await axios.get(`http://game.raceroom.com/users/${req.params.userName}/career?json`);

        const driverData = {
            avatar: response.data.context.c.avatar,
            team: response.data.context.c.team,
            name: response.data.context.c.name,
            competition_rank: response.data.context.c.competition_rank,
            raceList: response.data.context.c.raceList.GetUserMpRatingProgressResult.Entries.reverse(),
            totalRaces: response.data.context.c.raceList.GetUserMpRatingProgressResult.TotalEntries,
            rank: response.data.context.c.competition_rank
        };

        res.send(JSON.stringify(driverData));
    } catch (e) {
        console.error(e.message);
        res.status(404);
    }

});

app.get('/ratings', async (req, res) => {
    const response = await axios.get('http://game.raceroom.com/multiplayer-rating/ratings.json', cors());

    const data = {
        data: response.data,
        total: response.data.length
    };

    res.send(CircularJSON.stringify(data));
});

app.listen(8080, () => console.log("Server started at 8080"));
