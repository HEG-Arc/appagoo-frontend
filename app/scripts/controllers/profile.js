'use strict';

/**
 * @ngdoc function
 * @name appagooApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the appagooApp
 */
angular.module('appagooApp')
  .controller('ProfileCtrl', function ($scope, $http, $cookies, Authentication) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /*
    $http.get('/api/threats/?format=json').then(function(results) {
      $scope.threats = results.data;
    });
    */
    
    var getProfile = function(){
      //console.log(Authentication.getAuthenticatedAccount());
      $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;
      $http.get('/api/profiles/?format=json').then(function(results) {
         $scope.profiles = results.data;
      });
    };
    
    getProfile();
    
    $scope.profilUpdate = function(obj) {
      //$http.defaults.headers.put['X-CSRFToken'] = $cookies.csrftoken;
      $http.put('/api/profiles/'+obj.id+'/', obj);   
    }
    
    $scope.authenticated = Authentication.isAuthenticated();
    
    $scope.$on('user:login', function(event,data) {
      $scope.authenticated = true;
      getProfile();
    });
       
    $scope.$on('user:logout', function(event,data) {
      $scope.authenticated = false;
      getProfile();
    });
    
    //$scope.getDefaultProfile();
	
  });
