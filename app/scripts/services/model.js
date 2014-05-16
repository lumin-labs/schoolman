'use strict';

angular.module('SchoolMan')
  .service('model', function model(Slug, Data2) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var model = {};

//==============================================================================

    function Model(){};

    // This function lets you ask if the object has all the required fields
    // TODO: the config for which fields are required should probably be done 
    // elsewhere
    Model.prototype.isValid = function(){
      var self = this;
      var isOk = true;
      angular.forEach(self.requiredFields, function(field, fieldIndex){
        // if the current value of the field is some kind of null value
        if(self.invalidValues.indexOf(self[field]) > -1){
          isOk = false;
        }
      });
      return isOk;
    };

    Model.prototype.asVector = function(){
      var self = this;
      var vectorData = [];
      angular.forEach(self.vectorSchema, function(key, keyIndex){
        vectorData.push(self[key]);
      });
      return {_id:self.id, d:vectorData};
    };

    Model.prototype.save = function(){
      var self = this;
      console.log(self.asVector());
      // Data2.put(self.asVector()).then(function(response){
      //   console.log("Data2 put:", response);
      // });
    };

    
//==============================================================================

    function Form(spec){

    	// Protect global namespace if istantiated without 'new' keyword
      if (!(this instanceof Form)) {
        return new Form();
      }

      this.name = spec.name || ""; 
      
    
    };

    model.Form = Form;


//==============================================================================


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

    Group.prototype.toggleForm = function(formIndex){
      var bool = (this.forms[formIndex].active + 1) % 2
      this.forms[formIndex].active = bool; 

      var msg = this.name + " has changed: inForm(" + formIndex + ") -> " + bool; 

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

    model.Group = Group;


//==============================================================================


  function Payment(){

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof Payment)) {
      return new Payment();
    }

    this.amount = 0.00;     // decimal
    this.registrar = "";  // string
    this.date = "";       // date
  };

  Payment.prototype.requiredFields = ['amount', 'registrar'];
  Payment.prototype.invalidValues = [null, undefined, "", "0", "0.00", 0];
  Payment.prototype.isValid = Model.prototype.isValid;

  model.Payment = Payment;


//==============================================================================

  function Comment(username, studentId){
    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof Comment)) {
      return new Comment();
    }

    var date = new Date();

    this._id  = username + "/" + date;
    this.text = "";
    this.date = date;
    this.username = username;
    this.studentId = studentId;
  }

  Comment.prototype = new Model();

  Comment.prototype.requiredFields = ['_id', 'text'];
  Comment.prototype.invalidValues = [null, undefined, "", "0", "0.00", 0];

  Comment.prototype.vectorSchema = ["text", "date", "username", "studentId"]; 

  model.Comment = Comment;



//==============================================================================

    return model;
  });
