'use strict';

angular.module('SchoolMan')
  .controller('FeesCtrl', function ($scope, Fees, model) {
      
      $scope.data = {};
      $scope.data.fees = Fees.getAll();
      
      $scope.newFee = new model.Fee();

      $scope.add = function(fee){
         if(fee.isValid()){
            try{
               fee.amount = Number(fee.amount.replace(/[^0-9\.]+/g,""));
               fee.save().then(function(success){
                  $scope.data.fees[$scope.newFee._id] = $scope.newFee;
                  $scope.newFee = new model.Fee(); 
               }).catch(function(error, result){
                  console.log("Error: Fee not added", error);
               });
           } catch(e){
               console.log("FeesCtrl Error: ", e)
           }
         }  
      }

      $scope.remove = function(fee){
         Fees.remove(fee); 
      }
});
