'use strict';
define(['settings'], function(settings){
	// function ModuleLoader(settings) {
		var self = {};
		// var moduleSettings = (settings.get()).modules;
		var moduleSettings = {
	      'ReportCard':1,
	      'Finance':1,
	      'Staffing':1,
	      'Transcript':1,
	      'IDCard':1,
	      'Reports':1
	    };

		self.modules = function(){
			var modules = [];
			angular.forEach(moduleSettings, function(value, module){
				if(value === 1){
					modules.push(module);
				}
			})	
			return modules;
		}

		return self;
	// }
	// ModuleLoader.$inject = ['settings'];
	// angular.module('SchoolMan').service('ModuleLoader', ModuleLoader);
})

// define(function () {
//     return {
//         getHello: function () {
//             return 'Hello World';
//         }
//     };
// });