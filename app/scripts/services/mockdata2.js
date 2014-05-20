'use strict';

angular.module('SchoolMan')
  .service('MockData', function MockData(Forms, Departments, Groups, Fees){

    
    // var forms = Forms.all();
    // var departments = Departments.all();
    // var groups = Groups.all();
    // var fees = Fees.all();

    // Random number util
    var getRandBetween = function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };

    var dev = window._dev = {};

    _dev.addStudents = function(n, params){

    }


  });
