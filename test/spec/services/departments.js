'use strict';

describe('Service: Departments', function () {

  // load the service's module
  beforeEach(module('schoolManApp'));

  // instantiate service
  var Departments;
  beforeEach(inject(function (_Departments_) {
    Departments = _Departments_;
  }));

  it('should do something', function () {
    expect(!!Departments).toBe(true);
  });

});
