'use strict';

function SchoolsCtrl($scope, $q, $routeParams, Schools, Schoolid, DivFees, model, Data, Location, Divisions) {

  $scope.showValidaton = false;

  var data = $scope.data = {
      schools: Schools.getAll(),
      divfees: DivFees.getAll(),
      schoolid:null,
      page: 0,
      divisions: Divisions.getAll()
  };
  // console.log("Schools:", data.schools);
  $scope.open = Location.open;

  $scope.newSchool = new model.School();
  console.log("NewSchool", $scope.newSchool);
  Schoolid.get().then(function(schoolid){
      data.schoolid = schoolid;
      console.log("Got schoolid", schoolid);
      $scope.newSchool.id = schoolid.value;
  });
  console.log("Division school", data.divisions)

  $scope.add = function(school){
      school.save().then(function(success){
          Schoolid.save(data.schoolid);
          console.log("Save school: ", success);
          Location.open({page:"schoolprofile", schoolId:school._id});
          $scope.showValidaton = false;
          Schools.set(school);
          console.log("divisions:", data.divisions);
          var div = "division_" + school.division;
          data.divisions[div].numStudents += school.numStudents;
          data.divisions[div].save().then(function(success){
            console.log("Saved divison", success);
          }).catch(function(error){
            console.log("Failed to save division", error);
          })
      }).catch(function(error){
          $scope.showValidation = true;
          console.log("Failed to save school: ", error);
      })
  }
  $scope.remove = function(school){
    Schools.remove(school);
  }
  $scope.clearForm = function(school){
      school.nameEn = "";
      school.nameFr = "";
      school.subdivision = "";
      school.numStudents = null;
  }

}
SchoolsCtrl.$inject = ['$scope', '$q', '$routeParams', 'Schools', 'Schoolid', 'DivFees', 'model', 'Data', 'Location', 'Divisions'];
angular.module('SchoolMan').controller('SchoolsCtrl', SchoolsCtrl);
