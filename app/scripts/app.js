'use strict';

/**
 * @doc overview
 * @name index
 * @description
 *
 * # SchoolMan API
 *
 * Select a service from the menu on the left to see common methods for accessing the data
 *
 */
 
/**
 * @ngdoc module
 * @name SchoolMan
 * @description
 *
 * ## A Modern Grading System for Cameroon
 *
 * This module houses all of the code for SchoolMan.
 */


var app = angular.module('SchoolMan', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'slugifier',
  'pouchdb',
  'ui.bootstrap'

])

app.config(function ($routeProvider, $controllerProvider, $provide, TABS) {
  var self = {};

  var TEMPLATE_DIRECTORY = {
    login:    "/views/login2.html",
    login404: "/views/login.html",
    users:    "/views/admin-users.html",
    subjects:  "/views/admin-subjects.html",
    classes:  "/views/admin-classes.html",
    staff:"/extensions/Staffing/staff.html",
    registrarStaff:"/extensions/Staffing/reistrar-staff.html",
    transcript: "/extensions/Transcript/transcript.html",
    classmasterMarksheet:"/extensions/ReportCard/classmaster-marksheet.html",
    teacherMarksheet:"/extensions/ReportCard/teacher-marksheet.html",
    mastersheet:"/extensions/ReportCard/mastersheet.html",
    myclasses:"/extensions/ReportCard/myclasses.html",
    departments:"/views/admin-departments.html",
    fees:"/extensions/Finance/registrar-fees.html",
    salarys:"/extensions/Staffing/salary.html",
    balancesheet:"/extensions/Finance/balancesheet.html",
    reportcard:"/extensions/ReportCard/reportcard.html",
    registrarProfile:"/extensions/Finance/registrar-profile.html",
    classmasterProfile:"/views/classmaster-profile.html",
    classcouncil:"/extensions/ReportCard/classcouncil.html",
    adminStats:"/extensions/ReportCard/admin-stats.html",
    classmasterStats:"/extensions/ReportCard/classmaster-stats.html",
    annualreport:"/extensions/Reports/annualreport.html",
    enrollmentreport:"/extensions/Reports/enrollmentreport.html",
    staffregistration:"/extensions/Staffing/staffregistration.html",
    staffprofile:"/extensions/Staffing/staffprofile.html",
    stafflist:"/extensions/Staffing/stafflist.html",
    idcards:"/extensions/IDCard/idcards-full.html",
  };

  var getTemplate = function(p){
    // var base = '/views/';
    var template = "";
    if(TEMPLATE_DIRECTORY.hasOwnProperty(p.page)){
      template = TEMPLATE_DIRECTORY[p.page];
    } else if(p.hasOwnProperty('page') && p.hasOwnProperty('subpage')){
      template = '/views/' + p.page + '.html';
    } else {
      console.log("404 Page Not Found");
    }

    // var templatePath = base + template;
    console.log("Load Template: ", template , '\n')
    return template;
  };

  app.register =
  {
      controller: $controllerProvider.register,
      service: $provide.service,
      provider: $provide.provider
  };

  $routeProvider
    .when('/:page/:subpage/:lang/:formIndex/:deptId/:groupId/:subjectId/:termIndex/:studentId/:username/:accessCode', {
      templateUrl:function(p){ return getTemplate(p);},
      // controller:'MainCtrl'
    })
    // Login Pages
    .when('/:page/:lang/:fullname/:accessCode', {
      templateUrl:function(p){return getTemplate(p);},
      controller:'LoginCtrl'
    })
    .when('/loading', {
      templateUrl:'/views/loading3.html',
      controller:'Loading3Ctrl'
    })
    .otherwise({
      redirectTo: '/loading'
    });

    return app;
});

chrome.storage.local.get("initialized",function(r){
      if(!r.hasOwnProperty("initialized")){
        chrome.storage.local.set({initialized:false});
      }
    });

document.getElementById("close").onclick = function() {
  window.close();
}

  
