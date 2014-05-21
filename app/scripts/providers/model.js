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
    angular.forEach(self.datatype.fields, function(field, fieldIndex){
      vectorData.push(self[field.key] || "");
    });

    var doc = {};
    doc._id = self._id;
    if(self._rev){
      doc._rev = self._rev;
    }

    doc.type= this.datatype._id;
    doc[this.datatype.fields_key] = vectorData;

    return doc;
  };

  self.isValid = function(model){
    var valid = true;
    var invalidValues = {
      "string":[""],
      "number":[0]
    }

    angular.forEach(model.datatype.fields, function(field, fieldIndex){
      if(field.required){
        var value = model[field.key];
        if(typeof value !== field.type){
          console.log("Error typeof", value, field.type);
          valid = false;
        } 
        if(invalidValues[field.type] && invalidValues[field.type].indexOf(value) > -1){
          valid = false;
        }
      }
    });
    return valid;
  };

  Model.prototype.save = function(){

    var self = this;
    var deferred = self.$q.defer();

    if(self.isValid(self)){
      if(typeof self.generateID === 'function' && !self._id){
        var id = self.generateID();
        console.log("Type of id", (typeof id));
        self._id = id;
      }
      var doc = self.asDoc();
      self.db.put(doc).then(function(response){
        self._rev = response.rev;
        deferred.resolve(response);
      }, function(err, response){
        deferred.reject(err, response);
      });
    } else {
      deferred.reject("Model data is not valid");
    }
    
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
      data[field.key] = doc[spec.fields_key][fieldIndex];
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
        m.db.get(version._id).then(function(datatype){
          datatype.fields = version.fields;
          m.db.put(version);
        }).catch(function(error){
          m.db.put(version);
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
