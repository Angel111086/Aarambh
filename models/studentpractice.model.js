var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const StudentPractice = function(studentpractice) {   
  this.PracticeMasterId = studentpractice.PracticeMasterId;
  this.StudentId = studentpractice.StudentId;
  this.Date = studentpractice.Date;
  this.Score = studentpractice.Score;
  this.Total = studentpractice.Total;
  this.NoofQuestionAttempted = studentpractice.NoofQuestionAttempted;
  this.WrongQuestion = studentpractice.WrongQuestion;
  this.RightQuestion = studentpractice.RightQuestion;
  this.StatusId = studentpractice.StatusId;
  this.CreatedById = studentpractice.CreatedById;
  this.ModifiedById = studentpractice.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = studentpractice.ModificationDate;
};

StudentPractice.createStudentPractice = function (studentpractice,schoolId, result) {
    studentpractice.schoolId = schoolId;    
        pool.query("INSERT INTO studentpractice SET ?", studentpractice, function (err, res) {                
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

StudentPractice.getPractice = function (studentPracticeId, result) {    
        pool.query("SELECT * from studentpractice WHERE StudentPracticeId = ? AND StatusId = 1", [studentPracticeId], function (err, res) {                
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
module.exports= StudentPractice;