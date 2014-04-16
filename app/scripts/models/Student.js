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

      // Initialize object with spec properties, excluding any that aren't defined above
      var self = this;
      angular.forEach(spec, function(property, key){
        if(self.hasOwnProperty(key)){
          self[key] = property;
        }
      });
          
    };

    Student.prototype.callback = function(msg){
      angular.forEach(listeners, function(callback, $index){
        callback(msg);  
      });
    };

    Student.prototype.onChange = function(callback){
      listeners.push(callback);
    };

    return Student;

  })());
