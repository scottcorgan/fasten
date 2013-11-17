angular.module('Fasten')
  .factory('api', function (narrator) {
    var api = {
      hooks: narrator.endpoint('hooks')
    };
    
    return api;
  });