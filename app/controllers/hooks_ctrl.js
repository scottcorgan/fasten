angular.module('Fasten')
  .controller('HooksCtrl', function ($scope, $rootScope, User, $timeout, api, hooks, $rootScope) {
    User.set($rootScope._user);
    
    $scope.loading = true;
    $scope.User = User;
    $rootScope.hooks = [];
    
    var userWatcher = $scope.$watch('User', function (user) {
      if (!user) return;
      
      userWatcher();
      
      hooks.all().then(function (hooks) {
        $scope.loading = false;
        $rootScope.hooks = hooks;
      });
    }, true);

    $scope.createHook = function () {
      var domains = _.map($scope.newHookDomain.split(','), function (domain) {
        return domain.replace(/ /g, '');
      });
      
      var hook = {
        title: $scope.newHookTitle,
        endpoint: $scope.newHookEndpoint,
        domains: domains,
      };
      
      hooks.create(hook).then(function (_hook) {
        $rootScope.hooks.push(_hook);
        $scope.resetNewHookValues();
        $scope.showCreateHookComposer = false;
      });
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
      $scope.newHookDomain = null;
    };
    
    $scope.haveNoHooks = function () {
      return $rootScope.hooks.length === 0 && !$scope.loading;
    };
    
  });