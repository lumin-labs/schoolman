'use strict';

function ReportcardCtrl($scope, $routeParams, model, ClassCouncils, Dcards, Users, Subjects, Students, Data2, Marksheets, Departments, Groups, Terms, SubjectTypes, Forms, Cache, Registrar, CourseCatalog, ClassMaster, TimeTable, Data, Location, Mastersheet, SchoolInfos, PROMOTE_OPTIONS) {
  	 
      var termIndex = $scope.termIndex = $routeParams.termIndex;
      
      $scope.Marksheets = Marksheets;
      $scope.ClassMaster = ClassMaster;

      $scope.open = Location.open;
      $scope.pageTitleEnglish = "ACADEMIC REPORT CARD";
      $scope.pageTitleFrench = "BULLETIN DE NOTES";
      $scope.regions = model.SchoolInfo.regions;

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
      $scope.data.summaries = [];
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
        
        var marksheetStudents = marksheets.map(function(marksheet){
          return Object.keys(marksheet.table);
        });

        // Convert marksheets to a list
        $scope.data.marksheets = _.map(Object.keys(marksheets), function(marksheetId){
          return marksheets[marksheetId];
        });
        angular.forEach($scope.data.marksheets, function(marksheet, $index){
          $scope.data.rankings[marksheet._id] = Marksheets.rank([marksheet]);
        });


        var sets = $scope.data.sets = {};
        angular.forEach($scope.data.marksheets, function(marksheet, i){

          // Types are: General, Specialized, and Other
          var type = $scope.data.subjects[marksheet.subjectId].type;
          if(!sets.hasOwnProperty(type)){
            sets[type] = {marksheets:[],
                          summsheets:[]};
          }
          sets[type].marksheets.push(marksheet);
          var summsheet = Marksheets.summarize(marksheet, termIndex);
          sets[type].summsheets.push(summsheet);
          $scope.data.summaries.push(summsheet);
        });

        angular.forEach(sets, function(set, i){
          sets[i].msheet = Marksheets.combine(set.summsheets);
          console.log("msheet", sets[i].msheet);
          sets[i].rankings = Marksheets.rank(set.marksheets);
        });

        $scope.data.msheet = Marksheets.combine($scope.data.summaries);
        $scope.data.rankings.master = Marksheets.rank($scope.data.marksheets);
        console.log("data.rankings", $scope.data.rankings);
        

        $scope.nsets = Object.keys(sets).length;

        // Create a list of student from the union of marksheet studentIds
        var studentIds = _.union(_.reduce(marksheetStudents, function(result, list){
          return result.concat(list);
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
            // console.log("Dcard data", $scope.data.dcard)
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
  ReportcardCtrl.$inject = ['$scope', '$routeParams', 'model', 'ClassCouncils', 'Dcards', 'Users', 'Subjects', 'Students', 'Data2', 'Marksheets', 'Departments', 'Groups', 'Terms', 'SubjectTypes', 'Forms', 'Cache', 'Registrar', 'CourseCatalog', 'ClassMaster', 'TimeTable', 'Data', 'Location', 'Mastersheet', 'SchoolInfos', 'PROMOTE_OPTIONS'];
  angular.module('SchoolMan').controller('reportcardCtrl', ReportcardCtrl);
