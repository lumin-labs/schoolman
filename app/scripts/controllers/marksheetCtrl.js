'use strict';

angular.module('SchoolMan')
  .controller('MarksheetCtrl', function ($scope, $routeParams, Data2, model, Location, Marksheets) {
    
    var marksheetId = model.Marksheet.generateID($routeParams);
    
    $scope.data = {
    	marksheet:{},
    	students:[],
    	rankings:{}
    };

    var marksheetCopy = {};

    Marksheets.get(marksheetId).then(function(bundle){
    	$scope.data.marksheet = bundle.marksheet;
    	$scope.data.students = bundle.students;
    	$scope.data.rankings = Marksheets.rank($scope.data.marksheet);
    }).catch(function(error){
    	console.log("Failed to get marksheet: ", error);
    }); 

    var hasChanged = false;

    $scope.noteChange = function(){
    	hasChanged = true;
    }

    $scope.save = function(){
    	if(hasChanged){
            console.log("Saving: ", $scope.data.marksheet);
            $scope.data.marksheet.save().then(function(success){
    			hasChanged = false;
    			$scope.data.rankings = Marksheets.rank($scope.data.marksheet);    			
    		}).catch(function(error){
    			console.log("Save error: ", error);
    		});
    	} else {
    	}
    };
  });

