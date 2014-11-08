'use strict';

function FeesCtrl($scope, Fees, Students, model, Lang) {
      $scope.dict = Lang.getDict();
      $scope.data = {};
      $scope.data.fees = Fees.getAll();
      // Join students to fees
      Students.getAll().then(function(students){
        angular.forEach($scope.data.fees, function(fee, key){
          fee.students = _.filter(students, function(student){
            return student.feeId === key;
          });
        });
      });
      
      $scope.newFee = new model.Fee();
      $scope.validationError = false;

      $scope.add = function(fee){
         if(fee.isValid()){
            try{
               fee.schoolAmount = Number(fee.schoolAmount.replace(/[^0-9\.]+/g,""));
               fee.ptaAmount = Number(fee.ptaAmount.replace(/[^0-9\.]+/g,""));
               fee.save().then(function(success){
                  if(!$scope.newFee.students){
                    $scope.newFee.students= [];
                 }
                  $scope.data.fees[$scope.newFee._id] = $scope.newFee;
                  $scope.newFee = new model.Fee(); 
                  $scope.validationError = false;
               }).catch(function(error, result){
                  //handle duplicate dept code
                if(error.name === "conflict"){
                  $scope.validationError = true;
                  var feeCopy = new model.Fee();
                  feeCopy.name = $scope.newFee.name;
                  feeCopy.schoolAmount = $scope.newFee.schoolAmount;
                  // feeCopy.ptaAmount = $scope.newFee.ptaAmount;
                  $scope.newFee = feeCopy;
                }
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
}
FeesCtrl.$inject = ['$scope', 'Fees', 'Students', 'model', 'Lang'];
angular.module('SchoolMan').controller('FeesCtrl', FeesCtrl);
