angular.module('Fasten')
  .controller('CreateHookCtrl', function ($scope, hooks, $location) {
    
    $scope.createHook = function () {
      var domains = _.map($scope.newHookDomain.split(','), function (domain) {
        return domain.replace(/ /g, '');
      });
      
      var hook = {
        title: $scope.newHookTitle,
        endpoint: $scope.newHookEndpoint,
        domains: domains,
      };
      
      hooks.create(hook).then(function (hook) {
        $location.path('/hooks');
      });
    };
  });