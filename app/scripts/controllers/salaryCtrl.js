'use strict';

function SalarysCtrl($scope, Salarys, Staffs, model) {
      
      $scope.data = {};
      $scope.data.salarys = Salarys.getAll();
      // Join students to fees
      Staffs.getAll().then(function(staffs){
        angular.forEach($scope.data.salarys, function(salary, key){
          Salary.staffs = _.filter(staffs, function(staff){
            return staff.salaryId === key;
          });
        });
      });
      
      $scope.newSalary = new model.Salary();

      $scope.add = function(salary){
         if(salary.isValid()){
            try{
               salary.salaryAmount = Number(salary.salaryAmount.replace(/[^0-9\.]+/g,""));
               salary.socailinsuranceAmount = Number(salary.socailinsuranceAmount.replace(/[^0-9\.]+/g,""));
               salary.save().then(function(success){
                  if(!$scope.newSalary.staffs){
                    $scope.newSalary.staffs= [];
                 }
                  $scope.data.salarys[$scope.newSalary._id] = $scope.newSalary;
                  $scope.newSalary = new model.Salary(); 
               }).catch(function(error, result){
                  console.log("Error: Salary not added", error);
               });
           } catch(e){
               console.log("SalarysCtrl Error: ", e)
           }
         }  
      }

      $scope.remove = function(salary){
         Salarys.remove(salary); 
      }
}
SalarysCtrl.$inject = ['$scope', 'Salarys', 'Staffs', 'model'];
angular.module('SchoolMan').controller('SalarysCtrl', SalarysCtrl);
