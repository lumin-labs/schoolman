'use strict';

angular.module('SchoolMan')
  .service('File', function File(pouchdb) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var self = {};

    self.import = function(){

    };

    self.export = function(){
      
    	var dbs = [];
    	var data = [];
      var exportDB = pouchdb.create('schoolman.exportDB');
      
      var services = [
      	{getDB:function(){return 'gths'}},
      	{getDB:function(){return 'db_students'}}
      ]

      angular.forEach(services, function(service){
      	//Collect all the databases
      	var db = service.getDB();
      	if(dbs.indexOf(db) === -1){
      		dbs.push(db);
      	}
      });

    	var merge = function(dbs){
    		PouchDB.replicate(dbs[0], 'schoolman.exportDB').then(function(info){
  				if(dbs.length === 1){
    				exportDB.allDocs({include_docs:true}).then(function(success){
    					console.log("Succesfully merged", success);
    				});
  				} else if(dbs.length > 1){
  					merge(dbs.slice(1));
  				}
    		}).catch(function(error){
    			console.log("Failed to replicate", error);
    		});    	
    	};
    	merge(dbs);


    };
    window._export = self.export;
    return self;
  });
