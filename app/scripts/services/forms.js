'use strict';

angular.module('SchoolMan')
  .service('Forms', function Forms(model) {
    
    // AngularJS will instantiate a singleton by calling "new" on this function

    var forms = [
    	new model.Form({name:"Form 1"}),
    	new model.Form({name:"Form 2"}),	
    	new model.Form({name:"Form 3"}),	
    	new model.Form({name:"Form 4"}),	
    	new model.Form({name:"Form 5"}),	
    	new model.Form({name:"Lower Sixth"}),	
    	new model.Form({name:"Upper Sixth"})	
    ];

    var self = {};

    self.all = function(){
    	return forms;
    };

    return self;

  });
