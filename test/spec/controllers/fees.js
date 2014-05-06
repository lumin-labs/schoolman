'use strict';

describe('Controller: FeesCtrl', function () {

  // load the controller's module
  beforeEach(module('schoolManApp'));

  var FeesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FeesCtrl = $controller('FeesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
