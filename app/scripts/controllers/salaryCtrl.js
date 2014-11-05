'use strict';

function SalarysCtrl($scope, Salarys, Students, model) {
      
      $scope.data = {};
      $scope.data.salarys = Salarys.getAll();
      // Join students to fees
      Students.getAll().then(function(students){
        angular.forEach($scope.data.salarys, function(salary, key){
          Salary.students = _.filter(students, function(student){
            return student.salaryId === key;
          });
        });
      });
      
      $scope.newSalary = new model.Salary();

      $scope.add = function(salary){
         if(salary.isValid()){
            try{
               salary.schoolAmount = Number(salary.schoolAmount.replace(/[^0-9\.]+/g,""));
               salary.ptaAmount = Number(salary.ptaAmount.replace(/[^0-9\.]+/g,""));
               salary.save().then(function(success){
                  if(!$scope.newSalary.students){
                    $scope.newSalary.students= [];
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
SalarysCtrl.$inject = ['$scope', 'Salarys', 'Students', 'model'];
angular.module('SchoolMan').controller('SalarysCtrl', SalarysCtrl);
