'use strict';

angular.module('SchoolMan')
  .service('profile', function profile($q, $rootScope, model, Data2, modelTransformer) {

    var self = {};

    self.getComments = function(studentId){

    	var deferred = $q.defer();

    	var map = function(doc, emit){
	      if(doc.type === model.Comment.datatype._id){
	      	if(model.Comment.parse(doc).studentId === studentId){
	      		emit(doc._id, doc);
	      	}
	      } 
	    };

	    Data2.query({map:map}).then(function(success){
	      var comments = [];
	      angular.forEach(success.rows, function(data, rowIndex){
	      	var obj = model.Comment.parse(data.value);
	      	var comment = modelTransformer.transform(obj, model.Comment);
	      	comments.push(comment);
	      });

	      deferred.resolve(comments);
	      
	    }).catch(function(error){
	    	$rootScope.$apply(function(){
	      	deferred.reject("No comments were found.");
	      });
	    });

	    return deferred.promise;
    };

    return self;

  });
