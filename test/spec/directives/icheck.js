'use strict';

describe('Directive: iCheck', function () {

  // load the directive's module
  beforeEach(module('appagooApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<i-check></i-check>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the iCheck directive');
  }));
});
