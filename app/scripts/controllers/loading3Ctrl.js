'use strict';

<<<<<<< HEAD
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
=======
define(['Location', 'Students', 'Subjects', 'Departments', 'Groups', 'Fees', 'Users', 'settings', 'Lang'], function(Location, Students, Subjects, Departments, Groups, Fees, Users, settings, Lang){
    function LoadingCtrl($scope, $q, model, Location, Students, Subjects, Departments, Groups, Fees, Users, settings, Lang) {
        $scope.dict = Lang.getDict();

        // Initialize/Register SchoolInfo datatype
        var instSchoolInfo = new model.SchoolInfo();
>>>>>>> b9e471055e2548d88d06271f76087c92e17467a8

        var settingsP = settings.load();
        var userP = Users.load();
        var deptP = Departments.load();
        var subjP = Subjects.load();
        var groupP= Groups.load();
        var studentsP= Students.load();
        var feesP = Fees.load();

        var promises = [settingsP, deptP, groupP, subjP, feesP, userP, studentsP];

<<<<<<< HEAD
    var promises = [settingsP, deptP, groupP, subjP, feesP, userP, studentsP,staffsP, salarysP];

    $q.all(promises).then(function(success){
      console.log("Successes", success);
      Location.open({page:"login"})
    });
   

  }
LoadingCtrl.$inject = ['$scope', 'Location', '$q', 'Students', 'Staffs','Subjects', 'Salarys', 'Forms', 'Departments', 'Groups', 'Fees', 'Users', 'settings', 'model', 'MockData', 'Lang'];
angular.module('SchoolMan').controller('Loading3Ctrl', LoadingCtrl);
=======
        $q.all(promises).then(function(success){
          console.log("Successes", success);
          Location.open({page:"login"})
        });
       

    }
    LoadingCtrl.$inject = ['$scope', '$q', 'model', 'Location', 'Students', 'Subjects', 'Departments', 'Groups', 'Fees', 'Users', 'settings', 'Lang'];
    angular.module('SchoolMan').controller('Loading3Ctrl', LoadingCtrl);
})
>>>>>>> b9e471055e2548d88d06271f76087c92e17467a8
