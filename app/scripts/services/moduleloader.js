'use strict';
define(['settings', 'require'], function(settings, require){
  function ModuleLoader(settings) {
    var self = {};
    // var modules = (settings.get()).modules;

    // self.modules = function(){
    //   var modules = ['ReportCard', 'Finance', 'Staffing', 'Transcript', 'IDCard', 'Reports'];
    //   return modules;
    // }
    var modularScripts={
      'ReportCard':[
          "ReportCard/controllers/reportcardCtrl",
          "ReportCard/controllers/classmasterprofileCtrl",
          "ReportCard/controllers/mastersheetCtrl",
          "ReportCard/controllers/marksheetCtrl",
          "ReportCard/controllers/myclassesCtrl",
          "ReportCard/controllers/classcouncilCtrl",
          "ReportCard/controllers/statsCtrl",
          "ReportCard/services/dcards",
      ],
      'Finance':[
          "Finance/controllers/registrarprofileCtrl",
          "Finance/controllers/feesCtrl",
          "Finance/controllers/balancesheetCtrl",
      ],
      'Staffing':[
          "Staffing/services/salarys",
          "Staffing/services/staffs",
          "Staffing/models/Salary",
          "Staffing/controllers/salaryCtrl",
          "Staffing/controllers/staffregistrationCtrl"
      ],
      'Reports':[
          "Reports/controllers/annualreportCtrl",
          "Reports/controllers/enrollmentCtrl"
      ],
      'Transcript':[
          "Transcript/models/Transcript", 
          "Transcript/services/transcripts",
          "Transcript/controllers/transcriptCtrl"
      ],
      'IDCard':[
          "IDCard/controllers/idcardCtrl"
      ]

    }
    self.loadExtensions = function(){
      var modules = settings.get().modules;
      console.log("Modules?", modules);
      var moduleLoadScripts = [];
      angular.forEach(modules, function(module, key){
          moduleLoadScripts = moduleLoadScripts.concat(modularScripts[module]);
      })

      require(moduleLoadScripts, function(){
          // angular.bootstrap(document, ["SchoolMan"]);
          console.log("Loaded scripts", moduleLoadScripts);
      })
    }

    return self;
  }
  ModuleLoader.$inject = ['settings'];
  angular.module('SchoolMan').service('ModuleLoader', ModuleLoader);
})