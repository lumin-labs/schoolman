'use strict';

function Staffs($q, model, modelTransformer, pouchdb) {

  	var db = model.Staff.db;
    if(typeof db === "string"){
      db = pouchdb.create(model.Staff.db);
    }

  	var _staffs = {};

  	self = {};

  	var dataModel = model.Staff;
  	
  	console.log("Staffs data model", dataModel.datatype);

  	self.set = function(staff){
  		_staffs[staff._id] = staff;
  	};

  	// self.getBatch = function(studentIds){

  	// 	var deferred = $q.defer();

  	// 	db.get(dataModel.datatype._id).then(function(spec){
  	// 		db.allDocs({keys:studentIds, include_docs: true})
	  // 			.then(function(docs){
	  // 				var students = _.map(docs.rows, function(data){
	  //           var obj = model.parse(data.doc, spec);
	  //           var item = modelTransformer.transform(obj, dataModel);
	  // 					return item
	  // 				});
		 //        deferred.resolve(students);
		 //    }).catch(function(error){
		 //        deferred.reject(error);
		 //    });
  	// 	}).catch(function(error){
  	// 		deferred.reject(error);
  	// 	})
  		
  	// 	return deferred.promise;
  	// }

    self.getBatch = function(staffIds){

      var deferred = $q.defer();

      var staffs = [];
      angular.forEach(staffIds, function(id, index){
        if(_staffs[id]){
          staffs.push(_staffs[id]);
        }
      });

      deferred.resolve(staffs);
      
      return deferred.promise;
    }

  	self.saveBatch = function(staffs){
  		var deferred = $q.defer();
  		var batch = {docs:_.map(staffs, function(staff){
  			staff.normalize();
  			return staff.saveable();
  		})};
  		console.log("Saving batch: ", batch);
  		db.bulkDocs(batch).then(function(success){
  			console.log("Staffs service saved batch", success);
  			deferred.resolve(success);
  			_staffs = _.reduce(staffs, function(_staffs, staff){
  				_staffs[staff._id] = staff;
  				return _staffs;
  			}, _staffs)
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
      params = params || {};

    	var deferred = $q.defer();
    	var staffs = _.map(Object.keys(_staffs), function(staffId){
    		return _staffs[staffId];
    	});
      var filtered = [];

      if(Object.keys(params).length > 0){
      	filtered = _.filter(staffs, function(staff){
      		var isOk = true;
      		angular.forEach(params, function(param, key){
      			if(staff[key] !== String(param)){
      				isOk = false;
      			}
      		});
      		return isOk;
      	})
      } else {
        filtered = staffs;
      };
     //  console.log("Filtering students", params, _students);
    	// console.log("Filtered students", params, filtered);
    	deferred.resolve(filtered);
    	return deferred.promise;
    };


    self.get = function(staffId){
      var deferred = $q.defer();
      if(_staffs.hasOwnProperty(saffId)){
        deferred.resolve(_staffs[staffId]);
      }else{
        deferred.reject("Staff does not exist");
      }
      return deferred.promise;
    };

    self.load = function(){
    	var deferred = $q.defer();

    	db.allDocs({starKey:'staff_', endKey:'staff__'})

    	.then(function(collection){
        var keys = _.map(collection.rows, function(obj){
          return obj.key;
        });
        console.log("Got keys", keys);
        deferred.resolve(_staffs);
        return keys
      })

      .then(function(keys){

        angular.forEach(keys, function(key, index){
          db.get(key).then(function(data){
            var staff = model.parse(data, dataModel.datatype);
            staff = new model.Staff(staff);
            _staffs[staff._id] = staff;
          }).catch(function(error){
            console.log("Failed to get staff", error);
          });
        });

        deferred.resolve(_staffs);

      })

      .catch(function(error){
    		deferred.reject(error);
    	});

    	return deferred.promise;

    };
    self.getClasses = function(formIndex, flags){
      var collection = {};
      angular.forEach(_staffs, function(staff, staffId){
        if(staff.formIndex === formIndex){
          var id = [formIndex, staff.deptId, staff.groupId];
          if(!collection.hasOwnProperty(id)){
            collection[id] = {formIndex:formIndex, deptId:staff.deptId, groupId:staff.groupId};
          }
        }
      });
      return collection;
    }

    self.destroy = function(){
    	db.destroy().then(function(success){
    		console.log("Destroyed staffs db");
    	}).catch(function(error){
    		console.log("failed to destroy staffs db", error)
    	});
    }


    self.getAll = self.query;

    return self;
  }
  Staffs.$inject = ['$q', 'model', 'modelTransformer', 'pouchdb'];
  angular.module('SchoolMan').service('Staffs', Staffs);
