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

    var getProfile = function(){
      $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;
      $http.get('/api/profiles/?format=json').then(function(results) {
         $scope.profiles = results.data;
      });
    };
    
    $scope.profilUpdate = function(obj) {
      $http.put('/api/profiles/'+obj.id+'/', obj);   
    }
    
    getProfile();

    
    $scope.$on('user:login', function(event,data) {
      $scope.authenticated = true;
      getProfile();
    });
    
  });
