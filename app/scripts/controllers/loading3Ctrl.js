'use strict';

angular.module('SchoolMan')
  .controller('Loading3Ctrl', function ($scope, Location, $q, 
    Students, Subjects, Forms, Departments, Groups, Fees, Users, model, MockData) {

    var userP = Users.load();
    var feesP = Fees.load();
    var deptP = Departments.load();
    var subjP = Subjects.load();
    var groupP= Groups.load();
    var studentsP= Students.load();

    // Initialize/Register ClassCouncil datatype
    var instClassCouncil = new model.ClassCouncil();

    var promises = [deptP, groupP, subjP, feesP, userP, studentsP];

    $q.all(promises).then(function(success){
      console.log("Successes", success);
      Location.open({page:"login"})
    });

  });
