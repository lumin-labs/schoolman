'use strict';
function StaffregistrationCtrl($scope, $routeParams,  Uid, Forms, Departments, Groups, Fees, Location, model, Staffs, Marksheets, Lang) {

    $scope.formIndex = $routeParams.formIndex;
    $scope.showValidaton = false;
    $scope.dict = Lang.getDict();

    var data = $scope.data = {
    	forms:Forms.all(),
    	departments:Departments.getAll(),
    	groups:Groups.getAll(),
    	fees:Fees.getAll(),
        uid:null
    };
    angular.forEach()

    $scope.newStaff = new model.Staff();
    console.log("NewStaff", $scope.newStaff);
    Uid.get().then(function(uid){
        data.uid = uid;
        console.log("Got Uid", uid);
        $scope.newStaff.id = uid.value;
    })

    //update the marksheets once a student has been created -- otherwise mastersheet might
    //display incorrect totals
    var updateMarksheets = function(staff){
        var params = {
            formIndex: staff.formIndex,
            deptId: staff.deptId,
            groupId: staff.groupId
        }
        Marksheets.query(params).then(function(marksheets){
            angular.forEach(marksheets, function(marksheet, marksheetId){
                marksheet.table[staff._id] = ["","","","","",""];
                marksheet.save().then(function(success){
                }).catch(function(error){
                    console.log("Error saving marksheet with new staff", error);
                })
            })
        }).catch(function(error){
            console.log("Failed to retreive marksheets", error);
        })
    }

    $scope.add = function(staff){
        staff.save().then(function(success){
            Uid.save(data.uid);
            console.log("Save staff: ", success);
            Location.open({page:"registrarProfile", staffId:staff._id});
            $scope.showValidaton = false;
            Staffs.set(staff);
            updateMarksheets(staff);
        }).catch(function(error){
            $scope.showValidation = true;
            console.log("Failed to save staff: ", error);
        })
    }



    $scope.clearForm = function(staff){
        staff.formIndex = null;
        staff.deptId = null;
        staff.groupId = null;
        staff.feeId = null;
        staff.name = "";
        staff.birth = null;
        staff.sex = "";
        staff.parentName = "";
        staff.parentPhone = "";
        staff.parentEmail = "";
    }






  }
  StaffregistrationCtrl.$inject = ['$scope', '$routeParams', 'Uid', 'Forms', 'Departments', 'Groups', 'Fees', 'Location', 'model', 'Staffs', 'Marksheets', 'Lang'];
  angular.module('SchoolMan').controller('StaffregistrationCtrl', StaffregistrationCtrl);

