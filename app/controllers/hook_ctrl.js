angular.module('Fasten')
  .controller('HookCtrl', function ($scope, $routeParams, hooks) {
    $scope.$watch('showHookComposer', function (showHookComposer) {
      if (showHookComposer) $scope.editHook = angular.copy($scope.hook);
      else $scope.editHook = {};
    });
    
    $scope.updateHook = function () {
      var oldHook = angular.copy($scope.hook);
      $scope.hook = angular.copy($scope.editHook);
      $scope.showHookComposer = false;
      
      $scope.hook.domains = hooks.parseDomains($scope.hook.domains);
      
      hooks.one($scope.hook.endpoint).update($scope.hook).then(function () {
        oldHook = null;
      }, function () {
        alert('There was an error updating the hook. Please try again.');
        $scope.hook = oldHook;
        oldHook = null;
      });
    };
  });