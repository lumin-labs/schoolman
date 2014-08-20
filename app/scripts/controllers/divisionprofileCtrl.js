'use strict';

function DivisionProfileCtrl($scope, $routeParams, model, Schools, $q, DivFees, Divisions, RegFees, DivisionPayments) {
    var divisionId = $routeParams.divisionId === "0" ? "division_D0000001" : $routeParams.divisionId;
    $scope.accessCode = $routeParams.accessCode;
    $scope.newPayment = new model.DivisionPayment();
    $scope.newPayment.divisionId = divisionId;
    $scope.newPayment.registrar = $routeParams.username

    
    console.log("routeParams", $routeParams);

    var data = $scope.data = {
      division:undefined,
      regions: ["Adamoua",
              "Center Region",
              "East Region",
              "Extreme North Region",
              "Littoral",
              "North Region",
              "Northwest Region",
              "South Region",
              "Southwest Region",
              "West Region"],

    payments:DivisionPayments.get(divisionId),
    regfees:RegFees.getAll(),

    };



    console.log("divisionId", divisionId);
    
    $scope.data.division = Divisions.get(divisionId);
    console.log("$scope.data.division",$scope.data.division,data.payments)

    // This is for reverting data.school if user starts to edit and chooses to cancel
    var divisionCopy = angular.copy($scope.data.division);
    $scope.editing = false;
    $scope.edit = function(){
      $scope.editing = true;
    }
    $scope.cancel = function(){
      $scope.data.division = angular.copy(divisionCopy);
      $scope.editing = false;
    }

    $scope.multiplier = 1;

     $scope.addPayment = function(payment, multiplier){
      // Reformat the input from string to number
      console.log('payment',payment)
      payment.amount = payment.getAmount() * multiplier;
      console.log("Saving payment: ", payment, multiplier);
      payment.save().then(function(success){
        console.log("payment saved", success);
        $scope.data.payments.push(payment);
        DivisionPayments.set($scope.newPayment,success.id);
        $scope.newPayment = new model.DivisionPayment();
        $scope.newPayment.registrar = $routeParams.username;
        $scope.newPayment.divisionId = divisionId;

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

    $scope.stringToNumber = function(amount){
      amount = Number(amount.replace(/[^0-9\.]+/g,""));
      return amount;
    };


    $scope.save = function(division){
      division.save().then(function(success){
        console.log("Division saved", success);
        $scope.editing = false;
        
      }).catch(function(error){
        console.log("Failed to save division", error);
      });
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
  var students = $scope.data.division.numMale + $scope.data.division.numFemale;
  $scope.data.division.totalFee = ((regTotal/100)+ (minTotal/100)) * students;
  }

  DivisionProfileCtrl.$inject = ['$scope', '$routeParams', 'model', 'Schools', '$q','DivFees','Divisions','RegFees', 'DivisionPayments'];
  angular.module('SchoolMan').controller('DivisionProfileCtrl', DivisionProfileCtrl);
