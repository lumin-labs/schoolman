'use strict';

describe('Controller: Marksheet2Ctrl', function () {

  // load the controller's module
  beforeEach(module('reportCardApp'));

  var Marksheet2Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Marksheet2Ctrl = $controller('Marksheet2Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
