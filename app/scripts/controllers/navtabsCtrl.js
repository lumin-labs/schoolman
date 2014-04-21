'use strict';

angular.module('SchoolMan')
  .controller('NavtabsCtrl', function ($scope, $routeParams, Location, TABS, Cache) {

    $scope.TABS = TABS;
    $scope.open = Location.open;
    $scope.userAccess = $routeParams.accessCode;
    $scope.teacher = Cache.get('user');

    $scope.activeIfPage = function(page){
      var cssClass = "";
      if(page === $routeParams.page){
        cssClass = 'active';
      }
      return cssClass;
    };

    var excludedOnThisPage = function(tab){
      return tab.exclude.indexOf($routeParams.page) > -1;
    };

    $scope.userHasAccess = function(tab){
    	var hasAccess = tab.access.indexOf($scope.userAccess) > -1;
      var excluded = excludedOnThisPage(tab);
      return (hasAccess && (!excluded));
    };
  });
