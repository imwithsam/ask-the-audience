const http = require('http');
const express = require('express');
const app = express();

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

// Create public interface with npm's module system
module.exports = server;
