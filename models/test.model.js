var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const Test = function(test, file) {   
  this.TestTopic = test.TestTopic;
  this.FromDate = test.FromDate;
  this.ToDate = test.ToDate;
  this.SchoolId = test.SchoolId;
  this.TeacherId = test.TeacherId;
  this.ClassId = test.ClassId;
  this.CourseId = test.CourseId;
  this.FilePath = file;  
  this.TotalMarks = test.TotalMarks;
  this.PassingMarks = test.PassingMarks;
  this.StatusId = test.StatusId;
  this.CreatedById = test.CreatedById;
  this.ModifiedById = test.ModifiedById;
  this.CreationDate = test.CreationDate;
  this.ModificationDate = test.ModificationDate;

};

Test.createTest = function (test, result) {
	pool.query("INSERT INTO test SET ?", test, function (err, res) {                
    	if(err) {
            //console.log(err.code)                 
            result(err, null);
        }
        else{
               console.log(res.insertId);
               result(null, {"Message":"Test Details Saved Successfully."});
            }
    });           
};

Test.updateById = function(id, test, result){
var up_query, value;
pool.query("SELECT * from test where TestId = ?",[id],function(err,res){
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
        if(test.FilePath !== undefined){
          up_query = `UPDATE test SET TestTopic = ?, FromDate = ?, ToDate = ?, 
          			  FilePath = ?, TotalMarks = ?, PassingMarks = ?, StatusId = ?,
          			  ModificationDate = ?, ModifiedById= ? WHERE TestId = ?`
          value = [test.TestTopic,test.FromDate, test.ToDate, test.FilePath,
          			test.TotalMarks, test.PassingMarks, test.StatusId,
          			test.ModificationDate, test.ModifiedById,id]
        }
        else{
         up_query = `UPDATE test SET TestTopic = ?, FromDate = ?, ToDate = ?, 
          			  TotalMarks = ?, PassingMarks = ?, StatusId = ?,
          			  ModificationDate = ?, ModifiedById= ? WHERE testId = ?`
          value = [test.TestTopic,test.FromDate, test.ToDate, 
          			test.TotalMarks, test.PassingMarks, test.StatusId,
          			test.ModificationDate, test.ModifiedById,id]
        }
        pool.query(up_query,value, function (err, res) 
        {
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


module.exports= Test;
