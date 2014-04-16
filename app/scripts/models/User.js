'use strict';

angular.module('SchoolMan')
  .value('User', (function(){

    var listeners = [];
    
    function User(){

      // Prevents global namespace clobbering if you istantiate this object
      // without the 'new' keyword
      if (!(this instanceof User)) {
        return new User();
      }

      this.fullname = "";
      this.username = "";
      this.access = {
        admin:0,
        classmaster:0,
        teacher:1
      };
      
    };

    User.prototype.hasAccess = function(accessCode){
      return this.access[accessCode];
    };

    User.prototype.toggleAccess = function(accessCode){
      this.access[accessCode] = (this.access[accessCode] + 1) % 2;
      var msg = "User " + this.username + "changed access '" + accessCode +"' to " + this.access[accessCode];
      this.callback(msg);
    };

    User.prototype.callback = function(msg){
      angular.forEach(listeners, function(callback, $index){
        callback(msg);  
      });
    };

    User.prototype.onChange = function(callback){
      listeners.push(callback);
    };

    return User;

  })());
