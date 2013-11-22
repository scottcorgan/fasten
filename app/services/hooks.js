angular.module('Fasten')
  .factory('hooks', function ($q, api, $rootScope, $cacheFactory) {
    var _allHooks = [];
    var hooks = api.hooks;
    var ENDPOINT_REGEXP = /^([.a-zA-Z0-9-]\/?)+$/;
    
    $rootScope.$on('logout.success', function () {
      _allHooks = [];
    });
    
    hooks._add = function (hook) {
      _allHooks.push(hook);
    };
    
    hooks.parseDomains = function (domains) {
      if (_.isArray(domains) && _.isString(domains)) domains = domains.join(',');
      else if (_.isString(domains)) domains = domains.split(',');
      
      if (!domains) domains = [];
      
      return _.map(domains, function (domain) {
        return domain.replace(/ /g, '');
      });
    };
    
    hooks.validateForm = function (hook) {
      var errors = [];
      
      if (!hook.endpoint) errors.push('You must include an endpoint');
      else if (!ENDPOINT_REGEXP.test(hook.endpoint)) errors.push('Invalid endpoint path');
      
      return (errors.length) ? errors : undefined;
    };
    
    hooks.all = function (refresh) {
      var d = $q.defer();
      
      if (_allHooks.length > 0 && !refresh) {
        d.resolve(_allHooks);
      }
      else{
        hooks.list().then(function (hooks) {
          _allHooks = hooks;
          $rootScope.hooks = hooks;
          d.resolve(_allHooks);
        });
      }
      
      return d.promise;
    }
    
    return hooks;
  });