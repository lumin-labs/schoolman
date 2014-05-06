'use strict';

describe('Controller: DepartmentsCtrl', function () {

  // load the controller's module
  beforeEach(module('schoolManApp'));

  var DepartmentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DepartmentsCtrl = $controller('DepartmentsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
