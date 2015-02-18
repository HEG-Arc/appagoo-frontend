'use strict';

/**
 * @ngdoc function
 * @name appagooApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the appagooApp
 */
angular.module('appagooApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
