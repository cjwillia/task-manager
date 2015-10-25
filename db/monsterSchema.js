var mongoose = require('mongoose');

var MonsterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = MonsterSchema;
