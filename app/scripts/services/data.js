'use strict';

angular.module('SchoolMan')
  .service('Data', function Data($timeout, $log) {

    var SCHEMA = {
        "version":"",
        "users":"",
        "students":"",
        "coursecatalog":"",
        "timetable":"",
        "uid":"",
        "marksheets":"",
        "departments":"",
        "fees":"",
        "groups":""
    }

    // Change this to something that keeps track of the last time the data has changed
    // var lastUpdate = {
    //     saved = true;
    //     timestamp:341443141431;
    // }
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
                    self.logEstimateSize();  
			    }
			    nUpdates = 0;
			    callback("ok");
			};

	        fileWriter.onerror = function(e) {
		        console.log('Write failed: ' + e.toString());
		    };

		    fileWriter.truncate(0);  

    };

    self.logEstimateSize = function(){
        var textWidth = 0;
        angular.forEach(SCHEMA, function(obj, key){
            textWidth = key.length > textWidth ? key.length : textWidth;
        });

        var logLines = [];

        var humanReadable =function(n){
            var m = "";
            if(n < 1000){
                m = n + " B"
            } else if(n < 1000000){
                m = (n / 1000) + " K"
            } else {
                m = (n / 1000000) + " M"
            }

            return m;
        }

    	var total = 0;

        // $log.debug("Estimated Data Size");
        // $log.debug("-------------------");

        logLines.push("Estimated Data Size");
        logLines.push("---------------------------");

    	angular.forEach(data,function(obj, key){
            if(SCHEMA.hasOwnProperty(key)){
                var length = textWidth - key.length + 1;
                var msg = Array(length).join(" ") + key + " : ";
                var size = 0;
                if(obj){
                    size = angular.toJson(obj).length
                }
                
                var readable = humanReadable(size);
                logLines.push(msg + readable);

                total += size;
            }
            
    	});

    	logLines.push(Array(textWidth - 5 + 1).join(" ") + "Total : " + humanReadable(total));

        $log.debug(logLines.join("\n"));
       

    }

    self.saveLater = function(obj, callback){

        nUpdates += 1;

    	// 1. Update data in RAM
    	angular.forEach(obj, function(d, key){
    		data[key] = d;
    	});

    	nUpdates += 1;

    };

    self.loadFile =  function(fileEntry, callback){
        console.log("Data service loading entry: ", fileEntry);
        if(fileEntry){
            fileEntry.createWriter(function(writer){
                fileWriter = writer;
                window.fileWriter = writer;
            }); 

            fileEntry.file(function(file){
                var reader = new FileReader();

                reader.onload = function(evt) {
                  var content = evt.target.result;
                  data = angular.fromJson(content);
                  callback(true);

                  // Delete any keys listed in DELETE_OLD_KEYS
                  angular.forEach(data, function(obj, key){
                    if(!SCHEMA.hasOwnProperty(key)){
                        delete data[key];
                    }
                  });

                };

                reader.readAsText(file);
            });
        } else {
            callback(false);
        }
    };

    self.loadWorkspace = function(entryId, callback){
        console.log("Data service loading workspace: ", entryId);
        chrome.fileSystem.restoreEntry(entryId, function(dirEntry){
            console.log("restored entry", dirEntry);
            var reader = dirEntry.createReader();
            reader.readEntries(function(entries){
                var files = entries.filter(function(entry){
                    return entry.name === "schoolman.data";
                });
                if(files.length > 0){
                    self.loadFile(files[0], function(success){
                        callback(success);
                    });
                } else {
                    callback("File failed to load");
                }
            });
        });
    };

    // DEPRECATED: dont use, delete
    self.load = function(dataFileEntryId, callback){
    	console.log("Data service loading entry: ", dataFileEntryId);
    	chrome.fileSystem.restoreEntry(dataFileEntryId, function(fileEntry){
    		
    		if(fileEntry){
				fileEntry.createWriter(function(writer){
					fileWriter = writer;
                    window.fileWriter = writer;
				});	

	    		fileEntry.file(function(file){
	    			var reader = new FileReader();

				    reader.onload = function(evt) {
				      var content = evt.target.result;
				      data = angular.fromJson(content);
				      callback(true);

                      // Delete any keys listed in DELETE_OLD_KEYS
				      angular.forEach(data, function(obj, key){
                        if(!SCHEMA.hasOwnProperty(key)){
                            delete data[key];
                        }
                      });

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
    	$timeout(function() {
    		if(nUpdates > 0){
    			console.log("saving " + nUpdates + " updates");
    		    self.save({}, function(){
                   console.log("Data Saved, ", data); 
                }); 
                poll();
	    	} else {
	    		poll();
	    	}
    	}, 5000);
    }
    poll();

    window._SchoolMan = {
        Data : self
    }

    return self;

  });
