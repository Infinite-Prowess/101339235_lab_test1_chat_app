const mongoose = require('mongoose');

// Create a Mongoose private message schema
const privateMessageSchema = new mongoose.Schema({
    from_user: { type: String, required: true },
    to_user: { type: String, required: true },
    message: { type: String, required: true },
    date_sent: { type: Date, default: Date.now }
  });
  const PrivateMessage = mongoose.model('PrivateMessage', privateMessageSchema);
  module.exports = PrivateMessage;