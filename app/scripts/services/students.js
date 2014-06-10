'use strict';

angular.module('SchoolMan')
  .service('Students', function Students($q, Data2, model, modelTransformer) {

  	self = {};
  	var dataModel = model.Student;
  	console.log("Students data model", dataModel.datatype);

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

  	self.saveBatch = function(students){
  		var deferred = $q.defer();
  		var batch = {docs:_.map(students, function(student){
  			return student.saveable();
  		})};
  		console.log("Saving batch: ", batch);
  		Data2.bulkDocs(batch).then(function(success){
  			deferred.resolve(success);
  		}).catch(function(error){
  			deferred.reject(error);
  		});
  		return deferred.promise;
  	};

  	self.query = function(params){
    	
    	var deferred = $q.defer();

    	var paramDict = {};
    	angular.forEach(dataModel.datatype.fields, function(field, index){
    		if(params.hasOwnProperty(field.key)){
    			return paramDict[index] = params[field.key];
    		}
    	});

    	console.log("Students Param Dict", paramDict);

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
	    // var map = function(doc, emit){
	    //   if(doc.datatype === dataModel.datatype._id){
	    //   	var isok= true;
	    //   	angular.forEach(paramDict, function(value, index){
	    //   		isok = doc[0][index] === value ? isok : false;
	    //   	});
	    //   	if(isok){
	    //   		emit(doc._id, {_id:doc.datatype, data:doc});
	    //   	}
	    //   } 
	    // };
	    // var map = function(doc, emit){
	    //   if(doc.datatype === dataModel.datatype._id){
	    //   	var obj = model.parse(doc, dataModel.datatype);
	    //   	var testObj = _.reduce(Object.keys(params), function(testObj, key){
	    //   		testObj[key] = obj[key];
	    //   		return testObj;
	    //   	}, {});
	    //   	if(angular.equals(params, testObj)){
	    //   		emit(doc._id, {_id:doc.datatype, data:doc});
	    //   	}
	    //   } 
	    // };


	    var getSeconds = function(_initial, _final){
        return (_final.getTime() - _initial.getTime())/1000;
      }

      var START_QUERY = new Date();
	    Data2.query(map, {include_docs : true}).then(function(success){
	    var END_QUERY = new Date();
      console.log("Studetns Service TIME DIFF: ", getSeconds(START_QUERY, END_QUERY));

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
