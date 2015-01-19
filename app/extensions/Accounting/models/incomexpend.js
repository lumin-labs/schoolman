var schoolman = angular.module('SchoolMan');

schoolman.config(['modelProvider', function(model){

  model.datatypes.item = {
    v1:{
      type:"schema",
      _id:"datatype/item/v1",
      fields:[{
        key:"registrar",
        type:"string",
        required:false
      },{
        key:"itemId",
        type:"string",
        required:true
      },{
        key:"rubric",
        type:"string",
        required:true
      },{
        key:"income",
        type:"number",
        required:true
      },{
        key:"expenditure",
        type:"number",
        required:true
      },{
        key:"account_balance",
        type:"number",
        required:false
      }],
      fields_key:0
    }
  };

  function Item(){

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof Item)) {
      return new Item();
    }
    this.registrar = "";  // string
    this.itemId = "";  // string
    this.income = 0.00; // number
    this.expenditure = 0.00; // number
    this.account_balance = 0.00; // number
  };

  Item.prototype = new model.Model();
  
  Item.prototype.datatype = Item.datatype = model.datatypes.item.v1;
  Item.prototype.getAmount = function(){
    var amount = this.amount;
    if(typeof this.amount === 'string'){
      amount = Number(this.amount.replace(/[^0-9\.]+/g,""));
    }
    return amount;
  }
  Item.prototype.normalize = function(){
    // convert amount from string to number
    if(typeof this.amount === "string"){
      this.amount = this.getAmount();
    } 
    this.date = new Date();
  };

  Item.prototype.generateID = function(){
    this.date = new Date();
    var id = "item_" + this.itemId + "_" + this.date.toISOString();
    return id;
  }

  Item.prototype.db = Item.db = "db_items";

  model.Item = Item;
    
}]);
 