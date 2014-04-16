'use strict';

describe('Service: Schoolman', function () {

  // load the service's module
  beforeEach(module('reportCardApp'));

  // instantiate service
  var Schoolman;
  beforeEach(inject(function (_Schoolman_) {
    Schoolman = _Schoolman_;
  }));

  it('should do something', function () {
    expect(!!Schoolman).toBe(true);
  });

});
