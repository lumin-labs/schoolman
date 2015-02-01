'use strict';

describe('Controller: CustomersettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('schoolManApp'));

  var CustomersettingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustomersettingsCtrl = $controller('CustomersettingsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
