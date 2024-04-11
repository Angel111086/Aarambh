var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const TestDetail = function(testdetail) {   
  this.TestMasterId = testdetail.TestMasterId;
  this.TestQuestionType = testdetail.TestQuestionType;
  this.TestQuestion = testdetail.TestQuestion;
  this.AnswerOption1 = testdetail.AnswerOption1;
  this.AnswerOption2 = testdetail.AnswerOption2;
  this.AnswerOption3 = testdetail.AnswerOption3;
  this.AnswerOption4 = testdetail.AnswerOption4;
  this.AnswerOption5 = testdetail.AnswerOption5;
  this.AnswerOption6 = testdetail.AnswerOption6;
  this.CorrectAnswer = testdetail.CorrectAnswer; 
  this.StatusId = testdetail.StatusId;
  this.CreatedById = testdetail.CreatedById;
  this.ModifiedById = testdetail.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = testdetail.ModificationDate;
};

TestDetail.createTestDetail = function (testdetail, result) {    
        pool.query("INSERT INTO testdetail SET ?", testdetail, function (err, res) {                
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


TestDetail.createDetail = function (rows,result) {
  console.log('Model');
        pool.query("INSERT INTO testdetail (TestMasterId,TestQuestionType,TestQuestion,AnswerOption1,"+
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


TestDetail.getTestQuestion = function (testId,result) {
  console.log(testId,'id')                   
        pool.query("SELECT * FROM testdetail WHERE TestMasterId = ? AND StatusId = 1 ORDER BY RAND()",[testId] , function (err, res) {
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

TestDetail.updateTestQuestion = function(testId, test, result)
{
      pool.query(`UPDATE testdetail SET TestQuestionType = ?, TestQuestion = ?,  AnswerOption1 = ?, 
        AnswerOption2 = ?, AnswerOption3 = ?, AnswerOption4 = ?, AnswerOption5 = ?, AnswerOption6 = ?, CorrectAnswer = ?, 
        StatusId = ?, ModifiedById = ?, ModificationDate = ? WHERE TestDetailId = ?`,
        [test.TestQuestionType, test.TestQuestion, test.AnswerOption1, test.AnswerOption2, test.AnswerOption3,
        test.AnswerOption4, test.AnswerOption5, test.AnswerOption6, test.CorrectAnswer,
        test.StatusId, test.ModifiedById, test.ModificationDate, testId], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            });
}




module.exports= TestDetail;