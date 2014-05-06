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
  'slugifier'

]).config(function ($routeProvider, TABS) {

    var TEMPLATE_DIRECTORY = {
      login:    "login.html",
      login404: "login.html",
      students: "admin-students.html",
      users:    "admin-users.html",
      catalog:  "admin-catalog.html",
      classes:  "admin-classes.html",
      transcript: "transcript.html",
      promotion:"admin-promotion.html",
      classmasterMarksheet:"classmaster-marksheet.html",
      registration:"admin-registration.html",
      departments:"admin-departments.html"
    };

    var getTemplate = function(p){
      var base = '/views/';
      var template = "";
      if(TEMPLATE_DIRECTORY.hasOwnProperty(p.page)){
        template = TEMPLATE_DIRECTORY[p.page];
      } else if(p.hasOwnProperty('page') && p.hasOwnProperty('view')){
        template = p.page + '.html';
      } else {
        console.log("404 Page Not Found");
      }

      var templatePath = base + template;
      console.log("Load Template: ", templatePath , '\n')
      return templatePath;
    };

    $routeProvider
      .when('/:page/:view/:formIndex/:groupIndex/:subjectKey/:termIndex/:studentId/:username/:accessCode', {
        templateUrl:function(p){ return getTemplate(p);},
        // controller:'MainCtrl'
      })
      // Login Pages
      .when('/:page/:fullname/:accessCode', {
        templateUrl:function(p){return getTemplate(p);},
        controller:'LoginCtrl'
      })
      .when('/loading', {
        templateUrl:'/views/loading.html',
        controller:'LoadingCtrl'
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

  
