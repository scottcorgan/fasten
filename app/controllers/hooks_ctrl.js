angular.module('Fasten')
  .controller('HooksCtrl', function ($scope, User, $timeout, api, hooks, $rootScope) {
    User.set($rootScope._user);
    
    $scope.User = User;
    $scope.hooks = [];
    
    var userWatcher = $scope.$watch(User.get, function (user) {
      if (!user) return;
      
      userWatcher();
      
      hooks.all().then(function (hooks) {
        $scope.hooks = hooks;
      });
    });

    $scope.createHook = function () {
      var domains = _.map($scope.newHookDomain.split(','), function (domain) {
        return domain.replace(/ /g, '');
      });
      
      var hook = {
        title: $scope.newHookTitle,
        endpoint: $scope.newHookEndpoint,
        domains: domains,
      };
      
      hooks.create(hook).then(function (hook) {
        $scope.hooks.push(hook);
        $scope.resetNewHookValues();
        $scope.showHookComposer = false;
      });
    };
    
    $scope.removeHook = function (hook) {
      if (!confirm('Are you sure you want to delete this?')) return;
      
      hooks.one(hook.endpoint).remove().then(function () {
        var idx = $scope.hooks.indexOf(hook);
        $scope.hooks.splice(idx, 1);
      });
    };
    
    $scope.resetNewHookValues = function () {
      $scope.newHookTitle = null;
      $scope.newHookEndpoint = null;
      $scope.newHookDomain = null;
    };
    
  });