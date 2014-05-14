'use strict';

describe('Controller: FinanceCtrl', function () {

  // load the controller's module
  beforeEach(module('schoolManApp'));

  var FinanceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FinanceCtrl = $controller('FinanceCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
