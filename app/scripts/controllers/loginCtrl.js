'use strict';

angular.module('SchoolMan')
  .controller('LoginCtrl', 
    function ($scope, $location, $routeParams, $log, DEV, Users, Subjects, Departments, model, Path, Cache, Location, TimeTable, MockData, Groups) {
      console.log("Departments: ", Departments)
      $log.info("Path: ", $location.path()); 

      var DEFAULT_START_PAGE = {
          admin:{
              page:"users"
          },
          classmaster:{
              page:"classmasterMarksheet"
          },
          registrar:{
              page:"registration"
          },
          teacher:{
              page:"myclasses"
          }
      }

      $scope.open = Location.open;
      $scope.page = $routeParams.page;

      // This data is used for creating the access dropdown in the login view
      // It should be moved to a service
      $scope.accessLevels = model.User.roles;

      $scope.access = $scope.accessLevels[$routeParams.accessCode];

      // Get a user object. 
      // Note: this user may not actually exist as a registered user
      $scope.tempUser = new model.User();

      $scope.login = function(page){

        var accessRequest = $routeParams.accessCode;

        Users.login($scope.tempUser, accessRequest, function(user){
          if(user){
            
            accessRequest = accessRequest === "undefined" ? user.getHighestAccess() : accessRequest;
            console.log("accessRequest", accessRequest);

            Cache.set({user:user});
            Location.open({
              page:page || DEFAULT_START_PAGE[accessRequest].page,
              subpage:"null",
              formIndex:"0",
              deptId:Object.keys(Departments.getAll())[0],
              groupId:Object.keys(Groups.getAll())[0],
              subjectId:Object.keys(Subjects.getAll())[0],
              studentId:"U0000001",
              termIndex:0,
              username:user.username,
              accessCode:accessRequest
            });
          } else {
            Location.open({
              page:"login404",
              username:$scope.tempUser.fullname,
              accessCode:$routeParams.accessCode
            });
          }
        });
      };

      $scope.createNewAccount = function(){
          Location.open({
              page:"register",
              username:$scope.username||null
          });
      }


      if(DEV.AUTO_LOGIN){
          $scope.tempUser.fullname = DEV.AUTO_LOGIN_USER;
          $routeParams.accessCode = DEV.AUTO_LOGIN_ACCESS;
          var page = DEV.hasOwnProperty("AUTO_LOGIN_PAGE") ? DEV.AUTO_LOGIN_PAGE : undefined;
          $scope.login(page); 
      }
});
