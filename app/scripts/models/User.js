'use strict';

var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  model.datatypes.user = {
    v1:{
      type:"schema",
      _id:"datatype/user/v1",
      fields:[{
        key:"fullname",
        type:"string",
        required:true
      },
      {
        key:"username",
        type:"string",
        required:true
      },
      {
        key:"access",
        type:"object",
        required:true
      }],
      fields_key:0
    }
  };
    
  function User(specs){
    var self = this;
    var specs = specs || {};

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof User)) {
      return new User();
    }

    this.fullname = "";
    this.username = "";
    this.access = {
      admin:0,
      registrar:0,
      classmaster:0,
      teacher:1
    };

    angular.forEach(specs, function(prop, key){
      if(self.hasOwnProperty(key)){
        self[key] = prop; 
      }
    });
    
  };

  User.roles = {
      teacher: {name:"Teacher"},
      admin:   {name:"Administrator"},
      classmaster: {name:"Class Master"},
      registrar:{name:"Registrar"}
  }

  User.prototype = new model.Model();
  User.prototype.hasAccess = function(accessCode){
    return this.access[accessCode];
  };

  User.prototype.getHighestAccess = function(){
    var access = "";
    if(this.access.admin){
      access = "admin"
    } else if(this.access.registrar){
      access = "registrar"
    } else if(this.access.classmaster){
      access = "classmaster"
    } else {
      access = "teacher"
    }
    console.log("Getting Highest Access: ", access);
    return access
  };


  User.prototype.toggleAccess = function(accessCode){
    this.access[accessCode] = (this.access[accessCode] + 1) % 2;
    var msg = "User " + this.username + "changed access '" + accessCode +"' to " + this.access[accessCode];
    if(this.hasOwnProperty("_rev")){
      this.save();
    }
  };

  User.prototype.generateID = function(){
    var id = this.username || model.slugify(this.fullname);
    console.log("Creating user._id", this, id);
    return id;
  }
  User.prototype.datatype = User.datatype = model.datatypes.user.v1;


  model.User = User;

}]);
 