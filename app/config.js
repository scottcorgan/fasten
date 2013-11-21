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
      .when('/hooks/create', {
        templateUrl: '/templates/hooks_create.html',
        resolve: {
          user: authenciateUser
        }
      })
      // .when('/hooks/edit/:endpoint*', {
      //   templateUrl: 'templates/edit_hook.html'
      // })
      // .when('/hooks/:endpoint*', {
      //   templateUrl: '/templates/hook.html'
      // })
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
      host: 'http://api.fasten.io'
      // host: 'http://api.fasten.dev:4000'
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