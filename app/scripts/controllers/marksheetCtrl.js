'use strict';

angular.module('SchoolMan')
  .controller('MarksheetCtrl', function ($scope, $routeParams, CourseCatalog, ClassMaster, Registrar) {
    
    $scope.terms = CourseCatalog.getTerms();
    $scope.courseId = CourseCatalog.getCourseId($routeParams);
    $scope.students = Registrar.getStudentsByCourse($scope.courseId);
    $scope.marksheet= ClassMaster.getMarksheet($scope.courseId);


  });
