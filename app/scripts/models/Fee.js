'use strict';

var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  model.datatypes.fee = {
    v1:{
      type:"schema",
      _id:"datatype/fee/v1",
      fields:["name", "amount"],
      fields_key:0
    }
  };

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

  Fee.prototype = new model.Model();
  Fee.prototype.generateID = function(){
    var id = model.slugify(this.name);
    console.log("Slugified:", id);
    return id;
  }
  Fee.prototype.requiredFields  = ["name", "amount"];
  Fee.prototype.invalidValues  = ["", undefined, null];
  Fee.prototype.datatype = model.datatypes.fee.v1;

  Fee.datatype = Fee.prototype.datatype;
  // Fee.parse = function(doc){
  //   var data = {
  //     _id:doc._id,
  //     _rev:doc._rev
  //   };
  //   var spec = this.datatype;
  //   angular.forEach(spec.fields, function(field, fieldIndex){
  //     data[field] = doc[spec.fields_key][fieldIndex];
  //   });
  //   return data;
  // }


  model.Fee = Fee;

}]);
