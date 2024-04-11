var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const Livelink = function(livelink) {   
  this.ClassId = livelink.ClassId;
  //this.CourseId = livelink.CourseId;
  this.LiveClass = livelink.LiveClass;
  this.SchoolId = livelink.SchoolId;
  this.StatusId = livelink.StatusId;
  this.CreatedById = livelink.CreatedById;
  this.ModifiedById = livelink.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = livelink.ModificationDate;
};


Livelink.insertLink = function (livelink, result) {
//livelink.SchoolId = schoolId;
 pool.query(`SELECT * FROM liveclasslink WHERE (SchoolId = ? and ClassId = ?) `,[livelink.SchoolId,livelink.ClassId],function(err,res){
   console.log(res)
   if(err){
              console.log(err)
            }
            
            else{
              if(res.length>0){
              console.log(res.length)
               result(null, {"Message":"Link is already saved for class"}); 
              }
              else{
                console.log(res.length)
                  pool.query("INSERT INTO liveclasslink SET ?", livelink, function (err, res) { 
                    if(err) {
                      console.log("error: ", err);
                      result(err, null);
                  }
                  else{
                    console.log(res.insertId);
                    result(null, {"Message":"Link Details Saved Successfully."});
                  }
                  

                    })
              }
            }
 })

 
};


Livelink.updateById = function(id, livelink, result){
    pool.query("SELECT * from liveclasslink where LiveId = ?",[id],function(err,res){
      if(err) {
                              
                              console.log("error: ", err);
                              result(err, null) ;
                          }
      else{
          
          console.log(res)
          console.log(res.length)
          if(res.length > 0){
          pool.query("UPDATE liveclasslink SET ClassId = ?,LiveClass = ?, StatusId = ?, ModifiedById = ?, ModificationDate = ? WHERE LiveId = ?",
          [livelink.ClassId, livelink.LiveClass,livelink.StatusId, livelink.ModifiedById, livelink.ModificationDate, id], function (err, res) {
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
                  result(null,{status:200,success:true,"Message":"No record exists!"})
              }
      }
    })
  };

  Livelink.deleteById = function(id,result){
    pool.query("DELETE from liveclasslink WHERE LiveId = ?",
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
  
  
  


module.exports= Livelink;	

