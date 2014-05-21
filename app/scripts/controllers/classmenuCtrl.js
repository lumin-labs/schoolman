'use strict';

angular.module('SchoolMan')
  .controller('ClassmenuCtrl', function ($scope, $routeParams, Departments, Groups, CourseCatalog, Location) {
    
    var r = $scope.route = {};

    r.page = $scope.page = $routeParams.page;
    
    r.forms = $scope.forms = CourseCatalog.getForms();
    r.form = $scope.form  = $scope.forms[$routeParams.formIndex];

    r.departments = $scope.departments = Departments.getAll();
    r.department = $scope.department = $scope.departments[$routeParams.deptId];

    r.groups = $scope.groups = Groups.getAll();
    r.group = $scope.group  = $scope.groups[$routeParams.groupId];

    r.subjects = $scope.subjects = CourseCatalog.getAllSubjects();
    r.subject = $scope.subject  = $scope.subjects[$routeParams.subjectId];

    r.terms = $scope.terms = CourseCatalog.getTerms();
    r.term = $scope.term  = $scope.terms[$routeParams.termIndex];

    $scope.open = Location.open;


  });
