'use strict';

angular.module('SchoolMan')
  .controller('CatchCtrl', function ($scope, $location) {
  	console.log("TEST CATCH");
    console.log("404 Not Found: ", $location);
  });
