var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const Student = function(student, file) {   
  this.StudentName = student.StudentName;
  this.StudentGender = student.StudentGender;
  this.StudentMobile = student.StudentMobile;
  this.StudentAltMob = student.StudentAltMob;  
  this.StudentEmail = student.StudentEmail;
  this.StudentAddress = student.StudentAddress;
  this.StudentCity = student.StudentCity;
  this.StudentDOB = student.StudentDOB;
  this.StudentDORegis = student.StudentDORegis;
  this.StudentGuardianName = student.StudentGuardianName;
  this.StudentPassword = student.StudentPassword;
  this.StudentImage = file;
  this.ClassId = student.ClassId;
  this.SchoolId = student.SchoolId;
  this.StatusId = student.StatusId;
  this.CreatedById = student.CreatedById;
  this.ModifiedById = student.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = student.ModificationDate;

};

Student.createTask = function (student, result) {    
        pool.query("INSERT INTO student SET ?", student, function (err, res) {                
                if(err) {
                  //console.log(err.code)                 
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
         
                    result(null, {"Message":"Student Details Saved Successfully."});

                }
            });           
};

Student.getStudentById = function (studentId, result) {
  console.log(studentId,'id')
        //pool.query(`SELECT * FROM  student WHERE StudentId = ${studentId}` , function (err, res) {             
        pool.query("SELECT * FROM student WHERE StudentId = ?",[studentId] , function (err, res) {                       
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

//picture,altmob,mobile,address,password
Student.updateById = function(id, student, result){
  pool.query("UPDATE student SET StudentMobile = ?,StudentAltMob = ?, StudentName = ?, StudentEmail = ?, StudentGender = ?,StudentDOB = ?, StudentAddress = ?, StudentImage = ? WHERE studentId = ?", 
    [student.StudentMobile, student.StudentAltMob, student.StudentName, student.StudentEmail, student.StudentGender, student.StudentDOB, student.StudentAddress, student.StudentImage, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            }); 
};

Student.deleteById = function(id, result){
  pool.query(`UPDATE student SET StatusId = ? WHERE studentId = ?`, 
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

module.exports= Student;