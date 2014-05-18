var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  model.datatypes.comment = {
    v1:{
      type:"schema",
      _id:"datatype/comment/v1",
      fields:["userId", "studentId", "text"],
      fields_key:0
    }
  };

  function Comment(username, studentId){
    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof Comment)) {
      return new Comment();
    }

    this._id  = new Date().toISOString();
    this.userId = username || "";
    this.studentId = studentId || "";
    this.text = "";
  }

  Comment.prototype = new model.Model();
  Comment.prototype.requiredFields = ['_id', 'text'];
  Comment.prototype.invalidValues = [null, undefined, "", "0", "0.00", 0];
  Comment.prototype.datatype = model.datatypes.comment.v1;

  Comment.datatype = Comment.prototype.datatype;
  Comment.parse = function(doc){
    var data = {_id:doc._id};
    var spec = Comment.datatype;
    angular.forEach(spec.fields, function(field, fieldIndex){
      data[field] = doc[spec.fields_key][fieldIndex];
    });
    return data;
  }

  model.Comment = Comment;

}]);
 