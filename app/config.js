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
        templateUrl: '/templates/settings.html'
      })
      .otherwise({
        redirectTo: '/hooks'
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
    
    function hooks (User, $q, hooks, $timeout) {
      var d = $q.defer();
      
      User.whenLoggedIn().then(function () {
        hooks.all().then(function (hooks) {
          d.resolve(hooks);
        });
      });
      
      return d.promise;
    }
  });