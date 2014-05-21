'use strict';

angular.module('SchoolMan')
  .service('Fees', function Fees(Slug, model, Data2, modelTransformer, InsertionError, $log) {
    
    var fees = {};

    var self = {};

    self.get = function(feeKey){
        return fees[feeKey];
    };

    self.getAll = function(){
    	return fees;
    };

    self.remove = function(fee){
        Data2.remove(fee).then(function(success){
            console.log("Fee removed: ", success);
            delete fees[fee._id];
        }).catch(function(error){
            $log.error("fees.js : remove :", error);
        });
    };

    self.save = function(){
    	Data.saveLater({fees:fees});
    };

    // Load Data
    var map = function(doc, emit){
      if(doc.type === model.Fee.datatype._id){
        emit(doc._id, {_id:doc.type, data:doc});
      } 
    };
    Data2.query(map, {include_docs : true}).then(function(success){
        angular.forEach(success.rows, function(data, rowIndex){
            var spec = data.doc;
            var obj = model.parse(data.value.data, spec);
            var fee = modelTransformer.transform(obj, model.Fee);
            fees[fee._id] = fee;
        });
    })


    return self;

  });
