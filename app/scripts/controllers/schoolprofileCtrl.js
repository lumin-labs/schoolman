'use strict';

function SchoolProfileCtrl($scope, $routeParams, model, Schools, $q, DivFees) {

    $scope.accessCode = $routeParams.accessCode;

    var schoolId = $routeParams.schoolId === "0" ? "school_S0000001" : $routeParams.schoolId;
    console.log("routeParams", $routeParams);

    $scope.data = {
      school:undefined,
    };



    console.log("schoolId", schoolId);
    
    $scope.data.school = Schools.get(schoolId);

    // This is for reverting data.school if user starts to edit and chooses to cancel
    var schoolCopy = angular.copy($scope.data.school);
    $scope.editing = false;
    $scope.edit = function(){
      $scope.editing = true;
    }
    $scope.cancel = function(){
      $scope.data.school = angular.copy(schoolCopy);
      $scope.editing = false;
    }

    


    $scope.stringToNumber = function(amount){
      amount = Number(amount.replace(/[^0-9\.]+/g,""));
      return amount;
    };


    $scope.save = function(model){
      model.save().then(function(success){
        console.log("Model saved", success);
        $scope.editing = false;
      }).catch(function(error){
        console.log("Failed to save model", error);
      });
    };
  }
  SchoolProfileCtrl.$inject = ['$scope', '$routeParams', 'model', 'Schools', '$q','DivFees'];
  angular.module('SchoolMan').controller('SchoolProfileCtrl', SchoolProfileCtrl);
