// var mysql = require('mysql');
// const pool = require('../lib/pool');

// // constructor
// const Chapter = function(chapter) {   
//   this.ChapterName = chapter.ChapterName;  
//   this.ChapterURLS = chapter.ChapterURLS;  
//   this.CourseId = chapter.CourseId;
//   this.TopicId = chapter.TopicId;
//   this.ClassId = chapter.ClassId;  
//   this.StatusId = chapter.StatusId;
//   this.CreatedById = chapter.CreatedById;
//   this.ModifiedById = chapter.ModifiedById;
//   this.CreationDate = new Date();
//   this.ModificationDate = chapter.ModificationDate;
// };

// // Chapter.addChapter = function (chapter, result) {    
// //         pool.query("INSERT INTO chapter SET ?", chapter, function (err, res) {                
// //                 if(err) {
// //                     console.log("error: ", err);
// //                     result(err, null);
// //                 }
// //                 else{
// //                     console.log(res.insertId);
// //                     result(null, {"Message":"Chapter Details Saved Successfully."});

// //                 }
// //             });           
// // };

// Chapter.addChapter = function (chapter,schoolId, result) {
//       chapter.schoolId = schoolId;
//         pool.query("SELECT * from chapter WHERE ((ClassId = ? AND CourseId = ?) AND (TopicId = ? AND ChapterName = ?) AND StatusId = ?)",[
//           chapter.ClassId,chapter.CourseId,chapter.TopicId,chapter.ChapterName, chapter.StatusId],function(err,res){
//               if(err){
//                 console.log(err);
//               }
//               else{
//                 if(res.length>0){
//                     result(null, {"Message":"Chapter name is already saved."});     
//                 }
//                 else{
//                   pool.query("INSERT INTO chapter SET ?", chapter, function (err, res) {                
//                     if(err) {
//                       console.log("error: ", err);
//                       result(err, null);
//                   }
//                   else{
//                     console.log(res.insertId);
//                     result(null, {"Message":"Chapter Details Saved Successfully."});

//                 }
//             });                      
//                 }
//               } 

//           });
// };




// Chapter.ChapterById = function (chapterId, result) {    
//         pool.query("SELECT * FROM chapter WHERE chapterId = ? AND StatusId = 1", [chapterId], function (err, res) {                
//                 if(err) {
//                     console.log("error: ", err);
//                     result(err, null);
//                 }
//                 else{
//                     console.log(res.insertId);
//                     result(null, res);

//                 }
//             });           
// };

// Chapter.UpdateChapter = function (chapterId, chapter,result) {
//    pool.query("UPDATE chapter SET ChapterName = ?, ChapterURLS = ?, CourseId = ?,TopicId = ?, ClassId= ?,StatusId = ?, CreatedById = ? , ModifiedById = ?, CreationDate = ? ," + 
//     "ModificationDate = ? WHERE ChapterId = ?", 
//     [chapter.ChapterName, chapter.ChapterURLS, chapter.CourseId, chapter.TopicId, chapter.ClassId, chapter.StatusId, chapter.CreatedById, chapter.ModifiedById, chapter.CreationDate, 
//       chapter.ModificationDate, chapterId], 
//       function (err, res) {
//           if(err) {
//               console.log("error: ", err);
//                 result(null, err);
//              }
//            else{   
//              result(null, res);
//                 }
//             }); 
// };


// Chapter.deleteChapter = function(id, result){
//   pool.query(`UPDATE chapter SET StatusId = ? WHERE chapterId = ?`, 
//     [0, id], function (err, res) {
//           if(err) {
//               console.log("error: ", err);
//                 result(err, null);
//              }
//            else{   
//              result(null, res);             
//              console.log('Done');
//                 }
//       });
// }; 

// module.exports= Chapter;
var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const Chapter = function(chapter) {  
  this.ChapterName = chapter.ChapterName;  
  this.ChapterTitle = chapter.ChapterTitle;
  this.ChapterURLS = chapter.ChapterURLS;  
  this.CourseId = chapter.CourseId;
  this.ClassId = chapter.ClassId;
  //this.SchoolId = chapter.SchoolId;    
  this.StatusId = chapter.StatusId;
  this.CreatedById = chapter.CreatedById;
  this.ModifiedById = chapter.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = chapter.ModificationDate;
};

Chapter.addChapter = function (chapter,schoolId, result) {
  chapter.schoolId = schoolId;
        pool.query("SELECT * from chapter WHERE ((ClassId = ? AND CourseId = ?) AND (SchoolId = ? AND ChapterName = ?) AND StatusId = ?)",[
          chapter.ClassId,chapter.CourseId,chapter.SchoolId,chapter.ChapterName, chapter.StatusId],function(err,res){
              if(err){
                console.log(err);
              }
              else{
                if(res.length>0){
                    result(null, {"Message":"Chapter name is already saved."});    
                }
                else{
                  pool.query("INSERT INTO chapter SET ?", chapter, function (err, res) {                
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
              }

          });
};

Chapter.addChapterExcel = function (rows,result) {
                  let query = 'INSERT INTO `chapter` (`ChapterName`, `ChapterTitle`, `ChapterURLS`, `CourseId`, `ClassId`, `SchoolId`, `StatusId`, `CreatedById`, `ModifiedById`, `CreationDate`, `ModificationDate`) VALUES ?';
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



Chapter.ChapterById = function (chapterId, schoolId,result) {    
        pool.query("SELECT * FROM chapter WHERE chapterId = ? AND StatusId = 1 AND SchoolId = ?", [chapterId, schoolId], function (err, res) {                
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

Chapter.UpdateChapter = function (chapterId, chapter, result) {
  console.log('Model', chapter);
  chapter.ModifiedById = chapterId;
  chapter.ModificationDate = new Date();
   pool.query("UPDATE chapter SET ChapterName = ?, ChapterTitle = ?, ChapterURLS = ?, CourseId = ?, ClassId= ?, StatusId = ?, ModifiedById = ?, ModificationDate = ? WHERE ChapterId = ?",
    [chapter.ChapterName, chapter.ChapterTitle, chapter.ChapterURLS, chapter.CourseId, chapter.ClassId, chapter.StatusId, chapter.ModifiedById, chapter.ModificationDate, chapterId],
      function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{  
             result(null, res);
                }
            });
};


Chapter.deleteChapter = function(id, result){
  pool.query(`UPDATE chapter SET StatusId = ? WHERE chapterId = ?`,
    [0, id], function (err, res) {
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

module.exports= Chapter;
