var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
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
var driverRatings = null;
app.get('/', function (req, res) {
    try {
        res.sendFile('index.html');
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});
setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get('http://game.raceroom.com/multiplayer-rating/ratings.json', cors())];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.data];
            case 2:
                driverRatings = _a.sent();
                return [2 /*return*/];
        }
    });
}); }, 300000);
app.get("/server/:region", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(driverRatings == null)) return [3 /*break*/, 3];
                return [4 /*yield*/, axios.get('http://game.raceroom.com/multiplayer-rating/ratings.json', cors())];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.data];
            case 2:
                driverRatings = _a.sent();
                _a.label = 3;
            case 3:
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
                            case 5:
                                region_1 = "Rating";
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
                return [2 /*return*/];
        }
    });
}); });
app.get('/userId/:userId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var driver;
    return __generator(this, function (_a) {
        try {
            driver = driverRatings.find(function (driver) { return driver.UserId === parseInt(req.params.userId); });
            res.send(JSON.stringify(driver));
        }
        catch (e) {
            res.status(500).send(e.message);
        }
        return [2 /*return*/];
    });
}); });
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
