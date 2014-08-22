'use strict';

function StatsCtrl($scope, $routeParams, File, Data2, Data, Location) {
  	    
      $scope.open = Location.open;

      var data = $scope.data = {
        view: 'mastersheet',
        stats: {},
      };


      $scope.round = Math.round;

      $scope.export = function(){

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
  StatsCtrl.$inject = ['$scope', '$routeParams', 'File', 'Data2', 'Data', 'Location'];
  angular.module('SchoolMan').controller('StatsCtrl', StatsCtrl);
