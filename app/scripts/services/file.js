'use strict';

angular.module('SchoolMan')
  .service('File', function File(pouchdb) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var self = {};

    self.import = function(){
      chrome.fileSystem.chooseEntry({type:"openFile"}, 
        function(entry){
          entry.file(function(file){
            var reader = new FileReader();

            reader.onloadend = function(success){
              console.log("Read successful:", JSON.parse(success.target.result));
            }
            reader.onerror = function(error){
              console.log("Read failed:", error);
            }

            reader.readAsText(file);

          }).catch(function(error){
            console.log("error reading file", error)
          });
        });
    };

    self.export = function(){
      
    	var dbs = [];
    	var data = [];
      var exportDB = pouchdb.create('schoolman.exportDB');
      
      var services = [
      	{getDB:function(){return 'gths'}},
      	{getDB:function(){return 'db_students'}},
        {getDB:function(){return 'db_payments'}}
      ]

      angular.forEach(services, function(service){
      	//Collect all the databases
      	var db = service.getDB();
      	if(dbs.indexOf(db) === -1){
      		dbs.push(db);
      	}
      });
      console.log("export dbs", dbs);

      var merge = function(dbs){
        PouchDB.replicate(dbs[0], exportDB, function(err,resp){
          if(err){
            console.log("Failed to replicate", error);
          }
        });
        if(dbs.length === 1){
            exportDB.allDocs({include_docs:true}).then(function(success){
              data = success;
              console.log("Succesfully merged", data);
            });
          } else if(dbs.length > 1){
            merge(dbs.slice(1));
          } 
      };
      merge(dbs);

      chrome.fileSystem.chooseEntry({
        type:"saveFile", 
        suggestedName:"schoolman.data"}, 
        function(entry){
          entry.createWriter(function(fileWriter){
            fileWriter.onwriteend = function(error) {
              if(fileWriter.length === 0){
                fileWriter.write(blob);
              } else{
                console.log('Write completed.');
              }
            };

            fileWriter.onerror = function(error) {
              console.log('Write failed: ' + error);
            };

            var blob = new Blob([JSON.stringify(data.rows)], {type: 'text/plain'});

            fileWriter.truncate(0);
                        
          }).catch(function(error){
            console.log("error creating writer", error)
          });
          
          // Save entryId in chrome.storage.local
          // var entryId = chrome.fileSystem.retainEntry(entry);
          // chrome.storage.local.set({"dataFileEntryId":entryId},function(d){
          //     console.log("Stored entry id: ", entryId);
          //     chrome.storage.local.set({"initialized":"true"});
          //     $scope.loadData();
          // });
        });

    };
    window._export = self.export;
    return self;
  });
