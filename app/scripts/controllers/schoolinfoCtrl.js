'use strict';

angular.module('SchoolMan')
  .controller('SchoolInfoCtrl', function ($scope, Data2, model, $routeParams, SchoolInfos) {
  	
    $scope.accessCode = $routeParams.accessCode;
    $scope.User = model.User;

  	SchoolInfos.get("schoolinfo").then(function(info){
      $scope.schoolInfo = info;
      
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
  });
