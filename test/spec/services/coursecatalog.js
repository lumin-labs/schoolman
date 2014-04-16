'use strict';

describe('Service: Coursecatalog', function () {

  // load the service's module
  beforeEach(module('reportCardApp'));

  // instantiate service
  var Coursecatalog;
  beforeEach(inject(function (_Coursecatalog_) {
    Coursecatalog = _Coursecatalog_;
  }));

  it('should do something', function () {
    expect(!!Coursecatalog).toBe(true);
  });

});
