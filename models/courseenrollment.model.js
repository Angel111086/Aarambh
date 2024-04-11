var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const CourseEnrollment = function(courseenrollment) {  
  this.DateofEnrollment = courseenrollment.DateofEnrollment;  
  this.DateofCompletion = courseenrollment.DateofCompletion;  
  this.OtherDetails = courseenrollment.OtherDetails;  
  this.StudentId = courseenrollment.StudentId;  
  this.CourseId = courseenrollment.CourseId;
  this.StatusId = courseenrollment.StatusId;
  this.CreatedById = courseenrollment.CreatedById;
  this.ModifiedById = courseenrollment.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = courseenrollment.ModificationDate;
};

CourseEnrollment.addEnrollment = function (enrollment, result) {    
        pool.query("INSERT INTO COURSEENROLLMENT SET ?", enrollment, function (err, res) {                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, {"Message":"Course Enrollment Details Saved Successfully."});

                }
            });           
};

CourseEnrollment.CourseEnrollmentById = function (ceId, result) {    
        pool.query("SELECT * FROM COURSEENROLLMENT WHERE CourseEnrollmentId = ? AND StatusId = 1", [ceId], function (err, res) {                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res);

                }
            });           
};

CourseEnrollment.UpdateCE = function (ceId, courseenrollment,result) {
   pool.query("UPDATE courseenrollment SET DateofEnrollment = ?,DateofCompletion = ?, OtherDetails = ?, StudentId= ?, CourseId = ?,StatusId = ?, CreatedById = ? , ModifiedById = ?, CreationDate = ? ," + 
    "ModificationDate = ? WHERE CourseEnrollmentId = ?", 
    [courseenrollment.DateofEnrollment, courseenrollment.DateofCompletion, courseenrollment.OtherDetails, 
       courseenrollment.StudentId, courseenrollment.CourseId, courseenrollment.StatusId, courseenrollment.CreatedById, 
       courseenrollment.ModifiedById, courseenrollment.CreationDate, courseenrollment.ModificationDate, ceId], 
      function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};


CourseEnrollment.deleteCE = function(id, result){
  console.log('CEId',id);
  pool.query(`UPDATE courseenrollment SET StatusId = ? WHERE CourseEnrollmentId = ?`, 
    [0, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err, null);
             }
           else{   
             result(null, res);             
             console.log('Done');
                }
      });
}; 



module.exports= CourseEnrollment;