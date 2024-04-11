var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const ExamGroup = function(eg) {  
	this.ExamGroupId = eg.ExamGroupId; 
  	this.ExamName = eg.ExamName;
  	this.ExamStartDate = eg.ExamStartDate;
  	this.ExamEndDate = eg.ExamEndDate;
  	this.ExamResultDate = eg.ExamResultDate;
  	this.SchoolId = eg.SchoolId;
  	this.StatusId = eg.StatusId;
  	this.CreatedById = eg.CreatedById;
  	this.CreationDate = eg.CreationDate;
  	this.ModifiedById = eg.ModifiedById;  	
  	this.ModificationDate = eg.ModificationDate;
}

ExamGroup.createExamGroup = function (eg, result) 
{   
    pool.query("INSERT INTO examgroup SET ?", [eg], function (err, res) {                
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

ExamGroup.updateById = function(id, eg, result){      
    pool.query(`UPDATE examgroup SET ExamName = ?, ExamStartDate = ?, ExamEndDate = ?, ExamResultDate = ?, 
    	StatusId = ?,ModifiedById = ?, ModificationDate = ? WHERE ExamGroupId = ?`, 
    [eg.ExamName, eg.ExamStartDate, eg.ExamEndDate, eg.ExamResultDate, eg.StatusId, eg.ModifiedById, eg.ModificationDate, id], function (err, res) {
 
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            }); 
};


module.exports = ExamGroup;