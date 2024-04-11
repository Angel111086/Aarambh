var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const PracticeModule = function(practicemodule) {   
  this.ClassId = practicemodule.ClassId;
  this.CourseId = practicemodule.CourseId;
  this.TopicId = practicemodule.TopicId;
  this.ChapterId = practicemodule.ChapterId;
  this.PracticeQuestionType = practicemodule.PracticeQuestionType;
  this.PracticeQuestion = practicemodule.PracticeQuestion;
  this.AnswerOption1 = practicemodule.AnswerOption1;
  this.AnswerOption2 = practicemodule.AnswerOption2;
  this.AnswerOption3 = practicemodule.AnswerOption3;
  this.AnswerOption4 = practicemodule.AnswerOption4;
  this.AnswerOption5 = practicemodule.AnswerOption5;
  this.AnswerOption6 = practicemodule.AnswerOption6;
  this.CorrectAnswer = practicemodule.CorrectAnswer; 
  this.StatusId = practicemodule.StatusId;
  this.CreatedById = practicemodule.CreatedById;
  this.ModifiedById = practicemodule.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = practicemodule.ModificationDate;
};

PracticeModule.createPracticeModule = function (practicemodule, result) {    
        pool.query("INSERT INTO practicemodule SET ?", practicemodule, function (err, res) {                
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);         
                    result(null, {"Message":"Practice Questions Saved Successfully."});

                }
            });           
};


PracticeModule.getPracticeQuestion = function (ClassId, CourseId, ChapterId,result) {
  console.log(ClassId,'id')                   
        pool.query("SELECT * FROM practicemodule WHERE ClassId = ? AND CourseId = ? AND ChapterId = ? AND StatusId = 1 ORDER BY RAND()",[ClassId, CourseId, ChapterId] , function (err, res) {
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



module.exports= PracticeModule;