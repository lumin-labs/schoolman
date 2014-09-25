'use strict';

function TranscriptCtrl($scope, $routeParams, model, Transcripts, Users, Subjects, Students, Marksheets, Departments, Groups, Terms, SubjectTypes, Forms, ClassMaster, Location, SchoolInfos) {
  	 
      var termIndex = $scope.termIndex = $routeParams.termIndex;
      $scope.ClassMaster = ClassMaster;

      $scope.open = Location.open;

      $scope.pageTitleEnglish = "ACADEMIC TRANSCRIPT";
      $scope.pageTitleFrench = "TRANSCRIPTION SCOLAIRE";
      $scope.regions = model.SchoolInfo.regions;
      $scope.studentId = $routeParams.studentId;

      $scope.marksheets = Marksheets;
      $scope.classMaster = ClassMaster;

      $scope.data = {};
      $scope.data.allForms = Forms.all();
      $scope.data.departments = Departments.getAll();
      $scope.data.groups = Groups.getAll();
      $scope.data.allSubjects = Subjects.getAll();
      $scope.data.subjectTypes = SubjectTypes.all();
      $scope.data.terms = Terms.getAll();
      $scope.data.term = $scope.data.terms[$routeParams.termIndex];
      $scope.data.marksheets = [];
      $scope.data.summaries = {};
      $scope.data.students = [];
      $scope.data.student;
      $scope.data.transcript;

      $scope.types = [];
      $scope.data.subjects = [];
      $scope.cycles = [{name:"First Cycle"}, {name:"Second Cycle"}];

      var renderTable = function(){
        if($scope.data.cycleIndex === 0 && $scope.data.schoolInfo.version !== "gths"){
          $scope.data.forms = [$scope.data.allForms[0], 
                                $scope.data.allForms[1], 
                                $scope.data.allForms[2], 
                                $scope.data.allForms[3], 
                                $scope.data.allForms[4]];
        } else if($scope.data.cycleIndex === 0  && $scope.data.schoolInfo.version === "gths"){
          $scope.data.forms = [$scope.data.allForms[0], 
                                $scope.data.allForms[1], 
                                $scope.data.allForms[2], 
                                $scope.data.allForms[3]];
        }else if($scope.data.cycleIndex === 1  && $scope.data.schoolInfo.version !== "gths"){
          $scope.data.forms = [$scope.data.allForms[5], $scope.data.allForms[6]];
        } else {
          $scope.data.forms = [$scope.data.allForms[4], $scope.data.allForms[5], $scope.data.allForms[6]];
        }
        console.log("Forms", $scope.data.forms);

        $scope.cells = d3.range($scope.data.forms.length * 3);

        Transcripts.get($scope.data.student._id, $scope.data.cycleIndex).then(function(success){
          $scope.data.transcript = success;

          var subjects = [];
          angular.forEach($scope.data.transcript.table, function(subject, subjectId){
            subjects.push(subject);
          })

          // var count = [];

          // if($scope.data.student.formIndex < 5){
          //   count = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
          // } else {
          //   count = [0,0,0,0,0,0];
          // }
          // console.log("blah", subjects, subjects[0], $scope.data.transcript.table);
          // angular.forEach(count, function(num, index){
          //   console.log(subjects[0][index]);
          //   if(subjects[0][index] !== ""){
          //     num += 1;
          //   }
          // })
          // console.log("Count1", angular.copy(count));
          
          $scope.data.totals = _.reduce(angular.copy(subjects), function(sum, num){
            console.log("Sum num", sum, num);
            angular.forEach(sum, function(cell, index){
              if(Number(num[index]) !== NaN){
                sum[index] = (Number(sum[index]) + Number(num[index]));
                // if(num[index] !== ""){
                //   count[index] += 1;
                // }
              }
            })
            return sum;
          });
          // console.log("Counts", count);
          // angular.forEach($scope.data.totals, function(total, index){
          //   total = total / count[index];
          // })

          if($scope.data.cycleIndex === 0 && $scope.data.schoolInfo.version !== "gths"){
            $scope.data.annuals = [ ($scope.data.totals[0]+$scope.data.totals[1]+$scope.data.totals[2]) / 3, 
                                    ($scope.data.totals[3]+$scope.data.totals[4]+$scope.data.totals[5]) / 3,
                                    ($scope.data.totals[6]+$scope.data.totals[7]+$scope.data.totals[8]) / 3,
                                    ($scope.data.totals[9]+$scope.data.totals[10]+$scope.data.totals[11]) / 3,
                                    ($scope.data.totals[12]+$scope.data.totals[13]+$scope.data.totals[14]) / 3
                                  ]
          } else if($scope.data.cycleIndex === 0 && $scope.data.schoolInfo.version === "gths"){
            $scope.data.annuals = [ ($scope.data.totals[0]+$scope.data.totals[1]+$scope.data.totals[2]) / 3, 
                                    ($scope.data.totals[3]+$scope.data.totals[4]+$scope.data.totals[5]) / 3,
                                    ($scope.data.totals[6]+$scope.data.totals[7]+$scope.data.totals[8]) / 3,
                                    ($scope.data.totals[9]+$scope.data.totals[10]+$scope.data.totals[11]) / 3
                                  ]
          } else if($scope.data.cycleIndex === 1 && $scope.data.schoolInfo.version !== "gths"){
            $scope.data.annuals = [ ($scope.data.totals[0]+$scope.data.totals[1]+$scope.data.totals[2]) / 3, 
                                    ($scope.data.totals[3]+$scope.data.totals[4]+$scope.data.totals[5]) / 3
                                  ]
          } else {
            $scope.data.annuals = [ ($scope.data.totals[0]+$scope.data.totals[1]+$scope.data.totals[2]) / 3, 
                                    ($scope.data.totals[3]+$scope.data.totals[4]+$scope.data.totals[5]) / 3,
                                    ($scope.data.totals[6]+$scope.data.totals[7]+$scope.data.totals[8]) / 3
                                  ]
          }



        }).catch(function(error){
          console.log("Failed to retrieve transcript:", error);
        })
      }

      angular.forEach($scope.data.allSubjects, function(subject, subjectId){
        $scope.data.subjects.push(subject);
        if($scope.types.indexOf($scope.data.subjectTypes[subject.type]) === -1){
          $scope.types.push($scope.data.subjectTypes[subject.type])
        }
      })

      SchoolInfos.get("schoolinfo").then(function(info){
        $scope.data.schoolInfo = info;
        Students.query({formIndex:$routeParams.formIndex, deptId:$routeParams.deptId, groupId:$routeParams.groupId})
            .then(function(students){
          $scope.data.students = students;
          var studentDict = _.reduce(students, function(dict, student){
            dict[student._id] = student;
            return dict
          },{});

          $scope.data.student = studentDict.hasOwnProperty($scope.studentId) ? 
                                studentDict[$scope.studentId] :
                                students[0];

          if($scope.data.student.formIndex < 5){
            $scope.data.cycleIndex = 0;
          } else {
            $scope.data.cycleIndex = 1;
          }

          renderTable();
          

        // Catch errors
        }).catch(function(error){
          console.log("Failed to find students: ", error);
        });
      }).catch(function(error){
        console.log("failed to get school info", error);
      });


    $scope.getMark = function(d){
      var i = (parseInt(d.t) + 1) * 2 + d.s - 2;
      return d.row ? d.row[i] : undefined;
    }

    var hasChanged = false;


    $scope.noteChange = function(){
      hasChanged = true;
      console.log("change noted.");
    }

    var updateTotals = function(cellIndex){
      $scope.data.totals[cellIndex] = 0;

      angular.forEach($scope.data.subjects, function(subject, subjectId){
        if(Number($scope.data.transcript['table'][subject._id][cellIndex]) !== NaN){
          $scope.data.totals[cellIndex] += Number($scope.data.transcript['table'][subject._id][cellIndex]);
        }
      })
      console.log("totals", $scope.data.totals);

      if($scope.data.cycleIndex === 0 && $scope.data.schoolInfo.version !== "gths"){
        $scope.data.annuals = [ ($scope.data.totals[0]+$scope.data.totals[1]+$scope.data.totals[2]) / 3, 
                                ($scope.data.totals[3]+$scope.data.totals[4]+$scope.data.totals[5]) / 3,
                                ($scope.data.totals[6]+$scope.data.totals[7]+$scope.data.totals[8]) / 3,
                                ($scope.data.totals[9]+$scope.data.totals[10]+$scope.data.totals[11]) / 3,
                                ($scope.data.totals[12]+$scope.data.totals[13]+$scope.data.totals[14]) / 3
                              ]
      } else if($scope.data.cycleIndex === 0 && $scope.data.schoolInfo.version === "gths"){
        $scope.data.annuals = [ ($scope.data.totals[0]+$scope.data.totals[1]+$scope.data.totals[2]) / 3, 
                                ($scope.data.totals[3]+$scope.data.totals[4]+$scope.data.totals[5]) / 3,
                                ($scope.data.totals[6]+$scope.data.totals[7]+$scope.data.totals[8]) / 3,
                                ($scope.data.totals[9]+$scope.data.totals[10]+$scope.data.totals[11]) / 3
                              ]
      } else if($scope.data.cycleIndex === 1 && $scope.data.schoolInfo.version !== "gths"){
        $scope.data.annuals = [ ($scope.data.totals[0]+$scope.data.totals[1]+$scope.data.totals[2]) / 3, 
                                ($scope.data.totals[3]+$scope.data.totals[4]+$scope.data.totals[5]) / 3
                              ]
      } else {
        $scope.data.annuals = [ ($scope.data.totals[0]+$scope.data.totals[1]+$scope.data.totals[2]) / 3, 
                                ($scope.data.totals[3]+$scope.data.totals[4]+$scope.data.totals[5]) / 3,
                                ($scope.data.totals[6]+$scope.data.totals[7]+$scope.data.totals[8]) / 3
                              ]
      }

    }

    $scope.changeCycle = function(cycleIndex){
      $scope.data.cycleIndex = cycleIndex;
    }

    $scope.save = function(subjectId, cellIndex){
      console.log("in save", subjectId, cellIndex);
      if(hasChanged){
        var value = $scope.data.transcript['table'][subjectId][cellIndex];
        // console.log("number?", isNaN(Number(value)));
        if(subjectId){
            if(value > 20 || value < 0 || isNaN(Number(value))){
                $scope.data.transcript['table'][subjectId][cellIndex] = "";
            }
        }
        // console.log("Saving: ", $scope.data.marksheet);
        $scope.data.transcript.save().then(function(success){
          updateTotals(cellIndex);
          console.log("Saved....");
          hasChanged = false;         
        }).catch(function(error){
          console.log("Save error: ", error);
        });
      } else {
        }
    };

  }
  TranscriptCtrl.$inject = ['$scope', '$routeParams', 'model', 'Transcripts','Users', 'Subjects', 'Students', 'Marksheets', 'Departments', 'Groups', 'Terms', 'SubjectTypes', 'Forms', 'ClassMaster', 'Location', 'SchoolInfos'];
  angular.module('SchoolMan').controller('transcriptCtrl', TranscriptCtrl);
