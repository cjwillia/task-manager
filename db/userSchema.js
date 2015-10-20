var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var ProfileSchema = require('./profileSchema.js');

var userProfilesValidator = function(profiles) {
	return profiles.length <= 3;
}

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
	},
	profiles: {
		type: [ProfileSchema],
		validate: {
			validator: userProfilesValidator,
			message: "Cannot add more than three profiles."
		}
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

module.exports = UserSchema;
