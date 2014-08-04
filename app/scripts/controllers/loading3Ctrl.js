'use strict';

function LoadingCtrl($scope, Location, $q, Students, Subjects, Forms, Departments, DivFees, Schools, Groups, Fees, Users, settings, model, MockData) {

    var instSchoolInfo = new model.SchoolInfo();


    var settingsP = settings.load();
    var userP = Users.load();
    var feesP = Fees.load();
    var deptP = Departments.load();
    var subjP = Subjects.load();
    var groupP= Groups.load();
    var studentsP= Students.load();
    var DivFeesP = DivFees.load();
    var SchoolsP = Schools.load();

    // Initialize/Register ClassCouncil datatype
    var instClassCouncil = new model.ClassCouncil();
    

    var promises = [settingsP, deptP, groupP, subjP, feesP, userP, studentsP, DivFeesP, SchoolsP];

    $q.all(promises).then(function(success){
      console.log("Successes", success);
      Location.open({page:"login"})
    });

  }
LoadingCtrl.$inject = ['$scope', 'Location', '$q', 'Students', 'Subjects', 'Forms', 'Departments', 'DivFees', 'Schools', 'Groups', 'Fees', 'Users', 'settings', 'model', 'MockData'];
angular.module('SchoolMan').controller('Loading3Ctrl', LoadingCtrl);
