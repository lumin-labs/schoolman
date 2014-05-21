'use strict';

angular.module('SchoolMan')
  .controller('ProfileCtrl', function ($scope, $routeParams, model, profile, Registrar, Fees, Forms, Groups, Departments, PROMOTE_OPTIONS, $user) {

    $scope.PROMOTE_OPTIONS = PROMOTE_OPTIONS;

    $scope.accessCode = $routeParams.accessCode;

  	$scope.newPayment = new model.Payment();
  	$scope.newPayment.registrar = $routeParams.username;

    var studentId = $routeParams.studentId === "0" ? "U0000001" : $routeParams.studentId;
    console.log("routeParams", $routeParams);

    $scope.data = {
      comments:[],
      student:undefined,
      forms:Forms.all(),
      departments:Departments.getAll(),
      groups:Groups.getAll(),
      fees:Fees.getAll()
    };

    Registrar.getStudent(studentId).then(function(student){
      console.log("Found student:", student);
      $scope.data.student = student;
      $scope.newComment = new model.Comment($routeParams.username,  $scope.data.student._id);
    }).catch(function(error){
      console.log("profileCtrl Error: ",error);
    })

    profile.getComments(studentId).then(function(comments){
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
