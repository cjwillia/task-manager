var mongoose = require('mongoose');

var DungeonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = DungeonSchema;
