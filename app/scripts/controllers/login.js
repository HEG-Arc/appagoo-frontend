'use strict';

/**
 * @ngdoc function
 * @name appagooApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the appagooApp
 */
angular.module('appagooApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $http, ngDialog, $cookies, Authentication) {
    $scope.loginWithGoogle = function () {
        //$http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        return $http.post('/api-token/login/', {
          email: loginObj.email, 
          password: loginObj.password
        });
    };
    
    $scope.clickToLogin = function () {
        ngDialog.open({ 
          template: '/views/login.tpl.html',
          controller: 'LoginCtrl'
        });
        //$scope.renderSignInButton();
    };
       
    $scope.clickToLogout = function () {
        if ($scope.user.isAuthenticated()) {
          Authentication.logout();
          //gapi.auth.signOut();
        }
    };
    
    $scope.clickToRegister = function () {
        this.closeThisDialog();
        ngDialog.open({ 
          template: '/views/register.tpl.html',
          controller: 'LoginCtrl'
        });
    };
    
    $scope.registerObj = {
    };
    
    $scope.loginObj = {
    };
    
    $scope.register = function(registerObj) {
      Authentication.register(registerObj);
    };
    
    $scope.login = function(loginObj) {
      Authentication.login(loginObj);
      ngDialog.close();
    } 
        
    $scope.$on('event:google-plus-signin-success', function (event, authResult) {  
      $http.get("https://www.googleapis.com/oauth2/v1/userinfo?access_token="+authResult['access_token']).
        then(function(res){
          Authentication.setAuthenticatedAccount(res.data); 
          $rootScope.$broadcast('user:login',res.data);
        });
      $http.post('/api/login-token/', {
        access_token: authResult.access_token
      });
      ngDialog.close();
      $scope.user = Authentication;
    });
    
    $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
      // User has not authorized the G+ App!
      console.log('Not signed into Google Plus.');
    });
    
    $scope.user = Authentication;
      
    /*
    // This flag we use to show or hide the button in our HTML.
    $scope.signedIn = false;
 
    // Here we do the authentication processing and error handling.
    // Note that authResult is a JSON object.
    $scope.processAuth = function(authResult) {
        // Do a check if authentication has been successful.
        if(authResult['access_token']) {
            // Successful sign in.
            $scope.signedIn = true;
                        
            $http.get("https://www.googleapis.com/oauth2/v1/userinfo?access_token="+authResult['access_token']).
              then(function(res){
                $scope.google_data = res.data;
                console.log(res.data);
                Authentication.setAuthenticatedAccount(res.data); 
                console.log(Authentication.getAuthenticatedAccount().name);
              });
            
            // Workaround -> Error: Blocked a frame with origin "http://localhost:9000" from accessing a cross-origin frame.
            authResult['g-oauth-window'] = "";
            
            //$http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
            $http.post('/api/login-token/', authResult);  
                      
        } else if(authResult['error']) {
            // Error while signing in.
            $scope.signedIn = false;
 
            // Report error.
        }
    };
 
    // When callback is received, we need to process authentication.
     $scope.signInCallback = function (authResult) {
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.processAuth(authResult);
            });
        }, 0);
    };
 
    // Render the sign in button.
    $scope.renderSignInButton = function() {
        gapi.signin.render('signInButton',
            {
                'callback': $scope.signInCallback, // Function handling the callback.
                'clientid': '1040205011475-2ip8pc2dr3hilk36fkgjqdnhrqj3udrk.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
                'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                                                                                  // as their explanation is available in Google+ API Documentation.
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                'cookiepolicy': 'single_host_origin'
            }
        );
    }
    */
         
  });
