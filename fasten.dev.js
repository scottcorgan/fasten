var Fasten = function (endpoint) {
  var self = this;
  
  var API_HOST = 'http://api.fasten.io';
  var PUSHER_SCRIPT = 'http://js.pusher.com/2.1/pusher.min.js';
  var PUSHER_KEY = 'c9e8f9099ff0d687f7b8';
  
  this._endpoint = endpoint.replace(/\//, '_');
  this._hookCallbacks = [];
  
  this._load(PUSHER_SCRIPT, function() {
    Pusher.log = function(message) {
      if (window.console && window.console.log) {
        window.console.log(message);
      }
    };

    self._pusher = new Pusher(PUSHER_KEY, {
      authEndpoint: API_HOST + '/pusher/auth'
    });
    
    self._channel = self._pusher.subscribe('private-' + self._endpoint);
    self._listenForHooks();
  });
};

Fasten.prototype.hook = function (callback) {
  if (callback) this._hookCallbacks.push(callback);
};

Fasten.prototype._listenForHooks = function () {
  var self = this;
  
  this._channel.bind('hooked', function(data) {
    self._hookCallbacks.forEach(function (hookCallback) {
      if (typeof hookCallback === 'function') hookCallback(data);
    });
  });
};

Fasten.connect = function (endpoint) {
  return new Fasten(endpoint);
};

Fasten.prototype._load = function (src, callback) {
  var s = document.createElement('script');
  s.src = src;
  s.async = true;
  s.onreadystatechange = s.onload = function() {
    var state = s.readyState;
    if (!callback.done && (!state || /loaded|complete/.test(state))) {
      callback.done = true;
      callback();
    }
  };
  document.getElementsByTagName('head')[0].appendChild(s);
};