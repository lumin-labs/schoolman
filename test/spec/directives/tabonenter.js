'use strict';

describe('Directive: tabOnEnter', function () {

  // load the directive's module
  beforeEach(module('reportCardApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tab-on-enter></tab-on-enter>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tabOnEnter directive');
  }));
});
