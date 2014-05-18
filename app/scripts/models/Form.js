var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){
	function Form(spec){

    	// Protect global namespace if istantiated without 'new' keyword
      if (!(this instanceof Form)) {
        return new Form();
      }

      this.name = spec.name || ""; 
      
    
    };

    model.Form = Form;
}]);
 