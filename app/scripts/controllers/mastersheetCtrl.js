'use strict';

angular.module('SchoolMan')
  .controller('MastersheetCtrl', function ($scope, $routeParams, Cache, Registrar, CourseCatalog, ClassMaster) {
  	
    $scope.subjects = CourseCatalog.getSubjects($routeParams.formIndex);

    var courseId = CourseCatalog.getCourseId($routeParams);
    $scope.students = Registrar.getStudentsByCourse(courseId);


    $scope.open = Location.open;

    // Should probably put this somewhere else like in a service
    var Mastersheet = function(marksheets){
      var self = {};

      self.table = {students:{}};

      self.getStudentSubjectAverage = function(studentId, subjectKey){
        var courseId = CourseCatalog.getCourseId({
          formIndex : $routeParams.formIndex,
          groupIndex: $routeParams.groupIndex,
          subjectKey: subjectKey
        });
        var marksheet = marksheets[courseId];
        var average = marksheet.getAverage(studentId, $routeParams.termIndex);
        return average;
      };

      self.getAc = function(studentId, subjectKey){
        var ac = self.getStudentSubjectAverage(studentId, subjectKey) * 
                 $scope.subjects[subjectKey].coeff;
        return ac || null;
      };

      self.getTotalCoeff = function(){
        var coeff = 0;
        angular.forEach($scope.subjects, function(subject, subjectKey){
          coeff += parseInt(subject.coeff);
        });
        return coeff;
      };

      self.getAcTotals = function(studentId){
        var coeffs = 0;  // Total coefficients corresponding to non-null scores
        var totals = {
          ac:0,
          average:0
        };
        
        angular.forEach(self.table.students[studentId], function(scores, subjectKey){
          totals.ac += (scores.ac || 0);
          var coeff = parseInt($scope.subjects[subjectKey].coeff);
          coeffs += scores.ac === null ? 0 : coeff;
        });

        totals.average = totals.ac / coeffs;

        return totals;
      };

      // Compute Everything, store it in the "table"
      angular.forEach($scope.students, function(student, studentIndex){
        self.table.students[student.id] = {};
        self.table.totalCoeff  = self.getTotalCoeff();
        angular.forEach(marksheets, function(marksheet, courseId){
          var subjectKey = CourseCatalog.getSubjectKey(courseId);
          self.table.students[student.id][subjectKey] = {
            average:self.getStudentSubjectAverage(student.id, subjectKey),
            ac:self.getAc(student.id, subjectKey)
          };
        });

        var totals = self.getAcTotals(student.id);
        self.table.students[student.id].acTotal = totals.ac;
        self.table.students[student.id].acAverage = totals.average;
      });

    // Rank and Cache
      var students = [];
      // 1. make a list from the table data
      angular.forEach(self.table.students, function(student, studentId){
        students.push({studentId:studentId, student:student});
      });
      // 2. sort the list by acAverage
      students.sort(function(s1, s2){
        return s2.student.acAverage - s1.student.acAverage;
      });
      // 3. store rankings in the student object 
      //    (this should mutate the same student object in the table)
      angular.forEach(students, function(d, dIndex){
        if(dIndex === 0){
          d.student.rank = 1;
        }else{
          if (d.student.acAverage === students[dIndex - 1].acAverage){
            d.student.rank = students[dIndex - 1].rank;
          }else{
            d.student.rank = dIndex + 1;
          }
        }
      });

      return self;
    }

    $scope.getMastersheet = function(m){
      var formIndex = $routeParams.formIndex;
      var groupIndex = $routeParams.groupIndex;
      if(m){
        formIndex = m.hasOwnProperty('formIndex') ? m.formIndex : formIndex;
        groupIndex = m.hasOwnProperty('groupIndex') ? m.groupIndex : groupIndex;
      }
      var courses = CourseCatalog.getCourses(formIndex, groupIndex);
      var courseIds = courses.map(function(course){return course.id});
      var marksheets = ClassMaster.getMarksheets(courseIds);
      var mastersheet = Mastersheet(marksheets);
      return mastersheet; 
    };


    // for D3 Barchart
    $scope.graphView = {};
    $scope.graphView.view = Cache.get("graphView");
    if($scope.graphView.view === undefined){
      $scope.graphView.view = "mastersheet";
    }

    $scope.setGraphView = function(view){
      $scope.graphView.view = view;
      Cache.set({"graphView":view});
    }


    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 1230 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "");

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "<table>"+
                    "<tr>" +
                      "<td style='text-align:right;'>Subject:</td>"+
                      "<td class='tip-subject'>"+$scope.subjects[d.subject].en+"</td>"+
                    "</tr>"+
                    "<tr>"+
                      "<td style='text-align:right;'>Average:</td>"+
                      "<td class='tip-average'>"+d.average+"</td>"+
                    "</tr>"+
                  "</table>"
          
        })

    var svg = d3.select(".d3-barchart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

    var data = [
      {subject:    "a",
       average: .08167    },
       {subject:    "b",
       average: .01492    },
       {subject:    "c",
       average: .02782    },
       {subject:    "d",
       average: .04253    },
       {subject:    "e",
       average: .12702    }
    ];

    var studentsData = [];
    angular.forEach($scope.getMastersheet().table.students, function(student, studentId){
      studentsData.push(student);
    });

    var subjectData = [];
    angular.forEach($scope.subjects, function(subject, subjectKey){
      subjectData.push(subjectKey);
    });

    var data = subjectData.map(function(subject){
      var dataItem = {};
      dataItem.subject = subject;
      dataItem.average = studentsData.reduce(function(score, student){
        return score + student[subject].average;
      },0) / studentsData.length;
      return dataItem;
    });

      x.domain(data.map(function(d) { return d.subject; }));
      y.domain([0, 20]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Class Average");

      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.subject); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.average); })
          .attr("height", function(d) { return height - y(d.average); })
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);
    
    function type(d) {
          d.average = +d.average;
          return d;
        }
  });
