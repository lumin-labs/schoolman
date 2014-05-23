'use strict';

angular.module('SchoolMan')
  .controller('ClassmenuCtrl', function ($scope, $routeParams, Departments, Subjects, Groups, Forms, CourseCatalog, Location) {
    
    var r = $scope.route = {};

    r.page = $scope.page = $routeParams.page;
    
    r.forms = $scope.forms = Forms.all();
    r.form = $scope.form  = $scope.forms[$routeParams.formIndex];

    r.departments = $scope.departments = Departments.getAll();
    r.department = $scope.department = $scope.departments[$routeParams.deptId];

    r.groups = $scope.groups = Groups.getAll();
    r.group = $scope.group  = $scope.groups[$routeParams.groupId];

    r.subjects = $scope.subjects = Subjects.getAll();
    r.subject = $scope.subject  = $scope.subjects[$routeParams.subjectId];

    r.terms = $scope.terms = [
      {name:"Term 1"},
      {name:"Term 2"},
      {name:"Term 3"}
    ];
    r.term = $scope.term  = $scope.terms[$routeParams.termIndex];

    $scope.open = Location.open;

  });
