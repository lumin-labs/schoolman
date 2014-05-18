'use strict';

angular.module('SchoolMan')
  .controller('ProfileCtrl', function ($scope, $routeParams, model, profile, Registrar, Fees, Departments, PROMOTE_OPTIONS, $user) {

    $scope.PROMOTE_OPTIONS = PROMOTE_OPTIONS;

    $scope.accessCode = $routeParams.accessCode;

  	$scope.fees = Fees.getAll();
  	$scope.departments = Departments.getAll();

  	$scope.newPayment = new model.Payment();
  	$scope.newPayment.registrar = $routeParams.username;

    $scope.student = $routeParams.studentId === "0" ?
      Registrar.getStudent("U0000001") :
      Registrar.getStudent($routeParams.studentId);

    $scope.newComment = new model.Comment($routeParams.username,  $scope.student.id);
    
    $scope.data = {};
    $scope.data.comments = [];

    profile.getComments($scope.student.id).then(function(comments){
      $scope.data.comments = $scope.data.comments.concat(comments);
    }); 

    $scope.$user = $user;

    $scope.addPayment = function(){
    	// Reformat the input from string to number
    	$scope.newPayment.amount = Number($scope.newPayment.amount.replace(/[^0-9\.]+/g,""));

    	$scope.student.addPayment($scope.newPayment);
    	Registrar.save();

    	$scope.newPayment = new model.Payment();
      $scope.newPayment.registrar = $routeParams.username;

    };

    // $scope.addComment = function(){
    //   $scope.newComment.date = new Date();
    //   $scope.newComment.user = $routeParams.username;
    //   $scope.student.discipline.comments.push($scope.newComment);
    //   Registrar.save();
    //   $scope.newComment = new model.Comment();
    // }

    $scope.addComment = function(){
      $scope.newComment.save().then(function(success){
        console.log("Comment saved: ", success);
        $scope.data.comments.push($scope.newComment);
        $scope.newComment = new model.Comment($routeParams.username, $scope.student.id);
      });     
    };

    $scope.save = Registrar.save;

  });
