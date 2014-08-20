'use strict';

function RegFinanceCtrl($scope, RegFees, Schools, Divisions, DivisionPayments) {
  	
  $scope.data = {
    schools: Schools.getAll(),
    regfees: RegFees.getAll(),
    divisions: Divisions.getAll(),
    divisionTotal: 0,
    regionTotal: 0,
    ministryTotal: 0,
    payments:DivisionPayments.getAll(),
  }

  var reduce = function(collection){
    var self = {};
    self.by = function(key){
      var t = 0;
      angular.forEach(collection, function(item, itemKey){
        t += item[key];
      });
      return t;
    };
    return self;
  }

  var totalFemale = reduce($scope.data.divisions).by("numFemale");
  var totalMale = reduce($scope.data.divisions).by("numMale");
  $scope.data.totalStudents = (totalFemale + totalMale);
  $scope.data.feesAmount = reduce($scope.data.regfees).by("amount");

  var divTotal = 0; 
  var regTotal = 0;
  var minTotal = 0;

  angular.forEach($scope.data.regfees, function(fee, feeId){
    console.log("fee:", fee);
    divTotal += fee.amount * fee.division;
    regTotal += fee.amount * fee.region;
    minTotal += fee.amount * fee.ministry;
    console.log("totals", divTotal, regTotal, minTotal);
  });
  console.log("totals", divTotal, regTotal, minTotal)

  var totalpayments = 0;
  angular.forEach($scope.data.divisions,function(division,divisionid){
    var sum = 0; 
    angular.forEach($scope.data.payments,function(payment,paymentid){
      console.log ("payment",payment)
      if (payment.divisionId === division._id){
        sum = sum + payment.amount;


      }
    })
    totalpayments = totalpayments + sum;
    division.totalPaid = sum;
  })
  $scope.data.totalPayment = totalpayments;
  $scope.data.regSum = (regTotal/100)+ (minTotal/100);
  $scope.data.divisionTotal = $scope.data.totalStudents * divTotal / 100;
  $scope.data.regionTotal = $scope.data.totalStudents * regTotal / 100;
  $scope.data.ministryTotal = $scope.data.totalStudents * minTotal / 100;


}
RegFinanceCtrl.$inject = ['$scope','RegFees', 'Schools', 'Divisions','DivisionPayments'];
angular.module('SchoolMan').controller('RegFinanceCtrl', RegFinanceCtrl);
