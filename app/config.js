angular.module('Fasten')
  .config(function ($routeProvider, $locationProvider, narratorProvider) {
    $locationProvider.html5Mode(true);
    
    $routeProvider
      .when('/hooks', {
        templateUrl: '/templates/hooks.html',
        resolve: {
          user: authenciateUser
        }
      })
      .when('/hooks/:endpoint*', {
        templateUrl: '/templates/hook.html'
      })
      .when('/login', {
        templateUrl: '/templates/login.html'
      })
      .when('/settings', {
        templateUrl: '/templates/settings.html',
        resolve: {
          user: authenciateUser
        }
      })
      .otherwise({
        redirectTo: '/hooks'
      });
    
    narratorProvider.configure({
      host: 'http://localhost:4000',
    });
    
    function authenciateUser ($q, User, $location, $timeout) {
      var d = $q.defer();
      
      if (Userbin.user()) {
        d.resolve(Userbin.user());
      }
      else {
        $location.path('/login');
      }
       
      return User.whenLoggedIn();
    }    
  });