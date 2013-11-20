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
      .when('/docs', {
        templateUrl: '/templates/docs.html',
        resolve: {
          user: authenciateUser
        }
      })
      .when('/integrations', {
        templateUrl: '/templates/integrations.html',
        resolve: {
          user: authenciateUser
        }
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
      // host: 'http://localhost:4000',
      // host: 'http://api.fasten.io'
      host: 'http://api.fasten.dev:4000'
    });
    
    function authenciateUser ($q, User, $location, $timeout) {
      var d = $q.defer();
      
      if (Userbin.user()) {
        d.resolve(Userbin.user());
      }
      else {
        d.reject();
        window.location = '/?action=login';
      }
       
      return User.whenLoggedIn();
    }    
  });