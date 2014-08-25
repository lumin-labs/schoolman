'use strict';

var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  function SchoolInfo(spec){
    spec = spec || {};

    if (!(this instanceof SchoolInfo)) {
      return new SchoolInfo(spec);
    }
    
    this.is("schoolinfo.v1");

    var val = this.val.bind(this); var required = true;

    this[ val ('nameEn : string', required)] = "";
    this[ val ('nameFr : string', required)] = "";
    this[ val ('schoolyear : string', required)] = "2014/2015";
    this[ val ('version : string', required)] = "ghs";
    this[ val ('principal : string')] = "";
    this[ val ('division : string', required)] = "";
    this[ val ('subdivision : string')] = "";

    this.__init__(spec);
  };

  SchoolInfo.prototype = new model.Model();
  SchoolInfo.prototype.generateID = function(){
    return "schoolinfo";
  };

  model.SchoolInfo = SchoolInfo;

}]);
 