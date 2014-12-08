'use strict';
define(['Staffs', 'Location', 'Lang'],function(Staffs, Location, Lang){
function StafflistsCtrl($scope, $routeParams, model, Staffs, Location, Lang) {
    
    $scope.data = {};
    $scope.data.staffs=Staffs.getAll();
    console.log("Staffs:", $scope.data.staffs);
    // $scope.data.salarys =Salarys.getAll();
    // $scope.Stafflist = model.Stafflist;
    // $scope.tempStaff = new model.Staff();
    $scope.date = new Date();
    $scope.dict = Lang.getDict();
    $scope.lang = $routeParams.lang ? $routeParams.lang : Lang.defaultLang;
    // $scope.validationError = false;
    


    $scope.open = Location.open;
    // $scope.staffname = $routeParams.staffname;

    // SchoolInfos.get("schoolinfo").then(function(info){
    //   $scope.schoolInfo = info;

    //   if($scope.schoolInfo.version === "gths"){
    //     $scope.Stafflist.roles.classmaster.name = "Head of Dept";
    //   }
    // }).catch(function(error){
    //   console.log("failed to load school info", error);
    // })

    $scope.remove = function(staff){
      Staffs.remove(staff).then(function(success){
        delete $scope.data.staffs[staff._id];
      });
    };


    // $scope.addStafflist = function(){
    // 	$scope.tempStafflist.save().then(function(success){
    //     $scope.data.staffs[success.id] = $scope.tempStafflist;
    // 	  $scope.tempStafflist = new model.Stafflist();
    //     $scope.validationError = false;
    //   }).catch(function(error){
    //     //handle duplicate users
    //     if(error.name === "conflict"){
    //       var name = $scope.tempStafflist.name;
    //       $scope.validationError = true;
    //       $scope.tempStafflist = new model.Stafflist();
    //       $scope.tempStafflist.name = name;
    //     }
    //     console.log("Could not save staff:", error);
    //   });
    // };
    $scope.getServiceYears = function(dateofentry){
      return $scope.date.getFullYear()-(new Date(dateofentry)).getFullYear();
    }

    // $scope.remove = Staffs.remove;

  }
StafflistsCtrl.$inject = ['$scope', '$routeParams', 'model', 'Staffs', 'Location', 'Lang'];
angular.module('SchoolMan').register.controller('StafflistsCtrl', StafflistsCtrl);
})