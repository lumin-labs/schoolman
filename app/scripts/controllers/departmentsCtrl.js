'use strict';

angular.module('SchoolMan')
  .controller('DepartmentsCtrl', function ($scope, $log, Department, Departments, CourseCatalog) {

    $scope.forms = CourseCatalog.getForms();

    $scope.departments = Departments.getAll();

    $scope.newDepartment = new Department();

 		$scope.add = function(department){
 			try{
 				Departments.add($scope.newDepartment);
 				Departments.save();
 				$scope.newDepartment = new Department();
 			} catch(e){
 				console.log(e);
 			}
 		};

 		$scope.remove = function(department){
 			Departments.remove(department);
 			Departments.save();
 		};

 		 var allStudents = Registrar.getAllStudents();
	    $scope.getStudentsByGroup = function(deptKey){
	        return allStudents.filter(function(student){
	            return student.department === deptKey;
	        });
	    };

  });
