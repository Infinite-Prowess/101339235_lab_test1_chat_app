const mongoose = require('mongoose');

// Create a Mongoose group message schema
const groupMessageSchema = new mongoose.Schema({
    from_user: { type: String, required: true },
    room: { type: String, required: true },
    message: { type: String, required: true },
    date_sent: { type: Date, default: Date.now }
  });
  const GroupMessage = mongoose.model('GroupMessage', groupMessageSchema);
  module.exports = GroupMessage;