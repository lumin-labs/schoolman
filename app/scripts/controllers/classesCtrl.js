'use strict';

angular.module('SchoolMan')
  .controller('ClassesCtrl', function ($scope, CourseCatalog) {
    $scope.forms = CourseCatalog.getForms();
    $scope.groups = CourseCatalog.getGroups();
    
  });
