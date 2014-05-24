'use strict';

angular.module('SchoolMan')
  .service('Marksheets', function Marksheets($q, model, modelTransformer, Students, Data2, Slug) {
   
    var self = {};

    self.getID = model.Marksheet.getId; 

    self.getSequences = function(termIndex){
        var sequences = [];
        if(termIndex === 3){
          sequences = [0,1,2,3,4,5];
        } else {
          var i = (termIndex + 1) * 2;
          sequences = [i-2, i-1];
        }
        return sequences;
      };

    self.listify = function(table){
      var list = Object.keys(table).map(function(studentId){
        var row = angular.copy(table[studentId]);
        angular.forEach(row, function(mark, i){
          row[i] = parseFloat(mark);
        });

        return [studentId].concat(row);
      });
      return list;
    };

    self.ave = function(list, sequences){
        var newList = list.map(function(row){
          var newRow = [row[0],0];
          var total = 0;
          var count = 0;
          angular.forEach(sequences, function(i, sIndex){
            var n = parseFloat(row[i + 1]);
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

    self.dict = function(listWithKeysAtHead){
        var d = {};
        angular.forEach(listWithKeysAtHead, function(row, i){
          d[row[0]] = row.slice(1);
        });
        return d;
      }

    self.rank = function(marksheet){
      
      var list = self.listify(marksheet);

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

      var merge = function(dicts){
        var d = {}
        angular.forEach(dicts, function(dict, i){
          angular.forEach(dict, function(value, key){
            if(!d.hasOwnProperty(key)){
              d[key] = [];
            }
            d[key][i] = value[0];
          });
        });
        return d;
      };

      var ave = self.ave;
      var dict = self.dict;
      var listify = self.listify;

      var t1 = dict(number(sort(ave(listify(marksheet.table), [0,1]))));
      var t2 = dict(number(sort(ave(listify(marksheet.table), [2,3]))));
      var t3 = dict(number(sort(ave(listify(marksheet.table), [4,5]))));
      var t4 = dict(number(sort(ave(listify(marksheet.table), [0,1,2,3,4,5])))); 

      var rankings = merge([t1,t2,t3,t4]);
      return rankings;
    }

    self.combine = function(marksheets){

      // Create new Marksheet
      var head = marksheets[0];
      var tail = marksheets.slice(1);
      var newMarksheet = new model.Marksheet();
          newMarksheet.coeff = head.coeff;
          newMarksheet.table = angular.copy(head.table);



      // Reduce marksheets into the new marksheet
      return _.reduce(tail, function(prevM, nextM){
       
        var t1 = angular.copy(prevM.table);
        var t2 = nextM.table;

        var ignore = ["", null, undefined];


        angular.forEach(t2, function(row, studentId){
          if(!t1.hasOwnProperty(studentId)){
            t1[studentId] = row;
          } else {
            angular.forEach(row, function(y, i){
              var x = t1[studentId][i];
              if(ignore.indexOf(x) > -1){
                t1[studentId][i] = y;
              } else if(!ignore.indexOf(y) > -1){
                var xc = x * prevM.coeff;
                var yc = y * nextM.coeff;
                var nc = prevM.coeff + nextM.coeff;

                var sum = (xc + yc) / nc;
                t1[studentId][i] = sum;

                // console.log("Adding rows:", x, y);
                // console.log("Mult x * coeff", x, prevM.coeff, xc);
                // console.log("Mult y * coeff", y, nextM.coeff, yc);
                // console.log("new coeff", nc);
                // console.log("Sum: ", sum);
                // console.log("---------------");

              }
            });
          }
        });

        newMarksheet.table = t1; 
        newMarksheet.coeff = prevM.coeff + nextM.coeff;

        return newMarksheet;

      }, newMarksheet);
    }

    self.summarize = function(marksheet, termIndex){
      var list = self.listify(marksheet.table);
      var ave  = self.ave(list, self.getSequences(termIndex));
      return self.dict(ave);
    };

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
        console.log("Received Data", data);
        var spec = model.parse(data, model.Marksheet.datatype);
        console.log("Parse check", data, spec);
        var marksheet = bundle.marksheet = new model.Marksheet(spec); 
        console.log("Got marksheetData", marksheet);
        var copy = angular.copy(marksheet);

        var searchParams = {
          formIndex:marksheet.formIndex,
          deptId:marksheet.deptId,
          groupId:marksheet.groupId
        }
        Students.query(searchParams).then(function(students){

          // Lookup students already in marksheet
          var existingStudents = _.map(Object.keys(marksheet.table), function(sId){
            return sId;
          });
          // Get a list of studentIds from all students in the same 
          // form/dept/group as the marksheet
          var allStudents = _.map(students, function(student){
            return student._id;
          });

          console.log("Students: ", allStudents, existingStudents);

          // get the list of any new students
          var newStudents = _.difference(allStudents, existingStudents);

          // add new students returned from the above query
          angular.forEach(newStudents, function(studentId, studentIndex){
            marksheet.table[studentId] = ["","","","","",""];
          });

          // prepare to return the student data along with the marksheet
          bundle.students = students;

          // If we made changes to the marksheet, by adding students, save it
          if(!angular.equals(marksheet, copy)){
            console.log("What is the status", marksheet, copy);

            marksheet.save().then(function(success){
              console.log("Apparent success", success)
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
	        console.log("Query: success", success, collection);
	        deferred.resolve(collection);
	    }).catch(function(error){
	        deferred.reject("Query: failed", error);
	    });

    	return deferred.promise;
    };

    return self;

  });
