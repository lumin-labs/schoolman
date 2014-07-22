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
  			deferred.resolve(modelFrom(data));
  		}).catch(function(error){
  			//var info = new model.SchoolInfo();
        if(error.status === 404){
          var info = new model.SchoolInfo({nameEn:"Name (English)",
                                            nameFr:"Name (French)"
                                          });
          info.save().then(function(success){
            deferred.resolve(info);
          }).catch(function(error){
            deferred.reject(error);
          })
        } else{
          deferred.reject(error);
        }
  		});

      return deferred.promise;
  	};

  	return self;

});
