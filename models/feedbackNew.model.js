var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const FeedbackNew = function(feedback) {   
  this.SchoolId = feedback.SchoolId;
  this.Message = feedback.Message;
  this.username = feedback.username;
  this.useremail = feedback.useremail;
  this.StudentId = feedback.StudentId;
  this.ClassId = feedback.ClassId;
  this.StatusId = feedback.StatusId;
  this.CreatedById = feedback.CreatedById;
  this.ModifiedById = feedback.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = feedback.ModificationDate;
};

FeedbackNew.createFeedback = function (feedback, schoolId, result) {    
    feedback.SchoolId = schoolId
    feedback.ClassId = feedback.ClassId
    pool.query("SELECT * from feedbacknew WHERE ClassId = ? AND SchoolId = ? AND StudentId = ? AND Message = ?",[
        feedback.ClassId,feedback.SchoolId,feedback.StudentId,feedback.Message],function(err,res){
            if(err){
              console.log(err);
            }
            else{
            console.log(res.length)
              if(res.length>0){
                  result(null, {"Message":"Feedback is already saved."});    
              }
              else if (res.length == 0){
                console.log(feedback);
        pool.query("INSERT INTO feedbacknew SET ?", feedback, function (err, res) {                
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);         
                    result(null, {"Message":"Feedback Saved Successfully."});

                }
            });           
};
            }
        });
    }


FeedbackNew.viewById = function(schoolId, classId, result)
{
  var up_query, value;
  if(classId){
    //up_query = 'SELECT * from feedbacknew Where SchoolId = ? AND ClassId = ? AND StatusId=1';
    up_query = `SELECT a.*, sc.StudentName, sc.StudentMobile from feedbacknew as a 
                LEFT JOIN studentmain as sc ON (a.StudentId = sc.StudentId) 
                WHERE a.SchoolId = ? AND a.ClassId = ? AND a.StatusId = 1`;
    value = [schoolId, classId]
  }
  else{
   //up_query = 'SELECT * from feedbacknew Where SchoolId = ? AND StatusId=1';
    up_query = `SELECT a.*, sc.StudentName, sc.StudentMobile from feedbacknew as a 
                LEFT JOIN studentmain as sc ON (a.StudentId = sc.StudentId) 
                WHERE a.SchoolId = ? AND a.StatusId = 1`;
    value = [schoolId] 
  }
  console.log('feedback',schoolId)             
        pool.query(up_query, value, function (err, res) {                       
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res);
                    result(null, res);
              
                }
            });   
}

module.exports= FeedbackNew;