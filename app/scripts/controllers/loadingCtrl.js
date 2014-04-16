'use strict';

angular.module('SchoolMan')
  .controller('LoadingCtrl', function ($location, $scope, Data) {

  	// Check if this is the first time the software is being used
  	$scope.startup = {firstUse:null, fileFound:null};

  	var updateScope;
  	chrome.storage.local.get('initialized', function(obj){
  		updateScope = function(){
  			if(obj.initialized){
	  			$scope.startup.firstUse = false;
	  			console.log("Not First Use", obj);
	  		} else {
	  			$scope.startup.firstUse = true;
	  			console.log("First Use", obj);
	  		}	
  		};

  		$scope.$apply(updateScope());
  		
  	});


  	$scope.loadData = function(){
  		chrome.storage.local.get("dataFileEntryId", function(obj){
	  		if(obj.hasOwnProperty("dataFileEntryId")){
	  			Data.load(obj.dataFileEntryId, function(success){
	  				if(success){
	  					$scope.$apply($location.path("/login/null/teacher"));
	  				} else {
	  					$scope.startup.fileFound = false;
	  					console.log("Loading Failed");
	  					$scope.startup.firstUse = true;
	  					$scope.$apply(updateScope());
	  				}
	  			});
	  		}
	  	});
  	}

	$scope.importFile = function(){
		chrome.fileSystem.chooseEntry({
		type:"openWritableFile", 
		suggestedName:"schoolman.data"}, 
		function(entry){
			// Save entryId in chrome.storage.local
			var entryId = chrome.fileSystem.retainEntry(entry);
			chrome.storage.local.set({"dataFileEntryId":entryId},function(d){
				console.log("Stored entry id: ", entryId);
				chrome.storage.local.set({"initialized":"true"});
				$scope.loadData();
			});
		});
  	};

  	// Load the data
  	$scope.loadData();

  });
