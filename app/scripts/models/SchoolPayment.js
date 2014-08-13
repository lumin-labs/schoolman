var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  model.datatypes.schoolpayment = {
    v1:{
      type:"schema",
      _id:"datatype/schoolpayment/v1",
      fields:[{
        key:"amount",
        type:"number",
        required:true
      },{
        key:"registrar",
        type:"string",
        required:true
      },{
        key:"schoolId",
        type:"string",
        required:true
      },{
        key:"date",
        type:"object",
        required:true
      }],
      fields_key:0
    }
  };

  function SchoolPayment(spec){
    spec = spec || {};

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof SchoolPayment)) {
      return new SchoolPayment();
    }

    this.amount = 0.00; // number
    this.registrar = "";  // string
    this.studentId = "";  // string
    this.date = "";       // date
  };

  SchoolPayment.prototype = new model.Model();
  
  SchoolPayment.prototype.datatype = SchoolPayment.datatype = model.datatypes.schoolpayment.v1;
  SchoolPayment.prototype.getAmount = function(){
    var amount = this.amount;
    if(typeof this.amount === 'string'){
      amount = Number(this.amount.replace(/[^0-9\.]+/g,""));
    }
    return amount;
  }
  SchoolPayment.prototype.normalize = function(){
    // convert amount from string to number
    if(typeof this.amount === "string"){
      this.amount = this.getAmount();
    } 
    this.date = new Date();
  };

  SchoolPayment.prototype.generateID = function(){
    this.date = new Date();
    var id = "schoolpayment_" + this.schoolId + "_" + this.date.toISOString();
    return id;
  }

  model.SchoolPayment = SchoolPayment;
    
}]);
 