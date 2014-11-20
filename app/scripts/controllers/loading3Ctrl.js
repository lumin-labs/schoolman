'use strict';

define(['Location', 'Students', 'Subjects', 'Departments', 'Groups', 'Fees', 'Users', 'settings', 'Lang', 'ExtensionLoader', 'MockData', 'SchoolInfos'], function(Location, Students, Subjects, Departments, Groups, Fees, Users, settings, Lang, ExtensionLoader, MockData, SchoolInfos){
    function LoadingCtrl($scope, $q, model, $routeParams, Location, Students, Subjects, Departments, Groups, Fees, Users, settings, Lang, ExtensionLoader, MockData, SchoolInfos) {
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
        var infosP = SchoolInfos.get();

        var promises = [settingsP, deptP, groupP, subjP, feesP, userP, studentsP, infosP];

        $q.all(promises).then(function(success){
            console.log("Successes", success);
            // $scope.dict = Lang.getDict(success[8].lang);
            ExtensionLoader.loadScripts();
            Location.open({page:"login"});
        });
    }
    LoadingCtrl.$inject = ['$scope', '$q', 'model','$routeParams', 'Location', 'Students', 'Subjects', 'Departments', 'Groups', 'Fees', 'Users', 'settings', 'Lang', 'ExtensionLoader', 'MockData', 'SchoolInfos'];
    angular.module('SchoolMan').controller('Loading3Ctrl', LoadingCtrl);
})