'use strict';

function NavtabsCtrl($scope, $routeParams, Location, TABS, settings, Cache, model, SchoolInfos, Lang) {

    $scope.TABS = TABS;
    $scope.open = Location.open;
    $scope.userAccess = $routeParams.accessCode;
    $scope.teacher = Cache.get('user');
    $scope.User = model.User;
    $scope.settings = settings.get();
    $scope.activePage = $routeParams.page;
    $scope.dict = Lang.getDict();

    SchoolInfos.get("schoolinfo").then(function(info){
      $scope.schoolInfo = info;

      if($scope.schoolInfo.version === "gths"){
        $scope.User.roles.classmaster.name = "Head of Dept";
      }
    }).catch(function(error){
      console.log("failed to load school info", error);
    });

    $scope.activeIfPage = function(page){
      var cssClass = "";
      if(page === $routeParams.page){
        cssClass = 'active';
      }
      return cssClass;
    };

    var excludedOnThisPage = function(tab){
      var excluded = false;
      if(tab.page !== $routeParams.page){ // no tab is excluded from it's own 
        if(tab.exclude === 'all'){
          excluded = true;
        } else {
          excluded = tab.exclude.indexOf($routeParams.page) > -1;
        }
      } 
      return excluded;
    };

    $scope.userHasAccess = function(tab, version){
      var isRightMode = tab.modes.indexOf(version) > -1;
    	var hasAccess = tab.access.indexOf($scope.userAccess) > -1;
      var excluded = excludedOnThisPage(tab);
      return (hasAccess && isRightMode && (!excluded));
    };

    $scope.logout = function(){
      Location.open({page:"login", username:null, accessCode:'teacher'});
    }

    $scope.login = function(access){
      console.log(access, $scope.settings);
      if(!$scope.settings.access[access]){
        Location.open({page:"notactive", accessCode:access});
      }else {
        Location.open({page:"default_"+access, accessCode:access});
      }
    }
  }
  NavtabsCtrl.$inject = ['$scope', '$routeParams', 'Location', 'TABS', 'settings', 'Cache', 'model', 'SchoolInfos', 'Lang'];
  angular.module('SchoolMan').controller('NavtabsCtrl', NavtabsCtrl);
