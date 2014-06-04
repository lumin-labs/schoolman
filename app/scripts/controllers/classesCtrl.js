'use strict';

angular.module('SchoolMan')
  .controller('ClassesCtrl', function ($scope, CourseCatalog) {
    
    $scope.forms = CourseCatalog.getForms();
    $scope.groups = CourseCatalog.getGroups();
    
    $scope.remove = function(group){
    	CourseCatalog.removeGroup(group);
    	CourseCatalog.save();
    };

    $scope.allStudents = {};
    Students.getAll().then(function(students){
        angular.forEach($scope.groups, function(group, groupId){
          $scope.allStudents[groupId] = [];
        });
        angular.forEach(students, function(student, studentId){
          $scope.allStudents[student.groupId].push(student);
        });
      console.log("Got all students: ", $scope.allStudents);
    }).catch(function(error){
      console.log("Failed to get all students, ", error);
    });

  });
