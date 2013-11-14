var feedback = require('feedback');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var PORT = process.env.PORT || 4000;

server.listen(PORT, function () {
  feedback.success('Server started on port: ' + PORT);
});

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.post(/^\/hooks\/([a-z0-9_-]+)\/?([\w+\/?]+)$/, function (req, res) {
  var hook = req.params.join('/');
  
  io.sockets.in(hook).emit('hooked', req.body);
  
  res.send();
});

io.sockets.on('connection', function (socket) {
  socket.on('join', function (room) {
    socket.join(room);
    socket.emit('connected', 'Connected to fasten.io');
  });
});