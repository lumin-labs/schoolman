'use strict';

angular.module('SchoolMan')
  .controller('ClasscouncilCtrl', function ($scope, $routeParams, model, Marksheets, Students, ClassCouncils, Groups, Forms, Departments, Terms, ClassMaster, CourseCatalog, Location, Mastersheet, SchoolInfos) {
    
    $scope.schoolNameEn = "UNIVERSITY OF BAMENDA";
    $scope.schoolNameFr = "UNIVERSITE DE BAMENDA";
    // $scope.pageTitleEnglish = "CLASS COUNCIL REPORT";
    // $scope.pageTitleFrench = "RAPPORT DU CONSEIL DE CLASSE";
    $scope.userAccess = $routeParams.accessCode;
    //$scope.schoolYear = SCHOOLYEAR.year;

    $scope.formIndex = $routeParams.formIndex;
    $scope.groupId = $routeParams.groupId;
    $scope.deptId = $routeParams.deptId;
    $scope.termIndex = parseInt($routeParams.termIndex);

    var classcouncilId = model.ClassCouncil.generateID($routeParams);

    $scope.data = {};
    $scope.data.forms = Forms.all();
    $scope.data.departments = Departments.getAll();
    $scope.data.groups = Groups.getAll();
    $scope.data.terms = Terms.getAll();
    $scope.data.currentDate = new Date();
    $scope.data.rankings = {};
    $scope.data.rankingsList = [];
    $scope.data.bestStudents = [];
    $scope.data.worstStudents = [];
    $scope.data.bestAverages = [];

    $scope.data.classcouncil = new model.ClassCouncil({_id:classcouncilId,formIndex:$scope.formIndex,groupId:$scope.groupId,deptId:$scope.deptId});

    ClassCouncils.get(classcouncilId).then(function(classcouncil){
        $scope.data.classcouncil = classcouncil;
    });

    SchoolInfos.get("schoolinfo").then(function(info){
        $scope.data.schoolInfo = info;
        //console.log("school info retrieved", $scope.data.schoolInfo);
    }).catch(function(error){
        console.log("failed to get school info", error);
    });


    $scope.groupStats = {};
    
    $scope.open = Location.open;


     Marksheets.query({
        formIndex:$routeParams.formIndex,
        deptId:$routeParams.deptId,
        groupId:$routeParams.groupId
      }).then(function(marksheets){

        // Convert marksheets to a list and store in $scope.data.marksheets

        
        
        $scope.data.marksheets = _.map(Object.keys(marksheets), function(marksheetId){
          return marksheets[marksheetId];
        });
        
        // combine all marksheets
        $scope.data.combinedMarksheet = Marksheets.combine($scope.data.marksheets);
        
        // summarize combined marksheet to get grand totals
        $scope.data.summarysheet = Marksheets.summarize($scope.data.combinedMarksheet, $scope.termIndex);;      
        
        $scope.groupStats = performanceStats();

        $scope.score = $scope.data.classcouncil.passingScore;
        
        // get rankings from combined marksheet
        $scope.data.rankings = Marksheets.rank($scope.data.combinedMarksheet);
        console.log("rankings:", $scope.data.rankings);
        
        updatePerformanceRanks();
        console.log("User access", $scope.userAccess);

       

      })
      .catch(function(error){
        console.log("Failed to find marksheets", error);
      });

    var performanceStats = function(){
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

        var minStudent = 20;
        var maxStudent = 0;
        var studentAvg = 0;
        var classTotal = 0;
        
        angular.forEach($scope.data.summarysheet, function(student, studentId){
            stats.numStudents = stats.numStudents +1;
            studentAvg = student[0];

            if(studentAvg >= $scope.data.classcouncil.passingScore){
                stats.passing = stats.passing +1;
            }
            if(!isNaN(studentAvg) && studentAvg !== -1){
                classTotal = classTotal + studentAvg;
                stats.numPresent = stats.numPresent + 1;
                if(studentAvg < minStudent){
                    minStudent = studentAvg;
                }
                if(studentAvg > maxStudent){
                    maxStudent = studentAvg;
                }
            }
        });

        stats.failing = stats.numPresent - stats.passing;
        stats.percentPassing = stats.passing / stats.numPresent;
        stats.percentFailing = 1 - stats.percentPassing;
        stats.classAverage = classTotal / stats.numPresent;
        stats.classRange = minStudent === 20 ? 0 : maxStudent - minStudent;
        return stats;
    }
    
    

    var updatePerformanceRanks = function(){
        var studentIds = Object.keys($scope.data.rankings);
        var rankingsList = _.map(studentIds, function(studentId){
            var obj = {};
            obj.rankings = $scope.data.rankings[studentId];
            obj.studentId = studentId;
            return obj;
        })
        var sortedList = rankingsList.sort(function(a,b){
            return a.rankings[$scope.termIndex] - b.rankings[$scope.termIndex];
        })
        var n = 0;
        angular.forEach(sortedList, function(student, objId){
                if(isNaN(student.rankings[$scope.termIndex])){
                    n += 1;
                }
            })

        var top10 = [];
        var worst3 = [];

        if(sortedList.length > 9){        
            top10 = [sortedList[0].studentId,sortedList[1].studentId,sortedList[2].studentId,sortedList[3].studentId,sortedList[4].studentId,sortedList[5].studentId,sortedList[6].studentId,sortedList[7].studentId,sortedList[8].studentId,sortedList[9].studentId];
            var sortedListEnd = sortedList.slice(-3-n);
            worst3 = [sortedListEnd[0].studentId,sortedListEnd[1].studentId,sortedListEnd[2].studentId];
        }
        
        else if(sortedList.length > 0){
            angular.forEach(sortedList, function(student, objId){
             top10.push(student.studentId);   
            })
            // top10 = [sortedList[0].studentId];
            worst3 = [sortedList[0].studentId];
           
        }
             console.log("top10 students", top10,sortedList);

        Students.getBatch(top10).then(function(students){
            $scope.data.bestStudents = _.map(students, function(student){
                student.average = $scope.data.summarysheet[student._id][0];
                return student;
            });
            console.log(students, $scope.data.bestStudents)
        }).catch(function(error){
          console.log("Failed to find students: ", error);
        });
        Students.getBatch(worst3).then(function(students){
            $scope.data.worstStudents = _.map(students, function(student){
                student.average = $scope.data.summarysheet[student._id][0];
                return student;
            });
        }).catch(function(error){
          console.log("Failed to find students: ", error);
        });
    }
    
    $scope.changeAcRemark = function(remark){
        $scope.data.classcouncil.academicRemark[$scope.termIndex] = remark;
        $scope.save();
    }
    $scope.changeConRemark = function(remark){
        $scope.data.classcouncil.conductRemark = remark;
        $scope.save();
    }

    $scope.updatePassingScore = function(score){
        if(isNaN(Number(score))){
            $scope.score = $scope.data.classcouncil.passingScore;
        }
        else{
            $scope.score = score;
            $scope.data.classcouncil.passingScore = Number(score);
            $scope.groupStats = performanceStats();
            $scope.save();
        }
    }

    $scope.save = function(){
        $scope.data.classcouncil.save().then(function(success){
            console.log("Council saved", success);
        }).catch(function(error){
            console.log("Council save error ", error);
        });
    }

    $scope.data.remarks = [
    	{text:"Excellent", css:"remark-excellent"},
    	{text:"Very Good", css:"remark-verygood"},
    	{text:"Good", css:"remark-good"},
    	{text:"Fair", css:"remark-fair"},
    	{text:"Average", css:"remark-average"},
    	{text:"Poor", css:"remark-poor"},
    	{text:"Very Poor", css:"remark-verypoor"}
    ];


  });
