'use strict';

function RegFees($q, Slug, model, Data2, modelTransformer, InsertionError, $log) {
    
    var regfees = {};

    var self = {};

    self.get = function(regfeeKey){
        return regfees[regfeeKey];
    };

    self.getAll = function(){
    	return regfees;
    };

    self.remove = function(regfee){
        Data2.remove(regfee).then(function(success){
            console.log("RegFee removed: ", success);
            delete regfees[regfee._id];
        }).catch(function(error){
            $log.error("regfees.js : remove :", error);
        });
    };

    self.load = function(){
      
      var deferred = $q.defer();

      // Load Data
      var map = function(doc, emit){
        if(doc.datatype === model.RegFee.datatype._id){
          emit(doc._id, {_id:doc.datatype, data:doc});
        } 
      };
      Data2.query(map, {include_docs : true}).then(function(success){
          angular.forEach(success.rows, function(data, rowIndex){
              var spec = data.doc;
              var obj = model.parse(data.value.data, spec);
              var regfee = modelTransformer.transform(obj, model.RegFee);
              regfees[regfee._id] = regfee;
          });
          deferred.resolve(regfees);
      }).catch(function(error){
        console.log("Failed to load RegFees: ", error);
        deferred.reject(error);
      });

      return deferred.promise;
    };


    return self;

  }
RegFees.$inject = ['$q', 'Slug', 'model', 'Data2', 'modelTransformer', 'InsertionError', '$log'];
angular.module('SchoolMan').service('RegFees', RegFees);