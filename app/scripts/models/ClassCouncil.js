'use strict';

var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  model.datatypes.classcouncil = {
    v1:{
      type:"schema",
      _id:"datatype/classcouncil/v1",
      fields:[{
        key:"classId",
        type:"string",
        required:true
      },{
        key:"academicRemark",
        type:"string",
        required:true
      },{
        key:"conductRemark",
        type:"string",
        required:true
      },{
        key:"possibleFactors",
        type:"string",
        required:false
      },{
        key:"classMaster",
        type:"string",
        required:false
      }],
      fields_key:0
    }
  };

  function ClassCouncil(){
    

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof ClassCouncil)) {
      return new ClassCouncil();
    }

    this.classId = "";
    this.academicRemark = "";
    this.conductRemark = "";
    this.possibleFactors = "";
    this.classMaster = "";
  }

  ClassCouncil.prototype = new model.Model();
  ClassCouncil.prototype.datatype = ClassCouncil.datatype = model.datatypes.classcouncil.v1;

  model.ClassCouncil = ClassCouncil;

}]);
 