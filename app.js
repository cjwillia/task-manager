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

var UserSchema = require('./db/userSchema.js');
var TaskSchema = require('./db/taskSchema.js');
var User = mongoose.model('User', UserSchema);
var Task = mongoose.model('Task', TaskSchema);

app.use(express.static('client'));
app.use('/bower_components', express.static('bower_components'));

var authentication = require('./routers/authentication.js')(User);

app.use(session({secret: "ther3als3cr3th3lly3ahil0v33ncrypti0n"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(authentication);

var checkLoginSession = function(session) {
	return typeof session.user === "string" ? true : false;
}

app.get('/', function(req, res) {
	res.send('ayy');
});

app.get('/profile/:id', function(req, res) {
	if(checkLoginSession(req.session)){
		res.send({user: req.session.user});
	}
	else {
		res.status(403).send("You have to be logged in to view this!");
	}
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
