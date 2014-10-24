'use strict';

function UsersCtrl($scope, $routeParams, Users, model, Location, SchoolInfos, Lang) {
    
    $scope.data = {};
    $scope.data.users = Users.getAll();
    $scope.User = model.User;
    $scope.tempUser = new model.User();
    $scope.dict = Lang.getDict();

    $scope.open = Location.open;
    $scope.username = $routeParams.username;

    SchoolInfos.get("schoolinfo").then(function(info){
      $scope.schoolInfo = info;

      if($scope.schoolInfo.version === "gths"){
        $scope.User.roles.classmaster.name = "Head of Dept";
      }
    }).catch(function(error){
      console.log("failed to load school info", error);
    })

    $scope.addUser = function(){
    	$scope.tempUser.save().then(function(success){
        $scope.data.users[success.id] = $scope.tempUser;
    	  $scope.tempUser = new model.User();
      }).catch(function(error){
        console.log("Could not save user:", error);
      });
    };

    $scope.remove = Users.remove;

  }
UsersCtrl.$inject = ['$scope', '$routeParams', 'Users', 'model', 'Location', 'SchoolInfos', 'Lang'];
angular.module('SchoolMan').controller('UsersCtrl', UsersCtrl);