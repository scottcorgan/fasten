var app = require('./server').app;

app.get('/', function (req, res) {
  res.sendfile('public/index.html');
});

app.get('/login', function (req, res) {
  res.sendfile('public/index.html');
});