'use strict';

angular.module('SchoolMan')
  .controller('ClassesCtrl', function ($scope, CourseCatalog) {
    
    $scope.forms = CourseCatalog.getForms();
    $scope.groups = CourseCatalog.getGroups();
    
    $scope.remove = function(group){
    	CourseCatalog.removeGroup(group);
    	CourseCatalog.save();
    };

  });
