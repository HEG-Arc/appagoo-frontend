'use strict';

/**
 * @ngdoc function
 * @name appagooApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the appagooApp
 */
angular.module('appagooApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $http, ngDialog, $cookies) {
    
    function popupwindow(url, title, w, h) {
      var left = (screen.width/2)-(w/2);
      var top = (screen.height/2)-(h/2);
      return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
    } 
    
    $scope.clickToLogin = function () {
      popupwindow('/accounts/login', 'Log In', 480, 655);  
    };
    
    $scope.authenticated = false;
   
    $http.get('/api/users/?format=json').then(function(results) {
      if(results.data){
        $scope.authenticated = true;
        $scope.user = results.data;
        $rootScope.$broadcast('user:login', results.data);
      }
    });
         
  });
