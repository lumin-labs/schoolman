'use strict';

var schoolman = angular.module('SchoolMan')

schoolman.provider('model', function modelProvider() {
    
  var self = this;

  function Model(){};

  // This function lets you ask if the object has all the required fields
  // TODO: the config for which fields are required should probably be done 
  // elsewhere
  Model.prototype.isValid = function(){
    var self = this;
    var isOk = true;
    angular.forEach(self.requiredFields, function(field, fieldIndex){
      // if the current value of the field is some kind of null value
      if(self.invalidValues.indexOf(self[field]) > -1){
        isOk = false;
      }
    });
    return isOk;
  };

  Model.prototype.asDoc = function(){

    var self = this;

    var vectorData = [];
    angular.forEach(self.datatype.fields, function(key, keyIndex){
      vectorData.push(self[key] || "");
    });

    var doc = {};
    doc._id = self._id;
    doc.type= this.datatype._id;
    doc[this.datatype.fields_key] = vectorData;

    return doc;
  };

  Model.prototype.save = function(){

    var self = this;
    var deferred = self.$q.defer();

    if(typeof self.generateID === 'function' && !self._id){
      self._id = self.generateID();
    }

    self.db.put(self.asDoc()).then(function(response){
      self._rev = response.rev;
      deferred.resolve(response);
    }, function(err, response){
      deferred.reject(err, response);
    });

    return deferred.promise;
  };

  Model.prototype.model = function(doc){
    var self = Object.create(this);
    angular.forEach(this.vectorSchema, function(test, keyIndex){
      self[test] = doc.d[keyIndex];
    });
    return self;
  };

  self.parse = function(doc, spec){
    var data = {
      _id:doc._id,
      _rev:doc._rev
    };
    angular.forEach(spec.fields, function(field, fieldIndex){
      data[field] = doc[spec.fields_key][fieldIndex];
    });
    return data;
  };

  self.Model = Model;
  
  self.datatypes = {};
  self.updateDatatypes = function(){
    // Make sure all datatypes defined in models are saved to the database
    var m = new Model();
    angular.forEach(self.datatypes, function(versions, type){
      angular.forEach(versions, function(version, key){
        m.db.get(version._id).then(function(success){
          console.log("-- Found datatype " + version._id, success);
        }).catch(function(error){
          console.log("-- Did not find datatype " + version._id, error);
          m.db.put(version).then(function(success){
            console.log("Added new datatype version to db: ", version._id, success);
          });
        })
      });
    });
  };


  this.$get = ["Data2", "$q" , "Slug", function ModelFactory(Data2, $q, Slug) {
    Model.prototype.db = Data2;
    Model.prototype.$q = $q;
    self.slugify = Slug.slugify;
    self.updateDatatypes();
    return self;
  }];

});
