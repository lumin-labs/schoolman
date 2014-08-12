'use strict';

var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  model.datatypes.regfee = {
    v1:{
      type:"schema",
      _id:"datatype/regfee/v1",
      fields:[{
        key:"name",
        type:"string",
        required:true
      },{
        key:"amount",
        type:"number",
        required:true
      },{
        key:"division",
        type:"number",
        required:true
      },{
        key:"region",
        type:"number",
        required:true
      },{
        key:"ministry",
        type:"number",
        required:true
      }],
      fields_key:0
    }
  };

  // Constructor
  function RegFee(spec){
    spec = spec || {};

    var self = this;

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof RegFee)) {
      return new RegFee();
    }

    self.amount = "";        // string
    self.name = ""; 
    self.division = 0;
    self.region = 0;
    self.ministry = 0;

    var listeners = [];
    self.notify = function(){
      angular.forEach(listeners, function(callback, $index){
        callback();
      });
    };
    self.onChange = function(callback){
      listeners.push(callback);
    };   
  }

  RegFee.prototype = new model.Model();
  RegFee.prototype.generateID = function(){
    var id = model.slugify(this.name);
    console.log("Slugified:", id);
    return id;
  }

  RegFee.prototype.datatype = RegFee.datatype = model.datatypes.regfee.v1;


  model.RegFee = RegFee;

}]);
