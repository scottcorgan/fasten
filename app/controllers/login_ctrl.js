angular.module('Fasten')
  .controller('LoginCtrl', function ($scope, $rootScope, $timeout, User, $location) {
    $scope.data = [];
    $scope.User = User;
    $scope.loading = false;
    
    $scope.login = function () {
      $scope.loading = true;
      User.login($scope.email, $scope.password).then(function () {
        $scope.loadig = false;
        $location.path('/');
      });
    };
    
    $scope.signup = function () {
      $rootScope.auth.createUser($scope.email, $scope.password, function (err, user) {
        $timeout(function () {
          if (err) $scope.formError = err.message; return;
          
          $scope.User.set(user);
          $scope.resetForm();
        });
        
      });
    };
    
    $scope.resetForm = function () {
      $scope.email = null;
      $scope.password = null;
      $scope.data = [];
    };
  });