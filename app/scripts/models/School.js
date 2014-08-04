'use strict';

var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  model.datatypes.school = {
    v1:{
      type:"schema",
      _id:"datatype/school/v1",
      fields:[{
        key:"id",
        type:"string",
        required:true
      },{
        key:"nameEn",
        type:"string",
        required:true
      },{
        key:"nameFr",
        type:"string",
        required:true
      },{
        key:"division",
        type:"string",
        required:true
      },{
        key:"subdivision",
        type:"string",
        required:true
      },{
        key:"numStudents",
        type:"number",
        required:true
      },{
        key:"dues",
        type:"object",
        required:true
      }],
      fields_key:0
    }
  };
  var schema = model.datatypes.school.v1.fields;
  
  function School(spec){

    var spec = spec || {};

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof School)) {
      return new School();
    }

    this.id = "";
    this.nameEn = ""; 
    this.nameFr = "";     // String
    this.division = ""; // Datetime integer
    this.subdivision = "";
    this.numStudents = 0;
    this.dues = {};

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

  School.prototype = new model.Model();
  School.prototype.generateID = function(){
    var id = 'school_' + this.id;
    return id;
  }
  School.prototype.normalize = function(){
    this._id = this.generateID();
  };
  School.prototype.datatype = School.datatype = model.datatypes.school.v1;

  model.School = School;

}]);
