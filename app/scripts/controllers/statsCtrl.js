'use strict';

function StatsCtrl($scope, $routeParams, model, File, Subjects, Students, Data2, Marksheets, Departments, Terms, Groups, SubjectTypes, Forms, Cache, Registrar, CourseCatalog, ClassMaster, TimeTable, Data, Location, Mastersheet, SchoolInfos, PROMOTE_OPTIONS) {
  	 
    $scope.termIndex = parseInt($routeParams.termIndex),
    $scope.queryParams = {
      formIndex: $routeParams.formIndex
    };
    if($routeParams.deptId){
      $scope.queryParams.deptId = $routeParams.deptId
    }
      
      $scope.open = Location.open;

      var data = $scope.data = {
        marksheets: [],
        subjects: Subjects.getAll(),
        view: 'mastersheet',
        stats: {},
        forms: Forms.all(),
        depts: Departments.getAll(),
        terms: Terms.getAll()
      };

      SchoolInfos.get("schoolinfo").then(function(info){
        $scope.data.schoolInfo = info;
        //console.log("school info retrieved", $scope.data.schoolInfo);
      }).catch(function(error){
        console.log("failed to get school info", error);
      });

      $scope.round = Math.round;

      // Load marksheet and student data
      $scope.getStats = function(params, term){
        var statistics = {};
        
        angular.forEach(data.subjects, function(subject, subjectId){
          var query = angular.copy(params);
          query.subjectId = subjectId;
          // console.log("params", query);
          Marksheets.query(query)
              .then(function(marksheets){
            if(marksheets.length > 0){
              var newMarksheet = new model.Marksheet();
              newMarksheet.coeff = marksheets[0].coeff;
              angular.forEach(marksheets, function(marksheet, marksheetId){
                _.extend(newMarksheet.table, marksheet.table);
              });
              // console.log("Combined Marksheets", newMarksheet, marksheets);
              var summaryMarksheet = Marksheets.summarize(newMarksheet, term);
              
              var studentIds = Object.keys(summaryMarksheet);

              Students.getBatch(studentIds).then(function(students){
                // console.log("students", students);
                var students = _.map(Object.keys(students), function(studentId){
                  return students[studentId];
                });

                var maleSat = 0;
                var femaleSat = 0;
                var malePass = 0;
                var femalePass = 0;

                angular.forEach(students, function(student, studentId){
                  // console.log("student stats", summaryMarksheet[student._id][0], student);
                  if(student.sex === "Male" && summaryMarksheet[student._id][0] >= 0){
                    maleSat += 1;
                    if(summaryMarksheet[student._id][0] >= 10){
                      malePass += 1;
                    }
                  }
                  else if(student.sex === "Female" && summaryMarksheet[student._id][0] >= 0){
                    femaleSat += 1;
                    if(summaryMarksheet[student._id][0] >= 10){
                      femalePass += 1;
                    }
                  }
                })
                statistics[subject.code] = {nameEn: subject.en, nameFr: subject.fr, 
                                                    maleSat: maleSat, malePassing: malePass, 
                                                    femaleSat: femaleSat, femalePassing: femalePass};
              });
            }
          });
          
        });
        return statistics;
      }
      $scope.data.stats = $scope.getStats($scope.queryParams, $scope.termIndex);

      $scope.setQuery = function(params){
        angular.forEach(params, function(value, key){
          if(value === "all"){
            delete $scope.queryParams[key];
          } else {
            $scope.queryParams[key] = value;
          }
        });
        //console.log("Query Params", $scope.queryParams);
        $scope.data.stats = $scope.getStats($scope.queryParams, $scope.termIndex);
      };



      $scope.export = function(){
        var statistics = {};
        var school = {};
        school.nameEn = data.schoolInfo.nameEn;
        school.nameFr = data.schoolInfo.nameFr;
        school.division = data.schoolInfo.division;
        school.subdivision = data.schoolInfo.subdivision;
        school.principal = data.schoolInfo.principal;
        school.version = data.schoolInfo.version;
        school.schoolyear = data.schoolInfo.schoolyear;

        Students.query().then(function(students){
          var femaleCycle1 = 0;
          var femaleCycle2 = 0;
          var maleCycle1 = 0;
          var maleCycle2 = 0;

          angular.forEach(students, function(student, studentId){
            if(student.sex === "Male"){
              if(student.formIndex > 4){
                maleCycle2 += 1;
              } else {
                maleCycle1 +=1;
              }
            }
            else if(student.sex === "Female"){
              if(student.formIndex > 4){
                femaleCycle2 += 1;
              } else {
                femaleCycle1 +=1;
              }
            }
          })
          school.maleCycle1 = maleCycle1;
          school.maleCycle2 = maleCycle2;
          school.femaleCycle1 = femaleCycle1;
          school.femaleCycle2 = femaleCycle2;
        })

        angular.forEach($scope.data.terms, function(term, termIndex){
          statistics[termIndex] = {};
          angular.forEach($scope.data.depts, function(dept, deptId){
            statistics[termIndex][deptId] = {name:dept.name};
            angular.forEach($scope.data.forms, function(form, formIndex){
              statistics[termIndex][deptId][formIndex] = $scope.getStats({formIndex:formIndex,deptId:deptId}, termIndex);
            });
          });
        });
        school.stats = statistics;

        File.exportSchool(school);
      }



      //   // GRAPH VIEW
      //   //----------------------------------------------------------------------
        
      //   // General Layout settings
      //   var margin = {top: 20, right: 40, bottom: 30, left: 40},
      //   width = 1100 - margin.left - margin.right,
      //   height = 500 - margin.top - margin.bottom;

      //   var x = d3.scale.ordinal()
      //       .rangeRoundBands([0, width], .1);

      //   var y = d3.scale.linear()
      //       .range([height, 0]);

      //   var xAxis = d3.svg.axis()
      //       .scale(x)
      //       .orient("bottom");

      //   var yAxis = d3.svg.axis()
      //       .scale(y)
      //       .orient("left")
      //       .ticks(10, "");

      //   var tip = d3.tip()
      //       .attr('class', 'd3-tip')
      //       .offset([-10, 0])
      //       .html(function(d) {
      //         return "<table>"+
      //                   "<tr>" +
      //                     "<td style='text-align:right;'>Subject:</td>"+
      //                     "<td class='tip-subject'>"+d.name+"</td>"+
      //                   "</tr>"+
      //                   "<tr>"+
      //                     "<td style='text-align:right;'>Average:</td>"+
      //                     "<td class='tip-average'>"+ d.average.toFixed(2) + "</td>"+
      //                   "</tr>"+
      //                 "</table>"
              
      //       })

      //   var svg = d3.select(".d3-barchart").append("svg")
      //       .attr("width", width + margin.left + margin.right)
      //       .attr("height", height + margin.top + margin.bottom)
      //     .append("g")
      //       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //   svg.call(tip);

      //   var data = _.map($scope.data.marksheets, function(marksheet){

      //     var dataItem = {};
      //     dataItem.subject = $scope.data.subjects[marksheet.subjectId].code;
      //     dataItem.name=$scope.data.subjects[marksheet.subjectId].en;
      //     var summary = Marksheets.summarize(marksheet, $routeParams.termIndex);
      //     console.log("Summary ok", summary);
      //     var total = _.reduce(summary, function(total, value){
      //       return total + value[0];
      //     },0);
      //     var average = total/ Object.keys(summary).length
      //     console.log("Summary", summary, average);
      //     dataItem.average = average;

      //     return dataItem;
      //   });

      //   x.domain(data.map(function(d) { return d.subject; }));
      //   y.domain([0, 20]);

      //   svg.append("g")
      //       .attr("class", "x axis")
      //       .attr("transform", "translate(0," + height + ")")
      //       .call(xAxis);

      //   svg.append("g")
      //       .attr("class", "y axis")
      //       .call(yAxis)
      //     .append("text")
      //       .attr("transform", "rotate(-90)")
      //       .attr("y", 6)
      //       .attr("dy", ".71em")
      //       .style("text-anchor", "end")
      //       .text("Class Average");

      //   svg.selectAll(".bar")
      //       .data(data)
      //     .enter().append("rect")
      //       .attr("class", "bar")
      //       .attr("x", function(d) { return x(d.subject); })
      //       .attr("width", x.rangeBand())
      //       .attr("y", function(d) { return y(d.average); })
      //       .attr("height", function(d) { return height - y(d.average); })
      //       .on('mouseover', tip.show)
      //       .on('mouseout', tip.hide);

      // })
      // .catch(function(error){
      //   console.log("Failed to find marksheets", error);
      // });

  }
  StatsCtrl.$inject = ['$scope', '$routeParams', 'model', 'File', 'Subjects', 'Students', 'Data2', 'Marksheets', 'Departments', 'Terms', 'Groups', 'SubjectTypes', 'Forms', 'Cache', 'Registrar', 'CourseCatalog', 'ClassMaster', 'TimeTable', 'Data', 'Location', 'Mastersheet', 'SchoolInfos', 'PROMOTE_OPTIONS'];
  angular.module('SchoolMan').controller('StatsCtrl', StatsCtrl);
