'use strict';

angular.module('SchoolMan')
  .controller('DepartmentsCtrl', function ($scope, $log, Registrar, model, Students, Departments, CourseCatalog) {

    $scope.forms = CourseCatalog.getForms();

    $scope.departments = Departments.getAll();
    console.log($scope.departments);

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

 		$scope.allStudents = {};
    Students.getAll().then(function(students){
        angular.forEach($scope.departments, function(dept, deptId){
          $scope.allStudents[deptId] = [];
        });
        angular.forEach(students, function(student, studentId){
          $scope.allStudents[student.deptId].push(student);
        });
      console.log("Got all students: ", $scope.allStudents);
    }).catch(function(error){
      console.log("Failed to get all students, ", error);
    });

  });
