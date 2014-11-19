'use strict';
function StaffregistrationCtrl($scope, $routeParams,  Staffid,Departments, Groups, Salarys, Location, model, Staffs, Marksheets, Lang) {

    // $scope.formIndex = $routeParams.formIndex;
    $scope.showValidaton = false;
    $scope.dict = Lang.getDict();
    

    var data = $scope.data = {
    	// forms:Forms.all(),
    	departments:Departments.getAll(),
    	groups:Groups.getAll(),
    	salarys:Salarys.getAll(),
        uid:null
    };
    angular.forEach()

    $scope.newStaff = new model.Staff();
    console.log("NewStaff", $scope.newStaff);
    Staffid.get().then(function(uid){
        data.uid = uid;
        console.log("Got Staffid", uid);
        $scope.newStaff.id = uid.value;
    })

    //update the marksheets once a student has been created -- otherwise mastersheet might
    //display incorrect totals
    // var updateMarksheets = function(staff){
    //     var params = {
    //         formIndex: staff.formIndex,
    //         deptId: staff.deptId,
    //         groupId: staff.groupId
    //     }
    //     Marksheets.query(params).then(function(marksheets){
    //         angular.forEach(marksheets, function(marksheet, marksheetId){
    //             marksheet.table[staff._id] = ["","","","","",""];
    //             marksheet.save().then(function(success){
    //             }).catch(function(error){
    //                 console.log("Error saving marksheet with new staff", error);
    //             })
    //         })
    //     }).catch(function(error){
    //         console.log("Failed to retreive marksheets", error);
    //     })
    // }

    $scope.add = function(staff){
        staff.save().then(function(success){
            Staffid.save(data.uid);
            console.log("Save staff: ", success);
            Location.open({page:"staffprofile", staffId:staff._id});
            $scope.showValidaton = false;
            Staffs.set(staff);
            // updateMarksheets(staff);
        }).catch(function(error){
            $scope.showValidation = true;
            console.log("Failed to save staff: ", error);
        })
    }



    $scope.clearForm = function(staff){
        // staff.formIndex = null;
        staff.deptId = null;
        staff.groupId = null;
        staff.salaryId = null;
        staff.name = "";
        staff.birth = null;
        staff.sex = "";
        // staff.parentName = "";
        staff.phoneNo = "";
        staff.staffEmail = "";
        staff.matricalnumber="";
        staff.grade="";
        staff.highestgualification="";
        staff.entryintopublicservice=null;
        staff.lengthofservice=null;
        staff.dateofretirement=null;
        staff.dutypost="";
        staff.maritalstatus="";
        staff.subdivisionoforigin="";
        staff.divisionoforigin="";

     }


 var serviceLength = function(){
        $scope.data.serviceYears = $scope.date.getFullYear()-(new Date($scope.data.user.dateofentry)).getFullYear();
        $scope.data.serviceMonths = $scope.date.getMonth()-(new Date($scope.data.user.dateofentry)).getMonth();

        if($scope.data.serviceMonths < 0){
            $scope.data.serviceYears -= 1;
            $scope.data.serviceMonths = 12 + $scope.data.serviceMonths;
        }

        $scope.data.retire = new Date($scope.data.user.birth);
        
        $scope.data.retire.setYear($scope.data.retire.getFullYear() + 60);
    }

    // serviceLength();



  }
  StaffregistrationCtrl.$inject = ['$scope', '$routeParams', 'Staffid', 'Departments', 'Groups', 'Salarys', 'Location', 'model', 'Staffs', 'Marksheets', 'Lang'];
  angular.module('SchoolMan').controller('StaffregistrationCtrl', StaffregistrationCtrl);

