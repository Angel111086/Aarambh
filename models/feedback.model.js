var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const Feedback = function(feedback) {   
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

Feedback.createFeedback = function (feedback, result) {    
        pool.query("INSERT INTO feedback SET ?", feedback, function (err, res) {                
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

Feedback.viewById = function(schoolId, result)
{
  console.log('feedback',schoolId)             
        pool.query("SELECT * from feedback Where SchoolId = ? AND StatusId=1 ",[schoolId] , function (err, res) {                       
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
module.exports= Feedback;