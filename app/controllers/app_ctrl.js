angular.module('Fasten')
  .controller('AppCtrl', function ($scope, $rootScope, User, $location) {
    $scope.User = User;
    
  });