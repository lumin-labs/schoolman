'use strict';

angular.module('SchoolMan')
  .controller('SubjectsCtrl', function ($scope, $log, SubjectTypes, CourseCatalog, modelTransformer, Subject) {

  		$scope.forms = CourseCatalog.getForms();
        $scope.allSubjects = CourseCatalog.getAllSubjects();
        $scope.numSubjects = Object.keys($scope.allSubjects).length;

        var subjectsCopy = angular.copy($scope.allSubjects);

        $scope.toggleSubject = function(subjectKey, formIndex){
	      var current = $scope.forms[formIndex].subjects[subjectKey];
	      $scope.forms[formIndex].subjects[subjectKey] = (current + 1) % 2;
	      CourseCatalog.save();
	    };

	    $scope.types = SubjectTypes.all();

	    $scope.newSubject = new Subject();
	    $scope.addSubject = function(){
	    		CourseCatalog.post($scope.newSubject);
	    		$scope.newSubject = new Subject();
	    };

	    $scope.removeSubject = CourseCatalog.removeSubject;

	    $scope.save = function(subject){
	    	if(!angular.equals(subject,subjectsCopy[subject.code])){
	    		CourseCatalog.save();
	    		$log.info("Saving subject change to Data");
	    	}

	    }


  });
