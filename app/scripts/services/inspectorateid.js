'use strict';

function Inspectorateid($q, $log, Data2) {
    
    var N_DIGITS = 7;

    var self = {};

    var next = function(lastInspectorateid){
        
        var nextInspectorateid = lastInspectorateid;
        var value = lastInspectorateid.value;

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

        nextInspectorateid.value = u;
        return nextInspectorateid;
    };

    self.save = function(lastInspectorateid){
        console.log("saving inspectorateid", lastInspectorateid);
       Data2.put(lastInspectorateid).then(function(success){
        console.log("saved lastInspectorateid", success);
       }).catch(function(error){
        console.log("error: save lastInspectorateid", error);
       });
    };

    self.get = function(){
        var deferred = $q.defer();

        Data2.get("INSPECTORATEID").then(function(inspectorateid){
            deferred.resolve(next(inspectorateid));
        }).catch(function(error){
            console.log("INSPECTORATEID Error", error);
            if(error.status === 404){
                var inspectorateid = {
                    _id:"INSPECTORATEID",
                    value:"D0000000"}
                deferred.resolve(next(inspectorateid));
            };
        });

        return deferred.promise;
    }

    self.getBatch = function(n){
        var deferred = $q.defer();
        var inspectorateids = [];
        self.get().then(function(inspectorateid){
            inspectorateids.push(angular.copy(inspectorateid));
            angular.forEach(_.range(n-1), function(i, $index){
                inspectorateid = next(inspectorateid);
                inspectorateids.push(angular.copy(inspectorateid));
            });
            console.log("Created inspectorateids", inspectorateids);
            deferred.resolve(inspectorateids);
        }).catch(function(error){
            console.log("Failed to get batch INSPECTORATEID", error);
            deferred.reject(error);
        });

        return deferred.promise;
    }

    return self;

  }
Inspectorateid.$inject = ['$q', '$log', 'Data2'];
angular.module('SchoolMan').service('Inspectorateid', Inspectorateid);