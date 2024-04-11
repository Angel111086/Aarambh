var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const PracticeDetail = function(practicedetail) {   
  this.PracticeMasterId = practicedetail.PracticeMasterId;
  this.PracticeQuestionType = practicedetail.PracticeQuestionType;
  this.PracticeQuestion = practicedetail.PracticeQuestion;
  this.AnswerOption1 = practicedetail.AnswerOption1;
  this.AnswerOption2 = practicedetail.AnswerOption2;
  this.AnswerOption3 = practicedetail.AnswerOption3;
  this.AnswerOption4 = practicedetail.AnswerOption4;
  this.AnswerOption5 = practicedetail.AnswerOption5;
  this.AnswerOption6 = practicedetail.AnswerOption6;
  this.CorrectAnswer = practicedetail.CorrectAnswer; 
  this.StatusId = practicedetail.StatusId;
  this.CreatedById = practicedetail.CreatedById;
  this.ModifiedById = practicedetail.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = practicedetail.ModificationDate;
};

PracticeDetail.createPracticeDetail = function (practicedetail, result) {    
        pool.query("INSERT INTO practicedetail SET ?", practicedetail, function (err, res) {                
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


PracticeDetail.createDetail = function (rows,result) {
  console.log('Model');
        pool.query("INSERT INTO practicedetail (PracticeMasterId,PracticeQuestionType,PracticeQuestion,AnswerOption1,"+
          "AnswerOption2,AnswerOption3,AnswerOption4,AnswerOption5,AnswerOption6,CorrectAnswer,StatusId,CreatedById,"+
          "ModifiedById, CreationDate,ModificationDate) Values ?", [rows], function (err, res) {                
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



PracticeDetail.getPracticeQuestion = function (practiceId,result) {
  console.log(practiceId,'id')                   
        pool.query("SELECT * FROM practicedetail WHERE PracticeMasterId = ? AND StatusId = ? ORDER BY RAND()",[practiceId,'1'] , function (err, res) {
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

PracticeDetail.updatePracticeQuestion = function(practiceId, practice, result)
{
      pool.query(`UPDATE practicedetail SET PracticeQuestionType = ?, PracticeQuestion = ?,  AnswerOption1 = ?, 
        AnswerOption2 = ?, AnswerOption3 = ?, AnswerOption4 = ?, AnswerOption5 = ?, AnswerOption6 = ?, CorrectAnswer = ?, 
        StatusId = ?, ModifiedById = ?, ModificationDate = ? WHERE PracticeDetailId = ?`,
        [practice.PracticeQuestionType, practice.PracticeQuestion, practice.AnswerOption1, practice.AnswerOption2, practice.AnswerOption3,
        practice.AnswerOption4, practice.AnswerOption5, practice.AnswerOption6, practice.CorrectAnswer,
        practice.StatusId, practice.ModifiedById, practice.ModificationDate, practiceId], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            });
}

module.exports= PracticeDetail;