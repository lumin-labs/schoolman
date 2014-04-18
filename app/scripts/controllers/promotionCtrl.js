'use strict';

angular.module('SchoolMan')
  .controller('PromotionCtrl', function ($scope, $routeParams, CourseCatalog) {
    $scope.formIndex  = $routeParams.formIndex;

    var _groups = CourseCatalog.getGroups();
    $scope.groups = _groups.map(function(group){
    	return angular.copy(group);
    });
  });
