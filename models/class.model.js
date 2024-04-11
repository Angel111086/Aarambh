var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const StudentClass = function(studentclass) {   
  this.ClassId = studentclass.ClassId;
  this.StudentClass = studentclass.StudentClass;
  //this.SchoolId = studentclass.SchoolId;
  this.OrderClass = studentclass.OrderClass;
  this.StatusId = studentclass.StatusId;
  this.CreatedById = studentclass.CreatedById;
  this.ModifiedById = studentclass.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = studentclass.ModificationDate;
};

// StudentClass.addClass = function (studentclass, result) {    
//         pool.query("INSERT INTO studentclass SET ?", studentclass, function (err, res) {                
//                 if(err) {
//                     console.log("error: ", err);
//                     result(err, null);
//                 }
//                 else{
//                     console.log(res.insertId);
//                     result(null, {"Message":"Class Details Saved Successfully."});

//                 }
//             });           
// };

StudentClass.addClass = function (studentclass,result){ 
//studentclass.schoolId = schoolId;
{  
        pool.query("SELECT studentclass FROM studentclass WHERE studentclass = ? AND StatusId = ?",[studentclass.StudentClass, studentclass.StatusId], function(err,res){
          console.log(res.length);
          if(err){
            console.log(err);
          }
          else
          {
            if(res.length>0){
              result(null, {"Message":"Class name is already saved."}); 
            }
            else
            {
                pool.query("INSERT INTO studentclass SET ?", studentclass, function (err, res) {                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, {"Message":"Class Details Saved Successfully."});

                }
            });          
            }
          }
        }); 
};
}


StudentClass.ClassById = function (classId, result) {    
        pool.query("SELECT * FROM studentclass WHERE ClassId = ? AND StatusId = 1", [classId], function (err, res) {                
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

StudentClass.UpdateClass = function (classId, studentclass,result) {
   pool.query("UPDATE studentclass SET StudentClass = ?,StatusId = ?, CreatedById = ? , ModifiedById = ?, CreationDate = ? ," + 
   	"ModificationDate = ? WHERE ClassId = ?", 
    [studentclass.StudentClass, studentclass.StatusId, studentclass.CreatedById, studentclass.ModifiedById, studentclass.CreationDate, 
    studentclass.ModificationDate, classId], 
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


StudentClass.deleteClass = function(id, result){
  pool.query(`UPDATE studentclass SET StatusId = ? WHERE ClassId = ?`, 
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

module.exports= StudentClass;

