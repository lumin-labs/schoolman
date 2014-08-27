'use strict';

var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  model.datatypes.inspectorate = {
    v1:{
      type:"schema",
      _id:"datatype/inspectorate/v1",
      fields:[{
        key:"id",
        type:"string",
        required:true
      },{
        key:"name",
        type:"string",
        required:true
      },{
        key:"division",
        type:"string",
        required:true
      },{
        key:"numMale",
        type:"number",
        required:true
      },{
        key:"numFemale",
        type:"number",
        required:true
      },
     {
        key:"ddName",
        type:"string",
        required:false
      },{
        key:"ddBirth",
        type:"string",
        required:false
      },{
        key:"ddPhone",
        type:"string",
        required:false
      },
      {
        key:"stats",
        type:"object",
        required:false
      }
      ],
      fields_key:0
    }
  };
  var schema = model.datatypes.inspectorate.v1.fields;
  
  function Inspectorate(spec){

    var spec = spec || {};

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof Inspectorate)) {
      return new Inspectorate();
    }

    this.id = "";
    this.name = ""; 
    this.division = "";
    this.numFemale = 0;
    this.numMale = 0;
    this.ddName = "";
    this.ddBirth = "";
    this.ddPhone = "";
    this.stats = [];

    // Initialize object with spec properties, excluding any that aren't defined above
    var self = this;
    angular.forEach(spec, function(property, key){
      self[key] = property;
    });

    // callback functions
    var listeners = [];
    this.notify =  function(msg){
      // console.log("Marksheet notifying listeners: ", listeners);
      angular.forEach(listeners, function(callback, $index){
        // console.log("callback", callback);
        callback(msg);  
      });
    };
    this.onChange = function(callback){
      // console.log("Register listener");
      listeners.push(callback);
      // console.log("Listeners", listeners);
    };
        
  };

  Inspectorate.prototype = new model.Model();
  Inspectorate.prototype.generateID = function(){
    var id = 'inspectorate_' + this.id;
    return id;
  }
  Inspectorate.prototype.normalize = function(){
    this._id = this.generateID();
  };
  Inspectorate.prototype.datatype = Inspectorate.datatype = model.datatypes.inspectorate.v1;

  model.Inspectorate = Inspectorate;

}]);
