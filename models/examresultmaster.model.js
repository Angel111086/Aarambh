var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const ExamResultMaster = function(em) {
    this.SchoolId = em.SchoolId;
    this.ClassId = em.ClassId; 
    this.ExamGroupId = em.ExamGroupId; 
    this.CourseId = em.CourseId; 
    this.StudentId = em.StudentId; 
    this.TotalMarks = em.TotalMarks; 
    this.MarksObtained  = em.MarksObtained; 
	  this.GradeObtained  = em.GradeObtained; 
    this.Narration = em.Narration;
  	this.ResultType = em.ResultType;
  	this.StatusId = em.StatusId;
  	this.CreatedById = em.CreatedById;
  	this.CreationDate = em.CreationDate;
  	this.ModifiedById = em.ModifiedById;  	
  	this.ModificationDate = em.ModificationDate;
}


ExamResultMaster.createResultMaster = function (em, result) 
{   
    pool.query("INSERT INTO examresultmaster SET ?", em, function (err, res) {                
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{
                console.log(res.insertId);         
                result(null, {status:200,success:true,"Message":"Details Saved Successfully.","Id":res.insertId});

            }
        });           
};

ExamResultMaster.updateById = function(id, em, result)
{
  pool.query("UPDATE examresultmaster SET ClassId = ?, CourseId = ?, MarksObtained = ?, GradeObtained = ?, Narration =?, ResultType = ?, StatusId = ?, ModifiedById = ?, ModificationDate = ? WHERE ExamResultMasterId = ?", 
    [em.ClassId, em.CourseId, em.MarksObtained, em.GradeObtained, em.Narration, em.ResultType, em.StatusId, em.ModifiedById, em.ModificationDate, id], function (err, res) 
    {
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            }); 
}


module.exports = ExamResultMaster;