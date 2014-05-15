'use strict';

angular.module('SchoolMan')
  .controller('Loading2Ctrl', function ($scope, $location, Data) {
    
    // Assume the user has a workspace and that it's available
    $scope.status = {
    	hasWorkspace:true,
    	workspaceAvailable:true
    }

  	$scope.openWorkspace = function(){
  		chrome.fileSystem.chooseEntry({
				type:"openDirectory"}, 
				function(entry){
					// Save entryId in chrome.storage.local
					var entryId = chrome.fileSystem.retainEntry(entry);
					chrome.storage.local.set({"workspace":entryId},function(d){
						console.log("Stored entry id: ", entryId);
					});
				});
		 };

  	chrome.storage.local.get('workspace', function(obj){
  		if(angular.equals(obj, {})){
  			$scope.$apply($scope.status.hasWorkspace = false);
  			console.log($scope.status);
  		} else {
  			Data.loadWorkspace(obj.workspace, function(success){
          if(success){
              $scope.$apply($location.path("/login/null/teacher"));
            } else {
              $scope.status.hasWorkspace = false;
              console.log("Loading Failed");
            }
        });
  		}
  	});

  });
