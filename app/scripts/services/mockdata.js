'use strict';

angular.module('SchoolMan')
  .service('MockData', function MockData(CourseCatalog, Registrar, ClassMaster, modelTransformer, Student, Data, $log, Uid, Fees, Departments, Groups, Forms) {

    var FORCE_CREATE_NEW = false;
  	var N_STUDENTS = 1500;
    var marksheets;

    var departments = Departments.getAll();
    var fees = Fees.getAll();

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
                var groups= Object.keys(Groups.getAll());
                var genders = ["female", "male"];

                $log.debug("Count", count);
                while(count < N_STUDENTS){
                    var form = getRandBetween(0, Forms.all().length);
                    var group = groups[getRandBetween(0, groups.length)];
                    var fee = Object.keys(fees)[getRandBetween(0, Object.keys(fees).length)];
                    var department = Object.keys(departments)[getRandBetween(0, Object.keys(departments).length)];
                    var subjects = CourseCatalog.getSubjects(form);
                    var uid = Uid.next(lastUid);
                    var person = {
                        first_name: Faker.Name.firstName(),
                        last_name: Faker.Name.lastName(),
                        gender:genders[getRandBetween(0, 2)]
                    }
                    var studentData = {
                            name: person.first_name + " " + person.last_name,
                            sex: person.gender,
                            birth: Faker.Date.past(500),
                            parentName:Faker.Name.findName(),
                            parentPhone:Faker.PhoneNumber.phoneNumber(),
                            parentEmail:Faker.Internet.email(),
                            id: uid,
                            courses:[],
                            form:form,
                            group:group,
                            feeGroup:fee,
                            department:department
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
        window.marksheets = marksheets;

        Data.saveLater({});
    }

    return {
        getRandBetween:getRandBetween
    }

  });
