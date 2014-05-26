'use strict';

angular.module('SchoolMan')
  .controller('reportcardCtrl', function ($scope, $routeParams, Dcards, Subjects, Students, Data2, Marksheets, Departments, Groups, Terms, SubjectTypes, Forms, Cache, Registrar, CourseCatalog, ClassMaster, TimeTable, Data, Location, Mastersheet, PROMOTE_OPTIONS) {
  	 
      var termIndex = $scope.termIndex = $routeParams.termIndex;
      
      $scope.open = Location.open;

      $scope.data = {};
      $scope.data.forms = Forms.all();
      $scope.data.departments = Departments.getAll();
      $scope.data.groups = Groups.getAll();
      $scope.data.subjects = Subjects.getAll();
      $scope.data.terms = Terms.getAll();
      $scope.data.term = $scope.data.terms[$routeParams.termIndex];
      $scope.data.marksheets = [];
      $scope.data.summaries = {};
      $scope.data.rankings = {};
      $scope.data.students = [];
      $scope.data.student;

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

        console.log("Marksheets", $scope.data.marksheets);

        // generate summarySheets
        $scope.data.msheet = Marksheets.combine($scope.data.marksheets);
        $scope.data.summarysheet = Marksheets.summarize($scope.data.msheet, termIndex);
        console.log("summarysheet", $scope.data.summarysheet);
        $scope.data.rankings = Marksheets.rank($scope.data.msheet);

        var sets = $scope.data.sets = {};
        angular.forEach($scope.data.marksheets, function(marksheet, i){
          var type = $scope.data.subjects[marksheet.subjectId].type;
          if(!sets.hasOwnProperty(type)){
            sets[type] = {marksheets:[],
                          summsheets:{}};
          }
          sets[type].marksheets.push(marksheet);
          sets[type].summsheets[marksheet._id] = Marksheets.summarize(marksheet, termIndex);
        });
        angular.forEach(sets, function(set, i){
          sets[i].msheet = Marksheets.combine(set.marksheets);
          sets[i].ssheet = Marksheets.summarize(sets[i].msheet, termIndex);
          sets[i].rankings = Marksheets.rank(sets[i].msheet);
        });

        console.log("sets", sets);

        // Create a list of student from the union of marksheet studentIds
        var studentIds = _.union(_.reduce($scope.data.summaries, function(result, summary){
          return result.concat(Object.keys(summary));
        },[]));

        Students.getBatch(studentIds).then(function(students){
          $scope.data.students = _.map(Object.keys(students), function(studentId){
            return students[studentId];
          });
          $scope.data.student = students[$routeParams.studentId];
          Dcards.get($scope.data.student._id).then(function(dcard){
            $scope.data.dcard = dcard;
            console.log("Dcard", dcard);
          }).catch(function(error){
            console.log("Failed to get dcard", error);
          })


        // Catch errors
        }).catch(function(error){
          console.log("Failed to find students: ", error);
        });
      })
      .catch(function(error){
        console.log("Failed to find marksheets", error);
      });


      $scope.getMark = function(d){
        console.log($scope.termIndex);
        var i = (parseInt(d.t) + 1) * 2 + d.s - 2;
        console.log("getMark", d, i)
        return d.row[i];
      }

  });
