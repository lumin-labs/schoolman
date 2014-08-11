'use strict';

function Divisions($q, Slug, model, Data2, modelTransformer, InsertionError, $log) {
    
    var divisions = {};

    var self = {};

    self.get = function(divName){
        return divisions[divName];
    };

    self.getAll = function(){
    	return divisions;
    };
    self.set = function(division){
      divisions[division._id] = division;
    };

    self.remove = function(division){
        Data2.remove(division).then(function(success){
            console.log("Division removed: ", success);
            delete divisions[division._id];
        }).catch(function(error){
            $log.error("divisions.js : remove :", error);
        });
    };

    self.load = function(){
      
      var deferred = $q.defer();

      // Load Data
      var map = function(doc, emit){
        if(doc.datatype === model.Division.datatype._id){
          emit(doc._id, {_id:doc.datatype, data:doc});
        } 
      };
      Data2.query(map, {include_docs : true}).then(function(success){
          angular.forEach(success.rows, function(data, rowIndex){
              var spec = data.doc;
              var obj = model.parse(data.value.data, spec);
              var division = modelTransformer.transform(obj, model.Division);
              divisions[division._id] = division;
          });
          deferred.resolve(divisions);
      }).catch(function(error){
        console.log("Failed to load Divisions: ", error);
        deferred.reject(error);
      });

      return deferred.promise;
    };


    return self;

  }
Divisions.$inject = ['$q', 'Slug', 'model', 'Data2', 'modelTransformer', 'InsertionError', '$log'];
angular.module('SchoolMan').service('Divisions', Divisions);