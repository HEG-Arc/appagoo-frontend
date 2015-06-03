'use strict';

/**
 * @ngdoc function
 * @name appagooApp.controller:CheckCtrl
 * @description
 * # CheckCtrl
 * Controller of the appagooApp
 */
angular.module('appagooApp')
  .controller('CheckCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    var getInstalledApps = function() {  
      $http.get('/api/userProfiles/?format=json').then(function(results) {
        $scope.installedApps = results.data;
      });
    };
    
    $scope.$on('user:login', function(event,data) {
      getInstalledApps();
    });
    
  });
