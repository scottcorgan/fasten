angular.module('Fasten')
  .directive('scrollToOnClick', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var to = angular.element(attrs.scrollToOnClick);
        
        var settings = angular.extend({
          container: window,
          scrollTarget: to,
          offsetTop: 0,
          duration: 150,
          easing: 'swing'
        }, attrs);
        
        element.on('click', function () {
          $timeout(function () {
            var scrollPane = angular.element(settings.container);
            var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
            var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - settings.offsetTop;
            scrollPane.animate({scrollTop : scrollY }, settings.duration, settings.easing, function(){
              if (typeof callback == 'function') { callback.call(this); }
            });
          });
        });
        
      }
    };
  });