'use strict';

describe('Controller: CheckCtrl', function () {

  // load the controller's module
  beforeEach(module('appagooApp'));

  var CheckCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CheckCtrl = $controller('CheckCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
