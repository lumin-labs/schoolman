'use strict';

function SchoolProfileCtrl($scope, $routeParams, model, Schools, $q, DivFees, Divisions) {

    $scope.accessCode = $routeParams.accessCode;

    var schoolId = $routeParams.schoolId === "0" ? "school_S0000001" : $routeParams.schoolId;
    console.log("routeParams", $routeParams);

    var data = $scope.data = {
      school:undefined,
      divisions: Divisions.getAll()
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


    $scope.save = function(school){
      school.save().then(function(success){
        console.log("School saved", success);
        $scope.editing = false;
        if(school.numStudents !== schoolCopy.numstudents){
          var div = "division_" + school.division;
          data.divisions[div].numStudents += school.numStudents-schoolCopy.numStudents;
          data.divisions[div].save().then(function(success){
            console.log("Saved divisions", success);
          }).catch(function(error){
            console.log("Failed to save division", error);
          });
        }
      }).catch(function(error){
        console.log("Failed to save school", error);
      });
    };
  }
  SchoolProfileCtrl.$inject = ['$scope', '$routeParams', 'model', 'Schools', '$q','DivFees', 'Divisions'];
  angular.module('SchoolMan').controller('SchoolProfileCtrl', SchoolProfileCtrl);
