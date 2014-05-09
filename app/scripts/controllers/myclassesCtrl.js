'use strict';

angular.module('SchoolMan')
  .controller('MyclassesCtrl', function ($scope, $routeParams, $user, Location, Registrar, CourseCatalog, TimeTable) {

  	// TimeTable returns courseRefs, CourseCatalog returns actual courses
    $scope.courses = CourseCatalog.getCoursesByRef(
      TimeTable.getCourseRefs($routeParams.username)
    );

	  $scope.courseId = CourseCatalog.getCourseId($routeParams);
    $scope.username = $routeParams.username;

    $scope.open = Location.open;
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
      TimeTable.addBookmark($scope.courseId, $scope.username);
      refreshCourseList();
    };

    
  });
