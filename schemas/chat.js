const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema({
  room: {
    type: Object,
    required: true,
    ref: 'Room',
  },
  user: {
    type: String,
    required: true,
  },
  chat: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Chat', chatSchema);
