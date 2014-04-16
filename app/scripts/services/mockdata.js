'use strict';

angular.module('SchoolMan')
  .service('MockData', function MockData(CourseCatalog, Registrar, ClassMaster, modelTransformer, Student, Data, $log, Uid) {

    var FORCE_CREATE_NEW = true;
  	var N_STUDENTS = 500;
    var marksheets;

    // Random number util
	var getRandBetween = function(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

    // Add students to data if number of students in data is less than nStudents
    Data.get("uid", function(lastUid){
        Data.get("students", function(students){
        
            // Initialize to empty list
            // if(!angular.isArray(students)){
            //     students = [];
            // }

            if(students.length < N_STUDENTS || FORCE_CREATE_NEW){

                $log.debug("Adding Mock Students")
                
                if(FORCE_CREATE_NEW === true){
                    marksheets = Data.set("marksheets",{});
                    Data.set({students:[]});
                    students = [];
                    var lastUid = "U0000000";
                };

                var count = students.length;
                $log.debug("Count", count);
                while(count < N_STUDENTS){
                    var form = getRandBetween(0, CourseCatalog.getForms().length);
                    var group = getRandBetween(0, CourseCatalog.getGroups().length);
                    var subjects = CourseCatalog.getSubjects(form);
                    var uid = Uid.next(lastUid);
                    var studentData = {
                            name: Faker.Name.findName(),
                            sex: Faker.Name.gender(),
                            birth: Faker.Date.past(500),
                            parentName:Faker.Name.findName(),
                            parentPhone:Faker.PhoneNumber.phoneNumber(),
                            parentEmail:Faker.Internet.email(),
                            id: uid,
                            courses:[],
                            form:form,
                            group:group
                    }
                    var student = modelTransformer.transform(studentData, Student);
                    students.push(student);
                    lastUid = uid;
                    count += 1;
                }
                
                Data.save({students:students, uid:lastUid});

            } else {
                $log.debug("Students loaded from file: ", students);
            }
        });
    });
    


    // Create mock Marksheets for each class
    if(FORCE_CREATE_NEW){
        angular.forEach(CourseCatalog.getAllCourses(), function(course, courseId){
            var students = Registrar.getStudentsByCourseUnsorted(courseId);
            var marksheet = ClassMaster.createMarksheet(courseId,students);
            marksheets[marksheet.courseId] = marksheet;
        });
        console.log("Marksheets created", marksheets);

        Data.saveLater({});
    }

    return {
        getRandBetween:getRandBetween
    }

  });
