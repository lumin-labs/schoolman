'use strict';

function InsFeesCtrl($scope, $routeParams, model, InspectorateFees) {
      
      $scope.data = {};
      $scope.data.insfees = InspectorateFees.getAll();
      $scope.showValidation = false;
      var userAccess = $routeParams.accessCode;

      var updateAmounts = function(){

        var total = 0;
        var instotal = 0;
        angular.forEach($scope.data.insfees, function(fee, feekey){
          total += fee.amount;
          if(fee.inspectorate === true){
           instotal += fee.amount;
          }
        })
        $scope.data.studentFee = total;
        $scope.data.insisionFee = instotal;
      }

      updateAmounts();
      
      $scope.newInsFee = new model.InsFee();
      console.log("newInsFee", $scope.newInsFee);

      $scope.add = function(insfee){
        if(userAccess === 'region'){
          var percentages = insfee.region + insfee.ministry;
        } else{
          var percentages = insfee.inspectorate + insfee.region;
        }
        if(insfee.isValid() && percentages <= 100){
            try{
               insfee.amount = Number(insfee.amount.replace(/[^0-9\.]+/g,""));
               console.log("before save", insfee);
               insfee.save().then(function(success){
                  console.log("in save", success);
                  $scope.data.insfees[$scope.newInsFee._id] = $scope.newInsFee;
                  $scope.newInsFee = new model.InsFee(); 
                  updateAmounts();
               }).catch(function(error, result){
                  if(error.status === 409){
                    $scope.showValidation = true;
                  }
                  console.log("Error: InsFee not added", error);
               });
           } catch(e){
               console.log("InsFeesCtrl Error: ", e)
           }
         } else if (insfee <= 100){
          console.log("InsFee Error: Numbers sum to greater than 100 %", insfee.inspectorate, ", ", insfee.region, ", ", insfee.ministry)
         }  
      }

      $scope.remove = function(insfee){
         InsFees.remove(insfee); 
      }

     
}
InsFeesCtrl.$inject = ['$scope', '$routeParams', 'model', 'InspectorateFees'];
angular.module('SchoolMan').controller('InsFeesCtrl', InsFeesCtrl);
