'use strict';

angular.module('SchoolMan')
  .service('SchoolInfos', function SchoolInfos($q, Data2, model) {

  	var self = {};

    var modelFrom = function(data){
        var spec = model.parse2(data, data.datatype);
        var info = new model.SchoolInfo(spec);
        return info;
    };

  	self.get = function(){
      var deferred = $q.defer();

  		Data2.get("schoolinfo").then(function(data){
        console.log("school info get", data);
  			deferred.resolve(modelFrom(data));
  		}).catch(function(error){

  			//var info = new model.SchoolInfo();
        if(error.status === 404){
          var info = new model.SchoolInfo({nameEn:"Name (English)",
                                            nameFr:"Name (French)"
                                          });
          console.log("catch schoolinfo", error, info);
          info.save().then(function(success){
            deferred.resolve(info);
            console.log("saved schoolinfo", info, success);
          }).catch(function(error){
            console.log("save error school info", error);
            deferred.reject(error);
          })
        } else{
          console.log("catch else school info", error);
          deferred.reject(error);
        }
  		});

      return deferred.promise;
  	};

  	return self;

});
