'use strict';

describe('Service: Ranking', function () {

  // load the service's module
  beforeEach(module('reportCardApp'));

  // instantiate service
  var Ranking;
  beforeEach(inject(function (_Ranking_) {
    Ranking = _Ranking_;
  }));

  it('should do something', function () {
    expect(!!Ranking).toBe(true);
  });

});
