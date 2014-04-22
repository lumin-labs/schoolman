'use strict';

angular.module('SchoolMan')
  .controller('LoginCtrl', 
    function ($scope, $location, $routeParams, $user, $log, User, Path, Cache, Location, TimeTable, MockData) {


    $log.info("Path: ", $location.path());

    // Auto login flag: 1 to auto login, 0 to not auto login
    var AUTO_LOGIN = 1;
    var AUTO_LOGIN_USER = "Yovla Bivir";
    var AUTO_LOGIN_ACCESS = "admin"

    var DEFAULT_START_PAGE = {
        admin:{
            page:"students",
            view:"all"
        },
        classmaster:{
            page:"marksheet",
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
    $scope.accessLevels = {
        teacher: {name:"Teacher"},
        admin:   {name:"Administrator"},
        classmaster: {name:"Class Master"}};

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
