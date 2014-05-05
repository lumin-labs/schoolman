'use strict';

angular.module('SchoolMan')
  .controller('LoginCtrl', 
    function ($scope, $location, $routeParams, $user, $log, DEV, User, Path, Cache, Location, TimeTable, MockData) {


    $log.info("Path: ", $location.path());

    // Auto login flag: 1 to auto login, 0 to not auto login
    var AUTO_LOGIN = DEV.AUTO_LOGIN;
    var AUTO_LOGIN_USER = DEV.AUTO_LOGIN_USER;
    var AUTO_LOGIN_ACCESS = DEV.AUTO_LOGIN_ACCESS;

    var DEFAULT_START_PAGE = {
        admin:{
            page:"users",
            view:"all"
        },
        classmaster:{
            page:"classmasterMarksheet",
            view:"all"
        },
        registrar:{
            page:"registration",
            view:"all"
        },
        teacher:{
            page:"myclasses",
            view:"simple"}
    }

    $scope.open = Location.open;
    $scope.page = $routeParams.page;

    // This data is used for creating the access dropdown in the login view
    // It should be moved to a service
    $scope.accessLevels = User.roles;

    $scope.access = $scope.accessLevels[$routeParams.accessCode];

    // Get a user object. 
    // Note: this user may not actually exist as a registered user
    $scope.userData = {
        fullname:$routeParams.fullname === 'null' ? '' : $routeParams.fullname, 
        accessCode:$routeParams.accessCode
    };

    $scope.login = function(){
        var tempUser = $user.create($scope.userData);
        var accessRequest = $scope.userData.accessCode;

        $user.login(tempUser, accessRequest, function(user){
            if(user){
                
                Cache.set({user:user});

                Location.open({
                    page:DEFAULT_START_PAGE[accessRequest].page,
                    view:DEFAULT_START_PAGE[accessRequest].view,
                    formIndex:0,
                    groupIndex:0,
                    subjectKey:'engl',
                    studentId:0,
                    termIndex:0,
                    username:user.username,
                    accessCode:$scope.userData.accessCode});
            } else {
                Location.open({
                    page:"login404",
                    username:$scope.userData.fullname,
                    accessCode:$scope.userData.accessCode
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


    if(AUTO_LOGIN){
        $scope.userData.fullname = AUTO_LOGIN_USER;
        $scope.userData.accessCode = AUTO_LOGIN_ACCESS;
        $scope.login(); 
    }
    

  });
