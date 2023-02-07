const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const http = require('http');

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://Omar:NewPasscode1@comp3133cluster.9tebtmi.mongodb.net/w2023_comp3133?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create an Express app
const app = express();

// Create a server for the Express app
const server = http.createServer(app);

// Connect the Socket.io server to the Express server
const io = socketio(server);

// Use the Express middleware to parse incoming JSON data
app.use(express.json());

// Use the Express middleware to serve static files
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

// Listen for the connection event on the Socket.io server
io.on('connection', socket => {
  console.log('A user has connected');

  // Listen for the join-room event on the Socket.io server
  socket.on('join-room', room => {
    console.log(`A user has joined the room: ${room}`);
    socket.join(room);
  });

  // Listen for the leave-room event on the Socket.io server
  socket.on('leave-room', room => {
    console.log(`A user has left the room: ${room}`);
    socket.leave(room);
  });

  // Listen for the typing event on the Socket.io server
  socket.on('typing', data => {
    console.log(`A user is typing: ${data.username}`);
    socket.broadcast.emit('typing', data);
  });

  // Listen for the disconnect event on the Socket.io server
  socket.on('disconnect', () => {
    console.log('A user has disconnected');
  });
});

// Start the Express server
server.listen(3000, () => {
  console.log('The Express server is running on port 3000');
});