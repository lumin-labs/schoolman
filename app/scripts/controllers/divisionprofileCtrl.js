'use strict';

function DivisionProfileCtrl($scope, $routeParams, model, Schools, $q, DivFees, Divisions) {

    $scope.accessCode = $routeParams.accessCode;

    var divisionId = $routeParams.divisionId === "0" ? "division_D0000001" : $routeParams.divisionId;
    console.log("routeParams", $routeParams);

    var data = $scope.data = {
      division:undefined,
      regions: ["Adamoua",
              "Center Region",
              "East Region",
              "Extreme North Region",
              "Littoral",
              "North Region",
              "Northwest Region",
              "South Region",
              "Southwest Region",
              "West Region"]
    };



    console.log("divisionId", divisionId);
    
    $scope.data.division = Divisions.get(divisionId);

    // This is for reverting data.school if user starts to edit and chooses to cancel
    var divisionCopy = angular.copy($scope.data.division);
    $scope.editing = false;
    $scope.edit = function(){
      $scope.editing = true;
    }
    $scope.cancel = function(){
      $scope.data.division = angular.copy(divisionCopy);
      $scope.editing = false;
    }

    


    $scope.stringToNumber = function(amount){
      amount = Number(amount.replace(/[^0-9\.]+/g,""));
      return amount;
    };


    $scope.save = function(division){
      division.save().then(function(success){
        console.log("Division saved", success);
        $scope.editing = false;
        
      }).catch(function(error){
        console.log("Failed to save division", error);
      });
    };
  }
  DivisionProfileCtrl.$inject = ['$scope', '$routeParams', 'model', 'Schools', '$q','DivFees', 'Divisions'];
  angular.module('SchoolMan').controller('DivisionProfileCtrl', DivisionProfileCtrl);
