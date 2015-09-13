var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function(callback) {
	console.log('ayy, database is hooked up');
});

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	password: {
		type: String,
		required: true
	}
});

var User = mongoose.model('User', UserSchema);

app.use(express.static('client'));
app.use('/bower_components', express.static('bower_components'));

app.get('/', function(req, res) {
	res.send('ayy');
});

var server = app.listen(5050, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('To do application is listening on %s:%s', host, port);
});