angular.module('Fasten')
  .factory('User', function ($q, narrator, $location, $rootScope, $timeout, $http, narrator, $cookies) {
    var _user;
    var scope = $rootScope.$new();
    var API_HOST = narrator.host;
    
    Userbin.on('login.success logout.success login.error', $rootScope.$broadcast, $rootScope);
    
    $rootScope.$on('login.success', function ($e, user) {
      $location.path('/hooks');
    });
    
    $rootScope.$on('logout.success', function () {
      $location.path('/login');
      narrator.headers = {};
    });
    
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
        
        if (Userbin.user()) {
          resolveUser(Userbin.user());
          return d.promise;
        }
        else {
          Userbin.on('ready', function () {
            var user = Userbin.user();
            
            if (user) {
              return $timeout(function () {
                resolveUser(user);
              });
            }
            
            $location.path('/login');
          });
        }
        
        function resolveUser (user) {
          var session = JSON.parse($cookies._ubd);
          
          narrator.headers = {
            authorization: session.id
          };
          
          _.extend(User, user);
          d.resolve(User);
        }
        
        return d.promise;
      },
      
      login: function (email, password) {
        Userbin.auth('userbin.login');
      },
      
      logout: function () {
        Userbin.auth('userbin.logout');
      }
    };
    
    return User;
  });