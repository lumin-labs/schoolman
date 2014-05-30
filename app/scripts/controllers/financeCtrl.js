'use strict';

angular.module('SchoolMan')
  .controller('FinanceCtrl', function ($scope, Forms, Registrar, Fees, Payments) {
  	
  	// var forms = Forms.all().map(function(form){
  	// 	form.students = [];
  	// 	return form;
  	// });

   //  var classes = Registrar.getClasses()

   $scope.data = {};
   $scope.data.payments = {};

   var stringToNumber = function(amount){
      amount = Number(amount.replace(/[^0-9\.]+/g,""));
      return amount;
    };

    Payments.getAll().then(function(paymentsByStudent){
      angular.forEach(paymentsByStudent, function(data, studentId){
        if(!$scope.data.payments.hasOwnProperty(data.formIndex)){
          $scope.data.payments[data.formIndex] = [];
        };
        $scope.data.payments[data.formIndex] = $scope.data.payments[data.formIndex].concat(data.payments);
      });
      console.log("Collection", paymentsByStudent);
      angular.forEach($scope.data.payments, function(payments, formIndex){
        $scope.data.payments[formIndex] = _.map(payments, function(payment){
          payment.amout = stringToNumber(payment.amount);
          return payment;
        });
      });
      console.log("Payments", $scope.data.payments);
    });

    // fill each form with its list of students
    // angular.forEach(classes, function(c, cKey){
    // 	var formIndex = cKey.split("-")[0];
    // 	forms[formIndex].students = forms[formIndex].students.concat(c);
    // });


    // each form should contain a fees object that contains
    // the total amount owed and total amount paid for each feeGroup
  //   forms = forms.map(function(form){

  //   	// replace each student id with a student object 
  //   	form.students = form.students.map(function(studentId){
  //   		return Registrar.getStudent(studentId);
  //   	});

  //   	// instantiate the fees object
  //   	form.fees = {};

  //   	// copy and instatiate each Fee object with owed and paid
  //   	angular.forEach(Fees.getAll(), function(fee, feeKey){
  //   		var feeCopy = angular.copy(fee); //copy, otherwise the next form will clobber this fee object 
  //   		feeCopy.owed = 0;
  //   		feeCopy.paid = 0;
  //   		feeCopy.students = 0;
  //   		form.fees[feeKey] = feeCopy;
  //   	});


  //   	// reduce students into fee totals
  //   	console.log(form.name);
  //   	form.fees = form.students.reduce(function(feeGroups, student){
  //   		feeGroups[student.feeGroup].students += 1;
  //   		feeGroups[student.feeGroup].owed += Fees.get(student.feeGroup).amount;
  //   		feeGroups[student.feeGroup].paid = feeGroups[student.feeGroup].paid +
  //   			student.payments.reduce(function(totalPaid, payment){
  //   				return totalPaid + payment.amount;
  //   		},0);
  //   		if(student.id === "U0000792"){
  //   			console.log("I know they paid: ", feeGroups[student.feeGroup].paid);
  //   		}
  //   		return feeGroups;
  //   	}, form.fees);

  //   	return form;
  //   });

		// $scope.forms = forms;



		// var summary = {fees:{}};
  	// copy and instatiate each Fee object with owed and paid
  	// angular.forEach(Fees.getAll(), function(fee, feeKey){
  	// 	var feeCopy = angular.copy(fee); //copy, otherwise the next form will clobber this fee object 
  	// 	feeCopy.owed = 0;
  	// 	feeCopy.students = 0;
  	// 	feeCopy.paid = 0;
  	// 	summary.fees[feeKey] = feeCopy;
  	// });

		// $scope.summary = forms.reduce(function(s, form){
		// 	angular.forEach(form.fees, function(fee, feeKey){
		// 		summary.fees[feeKey].students = summary.fees[feeKey].students + fee.students; 
		// 		summary.fees[feeKey].owed = summary.fees[feeKey].owed + fee.owed; 
		// 		summary.fees[feeKey].paid = summary.fees[feeKey].paid + fee.paid; 
		// 	});	
		// 	return summary;
		// }, summary);

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
