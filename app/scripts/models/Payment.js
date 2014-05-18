var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  function Payment(){

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof Payment)) {
      return new Payment();
    }

    this.amount = 0.00;     // decimal
    this.registrar = "";  // string
    this.date = "";       // date
  };

  Payment.prototype = new model.Model();
  Payment.prototype.requiredFields = ['amount', 'registrar'];
  Payment.prototype.invalidValues = [null, undefined, "", "0", "0.00", 0];

  model.Payment = Payment;
    
}]);
 