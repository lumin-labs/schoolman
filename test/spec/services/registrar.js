'use strict';

describe('Service: Registrar', function () {

  // load the service's module
  beforeEach(module('reportCardApp'));

  // instantiate service
  var Registrar;
  beforeEach(inject(function (_Registrar_) {
    Registrar = _Registrar_;
  }));

  it('should do something', function () {
    expect(!!Registrar).toBe(true);
  });

});
