'use strict';

function MarksheetCtrl($scope, $routeParams, Data2, model, Location, Marksheets, ClassMaster, SchoolInfos) {
    
    var marksheetId = model.Marksheet.generateID($routeParams);

    
    $scope.classMaster = ClassMaster;
    $scope.marksheets = Marksheets;
    $scope.open = Location.open;
    
    $scope.data = {
        marksheet:{},
        students:[],
        rankings:{}
    };
    
    SchoolInfos.get("schoolinfo").then(function(info){
        $scope.data.schoolInfo = info;
        //console.log("school info retrieved", $scope.data.schoolInfo);
    }).catch(function(error){
        console.log("failed to get school info", error);
    });

    var marksheetCopy = {};

    Marksheets.get(marksheetId).then(function(bundle){
        $scope.data.marksheet = bundle.marksheet;
        $scope.data.students = bundle.students;
        $scope.data.rankings = Marksheets.rank([$scope.data.marksheet]);
    }).catch(function(error){
        console.log("Failed to get marksheet: ", error);
    }); 

    var hasChanged = false;


    $scope.noteChange = function(){
    	hasChanged = true;
    }

    $scope.save = function(studentId, cellIndex){
        if(hasChanged){
            
            if(studentId){
                var value = $scope.data.marksheet['table'][studentId][cellIndex];
                // console.log("number?", isNaN(Number(value)));
                if(value > 20 || value < 0 || isNaN(Number(value))){
                    $scope.data.marksheet['table'][studentId][cellIndex] = "";
                }
            }
            // console.log("Saving: ", $scope.data.marksheet);
            $scope.data.marksheet.save().then(function(success){
    			hasChanged = false;
    			$scope.data.rankings = Marksheets.rank([$scope.data.marksheet]);    			
    		}).catch(function(error){
    			console.log("Save error: ", error);
    		});
    	} else {
    	}
    };

  }
  MarksheetCtrl.$inject = ['$scope', '$routeParams', 'Data2', 'model', 'Location', 'Marksheets', 'ClassMaster', 'SchoolInfos'];
  angular.module('SchoolMan').controller('MarksheetCtrl', MarksheetCtrl);

