'use strict';

var app = angular.module('SchoolMan.ReportCard', ['ngCookies',
                                                  'ngResource',
                                                  'ngSanitize',
                                                  'ngRoute',
                                                  'slugifier',
                                                  'pouchdb',
                                                  'ui.bootstrap']);

app.config(function($controllerProvider, $provide){
  app.register =
  {
      controller: $controllerProvider.register,
      service: $provide.service,
      provider: $provide.provider
  };
  return app;
})