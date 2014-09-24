'use strict';

function EnrollmentCtrl($scope, $routeParams, model, Marksheets, $q, Forms, Groups, Departments, Terms, ClassCouncils, Students, Subjects) {
  var data = $scope.data = {
    forms:Forms.all(),
    groups:Groups.getAll(),
    depts:Departments.getAll(),
    subjects:Subjects.getAll(),
    classCouncils:{},
    classes:{},
    classStats:{},
    formStats:{},
    deptStats:{}
  }
  $scope.termIndex=3;

  angular.forEach(data.forms, function(form, formIndex){
    data.formStats[formIndex] = {
      boysOnRoll:0,
      girlsOnRoll:0,
      boysEOY:0,
      girlsEOY:0,
      boysPromote:0,
      girlsPromote:0,
      boysRepeat:0,
      girlsRepeat:0,
      boysWithdraw:0,
      girlsWithdraw:0,
      boysDismiss:0,
      girlsDismiss:0
    }
    data.deptStats[formIndex] = {};
    angular.forEach(data.depts, function(dept, deptId){
      data.deptStats[formIndex][deptId] = {
        boysOnRoll:0,
        girlsOnRoll:0,
        boysEOY:0,
        girlsEOY:0,
        boysPromote:0,
        girlsPromote:0,
        boysRepeat:0,
        girlsRepeat:0,
        boysWithdraw:0,
        girlsWithdraw:0,
        boysDismiss:0,
        girlsDismiss:0
      }
    })
  })
  
  data.classes = Students.getAllClasses({byDept:true})
    console.log("all classes", data.classes);

  angular.forEach(data.classes, function(row, classId){
    if(!data.classStats.hasOwnProperty(row.formIndex)){
      data.classStats[row.formIndex] = {};
    }
    if(!data.classStats[row.formIndex].hasOwnProperty(row.deptId)){
      data.classStats[row.formIndex][row.deptId] = {};
    }
    var stats = {
      boysOnRoll:0,
      girlsOnRoll:0,
      boysEOY:0,
      girlsEOY:0,
      boysPromote:0,
      girlsPromote:0,
      boysRepeat:0,
      girlsRepeat:0,
      boysWithdraw:0,
      girlsWithdraw:0,
      boysDismiss:0,
      girlsDismiss:0
    }
    var params = {
      formIndex:row.formIndex, 
      deptId:row.deptId, 
      groupId:row.groupId
    }
    //get class councils for passing score
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

      Students.query(params).then(function(students){
        angular.forEach(students, function(student, studentIndex){
          if(student.sex === "Male"){
            stats.boysOnRoll += 1;
            stats.boysEOY += 1;

            if(student.status['2014'] === 0){
              if(summarysheet.table[student._id][0]){
                if(summarysheet.table[student._id][0]>= data.classCouncils[classId].passingScore){
                  stats.boysPromote += 1;
                } else {
                  stats.boysRepeat += 1;
                }
              } else {
                stats.boysRepeat += 1;
              } 
              
            } else if(student.status['2014'] === 1){
              stats.boysPromote +=1;
            }
            else if(student.status['2014'] === 2){
              stats.boysRepeat += 1;
            } else if(student.status['2014'] === 3){
              stats.boysWithdraw += 1;
              stats.boysEOY -= 1;
            } else if(student.status['2014'] === 4){
              stats.boysDismiss += 1;
              stats.boysEOY -= 1
            }
          } else {
            stats.girlsOnRoll += 1;
            stats.girlsEOY += 1;

            if(student.status['2014'] === 0){
              if(summarysheet.table[student._id][0]){
                if(summarysheet.table[student._id][0]>= data.classCouncils[classId].passingScore){
                  stats.girlsPromote += 1;
                } else {
                  stats.girlsRepeat += 1;
                }
              } else {
                stats.girlsRepeat += 1;
              }
            } else if(student.status['2014'] === 1){
              stats.girlsPromote +=1;
            }
            else if(student.status['2014'] === 2){
              stats.girlsRepeat += 1;
            } else if(student.status['2014'] === 3){
              stats.girlsWithdraw += 1;
              stats.girlsEOY -= 1;
            } else if(student.status['2014'] === 4){
              stats.girlsDismiss += 1;
              stats.girlsEOY -= 1;
            }
          }
          data.classStats[row.formIndex][row.deptId][row.groupId] = stats;

          angular.forEach(stats, function(value, label){
            data.formStats[row.formIndex][label] += value;
            data.deptStats[row.formIndex][row.deptId][label] += value;
          })
        })
      })
    })

  });
  console.log("Class Stats", data.classStats);
  console.log("Form Stats", data.formStats);
  console.log("Dept Stats", data.deptStats);
  console.log("Class Councils", data.classCouncils);

}
EnrollmentCtrl.$inject = ['$scope', '$routeParams', 'model', 'Marksheets', '$q', 'Forms', 'Groups', 'Departments', 'Terms', 'ClassCouncils', 'Students', 'Subjects'];
angular.module('SchoolMan').controller('EnrollmentCtrl', EnrollmentCtrl);
