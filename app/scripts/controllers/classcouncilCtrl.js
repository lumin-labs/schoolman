'use strict';

angular.module('SchoolMan')
  .controller('ClasscouncilCtrl', function ($scope, $routeParams, model, Marksheets, Students, ClassCouncils, Groups, Forms, Departments, Terms, ClassMaster, CourseCatalog, Location, Mastersheet) {
    
    $scope.pageTitleEnglish = "CLASS COUNCIL REPORT";
    $scope.pageTitleFrench = "RAPPORT DU CONSEIL DE CLASSE";

    $scope.formIndex = $routeParams.formIndex;
    $scope.groupId = $routeParams.groupId;
    $scope.deptId = $routeParams.deptId;
    $scope.termIndex = $routeParams.termIndex;

    $scope.data = {};
    $scope.data.forms = Forms.all();
    $scope.data.departments = Departments.getAll();
    $scope.data.groups = Groups.getAll();
    $scope.data.terms = Terms.getAll();
    $scope.data.currentDate = new Date();
    $scope.data.classcouncils = ClassCouncils.getAll();
    $scope.data.groupStats = {};

    $scope.groupStats = {};
    $scope.open = Location.open;


    $scope.data.newClassCouncil = new model.ClassCouncil();

     Marksheets.query({
        formIndex:$routeParams.formIndex,
        deptId:$routeParams.deptId,
        groupId:$routeParams.groupId
      }).then(function(marksheets){

        // Convert marksheets to a list and store in $scope.data.marksheets

        var stats = {
            numStudents:0,
            numPresent:0,
            passing:0,
            failing:0,
            percentPassing:0,
            percentFailing:0,
            classAverage:0,
            classRange:0
        };
        
        $scope.data.marksheets = _.map(Object.keys(marksheets), function(marksheetId){
          return marksheets[marksheetId];
        });
        /**
        // Create marksheet summaries 
        $scope.data.summaries = marksheets.map(function(marksheet){
          var summary = Marksheets.summarize(marksheet, $scope.termIndex);
          console.log("Marksheet has been summarized: ", marksheet, summary);
          return summary;
        });*/

        // combine all marksheets
        $scope.data.combinedMarksheet = Marksheets.combine($scope.data.marksheets);
        console.log("combined marksheet created", $scope.data.combinedMarksheet);

        // summarize combined marksheet to get grand totals
        $scope.data.summarysheet = Marksheets.summarize($scope.data.combinedMarksheet, $scope.termIndex);;
        console.log("summary marksheet created", $scope.data.summarysheet);

        var passingScore = 10;

        var minStudent = 20;
        var maxStudent = 0;
        var studentAvg = 0;
        var classTotal = 0;
        
        angular.forEach($scope.data.combinedMarksheet.table, function(student, studentId){
            console.log("student:",studentId, getTermAvg(student, $scope.termIndex));
            stats.numStudents = stats.numStudents +1;
            studentAvg = getTermAvg(student, $scope.termIndex);
            classTotal = studentAvg + classTotal;

            if(studentAvg >= passingScore){
                stats.passing = stats.passing +1;
            }
            if(!isNan(studentAvg)){
                if(studentAvg < minStudent){
                    minStudent = studentAvg;
                }
                if(studentAvg > maxStudent){
                    maxStudent = studentAvg;
                }
            }
        });

        stats.failing = stats.numStudents - stats.passing;
        stats.percentPassing = stats.passing / stats.numStudents;
        stats.percentFailing = 1 - stats.percentPassing;
        stats.classAverage = classTotal / stats.numStudents;
        stats.classRange = maxStudent - minStudent;
        console.log("stats: ", stats);
        $scope.groupStats = stats;
        
        // get rankings from combined marksheet
        $scope.data.rankings = Marksheets.rank($scope.data.combinedMarksheet);
        console.log("Rankings:", $scope.data.rankings);

        // Create a list of student from the union of marksheet studentIds
        var studentIds = _.union(_.reduce($scope.data.summaries, function(result, summary){
          return result.concat(Object.keys(summary));
        },[]));

        Students.getBatch(studentIds).then(function(students){
          $scope.data.students = _.map(Object.keys(students), function(studentId){
            return students[studentId];
          });

        // Catch errors
        }).catch(function(error){
          console.log("Failed to find students: ", error);
        });
      })
      .catch(function(error){
        console.log("Failed to find marksheets", error);
      });

      var getTermAvg = function(student, termIndex){
        return (student[termIndex*2] + student[termIndex*2+1])/2;
      }

    
    
    

/**
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
*/
    
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
