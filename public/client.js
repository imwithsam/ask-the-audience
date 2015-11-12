// Initiate client-side WebSocket connection
var socket = io();

var connectionCount = document.getElementById('connection-count');
var statusMessage = document.getElementById('status-message');

// Listen for emitted statusMessage channel from server
socket.on('statusMessage', function(message) {
  statusMessage.innerText = message;
});

// Listen for emitted usersConnected channel from server
socket.on('usersConnected', function(count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

// Add event listeners to all voting buttons
var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}
