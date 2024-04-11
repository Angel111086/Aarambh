var mysql = require('mysql');
const pool = require('../lib/pool');
const passwordHash = require('password-hash');

// constructor
const ParentMain = function(parentmain) {   
  this.ParentName = parentmain.ParentName;
  this.ParentMobile = parentmain.ParentMobile;
  this.ParentPassword = parentmain.ParentPassword;
  this.ParentEmail = parentmain.ParentEmail;
  this.ParentAddress = parentmain.ParentAddress;
  this.FBToken = parentmain.FBToken;
  this.StatusId = parentmain.StatusId;
  this.SchoolId = parentmain.SchoolId;
  this.ExpireDate = parentmain.ExpireDate;
  this.CreatedById = parentmain.CreatedById;
  this.ModifiedById = parentmain.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = parentmain.ModificationDate;
};

ParentMain.createParentDetail = function (parentmain,schoolId, result) {   
        var pass = parentmain.ParentPassword;
        var hashedPassword = passwordHash.generate(pass);
        parentmain.ParentPassword = hashedPassword; 
        parentmain.SchoolId = schoolId;
        pool.query("INSERT INTO parentmain SET ?", parentmain, function (err, res) {                
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{
                    updateCreatedById(res.insertId);
                    console.log(res.insertId);         
                    result(null, {"Message":"Details Saved Successfully.","id":res.insertId});

                }
            });           
};


function updateCreatedById(id){
  pool.query(`update parentmain set CreatedById = ${id} where parentId = ${id}`, function(err, data){
    if(err){
      console.log('err')
    }
    else{
      console.log(data)
    }
  });
}

ParentMain.getParent = function (parentId, result) {
  console.log(parentId,'id');            
        pool.query("SELECT * FROM parentmain WHERE ParentId = ? AND StatusId = 1",[parentId] , function (err, res) {                       
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

ParentMain.updateById = function(id, parent, result){
pool.query("UPDATE parentmain SET ParentName = ?, ParentMobile= ?,ParentAddress = ? WHERE ParentId = ?", 
    [parent.ParentName, parent.ParentMobile, parent.ParentAddress , id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(err,null);
             }
           else{   
             result(null, res);
                }
            }); 
};


module.exports= ParentMain;