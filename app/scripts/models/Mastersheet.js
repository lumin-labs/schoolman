'use strict';

angular.module('SchoolMan')

 /**
  * @ngdoc object
  * @name SchoolMan.object:Mastersheet
  * @property {int} Mastersheet this is actually just the value of the last Mastersheet in the history, it is not a Mastersheet object
  * @param {array} Mastersheets this takes as an argument a list of Mastersheet object literals e.g. as would be loaded from JSON
  * @method {function} getValidationStatus
  * @method {function} save
  * @method {function} onChange
  * @description
  *
  * A Mastersheet contains the history of Mastersheets. It can save a new Mastersheet, validate an
  * input and notify listeners onChange
  */
  .value('Mastersheet', (function(){

    // Constructor
    function Mastersheet(marksheets){

      // Prevents global namespace clobbering if you istantiate this object
      // without the 'new' keyword
      if (!(this instanceof Mastersheet)) {
        return new Mastersheet();
      }

      this.table = {students:{}};
      
    };

    return Mastersheet;

  })());

