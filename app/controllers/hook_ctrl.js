angular.module('Fasten')
  .controller('HookCtrl', function ($scope, $routeParams) {
    $scope.endpoint = $routeParams.endpoint;
  });