'use strict';

function Dues($q, Slug, model, Data2, modelTransformer, InsertionError, $log) {
    
    var dues = {};

    var self = {};

    self.get = function(dueKey){
        return dues[dueKey];
    };

    self.getAll = function(){
    	return dues;
    };

    self.remove = function(due){
        Data2.remove(due).then(function(success){
            console.log("Due removed: ", success);
            delete dues[due._id];
        }).catch(function(error){
            $log.error("dues.js : remove :", error);
        });
    };

    self.load = function(){
      
      var deferred = $q.defer();

      // Load Data
      var map = function(doc, emit){
        if(doc.datatype === model.Due.datatype._id){
          emit(doc._id, {_id:doc.datatype, data:doc});
        } 
      };
      Data2.query(map, {include_docs : true}).then(function(success){
          angular.forEach(success.rows, function(data, rowIndex){
              var spec = data.doc;
              var obj = model.parse(data.value.data, spec);
              var due = modelTransformer.transform(obj, model.Due);
              dues[due._id] = due;
          });
          deferred.resolve(dues);
      }).catch(function(error){
        console.log("Failed to load Dues: ", error);
        deferred.reject(error);
      });

      return deferred.promise;
    };


    return self;

  }
Dues.$inject = ['$q', 'Slug', 'model', 'Data2', 'modelTransformer', 'InsertionError', '$log'];
angular.module('SchoolMan').service('Dues', Dues);