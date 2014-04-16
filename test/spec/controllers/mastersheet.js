'use strict';

describe('Controller: MastersheetCtrl', function () {

  // load the controller's module
  beforeEach(module('reportCardApp'));

  var MastersheetCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MastersheetCtrl = $controller('MastersheetCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
