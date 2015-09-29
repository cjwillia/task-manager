var mongoose = require('mongoose');

var TaskSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	tips: {
		type: String
	},
	health: {
		type: Number,
		required: true
	},
	level: {
		type: Number,
		required: true
	},
	due: {
		type: Date,
		required: true
	},
	completed: {
		type: Boolean,
		required: true
	}
});

TaskSchema.pre('save', function(next) {
	var errors = [];
	//date validation
	next(errors);
});

TaskSchema.methods.removeHealth = function(amount, cb) {
	var res = this.health - amount;
	this.health = res < 0 ? 0 : res;
	success();
}

TaskSchema.methods.halfLife = function(success, fail) {
	if (this.health < 2) {
		fail("Health too low");
	}
	else {
		this.health = this.health / 2;
		success();
	}
}