'use strict';

angular.module('SchoolMan')
  .controller('StudentsCtrl', function ($scope, $routeParams, Registrar, CourseCatalog, ClassMaster, Student, Uid, Data) {

  	$scope.courseId = CourseCatalog.getCourseId($routeParams);

    $scope.students = Registrar.getStudentsByCourse($scope.courseId);

    var form = $routeParams.formIndex;
    var group= $routeParams.groupIndex;

    $scope.newStudent = new Student({
    	form:form,
    	group:group,
    	id: ""
    });

    Data.get("uid", function(uid){
    	$scope.newStudent.id = Uid.next(uid);
    });

    
    // This is a mess
    $scope.addStudent = function(){
    	
        var student = $scope.newStudent;
    	
        
        var marksheets = ClassMaster.getMarksheets(CourseCatalog.getCourseIds(form, group));
        angular.forEach(marksheets, function(marksheet, $index){
            ClassMaster.addStudent(marksheet,student.id);
        });
        Registrar.addStudent(student, marksheets);

    	$scope.newStudent = new Student({
	    	form:form,
	    	group:group,
	    	id: Uid.next(student.id)
    	});
    	Registrar.save(function(msg){
    		$scope.students = Registrar.getStudentsByCourse($scope.courseId);
    		$scope.$digest();
    		Uid.save(student.id);
    	});
    	
    };

  });
