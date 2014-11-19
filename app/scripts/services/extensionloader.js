'use strict';
define(['settings', 'require'], function(settings, require){
  function ExtensionLoader(EXTENSIONS, settings) {
    var self = {};

    self.loadScripts = function(){
      var activeExtensions = settings.get().modules;
      var extensionLoadScripts = [];
      angular.forEach(activeExtensions, function(extension, key){
          extensionLoadScripts = extensionLoadScripts.concat(EXTENSIONS[extension].scripts);
      })

      require(extensionLoadScripts, function(){
          console.log("Loaded scripts", extensionLoadScripts);
      })
    }

    return self;
  }
  ExtensionLoader.$inject = ['EXTENSIONS', 'settings'];
  angular.module('SchoolMan').service('ExtensionLoader', ExtensionLoader);
})