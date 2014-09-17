'use strict';

function ReportsCtrl($scope, $routeParams, model, Marksheets, $q, Forms, Groups, Departments, Terms, ClassCouncils) {
  var data = $scope.data = {
    forms:Forms.all(),
    groups:Groups.getAll(),
    depts:Departments.getAll(),
    reports:{},
    classCouncils:{},
    classes:{}
  }
  // Marksheets.query().then(function(success){
  //   console.log("got marksheets", success);
  // }).catch(function(error){
  //   console.log("Failed to get marksheets");
  // })

  Marksheets.getAllClasses().then(function(success){
    console.log("all classes?", success);
    data.classes = success;

    angular.forEach(data.classes, function(row, classId){
      var reportquery = {
        reports: Marksheets.getReports({
          formIndex:row.formIndex,
          deptId:row.deptId,
          groupId:row.groupId
        })
      }
      var councilquery = {
        classcouncil: ClassCouncils.get(model.ClassCouncil.generateID({
          formIndex:row.formIndex,
          deptId:row.deptId,
          groupId:row.groupId
        }))
      }

      // Get reports and classCouncils
      
      $q.all(reportquery).then(function(success){
        $scope.data.reports[classId] = success.reports;

        $q.all(councilquery).then(function(success){
          $scope.data.classCouncils[classId] = success.classcouncil;
          console.log("Reports and Councils", data.reports, data.classCouncils);
        }).catch(function(error){
          $scope.data.classCouncils[classId] = new model.ClassCouncil();
          // console.log("Failed to load classCouncils:", error);
        });

      }).catch(function(error){
          console.log("Failed to load reports", error);
      });
    });
  }).catch(function(error){
    console.log(error);
  })

}
ReportsCtrl.$inject = ['$scope', '$routeParams', 'model', 'Marksheets', '$q', 'Forms', 'Groups', 'Departments', 'Terms', 'ClassCouncils'];
angular.module('SchoolMan').controller('ReportsCtrl', ReportsCtrl);
