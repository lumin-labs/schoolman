'use strict';

angular.module('SchoolMan')
  .controller('MyclassesCtrl', function ($scope, $routeParams, $user, model,Forms, Groups, Departments,  Marksheets, Location, Registrar, CourseCatalog, TimeTable) {

  	// TimeTable returns courseRefs, CourseCatalog returns actual courses
    $scope.open = Location.open;
    $scope.allSelected = [$routeParams.formIndex,
                          $routeParams.deptId,
                          $routeParams.groupId,
                          $routeParams.subjectId].indexOf("undefined") === -1;
    
    $scope.data = {
      forms:Forms.all(),
      departments:Departments.getAll(),
      groups:Groups.getAll(),
      subjects : CourseCatalog.getAllSubjects(),
      marksheets:[],
      assignedTeacher:null
    };

    $scope.user = $user;

    // Load all classes assigned to the logged in user
    Marksheets.query({teacherId:$routeParams.username}).then(function(marksheets){
      console.log("myclasses Marksheets", marksheets);
      $scope.data.marksheets = marksheets;
    }).catch(function(error){
      console.log("Error:", error);
    });

    // If a teacher is already assigned to the selected class, load the teacher
    var marksheetId = model.Marksheet.generateID($routeParams);
    Marksheets.query({_id:marksheetId}).then(function(marksheets){
      var marksheet = marksheets[0];
      if(marksheet){
        $scope.data.assignedTeacher = $user.get(marksheet.teacherId); 
      } else {
        $scope.data.assignedTeacher = null;
      }
    });

    console.log("MyClasses routeParams", $routeParams);
    $scope.courseId = model.Marksheet.generateID($routeParams);
    $scope.username = $routeParams.username;

    $scope.getStudentsByCourse = Registrar.getStudentsByCourse;

    // Lookup if preexisting teacher
    var getTeacher = function(courseId){
        var bookmark = TimeTable.getTeacher(courseId);
        return (bookmark && $user.get(bookmark.username)) ? $user.get(bookmark.username) : null;
      };
    var courseId = CourseCatalog.getCourseId($routeParams);
    $scope.teacher = getTeacher(courseId);


    // private method
    var refreshCourseList = function(){
      // Update in-scope courses and apply to update view
      var courses = CourseCatalog.getCoursesByRef(
        TimeTable.getCourseRefs($routeParams.username)
      );

      $scope.courses = courses;
    }

    // Expects
    // { teacherId:username,
    //   courseId:courseId }
    $scope.removeBookmark = function(args){
      TimeTable.removeBookmark(args);
      refreshCourseList();
    }

     


    // START: myclasses

    /**
     * @ngdoc controller
     * @name Schoolman.controller:MainCtrl#addCourse
     * @methodOf SchoolMan.controller:MainCtrl
     * @param {bookmark} The bookmark includes the teacherId and courseId
     * @description
     *
     * ## Global Utilities
     *
     * This module houses utillities that can be used
     * across the app. There are some pretty cool and
     * uncool methods in this module so check it outizzle.
     *
     * Note, if you do not define the module using @doc module
     * and the @name with the module id, then this page won't exist!!
     */
    $scope.addBookmark = function(){
      Marksheets.createOrUpdate($scope.courseId, $routeParams.username)
      .then(function(marksheet){
        $scope.data.marksheets.push(marksheet);
        $scope.data.assignedTeacher = $user.get($routeParams.username);
      });
    };

    
  });
