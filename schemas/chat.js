const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema({
  chatId: {
    type: String,
    required: true,
    ref: 'Room',
  },
  roomId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    required: true,
  },
  userName: {
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
