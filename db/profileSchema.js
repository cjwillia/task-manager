var mongoose = require('mongoose');

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
  dungeonIds: {
    type: [String],
    required: true
  },
  targetLocks: [targetLocks]
});

var targetLocks = mongoose.Schema({
  dungeonId: {
    type: String,
    required: true
  },
  monsterId: {
    type: String,
    required: true
  }
});
