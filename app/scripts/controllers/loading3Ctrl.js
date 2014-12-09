'use strict';

define(['Location', 'Students', 'Subjects', 'Departments', 'Groups', 'Fees', 'Users', 'settings', 'Lang', 'ExtensionLoader', 'MockData', 'SchoolInfos', 'Staffs'], function(Location, Students, Subjects, Departments, Groups, Fees, Users, settings, Lang, ExtensionLoader, MockData, SchoolInfos, Staffs){
    function LoadingCtrl($scope, $q, model, $routeParams, Location, Students, Subjects, Departments, Groups, Fees, Users, settings, Lang, ExtensionLoader, MockData, SchoolInfos, Staffs) {
        $scope.dict = Lang.getDict();

        // angular.resumeBootstrap([
        //     'SchoolMan.ReportCard', 
        //     'SchoolMan.Finance',
        //     'SchoolMan.IDCard',
        //     'SchoolMan.Reports',
        //     'SchoolMan.Staffing',
        //     'SchoolMan.TimeTable',
        //     'SchoolMan.Transcript'])
    

        // Initialize/Register SchoolInfo datatype
        var instSchoolInfo = new model.SchoolInfo();

        var settingsP = settings.load();
        var userP = Users.load();
        var deptP = Departments.load();
        var subjP = Subjects.load();
        var groupP= Groups.load();
        var studentsP= Students.load();
        var feesP = Fees.load();

        // var salarysP = Salarys.load();
        var staffsP= Staffs.load();

        var promises = [settingsP, deptP, groupP, subjP, feesP, userP, studentsP,staffsP];
        var infosP = SchoolInfos.get();

        var promises = [settingsP, deptP, groupP, subjP, feesP, userP, studentsP, infosP];

        $q.all(promises).then(function(success){
            console.log("Successes", success);
            // $scope.dict = Lang.getDict(success[8].lang);
            // ExtensionLoader.loadScripts();
            Location.open({page:"login"});
        });



    
    }
    LoadingCtrl.$inject = ['$scope', '$q', 'model','$routeParams', 'Location', 'Students', 'Subjects', 'Departments', 'Groups', 'Fees', 'Users', 'settings', 'Lang', 'ExtensionLoader', 'MockData', 'SchoolInfos', 'Staffs'];
    angular.module('SchoolMan').controller('Loading3Ctrl', LoadingCtrl);
})
