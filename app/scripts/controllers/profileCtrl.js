'use strict';
define(['profile', 'Users', 'Students', 'Forms', 'Groups', 'Departments', 'Lang'], function(profile, Users, Students, Forms, Groups, Departments, Lang){
  function ProfileCtrl($scope, $routeParams, $q, model, profile, Users, Students, Forms, Groups, Departments, Lang) {

    $scope.accessCode = $routeParams.accessCode;
    $scope.showValidation = false;

    $scope.Users = Users;
    $scope.username = $routeParams.username;
    $scope.dict = Lang.getDict();
    $scope.lang = $routeParams.lang ? $routeParams.lang : Lang.defaultLang;

    var reports = {};
    var classCouncils = {};


    var studentId = $routeParams.studentId === "0" ? "student_U0000001" : $routeParams.studentId;
    // console.log("routeParams", $routeParams);

    var data = $scope.data = {
      student:undefined,
      forms:Forms.all(),
      departments:Departments.getAll(),
      groups:Groups.getAll(),
    };

    Students.get(studentId).then(function(student){
      console.log("Found student:", student);
      $scope.data.student = student;

      // This is for reverting data.student if user starts to edit and chooses to cancel
      var studentCopy = angular.copy($scope.data.student);
      $scope.editing = false;
      $scope.edit = function(){
        $scope.editing = true;
      }
      $scope.cancel = function(){
        $scope.data.student = angular.copy(studentCopy);
        Students.set($scope.data.student);
        $scope.editing = false;
      }

    }).catch(function(error){
      console.log("profileCtrl Error: ",error);
    })

    $scope.save = function(model){
      model.save().then(function(success){
        console.log("Model saved", success);
        $scope.editing = false;
        $scope.showValidation = false;
      }).catch(function(error){
        $scope.showValidation = true;
        console.log("Failed to save model", error);
      });
    };
  }
  ProfileCtrl.$inject = ['$scope', '$routeParams', '$q', 'model', 'profile', 'Users', 'Students', 'Forms', 'Groups', 'Departments', 'Lang'];
  angular.module('SchoolMan').controller('ProfileCtrl', ProfileCtrl);
})