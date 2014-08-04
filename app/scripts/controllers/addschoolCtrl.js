'use strict';

function AddSchoolCtrl($scope, $q, $routeParams, Schools, Schoolid, DivFees, model, Data, Location, DIVISION) {

	$scope.showValidaton = false;

    var data = $scope.data = {
        schools: Schools.getAll(),
        divfees: DivFees.getAll(),
     	schoolid:null
    };
    $scope.open = Location.open;
    $scope.newSchool = new model.School();
    console.log("NewSchool", $scope.newSchool);
    Schoolid.get().then(function(schoolid){
        data.schoolid = schoolid;
        console.log("Got schoolid", schoolid);
        $scope.newSchool.id = schoolid.value;
    });

    $scope.add = function(school){
    	school.division = DIVISION.name;
        school.save().then(function(success){
            Schoolid.save(data.schoolid);
            console.log("Save school: ", success);
            Location.open({page:"schoolprofile", schoolId:school._id});
            $scope.showValidaton = false;
            Schools.set(school);
        }).catch(function(error){
            $scope.showValidation = true;
            console.log("Failed to save school: ", error);
        })
    }
    $scope.clearForm = function(school){
        school.nameEn = "";
        school.nameFr = "";
        school.subdivision = "";
        school.numStudents = null;
    }

  }
  AddSchoolCtrl.$inject = ['$scope', '$q', '$routeParams', 'Schools', 'Schoolid', 'DivFees', 'model', 'Data', 'Location', 'DIVISION'];
  angular.module('SchoolMan').controller('AddSchoolCtrl', AddSchoolCtrl);
