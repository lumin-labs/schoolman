'use strict';

define(['Location', 'Students', 'Subjects', 'Departments', 'Groups', 'Finance/services/fees', 'Users', 'settings', 'Lang'], function(Location, Students, Subjects, Departments, Groups, Fees, Users, settings, Lang){
    function LoadingCtrl($scope, $q, model, Location, Students, Subjects, Departments, Groups, Fees, Users, settings, Lang) {
        $scope.dict = Lang.getDict();
        var instSchoolInfo = new model.SchoolInfo();

        var settingsP = settings.load();
        var userP = Users.load();
        var deptP = Departments.load();
        var subjP = Subjects.load();
        var groupP= Groups.load();
        var studentsP= Students.load();

        var feesP = Fees.load();
        // Initialize/Register ClassCouncil datatype
        var instClassCouncil = new model.ClassCouncil();
        var transcript = new model.Transcript();
        

        var promises = [settingsP, deptP, groupP, subjP, feesP, userP, studentsP];

        $q.all(promises).then(function(success){
          console.log("Successes", success);
          Location.open({page:"login"})
        });
       

      }
    LoadingCtrl.$inject = ['$scope', '$q', 'model', 'Location', 'Students', 'Subjects', 'Departments', 'Groups', 'Fees', 'Users', 'settings', 'Lang'];
    angular.module('SchoolMan').controller('Loading3Ctrl', LoadingCtrl);
})