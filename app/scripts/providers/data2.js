'use strict';

angular.module('SchoolMan')
  .provider('Data2', function Data2Provider() {
    
    var estimateSize = function(db){
      // Print estimated disk consumption
      // Note: I imagine allDocs does not return revisions, which may be consuming
      // orders of magnitude of allDocs
      db.allDocs({include_docs: true}, function(err, response) {
        console.log("All Docs", response);
        var dbSize = angular.toJson(response).length;
        var hrSize = "";
        if(dbSize > 1000000){
          hrSize = dbSize / 1000000 + " MB";
        } else if (dbSize > 1000){
          hrSize = dbSize / 1000 + " KB";
        } else {
          hrSize = dbSize + " Bytes";
        }
        console.log("Pouchdb allDocs: " + hrSize);
      });
    }
    
    this.$get = [function Data2Factory() {
        var db = new PouchDB('gths');
        window._db = db;
        estimateSize(db);

        return db
    }];

  });
