'use strict';

angular.module('SchoolMan')
  .controller('UsersCtrl', function ($scope, Users, model, Location) {
    
    $scope.data = {};
    $scope.data.users = Users.getAll();
    $scope.User = model.User;
    $scope.tempUser = new model.User();

    $scope.open = Location.open;

    $scope.addUser = function(){
    	$scope.tempUser.save().then(function(success){
        $scope.data.users[success.id] = $scope.tempUser;
    	  $scope.tempUser = new model.User();
      }).catch(function(error){
        console.log("Could not save user:", error);
      });
    };

    $scope.remove = Users.remove;

  });

