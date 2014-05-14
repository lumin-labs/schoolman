'use strict';

angular.module('SchoolMan')
  .controller('MarksheetCtrl', function ($scope, $routeParams, Location, CourseCatalog, ClassMaster, Registrar) {
    
    $scope.terms = CourseCatalog.getTerms();
    $scope.courseId = CourseCatalog.getCourseId($routeParams);
    console.log("routeParams", $routeParams);
    $scope.students = Registrar.getStudentsByCourse($scope.courseId);
    $scope.marksheet= ClassMaster.getMarksheet($scope.courseId);
    $scope.open = Location.open;

  });
