'use strict';

define(['Location', 'Students', 'Subjects', 'Departments', 'Groups', 'Fees', 'Users', 'settings', 'Lang', 'Staffing/services/Salarys', 'Staffing/services/Staffs'], function(Location, Students, Subjects, Departments, Groups, Fees, Users, settings, Lang, Salarys, Staffs){
    function LoadingCtrl($scope, $q, model, Location, Students, Subjects, Departments, Groups, Fees, Users, settings, Lang, Salarys, Staffs) {
        $scope.dict = Lang.getDict();

        // Initialize/Register SchoolInfo datatype
        var instSchoolInfo = new model.SchoolInfo();

        var settingsP = settings.load();
        var userP = Users.load();
        var deptP = Departments.load();
        var subjP = Subjects.load();
        var groupP= Groups.load();
        var studentsP= Students.load();
        var feesP = Fees.load();
        var salarysP = Salarys.load();
        var staffsP= Staffs.load();

        var promises = [settingsP, deptP, groupP, subjP, feesP, userP, studentsP,staffsP, salarysP];

        $q.all(promises).then(function(success){
          console.log("Successes", success);
          Location.open({page:"login"})
        });

    }
    LoadingCtrl.$inject = ['$scope', '$q', 'model', 'Location', 'Students', 'Subjects', 'Departments', 'Groups', 'Fees', 'Users', 'settings', 'Lang', 'Salarys', 'Staffs'];
    angular.module('SchoolMan').controller('Loading3Ctrl', LoadingCtrl);
})
