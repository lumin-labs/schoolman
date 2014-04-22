'use strict';

describe('Controller: TranscriptctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('schoolManApp'));

  var TranscriptctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TranscriptctrlCtrl = $controller('TranscriptctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
