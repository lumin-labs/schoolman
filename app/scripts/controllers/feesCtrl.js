'use strict';

angular.module('SchoolMan')
  .controller('FeesCtrl', function ($scope, Fees, Fee) {
    $scope.fees = Fees.getAll();
    $scope.newFee = new Fee();

    $scope.add = function(fee){
    	if(fee.isValid()){
    		try{
                fee.amount = Number(fee.amount.replace(/[^0-9\.]+/g,""));
	    		Fees.add(fee);
	    		Fees.save();
	    		$scope.newFee = new Fee();	
	    	} catch(e){
	    		console.log("FeesCtrl Error: ", e)
	    	}
    	}	
    }

    $scope.remove = function(fee){
    	Fees.remove(fee);	
        Fees.save();

    }
  });
