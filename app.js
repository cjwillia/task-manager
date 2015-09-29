var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

//TODO environment variables
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function(callback) {
	console.log('ayy, database is hooked up');
});

var UserSchema = require('./userSchema.js');
var TaskSchema = require('./taskSchema.js');
var User = mongoose.model('User', UserSchema);
var Task = mongoose.model('Task', TaskSchema);

app.use(express.static('client'));
app.use('/bower_components', express.static('bower_components'));

app.use(session({secret: "ther3als3cr3th3lly3ahil0v33ncrypti0n"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

var checkLoginSession = function(session) {
	return typeof session.user === "string" ? true : false;
}

app.get('/', function(req, res) {
	res.send('ayy');
});

app.get('/profile/:id', function(req, res) {
	if(checkLoginSession(req.session)){
		res.redirect('/profile.html');
	}
	else {
		res.status(403).send("You have to be logged in to view this!");
	}
});

app.post('/user', function(req, res) {
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

app.post('/login', function(req, res) {
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
						res.redirect('/profile.html');
					}
					else res.status(401).send({error: "Invalid Input"});
				}
			});
	});
});

app.get('/tasks', function(req, res) {
	if(checkLoginSession(req.session)) {
		Task.find(function(err, tasks) {
			if(err) res.status(500).send({error: err});
			else res.send({ 'tasks': tasks.toObject() });
		});
	}
	else {
		res.status(403).send({error: "you must be logged in to do that."});
	}
});

app.post('/task', function(req, res) {
	//add a new task to signed in user
});

var server = app.listen(5050, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('To do application is listening on %s:%s', host, port);
});