var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const TestYoutube = function(youtube) {   
  this.classname = youtube.classname;
  this.subject = youtube.subject;
  this.chapter = youtube.chapter;
  this.part = youtube.part;
  this.chapname = youtube.chapname;
  this.StatusId = youtube.StatusId;
  this.CreatedById = youtube.CreatedById;
  this.ModifiedById = youtube.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = youtube.ModificationDate;
};

TestYoutube.createYoutubeData = function (youtube, result) {    
        pool.query("INSERT INTO testyoutube SET ?", youtube, function (err, res) {                
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


module.exports = TestYoutube;