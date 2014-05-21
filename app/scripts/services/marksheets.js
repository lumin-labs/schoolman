'use strict';

angular.module('SchoolMan')
  .service('Marksheets', function Marksheets($q, model, modelTransformer, Students, Data2, Slug) {
   
    var self = {};

    self.getID = model.Marksheet.getId; 

    self.rank = function(marksheet){
      
      var list = Object.keys(marksheet.table).map(function(studentId){
        var row = angular.copy(marksheet.table[studentId]);
        angular.forEach(row, function(mark, i){
          row[i] = parseFloat(mark);
        });
        row[6] = studentId;
        return row;
      });


      var ave = function(sequences){
        var newList = list.map(function(row){
          var newRow = [row[6],0];
          var total = 0;
          var count = 0;
          angular.forEach(sequences, function(i, sIndex){
            var n = parseFloat(row[i]);
            if(typeof n === "number"){
              total += n;
              count += 1;
            }
          });
          newRow[1] = total / count;
          return newRow;
        }); 



        return newList;
      }

      var sort = function(aveList){
        var sortList = angular.copy(aveList); 

        sortList.sort(function(a,b){
          return parseFloat(b[1]) - parseFloat(a[1]);
        });

        return sortList;
      };

      var number = function(sortedRows){
        var rows = [];
        angular.forEach(sortedRows, function(row, i){
          rows[i]    = [row[0]];
          if(i === 0){
            rows[i][1] = 1;
          } else {
            rows[i][1] = row[1] === rows[i - 1][1] ? rows[i - 1][1] : i + 1;  
          }
        });
        return rows;
      };

      var dict = function(listWithKeysAtHead){
        var d = {};
        angular.forEach(listWithKeysAtHead, function(row, i){
          d[row[0]] = row[1];
        });
        return d;
      }

      var merge = function(dicts){
        var d = {}
        angular.forEach(dicts, function(dict, i){
          angular.forEach(dict, function(value, key){
            if(!d.hasOwnProperty(key)){
              d[key] = [];
            }
            d[key][i] = value;
          });
        });
        return d;
      };

      var t1 = dict(number(sort(ave([0,1]))));
      var t2 = dict(number(sort(ave([2,3]))));
      var t3 = dict(number(sort(ave([4,5]))));
      var t4 = dict(number(sort(ave([0,1,2,3,4,5])))); 

      var rankings = merge([t1,t2,t3,t4]);
      return rankings;

    }

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

    self.get = function(marksheetId){

      var deferred = $q.defer();
      var bundle = {};

      Data2.get(marksheetId).then(function(data){
        var marksheetData = model.parse(data, model.Marksheet.datatype);
        var marksheet = bundle.marksheet = modelTransformer.transform(marksheetData, model.Marksheet); 
        var copy = angular.copy(marksheet);
        
        var searchParams = {
          formIndex:marksheet.formIndex,
          deptId:marksheet.deptId,
          groupId:marksheet.groupId
        }
        Students.query(searchParams).then(function(students){
          angular.forEach(students, function(student, studentIndex){
            if(!marksheet.table.hasOwnProperty(student._id)){
              marksheet.table[student._id] = ["","","","","",""];
            }
          });
          bundle.students = students;
          if(!angular.equals(marksheet, copy)){
            Data2.put(marksheet).then(function(success){
              deferred.resolve(bundle);
            }).catch(function(error){
              console.log("There was a problem adding new students to the marksheet", error);     
            });
          } else {
              deferred.resolve(bundle);
          }
        });
        
      });

      return deferred.promise;
    };

    self.query = function(params){
    	
    	var deferred = $q.defer();

    	// Load Data
    	var dataModel = model.Marksheet;

	    var map = function(doc, emit){
	      if(doc.type === dataModel.datatype._id){
	      	var obj = model.parse(doc, dataModel.datatype);
	      	var isok= true;
	      	angular.forEach(params, function(param, paramKey){
	      		isok = obj[paramKey] === param ? isok : false;
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
