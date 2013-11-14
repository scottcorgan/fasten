var Firebase = require('firebase');
var fastenRef = new Firebase('https://fasten.firebaseio.com');
var helpers = require('./helpers');

module.exports = function (fastener, host, callback) {
  var endpoint = helpers.encodePath(fastener.endpoint);
  
  fastenRef
    .child('hooks')
    .child(endpoint)
    .once('value', function (snapshot) {
      var hook = snapshot.val();
      
      if (!hook || host !== hook.domain || fastener.token !== hook.token) return callback();
      callback(null, hook);
    });
};