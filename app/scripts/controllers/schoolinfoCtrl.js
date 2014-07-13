'use strict';

angular.module('SchoolMan')
  .controller('SchoolInfoCtrl', function ($scope, Data2, model, $routeParams, SchoolInfos) {
  	
    $scope.accessCode = $routeParams.accessCode;

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

  });
