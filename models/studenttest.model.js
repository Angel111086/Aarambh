var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const StudentTest = function(studenttest) {   
  this.TestMasterId = studenttest.TestMasterId;
  this.StudentId = studenttest.StudentId;
  this.Date = studenttest.Date;
  this.Score = studenttest.Score;
  this.Total = studenttest.Total;
  this.NoofQuestionAttempted = studenttest.NoofQuestionAttempted;
  this.WrongQuestion = studenttest.WrongQuestion;
  this.RightQuestion = studenttest.RightQuestion;
  this.StatusId = studenttest.StatusId;
  this.CreatedById = studenttest.CreatedById;
  this.ModifiedById = studenttest.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = studenttest.ModificationDate;
};

StudentTest.createStudentTest = function (studenttest, result) {    
        pool.query("INSERT INTO studenttest SET ?", studenttest, function (err, res) {                
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);  
                    result(null, {"Message":"Details Saved Successfully."});

                }
            });           
};

StudentTest.getTest = function (studentTestId, result) {    
        pool.query("SELECT * from studenttest WHERE StudentTestId = ? AND StatusId = 1", [studentTestId], function (err, res) {                
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{
                    console.log(res);  
                    result(null, res);

                }
            });           
};

module.exports= StudentTest;