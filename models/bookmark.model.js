var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const Bookmark = function(bookmark) {   
  this.BookmarkName = bookmark.BookmarkName;  
  this.StudentId = bookmark.StudentId;  
  this.ClassId = bookmark.ClassId;
  this.CourseId = bookmark.CourseId;
  this.TopicId = bookmark.TopicId;
  this.ChapterId = bookmark.ChapterId;
  this.StatusId = bookmark.StatusId;
  this.CreatedById = bookmark.CreatedById;
  this.ModifiedById = bookmark.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = bookmark.ModificationDate;
};

Bookmark.addBookmark = function (bookmark, result) {    
        pool.query("INSERT INTO Bookmark SET ?", bookmark, function (err, res) {                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, {"Message":"Bookmark Details Saved Successfully."});

                }
            });           
};

Bookmark.bookmarkByStudentId = function (studentId, result) {    
        pool.query("SELECT * FROM bookmark WHERE studentId = ? AND StatusId = 1", [studentId], function (err, res) {                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res);

                }
            });           
};

Bookmark.deleteBookmarkByStudentId = function (studentId, bookmarkId, result) {    
        pool.query("UPDATE bookmark SET StatusId = ? WHERE (studentId = ? AND BookmarkId = ?)", [0,studentId,bookmarkId], function (err, res) {                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res);

                }
            });           
};

 


module.exports= Bookmark;