'use strict';

angular.module('SchoolMan')
  .controller('SubjectsCtrl', function ($scope, $log, SubjectTypes, Forms, Subjects, modelTransformer, model) {

  		$scope.forms = Forms.all();
      $scope.allSubjects = Subjects.getAll();
      console.log("Subjects", $scope.allSubjects);
      $scope.numSubjects = Object.keys($scope.allSubjects).length;

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
	    		$scope.newSubject = new model.Subject();
	    	});
	    };

  });
