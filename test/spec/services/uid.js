'use strict';

describe('Service: Uid', function () {

  // load the service's module
  beforeEach(module('reportCardApp'));

  // instantiate service
  var Uid;
  beforeEach(inject(function (_Uid_) {
    Uid = _Uid_;
  }));

  it('should do something', function () {
    expect(!!Uid).toBe(true);
  });

});
