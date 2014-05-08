'use strict';

angular.module('SchoolMan')
  .controller('ProfileCtrl', function ($scope, $routeParams, model, Registrar, Fees, Departments) {

  	$scope.fees = Fees.getAll();
  	$scope.departments = Departments.getAll();

  	$scope.newPayment = new model.Payment();
  	$scope.newPayment.registrar = $routeParams.username;

    $scope.student = $routeParams.studentId === "0" ?
      Registrar.getStudent("U0000001") :
      Registrar.getStudent($routeParams.studentId);

    $scope.addPayment = function(){
    	// Reformat the input from string to number
    	$scope.newPayment.amount = Number($scope.newPayment.amount.replace(/[^0-9\.]+/g,""));

    	$scope.student.addPayment($scope.newPayment);
    	Registrar.save();

    	$scope.newPayment = new model.Payment();
      $scope.newPayment.registrar = $routeParams.username;

    };

  });
