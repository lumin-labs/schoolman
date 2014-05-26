'use strict';

angular.module('SchoolMan')
  .service('Terms', function Terms() {
    
    // AngularJS will instantiate a singleton by calling "new" on this function

    var terms = {
    	"0":{name:"Term 1"},
    	"1":{name:"Term 2"},	
    	"2":{name:"Term 3"}
    };

    var self = {};

    self.getAll = function(){
    	return angular.copy(terms);
    };

    return self;

  });
