'use strict';

angular.module('SchoolMan')
  .controller('MarksheetCtrl', function ($scope, $routeParams, model, Location, Marksheets) {
    
    var marksheetId = model.Marksheet.generateID($routeParams);
    
    $scope.data = {
    	marksheet:{},
    	students:[]
    };

    var marksheetCopy = {};

    Marksheets.get(marksheetId).then(function(bundle){
    	$scope.data.marksheet = bundle.marksheet;
    	$scope.data.students = bundle.students;
    }).catch(function(error){
    	console.log("Failed to get marksheet: ", error);
    }); 

    var hasChanged = false;

    $scope.noteChange = function(){
    	hasChanged = true;
    }

    $scope.save = function(){
    	if(hasChanged){
    		$scope.data.marksheet.save().then(function(success){
    			hasChanged = false;
    		}).catch(function(error){
    			console.log("Save error: ", error);
    		});
    	} else {
    	}
    };
  });

