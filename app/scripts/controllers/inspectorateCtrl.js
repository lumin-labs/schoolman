'use strict';

function InspectoratesCtrl($scope, $q, $routeParams, Inspectorates, Schools, model, Data, Location, Inspectorateid) {

  var data = $scope.data = {
    inspectorates: Inspectorates.getAll(),
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
    Inspectorateid.get().then(function(inspectorateid){
      data.inspectorateid = inspectorateid;
      console.log("Got inspectorateid", inspectorateid);
      $scope.newInspectorate.id = inspectorateid.value;
    });
  }
  // console.log("Divisions:", $scope.data.divisions);
  $scope.open = Location.open;
  $scope.newInspectorate = new model.Inspectorate();
  console.log("newInspectorate",$scope.newInspectorate)
  getId();

  $scope.countSchools = function(inspectorate){    
    var count = 0;
    angular.forEach(data.schools, function(school, schoolId){
      if(school.inspectorate === inspectorate.name){
        count += 1;
      }
    });
    return count;
  }
  $scope.add = function(inspectorate){
    Inspectorateid.save(data.inspectorateid);
    inspectorate.save().then(function(success){
        console.log("Save inspectorate: ", success);
        $scope.showValidaton = false;
        Inspectorates.set(inspectorate);
        $scope.newInspectorate = new model.Inspectorate();
        getId();
    }).catch(function(error){
        $scope.showValidation = true;
        console.log("Failed to save inspectorate: ", error);
    })
  }
  $scope.remove = function(inspectorate){
     Inspectorates.remove(inspectorate); 
  }

}
InspectoratesCtrl.$inject = ['$scope', '$q', '$routeParams', 'Inspectorates', 'Schools', 'model', 'Data', 'Location', 'Inspectorateid'];
angular.module('SchoolMan').controller('InspectoratesCtrl', InspectoratesCtrl);
