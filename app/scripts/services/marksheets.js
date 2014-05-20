'use strict';

angular.module('SchoolMan')
  .service('Marksheets', function Marksheets($q, model, modelTransformer, Data2, Slug) {
   
    var self = {};

    self.getID = model.Marksheet.getId; 

    self.create = function(params){
    	var deferred = $q.defer();

    	var marksheet = new model.Marksheet(params);
    	console.log("Marksheet object created: ", marksheet);
    	marksheet.save().then(function(success){
    		console.log("Marksheet saved", success, marksheet);
    		deferred.resolve(marksheet);
    	}).catch(function(error){
    		deferred.reject(error);
    	});

    	return deferred.promise;
    }

    self.createOrUpdate = function(_id, teacherId){
    	var deferred = $q.defer();
  		console.log("Searching by _id", _id);
  		Data2.get(_id).then(function(marksheet){
  			// Update
  			console.log("Found marksheet, updating", marksheet);
  			marksheet.teacherId = teacherId;
  			Data2.put(marksheet).then(function(success){
  				deferred.resolve(marksheet);
  			}).catch(function(error){
  				deferred.resolve(error);
  			})
  		}).catch(function(error){
  			//Create
  			if(error.status === 404){
  				console.log("Marksheet not found, creating", error);
  				self.create({_id:_id, teacherId:teacherId}).then(function(marksheet){
  					deferred.resolve(marksheet);
  				}).catch(function(error){
  					deferred.reject(error);
  				});
  			}
  		})
    	return deferred.promise;
    };

    self.get = function(params){
    	
    	var deferred = $q.defer();

    	// Load Data
    	var dataModel = model.Marksheet;

	    var map = function(doc, emit){
	      if(doc.type === dataModel.datatype._id){
	      	var obj = model.parse(doc, dataModel.datatype);
	      	var isok= true;
	      	angular.forEach(params, function(param, paramKey){
	      		isok = obj[paramKey] === param ? true : false;
	      	});
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
