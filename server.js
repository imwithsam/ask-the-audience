const http = require('http');
const express = require('express');
const app = express();

// Keep track of votes in memory
var votes = {};

// Have Express serve the 'public' directory
app.use(express.static('public'));

// Set up routing for root path
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Tell server what port to listen on
const port = process.env.PORT || 3000;

// Produce a server by passing the app object to Node's http module
const server = http.createServer(app).listen(port, function() {
  console.log('Lisening on port ' + port + '.');
});

// Host WebSocket connections on http server
const socketIo = require('socket.io');
const io = socketIo(server);

// Set up event listener for the 'connection' event on the server
io.on('connection', function(socket) {
  console.log('A user has connected.');
  console.log(io.engine.clientsCount + ' user(s) now connected.');

  // Broadcast total connected user count to all users
  io.sockets.emit('usersConnected', io.engine.clientsCount + ' user(s) now connected.');

  // Send message to current client (one socket = one client)
  socket.emit('statusMessage', 'You have connected.');

  socket.on('disconnect', function() {
    console.log('A user has disconnected.');

    // Broadcast total connected user count to all users
    io.sockets.emit('usersConnected', io.engine.clientsCount + ' user(s) now connected.');

    // Delete vote when a user disconnects
    delete votes[socket.id];
    console.log('Votes: ', votes);
  });

  // Save vote to memory when one is cast
  socket.on('message', function(channel, message) {
    if (channel === 'voteCast') {
      votes[socket.id] = message;
      console.log('Votes: ', votes);
    }
  });
});

// Create public interface with npm's module system
module.exports = server;
