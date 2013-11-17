angular.module('Fasten')
  .factory('hooks', function ($q, api) {
    var _allHooks = [];
    var hooks = api.hooks;
    
    hooks.all = function (refresh) {
      var d = $q.defer();
      
      if (_allHooks.length > 0 && !refresh) {
        d.resolve(_allHooks);
      }
      else{
        hooks.list().then(function (hooks) {
          _allHooks = hooks;
          d.resolve(_allHooks);
        });
      }
      
      
      return d.promise;
    }
    
    return hooks;
  });