'use strict';

angular.module('SchoolMan')

 .value('Department', (function(){

    // Constructor
    function Department(spec){
      spec = spec || {};

      var self = this;

      // Prevents global namespace clobbering if you istantiate this object
      // without the 'new' keyword
      if (!(this instanceof Department)) {
        return new Department();
      }

      self.code = spec.code || "";        // string
      self.name = spec.name || "";        // string
      self.forms= {
        0:1,
        1:1,
        2:1,
        3:1,
        4:1,
        5:1,
        6:1
      };
      if(spec.hasOwnProperty("forms")){
        angular.forEach(spec.forms, function(bool, formKey){
          self.forms[formKey] = bool;
        });  
      };

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

    Department.prototype.toggleForm = function(formIndex){
      this.forms[formIndex] = (this.forms[formIndex] + 1) % 2;
      this.notify();
    };

    return Department;

  })());
