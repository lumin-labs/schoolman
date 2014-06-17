'use strict';

angular.module('SchoolMan')
  .controller('MenuCtrl', function ($scope, $location, $routeParams, Location, Path, Cache, File, ClassMaster) {

    //$scope.ClassMaster = ClassMaster;
    $scope.show = {
      backButton:false
    }

  	$scope.print = function(){
  		ClassMaster.printIfReady = function(){
        window.print();
        ClassMaster.printIfReady = function(){
          return '';
        };
        return '';
      }
    }

    $scope.printAll = function(){
      ClassMaster.printVariable = true;
      /**ClassMaster.printIfReady = function(){
        window.print();
        ClassMaster.printIfReady = function(){
          return 'print-show';
        };
        return 'ng-hide';
      }*/
    };

    $scope.export = File.export;

    $scope.back = function(){
      $scope.show.backButton = false;
      $scope.open({page:'reportcard'});
    }

    $scope.logout = function(){
      Location.open({page:"login", username:null, accessCode:'teacher'});
    }

    $scope.cache = Cache.cache;

    $scope.username = $routeParams.username;

    


  	// chrome.storage.local.set({ReportCard:{initialized:true}},function(res){
  	// 	console.log(res);
  	// });

  	// Check if data has been loaded into app 
  	// chrome.storage.local.get("initialized",function(r){
  	// 	if(!r.initialized){
  	// 		$location.path('/start');
  	// 	}
  	// });


  	$scope.open = function(params){
      var newParams = angular.copy($routeParams);
      angular.forEach(params, function(param, paramKey){
        newParams[paramKey] = param;
      });
      console.log("newParams ", newParams);
      var path = Path.get(newParams);
      console.log("Open: ", path);
      $location.path(path);
    };
/**
    $scope.openModal = function ( ) {

    var modalInstance = $modal.open({
      templateUrl: 'printModal.html',
      controller: ModalInstanceCtrl,
      //size: size,
      //resolve: {
        //items: function () {
          //return $scope.items;
        //}
      //}
      });

      modalInstance.result.then(function (selectedItem) {
        //$scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
*/
    

  	// $scope.importFile = function(){
  	// 	chrome.fileSystem.chooseEntry({
			// type:"openWritableFile", 
			// suggestedName:"reportcard.data"}, 
			// function(entry){
			// 	// Save entryId in chrome.storage.local
			// 	var entryId = chrome.fileSystem.retainEntry(entry);
			// 	chrome.storage.local.set({"entryId":entryId},function(d){
			// 		chrome.storage.local.set({initialized:true});
			// 		// Location.set("form/7/subject/0/term/1");
			// 		console.log($location.path());
			// 	});
			// });
  	// }

   //  $scope.saveFile = function(){

   //  	chrome.storage.local.get("entryId", function(entryId){
  	
	  //   	// If no entryId, prompt user to select a file
	  //   	if(!angular.isString(entryId.entryId)){
	  // 			chrome.fileSystem.chooseEntry({
	  // 				type:"saveFile", 
	  // 				suggestedName:"reportcard.data"}, 
	  //   			function(entry){
	  //   				// Save entryId in chrome.storage.local
	  //   				var entryId = chrome.fileSystem.retainEntry(entry);
	  //   				chrome.storage.local.set({"entryId":entryId});
	  //   			});
		 //  	}

		 //  	// Write to file
		 //  	chrome.storage.local.get("entryId", function(entryId){
		 //  		console.log(entryId);
	  // 			chrome.fileSystem.restoreEntry(entryId.entryId, function(entry){
			// 		chrome.fileSystem.getWritableEntry(entry, function(file){
			// 			file.createWriter(function(writer){
			// 				writer.write(new Blob([angular.toJson({test:"this"})]), {type:'application/json'})
			// 			});	
			// 			console.log("Reader", file.createReader());
			// 		});
		 //  		});	
	  // 		});

  	// 	});
   //  }
  });
