var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor


const Youtube = function(youtube) {
  this.SchoolId = youtube.SchoolId;   
  this.ClassId = youtube.ClassId;
  this.CourseId = youtube.CourseId;
  this.ChapterId = youtube.ChapterId;
  this.part = youtube.part;
  this.VideoTitle = youtube.VideoTitle; //changed to title on local
  this.youtubevideoid = youtube.youtubevideoid;
  this.youtubeurl = youtube.youtubeurl;
  this.description = youtube.description;
  this.thumbnail = youtube.thumbnail;
  this.Subscription = youtube.Subscription;
  //this.Tags = youtube.Tags;
  this.StatusId = youtube.StatusId;
  this.CreatedById = youtube.CreatedById;
  this.CreationDate = new Date();
  this.ModifiedById = youtube.ModifiedById;  
  this.ModificationDate = youtube.ModificationDate;
};

Youtube.createYoutubeData = function (youtube, schoolId,result) {    
        youtube.SchoolId = schoolId;
        pool.query("INSERT INTO youtubedetails SET ?", youtube, function (err, res) {                
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);         
                    result(null, {"Message":"Youtube Data Saved Successfully."});

                }
            });           
};


Youtube.createSingleYoutubeData = function (youtube,result) {  
        pool.query("INSERT INTO youtubedetails SET ?", youtube, function (err, res) {                
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);         
                    result(null, {"Message":"Youtube Data Saved Successfully."});

                }
            });           
};






Youtube.updateYoutubeData = function (id, youtube,schoolId,result) {
        console.log('Model',youtube);
        youtube.SchoolId = schoolId;
        pool.query('UPDATE youtubedetails SET ClassId = ?, CourseId = ?, ChapterId = ?, part = ?,VideoTitle = ?,youtubevideoid = ?, youtubeurl = ?, description = ?, thumbnail = ?, StatusId = ?, ModifiedById = ?, ModificationDate = ? WHERE VideoId = ?',
          [youtube.ClassId, youtube.CourseId, youtube.ChapterId, youtube.part, youtube.VideoTitle, youtube.youtubevideoid,
          youtube.youtubeurl, youtube.description, youtube.thumbnail, youtube.StatusId, youtube.ModifiedById, youtube.ModificationDate, id], function (err, res) {
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);         
                    result(null, {"Message":"Youtube Data Saved Successfully."});

                }
            });           
};

Youtube.deleteById = function(data, result){
  pool.query(`delete from youtubedetails WHERE videoId = ?`, 
    [data], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err, null);
             }
           else{   
             result(null, res);             
             console.log('Done');
                }
      });
};

module.exports = Youtube;