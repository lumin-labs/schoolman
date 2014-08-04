'use strict';

function DivFeesCtrl($scope, Students, model, DivFees) {
      
      $scope.data = {};
      $scope.data.divfees = DivFees.getAll();
      // Replace Students with Schools
      // Students.getAll().then(function(students){
      //   angular.forEach($scope.data.fees, function(fee, key){
      //     fee.students = _.filter(students, function(student){
      //       return student.feeId === key;
      //     });
      //   });
      // });
      
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
}
DivFeesCtrl.$inject = ['$scope', 'Students', 'model', 'DivFees'];
angular.module('SchoolMan').controller('DivFeesCtrl', DivFeesCtrl);
