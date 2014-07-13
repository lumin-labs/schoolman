'use strict';

var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  function SchoolConfig(spec){
    
    this.is("schoolconfig.v1");


    var val = this.val.bind(this); var required = true;


    this[ val ('nameEn : string', required)] = "GOVERNMENT BILINGUAL HIGH SCHOOL ATIELA-NKWEN";
    this[ val ('nameFr : string', required)] = "LYCEE BILINGUE D'ATIELA-NKWEN";
    this[ val ('schoolyear : string', required)] = "2014/2015";
    this[ val ('version : string', required)] = "ghs";

    this.__init__(spec);
  };

  SchoolConfig.prototype = new model.Model();
  SchoolConfig.prototype.generateID = function(){
    return "schoolconfig_" + this.nameEn + "_" + this.schoolyear;
  };

  model.SchoolConfig = SchoolConfig;

}]);
 