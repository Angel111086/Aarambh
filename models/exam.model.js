var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const Exam = function(exam, file) 
{   
  this.ExamTopic = exam.ExamTopic;
  this.ExamGroupId = exam.ExamGroupId;
  this.FromDate = exam.FromDate;
  this.ToDate = exam.ToDate;
  this.SchoolId = exam.SchoolId;
  this.TeacherId = exam.TeacherId;
  this.ClassId = exam.ClassId;
  this.CourseId = exam.CourseId;  
  this.FilePath = file;
  this.TotalMarks = exam.TotalMarks;
  this.PassingMarks = exam.PassingMarks;
  this.StatusId = exam.StatusId;
  this.CreatedById = exam.CreatedById;
  this.ModifiedById = exam.ModifiedById;
  this.CreationDate = exam.CreationDate;
  this.ModificationDate = exam.ModificationDate;
};

// Exam.createExam = function (exam, result) {
// 	pool.query("INSERT INTO exam SET ?", exam, function (err, res) {                
//     	if(err) {
//             //console.log(err.code)                 
//             result(err, null);
//         }
//         else{
//                console.log(res.insertId);
//                result(null, {"Message":"Exam Details Saved Successfully."});
//             }
//     });           
// };


Exam.createExam = function (exam, schoolId,result) 
{
 pool.query(`SELECT * FROM exam WHERE (ClassId = ? and CourseId = ?) AND (SchoolId = ? and ExamGroupId = ?)`,
  [exam.ClassId,exam.CourseId, schoolId, exam.ExamGroupId],function(err,res){
   if(err){
              console.log(err)
            }
            else{
              if(res.length>0){
               result(null, {"Message":"Exam Details is already saved."}); 
              }
              else{
                  pool.query("INSERT INTO exam SET ?", exam, function (err, res) { 
                    if(err) {
                      console.log("error: ", err);
                      result(err, null);
                  }
                  else{
                    console.log(res.insertId);
                    result(null, {"Message":"Exam Details Saved Successfully."});
                  }
                  

                    })
              }
            }
 })

 
};





Exam.updateById = function(id, exam, result){
var up_query, value;
pool.query("SELECT * from exam where ExamId = ?",[id],function(err,res){
    if(err) 
    {              
              console.log("error: ", err);
              result(err, null) ;
    }
    else
    {        
        console.log(res)
        console.log(res.length)
        if(res.length > 0){
        if(exam.FilePath !== undefined){
          up_query = `UPDATE exam SET ExamGroupId = ?, ExamTopic = ?,FromDate = ?, ToDate = ?, 
          			  FilePath = ?, TotalMarks = ?, PassingMarks = ?, StatusId = ?,
          			  ModificationDate = ?, ModifiedById= ? WHERE ExamId = ?`
          value = [exam.ExamGroupId,exam.ExamTopic,exam.FromDate, exam.ToDate, exam.FilePath,
          			exam.TotalMarks, exam.PassingMarks, exam.StatusId,
          			exam.ModificationDate, exam.ModifiedById,id]
        }
        else{
         up_query = `UPDATE exam SET ExamGroupId = ?, ExamTopic = ?,FromDate = ?, ToDate = ?, 
          			  TotalMarks = ?, PassingMarks = ?, StatusId = ?,
          			  ModificationDate = ?, ModifiedById= ? WHERE ExamId = ?`
          value = [exam.ExamGroupId,exam.ExamTopic,exam.FromDate, exam.ToDate, 
          			exam.TotalMarks, exam.PassingMarks, exam.StatusId,
          			exam.ModificationDate, exam.ModifiedById,id]
        }
        pool.query(up_query,value, function (err, res) 
        {
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


module.exports= Exam;