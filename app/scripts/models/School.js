'use strict';

var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){



  function School(spec){
    spec = spec || {};

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof School)) {
      return new School(spec);
    }

    this.is("school.v1");

    var val = this.val.bind(this); var required = true;

    this[ val ('nameEn : string', required)] = "";
    this[ val ('nameFr : string', required)] = "";
    this[ val ('division : string', required)] = "";
    this[ val ('subdivision : string', required)] = "";
    this[ val ('dues : object', required)] = {};

    this.__init__(spec);
  }

  School.prototype = new model.Model();

  School.generateID = function(p){
        var id = "school_" +  this.nameEn;
        return id;
  }
  School.prototype.generateID = function(){
    return School.generateID(this);
  }
  
  model.School = School;

}]);
 