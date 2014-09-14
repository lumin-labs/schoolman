'use strict';

function Transcripts($q, model, modelTransformer, pouchdb) {

  	var db = model.Transcript.db;
    if(typeof db === "string"){
      db = pouchdb.create(model.Transcript.db);
    }

  	var _transcripts = {};

  	self = {};

  	var dataModel = model.Transcript;

    self.get = function(studentId){
      var deferred = $q.defer();
      var trancriptId = "transcript_" + studentId;
      db.get(transcriptId).then(function(data){
        var spec = model.parse2(data, data.datatype);
        var transcript = new model.Transcript(spec);
        deferred.resolve(transcript);
      }).catch(function(error){
        deferred.reject(error);
      });
      return deferred.promise;
    };

    self.destroy = function(){
    	db.destroy().then(function(success){
    		console.log("Destroyed transcripts db");
    	}).catch(function(error){
    		console.log("failed to destroy transcripts db", error)
    	});
    }

    return self;
  }
  Transcripts.$inject = ['$q', 'model', 'modelTransformer', 'pouchdb'];
  angular.module('SchoolMan').service('Transcripts', Transcripts);
