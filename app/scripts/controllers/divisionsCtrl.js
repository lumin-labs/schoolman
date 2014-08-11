'use strict';

function DivisionsCtrl($scope, $q, $routeParams, Divisions, Schools, model, Data, Location, Divisionid) {

  var data = $scope.data = {
    divisions: Divisions.getAll(),
    schools: Schools.getAll(),
    regions: ["Adamoua",
              "Center Region",
              "East Region",
              "Extreme North Region",
              "Littoral",
              "North Region",
              "Northwest Region",
              "South Region",
              "Southwest Region",
              "West Region"]
  };

  var getId = function(){
    Divisionid.get().then(function(divisionid){
      data.divisionid = divisionid;
      console.log("Got divisionid", divisionid);
      $scope.newDivision.id = divisionid.value;
    });
  }
  // console.log("Divisions:", $scope.data.divisions);
  $scope.open = Location.open;
  $scope.newDivision = new model.Division();
  getId();

  $scope.countSchools = function(division){    
    var count = 0;
    angular.forEach(data.schools, function(school, schoolId){
      if(school.division === division.name){
        count += 1;
      }
    });
    return count;
  }
  $scope.add = function(division){
    Divisionid.save(data.divisionid);
    division.save().then(function(success){
        console.log("Save division: ", success);
        $scope.showValidaton = false;
        Divisions.set(division);
        $scope.newDivision = new model.Division();
        getId();
    }).catch(function(error){
        $scope.showValidation = true;
        console.log("Failed to save division: ", error);
    })
  }
  $scope.remove = function(division){
     Divisions.remove(division); 
  }

}
DivisionsCtrl.$inject = ['$scope', '$q', '$routeParams', 'Divisions', 'Schools', 'model', 'Data', 'Location', 'Divisionid'];
angular.module('SchoolMan').controller('DivisionsCtrl', DivisionsCtrl);
