var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const Assignment = function(assignment, file) {   
  this.ClassId = assignment.ClassId;
  this.CourseId = assignment.CourseId;
  this.ChapterId = assignment.ChapterId;
  this.TeacherId = assignment.TeacherId;
  this.SchoolId = assignment.SchoolId;
  this.AssignmentTitle = assignment.AssignmentTitle;
  this.AssignmentDate = assignment.AssignmentDate;
  this.CompletionDate = assignment.CompletionDate;
  this.AssignmentDocs = file;
  this.TotalMarks = assignment.TotalMarks; //new added need to be tested.
  this.StatusId = assignment.StatusId;
  this.CreatedById = assignment.CreatedById;
  this.ModifiedById = assignment.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = assignment.ModificationDate;
};

Assignment.createAssignments = function (assignments, schoolId, result) {   
    assignments.SchoolId = schoolId
    pool.query("INSERT INTO assignment SET ?", assignments, function (err, res) {                
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

Assignment.updateAssignments = function(id, assignment, result){
var up_query, value;
pool.query("SELECT * from assignment where AssignmentId = ?",[id],function(err,res)
{
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
    if(assignment.AssignmentDocs !== undefined)
    {
      up_query = "UPDATE assignment SET ClassId = ?, CourseId = ?, ChapterId = ?, TeacherId = ?, AssignmentTitle = ?, AssignmentDate = ?, CompletionDate = ?, AssignmentDocs = ?, StatusId = ? ,TotalMarks = ?, ModifiedById = ?,ModificationDate = ? WHERE AssignmentId = ?";
      value = [assignment.ClassId, assignment.CourseId, assignment.ChapterId, assignment.TeacherId, 
      assignment.AssignmentTitle, assignment.AssignmentDate, assignment.CompletionDate, 
      assignment.AssignmentDocs, assignment.StatusId, assignment.TotalMarks,assignment.ModifiedById, 
      assignment.ModificationDate, id]; 
    }
    else{
      up_query = "UPDATE assignment SET ClassId = ?, CourseId = ?, ChapterId = ?, TeacherId = ?, AssignmentTitle = ?, AssignmentDate = ?, CompletionDate = ?, StatusId = ? ,TotalMarks = ?, ModifiedById = ?,ModificationDate = ? WHERE AssignmentId = ?";
      value = value = [assignment.ClassId, assignment.CourseId, assignment.ChapterId, 
      assignment.TeacherId, assignment.AssignmentTitle, 
      assignment.AssignmentDate, assignment.CompletionDate, 
      assignment.StatusId, assignment.TotalMarks,assignment.ModifiedById, 
      assignment.ModificationDate, id]; 
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

Assignment.getAssignmentById = function (assignmentId, result) {
  console.log(assignmentId,'id')             
        pool.query(`SELECT * from assignment WHERE AssignmentId = ? AND StatusId = 1`,[assignmentId] , function (err, res) {                       
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


module.exports = Assignment;