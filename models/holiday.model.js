var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const Holiday = function(holiday) {
  this.HolidayName = holiday.HolidayName;   
  this.FromDate = holiday.FromDate;
  this.ToDate = holiday.ToDate;
  this.SchoolId = holiday.SchoolId;
  this.StatusId = holiday.StatusId;
  this.CreatedById = holiday.CreatedById;
  this.ModifiedById = holiday.ModifiedById;
  this.CreationDate = holiday.CreationDate;
  this.ModificationDate = holiday.ModificationDate;
};


Holiday.createHoliday = function (holiday, result) {   
    pool.query("INSERT INTO holiday SET ?", holiday, function (err, res) {                
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


Holiday.updateHoliday = function(id, holiday, result){
    pool.query("UPDATE holiday SET HolidayName = ?, FromDate = ?, ToDate = ?,ModificationDate = ?, ModifiedById = ? WHERE holidayId = ?", 
    [holiday.HolidayName, holiday.FromDate, holiday.ToDate, holiday.ModificationDate, holiday.ModifiedById, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            }); 
};


Holiday.deleteHoliday = function(id, result){
    pool.query("delete from holiday WHERE holidayId = ?", [id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            }); 
};


module.exports = Holiday;