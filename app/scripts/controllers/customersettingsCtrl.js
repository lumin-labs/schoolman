'use strict';
define(['settings'], function(settings){
   function SettingsCtrl($scope, Data2, model, $routeParams, settings) {
  	
  	$scope.roles = model.User.roles;
    $scope.settings = settings.get();
    $scope.accessCode = $routeParams.accessCode;

    $scope.availableModules = settings.availableModules();
    console.log("Available Modules:", $scope.availableModules);
    console.log("Settings:", $scope.settings);

  	$scope.toggle = function(setting){
      console.log("Toggle Setting:", setting);
      if($scope.settings.access.hasOwnProperty(setting)){
        console.log("Toggle role");
  		  $scope.settings.access[setting] = ($scope.settings.access[setting] + 1) % 2;
      } else if ($scope.availableModules.indexOf(setting) > -1){
        var index = $scope.settings.modules.indexOf(setting);
        if(index > -1){
          console.log("Deleting setting")
          delete $scope.settings.modules[index];
        } else {
          console.log("adding setting");
          $scope.settings.modules.push(setting);
        }
      }

  		$scope.settings.save().then(function(success){
  			console.log("Settings saved", $scope.settings);
  		}) 
  	}
  };
  SettingsCtrl.$inject = ['$scope', 'Data2', 'model', '$routeParams', 'settings'];
  angular.module('SchoolMan').controller('SettingsCtrl', SettingsCtrl);
});