'use strict';

describe('Controller: NavtabsCtrl', function () {

  // load the controller's module
  beforeEach(module('schoolManApp'));

  var NavtabsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavtabsCtrl = $controller('NavtabsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
