const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema({
  userImage: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Room', roomSchema);
