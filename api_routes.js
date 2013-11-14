var app = require('./server').app;
var hat = require('hat');
var socket = require('./socket');
var helpers = require('./helpers');


var Firebase = require('firebase');
var fastenRef = new Firebase('https://fasten.firebaseio.com');


app.post(/^\/hooks\/([a-z0-9_-]+)\/?([\w+\/?]+)$/, function (req, res) {
  var hook = req.params.join('/');
  
  socket.sockets.in(hook).emit('hooked', req.body);
  res.send();
});

app.post('/token', function (req, res) {
  var token = hat();
  res.send(token);
});

app.get('/encode', function (req, res) {
  res.send(helpers.encodePath(req.query.path));
});

