'use strict';

angular.module('SchoolMan')
  .value('Subject', (function(){
  	
  	function Subject(){

  		// Prevents global namespace clobbering if you istantiate this object
  		// without the 'new' keyword
  		if(!(this instanceof Subject)) {
			    return new Subject();
		  }

      this.code = "";
      this.en = "";
      this.fr = "";
      this.type = 0;

      // callback functions
      var listeners = [];
      this.notify =  function(msg){
        angular.forEach(listeners, function(callback, $index){
          callback(msg);  
        });
      };
      this.onChange = function(callback){
        listeners.push(callback);
      };

  	};

    Subject.prototype.setType = function(typeIndex){
      this.type = typeIndex;
      console.log("typeIndex", typeIndex);
      this.notify("Type changed to: ", typeIndex);
    };

  	return Subject;

  })());
