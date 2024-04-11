var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const GradeMaster = function(gm) {  
	this.SchoolId = gm.SchoolId; 
  	this.ClassId = gm.ClassId;
  	this.CourseId = gm.CourseId;   
  	this.StatusId = gm.StatusId;
  	this.CreatedById = gm.CreatedById;
  	this.CreationDate = gm.CreationDate;
  	this.ModifiedById = gm.ModifiedById;  	
  	this.ModificationDate = gm.ModificationDate;
}

// GradeMaster.createGradeMaster = function (gm, result) 
// {   
//     pool.query("INSERT INTO grademaster SET ?", gm, function (err, res) {                
//             if(err) {
//                 console.log(err);
//                 result(err, null);
//             }
//             else{
//                 console.log(res.insertId);         
//                 result(null, {status:200,success:true,"Message":"Details Saved Successfully.","Id":res.insertId});

//             }
//         });           
// };

GradeMaster.createGradeMaster = function (gm, schoolId, result) {
 pool.query(`SELECT * FROM grademaster WHERE (ClassId = ? and CourseId = ?) AND SchoolId = ?`,[gm.ClassId,gm.CourseId, schoolId],function(err,res){
   if(err){
              console.log(err)
            }
            else{
              if(res.length>0){
               result(null, {"Message":"Grade Details is already saved."}); 
              }
              else{
                  pool.query("INSERT INTO grademaster SET ?", gm, function (err, res) { 
                    if(err) {
                      console.log("error: ", err);
                      result(err, null);
                  }
                  else{
                    console.log(res.insertId);
                    result(null, {"Message":"Grade Master Details saved successfully.","Id":res.insertId});
                  }
                  

                    })
              }
            }
 })

 
};


GradeMaster.updateById = function(id, gm, result)
{
  pool.query("UPDATE grademaster SET ClassId = ?, CourseId = ?,StatusId = ?,ModifiedById = ?, ModificationDate = ? WHERE GradeMasterId = ?", 
    [gm.ClassId, gm.CourseId, gm.StatusId, gm.ModifiedById, gm.ModificationDate, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            }); 
}


module.exports = GradeMaster;