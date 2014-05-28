'use strict';

var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){



  function ClassCouncil(){
    

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof ClassCouncil)) {
      return new ClassCouncil();
    }

    this.is("classcouncil.v1");

    var val = this.val.bind(this); var required = true;

    this[ val ('formIndex : number', required)] = 0;
    this[ val ('deptId : string', required)] = "";
    this[ val ('groupId : string', required)] = "";
    this[ val ('academicRemark : string')] = "";
    this[ val ('conductRemark : string')] = "";
    this[ val ('classMaster : string')] = "";
    

    this.formIndex = 0;
    this.deptId = "";
    this.groupId = "";
    this.academicRemark = "";
    this.conductRemark = "";
    this.possibleFactors = "";
    this.classMaster = "";
  }

  ClassCouncil.prototype.generateID = function(){
        var id = "council_" + this.formIndex + "_" + this.deptId + "_" + this.groupId;
        return id;
  }

  ClassCouncil.prototype = new model.Model();
  //ClassCouncil.prototype.datatype = ClassCouncil.datatype = model.datatypes.classcouncil.v1;

  model.ClassCouncil = ClassCouncil;

}]);
 