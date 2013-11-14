var feedback = require('feedback');
var server = require('./server');
var socket = require('./socket');
var PORT = process.env.PORT || 4000;

require('./api_routes');
require('./client_routes');

server.listen(PORT, function () {
  feedback.success('Server started on port: ' + PORT);
});

