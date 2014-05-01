'use strict';

/**
 * @ngdoc service
 * @name SchoolMan.service:Path
 * @method {function} get
 * @description
 *
 * This service helps you create a path that conforms to what the routePovider expects
 */
angular.module('SchoolMan')
  .service('Path', function Path() {

    var defaults = {
      default_admin:"users",
      default_classmaster:"classmasterMarksheet",
      default_teacher:"myclasses"
    }

    var self = {};

      /**
       * @ngdoc method
       * @methodOf SchoolMan.service:Path
       * @name SchoolMan.service:Path#get
       * @param {object} params containing formIndex groupIndex termIndex subjectKey studentId username etc
       *
       * @description 
       *
       * This method takes a params object and returns a valid path that you can
       * pass to $location.path()
       */
    self.get = function(d){
    		if(d.page === "login" || d.page === "login404"){
    			d.username = d.username ? d.username : null;
          var path = d.page       + '/' +
                     d.username   + '/' +
                     d.accessCode
          return path;

    		}else if(d.page === "register"){
    			return '/register/' + d.username
    		}else if(defaults.hasOwnProperty(d.page)){
          d.page = defaults[d.page];
          return self.get(d);
        } else {

          // Parse CourseId if present and overwrite $routeParams 
          if(d.hasOwnProperty('courseId')){
            var idData = d.courseId.split('-');
            d.formIndex = idData[0];
            d.groupIndex = idData[1];
            d.subjectKey = idData[2];
          }

          // Any params not explicitly passed are provided via the $routParams
          // thus all of these variables should be present one way or another
          var path =  d.page       + '/' + 
                      d.view       + '/' + 
                      d.formIndex  + '/' + 
                      d.groupIndex + '/' + 
                      d.subjectKey + '/' +
                      d.termIndex  + '/' +
                      d.studentId  + '/' + 
                      d.username   + '/' +
                      d.accessCode

          return path;
        }
    	}
    
    return self;
  });
