// Initiate client-side WebSocket connection
var socket = io();

var connectionCount = document.getElementById('connection-count');
var statusMessage = document.getElementById('status-message');
var voteCounts = document.getElementById('vote-counts');

// Listen for emitted statusMessage channel from server
socket.on('statusMessage', function(message) {
  statusMessage.innerText = message;
});

// Listen for emitted usersConnected channel from server
socket.on('usersConnected', function(count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

// Listen for emitted voteCount channel from server
socket.on('voteCount', function(votes) {
  var results = '';

  for (var choice in votes) {
    results = results + '<p>' + choice + ': ' + votes[choice] + '</p>';
  };

  voteCounts.innerHTML = results;
});

// Add event listeners to all voting buttons
var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}
