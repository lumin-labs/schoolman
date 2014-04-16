'use strict';

describe('Service: Timetable', function () {

  // load the service's module
  beforeEach(module('reportCardApp'));

  // instantiate service
  var Timetable;
  beforeEach(inject(function (_Timetable_) {
    Timetable = _Timetable_;
  }));

  it('should do something', function () {
    expect(!!Timetable).toBe(true);
  });

});
