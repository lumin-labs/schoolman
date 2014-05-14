'use strict';

angular.module('SchoolMan')

 /**
  * @ngdoc object
  * @name SchoolMan.object:Group
  * @property {int} Group this is actually just the value of the last Group in the history, it is not a Group object
  * @param {array} Groups this takes as an argument a list of Group object literals e.g. as would be loaded from JSON
  * @method {function} getValidationStatus
  * @method {function} save
  * @method {function} onChange
  * @description
  *
  * A Group contains the history of Groups. It can save a new Group, validate an
  * input and notify listeners onChange
  */
  .value('Group', (function(){

    // Constructor
    function Group(){

      this.name = "";         // String
      this.code = "";
      this.forms= {           // 0 is false, 1 is true
        0:{active:1, pass:10, failBelow:10},
        1:{active:1, pass:10, failBelow:10},
        2:{active:1, pass:10, failBelow:10},
        3:{active:1, pass:10, failBelow:10},
        4:{active:1, pass:10, failBelow:10},
        5:{active:1, pass:10, failBelow:10},
        6:{active:1, pass:10, failBelow:10}
      };
      
      // Prevents global namespace clobbering if you istantiate this object
      // without the 'new' keyword
      if (!(this instanceof Group)) {
        return new Group();
      }

      var listeners = [];

      this.notify = function(msg){
        angular.forEach(listeners, function(callback, $index){
          callback(msg);
        });
      };
      this.onChange = function(callback){
        listeners.push(callback);
      };

    };

    // Returns 1 if this group is in the given form, else returns 0
    Group.prototype.inForm = function(form){
      return this.forms[form].active;
    };

    Group.prototype.toggleForm = function(form){
      var bool = (this.forms[form].active + 1) % 2
      this.forms[form] = bool; 

      var msg = this.name + " has changed: inForm(" + form + ") -> " + bool; 

      this.notify(msg);
    };

    Group.prototype.getPromoPass = function(form){
      return this.forms[form].pass;
    };

    Group.prototype.getPromoFail = function(form){
      return this.forms[form].failBelow;
    }

    Group.prototype.setPass = function(formIndex, score){
      this.forms[formIndex].pass = parseInt(score);
      this.notify("Form " + formIndex + " " + this.name + "has changed the passing score to " + score);
    }

    // This function lets you ask if the object has all the required fields
    // TODO: the config for which fields are required should probably be done 
    // elsewhere
    Group.prototype.isValid = function(){
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

    return Group;

  })());
