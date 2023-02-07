const express = require('express');
const userModel = require('../models/User');
const groupMessageModel = require('../models/GroupMessage');
const privateMessageModel = require('../models/PrivateMessage');

// Create an Express app
const app = express();

// Handle the login request
app.post('/login', async (req, res) => {
  try {
    const user = await userModel.findOne({
      username: req.body.username,
      password: req.body.password
    });

    if (!user) {
      return res.status(401).send({ error: 'Incorrect username or password' });
    }

    res.send({ user });
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Handle the signup request
app.post('/signup', async (req, res) => {
  try {
    const user = new userModel(req.body);
    await user.save();

    res.send({ user });
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Handle the group message request
app.post('/group-message', async (req, res) => {
  try {
    const groupMessage = new groupMessageModel(req.body);
    await groupMessage.save();

    io.emit('group-message', groupMessage);

    res.send({ groupMessage });
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Handle the private message request
app.post('/private-message', async (req, res) => {
  try {
    const privateMessage = new privateMessageModel(req.body);
    await privateMessage.save();

    io.to(req.body.to_user).emit('private-message', privateMessage);

    res.send({ privateMessage });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = app