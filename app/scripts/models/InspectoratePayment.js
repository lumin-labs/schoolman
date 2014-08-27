var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  model.datatypes.inspectoratepayment = {
    v1:{
      type:"schema",
      _id:"datatype/inspectoratepayment/v1",
      fields:[{
        key:"amount",
        type:"number",
        required:true
      },{
        key:"registrar",
        type:"string",
        required:true
      },{
        key:"inspectorateId",
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

  function InspectoratePayment(spec){
    spec = spec || {};

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof InspectoratePayment)) {
      return new InspectoratePayment();
    }

    this.amount = 0.00; // number
    this.registrar = "";  // string
    this.studentId = "";  // string
    this.date = "";       // date
  };

  InspectoratePayment.prototype = new model.Model();
  
  InspectoratePayment.prototype.datatype = InspectoratePayment.datatype = model.datatypes.inspectoratepayment.v1;
  InspectoratePayment.prototype.getAmount = function(){
    var amount = this.amount;
    if(typeof this.amount === 'string'){
      amount = Number(this.amount.replace(/[^0-9\.]+/g,""));
    }
    return amount;
  }
  InspectoratePayment.prototype.normalize = function(){
    // convert amount from string to number
    if(typeof this.amount === "string"){
      this.amount = this.getAmount();
    } 
    this.date = new Date();
  };

  InspectoratePayment.prototype.generateID = function(){
    this.date = new Date();
    var id = "inspectoratepayment_" + this.inspectorateId + "_" + this.date.toISOString();
    return id;
  }

  model.InspectoratePayment = InspectoratePayment;
    
}]);
 