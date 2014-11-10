'use strict';

function StudentsCtrl($scope, $q, $routeParams, ClassCouncils, Fees, Forms, Groups, Marksheets, Subjects, Payments, Students, Departments, model, Location, PROMOTE_OPTIONS, Lang) {

    $scope.PROMOTE_OPTIONS = PROMOTE_OPTIONS;

  	// $scope.courseId = CourseCatalog.getCourseId($routeParams);

    var data = $scope.data = {
        forms:Forms.all(),
        departments:Departments.getAll(),
        groups:Groups.getAll(),
        fees:Fees.getAll(),
        subjects:Subjects.getAll(),
        students:[],
        selected:{},
        globalSelect:0,
        page:0,
        pages:[]
    };

    $scope.formIndex = $routeParams.formIndex;
    $scope.groupId = $routeParams.groupId;
    $scope.deptId = $routeParams.deptId;
    $scope.dict = Lang.getDict();
    $scope.lang = $routeParams.lang ? $routeParams.lang : Lang.defaultLang;

    $scope.queryParams = {
        formIndex:$scope.formIndex,
        groupId:$scope.groupId,
        deptId:$scope.deptId,
        feeId:"all"
    }

    var reports = {};
    var classCouncils = {};
    var marksheetId;
    var marksheet;

    var updateStudents = function(){
      var query = {};
      angular.forEach($scope.queryParams, function(value, key){
        var all = ['all', undefined, 'undefined'];
        if(all.indexOf(value) === -1){
            query[key] = value;
        }
      });  
      //console.log("query:", query); 

      var setPassing = function(student, classId){
        var studentAverage = 0;
        if(reports[classId].total.summary){
          studentAverage = reports[classId].total.summary['table'][student._id][0];
        }
        student.passing = studentAverage >= classCouncils[classId].passingScore;            
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
        $scope.data.pages = _.range(students.length / 10);

        angular.forEach(students, function(student, studentIndex){

          // create a temporary 'passing' property for student
          // default to false
          student.passing = false;

          // set default selection state
          $scope.data.selected[student._id] = 0;
          
          // Add payment data to student
          //student.totalPaid = 0;
          //Payments.query({studentId:student._id}).then(function(payments){
          //  console.log("Got payments", student._id, payments);
          //  student.totalPaid = _.reduce(payments, function(total, payment){
          //    return total + payment.amount;
          //  },student.totalPaid);
          //}).catch(function(error){
          //  console.log("Failed to load payments for ", student.name, error);
          //});

          // add students class to reports
          var studentsClass = [student.formIndex, student.deptId, student.groupId];
          //console.log("reports/class councils", reports, classCouncils, studentsClass);
            
          
          if(reports.hasOwnProperty(studentsClass) &&  
             classCouncils.hasOwnProperty(studentsClass)){
            //console.log("in if statement reports/class councils", reports, classCouncils, studentsClass, student);


            setPassing(student, studentsClass);

          } else {
            //console.log("in else statement", reports, classCouncils, studentsClass, student);
            //getReports(studentsClass);
            //setPassing(student, studentsClass);
          }

        }); 
      }).catch(function(error){
        console.log("Error loading students", error);
      });  
    };

    
    

    var getReports = function(params){
      //console.log("in getreports reports/class councils", reports, classCouncils, studentsClass, reports[studentsClass]);
            // get report and classCOuncil promises
            //console.log("params:", params);

            var reportquery = {
              reports: Marksheets.getReports({
                formIndex:params.formIndex,
                deptId:params.deptId,
                groupId:params.groupId
            })
            }
            var councilquery = {
              classcouncil: ClassCouncils.get(model.ClassCouncil.generateID({
                formIndex:params.formIndex,
                deptId:params.deptId,
                groupId:params.groupId
              }))
            }
            var studentsClass = [params.formIndex, params.deptId, params.groupId];

            // Get reports and classCouncils
            $q.all(councilquery).then(function(data){
              //console.log("all promises: ", data);
              classCouncils[studentsClass] = data.classcouncil;
            }).catch(function(error){
              if(!classCouncils[studentsClass]){
                classCouncils[studentsClass] = new model.ClassCouncil();
              }
              // console.log("Failed to load classCouncils:", error);
            });
            $q.all(reportquery).then(function(data){
              //console.log("all promises: ", data);
              reports[studentsClass] = data.reports;
              //console.log("reports[studentsClass", reports[studentsClass], reports);
              updateStudents();
              
              
            }).catch(function(error){
                console.log("Failed to load reports", error);
                updateStudents();
            });
    }
    var queryReports = function(studentsClass){
      
      var params = angular.copy(studentsClass);
      angular.forEach(params, function(value, key){
        if(value === "all"){
          if(key === "formIndex"){
            params[key] = data.forms;
          }
          if(key === "deptId"){
            params[key] = data.departments;
          }
          if(key === "groupId"){
            params[key] = data.groups;
          }
        }
        else{
          params[key] = [value];
        }
      });

      angular.forEach(params.formIndex, function(form, formKey){
        angular.forEach(params.deptId, function(dept, deptKey){
          angular.forEach(params.groupId, function(group, groupKey){
            //console.log("formkey:", formKey, form);
            if(form.name){
              form = formKey;
            }
            if(group._id){
              group = group._id;
            }
            if(dept._id){
              dept = dept._id;
            }
            if(!(reports.hasOwnProperty(studentsClass) && classCouncils.hasOwnProperty(studentsClass))){
              getReports({formIndex:form,deptId:dept,groupId:group});
            }
            else{
              updateStudents();
            }
          })
        })
      })


      //var newArray = {};


      //console.log("query Parameters:", params);
      //getReports(studentsClass);
    }

    queryReports($scope.queryParams);
    

    $scope.setQuery = function(params){
      angular.forEach(params, function(value, key){
          $scope.queryParams[key] = value;
      });
      $scope.data.page = 0;
      //console.log("Query Params", $scope.queryParams);
      queryReports($scope.queryParams);
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
        var tagged = [];
        
        angular.forEach(data.students, function(student, $index){
            if(data.selected[student._id] === "1"){
                angular.forEach(params, function(value, key){
                    if(key === 'formIndex' || key === 'groupId' || key === 'deptId'){
                      tagged.push(student);
                    }
                    student[key] = value;
                });
                selected.push(student);
                updateStudents();
            }
        });
        Students.saveBatch(selected).catch(function(error){
            // console.log("failed to save batch", error);
        });
        removeFromMarksheet(tagged);
    };
    var removeFromMarksheet = function(students){
      angular.forEach(data.subjects, function(subject, subjectKey){
        marksheetId =  $scope.formIndex + ":" + $scope.deptId + ":" + $scope.groupId + ":" + subjectKey;
        Marksheets.get(marksheetId).then(function(success){
          marksheet = success.marksheet;
          angular.forEach(students, function(student, key){
            delete marksheet.table[student['_id']];
          });
          var deferred = $q.defer();
          marksheet.save().then(function(success){
            //console.log("Marksheet Saved:", marksheet);
            deferred.resolve(marksheet);
          }).catch(function(error){
            console.log("Failed to save marksheet", error, marksheet);
            deferred.reject(error);
          });
        }).catch(function(error){
          console.log("marksheet does not exist");
        });
      });
    }

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



  }
  StudentsCtrl.$inject = ['$scope', '$q', '$routeParams', 'ClassCouncils', 'Fees', 'Forms', 'Groups', 'Marksheets', 'Subjects', 'Payments', 'Students', 'Departments', 'model', 'Location', 'PROMOTE_OPTIONS', 'Lang'];
  angular.module('SchoolMan').controller('StudentsCtrl', StudentsCtrl);
