'use strict';
define(['settings'], function(settings){
   function SettingsCtrl($scope, Data2, model, $routeParams, settings) {
  	
  	$scope.roles = model.User.roles;
    $scope.settings = settings.get();
    $scope.accessCode = $routeParams.accessCode;

  	$scope.toggle = function(role){
  		$scope.settings.access[role] = ($scope.settings.access[role] + 1) % 2;
  		$scope.settings.save().then(function(success){
  			console.log("Settings saved", $scope.settings);
  		}) 
  	}
  };
  SettingsCtrl.$inject = ['$scope', 'Data2', 'model', '$routeParams', 'settings'];
  angular.module('SchoolMan').controller('SettingsCtrl', SettingsCtrl);
});