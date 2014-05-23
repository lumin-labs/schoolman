'use strict';

angular.module('SchoolMan')
  .controller('Loading3Ctrl', function ($scope, Location, $q, 
    Subjects, Forms, Departments, Groups, Users) {

    var userP = Users.load();
    // var formP = Forms.getAll();
    var deptP = Departments.load();
    var subjP = Subjects.load();
    var groupP= Groups.load();

    var promises = [deptP, groupP, subjP, userP];

    var load = function(promises){

      var wait = function(head, tail){

        var deferred = $q.defer();

        if(tail.length === 0){
          head.then(function(success){
            deferred.resolve([success]);
          });
        } else {
          head.then(function(success){
            wait(tail[0], tail.slice(1)).then(function(childSuccess){
              deferred.resolve([success].concat(childSuccess));
            });
          });
        }

        return deferred.promise;
      }

      wait(promises[0], promises.slice(1))
        .then(function(successes){
          console.log("Successes", successes);
          Location.open({page:"login"})
        });

    };

    load(promises);
    
    
    

  });
