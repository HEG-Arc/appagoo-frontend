'use strict';

/**
 * @ngdoc service
 * @name appagooApp.Authentication
 * @description
 * # Authentication
 * Factory in the appagooApp.
 */
angular.module('appagooApp')
  .factory('Authentication', function ($cookies, $http) {
      
      var Authentication = {
        getAuthenticatedAccount: getAuthenticatedAccount,
        isAuthenticated: isAuthenticated,
        login: login,
        logout: logout,
        register: register,
        setAuthenticatedAccount: setAuthenticatedAccount,
        unauthenticate: unauthenticate,
      };

      return Authentication;
    
      function register(registerObj) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        return $http.post('http://localhost:8000/api/users/', {
          username: registerObj.email,
          password: registerObj.password,
          email: registerObj.email
        }).then(registerSuccessFn, registerErrorFn);
      }
      
      function registerSuccessFn(data, status, headers, config) {
        Authentication.login(data.data);
      }

      function registerErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }
      
      function login(loginObj) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        return $http.post('http://localhost:8000/api/login/', {
          email: loginObj.email, 
          password: loginObj.password
        }).then(loginSuccessFn, loginErrorFn);
      }

      function getAuthenticatedAccount() {
        if (!$cookies.authenticatedAccount) {
          return;
        }

        return JSON.parse($cookies.authenticatedAccount);
      }
          
      function isAuthenticated() {
        return !!$cookies.authenticatedAccount;
      }
           
      function setAuthenticatedAccount(account) {
        $cookies.authenticatedAccount = JSON.stringify(account);
      }
          
      function unauthenticate() {
        delete $cookies.authenticatedAccount;
      }
      
      function loginSuccessFn(data, status, headers, config) {
        Authentication.setAuthenticatedAccount(data.data);

        window.location = '/';
      }
      
      function loginErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }
      
      function logout() {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        return $http.post('http://localhost:8000/api/logout/')
          .then(logoutSuccessFn, logoutErrorFn);

        function logoutSuccessFn(data, status, headers, config) {
          Authentication.unauthenticate();

          window.location = '/';
        }

        function logoutErrorFn(data, status, headers, config) {
          console.error('Epic failure!');
        }
      }
});
