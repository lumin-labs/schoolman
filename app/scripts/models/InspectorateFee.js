'use strict';

var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  model.datatypes.insfee = {
    v1:{
      type:"schema",
      _id:"datatype/insfee/v1",
      fields:[{
        key:"name",
        type:"string",
        required:true
      },{
        key:"amount",
        type:"number",
        required:true
      },{
        key:"inspectorate",
        type:"number",
        required:true
      },{
        key:"division",
        type:"number",
        required:true
      }],
      fields_key:0
    }
  };

  // Constructor
  function InsFee(spec){
    spec = spec || {};

    var self = this;

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof InsFee)) {
      return new InsFee();
    }

    self.amount = "";        // string
    self.name = ""; 
    self.inspectorate = 0;
    self.division = 0;
 
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

  InsFee.prototype = new model.Model();
  InsFee.prototype.generateID = function(){
    var id = model.slugify(this.name);
    console.log("Slugified:", id);
    return id;
  }

  InsFee.prototype.datatype = InsFee.datatype = model.datatypes.insfee.v1;


  model.InsFee = InsFee;

}]);
