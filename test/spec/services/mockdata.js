'use strict';

describe('Service: Mockdata', function () {

  // load the service's module
  beforeEach(module('reportCardApp'));

  // instantiate service
  var Mockdata;
  beforeEach(inject(function (_Mockdata_) {
    Mockdata = _Mockdata_;
  }));

  it('should do something', function () {
    expect(!!Mockdata).toBe(true);
  });

});
