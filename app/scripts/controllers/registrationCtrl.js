'use strict';
function RegistrationCtrl($scope, $routeParams,  Uid, Forms, Departments, Groups, Fees, Location, model, Students) {

    $scope.formIndex = $routeParams.formIndex;
    $scope.showValidaton = false;

    var data = $scope.data = {
    	forms:Forms.all(),
    	departments:Departments.getAll(),
    	groups:Groups.getAll(),
    	fees:Fees.getAll(),
        uid:null
    };
    // angular.forEach()

    $scope.newStudent = new model.Student();
    console.log("NewStudent", $scope.newStudent);
    Uid.get().then(function(uid){
        data.uid = uid;
        console.log("Got Uid", uid);
        $scope.newStudent.id = uid.value;
    })

    $scope.add = function(student){
        student.save().then(function(success){
            Uid.save(data.uid);
            console.log("Save student: ", success);
            Location.open({page:"registrarProfile", studentId:student._id});
            $scope.showValidaton = false;
            Students.set(student);
        }).catch(function(error){
            $scope.showValidation = true;
            console.log("Failed to save student: ", error);
        })
    }

    $scope.clearForm = function(student){
        student.formIndex = null;
        student.deptId = null;
        student.groupId = null;
        student.feeId = null;
        student.name = "";
        student.birth = null;
        student.sex = "";
        student.parentName = "";
        student.parentPhone = "";
        student.parentEmail = "";
    }






  }
  RegistrationCtrl.$inject = ['$scope', '$routeParams', 'Uid', 'Forms', 'Departments', 'Groups', 'Fees', 'Location', 'model', 'Students'];
  angular.module('SchoolMan').controller('RegistrationCtrl', RegistrationCtrl);

