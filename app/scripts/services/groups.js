'use strict';

angular.module('SchoolMan')
  .service('Groups', function Groups(Slug, Data2, model, modelTransformer) {
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

    self.remove = function(groupKey){
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
    var map = function(doc, emit){
      if(doc.type === model.Group.datatype._id){
        emit(doc._id, {_id:doc.type, data:doc});
      } 
    };
    Data2.query(map, {include_docs : true}).then(function(success){
        console.log("Test join datatype", success);
        angular.forEach(success.rows, function(data, rowIndex){
            var spec = data.doc;
            var obj = model.parse(data.value.data, spec);
            var group = modelTransformer.transform(obj, model.Group);
            console.log("Froup model: ", group);
            groups[group._id] = group;
        });
        console.log("Fees: Query succeeded", success);
    }).catch(function(error){
        console.log("Fees: Query failed", error);
    });

    // // Load Data
    // Data.get("groups", function(obj){
    // 	angular.forEach(obj, function(groupData, groupKey){
    // 		var group = modelTransformer.transform(groupData, model.Group);
    // 		groups[group.code] = group;
    // 		// group.onChange(function(msg){
    // 		// 	self.save();
    // 		// });
    // 	});
    // });

    return self;
  });
