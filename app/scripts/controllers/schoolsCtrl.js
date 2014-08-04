'use strict';

function SchoolsCtrl($scope, $q, $routeParams, Schools, Dues, model, Data, Location) {

    var data = $scope.data = {
        schools: Schools.getAll(),
        dues: Dues.getAll(),
        page: 0
    };
    // console.log("Schools:", data.schools);
    $scope.open = Location.open;

  }
  SchoolsCtrl.$inject = ['$scope', '$q', '$routeParams', 'Schools', 'Dues', 'model', 'Data', 'Location'];
  angular.module('SchoolMan').controller('SchoolsCtrl', SchoolsCtrl);
