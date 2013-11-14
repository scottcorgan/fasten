var app = require('./server').app;

app.get('/', function (req, res) {
  res.sendfile('public/index.html');
});