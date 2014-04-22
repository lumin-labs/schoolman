'use strict';

angular.module('SchoolMan')
  .controller('PromotionCtrl', function ($scope, $routeParams, CourseCatalog, Location) {
    $scope.formIndex  = $routeParams.formIndex;

    $scope.forms = CourseCatalog.getForms();
    $scope.form  = $scope.forms[$routeParams.formIndex];

    var _groups = CourseCatalog.getGroups();
    $scope.groups = _groups.map(function(group){
    	return angular.copy(group);
    });

    $scope.open = Location.open;
  });
