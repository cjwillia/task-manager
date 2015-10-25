var express = require('express');
var router = express.Router();

var NEW_PROFILE_MAX_HEALTH = 3;
var NEW_PROFILE_LEVEL = 1;

module.exports = function(User, Profile) {

    router.get('/profiles', function(req, res) {
        var userId = req.session.userId;
        Profile.find({
            belonging_to: userId
        }, function(err, profiles) {
            if (err) res.status(500).send({
                error: err
            });
            else {
                console.log(profiles);
                res.status(200).send(profiles);
            }
        });
    });

    function createProfileForUser(userId, name) {
        var profile = new Profile({
            name: name,
            health: NEW_PROFILE_MAX_HEALTH,
            maxHealth: NEW_PROFILE_MAX_HEALTH,
            level: NEW_PROFILE_LEVEL,
            belonging_to: userId
        });
        return profile;
    }

    router.post('/profile', function(req, res) {
        var userId = req.session.userId;
        var name = req.body.name;
        User.findById(userId, function(err, user) {
            if (err)
                res.status(500).send({
                    error: err
                });
            else if (user) {
                var profile = createProfileForUser(userId, name);
                profile.save(function(err) {
                    if (err) res.status(500).send({
                        error: err
                    });
                    else res.send(200);
                });
            } else
                res.status(404).send({
                    error: "User with id: " + userId + " not found"
                });
        });
    });

    return router;
};
