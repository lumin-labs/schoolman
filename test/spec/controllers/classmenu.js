'use strict';

describe('Controller: ClassmenuCtrl', function () {

  // load the controller's module
  beforeEach(module('schoolManApp'));

  var ClassmenuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClassmenuCtrl = $controller('ClassmenuCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
