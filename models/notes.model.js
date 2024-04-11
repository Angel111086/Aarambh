var mysql = require('mysql');
const pool = require('../lib/pool');
const fs = require('fs');

// constructor
const Notes = function(notes, file) {   
  this.ClassId = notes.ClassId;
  this.CourseId = notes.CourseId;
  this.ChapterId = notes.ChapterId;
  this.TeacherId = notes.TeacherId;
  this.SchoolId = notes.SchoolId;
  this.NotesTitle = notes.NotesTitle;
  this.NotesDocx = file;
  this.StatusId = notes.StatusId;
  this.CreatedById = notes.CreatedById;
  this.ModifiedById = notes.ModifiedById;
  this.CreationDate = notes.CreationDate;
  this.ModificationDate = notes.ModificationDate;
};

Notes.createNotes = function (notes, result) {   
    pool.query("INSERT INTO notes SET ?", notes, function (err, res) {                
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

Notes.updateNotes = function(id, notes, result){
var up_query, value;
pool.query("SELECT * from notes where NotesId = ?",[id],function(err,res)
{
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
    if(notes.NotesDocx !== undefined)
    {
      up_query = "UPDATE notes SET ClassId = ?, CourseId = ?, ChapterId = ?, NotesTitle = ?, NotesDocx = ?, StatusId = ?, ModifiedById = ?,ModificationDate = ? WHERE notesId = ?";
      value = [notes.ClassId, notes.CourseId, notes.ChapterId,
      notes.NotesTitle, notes.NotesDocx, notes.StatusId, notes.ModifiedById, 
      notes.ModificationDate, id]; 
    }
    else{
      up_query = "UPDATE notes SET ClassId = ?, CourseId = ?, ChapterId = ?, NotesTitle = ?, StatusId = ? , ModifiedById = ?,ModificationDate = ? WHERE notesId = ?";
      value =  [notes.ClassId, notes.CourseId, notes.ChapterId, 
      notes.NotesTitle, notes.StatusId, notes.ModifiedById, 
      notes.ModificationDate, id]; 
    }
    pool.query(up_query,value, function (err, res) {
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

Notes.deleteById = function(id, result){
  query = `select * from notes where NotesId = ${id}`;
  pool.query(query, function (err, data){
    if(err)
    {
      console.log("error: ", err);
      result(err, null);      
    }
    else{
      console.log("data",data);
      //const filePath = '../AARAMBH_API-s/public/notes/'+ data[0].NotesDocx;
      const filePath = '../apis/public/notes/'+ data[0].NotesDocx;
              fs.access(filePath, fs.F_OK,error => {
                  if (!error) 
                  {
                          fs.unlink(filePath,function(error){
                          console.log(error);
                            pool.query(`delete from notes WHERE NotesId = ?`, [id], function (err, res) {
                            if(err) {
                                  console.log("error: ", err);
                                  result(err, null);
                            }
                            else{   
                                result(null, res);             
                                console.log('Done');
                            }
                      });
                  });
                } 
                else {
                      console.log(error);
          }
        });
    }


  });

};

module.exports = Notes;