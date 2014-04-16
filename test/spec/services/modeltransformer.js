'use strict';

describe('Service: Modeltransformer', function () {

  // load the service's module
  beforeEach(module('schoolManApp'));

  // instantiate service
  var Modeltransformer;
  beforeEach(inject(function (_Modeltransformer_) {
    Modeltransformer = _Modeltransformer_;
  }));

  it('should do something', function () {
    expect(!!Modeltransformer).toBe(true);
  });

});
