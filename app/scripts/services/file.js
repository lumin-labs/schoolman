'use strict';

angular.module('SchoolMan')
  .service('File', function File(pouchdb) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var self = {};

    self.import = function(){
      var data = [];
      /*PouchDB.destroy('schoolman.importDB', function(err, info){
        if(err){
          console.log("importDB not deleted", err);
        }
      });
      var importDB = pouchdb.create('schoolman.importDB');
      */

      chrome.fileSystem.chooseEntry({type:"openFile"}, 
        function(entry){
          entry.file(function(file){
            var reader = new FileReader();

            reader.onloadend = function(success){
              var data = JSON.parse(success.target.result);
              console.log("Read successful.", data);
              saveToDB(data);
            }
            reader.onerror = function(error){
              console.log("Read failed:", error);
            }

            reader.readAsText(file);

          }).catch(function(error){
            console.log("error reading file", error)
          });
      });
      var saveToDB = function(data){
        
        var docList = [];
        var studentList = [];
        var paymentList = [];
        var docDB = pouchdb.create('gths');
        var studentDB = pouchdb.create('db_students');
        var paymentDB = pouchdb.create('db_payments');
        
        angular.forEach(data, function(item, itemKey){
          if(item.doc.datatype === "datatype/student/v1"){
            studentList.push(item.doc);
          }
          else if(item.doc.datatype === "datatype/payments/v1"){
            paymentList.push(item.doc);
          }
          else {
            docList.push(item.doc);
          }
        });
        docDB.bulkDocs({docs: docList}).then(function(success){
          docDB.allDocs({include_docs:true}).then(function(success){
            console.log("Doc DB All Docs:", success);
          }, function(error){
            console.log("error getting docs", error);
          });
        }).catch(function(error){
          console.log("Error saving to Import DB:", error);
        });
        studentDB.bulkDocs({docs: studentList}).then(function(success){
          studentDB.allDocs({include_docs:true}).then(function(success){
            console.log("Student DB All Docs:", success);
          }, function(error){
            console.log("error getting docs", error);
          });
        }).catch(function(error){
          console.log("Error saving to Import DB:", error);
        });
        paymentDB.bulkDocs({docs: paymentList}).then(function(success){
          paymentDB.allDocs({include_docs:true}).then(function(success){
            console.log("Payment DB All Docs:", success);
          }, function(error){
            console.log("error getting docs", error);
          });
        }).catch(function(error){
          console.log("Error saving to Import DB:", error);
        });
      }
    }

    self.export = function(){
      
    	var dbs = [];
    	var data = [];
      //PouchDB.destroy('schoolman.exportDB', function(err, info){
        //if(err){
          //console.log("exportDB not deleted", err);
        //}
      //});
      //var exportDB = pouchdb.create('schoolman.exportDB');
      
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

      var merge = function(dbs){
        pouchdb.create(dbs[0]).allDocs({include_docs:true}).then(function(success){
          data = data.concat(success.rows);
          if(dbs.length === 1){
            console.log("Merge successful:", data);
            writeData(JSON.stringify(data));
          }
          else if(dbs.length > 1){
            merge(dbs.slice(1));
          }
        });
      }
      merge(dbs);

    }
    var writeData = function(data){
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

            var blob = new Blob([data], {type: 'text/plain'});

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
    }

    window._export = self.export;
    return self;
  });
