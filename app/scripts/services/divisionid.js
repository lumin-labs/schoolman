'use strict';

function Divisionid($q, $log, Data2) {
    
    var N_DIGITS = 7;

    var self = {};

    var next = function(lastDivisionid){
        
        var nextDivisionid = lastDivisionid;
        var value = lastDivisionid.value;

        var n = parseInt(value.substr(1)) + 1;
        var s = n.toString();

        while(s.length < N_DIGITS){
            s = "0" + s;
        }

        var u = "D" + s;

        if(u.length < 8){
            $log.error("n", n);
            $log.error("s", s);
            $log.error("u", u);
        }

        nextDivisionid.value = u;
        return nextDivisionid;
    };

    self.save = function(lastDivisionid){
        console.log("saving divisionid", lastDivisionid);
       Data2.put(lastDivisionid).then(function(success){
        console.log("saved lastDivisionid", success);
       }).catch(function(error){
        console.log("error: save lastDivisionid", error);
       });
    };

    self.get = function(){
        var deferred = $q.defer();

        Data2.get("DIVISIONID").then(function(divisionid){
            deferred.resolve(next(divisionid));
        }).catch(function(error){
            console.log("DIVISIONID Error", error);
            if(error.status === 404){
                var divisionid = {
                    _id:"DIVISIONID",
                    value:"D0000000"}
                deferred.resolve(next(divisionid));
            };
        });

        return deferred.promise;
    }

    self.getBatch = function(n){
        var deferred = $q.defer();
        var divisionids = [];
        self.get().then(function(divisionid){
            divisionids.push(angular.copy(divisionid));
            angular.forEach(_.range(n-1), function(i, $index){
                divisionid = next(divisionid);
                divisionids.push(angular.copy(divisionid));
            });
            console.log("Created divisionids", divisionids);
            deferred.resolve(divisionids);
        }).catch(function(error){
            console.log("Failed to get batch DIVISIONIDs", error);
            deferred.reject(error);
        });

        return deferred.promise;
    }

    return self;

  }
Divisionid.$inject = ['$q', '$log', 'Data2'];
angular.module('SchoolMan').service('Divisionid', Divisionid);