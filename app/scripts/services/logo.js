'use strict';

function Logo(Data2) {

    var self = {};

    self.save = function(logo){
        console.log("saving logo", logo);
       Data2.put(logo).then(function(success){
        console.log("saved logo", success);
       }).catch(function(error){
        console.log("error: save lastUid", error);
       });
    };

    self.get = function(){
        var deferred = $q.defer();

        Data2.get("logo").then(function(logo){
            deferred.resolve(logo);
        }).catch(function(error){
            console.log("Logo Error", error);
            
        });

        return deferred.promise;
    }

    return self;

  }
Logo.$inject = ['Data2'];
angular.module('SchoolMan').service('Logo', Logo);