'use strict';

angular.module('SchoolMan')
  .controller('ClassmenuCtrl', function ($scope, $routeParams, CourseCatalog) {
    
    $scope.forms = CourseCatalog.getForms();
    $scope.form  = $scope.forms[$routeParams.formIndex];

    $scope.groups = CourseCatalog.getGroups();
    $scope.group  = $scope.groups[$routeParams.groupIndex];

    $scope.subjects = CourseCatalog.getSubjects($routeParams.formIndex);
    $scope.subject  = $scope.subjects[$routeParams.subjectKey];

  });
