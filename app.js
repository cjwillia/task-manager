var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//TODO environment variables
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function(callback) {
	console.log('ayy, database is hooked up');
});

var UserSchema = require('./userSchema.js');
var User = mongoose.model('User', UserSchema);

app.use(express.static('client'));
app.use('/bower_components', express.static('bower_components'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res) {
	res.send('ayy');
});

app.post('/user', function(req, res) {
	var user = new User({});
	user.username = req.body.username;
	user.email = req.body.email;
	user.password = req.body.password;
	user.save(function(err) {
		if(err) res.status(500).send({error: err});
		res.send('User has been saved successfully');
	});
});

var server = app.listen(5050, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('To do application is listening on %s:%s', host, port);
});