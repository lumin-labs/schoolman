'use strict';

function RubricCtrl($scope, $routeParams, model, Location, Rubrics, Items, Lang, Fees, Payments, Students) {
    $scope.dict = Lang.getDict();
    $scope.validationError = false;

    var data = $scope.data = {
        rubrics: {},
        items: [],
        total: 0,
        schoolFees: 0,
    };

    Rubrics.getAll().then(function(success){
        $scope.data.rubrics = success;    
        // console.log("Rubrics", $scope.data.rubrics);
        angular.forEach($scope.data.rubrics, function(rubric, index){
            rubric.amount = 0;
            rubric.items = [];
        })

        Items.getAll().then(function(items){
            $scope.data.items = items;

            angular.forEach($scope.data.items, function(item, index){
                $scope.data.rubrics[item.rubric].items.push(item);
                $scope.data.rubrics[item.rubric].amount += item.income - item.expenditure;
                $scope.data.total += item.income - item.expenditure;
            })
        })
    })

    var fees = Fees.getAll();

    angular.forEach(fees, function(fee, index){
        fee.students = 0;
    })

    var allStudents = [];

    Students.query().then(function(students){
        allStudents = students;
    }).catch(function(error){
        console.log("Failed to get students", error);
    });

    Payments.getAll().then(function(paymentsByStudent){
        var total = 0;

        angular.forEach(allStudents, function(student, key){
          var studentId = student._id;

          if(paymentsByStudent[studentId]){
            student.payments = paymentsByStudent[studentId].payments;
          }
          else{
            student.payments = [];
          }
        });
        
        fees = _.reduce(allStudents, function(fees, student){
          fees[student.feeId].students += 1;
          return fees;
        },fees)
        
        console.log("Fees object", fees);

        angular.forEach(paymentsByStudent, function(payment, paymentId){
            total += payment.amount;
        })

        $scope.data.totalPayments = total;
    })

    $scope.newRubric = new model.Rubric();
    console.log("NewRubric", $scope.newRubric);

    

    $scope.add = function(rubric){
        typeof rubric.amount === "string" ? rubric.amount = Number(rubric.amount.replace(/[^0-9\.]+/g,"")) : "";
        rubric.save().then(function(success){
            $scope.validationError = false;
            rubric.items = [];
            $scope.data.rubrics[rubric._id] = rubric;
            $scope.newRubric = new model.Rubric();
        }).catch(function(error){
            //handle duplicate descriptions
            if(error.name === "conflict"){
                $scope.validationError = true;
                $scope.newRubric = new model.Rubric();
                $scope.newRubric.description = rubric.description;
            }
            console.log("Failed to save rubric: ", error);
        })
    }

    $scope.remove = function(rubric){
        Rubrics.remove(rubric).then(function(success){
          delete $scope.data.rubrics[rubric._id];
        });
    }
}
RubricCtrl.$inject = ['$scope', '$routeParams', 'model', 'Location', 'Rubrics', 'Items', 'Lang', 'Fees', 'Payments', 'Students'];
angular.module('SchoolMan.Accounting').controller('RubricCtrl', RubricCtrl);


