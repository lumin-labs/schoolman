'use strict';

function Schools($q, Slug, model, Data2, modelTransformer, InsertionError, $log) {
    
    var schools = {};

    var self = {};

    self.get = function(schoolKey){
        return schools[schoolKey];
    };

    self.getAll = function(){
    	return schools;
    };

    self.remove = function(school){
        Data2.remove(school).then(function(success){
            console.log("School removed: ", success);
            delete schools[school._id];
        }).catch(function(error){
            $log.error("schools.js : remove :", error);
        });
    };

    self.load = function(){
      
      var deferred = $q.defer();

      // Load Data
      var map = function(doc, emit){
        if(doc.datatype === model.School.datatype._id){
          emit(doc._id, {_id:doc.datatype, data:doc});
        } 
      };
      Data2.query(map, {include_docs : true}).then(function(success){
          angular.forEach(success.rows, function(data, rowIndex){
              var spec = data.doc;
              var obj = model.parse(data.value.data, spec);
              var fee = modelTransformer.transform(obj, model.School);
              schools[school._id] = school;
          });
          deferred.resolve(schools);
      }).catch(function(error){
        console.log("Failed to load Schools: ", error);
        deferred.reject(error);
      });

      return deferred.promise;
    };


    return self;

  }
Schools.$inject = ['$q', 'Slug', 'model', 'Data2', 'modelTransformer', 'InsertionError', '$log'];
angular.module('SchoolMan').service('Schools', Schools);