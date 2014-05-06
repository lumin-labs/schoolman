'use strict';

describe('Service: Fees', function () {

  // load the service's module
  beforeEach(module('schoolManApp'));

  // instantiate service
  var Fees;
  beforeEach(inject(function (_Fees_) {
    Fees = _Fees_;
  }));

  it('should do something', function () {
    expect(!!Fees).toBe(true);
  });

});
