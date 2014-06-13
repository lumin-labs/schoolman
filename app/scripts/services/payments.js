'use strict';

angular.module('SchoolMan')
  .service('Payments', function Payments($q, Data2, model, modelTransformer, Fees, Students) {


  	self = {};

  	self.getAll = function(){
  		var deferred = $q.defer();

  		var map = function(doc, emit){
  			var dataModel = model.Payment;
	      if(doc.datatype === dataModel.datatype._id){
	      	var obj = model.parse(doc, dataModel.datatype);
	      	emit(doc._id, {_id:obj.studentId, data:doc});
	      } 
	    };

  		Data2.query(map, {include_docs : true}).then(function(success){
  			  var collection = {};
  			  var dataModelStudent = model.Student;
  			  var dataModelPayment = model.Payment;
          console.log("Payments Success: ", success);
  			  angular.forEach(success.rows, function(data, $index){
  			  	
  			  	var studentId = data.value._id;
  			  	if(!collection.hasOwnProperty(studentId)){
  			  		var student = Students.get(studentId);
                  student.payments = [];
  			  		collection[studentId] = student;
  			  	};
  			  	var payment = model.parse(data.value.data, dataModelPayment.datatype);
  			  	collection[studentId].payments.push(payment);
  			  });
	        deferred.resolve(collection);
	    }).catch(function(error){
	        deferred.reject("Query: failed", error);
	    });
  		
  		return deferred.promise;

  	};

  	self.query = function(params){
    	
    	var deferred = $q.defer();

    	// Load Data
    	var dataModel = model.Payment;

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
	            console.logt("data value 2", data);
	            var spec = data.doc;
	            var obj = model.parse(data.value.data, spec);
	            var item = modelTransformer.transform(obj, dataModel);
	            collection.push(item);
	        });
	        // console.log("Query: success", success, collection);
	        deferred.resolve(collection);
	    }).catch(function(error){
	        deferred.reject("Query: failed", error);
	    });

    	return deferred.promise;
    };

    return self;
  });
