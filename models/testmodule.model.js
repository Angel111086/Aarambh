var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const TestModule = function(testmodule) {   
  this.ClassId = testmodule.ClassId;
  this.CourseId = testmodule.CourseId;
  this.TopicId = testmodule.TopicId;
  this.ChapterId = testmodule.ChapterId;
  this.TestQuestionType = testmodule.TestQuestionType;
  this.TestQuestions = testmodule.TestQuestions;
  this.AnswerOption1 = testmodule.AnswerOption1;
  this.AnswerOption2 = testmodule.AnswerOption2;
  this.AnswerOption3 = testmodule.AnswerOption3;
  this.AnswerOption4 = testmodule.AnswerOption4;
  this.AnswerOption5 = testmodule.AnswerOption5;
  this.AnswerOption6 = testmodule.AnswerOption6;
  this.CorrectAnswer = testmodule.CorrectAnswer; 
  this.StatusId = testmodule.StatusId;
  this.CreatedById = testmodule.CreatedById;
  this.ModifiedById = testmodule.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = testmodule.ModificationDate;
};

TestModule.createTestModule = function (testmodule, result) {    
        pool.query("INSERT INTO testmodule SET ?", testmodule, function (err, res) {                
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);         
                    result(null, {"Message":"Questions Saved Successfully."});

                }
            });           
};


TestModule.getTestQuestion = function (ClassId, CourseId, ChapterId,result) {
  console.log(ClassId,'id')                   
        pool.query("SELECT * FROM testmodule WHERE ClassId = ? AND CourseId = ? AND ChapterId = ? AND StatusId = 1 ORDER BY RAND()",[ClassId, CourseId, ChapterId] , function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res);
                    result(null, res);
              
                }
            });   
};

module.exports= TestModule;