'use strict';

describe('Controller: ReportcardCtrl', function () {

  // load the controller's module
  beforeEach(module('reportCardApp'));

  var ReportcardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportcardCtrl = $controller('ReportcardCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
