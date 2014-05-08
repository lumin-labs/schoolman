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
      this.department = null; //Integer
      this.feeGroup = "";
      this.status= {     //year:int (index of option in conf.js PROMOTION_OPTIONS)
        2014:0
      }; 

      this.payments = [];    

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

    // This function lets you ask if the object has all the required fields
    // TODO: the config for which fields are required should probably be done 
    // elsewhere
    Student.prototype.isValid = function(){
      var self = this;
      var isOk = true;
      var requiredFields = ["name"];
      var invalidValues = ["", undefined, null];
      angular.forEach(requiredFields, function(field, fieldIndex){
        // if the current value of the field is some kind of null value
        if(invalidValues.indexOf(self[field]) > -1){
          isOk = false;
        }
      });
      return isOk;
    };

    Student.prototype.addPayment = function(payment){
      if(payment.isValid()){
        payment.date = new Date();
        this.payments.push(payment);
      }
    };

    Student.prototype.totalPaid = function(){
      return this.payments.reduce(function(total, payment){
        return total + payment.amount;
      },0)
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
