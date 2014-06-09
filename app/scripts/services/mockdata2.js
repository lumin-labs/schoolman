'use strict';

angular.module('SchoolMan')
  .service('MockData', function MockData(model, Forms, Departments, Groups, Fees, Uid, Data2){

    
    var forms = Forms.all();
    var departments = Departments.getAll();
    var groups = Groups.getAll();
    var fees = Fees.getAll();

    // Random number util
    var getRandBetween = function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };

    window._mock = {} 
    window._mock.students = function(n){
      var students = {docs:[]};
      Uid.getBatch(n).then(function(uids){
        console.log("Got batch uids", uids);
        students.docs = _.map(uids, function(uid){
          
          var forms =  Object.keys(Forms.all())
          var depts =  Object.keys(Departments.getAll())
          var groups = Object.keys(Groups.getAll());
          var fees = Object.keys(Fees.getAll());
          var genders = ["Female", "Male"];
          
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
            formIndex:forms[getRandBetween(0, forms.length)],
            groupId:groups[getRandBetween(0, groups.length)],
            feeId:fees[getRandBetween(0, fees.length)],
            deptId:depts[getRandBetween(0, depts.length)]
          }

          console.log("Mocking batch students: ", students);
          var student = new model.Student(studentData);
          student._id = uid;
          return student;
        });
        Data2.allDocs(students).then(function(success){
            console.log("saved " + n + " students", success);
            Uid.save(students.docs[students.docs.length - 1]._id);
        });
      });

      //Uid.save(data.uid);
    }


  });
