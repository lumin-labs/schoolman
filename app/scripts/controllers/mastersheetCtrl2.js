'use strict';

angular.module('SchoolMan')
  .controller('MastersheetCtrl2', function ($scope, $routeParams, Subjects, Students, Data2, Marksheets, Departments, Groups, SubjectTypes, Forms, Cache, Registrar, CourseCatalog, ClassMaster, TimeTable, Data, Location, Mastersheet, PROMOTE_OPTIONS) {
  	 
      var termIndex = parseInt($routeParams.termIndex);
      
      $scope.open = Location.open;

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
      }).then(function(marksheets){

        // Convert marksheets to a list and store in $scope.data.marksheets
        $scope.data.marksheets = _.map(Object.keys(marksheets), function(marksheetId){
          return marksheets[marksheetId];
        });

        // Create marksheet summaries 
        $scope.data.summaries = marksheets.map(function(marksheet){
          var summary = Marksheets.summarize(marksheet, termIndex);
          console.log("Marksheet has been summarized: ", marksheet, summary);
          return summary;
        });

        // combine all marksheets
        $scope.data.combinedMarksheet = Marksheets.combine($scope.data.marksheets);

        // summarize combined marksheet to get grand totals
        $scope.data.summarysheet = Marksheets.summarize($scope.data.combinedMarksheet, termIndex);;
        
        // get rankings from combined marksheet
        $scope.data.rankings = Marksheets.rank($scope.data.combinedMarksheet);

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
