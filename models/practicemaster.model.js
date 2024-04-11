var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const PracticeMaster = function(practicemaster) {   
  this.ClassId = practicemaster.ClassId;
  this.CourseId = practicemaster.CourseId;
  this.TopicId = practicemaster.TopicId;
  this.ChapterId = practicemaster.ChapterId;
  this.PracticeTitle = practicemaster.PracticeTitle;
  this.FromDate = practicemaster.FromDate;
  this.ToDate = practicemaster.ToDate;
  this.PracticeDuration = practicemaster.PracticeDuration;
  this.StatusId = practicemaster.StatusId;
  this.CreatedById = practicemaster.CreatedById;
  this.ModifiedById = practicemaster.ModifiedById;
  this.CreationDate = practicemaster.CreationDate;
  this.ModificationDate = practicemaster.ModificationDate;
};

PracticeMaster.createPracticeMaster = function (practicemaster, schoolId, result) {  
    practicemaster.SchoolId = schoolId
        pool.query("INSERT INTO practicemaster SET ?", practicemaster, function (err, res) {                
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId); 
                    // pool.query("SELECT LAST_INSERT_ID()", function(err,dataId){
                    //   if(err){
                    //     console.log(err);
                    //   }
                    //   else {console.log("DataId", dataId);}
                    // });
                    result(null, {"Id":res.insertId});

                }
            });           
};


PracticeMaster.createPracticeMasterExcel = function (practicemaster, schoolId, result) {  
    practicemaster.SchoolId = schoolId
        pool.query("INSERT INTO practicemaster SET ?", practicemaster, function (err, res) {                
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId); 
                    // pool.query("SELECT LAST_INSERT_ID()", function(err,dataId){
                    //   if(err){
                    //     console.log(err);
                    //   }
                    //   else {console.log("DataId", dataId);}
                    // });
                    result(null,res.insertId);

                }
            });           
};

PracticeMaster.getPracticeTest = function (ChapterId,result) {
  console.log(ClassId,'id')                   
        pool.query("SELECT * FROM practicemaster WHERE ChapterId = ? AND StatusId = 1 ORDER BY RAND()",[ChapterId] , function (err, res) {
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


module.exports= PracticeMaster;