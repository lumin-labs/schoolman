'use strict';

function DivFinanceCtrl($scope, DivFees, Schools, SchoolPayments) {
  	
  $scope.data = {
    schools: Schools.getAll(),
    divfees: DivFees.getAll(),
    schoolpayments: SchoolPayments.getAll()
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

  $scope.data.totalStudents = reduce($scope.data.schools).by("numStudents");
  $scope.data.feesAmount = reduce($scope.data.divfees).by("amount");

  angular.forEach($scope.data.schools, function(school, schoolId){
    var payments = SchoolPayments.get(schoolId);
    school.paid = reduce(payments).by("amount");
  })

	$scope.totalPaid = function(fees){
		return reduce(fees).by("paid");
	}
  
}
DivFinanceCtrl.$inject = ['$scope','DivFees', 'Schools', 'SchoolPayments'];
angular.module('SchoolMan').controller('DivFinanceCtrl', DivFinanceCtrl);
