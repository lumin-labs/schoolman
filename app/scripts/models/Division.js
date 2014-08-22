'use strict';

var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  model.datatypes.division = {
    v1:{
      type:"schema",
      _id:"datatype/division/v1",
      fields:[{
        key:"id",
        type:"string",
        required:true
      },{
        key:"name",
        type:"string",
        required:true
      },{
        key:"region",
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
<<<<<<< HEAD
      },
      {
        key:"numMaleCycle1",
        type:"number",
        required:true
      },
      {
        key:"numMaleCycle2",
        type:"number",
        required:true
      },
      {
        key:"numFemaleCycle1",
        type:"number",
        required:true
      },
      {
        key:"numFemaleCycle2",
        type:"number",
        required:true
      },
      {
=======
      },{
>>>>>>> 52a566726f79e30d8225f5fb26b68849452a91a8
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
<<<<<<< HEAD
      },
      {
        key:"stats",
        type:"object",
        required:false
=======
>>>>>>> 52a566726f79e30d8225f5fb26b68849452a91a8
      }
      ],
      fields_key:0
    }
  };
  var schema = model.datatypes.division.v1.fields;
  
  function Division(spec){

    var spec = spec || {};

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof Division)) {
      return new Division();
    }

    this.id = "";
    this.name = ""; 
    this.region = "";
    this.numFemale = 0;
    this.numMale = 0;
    this.numFemaleCycle1 = 0;
    this.numFemaleCycle2 = 0;
    this.numMaleCycle1 = 0;
    this.numMaleCycle2 = 0;
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

  Division.prototype = new model.Model();
  Division.prototype.generateID = function(){
    var id = 'division_' + this.id;
    return id;
  }
  Division.prototype.normalize = function(){
    this._id = this.generateID();
  };
  Division.prototype.datatype = Division.datatype = model.datatypes.division.v1;

  model.Division = Division;

}]);
