'use strict';

angular.module('SchoolMan')
  .controller('ClassmenuCtrl', function ($scope, $routeParams, Departments, Groups, CourseCatalog, Location) {
    
    $scope.page = $routeParams.page;
    
    $scope.forms = CourseCatalog.getForms();
    $scope.form  = $scope.forms[$routeParams.formIndex];

    $scope.departments = Departments.getAll();
    $scope.department = $scope.departments[$routeParams.deptKey];

    $scope.groups = Groups.getAll();
    $scope.group  = $scope.groups[$routeParams.groupKey];

    $scope.subjects = CourseCatalog.getSubjects($routeParams.formIndex);
    $scope.subject  = $scope.subjects[$routeParams.subjectKey];

    $scope.terms = CourseCatalog.getTerms();
    $scope.term  = $scope.terms[$routeParams.termIndex];

    $scope.open = Location.open;


  });
