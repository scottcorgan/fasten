angular.module('Fasten')
  .controller('AppCtrl', function ($scope, $rootScope, User, $location, $location) {
    $scope.User = User;
    
    $scope.isCurrentPath = function (path) {
      return $location.path() === path;
    };
  });