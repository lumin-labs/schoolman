'use strict';

angular.module('SchoolMan')
  .service('Groups', function Groups(Slug, Data, model, modelTransformer) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var groups = {};

    var self = {};

    self.getAll = function(){
    	return groups;
    };

    self.get = function(groupKey){
    	return groups[groupKey];
    };

    self.save = function(){
    	Data.saveLater({"groups": groups})
    };

    self.remove = function(group){
    	var obj = group;
    	if(typeof obj === "Group"){
    		delete groups[group.code];
    	} else if(groups.hasOwnProperty(group)){
    		delete groups[group];
    	}
    };

    self.add = function(group){
    	group.code = Slug.slugify(group.name);
    	groups[group.code] = group;
    };

    // Load Data
    Data.get("groups", function(obj){
    	angular.forEach(obj, function(groupData, groupKey){
    		var group = modelTransformer.transform(groupData, model.Group);
    		groups[group.code] = group;
    		group.onChange(function(msg){
    			self.save();
    		});
    	});
    });

    return self;
  });
