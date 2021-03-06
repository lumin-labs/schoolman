'use strict';

function SubjectsCtrl($scope, $log, SubjectTypes, Forms, Subjects, modelTransformer, model, SchoolInfos, Marksheets) {

  		$scope.forms = Forms.all();
      	$scope.allSubjects = Subjects.getAll();
      	console.log("Subjects", $scope.allSubjects);
      	$scope.numSubjects = Object.keys($scope.allSubjects).length;
      	$scope.numMarksheets = {};

      	angular.forEach($scope.allSubjects, function(subject, subjectId){
  			$scope.numMarksheets[subjectId] = 0;
  		})

      	Marksheets.query().then(function(marksheets){
      		angular.forEach(marksheets, function(marksheet, marksheetId){
      			$scope.numMarksheets[marksheet.subjectId] += 1
      		})
      	}).catch(function(error){
      		console.log("Failed to get marksheets", error);
      	})

      	SchoolInfos.get("schoolinfo").then(function(info){
      		$scope.version = info.version;
      	}).catch(function(error){
      		console.log("Failed to retrieve school info", error)
      	});

        var subjectsCopy = angular.copy($scope.allSubjects);

       $scope.toggleSubject = function(subjectKey, formIndex){
	      var current = $scope.forms[formIndex].subjects[subjectKey];
	      $scope.forms[formIndex].subjects[subjectKey] = (current + 1) % 2;
	    };

	    $scope.types = model.Subject.types;

	    $scope.newSubject = new model.Subject();
	    $scope.addSubject = function(){
	    	$scope.newSubject.save().then(function(success){
	    		$scope.allSubjects[$scope.newSubject._id] = $scope.newSubject;
	    		$scope.numMarksheets[$scope.newSubject._id] = 0;
	    		$scope.newSubject = new model.Subject();
	    	});
	    };

	    $scope.remove = function(subject){
	    	Subjects.remove(subject).then(function(success){
	    		delete $scope.allSubjects[subject._id];
	    	});
	    };

  }
  SubjectsCtrl.$inject = ['$scope', '$log', 'SubjectTypes', 'Forms', 'Subjects', 'modelTransformer', 'model', 'SchoolInfos', 'Marksheets'];
  angular.module('SchoolMan').controller('SubjectsCtrl', SubjectsCtrl);
