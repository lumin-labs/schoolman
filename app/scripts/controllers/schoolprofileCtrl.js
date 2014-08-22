'use strict';

function SchoolProfileCtrl($scope, $routeParams, model, Schools, $q, DivFees, Divisions, SchoolPayments) {
    var schoolId = $routeParams.schoolId === "0" ? "school_S0000001" : $routeParams.schoolId;
    $scope.accessCode = $routeParams.accessCode;
    $scope.multiplier = 1;
    $scope.newPayment = new model.SchoolPayment();
    $scope.newPayment.schoolId = schoolId;
    $scope.newPayment.registrar = $routeParams.username;

   
    console.log("routeParams", $routeParams);

    var data = $scope.data = {
      school:undefined,
      divisions: Divisions.getAll(),
      payments:SchoolPayments.get(schoolId),
      divfees:DivFees.getAll( )
    };
    console.log("Payments:", data.payments);


    console.log("schoolId", schoolId);
    
    $scope.data.school = Schools.get(schoolId);

    // This is for reverting data.school if user starts to edit and chooses to cancel
    var schoolCopy = angular.copy($scope.data.school);
    $scope.editing = false;
    $scope.edit = function(){
      $scope.editing = true;
    }
    $scope.cancel = function(){
      $scope.data.school = angular.copy(schoolCopy);
      $scope.editing = false;
    }

    


    $scope.stringToNumber = function(amount){
      amount = Number(amount.replace(/[^0-9\.]+/g,""));
      return amount;
    };


    $scope.save = function(school){
      school.save().then(function(success){
        console.log("School saved", success);
        $scope.editing = false;
        if(school.numStudents !== schoolCopy.numstudents){
          var div = "division_" + school.division;
          data.divisions[div].numStudents += school.numStudents-schoolCopy.numStudents;
          data.divisions[div].save().then(function(success){
            console.log("Saved divisions", success);
          }).catch(function(error){
            console.log("Failed to save division", error);
          });
        }
      }).catch(function(error){
        console.log("Failed to save school", error);
      });
    };

    $scope.addPayment = function(payment, multiplier){
      // Reformat the input from string to number
      payment.amount = payment.getAmount() * multiplier;
      console.log("Saving payment: ", payment, multiplier);
      payment.save().then(function(success){
        console.log("payment saved", success);
        $scope.data.payments.push(payment);
        SchoolPayments.set($scope.newPayment,success.id);
        $scope.newPayment = new model.SchoolPayment();
        $scope.newPayment.registrar = $routeParams.username;
        $scope.newPayment.schoolId = schoolId;

        // This is a crappy hack to compensate for the fact that pouchdb seems
        // to be too slow to calculate this on the fly for a list of students
        
      }).catch(function(error){
        console.log("Payment save error ", error);
      });
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
  var students = $scope.data.school.numMale + $scope.data.school.numFemale;
  $scope.data.school.totalFee = reduce($scope.data.divfees).by("amount") * students;

  }

  SchoolProfileCtrl.$inject = ['$scope', '$routeParams', 'model', 'Schools', '$q','DivFees', 'Divisions','SchoolPayments'];
  angular.module('SchoolMan').controller('SchoolProfileCtrl', SchoolProfileCtrl);