'use strict';

function UserCtrl($scope, $routeParams, Users, model) {
  	$scope.editing = false;
  	$scope.currentUser = Users.get($routeParams.username);
    $scope.editingUser = $routeParams.subpage === 'current' ? 
                         $scope.currentUser : Users.get($routeParams.subpage);

    $scope.data = {};
    $scope.data.newPassword = "";
    $scope.data.repeatPassword = "";
    $scope.data.verifiedStatus = "";

    $scope.data.currentPassword = "";

    $scope.status = "";

    $scope.verifyMatch = function(){
    	if($scope.data.repeatPassword === $scope.data.newPassword){
    		$scope.data.verifiedStatus = "has-success";
    	} else {
    		$scope.data.verifiedStatus = "has-error"
    	}
    };

    $scope.verifyStatus = function(){
    	if($scope.data.repeatPassword.length < $scope.data.newPassword.length){
    		$scope.data.verifiedStatus = ""
    	} else {
    		$scope.verifyMatch();
    	}
    };

    $scope.save = function(){
    	if(model.encrypt($scope.data.currentPassword) === $scope.currentUser.password){
    		var user = $scope.editingUser;
    		user.password = model.encrypt($scope.data.newPassword);
        user.save().then(function(success){
    			$scope.status = 200;
    		}).catch(function(error){
    			console.log("Failed to update password", error);
    		});
    	} else {
    		$scope.status = 401;
    	}
    }

  }
UserCtrl.$inject = ['$scope', '$routeParams', 'Users', 'model'];
angular.module('SchoolMan').controller('UserCtrl', UserCtrl);