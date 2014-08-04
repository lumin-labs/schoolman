'use strict';

function DuesCtrl($scope, Students, model, Dues) {
      
      $scope.data = {};
      $scope.data.dues = Dues.getAll();
      // Replace Students with Schools
      // Students.getAll().then(function(students){
      //   angular.forEach($scope.data.fees, function(fee, key){
      //     fee.students = _.filter(students, function(student){
      //       return student.feeId === key;
      //     });
      //   });
      // });
      
      $scope.newDue = new model.Due();

      $scope.add = function(due){
         if(due.isValid()){
            try{
               due.amount = Number(due.amount.replace(/[^0-9\.]+/g,""));
               due.save().then(function(success){
                  if(!$scope.newDue.schools){
                    $scope.newDue.schools = [];
                 }
                  $scope.data.dues[$scope.newDue._id] = $scope.newDue;
                  $scope.newDue = new model.Due(); 
               }).catch(function(error, result){
                  console.log("Error: Due not added", error);
               });
           } catch(e){
               console.log("DuesCtrl Error: ", e)
           }
         }  
      }

      $scope.remove = function(Due){
         Dues.remove(due); 
      }
}
DuesCtrl.$inject = ['$scope', 'Students', 'model', 'Dues'];
angular.module('SchoolMan').controller('DuesCtrl', DuesCtrl);
