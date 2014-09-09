'use strict';

function ProfileCtrl($scope, $routeParams, model, profile, Dcards, Users, Marksheets, ClassCouncils, $q, Registrar, Students, Fees, Forms, Payments, Groups, Departments, PROMOTE_OPTIONS) {

    $scope.PROMOTE_OPTIONS = PROMOTE_OPTIONS;

    $scope.accessCode = $routeParams.accessCode;

  	$scope.newPayment = new model.Payment();
  	$scope.newPayment.registrar = $routeParams.username;
    $scope.newPayment.studentId = $routeParams.studentId;
    $scope.multiplier = 1; // -1 implies that this payment is a correction

    $scope.Users = Users;
    $scope.username = $routeParams.username;

    var reports = {};
    var classCouncils = {};


    var studentId = $routeParams.studentId === "0" ? "student_U0000001" : $routeParams.studentId;
    console.log("routeParams", $routeParams);

    var data = $scope.data = {
      comments:{},
      student:undefined,
      dcard:undefined,
      forms:Forms.all(),
      departments:Departments.getAll(),
      groups:Groups.getAll(),
      fees:Fees.getAll(),
      payments:[]
    };

    var setPassing = function(student, studentsClass){
      var studentAverage = 0;
      if(reports[studentsClass].total.summary){
        studentAverage = reports[studentsClass].total.summary[student._id][0];
      }
      student.passing = studentAverage >= classCouncils[studentsClass].passingScore;      
    };

    console.log("studentId", studentId);
    Students.get(studentId).then(function(student){
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

      $scope.data.student.passing = false;
      var studentsClass = [student.formIndex, student.deptId, student.groupId];
          
      if(reports.hasOwnProperty(studentsClass) &&  
        classCouncils.hasOwnProperty(studentsClass)){

        setPassing($scope.data.student, studentsClass);

      } else {
        var reportquery = {
          reports: Marksheets.getReports({
            formIndex:student.formIndex,
            deptId:student.deptId,
            groupId:student.groupId
          })
        }
        var councilquery = {
          classcouncil: ClassCouncils.get(model.ClassCouncil.generateID({
            formIndex:student.formIndex,
            deptId:student.deptId,
            groupId:student.groupId
          }))
        }

        // Get reports and classCouncils
        $q.all(councilquery).then(function(data){
          console.log("all promises: ", data);
          classCouncils[studentsClass] = data.classcouncil;
        }).catch(function(error){
          if(!classCouncils[studentsClass]){
            classCouncils[studentsClass] = new model.ClassCouncil();
          }
          // console.log("Failed to load classCouncils:", error);
        });
        $q.all(reportquery).then(function(data){
          console.log("all promises: ", data);
          reports[studentsClass] = data.reports;
          setPassing($scope.data.student, studentsClass);
        }).catch(function(error){
            // console.log("Failed to load reports", error);
        });
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
      console.log("Comments??", comments);
      $scope.data.comments = comments;
    }); 
    
    Payments.query({studentId:studentId}).then(function(payments){
      console.log("payments query: ", payments);
      $scope.data.payments = payments;
    }).catch(function(error){
      console.log("payment error: ", error);
    });

    $scope.addPayment = function(payment, multiplier){
    	// Reformat the input from string to number
      payment.amount = payment.getAmount() * multiplier;
      console.log("Saving payment: ", payment, multiplier);
      payment.save().then(function(success){
        console.log("payment saved", success);
        $scope.data.payments.push(payment);
        $scope.newPayment = new model.Payment();
        $scope.newPayment.registrar = $routeParams.username;
        $scope.newPayment.studentId = $routeParams.studentId;

        // This is a crappy hack to compensate for the fact that pouchdb seems
        // to be too slow to calculate this on the fly for a list of students
        $scope.data.student.totalPaid += payment.amount;
        $scope.data.student.save();

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
        $scope.data.comments[success.id] = $scope.newComment;
        $scope.newComment = new model.Comment($routeParams.username, $scope.data.student._id);
      });     
    };

    $scope.removeComment = function(commentIndex){
      console.log("Remove comment", $scope.data.comments, commentIndex);
      var comment = $scope.data.comments[commentIndex];
      profile.removeComment(comment).then(function(success){
        delete $scope.data.comments[commentIndex];
      });
    }

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

    $scope.getOwed = function(){
      return data.fees[data.student.feeId].schoolAmount + data.fees[data.student.feeId].ptaAmount;
    }

    $scope.save = function(model){
      model.save().then(function(success){
        console.log("Model saved", success);
        $scope.editing = false;
      }).catch(function(error){
        console.log("Failed to save model", error);
      });
    };
  }
  ProfileCtrl.$inject = ['$scope', '$routeParams', 'model', 'profile', 'Dcards', 'Users', 'Marksheets', 'ClassCouncils', '$q', 'Registrar', 'Students', 'Fees', 'Forms', 'Payments', 'Groups', 'Departments', 'PROMOTE_OPTIONS'];
  angular.module('SchoolMan').controller('ProfileCtrl', ProfileCtrl);
