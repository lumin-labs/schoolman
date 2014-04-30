'use strict';

angular.module('SchoolMan')
  .service('Uid', function Uid($log, Data) {
    
    var N_DIGITS = 7;

    var self = {};

    self.next = function(lastUid){
    	
    	var n = parseInt(lastUid.substr(1)) + 1;
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

    	return u;
    };

    self.save = function(lastUid){
        Data.saveLater({uid:lastUid});
    };

    return self;

  });
