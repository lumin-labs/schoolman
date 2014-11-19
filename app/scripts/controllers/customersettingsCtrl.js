'use strict';
define(['settings'], function(settings){
   function SettingsCtrl($scope, Data2, model, $routeParams, settings) {
  	
  	// $scope.roles = model.User.roles;
    $scope.settings = settings.get();
    $scope.accessCode = $routeParams.accessCode;

    $scope.availableModules = settings.availableModules();
    console.log("Available Modules:", $scope.availableModules);
    console.log("Settings:", $scope.settings);

  	$scope.toggle = function(module){
        var index = $scope.settings.modules.indexOf(module);
        if(index > -1){
          delete $scope.settings.modules[index];
        } else {
          $scope.settings.modules.push(module);
        }
        
  		$scope.settings.save().then(function(success){
  			console.log("Settings saved", $scope.settings);
  		}) 
  	}
  };
  SettingsCtrl.$inject = ['$scope', 'Data2', 'model', '$routeParams', 'settings'];
  angular.module('SchoolMan').controller('SettingsCtrl', SettingsCtrl);
});