'use strict';

angular.module('SchoolMan')

 /**
  * @ngdoc object
  * @name SchoolMan.object:Marksheet
  * @method {function} getAverage
  * @method {function} updateRankings
  * @method {function} getCells
  * @method {function} getSequences
  * @method {function} getRank
  * @description
  *
  * The Marksheet does many things. Too many probably... I will write this later.
  */
  .value('Marksheet', (function(){   

    function Marksheet(){
      // Prevents global namespace clobbering if you istantiate this object
      // without the 'new' keyword
      if (!(this instanceof Marksheet)) {
        return new Marksheet();
      }

      // keys are student id's, values are row objects
      this.table = {};
      this.courseId = "";
      this.updateRankings();

      // callback functions
      this.listeners = [];
      this.notify =  function(msg){
        console.log("Marksheet notifying listeners: ", this.listeners);
        angular.forEach(this.listeners, function(callback, $index){
          callback(msg);  
        });
      };
      this.onChange = function(callback){
        // console.log("Register listener");
        this.listeners.push(callback);
        // console.log("Listeners", listeners);
      };
      this.getListeners = function(){
        return this.listeners;
      }
    };

    Marksheet.sequences = {
        0:2,
        1:2,
        2:2
    };

    Marksheet.prototype.sequences = Marksheet.sequences;


    Marksheet.prototype.getRow = function(studentId){
      // console.log("Marksheet Table", this.table);
      return this.table[studentId];
    }

    Marksheet.prototype.getCells = function(studentId){
      return this.getRow(studentId).columns;
    }

    Marksheet.prototype.getSequences = function(termIndex){

        // If termIndex is provided return sequences for the term, otherwise
        // return all sequences
        var terms = {};
        if(termIndex){
          terms[termIndex] = this.sequences[termIndex];
        }else{
            terms = this.sequences;
        } 

        var sequences = [];
        angular.forEach(terms, function(sequence, sequenceKey){
          var count = 0;
          while(count < sequence){
            sequences.push((sequenceKey * 2) + count + 1);
            count +=1;
          } 
        });
        return sequences;
      }

    Marksheet.prototype.getMarks = function(studentId, termIndex){
      var cells = this.getCells(studentId);
      var sequences = this.getSequences(termIndex);
      var marks = sequences.map(function(sequence, sequenceIndex){
        return cells[sequence - 1].mark;
      });

      return marks;
    }

    Marksheet.prototype.getMatrix = function(){
        var matrix = [];
        angular.forEach(table, function(row, studentId){
          var columns = row.columns.map(function(cell){
            return cell.mark;
          });
          matrix.push([studentId].concat(columns));
        });
        return matrix;
      }

    Marksheet.prototype.getRank = function(studentId, termIndex){
        var rank = 0;
        // console.log("Course", this);
        // console.log("Student", studentId);
        // console.log("Table", this.table);
        if(termIndex === undefined || termIndex === 3){
          rank = this.table[studentId].ranking[3];
        }else{
          rank = this.table[studentId].ranking[termIndex];
        }
        // console.log("Row for ", studentId, this.table[studentId]);
        return rank;
      }

    Marksheet.prototype.getRandBetween = function(min, max){
        return Math.floor(Math.random() * (max - min) + min);
      }

    Marksheet.prototype.addStudent = function(studentId){
        // console.log("Adding Student");
        var columns = [];
        angular.forEach(this.sequences, function(sequence,sequenceKey){
          var n = 0;
          while(n < sequence){
            var cell = Cell([{date:null,value:getRandBetween(0,21)}]);
            // var cell = Cell([{date:null,value:""}]);
            // onChange is a callback function defined in Cell
            cell.onChange(function(c){
              console.log("Cell Changed", c);
              this.updateRankings();
            });
            columns.push(cell);
            n += 1;
          }
        });
        var row = Row({columns:columns, studentId:studentId});
        console.log("Row", row);
        table[studentId] = row;
      }


   /**
    * @ngdoc method
    * @name Schoolman.object:Marksheet#getAverage
    * @methodOf SchoolMan.object:Marksheet
    * @param {string} studentId 
    * @param {int} termIndex [optional] 
    * @returns {float} average
    * @description
    *
    * This method selects a student from the marksheet and returns their term or year average
    */
    Marksheet.prototype.getAverage = function(studentId, termIndex){
      var row = this.getRow(studentId);
      var average = termIndex ? row.getAverage(termIndex) : row.getAverage(3);
      return average;
    };


    Marksheet.prototype.updateRankings = function(){

      // console.log("update rankings");
      var self = this;

      var runCrazyHelperFunctionThatNeedsToBeRefactored = function(termIndex){

        // Make an array of copies of each student in table
        var rows = [];
        angular.forEach(self.table, function(row, studentId){
          rows.push(angular.copy(row));
        });


        // Sort students by total mark
        rows.sort(function(s1, s2){
          return  s2.getAverage(termIndex) - s1.getAverage(termIndex);
        });

        // Assign a rank to each student for this term
        angular.forEach(rows, function(row, rowIndex){

          // Initialize the ranking attribute
          if(!row.hasOwnProperty('ranking')){
            row.ranking = {};
          }

          // give the first student rank 1
          if(rowIndex === 0){
            row.ranking[termIndex] = 1;
          }else{

            // need to compare this student with the last student, so doing some calculations
            var average = 0;
            var curr = 0;
            var prev = 0;
            if(termIndex){
              curr = row.getAverage(termIndex);
              prev = rows[rowIndex - 1].getAverage(termIndex);
            }else{
              curr = row.getAverage(3);
              prev = rows[rowIndex - 1].getAverage(3);
            }
            

            // Ok, so if next student is tied with previous student, give them the same rank
            if(curr === prev){
              row.ranking[termIndex] = rows[rowIndex - 1].ranking[termIndex];
            }else{
              // otherwise their rank is equal to their index in the sorted array (plus 1)
              row.ranking[termIndex] = rowIndex + 1;
            }

          }
        });

        

        // loop through the rankings and transfer the ranking attribute to the actual 
        // student row in the table
        angular.forEach(rows, function(row, rowIndex){
          self.table[row.studentId].ranking = row.ranking;
        }); 

        // Finally we're done
      };

      // Now we've got to run that function 3 times, one for each term
      angular.forEach(this.sequences, function(numSequence, term){
        runCrazyHelperFunctionThatNeedsToBeRefactored(term);
      });

      // Oh hell, lets run it one more time for good measure (actually, for all the terms together)
      runCrazyHelperFunctionThatNeedsToBeRefactored(3);
      // Remember, 3 stands for all 3 terms ... :(

      // P.S. If your reading this, that means I never refactored this ranking system
      // I'm sorry ... I'm very sorry
    }


    Marksheet.prototype.onLoad = function(){
      // if(this.hasOwnProperty("listeners")){
      //   console.log("Deleteing listeners");
      //   delete this.listeners;
      // }
      var self = this;
      angular.forEach(this.table, function(row, studentId){
        row.onChange(function(msg){
          var msg = "row " + studentId + " changed : " + msg;
          console.log(msg);
          self.updateRankings();
          self.notify(msg);
        });
      });
    };

    return Marksheet;

  })());
