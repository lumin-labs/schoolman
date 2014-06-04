'use strict';

var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  model.datatypes.student = {
    v1:{
      type:"schema",
      _id:"datatype/student/v1",
      fields:[{
        key:"name",
        type:"string",
        required:true
      },{
        key:"sex",
        type:"string",
        required:true
      },{
        key:"birth",
        type:"string",
        required:true
      },{
        key:"parentName",
        type:"string",
        required:true
      },{
        key:"parentPhone",
        type:"string",
        required:true
      },{
        key:"parentEmail",
        type:"string",
        required:true
      },{
        key:"formIndex",
        type:"string",
        required:true
      },{
        key:"deptId",
        type:"string",
        required:true
      },{
        key:"groupId",
        type:"string",
        required:true
      },{
        key:"feeId",
        type:"string",
        required:true
      },{
        key:"status",
        type:"object",
        required:true
      }],
      fields_key:0
    }
  };
  var schema = model.datatypes.student.v1.fields;
  
  function Student(spec){

    var spec = spec || {};

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof Student)) {
      return new Student();
    }

    this.name = ""; 
    this.sex = "";     // String
    this.birth = null; // Datetime integer
    this.parentName = "";
    this.parentPhone = "";
    this.parentEmail = "";
    this.formIndex = spec.formIndex || null;  //Integer
    this.deptId = spec.deptId || null; //Integer
    this.groupId = spec.groupId || null; //Integer
    this.feeId = spec.feeId || null;
    this.status= {     //year:int (index of option in conf.js PROMOTION_OPTIONS)
      2014:0
    }; 

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


  Student.prototype = new model.Model();
  Student.prototype.datatype = Student.datatype = model.datatypes.student.v1;
  Student.prototype.setStatus = function(year, status){
    this.status[year] = status;
    this.save();
  }

  model.Student = Student;

}]);
