'use strict';

angular.module('SchoolMan')
  .controller('StudentsCtrl', function ($scope, $routeParams, Fees, Groups, Registrar, Departments, CourseCatalog, Mastersheet, ClassMaster, Student, Uid, Data, Location, PROMOTE_OPTIONS) {

    $scope.PROMOTE_OPTIONS = PROMOTE_OPTIONS;
  	$scope.courseId = CourseCatalog.getCourseId($routeParams);

    $scope.students = Registrar.getStudentsByCourse($scope.courseId);

    var form = $routeParams.formIndex;
    var group= $routeParams.groupIndex;
    var _groups = Groups.getAll();

    $scope.groups = _groups;

    $scope.open = Location.open;

    $scope.departments = Departments.getAll();
    $scope.fees = Fees.getAll();
    console.log("Dep", Object.keys($scope.departments)[0]);
    $scope.newStudent = new Student({
    	form:form,
    	group:group,
    	id: "",
        department: Object.keys($scope.departments)[0],
        feeGroup: Object.keys($scope.fees)[0]
    });

    Data.get("uid", function(uid){
    	$scope.newStudent.id = Uid.next(uid);
    });

    
    // This is a mess
    // TODO: make better
    $scope.addStudent = function(){
        if($scope.newStudent.isValid()){
            var student = $scope.newStudent;
        	
            // Register student with ClassMaster
            var marksheets = ClassMaster.getMarksheets(CourseCatalog.getCourseIds(form, group));
            angular.forEach(marksheets, function(marksheet, $index){
                ClassMaster.addStudent(marksheet,student.id);
            });

            // Register student with the registrar
            Registrar.addStudent(student, marksheets);

            // Save registrar
        	Registrar.save(function(msg){
        		$scope.students = Registrar.getStudentsByCourse($scope.courseId);
        		$scope.$digest();
        	});

            // save last used UID
            Uid.save(student.id);

            Location.open({
                studentId:student.id,
                page:"registrarProfile"
            });

            // Reset new student
            // $scope.newStudent = new Student({
            //     form:form,
            //     group:group,
            //     id: Uid.next(student.id)
            // });


        }
    };

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
    var passingScore = _groups[$routeParams.groupIndex].getPromoPass($routeParams.formIndex)

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
