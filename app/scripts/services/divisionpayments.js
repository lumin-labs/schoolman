'use strict';

function DivisionPayments($q, Slug, model, Data2, modelTransformer, InsertionError, $log) {
    
    var payments = {};

    var self = {};

    self.get = function(divisionId){
      var collection = [];
      angular.forEach(payments,function(payment,paymentId){
        if(payment.divisionId === divisionId){
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
        if(doc.datatype === model.DivisionPayment.datatype._id){
          emit(doc._id, {_id:doc.datatype, data:doc});
        } 
      };
      Data2.query(map, {include_docs : true}).then(function(success){
          angular.forEach(success.rows, function(data, rowIndex){
              var spec = data.doc;
              var obj = model.parse(data.value.data, spec);
              var payment = modelTransformer.transform(obj, model.DivisionPayment);
              payments[payment._id] = payment;
          });
          deferred.resolve(payments);
      }).catch(function(error){
        console.log("Failed to load DivisionPayments: ", error);
        deferred.reject(error);
      });

      return deferred.promise;
    };


    return self;

  }
DivisionPayments.$inject = ['$q', 'Slug', 'model', 'Data2', 'modelTransformer', 'InsertionError', '$log'];
angular.module('SchoolMan').service('DivisionPayments', DivisionPayments);