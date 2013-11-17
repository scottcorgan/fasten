var fastenRef = new Firebase('https://fasten.firebaseio.com');

var app = angular.module('Fasten', ['ngRoute']);

angular.module('Fasten')
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    
    $routeProvider
      .when('/', {
        templateUrl: '/templates/home.html',
        resolve: {
          user: function ($q, $location) {
            var d = $q.defer();
            
            var auth = new FirebaseSimpleLogin(fastenRef, function(err, user) {
              if (err) console.error('need to login');
              if (!user) $location.path('/login');
              if (user) d.resolve(user);
            });
            
            return d.promise;
          }
        }
      })
      .when('/login', {
        templateUrl: '/templates/login.html'
      });
  });

angular.module('Fasten')
  .factory('User', function ($q) {
    var _user;
    
    return {
      get: function () {
        return _user;
      },
      
      set: function (user) {
        _user = user;
      },
      
      getEmail: function () {
        return _user.email.replace('.', 'dot');
      }
    }
  });

angular.module('Fasten')
  .controller('LoginCtrl', function ($scope, $timeout, User) {
    $scope.data = [];
    $scope.User = User;
    
    $scope.auth = new FirebaseSimpleLogin(fastenRef, function(err, user) {
      if (err) {
        return $timeout(function () {
          $scope.formError = err.message;
        });
      }
      
      if (user) {
        $timeout(function () {
          $scope.User.set(user);
          $scope.resetForm();
        });
      }
    });
    
    $scope.login = function () {
      $scope.auth.login('password', {
        email: $scope.email,
        password: $scope.password
      });
    };
    
    $scope.signup = function () {
      $scope.auth.createUser($scope.email, $scope.password, function (err, user) {
        $timeout(function () {
          if (err) return $scope.formError = err.message;
          
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
    
    $scope.logout = function () {
      $scope.auth.logout();
      $scope.User.set(null);
    };
  });

angular.module('Fasten')
  .controller('HooksCtrl', function ($scope, User, $timeout, $http) {
    $scope.User = User;
    $scope.hooks = [];
    
    var userWatcher = $scope.$watch(User.get, function (user) {
      if (!user) return;
      
      userWatcher();
      
      $http.get('/hooks', {
        headers: {
          authorization: user.firebaseAuthToken
        }
      }).success(function (hooks) {
        $scope.hooks = hooks;
      });
    });

    $scope.createHook = function () {
      var domains = _.map($scope.newHookDomain.split(','), function (domain) {
        return domain.replace(/ /g, '');
      });
      
      $http.post('/hooks', {
        title: $scope.newHookTitle,
        endpoint: $scope.newHookEndpoint,
        domains: domains,
      }, {
        headers: {
          authorization: $scope.User.get().firebaseAuthToken
        }
      }).success(function (hook) {
        $scope.hooks.push(hook);
        $scope.resetNewHookValues();
        $scope.showHookComposer = false;
      });
    };
    
    $scope.removeHook = function (hook) {
      if (!confirm('Are you sure you want to delete this?')) return;
      
      $http.delete('/hooks/' + hook.endpoint, {
        headers: {
          authorization: $scope.User.get().firebaseAuthToken
        }
      }).success(function () {
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