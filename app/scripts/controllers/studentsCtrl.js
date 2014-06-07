'use strict';

angular.module('SchoolMan')
  .controller('StudentsCtrl', function ($scope, $routeParams, Fees, Forms, Groups, Registrar, Payments, Students, Departments, CourseCatalog, Mastersheet,  model, Data, Location, PROMOTE_OPTIONS) {

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

    var updateStudents = function(){
      var query = {};
      angular.forEach($scope.queryParams, function(value, key){
        var all = ['all', undefined, 'undefined'];
        if(all.indexOf(value) === -1){
            query[key] = value;
        }
      });   
      Students.query(query).then(function(students){
        console.log("Success loading students", students);
        $scope.data.students = students;
        angular.forEach(students, function(student, studentIndex){
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
        }); 
      }).catch(function(error){
        console.log("Error loading students", error);
      });  
    };
    updateStudents();

    $scope.setQuery = function(params){
        angular.forEach(params, function(value, key){
            $scope.queryParams[key] = value;
        });
        console.log("Query Params", $scope.queryParams);
        updateStudents();
    };

    $scope.moveTab = "form";

    $scope.toggleAll = function(){
        console.log("toggling");
        // $scope.data.globalSelect = (parseInt($scope.data.globalSelect) + 1) % 2;
        angular.forEach($scope.data.selected, function(selection, studentId){
          $scope.data.selected[studentId] = $scope.data.globalSelect;
        });
        console.log("Selected", $scope.data.selected);
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
            console.log("failed to save batch", error);
        });
    };

    $scope.open = Location.open;
    
    $scope.fees = Fees.getAll();

    $scope.mastersheets = {};

    $scope.groupStats = {
        0:{passing:0, failing:0, percentPassing:0},
        1:{passing:0, failing:0, percentPassing:0}
        // ... etc - populated during buildMastersheet
    }
    
    var subjects = CourseCatalog.getSubjects($routeParams.formIndex);

    var updateGroupStats = function(group, stats){
        console.log("Updating ", group , stats);
        $scope.groupStats[group] = stats;
    };

    // This is doing more work than it needs to because we dont need a mastersheet
    // for every course
    // var passingScore = _groups[$routeParams.groupIndex].getPromoPass($routeParams.formIndex)
    var passingScore = 10;
    var buildMastersheet = function(groupIndex){
        
        var courses = CourseCatalog.getCourses($routeParams.formIndex, groupIndex);
        var courseIds = courses.map(function(course){return course.id});

        var marksheets = ClassMaster.getMarksheets(courseIds);
        var mastersheet = new Mastersheet({
            termIndex:0,
            subjects:subjects,
            marksheets:marksheets,
            getSubjectKey:CourseCatalog.getSubjectKey
        });
        $scope.mastersheets[groupIndex] = mastersheet;

        updateGroupStats(groupIndex, mastersheet.numstats(passingScore));
    };



  });
