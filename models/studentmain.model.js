var mysql = require('mysql');
const pool = require('../lib/pool');
const passwordHash = require('password-hash');

// constructor
const StudentMain = function(studentmain, file) {   
  this.StudentName = studentmain.StudentName;
  this.StudentGender = studentmain.StudentGender;
  this.StudentMobile = studentmain.StudentMobile;
  this.StudentUsername = studentmain.StudentUsername;  
  //this.StudentEmail = studentmain.StudentEmail;
  //this.StudentAddress = studentmain.StudentAddress;
  //this.StudentCity = studentmain.StudentCity;
  this.StudentDOB = studentmain.StudentDOB;
  this.StudentDORegis = studentmain.StudentDORegis;  
  this.StudentPassword = studentmain.StudentPassword;
  this.StudentImage = file;
  this.ParentId = studentmain.ParentId;
  this.ClassId = studentmain.ClassId;
  this.SchoolId = studentmain.SchoolId;
  this.ExpireDate = studentmain.ExpireDate;
  this.FirebaseToken = studentmain.FirebaseToken;
  this.StatusId = studentmain.StatusId;
  this.CreatedById = studentmain.CreatedById;
  this.ModifiedById = studentmain.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = studentmain.ModificationDate;

};

StudentMain.createStudent = function (studentmain, parentId, studentimage, schoolId,result) {
        var pass = studentmain.StudentPassword;
        var hashedPassword = passwordHash.generate(pass);
        studentmain.StudentPassword = hashedPassword; 
        studentmain.ParentId = parentId;
        studentmain.SchoolId = schoolId;
        studentmain.StudentImage = studentimage;
        studentmain.StudentDORegis = new Date();
        studentmain.StatusId = 1;
        studentmain.CreatedById = parentId;
        pool.query("INSERT INTO studentmain SET ?", studentmain, function (err, res) {                
                if(err) {
                  //console.log(err.code)                 
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, {"Message":"Student Details Saved Successfully.","id":res.insertId});

                }
            });           
};


StudentMain.createStudentWeb = function (studentmain, parentId, studentimage, schoolId,result) {
        // var mob = studentmain.StudentMobile;
        // if(mob == null){
        //   studentmain.StudentMobile = null;
        // }
        var pass = studentmain.StudentPassword;
        var hashedPassword = passwordHash.generate(pass);
        studentmain.StudentPassword = hashedPassword; 
        studentmain.ParentId = parentId;
        studentmain.SchoolId = schoolId;
        studentmain.StudentImage = studentimage;
        studentmain.StudentDORegis = new Date();
        studentmain.StatusId = 1;
        studentmain.CreatedById = 1;
        studentmain.ModifiedById = 1
        studentmain.CreationDate = new Date();
        studentmain.ModificationDate = null;
        pool.query("INSERT INTO studentmain SET ?", studentmain, function (err, res) {                
                if(err) {
                  //console.log(err.code)                 
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, {"Message":"Student Details Saved Successfully.","id":res.insertId});

                }
            });           
};




StudentMain.getStudentById = function (parentId, result) {
  console.log(parentId,'id')             
        pool.query("SELECT studentmain.* , studentclass.StudentClass FROM studentmain LEFT JOIN studentclass ON (studentmain.ClassId = studentclass.ClassId) WHERE studentmain.ParentId = ? AND studentmain.StatusId=1 ",[parentId] , function (err, res) {                       
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

StudentMain.getStudentBySchoolId = function (schoolId, result) {
  //console.log(parentId,'id')             
        pool.query("SELECT * FROM studentmain WHERE SchoolId = ? and StatusId = 1",[schoolId] , function (err, res) {                       
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



StudentMain.getStudentByStudentId = function (studentId, result) {
  console.log(studentId,'id')
        //pool.query(`SELECT * FROM  student WHERE StudentId = ${studentId}` , function (err, res) {             
        pool.query("SELECT * FROM studentmain WHERE StudentId = ? AND StatusId = 1",[studentId] , function (err, res) {                       
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


StudentMain.updateById = function(id, student, result){
  // pool.query("UPDATE studentmain SET StudentMobile = ?, StudentName = ?, StudentEmail = ?, StudentGender = ?,StudentDOB = ?, StudentAddress = ?, StudentImage = ? WHERE studentId = ?", 
  //   [student.StudentMobile, student.StudentName, student.StudentEmail, student.StudentGender, student.StudentDOB, student.StudentAddress, student.StudentImage, id], function (err, res) {
    pool.query("UPDATE studentmain SET StudentMobile = ?, StudentName = ?,  StudentGender = ?,StudentDOB = ?, StudentImage = ? WHERE studentId = ?", 
    [student.StudentMobile, student.StudentName,student.StudentGender, student.StudentDOB, 
    student.StudentImage,id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            }); 
};

StudentMain.updateByIdWeb = function(id, student, result){
    console.log('Model',student);
    console.log('Id',id);
    pool.query("UPDATE studentmain SET StudentMobile = ?, StudentName = ?,  StudentGender = ?,StudentDOB = ?, ClassId=? WHERE studentId = ?", 
    [student.StudentMobile, student.StudentName,student.StudentGender, 
    student.StudentDOB, student.ClassId, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            }); 
};





StudentMain.updatePasswordById = function(id, password, result){  
  pool.query("UPDATE studentmain SET StudentPassword = ? WHERE studentId = ?",
  [password, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
              result(err,null);
           }
         else{  
           result(null, res);
              }
          });
};


StudentMain.createStudentExcel = function (rows,result) {
  try{
        var query = `INSERT INTO studentmain (StudentName, StudentGender, StudentMobile, StudentUsername, StudentDOB, StudentDORegis, StudentPassword, StudentImage, ParentId, ClassId, SchoolId, StatusId, CreatedById, ModifiedById, CreationDate, ModificationDate) VALUES ?`;
        //pool.query(`INSERT INTO studentmain SET ?`, studentmain, function (err, res) {                
          pool.query(query, [rows], function (err, res) {                
                if(err) {
                  console.log(err.code)                 
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, "Student Details Saved Successfully.");

                }
            });           
}catch(e) {console.log(e);}
};


StudentMain.deleteById = function(data, result){
  pool.query(`UPDATE studentmain SET StatusId = ? WHERE studentId = ?`, 
    [data.StatusId, data.StudentId], function (err, res) {
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

module.exports= StudentMain;