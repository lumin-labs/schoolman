'use strict';

function ClassmenuCtrl ($scope, $routeParams, Departments, Subjects, Groups, Forms, CourseCatalog, Location) {
    
    var r = $scope.route = {};

    r.page = $scope.page = $routeParams.page;
    
    r.forms = $scope.forms = Forms.all();
    r.form = $scope.form  = $scope.forms[$routeParams.formIndex];

    r.departments = $scope.departments = Departments.getAll();
    if(r.page === 'myclasses'){
      angular.forEach(r.departments, function(dept, key){
        if(!dept.forms[$routeParams.formIndex]){
          console.log("Deleting: ", key, dept);
          delete r.departments[key];
        }
      });
    }
    console.log("Departments", r.departments);
    r.department = 
    $scope.department = 
      r.departments.hasOwnProperty($routeParams.deptId) ? 
                            $scope.departments[$routeParams.deptId] : 
                            $scope.open({deptId:Object.keys(r.departments)[0]});


    r.groups = $scope.groups = Groups.getAll();
    r.group = $scope.group  = $scope.groups[$routeParams.groupId];

    r.subjects = $scope.subjects = Subjects.getAll();
    r.subject = $scope.subject  = $scope.subjects[$routeParams.subjectId];

    r.terms = $scope.terms = [
      {name:"Term 1"},
      {name:"Term 2"},
      {name:"Term 3"}
    ];
    r.term = $scope.term  = $scope.terms[$routeParams.termIndex];

    $scope.open = Location.open;

  }
  ClassmenuCtrl.$inject = ['$scope', '$routeParams', 'Departments', 'Subjects', 'Groups', 'Forms', 'CourseCatalog', 'Location'];
  angular.module('SchoolMan').controller('ClassmenuCtrl', ClassmenuCtrl);
