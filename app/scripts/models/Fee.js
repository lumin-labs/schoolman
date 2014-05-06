'use strict';

angular.module('SchoolMan')

 .value('Fee', (function(){

    // Constructor
    function Fee(spec){
      spec = spec || {};

      var self = this;

      // Prevents global namespace clobbering if you istantiate this object
      // without the 'new' keyword
      if (!(this instanceof Fee)) {
        return new Fee();
      }

      self.amount = spec.amount || "";        // string
      self.name = spec.name || ""; 

      var listeners = [];
      self.notify = function(){
        angular.forEach(listeners, function(callback, $index){
          callback();
        });
      };
      self.onChange = function(callback){
        listeners.push(callback);
      };
      
    };

    // This function lets you ask if the object has all the required fields
    // TODO: the config for which fields are required should probably be done 
    // elsewhere
    Fee.prototype.isValid = function(){
      var self = this;
      var isOk = true;
      var requiredFields = ["name", "amount"];
      var invalidValues = ["", undefined, null];
      angular.forEach(requiredFields, function(field, fieldIndex){
        // if the current value of the field is some kind of null value
        if(invalidValues.indexOf(self[field]) > -1){
          isOk = false;
        }
      });
      return isOk;
    };

    return Fee;

  })());
