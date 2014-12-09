'use strict';

<<<<<<< HEAD
define(['Location', 'Students', 'Subjects', 'Departments', 'Groups', 'Fees', 'Users', 'settings', 'Lang',  'Staffs'], function(Location, Students, Subjects, Departments, Groups, Fees, Users, settings, Lang, Staffs){
    function LoadingCtrl($scope, $q, model, Location, Students, Subjects, Departments, Groups, Fees, Users, settings, Lang,  Staffs) {
=======
define(['Location', 'Students', 'Subjects', 'Departments', 'Groups', 'Fees', 'Users', 'settings', 'Lang', 'ExtensionLoader', 'MockData', 'SchoolInfos'], function(Location, Students, Subjects, Departments, Groups, Fees, Users, settings, Lang, ExtensionLoader, MockData, SchoolInfos){
    function LoadingCtrl($scope, $q, model, $routeParams, Location, Students, Subjects, Departments, Groups, Fees, Users, settings, Lang, ExtensionLoader, MockData, SchoolInfos) {
>>>>>>> 58234b002462bcc9d8c9a324a92f8a6d27d40919
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
<<<<<<< HEAD
        // var salarysP = Salarys.load();
        var staffsP= Staffs.load();

        var promises = [settingsP, deptP, groupP, subjP, feesP, userP, studentsP,staffsP];
=======
        var infosP = SchoolInfos.get();

        var promises = [settingsP, deptP, groupP, subjP, feesP, userP, studentsP, infosP];
>>>>>>> 58234b002462bcc9d8c9a324a92f8a6d27d40919

        $q.all(promises).then(function(success){
            console.log("Successes", success);
            // $scope.dict = Lang.getDict(success[8].lang);
            // ExtensionLoader.loadScripts();
            Location.open({page:"login"});
        });
<<<<<<< HEAD

    }
    LoadingCtrl.$inject = ['$scope', '$q', 'model', 'Location', 'Students', 'Subjects', 'Departments', 'Groups', 'Fees', 'Users', 'settings', 'Lang',  'Staffs'];
=======
    }
    LoadingCtrl.$inject = ['$scope', '$q', 'model','$routeParams', 'Location', 'Students', 'Subjects', 'Departments', 'Groups', 'Fees', 'Users', 'settings', 'Lang', 'ExtensionLoader', 'MockData', 'SchoolInfos'];
>>>>>>> 58234b002462bcc9d8c9a324a92f8a6d27d40919
    angular.module('SchoolMan').controller('Loading3Ctrl', LoadingCtrl);
})
