var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const Attendance = function(attendance) {   
  this.SchoolId = attendance.SchoolId;
  this.StudentId = attendance.StudentId;
  this.ClassId = attendance.ClassId;
  this.LiveUrl = attendance.LiveUrl;
  this.AttendanceDate = attendance.AttendanceDate;
  this.StatusId = attendance.StatusId;
  this.CreatedById = attendance.CreatedById;
  this.ModifiedById = attendance.ModifiedById;
  this.CreatedDate = new Date();
  this.ModificationDate = attendance.ModificationDate;
};

Attendance.createAttendance = function (attendance, result)
{
   pool.query("INSERT INTO attendance SET ?", attendance, function (err, res) {                
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);         
                    result(null, {"Message":"Details Saved Successfully."});

                }
            });       
}


module.exports= Attendance;