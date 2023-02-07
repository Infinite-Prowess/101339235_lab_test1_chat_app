const mongoose = require('mongoose');

// Create a Mongoose user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    createon: { type: Date, default: Date.now }
  });
  const User = mongoose.model('User', userSchema);
  module.exports = User;