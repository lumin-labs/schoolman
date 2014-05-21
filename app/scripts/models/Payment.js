var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  model.datatypes.payment = {
    v1:{
      type:"schema",
      _id:"datatype/payment/v1",
      fields:[{
        key:"amount",
        type:"number",
        required:true
      },{
        key:"registrar",
        type:"string",
        required:true
      },{
        key:"studentId",
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

  function Payment(){

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof Payment)) {
      return new Payment();
    }

    this.amount = 0.00;     // decimal
    this.registrar = "";  // string
    this.studentId = "";  // string
    this.date = "";       // date
  };

  Payment.prototype = new model.Model();
  
  Payment.prototype.datatype = Payment.datatype = model.datatypes.payment.v1;
  Payment.prototype.generateID = function(){
    this.date = new Date();
    var id = "payment_" + this.date.toISOString();
    return id;
  }

  model.Payment = Payment;
    
}]);
 