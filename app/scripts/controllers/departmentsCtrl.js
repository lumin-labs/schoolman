'use strict';

angular.module('SchoolMan')
  .controller('DepartmentsCtrl', function ($scope, $log, Registrar, model, Departments, CourseCatalog) {

    $scope.forms = CourseCatalog.getForms();

    $scope.departments = Departments.getAll();

    $scope.newDepartment = new model.Department();

 		$scope.add = function(department){
 			department.save().then(function(success){
                console.log("Department saved", success);
                $scope.departments[success.id] = department;
                $scope.newDepartment = new model.Department();
            }).catch(function(error){
                console.log("Department save error ", error);
            });
 		};

 		$scope.remove = function(department){
 			Departments.remove(department);
 		};

 		var allStudents = Registrar.getAllStudents();
    $scope.getStudentsByDept = function(deptKey){
            return allStudents.filter(function(student){
          return student.department === deptKey;
        });
    };

  });
