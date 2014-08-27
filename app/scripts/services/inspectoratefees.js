'use strict';

function InsFees($q, Slug, model, Data2, modelTransformer, InsertionError, $log) {
    
    var insfees = {};

    var self = {};

    self.get = function(insfeeKey){
        return insfees[insfeeKey];
    };

    self.getAll = function(){
    	return insfees;
    };

    self.remove = function(insfee){
        Data2.remove(insfee).then(function(success){
            console.log("InsFee removed: ", success);
            delete insfees[insfee._id];
        }).catch(function(error){
            $log.error("insfees.js : remove :", error);
        });
    };

    self.load = function(){
      
      var deferred = $q.defer();

      // Load Data
      var map = function(doc, emit){
        if(doc.datatype === model.InsFee.datatype._id){
          emit(doc._id, {_id:doc.datatype, data:doc});
        } 
      };
      Data2.query(map, {include_docs : true}).then(function(success){
          angular.forEach(success.rows, function(data, rowIndex){
              var spec = data.doc;
              var obj = model.parse(data.value.data, spec);
              var insfee = modelTransformer.transform(obj, model.InsFee);
              insfees[insfee._id] = insfee;
          });
          deferred.resolve(insfees);
      }).catch(function(error){
        console.log("Failed to load InsFees: ", error);
        deferred.reject(error);
      });

      return deferred.promise;
    };


    return self;

  }
InsFees.$inject = ['$q', 'Slug', 'model', 'Data2', 'modelTransformer', 'InsertionError', '$log'];
angular.module('SchoolMan').service('InspectorateFees', InsFees);