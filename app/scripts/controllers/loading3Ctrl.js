'use strict';

function LoadingCtrl($scope, Location, $q, Students,Staffs, Subjects, Salarys, Forms, Departments, Groups, Fees, Users, settings, model, MockData, Lang) {
    $scope.dict = Lang.getDict();
    var instSchoolInfo = new model.SchoolInfo();

    var settingsP = settings.load();
    var userP = Users.load();
    var feesP = Fees.load();
    var deptP = Departments.load();
    var subjP = Subjects.load();
    var groupP= Groups.load();
    var studentsP= Students.load();
    var salarysP = Salarys.load();
    var staffsP= Staffs.load();

    // Initialize/Register ClassCouncil datatype
    var instClassCouncil = new model.ClassCouncil();

    var transcript = new model.Transcript();
    

    var promises = [settingsP, deptP, groupP, subjP, feesP, userP, studentsP,staffsP, salarysP];

    $q.all(promises).then(function(success){
      console.log("Successes", success);
      Location.open({page:"login"})
    });
   

  }
LoadingCtrl.$inject = ['$scope', 'Location', '$q', 'Students', 'Staffs','Subjects', 'Salarys', 'Forms', 'Departments', 'Groups', 'Fees', 'Users', 'settings', 'model', 'MockData', 'Lang'];
angular.module('SchoolMan').controller('Loading3Ctrl', LoadingCtrl);
