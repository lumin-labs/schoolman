'use strict';

function Inspectorates($q, Slug, model, Data2, modelTransformer, InsertionError, $log) {
    
    var inspectorates = {};

    var self = {};

    self.get = function(insName){
        return inspectorates[insName];
    };

    self.getAll = function(){
    	return inspectorates;
    };
    self.set = function(inspectorate){
      inspectorates[inspectorate._id] = inspectorate;
    };

    self.remove = function(inspectorate){
        Data2.remove(inspectorate).then(function(success){
            console.log("inspectorates removed: ", success);
            delete inspectorates[inspectorate._id];
        }).catch(function(error){
            $log.error("inspectorates.js : remove :", error);
        });
    };

    self.load = function(){
      
      var deferred = $q.defer();

      // Load Data
      var map = function(doc, emit){
        if(doc.datatype === model.Inspectorate.datatype._id){
          emit(doc._id, {_id:doc.datatype, data:doc});
        } 
      };
      Data2.query(map, {include_docs : true}).then(function(success){
          angular.forEach(success.rows, function(data, rowIndex){
              var spec = data.doc;
              var obj = model.parse(data.value.data, spec);
              var inspectorate = modelTransformer.transform(obj, model.Inspectorate);
              inspectorates[inspectorate._id] = inspectorate;
          });
          deferred.resolve(inspectorates);
      }).catch(function(error){
        console.log("Failed to load Inspectorates: ", error);
        deferred.reject(error);
      });

      return deferred.promise;
    };


    return self;

  }
Inspectorates.$inject = ['$q', 'Slug', 'model', 'Data2', 'modelTransformer', 'InsertionError', '$log'];
angular.module('SchoolMan').service('Inspectorates', Inspectorates);