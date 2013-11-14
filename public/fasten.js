var Fasten = function (_hookTitle) {
  var STREAM_SERVER = 'http://fasten-9820.onmodulus.net';
  
  var _hookTitle = this._hookTitle = _hookTitle;
  var _socket = this._socket = io.connect(STREAM_SERVER);
  
  _socket.on('connect', function () {
    _socket.emit('join', _hookTitle);
  });

  _socket.on('connected', function (data) {
    console.log(data);
  });
};

Fasten.prototype.hook = function (callback) {
  this._socket.on('hooked', function (data) {
    callback(data);
  });
};
