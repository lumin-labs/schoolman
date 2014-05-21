'use strict';

angular.module('SchoolMan')
  .controller('ClassmenuCtrl', function ($scope, $routeParams, Departments, Groups, CourseCatalog, Location) {
    
    $scope.page = $routeParams.page;
    
    $scope.forms = CourseCatalog.getForms();
    $scope.form  = $scope.forms[$routeParams.formIndex];

    $scope.departments = Departments.getAll();
    $scope.department = $scope.departments[$routeParams.deptId];

    $scope.groups = Groups.getAll();
    $scope.group  = $scope.groups[$routeParams.groupId];

    $scope.subjects = CourseCatalog.getSubjects($routeParams.formIndex);
    $scope.subject  = $scope.subjects[$routeParams.subjectId];

    $scope.terms = CourseCatalog.getTerms();
    $scope.term  = $scope.terms[$routeParams.termIndex];

    $scope.open = Location.open;


  });
