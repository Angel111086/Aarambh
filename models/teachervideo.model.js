var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const TeacherVideo = function(tv, id) {
  this.VideoTitle = tv.VideoTitle;   
  this.ClassId = tv.ClassId;
  this.CourseId = tv.CourseId;
  this.ChapterId = tv.ChapterId;
  this.SchoolId = tv.SchoolId;
  this.TeacherId = tv.TeacherId;
  this.Video = id;
  this.StatusId = tv.StatusId;
  this.CreatedById = tv.CreatedById;
  this.ModifiedById = tv.ModifiedById;
  this.CreationDate = tv.CreationDate;
  this.ModificationDate = tv.ModificationDate;
};


TeacherVideo.createTV = function (tv, result) {   
    pool.query("INSERT INTO teachervideo SET ?", tv, function (err, res) {                
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


module.exports = TeacherVideo;