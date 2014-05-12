'use strict';

angular.module('SchoolMan')
  .controller('NavtabsCtrl', function ($scope, $routeParams, Location, TABS, VERSION, Cache, User) {

    $scope.TABS = TABS;
    $scope.open = Location.open;
    $scope.userAccess = $routeParams.accessCode;
    $scope.teacher = Cache.get('user');
    $scope.User = User;

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
      var isRightMode = tab.modes.indexOf(VERSION.mode) > -1;
    	var hasAccess = tab.access.indexOf($scope.userAccess) > -1;
      var excluded = excludedOnThisPage(tab);
      return (hasAccess && isRightMode && (!excluded));
    };

    $scope.logout = function(){
      Location.open({page:"login", username:null, accessCode:'teacher'});
    }

    $scope.login = function(access){
      Location.open({page:"default_"+access, accessCode:access});
    }
  });
