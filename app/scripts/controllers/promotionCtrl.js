'use strict';

angular.module('SchoolMan')
  .controller('PromotionCtrl', function ($scope, $routeParams, Groups, Forms, Data, ClassMaster, CourseCatalog, Location, Registrar, Mastersheet) {
    $scope.formIndex  = $routeParams.formIndex;

    $scope.forms = Forms.all();
    $scope.form  = $scope.forms[$routeParams.formIndex];

    $scope.groups = angular.copy(Groups.getAll());

    $scope.open = Location.open;

    $scope.groupStats = {}

    $scope.mastersheets = {};
    
    var subjects = CourseCatalog.getSubjects($routeParams.formIndex);

    var updateGroupStats = function(group, stats){
        //console.log("Updating ", group , stats);
        $scope.groupStats[group] = stats;
    };

    // This is doing more work than it needs to because we dont need a mastersheet
    // for every course
    var buildMastersheet = function(groupKey){
        
        var courses = CourseCatalog.getCourses($routeParams.formIndex, groupKey);
        var courseIds = courses.map(function(course){return course.id});

        var marksheets = ClassMaster.getMarksheets(courseIds);
        var mastersheet = new Mastersheet({
            termIndex:0,
            subjects:subjects,
            marksheets:marksheets,
            getSubjectKey:CourseCatalog.getSubjectKey
        });
        $scope.mastersheets[groupKey] = mastersheet;
        var passingScore = $scope.groups[groupKey].getPromoPass($routeParams.formIndex)
        updateGroupStats(groupKey, mastersheet.numstats(passingScore));
        
    }

    angular.forEach($scope.groups, function(group, groupIndex){
        if(group.forms[$scope.formIndex].active){
           buildMastersheet(groupIndex); 
        }
    });

    $scope.save = function(groupKey){
        var formIndex = $routeParams.formIndex;
        var groups = Groups.getAll();
        var newPass = parseFloat($scope.groups[groupKey].getPromoPass(formIndex));
        var oldPass = parseFloat(groups[groupKey].getPromoPass(formIndex));
        if(newPass !== oldPass){
           groups[groupKey].setPass(formIndex, newPass); 
           buildMastersheet(groupKey);
        }
    };
  });
