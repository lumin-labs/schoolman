'use strict';

angular.module('SchoolMan')
  .service('$user', function $user(Data, User, modelTransformer, Slug, $log) {

    var _users = {};

    var createUsername = function(fullname){
      return Slug.slugify(fullname);
    }


    // Public Methods of the service start here

    var self = {};

    self.login = function(tempUser, accessCode, callback){
      
      var user = null; // Replace this with throwing error
      var username = createUsername(tempUser.fullname);

      console.log("tempUser", tempUser);
      console.log("username", username);
      console.log("_users", _users);

      if(_users.hasOwnProperty(username)){

        var _user = _users[username];
        console.log("_user", _user);
        
        $log.debug("Who am i?", _user, _user.access['admin'], _user.hasAccess('admin'));
        
        if(_user.hasAccess(accessCode)){
          user = _user;
        } else {
          $log.warn("No Access", accessCode, _user.hasAccess(accessCode), _user);
        }
      }

      callback(user);

      return undefined; // This should make the function asynchronous
    }

    self.getUsers = function(){
      return _users;
    };

    self.get = function(username){
      return _users[username];
    };

    self.removeUser = function(username){
      delete _users[username];
      Data.saveLater({'users':_users});
    };

    self.setCurrentUser = function(user){
      self.currentUser = user;
    };

    self.getCurrentUser = function(){
      return self.currentUser;
    };

    self.create = function(userData){
      return modelTransformer.transform(userData, User);
    };

    self.post = function(user){

      if(user.username === ""){
        user.username = createUsername(user.fullname);
      }
      
      _users[user.username] = user;
      Data.saveLater({'users':_users});
    };


    self.save = function(){
      Data.saveLater({'users':_users});
    };

    // Load users from Data
    Data.get('users', function(users){
      angular.forEach(users, function(userData, username){
        var user = modelTransformer.transform(userData, User);
        // $log.debug("$user service:81, User", user);
        _users[username] = user;
        user.onChange(self.save);
      });
    });

    return self;

});
