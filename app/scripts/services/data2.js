'use strict';

angular.module('SchoolMan')
  .service('Data2', function Data2() {
    
  	return new PouchDB("schoolman");

  });
