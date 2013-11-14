var fastenRef = new Firebase('https://fasten.firebaseio.com');

var app = angular.module('Fasten', []);

angular.module('Fasten')
  .factory('User', function () {
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
          $scope.hookupFasten();
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
    
    $scope.hookupFasten = function () {
      // if (!$scope.user || !$scope.user.firebaseAuthToken) return;
      
      // $scope.fasten = new Fasten('scottcorgan/github/column', $scope.user.firebaseAuthToken);

      // $scope.fasten.hook(function (data) {
      //   $scope.data.push(data);
      //   $scope.$apply();
      // });
    };
  });

angular.module('Fasten')
  .controller('HooksCtrl', function ($scope, User, $timeout, $http) {
    $scope.User = User;
    $scope.hooks = [];
    
    var userWatcher = $scope.$watch(User.get, function (user) {
      if (!user) return;
      
      userWatcher();
      
      fastenRef
        .child('users')
        .child($scope.User.getEmail())
        .child('hooks')
        .on('value', function (snapshot) {
          var hooks = snapshot.val();
          if (!hooks) return;
          
          Object.keys(hooks).forEach(function (token) {
            fastenRef
              .child('hooks')
              .child(token)
              .on('value', function (snapshot) {
                var hook = snapshot.val();
                
                $timeout(function () {
                  $scope.hooks.push(hook);
                });
              });
            
          });
        });
    });

    $scope.createHook = function () {
      // TODO: move to the backend
      
      $http.get('/encode', {
        params: {
          path: $scope.newHookEndpoint
        }
      }).success(function (encodedEndpoint) {
        $http.post('/token').success(function (token) {
          var userRef = fastenRef.child('users').child($scope.User.getEmail());
          var hookRef = fastenRef.child('hooks').child(encodedEndpoint);
          
          userRef.child('hooks').child(encodedEndpoint).set(true);
          hookRef.set({
            title: $scope.newHookTitle,
            endpoint: $scope.newHookEndpoint,
            domain: $scope.newHookDomain,
            token: token
          });
        });
      });
      
    };
    
    $scope.removeHook = function (hook) {
      // fastenRef
      //   .child('users')
      //   .child($scope.User.getEmail())
      //   .child('hooks')
      //   .child(hook.token)
      //   .remove();
      
      // fastenRef
      //   .child('hooks')
      //   .child(hook.token)
      //   .remove();
    };
    
    $scope.resetNewHookValues = function () {
      $scope.newHookTitle = null;
      $scope.newHookEndpoint = null;
      $scope.newHookDomain = null;
    };
    
  });