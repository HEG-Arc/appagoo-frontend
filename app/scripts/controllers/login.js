'use strict';

/**
 * @ngdoc function
 * @name appagooApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the appagooApp
 */
angular.module('appagooApp')
  .controller('LoginCtrl', function ($scope, $http, ngDialog, $cookies, Authentication) {
    $scope.loginWithGoogle = function () {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        return $http.post('http://localhost:8000/api-token/login/', {
          email: loginObj.email, 
          password: loginObj.password
        }).then(loginSuccessFn, loginErrorFn);
    };
    
    $scope.clickToLogin = function () {
        ngDialog.open({ 
          template: '/scripts/templates/login.tpl.html',
          controller: 'LoginCtrl'
        });
    };
    
    $scope.clickToLogout = function () {
        if ($scope.user.isAuthenticated()) {
          Authentication.logout();
        } 
        if ($scope.signedIn) {
          gapi.auth.signOut();
          $scope.signedIn = false;
        }
    };
    
    $scope.clickToRegister = function () {
        this.closeThisDialog();
        ngDialog.open({ 
          template: '/scripts/templates/register.tpl.html',
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
    }  
    
    $scope.user = Authentication;
    
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
              });
            
            // Workaround -> Error: Blocked a frame with origin "http://localhost:9000" from accessing a cross-origin frame.
            authResult['g-oauth-window'] = "";
            
            $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
            $http.post('http://localhost:8000/api/login-token/', authResult);     
     
        } else if(authResult['error']) {
            // Error while signing in.
            $scope.signedIn = false;
 
            // Report error.
        }
    };
 
    // When callback is received, we need to process authentication.
    $scope.signInCallback = function(authResult) {
        $scope.$apply(function() {
            $scope.processAuth(authResult);
        });
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
 
    // Start function in this example only renders the sign in button.
    $scope.start = function() {
        $scope.renderSignInButton();
    };
        
    $scope.start();
  });
