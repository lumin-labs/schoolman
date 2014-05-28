'use strict';

angular.module('SchoolMan')
  .controller('ClasscouncilCtrl', function ($scope, $routeParams, model, Marksheets, ClassCouncils, Groups, Forms, Terms, ClassMaster, CourseCatalog, Location, Mastersheet) {
    
    $scope.pageTitleEnglish = "CLASS COUNCIL REPORT";
    $scope.pageTitleFrench = "RAPPORT DU CONSEIL DE CLASSE";

    $scope.data = {};
    $scope.data.formIndex  = $routeParams.formIndex;
    $scope.data.groups = angular.copy(Groups.getAll());
    $scope.data.forms = Forms.all();
    $scope.data.form  = $scope.data.forms[$routeParams.formIndex];
    $scope.data.terms = Terms.getAll();
    $scope.data.term  = $scope.data.terms[$routeParams.termIndex];
    $scope.data.currentDate = new Date();
    $scope.data.open = Location.open;
    $scope.data.groupStats = {};
    $scope.data.classcouncils = ClassCouncils.getAll();


    $scope.data.newClassCouncil = new model.ClassCouncil();

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
        $scope.data.mastersheet = mastersheet;
        console.log("groupKey",groupKey);
        console.log("scope.groups",$scope.data.groups);
        var passingScore = 10;
        //var passingScore = $scope.data.groups[groupKey].getPromoPass($routeParams.formIndex);

        var summaryMarksheet = Marksheets.combine(marksheets);
        $scope.data.rankings = Marksheets.rank(summaryMarksheet);

        $scope.data.groupStats = mastersheet.numstats(passingScore);
        
    }
    console.log("routeParams",$routeParams);
    buildMastersheet($routeParams.groupId);


    var studentIds = Object.keys($scope.data.rankings);
    var rankingsList = _.map(studentIds, function(studentId){
        var obj = {};
        obj.rankings = $scope.data.rankings[studentId];
        obj.studentId = studentId;
        return obj;
    })
    var sortedList = rankingsList.sort(function(a,b){
        return a.rankings[3] - b.rankings[3];
    })

    $scope.data.top3 = [rankings[0],rankings[1],rankings[2]]
    $scope.data.worst3 = rankings.slice(-3);

    $scope.getRemark = function(average){
        return ClassMaster.getRemark(average);
      };

    

    $scope.data.remarks = [
    	"Excellent",
    	"Very Good",
    	"Good",
    	"Fair",
    	"Average",
    	"Poor",
    	"Very Poor"
    ];


  });
