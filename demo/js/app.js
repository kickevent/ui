angular.module('kickevent.ui.demo', ['ngRoute']);

angular.module('kickevent.ui.demo').config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html'
    })

    .when('/headings', {
      templateUrl: 'headings.html'
    })

    .when('/buttons', {
      templateUrl: 'buttons.html'
    })

    .when('/menus', {
      templateUrl: 'menus.html'
    })

    .otherwise({
      redirectTo: '/'
    })
  ;
});

angular.module('kickevent.ui.demo').controller('MenuController', function($location) {
  this.isActive = function(page) {
    return $location.path().indexOf(page) !== -1;
  };
});
