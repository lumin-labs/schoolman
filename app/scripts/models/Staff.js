'use strict';

var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  model.datatypes.staff = {
    v1:{
      type:"schema",
      _id:"datatype/staff/v1",
      fields:[{
        key:"id",
        type:"string",
        required:true
      },{
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
      },{
        key:"totalPaid",
        type:"number",
        required:false
      },{
        key:"birthplace",
        type:"number",
        required:false
      },{
        key:"residence",
        type:"number",
        required:false
      },{
        key:"parentOccupation",
        type:"number",
        required:false
      }],
      fields_key:0
    }
  };
  var schema = model.datatypes.staff.v1.fields;
  
  function Staff(spec){

    var spec = spec || {};

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof Staff)) {
      return new Staff();
    }

    this.id = "";
    this.name = ""; 
    this.sex = "";     // String
    this.birth = null; // Datetime integer
    this.staffName = "";
    this.staffPhone = "";
    this.staffEmail = "";
    this.formIndex = spec.formIndex || null;  //Integer
    this.deptId = spec.deptId || null; //Integer
    this.groupId = spec.groupId || null; //Integer
    this.salaryId = spec.feeId || null;
    this.status= {     //year:int (index of option in conf.js PROMOTION_OPTIONS)
      2014:0
    }; 
    this.totalPaid = 0; // payment aggregator because pouchdb is too slow to compute a list of student payments

    // Initialize object with spec properties, excluding any that aren't defined above
    var self = this;
    angular.forEach(spec, function(property, key){
      self[key] = property;
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

  Staff.prototype = new model.Model();
  Staff.prototype.generateID = function(){
    var id = 'staff_' + this.id;
    return id;
  }
  Staff.prototype.normalize = function(){
    this._id = this.generateID();
  };
  Staff.prototype.datatype = Staff.datatype = model.datatypes.staff.v1;
  Staff.prototype.setStatus = function(year, status){
    this.status[year] = status;
    this.save();
  }

  Staff.prototype.db = Staff.db = "db_staffs";

  model.Staff = Staff;

}]);
