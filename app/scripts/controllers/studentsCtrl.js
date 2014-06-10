'use strict';

angular.module('SchoolMan')
  .controller('StudentsCtrl', function ($scope, $q, $routeParams, ClassCouncils, Fees, Forms, Groups, Marksheets, Registrar, Payments, Students, Departments, CourseCatalog, Mastersheet,  model, Data, Location, PROMOTE_OPTIONS) {

    $scope.PROMOTE_OPTIONS = PROMOTE_OPTIONS;

  	$scope.courseId = CourseCatalog.getCourseId($routeParams);


    var data = $scope.data = {
        forms:Forms.all(),
        departments:Departments.getAll(),
        groups:Groups.getAll(),
        fees:Fees.getAll(),
        students:[],
        selected:{},
        globalSelect:0
    };

    $scope.formIndex = $routeParams.formIndex;
    $scope.groupId = $routeParams.groupId;
    $scope.deptId = $routeParams.deptId;

    $scope.queryParams = {
        formIndex:$scope.formIndex,
        groupId:$scope.groupId,
        deptId:$scope.deptId,
        feeId:"all"
    }

    var reports = {};
    var classCouncils = {};

    var updateStudents = function(){
      var query = {};
      angular.forEach($scope.queryParams, function(value, key){
        var all = ['all', undefined, 'undefined'];
        if(all.indexOf(value) === -1){
            query[key] = value;
        }
      });   

      var setPassing = function(student, studentsClass){
        var studentAverage = 0;
        if(reports[studentsClass].total.summary){
          studentAverage = reports[studentsClass].total.summary[student._id][0];
        }
        student.passing = studentAverage >= classCouncils[studentsClass].passingScore;      
      };

      var getSeconds = function(_initial, _final){
        return (_final.getTime() - _initial.getTime())/1000;
      }

      var START_QUERY = new Date();
      Students.query(query).then(function(students){
        var END_QUERY = new Date();
        console.log("TIME DIFF: ", getSeconds(START_QUERY, END_QUERY));

        console.log("Success loading students", students);
        $scope.data.students = students;

        angular.forEach(students, function(student, studentIndex){

          // create a temporary 'passing' property for student
          // default to false
          student.passing = false;

          // set default selection state
          $scope.data.selected[student._id] = 0;
          
          // Add payment data to student
          student.totalPaid = 0;
          Payments.query({studentId:student._id}).then(function(payments){
            student.totalPaid = _.reduce(payments, function(total, payment){
                return total + payment.amount;
            },student.totalPaid);
          }).catch(function(error){
            console.log("Failed to load payments for ", student.name, error);
          });

          // add students class to reports
          var studentsClass = [student.formIndex, student.deptId, student.groupId];
          
          if(reports.hasOwnProperty(studentsClass) &&  
             classCouncils.hasOwnProperty(studentsClass)){

            setPassing(student, studentsClass);

          } else {

            // get report and classCOuncil promises
            var queries = {
              reports: Marksheets.getReports({
                formIndex:student.formIndex,
                deptId:student.deptId,
                groupId:student.groupId
            }),
              classcouncil: ClassCouncils.get(model.ClassCouncil.generateID({
                    formIndex:student.formIndex,
                    deptId:student.deptId,
                    groupId:student.groupId
                }))
            }

            // Get reports and classCouncils
            $q.all(queries).then(function(data){
              console.log("all promises: ", data);
              reports[studentsClass] = data.reports;
              classCouncils[studentsClass] = data.classcouncil;
              setPassing(student, studentsClass);
            }).catch(function(error){
                // console.log("Failed to load reports or classCouncils:", error);
            });
          }

        }); 
      }).catch(function(error){
        // console.log("Error loading students", error);
      });  
    };
    updateStudents();

    $scope.setQuery = function(params){
        angular.forEach(params, function(value, key){
            $scope.queryParams[key] = value;
        });
        // console.log("Query Params", $scope.queryParams);
        updateStudents();
    };

    $scope.moveTab = "form";

    $scope.toggleAll = function(){
        // console.log("toggling");
        // $scope.data.globalSelect = (parseInt($scope.data.globalSelect) + 1) % 2;
        angular.forEach($scope.data.selected, function(selection, studentId){
          $scope.data.selected[studentId] = $scope.data.globalSelect;
        });
        // console.log("Selected", $scope.data.selected);
    };

    $scope.moveSelected = function(params){
        var selected = [];
        angular.forEach(data.students, function(student, $index){
            if(data.selected[student._id]){
                angular.forEach(params, function(value, key){
                    student[key] = value;
                });
                selected.push(student);
            }
        });
        Students.saveBatch(selected).catch(function(error){
            // console.log("failed to save batch", error);
        });
    };

    $scope.open = Location.open;
    
    $scope.fees = Fees.getAll();

    // $scope.mastersheets = {};

    // $scope.groupStats = {
    //     0:{passing:0, failing:0, percentPassing:0},
    //     1:{passing:0, failing:0, percentPassing:0}
    // }
    
    // var subjects = CourseCatalog.getSubjects($routeParams.formIndex);

    // var updateGroupStats = function(group, stats){
    //     console.log("Updating ", group , stats);
    //     $scope.groupStats[group] = stats;
    // };

    // This is doing more work than it needs to because we dont need a mastersheet
    // for every course
    // var passingScore = _groups[$routeParams.groupIndex].getPromoPass($routeParams.formIndex)
    // var passingScore = 10;
    // var buildMastersheet = function(groupIndex){
        
    //     var courses = CourseCatalog.getCourses($routeParams.formIndex, groupIndex);
    //     var courseIds = courses.map(function(course){return course.id});

    //     var marksheets = ClassMaster.getMarksheets(courseIds);
    //     var mastersheet = new Mastersheet({
    //         termIndex:0,
    //         subjects:subjects,
    //         marksheets:marksheets,
    //         getSubjectKey:CourseCatalog.getSubjectKey
    //     });
    //     $scope.mastersheets[groupIndex] = mastersheet;

    //     updateGroupStats(groupIndex, mastersheet.numstats(passingScore));
    // };



  });
