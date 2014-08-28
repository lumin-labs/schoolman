'use strict';

function InspectorateProfileCtrl($scope, $routeParams, model, Schools, $q, DivFees, Inspectorates, RegFees, DivisionPayments, InspectoratePayments) {
    var inspectorateId = $routeParams.inspectorateId === "0" ? "inspectorate_D0000001" : $routeParams.inspectorateId;
    $scope.accessCode = $routeParams.accessCode;
    $scope.newPayment = new model.InspectoratePayment();
    $scope.newPayment.inspectorateId = inspectorateId;
    $scope.newPayment.registrar = $routeParams.username

    console.log("routeParams", $routeParams);

    var data = $scope.data = {
      inspectorate:undefined,
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

    payments:InspectoratePayments.get(inspectorateId),
    divfees:DivFees.getAll(),
    };



    console.log("inspectorateId", inspectorateId);
    
    $scope.data.inspectorate = Inspectorates.get(inspectorateId);
    console.log("$scope.data.inspectorate",$scope.data.inspectorate,data.payments)

    // This is for reverting data.school if user starts to edit and chooses to cancel
    var inspectorateCopy = angular.copy($scope.data.inspectorate);
    $scope.editing = false;
    $scope.edit = function(){
      $scope.editing = true;
    }
    $scope.cancel = function(){
      $scope.data.inspectorate = angular.copy(inspectorateCopy);
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
        InspectoratePayments.set($scope.newPayment,success.id);
        $scope.newPayment = new model.InspectoratePayment();
        $scope.newPayment.registrar = $routeParams.username;
        $scope.newPayment.inspectorateId = inspectorateId;

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


    $scope.save = function(inspectorate){
      inspectorate.save().then(function(success){
        console.log("Inspectorate saved", success);
        $scope.editing = false;
        
      }).catch(function(error){
        console.log("Failed to save inspectorate", error);
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

  angular.forEach($scope.data.divfees, function(fee, feeId){
    console.log("fee:", fee);
    divTotal += fee.amount * fee.division;
    regTotal += fee.amount * fee.region;
    minTotal += fee.amount * fee.ministry;
    console.log("totals", divTotal, regTotal, minTotal);
  });
  var students = $scope.data.inspectorate.numMale+ $scope.data.inspectorate.numFemale ;
  $scope.data.inspectorate.totalFee = ((regTotal/100)+ (divTotal/100)) * students;
  }

  InspectorateProfileCtrl.$inject = ['$scope', '$routeParams', 'model', 'Schools', '$q','DivFees','Inspectorates','RegFees', 'DivisionPayments','InspectoratePayments'];
  angular.module('SchoolMan').controller('InspectorateProfileCtrl', InspectorateProfileCtrl);
