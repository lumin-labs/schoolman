'use strict';

describe('Service: Marksheet', function () {

  // load the service's module
  beforeEach(module('reportCardApp'));

  // instantiate service
  var Marksheet;
  beforeEach(inject(function (_Marksheet_) {
    Marksheet = _Marksheet_;
  }));

  it('should do something', function () {
    expect(!!Marksheet).toBe(true);
  });

});
