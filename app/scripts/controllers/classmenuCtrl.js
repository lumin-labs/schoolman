'use strict';

angular.module('SchoolMan')
  .controller('ClassmenuCtrl', function ($scope, $routeParams, CourseCatalog, Location) {
    
    $scope.page = $routeParams.page;
    
    $scope.forms = CourseCatalog.getForms();
    $scope.form  = $scope.forms[$routeParams.formIndex];

    $scope.groups = CourseCatalog.getGroups();
    $scope.group  = $scope.groups[$routeParams.groupIndex];

    $scope.subjects = CourseCatalog.getSubjects($routeParams.formIndex);
    $scope.subject  = $scope.subjects[$routeParams.subjectKey];

    $scope.terms = CourseCatalog.getTerms();
    $scope.term  = $scope.terms[$routeParams.termIndex];

    $scope.open = Location.open;


  });
