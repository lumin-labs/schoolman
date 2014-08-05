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

      $scope.add = function(divfee){
         if(divfee.isValid()){
            try{
               divfee.amount = Number(divfee.amount.replace(/[^0-9\.]+/g,""));
               divfee.save().then(function(success){
                  if(!$scope.newDivFee.schools){
                    $scope.newDivFee.schools = [];
                 }
                  $scope.data.divfees[$scope.newDivFee._id] = $scope.newDivFee;
                  $scope.newDivFee = new model.DivFee(); 
               }).catch(function(error, result){
                  console.log("Error: DivFee not added", error);
               });
           } catch(e){
               console.log("DivFeesCtrl Error: ", e)
           }
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
