'use strict';

angular.module('SchoolMan')
  .controller('LoginCtrl', 
    function ($scope, $location, $routeParams, $log, DEV, Users, Subjects, Departments, model, Path, Cache, Location, Groups) {
      console.log("Hows the call stack?")
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
      $scope.status = 200;

      // This data is used for creating the access dropdown in the login view
      // It should be moved to a service
      $scope.accessLevels = model.User.roles;

      $scope.access = $scope.accessLevels[$routeParams.accessCode];

      // Get a user object. 
      // Note: this user may not actually exist as a registered user
      $scope.tempUser = new model.User({password:''});

      $scope.login = function(page){

        var accessRequest = $routeParams.accessCode;

        Users.login($scope.tempUser, accessRequest, function(data){
          console.log("Login Data", data);
          if(data.status === 200){
            var user = data.user;
            accessRequest = accessRequest === "undefined" ? user.getHighestAccess() : accessRequest;
            console.log("accessRequest", accessRequest);

            Cache.set({user:user});

            var depts = Departments.getAll();
            console.log("Still ok", depts);
            var groups= Object.keys(Groups.getAll());
            var subjects= Object.keys(Subjects.getAll());
            

            Location.open({
              page:page || DEFAULT_START_PAGE[accessRequest].page,
              subpage:"null",
              formIndex:"0",
              deptId:depts[0],
              groupId:groups[0],
              subjectId:subjects[0],
              studentId:"U0000001",
              termIndex:0,
              username:user.username,
              accessCode:accessRequest
            });
          } else {
            $scope.status = data.status;
          }
        });
      };

      $scope.createNewAccount = function(){
          Location.open({
              page:"register",
              username:$scope.username||null
          });
      }

      $scope.checkCapsLock = function(e){
        var keyCode = e.keyCode ? e.keyCode : e.which;
        var shiftKey = e.shiftKey ? e.shiftKey : ((keyCode === 16) ? true : false);
        console.log("key code is", keyCode, shiftKey);
        if((keyCode >= 65 && keyCode <= 90 && !shiftKey) || (keyCode >= 97 && keyCode <= 122 && shiftKey)){
          $scope.capsLock = true;
        } else {
          $scope.capsLock = false;
        }
        console.log("capsLock is", $scope.capsLock);
      }


      if(DEV.AUTO_LOGIN){
          $scope.tempUser.fullname = DEV.AUTO_LOGIN_USER;
          $scope.tempUser.password = DEV.AUTO_LOGIN_PASS;
          $routeParams.accessCode = DEV.AUTO_LOGIN_ACCESS;
          var page = DEV.hasOwnProperty("AUTO_LOGIN_PAGE") ? DEV.AUTO_LOGIN_PAGE : undefined;
          $scope.login(page); 
      }
});
