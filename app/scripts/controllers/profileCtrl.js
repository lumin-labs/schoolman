'use strict';

angular.module('SchoolMan')
  .controller('ProfileCtrl', function ($scope, $routeParams, Registrar, Fees, Departments) {

  	$scope.fees = Fees.getAll();
  	$scope.departments = Departments.getAll();

    $scope.student = $routeParams.studentId === "0" ?
      Registrar.getStudent("U0000001") :
      Registrar.getStudent($routeParams.studentId);
  });
