'use strict';

describe('Service: Extendmodel', function () {

  // load the service's module
  beforeEach(module('reportCardApp'));

  // instantiate service
  var Extendmodel;
  beforeEach(inject(function (_Extendmodel_) {
    Extendmodel = _Extendmodel_;
  }));

  it('should do something', function () {
    expect(!!Extendmodel).toBe(true);
  });

});
