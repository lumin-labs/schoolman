'use strict';

function SchoolsCtrl($scope, $q, $routeParams, Schools, DivFees, model, Data, Location) {

    var data = $scope.data = {
        schools: Schools.getAll(),
        divfees: DivFees.getAll(),
        page: 0
    };
    // console.log("Schools:", data.schools);
    $scope.open = Location.open;

  }
  SchoolsCtrl.$inject = ['$scope', '$q', '$routeParams', 'Schools', 'DivFees', 'model', 'Data', 'Location'];
  angular.module('SchoolMan').controller('SchoolsCtrl', SchoolsCtrl);
