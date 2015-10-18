var express = require('express');
var router = express.Router();

module.exports = function(User) {
  router.post('/user', function(req, res) {
  	var user = new User({
  		username: req.body.username,
  		email: req.body.email,
  		password: req.body.password
  	});
  	user.save(function(err) {
  		if(err) res.status(500).send({error: err});
  		else res.send('User has been saved successfully');
  	});
  });

  router.post('/login', function(req, res) {
  	// find user
  	User.findOne({username: req.body.username}, function(err, user) {
  		if(err) res.status(500).send({error: err});
  		else if (!user)
  			res.status(401).send({error: "Invalid Input"})
  		else
  			user.checkPassword(req.body.password, function(err, valid) {
  				if (err) res.status(500).send({error: err});
  				else {
  					if(valid) {
  						//initialize session
  						req.session.user = user.username;
  						req.session.user_id = user._id;
  						res.status(200).send({user_id: user._id});
  					}
  					else res.status(401).send({error: "Invalid Input"});
  				}
  			});
  	});
  });

  return router;
}
