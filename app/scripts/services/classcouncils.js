'use strict';

angular.module('SchoolMan')
  .service('ClassCouncils', function ClassCouncils($q, $rootScope, model, Data2, modelTransformer) {

    var self = {};
    var classcouncils = {};

    self.getAll = function(){
  		return classcouncils;
  	};

    self.query = function(classId){

    	var deferred = $q.defer();

    	// Load Data
	    var map = function(doc, emit){
	      if(doc.datatype === model.ClassCouncil.datatype._id){
	      	if(model.parse(doc, model.ClassCouncil.datatype).classId === classId){
	      		emit(doc._id, {_id:doc.datatype, data:doc});
	      	}
	      } 
	    };
	    Data2.query(map, {include_docs : true}).then(function(success){
	    	angular.forEach(success.rows, function(data, rowIndex){
	            var spec = data.doc;
	            var obj = model.parse(data.value.data, spec);
	            var classcouncil = modelTransformer.transform(obj, model.ClassCouncil);
	            classcouncils[classcouncil._id] = classcouncil;
	        });
	        console.log("ClassCouncils Query: succeeded", classcouncils);
	        deferred.resolve(classcouncils);
	    }).catch(function(error){
	        deferred.reject("ClassCouncils Query: failed", error);
	    });

	    return deferred.promise;
    };

    return self;

  });
