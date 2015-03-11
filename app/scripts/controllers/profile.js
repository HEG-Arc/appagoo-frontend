'use strict';

/**
 * @ngdoc function
 * @name appagooApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the appagooApp
 */
angular.module('appagooApp')
  .controller('ProfileCtrl', function ($scope, $http, $cookies) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $http.get('http://127.0.0.1:8000/api/threats/?format=json').then(function(results) {
       $scope.threats = results.data;

    });
    
    $http.get('http://127.0.0.1:8000/api/profiles/?format=json').then(function(results) {
       $scope.profiles = results.data;
    });

    $scope.profilUpdate = function(obj) {
      $http.defaults.headers.put['X-CSRFToken'] = $cookies.csrftoken;
      $http.put('http://localhost:8000/api/profiles/'+obj.id+'/', obj);   
    }
	
  });
