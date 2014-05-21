'use strict';

angular.module('SchoolMan')
  .controller('StudentsCtrl', function ($scope, $routeParams, Fees, Forms, Groups, Registrar, Students, Departments, CourseCatalog, Mastersheet, ClassMaster, model, Data, Location, PROMOTE_OPTIONS) {

    $scope.PROMOTE_OPTIONS = PROMOTE_OPTIONS;
  	$scope.courseId = CourseCatalog.getCourseId($routeParams);

    $scope.formIndex = $routeParams.formIndex;
    $scope.groupId = $routeParams.groupId;
    $scope.deptId = $routeParams.deptId;

    var data = $scope.data = {
        forms:Forms.all(),
        departments:Departments.getAll(),
        groups:Groups.getAll(),
        fees:Fees.getAll(),
        students:[]
    };

    var queryParams = {
        formIndex:$scope.formIndex,
        groupId:$scope.groupId,
        deptId:$scope.deptId
    }
    Students.query(queryParams).then(function(students){
        console.log("Success loading students", students);
        $scope.data.students = students;
    }).catch(function(error){
        console.log("Error loading students", error);
    });

    

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

    buildMastersheet($routeParams.groupIndex);
    var mastersheet = $scope.mastersheets[$routeParams.groupIndex];
    
    $scope.studentStatus = mastersheet.getStudentStatus(passingScore);
    

  });
