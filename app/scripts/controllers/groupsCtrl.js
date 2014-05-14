'use strict';

angular.module('SchoolMan')
  .controller('GroupsCtrl', function ($scope, Groups, model, Forms, Registrar) {
    
    $scope.newGroup = new model.Group();
    
    $scope.groups = Groups.getAll();
    $scope.forms = Forms.all();

    console.log("Forms", $scope.forms);

    $scope.add = function(group){
    	if(group.isValid()){
    		try{
    			Groups.add(group);
    			Groups.save();
    			$scope.newGroup = new model.Group();
    		} catch(e) {
    			console.log("Could not add Group: ", e);
    		}
    	}
    };

    $scope.remove = function(group){
    	Groups.remove(group);
    	Groups.save();
    };

    var allStudents = Registrar.getAllStudents();
    $scope.getStudentsByGroup = function(groupKey){
        return allStudents.filter(function(student){
            return student.group === groupKey;
        });
    };

  });
