'use strict';

angular.module('SchoolMan')
  .controller('reportcardCtrl', function ($scope, $routeParams, Dcards, Users, Subjects, Students, Data2, Marksheets, Departments, Groups, Terms, SubjectTypes, Forms, Cache, Registrar, CourseCatalog, ClassMaster, TimeTable, Data, Location, Mastersheet, PROMOTE_OPTIONS) {
  	 
      var termIndex = $scope.termIndex = $routeParams.termIndex;
      
      $scope.Marksheets = Marksheets;

      $scope.open = Location.open;
      $scope.pageTitleEnglish = "ACADEMIC REPORT CARD";
      $scope.pageTitleFrench = "BULLETIN DE NOTES";

      $scope.PROMOTE_OPTIONS = PROMOTE_OPTIONS;
      $scope.Users = Users;
      $scope.getRemark = ClassMaster.getRemark;

      $scope.data = {};
      $scope.data.forms = Forms.all();
      $scope.data.departments = Departments.getAll();
      $scope.data.groups = Groups.getAll();
      $scope.data.subjects = Subjects.getAll();
      $scope.data.subjectTypes = SubjectTypes.all();
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
        $scope.data.marksheets = _.map(Object.keys(marksheets), function(marksheetId){
          return marksheets[marksheetId];
        });
        angular.forEach($scope.data.marksheets, function(marksheet, $index){
          $scope.data.rankings[marksheet._id] = Marksheets.rank(marksheet);
        });
        console.log("Marksheets", $scope.data.marksheets);
        console.log("Rankings", $scope.data.rankings);

        // generate summarySheets
        $scope.data.msheet = Marksheets.combine($scope.data.marksheets);
        $scope.data.summarysheet = Marksheets.summarize($scope.data.msheet, termIndex);
        console.log("summarysheet", $scope.data.summarysheet);
        $scope.data.rankings.master = Marksheets.rank($scope.data.msheet);

        var sets = $scope.data.sets = {};
        angular.forEach($scope.data.marksheets, function(marksheet, i){

          // Types are: General, Specialized, and Other
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
        console.log("student ids", studentIds);

        Students.getBatch(studentIds).then(function(students){
          $scope.data.students = students;
          $scope.data.student = _.reduce(students, function(dict, student){
            dict[student._id] = student;
            return dict
          },{})[$routeParams.studentId];
          console.log("Student: ", $scope.data.student);
          Dcards.get($scope.data.student._id).then(function(dcard){
            $scope.data.dcard = dcard;
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
        var i = (parseInt(d.t) + 1) * 2 + d.s - 2;
        return d.row ? d.row[i] : undefined;
      }

  });
