var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const ExamSubmit = function(exam, file) {   
  this.ClassId = exam.ClassId;
  this.SchoolId = exam.SchoolId;
  this.ExamId = exam.ExamId;
  this.StudentId = exam.StudentId;
  this.ExamStatus = exam.ExamStatus;
  this.ExamDocs = file;
  this.RejectReason = exam.RejectReason;
  this.StatusId = exam.StatusId;
  this.CreatedById = exam.CreatedById;
  this.ModifiedById = exam.ModifiedById;
  this.CreationDate = exam.CreationDate;
  this.ModificationDate = exam.ModificationDate;
};

ExamSubmit.createExam = function (exam, schoolId, result) 
{   
    exam.SchoolId = schoolId
    pool.query("INSERT INTO examsubmit SET ?", exam, function (err, res) {                
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


ExamSubmit.updateExamStatus = function(id, exam, result){
var up_query, value;
pool.query("SELECT * from examsubmit where ExamSubmitId = ?",[id],function(err,res)
{
  if(err) 
  {              
    console.log("error: ", err);
    result(err, null) ;
  }
  else
  {   
    if(res.length > 0){
    if(exam.RejectReason == undefined)
    {
      up_query = "UPDATE examsubmit SET ExamStatus = ?, ModifiedById = ?, ModificationDate = ?  WHERE ExamSubmitId = ?";
      value = [exam.ExamStatus,exam.ModifiedById, exam.ModificationDate, id]; 
    }
    else{
      up_query = "UPDATE examsubmit SET ExamStatus = ?, RejectReason = ?,ModifiedById = ?, ModificationDate = ? WHERE ExamSubmitId = ?";
      value = [exam.ExamStatus, exam.RejectReason,exam.ModifiedById, exam.ModificationDate, id];  
    }
    pool.query(up_query,value, function (err, res) {
              if(err) {
                  console.log("error: ", err);
                    result(err,null);
                 }
               else{   
                 result(null, res);
                    }
                }); }

        else{
                console.log("no")
                result(null,res)
            }
    }
  }) 
};


ExamSubmit.updateExamRejectStatus = function(id, exam, result){
var up_query, value;
pool.query("SELECT * from examsubmit where ExamSubmitId = ?",[id],function(err,res)
{
  if(err) 
  {              
    console.log("error: ", err);
    result(err, null) ;
  }
  else
  {   
    if(res.length > 0){
      up_query = "UPDATE examsubmit SET ExamStatus = ?, ExamDocs = ? WHERE ExamSubmitId = ?";
      value = [exam.ExamStatus, exam.ExamDocs, id]; 
    pool.query(up_query,value, function (err, res) {
              if(err) {
                  console.log("error: ", err);
                    result(err,null);
                 }
               else{   
                 result(null, res);
                    }
                }); }

        else{
                console.log("no")
                result(null,res)
            }
    }
  }) 
};



module.exports = ExamSubmit;