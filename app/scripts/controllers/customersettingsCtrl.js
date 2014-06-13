'use strict';

angular.module('SchoolMan')
  .controller('CustomerCtrl', function ($scope, Data2, model, settings, $routeParams) {
  	
  	$scope.roles = model.User.roles;
    $scope.settings = settings.get();
    $scope.accessCode = $routeParams.accessCode;

  	$scope.toggle = function(role){
  		$scope.settings.access[role] = ($scope.settings.access[role] + 1) % 2;
  		$scope.settings.save().then(function(success){
  			console.log("Settings saved", $scope.settings);
  		}) 
  	}
  });
