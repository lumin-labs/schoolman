'use strict';

define(['SchoolInfos'], function(SchoolInfos){
  function SchoolInfoCtrl($scope, Data2, model, $routeParams, SchoolInfos) {
  	
    $scope.accessCode = $routeParams.accessCode;
    $scope.User = model.User;
    $scope.regions = model.SchoolInfo.regions;

  	SchoolInfos.get("schoolinfo").then(function(info){
      $scope.schoolInfo = info;
      console.log("School Info", $scope.schoolInfo);
    }).catch(function(error){
      console.log("error getting school info", error);
    });

    $scope.save = function(){
      $scope.schoolInfo.save().then(function(success){
        //console.log("school Info saved", $scope.schoolInfo);
      }).catch(function(error){
        console.log("failed to save school Info", error);
      });
    }

    $scope.updateVersion = function(version){
      $scope.schoolInfo.version = version;
      if(version === "gths"){
        $scope.User.roles.classmaster.name = "Head of Dept";
      } else {
        $scope.User.roles.classmaster.name = "Class Master";
      }
      $scope.save();
    }
  }
  SchoolInfoCtrl.$inject = ['$scope', 'Data2', 'model', '$routeParams', 'SchoolInfos'];
  angular.module('SchoolMan').controller('SchoolInfoCtrl', SchoolInfoCtrl);
})
