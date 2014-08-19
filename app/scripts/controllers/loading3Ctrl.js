'use strict';

function LoadingCtrl($scope, Location, $q, Divisions, RegFees, SchoolPayments, DivFees, Schools, Users, model, VERSION) {

    // var instSchoolInfo = new model.SchoolInfo();


    // var settingsP = settings.load();
    var userP = Users.load();
    // var feesP = Fees.load();
    // var deptP = Departments.load();
    // var subjP = Subjects.load();
    // var groupP= Groups.load();
    // var studentsP= Students.load();
    var DivFeesP = DivFees.load();
    var RegFeesP = RegFees.load();
    var SchoolsP = Schools.load();
    var DivisionsP = Divisions.load();
    var SchoolPaymentP = SchoolPayments.load(); 

    // Initialize/Register ClassCouncil datatype
    // var instClassCouncil = new model.ClassCouncil();
    

    // var promises = [settingsP, deptP, groupP, subjP, feesP, userP, studentsP, DivFeesP, SchoolsP];
    var promises = [userP, DivFeesP, SchoolsP, DivisionsP, RegFeesP, SchoolPaymentP];

    $q.all(promises).then(function(success){
      console.log("Successes", success);
      Location.open({page:"login", accessCode:VERSION.mode});
    });

  }
LoadingCtrl.$inject = ['$scope', 'Location', '$q', 'Divisions', 'RegFees', 'SchoolPayments', 'DivFees', 'Schools', 'Users', 'model', 'VERSION'];
angular.module('SchoolMan').controller('Loading3Ctrl', LoadingCtrl);
