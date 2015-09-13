var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function(callback) {
	console.log('ayy, database is hooked up');
});


//TODO model definitions should be in separate files
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	email: {
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

UserSchema.pre('save', function(next) {
	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.hash(this.password, null, null, function(err, hash) {
		if(err) return next(err);

		user.password = hash;
		next();
	});
});

UserSchema.methods.checkPassword = function(attempt, cb) {
	bcrypt.compare(attempt, this.password, function(err, res) {
		if(err) return cb(err);
		cb(null, res);
	});
}

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


// this works. remove next commit
//
// var testUser = new User({
// 	username: "ronjon",
// 	email: "thisisnt.validated@all.com",
// 	password: "dontrump4prez"
// });

// testUser.save(function(err) {
// 	if(err) throw err;
// 	console.log('test user saved!')
// 	User.findOne({username: "ronjon"}, function(err, user) {
// 		if(err) throw err;
// 		console.log('test user located! stored password is ', user.password);
// 		user.checkPassword("dontrump4prez", function(err, res) {
// 			if(err) throw err;
// 			console.log('for the correct password, we get a ', res);
// 		});

// 		user.checkPassword("4trumpdonprez", function(err, res) {
// 			if(err) throw err;
// 			console.log('for an incorrect password, we get a ', res);
// 		});
// 	});
// });