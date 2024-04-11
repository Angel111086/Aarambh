var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const Course = function(course, file) {   
  this.CourseName = course.CourseName;
  this.CourseDescription = course.CourseDescription;
  this.CourseOtherDetails = course.CourseOtherDetails;
  this.CourseImage = file;
  this.ClassId = course.ClassId;
  this.StatusId = course.StatusId;
  this.CreatedById = course.CreatedById;
  this.ModifiedById = course.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = course.ModificationDate;
};


// Course.insertCourse = function (course, result) {
//   try{
//         console.log('A',course.ClassId)
//         console.log('B',course.CourseName)
//         pool.query(`SELECT * FROM course WHERE ClassId = ? and CourseName = ?`,[course.ClassId,course.CourseName],function(err,res){
//             if(err){
//               console.log(err)
//             }
//             else
//             {
//                 if(res.length>0){
//         result(null, {"Message":"Course name is already saved."});
//                 else
//                 {     
//                   console.log('test else');
//                   console.log(res[0].CourseName);
//                   console.log(res[0].ClassId);
//                   if(res[0].CourseName==course.CourseName && res[0].ClassId==course.ClassId){
//                     console.log('If');
//                     result(err,null)
//                     //return;
//                   }
//                   else{
//                 }
//                     console.log('else');
//                     pool.query("INSERT INTO course SET ?", course, function (err, res) {                
//                     if(err) {
//                       console.log("error: ", err);
//                       result(err, null);
//                   }
//                   else{
//                     console.log(res.insertId);
//                     result(null, {"Message":"Course Details Saved Successfully."});
//                   }
                  
//             });     
//                 }
//               }
//             }
//         })  
//         }catch(e){console.log(e)}  
//         // pool.query("INSERT INTO course SET ?", course, function (err, res) {                
//         //         if(err) {
//         //             console.log("error: ", err);
//         //             result(err, null);
//         //         }
//         //         else{
//         //             console.log(res.insertId);
//         //             result(null, {"Message":"Course Details Saved Successfully."});

//         //         }
//         //     });           
// };



Course.insertCourse = function (course,schoolId, result) {
course.schoolId = schoolId;
console.log(schoolId);
 pool.query(`SELECT * FROM course WHERE (ClassId = ? and CourseName = ?) AND StatusId = ? AND SchoolId = ?`,[course.ClassId,course.CourseName, course.StatusId, schoolId],function(err,res){
   if(err){
              console.log(err)
            }
            else{
              if(res.length>0){
               result(null, {"Message":"Course name is already saved."}); 
              }
              else{
                  pool.query("INSERT INTO course SET ?", course, function (err, res) { 
                    if(err) {
                      console.log("error: ", err);
                      result(err, null);
                  }
                  else{
                    console.log(res.insertId);
                    result(null, {"Message":"Course Details Saved Successfully."});
                  }
                  

                    })
              }
            }
 })

 
};


Course.getCourseById = function (courseId, result) {
  console.log(courseId,'id')                   
        pool.query("SELECT * FROM course WHERE CourseId = ? AND StatusId = 1",[courseId] , function (err, res) {                       
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

Course.updateCourseById = function (courseId, course,result) 
{
var up_query, value;
console.log('CourseId', courseId);
pool.query("SELECT * from course where CourseId = ?",[courseId],function(err,res)
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
        if(course.CourseImage !== undefined){
          up_query = `UPDATE course SET CourseName = ?,CourseDescription = ?, CourseOtherDetails = ?, CourseImage = ?,ClassId = ? , StatusId = ? WHERE CourseId = ?`;
          value = [course.CourseName, course.CourseDescription,course.CourseOtherDetails, course.CourseImage,
      course.ClassId, course.StatusId, courseId]
        }
        else
        {
          up_query = `UPDATE course SET CourseName = ?,CourseDescription = ?, CourseOtherDetails = ?,  ClassId = ? , StatusId = ? WHERE CourseId = ?`;
          value = [course.CourseName, course.CourseDescription,course.CourseOtherDetails,
          course.ClassId, course.StatusId, courseId]

        }

        console.log("Up Query", up_query);
   pool.query(up_query,value,function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
}
}
});
}


// Course.insertCourseExcel = function (rows, result) {
// // course.schoolId = schoolId;
// //  pool.query(`SELECT * FROM course WHERE (ClassId = ? and CourseName = ?) AND StatusId = ?`,[rows.ClassId,course.CourseName, course.StatusId],function(err,res){
// //    if(err){
// //               console.log(err)
// //             }
// //             else{
// //               if(res.length>0){
// //                result(null, {"Message":"Course name is already saved."}); 
// //               }
// //               else{
//                   let query = 'INSERT INTO course (`CourseName`, `CourseDescription`, `CourseOtherDetails`, `CourseImage`, `ClassId`, `SchoolId`, `StatusId`, `CreatedById`, `ModifiedById`, `CreationDate`, `ModificationDate`) VALUES ?';
//                   pool.query(query, [rows], function (err, res) { 
//                     if(err) {
//                       //console.log("error: ", err);
//                       result(err, null);
//                   }
//                   else{
//                     console.log(res.insertId);
//                     result(null, {"Message":"Course Details Saved Successfully."});
//                   }
//                   })
            
 
// };



Course.insertCourseExcel = function (rows, result) {
var is_course = false;
var arr = [];
var count = 0;

rows.forEach((element, index) =>{
  console.log('Row Length', rows.length); //4
    console.log('Course Name', rows[index][0])
  console.log('Index model', element)

   query = `SELECT * FROM course WHERE ClassId = ${rows[index][4]}  AND CourseName like '%${rows[index][0]}%' AND StatusId = ${rows[index][6]}`;
   pool.query(query,function(err,res){

    //console.log('Model Q', query+":"+index);
            count++;
            console.log('Count', count);
            if(err){
              console.log(err)
            }
            else if(res.length > 0){
              arr.push(res[0].CourseName)
              console.log('Array Else', arr); 
              console.log('Res', res[0].ClassId); //data
            }
            //if(res.length>0)
              //{
                 // console.log('Else Block');
                //   let query = 'INSERT INTO course (`CourseName`, `CourseDescription`, `CourseOtherDetails`, `CourseImage`, `ClassId`, `SchoolId`, `StatusId`, `CreatedById`, `ModifiedById`, `CreationDate`, `ModificationDate`) VALUES ?';
                //   pool.query(query, [rows], function (err, res) { 
                //     if(err) {
                //       //console.log("error: ", err);
                //       result(err, null);
                //   }
                //   else{
                //     console.log(res.insertId);
                //     result(null, {"Message":"Course Details Saved Successfully."});
                // }
                // })
                
              //}
            //}
          });
}); //end for each

//var check= ["044", "451"],
 //data = ["343", "333", "044", "123", "444", "555"]
console.log('Out', rows.length + ":"+ count); // 6:0 
if(rows.length == count)
{
  console.log("Array", arr); //empty
  console.log("Rows", rows);
}

var filteredData = rows.filter( function(n)
 { return !this.has(n.CourseName) }, new Set(arr) )

  //console.log('filteredData', filteredData);         
 
}
//});
//}


module.exports= Course;	

