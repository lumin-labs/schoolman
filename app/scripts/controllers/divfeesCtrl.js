'use strict';

function DivFeesCtrl($scope, Students, model, DivFees) {
      
      $scope.data = {};
      $scope.data.divfees = DivFees.getAll();

      var updateAmounts = function(){

        var total = 0;
        var divtotal = 0;
        angular.forEach($scope.data.divfees, function(fee, feekey){
          total += fee.amount;
          if(fee.division === true){
            divtotal += fee.amount;
          }
        })
        $scope.data.studentFee = total;
        $scope.data.divisionFee = divtotal;
      }

      updateAmounts();
      
      $scope.newDivFee = new model.DivFee();
      console.log("div fees", $scope.data.divfees);
      console.log("newDivFee", $scope.newDivFee);

      $scope.add = function(divfee){
        var percentages = divfee.division + divfee.region + divfee.ministry;
         if(divfee.isValid() && percentages <= 100){
            try{
               divfee.amount = Number(divfee.amount.replace(/[^0-9\.]+/g,""));
               console.log("before save", divfee);
               divfee.save().then(function(success){
                  console.log("in save", success);
                  $scope.data.divfees[$scope.newDivFee._id] = $scope.newDivFee;
                  $scope.newDivFee = new model.DivFee(); 
                  updateAmounts();
               }).catch(function(error, result){
                  console.log("Error: DivFee not added", error);
               });
           } catch(e){
               console.log("DivFeesCtrl Error: ", e)
           }
         } else if (divfee <= 100){
          console.log("DivFee Error: Numbers sum to greater than 100 %", divfee.division, ", ", divfee.region, ", ", divfee.ministry)
         }  
      }

      $scope.remove = function(divfee){
         DivFees.remove(divfee); 
      }

      $scope.toggleDivision = function(divfee){
        if(divfee.division === true){
          divfee.division = false;
        } else {
          divfee.division = true;
        }
        divfee.save().then(function(success){
          updateAmounts();
        });
      }
}
DivFeesCtrl.$inject = ['$scope', 'Students', 'model', 'DivFees'];
angular.module('SchoolMan').controller('DivFeesCtrl', DivFeesCtrl);
