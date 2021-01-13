"use strict";
module.exports = app.get('/userId/:userId', function (req, res) {
    axios.get('http://game.raceroom.com/users/' + req.params.userId + "/career?json", cors())
        .then(function (data) {
        var driver = {
            Avatar: data.data.context.c.avatar,
            Name: data.data.context.c.name,
            Rating: data.data.context.c.raceList.GetUserMpRatingProgressResult.Entries[0].RatingAfter,
            Reputation: data.data.context.c.raceList.GetUserMpRatingProgressResult.Entries[0].ReputationAfter,
        };
        res.send(CircularJSON.stringify(driver));
    })
        .catch(function (error) { return console.log(error.message); });
});
