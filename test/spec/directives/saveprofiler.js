'use strict';

describe('Directive: saveProfiler', function () {

  // load the directive's module
  beforeEach(module('appagooApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<save-profiler></save-profiler>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the saveProfiler directive');
  }));
});
