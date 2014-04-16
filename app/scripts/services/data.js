'use strict';

angular.module('SchoolMan')
  .service('Data', function Data($timeout) {

  	var nUpdates = 0;

  	var fileWriter = null;

    var data = {};

    var self = {};

    var listeners = {};
    
    self.get = function(key, callback){
    	if(data.hasOwnProperty(key)){
    		callback(data[key]);
    	}else{
    		var emptyObj = {};
    		callback(emptyObj);
    	}

    	if(!listeners.hasOwnProperty(key)){
    		listeners[key] = [];
    	}

    	listeners[key] = callback;
    };

    self.set = function(key, obj){
    	data[key] = obj;
    	return data[key];
    };

    self.save = function(obj, callback){

    	console.log("Saving, ", obj);

    	// 1. Update data in RAM
    	angular.forEach(obj, function(d, key){
    		data[key] = d;
    	});

    	// nUpdates += 1;

    	// 2. Write data to file
	    	var content = angular.toJson(data);
		    var header  = {type:'application/json'};
		    var blob = new Blob([content]);

	    	fileWriter.onwriteend = function() {
			    if (fileWriter.length === 0) {
			        //fileWriter has been reset, write file
			        fileWriter.write(blob, header);
			    } else {
			        //file has been overwritten with blob
			        //use callback or resolve promise
			        console.log("Data", angular.fromJson(content));
			    }
			    // nUpdates = 0;

			    callback("ok");
			};

	        fileWriter.onerror = function(e) {
		        console.log('Write failed: ' + e.toString());
		    };

		    fileWriter.truncate(0);    

    };

    self.logEstimateSize = function(){
    	var total = 0;
    	angular.forEach(data,function(obj, key){
    		var msg = key + "\t\t\t\t";
    		var size = 0;
    		if(obj){
    			size = angular.toJson(obj, true).length
    		}
    		total += size;
    		var readable = (size / 1000000) + "M"
    		console.log(msg + readable);
    	});
    	console.log("Total: \t\t\t\t", (total / 1000000) + "M")

    	var d = angular.toJson(data,true);
    	console.log("Total: \t\t\t\t", (d.length / 1000000) + "M")
    	// console.log(d);
    }

    self.saveLater = function(obj, callback){

    	console.log("Save later. N updates: ", nUpdates);

    	// 1. Update data in RAM
    	angular.forEach(obj, function(d, key){
    		data[key] = d;
    	});

    	nUpdates += 1;

    	self.logEstimateSize();

    };

    self.load = function(dataFileEntryId, callback){
    	console.log("Data service loading entry: ", dataFileEntryId);
    	chrome.fileSystem.restoreEntry(dataFileEntryId, function(fileEntry){
    		
    		if(fileEntry){
				fileEntry.createWriter(function(writer){
					fileWriter = writer;
				});	

	    		fileEntry.file(function(file){
	    			var reader = new FileReader();

				    reader.onload = function(evt) {
				      var content = evt.target.result;
				      data = angular.fromJson(content);
				      callback(true);
				      // data = newData;
				      // if(content === ""){
				      // 	var blob = new Blob([angular.toJson(data)]);
				      // 	var header = {type:'application/json'};
				      // 	dataWriter.write(blob, header);
				      // 	console.log("using data template");
				      // }
				    };

				    reader.readAsText(file);
	    		});
	    	} else {
	    		callback(false);
	    	}
			
  		});	
    };

    // We were having some problem with simulataneoues writes, so we are changing 
    // to a polling method
    var poll = function(){
    	console.log("Poll");
    	$timeout(function() {
    		console.log("nUpdates: ", nUpdates);
    		if(nUpdates > 0){
    			console.log("saving " + nUpdates + " updates");
    		// 2. Write data to file
	    	var content = angular.toJson(data);
		    var header  = {type:'application/json'};
		    var blob = new Blob([content]);

	    	fileWriter.onwriteend = function() {
			    if (fileWriter.length === 0) {
			        //fileWriter has been reset, write file
			        fileWriter.write(blob, header);
			    } else {
			        //file has been overwritten with blob
			        //use callback or resolve promise
			        console.log("Data", angular.fromJson(content));
			    }
			    nUpdates = 0;
			    poll();
			};

	        fileWriter.onerror = function(e) {
		        console.log('Write failed: ' + e.toString());
		    };

		    fileWriter.truncate(0);    
		    
		    console.log("Saved, ", data);	
	    	} else {
	    		poll();
	    	}
    	}, 5000);
    }
    poll();

    return self;

  });
