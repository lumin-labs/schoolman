'use strict';

angular.module('SchoolMan')
  .service('settings', function settings($q, model, Data2) {

    console.log("model service", model);
  	var settings = new model.Settings();

  	var self = {};
  	self.get = function(){
  		return settings;
  	}

  	self.load = function(){
  		var deferred = $q.defer();

  		Data2.get('customer_settings').then(function(data){
  			var spec = model.parse(data, data.datatype);
  			settings = new model.Settings(spec);
  			deferred.resolve(settings);
  		}).catch(function(error){
  			if(error.status === 404){
  				// use default
  				deferred.resolve(settings);
  			}
  		})

  		return deferred.promise;
  	}

  	return self;

  });
