'use strict';

function Schoolid($q, $log, Data2) {
    
    var N_DIGITS = 7;

    var self = {};

    var next = function(lastSchoolid){
        
        var nextSchoolid = lastSchoolid;
        var value = lastSchoolid.value;

        var n = parseInt(value.substr(1)) + 1;
        var s = n.toString();

        while(s.length < N_DIGITS){
            s = "0" + s;
        }

        var u = "U" + s;

        if(u.length < 8){
            $log.error("n", n);
            $log.error("s", s);
            $log.error("u", u);
        }

        nextSchoolid.value = u;
        return nextSchoolid;
    };

    self.save = function(lastSchoolid){
        console.log("saving schoolid", lastSchoolid);
       Data2.put(lastSchoolid).then(function(success){
        console.log("saved lastSchoolid", success);
       }).catch(function(error){
        console.log("error: save lastSchoolid", error);
       });
    };

    self.get = function(){
        var deferred = $q.defer();

        Data2.get("SCHOOLID").then(function(schoolid){
            deferred.resolve(next(schoolid));
        }).catch(function(error){
            console.log("SCHOOLID Error", error);
            if(error.status === 404){
                var schoolid = {
                    _id:"SCHOOLID",
                    value:"S0000000"}
                deferred.resolve(next(schoolid));
            };
        });

        return deferred.promise;
    }

    self.getBatch = function(n){
        var deferred = $q.defer();
        var schoolids = [];
        self.get().then(function(schoolid){
            schoolids.push(angular.copy(schoolid));
            angular.forEach(_.range(n-1), function(i, $index){
                schoolid = next(schoolid);
                schoolids.push(angular.copy(schoolid));
            });
            console.log("Created schoolids", schoolids);
            deferred.resolve(schoolids);
        }).catch(function(error){
            console.log("Failed to get batch SCHOOLIDs", error);
            deferred.reject(error);
        });

        return deferred.promise;
    }

    return self;

  }
Schoolid.$inject = ['$q', '$log', 'Data2'];
angular.module('SchoolMan').service('Schoolid', Schoolid);