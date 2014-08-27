'use strict';

function InspectoratePayments($q, Slug, model, Data2, modelTransformer, InsertionError, $log) {
    
    var payments = {};

    var self = {};

    self.get = function(inspectorateId){
      var collection = [];
      angular.forEach(payments,function(payment,paymentId){
        if(payment.inspectorateId === inspectorateId){
          collection.push(payment);
        }
      }) 
        return collection;
    };
    self.set = function(payment,key){
      payments[key] = payment;
    }

    self.getAll = function(){
      return payments;
    };

    self.load = function(){
      
      var deferred = $q.defer();

      // Load Data
      var map = function(doc, emit){
        if(doc.datatype === model.InspectoratePayment.datatype._id){
          emit(doc._id, {_id:doc.datatype, data:doc});
        } 
      };
      Data2.query(map, {include_docs : true}).then(function(success){
          angular.forEach(success.rows, function(data, rowIndex){
              var spec = data.doc;
              var obj = model.parse(data.value.data, spec);
              var payment = modelTransformer.transform(obj, model.InspectoratePayment);
              payments[payment._id] = payment;
          });
          deferred.resolve(payments);
      }).catch(function(error){
        console.log("Failed to load InspectoratePayments: ", error);
        deferred.reject(error);
      });

      return deferred.promise;
    };


    return self;

  }
InspectoratePayments.$inject = ['$q', 'Slug', 'model', 'Data2', 'modelTransformer', 'InsertionError', '$log'];
angular.module('SchoolMan').service('InspectoratePayments', InspectoratePayments);