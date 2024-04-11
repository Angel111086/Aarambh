var mysql = require('mysql');
const pool = require('../lib/pool');


// constructor
const TimeTable = function(timetable) { 
    this.ClassId = timetable.ClassId;
    this.CourseId = timetable.CourseId;  
    this.TeacherId = timetable.TeacherId;
    this.StatusId = timetable.StatusId;
    this.StartTime = timetable.StartTime;
    this.EndTime = timetable.EndTime;
    this.Day = timetable.Day;
  };

  TimeTable.createTimeTable = function (timetable, schoolId, result) {   
    timetable.schoolId = schoolId
   
    pool.query("INSERT INTO timetable SET ?", timetable, function (err, res) {                
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

TimeTable.addTimetableExcel = function (rows,result) {

                  let query = 'INSERT INTO `timetable`(`SchoolId`, `ClassId`, `CourseId`, `TeacherId`, `StatusId`, `StartTime`, `EndTime`, `Day`, `CreatedById`, `ModifiedById`, `CreationDate`, `ModificationDate`) VALUES ?';
                  pool.query(query, [rows], function (err, res) {                
                    if(err) {
                      console.log("error: ", err);
                      result(err, null);
                  }
                  else{
                    console.log(res.insertId);
                    result(null, {"Message":"Chapter Details Saved Successfully."});

                }
            });                      
}

TimeTable.updateById = function(id, timetable, result){


    pool.query("SELECT * from timetable where TimeTableId = ?",[id],function(err,res){
      if(err) {
                              
                              console.log("error: ", err);
                              result(err, null) ;
                          }
      else{
          
          console.log(res)
          console.log(res.length)
          if(res.length > 0){
          pool.query("UPDATE timetable SET ClassId = ?, CourseId = ?, TeacherId = ?, StatusId = ? ,StartTime = ?, EndTime = ?, Day = ? WHERE TimeTableId = ?",
          [timetable.ClassId, timetable.CourseId,timetable.TeacherId,timetable.StatusId,timetable.StartTime,timetable.EndTime,timetable.Day, id], function (err, res) {
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
                  result(null,{status:200,success:false,"Message":"No record exists!"})
              }
      }
    })
  };

  TimeTable.deleteById = function(id,result){
    pool.query("DELETE from timetable WHERE TimeTableId = ?",
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
  
  
  



module.exports= TimeTable;