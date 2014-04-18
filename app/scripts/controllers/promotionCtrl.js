'use strict';

angular.module('SchoolMan')
  .controller('PromotionCtrl', function ($scope, $routeParams, CourseCatalog) {
    $scope.form  = $scope.forms[$routeParams.formIndex];

    console.log("Form", $scope.form);

    $scope.groups = CourseCatalog.getGroups();
    console.log("Groups", $scope.groups);

  });
