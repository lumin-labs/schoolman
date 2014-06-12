'use strict';

angular.module('SchoolMan')
  .service('Students', function Students($q, model, modelTransformer) {

  	var db = new PouchDB("db_students");

  	window._sdb = db;

  	var _students = {};

  	self = {};

  	var dataModel = model.Student;
  	
  	console.log("Students data model", dataModel.datatype);

  	self.set = function(student){
  		_students[student._id] = student;
  	};

  	self.getBatch = function(studentIds){

  		var deferred = $q.defer();

  		db.get(dataModel.datatype._id).then(function(spec){
  			db.allDocs({keys:studentIds, include_docs: true})
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
  			student.normalize();
  			return student.saveable();
  		})};
  		console.log("Saving batch: ", batch);
  		db.bulkDocs(batch).then(function(success){
  			console.log("Students service saved batch", success);
  			deferred.resolve(success);
  			_students = _.reduce(students, function(_students, student){
  				_students[student._id] = student;
  				return _students;
  			}, _students)
  		}).catch(function(error){
  			deferred.reject(error);
  		});
  		return deferred.promise;
  	};


  // 	var studentsIndex = {
		//   _id: '_design/students',
		//   views: {
		//     'students': {
		//       map : function(doc, emit){
		// 	      if(doc.datatype === dataModel.datatype._id){
		// 	      	var obj = model.parse(doc, dataModel.datatype);
		// 	      	var isok= true;
		// 	      	angular.forEach(params, function(param, paramKey){
		// 	      		isok = obj[paramKey] === param ? isok : false;
		// 	      	});
		// 	      	if(isok){
		// 	      		emit(doc._id, {_id:doc.datatype, data:doc});
		// 	      	}
		// 	      } 
		// 	    }.toString()
		//     }
		//   }
		// };

		// console.log("View: ", studentsIndex); 

		// db.put(studentsIndex).then(function () {
		//   // kick off an initial build, return immediately
		//   return db.query('studentsIndex', {stale: 'update_after'});
		// });

  	// self.query = function(params){
    	
   //  	var deferred = $q.defer();

    	// var paramDict = {};
    	// angular.forEach(dataModel.datatype.fields, function(field, index){
    	// 	if(params.hasOwnProperty(field.key)){
    	// 		return paramDict[index] = params[field.key];
    	// 	}
    	// });

    	// console.log("Students Param Dict", paramDict);

	   //  var map = function(doc, emit){
	   //    if(doc.datatype === dataModel.datatype._id){
	   //    	var obj = model.parse(doc, dataModel.datatype);
	   //    	var isok= true;
	   //    	angular.forEach(params, function(param, paramKey){
	   //    		isok = obj[paramKey] === param ? isok : false;
	   //    	});
	   //    	if(isok){
	   //    		emit(doc._id, {_id:doc.datatype, data:doc});
	   //    	}
	   //    } 
	   //  };

	   //  var getSeconds = function(_initial, _final){
    //     return (_final.getTime() - _initial.getTime())/1000;
    //   }

    //   var START_QUERY = new Date();

	   //  db.query(studentsIndex, {include_docs : true}).then(function(success){
	    
	   //  var END_QUERY = new Date();
      
    //   console.log("Studetns Service TIME DIFF: ", getSeconds(START_QUERY, END_QUERY));

	   //  		var collection = [];
	   //      angular.forEach(success.rows, function(data, rowIndex){
	   //          var spec = data.doc;
	   //          var obj = model.parse(data.value.data, spec);
	   //          var item = modelTransformer.transform(obj, dataModel);
	   //          collection.push(item);
	   //      });
	   //      deferred.resolve(collection);
	   //  }).catch(function(error){
	   //      deferred.reject(error);
	   //  });

    // 	return deferred.promise;
    // };

    self.query = function(params){
    	var deferred = $q.defer();
    	var students = _.map(Object.keys(_students), function(studentId){
    		return _students[studentId];
    	});
    	var filtered = _.filter(students, function(student){
    		var isOk = true;
    		angular.forEach(params, function(param, key){
    			if(student[key] !== param){
    				isOk = false;
    			}
    		});
    		return isOk;
    	});
    	console.log("Filtered students", params, filtered);
    	deferred.resolve(filtered);
    	return deferred.promise;
    };


    self.load = function(){
    	var deferred = $q.defer();

    	db.allDocs({starKey:'student_', endKey:'student__'})
    	.then(function(collection){
        var keys = _.map(collection.rows, function(obj){
          return obj.key;
        });
        console.log("Got keys", keys);
    		db.allDocs({keys:keys, include_docs:true}).then(function(collection){
          console.log("got students", collection);
      		_students = _.reduce(collection.rows,function(students, obj){
      			var student = model.parse(obj.doc, dataModel.datatype);
      			_students[student._id] = student;
      			return _students;
      		}, _students);
      		console.log("Students Reduced", _students);
      		deferred.resolve(_students);
        }).catch(function(error){
          console.log("Failed to get students by keys", error);
          deferred.reject(error);
        })
        console.log("Students collection", collection);

    	}).catch(function(error){

    		deferred.reject(error);
    	});

    	return deferred.promise;
    };

    self.destroy = function(){
    	db.destroy().then(function(success){
    		console.log("Destroyed students db");
    	}).catch(function(error){
    		console.log("failed to destroy studetns db", error)
    	});
    }


    self.getAll = self.query;

    return self;
  });
