'use strict';

/**
 * @ngdoc function
 * @name appagooApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appagooApp
 */
angular.module('appagooApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
