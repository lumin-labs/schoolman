'use strict';

function StaffsprofileCtrl($scope, $routeParams, model, staffsprofile, Dcards, Users, Marksheets, ClassCouncils, $q, Staffregistrar, Staffs, Salarys, Forms, Payments, Groups, Departments, PROMOTE_OPTIONS, Lang) {

    $scope.PROMOTE_OPTIONS = PROMOTE_OPTIONS;

    $scope.accessCode = $routeParams.accessCode;

  	$scope.newPayment = new model.Payment();
  	$scope.newPayment.registrar = $routeParams.username;
    $scope.newPayment.staffId = $routeParams.staffId;
    $scope.multiplier = 1; // -1 implies that this payment is a correction

    $scope.Users = Users;
    $scope.username = $routeParams.username;
    $scope.dict = Lang.getDict();

    var reports = {};
    var classCouncils = {};


    var staffId = $routeParams.staffId === "0" ? "staff_U0000001" : $routeParams.staffId;
    console.log("routeParams", $routeParams);

    var data = $scope.data = {
      comments:{},
      staff:undefined,
      dcard:undefined,
      forms:Forms.all(),
      departments:Departments.getAll(),
      groups:Groups.getAll(),
      salarys:Salarys.getAll(),
      payments:[]
    };

    // var setPassing = function(student, studentsClass){
    //   var studentAverage = 0;
    //   if(reports[studentsClass].total.summary){
    //     studentAverage = reports[studentsClass].total.summary['table'][student._id][0];
    //   }
    //   student.passing = studentAverage >= classCouncils[studentsClass].passingScore;   
    // };

    Staffs.get(staffId).then(function(staff){
      console.log("Found staff:", staff);
      $scope.data.staff = staff;
      $scope.newComment = new model.Comment($routeParams.username,  $scope.data.staff._id);

      // This is for reverting data.student if user starts to edit and chooses to cancel
      var staffCopy = angular.copy($scope.data.staff);
      $scope.editing = false;
      $scope.edit = function(){
        $scope.editing = true;
      }
      $scope.cancel = function(){
        $scope.data.staff = angular.copy(staffCopy);
        $scope.editing = false;
      }

      $scope.data.staff.passing = false;
      var staffsClass = [staff.formIndex, staff.deptId, staff.groupId];
          
      if(reports.hasOwnProperty(staffsClass) &&  
        classCouncils.hasOwnProperty(staffsClass)){

        setPassing($scope.data.staff, staffsClass);

      } else {
        var reportquery = {
          reports: Marksheets.getReports({
            formIndex:staff.formIndex,
            deptId:staff.deptId,
            groupId:staff.groupId
          })
        }
        var councilquery = {
          classcouncil: ClassCouncils.get(model.ClassCouncil.generateID({
            formIndex:staff.formIndex,
            deptId:staff.deptId,
            groupId:staff.groupId
          }))
        }

        // Get reports and classCouncils
        $q.all(councilquery).then(function(data){
          console.log("all promises: ", data);
          classCouncils[staffsClass] = data.classcouncil;
        }).catch(function(error){
          if(!classCouncils[staffsClass]){
            classCouncils[staffsClass] = new model.ClassCouncil();
          }
          // console.log("Failed to load classCouncils:", error);
        });
        $q.all(reportquery).then(function(data){
          console.log("all promises: ", data);
          reports[staffsClass] = data.reports;
          setPassing($scope.data.staff, staffsClass);
        }).catch(function(error){
            // console.log("Failed to load reports", error);
        });
      }

    }).catch(function(error){
      console.log("staffsprofileCtrl Error: ",error);
    })

    Dcards.get(staffId).then(function(dcard){
      $scope.data.dcard = dcard;
    }).catch(function(error){
      console.log("Failed to get dcard", error);
    });

    staffsprofile.getComments(staffId).then(function(comments){
      $scope.data.comments = comments;
    }); 
    
    Payments.query({staffId:staffId}).then(function(payments){
      $scope.data.payments = payments;
    }).catch(function(error){
      console.log("payment error: ", error);
    });

    $scope.addPayment = function(payment, multiplier){
    	// Reformat the input from string to number
      payment.amount = payment.getAmount() * multiplier;

      payment.save().then(function(success){
        $scope.data.payments.push(payment);
        $scope.newPayment = new model.Payment();
        $scope.newPayment.registrar = $routeParams.username;
        $scope.newPayment.staffId = $routeParams.staffId;

        // This is a crappy hack to compensate for the fact that pouchdb seems
        // to be too slow to calculate this on the fly for a list of students
        $scope.data.staff.totalPaid += payment.amount;
        $scope.data.staff.save();

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
        $scope.data.comments[success.id] = $scope.newComment;
        $scope.newComment = new model.Comment($routeParams.username, $scope.data.staff._id);
      });     
    };

    $scope.removeComment = function(commentIndex){
      var comment = $scope.data.comments[commentIndex];
      staffsprofile.removeComment(comment).then(function(success){
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
      return data.salarys[data.staff.salaryId].salaryAmount + data.salarys[data.staff.salaryId].socailinsuranceAmount;
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
  StaffsprofileCtrl.$inject = ['$scope', '$routeParams', 'model', 'staffsprofile', 'Dcards', 'Users', 'Marksheets', 'ClassCouncils', '$q', 'Staffregistrar', 'Staffs', 'Salarys', 'Forms', 'Payments', 'Groups', 'Departments', 'PROMOTE_OPTIONS', 'Lang'];
  angular.module('SchoolMan').controller('StaffsprofileCtrl', StaffsprofileCtrl);
