'use strict';

angular.module('SchoolMan')
  .controller('UsersCtrl', function ($scope, Users, model) {
    
    $scope.User = model.User;
    $scope.tempUser = new model.User();

    $scope.getUsers = function(){
    	var users = [];
    	angular.forEach(Users.getAll(), function(user, username){
    		users.push(user);
    	});
    	return users;
    }

    $scope.addUser = function(){
    	Users.post($scope.tempUser);
    	$scope.tempUser = new model.User();
    };

    $scope.removeUser = Users.removeUser;

  });

