var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var targetLocks = mongoose.Schema({
  dungeonId: [{type: ObjectId, ref: "Dungeon", required: true}],
  monsterId: [{type: ObjectId, ref: "Monster", required: true}]
});

var ProfileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  health: {
    type: Number,
    required: true
  },
  maxHealth: {
    type: Number,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  active_dungeons: [{type: ObjectId, ref: 'Dungeon'}],
  targetLocks: [targetLocks]
});

module.exports = ProfileSchema;
