'use strict';

describe('Controller: MastersheetctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('schoolManApp'));

  var MastersheetctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MastersheetctrlCtrl = $controller('MastersheetctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
