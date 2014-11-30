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
angular.module('SchoolMan', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'slugifier',
  'pouchdb',
  'ui.bootstrap'

]).config(function ($routeProvider, TABS) {

    var TEMPLATE_DIRECTORY = {
      login:    "login2.html",
      login404: "login.html",
      students: "admin-students.html",
      staff:"admin-staff.html",
      users:    "admin-users.html",
      user:    "user.html",
      subjects:  "admin-subjects.html",
      classes:  "admin-classes.html",
      transcript: "transcript.html",
      promotion:"admin-promotion.html",
      classmasterMarksheet:"classmaster-marksheet.html",
      registration:"admin-registration.html",
      departments:"admin-departments.html",
      fees:"admin-fees.html",
      salarys:"admin-salary.html",
      finance:"registrar-finance.html",
      reportcardGTHS:"reportcard-gths.html",
      registrarProfile:"registrar-profile.html",
      classmasterProfile:"classmaster-profile.html",
      classcouncil:"classcouncil.html",
      customerSettings:"sales.html",
      schoolInfo:"schoolinfo.html",
      classmasterStats:"classmaster-stats.html",
      adminStats:"admin-stats.html",
      annualreport:"annualreport.html",
      enrollmentreport:"enrollmentreport.html",
      staffregistration:"staffregistration.html",
      staffprofile:"staffprofile.html",
      stafflist:"stafflist.html",
      idcards:"idcards.html",
      notactive:"notactive.html"
    };

    var getTemplate = function(p){
      var base = '/views/';
      var template = "";
      if(TEMPLATE_DIRECTORY.hasOwnProperty(p.page)){
        template = TEMPLATE_DIRECTORY[p.page];
      } else if(p.hasOwnProperty('page') && p.hasOwnProperty('subpage')){
        template = p.page + '.html';
      } else {
        console.log("404 Page Not Found");
      }

      var templatePath = base + template;
      console.log("Load Template: ", templatePath , '\n')
      return templatePath;
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
  });


chrome.storage.local.get("initialized",function(r){
      if(!r.hasOwnProperty("initialized")){
        chrome.storage.local.set({initialized:false});
      }
    });

document.getElementById("close").onclick = function() {
  window.close();
}

  
