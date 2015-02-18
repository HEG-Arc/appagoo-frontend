'use strict';

describe('Filter: makeFilterItems', function () {

  // load the filter's module
  beforeEach(module('appagooApp'));

  // initialize a new instance of the filter before each test
  var makeFilterItems;
  beforeEach(inject(function ($filter) {
    makeFilterItems = $filter('makeFilterItems');
  }));

  it('should return the input prefixed with "makeFilterItems filter:"', function () {
    var text = 'angularjs';
    expect(makeFilterItems(text)).toBe('makeFilterItems filter: ' + text);
  });

});
