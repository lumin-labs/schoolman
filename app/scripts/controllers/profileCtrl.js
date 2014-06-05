'use strict';

angular.module('SchoolMan')
  .controller('ProfileCtrl', function ($scope, $routeParams, model, profile, Dcards, Users, Registrar, Fees, Forms, Payments, Groups, Departments, PROMOTE_OPTIONS) {

    $scope.PROMOTE_OPTIONS = PROMOTE_OPTIONS;

    $scope.accessCode = $routeParams.accessCode;

  	$scope.newPayment = new model.Payment();
  	$scope.newPayment.registrar = $routeParams.username;
    $scope.newPayment.studentId = $routeParams.studentId;
    $scope.multiplier = 1; // -1 implies that this payment is a correction

    $scope.Users = Users;


    var studentId = $routeParams.studentId === "0" ? "U0000001" : $routeParams.studentId;
    console.log("routeParams", $routeParams);

    $scope.data = {
      comments:[],
      student:undefined,
      dcard:undefined,
      forms:Forms.all(),
      departments:Departments.getAll(),
      groups:Groups.getAll(),
      fees:Fees.getAll(),
      payments:[]
    };

    console.log("studentId", studentId);
    Registrar.getStudent(studentId).then(function(student){
      console.log("Found student:", student);
      $scope.data.student = student;
      $scope.newComment = new model.Comment($routeParams.username,  $scope.data.student._id);

      // This is for reverting data.student if user starts to edit and chooses to cancel
      var studentCopy = angular.copy($scope.data.student);
      $scope.editing = false;
      $scope.edit = function(){
        $scope.editing = true;
      }
      $scope.cancel = function(){
        $scope.data.student = angular.copy(studentCopy);
        $scope.editing = false;
      }

    }).catch(function(error){
      console.log("profileCtrl Error: ",error);
    })

    Dcards.get(studentId).then(function(dcard){
      $scope.data.dcard = dcard;
    }).catch(function(error){
      console.log("Failed to get dcard", error);
    });

    profile.getComments(studentId).then(function(comments){
      $scope.data.comments = $scope.data.comments.concat(comments);
    }); 
    
    Payments.query({studentId:studentId}).then(function(payments){
      console.log("payments query: ", payments);
      $scope.data.payments = payments;
    }).catch(function(error){
      console.log("payment error: ", error);
    });

    $scope.addPayment = function(payment, multiplier){
    	// Reformat the input from string to number
    	//if(typeof $scope.data.payments.amount = "string"){
      //  $scope.data.payments.amount = $scope.stringToNumber($scope.data.payments.amount);
      //}
      payment.amount = payment.getAmount() * multiplier;
      console.log("Saving payment: ", payment, multiplier);
      payment.save().then(function(success){
        console.log("payment saved", success);
        $scope.data.payments.push(payment);
        $scope.newPayment = new model.Payment();
        $scope.newPayment.registrar = $routeParams.username;
        $scope.newPayment.studentId = $routeParams.studentId;

      }).catch(function(error){
        console.log("Payment save error ", error);
      });
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
        $scope.newComment = new model.Comment($routeParams.username, $scope.data.student._id);
      });     
    };

    $scope.stringToNumber = function(amount){
      amount = Number(amount.replace(/[^0-9\.]+/g,""));
      return amount;
    };

    $scope.getTotalPayments = function(){
      var total = 0;
      total = $scope.data.payments.reduce(function(total, payment){
        if(typeof payment.amount === "string"){
         payment.amount = $scope.stringToNumber(payment.amount);
        }
        return payment.amount + total;
      }, 0);
      return total;
    };

    $scope.save = function(model){
      model.save().then(function(success){
        console.log("Model saved", success);
        $scope.editing = false;
      }).catch(function(error){
        console.log("Failed to save model", error);
      });
    };
  });
