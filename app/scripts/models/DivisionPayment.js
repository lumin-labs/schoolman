var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  model.datatypes.divisionpayment = {
    v1:{
      type:"schema",
      _id:"datatype/divisionpayment/v1",
      fields:[{
        key:"amount",
        type:"number",
        required:true
      },{
        key:"registrar",
        type:"string",
        required:true
      },{
        key:"divisionId",
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

  function DivisionPayment(spec){
    spec = spec || {};

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof DivisionPayment)) {
      return new DivisionPayment();
    }

    this.amount = 0.00; // number
    this.registrar = "";  // string
    this.studentId = "";  // string
    this.date = "";       // date
  };

  DivisionPayment.prototype = new model.Model();
  
  DivisionPayment.prototype.datatype = DivisionPayment.datatype = model.datatypes.divisionpayment.v1;
  DivisionPayment.prototype.getAmount = function(){
    var amount = this.amount;
    if(typeof this.amount === 'string'){
      amount = Number(this.amount.replace(/[^0-9\.]+/g,""));
    }
    return amount;
  }
  DivisionPayment.prototype.normalize = function(){
    // convert amount from string to number
    if(typeof this.amount === "string"){
      this.amount = this.getAmount();
    } 
    this.date = new Date();
  };

  DivisionPayment.prototype.generateID = function(){
    this.date = new Date();
    var id = "divisionpayment_" + this.divisionId + "_" + this.date.toISOString();
    return id;
  }

  model.DivisionPayment = DivisionPayment;
    
}]);
 