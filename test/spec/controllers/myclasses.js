'use strict';

describe('Controller: MyclassesCtrl', function () {

  // load the controller's module
  beforeEach(module('reportCardApp'));

  var MyclassesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyclassesCtrl = $controller('MyclassesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
