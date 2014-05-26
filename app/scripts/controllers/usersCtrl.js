'use strict';

angular.module('SchoolMan')
  .controller('UsersCtrl', function ($scope, Users, model) {
    
    $scope.User = model.User;
    $scope.tempUser = new model.User();
    $scope.users = Users.getAll();

    $scope.getUsers = function(){
    	return $scope.users;
    };

    $scope.addUser = function(){
    	$scope.tempUser.save().then(function(success){
        $scope.users[success.id] = $scope.tempUser;
    	  $scope.tempUser = new model.User();
      }).catch(function(error){
        console.log("Could not save user:", error);
      });
    };

    $scope.removeUser = Users.removeUser;

  });

