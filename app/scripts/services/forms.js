'use strict';

angular.module('SchoolMan')
  .service('Forms', function Forms(model, VERSION) {
    
    // AngularJS will instantiate a singleton by calling "new" on this function

    var modes = {
        'gths':{
            "0":"Form 1",
            "1":"Form 2",
            "2":"Form 3",
            "3":"Form 4",
            "4":"Form 5",
            "5":"Form 6",
            "6":"Form 7"
        },
        'ghs' :{
            "0":"Form 1",
            "1":"Form 2",
            "2":"Form 3",
            "3":"Form 4",
            "4":"Form 5",
            "5":"Lower Sixth",
            "6":"Upper Sixth"
        }
    }

    var forms = {
    	"0":new model.Form({name:modes[VERSION.mode]['0']}),
    	"1":new model.Form({name:modes[VERSION.mode]['1']}),	
    	"2":new model.Form({name:modes[VERSION.mode]['2']}),	
    	"3":new model.Form({name:modes[VERSION.mode]['3']}),	
    	"4":new model.Form({name:modes[VERSION.mode]['4']}),	
    	"5":new model.Form({name:modes[VERSION.mode]['5']}),	
    	"6":new model.Form({name:modes[VERSION.mode]['6']})	
    };

    var self = {};

    self.all = function(){
    	return angular.copy(forms);
    };

    return self;

  });
