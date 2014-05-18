'use strict';

angular.module('SchoolMan')
  .service('profile', function profile($q, $rootScope, model, Data2, modelTransformer) {

    var self = {};

    self.getComments = function(studentId){

    	var deferred = $q.defer();

    	// Load Data
	    var map = function(doc, emit){
	      if(doc.type === model.Comment.datatype._id){
	      	if(model.parse(doc, model.Comment.datatype).studentId === studentId){
	      		emit(doc._id, {_id:doc.type, data:doc});
	      	}
	      } 
	    };
	    Data2.query(map, {include_docs : true}).then(function(success){
	    		var comments = [];
	        angular.forEach(success.rows, function(data, rowIndex){
	            var spec = data.doc;
	            var obj = model.parse(data.value.data, spec);
	            var comment = modelTransformer.transform(obj, model.Comment);
	            comments.push(comment);
	        });
	        console.log("Comments Query: succeeded", comments);
	        deferred.resolve(comments);
	    }).catch(function(error){
	        deferred.reject("Comments Query: failed", error);
	    });

	    return deferred.promise;
    };

    return self;

  });
