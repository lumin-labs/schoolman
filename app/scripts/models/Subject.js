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
  		this.coeff = "";
      this.en = "";
      this.fr = "";

  	};

  	return Subject;

  })());
