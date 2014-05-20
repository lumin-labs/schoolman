'use strict';

angular.module('SchoolMan')
  .service('Uid', function Uid($q, $log, Data2) {
    
    var N_DIGITS = 7;

    var self = {};

    self.next = function(lastUid){
    	
        var nextUid = lastUid;
        var value = lastUid.value;

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

        nextUid.value = u;
    	return nextUid;
    };

    self.save = function(lastUid){
       Data2.put(lastUid).then(function(success){
        console.log("saved lastUid", success);
       }).catch(function(error){
        console.log("error: save lastUid", error);
       });
    };

    self.get = function(){
        var deferred = $q.defer();

        Data2.get("UID").then(function(uid){
            deferred.resolve(self.next(uid));
        }).catch(function(error){
            console.log("UID Error", error);
            if(error.status === 404){
                var uid = {
                    _id:"UID",
                    value:"U0000000"}
                deferred.resolve(self.next(uid));
            };
        });

        return deferred.promise;
    }

    return self;

  });
