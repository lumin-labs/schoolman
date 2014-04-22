'use strict';

/**
 * @ngdoc service
 * @name SchoolMan.service:CourseCatalog
 * @method {function} getCourse
 * @method {function} getAllCourses
 * @method {function} getCourseId
 * @method {function} getCourses
 * @method {function} getCoursesByRef
 * @method {function} getSubjects
 * @method {function} getSubjectKey
 * @description
 *
 * This Service is responsible for retrieving information about courses in general
 * and for configuring which courses are available in which classes
 */
angular.module('SchoolMan')
  .service('CourseCatalog', function CourseCatalog($log, Data, modelTransformer, Group) {
    
    var self = {};
    var courses = {};
    var template = {};

    function Course(form, group, subject){
      self = angular.copy(subject);
      self.id = form + "-" + group + "-" + self.code;
      self.form = template.forms[form].name;
      self.group = template.groups[group].name;
      return self;
    }

    // Load data into the object model
    Data.get('coursecatalog', function(d){
        console.log("template groups before model", d);
        template = d;
        angular.forEach(template.forms, function(form, formIndex){
            angular.forEach(template.groups, function(group, groupIndex){
                angular.forEach(template.subjects, function(subject, subjectCode){
                  if(form.subjects[subjectCode]){
                    subject.code = subjectCode;
                    var course = Course(formIndex,groupIndex, subject);
                    courses[course.id] = course;
                  }
                });
            });
        });
    });

    // Load Groups into Model Layer
    template.groups = modelTransformer.transform(template.groups, Group);
    angular.forEach(template.groups,function(group, groupIndex){
        group.onChange(function(msg){
            console.log(msg);
            Data.saveLater({coursecatalog:template});
        });
    });
    

    /**
     * @ngdoc method
     * @methodOf SchoolMan.service:CourseCatalog
     * @name SchoolMan.service:CourseCatalog#getCourseId
     * @description
     *
     * ## Getting a course reference object
     *
     * This method returns a list of courses. It takes a course reference object 
     * which includes the courseId and a timestamp.
     */
    self.getCourseId = function(params){
      return params.formIndex + "-" + params.groupIndex + "-" + params.subjectKey;
    }


    /**
     * @ngdoc method
     * @methodOf SchoolMan.service:CourseCatalog
     * @name SchoolMan.service:CourseCatalog#getCourse
     * @description
     *
     * ## Getting a course reference object
     *
     * This method returns a list of courses. It takes a course reference object 
     * which includes the courseId and a timestamp.
     */
    self.getCourse = function(courseId){
        return courses[courseId];
    };

    /**
     * @ngdoc method
     * @methodOf SchoolMan.service:CourseCatalog
     * @name SchoolMan.service:CourseCatalog#getSubjects
     * @description
     *
     * ## Getting a course reference object
     *
     * This method returns a list of courses. It takes a course reference object 
     * which includes the courseId and a timestamp.
     */
    self.getSubjects = function(formIndex){
        var subjects = {};
        angular.forEach(template.forms[formIndex].subjects, function(isOffered, subjectKey){
          if(isOffered && template.subjects[subjectKey]){
            subjects[subjectKey] = template.subjects[subjectKey];
          }
        });
        return subjects;
    };

    self.getAllSubjects = function(){
        return template.subjects;
    };

    /**
     * @ngdoc method
     * @methodOf SchoolMan.service:CourseCatalog
     * @name SchoolMan.service:CourseCatalog#getCoursesByRef
     * @description
     *
     * ## Getting a course reference object
     *
     * This method returns a list of courses that have been decorated with a 
     * timestamp that represents the date they were added to a teachers timetable.
     * It takes a course reference object which has the properties:
     * - courseId
     * - timestamp.
     */
    self.getCoursesByRef = function(courseRefs){
      return courseRefs.map(function(courseRef){
        // make a copy so the original course object is not mutated
        var course = angular.copy(self.getCourse(courseRef.courseId));
        course.timestamp = courseRef.timestamp;
        return course;
      })
    };
    
    /**
     * @ngdoc method
     * @methodOf SchoolMan.service:CourseCatalog
     * @name SchoolMan.service:CourseCatalog#getCourses
     * @description
     *
     * ## Getting a course reference object
     *
     * This method returns a list of courses. It takes a course reference object 
     * which includes the courseId and a timestamp.
     */
    self.getCourses=function(form, group){
        var courses = [];
        angular.forEach(self.getSubjects(form), function(subject, subjectKey){
            // $log.debug("CourseCatalog 143: form", form);
            // $log.debug("CourseCatalog 144: group", group);
            // $log.debug("CourseCatalog 145: subjectKey", subjectKey);

            var courseId = self.getCourseId({
              formIndex:form,
              groupIndex:group,
              subjectKey: subjectKey
            });

            var course = self.getCourse(courseId);
            if(course){
               courses.push(course); 
           };
            
        });
        return courses
    };

    /**
     * @ngdoc method
     * @methodOf SchoolMan.service:CourseCatalog
     * @name SchoolMan.service:CourseCatalog#getCourses
     * @description
     *
     * ## Getting a course reference object
     *
     * This method returns a list of courses. It takes a course reference object 
     * which includes the courseId and a timestamp.
     */
    self.getCourseIds=function(form, group){
        return self.getCourses(form, group).map(function(course){return course.id});
    };


    /**
     * @ngdoc method
     * @methodOf SchoolMan.service:CourseCatalog
     * @name SchoolMan.service:CourseCatalog#getAllCourses
     * @description
     *
     * ## Getting a course reference object
     *
     * This method returns a list of courses. It takes a course reference object 
     * which includes the courseId and a timestamp.
     */
    self.getAllCourses=function(){
        return courses;
    };
      

    /**
     * @ngdoc method
     * @methodOf SchoolMan.service:CourseCatalog
     * @name SchoolMan.service:CourseCatalog#getForms
     * @description
     *
     * ## Getting a course reference object
     *
     * This method returns a list of courses. It takes a course reference object 
     * which includes the courseId and a timestamp.
     */
    self.getForms=function(){
        return template.forms;
    };


    /**
     * @ngdoc method
     * @methodOf SchoolMan.service:CourseCatalog
     * @name SchoolMan.service:CourseCatalog#getGroups
     * @description
     *
     * ## Getting a list of Groups
     *
     * This method returns a list of courses. It takes a course reference object 
     * which includes the courseId and a timestamp.
     */
    self.getGroups = function(){
        return template.groups;
    };


    /**
     * @ngdoc method
     * @methodOf SchoolMan.service:CourseCatalog
     * @name SchoolMan.service:CourseCatalog#getTerms
     * @description
     *
     * ## Getting a list of Terms
     *
     * This method returns a list of courses. It takes a course reference object 
     * which includes the courseId and a timestamp.
     */
    self.getTerms = function(){
        return template.terms;
    };


    /**
     * @ngdoc method
     * @methodOf SchoolMan.service:CourseCatalog
     * @name SchoolMan.service:CourseCatalog#getSubjectKey
     * @param {string} courseId The course UD
     * @returns {string} subjectKey
     * @description
     *
     * This method takes a courseId and returns the subject key
     */
    self.getSubjectKey = function(courseId){
        return courseId.split("-")[2];
    };

    self.save = function(){
        Data.saveLater({'coursecatalog': template});
    };

    self.removeSubject = function(subjectKey){
        delete template.subjects[subjectKey];
        self.save();
    };

    self.post = function(newSubject){
        template.subjects[newSubject.code] = newSubject;
        angular.forEach(template.forms, function(form, formIndex){
            form.subjects[newSubject.code] = 1;
        });
        self.save();
    };

    // Return the object representing the services public methods and properties
    return self;          	
    

});
