'use strict';

describe('Service: Classmaster', function () {

  // load the service's module
  beforeEach(module('reportCardApp'));

  // instantiate service
  var Classmaster;
  beforeEach(inject(function (_Classmaster_) {
    Classmaster = _Classmaster_;
  }));

  it('should do something', function () {
    expect(!!Classmaster).toBe(true);
  });

});
