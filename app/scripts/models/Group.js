var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  model.datatypes.group = {
    v1:{
      type:"schema",
      _id:"datatype/group/v1",
      fields:[{
        key:"name",
        type:"text",
        required:true
      },{
        key:"code",
        type:"text",
        required:true
      }],
      fields_key:0
    }
  };

  function Group(){

      // Prevents global namespace clobbering if you istantiate this object
      // without the 'new' keyword
      if (!(this instanceof Group)) {
        return new Group();
      }

      this.name = "";         // String
      this.code = "";
      
    };

  Group.prototype.datatype = Group.datatype = model.datatypes.fee.v1;


  model.Group = Group;
}]);
 