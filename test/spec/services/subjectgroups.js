'use strict';

describe('Service: Subjectgroups', function () {

  // load the service's module
  beforeEach(module('schoolManApp'));

  // instantiate service
  var Subjectgroups;
  beforeEach(inject(function (_Subjectgroups_) {
    Subjectgroups = _Subjectgroups_;
  }));

  it('should do something', function () {
    expect(!!Subjectgroups).toBe(true);
  });

});
