var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const AssignmentSubmit = function(assignment, file) {   
  this.ClassId = assignment.ClassId;
  this.CourseId = assignment.CourseId;
  this.ChapterId = assignment.ChapterId;
  this.TeacherId = assignment.TeacherId;
  this.SchoolId = assignment.SchoolId;
  this.StudentId = assignment.StudentId;
  this.AssignmentId = assignment.AssignmentId;
  this.AssignmentStatus = assignment.AssignmentStatus;
  this.AssignmentSubmitDocs = file;
  this.RejectReason = assignment.RejectReason;
  this.TotalMarks = assignment.TotalMarks;
  this.AchievedMarks = assignment.AchievedMarks; //New Added need to be tested.
  this.StatusId = assignment.StatusId;
  this.CreatedById = assignment.CreatedById;
  this.ModifiedById = assignment.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = assignment.ModificationDate;
};

AssignmentSubmit.createAssignments = function (assignments, schoolId, result) 
{   
    assignments.SchoolId = schoolId
    pool.query("INSERT INTO assignmentsubmit SET ?", assignments, function (err, res) {                
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


AssignmentSubmit.updateAssignmentStatus = function(id, assignment, result){
var up_query, value;
pool.query("SELECT * from assignmentsubmit where AssignmentSubmitId = ?",[id],function(err,res)
{
  if(err) 
  {              
    console.log("error: ", err);
    result(err, null) ;
  }
  else
  {   
    if(res.length > 0){
    if(assignment.AssignmentStatus == "accept")
    {
      up_query = "UPDATE assignmentsubmit SET AchievedMarks = ? WHERE AssignmentSubmitId = ?";
      value = [assignment.AchievedMarks,id];  
    }  
    if(assignment.RejectReason == undefined)
    {
      up_query = "UPDATE assignmentsubmit SET AssignmentStatus = ?, AchievedMarks = ? WHERE AssignmentSubmitId = ?";
      value = [assignment.AssignmentStatus, assignment.AchievedMarks,id]; 
    }
    else{
      up_query = "UPDATE assignmentsubmit SET AssignmentStatus = ?, RejectReason = ? WHERE AssignmentSubmitId = ?";
      value = [assignment.AssignmentStatus, assignment.RejectReason, id];  
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


AssignmentSubmit.updateAssignmentRejectStatus = function(id, assignment, result){
var up_query, value;
pool.query("SELECT * from assignmentsubmit where AssignmentSubmitId = ?",[id],function(err,res)
{
  if(err) 
  {              
    console.log("error: ", err);
    result(err, null) ;
  }
  else
  {   
    if(res.length > 0){
      up_query = "UPDATE assignmentsubmit SET AssignmentStatus = ?, AssignmentSubmitDocs = ? WHERE AssignmentSubmitId = ?";
      value = [assignment.AssignmentStatus, assignment.AssignmentSubmitDocs, id]; 
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






module.exports = AssignmentSubmit;