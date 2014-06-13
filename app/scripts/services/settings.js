'use strict';

angular.module('SchoolMan')
  .service('Settings', function Settings($q, model, Data2) {

  	var settings = new model.Settings();

  	var dataModel = model.Settings;

  	var self = {};
  	self.get = function(){
  		return settings;
  	}

  	self.load = function(){
  		var deferred = $q.defer();

  		Data2.get('customer_settings').then(function(data){
  			var spec = model.parse(data, dataModel.datatype);
  			settings = new Settings(spec);
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
