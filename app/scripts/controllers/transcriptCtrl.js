'use strict';

function TranscriptCtrl($scope, $routeParams, model, Transcripts, Users, Subjects, Students, Marksheets, Departments, Groups, Terms, SubjectTypes, Forms, Cache, Registrar, CourseCatalog, ClassMaster, TimeTable, Data, Location, Mastersheet, SchoolInfos, PROMOTE_OPTIONS) {
  	 
      var termIndex = $scope.termIndex = $routeParams.termIndex;
      
      $scope.Marksheets = Marksheets;
      $scope.ClassMaster = ClassMaster;

      $scope.open = Location.open;

      $scope.pageTitleEnglish = "ACADEMIC TRANSCRIPT";
      $scope.pageTitleFrench = "TRANSCRIPTION SCOLAIRE";
      $scope.regions = model.SchoolInfo.regions;

      $scope.Users = Users;
      $scope.studentId = $routeParams.studentId;

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
      $scope.data.students = [];
      $scope.data.student;
      $scope.ClassMaster = ClassMaster;

      SchoolInfos.get("schoolinfo").then(function(info){
        $scope.data.schoolInfo = info;
      }).catch(function(error){
        console.log("failed to get school info", error);
      });
      


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
        console.log("Marksheets", $scope.data.marksheets);

        // generate summarySheets
        $scope.data.msheet = Marksheets.combine($scope.data.marksheets);
        $scope.data.summarysheet = Marksheets.summarize($scope.data.msheet, termIndex);
        console.log("msheet", $scope.data.msheet);
        console.log("summarysheet", $scope.data.summarysheet);

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
          console.log("Summsheets", sets[type].summsheets[marksheet._id]);
        });
        
        angular.forEach(sets, function(set, i){
          sets[i].msheet = Marksheets.combine(set.marksheets);
          sets[i].ssheet = Marksheets.summarize(sets[i].msheet, termIndex);
        });

        $scope.nsets = Object.keys(sets).length;

        // Create a list of student from the union of marksheet studentIds
        var studentIds = _.union(_.reduce($scope.data.summaries, function(result, summary){
          return result.concat(Object.keys(summary));
        },[]));

        Students.getBatch(studentIds).then(function(students){
          $scope.data.students = students;
          var studentDict = _.reduce(students, function(dict, student){
            dict[student._id] = student;
            return dict
          },{});

          $scope.data.student = studentIds.indexOf($scope.studentId) > -1 ? 
                                studentDict[$scope.studentId] :
                                students[0];
          console.log("Student: ", $scope.data.student);

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

  }
  TranscriptCtrl.$inject = ['$scope', '$routeParams', 'model', 'Transcripts','Users', 'Subjects', 'Students', 'Marksheets', 'Departments', 'Groups', 'Terms', 'SubjectTypes', 'Forms', 'Cache', 'Registrar', 'CourseCatalog', 'ClassMaster', 'TimeTable', 'Data', 'Location', 'Mastersheet', 'SchoolInfos', 'PROMOTE_OPTIONS'];
  angular.module('SchoolMan').controller('transcriptCtrl', TranscriptCtrl);
