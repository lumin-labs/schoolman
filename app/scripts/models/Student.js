'use strict';

angular.module('SchoolMan')
  .value('Student', (function(){

    var listeners = [];
    
    function Student(spec){

      // Prevents global namespace clobbering if you istantiate this object
      // without the 'new' keyword
      if (!(this instanceof Student)) {
        return new Student();
      }
      
      this.name = "";    // String
      this.sex = "";     // String
      this.birth = null; // Datetime integer
      this.parentName = "";
      this.parentPhone = "";
      this.parentEmail = "";
      this.id = null; //Replace this with something scalable
      this.courses = [];
      this.form = null;  //Integer
      this.group = null; //Integer
      this.status= {     //year:int (index of option in conf.js PROMOTION_OPTIONS)
        2014:0
      };     

      // Initialize object with spec properties, excluding any that aren't defined above
      var self = this;
      angular.forEach(spec, function(property, key){
        if(self.hasOwnProperty(key)){
          self[key] = property;
        }
      });

      // callback functions
      var listeners = [];
      this.notify =  function(msg){
        console.log("Marksheet notifying listeners: ", listeners);
        angular.forEach(listeners, function(callback, $index){
          console.log("callback", callback);
          callback(msg);  
        });
      };
      this.onChange = function(callback){
        // console.log("Register listener");
        listeners.push(callback);
        // console.log("Listeners", listeners);
      };
          
    };

    Student.prototype.callback = function(msg){
      angular.forEach(listeners, function(callback, $index){
        callback(msg);  
      });
    };

    Student.prototype.onChange = function(callback){
      listeners.push(callback);
    };

    Student.prototype.setStatus = function(year, statusIndex){
      console.log("Setting status to " + statusIndex);
      this.status[year] = statusIndex;
      console.log("Status set to ", this.status);
      this.notify("Changed status to " + statusIndex);
    };

    return Student;

  })());
