var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const TestResultDetail = function(ed) {
    this.TestResultMasterId = ed.TestResultMasterId;
    this.Question = ed.Question;
    this.QuestionMark = ed.QuestionMark;
    this.MarksObtained = ed.MarksObtained;
  	this.StatusId = ed.StatusId;
  	this.CreatedById = ed.CreatedById;
  	this.CreationDate = ed.CreationDate;
  	this.ModifiedById = ed.ModifiedById;  	
  	this.ModificationDate = ed.ModificationDate;
}


TestResultDetail.createResultDetail = function (ed, result) 
{   
    pool.query("INSERT INTO testresultdetail SET ?", [ed], function (err, res) {                
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{
                console.log(res.insertId);         
                result(null, {status:200,success:true,"Message":"Details Saved Successfully."});

            }
        });           
};

TestResultDetail.updateById = function(id, em, result)
{
  pool.query("UPDATE testresultdetail SET Question = ?, QuestionMark = ?, MarksObtained = ?, StatusId = ?, ModifiedById = ?, ModificationDate = ? WHERE TestResultDetailId = ?", 
    [em.Question, em.QuestionMark, em.MarksObtained, em.StatusId, em.ModifiedById, em.ModificationDate, id], function (err, res) 
    {
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
            console.log('Model',res);
             result(null, res);
                }
            }); 
}


module.exports = TestResultDetail;