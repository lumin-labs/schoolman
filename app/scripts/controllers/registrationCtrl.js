'use strict';

angular.module('SchoolMan')
  .controller('RegistrationCtrl', function ($scope, $routeParams,  Uid, Forms, Departments, Groups, Fees, Location, model) {

    $scope.formIndex = $routeParams.formIndex;

    var data = $scope.data = {
    	forms:Forms.all(),
    	departments:Departments.getAll(),
    	groups:Groups.getAll(),
    	fees:Fees.getAll(),
        uid:null
    };
    angular.forEach()

    $scope.newStudent = new model.Student();
    console.log("NewStudent", $scope.newStudent);
    Uid.get().then(function(uid){
        data.uid = uid;
        console.log("Got Uid", uid);
        $scope.newStudent._id = uid.value;
    })

    $scope.add = function(student){
        student.save().then(function(success){
            Uid.save(data.uid);
            console.log("Save student: ", success);
            Location.open({page:"registrarProfile", studentId:student._id});
        }).catch(function(error){
            console.log("Failed to save student: ", error);
        })
    }






  });
