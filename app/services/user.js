angular.module('Fasten')
  .factory('User', function ($q, narrator, $location, $rootScope, $timeout) {
    var _user;
    var scope = $rootScope.$new();
    
    var User = {
      get: function () {
        return _user;
      },
      
      set: function (user) {
        _user = user;
      },
      
      getEmail: function () {
        return _user.email.replace('.', 'dot');
      },
      
      whenLoggedIn: function () {
        var d = $q.defer();
        
        User.auth = new FirebaseSimpleLogin(fastenRef, function(err, user) {
          if (err) return console.error('error logging in');
          if (!user) return $location.path('/login');
          
          narrator.headers = {
            authorization: user.firebaseAuthToken
          };
          
          $timeout(function () {
            $rootScope._user = user;
            d.resolve(user);
          });
        });
        
        return d.promise;
      },
      
      login: function (email, password) {
        var promise = User.whenLoggedIn();
        
        User.auth.login('password', {
          email: email,
          password: password
        });
        
        return promise;
      },
      
      logout: function () {
        User.auth.logout();
        User.set(null);
        $location.path('/login');
      }
    };
    
    return User;
  });