var Fasten = function (_endpoint, token) {
  var STREAM_SERVER = 'http://fasten.io:80/';
  // var STREAM_SERVER = 'http://localhost:4000/';
  
  var _token = this._token = token;
  var _endpoint = this._endpoint = _endpoint;
  var _socket = this._socket = io.connect(STREAM_SERVER);
  
  _socket.on('connect', function () {
    _socket.emit('join', {
      endpoint: _endpoint,
      token: _token
    });
  });

  _socket.on('connected', function (data) {
    console.log(data);
  });
  
  _socket.on('AUTH_ERROR', function () {
    console.error('Unauthorized to use this fasten hook');
  });
  
  _socket.on('error', function (err) {
    
  });
};

Fasten.prototype.hook = function (callback) {
  this._socket.on('hooked', function (data) {
    callback(data);
  });
};

Fasten.connect = function (endpoint, token) {
  return new Fasten(endpoint, token);
};
