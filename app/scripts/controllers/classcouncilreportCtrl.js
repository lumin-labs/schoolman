'use strict';

angular.module('SchoolMan')
  .controller('ClasscouncilreportCtrl', function ($scope, $routeParams, Groups, Forms, Data, ClassMaster, CourseCatalog, Location, Registrar, Mastersheet) {
    
    $scope.pageTitleEnglish = "CLASS COUNCIL REPORT";
    $scope.pageTitleFrench = "RAPPORT DU CONSEIL DE CLASSE";

    $scope.formIndex  = $routeParams.formIndex;

    $scope.groups = angular.copy(Groups.getAll());

    $scope.forms = Forms.all();
    $scope.form  = $scope.forms[$routeParams.formIndex];

    $scope.terms = CourseCatalog.getTerms();
    $scope.term  = $scope.terms[$routeParams.termIndex];

    $scope.currentDate = new Date();

    $scope.groupStats = {};
    var subjects = CourseCatalog.getSubjects($routeParams.formIndex);

       // This is doing more work than it needs to because we dont need a mastersheet
    // for every course
    var buildMastersheet = function(groupKey){
        
        var courses = CourseCatalog.getCourses($routeParams.formIndex, groupKey);
        var courseIds = courses.map(function(course){return course.id});

        var marksheets = ClassMaster.getMarksheets(courseIds);
        var mastersheet = new Mastersheet({
            termIndex:0,
            subjects:subjects,
            marksheets:marksheets,
            getSubjectKey:CourseCatalog.getSubjectKey
        });
        $scope.mastersheet = mastersheet;
        console.log("groupKey",groupKey);
        console.log("scope.groups",$scope.groups);
        var passingScore = $scope.groups[groupKey].getPromoPass($routeParams.formIndex)

        $scope.groupStats = mastersheet.numstats(passingScore);
        
    }
    console.log("routeParams",$routeParams);
    buildMastersheet($routeParams.groupIndex);


  });
