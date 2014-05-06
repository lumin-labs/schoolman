'use strict';

angular.module('SchoolMan')
  .service('Fees', function Fees(Slug, Fee, Data, modelTransformer, InsertionError) {
    
    var fees = {};

    var self = {};

    self.getAll = function(){
    	return fees;
    };

    self.add = function(fee){
    	var code = Slug.slugify(fee.name);
    	if(fees.hasOwnProperty(code)){
    		throw new InsertionError("Fees", code);
    	} else {
    		fee.code = code;
    		fees[code] = fee;
    	}
    	console.log("Fees", fees)
    };

    self.remove = function(fee){
    	delete fees[fee.code];
    };

    self.save = function(){
    	Data.saveLater({fees:fees});
    };

    // Load Data
    Data.get('fees', function(obj){
    	angular.forEach(obj, function(fee, feeKey){
    		fees[feeKey] = modelTransformer.transform(fee, Fee);
    	});
    });

    return self;

  });
