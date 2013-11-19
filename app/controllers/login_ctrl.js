angular.module('Fasten')
  .controller('LoginCtrl', function ($scope, $rootScope, $timeout, User, $location, $http) {
    $scope.data = [];
    $scope.User = User;
    $scope.loading = false;
    
    if (Userbin.user()) return $location.path('/hooks');
    
    // $scope.login = function () {
    //   User.login($scope.email, $scope.password);
    // };
    
    // $scope.signup = function () {
    //   $rootScope.auth.createUser($scope.email, $scope.password, function (err, user) {
    //     $timeout(function () {
    //       if (err) $scope.formError = err.message; return;
          
    //       $scope.User.set(user);
    //       $scope.resetForm();
    //     });
        
    //   });
    // };
    
    // $scope.resetForm = function () {
    //   $scope.email = null;
    //   $scope.password = null;
    //   $scope.data = [];
    // };
  });