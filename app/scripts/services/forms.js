'use strict';

angular.module('SchoolMan')
  .service('Forms', function Forms(model, VERSION) {
    
    // AngularJS will instantiate a singleton by calling "new" on this function

    var modes = {
        'gths':[
            "Form 1",
            "Form 2",
            "Form 3",
            "Form 4",
            "Form 5",
            "Form 6",
            "Form 7"
        ],
        'ghs' :[
            "Form 1",
            "Form 2",
            "Form 3",
            "Form 4",
            "Form 5",
            "Lower Sixth",
            "Upper Sixth"
        ]
    }

    var forms = [
    	new model.Form({name:modes[VERSION.mode][0]}),
    	new model.Form({name:modes[VERSION.mode][1]}),	
    	new model.Form({name:modes[VERSION.mode][2]}),	
    	new model.Form({name:modes[VERSION.mode][3]}),	
    	new model.Form({name:modes[VERSION.mode][4]}),	
    	new model.Form({name:modes[VERSION.mode][5]}),	
    	new model.Form({name:modes[VERSION.mode][6]})	
    ];

    var self = {};

    self.all = function(){
    	return angular.copy(forms);
    };

    return self;

  });
