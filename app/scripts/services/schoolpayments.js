'use strict';

function SchoolPayments($q, Slug, model, Data2, modelTransformer, InsertionError, $log) {
    
    var payments = {};

    var self = {};

    self.get = function(schoolId){
      var collection = [];
      angular.forEach(payments,function(payment,paymentId){
        if(payment.schoolId === schoolId){
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
        if(doc.datatype === model.SchoolPayment.datatype._id){
          emit(doc._id, {_id:doc.datatype, data:doc});
        } 
      };
      Data2.query(map, {include_docs : true}).then(function(success){
          angular.forEach(success.rows, function(data, rowIndex){
              var spec = data.doc;
              var obj = model.parse(data.value.data, spec);
              var payment = modelTransformer.transform(obj, model.SchoolPayment);
              payments[payment._id] = payment;
          });
          deferred.resolve(payments);
      }).catch(function(error){
        console.log("Failed to load SchoolPayments: ", error);
        deferred.reject(error);
      });

      return deferred.promise;
    };


    return self;

  }
SchoolPayments.$inject = ['$q', 'Slug', 'model', 'Data2', 'modelTransformer', 'InsertionError', '$log'];
angular.module('SchoolMan').service('SchoolPayments', SchoolPayments);