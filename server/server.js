var express = require("express");
var axios = require("axios");
var bodyParser = require("body-parser");
var cors = require("cors");
var CircularJSON = require("circular-json");
var path = require('path');
var fs = require("fs");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// call the API
app.use('/', express.static(path.join(__dirname, "..", 'public')));
app.get('/', function (req, res) {
    try {
        res.sendFile('index.html');
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});
app.get("/server/:region", function (req, res) {
    axios.get("http://game.raceroom.com/multiplayer-rating/servers/", cors())
        .then(function (data) {
        try {
            var region_1 = null;
            switch (parseInt(req.params.region)) {
                case 1:
                    region_1 = "Europe";
                    break;
                case 2:
                    region_1 = "Brazil";
                    break;
                case 3:
                    region_1 = "U.S. West";
                    break;
                case 4:
                    region_1 = "Oceania";
                    break;
                default:
                    region_1 = "All";
                    break;
            }
            if (region_1 !== "All") {
                var response = { result: [] };
                response.result = data.data.result.filter(function (server) { return server.Server.Settings.ServerName.includes(region_1); });
                res.send(CircularJSON.stringify(response));
            }
            else {
                res.send(CircularJSON.stringify(data.data));
            }
        }
        catch (e) {
            res.status(500).send(e.message);
        }
    })
        .catch(function (e) { return console.error(e); });
});
app.get('/userId/:userId', function (req, res) {
    axios.get('http://game.raceroom.com/users/' + req.params.userId + "/career?json", cors())
        .then(function (data) {
        try {
            var driver = {
                Avatar: data.data.context.c.avatar,
                Name: data.data.context.c.name,
                Rating: data.data.context.c.raceList.GetUserMpRatingProgressResult.Entries[data.data.context.c.raceList.GetUserMpRatingProgressResult.Entries.length - 1].RatingAfter,
                Reputation: data.data.context.c.raceList.GetUserMpRatingProgressResult.Entries[data.data.context.c.raceList.GetUserMpRatingProgressResult.Entries.length - 1].ReputationAfter,
            };
            res.send(CircularJSON.stringify(driver));
        }
        catch (e) {
            res.status(500).send(e.message);
        }
    })
        .catch(function (error) { return console.log(error.message); });
});
app.get('/server/content/:address', function (req, res) {
    try {
        if (req.params.address !== null)
            axios.get("http://" + req.params.address + "/content/all", cors())
                .then(function (data) {
                res.send(CircularJSON.stringify(data.data));
            })
                .catch(function (error) { return console.log(error.message); });
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});
app.get('/tracks', function (req, res) {
    axios.get('http://game.raceroom.com/store/tracks/all?json', cors())
        .then(function (data) {
        res.send(CircularJSON.stringify(data.data.context.c.sections['0'].items));
    })
        .catch(function (e) { return res.status(500).send(e.message); });
});
app.listen(3500, function () { return console.log("Server started at 3500"); });
