'use strict';

angular.module('SchoolMan')
  .controller('GroupsCtrl', function ($scope, Groups, model, Forms, Registrar) {
    
    $scope.newGroup = new model.Group();
    
    $scope.groups = Groups.getAll();
    $scope.forms = Forms.all();

    $scope.add = function(group){
    	if(model.isValid(group)){
            group.save().then(function(success){
                console.log("Success: saved group", success);
                $scope.groups[group._id] = group;
                $scope.newGroup = new model.Group();
            }).catch(function(error){
                console.log("Error: unable to save group", error);
            });
    	} else {
            console.log("Model not valid", group);
        }
    };

    $scope.remove = function(group){
    	Groups.remove(group);
    };

    var allStudents = Registrar.getAllStudents();
    $scope.getStudentsByGroup = function(groupKey){
        return allStudents.filter(function(student){
            return student.group === groupKey;
        });
    };

  });
