var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const TestMaster = function(testmaster) {   
  this.ClassId = testmaster.ClassId;
  this.CourseId = testmaster.CourseId;
  this.TopicId = testmaster.TopicId;
  this.ChapterId = testmaster.ChapterId;
  this.TestTitle = testmaster.TestTitle;
  this.FromDate = testmaster.FromDate;
  this.ToDate = testmaster.ToDate;
  this.TestDuration = testmaster.TestDuration;
  this.StatusId = testmaster.StatusId;
  this.CreatedById = testmaster.CreatedById;
  this.ModifiedById = testmaster.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = testmaster.ModificationDate;
};

TestMaster.createTestMaster = function (testmaster,schoolId, result) {
    testmaster.schoolId = schoolId;    
        pool.query("INSERT INTO testmaster SET ?", testmaster, function (err, res) {                
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);  
                    result(null, res.insertId);

                }
            });           
};

// TestMaster.getTestTitle = function (ClassId, CourseId, ChapterId,result) {
//   console.log(ClassId,'id')                   
//         pool.query("SELECT * FROM testmaster WHERE ClassId = ? AND CourseId = ? AND ChapterId = ? AND StatusId = 1",[ClassId, CourseId, ChapterId] , function (err, res) {
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


TestMaster.getChapterTest = function (ChapterId,result) {
  console.log(ClassId,'id')                   
        pool.query("SELECT * FROM testmaster WHERE ChapterId = ? AND StatusId = 1 ORDER BY RAND()",[ChapterId] , function (err, res) {
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

module.exports= TestMaster;