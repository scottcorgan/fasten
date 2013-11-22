angular.module('Fasten')
  .controller('HooksCtrl', function ($scope, $rootScope, User, $timeout, api, hooks, $rootScope) {
    User.set($rootScope._user);
    
    $scope.loading = true;
    $scope.User = User;
    $rootScope.hooks = [];
    $scope.formErrors = [];
    
    var userWatcher = $scope.$watch('User', function (user) {
      if (!user) return;
      
      userWatcher();
      
      hooks.all().then(function (hooks) {
        $scope.loading = false;
        $rootScope.hooks = hooks;
      });
    }, true);

    $scope.createHook = function () {
      var domains = hooks.parseDomains($scope.newHookDomains);
      
      var hook = {
        title: $scope.newHookTitle || $scope.newHookEndpoint,
        endpoint: $scope.newHookEndpoint,
        domains: domains,
      };
      
      var errors = hooks.validateForm(hook)
      if (errors) return $scope.formErrors = errors;
      
      $scope.formErrors = [];
      
      hooks.create(hook).then(function (_hook) {
        $rootScope.hooks.push(_hook);
        $scope.resetNewHookValues();
        $scope.showCreateHookComposer = false;
      });
    };
    
    $scope.hasFormErrors = function () {
      return $scope.formErrors.length > 0;
    };
    
    $scope.removeHook = function (hook) {
      if (!confirm('Are you sure you want to delete this?')) return;
      
      var idx = $rootScope.hooks.indexOf(hook);
      $rootScope.hooks.splice(idx, 1);
      
      hooks.one(hook.endpoint).remove().then(function () {
      }, function () {
        // handle api error here
      });
    };
    
    $scope.resetNewHookValues = function () {
      $scope.newHookTitle = null;
      $scope.newHookEndpoint = null;
      $scope.newHookDomains = null;
    };
    
    $scope.haveNoHooks = function () {
      return $rootScope.hooks.length === 0 && !$scope.loading;
    };
    
  });