const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const CircularJSON = require("circular-json");
const path = require('path')
const fs = require("fs");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// call the API

app.use('/', express.static(path.join(__dirname, "..", 'public')));

let driverRatings = null;

app.get('/', (req, res) => {
    try {   
        res.sendFile('index.html');
    } catch (e) {
        res.status(500).send(e.message);
    }
});

setInterval(async () => {
    const response = await axios.get('http://game.raceroom.com/multiplayer-rating/ratings.json', cors());
    driverRatings = await response.data;
}, 300000);

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
                    res.send(CircularJSON.stringify(response));
                }
                else {
                    res.send(CircularJSON.stringify(data.data));
                }
            } catch (e) {
                res.status(500).send(e.message);
            }
        })
        .catch(e => console.error(e));
})

app.get('/userId/:userId', async (req, res) => {
    try {
        const driver = driverRatings.find((driver) => driver.UserId === parseInt(req.params.userId));
        res.send(JSON.stringify(driver))
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.get('/server/content/:address', (req, res) => {
    try {
        if (req.params.address !== null)
            axios.get(`http://${req.params.address}/content/all`, cors())
                .then(data => {
                    res.send(CircularJSON.stringify(data.data))
                })
                .catch((error) => console.log(error.message));
    } catch (e) {
        res.status(500).send(e.message);
    }
})

app.get('/tracks', (req, res) => {
    axios.get('http://game.raceroom.com/store/tracks/all?json', cors())
        .then(data => {
            res.send(CircularJSON.stringify(data.data.context.c.sections['0'].items))
        })
        .catch(e => res.status(500).send(e.message));
})

app.listen(3500, () => console.log("Server started at 3500"));