'use strict';

/**
 * @ngdoc function
 * @name appagooApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appagooApp
 */
angular.module('appagooApp')
  .controller('MainCtrl', function ($scope, $state, $stateParams, loginService, $http) {
    // Expose $state and $stateParams to the <body> tag
    $scope.$state = $state;
    $scope.$stateParams = $stateParams;
 
 
    // loginService exposed and a new Object containing login user/pwd
    $scope.ls = loginService;
    $scope.login = {
    working: false
    };
 
    $scope.loginBK = function (backend) {
 
            if (backend == 'google') {
            OAuth.popup('google', function(error, success) {
                if (error) {
 
                }
                else {
                    var token = "Token " + success.access_token
 
                    var loginPromise = $http({method:'POST', url: 'http://127.0.0.1:8000/api-token/login/' + backend + '/', headers: {'Authorization': token}});
                    $scope.login.working = true;
 
                    loginService.loginUser(loginPromise);
                    loginPromise.success(function () {
                      $scope.login = { working: false };
                    });
                    loginPromise.finally(function () {
                      $scope.login.working = false;
                    });
 
                }
            });
            }
 
    };
 
    $scope.logoutMe = function () {
    loginService.logoutUser($http.get('http://127.0.0.1:8000/api-token/logout'));
    };
 
    // Changement du dynamique du titre
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Welcome' ;
    }
    });
 
    // initilization de oauth.io
    OAuth.initialize('your oauth.io key');
  });
