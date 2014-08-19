'use strict';

function RegFeesCtrl($scope, $routeParams, model, RegFees) {
      
      $scope.data = {};
      $scope.data.regfees = RegFees.getAll();
      var userAccess = $routeParams.accessCode;

      var updateAmounts = function(){

        var total = 0;
        var regtotal = 0;
        angular.forEach($scope.data.regfees, function(fee, feekey){
          total += fee.amount;
          if(fee.division === true){
            regtotal += fee.amount;
          }
        })
        $scope.data.studentFee = total;
        $scope.data.regionFee = regtotal;
      }

      updateAmounts();
      
      $scope.newRegFee = new model.RegFee();
      console.log("newRegFee", $scope.newRegFee);

      $scope.add = function(regfee){
        
          var percentages = regfee.division + regfee.region + regfee.ministry;
        
        if(regfee.isValid() && percentages <= 100){
            try{
               regfee.amount = Number(regfee.amount.replace(/[^0-9\.]+/g,""));
               console.log("before save", regfee);
               regfee.save().then(function(success){
                  console.log("in save", success);
                  $scope.data.regfees[$scope.newRegFee._id] = $scope.newRegFee;
                  $scope.newRegFee = new model.RegFee(); 
                  updateAmounts();
               }).catch(function(error, result){
                  console.log("Error: RegFee not added", error);
               });
           } catch(e){
               console.log("RegFeesCtrl Error: ", e)
           }
         } else if (regfee <= 100){
          console.log("RegFee Error: Numbers sum to greater than 100 %", regfee.division, ", ", regfee.region, ", ", regfee.ministry)
         }  
      }

      $scope.remove = function(regfee){
         RegFees.remove(regfee); 
      }

      
}
RegFeesCtrl.$inject = ['$scope', '$routeParams', 'model', 'RegFees'];
angular.module('SchoolMan').controller('RegFeesCtrl', RegFeesCtrl);
