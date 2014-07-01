'use strict';

angular.module('SchoolMan')
  .controller('MarksheetCtrl', function ($scope, $routeParams, Data2, model, Location, Marksheets, ClassMaster) {
    
    var marksheetId = model.Marksheet.generateID($routeParams);
    
    $scope.classMaster = ClassMaster;
    $scope.marksheets = Marksheets;
    $scope.open = Location.open;
    
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

    $scope.save = function(studentId, cellIndex){
        if(hasChanged){

            if($scope.data.marksheet['table'][studentId][cellIndex] > 20 || $scope.data.marksheet['table'][studentId][cellIndex] < 0){
                $scope.data.marksheet['table'][studentId][cellIndex] = "";
            }
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

