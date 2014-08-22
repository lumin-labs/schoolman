'use strict';

function DivFinanceCtrl($scope, DivFees, Schools, SchoolPayments) {
  	
  $scope.data = {
    schools: Schools.getAll(),
    divfees: DivFees.getAll(),
    payments: SchoolPayments.getAll(),
    divisionTotal: 0,
    regionTotal: 0,
    ministryTotal: 0
  }

  var reduce = function(collection){
    console.log("selection", collection);
    var self = {};
    self.by = function(key){
      var t = 0;
      angular.forEach(collection, function(item, itemKey){
        t += item[key];
      });
      console.log("selection", collection, t, key);
      return t;
    };
    return self;
  }

  var totalmales = reduce($scope.data.schools).by("numMale");
  var totalfemales = reduce($scope.data.schools).by("numFemale");
  var totalmalesCycle1 = reduce($scope.data.schools).by("numMaleCycle1");
  var totalmalesCycle2 = reduce($scope.data.schools).by("numMaleCycle2");
  var totalfemalesCycle1 = reduce($scope.data.schools).by("numFemaleCycle1");
  var totalfemalesCycle2 = reduce($scope.data.schools).by("numFemaleCycle2");
  console.log("school", $scope.data.schools, totalmalesCycle1);
  $scope.data.totalStudents = ((totalmalesCycle1 +totalmalesCycle2) + (totalfemalesCycle1+totalfemalesCycle2));
  $scope.data.feesAmount = reduce($scope.data.divfees).by("amount");

  var divTotal = 0; 
  var regTotal = 0;
  var minTotal = 0;

  angular.forEach($scope.data.divfees, function(fee, feeId){
    console.log("fee:", fee);
    divTotal += fee.amount * fee.division;
    regTotal += fee.amount * fee.region;
    minTotal += fee.amount * fee.ministry;
    
  });
  var totalpayments = 0;
  angular.forEach($scope.data.schools,function(school,schoolid){
    var sum = 0; 
    angular.forEach($scope.data.payments,function(payment,paymentid){
      if (payment.schoolId === school._id){
        sum = sum + payment.amount;


      }
    })
    totalpayments = totalpayments + sum;
    school.totalPaid = sum;
  })
  $scope.data.totalPayment = totalpayments;
  $scope.data.divSum = (divTotal/100)+ (regTotal/100);
  // console.log("div sum", $scope.data.divSum, divTotal, regTotal,minTotal)
  $scope.data.divisionTotal = $scope.data.totalStudents * divTotal / 100;
  $scope.data.regionTotal = $scope.data.totalStudents * regTotal / 100;
  // $scope.data.ministryTotal = $scope.data.totalStudents * minTotal / 100;
  
}
DivFinanceCtrl.$inject = ['$scope','DivFees', 'Schools','SchoolPayments'];
angular.module('SchoolMan').controller('DivFinanceCtrl', DivFinanceCtrl);
