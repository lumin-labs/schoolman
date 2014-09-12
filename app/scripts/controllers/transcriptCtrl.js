'use strict';

function TranscriptCtrl($scope, $routeParams, model, ClassCouncils, Dcards, Users, Subjects, Students, Data2, Marksheets, Departments, Groups, Terms, SubjectTypes, Forms, Cache, Registrar, CourseCatalog, ClassMaster, TimeTable, Data, Location, Mastersheet, SchoolInfos, PROMOTE_OPTIONS) {
  	 
      var termIndex = $scope.termIndex = $routeParams.termIndex;
      
      $scope.Marksheets = Marksheets;
      $scope.ClassMaster = ClassMaster;

      $scope.open = Location.open;
      //$scope.schoolNameEn = "GOVERNMENT BILINGUAL HIGH SCHOOL ATIELA-NKWEN";
      //$scope.schoolNameFr = "LYCEE BILINGUE D'ATIELA-NKWEN";
      $scope.pageTitleEnglish = "ACADEMIC TRANSCRIPT";
      $scope.pageTitleFrench = "TRANSCRIPTION SCOLAIRE";
      //$scope.schoolYear = SCHOOLYEAR.year;

      $scope.PROMOTE_OPTIONS = PROMOTE_OPTIONS;
      $scope.Users = Users;
      $scope.getRemark = ClassMaster.getRemark;
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
      $scope.data.rankings = {};
      $scope.data.students = [];
      $scope.data.student;
      $scope.ClassMaster = ClassMaster;

      SchoolInfos.get("schoolinfo").then(function(info){
        $scope.data.schoolInfo = info;
        //console.log("school info retrieved", $scope.data.schoolInfo);
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
        angular.forEach($scope.data.marksheets, function(marksheet, $index){
          $scope.data.rankings[marksheet._id] = Marksheets.rank(marksheet);
        });
        console.log("Marksheets", $scope.data.marksheets);
        console.log("Rankings", $scope.data.rankings);

        // generate summarySheets
        $scope.data.msheet = Marksheets.combine($scope.data.marksheets);
        $scope.data.summarysheet = Marksheets.summarize($scope.data.msheet, termIndex);
        console.log("msheet", $scope.data.msheet);
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
          console.log("Summsheets", sets[type].summsheets[marksheet._id]);
        });
        
        angular.forEach(sets, function(set, i){
          sets[i].msheet = Marksheets.combine(set.marksheets);
          sets[i].ssheet = Marksheets.summarize(sets[i].msheet, termIndex);
          sets[i].rankings = Marksheets.rank(sets[i].msheet);
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

          

          Dcards.get($scope.data.student._id).then(function(dcard){
            $scope.data.dcard = dcard;
            console.log("Dcard data", $scope.data.dcard)
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

      ClassCouncils.get(model.ClassCouncil.generateID($routeParams))
        .then(function(classcouncil){
          $scope.passingScore = classcouncil.passingScore; 
        }).catch(function(error){
          $scope.passingScore = 10;
        });

      // Data2.get(model.ClassCouncil.generateID($routeParams)).then(function(data){
      //   var spec = model.parse2(data, data.datatype);
      //   var classcouncil = new model.ClassCouncil(spec);
      //   $scope.passingScore = classcouncil.passingScore; 
      // })

      $scope.getMark = function(d){
        var i = (parseInt(d.t) + 1) * 2 + d.s - 2;
        return d.row ? d.row[i] : undefined;
      }

  }
  TranscriptCtrl.$inject = ['$scope', '$routeParams', 'model', 'ClassCouncils', 'Dcards', 'Users', 'Subjects', 'Students', 'Data2', 'Marksheets', 'Departments', 'Groups', 'Terms', 'SubjectTypes', 'Forms', 'Cache', 'Registrar', 'CourseCatalog', 'ClassMaster', 'TimeTable', 'Data', 'Location', 'Mastersheet', 'SchoolInfos', 'PROMOTE_OPTIONS'];
  angular.module('SchoolMan').controller('transcriptCtrl', TranscriptCtrl);
