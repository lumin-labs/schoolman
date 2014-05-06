'use strict';

angular.module('SchoolMan')
  .service('Departments', function Departments(Data, modelTransformer, Department, InsertionError) {

		var departments = {};  	

  	var self = {};

  	self.getAll = function(){
  		return departments;
  	};

  	self.get = function(departmentKey){
  		return departments[departmentKey];
  	};

  	self.add = function(department){
  		if(departments.hasOwnProperty(department.code)){
  			throw new InsertionError("departments", department.code);
  		} else {
  			departments[department.code] = department;
  		}
  	};

    self.remove = function(department){
      if(!departments.hasOwnProperty(department.code)){
        throw new Error("Departments has no department " + department.code);
      } else {
        delete departments[department.code] 
      }
    };

  	self.save = function(){
  		Data.saveLater({departments: departments});
  	};

    Data.get('departments', function(obj){
      console.log("Lodaing Depts", obj);
      angular.forEach(obj, function(department, departmentKey){
        departments[departmentKey] = modelTransformer.transform(department, Department);
        departments[departmentKey].onChange(function(m){
          self.save();
        });
      });
    });

    return self;

  });
