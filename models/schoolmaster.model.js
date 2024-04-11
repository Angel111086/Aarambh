var mysql = require('mysql');
const pool = require('../lib/pool');
const passwordHash = require('password-hash');

// constructor
const SchoolMaster = function(schoolmaster,file) {   
  this.SchoolName = schoolmaster.SchoolName;
  this.SchoolAddress = schoolmaster.SchoolAddress;
  this.SchoolPhone = schoolmaster.SchoolPhone;
  this.SchoolBoard = schoolmaster.SchoolBoard;
  this.SchoolMail = schoolmaster.SchoolMail;
  this.SchoolLogo = file;
  this.YoutubeChannelId = schoolmaster.YoutubeChannelId;
  this.YoutubeChannelKey = schoolmaster.YoutubeChannelKey;
  this.IncludeAarambh = schoolmaster.IncludeAarambh;
  this.StatusId = schoolmaster.StatusId;
  this.Username = schoolmaster.Username;
  this.Password = schoolmaster.Password;
  this.FirebaseKey = schoolmaster.FirebaseKey;
  this.FirebaseSecretKey = schoolmaster.FirebaseSecretKey;
  this.ExpireDate = schoolmaster.ExpireDate;
  this.CreatedById = schoolmaster.CreatedById;
  this.ModifiedById = schoolmaster.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = schoolmaster.ModificationDate;
};

SchoolMaster.createSchoolDetail = function (schoolmaster, result) {   
        var pass = schoolmaster.Password;
        var hashedPassword = passwordHash.generate(pass);
        schoolmaster.Password = hashedPassword; 
        pool.query("SELECT * from schoolmaster WHERE username= ? OR (SchoolName = ? AND SchoolAddress=?)",[
          schoolmaster.Username,schoolmaster.SchoolName,schoolmaster.SchoolAddress, schoolmaster.StatusId],function(err,res){
              if(err){
                console.log(err);
              }
              else{
                if(res.length>0){
                    result(null, {"Message":"School name is already saved."});    
                }
                else{
                    pool.query("INSERT INTO schoolmaster SET ?", schoolmaster, function (err, res) {                
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{
                    updateCreatedById(res.insertId);
                    console.log(res.insertId);         
                    result(null, {status:200,success:true,"Message":"Details Saved Successfully."});

                }
            });     
          }
        }
        });      
};

function updateCreatedById(id){
  pool.query(`update schoolmaster set CreatedById = ${id} where schoolId = ${id}`, function(err, data){
    if(err){
      console.log('err')
    }
    else{
      console.log(data)
    }
  });
}


SchoolMaster.updateById = function(id, school, result){
var up_query, value;
pool.query("SELECT * from schoolmaster where SchoolId = ?",[id],function(err,res){
    if(err) 
    {              
              console.log("error: ", err);
              result(err, null) ;
    }
    else
    {        
        console.log(res)
        console.log(res.length)
        if(res.length > 0){
        if(school.SchoolLogo !== undefined){
          up_query = "UPDATE schoolmaster SET SchoolName = ?, SchoolAddress = ?, SchoolPhone = ?, SchoolBoard = ?, SchoolMail = ?,SchoolLogo=?, StatusId = ? ,YoutubeChannelId = ?,YoutubeChannelKey = ?, IncludeAarambh = ?, ExpireDate = ?, ModificationDate = ?, ModifiedById= ?  WHERE SchoolId = ?"
          value = [school.SchoolName, school.SchoolAddress,school.SchoolPhone,school.SchoolBoard,
                  school.SchoolMail,school.SchoolLogo,school.StatusId, school.YoutubeChannelId, 
                  school.YoutubeChannelKey,school.IncludeAarambh,school.ExpireDate,
                  school.ModificationDate, school.ModifiedById,id]
        }
        else{
          up_query = "UPDATE schoolmaster SET SchoolName = ?, SchoolAddress = ?, SchoolPhone = ?, SchoolBoard = ?, SchoolMail = ?, StatusId = ? ,YoutubeChannelId = ?, YoutubeChannelKey = ?, IncludeAarambh = ?, ExpireDate = ?, ModificationDate = ?, ModifiedById = ?  WHERE SchoolId = ?"
          value = [school.SchoolName, school.SchoolAddress,school.SchoolPhone,school.SchoolBoard,
          school.SchoolMail,
          school.StatusId,school.YoutubeChannelId,school.YoutubeChannelKey,
          school.IncludeAarambh,school.ExpireDate,school.ModificationDate, school.ModifiedById,id]
        }


        pool.query(up_query,value, function (err, res) 
        {
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
                result(null,res)
            }
    }
  })
  
 
};




SchoolMaster.deleteById = function(id,result){
  pool.query("UPDATE schoolmaster SET StatusId = ? WHERE SchoolId = ?",
  [0,id],function(err,res){
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

SchoolMaster.getSchool = function (result) {
  //console.log(parentId,'id');            
        pool.query("SELECT * FROM schoolmaster " , function (err, res) {                       
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res);
                    result(null, res);
              
                }
            });   
};



SchoolMaster.updateFirebaseById = function(id, school , result){

  pool.query("UPDATE schoolmaster SET FirebaseKey = ?, FirebaseSecretKey = ? WHERE SchoolId = ?", 
    [school.FirebaseKey, school.FirebaseSecretKey, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            }); 
};

 module.exports= SchoolMaster;