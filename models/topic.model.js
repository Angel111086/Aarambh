var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const Topic = function(topic) {   
  this.TopicName = topic.TopicName;  
  this.TopicOtherDetail = topic.TopicOtherDetail;  
  this.ClassId = topic.ClassId;
  this.CourseId = topic.CourseId;
  this.ChapterId = topic.ChapterId;
  this.StatusId = topic.StatusId;
  this.CreatedById = topic.CreatedById;
  this.ModifiedById = topic.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = topic.ModificationDate;
};

// Topic.addTopic = function (topic, result) {    
//         pool.query("INSERT INTO topic SET ?", topic, function (err, res) {                
//                 if(err) {
//                     console.log("error: ", err);
//                     result(err, null);
//                 }
//                 else{
//                     console.log(res.insertId);
//                     result(null, {"Message":"Topic Details Saved Successfully."});

//                 }
//             });           
// };

Topic.addTopic = function (topic,schoolId, result) {   
      topic.schoolId =schoolId;
        // pool.query("SELECT * from topic WHERE ClassId = ? AND TopicName =?",[topic.ClassId,topic.TopicName],function(err,res){
        //   //console.log(res.length);
        //   if(err){
        //     console.log(err);
        //   }
        //   else{
        //     if(res.length>0){
        //       result(null, {"Message":"Topic name is already saved."}); 
        //     }
        //     else
        //     {
        //       pool.query("INSERT INTO topic SET ?", topic, function (err, res) {                
        //         if(err) {
        //             console.log("error: ", err);
        //             result(err, null);
        //         }
        //         else{
        //             console.log(res.insertId);
        //             result(null, {"Message":"Topic Details Saved Successfully."});

        //         }
        //     });           
        //     }
        //   }
        // });
        pool.query("SELECT * from topic WHERE (ClassId = ? AND CourseId = ? AND ChapterId = ? AND SchoolId = ? AND StatusId = ? AND TopicName = ?)",
          [topic.ClassId, topic.CourseId,topic.ChapterId, topic.SchoolId, topic.StatusId, topic.TopicName],function(err,res){
          console.log(res.length);
          if(err){
            console.log(err);
          }
          else{
            if(res.length>0){
              result(null, {"Message":"Topic name is already saved."});
            }
            else
            {
              pool.query("INSERT INTO topic SET ?", topic, function (err, res) {                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, {"Message":"Topic Details Saved Successfully."});

                }
            });          
            }
          }
        });
};





Topic.TopicById = function (topicId, result) {    
        pool.query("SELECT * FROM topic WHERE topicId = ? AND StatusId = 1", [topicId], function (err, res) {                
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

Topic.UpdateTopic = function (topicId, topic,result) {
  pool.query("UPDATE topic SET TopicName = ?,TopicOtherDetail = ?, ClassId= ?, CourseId = ?, ChapterId = ?, StatusId = ?, ModifiedById = ?, ModificationDate = ? WHERE TopicId = ?",
   [topic.TopicName, topic.TopicOtherDetail, topic.ClassId, topic.CourseId, topic.ChapterId, topic.StatusId, topic.ModifiedById,
     topic.ModificationDate, topicId],
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


Topic.deleteTopic = function(id, result){
  console.log('TopicId',id);
  pool.query(`UPDATE topic SET StatusId = ? WHERE TopicId = ?`,
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
module.exports= Topic;