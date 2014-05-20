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

    self.remove = function(group){
    	Data2.remove(group).then(function(success){
            console.log("Group removed: ", success);
            delete groups[group._id];
        }).catch(function(error){
            $log.error("groups.js : remove :", error);
        });
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
        angular.forEach(success.rows, function(data, rowIndex){
            var spec = data.doc;
            var obj = model.parse(data.value.data, spec);
            var group = modelTransformer.transform(obj, model.Group);
            groups[group._id] = group;
        });
    });
    return self;
  });
