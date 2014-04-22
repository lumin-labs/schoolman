'use strict';

angular.module('SchoolMan')
  .controller('MyclassesCtrl', function ($scope, $routeParams, Location, Registrar, CourseCatalog, TimeTable) {

  	// TimeTable returns courseRefs, CourseCatalog returns actual courses
    $scope.courses = CourseCatalog.getCoursesByRef(
      TimeTable.getCourseRefs($routeParams.username)
    );


    $scope.open = Location.open;
    $scope.getStudentsByCourse = Registrar.getStudentsByCourse;
  });
