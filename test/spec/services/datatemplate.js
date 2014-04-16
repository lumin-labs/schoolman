'use strict';

describe('Service: Datatemplate', function () {

  // load the service's module
  beforeEach(module('reportCardApp'));

  // instantiate service
  var Datatemplate;
  beforeEach(inject(function (_Datatemplate_) {
    Datatemplate = _Datatemplate_;
  }));

  it('should do something', function () {
    expect(!!Datatemplate).toBe(true);
  });

});
