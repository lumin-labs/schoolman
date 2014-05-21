'use strict';

angular.module('SchoolMan')
  .service('Students', function Students($q, Data2, model, modelTransformer) {


  	self = {};

  	self.query = function(params){
    	
    	var deferred = $q.defer();

    	// Load Data
    	var dataModel = model.Student;

	    var map = function(doc, emit){
	      if(doc.type === dataModel.datatype._id){
	      	var obj = model.parse(doc, dataModel.datatype);
	      	var isok= true;
	      	angular.forEach(params, function(param, paramKey){
	      		isok = obj[paramKey] === param ? isok : false;
	      	});
	      	console.log("Mapping student: ", obj, isok, params);
	      	if(isok){
	      		emit(doc._id, {_id:doc.type, data:doc});
	      	}
	      } 
	    };
	    Data2.query(map, {include_docs : true}).then(function(success){
	    		var collection = [];
	        angular.forEach(success.rows, function(data, rowIndex){
	            var spec = data.doc;
	            var obj = model.parse(data.value.data, spec);
	            var item = modelTransformer.transform(obj, dataModel);
	            collection.push(item);
	        });
	        console.log("Query: success", success, collection);
	        deferred.resolve(collection);
	    }).catch(function(error){
	        deferred.reject("Query: failed", error);
	    });

    	return deferred.promise;
    };

    return self;
  });
