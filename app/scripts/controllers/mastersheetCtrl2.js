'use strict';

angular.module('SchoolMan')
  .controller('MastersheetCtrl2', function ($scope, $routeParams, Subjects, Students, Data2, Marksheets, Departments, Groups, SubjectTypes, Forms, Cache, Registrar, CourseCatalog, ClassMaster, TimeTable, Data, Location, Mastersheet, PROMOTE_OPTIONS) {
  	 
      var termIndex = $routeParams.termIndex;
      
      $scope.open = Location.open;

      $scope.test = "Test";

      $scope.data = {};
      $scope.data.marksheets = [];
      $scope.data.subjects = Subjects.getAll();
      $scope.data.summaries = {};
      $scope.data.students = [];
      $scope.data.rankings = {};

      // Load marksheet and student data
      Marksheets.query({
        formIndex:$routeParams.formIndex,
        deptId:$routeParams.deptId,
        groupId:$routeParams.groupId
      })
      .then(function(marksheets){

        // Create marksheet summaries 
        $scope.data.summaries = marksheets.map(function(marksheet){
          return Marksheets.summarize(marksheet, termIndex);
        });

        // Convert marksheets to a list
        $scope.data.marksheets= _.map(Object.keys(marksheets), function(marksheetId){
          return marksheets[marksheetId];
        });

        // generate summarySheet
        console.log("Combining Marksheets", marksheets);
        $scope.data.summaryMarksheet = Marksheets.combine($scope.data.marksheets);
        $scope.data.summarysheet = Marksheets.summarize($scope.data.summaryMarksheet, termIndex);;
        console.log("SummarySheet: ", $scope.data.summarysheet);
        $scope.data.rankings = Marksheets.rank($scope.data.summaryMarksheet);

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

  });
