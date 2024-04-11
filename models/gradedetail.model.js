var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const GradeDetail = function(gd) {  
	  this.GradeMasterId = gd.GradeMasterId; 
    this.FromRange = gd.FromRange;
    this.ToRange = gd.ToRange;
    this.Grade = gd.Grade;
  	this.StatusId = gd.StatusId;
  	this.CreatedById = gd.CreatedById;
  	this.CreationDate = gd.CreationDate;
  	this.ModifiedById = gd.ModifiedById;  	
  	this.ModificationDate = gd.ModificationDate;
}

GradeDetail.createGradeDetail = function (gd, result) 
{   
    pool.query("INSERT INTO gradedetail SET ?", [gd], function (err, res) {                
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


// GradeDetail.updateById = function(id, gd, result){
//   // pool.query("UPDATE gradedetail SET FromRange = ?, ToRange = ?, Grade = ?, StatusId = ?,ModifiedById = ?, ModificationDate = ? WHERE GradeDetailId = ?", 
//   //   [gd.FromRange, gd.ToRange, gd.Grade, gd.StatusId, gd.ModifiedById, gd.ModificationDate, id], function (err, res) {
//     var queries;
//     console.log("GD Model",gd);
//     console.log("GD Model ID",id);
//     pool.query(`UPDATE gradedetail SET FromRange = ?, ToRange = ?, Grade = ?, StatusId = ?,ModifiedById = ?, ModificationDate = ? WHERE GradeDetailId = ?`, 
//     [gd.FromRange, gd.ToRange, gd.Grade, gd.StatusId, gd.ModifiedById, gd.ModificationDate, id], function (err, res) {
// //   pool.query(queries, defered.makeNodeResolver() , function (err, res) {  
//           if(err) {
//               console.log("error: ", err);
//                 result(err,null);
//              }
//            else{   
//              result(null, res);
//                 }
//             }); 
// };




GradeDetail.updateById = function(id, gd, result){  
    var up_query,value;

    if(!id)
    {
        up_query = "INSERT INTO gradedetail SET ?";
        value = [gd]
    }
    else
    {
      up_query = `UPDATE gradedetail SET FromRange = ?, ToRange = ?, Grade = ?, StatusId = ?,ModifiedById = ?, ModificationDate = ? WHERE GradeDetailId = ?`;
      value = [gd.FromRange, gd.ToRange, gd.Grade, gd.StatusId, gd.ModifiedById, gd.ModificationDate, id];
    }
    pool.query(up_query,value, function (err, res) {

          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            }); 
};




module.exports = GradeDetail;