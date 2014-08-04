'use strict';

angular.module('SchoolMan')
  .service('SubjectTypes', function SubjectTypes() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var types = [
    	"General",
    	"Specialized",
    	"Other"
    ];

    var self = {};

    self.all = function(){
    	return types;
    };

    return self;
  });
