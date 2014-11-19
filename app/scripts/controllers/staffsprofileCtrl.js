'use strict';

function StaffprofileCtrl($scope, $routeParams, Staffs, model, Lang,Salarys) {
    $scope.editing = false;
    // $scope.currentStaff = Staffs.get($routeParams.staffname);
    // $scope.editingUser = $routeParams.subpage === 'current' ? 
    //                      $scope.currentUser : Users.get($routeParams.subpage);

    var data = $scope.data = {};
    $scope.data.staff = Staffs.get($routeParams.staffId);
                        console.log("staff",$scope.data.staff);
    $scope.data.salarys = Salarys.getAll();
    // $scope.data.newPassword = "";
    // $scope.data.repeatPassword = "";
    $scope.data.verifiedStatus = "";
    $scope.accessCode = $routeParams.accessCode;
    $scope.dict = Lang.getDict();

    // $scope.data.currentPassword = "";

    $scope.status = "";
    $scope.date = new Date();

    console.log("Staff", $scope.data.staff);


    var serviceLength = function(){
        $scope.data.serviceYears = $scope.date.getFullYear()-(new Date($scope.data.staff.dateofentry)).getFullYear();
        $scope.data.serviceMonths = $scope.date.getMonth()-(new Date($scope.data.staff.dateofentry)).getMonth();

        if($scope.data.serviceMonths < 0){
            $scope.data.serviceYears -= 1;
            $scope.data.serviceMonths = 12 + $scope.data.serviceMonths;
        }

        $scope.data.retire = new Date($scope.data.staff.birth);
        
        $scope.data.retire.setYear($scope.data.retire.getFullYear() + 60);
    }

    serviceLength();

    var staffCopy = angular.copy($scope.data.staff);

    $scope.edit = function(){
        $scope.editing = true;
    }

    $scope.cancel = function(){
        $scope.data.staff = angular.copy(staffCopy);
        $scope.editing = false;
    }

     $scope.getOwed = function(){
        console.log(data.salarys[data.staff.salaryId].salaryAmount,  data.salarys[data.staff.salaryId].socialinsuranceAmount);
      return data.salarys[data.staff.salaryId].salaryAmount + data.salarys[data.staff.salaryId].socialinsuranceAmount;
    }
    // $scope.verifyMatch = function(){
    //   if($scope.data.repeatPassword === $scope.data.newPassword){
    //     $scope.data.verifiedStatus = "has-success";
    //   } else {
    //     $scope.data.verifiedStatus = "has-error"
    //   }
    // };

    // $scope.verifyStatus = function(){
    //   if($scope.data.repeatPassword.length < $scope.data.newPassword.length){
    //     $scope.data.verifiedStatus = ""
    //   } else {
    //     $scope.verifyMatch();
    //   }
    // };
    $scope.save = function(staff){
      staff.save().then(function(success){
        console.log("Staff saved", success);
        $scope.editing = false;
        serviceLength();
      }).catch(function(error){
        console.log("Failed to save staff", error);
      });
    };

    // $scope.savePassword = function(){
    //   if(model.encrypt($scope.data.currentPassword) === $scope.currentUser.password){
    //     var user = $scope.data.user;
    //     user.password = model.encrypt($scope.data.newPassword);
    //     user.save().then(function(success){
    //       $scope.status = 200;
    //     }).catch(function(error){
    //       console.log("Failed to update password", error);
    //     });
    //   } else {
    //     $scope.status = 401;
    //   }
    // }
    

  }
StaffprofileCtrl.$inject = ['$scope', '$routeParams', 'Staffs', 'model', 'Lang','Salarys'];
angular.module('SchoolMan').controller('StaffprofileCtrl', StaffprofileCtrl);