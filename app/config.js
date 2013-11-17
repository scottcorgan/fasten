angular.module('Fasten')
  .config(function ($routeProvider, $locationProvider, narratorProvider) {
    $locationProvider.html5Mode(true);
    
    $routeProvider
      .when('/', {
        templateUrl: '/templates/home.html',
        resolve: {
          user: authenciateUser
        }
      })
      .when('/login', {
        templateUrl: '/templates/login.html'
      })
      .when('/settings', {
        templateUrl: '/templates/settings.html'
      })
      .otherwise({
        redirectTo: '/'
      });
    
    narratorProvider.configure({
      host: 'http://localhost:4000',
    });
    
    function authenciateUser ($q, User) {
      if (User.get()) {
        var d = $q.defer();
        d.resolve(User.get());
        return d.promise;
      }
      
      return User.whenLoggedIn();
    }
  });