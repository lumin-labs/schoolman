'use strict';

angular.module('SchoolMan')
  .controller('UsersCtrl', function ($scope, $user, User) {
    
    $scope.User = User;
    $scope.tempUser = new User();

    $scope.getUsers = function(){
    	var users = [];
    	angular.forEach($user.getUsers(), function(user, username){
    		users.push(user);
    	});
    	return users;
    }

    $scope.addUser = function(){
    	$user.post($scope.tempUser);
    	$scope.tempUser = new User();
    };

    $scope.removeUser = $user.removeUser;

  });

