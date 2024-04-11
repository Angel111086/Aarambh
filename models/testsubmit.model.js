var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const TestSubmit = function(test, file) {   
  this.ClassId = test.ClassId;
  this.SchoolId = test.SchoolId;
  this.TestId = test.TestId;
  this.StudentId = test.StudentId;
  this.TestStatus = test.TestStatus;
  this.TestDocs = file;
  this.RejectReason = test.RejectReason;
  this.StatusId = test.StatusId;
  this.CreatedById = test.CreatedById;
  this.ModifiedById = test.ModifiedById;
  this.CreationDate = test.CreationDate;
  this.ModificationDate = test.ModificationDate;
};

TestSubmit.createTest = function (test, schoolId, result) 
{   
    test.SchoolId = schoolId
    pool.query("INSERT INTO testsubmit SET ?", test, function (err, res) {                
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


TestSubmit.updateTestStatus = function(id, test, result){
var up_query, value;
pool.query("SELECT * from testsubmit where TestSubmitId = ?",[id],function(err,res)
{
  if(err) 
  {              
    console.log("error: ", err);
    result(err, null) ;
  }
  else
  {   
    if(res.length > 0){
    if(test.RejectReason == undefined)
    {
      up_query = "UPDATE testsubmit SET TestStatus = ?, ModifiedById = ?, ModificationDate = ?  WHERE TestSubmitId = ?";
      value = [test.TestStatus,test.ModifiedById, test.ModificationDate, id]; 
    }
    else{
      up_query = "UPDATE testsubmit SET TestStatus = ?, RejectReason = ?,ModifiedById = ?, ModificationDate = ? WHERE TestSubmitId = ?";
      value = [test.TestStatus, test.RejectReason,test.ModifiedById, test.ModificationDate, id];  
    }
    pool.query(up_query,value, function (err, res) {
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


TestSubmit.updateTestRejectStatus = function(id, test, result){
var up_query, value;
pool.query("SELECT * from testsubmit where TestSubmitId = ?",[id],function(err,res)
{
  if(err) 
  {              
    console.log("error: ", err);
    result(err, null) ;
  }
  else
  {   
    if(res.length > 0){
      up_query = "UPDATE testsubmit SET TestStatus = ?, TestDocs = ? WHERE TestSubmitId = ?";
      value = [test.TestStatus, test.TestDocs, id]; 
    pool.query(up_query,value, function (err, res) {
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



module.exports = TestSubmit;