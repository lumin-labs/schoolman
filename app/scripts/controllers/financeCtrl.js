'use strict';

angular.module('SchoolMan')
  .controller('FinanceCtrl', function ($scope, Forms, Registrar, Fees, Payments, SCHOOLYEAR) {
  	
  	var forms = _.map(Forms.all(), function(form){
  		console.log("forms1", form);
      form.students = [];
  		return form;
  	});

    $scope.schoolYear = SCHOOLYEAR;
   //  var classes = Registrar.getClasses()

   // $scope.data = {};
   // $scope.data.payments = {};

   var stringToNumber = function(amount){
      amount = Number(amount.replace(/[^0-9\.]+/g,""));
      return amount;
    };

    Payments.getAll().then(function(paymentsByStudent){
      console.log("Collection", paymentsByStudent);

      forms = _.reduce(paymentsByStudent, function(forms, student){
        forms[student.formIndex].students.push(student);
        return forms;
      },forms)
    

      // each form should contain a fees object that contains
      // the total amount owed and total amount paid for each feeGroup
      forms = _.map(forms, function(form){

        //console.log("Form", form);

      	// instantiate the fees object
      	form.fees = {};


      	// copy and instatiate each Fee object with owed and paid
      	angular.forEach(Fees.getAll(), function(fee, feeKey){
      		var feeCopy = angular.copy(fee); //copy, otherwise the next form will clobber this fee object 
      		feeCopy.owed = 0;
      		feeCopy.paid = 0;
      		feeCopy.students = 0;
      		form.fees[feeKey] = feeCopy;
      	});


      	// reduce students into fee totals
      	//console.log(form.name);
      	form.fees = _.reduce(form.students, function(fees, student){
      		fees[student.feeId].students += 1;
      		fees[student.feeId].owed += Fees.get(student.feeId).amount;
      		fees[student.feeId].paid = fees[student.feeId].paid +
      			student.payments.reduce(function(totalPaid, payment){
      				return totalPaid + payment.amount;
      		},0);
      		return fees;
      	}, form.fees);

      	return form;
      });

  		$scope.forms = forms;



  		var summary = {fees:{}};
    	// copy and instatiate each Fee object with owed and paid
    	angular.forEach(Fees.getAll(), function(fee, feeKey){
    		var feeCopy = angular.copy(fee); //copy, otherwise the next form will clobber this fee object 
    		feeCopy.owed = 0;
    		feeCopy.students = 0;
    		feeCopy.paid = 0;
    		summary.fees[feeKey] = feeCopy;
    	});

      console.log("forms", forms);
  		$scope.summary = forms.reduce(function(s, form){
  			angular.forEach(form.fees, function(fee, feeKey){
  				summary.fees[feeKey].students = summary.fees[feeKey].students + fee.students; 
  				summary.fees[feeKey].owed = summary.fees[feeKey].owed + fee.owed; 
  				summary.fees[feeKey].paid = summary.fees[feeKey].paid + fee.paid; 
  			});	
  			return summary;
  		}, summary);
    });

		var reduce = function(fees){
			var self = {};
			self.by = function(key){
				var t = 0;
				angular.forEach(fees, function(fee, feeKey){
					t += fee[key];
				});
				return t;
			};
			return self;
		};

		$scope.totalStudents = function(fees){
			return reduce(fees).by("students");
		};

		$scope.totalOwed = function(fees){
			return reduce(fees).by("owed");
		};

		$scope.totalPaid = function(fees){
			return reduce(fees).by("paid");
		};
    
  });
