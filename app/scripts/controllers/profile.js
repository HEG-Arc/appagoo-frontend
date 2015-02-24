'use strict';

/**
 * @ngdoc function
 * @name appagooApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the appagooApp
 */
angular.module('appagooApp')
  .controller('ProfileCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $http.get('http://127.0.0.1:8000/api/threats/?format=json').then(function(results) {
       $scope.threats = results.data;

    });

	
    $scope.$watch('threats', function(val){
	console.log($scope.threats);
	console.log(val);
        
    }, true);


  });
