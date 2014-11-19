'use strict';

define(['Location', 'Students', 'Subjects', 'Departments', 'Groups', 'Fees', 'Users', 'settings', 'Lang', 'ExtensionLoader', 'MockData'], function(Location, Students, Subjects, Departments, Groups, Fees, Users, settings, Lang, ExtensionLoader, MockData){
    function LoadingCtrl($scope, $q, model, Location, Students, Subjects, Departments, Groups, Fees, Users, settings, Lang, ExtensionLoader, MockData) {
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

        var promises = [settingsP, deptP, groupP, subjP, feesP, userP, studentsP];

        $q.all(promises).then(function(success){
          console.log("Successes", success);
          ExtensionLoader.loadScripts();
          Location.open({page:"login"});
        });
    }
    LoadingCtrl.$inject = ['$scope', '$q', 'model', 'Location', 'Students', 'Subjects', 'Departments', 'Groups', 'Fees', 'Users', 'settings', 'Lang', 'ExtensionLoader', 'MockData'];
    angular.module('SchoolMan').controller('Loading3Ctrl', LoadingCtrl);
})