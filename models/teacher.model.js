var mysql = require('mysql');
const pool = require('../lib/pool');
const passwordHash = require('password-hash');

// constructor
const Teacher = function(teacher) {   
  this.TeacherName = teacher.TeacherName;
  this.TeacherMobile = teacher.TeacherMobile;
  this.Username = teacher.Username;
  this.Password = teacher.Password;
  this.TeacherEmail = teacher.TeacherEmail;
  this.TeacherAddress = teacher.TeacherAddress;
  this.TeacherDOB = teacher.TeacherDOB;
  //this.FBToken = parentmain.FBToken;
  this.StatusId = teacher.StatusId;
  //this.SchoolId = teacher.SchoolId;
  //this.CreatedById = teacher.CreatedById;
  //this.ModifiedById = teacher.ModifiedById;
  this.CreationDate = new Date();
  //this.ModificationDate = parentmain.ModificationDate;
};

Teacher.createTeacherDetail = function (teacher, schoolId, result) {   
        var pass = teacher.Password;
        var hashedPassword = passwordHash.generate(pass);
        teacher.Password = hashedPassword; 
        teacher.schoolId = schoolId;
        pool.query("INSERT INTO teacher SET ?", teacher, function (err, res) {                
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);         
                    result(null, {"Message":"Details Saved Successfully."});

                }
            });           
};


// ParentMain.getParent = function (parentId, result) {
//   console.log(parentId,'id');            
//         pool.query("SELECT * FROM parentmain WHERE ParentId = ? AND StatusId = 1",[parentId] , function (err, res) {                       
//                 if(err) {
//                     console.log("error: ", err);
//                     result(err, null);
//                 }
//                 else{
//                     console.log(res);
//                     result(null, res);
              
//                 }
//             });   
// };

Teacher.updateById = function(id, teacher, result){

  pool.query("UPDATE teacher SET TeacherName = ?, TeacherMobile = ?,Username = ?,TeacherEmail=?,TeacherAddress=?,TeacherDOB=? WHERE TeacherId = ?", 
    [teacher.TeacherName, teacher.TeacherMobile, teacher.Username,teacher.TeacherEmail,teacher.TeacherAddress,teacher.TeacherDOB, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            }); 
};

Teacher.deleteById = function(id,result){
    pool.query("DELETE from teacher WHERE teacherId = ?",
    [id],function(err,res){
      if(err){
        console.log("error: ", err);
                  result(err,null);
      }
      else{
        result(null,res)
        console.log(res.affectedRows)
        console.log("done")
      }
    });
  };




module.exports= Teacher;