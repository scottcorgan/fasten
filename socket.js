var server = require('./server');
var io = require('socket.io').listen(server);
var authenticate = require('./auth');

io.set('origins', '*:*');
io.set('transports', [
  'websocket'
]);

io.sockets.on('connection', function (socket) {
  socket.on('join', function (fastener) {
    var host = socket.handshake.headers.host;
    
    authenticate(fastener, host, function (err, hook) {
      if (err) return socket.emit('AUTH_ERROR', 401);
      
      socket.join(fastener.endpoint);
      socket.emit('connected', 'Connected. fasten.io');
    });
  });
});

module.exports = io;