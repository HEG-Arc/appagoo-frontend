'use strict';

/**
 * @ngdoc directive
 * @name appagooApp.directive:saveProfiler
 * @description
 * # saveProfiler
 */
angular.module('appagooApp')
  .directive('saveProfiler', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the saveProfiler directive');
      }
    };
  });
