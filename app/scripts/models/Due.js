'use strict';

var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){



  function Due(spec){
    spec = spec || {};

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof ClassCouncil)) {
      return new Due(spec);
    }

    this.is("due.v1");

    var val = this.val.bind(this); var required = true;

    this[ val ('id : string', required)] = "";
    this[ val ('name : string', required)] = "";
    this[ val ('description : string', required)] = "";
    this[ val ('amount : number', required)] = 0;    

    this.__init__(spec);
  }

  Due.prototype = new model.Model();

  Due.prototype.normalize = function(){
    this.formIndex = parseInt(this.formIndex);
  }
  Due.generateID = function(p){
        var id = "due_" + this.id;
        return id;
  }
  Due.prototype.generateID = function(){
    return Due.generateID(this);
  }

  
  
  model.Due = Due;

}]);
 