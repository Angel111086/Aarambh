var mysql = require('mysql');
const pool = require('../lib/pool');
const passwordHash = require('password-hash');

// constructor
const Author = function(author, file) {   
  this.RoleId = author.RoleId;
  this.Username = author.Username;
  this.Password = author.Password;
  this.RoleId  = author.RoleId;
  this.Email = author.Email;
  this.StatusId = author.StatusId;
  this.CreatedById = author.CreatedById;
  this.ModifiedById = author.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = author.ModificationDate;

};

Author.createRole = function (author,result) {
        var pass = author.Password;
        var hashedPassword = passwordHash.generate(pass);
        author.Password = hashedPassword; 
        pool.query("INSERT INTO author SET ?", author, function (err, res) {                
                if(err) {
                  //console.log(err.code)                 
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, {"Message":"Details Saved Successfully."});

                }
            });           
};

module.exports= Author;