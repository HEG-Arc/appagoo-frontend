'use strict';

/**
 * @ngdoc overview
 * @name appagooApp
 * @description
 * # appagooApp
 *
 * Main module of the application.
 */
angular
  .module('appagooApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'app.filters',
    'ui.bootstrap-slider',
    'ngDialog',
    'directive.g+signin',
    'ui.bootstrap',
  ])
  .config(function ($routeProvider, $interpolateProvider, $httpProvider, $resourceProvider, ngDialogProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // Force angular to use square brackets for template tag
    // The alternative is using {% verbatim %}
    $interpolateProvider.startSymbol('[[').endSymbol(']]');

    // CSRF Support
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.withCredentials = true;

    // This only works in angular 3!
    // It makes dealing with Django slashes at the end of everything easier.
    $resourceProvider.defaults.stripTrailingSlashes = false;
    
    ngDialogProvider.setForceBodyReload(true);
    
  });
