// Initiate client-side WebSocket connection
var socket = io();

var connectionCount = document.getElementById('connection-count');

socket.on('usersConnected', function(count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});
