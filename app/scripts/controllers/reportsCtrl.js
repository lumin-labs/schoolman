'use strict';

function ReportsCtrl($scope, $routeParams, model, Marksheets, $q, Forms, Groups, Departments, Terms, ClassCouncils, Students, Subjects) {
  var data = $scope.data = {
    forms:Forms.all(),
    groups:Groups.getAll(),
    depts:Departments.getAll(),
    subjects:Subjects.getAll(),
    classCouncils:{},
    classes:{},
    classStats:{},
    formStats:{},
    // deptStats:{}
  }
  $scope.termIndex=3;
  $scope.formIndex = $routeParams.formIndex;

  // angular.forEach(data.forms, function(form, formIndex){
    data.formStats = {
      numStudents:0,
      numPresent:0,
      passing:0,
      aveHigh:0,
      aveLow:21,
      aveClass:0,
      goodSubjects:[],
      poorSubjects:[],
      promote:0,
      repeat:0,
      withdrawal:0,
      dismiss:0
    }

    Marksheets.query({formIndex:$scope.formIndex}).then(function(marksheets){
      var summaries = _.map(marksheets , function(marksheet){
        var summary = Marksheets.summarize(marksheet, $scope.termIndex);
        summary.subjectId = marksheet.subjectId;
        return summary;
      });

      var subjectMarksheets = {};
      var subjectAves = [];
      angular.forEach(summaries, function(marksheet, marksheetId){
        if(!subjectMarksheets.hasOwnProperty(marksheet.subjectId)){
          subjectMarksheets[marksheet.subjectId] = [];
        }
        subjectMarksheets[marksheet.subjectId].push(marksheet);
      })

      angular.forEach(subjectMarksheets, function(marksheets, subjectId){
        var subjectMarksheet = Marksheets.combine(marksheets);
        var count = 0;
        var sum = 0;
        angular.forEach(subjectMarksheet.table, function(student, studentId){
          if(student[0] !== "" && student[0] !== -1){
            count += 1;
            sum += student[0];
          }
        });
        subjectAves.push({subject:subjectId, average:(sum / count)});
      });

      var sortedBySubject = subjectAves.sort(function(a,b){
          a.average[0] - b.average[0];
        });

        var n = 0;
        angular.forEach(sortedBySubject, function(subject, objId){
          if(subject.average === 0){
            n += 1;
          }
        })

        if(sortedBySubject.length - n > 2){ 
          data.formStats.goodSubjects = [sortedBySubject[0], sortedBySubject[1], sortedBySubject[2]];
          data.formStats.poorSubjects = angular.copy(sortedBySubject).slice(-3-n);
        } else if(sortedBySubject.length - n > 1){ 
          data.formStats.goodSubjects = [sortedBySubject[0], sortedBySubject[1]];
          data.formStats.poorSubjects = [sortedBySubject[0], sortedBySubject[1]];
        } else if(sortedBySubject.length - n > 0){ 
          data.formStats.goodSubjects = [sortedBySubject[0]];
          data.formStats.poorSubjects = [sortedBySubject[0]];
        }

    })
    // data.deptStats[$scope.formIndex] = {};
    // angular.forEach(data.depts, function(dept, deptId){
    //   data.deptStats[$scope.formIndex][deptId] = {
    //     numStudents:0,
    //     numPresent:0,
    //     passing:0,
    //     aveHigh:0,
    //     aveLow:21,
    //     aveClass:0,
    //     promote:0,
    //     repeat:0,
    //     withdrawal:0,
    //     dismiss:0
    //   }
    // })
  // })
  
  Marksheets.getAllClasses($scope.formIndex, {byDept:false}).then(function(success){
    console.log("all classes", success);
    data.classes = success;

    angular.forEach(data.classes, function(row, classId){
      // if(!data.classStats.hasOwnProperty($scope.formIndex)){
      //   data.classStats[$scope.formIndex] = {};
      // }
      // if(!data.classStats[$scope.formIndex].hasOwnProperty(row.deptId)){
      //   data.classStats[$scope.formIndex][row.deptId] = {};
      // }
      var params = {
        formIndex:$scope.formIndex, 
        // deptId:row.deptId, 
        groupId:row.groupId
      }
      ClassCouncils.get(model.ClassCouncil.generateID(params)).then(function(success){
        data.classCouncils[classId] = success;
      }).catch(function(error){
        data.classCouncils[classId] = new model.ClassCouncil();
      });


      Marksheets.query(params).then(function(marksheets){

        var summaries = _.map(marksheets , function(marksheet){
          var summary = Marksheets.summarize(marksheet, $scope.termIndex);
          summary.subjectId = marksheet.subjectId;
          return summary;
        });

        var summarysheet = Marksheets.combine(summaries);

        var stats = {
          numStudents:0,
          numPresent:0,
          passing:0,
          aveHigh:0,
          aveLow:21,
          aveClass:0,
          goodSubjects:[],
          poorSubjects:[],
          promote:0,
          repeat:0,
          withdrawal:0,
          dismiss:0
        }


        var sum = 0;

        angular.forEach(summarysheet.table, function(student, studentId){
          stats.numStudents += 1;

          if(student[0] !== "" && student[0] !== -1){
            stats.numPresent += 1;
            sum += student[0];
            if(student[0] >= data.classCouncils[classId].passingScore){
              stats.passing += 1;
            }
            if(student[0] > stats.aveHigh){
              stats.aveHigh = student[0];
            }
            if(student[0] < stats.aveLow){
              stats.aveLow = student[0];
            }
          }
        })

        stats.aveClass = sum / stats.numPresent;

        var subjectMarksheets = {};
        var subjectAves = [];
        angular.forEach(summaries, function(marksheet, marksheetId){
          if(!subjectMarksheets.hasOwnProperty(marksheet.subjectId)){
            subjectMarksheets[marksheet.subjectId] = [];
          }
          subjectMarksheets[marksheet.subjectId].push(marksheet);
        })

        angular.forEach(subjectMarksheets, function(marksheets, subjectId){
          var subjectMarksheet = Marksheets.combine(marksheets);
          var count = 0;
          var sum = 0;
          angular.forEach(subjectMarksheet.table, function(student, studentId){
            if(student[0] !== "" && student[0] !== -1){
              count += 1;
              sum += student[0];
            }
          });
          subjectAves.push({subject:subjectId, average:(sum / count)});
        });

        var sortedBySubject = subjectAves.sort(function(a,b){
          a.average[0] - b.average[0];
        });

        var n = 0;
        angular.forEach(sortedBySubject, function(subject, objId){
          if(subject.average === 0){
            n += 1;
          }
        })
        if(sortedBySubject.length - n > 2){ 
          stats.goodSubjects = [sortedBySubject[0], sortedBySubject[1], sortedBySubject[2]];
          stats.poorSubjects = sortedBySubject.slice(-3-n);
        } else if(sortedBySubject.length - n > 1){ 
          stats.goodSubjects = [sortedBySubject[0], sortedBySubject[1]];
          stats.poorSubjects = [sortedBySubject[0], sortedBySubject[1]];
        } else if(sortedBySubject.length - n > 0){ 
          stats.goodSubjects = [sortedBySubject[0]];
          stats.poorSubjects = [sortedBySubject[0]];
        }

        var studentIds = _.union(_.reduce(summaries, function(result, summary){
          return result.concat(Object.keys(summary.table));
        },[]));

        Students.getBatch(studentIds).then(function(students){
          console.log("Students:", students);
          angular.forEach(students, function(student, studentIndex){
            if(student.status['2014'] === 0 && summarysheet.table[student._id][0] >= data.classCouncils[classId].passingScore){
              stats.promote += 1;
            } else if(student.status['2014'] === 1){
              stats.promote +=1;
            }
            else if(student.status['2014'] === 0 || student.status['2014'] === 2){
              stats.repeat += 1;
            } else if(student.status['2014'] === 3){
              stats.withdrawal += 1;
            } else if(student.status['2014'] === 4){
              stats.dismiss += 1;
            }
          })
          //update form and dept totals
          data.formStats.promote += stats.promote;
          data.formStats.repeat += stats.repeat;
          data.formStats.withdrawal += stats.withdrawal;
          data.formStats.dismiss += stats.dismiss;
          // data.deptStats[$scope.formIndex][row.deptId].promote += stats.promote;
          // data.deptStats[$scope.formIndex][row.deptId].repeat += stats.repeat;
          // data.deptStats[$scope.formIndex][row.deptId].withdrawal += stats.withdrawal;
          // data.deptStats[$scope.formIndex][row.deptId].dismiss += stats.dismiss;
        });

        data.classStats[row.groupId] = stats;
        // console.log("Subjects, classStatsgoodSub, name", subjects, data.classStats[$scope.formIndex][row.deptId][row.groupId].goodSubjects[0], subjects[data.classStats[$scope.formIndex][row.deptId][row.groupId].goodSubjects[0]].en)

        //update form stats
        var newSum = data.formStats.aveClass * data.formStats.numPresent + stats.aveClass * stats.numPresent; 
        var newNum = data.formStats.numPresent + stats.numPresent;

        data.formStats.numStudents += stats.numStudents;
        data.formStats.numPresent += stats.numPresent;
        data.formStats.passing += stats.passing;
        data.formStats.aveClass = newSum / newNum;

        if(stats.aveHigh > data.formStats.aveHigh){
          data.formStats.aveHigh = stats.aveHigh;
        }
        if(stats.aveLow < data.formStats.aveLow){
          data.formStats.aveLow = stats.aveLow;
        }

        //update dept stats
        // var newSum = data.deptStats[$scope.formIndex][row.deptId].aveClass * data.deptStats[$scope.formIndex][row.deptId].numPresent + stats.aveClass * stats.numPresent; 
        // var newNum = data.deptStats[$scope.formIndex][row.deptId].numPresent + stats.numPresent;

        // data.deptStats[$scope.formIndex][row.deptId].numStudents += stats.numStudents;
        // data.deptStats[$scope.formIndex][row.deptId].numPresent += stats.numPresent;
        // data.deptStats[$scope.formIndex][row.deptId].passing += stats.passing;
        // data.deptStats[$scope.formIndex][row.deptId].aveClass = newSum / newNum;

        // if(stats.aveHigh > data.deptStats[$scope.formIndex][row.deptId].aveHigh){
        //   data.deptStats[$scope.formIndex][row.deptId].aveHigh = stats.aveHigh;
        // }
        // if(stats.aveLow < data.deptStats[$scope.formIndex][row.deptId].aveLow){
        //   data.deptStats[$scope.formIndex][row.deptId].aveLow = stats.aveLow;
        // }        
      
      }).catch(function(error){
          console.log("Failed to get marksheets", error);
      });
    });
  }).catch(function(error){
    console.log(error);
  });
  console.log("Class Stats", data.classStats);
  console.log("Form Stats", data.formStats);
  // console.log("Dept Stats", data.deptStats);
  console.log("Class Councils", data.classCouncils);

}
ReportsCtrl.$inject = ['$scope', '$routeParams', 'model', 'Marksheets', '$q', 'Forms', 'Groups', 'Departments', 'Terms', 'ClassCouncils', 'Students', 'Subjects'];
angular.module('SchoolMan').controller('ReportsCtrl', ReportsCtrl);
