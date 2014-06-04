'use strict';

angular.module('SchoolMan')
  .service('Students', function Students($q, Data2, model, modelTransformer) {

  	self = {};
  	var dataModel = model.Student;

  	self.getBatch = function(studentIds){

  		var deferred = $q.defer();

  		Data2.get(dataModel.datatype._id).then(function(spec){
  			Data2.allDocs({keys:studentIds, include_docs: true})
	  			.then(function(docs){
	  				var students = _.map(docs.rows, function(data){
	            var obj = model.parse(data.doc, spec);
	            var item = modelTransformer.transform(obj, dataModel);
	  					return item
	  				});
		        deferred.resolve(students);
		    }).catch(function(error){
		        deferred.reject(error);
		    });
  		}).catch(function(error){
  			deferred.reject(error);
  		})
  		
  		return deferred.promise;
  	}

  	self.query = function(params){
    	
    	var deferred = $q.defer();

	    var map = function(doc, emit){
	      if(doc.datatype === dataModel.datatype._id){
	      	var obj = model.parse(doc, dataModel.datatype);
	      	var isok= true;
	      	angular.forEach(params, function(param, paramKey){
	      		isok = obj[paramKey] === param ? isok : false;
	      	});
	      	if(isok){
	      		emit(doc._id, {_id:doc.datatype, data:doc});
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
	        deferred.resolve(collection);
	    }).catch(function(error){
	        deferred.reject("Query: failed", error);
	    });

    	return deferred.promise;
    };

    self.getAll = self.query;

    return self;
  });
