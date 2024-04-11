var express = require("express");
var mysql = require('mysql');
var app = express();
var path = require('path')
//const sharp = require('sharp');
const pool = require('../lib/pool');
const Student = require('../models/student.model');
const Course = require('../models/course.model');
const Class = require('../models/class.model');
const Topic = require('../models/topic.model');
const Chapter = require('../models/chapter.model');
const Bookmark = require('../models/bookmark.model');
const CourseEnrollment = require('../models/courseenrollment.model');
const Feedback = require('../models/feedback.model');
const FeedbackNew = require('../models/feedbackNew.model');
const Youtube = require('../models/youtube.model');
const TestYoutube = require('../models/testyoutube.model');
const TestModule = require('../models/testmodule.model');
const PracticeModule = require('../models/practice.model');
const TestMaster = require('../models/testmaster.model');
const TestDetail = require('../models/testdetail.model');
const ParentMain = require('../models/parent.model');
const SchoolMaster = require('../models/schoolmaster.model');
const Teacher = require('../models/teacher.model');
const TimeTable = require('../models/timetable.model');
const Livelink = require('../models/livelink.model');
const StudentMain = require('../models/studentmain.model');
const StudentTest = require('../models/studenttest.model');
const StudentPractice = require('../models/studentpractice.model');
const Author = require('../models/author.model');
const passport = require('passport')
//const passportinfo = require('../lib/passportinfo')
const passwordHash = require('password-hash');
const ClassTheme = require('../models/classtheme.model')
const Assignment = require('../models/assignment.model')
const AssignmentSubmit = require('../models/assignmentsubmit.model')
const Exam = require('../models/exam.model')
const Test = require('../models/test.model')

const ExamSubmit = require('../models/examsubmit.model')
const TestSubmit = require('../models/testsubmit.model')

const GradeMaster = require('../models/grademaster.model')
const GradeDetail = require('../models/gradedetail.model')

const ExamGroup = require('../models/examgroup.model')
const Notes = require('../models/notes.model')
const TeacherVideo = require('../models/teachervideo.model')
var jwt = require('jsonwebtoken');

//var Extend = require('underscore')
//var mergeJSON = require("merge-json") ;

const PracticeMaster = require('../models/practicemaster.model');
const PracticeDetail = require('../models/practicedetail.model');

const excel = require('exceljs');
const readXlsxFile = require('read-excel-file/node');

const checkAuth = require('../authorization/checkAuth');

//const LiveRecordingDetail = require('../models/liverecordingdetail.model');

//const Resize = require('../models/Resize.model');
//const upload = require('../models/uploadMiddleware');

const Attendance = require('../models/attendance.model');
var jimp = require("jimp");
const { error } = require("console");
const { type } = require("os");

var moment = require('moment');

const ExamResultMaster = require('../models/examresultmaster.model');
const ExamResultDetail = require('../models/examresultdetail.model');
const TestResultMaster = require('../models/testresultmaster.model');
const TestResultDetail = require('../models/testresultdetail.model');
const Holiday = require('../models/holiday.model');


//var YouTube = require('youtube-video-api')
//var auth = require('../lib/client_secret_975756765549-atmhrm0mks58h82ankbbe60geol7jtss.apps.googleusercontent.com')




module.exports.greetings = function(req, res){
  res.json({"status" : "Welcome to AARAMBH.."});
}


module.exports.handle_database = function(req,res) {
   
    pool.getConnection(function(err,connection){
        if (err)
        {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }  
        else
        {
        	console.log('connected as id ' + connection.threadId);     
        	res.json({"code" : 200, "status" : "Database Connected"});
        }
  });
}



// module.exports.getStudentData = function (req, res) { 
//   var pageNo = parseInt(req.query.pageNo)
//   var size = parseInt(req.query.size)
//   var query = {}
//   if(pageNo < 0 || pageNo === 0) {
//         //response = {"Error" : true,"Message" : "Invalid page number, should start with 1"};
//         response = {status:400,success:false,Message:"Invalid page number, should start with 1"};
//         return res.json(response)
//   }
//   query.skip = size * (pageNo - 1)
//   query.limit = size

//    pool.query("select count(*) as Total from studentmain WHERE StatusId = 1",function(err,totalCount){
//         if(err) {
//                //response = {"Error" : true,"Message" : "Error fetching data"}
//                res.json({status:400,success:false,Message:"Error fetching data."});
//         }
//    pool.query(`select * from studentmain WHERE StatusId = 1 limit ${query.limit}  offset  ${query.skip} `,function(err,data){
        
//             if(err) {
//                 //response = {"Error" : true,"Message" : "Error fetching data"};
//                 res.json({status:400,success:false,Message:"Error fetching data."});
//             } else {
//               var totalPages = Math.ceil(totalCount / size);              
//                 response = {status: 200, success : true, message : "Data Found", "Data": data,"Pages":totalPages,"TotalCount":totalCount};
//             }
//             res.json(response);
//         });
// })
// }

// module.exports.getAllClasses = function (req, res) { 
//   var pageNo = parseInt(req.query.pageNo)
//   var size = parseInt(req.query.size)
//   var query = {}
//   if(pageNo < 0 || pageNo === 0) {
//         response = {"Error" : true,"Message" : "Invalid page number, should start with 1"};
//         return res.json(response)
//   }
//   query.skip = size * (pageNo - 1)
//   query.limit = size

//    pool.query("select count(*) as Total from studentclass WHERE StatusId = 1",function(err,totalCount){
//         if(err) {
//                response = {"Error" : true,"Message" : "Error fetching data"}
//         }
//    pool.query(`select * from studentclass limit ${query.limit}  offset  ${query.skip}`,function(err,data){
        
//             if(err) {
//                 response = {"Error" : true,"Message" : "Error fetching data"};
//             } else {
//               var totalPages = Math.ceil(totalCount / size);              
//                 response = {"Error" : false,"Message" : data,"Pages":totalPages,"TotalCount":totalCount};
//             }
//             res.json(response);
//         });
// })
// }

module.exports.getAllCourses = function (req, res) { 
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {success : false,message : "Invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  console.log("Size",size);
   pool.query("select count(*) as  Total from course WHERE StatusId = 1",function(err,totalCount){
        if(err) {
               response = {success : false,message : "Error fetching data"}
        }
   pool.query(`select * from course WHERE StatusId = 1 limit ${query.limit}  offset  ${query.skip}`,function(err,data)
   {        
            if(err) {
                response = {success : false,message : "Error fetching data"};
            } else {
              var totalPages = Math.ceil(totalCount / size);              
                response = {success : true,message : data,"Pages":totalPages,"TotalCount":totalCount[0]};
            }
            res.json(response);
        });
})
}

module.exports.getAllClassesApp = function (req, res) { 
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {"Error":true,success : false,message : "Invalid page number, should start with 1",Message:"Invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size

   pool.query("select count(*) as Total from studentclass WHERE StatusId = 1",function(err,totalCount){
        if(err) {
               response = {"Error":true,success : false,message : "Error fetching data",Message:"Error fetching data"}
        }
   pool.query(`SELECT * FROM studentclass WHERE StatusId = 1 ORDER By OrderClass ASC`,function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"Error":true,success : false,message : "Error fetching data", Message: "Error fetching data"};
            } else {
              var totalPages = Math.ceil(totalCount / size);              
                response = {"Error":false,success : true,Message:data,message : data,"Pages":totalPages,"TotalCount":totalCount};
            }
            res.json(response);
        });
})
}

module.exports.getAllCoursesApp = function (req, res) { 
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {"Error" : true,success:false,message : "Invalid page number, should start with 1",Message:"Invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  console.log("Size",size);
   pool.query("select count(*) as  Total from course WHERE StatusId = 1",function(err,totalCount){
        if(err) {
               response = {"Error" : true, success:false,"message" : "Error fetching data",Message:"Error fetching data"}
        }
   pool.query(`select * from course WHERE StatusId = 1`,function(err,data)
   {        
            if(err) {
                response = {"Error" : true, success:false, "message" : "Error fetching data","Message":"Error fetching data"};
            } else {
              var totalPages = Math.ceil(totalCount / size);              
                response = {"Error" : false,success:true,"message" : data,Message:data,"Pages":totalPages,"TotalCount":totalCount[0]};
            }
            res.json(response);
        });
})
}

module.exports.getAllCoursesAccordingToClass = function (req, res, classId) { 
   pool.query('select CourseId,CourseName from course WHERE (StatusId = 1 AND ClassId = ?)',req.query.classId,function(err,data)
   {        
            if(err) {
                response = {"Error" : true, success:false,"message" : "Error fetching data"};
            } 
            else if(data.length==0){
              response = {"Error" : false, success:true,"message" : "No Data Found."};
            } 

            else {              
                response = {"Error" : false,success:true,"message" : data};
            }
            res.json(response);
        });
}


module.exports.getAllTopicAccordingToClass = function (req, res, classId) { 
   var classId = req.query.classId;
   var courseId = req.query.courseId;
   pool.query('SELECT topicId,TopicName from topic where ((ClassId = ? And CourseId = ?) And StatusId=1)',[classId,courseId],function(err,data)
   {        
            if(err) {
                response = {"Error" : true,success:false,"message" : "Error fetching data"};
            }
            else if(data.length==0){
              response = {"Error" : false, success:true, "message" : "No Data Found."};
            } 

            else {              
                response = {"Error" : false, success:true,"message" : data};
            }
            res.json(response);
        });
}

module.exports.getAllChapterAccordingToClass = function (req, res, classId) { 
   var classId = req.query.classId;
   var courseId = req.query.courseId;
   var topicId = req.query.topicId;
   pool.query('SELECT chapterId, ChapterName FROM chapter WHERE (((ClassId = ? AND CourseId = ?) AND TopicId = ?) AND StatusId = 1)',[classId,courseId,topicId],function(err,data)
   {        
            if(err) {
                response = {"Error" : true,success:false,"message" : "Error fetching data"};
            }
            else if(data.length==0){
              response = {"Error" : false, success:true,"message" : "No Data Found."};
            } 

            else {              
                response = {"Error" : false,success:true,"message" : data};
            }
            res.json(response);
        });
}

module.exports.getAllRegisteredUsers = function (req, res) { 
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {"Error" : true,success:false,"message" : "Invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  console.log("Size",size);
   pool.query("select count(*) as  Total from student WHERE StatusId = 1",function(err,totalCount){
    console.log(totalCount);
        if(err) {
               response = {"Error" : true,success:false,"message" : "Error fetching data"}
        }
   pool.query(`select * from student WHERE (StatusId = 1 AND ClassId = ?) limit ${query.limit}  offset  ${query.skip}`, req.query.ClassId, function(err,data)
   {        
            if(err) {
                response = {"Error" : true, success:false,"message" : "Error fetching data" +err};
            } else {
              var totalPages = Math.ceil(totalCount / size);      
              console.log(totalPages +" : "+totalCount+" : "+ size);        
                response = {"Error" : false,success:true,"message" : data,"Pages":totalPages,"TotalCount":totalCount[0]};
            }
            res.json(response);
        });
})
}


// module.exports.getStudentCount = function(req,res){
// pool.query("select count(*) as Total from studentmain WHERE StatusId = 1",function(err,totalCount){
//     console.log(totalCount);
//         if(err) {
//                //response = {"Error" : true,"Message" : "Error fetching data"}
//                res.json({status:400,success:false,Message:"Error fetching data."});
//         }
//         else{
//                //response = {"Error" : false,"Message" : totalCount[0]}
//                res.json({status:400,success: true, Message:"Data Found", Data: totalCount[0]});
//         }
//         res.json(response);
// });}

//-----------------------------GetEnd-------------------------------------

//-----------------------Excel api----------------------------------------

module.exports.generateStudentExcelSheet = function(req,res){
  pool.query("select * from student WHERE StatusId = 1",function(err,students,fields){
    if(err){
      response = {"Error" : true,success:false,"message" : "Error fetching data"}
    }
    else{
      try{
        const jsonStudents = JSON.parse(JSON.stringify(students));
        console.log(jsonStudents);

        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('Students'); //creating worksheet


    //  WorkSheet Header
    worksheet.columns = [
      { header: 'StudentId', key: 'StudentId', width: 10 },
      { header: 'StudentName', key: 'StudentName', width: 60 },
      { header: 'StudentGender', key: 'StudentGender', width: 30},
      { header: 'StudentMobile', key: 'StudentMobile', width: 10},
      { header: 'StudentAltMob', key: 'StudentAltMob', width: 10 },
      { header: 'StudentEmail', key: 'StudentEmail', width: 60 },
      { header: 'StudentAddress', key: 'StudentAddress', width: 100},
      { header: 'StudentCity', key: 'StudentCity', width: 30},
      { header: 'StudentDOB', key: 'StudentDOB', width: 20 },
      { header: 'StudentDORegis', key: 'StudentDORegis', width: 20 },
      { header: 'StudentGuardianName', key: 'StudentGuardianName', width: 60},
      { header: 'StudentPassword', key: 'StudentPassword', width: 20},
      { header: 'StudentImage', key: 'StudentImage', width: 90 },
      { header: 'ClassId', key: 'ClassId', width: 60 },
      { header: 'StatusId', key: 'StatusId', width: 10},
      { header: 'CreatedById', key: 'CreatedById', width: 20},
      { header: 'ModifiedById', key: 'ModifiedById', width: 20 },
      { header: 'CreationDate', key: 'CreationDate', width: 20},
      { header: 'ModificationDate', key: 'ModificationDate', width: 20}

    ];
    // Add Array Rows
    worksheet.addRows(jsonStudents);
   
    // Write to File
    var x = workbook.xlsx.writeFile("./public/excelfiles/student.xlsx")
    .then(function() {
      console.log("file saved!", x);
    });
    response = {"Error" : false,success:true,"message" : "File Saved"}
      }catch (e){
        console.log('Excel:- '+ e);
      }
    }
    res.json(response);
  });
}

//------------------------END----------------------------------------------
module.exports.appLogin = function(req,res)
{
  var mobile = req.body.mobile;  
  var password = req.body.password;
  console.log("Mobile", mobile)
  //pool.query('SELECT * FROM student WHERE (StudentMobile = ? OR StudentAltMob = ?) AND (StudentPassword = ?)',[mobile,mobile,password], function (error, results, fields) {
  //pool.query(`SELECT * FROM student WHERE StudentAltMob = ${req.body.mobile} or StudentMobile = ${req.body.mobile}  and StudentPassword =  ${req.body.password}`, function (error, results, fields) 
  pool.query('SELECT * FROM student WHERE (StudentMobile = ? OR StudentAltMob = ?)',[mobile,mobile], function (error, results, fields) {
    {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "Message":"Error Ocurred" + error
    })
  }
  else
  {
     console.log('The solution is: ', results);
     console.log('Length', results.length);
     console.log('Password',password);   
   if(results.length > 0)
   {     
        if(results[0].StudentPassword == password)
        {
          console.log("working")
      let token=   jwt.sign({
  mobile: req.body.mobile,password:results[0].StudentPassword,
}, '1252', { expiresIn: '48h' });
          console.log(token)

        res.send({
          "code":200,
          "Message":"Login Successfull","Data":results, token:token,
            });
        }
        else{
          res.send({
          "code":200,
          "Message":"Password Mismatch",
            });
        }
    }    
    // else if(!results[0].StudentMobile == mobile || results[0].StudentPassword == password)
    // {
    //     {
    //       res.send({
    //         "code":204,
    //         "Message":"Mobile Number or Password does not match."
    //       });
    //     }
    // }       
    else
    {
      res.send({
        "code":204,
        "Message":"Mobile Number does not exits"
        });
    }
  }
  }
});
}
//------------------------Web Login---------------------------

module.exports.webLogin = function(req,res)
{
  var username = req.body.username;  
  var password = req.body.password; 
  console.log("UN", username)
  //pool.query('SELECT * FROM student WHERE (StudentMobile = ? OR StudentAltMob = ?) AND (StudentPassword = ?)',[mobile,mobile,password], function (error, results, fields) {
  //pool.query(`SELECT * FROM student WHERE StudentAltMob = ${req.body.mobile} or StudentMobile = ${req.body.mobile}  and StudentPassword =  ${req.body.password}`, function (error, results, fields) 
  pool.query('SELECT * FROM author WHERE (Username = ? AND Password = ?)',[username,password], function (error, results, fields) {
    {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "Message":"Error Ocurred" + error
    })
  }
  else
  {
     console.log('The solution is: ', results);
     console.log('Length', results.length);
     console.log('Password',password);   
   if(results.length > 0)
   {     
        if(results[0].Password == password)
        {
          console.log("working")
          let token=   jwt.sign({
              username: req.body.username,password:results[0].Password,}, '1252', { expiresIn: '96h' });
          console.log(token)
        res.send({
          "code":200,
          "Message":"Login Successfull",token:token,
            });
        }
        else{
          res.send({
          "code":200,
          "Message":"Password Mismatch",
            });
        }
    }         
    else
    {
      res.send({
        "code":204,
        "Message":"Username does not exits"
        });
    }
  }
  }
});
}


//--------------------------Admin Login------------------

// module.exports.adminLogin = function(req,res)
// {
//   var username = req.body.username;  
//   var password = req.body.password; 
//   console.log("UN", username) 
//   pool.query('SELECT * FROM author WHERE ((Username = ? AND Password = ?) AND StatusId = 1)',[username,password], function (error, results, fields) {
//     {
//   if (error) {
//     console.log("error ocurred",error);
//     res.send({
//       "code":400,
//       "Message":"Error Ocurred" + error
//     })
//   }
//   else
//   {
//      console.log('The solution is: ', results);
//      console.log('Length', results.length);
//      console.log('Password',password);   
//    if(results.length > 0)
//    {     
//         if(results[0].Password == password)
//         {
//           console.log("working")
//           let token=   jwt.sign({
//               username: req.body.username,password:results[0].Password,}, '1252', { expiresIn: '168h' });
//           console.log(token)
//         res.send({
//           "code":200,
//           "Message":"Login Successfull",token:token,
//             });
//         }
//         else{
//           res.send({
//           "code":200,
//           "Message":"Password Mismatch",
//             });
//         }
//     }         
//     else
//     {
//       res.send({
//         "code":204,
//         "Message":"Username does not exits"
//         });
//     }
//   }
//   }
// });
// }


//------------------------------------------------------------------------------












 // module.exports.insertStudent =  function (req, res) {
 //     let student = req.params.student;
 //     console.log("Student", req.body.StudentName);
 //     if (!student) {
 //       return res.status(400).send({ error:true, message: 'Please provide student' });
 //     }
 //    pool.query("INSERT INTO student SET ? ", { student: student }, function (error, results, fields) {
 //   if (error) throw error;
 //     return res.send({ error: false, data: results, message: 'New student has been created successfully.' });
 //     });
 // };


 module.exports.create_a_student = function(req, res) {
  //console.log("Student",req.body);
  var new_student = new Student(req.body);
  //handles null error 
   if(!new_student.StudentName){
            res.status(400).send({ error:true, message: 'Please Provide Student Name.' });
      }
   else if(!new_student.StudentMobile){
            res.status(400).send({ error:true, message: 'Please Provide Student Mobile.' });
      }
   else if(!new_student.StudentAddress){
            res.status(400).send({ error:true, message: 'Please Provide Student Address.' });
      }    
  else if(!new_student.StudentCity){
            res.status(400).send({ error:true, message: 'Please Provide Student City.' });
      }        
  else if(!new_student.StudentDOB){
            res.status(400).send({ error:true, message: 'Please Provide Student Date of Birth.' });
      }      
  else if(!new_student.StudentDORegis){
            res.status(400).send({ error:true, message: 'Please Provide Student Date of Registration.' });
      }      
  else if(!new_student.StudentGuardianName){
            res.status(400).send({ error:true, message: 'Please Provide Student Guardian Name.' });
      }      
  else if(!new_student.StudentPassword){
            res.status(400).send({ error:true, message: 'Please Provide Student Password.' });
      }      
else{  
  Student.createTask(new_student, function(err, student) {
    if (err){
console.log(err)


                     if( err.code=="ER_DUP_ENTRY"){
                      console.log(err.sqlMessage.split(" ")[5])
                      let sqlmsg =err.sqlMessage.split(" ")[5]
                      if(sqlmsg==="'StudentMobile_2'") {
                        console.log('worinign')
                      return res.send({ message:" alternate mobile is already save "})
                      }
                       
                    }
    }else{
            res.send({error:err,Message : "Student saved successfully."});
    }
      // res.send({error:err,Message : "Student saved successfully."});
    //res.json(student);
  });
}
};

module.exports.getStudentById = function(req, res) {
console.log("StudentId",req.query.studentId)
  //Student.getStudentById(req.query.studentId, function(err, student) {
    Student.getStudentById(req.query.studentId, function(err, student) {
    if (err){
      res.send(err);
    }
    res.json(student);
  });
};

//----Changes
const profileDIR = "./public/profile/";

module.exports.updateStudent = async function(req,res)
{   
    console.log(req.file.filename); 
    if (!req.file) 
    {
        console.log("No file received");
        res.status(400).send({ error:true, message: 'Please Provide Student Image.' });  
       
    } 
    else 
    {    
      try{
         
          var fn = profileDIR + req.file.filename;  
          let newfileName = 'Profile-'+ Date.now()+ ".jpg"
           jimp.read(fn, function (err, img) {
           if (err) 
              throw err;
              img.resize(250, 250)            // resize
              .quality(90)                 // set JPEG quality         
              .write( profileDIR + newfileName ); // save
              console.log('Resized !!')              
          });  
      //console.log('Data',req.body);
      //console.log("Id",req.query.StudentId);

      var update_student = new Student(req.body,newfileName);    
      Student.updateById(req.body.StudentId, update_student, function(err, student) {
        if(!update_student.StudentName){
            res.status(400).send({ error:true, message: 'Please Provide Student Name.' }); 
        }
        if(!update_student.StudentMobile){
          res.status(400).send({ error:true, message: 'Please Provide Student Mobile' }); 
        }
        // if(!update_student.StudentEmail){
        //   res.status(400).send({ error:true, message: 'Please Provide Student Email' }); 
        // }
        if(!update_student.StudentGender){
          res.status(400).send({ error:true, message: 'Please Provide Student Gender' }); 
        }
        if(!update_student.StudentDOB){
          res.status(400).send({ error:true, message: 'Please Provide Student Date of Birth' }); 
        }
        if(!update_student.StudentAddress){
          res.status(400).send({ error:true, message: 'Please Provide Student Address' }); 
        }
        else{
          if(err){
            res.send({error:err, Message : "Data not updated."});
          }else{
            res.send({error:false, Message : "Student Updated Successfully."});
          }
    //res.json(student);
         }


  });
      }catch(e){ console.log("catch",e);   }
}
};

module.exports.deleteStudent = function(req, res) {
  console.log('Data',req.body);  
  Student.deleteById(req.body.StudentId, function(err, ress) {
    if (err){
      //res.send(err);
      console.log('ControllerErr',err);
    }
      //res.json(ress);
      res.status(200).send({ error:true, message: 'Student Record Deleted.' }); 
  });
};

const DIR = './public/course';
module.exports.insertCourse = async function(req,res,next)
{    
passport.authenticate('jwt',function(err,user)
{
   console.log("IS Next", user);
   if (err || !user) 
   {
      console.log("Test1")
      console.log("User",err);
      return res.json({ status: 401, success: false, message: "Authentication Fail." });
   }
    //console.log(req.file.filename); 
    if (!req.file) 
    {
        console.log("No file received");         
        var new_course = new Course(req.body);
        new_course.CourseImage = "english.png";
        Course.insertCourse(new_course,user[0].SchoolId, function(err, course) {
         if(!new_course.CourseName){
            res.status(400).send({ error:true, message: 'Please Provide Course Name.' });        
          }
          if(!new_course.CourseDescription){
            res.status(400).send({ error:true, message: 'Please Provide Course Description.' });        
          }
          // if(!new_course.CourseImage){
                  
          // }
          else{
            if(course==null){
              res.send({error:err,sucess:false,message:"Class Already contains this Subject."});
            }else{
              res.send({error:err,success:true,message : course.Message});
              //res.json(course);
            }
        }
      });
    } 
    else 
    {       
        try{
         
          var fn = './public/course/' +req.file.filename;  
          let newfileName = 'CI-'+ Date.now()+ ".png"
           jimp.read(fn, function (err, img) {
           if (err) 
              throw err;
              img.resize(250, 250)            // resize
              .quality(100)              // set JPEG quality       
              .write('./public/course/' + newfileName) // save
              console.log('Resized !!')              
          });  
           var new_course = new Course(req.body,newfileName);  
          Course.insertCourse(new_course,user[0].SchoolId, function(err, course) {
         if(!new_course.CourseName){
            res.status(400).send({ success:false, message: 'Please Provide Course Name.' });        
          }
          if(!new_course.CourseDescription){
            res.status(400).send({ success:false, message: 'Please Provide Course Description.' });        
          }
          if(!new_course.CourseImage){
              res.status(400).send({ error:true, message: 'Please Provide Course Image.' }); 
          }
          else{
            if(course==null){
              res.send({error:err,success:false,message:"Class Already contains this Subject."});
            }else{
              res.send({error:err,success:true,message : course.Message});
              //res.json(course);
            }
        }
      });
        }catch(e){ console.log("catch",e);   }
        
    }
  })(req,res,next)
}

module.exports.getCourseById = function(req, res) {
console.log("StudentId",req.query.courseId)  
    Course.getCourseById(req.query.courseId, function(err, course) {
    if (err){
      res.send(err);
    }
    console.log(course);
    res.json(course);
  });
};




const DIR_UP = './public/course';
module.exports.updateCourseById = function(req, res) {
  console.log('Data',req.body);
  //console.log("Id",req.body.CourseId);  
   if (!req.file) 
    {
        console.log("No file received");
        res.status(400).send({error:true, message: 'Please Provide Course Image.' });

        Course.updateCourseById(req.query.CourseId, new Course(req.body),function(err, course) {
          if (err){
            res.send({err,success:false});
          }

          else{
            //res.json(course);
            res.status(200).send({success:true, message: 'Course Details Updated Successfully.' });  
          }
        });  
       
    } 
    else 
    {       
        try{
           var fn = './public/course/' +req.file.filename;  
          let newfileName = 'CI-'+ Date.now()+ ".png"
           jimp.read(fn, function (err, img) {
           if (err) 
              throw err;
              img.resize(250, 250)            // resize
              .quality(100)                 // set JPEG quality         
              .write('./public/course/' + newfileName); // save
              console.log('Resized !!')              
          });            
      Course.updateCourseById(req.query.CourseId, new Course(req.body,newfileName), function(err, course) {
    if (err){
      res.send(err);
    }
    else if(course.length == 0)
    {
      res.send({status:200,success:false,message:"Course Details not updated successfully."});
    }
    else{
      //res.json(course);
      res.send({status:200,success:false,message:"Course Details Updated successfully."});
    }
  });
}catch(e){ console.log("catch",e);   }
}
}                

// module.exports.deleteCourseById = function(req, res) {
//   console.log('Data',req.query.CourseId);  
//   Course.deleteCourse(req.query.CourseId, function(err, ress) {
//     if (err){      
//       console.log('ControllerErr',err);
//       res.status(400).send({ success:false, message: 'Course not Deleted.' });
//     }
//       res.status(200).send({ success:true, message: 'Course Deleted.' }); 
//   });
// };


const DIR_UPP = './public/course';
module.exports.updateCourseByIdWeb = function(req, res) {
  console.log('Data',req.body);
  //console.log("Id",req.body.CourseId);  
   if (!req.file) 
    {
        console.log("No file received");
        //res.status(400).send({error:true, message: 'Please Provide Course Image.' });
        var course = new Course(req.body);

        Course.updateCourseById(req.query.CourseId, course,function(err, course) {
          if (err){
            res.send({err,success:false});
          }
          else if(course.length == 0)
          {
              res.send({status:200,success:false,message:"Course Details not updated successfully."});
          }
          else{
            //res.json(course);
            res.send({status:200,success:true,message:"Course Details Updated successfully."}); 
          }
        });  
       
    } 
    else 
    {       
        try{
           var fn = './public/course/' +req.file.filename;  
          let newfileName = 'CI-'+ Date.now()+ ".png"
           jimp.read(fn, function (err, img) {
           if (err) 
              throw err;
              img.resize(250, 250)            // resize
              .quality(100)                 // set JPEG quality         
              .write('./public/course/' + newfileName); // save
              console.log('Resized !!')              
          });            
      Course.updateCourseById(req.query.CourseId, new Course(req.body,newfileName), function(err, course) {
    if (err){
      res.send(err);
    }
    else if(course.length == 0)
    {
      res.send({status:200,success:false,message:"Course Details not updated successfully."});
    }
    else{
      //res.json(course);
      res.send({status:200,success:true,message:"Course Details Updated successfully."});
    }
  });
}catch(e){ console.log("catch",e);   }
}
}                





//----------------Class Module-------------------------------


/////////////////////////////////////////////////////////////
module.exports.insertClass = function(req, res, next) {
  console.log("IS Next", 'Test');
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
     var new_class = new Class(req.body);
    
     if(!new_class.StudentClass){
      res.status(400).send({ status:400,success:false, message: 'Please Provide Student Class.' });
    }
    //Need to be tested.
    else if(!new_class.OrderClass){
      res.status(400).send({ status:400,success:false, message: 'Please Provide Class Order.' });
    }   
else{  
new_class.StatusId = 1;
new_class.CreatedById = user[0].Id;
Class.addClass(new_class,function(err, student) {
if (err){
res.send({error:err,success:false,message : "Class not saved."});
}
else{
if(student==null){
    res.send({status:200,success:false,message : "Cannot Save same class."});
}else{
  if (student.Message == "Class name is already saved."){
    res.send({status:200,success:false,message : student.Message});
  }
  else{
    res.send({status:200,success:true,message : student.Message});
  }
}
//res.json(student);
}
});
}  
})(req,res,next)
}


////////////////////////////////////////////////////////////////////////
module.exports.getClassById = function(req, res) {
console.log("ClassId",req.query.classId)  
    Class.ClassById(req.query.classId, function(err, studentclass) {
    if (err){
      res.send(err);
    }
    console.log(studentclass);
    res.json(studentclass);
  });
};


module.exports.updateClassById = function(req, res) {
  console.log('Data',req.body);
  console.log("Id",req.query.ClassId); 
   var update_class = new Class(req.body);
  Class.UpdateClass(req.query.ClassId, update_class, function(err, studentclass) {
    if(!update_class.StudentClass){
            res.status(400).send({ status:400, success:false, message: 'Please Provide Student Class.' });
      }   
    else
    //res.json(studentclass);
    res.status(200).send({status:200,success:true, message: 'Class Details Updated Successfully.' });  
  });
};

module.exports.deleteClassById = function(req, res) {
  console.log('Data',req.query.ClassId);  
  Class.deleteClass(req.query.ClassId, function(err, ress) {
    if (err){      
      console.log('ControllerErr',err);
      res.status(400).send({ success:false, message: 'Class not Deleted.' });
    }
      res.status(200).send({ success:true, message: 'Class Deleted.' }); 
  });
};
///////////////////////////////////////////////

module.exports.getClassSearch = function (req, res,next) {
  passport.authenticate('jwt', function(err, user) {
    if (err || !user)
    {
       console.log("Test1")
       console.log("User",err);
       return res.json({ status: 401, success: false, message: "Authentication Fail." });
    }
    else if (user) 
    { 
      var page = parseInt(req.query.page)
      var size = parseInt(req.query.size)
      var query = {}
      if(page < 0 || page === 0) {
          //response = {"Error" : true,"Message" : "Invalid page number, should start with 1"};
          return res.json({ status: 401, success: false, message: "Invalid page number, should start with 1." });
          //return res.json(response)
      }
      query.skip = size * (page - 1)
      query.limit = size
      console.log("Size",size);
      pool.query("select count(*) as Total from studentclass",function(err,totalCount){
      console.log(totalCount);
          if(err) {
                 //response = {"Error" : true,"Message" : "Error fetching data"}
                 response = { status: 401, success: false, error: "Error fetching data." }
          }
          if(req.query.name)
          {
            var sqlquery= `select * from studentclass WHERE StatusId = 1 AND StudentClass='${req.query.name}' limit ${query.limit}  offset  ${query.skip}`
          }
          else{
            sqlquery = `select * from studentclass WHERE StatusId = 1  limit ${query.limit}  offset  ${query.skip}`
          }
     pool.query(sqlquery, function(err,data)
     {        
              if(err) {
                console.log(err)
                  response = { status: 401, success: false, error: "Error fetching data." };
              } else {
                var totalPages = Math.ceil(totalCount / size);      
                console.log(totalPages +" : "+totalCount+" : "+ size); 
                  response = { status: 200, success: true, "message" : "Data Found", "Data" : data,"Pages":totalPages,"TotalCount":totalCount[0]}       
                  //response = {"Error" : false,"Message" : data,"Pages":totalPages,"TotalCount":totalCount[0]};
              }
              res.json(response);
          });
    })
    }
  })(req,res,next);
  }


//----------------Topic Module-------------------------------
 module.exports.insertTopic = function(req, res,next) {  
  passport.authenticate('jwt',function(err,user)
{
   console.log("IS Next", user);
   if (err || !user) 
   {
      console.log("Test1")
      console.log("User",err);
      return res.json({ status: 401, success: false, message: "Authentication Fail." });
   }
  var new_topic = new Topic(req.body);

  //handles null error 
   if(!new_topic.TopicName){
            res.status(400).send({ success:false, message: 'Please Provide Topic Name.' });
      }   
    if(!new_topic.ClassId){
            res.status(400).send({ success:false, message: 'Please Provide Class Id.' });
      }      
    if(!new_topic.CourseId){
            res.status(400).send({ success:false, message: 'Please Provide Course Id.' });
      }      
else{  
  Topic.addTopic(new_topic,user[0].SchoolId, function(err, topic) {
    if(err){
        res.send({error:err,success:false,message : "Topic not saved."});
    }
    else{
    if (topic==null)
    {
      res.send({success:false,message : "Cannot save same topic."});
    }
    else{
      res.send({success:true,message : topic.Message});
      }
}
  });
}
})(req,res,next)
};

module.exports.getTopicById = function(req, res) {
console.log("TopicId",req.query.topicId)  
    Topic.TopicById(req.query.topicId, function(err, topic) {
    if (err){
      res.send(err);
    }    
    res.json(topic);
  });
};


module.exports.updateTopicById = function(req, res) {
  console.log('Data',req.body);
  console.log("Id",req.query.TopicId); 
   var update_topic = new Topic(req.body);
  Topic.UpdateTopic(req.query.TopicId, update_topic, function(err, topic) {
   if(!update_topic.TopicName){
            res.status(400).send({ success:false, message: 'Please Provide Topic Name.' });
      }   
    if(!update_topic.ClassId){
            res.status(400).send({ success:false, message: 'Please Provide Class Id.' });
      }      
    if(!update_topic.CourseId){
            res.status(400).send({ success:false, message: 'Please Provide Course Id.' });
      }      
    else
    //res.json(studentclass);
    res.status(200).send({success:true, message: 'Topic Details Updated Successfully.' });  
  });
};

module.exports.deleteTopicById = function(req, res) {
  console.log('Data',req.query.id);  
  Topic.deleteTopic(req.query.id, function(err, ress) {
    if (err){      
      console.log('ControllerErr',err);
    }
      res.status(200).send({ success:true, message: 'Topic Deleted.' }); 
  });
};


module.exports.getAllTopicApp = function (req, res) { 
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {"Error" : true,success:false,"message" : "Invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size

   pool.query("select count(*) as Total from topic",function(err,totalCount){
        if(err) {
               response = {"Error" : true,success:false,"message" : "Error fetching data"}
        }
   pool.query(`select * from topic WHERE StatusId = 1`,function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                //console.log(err);                
                response = {"Error" : "true",success:false,"message" : "Error fetching data"};
            } else {
              var totalPages = Math.ceil(totalCount / size);              
                response = {"Error" : false,success:true,"message" : data,"Pages":totalPages,"TotalCount":totalCount};
            }
            res.json(response);
        });
})
}

//-----------------------------Chapter Module-----------------

 module.exports.insertChapter = function(req, res,next) {  
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
     }
  var new_chapter = new Chapter(req.body);
  //handles null error 
  if(!new_chapter.ChapterName){
            res.status(400).send({ success:false, message: 'Please Provide Chapter Name.' });
      }   
  if(!new_chapter.ChapterTitle){
            res.status(400).send({ error:true, message: 'Please Provide Chapter Title.' });
      }      
  if(!new_chapter.CourseId){
            res.status(400).send({ success:false, message: 'Please Provide Course Id.' });
      }      
  if(!new_chapter.ClassId){
            res.status(400).send({ success:false, message: 'Please Provide Class Id.' });
      }        
else{  
  Chapter.addChapter(new_chapter, user[0].SchoolId,function(err, chapter) {
    if (err)
    {
      res.send({error:err,success:false,message : "Chapter details not saved."});
    }
    else{
      if(chapter==null){
        res.send({status:200,success:false,message:"Chapter already there."});
      }
      else{
        res.send({status:200,success:true,message:chapter.Message});
      }
    }
    //res.json(chapter);
  });
}
  })(req,res,next)
};

module.exports.getChapterById = function(req, res, next) {
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
     }
console.log("ChapterId",req.query.ChapterId)  
    Chapter.ChapterById(req.query.ChapterId, user[0].SchoolId,function(err, chapter) {
    if (err){
      //res.send(err);
      res.send({status:401,success:false,message:err});
    }
    else if(chapter.length == 0){
      res.send({status:200,success:true,message:'No Data Found.'});
    }
    else{
      res.send({status:200,success:true,message:'Data Found', data:chapter});
    }
    //res.json(chapter);
  });
})(req,res,next);
}

module.exports.updateChapterById = function(req, res) {
  //console.log('Data',req.body);
  //console.log("Id",req.query.ChapterId);
   var update_chapter = new Chapter(req.body);
  Chapter.UpdateChapter(req.query.ChapterId, update_chapter, function(err, topic) {
  //handles null error 
   if(!update_chapter.ChapterName){
            res.status(400).send({ success:false, message: 'Please Provide Chapter Name.' });
      }   
    else if(!update_chapter.ChapterTitle){
            res.status(400).send({ error:true, message: 'Please Provide Chapter Title' });
      }      
    else if(!update_chapter.CourseId){
            res.status(400).send({ success:false, message: 'Please Provide Course Id.' });
      }      
    // if(!update_chapter.TopicId){
    //         res.status(400).send({ error:true, message: 'Please Provide Topic Id.' });
    //   }
    if(!update_chapter.ClassId){
            res.status(400).send({ success:false, message: 'Please Provide Class Id.' });
      } 
     
    else
    //res.json(studentclass);
    res.send({status:200,success:true,message:'Chapter Details Updated Successfully.'});
    //res.status(200).send({success:true, message: 'Chapter Details Updated Successfully.' });  
  });

}



module.exports.deleteChapterById = function(req, res) {
 // console.log('Data',req.query.id);  
  Chapter.deleteChapter(req.query.ChapterId, function(err, ress) {
    if (err){      
      console.log('ControllerErr',err);
    }
      res.status(200).send({ success:true, message: 'Chapter Deleted.' }); 
  });
};


//---------------------------------------Don't Know----------------------------------------------------------
module.exports.getAllChapterApp = function (req, res) { 
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {"Error" : true,success:false,"message" : "Invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size

   pool.query("select count(*) as Total from chapter WHERE StatusId = 1",function(err,totalCount){
        if(err) {
               response = {"Error" : true,success:false,"message" : "Error fetching data"}
        }
   pool.query(`select * from chapter WHERE StatusId = 1`,function(err,data){        
            if(err) {
                response = {"Error" : true,success:false,"message" : "Error fetching data"};
            } else {
              var totalPages = Math.ceil(totalCount / size);              
                response = {"Error" : false,success:true,"message" : data,"Pages":totalPages,"TotalCount":totalCount};
            }
            res.json(response);
        });
})
}


//----------------------------------BookMark Module------------

 module.exports.insertBookmark = function(req, res) {  
  var new_bookmark = new Bookmark(req.body);
  //handles null error 
   if(!new_bookmark.BookmarkName){
            res.status(400).send({ error:true, message: 'Please Provide Bookmark Name.' });
      }   
    if(!new_bookmark.StudentId){
            res.status(400).send({ error:true, message: 'Please Provide Student Id' });
      }      
    if(!new_bookmark.ClassId){
            res.status(400).send({ error:true, message: 'Please Provide Class Id.' });
      }   
    if(!new_bookmark.CourseId){
            res.status(400).send({ error:true, message: 'Please Provide Course Id.' });
      }   
    if(!new_bookmark.TopicId){
            res.status(400).send({ error:true, message: 'Please Provide Topic Id.' });
      }
    if(!new_bookmark.ChapterId){
            res.status(400).send({ error:true, message: 'Please Provide Chapter Id.' });
      }        
else{  
  Bookmark.addBookmark(new_bookmark, function(err, bookmark) {
    if (err)
      res.send({error:err,Message : "Bookmark saved successfully."});
    res.json(bookmark);
  });
}
};

module.exports.getBookmarkByStudentId = function(req, res) {
console.log("Bookmark",req.query.StudentId)  
    Bookmark.bookmarkByStudentId(req.query.StudentId, function(err, bookmark) {
    if (err){
      res.send(err);
    }    
    res.json(bookmark);
  });
};

module.exports.deleteBookmarkByStudentId = function(req, res) {
  console.log('Data',req.query.studentId);  
  Bookmark.deleteBookmarkByStudentId(req.query.studentId, req.query.bookmarkId, function(err, ress) {
    if (err){      
      console.log('ControllerErr',err);
    }
      res.status(200).send({ error:false, message: 'Bookmark Deleted.' }); 
  });
};


//---------------------------------CourseEnrollment Module------------------------------------

 module.exports.insertCourseEnrollment = function(req, res) {  
  var new_courseenrollment = new CourseEnrollment(req.body);
  //handles null error 
   if(!new_courseenrollment.DateofEnrollment){
            res.status(400).send({ error:true, message: 'Please Provide Date Of Enrollment.' });
      }   
    if(!new_courseenrollment.DateofCompletion){
            res.status(400).send({ error:true, message: 'Please Provide Date of Completion.' });
      }      
    if(!new_courseenrollment.StudentId){
            res.status(400).send({ error:true, message: 'Please Provide Student Id.' });
    }  
    if(!new_courseenrollment.CourseId){
            res.status(400).send({ error:true, message: 'Please Provide Course Id.' });
      }               
  else{  
  CourseEnrollment.addEnrollment(new_courseenrollment, function(err, enrollment) {
    if (err)
      res.send({error:err,Message : "Course Enrollment saved successfully."});
    res.json(enrollment);
  });
}
};

module.exports.getCourseEnrollmentById = function(req, res) {
console.log("CEId",req.query.CourseEnrollmentId)  
    Chapter.ChapterById(req.query.CourseEnrollmentId, function(err, courseenrollment) {
    if (err){
      res.send(err);
    }    
    res.json(courseenrollment);
  });
};

module.exports.updateCourseEnrollmentById = function(req, res) {
  console.log('Data',req.body);
  console.log("Id",req.query.CourseEnrollmentId);    
  var update_courseenrollment = new CourseEnrollment(req.body);
  CourseEnrollment.UpdateCE(req.body.CourseEnrollmentId, update_courseenrollment, function(err, topic) {
  //handles null error 
    if(!update_courseenrollment.DateofEnrollment){
            res.status(400).send({ error:true, message: 'Please Provide Date Of Enrollment.' });
      }   
    if(!update_courseenrollment.DateofCompletion){
            res.status(400).send({ error:true, message: 'Please Provide Date of Completion.' });
      }      
    if(!update_courseenrollment.StudentId){
            res.status(400).send({ error:true, message: 'Please Provide Student Id.' });
    }  
    if(!update_courseenrollment.CourseId){
            res.status(400).send({ error:true, message: 'Please Provide Course Id.' });
      }     
    else
    //res.json(studentclass);
    res.status(200).send({error:false, message: 'Course Enrollment Updated Successfully.' });  
  });
};

module.exports.deleteCourseEnrollmentById = function(req, res) {
  console.log('Data',req.query.id);  
  CourseEnrollment.deleteCE(req.query.id, function(err, ress) {
    if (err){      
      console.log('ControllerErr',err);
    }
      res.status(200).send({ error:false, message: 'Course Enrollment Deleted.' }); 
  });
};


module.exports.getAllCourseEnrollmentApp = function (req, res) { 
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {"Error" : true,"message" : "Invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size

   pool.query("select count(*) as Total from courseenrollment WHERE StatusId = 1",function(err,totalCount){
        if(err) {
               response = {"Error" : true,"Message" : "Error fetching data"}
        }
   pool.query(`select * from courseenrollment WHERE StatusId = 1`,function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"Error" : true,"Message" : "Error fetching data"};
            } else {
              var totalPages = Math.ceil(totalCount / size);              
                response = {"Error" : false,"Message" : data,"Pages":totalPages,"TotalCount":totalCount};
            }
            res.json(response);
        });
})
}

//-------------------GET API'S FOR APP--------------------------------------

module.exports.getCourseByClassId = function(req, res) {
console.log("StudentId",req.query.ClassId)
   pool.query(`select * from course WHERE StatusId = 1 AND ClassId = ?`, req.query.ClassId,function(err, course) {
    if (err){
      res.send({error:err,success:false,message:"Error"});
    }
    console.log(course);
    res.json({success:true,message:"data found",course});
  });
};


module.exports.getTopicByCourseId = function(req, res) {
console.log("StudentId",req.query.CourseId)  
   pool.query(`select * from topic WHERE StatusId = 1 AND CourseId = ?`, req.query.CourseId,function(err, course) {
    if (err){
      res.send({error:err,success:false,message:"Error"});
    }
    console.log(course);
    res.json({success:true,message:"data found",course});
  });
};

module.exports.getChapterByTopicId = function(req, res) {
console.log("StudentId",req.query.TopicId)  
   pool.query(`select * from chapter WHERE StatusId = 1 AND TopicId = ?`, req.query.TopicId,function(err, course) {
    if (err){
      res.send({error:err,success:false,message:"Error"});
    }
    console.log(course);
    res.json({success:true,message:"data found",course});
  });
};

module.exports.getChapterByCourse = function(req, res) {
  console.log("StudentId",req.query.TopicId)  
     pool.query(`select * from chapter WHERE StatusId = 1 AND CourseId = ?`, req.query.CourseId,function(err, course) {
      if (err){
        res.send({error:err,success:false,message:"Error"});
      }
      console.log(course);
      res.json({success:true,message:"data found",course});
    });
  };


module.exports.getTopicByChapter = function(req, res) {
  console.log("StudentId",req.query.chapterId)  
  var chapterId = req.query.chapterId;
     pool.query(`select * from youtubedetails WHERE StatusId = 1 AND ChapterId = ?`, chapterId,function(err, topic) {
      if (err){
        res.send({error:err,success:false,message:"Error"});
      }
      console.log(topic);
      res.json({success:true,message:"Data Found", topic});
    });
  };

//-----------------------------------------Feedback-----------------------
//  module.exports.insertFeedback = function(req, res) {  
//   var new_feedback = new Feedback(req.body);
//   //handles null error 
//    if(!new_feedback.Message){
//             res.status(400).send({ success:false, message: 'Please Provide Message.' });
//       }   
// else{  
//   Feedback.createFeedback(new_feedback, function(err, feedback) {
//     if (err)
//       res.send({success:false,message : "Feedback saved successfully."});
//     res.json(feedback);
//   });
// }
// };

//-----------------------------------------------TestYouTube------

module.exports.insertTestYouTubeData = function(req,res){
  console.log(req.body)
  var className = req.body.classname;
  var subject = req.body.subjectName;
  var chapter = req.body.chapter;
  var part = req.body.part;
  var chapName = req.body.chapname;
  console.log(chapName)
 var new_youtube = new Youtube(req.body);
 
  TestYoutube.createYoutubeData(new_youtube, function(err, youtube) {
    if (err){
      res.send({error:err,Message : "Data not saved."});
    }
    else{      
          res.send({error:false,Message : "Data Saved"});
    }
      //res.json(student);
    });

};

//----------------------------------------------------Test Management---------------------------------

//Web
 module.exports.insertTestModule = function(req, res) {  
  var new_test = new TestModule(req.body);
  //handles null error 
  if(!new_test.ClassId){
    res.status(400).send({ error:true, message: 'Please Provide Class.' });
  }
  if(!new_test.CourseId){
    res.status(400).send({ error:true, message: 'Please Provide Course.' });
  }
  if(!new_test.TopicId){
    res.status(400).send({ error:true, message: 'Please Provide Topic.' });
  } 
  if(!new_test.ChapterId){
    res.status(400).send({ error:true, message: 'Please Provide Chapter.' });
  } 
  if(!new_test.TestQuestionType){
    res.status(400).send({ error:true, message: 'Please Provide Question Type.' });
  } 
  if(!new_test.TestQuestions){
    res.status(400).send({ error:true, message: 'Please Provide Question.' });
  }
  if(!new_test.AnswerOption1){
    res.status(400).send({ error:true, message: 'Please Provide Answer Option One.' });
  } 
  if(!new_test.AnswerOption2){
    res.status(400).send({ error:true, message: 'Please Provide Answer Option Two.' });
  } 
  // if(!new_test.AnswerOption3){
  //   res.status(400).send({ error:true, message: 'Please Provide Answer Option Three.' });
  // } 
  // if(!new_test.AnswerOption4){
  //   res.status(400).send({ error:true, message: 'Please Provide Answer Option Four' });
  // }
  // if(!new_test.AnswerOption5){
  //   res.status(400).send({ error:true, message: 'Please Provide Answer Option Five' });
  // }
  if(!new_test.CorrectAnswer){
    res.status(400).send({ error:true, message: 'Please Provide Right Answer.' });
  }   
else{  
  TestModule.createTestModule(new_test, function(err, testData) {
    if (err){
      res.send({error:err,Message : "Data not saved."});
    }else{
      res.send({error:false,Message : "Data saved successfully."});
    }
    //res.json(testData);
  });
}
};

//App
module.exports.getTestQuestionAccordingToClassSubjectChapter = function(req,res){
  var ClassId = req.query.ClassId;
  var CourseId = req.query.CourseId;
  var ChapterId = req.query.ChapterId;

  if(ClassId == null){
    res.status(400).send({ error:true, message: 'Please Provide Class.' });
  }
  if(CourseId == null){
    res.status(400).send({ error:true, message: 'Please Provide Course.' });
  }
  if(ChapterId == null){
    res.status(400).send({ error:true, message: 'Please Provide Chapter.' });
  } 
  else{
    TestModule.getTestQuestion(ClassId,CourseId,ChapterId, function(err, data){
      if(err){
          res.send({error:err,Message : "Error fetching data."});
      }else{
          res.send({error:false,Message : data});
      }
    });
  }
}


//----------------------------------------------------Practice Management---------------------------------

 module.exports.insertPracticeModule = function(req, res) {  
  var new_practice = new PracticeModule(req.body);
  //handles null error 
  if(!new_practice.ClassId){
    res.status(400).send({ error:true, message: 'Please Provide Class.' });
  }
  if(!new_practice.CourseId){
    res.status(400).send({ error:true, message: 'Please Provide Course.' });
  }
  if(!new_practice.TopicId){
    res.status(400).send({ error:true, message: 'Please Provide Topic.' });
  } 
  if(!new_practice.ChapterId){
    res.status(400).send({ error:true, message: 'Please Provide Chapter.' });
  } 
  if(!new_practice.PracticeQuestionType){
    res.status(400).send({ error:true, message: 'Please Provide Question Type.' });
  } 
  if(!new_practice.PracticeQuestion){
    res.status(400).send({ error:true, message: 'Please Provide Question.' });
  }
  if(!new_practice.AnswerOption1){
    res.status(400).send({ error:true, message: 'Please Provide Answer Option One.' });
  } 
  if(!new_practice.AnswerOption2){
    res.status(400).send({ error:true, message: 'Please Provide Answer Option Two.' });
  } 
  // if(!new_test.AnswerOption3){
  //   res.status(400).send({ error:true, message: 'Please Provide Answer Option Three.' });
  // } 
  // if(!new_test.AnswerOption4){
  //   res.status(400).send({ error:true, message: 'Please Provide Answer Option Four' });
  // }
  // if(!new_test.AnswerOption5){
  //   res.status(400).send({ error:true, message: 'Please Provide Answer Option Five' });
  // }
  if(!new_practice.CorrectAnswer){
    res.status(400).send({ error:true, message: 'Please Provide Right Answer.' });
  }   
else{  
  PracticeModule.createPracticeModule(new_practice, function(err, testData) {
    if (err){
      res.send({error:err,Message : "Data not saved."});
    }else{
      res.send({error:false,Message : "Data saved successfully."});
    }
    //res.json(testData);
  });
}
};

//App
module.exports.getPracticeQuestionAccordingToClassSubjectChapter = function(req,res){
  var ClassId = req.query.ClassId;
  var CourseId = req.query.CourseId;
  var ChapterId = req.query.ChapterId;

  if(ClassId == null){
    res.status(400).send({ error:true, message: 'Please Provide Class.' });
  }
  if(CourseId == null){
    res.status(400).send({ error:true, message: 'Please Provide Course.' });
  }
  if(ChapterId == null){
    res.status(400).send({ error:true, message: 'Please Provide Chapter.' });
  } 
  else{
    PracticeModule.getPracticeQuestion(ClassId,CourseId,ChapterId, function(err, data){
      if(err){
          res.send({error:err,Message : "Error fetching data."});
      }else{
          res.send({error:false,Message : data});
      }
    });
  }
}


 

//----------------------------------ForgotPassword------------------------------------------------

module.exports.appForgotPassword = function(req,res){
  
}

//---------------------------------------Test Master--------------------------------

module.exports.insertTestMaster = function(req, res, next) 
{
  console.log('Test',req.body)
 passport.authenticate('jwt', function(err, user) 
 {
        if (err || !user)
        {
            console.log("Test1")
            console.log("User",err);
            return res.json({ status: 401, success: false, error: "Authentication Fail." });
        }
        else if (user) 
        { 
          console.log("Data",req.body.ClassId);
          var new_test_master = new TestMaster(req.body);
          //handles null error 
          if(!new_test_master.ClassId){
            res.json({ status: 401, success: false, error: "Please Provide Class." });
          }
          if(!new_test_master.CourseId){
            res.json({ status: 401, success: false, error: "Please Provide Course." });
          }
          if(!new_test_master.TopicId){
            //res.status(400).send({ error:true, message: 'Please Provide Topic.' });
            res.json({ status: 401, success: false, error: "Please Provide Topic." });
          } 
          if(!new_test_master.ChapterId){
              //res.status(400).send({ error:true, message: 'Please Provide Chapter.' });
            res.json({ status: 401, success: false, error: "Please Provide Chapter." });
          } 
          if(!new_test_master.TestTitle){
              //res.status(400).send({ error:true, message: 'Please Provide Test Title.' });
            res.json({ status: 401, success: false, error: "Please Provide Test Title." });
          }   
          else{
            new_test_master.StatusId = 1;
            //new_test_master.CreatedById = user[0].SchoolId;
            new_test_master.CreatedById = user[0].TeacherId;
            TestMaster.createTestMaster(new_test_master,user[0].SchoolId, function(err, testData) {
            if (err){
              //res.send({error:err,Message : "Data not saved."});
              console.log(err)
              console.log(new_test_master);
              res.json({status:200,success:false,message:"Test Details not saved."});
            }else{
                  console.log("Id",testData);
                 console.log("FN",req.file.filename) 
                importTestExcelData2MySQL(testData, req.file.filename, user[0].TeacherId, res);
                //res.json({status:200,success:true,message:"Test Details saved successfully."});
              
            }
          });
        }
    }
  })(req,res,next);
}

// importTestExcelData2MySQL = async function(testId, file){
// try{
//     console.log("fileeeeeeeeeeeee",testId,file); 
//     if (!file) 
//     {
//         console.log("No file received");
//         res.status(400).send({ error:true, message: 'Please Upload Excel Sheet.' });         
//     } 

//     else 
//     {    
//       try{
//           var fn = './public/excelsheet/' + file;  
//            //res.json({'msg': 'File uploaded/import successfully!', 'file': file});

// readXlsxFile(fn).then((rows) => {
//     var new_excel = [];
//     rows.forEach((element, index) =>{
//         if(rows[index] == '1' || rows[index] == '2' || rows[index] == '3'){

//         }
//         else{
//           rows[index][0]=testId; //PracticeMasterId
//           rows[index][10] = 1;
//           rows[index][11] = 1;
//           rows[index][12] = null;
//           rows[index][13] = new Date();
//           rows[index][14] = null;
//         }
//     });
//     console.log(rows);
//     console.log("Rows",rows.length); 
//     var test = rows.slice(1,Number(rows.length));
//     console.log("Demo",test.length) //1
//     // Remove Header ROW
//     //rows.shift();

//       TestDetail.createDetail(test,function(err,response){
//       if(err)
//       {
//         console.log("Error",err);
//       }
//       else
//       {
//         console.log('Test',response);
//       }
//     });
//   });
// }catch(e){console.log(e);}
// }

// }catch(e){}
// }

importTestExcelData2MySQL = async function(testId,file, teacherId, res){
  try{
      console.log(file); 
      if (!file) 
      {
          console.log("No file received");
          res.status(400).send({ error:true, message: 'Please Upload Excel Sheet.' });         
      } 
      else 
      {    
        try{
            var fn = './public/excelsheet/' + file;  
            readXlsxFile(fn).then((rows) => {
            // `rows` is an array of rows
            // each row being an array of cells.
            //console.log(rows.getCell());   
            //rows.getCell('PracticeMasterId') = practiceId;
            //console.log(rows[2]);
            var new_excel = [];
            var colName = rows.slice(0,Number(rows.length));
            var checkrow = rows.slice(1,Number(rows.length));
            try{
            if(!(colName[0][0] == 'TestId' && colName[0][1] == 'ClassId' && colName[0][2] == 'CourseId' && colName[0][3] == 'TopicId' && colName[0][4] == 'ChapterId' && colName[0][5] == 'TestQuestionType' && colName[0][6] == 'TestQuestions' && colName[0][7] == 'AnswerOption1' && colName[0][8] == 'AnswerOption2' && colName[0][9] == 'AnswerOption3' && colName[0][10] == 'AnswerOption4' && colName[0][11] == 'AnswerOption5' && colName[0][12] == 'AnswerOption6' && colName[0][13] == 'CorrectAnswer'))
            {
              return res.json({status:400,success:false,message:"Template is not valid."});
            }
            if(checkrow.length == 0)
            {
              return res.json({status:400,success:false,message:"Sheet is Empty."});         
            }
            else{
            rows.forEach((element, index) =>{
                //element.practiceId = practiceId;
                //console.log('Element',element[3]);
                //element
                if(rows[index] == '1' || rows[index] == '2' || rows[index] == '3')
                {}
                else
                {
                  rows[index][0]=testId; //PracticeMasterId
                  rows[index][10] = 1; //StatusId
                  rows[index][11] = teacherId; //CreatedById
                  rows[index][12] = null;
                  rows[index][13] = new Date(); //CreatedDate
                  rows[index][14] = null;
                } 
      });
          }
        }catch(e){console.log(e)}
      console.log(rows);
      
      console.log("Rows",rows.length); 
      var test = rows.slice(1,Number(rows.length));
      console.log("Demo",test.length) //1
      // Remove Header ROW
      //rows.shift();
  
      TestDetail.createDetail(test,function(err,response){
        if(err)
        {
          console.log("Error",err);
        }
        else
        {
          //console.log('Test',response);
          res.json({status:200,success:true,message:"Test Details saved successfully."});
        }
      });
    });
  }catch(e){console.log(e);}
  }
  
  }catch(e){}
  }


module.exports.getAllChapterTest = function (req, res,next) {
passport.authenticate('jwt', function(err, user) {
  if (err || !user)
  {
     console.log("Test1")
     console.log("User",err);
     return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  else if (user) 
  { 
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if(pageNo < 0 || pageNo === 0) {
        //response = {"Error" : true,"Message" : "Invalid page number, should start with 1"};
        return res.json({ status: 401, success: false, error: "Invalid page number, should start with 1." });
        //return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    console.log("Size",size);
    pool.query("select count(*) as Total from testmaster WHERE StatusId = 1 AND ChapterId = ? AND SchoolId=?",
      [req.query.ChapterId,user[0].SchoolId],function(err,totalCount){
    console.log(totalCount);
        if(err) {
               //response = {"Error" : true,"Message" : "Error fetching data"}
               response = { status: 401, success: false, error: "Error fetching data." }
        }
   pool.query(`select * from testmaster WHERE (StatusId = 1 AND ChapterId = ? AND SchoolId=?) limit ${query.limit}  offset  ${query.skip}`, [req.query.ChapterId,user[0].SchoolId], function(err,data)
   {        
            if(err) {
                response = { status: 401, success: false, error: "Error fetching data." };
            } 
            else if(data.length==0) {
                response = {status:200,success:true,Message:"No Data Found."};
            }
            else{
              var totalPages = Math.ceil(totalCount / size);      
              console.log(totalPages +" : "+totalCount+" : "+ size); 
                response = { status: 200, success: true, "Message" : "Data Found", "Data" : data,"Pages":totalPages,"TotalCount":totalCount[0]}       
                //response = {"Error" : false,"Message" : data,"Pages":totalPages,"TotalCount":totalCount[0]};
            }
            res.json(response);
        });
  })
  }
})(req,res,next);
}


module.exports.getAllChapterTestWeb = function (req, res,next) {
passport.authenticate('jwt', function(err, user) {
  if (err || !user)
  {
     console.log("Test1")
     console.log("User",err);
     return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  else if (user) 
  { 
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if(pageNo < 0 || pageNo === 0) {
        //response = {"Error" : true,"Message" : "Invalid page number, should start with 1"};
        return res.json({ status: 401, success: false, error: "Invalid page number, should start with 1." });
        //return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    console.log("Size",size);
    pool.query("select count(*) as Total from testmaster WHERE StatusId = 1 AND ChapterId = ? AND SchoolId=?",
      [req.query.ChapterId,user[0].SchoolId],function(err,totalCount){
    console.log(totalCount);
        if(err) {
               //response = {"Error" : true,"Message" : "Error fetching data"}
               response = { status: 401, success: false, error: "Error fetching data." }
        }
   // var query = `select * from testmaster WHERE (StatusId = 1 AND ChapterId = ? AND SchoolId=?) 
   //              limit ${query.limit}  offset  ${query.skip}`;

   

   pool.query(`select tm.*, cls.studentclass,cs.coursename,chap.chaptername from testmaster tm 
                LEFT JOIN course as cs ON (tm.courseId = cs.courseId) 
                LEFT JOIN chapter as chap ON (tm.chapterId = chap.chapterId) 
                LEFT JOIN studentclass as cls ON (tm.classId = cls.classId)
                WHERE (tm.StatusId = 1 AND tm.ChapterId = ? AND tm.SchoolId = ?) 
                limit ${query.limit} offset ${query.skip}`, [req.query.ChapterId,user[0].SchoolId], function(err,data)
   {        
            if(err) {
                response = { status: 401, success: false, error: "Error fetching data." };
            } 
            else if(data.length==0) {
                response = {status:200,success:true,Message:"No Data Found."};
            }
            else{
              var totalPages = Math.ceil(totalCount / size);      
              console.log(totalPages +" : "+totalCount+" : "+ size); 
                response = { status: 200, success: true, "Message" : "Data Found", "Data" : data,"Pages":totalPages,"TotalCount":totalCount[0]}       
                //response = {"Error" : false,"Message" : data,"Pages":totalPages,"TotalCount":totalCount[0]};
            }
            res.json(response);
        });
  })
  }
})(req,res,next);
}

//apply passport logic, design studenttest:- sid,testmasteri(same)(only 1 time)
//design studentpractice:- sid,practicemasterid,date,score,total,no.of question attempted,wrongquestion,rightquestion(multiple)

module.exports.getUserTestStatus = function(req, res, next){
passport.authenticate('jwt', function(err, user) {
  if (err || !user)
  {
     console.log("Test1")
     console.log("User",err);
     return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  else if (user) 
  { 
      pool.query('select FromDate, ToDate from testmaster WHERE TestMasterId = ?',[req.query.testMasterId] ,function(err, data){
        if(err){
          response = { status: 401, success: false, error: "Error fetching data." };
        }
        else{
          console.log(data);
          var fd = data[0].FromDate;
          var td = data[0].ToDate;
          console.log('fd',fd);
          console.log('Td',td);
          //timeDifference = Math.abs(td.getTime() - fd.getTime());
          //console.log(timeDifference);

const date1 = new Date(fd);
const date2 = new Date(td);
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
console.log(diffTime + " milliseconds");
console.log(diffDays + " days");
    //console.log("Test X", x);

        }
      });
  }
})(req, res, next);
}


module.exports.getTestTitleDD = function(req, res, next) 
{  
passport.authenticate('jwt', function(err, user) {
  if (err || !user)
  {
     console.log("Test1")
     console.log("User",err);
     return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var search_query = `select * from testmaster where StatusId = 1 AND SchoolId = ${user[0].SchoolId}`;
  pool.query(search_query, function(err, title){
              if(err){
                res.json({status:401,success:false, error:"Error"});
              }
              else if(title.length == 0){
                return res.json({status: 200, success: true, message: "No Data Found."});
              }
              else{
                return res.json({status: 200, success: true, message: "Data Found.", title : title});
              } 
          });
})(req, res, next);
}
//---------------------------------------Test Detail----------------------------

module.exports.insertTestDetail = function(req, res, next) {
passport.authenticate('jwt', function(err, user) {
  if (err || !user)
  {
     console.log("Test1")
     console.log("User",err);
     return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }  
  var new_test_detail = new TestDetail(req.body);
  //handles null error 
  if(!new_test_detail.TestQuestionType){
    res.json({ status: 401, success: false, error: "Please Provide Question Type." });
  } 
  if(!new_test_detail.TestQuestion){
    res.json({ status: 401, success: false, error: "Please Provide Question." });
  }
  if(!new_test_detail.AnswerOption1){
    res.json({ status: 401, success: false, error: "Please Provide Answer Option One." });
  } 
  if(!new_test_detail.AnswerOption2){
    res.json({ status: 401, success: false, error: "Please Provide Answer Option Two." });
  } 
else{
  new_test_detail.StatusId = 1;
  //new_test_detail.CreatedById = user[0].SchoolId;
  new_test_detail.CreatedById = user[0].TeacherId;
  TestDetail.createTestDetail(new_test_detail, function(err, testdetail) {
    if (err){
      res.json({status:200,success:false,message:"Test Details not saved."});
    }else{
      res.json({status:200,success:true,message:"Test Details saved successfully."});
    }
  });
}
})(req, res, next);
}




module.exports.getTestQuestionAccToTestId = function(req,res, next){
  passport.authenticate('jwt', function(err, user) {

        if (err || !user)
        {
            console.log("Test1")
            console.log("User",err);
            return res.json({ status: 401, success: false, error: "Authentication Fail." });

        }
        else if (user) 
        {    
            if(!req.query.testId)
            {
                res.json({ status: 401, success: false, error: "Please Provide TestId." });
            }
            else{
              TestDetail.getTestQuestion(req.query.testId, function(err, question){
              if(err){
                res.json({status:401,success:false, error:"Error"});
              }
              else if(question.length == 0){
                return res.json({status: 200, success: true, message: "No Data Found."});
              }
              else{
                return res.json({status: 200, success: true, message: "Data Found.", data : question});
              } 
          });
        }
      }
    })(req,res,next);
  }

// Web Api..

module.exports.updateTestDetail = function(req,res,next)
{ 
  passport.authenticate('jwt', function(err, user){
  if (err || !user) 
  {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
  } 
  console.log(req.body);
  var update_detail = new TestDetail(req.body);    
  if(!update_detail.TestQuestionType){
    res.json({ status: 401, success: false, error: "Please Provide Question Type." });
  } 
  if(!update_detail.TestQuestion){
    res.json({ status: 401, success: false, error: "Please Provide Question." });
  }
  if(!update_detail.AnswerOption1){
    res.json({ status: 401, success: false, error: "Please Provide Answer Option One." });
  } 
  if(!update_detail.AnswerOption2){
    res.json({ status: 401, success: false, error: "Please Provide Answer Option Two." });
  } 
  if(!update_detail.StatusId){
    res.json({ status: 401, success: false, error: "Please Provide StatusId." });
  } 
else{
  //update_detail.ModifiedById = user[0].SchoolId;
  update_detail.ModifiedById = user[0].TeacherId;
  update_detail.ModificationDate = new Date();
  TestDetail.updateTestQuestion(req.body.TestDetailId, update_detail, function(err, detail) {
          if(err)
          {
            res.json({status:200,success:false,error:"Data not updated"});
          }
          else
          {
            res.json({status:200,success:true,message:"Test Detail Updated Successfully."});
          } 
        });
}

  })(req,res,next);
}


//---------------------------------------Student Test-------------------------------------

module.exports.insertStudentTestDetail = function(req, res, next) { 
passport.authenticate('jwt', function(err, user) 
{
  if (err || !user)
  {
      console.log("Test1")
      console.log("User",err);
      return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  else if (user){
    var student_test = new StudentTest(req.body);
    //handles null error 
    if(!student_test.Date){
      res.json({ status: 401, success: false, error: "Please Provide Test Date." });
    } 
    if(!student_test.Score){
      res.json({ status: 401, success: false, error: "Please Provide Test Score" });
    }
    if(!student_test.Total){
      res.json({ status: 401, success: false, error: "Please Provide Test Total." });
    } 
    if(!student_test.NoofQuestionAttempted){
      res.json({ status: 401, success: false, error: "Please Provide Number of Question Attempted." });
    }
    else{  
    StudentTest.createStudentTest(student_test, function(err, studenttest) {
      if (err){
        res.json({status:200,success:false,error:"Test Details not saved."});
      }else{
        res.json({status:200,success:true,Message:"Test Details saved successfully."});
      }
    });
  }
  }
})(req,res,next);
}

module.exports.getStudentTest = function(req,res, next){
passport.authenticate('jwt', function(err, user) {

        if (err || !user)
        {
            console.log("Test1")
            console.log("User",err);
            return res.json({ status: 401, success: false, error: "Authentication Fail." });

        }
        else if (user) 
        {    
          if(!req.query.studentTestId)
            {
                res.json({ status: 401, success: false, error: "Please Provide Student Test Id." });
            }
            else{
              StudentTest.getTest(req.query.studentTestId, function(err, studentTest){
              if(err){
                res.json({status:401,success:false, error:"Error"});
              }
              else if(studentTest.length == 0){
                return res.json({status: 200, success: true, message: "No Data Found."});
              }
              else{
                return res.json({status: 200, success: true, message: "Data Found.", data : studentTest});
              } 
              });
            }
        }
})(req,res,next);
}

module.exports.getStudentTestAccToTestMaster = function(req,res, next)
{
  passport.authenticate('jwt', function(err, user) 
  {
    if (err || !user)
    {
      console.log("Test1")
      console.log("User",err);
      return res.json({ status: 401, success: false, error: "Authentication Fail." });
    }
    else if (user) 
    {    
      if(!req.query.studentId)
      {
        res.json({ status: 401, success: false, error: "Please Provide Student Id." });
      }
      else
      {
        pool.query("SELECT testmaster.ClassId, CASE WHEN studenttest.StatusId = 1 THEN 'True' ELSE 'False' END AS UserTestStatus, testmaster.CourseId, testmaster.TopicId, testmaster.ChapterId, testmaster.TestTitle, testmaster.FromDate, testmaster.ToDate, testmaster.TestDuration from testmaster LEFT JOIN studenttest ON testmaster.TestMasterId = studenttest.TestMasterId AND studenttest.studentId = ?", [req.query.studentId],function(err, studentTest){
              if(err){
                res.json({status:401,success:false, error:"Error"});
              }
              else if(studentTest.length == 0){
                return res.json({status: 200, success: true, message: "No Data Found."});
              }
              else{
                return res.json({status: 200, success: true, message: "Data Found.", data : studentTest});
              } 
              });
            }
        }
})(req,res,next);
}

//-----------------------------------------------Student Practice------------------------------------


module.exports.insertStudentPracticeDetail = function(req, res, next) { 
passport.authenticate('jwt', function(err, user) 
{
  if (err || !user)
  {
      console.log("Test1")
      console.log("User",err);
      return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  else if (user){
    var student_practice = new StudentPractice(req.body);
    //handles null error 
    if(!student_practice.Date){
      res.json({ status: 401, success: false, error: "Please Provide Practice Date." });
    } 
    if(!student_practice.Score){
      res.json({ status: 401, success: false, error: "Please Provide Practice Score" });
    }
    if(!student_practice.Total){
      res.json({ status: 401, success: false, error: "Please Provide Practice Total." });
    } 
    if(!student_practice.NoofQuestionAttempted){
      res.json({ status: 401, success: false, error: "Please Provide Number of Question Attempted." });
    }
    else{  
    StudentPractice.createStudentPractice(student_practice, user.student[0].SchoolId, function(err, studentpractice) {
      if (err){
        res.json({status:200,success:false,Message:"Practice Details not saved."});
      }else{
        res.json({status:200,success:true,Message:"Practice Details saved successfully."});
      }
    });
  }
  }
})(req,res,next);
}

module.exports.getStudentPractice = function(req,res, next){
passport.authenticate('jwt', function(err, user) {

        if (err || !user)
        {
            console.log("Test1")
            console.log("User",err);
            return res.json({ status: 401, success: false, error: "Authentication Fail." });

        }
        else if (user) 
        {    
          if(!req.query.studentPracticeId)
            {
                res.json({ status: 401, success: false, error: "Please Provide Student Practice Id." });
            }
            else{
              StudentPractice.getPractice(req.query.studentPracticeId, function(err, studentPractice){
              if(err){
                res.json({status:401,success:false, error:"Error"});
              }
              else if(studentPractice.length == 0){
                return res.json({status: 200, success: true, message: "No Data Found."});
              }
              else{
                return res.json({status: 200, success: true, message: "Data Found.", data : studentPractice});
              } 
              });
            }
        }
})(req,res,next);
}



//-----------------------------------------Practice Master----------------------------------

module.exports.insertPracticeMasterSingle = function(req, res, next) 
{
 passport.authenticate('jwt', function(err, user) {

        if (err || !user)
        {
            console.log("Test1")
            console.log("User",err);
            return res.json({ status: 401, success: false, error: "Authentication Fail." });

        }
        else if (user) 
        {   
          var new_practice_master = new PracticeMaster(req.body);
          //handles null error 
          if(!new_practice_master.ClassId){
              res.json({ status: 401, success: false, error: "Please Provide Class." });
          }
          if(!new_practice_master.CourseId){
            res.json({ status: 401, success: false, error: "Please Provide Course." });
          }
          if(!new_practice_master.TopicId){
            res.json({ status: 401, success: false, error: "Please Provide Topic." });
          } 
          if(!new_practice_master.ChapterId){
            res.json({ status: 401, success: false, error: "Please Provide Chapter." });
          } 
          if(!new_practice_master.PracticeTitle){
            res.json({ status: 401, success: false, error: "Please Provide Practice Title." });
          }
          if(!new_practice_master.FromDate){
            res.json({ status: 401, success: false, error: "Please Provide From Date." });
          }
          if(!new_practice_master.ToDate){
            res.json({ status: 401, success: false, error: "Please Provide To Date." });
          }
          if(!new_practice_master.PracticeDuration){
            res.json({ status: 401, success: false, error: "Please Provide Practice Duration." });
          }
          else{
              new_practice_master.StatusId = 1;
              new_practice_master.CreatedById = user[0].TeacherId;
              new_practice_master.CreationDate = new Date();
              PracticeMaster.createPracticeMaster(new_practice_master,user[0].SchoolId, function(err, practiceData) {
              if (err){
                  res.json({status:200,success:false,message:"Practice Details not saved." + err});
              }else{
                 res.json({status:200,success:true,message:"Practice Details saved successfully.", id: practiceData.Id});
              }
            });
          }
        }
    })(req,res,next);
}



module.exports.insertPracticeMaster = function(req, res, next) 
{
 passport.authenticate('jwt', function(err, user) {

        if (err || !user)
        {
            console.log("Test1")
            console.log("User",err);
            return res.json({ status: 401, success: false, error: "Authentication Fail." });

        }
        else if (user) 
        {   
          var new_practice_master = new PracticeMaster(req.body);
          //handles null error 
          if(!new_practice_master.ClassId){
              res.json({ status: 401, success: false, error: "Please Provide Class." });
          }
          if(!new_practice_master.CourseId){
            res.json({ status: 401, success: false, error: "Please Provide Course." });
          }
          if(!new_practice_master.TopicId){
            res.json({ status: 401, success: false, error: "Please Provide Topic." });
          } 
          if(!new_practice_master.ChapterId){
            res.json({ status: 401, success: false, error: "Please Provide Chapter." });
          } 
          if(!new_practice_master.PracticeTitle){
            res.json({ status: 401, success: false, error: "Please Provide Practice Title." });
          }   
          else{
              new_practice_master.StatusId = 1;
              //new_practice_master.CreatedById = user[0].SchoolId;
              new_practice_master.CreatedById = user[0].TeacherId;
              PracticeMaster.createPracticeMasterExcel(new_practice_master,user[0].SchoolId, function(err, practiceData) {
              if (err){
                  res.json({status:200,success:false,message:"Practice Details not saved." + err});
              }else{
                  console.log("Id",practiceData);
                  console.log("FN",req.file.filename)        
                 importPracticeExcelData2MySQL(practiceData, req.file.filename, user[0].TeacherId, res);
                 //res.json({status:200,success:true,message:"Practice Details saved successfully."});
              }
            });
          }
        }
    })(req,res,next);
}

importPracticeExcelData2MySQL = async function(practiceId,file, teacherId, res){
try{
    console.log(file); 
    if (!file) 
    {
        console.log("No file received");
        res.status(400).send({ error:true, message: 'Please Upload Excel Sheet.' });         
    } 
    else 
    {    
      try{
          var fn = './public/excelsheet/' + file;  
          
          //res.json({'msg': 'File uploaded/import successfully!', 'file': file});

readXlsxFile(fn).then((rows) => {
    // `rows` is an array of rows
    // each row being an array of cells.
    //console.log(rows.getCell());   
    //rows.getCell('PracticeMasterId') = practiceId;
    //console.log(rows[2]);
    var new_excel = [];
    var colName = rows.slice(0,Number(rows.length));
    var checkrow = rows.slice(1,Number(rows.length));
    try{
         if(!(colName[0][0] == 'PracticeId' && colName[0][1] == 'PracticeQuestionType' && colName[0][2] == 'PracticeQuestion' && colName[0][3] == 'AnswerOption1' && colName[0][4] == 'AnswerOption2' && colName[0][5] == 'AnswerOption3' && colName[0][6] == 'AnswerOption4' && colName[0][7] == 'AnswerOption5' && colName[0][8] == 'AnswerOption6' && colName[0][9] == 'CorrectAnswer'))
         {
            return res.json({status:400,success:false,message:"Template is not valid."});
         }
         if(checkrow.length == 0)
         {
            return res.json({status:400,success:false,message:"Sheet is Empty."});         
         }
         else{
        rows.forEach((element, index) =>{
        //element.practiceId = practiceId;
        //console.log('Element',element[3]);
        //element
        if(rows[index] == '1' || rows[index] == '2' || rows[index] == '3')
        {

        }
        else
        {
         rows[index][0]=practiceId; //PracticeMasterId
          rows[index][10] = 1; //StatusId
          rows[index][11] = teacherId; //CreatedById
          rows[index][12] = '';
          rows[index][13] = new Date();
          rows[index][14] = '';
          console.log(rows[index][9]);
          console.log("heyyyyyyyyyy",rows[index][1])
        } 
    });
      }
    }catch(e){console.log(e)}
    console.log(rows);
    
    console.log("Rows",rows.length); 
    var test = rows.slice(1,Number(rows.length));
    console.log("Demo",test.length) //1
    // Remove Header ROW
    //rows.shift();

PracticeDetail.createDetail(test,function(err,response){
      if(err)
      {
        console.log("Error",err);
      }
      else
      {
        //console.log('Test',response);
        res.json({status:200,success:true,message:"Practice Details saved successfully."});
      }
    });
  });
}catch(e){console.log(e);}
}

}catch(e){}
}

// app api
module.exports.getAllChapterPractice = function (req, res, next) 
{
passport.authenticate('jwt', function(err, user) {

        if (err || !user)
        {
            console.log("Test1")
            console.log("User",err);
            return res.json({ status: 401, success: false, error: "Authentication Fail." });

        }
        else if (user) 
        {    
          var pageNo = parseInt(req.query.pageNo)
          var size = parseInt(req.query.size)
          var query = {}
          if(pageNo < 0 || pageNo === 0) {
              return res.json({ status: 401, success: false, error: "Invalid page number, should start with 1." });
          }
          query.skip = size * (pageNo - 1)
          query.limit = size
          console.log("Size",size);
          pool.query("select count(*) as Total from practicemaster WHERE StatusId = 1 AND ChapterId = ? AND SchoolId = ?",
            [req.query.ChapterId,req.query.SchoolId],function(err,totalCount){
          console.log(totalCount);
          if(err) {
               //response = {"Error" : true,"Message" : "Error fetching data"}
               response = { status: 401, success: false, error: "Error fetching data." }
          }
          pool.query(`select * from practicemaster WHERE (StatusId = 1 AND ChapterId = ? AND SchoolId=?) limit ${query.limit}  offset  ${query.skip}`, [req.query.ChapterId,req.query.SchoolId], function(err,data)
          {        
            if(err) {
                response = { status: 401, success: false, error: "Error fetching data." };
            }
            else if(data.length==0) {
                response = {status:200,success:true,Message:"No Data Found."};
            } 
            else {
              var totalPages = Math.ceil(totalCount / size);      
              console.log(totalPages +" : "+totalCount+" : "+ size); 
                response = { status: 200, success: true, "Message" : "Data Found", "Data":data,"Pages":totalPages,"TotalCount":totalCount[0]}       
                //response = {"Error" : false,"Message" : data,"Pages":totalPages,"TotalCount":totalCount[0]};
            }
            res.json(response);
        });
    })
  }
})(req,res,next);
}

//Web api
module.exports.getAllChapterPracticeWeb = function (req, res,next) {
passport.authenticate('jwt', function(err, user) {

        if (err || !user)
        {
            console.log("Test1")
            console.log("User",err);
            return res.json({ status: 401, success: false, error: "Authentication Fail." });

        }
        else if (user) 
        {    
          var pageNo = parseInt(req.query.pageNo)
          var size = parseInt(req.query.size)
          var query = {}
          if(pageNo < 0 || pageNo === 0) {
              return res.json({ status: 401, success: false, error: "Invalid page number, should start with 1." });
          }
          query.skip = size * (pageNo - 1)
          query.limit = size
          console.log("Size",size);
          var search_query;
          var chapterId = req.query.ChapterId;
          var schoolId = user[0].SchoolId; 
          if(chapterId)
          {
              search_query = `select count(*) as Total from practicemaster WHERE StatusId = 1 AND ChapterId = ${chapterId} AND SchoolId = ${schoolId}`
          }
          else
          {
           search_query = `select count(*) as Total from practicemaster WHERE StatusId = 1 AND SchoolId = ${schoolId}` 
          }
          pool.query(search_query,function(err,totalCount){
          console.log(totalCount);
          if(err) {
               //response = {"Error" : true,"Message" : "Error fetching data"}
               response = { status: 401, success: false, error: "Error fetching data." }
          }

          if(chapterId)
          {
              search_query = `select pm.*, cls.studentclass,cs.coursename,chap.chaptername from practicemaster pm 
                LEFT JOIN course as cs ON (pm.courseId = cs.courseId) 
                LEFT JOIN chapter as chap ON (pm.chapterId = chap.chapterId)
                LEFT JOIN studentclass as cls ON (pm.classId = cls.classId)
                WHERE (pm.StatusId = 1 AND pm.ChapterId = ${chapterId} AND pm.SchoolId = ${schoolId}) 
                limit ${query.limit} offset ${query.skip}`
          }
          else
          {
                search_query = `select pm.*, cls.studentclass,cs.coursename,chap.chaptername from practicemaster pm 
                LEFT JOIN course as cs ON (pm.courseId = cs.courseId) 
                LEFT JOIN chapter as chap ON (pm.chapterId = chap.chapterId)
                LEFT JOIN studentclass as cls ON (pm.classId = cls.classId)
                WHERE (pm.StatusId = 1 AND pm.SchoolId = ${schoolId}) 
                limit ${query.limit} offset ${query.skip}` 
          }
          pool.query(search_query, function(err,data)
          {        
            if(err) {
                response = { status: 401, success: false, error: "Error fetching data."};
            }
            else if(data.length==0) {
                response = {status:200,success:true,Message:"No Data Found."};
            } 
            else {
              var totalPages = Math.ceil(totalCount / size);      
              console.log(totalPages +" : "+totalCount+" : "+ size); 
                response = { status: 200, success: true, "Message" : "Data Found", "Data":data,"Pages":totalPages,"TotalCount":totalCount[0]};
            }
            res.json(response);
        });
    })
  }
})(req,res,next);
}


//Web api Teacher Token
module.exports.getAllPracticeData = function (req, res,next) {
passport.authenticate('jwt', function(err, user) {

        if (err || !user)
        {
            console.log("Test1")
            console.log("User",err);
            return res.json({ status: 401, success: false, error: "Authentication Fail." });

        }
        else if (user) 
        {    
          var pageNo = parseInt(req.query.pageNo)
          var size = parseInt(req.query.size)
          var query = {}
          if(pageNo < 0 || pageNo === 0) {
              return res.json({ status: 401, success: false, error: "Invalid page number, should start with 1." });
          }
          query.skip = size * (pageNo - 1)
          query.limit = size
          console.log("Size",size);
          var schoolId = user[0].SchoolId;
          var chapterId = req.query.chapterId;
          var courseId = req.query.courseId;
          var classId = req.query.classId;
          var topicId = req.query.topicId;
          var statusId = req.query.statusId;
          var practicemasterid = req.query.practicemasterid;

          if(classId)
          {
            if(courseId)
            {
              if(chapterId)
              {
                  if(topicId)
                  {
                      search_query = `select count(*) as Total from practicedetail as pd
                        LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid) 
                        WHERE pd.StatusId = ${statusId} AND pm.ChapterId = ${chapterId} AND 
                        pm.SchoolId=${schoolId} AND pm.CourseId=${courseId} AND pm.ClassId = ${classId} 
                        AND pm.TopicId = ${topicId}
                        AND pm.PracticeMasterId = ${practicemasterid}`
                  }
                  else
                  {
                        search_query = `select count(*) as Total from practicedetail as pd
                        LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid) 
                        WHERE pd.StatusId = ${statusId} AND pm.ChapterId = ${chapterId} AND 
                        pm.SchoolId=${schoolId} AND pm.CourseId=${courseId} AND pm.ClassId = ${classId} 
                        AND pm.PracticeMasterId = ${practicemasterid}`
                  }
              }
              else
              {
                        search_query = `select count(*) as Total from practicedetail as pd
                        LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid) 
                        WHERE pd.StatusId = ${statusId} AND pm.SchoolId=${schoolId} AND 
                        pm.CourseId=${courseId} AND pm.ClassId = ${classId} 
                        AND pm.PracticeMasterId = ${practicemasterid}`

              }

            }
            else
            {
                        search_query = `select count(*) as Total from practicedetail as pd
                        LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid) 
                        WHERE pd.StatusId = ${statusId} AND pm.SchoolId=${schoolId} AND 
                        pm.ClassId = ${classId} 
                        AND pm.PracticeMasterId = ${practicemasterid}`              
            }
          }
          else
          {
              if(courseId)
              {
                  search_query = `select count(*) as Total from practicedetail as pd
                        LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid) 
                        WHERE pd.StatusId = ${statusId} AND pm.SchoolId=${schoolId} 
                        AND pm.PracticeMasterId = ${practicemasterid} AND pm.CourseId = ${courseId}`
              }
              if(chapterId)
              {

                  search_query = `select count(*) as Total from practicedetail as pd
                        LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid) 
                        WHERE pd.StatusId = ${statusId} AND pm.SchoolId=${schoolId}
                        AND pm.PracticeMasterId = ${practicemasterid} AND pm.ChapterId = ${chapterId}`
              }
              if(topicId)
              {

                  search_query = `select count(*) as Total from practicedetail as pd
                        LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid) 
                        WHERE pd.StatusId = ${statusId} AND pm.SchoolId=${schoolId}
                        AND pm.PracticeMasterId = ${practicemasterid} AND pm.TopicId = ${topicId}`
              }
              if(classId)
              {
                        search_query = `select count(*) as Total from practicedetail as pd
                        LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid) 
                        WHERE pd.StatusId = ${statusId} AND pm.SchoolId=${schoolId} 
                        AND pm.PracticeMasterId = ${practicemasterid} AND pm.ClassId = ${classId}` 
              }
              else
              {
                    search_query = `select count(*) as Total from practicedetail as pd
                        LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid) 
                        WHERE pd.StatusId = ${statusId} AND pm.SchoolId=${schoolId} 
                        AND pm.PracticeMasterId = ${practicemasterid}` 
              }
                
          }

         
          console.log('Count', search_query);
          pool.query(search_query,function(err,totalCount){
          console.log(totalCount);
          if(err) {
               response = { status: 401, success: false, error: "Error fetching data." }
          }

          if(classId)
          {
            if(courseId)
            {
              if(chapterId)
              {
                  if(topicId)
                  {
                          search_query = `select pd.*, cls.studentclass,cs.coursename,
                          chap.chaptername, t.TopicName from practicedetail as pd 
                          LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid)
                          LEFT JOIN course as cs ON (pm.courseId = cs.courseId) 
                          LEFT JOIN chapter as chap ON (pm.chapterId = chap.chapterId)
                          LEFT JOIN studentclass as cls ON (pm.classId = cls.classId)
                          LEFT JOIN topic as t ON (pm.topicId = t.topicId)                
                          WHERE pd.StatusId = ${statusId} AND pm.ChapterId = ${chapterId} 
                          AND pm.SchoolId = ${schoolId} 
                          AND pm.ClassId = ${classId} AND pm.CourseId = ${courseId} 
                          AND pm.TopicId = ${topicId}) AND pm.PracticeMasterId = ${practicemasterid}
                          limit ${query.limit} offset ${query.skip}`
                  }
                  else
                  {
                          search_query = `select pd.*, cls.studentclass,cs.coursename,
                          chap.chaptername, t.TopicName from practicedetail as pd 
                          LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid)
                          LEFT JOIN course as cs ON (pm.courseId = cs.courseId) 
                          LEFT JOIN chapter as chap ON (pm.chapterId = chap.chapterId)
                          LEFT JOIN studentclass as cls ON (pm.classId = cls.classId)
                          LEFT JOIN topic as t ON (pm.topicId = t.topicId)                
                          WHERE pd.StatusId = ${statusId} AND pm.ChapterId = ${chapterId} 
                          AND pm.SchoolId = ${schoolId} 
                          AND pm.ClassId = ${classId} AND pm.CourseId = ${courseId} 
                          AND pm.PracticeMasterId = ${practicemasterid}
                          limit ${query.limit} offset ${query.skip}`
                  }
              }
              else
              {
                          search_query = `select pd.*, cls.studentclass,cs.coursename,
                          chap.chaptername, t.TopicName from practicedetail as pd 
                          LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid)
                          LEFT JOIN course as cs ON (pm.courseId = cs.courseId) 
                          LEFT JOIN chapter as chap ON (pm.chapterId = chap.chapterId)
                          LEFT JOIN studentclass as cls ON (pm.classId = cls.classId)
                          LEFT JOIN topic as t ON (pm.topicId = t.topicId)                
                          WHERE pd.StatusId = ${statusId}
                          AND pm.SchoolId = ${schoolId} 
                          AND pm.ClassId = ${classId} AND pm.CourseId = ${courseId} 
                          AND pm.PracticeMasterId = ${practicemasterid}
                          limit ${query.limit} offset ${query.skip}`
              }
            }
            else
            {
                          search_query = `select pd.*, cls.studentclass,cs.coursename,
                          chap.chaptername, t.TopicName from practicedetail as pd 
                          LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid)
                          LEFT JOIN course as cs ON (pm.courseId = cs.courseId) 
                          LEFT JOIN chapter as chap ON (pm.chapterId = chap.chapterId)
                          LEFT JOIN studentclass as cls ON (pm.classId = cls.classId)
                          LEFT JOIN topic as t ON (pm.topicId = t.topicId)                
                          WHERE pd.StatusId = ${statusId}
                          AND pm.SchoolId = ${schoolId} 
                          AND pm.ClassId = ${classId} AND pm.PracticeMasterId = ${practicemasterid}
                          limit ${query.limit} offset ${query.skip}`
            }
          }
          else
          {
              if(courseId)
              {
                        search_query = `select pd.*, cls.studentclass,cs.coursename,
                          chap.chaptername, t.TopicName from practicedetail as pd 
                          LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid)
                          LEFT JOIN course as cs ON (pm.courseId = cs.courseId) 
                          LEFT JOIN chapter as chap ON (pm.chapterId = chap.chapterId)
                          LEFT JOIN studentclass as cls ON (pm.classId = cls.classId)
                          LEFT JOIN topic as t ON (pm.topicId = t.topicId)                
                          WHERE pd.StatusId = ${statusId} AND pm.CourseId = ${courseId}
                          AND pm.SchoolId = ${schoolId} AND pm.PracticeMasterId = ${practicemasterid}
                          limit ${query.limit} offset ${query.skip}`
              }
              if(chapterId)
              {
                       search_query = `select pd.*, cls.studentclass,cs.coursename,
                          chap.chaptername, t.TopicName from practicedetail as pd 
                          LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid)
                          LEFT JOIN course as cs ON (pm.courseId = cs.courseId) 
                          LEFT JOIN chapter as chap ON (pm.chapterId = chap.chapterId)
                          LEFT JOIN studentclass as cls ON (pm.classId = cls.classId)
                          LEFT JOIN topic as t ON (pm.topicId = t.topicId)                
                          WHERE pd.StatusId = ${statusId} AND pm.ChapterId = ${chapterId}
                          AND pm.SchoolId = ${schoolId} AND pm.PracticeMasterId = ${practicemasterid}
                          limit ${query.limit} offset ${query.skip}` 
              }
              if(classId)
              {
                       search_query = `select pd.*, cls.studentclass,cs.coursename,
                          chap.chaptername, t.TopicName from practicedetail as pd 
                          LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid)
                          LEFT JOIN course as cs ON (pm.courseId = cs.courseId) 
                          LEFT JOIN chapter as chap ON (pm.chapterId = chap.chapterId)
                          LEFT JOIN studentclass as cls ON (pm.classId = cls.classId)
                          LEFT JOIN topic as t ON (pm.topicId = t.topicId)                
                          WHERE pd.StatusId = ${statusId} AND pm.ClassId = ${classId}
                          AND pm.SchoolId = ${schoolId} AND pm.PracticeMasterId = ${practicemasterid}
                          limit ${query.limit} offset ${query.skip}`
              }
              if(topicId)
              {
                        search_query = `select pd.*, cls.studentclass,cs.coursename,
                          chap.chaptername, t.TopicName from practicedetail as pd 
                          LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid)
                          LEFT JOIN course as cs ON (pm.courseId = cs.courseId) 
                          LEFT JOIN chapter as chap ON (pm.chapterId = chap.chapterId)
                          LEFT JOIN studentclass as cls ON (pm.classId = cls.classId)
                          LEFT JOIN topic as t ON (pm.topicId = t.topicId)                
                          WHERE pd.StatusId = ${statusId} AND pm.TopicId = ${topicId}
                          AND pm.SchoolId = ${schoolId} AND pm.PracticeMasterId = ${practicemasterid}
                          limit ${query.limit} offset ${query.skip}` 
              }
              else
              {
                        search_query = `select pd.*, cls.studentclass,cs.coursename,
                          chap.chaptername, t.TopicName from practicedetail as pd 
                          LEFT JOIN practicemaster as pm ON (pm.practicemasterid = pd.practicemasterid)
                          LEFT JOIN course as cs ON (pm.courseId = cs.courseId) 
                          LEFT JOIN chapter as chap ON (pm.chapterId = chap.chapterId)
                          LEFT JOIN studentclass as cls ON (pm.classId = cls.classId)
                          LEFT JOIN topic as t ON (pm.topicId = t.topicId)                
                          WHERE pd.StatusId = ${statusId} 
                          AND pm.SchoolId = ${schoolId} AND pm.PracticeMasterId = ${practicemasterid}
                          limit ${query.limit} offset ${query.skip}` 
              }

          }

          console.log('Query', search_query);
          pool.query(search_query, function(err,data)
            {        
            if(err) {
                response = { status: 401, success: false, error: "Error fetching data." + err};
            }
            else if(data.length==0) {
                response = {status:200,success:true,Message:"No Data Found."};
            } 
            else {
              var totalPages = Math.ceil(totalCount / size);      
              console.log(totalPages +" : "+totalCount+" : "+ size); 
              response = { status: 200, success: true, "Message" : "Data Found", "PracticeData":data,"Pages":totalPages,"TotalCount":totalCount[0]}
            }
            res.json(response);
        });
    })
  }
})(req,res,next);
}

//design an api,where getPracticeQuesyionAccordingtoPracticeId
// need to fetch on the basis of teacherId.
module.exports.getPracticeTitleDD = function(req, res, next) 
{  
passport.authenticate('jwt', function(err, user) {
  if (err || !user)
  {
     console.log("Test1")
     console.log("User",err);
     return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var search_query = `select * from practicemaster where StatusId = 1 AND SchoolId = ${user[0].SchoolId}`;
  pool.query(search_query, function(err, title){
              if(err){
                res.json({status:401,success:false, error:"Error"});
              }
              else if(title.length == 0){
                return res.json({status: 200, success: true, message: "No Data Found."});
              }
              else{
                return res.json({status: 200, success: true, message: "Data Found.", title : title});
              } 
          });
})(req, res, next);
}



//----------------------------------------------------------------------------------------------

//------------------------------------------PracticeDetail--------------------------------------
module.exports.insertPracticeDetail = function(req, res, next) 
{
  passport.authenticate('jwt', function(err, user) {
  if (err || !user)
  {
     console.log("Test1")
     console.log("User",err);
     return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var new_practice_detail = new PracticeDetail(req.body);
  //handles null error 
  if(!new_practice_detail.PracticeQuestionType){
    res.json({ status: 401, success: false, error: "Please Provide Question Type." });
  } 
  if(!new_practice_detail.PracticeQuestion){
    res.json({ status: 401, success: false, error: "Please Provide Question." });
  }
  if(!new_practice_detail.AnswerOption1){
    res.json({ status: 401, success: false, error: "Please Provide Answer Option One." });
  } 
  if(!new_practice_detail.AnswerOption2){
    res.json({ status: 401, success: false, error: "Please Provide Answer Option Two." });
  } 
else{
  new_practice_detail.StatusId = 1;
  //new_practice_detail.CreatedById = user[0].SchoolId;
  new_practice_detail.CreatedById = user[0].TeacherId;
  PracticeDetail.createPracticeDetail(new_practice_detail, function(err, practicedetail) {
    if (err){
      res.json({status:200,success:false,message:"Practice Details not saved."});
    }else{
      res.json({status:200,success:true,message:"Practice Details saved successfully."});
    }
    //res.json(testData);
  });
}
})(req, res, next);
}


module.exports.getPracticeQuestionAccToPracticeId = function(req,res, next){
  passport.authenticate('jwt', function(err, user) {

        if (err || !user)
        {
            console.log("Test1")
            console.log("User",err);
            return res.json({ status: 401, success: false, error: "Authentication Fail." });

        }
        else if (user) 
        {    
            if(!req.query.practiceId)
            {
                res.json({ status: 401, success: false, error: "Please Provide PracticeId." });
            }
            else{
              PracticeDetail.getPracticeQuestion(req.query.practiceId, function(err, question){
              if(err){
                res.json({status:401,success:false, error:"Error"});
              }
              else if(question.length == 0){
                return res.json({status: 200, success: true, message: "No Data Found."});
              }
              else{
                return res.json({status: 200, success: true, message: "Data Found.", data : question});
              } 
          });
        }
      }
    })(req,res,next);
  }

// Web Api..

module.exports.updatePracticeDetail = function(req,res,next)
{ 
  passport.authenticate('jwt', function(err, user){
  if (err || !user) 
  {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
  } 
  console.log(req.body);
  var update_detail = new PracticeDetail(req.body);    
  if(!update_detail.PracticeQuestionType){
    res.json({ status: 401, success: false, error: "Please Provide Question Type." });
  } 
  if(!update_detail.PracticeQuestion){
    res.json({ status: 401, success: false, error: "Please Provide Question." });
  }
  if(!update_detail.AnswerOption1){
    res.json({ status: 401, success: false, error: "Please Provide Answer Option One." });
  } 
  if(!update_detail.AnswerOption2){
    res.json({ status: 401, success: false, error: "Please Provide Answer Option Two." });
  } 
  if(!update_detail.StatusId){
    res.json({ status: 401, success: false, error: "Please Provide StatusId." });
  } 
else{
  //update_detail.ModifiedById = user[0].SchoolId;
  update_detail.ModifiedById = user[0].TeacherId;
  update_detail.ModificationDate = new Date();
  PracticeDetail.updatePracticeQuestion(req.body.PracticeDetailId, update_detail, function(err, detail) {
          if(err)
          {
            res.json({status:200,success:false,error:"Data not updated"});
          }
          else
          {
            res.json({status:200,success:true,message:"Practice Detail Updated Successfully."});
          } 
        });
}

  })(req,res,next);
}




//----------------------------------------------------------------------------------------------


//------9thMay 2020
//----------------------------------------Parent Main-----------------------------------------

module.exports.insertParentDetail = function(req, res) {  
  var parent_detail = new ParentMain(req.body);
  //handles null error 
  if(!parent_detail.ParentName){
    //res.status(400).send({ error:true, message: 'Please Provide Parent Name.' });
    res.json({ status: 401, success: false, error: "Please Provide Parent Name." });
  } 
   if(!parent_detail.ParentMobile){
    //res.status(400).send({ error:true, message: 'Please Provide Parent Mobile.' });
    res.json({ status: 401, success: false, error: "Please Provide Parent Mobile." });
  } 
  if(!parent_detail.ParentPassword){
    //res.status(400).send({ error:true, message: 'Please Provide Parent Password.' });
    res.json({ status: 401, success: false, error: "Please Provide Parent Password." });
  } 
  // if(!parent_detail.ParentEmail){
  //   res.status(400).send({ error:true, message: 'Please Provide Parent Email.' });
  // } 
  if(!parent_detail.ParentAddress){
    //res.status(400).send({ error:true, message: 'Please Provide Parent Address.' });
    res.json({ status: 401, success: false, error: "Please Provide Parent Address." });
  } 
  
else{  
  pool.query(`select SchoolId from schoolmaster where SchoolName='Aarambh' and StatusId=1`,function(err,totalCount){
    if(err) {
           //response = {"Error" : true,"Message" : "Error fetching data"}
           response = {status:400,success:false,Error:"Error fetching data."};
    }
else{
  console.log(totalCount)
  ParentMain.createParentDetail(parent_detail, totalCount[0].SchoolId ,function(err, parentdetail) {
    if (err){
                console.log(err)
                     if( err.code=="ER_DUP_ENTRY")
                     {
                        console.log(err.sqlMessage.split(" ")[5])
                        let sqlmsg =err.sqlMessage.split(" ")[5]
                        if(sqlmsg==="'ParentMobile'") {
                        console.log('working')
                      //return res.send({ error: true, Message:"Parent Mobile Already Exists."})
                      return res.json({ status: 401, success: false, error: "Parent Mobile Already Exists." });
                      }
                       if(sqlmsg==="'ParentEmail'") {
                        console.log('Email')
                      //return res.send({ error: true, Message:"Parent Email Already Exists."})
                      return res.json({ status: 401, success: false, error: "Parent Email Already Exists." });
                      } 
                    }
    }else{
            //res.send({error: false,Message : "Details saved successfully."});
            res.json({status:200,success:true,Message:"Parent Details saved successfully."});
    }
    //res.json(testData);
  });
}
  });
}
};


module.exports.getParentById = function(req, res, next) {
console.log("ParentId",req.query.parentId)
 passport.authenticate('jwt', function(err, user) {

        if (err || !user)
        {
            console.log("Test1")
            console.log("User",err);
            return res.json({ status: 401, success: false, error: "Authentication Fail." });

        }
        else if (user) 
        {
            //console.log(user[0].ParentId);
            ParentMain.getParent(req.query.parentId, function(err, parent) {
            if (err){
                res.send(err);
            }
            else if(parent.length == 0){
              return res.json({status: 200, success: true, message: "No Data Found."});
            }
            res.json({status:200,success:true,Message:"Data Found", Parent: parent});
          });
       }
       else{
          return res.json({ status: 422, success: false, error: "Authentication Failed." });
       }
  })(req,res,next);
};

module.exports.updateParentMain = async function(req,res,next)
{ 
  passport.authenticate('jwt', function(err, user){
  if (err || !user) 
  {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  else
  {
    
      var update_parent = new ParentMain(req.body);    
      ParentMain.updateById(user.parent[0].ParentId, update_parent, function(err, student) 
      {
        if(!update_parent.ParentName)
        {
            res.json({ status: 401, success: false, error: "Please Provide Parent Name." });
        }
        if(!update_parent.ParentMobile)
        {
          res.json({ status: 401, success: false, error: "Please Provide Parent Mobile." });
        }
        if(!update_parent.ParentEmail)
        { 
          res.json({ status: 401, success: false, error: "Please Provide Parent Email." });
        }
        if(!update_parent.ParentAddress)
        { 
          res.json({ status: 401, success: false, error: "Please Provide Parent Address." });
        }
        else
        {
          if(err)
          {
             if(err.code=="ER_DUP_ENTRY")
            {
               console.log(err.sqlMessage.split(" ")[5])
               let sqlmsg =err.sqlMessage.split(" ")[5]
               if(sqlmsg==="'ParentMobile'") 
               {
                   return res.json({ status: 401, success: false, error: "Parent Mobile Number Already Exists." });
               }
               if(sqlmsg==="'ParentEmail'") 
               {
                   return res.json({ status: 401, success: false, error: "Parent Email Already Exists." });
               }
             res.json({status:200,success:false,error:"Data not updated"});
          }}
          else
          {
            res.json({status:200,success:true,Message:"Parent Updated Successfully."});
          } 
        }
  });
  }
  
  })(req,res,next);
}


//--------------------------------------------Student Main-----------------------------------------------------------

module.exports.insertStudent = function(req, res, next) {
  console.log("IS Next", 'Test');
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
     var new_student = new StudentMain(req.body);
     //handles null error 
     if(!new_student.StudentName){
            //res.status(400).send({ error:true, message: 'Please Provide Student Name.' });
            res.json({ status: 401, success: false, error: "Please Provide Student Name." });
     }
     
   // else if(!new_student.StudentMobile){
   //          res.status(400).send({ error:true, message: 'Please Provide Student Mobile.' });
   //    }
      else if(!new_student.StudentUsername)
      { 
            //res.status(400).send({ error:true, message: 'Please Provide Student Username.' });
            res.json({ status: 401, success: false, error: "Please Provide Student Username." });
      }
      // else if(!new_student.StudentAddress){
      //       //res.status(400).send({ error:true, message: 'Please Provide Student Address.' });
      //       res.json({ status: 401, success: false, error: "Please Provide Student Address." });
      // }    
      // else if(!new_student.StudentCity){
      //       //res.status(400).send({ error:true, message: 'Please Provide Student City.' });
      //       res.json({ status: 401, success: false, error: "Please Provide Student City." });
      // }        
      else if(!new_student.StudentDOB){
            //res.status(400).send({ error:true, message: 'Please Provide Student Date of Birth.' });
            res.json({ status: 401, success: false, error: "Please Provide Student Date of Birth." });
      }      
      // else if(!new_student.StudentDORegis){
      //       //res.status(400).send({ error:true, message: 'Please Provide Student Date of Registration.' });
      //       res.json({ status: 401, success: false, error: "Please Provide Student Date of Registration." });
      //}         
      else if(!new_student.StudentPassword){
            //res.status(400).send({ error:true, message: 'Please Provide Student Password.' });
            res.json({ status: 401, success: false, error: "Please Provide Student Password." });
      }  
      else if(!new_student.ClassId){
            //res.status(400).send({ error:true, message: 'Please Provide Student Class.' });
            res.json({ status: 401, success: false, error: "Please Provide Student Class." });
      }          
      else
      {
       // var test = user[0].ParentId;
        //console.log("ID", test);
        console.log( "pppppp",user.parent[0].ParentId)
        StudentMain.createStudent(new_student, user.parent[0].ParentId,"Profile-1587386575849.jpg" ,user.parent[0].SchoolId,function(err, student) {
        if (err)
        {
            console.log(err)
            if( err.code=="ER_DUP_ENTRY")
            {
               console.log(err.sqlMessage.split(" ")[5])
               let sqlmsg =err.sqlMessage.split(" ")[5]
               // if(sqlmsg==="'StudentMobile'") 
               // {
               //     console.log('worinign')
               //     //return res.send({ error: true, Message:"Student Mobile Number Already Exists."})
               //     return res.json({ status: 401, success: false, error: "Student Mobile Number Already Exists." });
               // }
               // if(sqlmsg==="'StudentEmail'") 
               // {
               //     console.log('worinign')
               //     //return res.send({ error: true, Message:"Student Email Already Exists."})
               //     return res.json({ status: 401, success: false, error: "Student Email Already Exists." });
               // }
               if(sqlmsg==="'StudentUsername'") 
               {
                   console.log('worinign')
                   //return res.send({ error: true, Message:"Student Username Already Exists."})
                   return res.json({ status: 401, success: false, error: "Student Username Already Exists." });
               }  
          }
      }
      else
      {
            //res.send({error:false,Message : "Student saved successfully."});
            res.send({status:200,success:true,Message:"Student saved successfully"});

      }  
  });
}
})(req, res, next);
}

///////////////////////////////////////////////////////////////////////////





module.exports.getStudentByParentId = function(req, res, next) {
//console.log("ParentId",req.query.parentId)
  passport.authenticate('jwt', function(err, user) {

        if (err || !user) {
            console.log("Test1")
            console.log("User",err);
            return res.json({ status: 401, success: false, error: "Authentication Fail." });

        } 
        else if (user) {
          StudentMain.getStudentById(user.parent[0].ParentId, function(err, studentmain) {
          if (err){
              res.send(err);
          }
          else if(studentmain.length == 0){
            return res.json({status: 200, success: true, message: "No Data Found."});
          }
          res.json({status:200,success:true,message:"Data Found", studentList: studentmain});

        });
           
        } 
        else {
          console.log("Test3")
            return res.json({ status: 422, success: false, error: "Authentication Failed." });
        }

    })(req, res, next);
  }

module.exports.getStudentMainById = function(req, res, next) {
console.log("StudentId",req.query.studentId)
 passport.authenticate('jwt', function(err, user) {

        if (err || !user)
        {
            console.log("Test1")
            console.log("User",err);
            return res.json({ status: 401, success: false, error: "Authentication Fail." });

        }
        else if (user) 
        {
          //user[0].StudentId
            StudentMain.getStudentByStudentId(req.query.studentId, function(err, student) {
            if (err){
                res.send(err);
            }
            // else if(!req.query.studentId){
            //   res.json({ status: 401, success: false, error: "Please Provide Student Id." });
            // }
            else if(student.length == 0){
              return res.json({status: 200, success: true, message: "No Data Found."});
            }
            res.json({status:200,success:true,Message:"Data Found", Student: student});
          });
       }
       else{
          return res.json({ status: 422, success: false, error: "Authentication Failed." });
       }
  })(req,res,next);
};

const profileDIRMain = "./public/profile/";

module.exports.updateStudentMain = async function(req,res,next)
{ 
  passport.authenticate('jwt', function(err, user){
  if (err || !user) 
  {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  if (!req.file) 
  {
        console.log("No file received");
        //res.status(400).send({ error:true, message: 'Please Provide Student Image.' });
        res.json({ status: 401, success: false, error: "Please Provide Student Image." });   
  } 
  else
  {
    try{
         
          var fn = profileDIRMain + req.file.filename;  
          let newfileName = 'Profile-'+ Date.now()+ ".jpg"
           jimp.read(fn, function (err, img) {
           if (err) 
              throw err;
              img.resize(250, 250)            // resize
              .quality(90)                 // set JPEG quality         
              .write( profileDIRMain + newfileName ); // save
              console.log('Resized !!')              
          });  
      var update_student = new StudentMain(req.body,newfileName);    
      StudentMain.updateById(req.body.StudentId, update_student, function(err, student) {
        if(!update_student.StudentName)
        {
            //res.status(400).send({ error:true, message: 'Please Provide Student Name.' }); 
            res.json({ status: 401, success: false, error: "Please Provide Student Name." });
        }
        if(!update_student.StudentGender)
        {
          //res.status(400).send({ error:true, message: 'Please Provide Student Gender' }); 
          res.json({ status: 401, success: false, error: "Please Provide Student Gender." });
        }
        if(!update_student.StudentDOB)
        {
          //res.status(400).send({ error:true, message: 'Please Provide Student Date of Birth' }); 
          res.json({ status: 401, success: false, error: "Please Provide Student Date of Birth." });
        }
        // if(!update_student.StudentAddress)
        // {
        //   //res.status(400).send({ error:true, message: 'Please Provide Student Address' }); 
        //   res.json({ status: 401, success: false, error: "Please Provide Student Address." });
        // }
        else
        {
          if(err)
          {
            //res.send({error:err, Message : "Data not updated."});
            res.json({status:200,success:false,error:"Data not updated"});
          }else
          {
            //res.send({error:false, Message : "Student Updated Successfully."});
            res.json({status:200,success:true,Message:"Student Updated Successfully."});
          } 
        }
  });
  
  }catch(e){ console.log("catch",e);   }
  
  }    

  })(req,res,next);
}

module.exports.getStudentParentData = function(req,res,next){
  //console.log(req);
  passport.authenticate('jwt',function(err, user){
  if (err || !user) 
  {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  else if (user) 
  {
    console.log('Get Student Paraent Data=>',user);
    var studentparentid = user.parent[0].ParentId;
    ParentMain.getParent(studentparentid, function(err, parent) {
     if (err)
     {
                res.send(err);
     }
     else if(parent.length == 0)
     {
              return res.json({status: 200, success: true, message: "No Data Found."});
     }
       res.json({status:200,success:true,Message:"Data Found", Parent: parent});
     });
    }
    else{
          return res.json({ status: 422, success: false, error: "Authentication Failed." });
       }
  })(req,res,next);
}



//----------------------------------New App Login---------------------------------

module.exports.appLoginNew = function(req,res)
{
  var value = req.body.value;  
  var password = req.body.password;
  //var username = req.body.username;
  console.log("Value", value)  
  
  pool.query('SELECT * FROM parentmain WHERE ParentMobile = ? AND StatusId=1',[value], function (error, results, fields) 
{
  {
  if (error) {
    console.log("error ocurred",error);
    res.json({ status: 400, success: false, error: "Invalid Input." });
  }
  else
  {
     console.log('The solution is: ', results);
     console.log('Length', results.length);
     console.log('Password',password);   

   if(results.length > 0)
   {
        console.log("beforeeeeee",results[0].ParentPassword)
        if(passwordHash.verify(password, results[0].ParentPassword))
        //if(results[0].ParentPassword == password)
        {
          var token = "";
          var secret = "";
          secret = { parentmobile: results[0].ParentMobile,type: 'parent', _id: results[0].ParentId, password: results[0].ParentPassword};
                        token = jwt.sign(secret, 'iloveindia', {
                            expiresIn: 31557600000
          });
          console.log("Demo=" + token);
          res.send({
            "status": 200,
            "success": true,
            "isParent": true,
            "Message":"Login Successfull","Data":results,
            "Token": token
            });
        }
        else{
         res.json({ status: 401, success: false, error: "Password Mismatch." });
        }
    } 
    else
    {
   pool.query('SELECT studentmain.*, studentclass.StudentClass FROM studentmain LEFT JOIN studentclass ON (studentmain.ClassId = studentclass.ClassId)  WHERE studentmain.StudentUsername = ? AND studentmain.StatusId=1',[value], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
   res.json({ status: 400, success: false, error: "Invalid Input." }); 
  }
  else{
    console.log('The solution is: ', results);
    if(results.length > 0)
   {     
        if(passwordHash.verify(password, results[0].StudentPassword))
        {
          var themeData;
          console.log("Test")
          var token = "";
          var secret = "";
          
          ClassTheme.getClassThemeByClassId(results[0].ClassId,function(err,themedata){
            if(err){

            }else{
                themeData = themedata;
                console.log("Res",themeData);
            }
          
          secret = { studentusername: results[0].StudentUsername, type: 'student', _id: results[0].StudentId, password: results[0].StudentPassword};
                        token = jwt.sign(secret, 'iloveindia', {
                            expiresIn: 31557600000
          });

          res.send({
            "status": 200,
            "success": true,
            "isParent": false,
            "Message":"Login Successfull", 
            "StudentData": results,
            "ClassTheme": themeData,
            "Token" :token 
            });
          });
        }
        else{
         res.json({ status: 401, success: false, error: "Password Mismatch." });

        }
    } 
    else{
    res.json({ status: 204, success: false, error: "Record does not exists." }); 
    }
  }
  })
  }
  }
}
})
}



/////////////////////////////////////////////////////studentmain login
//----------------------------------New App Login---------------------------------

module.exports.appLoginStudent = function(req,res)
{
  var value = req.body.value;  
  var password = req.body.password;
  //var username = req.body.username;
  console.log("Value", value)  
  
  pool.query('SELECT * FROM studentmain WHERE StudentMobile = ? ',[value], function (error, results, fields) {
  {
  if (error) {
    console.log("error ocurred",error);
    res.json({ status: 400, success: false, error: "Invalid Input." });
  }
  else
  {
     console.log('The solution is: ', results);
     console.log('Length', results.length);
     console.log('Password',password);   

   if(results.length > 0)
   {
        console.log("beforeeeeee",results[0].StudentPassword)
        //console.log("dqwjdqwkd",passwordHash(password))
        if(passwordHash.verify(password, results[0].StudentPassword))
        
        //if(results[0].ParentPassword == password)
        {
          console.log("Test")
          var token = "";
          var secret = "";
          secret = { studentmobile: results[0].StudentMobile,type: 'student', _id: results[0].StudentId, password: results[0].StudentPassword};
                        token = jwt.sign(secret, 'iloveindia', {
                            expiresIn: 31557600000
          });
          console.log("Demo=" + token);
          res.send({
            "status": 200,
            "success": true,
            "isParent": true,
            "Message":"Login Successfull","Data":results,
            "Token": token
            });
        }
        else{
         res.json({ status: 401, success: false, error: "Password Mismatch." });
        }
    } 
   
  }
}
})
}
















//------------------------------Revised existing test api's with authentication-----


module.exports.getTestQuestionAccordingToClassSubjectChapter_New  = function(req, res, next){
passport.authenticate('jwt', function(err, user)
{
  console.log('TEST API', err);
  var ClassId = req.query.ClassId;
  var CourseId = req.query.CourseId;
  var ChapterId = req.query.ChapterId;

  if(!ClassId){
    //res.status(400).send({ error:true, message: 'Please Provide Class.' });
    res.json({status:401,success:false,Message:"Please Provide Class."});

  }
  if(!CourseId){
    //res.status(400).send({ error:true, message: 'Please Provide Course.' });
    res.json({status:401,success:false,Message:"Please Provide Course."});
  }
  if(!ChapterId){
    //res.status(400).send({ error:true, message: 'Please Provide Chapter.' });
   res.json({status:401,success:false,Message:"Please Provide Chapter."}); 
  } 
  else
  {
    TestModule.getTestQuestion(ClassId,CourseId,ChapterId, function(err, data){
     if(err){
          //res.send({error:err,Message : "Error fetching data."});
          res.json({status:400,success:false,Message:"Error fetching data."});
        }else if(data.length == 0){
          res.json({status:200,success:true,Message:"No Data Found."});
        }

      else
      {
          //res.send({error:false,Message : data});
          res.json({status:200,success:true,Message:"Data Found", TestData: data});

      }
    });
  }
})(req, res, next);
}


module.exports.getPracticeQuestionAccordingToClassSubjectChapter_New = function(req,res, next)
{
  passport.authenticate('jwt', function(err, user)
  {
    console.log('Practice API', err);
    var ClassId = req.query.ClassId;
    var CourseId = req.query.CourseId;
    var ChapterId = req.query.ChapterId;

    if(!ClassId){
      //res.status(400).send({ error:true, message: 'Please Provide Class.' });
      res.json({ status: 401, success: false, error: "Please Provide Class." });
    }
    if(!CourseId){
      //res.status(400).send({ error:true, message: 'Please Provide Course.' });
      res.json({ status: 401, success: false, error: "Please Provide Course." });
    }
    if(!ChapterId){
      //res.status(400).send({ error:true, message: 'Please Provide Chapter.' });
      res.json({ status: 401, success: false, error: "Please Provide Chapter." });
    } 
    else{
      PracticeModule.getPracticeQuestion(ClassId,CourseId,ChapterId, function(err, data){
        if(err){
          //res.send({error:err,Message : "Error fetching data."});
          res.json({status:400,success:false,Message:"Error fetching data."});
        }else if(data.length == 0){
          res.json({status:200,success:true,Message:"No Data Found."});
        }
        else{
          //res.send({error:false,Message : data});
          res.json({status:200,success:true,Message:"Data Found", PracticeData: data});
        }
    });
  }
})(req, res, next);
}
//---------------------------------------------------------------------------------



//---------------------------------Feedback New----------------------------------------------------

 module.exports.insertFeedback_New = function(req, res, next) {  
  passport.authenticate('jwt', function(err,user){
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
     }
     console.log("Body",req.body);
     var new_feedback = new FeedbackNew(req.body);
     //handles null error 
     //console.log(user);
     console.log("Feed",new_feedback) 
     if(!new_feedback.Message){
            //res.status(400).send({ error:true, message: 'Please Provide Message.' });
            res.json({ status: 401, success: false, Message: "Please Provide Message." });
     }   
     else
     {
      FeedbackNew.createFeedback(new_feedback, user.school[0].SchoolId,function(err, feedback) {
      if (err){
        res.json({status:401,success:false,Message:"Cannot insert Feedback."});
      }
      else{
        res.json({status:200,success:true,Message:"Feedback saved successfully."});
      }  
     });
    }
  })(req,res,next);
};


//Web Api

module.exports.viewFeedback = function(req, res, next)
{
   passport.authenticate('jwt', function(err,user){
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
     }
     var classId = req.query.classId;
     var page = parseInt(req.query.page)
    var size = parseInt(req.query.size)

  var query = {}
  if(page < 0 || page === 0) {
        //response = {"Error" : true,"Message" : "Invalid page number, should start with 1"};
        response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size
  if(classId){
    search_query = `select count(*) as Total from feedbacknew WHERE StatusId = 1 AND ClassId = ${classId} AND SchoolId = ${user[0].SchoolId}`
   }
   else{
    search_query = `select count(*) as Total from feedbacknew WHERE StatusId = 1 AND SchoolId = ${user[0].SchoolId}`
   }
   
   pool.query(search_query,[classId],function(err,totalCount){
        if(err) {
               //response = {"Error" : true,"Message" : "Error fetching data"}
               response = {status:400,success:false,Error:"Error fetching data."};
        }
     
     FeedbackNew.viewById(user[0].SchoolId, classId, function(err, data){
    if(err) 
    {
      return res.json({status:400,success:false,Error:"Error fetching data" + err});
    } 
    else if(data.length == 0)
    {
      return res.json({status: 200, success : false, message : "No Data Found"});
    }
    else 
    {
       var totalPages = Math.ceil(totalCount / size);
      return res.json({status: 200, success : true, message : "Data Found", "Feedback": data,"Pages":totalPages,"TotalCount":totalCount});
    }
  });
      });
  })(req, res, next);
}


//------------------------------------------------Feedback end-----------------------------------------

//------------------------------------------------New Admin Api-----------------------------------------

module.exports.adminLogin = function(req,res)
{
  var username = req.body.username;  
  var password = req.body.password; 
  //console.log("UN", username);
  //console.log("Password", password);
  pool.query('SELECT * FROM author WHERE (Username = ? AND StatusId = 1)',[username], function (error, results, fields) {
  {
  if (error) {
    console.log("error ocurred",error);
    res.send({status:400,success:false, Error: error})
  }
  else
  { 
   console.log('Result', results); 
   if(results.length > 0)
   {   
        //if(results[0].Password == password)
        if(passwordHash.verify(password, results[0].Password))
        {
          console.log("working")
          var token = "";
          var secret = "";
          secret = { username: req.body.username,type: 'admin', _id: results[0].Id, password: results[0].Password};
                        token = jwt.sign(secret, 'iloveindia', {expiresIn: 31557600000});
          console.log("Demo=" + token);
          res.send({
            "status": 200,
            "success": true,
            "Message":"Login Successfull","Data":results,
            "Token": token
            });
       
        }
        else{
         res.json({ status: 401, success: false, error: "Password Mismatch." });
        }
    }         
    else
    {
      res.json({ status: 401, success: false, error: "Username does not exits." });
    }
  }
  }
});
}


module.exports.getStudentDataNew = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  //console.log("Params",req.params);
  //var data = req.params;
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  //var search = parseInt(req.query.search)
//   const par = JSON.parse(data)
//   console.log = ("Page", par.page);
//   console.log = ("Number", par.number);
  //console.log = ("Search", req.query.search);
  var query = {}
  if(page < 0 || page === 0) {
        //response = {"Error" : true,"Message" : "Invalid page number, should start with 1"};
        response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size
//console.log("Search", req.query.search);
   pool.query("select count(*) as Total from studentmain WHERE StatusId = 1",function(err,totalCount){
        if(err) {
               //response = {"Error" : true,"Message" : "Error fetching data"}
               response = {status:400,success:false,Error:"Error fetching data."};
        }
   //pool.query(`select * from studentmain WHERE StatusId = 1 limit ${query.limit}  offset  ${query.skip} `,function(err,data){
    pool.query(`SELECT * FROM studentmain INNER JOIN parentmain ON studentmain.ParentId = parentmain.ParentId limit ${query.limit} offset ${query.skip}`, function(err,data){
        
            if(err) {
                //response = {"Error" : true,"Message" : "Error fetching data"};
                response = {status:400,success:false,Error:"Error fetching data"};
            } 
            else if(data.length == 0){
              response = {status: 200, success : true, Message : "No Data Found"};
            }
            else {
              var totalPages = Math.ceil(totalCount / size);    
                response = {status: 200, success : true, Message : "Data Found", "StudentList": data,"Pages":totalPages,"TotalCount":totalCount};
            }

            res.json(response);
        });
})
})(req, res, next);
}

module.exports.getStudentCountNew = function(req,res, next)
{
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  pool.query("select count(*) as Total from studentmain WHERE StatusId = 1",function(err,totalCount){
    console.log(totalCount);
        if(err) {
               //response = {"Error" : true,"Message" : "Error fetching data"}
               response = {status:400,success:false,Message:"Error fetching data."};
        }
        else if(totalCount.length == 0){
              response = {status: 200, success : true, Message : "No Data Found"};
        }
        else{
               //response = {"Error" : false,"Message" : totalCount[0]}
               response = {status:400,success: true, Message:"Data Found", Data: totalCount[0]};
        }
        res.json(response);
  });
})(req, res, next);
}


module.exports.getParentList = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {}
  if(pageNo < 0 || pageNo === 0) 
  {
        response = {status:400,success:false,Error:"Invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size

  pool.query("select count(*) as Total from parentmain WHERE StatusId = 1",function(err,totalCount){
    if(err) 
    {
               res.json({status:400,success:false,Error:"Error fetching data."});
    }
   pool.query(`select * from parentmain WHERE StatusId = 1 limit ${query.limit} offset ${query.skip}`,function(err,data){
        
            if(err) {
                //response = {"Error" : true,"Message" : "Error fetching data"};
                res.json({status:400,success:false, Error:"Error fetching data." + err});
            } 
            else if(data.length == 0){
              response = {status: 200, success : true, Message : "No Data Found"};
            }
            else {
              var totalPages = Math.ceil(totalCount / size);              
                response = {status: 200, success : true, Message : "Data Found", "ParentList": data,"Pages":totalPages,"TotalCount":totalCount};
            }
            res.json(response);
        });
})
})(req, res, next);
}


// module.exports.searchStudent = function (req, res, next) { 
// passport.authenticate('jwt', function(err,user)
// {
//   if (err || !user) 
//   {
//     return res.json({ status: 401, success: false, error: "Authentication Fail." });
//   }
//   var pageNo = parseInt(req.query.pageNo)
//   var size = parseInt(req.query.size)
//   var query = {}
//   if(pageNo < 0 || pageNo === 0) {
//         response = {status:400,success:false,Error:"Invalid page number, should start with 1"};
//         return res.json(response)
//   }
//   query.skip = size * (pageNo - 1)
//   query.limit = size
//   var studentname = req.query.studentname;
//   var classId = req.query.ClassId;
//   pool.query("SELECT count(*) as Total FROM studentmain s INNER JOIN parentmain p ON s.ParentId = p.ParentId WHERE s.StudentName = ? AND s.ClassId = ?", [studentname, classId],function(err,totalCount){
//   if(err) {
//                res.json({status:400,success:false,Error:"Error fetching data."});
//    }
//    var search_query;
//    if(studentname){     
//      if(classId){
//         search_query = `SELECT * FROM studentmain s INNER JOIN parentmain p ON s.ParentId = p.ParentId WHERE s.StudentName = ? AND s.ClassId = ? limit ${query.limit} offset ${query.skip}`,[studentname, classId];   
//      }
//      else{
//        search_query = `SELECT * FROM studentmain s INNER JOIN parentmain p ON s.ParentId = p.ParentId WHERE s.ClassId = ? limit ${query.limit} offset ${query.skip}`,[classId];         
//      }
//    }
//    pool.query(search_query,function(err,data){        
//             if(err) {
//                 response = {status:400,success:false,Error:"Error fetching data." + err};
//             } 
//             else if(data.length == 0){
//               response = {status: 200, success : true, Message : "No Data Found"};
//             }
//             else {
//               var totalPages = Math.ceil(totalCount / size);              
//                 response = {status: 200, success : true, Message : "Data Found", "SearchData": data, "Pages":totalPages,"TotalCount":totalCount};
//             }
//             res.json(response);
//         });
// })
// })(req, res, next);
// }


module.exports.getAllClasses = function (req, res, next) {
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, message: "Authentication Fail." });
  }
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {status:400,success:false,message:"Invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size

   pool.query("select count(*) as Total from studentclass WHERE StatusId = 1",function(err,totalCount){
        if(err) {
               res.json({status:400,success:false,message:"Error fetching data."});
        }
   pool.query(`select * from studentclass WHERE StatusId = 1 limit ${query.limit} offset ${query.skip}`,function(err,data){
        
            if(err) {
                res.json({status:400,success:false,Error:"Error fetching data."});
            } 
            else if(data.length == 0){
                response = {status: 200, success : false, message : "No Data Found"};
            }
            else {
              var totalPages = Math.ceil(totalCount / size);              
                //response = {"Error" : false,"Message" : data,"Pages":totalPages,"TotalCount":totalCount};
                response = {status: 200, success : true, message : "Data Found", "ClassData": data, "Pages":totalPages,"TotalCount":totalCount};
            }
            res.json(response);
        });
})
})(req,res,next);
}



//-------------------------------------------------Admin Ends--------------------------------------------



//------------------------------------------------Author----------------------------------------------------

 module.exports.insertAuthor = function(req, res) {  
  // passport.authenticate('jwt', function(err,user){
  //    if (err || !user) 
  //    {
  //       console.log("Test1")
  //       console.log("User",err);
  //       return res.json({ status: 401, success: false, error: "Authentication Fail." });
  //    }
     var author = new Author(req.body);
     //handles null error 
     // if(!new_feedback.Message){
     //        //res.status(400).send({ error:true, message: 'Please Provide Message.' });
     //        res.json({ status: 401, success: false, error: "Please Provide Message." });
     // }   
     // else
     // {
      console.log(req.body.Password);
      Author.createRole(author, function(err, author) {
      if (err){
        res.json({status:401,success:false,error:"Cannot insert" + err});
      }
      else{
        res.json({status:200,success:true,Message:"Author saved successfully."});
      }  
     });
    //}
  //})(req,res,next);
};



//------------------------------------------------Author Ends-------------------------------------------------

///////////////////////////////////////////////////////////School

module.exports.insertSchoolDetail = function(req, res) {  
    var school_detail = new SchoolMaster(req.body);
    console.log(req.body)
    SchoolMaster.createSchoolDetail(school_detail, function(err, memberdetail) {
      if (err){
                  console.log(err)
                       if( err.code=="ER_DUP_ENTRY")
                       {
                        //   console.log(err.sqlMessage.split(" ")[5])
                        //   let sqlmsg =err.sqlMessage.split(" ")[5]
                        //   if(sqlmsg==="'ParentMobile'") {
                        //   console.log('working')
                        // //return res.send({ error: true, Message:"Parent Mobile Already Exists."})
                        // return res.json({ status: 401, success: false, error: "Parent Mobile Already Exists." });
                        // }
                        //  if(sqlmsg==="'ParentEmail'") {
                        //   console.log('Email')
                        // //return res.send({ error: true, Message:"Parent Email Already Exists."})
                        return res.json({ status: 401, success: false, message: "School Detail Already Exists." });
                        
                      }
      }else{
              //res.send({error: false,Message : "Details saved successfully."});
              res.json({status:200,success:true,message:"School Details saved successfully."});
      }
      //res.json(testData);
    });
    };
    

    ////////////////////////////////////////////////////////////////////

//     module.exports.updateSchoolMaster = async function(req,res,next)
// { 
  
    
//       var update_school = new SchoolMaster(req.body);   
//       console.log(update_school) 
//       SchoolMaster.updateById(req.query.schoolId, update_school, function(err, mem) 
//       {
    
//           if(err)
//           {
//              if(err.code=="ER_DUP_ENTRY")
//             {
              
//              res.json({status:200,success:false,error:"Data not updated"});
//             }
//           }
//         else
//           {
//             res.json({status:200,success:true,Message:"School Updated Successfully."});
//           } 
        
//   });(req,res,next)
//   }
  
////////////////////////////////////////////////////


module.exports.updateSchoolMaster = async function(req,res,next)
{ 
  passport.authenticate('jwt', function(err, user){
  if (err || !user) 
  {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
  }
 // console.log(req.file.filename); 
  if (!req.file) 
  {
        console.log("No file received");
        var update_school = new SchoolMaster(req.body);
        update_school.ModificationDate = new Date();
        update_school.ModifiedById = req.query.schoolId;
        SchoolMaster.updateById(req.query.schoolId, update_school, function(err, school) {
          if(!update_school.SchoolName)
          {
              res.json({ status: 401, success: false, message: "Please Provide School Name." });
          }
          if(!update_school.SchoolPhone)
          {
            res.json({ status: 401, success: false, message: "Please Provide SchoolPhone." });
          }
      
          else
          {
            if(err)
            {
             res.json({status:200,success:false,message:"Data not updated"});
            }
            else
            {
              res.json({status:200,success:true,message:"School Updated Successfully."});
            } 
          }
    });
       
  } 
  else
  {
    try{
         
          var fn = schoolDIRS + req.file.filename;  
          let newfileName = 'SL-'+ Date.now()+ ".png"
           jimp.read(fn, function (err, img) {
           if (err) 
              throw err;
              img.resize(250, 250)            // resize
              .quality(100)                 // set JPEG quality         
              .write( schoolDIRS + newfileName ); // save
              console.log('Resized !!')              
          });  
      var update_school = new SchoolMaster(req.body,newfileName);    
      update_school.ModificationDate = new Date();
      update_school.ModifiedById = req.query.schoolId;
      SchoolMaster.updateById(req.query.schoolId, update_school, function(err, school) {
        if(!update_school.SchoolName)
        {
            //res.status(400).send({ error:true, message: 'Please Provide Student Name.' }); 
            res.json({ status: 401, success: false, message: "Please Provide School Name." });
        }
        if(!update_school.SchoolPhone)
        {
          //res.status(400).send({ error:true, message: 'Please Provide Student Gender' }); 
          res.json({ status: 401, success: false, message: "Please Provide SchoolPhone." });
        }
    
        else
        {
          if(err)
          {
            res.json({status:200,success:false,message:"Data not updated"});
          }
          else
          {
            
            res.json({status:200,success:true,message:"School Updated Successfully."});
          } 
        }
  });
  
  }catch(e){ console.log("catch",e);   }
  
  }    

  })(req,res,next);
}

/////////////////////////////////////////////////////////

module.exports.deleteschool = function(req, res) {
    console.log('Data',req.body);  
    SchoolMaster.deleteById(req.query.schoolId, function(err, ress) {
      console.log(req.query.schoolId)
      if (err){
        //res.send(err);
        console.log('ControllerErr',err);
      }
        //res.json(ress);
        res.status(200).send({ status:200,success:true, message: 'School Record Deleted.' }); 
    });
  };
  
  ///////////////////////////////////////////////////////////////


  module.exports.getSchoolList = function (req, res, next) { 
    passport.authenticate('jwt', function(err,user)
    {
      if (err || !user) 
      {
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
      }
      //console.log("Params",req.params);
      //var data = req.params;
      var page = parseInt(req.query.page)
      var size = parseInt(req.query.size)
      var name = req.query.name;
      var status = req.query.status;
      //var search = parseInt(req.query.search)
    //   const par = JSON.parse(data)
    //   console.log = ("Page", par.page);
    //   console.log = ("Number", par.number);
      //console.log = ("Search", req.query.search);
      var query = {}
      if(page < 0 || page === 0) {
            //response = {"Error" : true,"Message" : "Invalid page number, should start with 1"};
            response = {status:400,success:false, message:"Invalid page number, should start with 1"};
            return res.json(response)
      }
      query.skip = size * (page - 1)
      query.limit = size
      var search_query;
      // if(status==1){
      //   if(name)
      //   {
      //     search_query = `SELECT count(*) as Total FROM schoolmaster WHERE 
      //                     SchoolName LIKE '%${name}%' 
      //                     OR SchoolPhone = '${name}' 
      //                     OR SchoolBoard LIKE '%${name}%' AND StatusId = 1  order BY CreationDate DESC limit ${query.limit} offset ${query.skip}`
      //   }
      //   else{
      //     search_query = `SELECT count(*) as Total FROM schoolmaster WHERE StatusId = 1 limit ${query.limit} offset ${query.skip}` 
      //   }
      // }
      //  else{
      //   search_query = `SELECT count(*) as Total FROM schoolmaster WHERE StatusId = 0 limit ${query.limit} offset ${query.skip}` 
      //  }

    if(status){
      if(name){
        search_query = `SELECT count(*) as Total FROM schoolmaster WHERE 
                          StatusId = ${status} AND 
                          SchoolName LIKE '%${name}%' 
                          OR SchoolPhone LIKE '%${name}%' 
                          OR SchoolBoard LIKE '%${name}%' order BY SchoolId DESC`
      }
      else{ 
       search_query = `SELECT count(*) as Total FROM schoolmaster WHERE StatusId = ${status}`
      }
      }
    
    else{
      if(name){
        search_query = `SELECT count(*) as Total FROM schoolmaster WHERE 
                          StatusId = 1 AND 
                          SchoolName LIKE '%${name}%' 
                          OR SchoolPhone LIKE '%${name}%' 
                          OR SchoolBoard LIKE '%${name}%' order BY SchoolId DESC`
      }
      else{
        search_query = `SELECT count(*) as Total FROM schoolmaster WHERE StatusId = 1 
        order BY SchoolId DESC` 
      }
      //search_query = `SELECT count(*) as Total FROM schoolmaster WHERE StatusId = 1` 
     }

        console.log('Count', search_query);
       pool.query(search_query,function(err,totalCount){
            if(err) {
                   //response = {"Error" : true,"Message" : "Error fetching data"}
                   response = {status:400,success:false,Error:"Error fetching data."};
            }
     //   if(status==1){     
     //   if(name)
     //   {

     //      search_query = `SELECT * FROM schoolmaster WHERE 
     //                      SchoolName LIKE '%${name}%' 
     //                      OR SchoolPhone = '${name}' 
     //                      OR SchoolBoard LIKE '%${name}%' AND StatusId = 1  order BY CreationDate DESC limit ${query.limit} offset ${query.skip}`
     //   }
     //   else{
     //    search_query = `SELECT * FROM schoolmaster WHERE StatusId = 1 limit ${query.limit} offset ${query.skip}` 
     //   }
     // }
     // else{
     //  search_query = `SELECT * FROM schoolmaster WHERE StatusId = 0 limit ${query.limit} offset ${query.skip}` 
     // }
    if(status){
      if(name){
        search_query = `SELECT * FROM schoolmaster WHERE
                          StatusId = ${status} AND 
                          SchoolName LIKE '%${name}%' 
                          OR SchoolPhone LIKE '%${name}%' 
                          OR SchoolBoard LIKE '%${name}%' 
                          order BY SchoolId DESC limit ${query.limit} offset ${query.skip}`
      }
      else{  
       search_query = `SELECT * FROM schoolmaster WHERE StatusId = ${status} 
       order BY SchoolId DESC limit ${query.limit} offset ${query.skip}` 
    }
    }
    else{
      if(name){
        search_query = `SELECT * FROM schoolmaster WHERE
                          StatusId = 1 AND
                          SchoolName LIKE '%${name}%' 
                          OR SchoolPhone LIKE '%${name}%' 
                          OR SchoolBoard LIKE '%${name}%' 
                          order BY SchoolId DESC limit ${query.limit} offset ${query.skip}`
      }
      else{  
      search_query = `SELECT * FROM schoolmaster WHERE StatusId = 1 
      order BY SchoolId DESC limit ${query.limit} offset ${query.skip}`  
      }
      
     }


      console.log(search_query);
       //if(name){
        pool.query(search_query,function(err,data){
            
            if(err) {
                console.log(err)
                //response = {"Error" : true,"Message" : "Error fetching data"};
                response = {status:400,success:false,message:"Error fetching data"};
            } 
            else if(data.length == 0){
              response = {status: 200, success : false, message : "No Data Found"};
            }
            else {
              var totalPages = Math.ceil(totalCount / size);    
                response = {status: 200, success : true, message : "Data Found", "StudentList": data,"Pages":totalPages,"TotalCount":totalCount};
            }

            res.json(response);
        });
       //} 

       // else{
       //  pool.query(`SELECT * FROM schoolmaster limit ${query.limit} offset ${query.skip}`, [name],function(err,data){
            
       //      if(err) {
       //          //response = {"Error" : true,"Message" : "Error fetching data"};
       //          response = {status:400,success:false,message:"Error fetching data"};
       //      } 
       //      else if(data.length == 0){
       //        response = {status: 200, success : false, message : "No Data Found"};
       //      }
       //      else {
       //        var totalPages = Math.ceil(totalCount / size);    
       //          response = {status: 200, success : true, message : "Data Found", "StudentList": data,"Pages":totalPages,"TotalCount":totalCount};
       //      }

       //      res.json(response);
       //  });
       // }
      
    })
    })(req, res, next);
    }
    ///////////////////////////////////////////////////////////

    module.exports.getSchools = function(req, res) {
     // console.log("StudentId",req.query.ClassId)  
         pool.query(`select * from schoolmaster where StatusId=1`,function(err, school) {
          if (err){
            res.send({success:false,message:err});
          }
          console.log(school);
          res.json({success:true,message:"Data found",school});
        });
      };



    ///////////////////////////////////////////////////////////

//============================================18.07.2020

module.exports.getStudentListBySchool = function (req, res, next) { 
    passport.authenticate('jwt', function(err,user)
    {
      if (err || !user) 
      {
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
      }

      var page = parseInt(req.query.page)
      var size = parseInt(req.query.size)
      var query = {}
      if(page < 0 || page === 0) {
            response = {status:400,success:false, message:"Invalid page number, should start with 1"};
            return res.json(response)
      }
      query.skip = size * (page - 1)
      query.limit = size

       pool.query("select count(*) as Total from studentmain WHERE SchoolId = ? AND ClassId = ?", [user[0].SchoolId, req.query.classId],function(err,totalCount){
            if(err) {
                   response = {status:400,success:false,Error:"Error fetching data."};
            }
        pool.query(`select * from studentmain WHERE SchoolId = ? AND ClassId = ? limit ${query.limit} offset ${query.skip}`, [user[0].SchoolId, req.query.classId],function(err,data){
            
            if(err) {
                response = {status:400,success:false,message:"Error fetching data" + err};
            } 
            else if(data.length == 0){
              response = {status: 200, success : false, message : "No Data Found"};
            }
            else {
              var totalPages = Math.ceil(totalCount / size); 
                response = {status: 200, success : true, message : "Data Found", "StudentList": data,"Pages":totalPages,"TotalCount":totalCount};
            }

            res.json(response);
        });
      })
    })(req, res, next);
    }





//======================================================================================
module.exports.schoolLogin = function(req,res)
{
  var username = req.body.username;  
  var password = req.body.password; 
  //console.log("UN", username);
  //console.log("Password", password);
  pool.query('SELECT * FROM schoolmaster WHERE Username = ? AND StatusId = 1',[username], function (error, results, fields) {
  {
  if (error) {
    console.log("error ocurred",error);
    res.send({status:400,success:false, message: error})
  }
  else
  { 
   console.log('Result', results); 
   if(results.length > 0)
   {   
        //if(results[0].Password == password)
        if(passwordHash.verify(password, results[0].Password))
        {

          //Need to be done after discussion.

          // // var future = new Date();
          // // future.setDate(future.getDate() + 30);
          // pool.query(`select creationdate from schoolmaster where Username = ? AND StatusId = 1`, [username],function(err, data, fields){
          //   if(err){
          //     console.log(err);
          //   }
          //   else{
          //     console.log('Data',data[0].creationdate);

          //     var diffDate = new Date();
          //     diffDate.setDate(diffDate.getDate());
          //     console.log('Datediff', diffDate)
          //     let d1 = moment(data[0].creationdate);
          //     let d2 = moment(diffDate);

          //     let days = d2.diff(d1, 'days');
          //     console.log(`Difference in days: ${days}`);

          //     var future = new Date();
          //     var createdDD = data[0].creationdate;

          //     if(future > createdDD){
          //       console.log('Account Expire');
          //     }


          //   }
          // });

          //console.log('future Date', future);
          console.log("working")
          var token = "";
          var secret = "";
          secret = { username: req.body.username,type: 'schooladmin', _id: results[0].SchoolId, password: results[0].Password};
                        token = jwt.sign(secret, 'iloveindia', {expiresIn: 31557600000});
          console.log("Demo=" + token);
          res.send({
            "status": 200,
            "success": true,
            "RoleId":'2',
            "Message":"Login Successfull","Data":results,
            "Token": token
            });
       
        }
        else{
         res.json({ status: 401, success: false, message: "Password Mismatch." });
        }
    }        
    else
    {
     // res.json({ status: 401, success: false, error: "Username does not exits." });
     pool.query('SELECT * FROM author WHERE (Username = ? AND StatusId = 1)',[username], function (error, results, fields) {
      {
      if (error) {
        console.log("error ocurred",error);
        res.send({status:400,success:false, message: error})
      }
      else
      { 
       console.log('Result', results); 
       if(results.length > 0)
       {   
            //if(results[0].Password == password)
            if(passwordHash.verify(password, results[0].Password))
            {
              console.log("working")
              var token = "";
              var secret = "";
              secret = { username: req.body.username,type: 'admin', _id: results[0].Id, password: results[0].Password};
                            token = jwt.sign(secret, 'iloveindia', {expiresIn: 31557600000});
              console.log("Demo=" + token);
              res.send({
                "status": 200,
                "RoleId":"1",
                "success": true,
                "Message":"Login Successfull","Data":results,
                "Token": token
                });
           
            }
            else{
             res.json({ status: 401, success: false, message: "Password Mismatch." });
            }
        }         
        else
        {
          //res.json({ status: 401, success: false, message: "Username does not exits." });
          pool.query('SELECT * FROM teacher WHERE (Username = ? AND StatusId = 1)',[username], function (error, results, fields) {
          {
            if (error) 
            {
              console.log("error ocurred",error);
              res.send({status:400,success:false, message: error})
            }
            else
            { 
       console.log('Result', results); 
       if(results.length > 0)
       {   
            //if(results[0].Password == password)
            if(passwordHash.verify(password, results[0].Password))
            {
              console.log("working")
              var token = "";
              var secret = "";
              secret = { username: req.body.username,schoolId: results[0].SchoolId, type: 'teacher', _id: results[0].TeacherId, password: results[0].Password};
                            token = jwt.sign(secret, 'iloveindia', {expiresIn: 31557600000});
              console.log("Demo=" + token);
              res.send({
                "status": 200,
                "RoleId":"3",
                "success": true,
                "Message":"Login Successfull","Data":results,
                "Token": token
                });
           
            }
            else
            {
             res.json({ status: 401, success: false, message: "Password Mismatch." });
            }
        }
        else{
           res.json({ status: 401, success: false, error: "Username does not exits." });
        }
        }
            }
          });
        }
     
    }
  }
  });
}
}
}
});
}


/////////////////////////////////////////////////////////////////////////

// module.exports.insertParent = function(req, res, next) {
//     console.log("IS Next", 'Test');
//     passport.authenticate('jwt',function(err,user)
//     {
//        console.log("IS Next", user);
//        if (err || !user) 
//        {
//           console.log("Test1")
//           console.log("User",err);
//           return res.json({ status: 401, success: false, error: "Authentication Fail." });
//        }
//        var new_parent = new ParentMain(req.body);
//        //handles null error 
//        if(!new_parent.ParentName){
//               //res.status(400).send({ error:true, message: 'Please Provide Student Name.' });
//               res.json({ status: 401, success: false, error: "Please Provide Parent Name." });
//        }
       
//      // else if(!new_student.StudentMobile){
//      //          res.status(400).send({ error:true, message: 'Please Provide Student Mobile.' });
//      //    }
//         else if(!new_parent.ParentMobile)
//         { 
//               //res.status(400).send({ error:true, message: 'Please Provide Student Username.' });
//               res.json({ status: 401, success: false, error: "Please Provide Parent mobile." });
//         }
            
               
//         else if(!new_parent.ParentPassword){
//               //res.status(400).send({ error:true, message: 'Please Provide Student Password.' });
//               res.json({ status: 401, success: false, error: "Please Provide Parent Password." });
//         }  
//         else if(!new_parent.ParentAddress){
//               //res.status(400).send({ error:true, message: 'Please Provide Student Class.' });
//               res.json({ status: 401, success: false, error: "Please Provide parent Address." });
//         }          
//         else
//         {
//           //var test = user[0].schoolId;
//           //console.log("ID", test);
//           console.log("ssssssssssss",user[0]._id)
//           console.log(new_parent)
//           ParentMain.createParentDetail(new_parent, user[0]._id, function(err, res) {
//           if (err)
//           {
//               console.log(err)
//               if( err.code=="ER_DUP_ENTRY")
//               {
                 
//             //     console.log(err.sqlMessage.split(" ")[5])
//             //     let sqlmsg =err.sqlMessage.split(" ")[5]
//             //     if(sqlmsg==="'ParentMobile'") {
//             //     console.log('working')
//             //   //return res.send({ error: true, Message:"Parent Mobile Already Exists."})
//             //   return res.json({ status: 401, success: false, error: "Parent Mobile Already Exists." });
//             //   }
//             //    if(sqlmsg==="'ParentEmail'") {
//             //     console.log('Email')
//             //   //return res.send({ error: true, Message:"Parent Email Already Exists."})
//                  return res.json({ status: 401, success: false, error: "Parent Email Already Exists." });
//               } 
//             //}
//         }
//         else
//         {
//               res.send({error:false,Message : "Parent saved successfully."});
//               //return res.json({success:true,Message:"Parent Details saved successfully."});
  
//         }  
//     });
//   }
//   })(req, res, next);
//   }








/////////////////////////////////////////////////////////////

// module.exports.insertParentDetail = function(req, res) {  
//     var parent_detail = new ParentMain(req.body);
//     //handles null error 
//     if(!parent_detail.ParentName){
//       //res.status(400).send({ error:true, message: 'Please Provide Parent Name.' });
//       res.json({ status: 401, success: false, error: "Please Provide Parent Name." });
//     } 
//      if(!parent_detail.ParentMobile){
//       //res.status(400).send({ error:true, message: 'Please Provide Parent Mobile.' });
//       res.json({ status: 401, success: false, error: "Please Provide Parent Mobile." });
//     } 
//     if(!parent_detail.ParentPassword){
//       //res.status(400).send({ error:true, message: 'Please Provide Parent Password.' });
//       res.json({ status: 401, success: false, error: "Please Provide Parent Password." });
//     } 
//     // if(!parent_detail.ParentEmail){
//     //   res.status(400).send({ error:true, message: 'Please Provide Parent Email.' });
//     // } 
//     if(!parent_detail.ParentAddress){
//       //res.status(400).send({ error:true, message: 'Please Provide Parent Address.' });
//       res.json({ status: 401, success: false, error: "Please Provide Parent Address." });
//     } 
//   else{  
//     ParentMain.createParentDetail(parent_detail, function(err, parentdetail) {
//       if (err){
//                   console.log(err)
//                        if( err.code=="ER_DUP_ENTRY")
//                        {
//                           console.log(err.sqlMessage.split(" ")[5])
//                           let sqlmsg =err.sqlMessage.split(" ")[5]
//                           if(sqlmsg==="'ParentMobile'") {
//                           console.log('working')
//                         //return res.send({ error: true, Message:"Parent Mobile Already Exists."})
//                         return res.json({ status: 401, success: false, error: "Parent Mobile Already Exists." });
//                         }
//                          if(sqlmsg==="'ParentEmail'") {
//                           console.log('Email')
//                         //return res.send({ error: true, Message:"Parent Email Already Exists."})
//                         return res.json({ status: 401, success: false, error: "Parent Email Already Exists." });
//                         } 
//                       }
//       }else{
//               //res.send({error: false,Message : "Details saved successfully."});
//               res.json({status:200,success:true,Message:"Parent Details saved successfully."});
//       }
//       //res.json(testData);
//     });
//   }
//   };
  
  //////////////////////////////////////////////////////

  module.exports.insertParentMaster = function(req, res, next) 
  {
    console.log('Test',req.body)
   passport.authenticate('jwt', function(err, user) 
   {
          if (err || !user)
          {
              console.log("Test1")
              console.log("User",err);
              return res.json({ status: 401, success: false, error: "Authentication Fail." });
          }
          else if (user) 
          { 
            //console.log("Data",req.body.ClassId);
            var new_parent_master = new ParentMain(req.body);
            //handles null error 
            // if(!new_test_master.ClassId){
            //   res.json({ status: 401, success: false, error: "Please Provide Class." });
            // }
            // if(!new_test_master.CourseId){
            //   res.json({ status: 401, success: false, error: "Please Provide Course." });
            // }
            // if(!new_test_master.TopicId){
            //   //res.status(400).send({ error:true, message: 'Please Provide Topic.' });
            //   res.json({ status: 401, success: false, error: "Please Provide Topic." });
            // } 
            // if(!new_test_master.ChapterId){
            //     //res.status(400).send({ error:true, message: 'Please Provide Chapter.' });
            //   res.json({ status: 401, success: false, error: "Please Provide Chapter." });
            // } 
            // if(!new_test_master.TestTitle){
            //     //res.status(400).send({ error:true, message: 'Please Provide Test Title.' });
            //   res.json({ status: 401, success: false, error: "Please Provide Test Title." });
            // }   
            //else
            {  
            //   TestMaster.createTestMaster(new_test_master, function(err, testData) {
            //   if (err){
            //     //res.send({error:err,Message : "Data not saved."});
            //     res.json({status:200,success:false,Message:"Test Details not saved."});
            //   }else{
            //         console.log("Id",testData);
            //         console.log("FN",req.file.filename) 
            //       importTestExcelData2MySQL(testData, req.file.filename)
            //       res.json({status:200,success:true,Message:"Test Details saved successfully."});
                
            //   }
            // });
            indexto = req.query.index
            importTestExcelData12MySQL(req.file.filename,indexto)
             res.json({status:200,success:true,Message:"Details saved successfully."});

          }
      }
    })(req,res,next);
  }
  
  importTestExcelData12MySQL = async function(file){
  
  try{
      console.log(file); 
      if (!file) 
      {
          console.log("No file received");
          res.status(400).send({ error:true,success:false, message: 'Please Upload Excel Sheet.' });         
      } 
      else 
      {    
        try{
          //console.log("myy",indexto)
            var fn = './public/excelsheet/' + file;  
            //res.json({'msg': 'File uploaded/import successfully!', 'file': file});

        //indexto = req.query.index
  
  readXlsxFile(fn).then((rows) => {
      var new_excel = [];
      rows.forEach((element, index) =>{
          if(rows[index] == '1' || rows[index] == '2' || rows[index] == '3'){
  
          }
          else{
            // rows[index][0]=parentId; //PracticeMasterId
            // /rows[index][10] = 1;
            // rows[index][11] = 1;
            // rows[index][12] = null;
           // rows[index][13] = new Date();
            //rows[index][14] = null;
          }
      });
      console.log("heyyy inexing ",rows[indexto][11]);
      //rows[indexto][11] = passwordHash.generate(rows[indexto][11])
      //console.log(rows[indexto][11])
      console.log("Rows",rows.length); 
      var test = rows.slice(1,Number(rows.length));
      console.log("Demo",test.length) //1
      // Remove Header ROW
      //rows.shift();
      //  console.log(rows[5])
      //  this.ParentName = rows[5][10];
      //console.log(this.ParentName)

        
        var parentmain =  {
          "ParentName" :rows[indexto][10],
          "ParentMobile":rows[indexto][3],
          "ParentPassword":(rows[indexto][11]),
          "ParentEmail": rows[indexto][5],
          "ParentAddress": rows[indexto][6],
          "FBToken": "",
          "StatusId": 1,
         // this.SchoolId = parentmain.SchoolId;
          "CreatedById" : 1,
          "ModifiedById": 1,
          "CreationDate" : new Date(),
          "ModificationDate" : new Date()
        }

        ParentMain.createParentDetail(parentmain,function(err,response){
       
        if(err)
        {
          console.log("Error",err);
        }
        else
        {
          console.log('Test',response);
          console.log(response.id)
          
         var data = {
            "StudentName" : rows[indexto][1],
           "StudentGender" : rows[indexto][2],
          "StudentMobile" : rows[indexto][3],
          "StudentUsername" : rows[indexto][1],
            //this.StudentEmail = studentmain.StudentEmail;
            //this.StudentAddress = studentmain.StudentAddress;
            //this.StudentCity = studentmain.StudentCity;
            "StudentDOB" : (rows[indexto][8].split("T"))[0],
            "StudentDORegis" : rows[indexto][9].split("T")[0],
            "StudentPassword" : rows[indexto][11],
            "StudentImage" : rows[indexto][12],
            "ParentId" : response.id,
            "ClassId" : 1,
            //"SchoolId" : studentmain.SchoolId,
            "StatusId" : 1,
            "CreatedById" : 1,
            "ModifiedById" : 1,
            "CreationDate" : new Date(),
            "ModificationDate" : rows[indexto][18].split("T")[0],
          }

          StudentMain.createStudent(data, response.id ,function(err,res){
            if (err)
            {
              console.log("Error",err);
            }
            else{
              console.log("Studenttest",res)
              //return res.json({status:200,success:true,Message:"Test Details saved successfully."});
            }
          })
        }
      });

        
    });
  }catch(e){console.log(e);}
  }
  
  }catch(e){}
  }



////////////////////////////////////////////////////////////




// module.exports.insertParentMasterupdated = function(req, res, next) 
// {
//   console.log('Test',req.body)
//  passport.authenticate('jwt', function(err, user) 
//  {
//         if (err || !user)
//         {
//             console.log("Test1")
//             console.log("User",err);
//             return res.json({ status: 401, success: false, error: "Authentication Fail." });
//         }
//         else if (user) 
//         { 
//           //console.log("Data",req.body.ClassId);
//           var new_parent_master = new ParentMain(req.body);
          
//           {  
//           //   TestMaster.createTestMaster(new_test_master, function(err, testData) {
//           //   if (err){
//           //     //res.send({error:err,Message : "Data not saved."});
//           //     res.json({status:200,success:false,Message:"Test Details not saved."});
//           //   }else{
//           //         console.log("Id",testData);
//           //         console.log("FN",req.file.filename) 
//           //       importTestExcelData2MySQL(testData, req.file.filename)
//           //       res.json({status:200,success:true,Message:"Test Details saved successfully."});
              
//           //   }
//           // });
//           //indexto = req.query.index
//           importTestExcelData2MySQL(req.file.filename)
//           res.json({status:200,success:true,Message:"Details saved successfully."});
//         }
//     }
//   })(req,res,next);
// }

// importTestExcelData2MySQL = async function(file){
// try{
//     console.log(file); 
//     if (!file) 
//     {
//         console.log("No file received");
//         res.status(400).send({ error:true, message: 'Please Upload Excel Sheet.' });         
//     } 
//     else 
//     {    
//       try{
//           var fn = './public/excelsheet/' + file;  
//           //res.json({'msg': 'File uploaded/import successfully!', 'file': file});

//       //indexto = req.query.index

// readXlsxFile(fn).then((rows) => {
//     var new_excel = [];
//    // rows.forEach((element, index) =>{
//         // if(rows[index] == '1' || rows[index] == '2' || rows[index] == '3'){
     
//       for (index =0 ; index <rows.length; index++) {
//         console.log("hey may index ddddddddddd",rows[index][1])
//         // }
//         //else{
//           // rows[index][0]=parentId; //PracticeMasterId
//           // /rows[index][10] = 1;
//           // rows[index][11] = 1;
//           // rows[index][12] = null;
//          // rows[index][13] = new Date();
//           //rows[index][14] = null;
//         //}
//         if (index == 0) {

//         }
//         else{
//         rows[index][11] = passwordHash.generate(rows[index][11])
//       var parentmain =  {
//         "ParentName" :rows[index][10],
//         "ParentMobile":rows[index][3],
//         "ParentPassword":(rows[index][11]),
//         "ParentEmail": rows[index][5],
//         "ParentAddress": rows[index][6],
//         "FBToken": "",
//         "StatusId": 1,
//        // this.SchoolId = parentmain.SchoolId;
//         "CreatedById" : 1,
//         "ModifiedById": 1,
//         "CreationDate" : new Date(),
//         "ModificationDate" : new Date()
//       }

//       ParentMain.createParentDetail(parentmain,function(err,response){
     
//       if(err)
//       {
//         console.log("Error",err);
//       }
//       else
//       {
//         console.log("beforeeeeeeeee",index)
//         console.log('Test',response);
//         console.log("heyindexxxxxxxxxxx",index)
//         console.log(response.id)
//         console.log("afterrrrrrrrrrrr",index)
//         var data = {
//           "StudentName" : rows[index][1],
//          "StudentGender" : rows[index][2],
//         "StudentMobile" : rows[index][3],
//         "StudentUsername" : rows[index][1].concat("123"),
//           //this.StudentEmail = studentmain.StudentEmail;
//           //this.StudentAddress = studentmain.StudentAddress;
//           //this.StudentCity = studentmain.StudentCity;
//           "StudentDOB" : (rows[index][8].split("T"))[0],
//           "StudentDORegis" : rows[index][9].split("T")[0],
//           "StudentPassword" : rows[index][11],
//           "StudentImage" : rows[index][12],
//           "ParentId" : response.id,
//           "ClassId" : 1,
//           //"SchoolId" : studentmain.SchoolId,
//           "StatusId" : 1,
//           "CreatedById" : 1,
//           "ModifiedById" : 1,
//           "CreationDate" : new Date(),
//           "ModificationDate" : rows[index][18].split("T")[0],
//         }
//         console.log(data)
//         StudentMain.createStudent(data, response.id , function(err,res){
//           if (err)
//           {
//             //console.log("errrrrrrrrrrr",StudentName)
//             console.log("Error",err);
            
//           }
//           else{
//             //console.log("noooooooooooooooooooooo",StudentName)
//             console.log("Studenttest",res)
//             if(res.id){

//             }
//             else{
//               console.log("error student entry",err)
//             }
          
//           }
//         })
//       }
//     });


//         }

//     }
//     //);
//     //console.log("heyyy inexing ",rows[index][11]);
//     rows[index][11] = passwordHash.generate(rows[index][11])
//     //console.log(rows[5][11])
//     console.log("Rows",rows.length); 
//     var test = rows.slice(1,Number(rows.length));
//     console.log("Demo",test.length) //1
//     // Remove Header ROW
//     //rows.shift();
//       // console.log(rows[5])
//       // this.ParentName = rows[5][10];
//       // console.log(this.ParentName)

   

      
//   });
// }catch(e){console.log(e);}
// }

// }catch(e){}
// }


///////////////////////////////////////////////////////////////////////////////////////////////

module.exports.getExcelSheetParent = function (req, res) { 

   pool.query(`select * from parentmain WHERE StatusId = 1 AND schoolId = ? `,[req.query.schoolId],function(err,data,fields)
   {        
            
            const jsonData = JSON.parse(JSON.stringify(data));
            console.log(jsonData);

            let workbook = new excel.Workbook()
            let worksheet = workbook.addWorksheet('Parents')

            worksheet.columns = [
              { header: 'Id', key: 'ParentId', width: 10 },
              { header: 'Name', key: 'ParentName', width: 30 },
              { header: 'Mobile', key: 'ParentMobile', width: 30},
              { header: 'Address', key: 'ParentAddress', width: 40}
            ];
        
            worksheet.addRows(jsonData);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=' + 'parent.xlsx');
            return workbook.xlsx.write(res)
            .then(function() {
                  res.status(200).end();
            });

            //  workbook.xlsx.writeFile("public/export/parents.xlsx")
            // .then(function() {
            //   console.log("file saved!");
            //   res.json({"status" : 200, "message" : "File exported"});
            // });

           

        });
}

/////////////////////////////////////////////////////////////////////////////

module.exports.getExcelSheetUsers = function (req, res) { 

  pool.query(`SELECT studentmain.*, parentmain.ParentName, parentmain.ParentMobile FROM studentmain LEFT JOIN parentmain ON (studentmain.ParentId = parentmain.ParentId) WHERE studentmain.schoolId=?`,[req.query.schoolId],function(err,data,fields)
  {        
    //as p, FULL OUTER JOIN studentmain as m  ON (p.parentId = m.parentId )
           console.log(data)
           const jsonData = JSON.parse(JSON.stringify(data));
           console.log(jsonData);

           let workbook = new excel.Workbook()
           let worksheet = workbook.addWorksheet('Parents')

           worksheet.columns = [
             { header: 'Student', key: 'StudentName', width: 10 },
             { header: 'Mobile', key: 'StudentMobile', width: 30 },
             { header: 'Guardian', key: 'ParentName', width: 30},
             { header: 'Guardian Mobile', key: 'ParentMobile', width: 40},
             { header: 'Created Date', key: 'CreationDate', width: 40},
             {header: 'Status', key: 'StatusId', width: 40}
           ];
       
           worksheet.addRows(jsonData);
           res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
           res.setHeader('Content-Disposition', 'attachment; filename=' + 'users.xlsx');

          //   workbook.xlsx.writeFile("public/export/users.xlsx")
          //  .then(function() {
          //    console.log("file saved!");
          //    res.json({"status" : 200, "message" : "File exported"});
          //  });

          return workbook.xlsx.write(res)
          .then(function() {
                res.status(200).end();
          });

           

       });
}

///////////////////////////////////////////////////////////////////


module.exports.updateCredential = async function(req,res,next)
{ 
  passport.authenticate('jwt', function(err, user){
  if (err || !user) 
  {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
  }
  else
  {
    
      var update_school = new SchoolMaster(req.body);
      console.log(req.body)    
      SchoolMaster.updateFirebaseById(req.query.schoolId, update_school, function(err, student) 
      {
        if(!update_school.FirebaseKey)
        {
            res.json({ status: 401, success: false, message: "Please Provide firebase key." });
        }
        if(!update_school.FirebaseSecretKey)
        {
          res.json({ status: 401, success: false, message: "Please Provide secret key." });
        }

        else
        {
          if(err)
          {
             if(err.code=="ER_DUP_ENTRY")
            {
              //  console.log(err.sqlMessage.split(" ")[5])
              //  let sqlmsg =err.sqlMessage.split(" ")[5]
              //  if(sqlmsg==="'ParentMobile'") 
              //  {
              //      return res.json({ status: 401, success: false, error: "Parent Mobile Number Already Exists." });
              //  }
              //  if(sqlmsg==="'ParentEmail'") 
              //  {
              //      return res.json({ status: 401, success: false, error: "Parent Email Already Exists." });
              //  }
             res.json({status:200,success:false,message:"Data not updated"});
          }}
          else
          {
            res.json({status:200,success:true,message:"Credentail Updated Successfully."});
          } 
        }
  });
  }
  
  })(req,res,next);
}

///////////////////////////////////////////////////////////////////////

module.exports.insertTeacher = function(req, res, next) {
  console.log("IS Next", 'Test');
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
     }
     var new_teacher = new Teacher(req.body);
     //handles null error 
     if(!new_teacher.TeacherName){
            //res.status(400).send({ error:true, message: 'Please Provide Student Name.' });
            res.json({ status: 401, success: false, message: "Please Provide Teacher Name." });
     }
     
      else if(!new_teacher.TeacherMobile){
            res.status(400).send({ success:false, message: 'Please Provide Teacher Mobile.' });
      }
      else if(!new_teacher.Username)
      { 
            //res.status(400).send({ error:true, message: 'Please Provide Student Username.' });
            res.json({ status: 401, success: false, message: "Please Provide Username." });
      }
      // else if(!new_student.StudentAddress){
      //       //res.status(400).send({ error:true, message: 'Please Provide Student Address.' });
      //       res.json({ status: 401, success: false, error: "Please Provide Student Address." });
      // }    
      // else if(!new_student.StudentCity){
      //       //res.status(400).send({ error:true, message: 'Please Provide Student City.' });
      //       res.json({ status: 401, success: false, error: "Please Provide Student City." });
      // }        
      else if(!new_teacher.TeacherDOB){
            //res.status(400).send({ error:true, message: 'Please Provide Student Date of Birth.' });
            res.json({ status: 401, success: false, message: "Please Provide Student Date of Birth." });
      }      
     
      else
      {
        var test = user[0].SchoolId;
        console.log("ID", test);

        Teacher.createTeacherDetail(new_teacher, user[0].SchoolId, function(err, student) {
        if (err)
        {
            console.log(err)
            if( err.code=="ER_DUP_ENTRY")
            {
               console.log(err.sqlMessage.split(" ")[5])
               let sqlmsg =err.sqlMessage.split(" ")[5]
               if(sqlmsg==="'TeacherMobile'") 
               {
                   console.log('worinign')
                   //return res.send({ error: true, Message:"Student Mobile Number Already Exists."})
                   return res.json({ status: 401, success: false, message: "Teacher Mobile Number Already Exists." });
               }
               // if(sqlmsg==="'StudentEmail'") 
               // {
               //     console.log('worinign')
               //     //return res.send({ error: true, Message:"Student Email Already Exists."})
               //     return res.json({ status: 401, success: false, error: "Student Email Already Exists." });
               // }
               if(sqlmsg==="'Username'") 
               {
                   console.log('worinign')                   
                   return res.json({ status: 401, success: false, message: " Username Already Exists." });
               }  
          }
      }
      else
      {
            //res.send({error:false,Message : "Student saved successfully."});
            res.send({status:200,success:true,message:"Teacher saved successfully"});

      }  
  });
}
})(req, res, next);
}

////////////////////////////////////////////////////


module.exports.updateTeacher = async function(req,res,next)
{ 
  
    
      var update_teacher = new Teacher(req.body);   
      console.log(update_teacher) 
      Teacher.updateById(req.query.teacherId, update_teacher, function(err, mem) 
      {
    
          if(err)
          {
             if(err.code=="ER_DUP_ENTRY")
            {
              
             res.json({status:200,success:false,message:"Data not updated"});
            }
          }
        else
          {
            res.json({status:200,success:true,message:"Teacher Updated Successfully."});
          } 
        
  });(req,res,next)
  }


/////////////////////////////////////////////////

module.exports.deleteTeacher = function(req, res) {
  console.log('Data',req.body);  
  Teacher.deleteById(req.query.teacherId, function(err, ress) {
    console.log(req.query.teacherId)
    if (err){
      //res.send(err);
      console.log('ControllerErr',err);
    }
      //res.json(ress);
      res.status(200).send({ status:200,success:true, message: 'Teacher Record Deleted.' }); 
  });
};


////////////////////////////////////////////////////////////////////////////

//const profileDIRMain = "./public/profile/";

const schoolDIRS = './public/school/';
module.exports.insertSchool = async function(req,res,next)
{    
passport.authenticate('jwt',function(err,user)
{
   console.log("IS Next", user);
   if (err || !user) 
   {
      console.log("Test1")
      console.log("User",err);
      return res.json({ status: 401, success: false, message: "Authentication Fail." });
   }
    //console.log(req.file.filename); 
    if (!req.file) 
    {
        console.log("No file received");
        res.status(400).send({ success:false, message: 'Please Provide School Image.' });  
       
    } 
    else 
    {       
        try{
         
          var fn = schoolDIRS +req.file.filename;  
          let newfileName = 'SL-'+ Date.now()+ ".png"
          console.log("image",newfileName)
           jimp.read(fn, function (err, img) {
           if (err) 
              throw err;
              img.resize(250, 250)            // resize
              .quality(100)                 // set JPEG quality         
              .write(schoolDIRS + newfileName); // save
              console.log('Resized !!')              
          });  
           var new_school = new SchoolMaster(req.body,newfileName);  
           new_school.StatusId = 1;
          new_school.CreatedById = user[0].Id;
          SchoolMaster.createSchoolDetail(new_school, function(err, course) {
         if(!new_school.SchoolName){
            res.status(400).send({ success:false, message: 'Please Provide School Name.' });        
          }
          if(!new_school.SchoolPhone){
            res.status(400).send({ success:false, message: 'Please Provide School Phone.' });        
          }
          if(!new_school.SchoolLogo){
            res.status(400).send({ success:false, message: 'Please Provide School Logo.' });  
          }
          else{
            if(err){
              if (err){
                console.log(err)
                     if( err.code=="ER_DUP_ENTRY")
                     {
                      return res.json({ status: 401, success: false, message: "School Detail Already Exists." });
                      
                    }
                    else{
                      res.send({status:401, success:false,message : "Data not updated."});
                    }
    }

            }else{
              
              res.send({status:200, success: true, message : "School added Successfully."});
            }
            // if(course==null){
            //   res.send({error:err,Message:"Class Already contains this Subject."});
            // }
            // else{
            //   res.send({error:err,Message : course.Message});
            //   //res.json(course);
            // }
        }
      });
        }catch(e){ console.log("catch",e);   }
        
    }
  })(req,res,next)
}

//////////////////////////////////////////////////////////////////////

module.exports.getTeacherList = function (req, res, next) { 
  passport.authenticate('jwt', function(err,user)
  {
    if (err || !user) 
    {
      return res.json({ status: 401, success: false, message: "Authentication Fail." });
    }
    //console.log("Params",req.params);
    //var data = req.params;
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    var name = req.query.name;    
    //var search = parseInt(req.query.search)
  //   const par = JSON.parse(data)
  //   console.log = ("Page", par.page);
  //   console.log = ("Number", par.number);
    //console.log = ("Search", req.query.search);
    var query = {}
    if(page < 0 || page === 0) {
          response = {status:400,success:false, message:"Invalid page number, should start with 1"};
          return res.json(response)
    }
    query.skip = size * (page - 1)
    query.limit = size
  //console.log("Search", req.query.search);
     var search_query;
     if(name)
     {
            search_query = `SELECT count(*) as Total FROM teacher 
            WHERE TeacherName LIKE '%${name}%' OR TeacherMobile LIKE '%${name}%'
            AND StatusId = 1 AND SchoolId = ${user[0].SchoolId} `
       
     }
     else{
           search_query = `SELECT count(*) as Total FROM teacher 
           WHERE StatusId = 1 AND SchoolId = ${user[0].SchoolId}`
     }
     console.log('Count', search_query);
     pool.query(search_query,[user[0].SchoolId],function(err,totalCount){
          if(err) {
                 //response = {"Error" : true,"Message" : "Error fetching data"}
                 response = {status:400,success:false,message:"Error fetching data."};
          }
     //pool.query(`select * from studentmain WHERE StatusId = 1 limit ${query.limit}  offset  ${query.skip} `,function(err,data){
     if(name)
     {
             search_query = `SELECT * FROM teacher WHERE TeacherName LIKE '%${name}%' 
             OR TeacherMobile LIKE '%${name}%'
             AND StatusId = 1 AND SchoolId = ${user[0].SchoolId}
             Order By TeacherId DESC
             limit ${query.limit} offset ${query.skip}`
     }
     else
     {
            search_query = `SELECT * FROM teacher WHERE StatusId = 1 
            AND SchoolId = ${user[0].SchoolId} 
            Order By TeacherId DESC
            limit ${query.limit} offset ${query.skip}`      
     }
     console.log('Query', search_query);
      pool.query(search_query, function(err,data){
          
          if(err) {
              console.log(err)
              response = {status:400,success:false,message:"Error fetching data"};
          } 
          else if(data.length == 0){
            response = {status: 200, success : false, message : "No Data Found"};
          }
          else {
            var totalPages = Math.ceil(totalCount / size);    
              response = {status: 200, success : true, message : "Data Found", "TeacherList": data,"Pages":totalPages,"TotalCount":totalCount};
          }

          res.json(response);
      });
    
  })
  })(req, res, next);
  }
  /////////////////////////////////////////////////////

  // module.exports.getTeacherBySchool = function(req, res) {
  //   // console.log("StudentId",req.query.ClassId)  
    
  //      pool.query(`select * from teacher WHERE StatusId = 1 AND SchoolId = ?`,req.query.SchoolId,function(err, teacher) {
  //        console.log(err)
  //       if (err){
  //         res.send(err);
  //       }
  //       console.log(teacher);
  //       res.json(teacher);
  //     });
  //   };


    module.exports.getTeacherBySchool = function(req, res, next) {
      //console.log("ParentId",req.query.parentId)
        passport.authenticate('jwt', function(err, user) {
      
              if (err || !user) {
                  console.log("Test1")
                  console.log("User",err);
                  return res.json({ status: 401, success: false, message: "Authentication Fail." });
      
              } 
              else if (user) {
             
              pool.query(`select * from teacher WHERE StatusId = 1 AND SchoolId = ?`,user[0].SchoolId,function(err, teacher) {
                console.log(err)
               if (err){
                 res.send({success:false,message:err});
               }
               console.log(teacher);
               res.json({success:true,message:"data found",teacher});
             });
          
       
                 
              } 
              else {
                console.log("Test3")
                  return res.json({ status: 422, success: false, message: "Authentication Failed." });
              }
      

          }
          )(req, res, next);
        }
      

  /////////////////////////////////////////////////////

  module.exports.insertParentBySchool = function(req, res, next) {
    console.log("IS Next", 'Test');
    passport.authenticate('jwt',function(err,user)
    {
       console.log("IS Next", user);
       if (err || !user) 
       {
          console.log("Test1")
          console.log("User",err);
          return res.json({ status: 401, success: false, error: "Authentication Fail." });
       }
       var new_parent = new ParentMain(req.body);
       //handles null error 
       if(!new_parent.ParentName){
              //res.status(400).send({ error:true, message: 'Please Provide Student Name.' });
              res.json({ status: 401, success: false, error: "Please Provide Name." });
       }
       
     // else if(!new_student.StudentMobile){
     //          res.status(400).send({ error:true, message: 'Please Provide Student Mobile.' });
     //    }
        // else if(!new_parent.StudentUsername)
        // { 
        //       //res.status(400).send({ error:true, message: 'Please Provide Student Username.' });
        //       res.json({ status: 401, success: false, error: "Please Provide Student Username." });
        // }
        // else if(!new_student.StudentAddress){
        //       //res.status(400).send({ error:true, message: 'Please Provide Student Address.' });
        //       res.json({ status: 401, success: false, error: "Please Provide Student Address." });
        // }    
        // else if(!new_student.StudentCity){
        //       //res.status(400).send({ error:true, message: 'Please Provide Student City.' });
        //       res.json({ status: 401, success: false, error: "Please Provide Student City." });
        // }        
        // else if(!new_student.StudentDOB){
        //       //res.status(400).send({ error:true, message: 'Please Provide Student Date of Birth.' });
        //       res.json({ status: 401, success: false, error: "Please Provide Student Date of Birth." });
        // }      
        // else if(!new_student.StudentDORegis){
        //       //res.status(400).send({ error:true, message: 'Please Provide Student Date of Registration.' });
        //       res.json({ status: 401, success: false, error: "Please Provide Student Date of Registration." });
        // }         
        // else if(!new_student.StudentPassword){
        //       //res.status(400).send({ error:true, message: 'Please Provide Student Password.' });
        //       res.json({ status: 401, success: false, error: "Please Provide Student Password." });
        // }  
        // else if(!new_student.ClassId){
        //       //res.status(400).send({ error:true, message: 'Please Provide Student Class.' });
        //       res.json({ status: 401, success: false, error: "Please Provide Student Class." });
        // }          
        else
        {
          var test = user[0].SchoolId;
          console.log("ID", test);
          ParentMain.createParentDetail(new_parent, user[0].SchoolId, function(err, student) {
          if (err)
          {
              console.log(err)
              if( err.code=="ER_DUP_ENTRY")
              {
                 console.log(err.sqlMessage.split(" ")[5])
                 let sqlmsg =err.sqlMessage.split(" ")[5]
                 if(sqlmsg==="'ParentMobile'") 
                 {
                     console.log('worinign')
                     //return res.send({ error: true, Message:"Student Mobile Number Already Exists."})
                     return res.json({ status: 401, success: false, message: " Mobile Number Already Exists." });
                 }
                 // if(sqlmsg==="'StudentEmail'") 
                 // {
                 //     console.log('worinign')
                 //     //return res.send({ error: true, Message:"Student Email Already Exists."})
                 //     return res.json({ status: 401, success: false, error: "Student Email Already Exists." });
                 // }
                 if(sqlmsg==="'ParentEmail'") 
                 {
                     console.log('worinign')
                     //return res.send({ error: true, Message:"Student Username Already Exists."})
                     return res.json({ status: 401, success: false, message: "Email Already Exists." });
                 } 
            }
        }
        else
        {
              //res.send({error:false,Message : "Student saved successfully."});
              res.send({status:200,success:true,message:"Parent saved successfully"});
  
        }  
    });
  }
  })(req, res, next);
  }


  /////////////////////////////////////////////////

  module.exports.getStudentBySchoolId = function(req, res, next) {
    //console.log("ParentId",req.query.parentId)
      passport.authenticate('jwt', function(err, user) {
    
            if (err || !user) {
                console.log("Test1")
                console.log("User",err);
                return res.json({ status: 401, success: false, error: "Authentication Fail." });
    
            } 
            else if (user) {
              StudentMain.getStudentBySchoolId(req.query.schoolId, function(err, studentmain) {
              if (err){
                  res.send(err);
              }
              else if(studentmain.length == 0){
                return res.json({status: 200, success: true, message: "No Data Found."});
              }
              res.json({status:200,success:true,message:"Data Found", studentList: studentmain});
    
            });
               
            } 
            else {
              console.log("Test3")
                return res.json({ status: 422, success: false, error: "Authentication Failed." });
            }
    
        })(req, res, next);
      }
    

      ////////////////////////////////////////////////////////

      module.exports.insertTimeTable = function(req, res, next) { 
        passport.authenticate('jwt', function(err, user) 
        {
          if (err || !user)
          {
              console.log("Test1")
              console.log("User",err);
              return res.json({ status: 401, success: false, message: "Authentication Fail." });
          }
          else if (user){
            var time_table = new TimeTable(req.body);
            //handles null error 
            if(!time_table.CourseId){
              res.json({ status: 401, success: false, message: "Please Provide CourseId." });
            } 
            if(!time_table.TeacherId){
              res.json({ status: 401, success: false, message: "Please Provide Teacher Id" });
            }
            if(!time_table.StartTime){
              res.json({ status: 401, success: false, message: "Please Provide Start time." });
            } 
            if(!time_table.EndTime){
              res.json({ status: 401, success: false, message: "Please Provide end time" });
            }
            if(!time_table.Day){
              res.json({ status: 401, success: false, message: "Please Provide Day of the week" });
            }
            else{  
            TimeTable.createTimeTable(time_table, user[0].SchoolId,function(err, time) {
              if (err){
                res.json({status:200,success:false,message:"Time table not saved."});
              }else{
                res.json({status:200,success:true,message:"Time table saved successfully."});
              }
            });
          }
          }
        })(req,res,next);
        }
        

        /////////////////////////////////////////////////////////////

        module.exports.updateTimeTableById = function(req, res) {
          console.log('Data',req.body);
          console.log("Id",req.query.timetableid); 
           var update_time = new TimeTable(req.body);
          TimeTable.updateById(req.query.timetableid, update_time, function(err, time) {
            if(!update_time.TeacherId){
                    res.status(400).send({ success:false, message: 'Please Provide Teacher' });
              }   
            else
            //res.json(studentclass);
            res.status(200).send({success:true, message: 'Time table Details Updated Successfully.' });  
          });
        };

        ////////////////////////////////////////////////////////

        module.exports.deletetimetable = function(req, res) {
          console.log('Data',req.body);  
          TimeTable.deleteById(req.query.timetableid, function(err, ress) {
            console.log(req.query.timetableid)
            if (err){
              //res.send(err);
              console.log('ControllerErr',err);
            }
              //res.json(ress);
              res.status(200).send({ status:200,success:true, message: 'Time table Record Deleted.' }); 
          });
        }

        ////////////////////////////////////////////////////////get time table
        module.exports.getTimeTable = function (req, res, next) { 
          passport.authenticate('jwt', function(err,user)
          {
            if (err || !user) 
            {
              return res.json({ status: 401, success: false, message: "Authentication Fail." });
            };
            var page = parseInt(req.query.page)
            var size = parseInt(req.query.size)
            var name = req.query.name
            
            var query = {}
            if(page < 0 || page === 0) {
                  //response = {"Error" : true,"Message" : "Invalid page number, should start with 1"};
                  response = {status:400,success:false, message:"Invalid page number, should start with 1"};
                  return res.json(response)
            }
            query.skip = size * (page - 1)
            query.limit = size
          //console.log("Search", req.query.search);
          var sqlquery;
            if(req.query.class)
            {
               sqlquery = `select count(*) as Total from timetable where 
               ClassId = ${req.query.class} AND SchoolId='${user[0].SchoolId}'`
            }
            else
            {
              sqlquery = `select count(*) as Total from timetable where SchoolId='${user[0].SchoolId}'`
            }
             pool.query(sqlquery,function(err,totalCount){
                  if(err) {
                         //response = {"Error" : true,"Message" : "Error fetching data"}
                         response = {status:400,success:false,Error:"Error fetching data."};
                  }
             //pool.query(`select * from studentmain WHERE StatusId = 1 limit ${query.limit}  offset  ${query.skip} `,function(err,data){
           

            if(req.query.class){
              var sqlquery= `SELECT timetable.*,studentclass.StudentClass,teacher.TeacherName,
                              course.CourseName from timetable 
                              LEFT JOIN studentclass ON (timetable.ClassId = studentclass.ClassId) 
                              LEFT JOIN teacher ON (timetable.TeacherId = teacher.TeacherId) 
                              LEFT JOIN course ON (timetable.CourseId = course.CourseId) 
                              where timetable.ClassId = '${req.query.class}' 
                              and timetable.SchoolId='${user[0].SchoolId}' 
                              Order By timetable.TimeTableId DESC
                              limit ${query.limit}  offset  ${query.skip} `
            }
            else{
              sqlquery = `SELECT timetable.*,studentclass.StudentClass,teacher.TeacherName,course.CourseName from timetable 
                          LEFT JOIN studentclass ON (timetable.ClassId = studentclass.ClassId) 
                          LEFT JOIN teacher ON (timetable.TeacherId = teacher.TeacherId) 
                          LEFT JOIN course ON (timetable.CourseId = course.CourseId) 
                          where timetable.SchoolId='${user[0].SchoolId}' 
                          Order By timetable.TimeTableId DESC
                          limit ${query.limit}  offset  ${query.skip} `
            }
            console.log(sqlquery)
             {
              pool.query(sqlquery,function(err,data){
                  
                  if(err) {
                      console.log(err)
                      //response = {"Error" : true,"Message" : "Error fetching data"};
                      response = {status:400,success:false,message:"Error fetching data"};
                  } 
                  else if(data.length == 0){
                    response = {status: 200, success : false, message : "No Data Found"};
                  }
                  else {
                    var totalPages = Math.ceil(totalCount / size);    
                      response = {status: 200, success : true, message : "Data Found", "TimetableList": data,"Pages":totalPages,"TotalCount":totalCount};
                  }
      
                  res.json(response);
              });
             }       
          })
          })(req, res, next);
          }


////////////////////////////////////////////////////////get time table By Daywise
module.exports.getTimeTableByDay = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, message: "Authentication Fail." });
  };
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
            
  var query = {}
  var search_query;
  var classId = req.query.classId;
  var schoolId = req.query.schoolId;
  var day = req.query.day;
  console.log('User',user.school);

  if(page < 0 || page === 0) {
    response = {status:400,success:false, message:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size
  
  pool.query(`select count(*) as Total from timetable where (SchoolId = ${schoolId} AND Day = ?) AND ClassId = ?`,[day, classId],function(err,totalCount){
  if(err) {
    response = {status:400,success:false,Error:"Error fetching data."};
  }
  //if(req.query.class){
    search_query= `SELECT timetable.*,studentclass.StudentClass,teacher.TeacherName,course.CourseName from timetable 
                   LEFT JOIN studentclass ON (timetable.ClassId = studentclass.ClassId) 
                   LEFT JOIN teacher ON (timetable.TeacherId = teacher.TeacherId) 
                   LEFT JOIN course ON (timetable.CourseId = course.CourseId) 
                   where timetable.ClassId = '${classId}' and timetable.SchoolId = ${schoolId} AND Day = ${day} limit ${query.limit}  offset  ${query.skip}`
            //}
            // else{
            //   sqlquery = `SELECT timetable.*,studentclass.StudentClass,teacher.TeacherName,course.CourseName from timetable 
            //               LEFT JOIN studentclass ON (timetable.ClassId = studentclass.ClassId) 
            //               LEFT JOIN teacher ON (timetable.TeacherId = teacher.TeacherId) 
            //               LEFT JOIN course ON (timetable.CourseId = course.CourseId) 
            //               where timetable.SchoolId='${user[0].SchoolId}' AND Day = $limit ${query.limit}  offset  ${query.skip} `
            //}
            //console.log(sqlquery)
             {
              pool.query(search_query,function(err,data){
                  
                  if(err) {
                      console.log(err)
                      //response = {"Error" : true,"Message" : "Error fetching data"};
                      response = {status:400,success:false,message:"Error fetching data"};
                  } 
                  else if(data.length == 0){
                    response = {status: 200, success : false, message : "No Data Found"};
                  }
                  else {
                    var totalPages = Math.ceil(totalCount / size);    
                      response = {status: 200, success : true, message : "Data Found", "TimetableList": data,"Pages":totalPages,"TotalCount":totalCount};
                  }
      
                  res.json(response);
              });
             }       
          })
          })(req, res, next);
          }


/////////////////////////////////////////////////live link apis

    
module.exports.insertLiveLink = function(req, res, next) { 
  passport.authenticate('jwt', function(err, user) 
  {
    if (err || !user)
    {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
    }
    else if (user){
      var livelink = new Livelink(req.body);
      //handles null error 
      console.log(user);
      if(!livelink.ClassId){
        res.json({ status: 401, success: false, message: "Please Provide class id." });
      } 
      if(!livelink.LiveClass){
        res.json({ status: 401, success: false, message: "Please Provide Live class link" });
      }
      if(!livelink.SchoolId){
        res.json({ status: 401, success: false, message: "Please Provide School Id." });
      }
      else{ 
        livelink.StatusId = 1;
        livelink.CreatedById = user[0].Id;
        livelink.CreationDate = new Date();
      Livelink.insertLink(livelink,function(err, link) {
        if (err){
          res.json({status:200,success:false, message:link.Message});
        }else{
          if(link.Message == "Link is already saved for class"){
            res.json({status:200,success:false,message:link.Message});
          }
          else{
          res.json({status:200,success:true,message:link.Message});
          }
        }
      });
    }
    }
  })(req,res,next);
  }
  

  /////////////////////////////////////////////////////////////

  module.exports.updateLivelinkById = function(req, res, next) {
    console.log('Data',req.body);
 //   console.log("Id",req.query.timetableid); 
 passport.authenticate('jwt', function(err, user) 
  {
    if (err || !user)
    {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
    }
    else if (user){
     var livelink = new Livelink(req.body);
     livelink.ModifiedById = user[0].Id;
     livelink.ModificationDate = new Date;
    Livelink.updateById(req.query.id, livelink, function(err, time) {
      if(!livelink.ClassId){
              res.status(400).send({ success:false, message: 'Please Provide Class id ' });
        }   
      else
      //res.json(studentclass);
      res.status(200).send({success:true, message: 'Live link Details Updated Successfully.' });  
    });
  };
})(req, res, next);
}

  ////////////////////////////////////////////////////////

  module.exports.deletelivelink = function(req, res) {
    console.log('Data',req.body);  
    Livelink.deleteById(req.query.id, function(err, ress) {
      console.log(req.query.id)
      if (err){
        //res.send(err);
        console.log('ControllerErr',err);
      }
        //res.json(ress);
        res.status(200).send({ status:200,success:true, message: 'Live link Record Deleted.' }); 
    });
  }

  ///////////////////////////////////////////////////////////

  // module.exports.getLinkData = function (req, res, next) { 
  //   passport.authenticate('jwt', function(err,user)
  //   {
  //     if (err || !user) 
  //     {
  //       return res.json({ status: 401, success: false, error: "Authentication Fail." });
  //     };
      
  //      {
  //       pool.query(`SELECT * FROM liveclasslink WHERE SchoolId = ?`, [req.query.SchoolId],function(err,data){
            
  //           if(err) {
  //               console.log(err)
  //               //response = {"Error" : true,"Message" : "Error fetching data"};
  //               response = {status:400,success:false,Error:"Error fetching data"};
  //           } 
  //           else if(data.length == 0){
  //             response = {status: 200, success : false, Message : "No Data Found"};
  //           }
  //           else {
  //             //var totalPages = Math.ceil(totalCount / size);    
  //               response = {status: 200, success : true, Message : "Data Found", "LinkData": data};
  //           }
  
  //           res.json(response);
  //       });
  //      }       
  //  // })
  //   })(req, res, next);
  //   }
  
    module.exports.getLinkData = function (req, res, next) { 
      passport.authenticate('jwt', function(err,user)
      {
        if (err || !user) 
        {
          return res.json({ status: 401, success: false, message: "Authentication Fail." });
        };
        var page = parseInt(req.query.page)
        var size = parseInt(req.query.size)
        var name = req.query.name
        
        var query = {}
        if(page < 0 || page === 0) {
              //response = {"Error" : true,"Message" : "Invalid page number, should start with 1"};
              response = {status:400,success:false, message:"Invalid page number, should start with 1"};
              return res.json(response)
        }
        query.skip = size * (page - 1)
        query.limit = size
      //console.log("Search", req.query.search);
         pool.query(`select count(*) as Total from liveclasslink`,function(err,totalCount){
              if(err) {
                     //response = {"Error" : true,"Message" : "Error fetching data"}
                     response = {status:400,success:false,Error:"Error fetching data."};
              }
      
         {
          if(req.query.SchoolId){
            var sqlquery = `SELECT liveclasslink.*, studentclass.StudentClass,schoolmaster.SchoolName FROM liveclasslink LEFT JOIN schoolmaster ON(schoolmaster.SchoolId = liveclasslink.SchoolId) LEFT JOIN studentclass ON(studentclass.ClassId = liveclasslink.ClassId) WHERE liveclasslink.SchoolId = '${req.query.SchoolId}' limit ${query.limit}  offset  ${query.skip}`
          } 
          else{
            sqlquery = `SELECT liveclasslink.*, studentclass.StudentClass,schoolmaster.SchoolName FROM liveclasslink LEFT JOIN schoolmaster ON(schoolmaster.SchoolId = liveclasslink.SchoolId) LEFT JOIN studentclass ON(studentclass.ClassId = liveclasslink.ClassId) limit ${query.limit}  offset  ${query.skip}`
          }
          pool.query(sqlquery,function(err,data){
              
              if(err) {
                  console.log(err)
                  //response = {"Error" : true,"Message" : "Error fetching data"};
                  response = {status:400,success:false,message:"Error fetching data"};
              } 
              else if(data.length == 0){
                response = {status: 200, success : false, message : "No Data Found"};
              }
              else {
                var totalPages = Math.ceil(totalCount / size);    
                  response = {status: 200, success : true, message : "Data Found", "LinkData": data,"Pages":totalPages,"TotalCount":totalCount};
              }
  
              res.json(response);
          });
         }       
      })
      })(req, res, next);
      }








 








        /////////////////////////////////////////////////////

        const request = require('request');
        var youtubeVideo = [];
        var ChannelId = 'UCAfot-yupAQvVqAuZw-Pctg';
        module.exports.callURL = function(req, res, next){
            request({
              url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&key=AIzaSyDFPE3uXcXmik1L9FEDVHuwcA8NiHw0WBk&channelId=${ChannelId}`, method: "GET", json: true, }, function(err, response, json){
            if (err) {
            console.log(err)
            throw err;
          }
          else
          {
            //res.json({data:response})
        
             console.log('JSON',json);
             console.log('Response', response.body.nextPageToken);
           youtubeVideo = youtubeVideo.concat(response.body.items);
           var token = response.body.nextPageToken;
          request({
              url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&key=AIzaSyDFPE3uXcXmik1L9FEDVHuwcA8NiHw0WBk&channelId=UCAfot-yupAQvVqAuZw-Pctg&pageToken=${token}`, method: "GET", json: true, }, function(err, response1, json){
            if (err) {
            console.log(err)
            throw err;
          }
          else
          {
          youtubeVideo = youtubeVideo.concat(response1.body.items);  
          var token = response1.body.nextPageToken;
          console.log('Token2',response1.body.nextPageToken);
          console.log('PrevToken2',response1.body.prevPageToken);
          request({
              url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&key=AIzaSyDFPE3uXcXmik1L9FEDVHuwcA8NiHw0WBk&channelId=UCAfot-yupAQvVqAuZw-Pctg&pageToken=${token}`, method: "GET", json: true, }, function(err, response2, json){
            if (err) {
            console.log(err)
            throw err;
          }
          else{
            //res.json({data:response2})
            youtubeVideo = youtubeVideo.concat(response2.body.items);
            res.json({data: youtubeVideo}); //complete data youtubevideo
            insertYouTubeData(youtubeVideo)
          }
        });
        }
          
        });
        }
        });
        
        
        }
        
        insertYouTubeData = function(youtubevideo)
        {
          let value =[]
            youtubeVideo.forEach((element,i) => {
              let dt=[ 
            
              element.snippet.title.split('_')[0],      
              element.snippet.title.split('_')[1],
              (element.snippet.title.split('_')[3]),
             // (element.snippet.title.split('_')[3]).split(' ')[0],
              element.snippet.title.split('_')[2],
              element.snippet.title.split('_')[2],
              element.snippet.title,
              element.id.videoId,
              element.snippet.description,
              element.snippet.thumbnails.default.url,
              element.StatusId = 1,
              element.CreatedById = 1,
              element.CreationDate = '2020-06-06' ]
        
           value.push(dt)
        
        
            });
            console.log(value,"interted ")
        
            console.log('Data111111111111111111111', value[0][0]);
        
      console.log("value",value)
        
        for(var i=0;i<value.length;i++){
         
         //  let sql = `insert into youtubedetails (ClassId,CourseId,TopicId,ChapterId,Part,VideoTitle,youtubevideoid,youtubeurl,description,thumbnail,StatusId,CreatedById,CreationDate) values
         //  ((select ClassId from studentclass where StudentClass = '${value[i][0]}'),
         // (select CourseId from course where coursename = '${value[i][1]}' and ClassId = (select ClassId from studentclass where StudentClass = '${value[i][0]}') and StatusId=1 ),
         // (select TopicId from topic where topicname = '${value[i][2]}'),
         // (select ChapterId from chapter where chaptername = '${value[i][3]}' and statusid=1 and CourseId= ((select CourseId from course where coursename = '${value[i][1]}' and ClassId = (select ClassId from studentclass where StudentClass = '${value[i][0]}') and StatusId=1 ))),
         // ('${value[i][2]}'),
         // ('${value[i][5]}'),
         // ('${value[i][6]}'),
         // ('${value[i][8]}'),
         // ('${value[i][7]}'),
         // ('${value[i][8]}'),
         // ('${value[i][9]}'),
         // ('${value[i][10]}'),
         // ('${value[i][11]}')
         // ) `

         

        pool.query(sql,function(er,res){
            if(er){
                console.log(er)
            }
            else{
            console.log('Inserted ', res);
            }
        });
        }
        }

        // }
        
        
      //   }
        
        
      

      //////////////////////////////////get token information

      module.exports.getInformation = function(req, res, next) {  
        passport.authenticate('jwt', function(err,user){
           if (err || !user) 
           {
              console.log("Test1")
              console.log("User",err);
              return res.json({ status: 401, success: false, message: "Authentication Fail." });
           }
           
           else
           {
           return res.json({status:200,success:true,message :"Data Found",data:user})
          }
        })(req,res,next);
      };
      

      ///////////////////////////////////////////////////////

      // module.exports.getStudentCourses = function(req,res, next){
      //   passport.authenticate('jwt', function(err, user) {
        
      //           if (err || !user)
      //           {
      //               console.log("Test1")
      //               console.log("User",err);
      //               return res.json({ status: 401, success: false, error: "Authentication Fail." });
        
      //           }
      //           else 
      //           {
      //             pool.query(`select * from course WHERE  StatusId = 1 AND ClassId = '${user.student[0].ClassId}' AND SchoolId = ?`, req.query.SchoolId,function(err, course) {
      //               if (err){
      //                 res.send(err);
      //               }
      //               console.log(course);
      //               res.json(course);
      //             });
      //           }
      //   })(req,res,next);
      //   }

        //////////////////////////////////////////////////////////////////////////

        module.exports.getStudentCourses = function (req, res, next) { 
          passport.authenticate('jwt', function(err,user)
          {
            if (err || !user) 
            {
              return res.json({ status: 401, success: false, message: "Authentication Fail." });
            };
            var page = parseInt(req.query.page)
            var size = parseInt(req.query.size)
            var name = req.query.name
            
            var query = {}
            if(page < 0 || page === 0) {
                  //response = {"Error" : true,"Message" : "Invalid page number, should start with 1"};
                  response = {status:400,success:false, message:"Invalid page number, should start with 1"};
                  return res.json(response)
            }
            query.skip = size * (page - 1)
            query.limit = size
          //console.log("Search", req.query.search);
             pool.query("select count(*) as Total from course ",function(err,totalCount){
                  if(err) {
                         //response = {"Error" : true,"Message" : "Error fetching data"}
                         response = {status:400,success:false,Error:"Error fetching data."};
                  }
             //pool.query(`select * from studentmain WHERE StatusId = 1 limit ${query.limit}  offset  ${query.skip} `,function(err,data){
            // if(name)
             {
              pool.query(`SELECT * FROM course WHERE  StatusId = 1 AND ClassId = '${user.student[0].ClassId}' AND SchoolId = ?  limit ${query.limit}  offset  ${query.skip}`, req.query.SchoolId,function(err,data){
                  
                  if(err) {
                      console.log(err)
                      //response = {"Error" : true,"Message" : "Error fetching data"};
                      response = {status:400,success:false,message:"Error fetching data",Message:"Error fetching data"};
                  } 
                  else if(data.length == 0){
                    response = {status: 200, success : false, message : "No Data Found", Message : "No Data Found"};
                  }
                  else {
                    var totalPages = Math.ceil(totalCount / size);    
                      response = {status: 200, success : true, message : "Data Found",Message:"Data found" ,"TopicList": data,"Pages":totalPages,"TotalCount":totalCount};
                  }
      
                  res.json(response);
              });
             }       
          })
          })(req, res, next);
          }





        //////////////////////////////////////////////////////////////////////////


        module.exports.getStudentTopics = function (req, res, next) { 
          passport.authenticate('jwt', function(err,user)
          {
            if (err || !user) 
            {
              return res.json({ status: 401, success: false, error: "Authentication Fail." });
            };
            var page = parseInt(req.query.page)
            var size = parseInt(req.query.size)
            var name = req.query.name
            
            var query = {}
            if(page < 0 || page === 0) {
                  //response = {"Error" : true,"Message" : "Invalid page number, should start with 1"};
                  response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
                  return res.json(response)
            }
            query.skip = size * (page - 1)
            query.limit = size
          //console.log("Search", req.query.search);
             pool.query("select count(*) as Total from topic where StatusId=1 AND ChapterId= ?",req.query.ChapterId,function(err,totalCount){
                  if(err) {
                         //response = {"Error" : true,"Message" : "Error fetching data"}
                         response = {status:400,success:false,Error:"Error fetching data."};
                  }
             //pool.query(`select * from studentmain WHERE StatusId = 1 limit ${query.limit}  offset  ${query.skip} `,function(err,data){
            // if(name)
             {
              pool.query(`SELECT * FROM topic WHERE  StatusId = 1 AND ClassId = '${user.student[0].ClassId}' AND SchoolId = ? AND ChapterId = ? limit ${query.limit}  offset  ${query.skip}`, [req.query.SchoolId,req.query.ChapterId],function(err,data){
                  
                  if(err) {
                      console.log(err)
                      //response = {"Error" : true,"Message" : "Error fetching data"};
                      response = {status:400,success:false,Error:"Error fetching data"};
                  } 
                  else if(data.length == 0){
                    response = {status: 200, success : true, Message : "No Data Found"};
                  }
                  else {
                    var totalPages = Math.ceil(totalCount / size);    
                      response = {status: 200, success : true, Message : "Data Found", "TopicList": data,"Pages":totalPages,"TotalCount":totalCount};
                  }
      
                  res.json(response);
              });
             }       
          })
          })(req, res, next);
          }


/////////////////////////////////////////////////////////////


module.exports.getStudentChapters = function (req, res, next) { 
  passport.authenticate('jwt', function(err,user)
  {
    if (err || !user) 
    {
      return res.json({ status: 401, success: false, error: "Authentication Fail." });
    };
    var page = parseInt(req.query.page)
    var size = parseInt(req.query.size)
    var name = req.query.name
    
    var query = {}
    if(page < 0 || page === 0) {
          //response = {"Error" : true,"Message" : "Invalid page number, should start with 1"};
          response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
          return res.json(response)
    }
    query.skip = size * (page - 1)
    query.limit = size
  //console.log("Search", req.query.search);
     pool.query("select count(*) as Total from chapter where StatusId =1 AND CourseId = ?",req.query.CourseId,function(err,totalCount){
          if(err) {
                 //response = {"Error" : true,"Message" : "Error fetching data"}
                 response = {status:400,success:false,Error:"Error fetching data."};
          }
     //pool.query(`select * from studentmain WHERE StatusId = 1 limit ${query.limit}  offset  ${query.skip} `,function(err,data){
    // if(name)
     {
      pool.query(`SELECT * FROM chapter WHERE  StatusId = 1 AND ClassId = '${user.student[0].ClassId}' AND SchoolId = ? AND CourseId = ? ORDER BY CAST(SUBSTRING(ChapterName,LOCATE(' ',ChapterName)+1) AS SIGNED) limit ${query.limit}  offset  ${query.skip}`, [req.query.SchoolId,req.query.CourseId],function(err,data){
          
          if(err) {
              console.log(err)
              //response = {"Error" : true,"Message" : "Error fetching data"};
              response = {status:400,success:false,Error:"Error fetching data"};
          } 
          else if(data.length == 0){
            response = {status: 200, success : true, Message : "No Data Found."};
          }
          else {
            var totalPages = Math.ceil(totalCount / size);    
              response = {status: 200, success : true, Message : "Data Found", "ChapterList": data,"Pages":totalPages,"TotalCount":totalCount};
          }

          res.json(response);
      });
     }       
  })
  })(req, res, next);
  }



     //////////////////////////////////////////////////////////////////////


     module.exports.getLiveId = function (req, res, next) { 
      passport.authenticate('jwt', function(err,user)
      {
        if (err || !user) 
        {
          return res.json({ status: 401, success: false, error: "Authentication Fail." });
        };
        
         {
          pool.query(`SELECT * FROM liveclasslink WHERE SchoolId = ? AND ClassId =? `, [req.query.SchoolId,req.query.ClassId],function(err,data){
              
              if(err) {
                  console.log(err)
                  //response = {"Error" : true,"Message" : "Error fetching data"};
                  response = {status:400,success:false,Error:"Error fetching data"};
              } 
              else if(data.length == 0){
                response = {status: 200, success : true, Message : "No Data Found"};
              }
              else {
                //var totalPages = Math.ceil(totalCount / size);    
                  response = {status: 200, success : true, Message : "Data Found", "LinkData": data};
              }
    
              res.json(response);
          });
         }       
     // })
      })(req, res, next);
      }
    
     //////////////////////////////////////////////////////

    //  module.exports.getURL = function (req, res, next) { 
    //   passport.authenticate('jwt', function(err,user)
    //   {
    //     if (err || !user) 
    //     {
    //       return res.json({ status: 401, success: false, error: "Authentication Fail." });
    //     };
        
    //      {
    //       pool.query(`SELECT * FROM youtubedetails WHERE ChapterId =? `, req.query.ChapterId,function(err,data){
              
    //           if(err) {
    //               console.log(err)
    //               //response = {"Error" : true,"Message" : "Error fetching data"};
    //               response = {status:400,success:false,Error:"Error fetching data"};
    //           } 
    //           else if(data.length == 0){
    //             response = {status: 200, success : true, Message : "No Data Found"};
    //           }
    //           else {
    //             //var totalPages = Math.ceil(totalCount / size);    
    //               response = {status: 200, success : true, Message : "Data Found", "URLdata": data};
    //           }
    
    //           res.json(response);
    //       });
    //      }       
    //  // })
    //   })(req, res, next);
    //   }


      ////////////////////////////////////////////////////////////////////////

      module.exports.getURL = function (req, res, next) { 
        passport.authenticate('jwt', function(err,user)
        {
          if (err || !user) 
          {
            return res.json({ status: 401, success: false, error: "Authentication Fail." });
          };
          var page = parseInt(req.query.page)
          var size = parseInt(req.query.size)
          var name = req.query.name
          
          var query = {}
          if(page < 0 || page === 0) {
                //response = {"Error" : true,"Message" : "Invalid page number, should start with 1"};
                response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
                return res.json(response)
          }
          query.skip = size * (page - 1)
          query.limit = size
        //console.log("Search", req.query.search);
           pool.query("select count(*) as Total from youtubedetails where ChapterId=? AND StatusId = 1",req.query.ChapterId,function(err,totalCount){
                if(err) {
                       //response = {"Error" : true,"Message" : "Error fetching data"}
                       response = {status:400,success:false,Error:"Error fetching data."};
                }
           //pool.query(`select * from studentmain WHERE StatusId = 1 limit ${query.limit}  offset  ${query.skip} `,function(err,data){
          // if(name)
           {
            pool.query(`SELECT * FROM youtubedetails WHERE ChapterId = ? AND StatusId = 1 ORDER BY CAST(SUBSTRING(Part,LOCATE(' ',Part)+1) AS SIGNED) limit ${query.limit}  offset  ${query.skip}`, req.query.ChapterId,function(err,data){
                
                if(err) {
                    console.log(err)
                    //response = {"Error" : true,"Message" : "Error fetching data"};
                    response = {status:400,success:false,Error:"Error fetching data"};
                } 
                else if(data.length == 0){
                  response = {status: 200, success : true, Message : "No Data Found"};
                }
                else {
                  var totalPages = Math.ceil(totalCount / size);    
                    response = {status: 200, success : true, Message : "Data Found", "URLdata": data,"Pages":totalPages,"TotalCount":totalCount};
                }
    
                res.json(response);
            });
           }       
        })
        })(req, res, next);
        }

        ////////////////////////////////////////////////////////////////

        module.exports.getCoursesFiltering = function (req, res, next) { 
          passport.authenticate('jwt', function(err,user)
          {
            if (err || !user) 
            {
              return res.json({ status: 401, success: false, message: "Authentication Fail." });
            }
            var page = parseInt(req.query.page)
            var size = parseInt(req.query.size)
            var name = req.query.name
            var status = req.query.status
            var query = {}
            if(page < 0 || page === 0) {
                  response = {status:400,success:false, message:"Invalid page number, should start with 1"};
                  return res.json(response)
            }
            query.skip = size * (page - 1)
            query.limit = size
            
            if(req.query.class)
            {
              if(req.query.name)
              {
                  sqlquery = `SELECT count(*) as Total FROM course WHERE (SchoolId = ${user[0].SchoolId}
                  and ClassId = ${req.query.class} and StatusId = 1 and CourseName LIKE '%${req.query.name}%')`
              }
              else
              {
                 sqlquery = `SELECT count(*) as Total FROM course WHERE ClassId = ${req.query.class} 
                 and SchoolId = ${user[0].SchoolId} and StatusId = 1`
              }
            }
            else
            {
              if(req.query.name)
              {
                 sqlquery = `SELECT count(*) as Total FROM course WHERE CourseName LIKE '%${req.query.name}%' 
                 and SchoolId = ${user[0].SchoolId} and StatusId = 1`
              }
              else
              {
                sqlquery = `SELECT count(*) as Total FROM course 
                            WHERE SchoolId = ${user[0].SchoolId} AND StatusId = 1`
              }
            } 
             
            console.log('Count',sqlquery)
            pool.query(sqlquery,function(err,totalCount)
            {
              console.log('TC', totalCount);
              if(err) 
              {
                     response = {status:400,success:false,message:"Error fetching data."};
              }
              if(req.query.class)
              {
                    if(req.query.name)
                    {
                            sqlquery = `SELECT c.*, sc.StudentClass FROM course as c 
                                        LEFT JOIN studentclass as sc ON (c.ClassId = sc.ClassId) 
                                        WHERE (c.SchoolId = ${user[0].SchoolId}  and c.ClassId = ${req.query.class} and c.StatusId = 1 
                                        and c.CourseName LIKE '%${req.query.name}%') 
                                        ORDER BY CourseId Desc
                                        limit ${query.limit}  offset  ${query.skip}`
                    }
                    else{
                        sqlquery = `SELECT c.*, sc.StudentClass FROM course as c 
                                    LEFT JOIN studentclass as sc ON (c.ClassId = sc.ClassId) 
                                    WHERE (c.SchoolId = ${user[0].SchoolId}  
                                    and c.ClassId = ${req.query.class} and c.StatusId = 1) 
                                    ORDER BY CourseId Desc
                                    limit ${query.limit}  offset  ${query.skip}`
                    }
                  }
                  else{
                  if(req.query.name)
                  {
                            sqlquery = `SELECT c.*, sc.StudentClass FROM course as c 
                                        LEFT JOIN studentclass as sc ON (c.ClassId = sc.ClassId) 
                                        WHERE (c.SchoolId = ${user[0].SchoolId} and c.StatusId = 1
                                        and c.CourseName LIKE '%${req.query.name}%') 
                                        ORDER BY CourseId Desc
                                        limit ${query.limit}  offset  ${query.skip}`

                    
                  }
                  else{
                    //sqlquery = `SELECT * FROM course WHERE SchoolId = '${user[0].SchoolId}' AND StatusId = 1`

                    sqlquery = `SELECT c.*, sc.StudentClass FROM course as c 
                                        LEFT JOIN studentclass as sc ON (c.ClassId = sc.ClassId) 
                                        WHERE (c.SchoolId = ${user[0].SchoolId} and c.StatusId = 1) 
                                        ORDER BY CourseId Desc
                                        limit ${query.limit}  offset  ${query.skip}`
                  }
                  }


             console.log('Total', totalCount);
             console.log(sqlquery )
              pool.query(sqlquery,function(err,data){
                console.log(sqlquery)
                  
                  if(err) {
                    //console.log("here is the error")
                    console.log(err)
                      //response = {"Error" : true,"Message" : "Error fetching data"};
                      response = {status:400,success:false,message:"Error fetching data"};
                  } 
                  else if(data.length == 0){
                    response = {status: 200, success : false, message : "No Data Found"};
                  }
                  else {
                    var totalPages = Math.ceil(totalCount / size);    
                      response = {status: 200, success : true, message : "Data Found", "CourseList": data,"Pages":totalPages,"TotalCount":totalCount};
                  }
      
                  res.json(response);
              });

          })
          })(req, res, next);
          }
///////////////////////////////////////////////////////////

// module.exports.getChapterListBySchoolId = function (req, res, next) {
//   passport.authenticate('jwt', function(err,user)
//   {
//     if (err || !user)
//     {
//       return res.json({ status: 401, success: false, error: "Authentication Fail." });
//     }
//     var pageNo = parseInt(req.query.pageNo)
//     var size = parseInt(req.query.size)
//     var query = {}
//     if(pageNo < 0 || pageNo === 0) {
//           response = {status:400,success:false,Error:"Invalid page number, should start with 1"};
//           return res.json(response)
//     }
//     query.skip = size * (pageNo - 1)
//     query.limit = size
//     var chaptername = req.query.chapterName;
//     var classId = req.query.classId;
//     var courseId = req.query.courseId;
//     var statusId = req.query.statusId;
//     var schoolId = user[0].SchoolId;
//     console.log(schoolId);
//   if(chaptername)
//   {
//     if(classId)
//     {
//        if(courseId)
//        {
//           if(statusId)
//           {
//           search_query = `SELECT count(*) as Total FROM chapter WHERE ChapterName like ? AND SchoolId = ? AND (ClassId = ? AND CourseId = ?) AND StatusId = ? limit ${query.limit} offset ${query.skip}`;
//           }
//           else
//           {
//           search_query = `SELECT count(*) as Total FROM chapter WHERE ChapterName like ? AND SchoolId = ? AND (CourseId = ${courseId} AND ClassId = ?) limit ${query.limit} offset ${query.skip}`;
//           }
//       }
//       else
//       {
//          if(statusId)
//          {
//             search_query = `SELECT count(*) as Total FROM chapter WHERE (ChapterName like ? AND SchoolId = ?) AND ClassId = ? AND StatusId = ? limit ${query.limit} offset ${query.skip}`
//         }
//         else{
//         search_query = `SELECT count(*) as Total FROM chapter WHERE (ChapterName like ? AND SchoolId = ?) AND ClassId = ? limit ${query.limit} offset ${query.skip}`
//       }
//     }
//   }
//     else{
//   if(courseId)
//       {
//         search_query = `SELECT count(*) as Total FROM chapter WHERE (ChapterName like ? AND SchoolId = ?) AND CourseId = ? limit ${query.limit} offset ${query.skip}`
//       }
//       if(courseId && statusId)
//       {
//         search_query = `SELECT count(*) as Total FROM chapter WHERE (ChapterName like ? AND SchoolId = ${schoolId}) AND (CourseId = ${courseId} AND StatusId = ${statusId}) limit ${query.limit} offset ${query.skip}`
//       }
//       else{
//       search_query = `SELECT count(*) as Total FROM chapter WHERE (ChapterName like ? AND SchoolId = ?) limit ${query.limit} offset ${query.skip}`
//     }
//   }
//   }
//   else{
//     if(classId)
//     {
//       search_query = `SELECT count(*) as Total FROM chapter WHERE SchoolId = ${schoolId} AND ClassId = ${classId}  limit ${query.limit} offset ${query.skip}`;
//     }
//     else{
//       if(statusId)
//   {
//     search_query = `SELECT * FROM chapter WHERE SchoolId = ${schoolId} AND StatusId = ${statusId}  limit ${query.limit} offset ${query.skip}`;
//   }
// else{

//       search_query = `SELECT count(*) as Total FROM chapter WHERE SchoolId = ${schoolId} limit ${query.limit} offset ${query.skip}`
// }
//     }
//   }
  


  
//   pool.query(search_query,['%'+ chaptername + '%', schoolId, classId, courseId, statusId], function(err,totalCount){
//   if(err){
//       res.json({status:400,success:false,Error:"Error fetching data." + err});
//   }
//   var search_query;
  
//   if(chaptername)
//   {
//     if(classId)
//     {
//        if(courseId)
//        {
//           if(statusId)
//           {
//           search_query = `SELECT * FROM chapter WHERE ChapterName like ? AND SchoolId = ? AND (ClassId = ? AND CourseId = ?) AND StatusId = ? limit ${query.limit} offset ${query.skip}`;
//           }
//           else
//           {
//           search_query = `SELECT * FROM chapter WHERE ChapterName like ? AND SchoolId = ? AND (CourseId = ${courseId} AND ClassId = ?) limit ${query.limit} offset ${query.skip}`;
//           }
//       }
//       else
//       {
//         if(statusId){
//             search_query = `SELECT * FROM chapter WHERE (ChapterName like ? AND SchoolId = ?) AND ClassId = ? AND StatusId = ? limit ${query.limit} offset ${query.skip}`
//         }
//         else{
//         search_query = `SELECT * FROM chapter WHERE (ChapterName like ? AND SchoolId = ?) AND ClassId = ? limit ${query.limit} offset ${query.skip}`
//       }
//       }
//     }
//     else{
//       if(courseId)
//       {
//         search_query = `SELECT * FROM chapter WHERE (ChapterName like ? AND SchoolId = ?) AND CourseId = ? limit ${query.limit} offset ${query.skip}`
//       }
//       if(courseId && statusId)
//       {
//         search_query = `SELECT * FROM chapter WHERE (ChapterName like ? AND SchoolId = ${schoolId}) AND (CourseId = ${courseId} AND StatusId = ${statusId}) limit ${query.limit} offset ${query.skip}`
//       }
//       else{
//       search_query = `SELECT * FROM chapter WHERE (ChapterName like ? AND SchoolId = ?) limit ${query.limit} offset ${query.skip}`
//     }
//     }
//   }
//   else{
//     console.log('Else ClassId', classId);
//     if(classId)
//     {
//       search_query = `SELECT * FROM chapter WHERE SchoolId = ${schoolId} AND ClassId = ${classId}  limit ${query.limit} offset ${query.skip}`;
//     }
//     else{
//       search_query = `SELECT * FROM chapter WHERE SchoolId = ${schoolId} limit ${query.limit} offset ${query.skip}`
//     }
//   }
  
  
//   pool.query(search_query,['%'+ chaptername + '%', schoolId, classId, courseId, statusId], function(err,data){        
//     if(err){
//         response = {status:400,success:false,Error:"Error fetching data." + err};
//     }
//     else if(data.length == 0)
//     {
//                 console.log(search_query);
//                 response = {status: 200, success : true, Message : "No Data Found"};
//     }
//     else {
//       console.log('test', search_query);
//       var totalPages = Math.ceil(totalCount / size);              
//       response = {status: 200, success : true, Message : "Data Found", "SearchData": data, "Pages":totalPages,"TotalCount":totalCount};
//     }
//     res.json(response);
//   });
//   })
//   })(req, res, next);
//   }

module.exports.getChapterListBySchoolId = function (req, res, next) {
  passport.authenticate('jwt', function(err,user)
  {
    if (err || !user)
    {
      return res.json({ status: 401, success: false, message: "Authentication Fail." });
    }
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if(pageNo < 0 || pageNo === 0) {
          response = {status:400,success:false,message:"Invalid page number, should start with 1"};
          return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    var chaptername = req.query.chapterName;
    var classId = req.query.classId;
    var courseId = req.query.courseId;
    var statusId = req.query.statusId;
    var schoolId = user[0].SchoolId;
  
    console.log('Skip', query.skip);
    console.log('Size', size);
  
  
    console.log(schoolId);
  
  if(chaptername)
  {
    if(classId)
    {
       if(courseId)
       {
          if(statusId)
          {  
            search_query = `SELECT count(*) as Total FROM chapter WHERE ChapterName like ? 
            AND SchoolId = ? AND (ClassId = ? AND CourseId = ?) AND StatusId = ?`
          }
          
          else
          {
          search_query = `SELECT count(*) as Total FROM chapter WHERE ChapterName like ? 
          AND SchoolId = ? AND (ClassId = ? AND CourseId = ?)`;
          }
      }
      else
      {
         if(statusId)
         {
            search_query = `SELECT count(*) as Total FROM chapter WHERE (ChapterName like ? AND SchoolId = ?) 
                            AND ClassId = ? AND StatusId = ?`
        }
        else{
          search_query = `SELECT count(*) as Total FROM chapter WHERE (ChapterName like ? AND SchoolId = ?) 
                          AND ClassId = ?`;
      }
    }
  }
    else
    {
      if(courseId)
      {
        search_query = `SELECT count(*) as Total FROM chapter WHERE (ChapterName like ? AND SchoolId = ?) 
                        AND CourseId = ? `
      }
      if(courseId && statusId)
      {  
        search_query = `SELECT count(*) as Total FROM chapter WHERE (ChapterName like ? 
                        AND SchoolId = ${schoolId}) AND (CourseId = ${courseId} AND StatusId = ${statusId}) `
      }
      else{
      search_query = `SELECT count(*) as Total from chapter WHERE (ChapterName like ? AND SchoolId = ?) `
    }
  }
  }
  else{
    if(classId)
    {
      if(courseId)
      {
          search_query = `SELECT count(*) as Total from chapter WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId}`; 
      }
      else{
          search_query = `SELECT count(*) as Total from chapter WHERE SchoolId = ${schoolId} AND ClassId = ${classId}`;
      }
    }
    // else if(classId && courseId)
    // {
      
    // }
    else if(statusId)
    {    
      search_query = `SELECT count(*) as Total from chapter WHERE SchoolId = ${schoolId} AND StatusId = ${statusId}`;
    }
    else if(courseId)
    {
      search_query = `SELECT count(*) as Total  from chapter WHERE SchoolId = ${schoolId} AND CourseId = ${courseId} `;
    }
    else{
      search_query = `SELECT count(*) as Total  from chapter WHERE SchoolId = ${schoolId} `
  }
  }
  
  pool.query(search_query,['%'+ chaptername + '%', schoolId, classId, courseId, statusId], function(err,totalCount){
  if(err){
      res.json({status:400,success:false,message:"Error fetching data."});
  }
  var search_query;
  console.log('TotalCountAfter Query', totalCount);
  if(chaptername)
  {
    if(classId)
    {
       if(courseId)
       {
          if(statusId)
          {
          search_query = `SELECT ch.*, two.coursename,studentclass.StudentClass,schoolmaster.SchoolName 
                          FROM chapter as ch left join course as two on (ch.courseId = two.CourseId) 
                          LEFT JOIN studentclass ON (ch.ClassId=studentclass.ClassId) 
                          LEFT JOIN schoolmaster ON(ch.SchoolId=schoolmaster.SchoolId) 
                          WHERE ch.ChapterName like ? AND ch.SchoolId = ? 
                          AND (ch.ClassId = ? AND ch.CourseId = ?) AND ch.StatusId = ?
                          Order By ch.ChapterId DESC
                          limit ${query.limit} offset ${query.skip}`;
          }
          else
          {
          search_query = `SELECT ch.*, two.coursename, studentclass.StudentClass,schoolmaster.SchoolName 
                          FROM chapter as ch left join course as two on (ch.courseId = two.CourseId) 
                          LEFT JOIN studentclass ON (ch.ClassId=studentclass.ClassId) 
                          LEFT JOIN schoolmaster ON(ch.SchoolId=schoolmaster.SchoolId) 
                          WHERE ch.ChapterName like ? AND ch.SchoolId = ? AND (ch.CourseId = ${courseId} 
                          AND ch.ClassId = ?) Order By ch.ChapterId DESC
                          limit ${query.limit} offset ${query.skip}`;
          }
      }
      else
      {
        if(statusId){
            search_query = `SELECT ch.*, two.coursename, studentclass.StudentClass, schoolmaster.SchoolName 
                            FROM chapter as ch left join course as two on (ch.courseId = two.CourseId) 
                            LEFT JOIN studentclass ON (ch.ClassId=studentclass.ClassId) 
                            LEFT JOIN schoolmaster ON(ch.SchoolId=schoolmaster.SchoolId) 
                            WHERE (ch.ChapterName like ? AND ch.SchoolId = ?) 
                            AND ch.ClassId = ? AND ch.StatusId = ? 
                            Order By ch.ChapterId DESC
                            limit ${query.limit} offset ${query.skip}`
        }
        else{
          search_query = `SELECT ch.*, two.coursename , studentclass.StudentClass, schoolmaster.SchoolName 
                          FROM chapter as ch left join course as two on (ch.courseId = two.CourseId) 
                          LEFT JOIN studentclass ON (ch.ClassId=studentclass.ClassId) 
                          LEFT JOIN schoolmaster ON(ch.SchoolId=schoolmaster.SchoolId) 
                          WHERE (ch.ChapterName like ? AND ch.SchoolId = ?) 
                          AND ch.ClassId = ? 
                          Order By ch.ChapterId DESC
                          limit ${query.limit} offset ${query.skip}`
      }
  
    }
  }
    else{
      if(courseId)
      {
        search_query = `SELECT ch.*, two.coursename, studentclass.StudentClass, schoolmaster.SchoolName 
                        FROM chapter as ch left join course as two on (ch.courseId = two.CourseId) 
                        LEFT JOIN studentclass ON (ch.ClassId=studentclass.ClassId) 
                        LEFT JOIN schoolmaster ON(ch.SchoolId=schoolmaster.SchoolId) 
                        WHERE (ch.ChapterName like ? AND ch.SchoolId = ${schoolId}) 
                        AND ch.CourseId = ${courseId} 
                        Order By ch.ChapterId DESC
                        limit ${query.limit} offset ${query.skip}`
      }
      else if(courseId && statusId)
      {
        search_query = `SELECT ch.*, two.coursename,studentclass.StudentClass, schoolmaster.SchoolName 
                        FROM chapter as ch left join course as two on (ch.courseId = two.CourseId) 
                        LEFT JOIN studentclass ON (ch.ClassId=studentclass.ClassId) 
                        LEFT JOIN schoolmaster ON(ch.SchoolId=schoolmaster.SchoolId) 
                        WHERE (ch.ChapterName like ? AND ch.SchoolId = ${schoolId}) 
                        AND (ch.CourseId = ${courseId} AND ch.StatusId = ${statusId}) 
                        Order By ch.ChapterId DESC
                        limit ${query.limit} offset ${query.skip}`
      }
      else{
      search_query = `SELECT ch.*, two.coursename, studentclass.StudentClass,schoolmaster.SchoolName 
                      FROM chapter as ch left join course as two on (ch.courseId = two.CourseId) 
                      LEFT JOIN studentclass ON (ch.ClassId=studentclass.ClassId) 
                      LEFT JOIN schoolmaster ON(ch.SchoolId=schoolmaster.SchoolId) 
                      WHERE (ch.ChapterName like ? AND ch.SchoolId = ?) 
                      Order By ch.ChapterId DESC
                      limit ${query.limit} offset ${query.skip}`
    }
    }
  }
  else{
    //console.log('Else ClassId', classId);
    console.log('StatusId', statusId);
    if(classId)
    {
      if(courseId)
      {
        search_query = `SELECT ch.*, two.coursename,studentclass.StudentClass,schoolmaster.SchoolName  
                      FROM chapter as ch left join course as two on (ch.courseId = two.CourseId) 
                      LEFT JOIN studentclass ON (ch.ClassId=studentclass.ClassId) 
                      LEFT JOIN schoolmaster ON(ch.SchoolId=schoolmaster.SchoolId) 
                      WHERE ch.SchoolId = ${schoolId} AND ch.ClassId = ${classId} 
                      AND ch.CourseId = ${courseId} 
                      Order By ch.ChapterId DESC
                      limit ${query.limit} offset ${query.skip}`;
      }
      else
      {
          search_query = `SELECT ch.*, two.coursename,studentclass.StudentClass,schoolmaster.SchoolName  
                      FROM chapter as ch left join course as two on (ch.courseId = two.CourseId) 
                      LEFT JOIN studentclass ON (ch.ClassId=studentclass.ClassId) 
                      LEFT JOIN schoolmaster ON(ch.SchoolId=schoolmaster.SchoolId) 
                      WHERE ch.SchoolId = ${schoolId} AND ch.ClassId = ${classId} 
                      Order By ch.ChapterId DESC
                      limit ${query.limit} offset ${query.skip}`;  
      }
      
    }
    // else if(classId && courseId)
    // {
      
    // }
    else if(statusId)
    {
      search_query = `SELECT ch.*, two.coursename,studentclass.StudentClass, schoolmaster.SchoolName 
                      FROM chapter as ch left join course as two on (ch.courseId = two.CourseId) 
                      LEFT JOIN studentclass ON (ch.ClassId=studentclass.ClassId) 
                      LEFT JOIN schoolmaster ON(ch.SchoolId=schoolmaster.SchoolId) 
                      WHERE ch.SchoolId = ${schoolId} AND ch.StatusId = ${statusId} 
                      Order By ch.ChapterId DESC
                      limit ${query.limit} offset ${query.skip}`;
    }
    else if(courseId)
    {
      search_query = `SELECT ch.*, two.coursename, studentclass.StudentClass,schoolmaster.SchoolName 
                      FROM chapter as ch left join course as two on (ch.courseId = two.CourseId) 
                      LEFT JOIN studentclass ON (ch.ClassId=studentclass.ClassId) 
                      LEFT JOIN schoolmaster ON(ch.SchoolId=schoolmaster.SchoolId) 
                      WHERE ch.SchoolId = ${schoolId} AND ch.CourseId = ${courseId}
                      Order By ch.ChapterId DESC 
                      limit ${query.limit} offset ${query.skip}`;
    }
    else{
      search_query = `SELECT ch.*, two.coursename,studentclass.StudentClass, schoolmaster.SchoolName 
                      FROM chapter as ch left join course as two on (ch.courseId = two.CourseId) 
                      LEFT JOIN studentclass ON (ch.ClassId=studentclass.ClassId) 
                      LEFT JOIN schoolmaster ON(ch.SchoolId=schoolmaster.SchoolId) 
                      WHERE ch.SchoolId = ${schoolId} 
                      Order By ch.ChapterId DESC
                      limit ${query.limit} offset ${query.skip}`
    }
  }
  
  console.log(search_query);
  pool.query(search_query,['%'+ chaptername + '%', schoolId, classId, courseId, statusId], function(err,data){        
    if(err){
        response = {status:400,success:false,message:"Error fetching data." + err};
    }
    else if(data.length == 0)
    {
                console.log(search_query);
                response = {status: 200, success : false, message : "No Data Found"};
    }
    else {
      console.log('test', search_query);
      console.log('totalCountBef', totalCount);
      var totalPages = Math.ceil(totalCount / size);  
      console.log('totalPages', totalPages);
      console.log('totalCount', totalCount);          
      response = {status: 200, success : true, message : "Data Found", "SearchData": data, "Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
  });
  })
  })(req, res, next);
  }
  
  

// module.exports.getTopicListBySchoolId = function (req, res, next) {
//   passport.authenticate('jwt', function(err,user)
//   {
//     if (err || !user)
//     {
//       return res.json({ status: 401, success: false, error: "Authentication Fail." });
//     }
//     var pageNo = parseInt(req.query.pageNo)
//     var size = parseInt(req.query.size)
//     var query = {}
//     if(pageNo < 0 || pageNo === 0) {
//           response = {status:400,success:false,Error:"Invalid page number, should start with 1"};
//           return res.json(response)
//     }
//     query.skip = size * (pageNo - 1)
//     query.limit = size
//     //var topicname = req.query.topicname;
//     var topicname = "\'" + req.query.topicname + "\%'";
//     var classId = req.query.classId;
//     var courseId = req.query.courseId;
//     var chapterId = req.query.chapterId;
//     var statusId = req.query.statusId;
//     var schoolId = user[0].SchoolId;
  
//     //console.log(schoolId);
//     //console.log(topicname);
  
//   if(req.query.topicname)
//   {
//     if(classId)
//     {
//        if(courseId)
//        {
//           if(chapterId)
//           {
//             if(statusId)
//             {
             
//               search_query = `SELECT  count(*) from (select studentclass.StudentClass,topic.*  from topic LEFT JOIN studentclass ON(studentclass.ClassId = topic.ClassId) WHERE (topic.ClassId = ${classId} AND topic.CourseId = ${courseId} AND topic.ChapterId = ${chapterId} AND topic.SchoolId = ${schoolId} AND topic.StatusId = ${statusId} AND topic.TopicName LIKE ${topicname}) limit ${query.limit} offset ${query.skip}) as total`;
//             }
//             else
//             {
//               search_query = `SELECT count(*) as Total from topic WHERE (ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId} AND SchoolId = ${schoolId} AND TopicName LIKE ${topicname}) limit ${query.limit} offset ${query.skip}`;
//             }
//           }
//           else{
//               search_query = `SELECT count(*) as Total from topic WHERE (ClassId = ${classId} AND CourseId = ${courseId} AND SchoolId = ${schoolId} AND TopicName LIKE ${topicname}) limit ${query.limit} offset ${query.skip}`;
//           }
//         }
//       else
//       {
//         if(!chapterId){
//               search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND TopicName LIKE ${topicname} limit ${query.limit} offset ${query.skip}`;
//         }else{
//         search_query = `SELECT count(*) as Total from topic WHERE (ClassId = ? AND ChapterId = ? AND SchoolId = ? AND TopicName LIKE ?) limit ${query.limit} offset ${query.skip}`
//       }
//       }
//     }
//     else{
  
//       search_query = `SELECT count(*) as Total from topic WHERE SchoolId = ${schoolId} AND TopicName LIKE ${topicname} limit ${query.limit} offset ${query.skip}`
//     }
//   }
   
//   else{  
//     //    if(classId)
//     //    {
//     //     search_query = `SELECT count(*) as Total FROM topic WHERE ClassId = ${classId} AND SchoolId = ${schoolId} limit ${query.limit} offset ${query.skip}`;
//     //   }
//     //   else if(courseId){
//     //     search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId} AND CourseId = ${courseId}  limit ${query.limit} offset ${query.skip}`;
//     //   }
//     //   else if(chapterId){
//     //     search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId} AND ChapterId = ${chapterId}  limit ${query.limit} offset ${query.skip}`;
//     // }
//     // if((classId && courseId) && chapterId){
//     //  search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId}  limit ${query.limit} offset ${query.skip}`;
//     // }
//     // if(classId && courseId && chapterId && statusId){
//     //  search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId}  AND StatusId = ${statusId} limit ${query.limit} offset ${query.skip}`;
//     // }
  
//     if(classId)    
//     {
//       if(courseId)
//       {
//         if(chapterId)
//         {
//           if(statusId)
//           {
//               search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId}  AND StatusId = ${statusId} limit ${query.limit} offset ${query.skip}`;
//           }
//           else
//           {
//             search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId} limit ${query.limit} offset ${query.skip}`;
//           }
//         }
//         else
//         {
//           search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId} limit ${query.limit} offset ${query.skip}`;  
//         }
//       }
//       else{
//         search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} limit ${query.limit} offset ${query.skip}`;
//       }
//     }
//     else{
     
//     search_query = `SELECT count(*) as Total from topic WHERE SchoolId = ${schoolId} limit ${query.limit} offset ${query.skip}`
      
//   }
//   }
  
//   pool.query(search_query, function(err,totalCount){
//   if(err){
//       res.json({status:400,success:false,Error:"Error fetching data." + err});
//   }
//   var search_query;
  
//   if(req.query.topicname)  
//   {
//     if(classId)
//     {
//        if(courseId)
//        {
//           if(chapterId)
//           {
//             if(statusId)
//             {
//               search_query = `SELECT * from topic WHERE (ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId} AND SchoolId = ${schoolId} AND StatusId = ${statusId} AND TopicName LIKE ${topicname}) limit ${query.limit} offset ${query.skip}`;
//             }
//             else
//             {
//               search_query = `SELECT * from topic WHERE (ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId} AND SchoolId = ${schoolId} AND TopicName LIKE ${topicname}) limit ${query.limit} offset ${query.skip}`;
//             }
//           }
//           else
//           {
//               search_query = `SELECT * from topic WHERE (ClassId = ${classId} AND CourseId = ${courseId} AND SchoolId = ${schoolId} AND TopicName LIKE ${topicname}) limit ${query.limit} offset ${query.skip}`;
//           }
//         }
//       else
//       {
//          if(!chapterId)
//         {
//               search_query = `SELECT * FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND TopicName LIKE ${topicname} limit ${query.limit} offset ${query.skip}`;
//         }
//         else
//         {
//           search_query = `SELECT * from topic WHERE (ClassId = ? AND ChapterId = ? AND SchoolId = ? AND TopicName LIKE ?) limit ${query.limit} offset ${query.skip}`
//         }
//       }
//     }
//     else{
//       search_query = `SELECT * from topic WHERE SchoolId = ${schoolId} AND TopicName LIKE ${topicname} limit ${query.limit} offset ${query.skip}`
//     }
//   }
  
//   else {
//     // if(classId){
//     //   search_query = `SELECT * FROM topic WHERE ClassId = ${classId} AND SchoolId = ${schoolId} limit ${query.limit} offset ${query.skip}`;
//     // }
//     // if(courseId){
//     //   search_query = `SELECT * FROM topic WHERE SchoolId = ${schoolId} AND CourseId = ${courseId}  limit ${query.limit} offset ${query.skip}`;
//     // }
//     // if(chapterId){
//     //  search_query = `SELECT * FROM topic WHERE SchoolId = ${schoolId} AND ChapterId = ${chapterId}  limit ${query.limit} offset ${query.skip}`;
//     // }
//     // if((classId && courseId) && chapterId){
//     //  search_query = `SELECT * FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId}  limit ${query.limit} offset ${query.skip}`;
//     // }
//     // if(classId && courseId && chapterId && statusId){
//     //  search_query = `SELECT * FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId}  AND StatusId = ${statusId} limit ${query.limit} offset ${query.skip}`;
//     // }
  
//     if(classId)
//     {
//       if(courseId)
//       {
//         if(chapterId)
//         {
//           if(statusId)
//           {
//               search_query = `SELECT * FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId}  AND StatusId = ${statusId} limit ${query.limit} offset ${query.skip}`;
//           }
//           else
//           {
//             search_query = `SELECT * FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId} limit ${query.limit} offset ${query.skip}`;
//           }
//         }
//         else
//         {
//           search_query = `SELECT * FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId} limit ${query.limit} offset ${query.skip}`;  
//         }
//       }
      
//       else{
//         search_query = `SELECT * FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} limit ${query.limit} offset ${query.skip}`;
//       }
//     }
//     else{
//       if(courseId){
//         if(statusId){
//           search_query = `SELECT * from topic WHERE SchoolId = ${schoolId} and CourseId= ${courseId} and statusId = ${statusId} limit ${query.limit} offset ${query.skip}` 
//         }
//         search_query = `SELECT * from topic WHERE SchoolId = ${schoolId} and CourseId= ${courseId} limit ${query.limit} offset ${query.skip}`
//       }

      
//       else{
//         if(statusId)
//       {
//         search_query = `SELECT * from topic WHERE SchoolId = ${schoolId} and statusid = ${statusId} limit ${query.limit} offset ${query.skip}`
//         console.log(search_query)
//       }
        
//         else{
          
//            if(chapterId){
              
//               if(statusId){
//                 search_query = `SELECT * from topic WHERE SchoolId = ${schoolId} and ChapterId= ${chapterId} and statusId = ${statusId} limit ${query.limit} offset ${query.skip}` 
//               }
//               search_query = `SELECT * from topic WHERE SchoolId = ${schoolId} and ChapterId= ${chapterId} limit ${query.limit} offset ${query.skip}`
//             }
            
//             else{
//           search_query = `SELECT * from topic WHERE SchoolId = ${schoolId} order by statusId DESC limit ${query.limit} offset ${query.skip}`
//             }
          
//       }
      
//     }
    
//   }}
  
  
//   pool.query(search_query, function(err,data){        
//     if(err){
//       console.log(search_query)
//         response = {status:400,success:false,Error:"Error fetching data." + err};
//     }
//     else if(data.length == 0)
//     {
//                 console.log(search_query);
//                 response = {status: 200, success : true, Message : "No Data Found"};
//     }
//     else {
//       console.log('test', search_query);
//       var totalPages = Math.ceil(totalCount / size);              
//       response = {status: 200, success : true, Message : "Data Found", "SearchData": data, "Pages":totalPages,"TotalCount":totalCount};
//     }
//     res.json(response);
//   });
//   })
//   })(req, res, next);
//   }

module.exports.getTopicListBySchoolId = function (req, res, next) {
  passport.authenticate('jwt', function(err,user)
  {
    if (err || !user)
    {
      return res.json({ status: 401, success: false, message: "Authentication Fail." });
    }
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if(pageNo < 0 || pageNo === 0) {
          response = {status:400,success:false,message:"Invalid page number, should start with 1"};
          return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    //var topicname = req.query.topicname;
    var topicname = "\'" + req.query.topicname + "\%'";
    var classId = req.query.classId;
    var courseId = req.query.courseId;
    var chapterId = req.query.chapterId;
    var statusId = req.query.statusId;
    var schoolId = user[0].SchoolId;
 
    //console.log(schoolId);
    //console.log(topicname);
 
  if(req.query.topicname)
  {
    if(classId)
    {
       if(courseId)
       {
          if(chapterId)
          {
            if(statusId)
            {
             
              search_query = `SELECT count(*) as Total FROM topic WHERE (ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId} AND SchoolId = ${schoolId} AND TopicName LIKE ${topicname}) AND StatusId = ${statusId}`;
            }
            else
            {
              search_query = `SELECT count(*) as Total FROM topic WHERE (ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId} AND SchoolId = ${schoolId} AND TopicName LIKE ${topicname})`;
            }
          }
          else{
              search_query = `SELECT count(*) as Total FROM topic WHERE (ClassId = ${classId} AND CourseId = ${courseId} AND SchoolId = ${schoolId} AND TopicName LIKE ${topicname})`;
          }
        }
      else
      {
        if(!chapterId){
              search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND TopicName LIKE ${topicname}`;
        }else{
        search_query = `SELECT count(*) as Total FROM topic WHERE (ClassId = ? AND ChapterId = ? AND SchoolId = ? AND TopicName LIKE ?)`
      }
      }
    }
    else{
 
      search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId} AND TopicName LIKE ${topicname}`
    }
  }
   
  else{  
    //    if(classId)
    //    {
    //     search_query = `SELECT count(*) as Total FROM topic WHERE ClassId = ${classId} AND SchoolId = ${schoolId} limit ${query.limit} offset ${query.skip}`;
    //   }
    //   else if(courseId){
    //     search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId} AND CourseId = ${courseId}  limit ${query.limit} offset ${query.skip}`;
    //   }
    //   else if(chapterId){
    //     search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId} AND ChapterId = ${chapterId}  limit ${query.limit} offset ${query.skip}`;
    // }
    // if((classId && courseId) && chapterId){
    //  search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId}  limit ${query.limit} offset ${query.skip}`;
    // }
    // if(classId && courseId && chapterId && statusId){
    //  search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId}  AND StatusId = ${statusId} limit ${query.limit} offset ${query.skip}`;
    // }
 
    if(classId)    
    {
      if(courseId)
      {
        if(chapterId)
        {
          if(statusId)
          {
              search_query = `SELECT count(*) as Total FROM WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId}  AND StatusId = ${statusId}`;
          }
          else
          {
            search_query = `SELECT count(*) as Total FROM WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId}`;
          }
        }
        else
        {
          search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId}`;  
        }
      }
      else{
        search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId}`;
      }
    }
    else{
     
    search_query = `SELECT count(*) as Total FROM topic WHERE SchoolId = ${schoolId}`
     
  }
  }
 
  pool.query(search_query, function(err,totalCount){
  if(err){
      res.json({status:400,success:false,message:"Error fetching data." + err});
  }
  var search_query;
 
  if(req.query.topicname)  
  {
    if(classId)
    {
       if(courseId)
       {
          if(chapterId)
          {
            if(statusId)
            {
              search_query = `SELECT t.*, sc.studentclass, sm.schoolname, c.coursename, ch.chaptername FROM
                          topic t
                          LEFT JOIN studentclass As sc ON t.ClassId = sc.ClassId
                          LEFT JOIN schoolmaster As sm ON t.SchoolId = sm.SchoolId
                          LEFT JOIN course As c ON t.CourseId = c.CourseId
                          LEFT JOIN chapter As ch ON t.ChapterId = ch.ChapterId WHERE (t.ClassId = ${classId} AND t.CourseId = ${courseId} AND t.ChapterId = ${chapterId} AND t.SchoolId = ${schoolId} AND t.StatusId = ${statusId} AND t.TopicName LIKE ${topicname}) limit ${query.limit} offset ${query.skip}`;
            }
            else
            {
              search_query = `SELECT t.*, sc.studentclass, sm.schoolname, c.coursename, ch.chaptername FROM
                          topic t
                          LEFT JOIN studentclass As sc ON t.ClassId = sc.ClassId
                          LEFT JOIN schoolmaster As sm ON t.SchoolId = sm.SchoolId
                          LEFT JOIN course As c ON t.CourseId = c.CourseId
                          LEFT JOIN chapter As ch ON t.ChapterId = ch.ChapterId WHERE (t.ClassId = ${classId} AND t.CourseId = ${courseId} AND t.ChapterId = ${chapterId} AND t.SchoolId = ${schoolId} AND t.TopicName LIKE ${topicname}) limit ${query.limit} offset ${query.skip}`;
            }
          }
          else
          {
              search_query = `SELECT t.*, sc.studentclass, sm.schoolname, c.coursename, ch.chaptername FROM
                          topic t
                          LEFT JOIN studentclass As sc ON t.ClassId = sc.ClassId
                          LEFT JOIN schoolmaster As sm ON t.SchoolId = sm.SchoolId
                          LEFT JOIN course As c ON t.CourseId = c.CourseId
                          LEFT JOIN chapter As ch ON t.ChapterId = ch.ChapterId WHERE (t.ClassId = ${classId} AND t.CourseId = ${courseId} AND t.SchoolId = ${schoolId} AND t.TopicName LIKE ${topicname}) limit ${query.limit} offset ${query.skip}`;
          }
        }
      else
      {
         if(!chapterId)
        {
              search_query = `SELECT t.*, sc.studentclass, sm.schoolname, c.coursename, ch.chaptername FROM
                          topic t
                          LEFT JOIN studentclass As sc ON t.ClassId = sc.ClassId
                          LEFT JOIN schoolmaster As sm ON t.SchoolId = sm.SchoolId
                          LEFT JOIN course As c ON t.CourseId = c.CourseId
                          LEFT JOIN chapter As ch ON t.ChapterId = ch.ChapterId WHERE t.SchoolId = ${schoolId} AND t.ClassId = ${classId} AND t.TopicName LIKE ${topicname} limit ${query.limit} offset ${query.skip}`;
        }
        else
        {
          search_query = `SELECT t.*, sc.studentclass, sm.schoolname, c.coursename, ch.chaptername FROM
                          topic t
                          LEFT JOIN studentclass As sc ON t.ClassId = sc.ClassId
                          LEFT JOIN schoolmaster As sm ON t.SchoolId = sm.SchoolId
                          LEFT JOIN course As c ON t.CourseId = c.CourseId
                          LEFT JOIN chapter As ch ON t.ChapterId = ch.ChapterId WHERE (t.ClassId = ? AND t.ChapterId = ? AND t.SchoolId = ? AND t.TopicName LIKE ?) limit ${query.limit} offset ${query.skip}`
        }
      }
    }
    else{
      search_query = `SELECT t.*, sc.studentclass, sm.schoolname, c.coursename, ch.chaptername FROM
                          topic t
                          LEFT JOIN studentclass As sc ON t.ClassId = sc.ClassId
                          LEFT JOIN schoolmaster As sm ON t.SchoolId = sm.SchoolId
                          LEFT JOIN course As c ON t.CourseId = c.CourseId
                          LEFT JOIN chapter As ch ON t.ChapterId = ch.ChapterId WHERE t.SchoolId = ${schoolId} AND t.TopicName LIKE ${topicname} limit ${query.limit} offset ${query.skip}`
    }
  }
 
  else {
    // if(classId){
    //   search_query = `SELECT * FROM topic WHERE ClassId = ${classId} AND SchoolId = ${schoolId} limit ${query.limit} offset ${query.skip}`;
    // }
    // if(courseId){
    //   search_query = `SELECT * FROM topic WHERE SchoolId = ${schoolId} AND CourseId = ${courseId}  limit ${query.limit} offset ${query.skip}`;
    // }
    // if(chapterId){
    //  search_query = `SELECT * FROM topic WHERE SchoolId = ${schoolId} AND ChapterId = ${chapterId}  limit ${query.limit} offset ${query.skip}`;
    // }
    // if((classId && courseId) && chapterId){
    //  search_query = `SELECT * FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId}  limit ${query.limit} offset ${query.skip}`;
    // }
    // if(classId && courseId && chapterId && statusId){
    //  search_query = `SELECT * FROM topic WHERE SchoolId = ${schoolId} AND ClassId = ${classId} AND CourseId = ${courseId} AND ChapterId = ${chapterId}  AND StatusId = ${statusId} limit ${query.limit} offset ${query.skip}`;
    // }
 
    if(classId)
    {
      if(courseId)
      {
        if(chapterId)
        {
          if(statusId)
          {
              search_query = `SELECT t.*, sc.studentclass, sm.schoolname, c.coursename, ch.chaptername FROM
                          topic t
                          LEFT JOIN studentclass As sc ON t.ClassId = sc.ClassId
                          LEFT JOIN schoolmaster As sm ON t.SchoolId = sm.SchoolId
                          LEFT JOIN course As c ON t.CourseId = c.CourseId
                          LEFT JOIN chapter As ch ON t.ChapterId = ch.ChapterId WHERE t.SchoolId = ${schoolId} AND t.ClassId = ${classId} AND t.CourseId = ${courseId} AND t.ChapterId = ${chapterId}  AND t.StatusId = ${statusId} limit ${query.limit} offset ${query.skip}`;
          }
          else
          {
            search_query = `SELECT t.*, sc.studentclass, sm.schoolname, c.coursename, ch.chaptername FROM
                          topic t
                          LEFT JOIN studentclass As sc ON t.ClassId = sc.ClassId
                          LEFT JOIN schoolmaster As sm ON t.SchoolId = sm.SchoolId
                          LEFT JOIN course As c ON t.CourseId = c.CourseId
                          LEFT JOIN chapter As ch ON t.ChapterId = ch.ChapterId WHERE t.SchoolId = ${schoolId} AND t.ClassId = ${classId} AND t.CourseId = ${courseId} AND t.ChapterId = ${chapterId} limit ${query.limit} offset ${query.skip}`;
          }
        }
        else
        {
          search_query = `SELECT t.*, sc.studentclass, sm.schoolname, c.coursename, ch.chaptername FROM
                          topic t
                          LEFT JOIN studentclass As sc ON t.ClassId = sc.ClassId
                          LEFT JOIN schoolmaster As sm ON t.SchoolId = sm.SchoolId
                          LEFT JOIN course As c ON t.CourseId = c.CourseId
                          LEFT JOIN chapter As ch ON t.ChapterId = ch.ChapterId WHERE t.SchoolId = ${schoolId} AND t.ClassId = ${classId} AND t.CourseId = ${courseId} limit ${query.limit} offset ${query.skip}`;  
        }
      }
     
      else{
        search_query = `SELECT t.*, sc.studentclass, sm.schoolname, c.coursename, ch.chaptername FROM
                          topic t
                          LEFT JOIN studentclass As sc ON t.ClassId = sc.ClassId
                          LEFT JOIN schoolmaster As sm ON t.SchoolId = sm.SchoolId
                          LEFT JOIN course As c ON t.CourseId = c.CourseId
                          LEFT JOIN chapter As ch ON t.ChapterId = ch.ChapterId WHERE t.SchoolId = ${schoolId} AND t.ClassId = ${classId} limit ${query.limit} offset ${query.skip}`;
      }
    }
    else{
      if(courseId){
        if(statusId){
          search_query = `SELECT t.*, sc.studentclass, sm.schoolname, c.coursename, ch.chaptername FROM
                          topic t
                          LEFT JOIN studentclass As sc ON t.ClassId = sc.ClassId
                          LEFT JOIN schoolmaster As sm ON t.SchoolId = sm.SchoolId
                          LEFT JOIN course As c ON t.CourseId = c.CourseId
                          LEFT JOIN chapter As ch ON t.ChapterId = ch.ChapterId WHERE t.SchoolId = ${schoolId} and t.CourseId= ${courseId} and t.statusId = ${statusId} limit ${query.limit} offset ${query.skip}`
        }
        search_query = `SELECT t.*, sc.studentclass, sm.schoolname, c.coursename, ch.chaptername FROM
                          topic t
                          LEFT JOIN studentclass As sc ON t.ClassId = sc.ClassId
                          LEFT JOIN schoolmaster As sm ON t.SchoolId = sm.SchoolId
                          LEFT JOIN course As c ON t.CourseId = c.CourseId
                          LEFT JOIN chapter As ch ON t.ChapterId = ch.ChapterId WHERE t.SchoolId = ${schoolId} and t.CourseId= ${courseId} limit ${query.limit} offset ${query.skip}`
      }

     
      else{
        if(statusId)
      {
        search_query = `SELECT t.*, sc.studentclass, sm.schoolname, c.coursename, ch.chaptername FROM
                          topic t
                          LEFT JOIN studentclass As sc ON t.ClassId = sc.ClassId
                          LEFT JOIN schoolmaster As sm ON t.SchoolId = sm.SchoolId
                          LEFT JOIN course As c ON t.CourseId = c.CourseId
                          LEFT JOIN chapter As ch ON t.ChapterId = ch.ChapterId WHERE t.SchoolId = ${schoolId} and t.statusid = ${statusId} limit ${query.limit} offset ${query.skip}`
      }
       
        else{
         
           if(chapterId){
             
              if(statusId){
                search_query = `SELECT t.*, sc.studentclass, sm.schoolname, c.coursename, ch.chaptername FROM
                          topic t
                          LEFT JOIN studentclass As sc ON t.ClassId = sc.ClassId
                          LEFT JOIN schoolmaster As sm ON t.SchoolId = sm.SchoolId
                          LEFT JOIN course As c ON t.CourseId = c.CourseId
                          LEFT JOIN chapter As ch ON t.ChapterId = ch.ChapterId WHERE t.SchoolId = ${schoolId} and t.ChapterId= ${chapterId} and t.statusId = ${statusId} limit ${query.limit} offset ${query.skip}`
              }
              search_query = `SELECT t.*, sc.studentclass, sm.schoolname, c.coursename, ch.chaptername FROM
                          topic t
                          LEFT JOIN studentclass As sc ON t.ClassId = sc.ClassId
                          LEFT JOIN schoolmaster As sm ON t.SchoolId = sm.SchoolId
                          LEFT JOIN course As c ON t.CourseId = c.CourseId
                          LEFT JOIN chapter As ch ON t.ChapterId = ch.ChapterId WHERE t.SchoolId = ${schoolId} and t.ChapterId= ${chapterId} limit ${query.limit} offset ${query.skip}`
            }
           
            else{
          search_query = `SELECT t.*, sc.studentclass, sm.schoolname, c.coursename, ch.chaptername FROM
                          topic t
                          LEFT JOIN studentclass As sc ON t.ClassId = sc.ClassId
                          LEFT JOIN schoolmaster As sm ON t.SchoolId = sm.SchoolId
                          LEFT JOIN course As c ON t.CourseId = c.CourseId
                          LEFT JOIN chapter As ch ON t.ChapterId = ch.ChapterId
                          WHERE t.SchoolId = ${schoolId} limit ${query.limit} offset ${query.skip}`
            }
         
      }
     
    }
   
  }}
 
 
  pool.query(search_query, function(err,data){        
    if(err){
      console.log(search_query)
        response = {status:400,success:false,message:"Error fetching data." + err};
    }
    else if(data.length == 0)
    {
                console.log(search_query);
                response = {status: 200, success : false, message : "No Data Found"};
    }
    else {
      console.log('test', search_query);
      var totalPages = Math.ceil(totalCount / size);              
      response = {status: 200, success : true, message : "Data Found", "SearchData": data, "Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
  });
  })
  })(req, res, next);
  }


/////////////////////////

module.exports.changePasswordStudent = function (req, res, next){
  var existing_pwd = req.query.existing_pwd;
  var new_password = req.query.new_password;
passport.authenticate('jwt', function(err,user)
{
  if (err || !user)
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
 
  else if (user)
  {
    StudentMain.getStudentByStudentId(user.student[0].StudentId, function(err, student) {
            if (err){
                res.send(err);
            }
            else if(student.length == 0)
            {
              return res.json({status: 200, success: true, message: "No Data Found."});
            }
            else
            {
              console.log(user.student[0].StudentPassword);
              console.log(passwordHash.verify(existing_pwd,user.student[0].StudentPassword));
              try
              {
                if(existing_pwd)
                {
                  if(passwordHash.verify(existing_pwd,user.student[0].StudentPassword))
                  {
                      var hashedPasswordNew = passwordHash.generate(new_password);
                      if(hashedPasswordNew)
                      {
                        StudentMain.updatePasswordById(user.student[0].StudentId, hashedPasswordNew, function(err, test){
                        if(err){
                            res.send(err);        
                        }
                        else{
                          return res.json({status: 200, success: true, message: "Password Updated Successfully."});
                      }
                });
              }else{
                      return res.json({status: 200, success: true, message: "Please Provide New Password"});
              }
            }
            else
            {
               return res.json({status: 200, success: true, message: "Your Password does not match with the existing password.."});
            }
            }
                else{
                  res.json({status:200,success:true,Message:"No values provided."});      
                }
              }catch(e) {console.log(e)}
         
           }
          });
       }
       else{
          return res.json({ status: 422, success: false, error: "Authentication Failed." });
       }
})(req, res, next)

}

///////////////////////////////////////////////////

module.exports.insertClassTheme = function(req, res,next) {  
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
     }
  var new_theme = new ClassTheme(req.body);
  
{  
  ClassTheme.addTheme(new_theme,function(err, theme) {
    if (err)
    {
      res.send({error:err,success:false,message : "Theme details not saved."});
    }
    else{
      if(theme==null){
        res.send({success:false,message : "Theme already there."});
      }
      else{
        if(theme.Message == 'Class Theme is already saved.'){
          res.send({status:200,success:false,message : theme.Message});
        }
        else{
          res.send({status:200,success:true,message : theme.Message});
        }
        
      }
    }
    //res.json(chapter);
  });
}
  })(req,res,next)
};

module.exports.updateClassTheme = function(req, res) {
  //console.log('Data',req.body);
  //console.log("Id",req.query.ClassId); 
   var update_theme = new ClassTheme(req.body);
  ClassTheme.UpdateTheme(req.query.ClassThemeId, update_theme, function(err, theme) {
    if(err){
            res.status(400).send({ status:400, success:false, message: 'Data Theme not updated' });
      }   
    else
    //res.json(studentclass);
    res.status(200).send({status:200,success:true, message: 'Class theme Updated Successfully.' });  
  });
};

module.exports.deleteClassTheme = function(req, res) {
  //console.log('Data',req.query.ClassId);  
  ClassTheme.DeleteTheme(req.query.ClassThemeId, function(err, ress) {
    if (err){      
      console.log('ControllerErr',err);
      res.status(400).send({ success:false, message: 'Class theme not Deleted.' });
    }
      res.status(200).send({ success:true, message: 'Class theme Deleted.' }); 
  });
};

/////////////////////////////////////////////////

module.exports.getClassThemeFilterByClassId = function (req, res, next) {
  passport.authenticate('jwt', function(err,user)
  {
    if (err || !user)
    {
      return res.json({ status: 401, success: false, message: "Authentication Fail." });
    }
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if(pageNo < 0 || pageNo === 0) {
          response = {status:400,success:false,message:"Invalid page number, should start with 1"};
          return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    var classId = req.query.classId;
   
    console.log(classId);
  if(classId)
  {
    search_query = `SELECT count(*) as Total FROM classtheme WHERE ClassId = ?`
  }
  else{
    search_query = `SELECT count(*) as Total FROM classtheme `
  }
  
  pool.query(search_query,[classId], function(err,totalCount){
  if(err){
      res.json({status:400,success:false,Error:"Error fetching data." + err});
  }
  var search_query;
  
  if(classId)
  {
    search_query = `SELECT classtheme.*, studentclass.StudentClass FROM classtheme LEFT JOIN studentclass ON(studentclass.ClassId=classtheme.ClassId) WHERE classtheme.ClassId = ? limit ${query.limit} offset ${query.skip}`
  }
  else{
    search_query = `SELECT * FROM classtheme limit ${query.limit} offset ${query.skip}`
  }
  
  pool.query(search_query,[classId], function(err,data){    
    console.log(err)    
    if(err){
        response = {status:400,success:false,message:"Error fetching data."};
    }
    else if(data.length == 0)
    {
                console.log(search_query);
                response = {status: 200, success : false, message : "No Data Found"};
    }
    else {
      console.log('test', search_query);
      var totalPages = Math.ceil(totalCount / size);              
      response = {status: 200, success : true, message : "Data Found", "SearchData": data, "Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
  });
  })
  })(req, res, next);
  }
  
  /////////////////////////////////////////////////////////////////

  module.exports.getExcelSheetTimeTable = function (req, res) { 

    pool.query(`SELECT timetable.*,studentclass.StudentClass,teacher.TeacherName,course.CourseName from timetable LEFT JOIN studentclass ON (timetable.ClassId = studentclass.ClassId) LEFT JOIN teacher ON (timetable.TeacherId = teacher.TeacherId) LEFT JOIN course ON (timetable.CourseId = course.CourseId) where timetable.SchoolId= ? `,[req.query.SchoolId],function(err,data,fields)
    {        
      //as p, FULL OUTER JOIN studentmain as m  ON (p.parentId = m.parentId )
             console.log(data)
             const jsonData = JSON.parse(JSON.stringify(data));
             console.log(jsonData);
  
             let workbook = new excel.Workbook()
             let worksheet = workbook.addWorksheet('Timetable')
  
             worksheet.columns = [
               { header: 'Class', key: 'StudentClass', width: 10 },
               { header: 'Course', key: 'CourseName', width: 30 },
               { header: 'Teacher', key: 'TeacherName', width: 30},
               { header: 'Start Time', key: 'StartTime', width: 40},
               { header: 'End Time', key: 'EndTime', width: 40},
              //  {header: 'Status', key: 'StatusId', width: 40}
             ];
         
             worksheet.addRows(jsonData);
             res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
             res.setHeader('Content-Disposition', 'attachment; filename=' + 'timetable.xlsx');
  
            //   workbook.xlsx.writeFile("public/export/users.xlsx")
            //  .then(function() {
            //    console.log("file saved!");
            //    res.json({"status" : 200, "message" : "File exported"});
            //  });
  
            return workbook.xlsx.write(res)
            .then(function() {
                  res.status(200).end();
            });
  
             
  
         });
  }

  ////////////////////////////////////////////////


module.exports.importStudentMainExcelData2MySQL = function(req, res, next)
{
  console.log('Test');
passport.authenticate('jwt', function(err,user)
{
  if (err || !user)
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  else if(user)
  {
  try{
  var file = req.file.filename;
  var classId = req.query.classId;
  console.log('classId',req.query.classId);
    console.log(file);
    if (!req.file)
    {
        console.log("No file received");
        res.status(400).send({ error:true, message: 'Please Upload Excel Sheet.' });        
    }
    else
    {    
      try{
          var fn = './public/excelsheet/' + file;  
          //res.json({'msg': 'File uploaded/import successfully!', 'file': file});

    readXlsxFile(fn).then((rows) => {
    var new_excel = [];
    var colName = rows.slice(0,Number(rows.length));
    var checkrow = rows.slice(1,Number(rows.length));
    if(!(colName[0][0] == 'StudentName(M)' && colName[0][1] == 'StudentGender(M)' && colName[0][2] == 'StudentMobile(O)' && colName[0][3] == 'StudentUsername(M)' && colName[0][4] == 'StudentDOB(M)' && colName[0][5] == 'StudentDORegis(M)' && colName[0][6] == 'StudentPassword(M)' && colName[0][7] == 'StudentImage(O)' && colName[0][8] == 'Parent(M)' && colName[0][9] == 'Class(M)' && colName[0][10] == 'School(M)'))
    {
        return res.json({status:400,success:false,message:"Template is not valid."});
    }
    if(checkrow.length == 0)
    {
        return res.json({status:400,success:false,message:"Sheet is Empty."});         
    }
    if(classId == undefined) 
    {
       return res.json({status:400,success:false,message:"No Class."}); 
    }
    else
    {
    var row = rows.slice(1,Number(rows.length));
    row.forEach((element, index) =>{
        if(row[index] == '1' || row[index] == '2' || row[index] == '3'){

        }

        else{
          try
          {
              var mob = row[index][2];
              if(mob == null){
                row[index][2] = null;
          } 
              console.log('Row',row[index][6]);
              var newpass = row[index][6].toString();
              var revisedpass = passwordHash.generate(newpass);
              row[index][6] = revisedpass;
              console.log('RP', revisedpass);

          row[index][7] = 'Profile-1587386575849.jpg';     
          row[index][8] = 1074; //Default Parent Id
          row[index][9] = req.query.classId;
          //row[index][10] = 43;
          row[index][10] = user[0].SchoolId;
          row[index][11] = 1; //statusId
          row[index][12] = user[0].SchoolId;
          row[index][13] = null;
          row[index][14] = new Date();
          row[index][15] = null;
        }catch(e) {console.log(e)}
        }
    });
  }
     console.log(row);


      StudentMain.createStudentExcel(row,function(err,response){
      if(err)
      {
        response = {status:400,success:false,message:"Error fetching data."};
      }
      // if(err.code=="ER_DUP_ENTRY"){
      //     response = {status:400,success:false,message:"Duplicate Entry."};  
      //   }
      else
      {
        //console.log('Test',response);
        response = {status: 200, success : true, message : "Student Details Saved Successfully."};
      }
      res.json(response);
    });
  });
}catch(e){console.log(e);}
}

}catch(e){}

}
 
})(req, res, next);
}

//---------------------------------------------------------------

module.exports.getStudentListBySchoolId = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {status:400,success:false,Error:"Invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  var studentname = req.query.studentname;
  var classId = req.query.classId;
  //var schoolId = req.query.schoolId;
  var schoolId = user[0].SchoolId;

  console.log('Skip', query.skip);
  console.log('Size', size);


  console.log(schoolId);

if(studentname)
{
  if(classId)
  {
        //search_query = `SELECT count(*) as Total FROM studentmain WHERE StudentName like '%${studentname}%' AND SchoolId = ${schoolId} AND ClassId = ${classId} AND StatusId = 1`;
        search_query = `SELECT count(*) as Total FROM studentmain WHERE StudentName 
                    like '%${studentname}%' AND SchoolId = ${schoolId} AND ClassId = ${classId}`;
  }
  else{
        search_query = `SELECT count(*) as Total FROM studentmain WHERE StudentName like '%${studentname}%' 
        AND SchoolId = ${schoolId}`; 
  }
}
else
{
  if(classId){
    search_query = `SELECT count(*) as Total FROM studentmain WHERE ClassId = ${classId} 
    AND SchoolId = ${schoolId}`; 
  }
  else{
  search_query = `SELECT count(*) as Total FROM studentmain WHERE SchoolId = ${schoolId}`; 
  }
}

pool.query(search_query,['%'+ studentname + '%'], function(err,totalCount){
if(err){

    res.json({status:400,success:false,Error:"Error fetching data." });
}
var search_query;
console.log('TotalCountAfter Query', totalCount);
console.log('SQ', search_query);
if(studentname)
{
  if(classId)
  {
        search_query = `SELECT sm.*, sc.studentclass FROM studentmain sm 
                        LEFT JOIN studentclass as sc ON (sm.classId = sc.classId) 
                        WHERE sm.StudentName like '%${studentname}%' AND
                        sm.ClassId = ${classId}  AND sm.SchoolId = ${schoolId} 
                        Order By sm.StudentId DESC
                        limit ${query.limit} offset ${query.skip}`
       
  }
  else{
         search_query = `SELECT sm.*, sc.studentclass FROM studentmain sm 
                        LEFT JOIN studentclass as sc ON (sm.classId = sc.classId) 
                        WHERE sm.StudentName like '%${studentname}%' AND 
                        AND sm.SchoolId = ${schoolId}
                        Order By sm.StudentId DESC
                        limit ${query.limit} offset ${query.skip}`
  }
}
else
{
  if(classId){  
     search_query = `SELECT sm.*, sc.studentclass FROM studentmain sm 
                        LEFT JOIN studentclass as sc ON (sm.classId = sc.classId) 
                        WHERE sm.ClassId = ${classId}  AND sm.SchoolId = ${schoolId} 
                        Order By sm.StudentId DESC
                        limit ${query.limit} offset ${query.skip}`                
  }
  else{
     search_query = `SELECT sm.*, sc.studentclass FROM studentmain sm 
                        LEFT JOIN studentclass as sc ON (sm.classId = sc.classId) 
                        WHERE sm.SchoolId = ${schoolId} 
                        Order By sm.StudentId DESC
                        limit ${query.limit} offset ${query.skip}`   
  }
}

pool.query(search_query,['%'+ studentname + '%'] , function(err,data){        
  if(err){
    console.log(search_query);
      response = {status:400,success:false,Error:"Error fetching data."};
  } 
  else if(data.length == 0)
  {
              console.log(search_query);
              response = {status: 200, success : false, message : "No Data Found"};
  }
  else {
    console.log(search_query);
    var totalPages = Math.ceil(totalCount / size);   
          
    response = {status: 200, success : true, message : "Data Found", "SearchData": data, "Pages":totalPages,"TotalCount":totalCount};
  }
  res.json(response);
});
})
})(req, res, next);
}

//--------------------------------------------------------------

module.exports.getParentListBySchoolId = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {status:400,success:false,Error:"Invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  var parentname = req.query.parentname;
  var classId = req.query.classId;
  var schoolId = user[0].SchoolId;

  console.log('Skip', query.skip);
  console.log('Size', size);


  console.log(schoolId);

if(parentname)
{
        search_query = `SELECT count(*) as Total FROM parentmain WHERE ParentName like ? AND SchoolId = ${schoolId} AND StatusId = 1`; 
}
else{
  search_query = `SELECT count(*) as Total FROM parentmain WHERE SchoolId = ${schoolId}  AND StatusId = 1`; 
}


pool.query(search_query,['%'+ parentname + '%'], function(err,totalCount){
if(err){

    res.json({status:400,success:false,Error:"Error fetching data." + err});
}
var search_query;
console.log('TotalCountAfter Query', totalCount);
console.log('SQ', search_query);
if(parentname)
{
    search_query = `SELECT * FROM parentmain WHERE ParentName like ? AND SchoolId = ${schoolId} AND StatusId = 1 limit ${query.limit} offset ${query.skip}`; 
}
else
{
  search_query = `SELECT * FROM parentmain WHERE SchoolId = ${schoolId} AND StatusId = 1 limit ${query.limit} offset ${query.skip}`; 
}

pool.query(search_query,['%'+ parentname + '%'] , function(err,data){        
  if(err){
    console.log(search_query);
      response = {status:400,success:false,Error:"Error fetching data."};
  } 
  else if(data.length == 0)
  {
              console.log(search_query);
              response = {status: 200, success : false, message : "No Data Found"};
  }
  else {
    console.log(search_query);
    var totalPages = Math.ceil(totalCount / size);   
          
    response = {status: 200, success : true, message : "Data Found", "SearchData": data, "Pages":totalPages,"TotalCount":totalCount};
  }
  res.json(response);
});
})
})(req, res, next);
}
//--------------------------------------------------------------

module.exports.getParentCountBySchool = function(req,res, next)
{
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var schoolId = user[0].SchoolId;
  pool.query("select count(*) as Total from parentmain WHERE StatusId = 1 AND SchoolId = ?",[schoolId],function(err,totalCount){
    console.log(totalCount);
        if(err) {
               //response = {"Error" : true,"Message" : "Error fetching data"}
               response = {status:400,success:false,Message:"Error fetching data."};
        }
        else if(totalCount.length == 0){
              response = {status: 200, success : false, Message : "No Data Found"};
        }
        else{
               //response = {"Error" : false,"Message" : totalCount[0]}
               response = {status:400,success: true, Message:"Data Found", Data: totalCount[0]};
        }
        res.json(response);
  });
})(req, res, next);
}


//--------------------------------------------------------

module.exports.getSchoolCountBySchool = function(req,res, next)
{
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var schoolId = user[0].SchoolId;

  pool.query("select count(*) as Total from schoolmaster WHERE StatusId = 1 AND SchoolId = ?",[schoolId],function(err,totalCount){
    console.log(totalCount);
        if(err) {
               //response = {"Error" : true,"Message" : "Error fetching data"}
               response = {status:400,success:false,Message:"Error fetching data."};
        }
        else if(totalCount.length == 0){
              response = {status: 200, success : false, Message : "No Data Found"};
        }
        else{
               //response = {"Error" : false,"Message" : totalCount[0]}

               response = {status:400,success: true, Message:"Data Found", Data: totalCount[0]};
        }
        res.json(response);
  });
})(req, res, next);
}

//--------------------------------------------------------------


module.exports.insertStudentWeb = function(req, res, next) {
  console.log("IS Next", 'Test');
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
     var new_student = new StudentMain(req.body);
     //handles null error 
     if(!new_student.StudentName){
            //res.status(400).send({ error:true, message: 'Please Provide Student Name.' });
            res.json({ status: 401, success: false, error: "Please Provide Student Name." });
     }
      else if(!new_student.StudentUsername)
      { 
            //res.status(400).send({ error:true, message: 'Please Provide Student Username.' });
            res.json({ status: 401, success: false, error: "Please Provide Student Username." });
      }
      else if(!new_student.StudentDOB){
            //res.status(400).send({ error:true, message: 'Please Provide Student Date of Birth.' });
            res.json({ status: 401, success: false, error: "Please Provide Student Date of Birth." });
      }              
      else if(!new_student.StudentPassword){
            //res.status(400).send({ error:true, message: 'Please Provide Student Password.' });
            res.json({ status: 401, success: false, error: "Please Provide Student Password." });
      }  
      else if(!new_student.ClassId){
            //res.status(400).send({ error:true, message: 'Please Provide Student Class.' });
            res.json({ status: 401, success: false, error: "Please Provide Student Class." });
      }          
      else
      {

        StudentMain.createStudentWeb(new_student, '1074',"Profile-1587386575849.jpg" ,user[0].SchoolId,function(err, student) {
        if (err)
        {
            console.log(err)
            if( err.code=="ER_DUP_ENTRY")
            {
               console.log(err.sqlMessage.split(" ")[5])
               let sqlmsg =err.sqlMessage.split(" ")[5]
               if(sqlmsg==="'StudentUsername'") 
               {
                   console.log('worinign')
                   //return res.send({ error: true, Message:"Student Username Already Exists."})
                   return res.json({ status: 401, success: false, error: "Student Username Already Exists." });
               }
               if(sqlmsg==="'StudentMobile'") 
               {
                   console.log('worinign')
                   //return res.send({ error: true, Message:"Student Username Already Exists."})
                   return res.json({ status: 401, success: false, error: "Student Mobile Already Exists." });
               }  
          }
      }
      else
      {
            res.send({status:200,success:true,message:"Student saved successfully"});
      }  
  });
}
})(req, res, next);
}


module.exports.updateStudentMainWeb = async function(req,res,next)
{ 
  passport.authenticate('jwt', function(err, user){
  if (err || !user) 
  {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
      console.log(req.body);
      var update_student = new StudentMain(req.body);    
      StudentMain.updateByIdWeb(req.body.StudentId, update_student, function(err, student) {
        if(!update_student.StudentName)
        {
            res.json({ status: 401, success: false, error: "Please Provide Student Name." });
        }
        if(!update_student.StudentGender)
        {
          res.json({ status: 401, success: false, error: "Please Provide Student Gender." });
        }
        if(!update_student.StudentDOB)
        {
          res.json({ status: 401, success: false, error: "Please Provide Student Date of Birth." });
        }
        else
        {
          if(err)
          {
            res.json({status:200,success:false,error:"Data not updated"});
          }else
          {
            res.json({status:200,success:true,message:"Student Updated Successfully."});
          } 
        }
  });
  })(req,res,next);
}



module.exports.updateStudentMainStatus = async function(req,res,next)
{ 
  passport.authenticate('jwt', function(err, user){
  if (err || !user) 
  {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
      console.log(req.body);
      //var update_student = new StudentMain(req.body);    
      StudentMain.deleteById(req.body, function(err, student) {
          if(err)
          {
            res.json({status:200,success:false,error:"Data not updated"});
          }else
          {
            res.json({status:200,success:true,message:"Student Status Updated Successfully."});
          } 
        });
  })(req,res,next);
}




//-------------------------------------------------------------------------------


//---------------Course And Chapter Bulk Upload Api's----------------------------------------------------------

module.exports.importCourseExcelData2MySQL = function(req, res, next)
{
  console.log('Test');
passport.authenticate('jwt', function(err,user)
{
  if (err || !user)
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  else if(user)
  {
  try{
  var file = req.file;
  console.log(file);
  var classId = req.body.classId;
  console.log('Data',req.body);
  console.log('classId',classId);
  
  if (!file)
  {
        console.log("No file received");
        res.status(400).send({ error:true, message: 'Please Upload Excel Sheet.' });        
  }
  else
  {    
    try{
          var fn = './public/excelsheet/' + req.file.filename;
          readXlsxFile(fn).then((rows) => {
          var new_excel = [];
          //work
          var colName = rows.slice(0,Number(rows.length));
          var checkrow = rows.slice(1,Number(rows.length));
          var is_class = false;
          var data;
          console.log('Col Name',colName[0]);
          console.log('Condition', colName[0][0] == 'CourseName(M)');
          console.log('Condition 2', checkrow.length);
          if(!(colName[0][0] == 'CourseName(M)' && colName[0][1] == 'CourseDescription' && colName[0][2] == 'CourseOtherDetails' && colName[0][3] == 'CourseImage' && colName[0][4] == 'Class'))
          {
             return res.json({status:400,success:false,message:"Template is not valid."});
          }
          if(checkrow.length == 0)
          {
             return res.json({status:400,success:false,message:"Sheet is Empty."});         
          }
          if(classId == undefined) 
          {
            return res.json({status:400,success:false,message:"No Class."}); 
          }
          else
          {
          var row = rows.slice(1,Number(rows.length));
          row.forEach((element, index) =>
          {
            console.log('Only Index', index);
            //console.log('Index', row[index][]);
          if(row[index] == '1' || row[index] == '2' || row[index] == '3'){}


          else{
            try
            {
              var desc = row[index][1];
              if(desc == null){
                row[index][1] = null;
            }

            var otherdetails = row[index][2];
            if(otherdetails == null)
            {
              row[index][2] = null;
            }
            var img = row[index][3];
            if(img == null)
            {
                row[index][3] = 'maths.png';
            }
              // var getClass;
              // pool.query('select classId from studentclass where StudentClass like ?',['%'+ row[index][4] + '%'],function(err,data){
              //   if(err){console.log(err);}
              //   else{
              //     getClass = data[0].classId;
              //     console.log('GetClass', getClass);
              //     row[index][4] = getClass;
              //     console.log('Data', data[0].classId);
              //   }
              // });

            row[index][4] = classId; 
            row[index][5] = user[0].SchoolId;
            row[index][6] = 1;
            row[index][7] = user[0].SchoolId;
            row[index][8] = null;
            row[index][9] = new Date();
            row[index][10] = null;   
            
      
      
        }catch(e) {console.log(e)}
        }
    });
        }
    console.log(row);
    Course.insertCourseExcel(row,function(err,response){
    if(err)
    {
      response = {status:400,success:false,message:"Error fetching data. " + err};
    }
    else
    {
      response = {status: 200, success : true, message : response.Message};
      //response = {status: 200, success : true, message : "Course Details Saved Successfully."};
    }
    res.json(response);
    });
  });
}catch(e){console.log(e);}
}

}catch(e){}

}
})(req, res, next);
}



module.exports.importChapterExcelData2MySQL = function(req, res, next)
{
  console.log('Test');
passport.authenticate('jwt', function(err,user)
{
  if (err || !user)
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  else if(user)
  {
  try
  {
  var file = req.file.filename;
  console.log(file);
  var classId = req.query.classId;
  var getClassId;
  var course = []; 
  console.log('classId',req.query.classId);
  if (!req.file)
  {
        console.log("No file received");
        res.status(400).send({ error:true, message: 'Please Upload Excel Sheet.' });        
  }
  else
  {  

    try{
          var fn = './public/excelsheet/' + file;
          readXlsxFile(fn).then((rows) => {
          var new_excel = [];
          var colName = rows.slice(0,Number(rows.length));
          var checkrow = rows.slice(1,Number(rows.length));
          console.log('Col Name',colName[0]);
          if(!(colName[0][0] == 'Chapter Name(M)' && colName[0][1] == 'Chapter Title(M)' && colName[0][2] == 'Chapter URLs(O)' && colName[0][3] == 'Course' && colName[0][4] == 'Class' && colName[0][5] == 'School'))
          {
            return res.json({status:400,success:false,message:"Template is not valid."});
          }
          if(checkrow.length == 0)
          {
             return res.json({status:400,success:false,message:"Sheet is Empty."});         
          }
          if(classId == undefined) 
          {
            return res.json({status:400,success:false,message:"No Class."}); 
          }
          else{
          var row = rows.slice(1,Number(rows.length));
          console.log(row,'dfdf')
// Added by kuldee/ 
          var count=0 
          var course=[];
          var is_error = false;
         row.forEach((element, index) =>{
     pool.query('select courseId from course where CourseName like ? AND ClassId = ? AND SchoolId = ?',
      ['%'+ row[index][3] + '%', req.query.classId, user[0].SchoolId],function(err,data){
                if(err){console.log(err);}
                else if(data.length == 0)
                {
                   if(!is_error)
                    {
                      is_error = true;
                      console.log("Is Error", is_error);                    
                      showMsgChapter(res);
                    }
                }
                else
                {
                  //row[index][3] = data[0].courseId; //set

                  getClassId = data[0].courseId;
                  console.log('Data',data);
                  count++;
                course.push(getClassId)
                if(count==row.length){
                  setData(row, course, classId, user[0].SchoolId, res);
                }
                  
             }
            });

  })
       }
});
///end here

 }catch(e){}
}
}catch(e){}
}
 })(req, res, next);
}
//till here 

function showMsgChapter(res)
{
  
    console.log("No Such Course");
    response = {status:400,success:false,message:"No Such Course."}; //error
    return res.json(response);
}

// just for setting data
function setData(row, cours, classId, schoolId, res)
{
  row.forEach((el, i)=>
  {
    row[i][3] = cours[i]
    row[i][4] = classId;
    //row[index][5] = user[0].SchoolId;
         
    row[i][5] = schoolId;
    row[i][6] = 1;
    row[i][7] = schoolId;
    row[i][8] = null;
    row[i][9] = new Date();
    row[i][10] = null;
    });
        //}
    

    console.log('NewRow',row);
    //var new_row = rows.slice(1,Number(rows.length));    
    
    Chapter.addChapterExcel(row,function(err,response){
    if(err)
    {
      response = {status:400,success:false,message:"Error fetching data. "};
    }
    else
    {
      response = {status: 200, success : true, message : "Chapter Details Saved Successfully."};
    }
      res.json(response);
    });
    console.log(row,'row') 
}

//----------------------------------------YouTubeDetails----------------------------------------------------------

module.exports.insertYouTubeDetails = function(req, res, next) 
{
  console.log("IS Next", 'Test');
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
     var new_youtube = new Youtube(req.body);
     //handles null error 
    if(!new_youtube.ClassId)
    { 
        res.json({ status: 401, success: false, error: "Please Provide Class." });
    }
    else if(!new_youtube.CourseId)
    { 
        res.json({ status: 401, success: false, error: "Please Provide Course." });
    }  
    else if(!new_youtube.ChapterId)
    { 
        res.json({ status: 401, success: false, error: "Please Provide Chapter." });
    }
    else if(!new_youtube.part)
    { 
        res.json({ status: 401, success: false, error: "Please Provide Part." });
    }   
    else if(!new_youtube.VideoTitle)
    { 
        res.json({ status: 401, success: false, error: "Please Provide VideoTitle." });
    }
    else if(!new_youtube.youtubevideoid)
    { 
        res.json({ status: 401, success: false, error: "Please Provide You Tube Video Id." });
    }
    else if(!new_youtube.youtubeurl)
    { 
        res.json({ status: 401, success: false, error: "Please Provide YouTube URL." });
    }
    else if(!new_youtube.description)
    { 
        res.json({ status: 401, success: false, error: "Please Provide Description." });
    }
    else if(!new_youtube.thumbnail)
    { 
        res.json({ status: 401, success: false, error: "Please Provide Thumbnail." });
    } 
    else{
        new_youtube.Subscription = 'Free';
        new_youtube.StatusId = 1;
        new_youtube.CreatedById = user[0].SchoolId;
        new_youtube.CreationDate = new Date();

        //console.log( "pppppp",user.parent[0].ParentId)
        console.log('Data', new_youtube);
        Youtube.createYoutubeData(new_youtube, user[0].SchoolId,function(err, youtube) {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send({status:200,success:true,message:"Details saved successfully."});
        }
    }); 
}
})(req, res, next);
}



module.exports.updateYouTubeDetails = function(req, res, next) {
  console.log("IS Next", 'Test');
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
     var new_youtube = new Youtube(req.body);
     //handles null error 
    if(!new_youtube.ClassId)
    { 
        res.json({ status: 401, success: false, error: "Please Provide Class." });
    }
    else if(!new_youtube.CourseId)
    { 
        res.json({ status: 401, success: false, error: "Please Provide Course." });
    }  
    else if(!new_youtube.ChapterId)
    { 
        res.json({ status: 401, success: false, error: "Please Provide Chapter." });
    }
    else if(!new_youtube.part)
    { 
        res.json({ status: 401, success: false, error: "Please Provide Part." });
    }   
    else if(!new_youtube.VideoTitle)
    { 
        res.json({ status: 401, success: false, error: "Please Provide VideoTitle." });
    }
    else if(!new_youtube.youtubevideoid)
    { 
        res.json({ status: 401, success: false, error: "Please Provide You Tube Video Id." });
    }
    else if(!new_youtube.youtubeurl)
    { 
        res.json({ status: 401, success: false, error: "Please Provide YouTube URL." });
    }
    else if(!new_youtube.description)
    { 
        res.json({ status: 401, success: false, error: "Please Provide Description." });
    }
    else if(!new_youtube.thumbnail)
    { 
        res.json({ status: 401, success: false, error: "Please Provide Thumbnail." });
    } 
   
    else
    {
        //console.log(new_youtube.StatusId);
        new_youtube.ModifiedById = user[0].SchoolId;
        new_youtube.ModificationDate = new Date();

        //console.log( "pppppp",user.parent[0].ParentId)
        console.log('Data', new_youtube);
        console.log(req.body.videoId);
        Youtube.updateYoutubeData(req.body.videoId,new_youtube, user[0].SchoolId,function(err, youtube) {
        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log(youtube);
            res.send({status:200,success:true,message:"Details updated successfully."});
        }
    }); 
}
})(req, res, next);
}

module.exports.deleteYouTubeDetails = function(req, res, next)
{
   passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
     var videoId = req.query.videoId;
     console.log('VID', videoId);
     Youtube.deleteById(videoId, function(err, data)
     {
        if(err)
        {
          res.send({status:200,success:false,message:"Cannot delete video."});
        }
        else{
         res.send({status:200,success:false,message:"Video deleted."}); 
        }
     })
})(req, res, next);
}



// module.exports.getURLWeb = function (req, res, next) { 
//   passport.authenticate('jwt', function(err,user)
//   {
//      if (err || !user) 
//      {
//         return res.json({ status: 401, success: false, error: "Authentication Fail." });
//      };
//      var page = parseInt(req.query.page)
//      var size = parseInt(req.query.size)
//      var ChapterId = req.query.ChapterId;
          
//      var query = {}
//      if(page < 0 || page === 0) 
//      {
//          response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
//          return res.json(response)
//     }
//     query.skip = size * (page - 1)
//     query.limit = size

//     console.log('User', user);
//     var search_query;
//     if(ChapterId){
//       search_query = "select count(*) as Total from youtubedetails where ChapterId = ? AND SchoolId = ?"
//     }
//     else{
//       search_query = `select count(*) as Total from youtubedetails where SchoolId = ${user[0].SchoolId}` 
//     }
//     pool.query(search_query,[req.query.ChapterId, user[0].SchoolId],function(err,totalCount){
//     if(err) {
//                response = {status:400,success:false,Error:"Error fetching data."};
//     }
//     {
//       if(ChapterId){
//         search_query = `select y.*, sc.studentclass, c.coursename, ch.chaptername, sm.schoolname FROM youtubedetails y 
//                         LEFT JOIN studentclass As sc ON (y.ClassId = sc.ClassId) 
//                         LEFT JOIN course As c ON (y.CourseId = c.CourseId) 
//                         LEFT JOIN chapter As ch ON (y.ChapterId = y.ChapterId)
//                         LEFT JOIN schoolmaster sm ON (y.SchoolId = ch.SchoolId) Where y.SchoolId = ${user[0].SchoolId} AND y.ChapterId = ? limit ${query.limit}  offset  ${query.skip}`;
//       }
//       else{
//         search_query = `select y.*, sc.studentclass, c.coursename, ch.chaptername, sm.schoolname FROM youtubedetails y 
//                         LEFT JOIN studentclass As sc ON (y.ClassId = sc.ClassId) 
//                         LEFT JOIN course As c ON (y.CourseId = c.CourseId)
//                         LEFT JOIN chapter As ch ON (y.ChapterId = ch.ChapterId)
//                         LEFT JOIN schoolmaster As sm ON (y.SchoolId = sm.SchoolId) Where y.SchoolId = ${user[0].SchoolId} limit ${query.limit}  offset  ${query.skip}`;
//       }
//        //pool.query(`SELECT * FROM youtubedetails WHERE ChapterId = ? ORDER BY CAST(SUBSTRING(Part,LOCATE(' ',Part)+1) AS SIGNED) limit ${query.limit}  offset  ${query.skip}`, req.query.ChapterId,function(err,data){
//        pool.query(search_query, [req.query.ChapterId],function(err,data){
//        if(err) 
//        {
//           response = {status:400,success:false,Error:"Error fetching data"};
//        } 

//        else if(data.length == 0)
//        {
//           response = {status: 200, success : true, message : "No Data Found"};
//        }
//        else 
//        {
//           var totalPages = Math.ceil(totalCount / size);    
//           response = {status: 200, success : true, message : "Data Found", "URLdata": data,"Pages":totalPages,"TotalCount":totalCount};
//        }
//         res.json(response);
//     });
//   }       
//   })
//   })(req, res, next);
// }


module.exports.getURLWeb = function (req, res, next) 
{ 
  passport.authenticate('jwt', function(err,user)
  {
     if (err || !user) 
     {
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     };
     var page = parseInt(req.query.page)
     var size = parseInt(req.query.size)
     var ChapterId = req.query.ChapterId;
          
     var query = {}
     if(page < 0 || page === 0) 
     {
         response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
         return res.json(response)
     }
    query.skip = size * (page - 1)
    query.limit = size
    var partname = "\'%" + req.query.partname + "\%'";
    var classId = req.query.classId;
    var courseId = req.query.courseId;
    var ChapterId = req.query.ChapterId;
    var statusId = req.query.statusId;
    var schoolId = user[0].SchoolId;




    console.log('User', user);
    var search_query;
     console.log(req.query.partname);
  if(req.query.partname)
  {
    if(classId)
    {
       if(courseId)
       {
          if(ChapterId)
          {
            search_query = `select count(*) as Total from youtubedetails where ChapterId = ${ChapterId} 
                    AND SchoolId = ${schoolId} AND ClassId = ${classId} 
                    AND CourseId=${courseId} AND part LIKE ${partname} AND StatusId = 1`
          }
          else
          {
            search_query = `select count(*) as Total from youtubedetails where SchoolId = ${schoolId} 
                AND ClassId = ${classId} AND CourseId= ${courseId} 
                AND part LIKE ${partname} AND StatusId = 1`;
          }
        }
        else
        {
          search_query = `select count(*) as Total from youtubedetails where SchoolId = ${schoolId} 
          AND ClassId = ${classId} AND part LIKE ${partname} AND StatusId = 1`;         
        }
     }
     else
     {
        search_query = `select count(*) as Total from youtubedetails where 
        part like ${partname} AND SchoolId = ${schoolId} AND StatusId = 1`
     }
     }   
    else
    {
      if(ChapterId)
      {
        search_query = `select count(*) as Total from youtubedetails where ChapterId = ${ChapterId} 
        AND SchoolId = ${schoolId} AND StatusId = 1`
      }
      else if(classId)
      {
        if(courseId)
        {
          search_query = `select count(*) as Total from youtubedetails where classId = ${classId} 
          AND SchoolId = ${schoolId} AND courseId = ${courseId} AND StatusId = 1`
        }
        else{
          search_query = `select count(*) as Total from youtubedetails where classId = ${classId} 
          AND SchoolId = ${schoolId} AND StatusId = 1`
        }
      }
      else if(courseId){
        search_query = `select count(*) as Total from youtubedetails where courseId = ${courseId} 
        AND SchoolId = ${schoolId} AND StatusId = 1`
      }
      else{
        search_query = `select count(*) as Total from youtubedetails where SchoolId = ${user[0].SchoolId}
        AND StatusId = 1` 
      }
    }
    pool.query(search_query,[ChapterId, user[0].SchoolId],function(err,totalCount)
    {
    if(err)
    {
               response = {status:400,success:false,Error:"Error fetching data."};
    }
    console.log('Count', search_query);
    {
    if(req.query.partname)
    {
      if(classId)
      {
       if(courseId)
       {
          if(ChapterId)
          {
            search_query = `select y.*, sc.studentclass, c.coursename, ch.chaptername, sm.schoolname FROM youtubedetails y 
                        LEFT JOIN studentclass As sc ON (y.ClassId = sc.ClassId) 
                        LEFT JOIN course As c ON (y.CourseId = c.CourseId) 
                        LEFT JOIN chapter As ch ON (y.ChapterId = ch.ChapterId)
                        LEFT JOIN schoolmaster sm ON (y.SchoolId = sm.SchoolId) 
                        Where y.SchoolId = ${user[0].SchoolId} AND y.ChapterId = ${ChapterId} AND y.ClassId = ${classId} 
                        AND y.CourseId = ${courseId} AND y.part like ${partname} AND y.StatusId = 1 order by videoId DESC
                        limit ${query.limit}  offset  ${query.skip}`;
          }
          else
          {
            search_query = `select y.*, sc.studentclass, c.coursename, ch.chaptername, sm.schoolname FROM youtubedetails y 
                        LEFT JOIN studentclass As sc ON (y.ClassId = sc.ClassId) 
                        LEFT JOIN course As c ON (y.CourseId = c.CourseId) 
                        LEFT JOIN chapter As ch ON (y.ChapterId = ch.ChapterId)
                        LEFT JOIN schoolmaster sm ON (y.SchoolId = sm.SchoolId) 
                        Where y.SchoolId = ${user[0].SchoolId} AND y.ClassId = ${classId} 
                        AND y.CourseId = ${courseId} AND y.part like ${partname} 
                        AND y.StatusId = 1 order by videoId DESC
                        limit ${query.limit}  offset  ${query.skip}`;
          }
       }
       else{
            search_query = `select y.*, sc.studentclass, c.coursename, ch.chaptername, sm.schoolname 
                        FROM youtubedetails y 
                        LEFT JOIN studentclass As sc ON (y.ClassId = sc.ClassId) 
                        LEFT JOIN course As c ON (y.CourseId = c.CourseId) 
                        LEFT JOIN chapter As ch ON (y.ChapterId = ch.ChapterId)
                        LEFT JOIN schoolmaster sm ON (y.SchoolId = sm.SchoolId) 
                        Where y.SchoolId = ${user[0].SchoolId} AND y.ClassId = ${classId} 
                        AND y.part like ${partname} 
                        AND y.StatusId = 1 order by videoId DESC
                        limit ${query.limit}  offset  ${query.skip}`;
       }
     }
     else{
      search_query = `select y.*, sc.studentclass, c.coursename, ch.chaptername, sm.schoolname FROM youtubedetails y 
                        LEFT JOIN studentclass As sc ON (y.ClassId = sc.ClassId) 
                        LEFT JOIN course As c ON (y.CourseId = c.CourseId)
                        LEFT JOIN chapter As ch ON (y.ChapterId = ch.ChapterId)
                        LEFT JOIN schoolmaster As sm ON (y.SchoolId = sm.SchoolId) 
                        Where y.SchoolId = ${user[0].SchoolId} AND y.part LIKE ${partname} 
                        AND y.StatusId = 1 ORDER BY videoId DESC
                        limit ${query.limit}  offset  ${query.skip}`; 
      }
     }
     else
     {
        if(ChapterId){
          search_query = `select y.*, sc.studentclass, c.coursename, ch.chaptername, sm.schoolname FROM youtubedetails y 
                        LEFT JOIN studentclass As sc ON (y.ClassId = sc.ClassId) 
                        LEFT JOIN course As c ON (y.CourseId = c.CourseId)
                        LEFT JOIN chapter As ch ON (y.ChapterId = ch.ChapterId)
                        LEFT JOIN schoolmaster As sm ON (y.SchoolId = sm.SchoolId) 
                        Where y.SchoolId = ${user[0].SchoolId} AND y.ChapterId = ${ChapterId} 
                        AND y.StatusId = 1 ORDER BY videoId DESC
                        limit ${query.limit}  offset  ${query.skip}`;
        }
        else if(classId)
        {
          if(courseId)
          {
              search_query = `select y.*, sc.studentclass, c.coursename, ch.chaptername, sm.schoolname FROM youtubedetails y 
                        LEFT JOIN studentclass As sc ON (y.ClassId = sc.ClassId) 
                        LEFT JOIN course As c ON (y.CourseId = c.CourseId)
                        LEFT JOIN chapter As ch ON (y.ChapterId = ch.ChapterId)
                        LEFT JOIN schoolmaster As sm ON (y.SchoolId = sm.SchoolId) 
                        Where y.SchoolId = ${user[0].SchoolId} AND y.classId = ${classId} 
                        AND y.CourseId = ${courseId} AND y.StatusId = 1 ORDER BY videoId DESC
                        limit ${query.limit}  offset  ${query.skip}`;  
          }
          else
          {
            search_query = `select y.*, sc.studentclass, c.coursename, ch.chaptername, sm.schoolname FROM youtubedetails y 
                        LEFT JOIN studentclass As sc ON (y.ClassId = sc.ClassId) 
                        LEFT JOIN course As c ON (y.CourseId = c.CourseId)
                        LEFT JOIN chapter As ch ON (y.ChapterId = ch.ChapterId)
                        LEFT JOIN schoolmaster As sm ON (y.SchoolId = sm.SchoolId) 
                        Where y.SchoolId = ${user[0].SchoolId} AND y.classId = ${classId} 
                        AND y.StatusId = 1 ORDER BY videoId DESC
                        limit ${query.limit}  offset  ${query.skip}`;  
          }
                 
        }
        else if(courseId)
        {
            search_query = `select y.*, sc.studentclass, c.coursename, ch.chaptername, sm.schoolname FROM youtubedetails y 
                        LEFT JOIN studentclass As sc ON (y.ClassId = sc.ClassId) 
                        LEFT JOIN course As c ON (y.CourseId = c.CourseId)
                        LEFT JOIN chapter As ch ON (y.ChapterId = ch.ChapterId)
                        LEFT JOIN schoolmaster As sm ON (y.SchoolId = sm.SchoolId) 
                        Where y.SchoolId = ${user[0].SchoolId} AND y.CourseId = ${courseId} 
                        AND y.StatusId = 1 ORDER BY videoId DESC
                        limit ${query.limit}  offset  ${query.skip}`;
        }
        else{
        search_query = `select y.*, sc.studentclass, c.coursename, ch.chaptername, sm.schoolname FROM youtubedetails y 
                        LEFT JOIN studentclass As sc ON (y.ClassId = sc.ClassId) 
                        LEFT JOIN course As c ON (y.CourseId = c.CourseId)
                        LEFT JOIN chapter As ch ON (y.ChapterId = ch.ChapterId)
                        LEFT JOIN schoolmaster As sm ON (y.SchoolId = sm.SchoolId) 
                        Where y.SchoolId = ${user[0].SchoolId} 
                        AND y.StatusId = 1 ORDER BY videoId DESC 
                        limit ${query.limit}  offset  ${query.skip}`;
      } 
     }
        console.log(search_query);
       //pool.query(`SELECT * FROM youtubedetails WHERE ChapterId = ? ORDER BY CAST(SUBSTRING(Part,LOCATE(' ',Part)+1) AS SIGNED) limit ${query.limit}  offset  ${query.skip}`, req.query.ChapterId,function(err,data){
       pool.query(search_query, [req.query.ChapterId],function(err,data)
       {
       if(err) 
       {
          response = {status:400,success:false,Error:"Error fetching data" + err};
       } 

       else if(data.length == 0)
       {
          response = {status: 200, success : false, message : "No Data Found."};
       }
       else 
       {
          var totalPages = Math.ceil(totalCount / size);    
          response = {status: 200, success : true, message : "Data Found", "URLdata": data,"Pages":totalPages,"TotalCount":totalCount};
       }
        res.json(response);
    });
}
 
  });
})(req, res, next);
}





//-----------------------------------------------------------------------------------------------------------------


//--------------------------------------Time Table Api's------------------------------------------------------------

module.exports.getTimeTableByTeacherId = function (req, res, next) { 
  passport.authenticate('jwt', function(err,user)
  {
     if (err || !user) 
     {
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     };
     var page = parseInt(req.query.page)
     var size = parseInt(req.query.size)
     console.log(user[0].TeacherId);
          
     var query = {}
     if(page < 0 || page === 0) 
     {
         response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
         return res.json(response)
    }
    query.skip = size * (page - 1)
    query.limit = size
    pool.query("select count(*) as Total from timetable where TeacherId = ?",user[0].TeacherId,function(err,totalCount){
    if(err) {
               response = {status:400,success:false,Error:"Error fetching data."};
    }
    {
       //pool.query(`select * from timetable where TeacherId = ? limit ${query.limit}  offset  ${query.skip}`,user[0].TeacherId,function(err,data){
        pool.query(`SELECT timetable.*, studentclass.StudentClass, teacher.TeacherName,
                      course.CourseName from timetable 
                      LEFT JOIN studentclass ON (timetable.ClassId = studentclass.ClassId) 
                      LEFT JOIN teacher ON (timetable.TeacherId = teacher.TeacherId) 
                      LEFT JOIN course ON (timetable.CourseId = course.CourseId) where 
                      timetable.TeacherId = ? limit ${query.limit}  offset  ${query.skip}`,user[0].TeacherId,function(err,data){
       if(err) 
       {
          response = {status:400,success:false,Error:"Error fetching data"};
       } 
       else if(data.length == 0)
       {
          response = {status: 200, success : false, message : "No Data Found"};
       }
       else 
       {
          var totalPages = Math.ceil(totalCount / size);    
          response = {status: 200, success : true, message : "Data Found", "TimeTable": data,"Pages":totalPages,"TotalCount":totalCount};
       }
        res.json(response);
    });
  }       
  })
  })(req, res, next);
}


// module.exports.getTimeTableByClassId = function (req, res, next) { 
//   passport.authenticate('jwt', function(err,user)
//   {
//      if (err || !user) 
//      {
//         return res.json({ status: 401, success: false, error: "Authentication Fail." });
//      };
//      var page = parseInt(req.query.page)
//      var size = parseInt(req.query.size)
//      console.log(user[0].TeacherId);
          
//      var query = {}
//      if(page < 0 || page === 0) 
//      {
//          response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
//          return res.json(response)
//     }
//     query.skip = size * (page - 1)
//     query.limit = size
//     pool.query("select count(*) as Total from timetable where TeacherId = ? AND ClassId = ?",[user[0].TeacherId, req.query.classId],function(err,totalCount){
//     if(err) {
//                response = {status:400,success:false,Error:"Error fetching data."};
//     }
//     {
//        //pool.query(`select * from timetable where TeacherId = ? limit ${query.limit}  offset  ${query.skip}`,user[0].TeacherId,function(err,data){
//         pool.query(`SELECT timetable.*, studentclass.StudentClass, teacher.TeacherName,
//                       course.CourseName from timetable 
//                       LEFT JOIN studentclass ON (timetable.ClassId = studentclass.ClassId) 
//                       LEFT JOIN teacher ON (timetable.TeacherId = teacher.TeacherId) 
//                       LEFT JOIN course ON (timetable.CourseId = course.CourseId) where 
//                       timetable.TeacherId = ? AND timetable.ClassId = ? limit ${query.limit}  offset  ${query.skip}`,[user[0].TeacherId, req.query.classId],function(err,data){
//        if(err) 
//        {
//           response = {status:400,success:false,Error:"Error fetching data" + err};
//        } 
//        else if(data.length == 0)
//        {
//           response = {status: 200, success : true, message : "No Data Found"};
//        }
//        else 
//        {
//           var totalPages = Math.ceil(totalCount / size);    
//           response = {status: 200, success : true, message : "Data Found", "TimeTable": data,"Pages":totalPages,"TotalCount":totalCount};
//        }
//         res.json(response);
//     });
//   }       
//   })
//   })(req, res, next);
// }


module.exports.getTimeTableByClassId = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  };
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  console.log(user[0].TeacherId);
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size
  var classId = req.query.classId;
  var search_query;
    
  if(classId)
  {
    search_query = "select count(*) as Total from timetable where TeacherId = ? AND ClassId = ?";
  }
  else
  {
    search_query = "select count(*) as Total from timetable where TeacherId = ?";
  }
  pool.query(search_query,[user[0].TeacherId, req.query.classId],function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }

    if(classId)
    {
        search_query = `SELECT timetable.*, studentclass.StudentClass, teacher.TeacherName,
                           course.CourseName from timetable 
                           LEFT JOIN studentclass ON (timetable.ClassId = studentclass.ClassId) 
                           LEFT JOIN teacher ON (timetable.TeacherId = teacher.TeacherId) 
                           LEFT JOIN course ON (timetable.CourseId = course.CourseId) where 
                           timetable.TeacherId = ? AND timetable.ClassId = ? limit ${query.limit}  offset  ${query.skip}`;
    }
    else
    {
        search_query = `SELECT timetable.*, studentclass.StudentClass, teacher.TeacherName,
                      course.CourseName from timetable 
                      LEFT JOIN studentclass ON (timetable.ClassId = studentclass.ClassId) 
                      LEFT JOIN teacher ON (timetable.TeacherId = teacher.TeacherId) 
                      LEFT JOIN course ON (timetable.CourseId = course.CourseId) where 
                      timetable.TeacherId = ? limit ${query.limit}  offset  ${query.skip}`;
    }

    pool.query(search_query,[user[0].TeacherId, req.query.classId],function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "TimeTable": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}



module.exports.getTimeTableByClassIdDD = function (req, res, next) { 
  passport.authenticate('jwt', function(err,user)
  {
     if (err || !user) 
     {
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     };
     console.log(user[0].TeacherId);          
     var query = {}
    {
        pool.query(`SELECT timetable.*, studentclass.StudentClass, teacher.TeacherName,
                      course.CourseName from timetable 
                      LEFT JOIN studentclass ON (timetable.ClassId = studentclass.ClassId) 
                      LEFT JOIN teacher ON (timetable.TeacherId = teacher.TeacherId) 
                      LEFT JOIN course ON (timetable.CourseId = course.CourseId) where 
                      timetable.TeacherId = ?`,[user[0].TeacherId],function(err,data){
       if(err) 
       {
          response = {status:400,success:false,Error:"Error fetching data" + err};
       } 
       else if(data.length == 0)
       {
          response = {status: 200, success : false, message : "No Data Found"};
       }
       else 
       {
          response = {status: 200, success : true, message : "Data Found", "TimeTable": data};
       }
        res.json(response);     
  })
  }
  })(req, res, next);
}



module.exports.getCourseByClassAndSchoolId = function(req, res, next) {
console.log("StudentId",req.query.classId)
 passport.authenticate('jwt', function(err,user)
  {
     if (err || !user) 
     {
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     };
   pool.query(`select * from course WHERE StatusId = 1 AND ClassId = ? AND SchoolId = ?`, [req.query.classId, user[0].SchoolId],function(err, course) {
    if (err){
      res.send({status:400,success:false,Error:"Error fetching data"});
    }

    else if(course.length == 0){
      res.send({status: 200, success : false, message : "No Data Found"});
    }
    else{
      console.log(course);
      res.json({status: 200, success : true, message : "Data Found", "course": course});
    }
   
  });
})(req, res, next);
}



//---------------------------------------------Assignment Api's 21st July 2020--------------------------

module.exports.insertAssignment = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
    console.log(user); 
 
    if (!req.file) 
    {
        console.log("No file received");
        res.status(400).send({ error:true, message: 'Please Provide Assignment Document.' });  
       
    }
    else if(req.file.size >= 5*1024*1024){
      return res.json({"status":400, success:false, message: 'File Too Large. It Should be less than 5MB.' });      
    }
    else 
    {
    filename = req.file.filename;      
      var insert_assignment = new Assignment(req.body, filename);
        if(!insert_assignment.ClassId){
            res.json({ status: 401, success: false, error: "Please Provide Class." });
        }
        if(!insert_assignment.CourseId){
          res.json({ status: 401, success: false, error: "Please Provide Course." });
        }
        if(!insert_assignment.ChapterId){
          res.json({ status: 401, success: false, error: "Please Provide Chapter." });
        }
        // if(!insert_assignment.TeacherId){
        //   res.json({ status: 401, success: false, error: "Please Provide Teacher." });
        // }
        // if(!insert_assignment.SchoolId){
        //   res.json({ status: 401, success: false, error: "Please Provide School." });
        // }
        if(!insert_assignment.AssignmentTitle){
          res.json({ status: 401, success: false, error: "Please Provide Assignment Title." });
        }
        if(!insert_assignment.AssignmentDate){
          res.json({ status: 401, success: false, error: "Please Provide Assignment Date." });
        }
        if(!insert_assignment.CompletionDate){
          res.json({ status: 401, success: false, error: "Please Provide Completion Date." });
        }
        //New Added
        if(!insert_assignment.TotalMarks){
          res.json({ status: 401, success: false, error: "Please Provide Total Marks." });
        }
        insert_assignment.TeacherId = user[0].TeacherId;
        insert_assignment.StatusId = 1;
        insert_assignment.CreatedById = user[0].SchoolId;
        insert_assignment.CreationDate = new Date();

        //console.log( "pppppp",user.parent[0].ParentId)
        console.log('Data', insert_assignment);
        Assignment.createAssignments(insert_assignment,user[0].SchoolId,function(err, assignment) {
        if (err)
        {
            console.log(err);
          //       if(err instanceof multer.MulterError) {
          //           res.send({"error":"File too large"});// to display filesize error
          // }
        }
        else
        {
            res.send({status:200,success:true,message:"Details saved successfully."});
        }
    }); 
}
})(req, res, next);
}


module.exports.updateAssignment = async function(req,res,next)
{ 
  passport.authenticate('jwt', function(err, user){
  if (err || !user) 
  {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
  }
 // console.log(req.file.filename); 
  if (!req.file) 
  {
        console.log("No file received", user);
        //filename = req.file.filename;    
        var update_assignment = new Assignment(req.body);
        console.log('TID',user[0].TeacherId);
        update_assignment.TeacherId = user[0].TeacherId;
        update_assignment.SchoolId = user[0].SchoolId;
        update_assignment.ModifiedById = user[0].SchoolId;
        update_assignment.ModificationDate = new Date();
        
        Assignment.updateAssignments(req.body.AssignmentId,update_assignment,function(err, assignment) {
        if(!update_assignment.ClassId){
            res.json({ status: 401, success: false, error: "Please Provide Class." });
        }
        if(!update_assignment.CourseId){
          res.json({ status: 401, success: false, error: "Please Provide Course." });
        }
        if(!update_assignment.ChapterId){
          res.json({ status: 401, success: false, error: "Please Provide Chapter." });
        }
        if(!update_assignment.AssignmentTitle){
          res.json({ status: 401, success: false, error: "Please Provide Assignment Title." });
        }
        if(!update_assignment.AssignmentDate){
          res.json({ status: 401, success: false, error: "Please Provide Assignment Date." });
        }
        if(!update_assignment.CompletionDate){
          res.json({ status: 401, success: false, error: "Please Provide Completion Date." });
        }
        else{
        console.log('Data', update_assignment);
        if(err)
        {
              res.json({status:200,success:false,message:"Details not updated"});
        }
        else
        {
              res.send({status:200,success:true,message:"Details updated successfully."});
        } 
      }
    });   
  } 
  else
  {
    try{
    if (!req.file) 
    {
        console.log("No file received");
       res.json({ status: 401, success: false, error: "Please Provide Assignment Document." });
    } 
    else 
    {
      filename = req.file.filename;    
      var update_assignment = new Assignment(req.body, filename);
        if(!update_assignment.ClassId){
            res.json({ status: 401, success: false, error: "Please Provide Class." });
        }
        if(!update_assignment.CourseId){
          res.json({ status: 401, success: false, error: "Please Provide Course." });
        }
        if(!update_assignment.ChapterId){
          res.json({ status: 401, success: false, error: "Please Provide Chapter." });
        }
        if(!update_assignment.AssignmentTitle){
          res.json({ status: 401, success: false, error: "Please Provide Assignment Title." });
        }
        if(!update_assignment.AssignmentDate){
          res.json({ status: 401, success: false, error: "Please Provide Assignment Date." });
        }
        if(!update_assignment.CompletionDate){
          res.json({ status: 401, success: false, error: "Please Provide Completion Date." });
        }
        update_assignment.TeacherId = user[0].TeacherId;
        //update_assignment.StatusId = 1;
        update_assignment.ModifiedById = user[0].SchoolId;
        update_assignment.ModificationDate = new Date();

        
        console.log('Data', update_assignment);
        Assignment.updateAssignments(req.body.AssignmentId,update_assignment,function(err, assignment) {
        if (err)
        {
            res.send({status:200,success:false,message:"Details not updated."});
        }
        else
        {
            res.send({status:200,success:true,message:"Details updated successfully."});
        }
    }); 
         
  }
  }catch(e){ console.log("catch",e);   }
  
  }    

  })(req,res,next);
}


// module.exports.updateAssignment = async function(req,res,next)
// {   
//   passport.authenticate('jwt',function(err,user)
//   {
//      console.log("IS Next", user);
//      if (err || !user) 
//      {
//         console.log("Test1")
//         console.log("User",err);
//         return res.json({ status: 401, success: false, error: "Authentication Fail." });
//      }
//     console.log(user); 
    
//     if (!req.file) 
//     {
//         console.log("No file received");
//        res.json({ status: 401, success: false, error: "Please Provide Assignment Document." });
//     } 
//     else 
//     {
//       filename = req.file.filename;    
//       var update_assignment = new Assignment(req.body, filename);
//         if(!update_assignment.ClassId){
//             res.json({ status: 401, success: false, error: "Please Provide Class." });
//         }
//         if(!update_assignment.CourseId){
//           res.json({ status: 401, success: false, error: "Please Provide Course." });
//         }
//         if(!update_assignment.ChapterId){
//           res.json({ status: 401, success: false, error: "Please Provide Chapter." });
//         }
//         if(!update_assignment.AssignmentTitle){
//           res.json({ status: 401, success: false, error: "Please Provide Assignment Title." });
//         }
//         if(!update_assignment.AssignmentDate){
//           res.json({ status: 401, success: false, error: "Please Provide Assignment Date." });
//         }
//         if(!update_assignment.CompletionDate){
//           res.json({ status: 401, success: false, error: "Please Provide Completion Date." });
//         }
//         update_assignment.TeacherId = user[0].TeacherId;
//         //update_assignment.StatusId = 1;
//         update_assignment.ModifiedById = user[0].SchoolId;
//         update_assignment.ModificationDate = new Date();

        
//         console.log('Data', update_assignment);
//         Assignment.updateAssignments(req.body.AssignmentId,update_assignment,function(err, assignment) {
//         if (err)
//         {
//             console.log(err);
//         }
//         else
//         {
//             res.send({status:200,success:true,message:"Details updated successfully."});
//         }
//     }); 
// }
// })(req, res, next);
// }


module.exports.getAssignmentById = function (req, res, next) { 
  passport.authenticate('jwt', function(err,user)
  {
     if (err || !user) 
     {
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     };

     console.log(user[0].TeacherId);
     var assignmentId = req.query.assignmentId;
      pool.query(`SELECT a.*, sc.StudentClass, t.TeacherName,
                      c.CourseName, ch.ChapterName, sm.SchoolName
                      from assignment as a
                      LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) 
                      LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
                      LEFT JOIN course as c ON (a.CourseId = c.CourseId)
                      LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
                      LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)where 
                      a.AssignmentId = ?`,[assignmentId],function(err,data){
       if(err) 
       {
          response = {status:400,success:false,Error:"Error fetching data"};
       } 
       else if(data.length == 0)
       {
          response = {status: 200, success : false, message : "No Data Found"};
       }
       else 
       {   
          response = {status: 200, success : true, message : "Data Found", "Assignment": data};
       }
        res.json(response);
    });
  })(req, res, next);
}


module.exports.getAllAssignment = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  };
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  console.log(user[0].TeacherId);
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size
  var classId = req.query.classId;
  var search_query;
    
    search_query = `select count(*) as Total from assignment Where TeacherId = ${user[0].TeacherId} AND SchoolId = ${user[0].SchoolId}`;
  pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }
    search_query = `SELECT a.*, sc.StudentClass, t.TeacherName,
                      c.CourseName, ch.ChapterName, sm.SchoolName
                      from assignment as a
                      LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) 
                      LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
                      LEFT JOIN course as c ON (a.CourseId = c.CourseId)
                      LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
                      LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) 
                      Where a.TeacherId = ${user[0].TeacherId} AND a.SchoolId = ${user[0].SchoolId}
                      limit ${query.limit}  offset  ${query.skip}`;
    

    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "Assignment": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}


// App Api..

// module.exports.getAssignmentBySchoolAndClass = function (req, res, next) { 
//   passport.authenticate('jwt', function(err,user)
//   {
//      if (err || !user) 
//      {
//         return res.json({ status: 401, success: false, error: "Authentication Fail." });
//      };
//      //console.log(user[0].TeacherId);
//      var classId = req.query.classId;
//      var schoolId = req.query.schoolId;
//      var status = req.query.status;
//      var search_query
     
//      if(status == 'pending')
//      {

//         search_query = `SELECT a.*, sc.StudentClass, t.TeacherName,
//                       c.CourseName, ch.ChapterName, sm.SchoolName
//                       from assignment as a
//                       LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) 
//                       LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
//                       LEFT JOIN course as c ON (a.CourseId = c.CourseId)
//                       LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
//                       LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)where 
//                       a.ClassId = ${classId} AND a.SchoolId = ${schoolId}`
//      }
//      else 
//      {
//         search_query = `SELECT a.*, sc.StudentClass, t.TeacherName,
//                       c.CourseName, ch.ChapterName, sm.SchoolName,
//                       assign.AssignmentDate, assign.CompletionDate, assign.AssignmentTitle
//                       from assignmentsubmit as a
//                       LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) 
//                       LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
//                       LEFT JOIN course as c ON (a.CourseId = c.CourseId)
//                       LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
//                       LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)
//                       LEFT JOIN assignment as assign ON (a.AssignmentId = assign.AssignmentId)
//                       where a.ClassId = ${classId} AND a.SchoolId = ${schoolId} AND a.AssignmentStatus = '${status}'`
//      }
//      console.log(search_query);
//       pool.query(search_query,function(err,data){
//        if(err) 
//        {
//           response = {status:400,success:false,Error:"Error fetching data"  + err};
//        } 
//        else if(data.length == 0)
//        {
//           response = {status: 200, success : false, message : "No Data Found"};
//        }
//        else 
//        {   
//        	  if(status == 'pending'){
       	  	
//        	  	data.forEach((e,i)=>
//        	  	{
//        	  		data[i].AssignmentStatus="pending"

//        	  	});
//        	  	response = {status: 200, success : true, message : "Data Found", "Assignment": data};
//        	  }
//        	  else{
// 			response = {status: 200, success : true, message : "Data Found", "Assignment": data};
//        	  }
          
//        }
//         res.json(response);
//     });
//   })(req, res, next);
// }


module.exports.getAssignmentBySchoolAndClass = function (req, res, next) { 
  passport.authenticate('jwt', function(err,user)
  {
     if (err || !user) 
     {
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     };
     
     console.log('Student',user);
     var classId = req.query.classId;
     var schoolId = req.query.schoolId;
     var status = req.query.status;
     var studentId = user.student[0].StudentId;
     var search_query
     
     if(status == 'pending')
     {
        // search_query = `SELECT a.*, sc.StudentClass, t.TeacherName,
        //               c.CourseName, ch.ChapterName, sm.SchoolName
        //               from assignment as a
        //               LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) 
        //               LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
        //               LEFT JOIN course as c ON (a.CourseId = c.CourseId)
        //               LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
        //               LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)where 
        //               a.ClassId = ${classId} AND a.SchoolId = ${schoolId}`


        search_query = `SELECT a.*, sc.StudentClass, t.TeacherName, 
     						c.CourseName, ch.ChapterName, sm.SchoolName 
     						from assignment as a 
     						LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) 
     						LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
     						LEFT JOIN course as c ON (a.CourseId = c.CourseId) 
     						LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId) 
     						LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) where 
     						a.ClassId = ${classId} AND a.SchoolId = ${schoolId} AND a.AssignmentId 
     						not in 
     						(select assignmentId from assignmentsubmit assign where assign.assignmentId = a.assignmentId and 
     						assign.StudentId = ${studentId})`
     }
     else if(status == 'submitted' || status == 'reject' || status == 'accept')
     {
     	// if(studentId){
     	// 	search_query = `SELECT a.*, sc.StudentClass, t.TeacherName, 
     	// 					c.CourseName, ch.ChapterName, sm.SchoolName 
     	// 					from assignment as a 
     	// 					LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) 
     	// 					LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
     	// 					LEFT JOIN course as c ON (a.CourseId = c.CourseId) 
     	// 					LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId) 
     	// 					LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) where 
     	// 					a.ClassId = ${classId} AND a.SchoolId = ${schoolId} AND a.AssignmentId 
     	// 					not in 
     	// 					(select assignmentId from assignmentsubmit assign where assign.assignmentId = a.AssignmentId and 
     	// 					assign.StudentId = ${studentId} AND AssignmentStatus = '${status}')`

     	search_query = `SELECT a.*, sc.StudentClass, t.TeacherName,
                      c.CourseName, ch.ChapterName, sm.SchoolName,
                      assign.AssignmentDate, assign.CompletionDate, assign.AssignmentTitle
                      from assignmentsubmit as a
                      LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) 
                      LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
                      LEFT JOIN course as c ON (a.CourseId = c.CourseId)
                      LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
                      LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)
                      LEFT JOIN assignment as assign ON (a.AssignmentId = assign.AssignmentId)
                      where a.ClassId = ${classId} AND a.SchoolId = ${schoolId} AND a.AssignmentStatus = '${status}' AND a.StudentId = ${studentId}`

                      //Need to add about reject case----
     }
     	else if (status == 'history'){
        search_query = `SELECT a.*, sc.StudentClass, t.TeacherName,
                      c.CourseName, ch.ChapterName, sm.SchoolName,
                      assign.AssignmentDate, assign.CompletionDate, assign.AssignmentTitle
                      from assignmentsubmit as a
                      LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) 
                      LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
                      LEFT JOIN course as c ON (a.CourseId = c.CourseId)
                      LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
                      LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)
                      LEFT JOIN assignment as assign ON (a.AssignmentId = assign.AssignmentId)
                      where a.ClassId = ${classId} AND a.SchoolId = ${schoolId} AND a.StudentId = ${studentId}`
     
 	}
     console.log(search_query);
      pool.query(search_query,function(err,data){
       if(err) 
       {
          response = {status:400,success:false,Error:"Error fetching data"  + err};
       } 
       else if(data.length == 0)
       {
          response = {status: 200, success : false, message : "No Data Found"};
       }
       else 
       {   
       	  if(status == 'pending'){
       	  	
       	  	data.forEach((e,i)=>
       	  	{
       	  		data[i].AssignmentStatus="pending"

       	  	});
       	  	response = {status: 200, success : true, message : "Data Found", "Assignment": data};
       	  }
       	  else{
			response = {status: 200, success : true, message : "Data Found", "Assignment": data};
       	  }
          
       }
        res.json(response);
    });
  })(req, res, next);
}





//Web Api
module.exports.assignmentSearch = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  };
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  console.log(user[0].TeacherId);
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size
  var classId = req.query.classId;
  var courseId = req.query.courseId;
  var chapterId = req.query.chapterId;
  var title = req.query.title;
  //var topicname = "\'" + req.query.topicname + "\%'";
  var teacherId = user[0].TeacherId;
  var schoolId = user[0].SchoolId;
  var search_query;
    
    if(classId)
    {
    if(courseId)
    {
      if(chapterId)
      { 
        if(title)
        {
          search_query = `select count(*) as Total from assignment 
                          where ClassId =${classId} AND CourseId = ${courseId}
                          AND ChapterId = ${chapterId} AND AssignmentTitle LIKE '%${title}%' 
                          AND StatusId = 1 AND TeacherId = ${teacherId} AND SchoolId = ${schoolId}`  
        }
        else
        {
          search_query = `select count(*) as Total from assignment 
                          where ClassId =${classId} AND CourseId = ${courseId} 
                          AND ChapterId = ${chapterId} AND StatusId = 1 AND TeacherId = ${teacherId}
                          AND SchoolId = ${schoolId}`  
        }
      }
      else{
        if(title)
        {
          search_query = `select count(*) as Total from assignment 
                          where ClassId =${classId} AND CourseId = ${courseId} 
                          AND StatusId = 1 AND TeacherId = ${teacherId}
                          AND SchoolId = ${schoolId} AND AssignmentTitle LIKE '%${title}%'` 
        }
        else{
          search_query = `select count(*) as Total from assignment 
                          where ClassId =${classId} AND CourseId = ${courseId} 
                          AND StatusId = 1 AND TeacherId = ${teacherId}
                          AND SchoolId = ${schoolId}`    
        }
        
      }
    }
    else
    {
        if(title)
        {
          search_query = `select count(*) as Total from assignment
                          where StatusId = 1 AND AssignmentTitle LIKE '%${title}%' AND TeacherId = ${teacherId} 
                          AND SchoolId = ${schoolId} AND ClassId = ${classId}`
        }
        else{
        search_query = `select count(*) as Total from assignment
                          where ClassId =${classId} AND StatusId = 1 AND TeacherId = ${teacherId}
                          AND SchoolId = ${schoolId}`  
        }
    }
  }
  else{
      if(title)
      {
            search_query = `select count(*) as Total from assignment
                          where StatusId = 1 AND TeacherId = ${teacherId} AND SchoolId = ${schoolId} AND AssignmentTitle LIKE '%${title}%'`
      }
      else
      {
        search_query = `select count(*) as Total from assignment
                          where StatusId = 1 AND TeacherId = ${teacherId} AND SchoolId = ${schoolId}`
       }
      }
  
   console.log('Count', search_query);
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }
   
   if(classId)
    {
    if(courseId)
    {
      if(chapterId)
      { 
        if(title)
        {
          search_query = `SELECT a.*, sc.StudentClass, c.CourseName, ch.ChapterName 
                          from assignment as a 
                          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)  
                          LEFT JOIN course as c ON (a.CourseId = c.CourseId) 
                          LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
                          where a.StatusId = 1 AND a.ClassId = ${classId} AND a.CourseId = ${courseId} AND a.ChapterId = ${chapterId} 
                          AND a.AssignmentTitle LIKE '%${title}%' AND a.TeacherId = ${teacherId} 
                          AND a.SchoolId = ${schoolId} 
                          Order By a.AssignmentId DESC
                          limit ${query.limit}  offset  ${query.skip}`
        }
        else
        {
          search_query = `SELECT a.*, sc.StudentClass, c.CourseName, ch.ChapterName 
                          from assignment as a 
                          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)  
                          LEFT JOIN course as c ON (a.CourseId = c.CourseId) 
                          LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
                          where a.StatusId = 1 AND a.ClassId = ${classId} AND a.CourseId = ${courseId} AND a.ChapterId = ${chapterId} 
                          AND a.TeacherId = ${teacherId} AND a.SchoolId = ${schoolId} 
                          Order By a.AssignmentId DESC
                          limit ${query.limit}  offset  ${query.skip}` 
        }
      }
      else{
          if(title)
          {
                    search_query = `SELECT a.*, sc.StudentClass, c.CourseName, ch.ChapterName
                          from assignment as a 
                          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)  
                          LEFT JOIN course as c ON (a.CourseId = c.CourseId)
                          LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
                          where a.StatusId = 1 AND a.ClassId = ${classId} AND a.CourseId = ${courseId} 
                          AND a.TeacherId = ${teacherId} AND a.SchoolId = ${schoolId} AND a.AssignmentTitle LIKE '%${title}%' limit ${query.limit}  offset  ${query.skip}`  
          }
          else{
          search_query = `SELECT a.*, sc.StudentClass, c.CourseName, ch.ChapterName
                          from assignment as a 
                          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)  
                          LEFT JOIN course as c ON (a.CourseId = c.CourseId) 
                          LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
                          where a.StatusId = 1 AND a.ClassId = ${classId} AND a.CourseId = ${courseId} 
                          AND a.TeacherId = ${teacherId} AND a.SchoolId = ${schoolId} 
                          Order By a.AssignmentId DESC
                          limit ${query.limit}  offset  ${query.skip}`  
      }
    }
    }
    else
    {
        if(title)
        {
          search_query = `SELECT a.*, sc.StudentClass, c.CourseName, ch.ChapterName 
                          from assignment as a 
                          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)  
                          LEFT JOIN course as c ON (a.CourseId = c.CourseId) 
                          LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
                          where a.StatusId = 1 AND a.AssignmentTitle LIKE '%${title}%' AND a.TeacherId = ${teacherId} 
                          AND a.SchoolId = ${schoolId} AND a.ClassId = ${classId} 
                          Order By a.AssignmentId DESC
                          limit ${query.limit}  offset  ${query.skip}`
        }
        else{
        search_query = `SELECT a.*, sc.StudentClass, c.CourseName, ch.ChapterName 
                          from assignment as a 
                          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)  
                          LEFT JOIN course as c ON (a.CourseId = c.CourseId) 
                          LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
                          where a.StatusId = 1 AND a.ClassId = ${classId} 
                          AND a.TeacherId = ${teacherId} 
                          AND a.SchoolId = ${schoolId} 
                          Order By a.AssignmentId DESC
                          limit ${query.limit}  offset  ${query.skip}`  
    }}
  }else{

      if(title)
      {
           search_query = `SELECT a.*, sc.StudentClass, c.CourseName, ch.ChapterName 
                          from assignment as a 
                          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)  
                          LEFT JOIN course as c ON (a.CourseId = c.CourseId) 
                          LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
                          where a.StatusId = 1 AND a.AssignmentTitle LIKE '%${title}%' AND a.TeacherId = ${teacherId} 
                          AND a.SchoolId = ${schoolId} 
                          Order By a.AssignmentId DESC
                          limit ${query.limit}  offset  ${query.skip}`

       }
      else{
        search_query = `SELECT a.*, sc.StudentClass, c.CourseName, ch.ChapterName
                          from assignment as a 
                          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)  
                          LEFT JOIN course as c ON (a.CourseId = c.CourseId) 
                          LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
                          where a.StatusId = 1 AND a.TeacherId = ${teacherId} 
                          AND a.SchoolId = ${schoolId} 
                          Order By a.AssignmentId DESC
                          limit ${query.limit}  offset  ${query.skip}`  
    }
  }

    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data"};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : true, message : "No Data Found."};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "Assignment": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}







//---------------------------------------------Assignment End-------------------------------------------


//-----------------------------------------Assignment Submit Start--------------------------------------------

//App Api
module.exports.insertAssignmentSubmit = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
    console.log(user); 
    
    if (!req.file) 
    {
        console.log("No file received");
        res.status(400).send({ error:true, message: 'Please Provide Assignment Document.' });  
       
    }
    else if(req.file.size >= 5*1024*1024){
      return res.json({"status":400, success:false, message: 'File Too Large. It Should be less than 5MB.' });      
    }
    else 
    {
      filename = req.file.filename;     
      var insert_assignmentSub = new AssignmentSubmit(req.body, filename);
        if(!insert_assignmentSub.ClassId){
            res.json({ status: 401, success: false, error: "Please Provide Class." });
        }
        if(!insert_assignmentSub.CourseId){
          res.json({ status: 401, success: false, error: "Please Provide Course." });
        }
        if(!insert_assignmentSub.ChapterId){
          res.json({ status: 401, success: false, error: "Please Provide Chapter." });
        }
        if(!insert_assignmentSub.TeacherId){
          res.json({ status: 401, success: false, error: "Please Provide Teacher." });
        }
        if(!insert_assignmentSub.SchoolId){
          res.json({ status: 401, success: false, error: "Please Provide School." });
        }
        if(!insert_assignmentSub.AssignmentStatus){
          res.json({ status: 401, success: false, error: "Please Provide Assignment Status." });
        }
        //New Added..
        // if(!insert_assignmentSub.TotalMarks){
        //   res.json({ status: 401, success: false, error: "Please Provide Total Marks." });
        // }
        // if(!insert_assignmentSub.AchievedMark){
        //   res.json({ status: 401, success: false, error: "Please Provide Achieved Marks." });
        // }
        // if(!insert_assignmentSub.RejectReason){
        //   res.json({ status: 401, success: false, error: "Please Provide Reject Reason." });
        // }

        insert_assignmentSub.StudentId = user.student[0].StudentId;
        insert_assignmentSub.StatusId = 1;
        insert_assignmentSub.CreatedById = req.body.SchoolId;
        insert_assignmentSub.CreationDate = new Date();

        console.log('Data', insert_assignmentSub);
        AssignmentSubmit.createAssignments(insert_assignmentSub, req.body.SchoolId,function(err, assignment) {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send({status:200,success:true,message:"Details saved successfully."});
        }
    }); 
}
})(req, res, next);
}

//Marks assignmnet accept kiya..number

//Web Api
module.exports.getAssignmentByTeacherId = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  };
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  console.log(user[0].TeacherId);
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size
  //var classId = req.query.classId;
  var assignmentId = req.query.assignmentId;
  var assignmentStatus = req.query.assignmentStatus;
  var classId = req.query.classId;
  var search_query;
    
    //if(classId)
    if(assignmentId)
    {
      if(assignmentStatus)
      {
        //search_query = `select count(*) as Total from assignmentsubmit where TeacherId = ? AND classId =${classId} AND AssignmentStatus = '${assignmentStatus}' AND StatusId = 1 AND SchoolId = ${user[0].SchoolId}`
        //search_query = `select count(*) as Total from assignmentsubmit where TeacherId = ? AND AssignmentId =${assignmentId} AND AssignmentStatus = '${assignmentStatus}' AND StatusId = 1 AND SchoolId = ${user[0].SchoolId}`
        if(classId)
        {
          search_query = `select count(*) as Total from assignmentsubmit 
          where AssignmentId =${assignmentId} AND AssignmentStatus = '${assignmentStatus}' 
          AND ClassId = ${classId} AND StatusId = 1`  
        }
        else
        {
          search_query = `select count(*) as Total from assignmentsubmit 
          where AssignmentId =${assignmentId} AND AssignmentStatus = '${assignmentStatus}' 
          AND StatusId = 1`
        }
      }
      else{
        //search_query = `select count(*) as Total from assignmentsubmit where TeacherId = ? AND classId =${classId} AND StatusId = 1 AND SchoolId = ${user[0].SchoolId}`
        search_query = `select count(*) as Total from assignmentsubmit 
        where AssignmentId =${assignmentId} AND StatusId = 1 `
      }
   }
    
    // else{
    //   search_query = `select count(*) as Total from assignmentsubmit where TeacherId = ? AND StatusId = 1 AND SchoolId = ${user[0].SchoolId}`;
    // }
    //pool.query(search_query,user[0].TeacherId,function(err,totalCount){
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }
    //if(classId)
    if(assignmentId)
    {
      if(assignmentStatus)
      {
          // search_query = `SELECT a.*, sc.StudentClass, t.TeacherName,
          //             c.CourseName, ch.ChapterName, sm.SchoolName, st.StudentName, assign.AssignmentTitle 
          //             from assignmentsubmit as a
          //             LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)
          //             LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
          //             LEFT JOIN course as c ON (a.CourseId = c.CourseId)
          //             LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
          //             LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)
          //             LEFT JOIN studentmain as st ON (a.StudentId = st.StudentId)
          //             LEFT JOIN assignment as assign ON (a.AssignmentId = assign.AssignmentId)
          //             where a.ClassId = ${classId} AND a.AssignmentStatus = '${assignmentStatus}' AND a.TeacherId = ${user[0].TeacherId} AND a.SchoolId = ${user[0].SchoolId} limit ${query.limit}  offset  ${query.skip}`

      //     search_query = `SELECT a.*, sc.StudentClass, t.TeacherName,
      //                 c.CourseName, ch.ChapterName, sm.SchoolName, st.StudentName, assign.AssignmentTitle 
      //                 from assignmentsubmit as a
      //                 LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)
      //                 LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
      //                 LEFT JOIN course as c ON (a.CourseId = c.CourseId)
      //                 LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
      //                 LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)
      //                 LEFT JOIN studentmain as st ON (a.StudentId = st.StudentId)
      //                 LEFT JOIN assignment as assign ON (a.AssignmentId = assign.AssignmentId)
      //                 where a.AssignmentSubmitId = ${assignmentId} AND a.AssignmentStatus = '${assignmentStatus}' AND a.TeacherId = ${user[0].TeacherId} AND a.SchoolId = ${user[0].SchoolId} limit ${query.limit}  offset  ${query.skip}`

          if(classId)
          {
            search_query = `SELECT a.*, sc.StudentClass, t.Username, c.CourseName, ch.ChapterName, 
          sm.SchoolName, st.StudentName, assign.AssignmentTitle, assign.TotalMarks as Marks
          from assignmentsubmit as a 
          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) 
          LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
          LEFT JOIN course as c ON (a.CourseId = c.CourseId) 
          LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId) 
          LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) 
          LEFT JOIN studentmain as st ON (a.StudentId = st.StudentId) 
          LEFT JOIN assignment as assign ON (a.AssignmentId = assign.AssignmentId) 
          where a.AssignmentId = ${assignmentId} AND a.AssignmentStatus = '${assignmentStatus}' AND a.ClassId = ${classId} limit ${query.limit}  offset  ${query.skip}`;
       }
       else
       {
        search_query = `SELECT a.*, sc.StudentClass, t.TeacherName,
                      c.CourseName, ch.ChapterName, sm.SchoolName, st.StudentName, 
                      assign.AssignmentTitle, assign.TotalMarks as Marks 
                      from assignmentsubmit as a
                      LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)
                      LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
                      LEFT JOIN course as c ON (a.CourseId = c.CourseId)
                      LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
                      LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)
                      LEFT JOIN studentmain as st ON (a.StudentId = st.StudentId)
                      LEFT JOIN assignment as assign ON (a.AssignmentId = assign.AssignmentId)
                      where a.AssignmentId = ${assignmentId} AND a.AssignmentStatus = '${assignmentStatus}' limit ${query.limit}  offset  ${query.skip}`
       }
     }
      else
      {
        // search_query = `SELECT a.*, sc.StudentClass, t.TeacherName,
        //               c.CourseName, ch.ChapterName, sm.SchoolName, st.StudentName, assign.AssignmentTitle 
        //               from assignmentsubmit as a
        //               LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) 
        //               LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
        //               LEFT JOIN course as c ON (a.CourseId = c.CourseId)
        //               LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
        //               LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)
        //               LEFT JOIN studentmain as st ON (a.StudentId = st.StudentId)
        //               LEFT JOIN assignment as assign ON (a.AssignmentId = assign.AssignmentId)
        //               where a.ClassId = ${classId} AND a.TeacherId = ${user[0].TeacherId} AND a.SchoolId = ${user[0].SchoolId} limit ${query.limit}  offset  ${query.skip}`

        // search_query = `SELECT a.*, sc.StudentClass, t.TeacherName,
        //               c.CourseName, ch.ChapterName, sm.SchoolName, st.StudentName, assign.AssignmentTitle 
        //               from assignmentsubmit as a
        //               LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) 
        //               LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
        //               LEFT JOIN course as c ON (a.CourseId = c.CourseId)
        //               LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
        //               LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)
        //               LEFT JOIN studentmain as st ON (a.StudentId = st.StudentId)
        //               LEFT JOIN assignment as assign ON (a.AssignmentId = assign.AssignmentId)
        //               where a.AssignmentSubmitId = ${assigmentId} AND a.TeacherId = ${user[0].TeacherId} AND a.SchoolId = ${user[0].SchoolId} limit ${query.limit}  offset  ${query.skip}`

search_query = `SELECT a.*, sc.StudentClass, t.TeacherName,
                      c.CourseName, ch.ChapterName, sm.SchoolName, st.StudentName, assign.AssignmentTitle,
                      assign.TotalMarks as Marks 
                      from assignmentsubmit as a
                      LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) 
                      LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
                      LEFT JOIN course as c ON (a.CourseId = c.CourseId)
                      LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
                      LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)
                      LEFT JOIN studentmain as st ON (a.StudentId = st.StudentId)
                      LEFT JOIN assignment as assign ON (a.AssignmentId = assign.AssignmentId)
                      where a.AssignmentId = ${assignmentId} limit ${query.limit}  offset  ${query.skip}`


      }
   } 
    // else{
    //     s, t.TeacherName,
    //                   c.CourseName, ch.ChapterName, sm.SchoolName, st.StudentName, assign.AssignmentTitle 
    //                   from assignmentsubmit as a
    //                   LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) 
    //                   LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
    //                   LEFT JOIN course as c ON (a.CourseId = c.CourseId)
    //                   LEFT JOIN chapter as ch ON (a.ChapterId = ch.ChapterId)
    //                   LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)
    //                   LEFT JOIN studentmain as st ON (a.StudentId = st.StudentId)
    //                   LEFT JOIN assignment as assign ON (a.AssignmentId = assign.AssignmentId)
    //                   where a.TeacherId = ${user[0].TeacherId} AND a.SchoolId = ${user[0].SchoolId} limit ${query.limit}  offset  ${query.skip}`
    // }
    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "Assignment": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}


module.exports.updateAssignmentStatus = async function(req,res,next)
{ 
  passport.authenticate('jwt', function(err, user){
  if (err || !user) 
  {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
  }
  if (!req.RejectReason) 
  {
        console.log("No file received", user);
        //filename = req.file.filename;    
        var update_assignment = new AssignmentSubmit(req.body);
        
        AssignmentSubmit.updateAssignmentStatus(req.body.AssignmentSubmitId,update_assignment,function(err, assignment) {
        if(!update_assignment.AssignmentStatus){
            res.json({ status: 401, success: false, error: "Please Provide Assignment Status." });
        }
        else{
        console.log('Data', update_assignment);
        if(err)
        {
              res.json({status:200,success:false,message:"Details not updated"});
        }
        else
        {
              res.send({status:200,success:true,message:"Details updated successfully."});
        } 
      }
    });   
  } 
  else
  {
    try{ 
      var update_assignment = new AssignmentSubmit(req.body);
        if(!update_assignment.AssignmentStatus){
            res.json({ status: 401, success: false, error: "Please Provide Assignment Status." });
        }
        if(!update_assignment.RejectReason){
          res.json({ status: 401, success: false, error: "Please Provide Reject Reason." });
        }
        
        update_assignment.TeacherId = user[0].TeacherId;
        //update_assignment.StatusId = 1;
        update_assignment.ModifiedById = user[0].SchoolId;
        update_assignment.ModificationDate = new Date();

        console.log('Data', update_assignment);
        AssignmentSubmit.updateAssignmentStatus(req.body.AssignmentSubmitId,update_assignment,function(err, assignment) {
        if (err)
        {
            res.send({status:200,success:false,message:"Details not updated."});
        }
        else
        {
            res.send({status:200,success:true,message:"Details updated successfully."});
        }
    }); 
         
  
  }catch(e){ console.log("catch",e);   }
  
  }    

  })(req,res,next);
}





//---------------------------------------------Assignment Submit End----------------------------------------


//---------------------------------------------Student Count and Parent Count and School Count --------------------------------

module.exports.getStudentParentCount = function(req,res, next){
passport.authenticate('jwt', function(err, user){
if(err || !user) 
{
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
}
pool.query(`select (SELECT COUNT(*) FROM parentmain WHERE StatusId = 1 AND SchoolId = ${user[0].SchoolId}) as parent_count, (SELECT COUNT(*) FROM studentmain WHERE StatusId = 1 AND SchoolId = ${user[0].SchoolId}) as student_count`,function(err,totalCount){
    console.log(totalCount);
        if(err) {
               return res.json({status:400,success:false,message:"Error fetching data."});
        }
        else{
               return res.json({status:400,success: true, message:"Data Found", data: totalCount[0]});
        }
        //res.json(response);
})
})(req, res, next);
}

//Web Api
module.exports.getSchoolCount = function(req,res, next){
passport.authenticate('jwt', function(err, user){
if(err || !user) 
{
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
}
pool.query(`select count(*) as school_count FROM schoolmaster WHERE StatusId = 1`,function(err,totalCount){
    console.log(totalCount);
        if(err) {
               return res.json({status:400,success:false,message:"Error fetching data."});
        }
        else{
               return res.json({status:400,success: true, message:"Data Found", data: totalCount[0]});
        }
        //res.json(response);
})
})(req, res, next);
}

//Web Api School Token
module.exports.getTeacherCount = function(req,res, next){
passport.authenticate('jwt', function(err, user){
if(err || !user) 
{
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
}
pool.query(`select count(*) as teacher_count FROM teacher WHERE StatusId = 1 AND SchoolId = ${user[0].SchoolId}`,function(err,totalCount){
    console.log(totalCount);
        if(err) {
               return res.json({status:400,success:false,message:"Error fetching data."});
        }
        else{
               return res.json({status:200,success: true, message:"Data Found", data: totalCount[0]});
        }
})
})(req, res, next);
}

//Web Api School Token
module.exports.getClassCount = function(req,res, next){
passport.authenticate('jwt', function(err, user){
if(err || !user) 
{
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
}
pool.query(`select count(Distinct(ClassId)) as class_count FROM studentmain WHERE StatusId = 1 AND SchoolId = ${user[0].SchoolId}`,function(err,totalCount){
    console.log(totalCount);
        if(err) {
               return res.json({status:400,success:false,message:"Error fetching data."});
        }
        else{
               return res.json({status:200,success: true, message:"Data Found", data: totalCount[0]});
        }
})
})(req, res, next);
}

module.exports.getCourseCount = function(req,res, next){
passport.authenticate('jwt', function(err, user){
if(err || !user) 
{
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
}
pool.query(`select count(*) as course_count FROM course WHERE StatusId = 1 AND SchoolId = ${user[0].SchoolId}`,function(err,totalCount){
    console.log(totalCount);
        if(err) {
               return res.json({status:400,success:false,message:"Error fetching data."});
        }
        else{
               return res.json({status:200,success: true, message:"Data Found", data: totalCount[0]});
        }
})
})(req, res, next);
}

//-----------------------------------------------------------------------------------------------------------

//------------------------New App Api, Insert Parent and update Student--------------------------------------

module.exports.insertParentUpdateStudent = function(req, res, next){
 passport.authenticate('jwt', function(err, user){
 if(err || !user) 
 {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
 }
 console.log('User', user);
 var studentId = user.student[0].StudentId;
	var parent_detail = new ParentMain(req.body);
  //handles null error 
  if(!parent_detail.ParentName){
    res.json({ status: 401, success: false, error: "Please Provide Parent Name." });
  } 
   if(!parent_detail.ParentMobile){
    res.json({ status: 401, success: false, error: "Please Provide Parent Mobile." });
  } 
  if(!parent_detail.ParentPassword){
    res.json({ status: 401, success: false, error: "Please Provide Parent Password." });
  }
  if(!parent_detail.ParentAddress){
    res.json({ status: 401, success: false, error: "Please Provide Parent Address." });
  } 
  else{
  //console.log(totalCount)
  parent_detail.FBToken = "";
  parent_detail.StatusId = 1;
  parent_detail.SchoolId = user.school[0].SchoolId
  parent_detail.CreatedById = studentId;

  console.log('Test',parent_detail.SchoolId);
  ParentMain.createParentDetail(parent_detail, parent_detail.SchoolId ,function(err, parentdetail) {
    if (err){
                console.log(err)
                     if( err.code=="ER_DUP_ENTRY")
                     {
                        console.log(err.sqlMessage.split(" ")[5])
                        let sqlmsg =err.sqlMessage.split(" ")[5]
                        if(sqlmsg==="'ParentMobile'") {
                        console.log('working')
                      return res.json({ status: 401, success: false, error: "Parent Mobile Already Exists." });
                      }
                       if(sqlmsg==="'ParentEmail'") {
                        console.log('Email')
                      return res.json({ status: 401, success: false, error: "Parent Email Already Exists." });
                      } 
                    }
    }
    else{
            console.log(parentdetail);
            console.log(parentdetail.ParentId);
            updateParentIdInStudent(parentdetail.id, studentId)
            res.json({status:200,success:true,Message:"Parent Details saved successfully."});
    }
    //res.json(testData);
  });
}
  })(req, res, next);
}

function updateParentIdInStudent(parentId, studentId){
	pool.query(`update studentmain set parentId = ${parentId} where studentId = ${studentId}`, function(err, data){
		if(err){
			console.log(err);
		}
		else{
			console.log(data);
		}
	});
}



//--------------------------------------------------------------------------------------------------------------

//-------------------------------Test Youtube Upload Api-------------------------------------------------------


// const authorize = require('../lib/auth.youtube');


// module.exports.runSample = function(req, res){
//   authorize.Validate(req, res, function(err, data)
//     {
//       if(err){
//         console.log('Error in Controller', err);
//       }
//       else
//       {
//         console.log('Controller', data.Message);
//       }
//     });
// }

// module.exports.oauth2callback = function(req, res){
//   code = req.query.code;
//   authorize.Callback(code, function(err, data){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log('Data',data);
//       res.json({status: 401, success: true, error: "Welcome" });
//     }
//   });
// }


// module.exports.createPlaylistInYoutube = function (req, res)
// {
//   playlisttitle = req.query.title;
//   desc = req.query.description;
//   authorize.createPlaylist(playlisttitle, desc, function(err, data)
//     {
//       if(err)
//       {
//         console.log(err);
//       }
//       else{
//         console.log('Controller Id',data.id);
//         console.log('Controller Title',data.title);
//         console.log('Controller Desc',data.description);
//       }
//     });
// }



// module.exports.singleInsertYoutubeDetails = function(req, res)
// {
//   console.log('Body',req.body);
//   var body = req.body;
//   //console.log('files',req.files);
//   //console.log('file',req.files["channelvideo"][0].filename);
//   //console.log('file',req.files["thumbnail"][0].filename);
//   if (!req.files) 
//     {
//         console.log("No file received");
//     }
//     else{
//   console.log('FN', req.file);
//   filename = './public/youtubechannel/' + req.files["channelvideo"][0].filename;
//   var title = req.body.title;
//   var desc = req.body.description;
//   var tags = req.body.tags;
//   var thumbnail = './public/youtubechannel/' + req.files["thumbnail"][0].filename;
//   authorize.Upload(filename, title, desc, tags,thumbnail, function(err, data){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log('Data Controller',data);
//       //console.log('videoId1', data.data.id);
//       console.log('videoId2', data.send.data.id);
//       insertyoutubedata(req,res,data.send.data.id,body);
//     }
//   });
// }
// }


// function insertyoutubedata(req,res,data,body){
//   console.log('functuion', data, body);
//   var tit = body.title;
//   var youtube_data = new Youtube(body);
//   youtube_data.SchoolId = body.schoolId;
//   youtube_data.ClassId = body.classId;
//   youtube_data.CourseId = body.courseId;
//   youtube_data.ChapterId = body.chapterId;
//   youtube_data.part = body.part;
//   youtube_data.Title = tit;

//   youtube_data.youtubevideoid = data;
//   youtube_data.youtubeurl = 'https://www.youtube.com/watch?v='+data;
//   youtube_data.description = body.description;
//   youtube_data.thumbnail = 'https://img.youtube.com/vi/'+data+'/mqdefault.jpg';
//   youtube_data.Subscription = body.subscription;
//   youtube_data.Tags = body.tags;
//   youtube_data.StatusId = 1;
//   youtube_data.CreatedById = body.schoolId;

//   console.log('YouTube Data', youtube_data);
//   Youtube.createSingleYoutubeData(youtube_data, function(err,res){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log("Data Inserted..",res)
//     }
//   })

// }

// module.exports.insertVideoInPlaylist = function(req, res)
// {
//     var playlistId = req.query.playlistId;
//     var videoId = req.query.videoId;
//     authorize.addVideoToPlaylist(playlistId, videoId,function(err, data)
//     {
//        if(err)
//        {
//           console.log(err);
//        }
//        else
//        {
//          console.log(data);
//        }
//     });
// }

//------------------------------------------------------------------------------------------------------------



//----------------------------------------Live Recording Detail-----------------------------------------------

// module.exports.insertLiveRecordingDetails = function(req, res, next) {
//   console.log("IS Next", 'Test');
//   passport.authenticate('jwt',function(err,user)
//   {
//      console.log("IS Next", user);
//      if (err || !user) 
//      {
//         console.log("Test1")
//         console.log("User",err);
//         return res.json({ status: 401, success: false, error: "Authentication Fail." });
//      }
//      var new_liverecording = new LiveRecordingDetail(req.body);
//      //handles null error 
//     if(!new_liverecording.StreamName)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide StreamName." });
//     }
//     else if(!new_liverecording.VodName)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide VodName." });
//     }  
//     else if(!new_liverecording.StreamId)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide StreamId." });
//     }
//     else if(!new_liverecording.CreationDate)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide CreationDate." });
//     }   
//     else if(!new_liverecording.Duration)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide Duration." });
//     }
//     else if(!new_liverecording.FileSize)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide File Size." });
//     }
//     else if(!new_liverecording.FilePath)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide File Path." });
//     }
//     else if(!new_liverecording.VodId)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide Vod Id." });
//     }
//     else if(!new_liverecording.type)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide Type." });
//     } 
//     else{
//         new_liverecording.StatusId = 1;
//         new_liverecording.CreatedById = user[0].SchoolId;
//         new_liverecording.CreationDatee = new Date();

//         //console.log( "pppppp",user.parent[0].ParentId)
//         console.log('Data', new_liverecording);
//         LiveRecordingDetail.createDetails(new_liverecording,function(err, details) {
//         if (err)
//         {
//             console.log(err);
//         }
//         else
//         {
//             res.send({status:200,success:true,message:"Details saved successfully."});
//         }
//     }); 
// }
// })(req, res, next);
// }

// module.exports.updateLiveRecordingDetails = function(req, res, next) {
//   console.log("IS Next", 'Test');
//   passport.authenticate('jwt',function(err,user)
//   {
//      console.log("IS Next", user);
//      if (err || !user) 
//      {
//         console.log("Test1")
//         console.log("User",err);
//         return res.json({ status: 401, success: false, error: "Authentication Fail." });
//      }
//       new_liverecording = new LiveRecordingDetail(req.body);
//      //handles null error 
//     if(!new_liverecording.StreamName)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide StreamName." });
//     }
//     else if(!new_liverecording.VodName)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide VodName." });
//     }  
//     else if(!new_liverecording.StreamId)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide StreamId." });
//     }
//     else if(!new_liverecording.CreationDate)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide CreationDate." });
//     }   
//     else if(!new_liverecording.Duration)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide Duration." });
//     }
//     else if(!new_liverecording.FileSize)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide File Size." });
//     }
//     else if(!new_liverecording.FilePath)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide File Path." });
//     }
//     else if(!new_liverecording.VodId)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide Vod Id." });
//     }
//     else if(!new_liverecording.type)
//     { 
//         res.json({ status: 401, success: false, error: "Please Provide Type." });
//     } 
   
//     else
//     {
        
//         new_liverecording.ModifiedById = user[0].SchoolId;
//         new_liverecording.ModificationDate = new Date();
//         console.log('Data', new_liverecording);
        
//         LiveRecordingDetail.updateDetails(new_liverecording, req.body.LiveRecordingDetailId,function(err, youtube) {
//         if (err)
//         {
//             console.log(err);
//         }
//         else
//         {
//             res.send({status:200,success:true,message:"Details updated successfully."});
//         }
//     }); 
// }
// })(req, res, next);
// }

module.exports.getLiveRecording = function(req, res, next){
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
     var stream;
  pool.query('select * from liveclasslink where SchoolId = ?', user[0].SchoolId, function(err,data){
    if(err){
      console.log(err);
    }
    else{
      data.forEach((e,i)=>{
        var streamId = data[i].LiveClass;
        console.log(streamId);
        stream = streamId.slice(29);
        console.log('Stream Id',stream);
        var count = 0;
        var ids = [];
        ids.push(stream);
        console.log(ids,'New IDS')
        // stream.forEach((ele,ind)=>{
        //     ids.push(ele);
        //     console.log(ele);
        // });
         getStreamFromLiveClass(ids, res);
      });
  }
});
})(req, res, next)
}

function getStreamFromLiveClass(stream, res){

console.log('test',stream);  
stream.forEach((e,i)=>{
  pool.query('select * from liverecordingdetail where StreamId = ?', stream[i], function(err,data){
    if(err){
      console.log(err);
    }
    else{
      console.log(data.length);
      //console.log('Live Recording',data)
      res.send({status:200,success:true,message:data});
    }
});
});

}


//------------------------------------------------------------------------------------------------------------


//------------------------Parent Status----------------------

//App Api
module.exports.getDefaultParent = function(req, res, next){
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
     pool.query('select parentid from studentmain where parentid=1074', function(err, data){
      if(err){
        console.log(err)
      }
      else if(data.length == 0){
        console.log(data)
        res.send({status:200,success:false,message:"Data Not Found.", isParent: false});
      }
      else{
       res.send({status:200,success:false,message:"Data Found.",isParent: true}); 
      }

     });




   })(req, res, next)
}



//----------------------------------------------------------


//App Api

module.exports.updateRejectAssignmentStatus = function(req, res, next){
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
    if (!req.file) 
    {
        console.log("No file received");
        res.status(400).send({ error:true, message: 'Please Provide Assignment Document.' });  
    }
    else if(req.file.size >= 5*1024*1024){
      return res.json({"status":400, success:false, message: 'File Too Large. It Should be less than 5MB.' });      
    }
    else{
        filename = req.file.filename;    
        var update_assignment = new AssignmentSubmit(req.body, filename); 

        AssignmentSubmit.updateAssignmentRejectStatus(req.body.AssignmentSubmitId,update_assignment,function(err, assignment) {
        if(!update_assignment.AssignmentStatus){
            res.json({ status: 401, success: false, error: "Please Provide Assignment Status." });
        }
        else{
        console.log('Data', update_assignment);
        if(err)
        {
              res.json({status:200,success:false,message:"Details not updated"});
        }
        else
        {
              res.send({status:200,success:true,message:"Details updated successfully."});
        } 
      }
    });
      }

  })(req, res, next);
}

//--------------------------------------------------------------------------------------------------------------

//------------------------------Instructor App Api---------------------------------------------------------------

//App Api

module.exports.getSchoolLiveData = function(req, res, next)
{
  passport.authenticate('jwt',function(err,user)
  {
     //console.log("IS Next", user);
     if (err || !user) 
     {
        //console.log("Test1")
        //console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
     var schoolId = req.query.schoolId;
     var a_query;
     // query = `SELECT DISTINCT tt.*, tea.TeacherName, tea.TeacherMobile, tea.TeacherEmail, c.coursename, 
     //              live.liveclass, live.ClassId from timetable as tt 
     //              LEFT JOIN teacher as tea ON (tt.TeacherId = tea.TeacherId) 
     //              LEFT JOIN course as c ON (tt.CourseId = c.CourseId) 
     //              JOIN liveclasslink as live ON (tt.ClassId = live.ClassId AND live.SchoolId = ${schoolId}) 
     //              WHERE tt.TeacherId = ${user[0].TeacherId} AND tt.SchoolId = ${schoolId} AND tt.StatusId = 1`;

     a_query = `select ll.*, c.studentclass from liveclasslink as ll
              LEFT JOIN studentclass as c ON (ll.ClassId = c.ClassId) 
              where ll.schoolId = ${schoolId} AND ll.StatusId = 1`;
     console.log(a_query)
     pool.query(a_query, function(err, data){
      if(err)
      {
        console.log(err)
      }
      else if(data.length == 0)
      {
        console.log(data)
        res.send({status:200,success:false,message:"Data Not Found."});
      }
      else{
       res.send({status:200,success:false,message:"Data Found.",Data: data}); 
      }
     });
   })(req, res, next)
}



//--------------------------------------------------------------------------------------------------------------



//--------------App Login New Test------------------------------------------------------


//Test Api's.....

module.exports.appLoginNewTest = function(req,res)
{
  var value = req.body.value;  
  var password = req.body.password;
  //var username = req.body.username;
  console.log("Value", value)  
  
  pool.query('SELECT * FROM parentmain WHERE ParentMobile = ?',[value], function (error, results, fields) {
  {
  if (error) {
    console.log("error ocurred",error);
    res.json({ status: 400, success: false, error: "Invalid Input." });
  }
  else
  {
     console.log('The solution is: ', results);
     console.log('Length', results.length);
     console.log('Password',password);   

   if(results.length > 0)
   {
        console.log("beforeeeeee",results[0].ParentPassword)
        //console.log("dqwjdqwkd",passwordHash(password))
        if(passwordHash.verify(password, results[0].ParentPassword))
        
        //if(results[0].ParentPassword == password)
        {

          pool.query(`select SchoolId from schoolmaster where SchoolName='Aarambh' and StatusId=1`,function(err,totalCount){
          if(err) {
              response = {status:400,success:false,Error:"Error fetching School data."};
          }
          else if(results[0].SchoolId == totalCount[0].SchoolId){

                console.log('CD',results[0].CreationDate); //17
                var today = new Date();
                console.log('ET',results[0].ExpireDate); //date 27

                var dt = '2020-08-28T18:30:00.000Z';
                if(today <= results[0].ExpireDate)
                {
                  console.log('Account Will Expire.')
                  console.log("Test")
                  var token = "";
                  var secret = "";
                  secret = { parentmobile: results[0].ParentMobile,type: 'parent', _id: results[0].ParentId, password: results[0].ParentPassword};
                        token = jwt.sign(secret, 'iloveindia', {
                            expiresIn: 31557600000
                  });
                  console.log("Demo=" + token);
                  res.send({
                    "status": 200,
                    "success": true,
                    "isParent": true,
                    "Message":"Login Successfull","Data":results,
                    "Token": token,
                    "Expire": "Account Will Expire in 10 days."
                  });

                }
                else{
                            console.log("Your Account Expired...");
                            res.send({
                                "status": 200,
                                "success": true,
                                "isParent": true,
                                "Message":"Your Account Expired."
                  });
                }
            
          }
          else{
            console.log('Account Will Not Expire..')
            console.log("Test")
                  var token = "";
                  var secret = "";
                  secret = { parentmobile: results[0].ParentMobile,type: 'parent', _id: results[0].ParentId, password: results[0].ParentPassword};
                        token = jwt.sign(secret, 'iloveindia', {
                            expiresIn: 31557600000
                  });
                  console.log("Demo=" + token);
                  res.send({
                    "status": 200,
                    "success": true,
                    "isParent": true,
                    "Message":"Login Successfull","Data":results,
                    "Token": token
                  });

          }
      });

          //Need to be done after discussion.

          //  var future = new Date();
          //  future.setDate(future.getDate() + 8);
          // pool.query(`select creationdate from parentmain WHERE ParentMobile = ?`,[value],function(err, data, fields){
          //   if(err){
          //     console.log(err);
          //   }
          //   else{
          //     console.log('Data',data[0].creationdate);
            
          //      var diffDate = new Date();
          //      diffDate.setDate(diffDate.getDate());
          //      console.log('Datediff', diffDate)
          //      let d1 = moment(data[0].creationdate);
          //      let d2 = moment(diffDate);

          //     let days = d2.diff(d1, 'days');
          //     console.log(`Difference in days: ${days}`);

          //     //var future = new Date();
          //     var createdDD = data[0].creationdate;
          //     console.log("CreatedDD", createdDD);
          //     console.log('future Date', future);
          //     console.log('Condition', createdDD <= future);
          //     if(future > createdDD){
          //       console.log('Account Expire will expire in 7 days.');
          //     }
          //     else{
          //      console.log('Account Expired'); 
          //     }
          //   }
          // });


        }
        else{
         res.json({ status: 401, success: false, error: "Password Mismatch." });
        }
    } 
    else
    {
        pool.query('SELECT studentmain.*, studentclass.StudentClass FROM studentmain LEFT JOIN studentclass ON (studentmain.ClassId = studentclass.ClassId)  WHERE StudentUsername = ? ',[value], function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            res.json({ status: 400, success: false, error: "Invalid Input." }); 
        }
        else{
            console.log('The solution is: ', results);
            if(results.length > 0)
            {
            if(results[0].StatusId == 0)
            {
                res.json({ status: 204, success: false, error: "You are an inactive user. Please contact school." });
            }
            else
            {
   
                if(passwordHash.verify(password, results[0].StudentPassword))
                {
                    var themeData;
                    console.log("Test")
                    var token = "";
                    var secret = "";
          
                    ClassTheme.getClassThemeByClassId(results[0].ClassId,function(err,themedata){
                    if(err){

                    }else{
                        themeData = themedata;
                        console.log("Res",themeData);
                    }
          
                    pool.query(`select SchoolId from schoolmaster where SchoolName='Aarambh' and StatusId=1`,function(err,totalCount){
                    if(err) {
                          response = {status:400,success:false,Error:"Error fetching School data."};
                    }
                    else if(results[0].SchoolId == totalCount[0].SchoolId)
                    {
                          console.log('CD',results[0].CreationDate); //17
                          var today = new Date();
                          console.log('ET',results[0].ExpireDate); //date 27
                          
                          if(today <= results[0].ExpireDate)
                          { 
                              secret = { studentusername: results[0].StudentUsername, type: 'student', _id: results[0].StudentId, password: results[0].StudentPassword};
                              token = jwt.sign(secret, 'iloveindia', {
                              expiresIn: 31557600000 });

                              res.send({
                                  "status": 200,
                                  "success": true,
                                  "isParent": false,
                                  "Message":"Login Successfull", 
                                  "StudentData": results,
                                  "ClassTheme": themeData,
                                  "Token" :token, "Expire": "Account will Expire in 10 days."});
                          }
                          else{
                            console.log("Your Account Expired...");
                            res.send({
                                "status": 200,
                                "success": true,
                                "isParent": false,
                                "Message":"Your Account Expired."
                  });
                }
                          

                    }
                     else
                          {
                              secret = { studentusername: results[0].StudentUsername, type: 'student', _id: results[0].StudentId, password: results[0].StudentPassword};
                              token = jwt.sign(secret, 'iloveindia', {
                              expiresIn: 31557600000 });

                              res.send({
                                  "status": 200,
                                  "success": true,
                                  "isParent": false,
                                  "Message":"Login Successfull", 
                                  "StudentData": results,
                                  "ClassTheme": themeData,
                                  "Token" :token});                           

                          }
                  });
                    
          });
        }
        else{
         res.json({ status: 401, success: false, error: "Password Mismatch." });

        }
    }} 
    else{
    res.json({ status: 204, success: false, error: "Record does not exists." });
    }
  }     
  })
  }
  }
}
})
}


module.exports.insertParentDetailTest = function(req, res) {  
  var parent_detail = new ParentMain(req.body);
  //handles null error 
  if(!parent_detail.ParentName){
    res.json({ status: 401, success: false, error: "Please Provide Parent Name." });
  } 
   if(!parent_detail.ParentMobile){
    res.json({ status: 401, success: false, error: "Please Provide Parent Mobile." });
  } 
  if(!parent_detail.ParentPassword){
    res.json({ status: 401, success: false, error: "Please Provide Parent Password." });
  } 
  if(!parent_detail.ParentAddress){
    res.json({ status: 401, success: false, error: "Please Provide Parent Address." });
  }
else{  
  pool.query(`select SchoolId from schoolmaster where SchoolName='Aarambh' and StatusId=1`,function(err,totalCount){
    if(err) {
           response = {status:400,success:false,Error:"Error fetching data."};
    }
else{
  console.log(totalCount)
  var future = new Date();
  future.setDate(future.getDate() + 10);
  parent_detail.ExpireDate = future; 
  parent_detail.StatusId = 1;

  ParentMain.createParentDetail(parent_detail, totalCount[0].SchoolId ,function(err, parentdetail) {
    if (err){
                console.log(err)
                     if( err.code=="ER_DUP_ENTRY")
                     {
                        console.log(err.sqlMessage.split(" ")[5])
                        let sqlmsg =err.sqlMessage.split(" ")[5]
                        if(sqlmsg==="'ParentMobile'") {
                        console.log('working')
                      
                      return res.json({ status: 401, success: false, error: "Parent Mobile Already Exists." });
                      }
                       if(sqlmsg==="'ParentEmail'") {
                        console.log('Email')
                      return res.json({ status: 401, success: false, error: "Parent Email Already Exists." });
                      } 
                    }
    }else{
            res.json({status:200,success:true,Message:"Parent Details saved successfully."});
    }
    //res.json(testData);
  });
}
  });
}
};

module.exports.insertStudentTest = function(req, res, next) {
  console.log("IS Next", 'Test');
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
     var new_student = new StudentMain(req.body);
     //handles null error 
     if(!new_student.StudentName){
            res.json({ status: 401, success: false, error: "Please Provide Student Name." });
     }
     else if(!new_student.StudentUsername)
     { 
            res.json({ status: 401, success: false, error: "Please Provide Student Username." });
     }       
     else if(!new_student.StudentDOB){
            res.json({ status: 401, success: false, error: "Please Provide Student Date of Birth." });
     }               
     else if(!new_student.StudentPassword){
            res.json({ status: 401, success: false, error: "Please Provide Student Password." });
     }  
     else if(!new_student.ClassId){
            res.json({ status: 401, success: false, error: "Please Provide Student Class." });
     }          
     else
     {
        console.log('Parent ED', user.parent);
        new_student.ExpireDate = user.parent[0].ExpireDate;
        console.log( "pppppp",user.parent[0].ParentId);
        StudentMain.createStudent(new_student, user.parent[0].ParentId,"Profile-1587386575849.jpg" ,user.parent[0].SchoolId,function(err, student) {
        if (err)
        {
            console.log(err)
            if( err.code=="ER_DUP_ENTRY")
            {
               console.log(err.sqlMessage.split(" ")[5])
               let sqlmsg =err.sqlMessage.split(" ")[5]
               if(sqlmsg==="'StudentUsername'") 
               {
                   console.log('working')
                   //return res.send({ error: true, Message:"Student Username Already Exists."})
                   return res.json({ status: 401, success: false, error: "Student Username Already Exists." });
               }  
          }
      }
      else
      {
            res.send({status:200,success:true,Message:"Student saved successfully"});

      }  
  });
}
})(req, res, next);
}




// module.exports.schoolLoginTest = function(req,res)
// {
//   var username = req.body.username;  
//   var password = req.body.password; 
//   //console.log("UN", username);
//   //console.log("Password", password);
//   pool.query('SELECT * FROM schoolmaster WHERE Username = ? AND StatusId = 1',[username], function (error, results, fields) {
//   {
//   if (error) {
//     console.log("error ocurred",error);
//     res.send({status:400,success:false, message: error})
//   }
//   else
//   { 
//    console.log('Result', results); 
//    if(results.length > 0)
//    {   
//         if(passwordHash.verify(password, results[0].Password))
//         {
//           //Need to be done after discussion.

//           var future = new Date();
//           console.log('ET',results[0].ExpireDate); //date 27
//           //var dt = '2020-08-28'       
//           if(future <= results[0].ExpireDate)
//           { 
//                console.log("working")
//                var token = "";
//                var secret = "";
//                secret = { username: req.body.username,type: 'schooladmin', _id: results[0].SchoolId, password: results[0].Password};
//                         token = jwt.sign(secret, 'iloveindia', {expiresIn: 31557600000});
//                console.log("Demo=" + token);
//                res.send({
//                   "status": 200,
//                   "success": true,
//                   "RoleId":'2',
//                   "Message":"Login Successfull","Data":results,
//                   "Token": token, 
//                   "Expire": "Your account Will Expire." });

//           }
//           else{
//             res.send({
//                   "status": 200,
//                   "success": false,
//                   "RoleId":'2',
//                   "Message":"Your Account is Inactive.Please Contact AARAMBH Administration." });
//           }
          
//           console.log("working")
//           var token = "";
//           var secret = "";
//           secret = { username: req.body.username,type: 'schooladmin', _id: results[0].SchoolId, password: results[0].Password};
//                         token = jwt.sign(secret, 'iloveindia', {expiresIn: 31557600000});
//           console.log("Demo=" + token);
//           res.send({
//             "status": 200,
//             "success": true,
//             "RoleId":'2',
//             "Message":"Login Successfull","Data":results,
//             "Token": token
//             });
       
//         }
//         else{
//          res.json({ status: 401, success: false, message: "Password Mismatch." });
//         }
//     }        
//     else
//     {
//      // res.json({ status: 401, success: false, error: "Username does not exits." });
//      pool.query('SELECT * FROM author WHERE (Username = ? AND StatusId = 1)',[username], function (error, results, fields) {
//       {
//       if (error) {
//         console.log("error ocurred",error);
//         res.send({status:400,success:false, message: error})
//       }
//       else
//       { 
//        console.log('Result', results); 
//        if(results.length > 0)
//        {   
//             if(passwordHash.verify(password, results[0].Password))
//             {
//               console.log("working")
//               var token = "";
//               var secret = "";
//               secret = { username: req.body.username,type: 'admin', _id: results[0].Id, password: results[0].Password};
//                             token = jwt.sign(secret, 'iloveindia', {expiresIn: 31557600000});
//               console.log("Demo=" + token);
//               res.send({
//                 "status": 200,
//                 "RoleId":"1",
//                 "success": true,
//                 "Message":"Login Successfull","Data":results,
//                 "Token": token
//                 });
           
//             }
//             else{
//              res.json({ status: 401, success: false, message: "Password Mismatch." });
//             }
//         }         
//         else
//         {
//           pool.query('SELECT * FROM teacher WHERE (Username = ? AND StatusId = 1)',[username], function (error, results, fields) {
//           {
//             if (error) 
//             {
//               console.log("error ocurred",error);
//               res.send({status:400,success:false, message: error})
//             }
//             else
//             { 
//        console.log('Result', results); 
//        if(results.length > 0)
//        {   
//             //if(results[0].Password == password)
//             if(passwordHash.verify(password, results[0].Password))
//             {
//               console.log("working")
//               var token = "";
//               var secret = "";
//               secret = { username: req.body.username,schoolId: results[0].SchoolId, type: 'teacher', _id: results[0].TeacherId, password: results[0].Password};
//                             token = jwt.sign(secret, 'iloveindia', {expiresIn: 31557600000});
//               console.log("Demo=" + token);
//               res.send({
//                 "status": 200,
//                 "RoleId":"3",
//                 "success": true,
//                 "Message":"Login Successfull","Data":results,
//                 "Token": token
//                 });
           
//             }
//             else
//             {
//              res.json({ status: 401, success: false, message: "Password Mismatch." });
//             }
//         }
//         else{
//            res.json({ status: 401, success: false, error: "Username does not exits." });
//         }
//         }
//             }
//           });
//         }
     
//     }
//   }
//   });
// }
// }
// }
// });
// }

module.exports.schoolLoginTest = function(req,res)
{
  var username = req.body.username;  
  var password = req.body.password; 
  //console.log("UN", username);
  //console.log("Password", password);
  pool.query('SELECT * FROM schoolmaster WHERE Username = ?',[username], function (error, results, fields) {
  {
  if (error) {
    console.log("error ocurred",error);
    res.send({status:400,success:false, message: error})
  }
  else
  { 
   console.log('Result', results); 
   if(results.length > 0)
   {   
     if(results[0].StatusId == 0)
    {
                res.json({ status: 204, success: false, error: "You are an inactive user. Please contact AARAMBH." });
    }
    else
    {
        if(passwordHash.verify(password, results[0].Password))
        {
          //Need to be done after discussion.

          var future = new Date();
          console.log('ET',results[0].ExpireDate); //date 27
          //var dt = '2020-08-28'       
          if(future <= results[0].ExpireDate)
          { 
               console.log("working")
               var token = "";
               var secret = "";
               secret = { username: req.body.username,type: 'schooladmin', _id: results[0].SchoolId, password: results[0].Password};
                        token = jwt.sign(secret, 'iloveindia', {expiresIn: 31557600000});
               console.log("Demo=" + token);
               res.send({
                  "status": 200,
                  "success": true,
                  "RoleId":'2',
                  "Message":"Login Successfull","Data":results,
                  "Token": token, 
                  "Expire": "Your account Will Expire." });

          }
          else{
            res.send({
                  "status": 200,
                  "success": false,
                  "RoleId":'2',
                  "Message":"Your Account is Inactive.Please Contact AARAMBH Administration." });
          }
          
          console.log("working")
          var token = "";
          var secret = "";
          secret = { username: req.body.username,type: 'schooladmin', _id: results[0].SchoolId, password: results[0].Password};
                        token = jwt.sign(secret, 'iloveindia', {expiresIn: 31557600000});
          console.log("Demo=" + token);
          res.send({
            "status": 200,
            "success": true,
            "RoleId":'2',
            "Message":"Login Successfull","Data":results,
            "Token": token
            });
       
        }
        else{
         res.json({ status: 401, success: false, message: "Password Mismatch." });
        }
    }
    }        
    else
    {
     // res.json({ status: 401, success: false, error: "Username does not exits." });
     pool.query('SELECT * FROM author WHERE (Username = ? AND StatusId = 1)',[username], function (error, results, fields) {
      {
      if (error) {
        console.log("error ocurred",error);
        res.send({status:400,success:false, message: error})
      }
      else
      { 
       console.log('Result', results); 
       if(results.length > 0)
       {   
            if(passwordHash.verify(password, results[0].Password))
            {
              console.log("working")
              var token = "";
              var secret = "";
              secret = { username: req.body.username,type: 'admin', _id: results[0].Id, password: results[0].Password};
                            token = jwt.sign(secret, 'iloveindia', {expiresIn: 31557600000});
              console.log("Demo=" + token);
              res.send({
                "status": 200,
                "RoleId":"1",
                "success": true,
                "Message":"Login Successfull","Data":results,
                "Token": token
                });
           
            }
            else{
             res.json({ status: 401, success: false, message: "Password Mismatch." });
            }
        }         
        else
        {
          pool.query('SELECT * FROM teacher WHERE (Username = ? AND StatusId = 1)',[username], function (error, results, fields) {
          {
            if (error) 
            {
              console.log("error ocurred",error);
              res.send({status:400,success:false, message: error})
            }
            else
            { 
       console.log('Result', results); 
       if(results.length > 0)
       {   
            //if(results[0].Password == password)
            if(passwordHash.verify(password, results[0].Password))
            {
              console.log("working")
              var token = "";
              var secret = "";
              secret = { username: req.body.username,schoolId: results[0].SchoolId, type: 'teacher', _id: results[0].TeacherId, password: results[0].Password};
                            token = jwt.sign(secret, 'iloveindia', {expiresIn: 31557600000});
              console.log("Demo=" + token);
              res.send({
                "status": 200,
                "RoleId":"3",
                "success": true,
                "Message":"Login Successfull","Data":results,
                "Token": token
                });
           
            }
            else
            {
             res.json({ status: 401, success: false, message: "Password Mismatch." });
            }
        }
        else{
           if(results.length == 0)
           {
              res.json({ status: 401, success: false, error: "You are an inactive user." });
           }
           else{
            res.json({ status: 401, success: false, error: "Username does not exits." });
          }
        }
        }
            }
          });
        }
     
    }
  }
  });
}
}
}
});
}




const schoolDIR = './public/school/';
module.exports.insertSchoolTest = async function(req,res,next)
{    
passport.authenticate('jwt',function(err,user)
{
   console.log("IS Next", user);
   if (err || !user) 
   {
      console.log("Test1")
      console.log("User",err);
      return res.json({ status: 401, success: false, message: "Authentication Fail." });
   } 
    if (!req.file) 
    {
        console.log("No file received");
        res.status(400).send({ status: 401, success: false, message: 'Please Provide School Image.' });  
       
    } 
    else 
    {       
        try{
         
          var fn = schoolDIR +req.file.filename;  
          let newfileName = 'SL-'+ Date.now()+ ".png"
          console.log("image",newfileName)
           jimp.read(fn, function (err, img) {
           if (err) 
              throw err;
              img.resize(250, 250)            // resize
              .quality(100)                 // set JPEG quality         
              .write(schoolDIR + newfileName); // save
              console.log('Resized !!')              
          });  
           var new_school = new SchoolMaster(req.body,newfileName);  
           new_school.StatusId = 1;
          new_school.CreatedById = user[0].Id;
          SchoolMaster.createSchoolDetail(new_school, function(err, course) {
         if(!new_school.SchoolName){
            res.status(400).send({ status: 401, success: false, message: 'Please Provide School Name.' });        
          }
          if(!new_school.SchoolPhone){
            res.status(400).send({ status: 401, success: false, message: 'Please Provide School Phone.' });        
          }
          if(!new_school.SchoolLogo){
            res.status(400).send({status: 401, success: false, message: 'Please Provide School Logo.' });  
          }
          if(!new_school.ExpireDate){
            res.status(400).send({status: 401, success: false, message: 'Please Provide Expire Date.' });  
          }
          else{
            if(err){
              if (err){
                console.log(err)
                     if( err.code=="ER_DUP_ENTRY")
                     {
                      return res.json({ status: 401, success: false, message: "School Detail Already Exists." });
                      
                    }
                    else{
                      res.send({status:401, success:false,message : "Data not updated."});
                    }
    }
            }else{         
              res.send({status:200, success: true, message : "School added Successfully."});
            }

        }
      });
        }catch(e){ console.log("catch",e);   }
        
    }
  })(req,res,next)
}


//-------------------------------------------------------------------------------------



// New Web Api-------------------------------------------------

//Reset Password

// module.exports.resetPasswordSchool = function(req, res, next)
// {
// passport.authenticate('jwt',function(err,user)
// {
//    console.log("IS Next", user);
//    if (err || !user) 
//    {
//       console.log("Test1")
//       console.log("User",err);
//       return res.json({ status: 401, success: false, message: "Authentication Fail." });
//    }

//    var username = req.query.username;
//    var password = req.query.password;
//    var newpass = req.query.newpass;
//    pool.query(`select * from schoolmaster where username = '${username}'`, function(err, data){
//     if(err){
//       res.json({ status: 401, success: false, message: "Error." });
//     }
//     else{
//       console.log(data);
//       //console.log('Test',data[0].Password == password);
//         var hashedPassword = passwordHash.generate(password);
        
//       if(passwordHash.verify(password, data[0].Password))
//       {
//         console.log('Password');
//         var newhashedPassword = passwordHash.generate(newpass);
//         pool.query(`update schoolmaster set password = '${newhashedPassword}' where username = '${username}'`, function(err,updata){
//           if(err){
//             res.json({ status: 401, success: false, message: "Cannot Update Password." });
//           }
//           else{
//             res.json({ status: 401, success: false, message: "Password Updated Successfully." });   
//           }
//         });
//       }
//       else
//       {
//         console.log('Password Match'); 
//       }
//     }
//    });

// })(req, res, next);
// }


//----------------------------------------------


//----ChangePassword Student-----------------------------

module.exports.changePasswordStudent = function(req, res, next)
{
passport.authenticate('jwt',function(err,user)
{
   console.log("IS Next", user);
   if (err || !user) 
   {
      console.log("Test1")
      console.log("User",err);
      return res.json({ status: 401, success: false, message: "Authentication Fail." });
   }

   var username = req.query.username;
   var password = req.query.password;
   var newpass = req.query.newpass;
   pool.query(`select * from studentmain where studentusername = '${username}'`, function(err, data){
    if(err){
      res.json({ status: 401, success: false, message: "Error." + err  });
    }
    else{
      console.log(data);
      //console.log('Test',data[0].Password == password);
        var hashedPassword = passwordHash.generate(password);
        
      if(passwordHash.verify(password, data[0].StudentPassword))
      {
        console.log('Password');
        var newhashedPassword = passwordHash.generate(newpass);
        pool.query(`update studentmain set studentpassword = '${newhashedPassword}' where studentusername = '${username}'`, function(err,updata){
          if(err){
            res.json({ status: 401, success: false, message: "Cannot Update Password." });
          }
          else{
            res.json({ status: 200, success: true, message: "Password Updated Successfully." });   
          }
        });
      }
      else
      {
        console.log('Password Match'); 
        res.json({ status: 200, success: true, message: "Password Match." });
      }
    }
   });

})(req, res, next);
}

//---------------------------------------------------------


//General Api for decrypt password---------------------

// const Cryptr = require('cryptr');
// module.exports.decryptPassword = function(req,res)
// {
//   const cryptr = new Cryptr('myTotalySecretKey');
//   var username = req.query.username;
//   var password = req.query.password;
  
//   pool.query(`select * from studentmain where studentusername = '${username}'`, function(err, data){
//     if(err){
//       res.json({ status: 401, success: false, message: "Error." + err  });
//     }
//     else
//     {
//       console.log(data);
//        var hashedPassword = passwordHash.generate(password);
        
//       if(passwordHash.verify(password, data[0].StudentPassword))
//       {
//         console.log('Password');
//         const encryptedString = cryptr.encrypt(data[0].StudentPassword);
//         const decryptedString = cryptr.decrypt(encryptedString);
//         console.log('EC', encryptedString); 
//       console.log('DC', decryptedString);
//       }
      
//     }
//   });
// }




//---------------------------------




//------Attendance Api's---------------------------------------
//App Api

module.exports.insertAttendance = function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
    console.log(user); 
      
      var insert_attendance = new Attendance(req.body);
        // if(!insert_attendance.SchoolId){
        //     res.json({ status: 401, success: false, error: "Please Provide School." });
        // }
        // if(!insert_attendance.ClassId){
        //   res.json({ status: 401, success: false, error: "Please Provide Class." });
        // }
        if(!insert_attendance.LiveUrl){
          res.json({ status: 401, success: false, error: "Please Provide Live URL." });
        }
        if(!insert_attendance.AttendanceDate){
          res.json({ status: 401, success: false, error: "Please Provide Attendance Date." });
        }

        insert_attendance.SchoolId = user.student[0].SchoolId;
        insert_attendance.ClassId = user.student[0].ClassId;
        insert_attendance.StudentId = user.student[0].StudentId;
        insert_attendance.StatusId = 1;
        insert_attendance.CreatedById = user.student[0].StudentId;
        insert_attendance.CreatedDate = new Date();

        console.log('Data', insert_attendance);
        Attendance.createAttendance(insert_attendance, function(err, attendance) {
        if (err)
        {
            //console.log(err);
            res.send({status:200,success:false,message:"Details Not Saved."});
        }
        else
        {
            res.send({status:200,success:true,message:"Details saved successfully."});
        }
    }); 

})(req, res, next);
}

//View Attendance Api for Admin

module.exports.getStudentAttendance = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  };
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size
  var classId = req.query.classId;
  var schoolId = user[0].SchoolId;
  var studentId = req.query.studentId;
  var search_query;

    search_query = `SELECT count(*) as Total FROM attendance 
     WHERE AttendanceId = (select max(AttendanceId) from attendance) AND StudentId = ${studentId} 
     AND SchoolId = ${schoolId} AND StatusId = 1 AND ClassId = ${classId}`;
  
  pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }

    search_query = `SELECT * FROM attendance 
     WHERE AttendanceId = (select max(AttendanceId) from attendance) AND StudentId = ${studentId} 
     AND SchoolId = ${schoolId} AND StatusId = 1 AND ClassId = ${classId}`;
     console.log(search_query);
    pool.query(search_query,[user[0].TeacherId, req.query.classId],function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "AttendanceData": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}


//--------------------------------------------------------------



//--------------------------Test FCM Notification-------------------------------



module.exports.sendNotificationMessage = function (req, res) { 
var FCM = require('../lib/notification')
// var message = req.query.message;

// FCM.sendMessage(message, function(err, data){
//   if(err)
//   {
//     console.log('Controller', err);
//   }
//   else
//   {
//     console.log('Controller', data); 
//   }
// });

}



//-------------------------------------------------------------------------------


//------------------------------Insert Firebase token of School in Students---------------------


module.exports.insertSchoolTokenInStudents = function(req, res, next)
{
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  };
var token = req.query.schooltoken;
query=`update studentmain set firebaseschooltoken = '${token}' where schoolId = ${user[0].SchoolId}`;
pool.query(query, function(err, data)
{
   if(err)
   {
     console.log(err);
   }
   else
   {
     console.log(data);
   }
});

})(req,res,next)
}


//---------------------------------------------------------------------------------------------


//------------------------------------Firebase Api's--------------------------------------------------------------

// const Fcm = require('../lib/notification.js');

// module.exports.addFirebaseTopicInSchool = function(req, res, next)
// {
//   passport.authenticate('jwt', function(err,user)
//   {
//     if (err || !user) 
//     {
//       return res.json({ status: 401, success: false, error: "Authentication Fail." });
//     };
//     var topicName = req.query.topicName;

//     pool.query(`update schoolmaster set firebasekey = '${topicName}' where schoolId = ${user[0].SchoolId}`, function(err,data)
//     {
//         if(err)
//         {
//           //console.log(err);
//           res.send({status:200,success:false,message:"Details Not Updated."});
//         }
//         else
//         {
//           //console.log(data); 
//           res.send({status:200,success:false,message:"Details Updated."});
//         }
//     });


//   })(req, res, next);
// }


// module.exports.getFBTokenName = function(req, res, next)
// {
//   passport.authenticate('jwt', function(err,user)
//   {
//     if (err || !user) 
//     {
//       return res.json({ status: 401, success: false, error: "Authentication Fail." });
//     };
//     pool.query(`select firebasekey from schoolmaster where schoolId = ${user[0].SchoolId}`, function(err, data)
//     {
//       if(err){
//         res.send({status:200,success:false,message:"Something went wrong."});
//       }
//       else
//       {
//         res.send({status:200,success:true,message:"Data Found", tokenname: data}); 
//       }
//     });      
//   })(req, res, next);
// }

// module.exports.sendFirebaseMessage = function(req, res, next)
// {
//   passport.authenticate('jwt', function(err,user)
//   {
//     if (err || !user) 
//     {
//       return res.json({ status: 401, success: false, error: "Authentication Fail." });
//     };
//     var schoolId = user[0].SchoolId;
//     var msgtitle = req.query.msgtitle;
//     var msgbody = req.query.msgbody;
//     var tokenname = req.query.tokenname;
//     pool.query(`select FirebaseToken from studentmain where schoolId = ${user[0].SchoolId}`, function(err,data)
//     {
//         if(err)
//         {
//           //console.log(err);
//           res.send({status:200,success:false,message:"Something went wrong."});
//         }
//         else
//         {
//           //console.log(data); 
//           //res.send({status:200,success:false,message:"Details Updated."});
//           getClientToken(data, schoolId, msgtitle, msgbody, tokenname);
//         }
//     });


//   })(req, res, next);
// }


// function getClientToken(FBToken, schoolId, title, body, tokenname)
// {
//     var value = [];
//     FBToken.forEach((element, index) =>{
//         var dt = FBToken[index].FirebaseToken;
//         console.log('DT', dt);
//         value.push(dt)
//     });

//     console.log('Value Array', value);

//      Fcm.addTopic(value, tokenname, function(err, data)
//      {
//         if(err)
//         {
//           console.log('Error in FCM', err );
//         }
//         else
//         {
//            console.log('Data in FCM', data);
//            Fcm.schoolMessage(title, body, tokenname, function(err, data)
//            {
//               if(err)
//               {
//                 console.log(err);
//               }
//               else
//               {
//                  console.log(data);
//               }
//           });
//           }
//           });
//   }
//---------------------------------------------------------------------------------------------------


//------------------Chat api--------------------------

// const Chat = require('../lib/chat.js');
// module.exports.studentChat = function(req,res)
// {
//   Chat.StartChat(req,res)
// }


//--------------------------------------------------- 



//--------Bulk upload Time table------------------------------------------

module.exports.importTimeTableExcelData2MySQL = function(req, res, next)
{
console.log('Test');
passport.authenticate('jwt', function(err,user)
{
  if (err || !user)
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  else if(user)
  {
  try
  {
    var file = req.file.filename;
    console.log('Test', file);
    console.log(file);
    var classId = req.body.classId;
    var courseId = req.body.courseId;
    var getClassId;
    var course = []; 
    console.log('classId',req.body.classId);
    console.log('School', user[0].SchoolId);

    if (!req.file) 
    {
        console.log("No file received");        
        res.json({ status: 401, success: false, error: "Please Upload Excel Sheet." });
       
    }
    else
    {    
      try
      {
          var date = new Date();
          var fn = './public/timetable/' + file;
          readXlsxFile(fn).then((rows) =>  
          {
            var new_excel = [];
            var row = rows.slice(1,Number(rows.length));
            console.log(row,'dfdf')

            var count=0 
            var course=[],st=[],et=[],day=[];
            var is_error = false;
            row.forEach((element, index) =>
            //for(var index = 0;index < row.length; index++) 
            {
               var getst = row[index][0];
               var getet = row[index][1];
               var getday = row[index][2];      
               console.log('GetSt', getst);
               st.push(getst);
               et.push(getet);
               day.push(getday);
               query = `select courseId from course where courseId = ${courseId} 
               AND ClassId = ${classId} AND SchoolId = ${user[0].SchoolId}`;
                console.log('Query', query);
                pool.query(query ,function(err,data) 
                {
                if(err){console.log(err);}
                else{
                  //row[index][3] = data[0].courseId; //set
                  if(data.length == 0) //
                  { 
                    if(!is_error)
                    {
                      is_error = true;
                      console.log("Is Error", is_error);                    
                      showMsg(res);
                    }
                  }

                  else{
                  getClassId = data[0].courseId;
                 
                  console.log('Data',data);
                  count++; 
                  course.push(getClassId)
                 
                  console.log('Length',row.length);
                  if(count==row.length) 
                  {
                    setDataTime(row, course, classId, user[0].SchoolId, user[0].TeacherId, st,et,day,res);
                  }
                }
            }

            }); //query
         

         })//end for each
          
      });
    }catch(e){}
  }
}catch(e){}
}
 })(req, res, next);
}

function showMsg(res)
{
  
    console.log("No Such Course");
    response = {status:400,success:true,message:"No Such Course."}; //error
    return res.json(response);
}
// just for setting data
function setDataTime(row, cours, classId, schoolId, teacher, st, et, day, res)
{
  console.log('func', row[0][0]);
  row.forEach((el, i)=>
  {
    row[i][0] = schoolId;
    row[i][1] = classId;
    row[i][2] = cours[i]
    row[i][3] = teacher;            
    row[i][4] = 1;
    row[i][5] = st[i];
    row[i][6] = et[i];
    row[i][7] = day[i];

    row[i][8] = teacher;
    row[i][9] = null;
    row[i][10] = new Date();
    row[i][11] = null;
    });
        //}
    

    console.log('NewRow',row);
    //var new_row = rows.slice(1,Number(rows.length));    
    
    TimeTable.addTimetableExcel(row,function(err,response){
    if(err)
    {
      response = {status:400,success:false,message:"Error fetching data. " + err};
    }
    else
    {
      response = {status: 200, success : true, message : "Time Table Details Saved Successfully."};
    }
      res.json(response);
    });
    console.log(row,'row') 
}



//-----------------------------------------------------------------------


//--------------------------Exam Module Api 21st Sept--------------------------

//Web Api
module.exports.insertExam = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
    console.log(user); 
    
    if (!req.file) 
    {
        console.log("No file received");
        res.status(400).send({ error:true, message: 'Please Provide Exam Document.' });  
       
    } 
    else 
    {
    filename = req.file.filename;      
      var insert_exam = new Exam(req.body, filename);
        if(!insert_exam.ExamGroupId){
            res.json({ status: 401, success: false, error: "Please Provide Exam Group." });
        }
        if(!insert_exam.ExamTopic){
            res.json({ status: 401, success: false, error: "Please Provide Exam Topic." });
        }
        if(!insert_exam.FromDate){
          res.json({ status: 401, success: false, error: "Please Provide From Date" });
        }
        if(!insert_exam.ToDate){
          res.json({ status: 401, success: false, error: "Please Provide To Date." });
        }       
        if(!insert_exam.ClassId){
          res.json({ status: 401, success: false, error: "Please Provide Class." });
        }
        if(!insert_exam.CourseId){
          res.json({ status: 401, success: false, error: "Please Provide Course." });
        } 

        if(!insert_exam.TotalMarks){
          res.json({ status: 401, success: false, error: "Please Provide Total Marks." });
        }
        if(!insert_exam.PassingMarks){
          res.json({ status: 401, success: false, error: "Please Provide Passing Marks." });
        }
        insert_exam.SchoolId = user[0].SchoolId;
        insert_exam.TeacherId = user[0].TeacherId;
        insert_exam.StatusId = 1;
        insert_exam.CreatedById = user[0].TeacherId;
        insert_exam.CreationDate = new Date();
        console.log('Data', insert_exam);
        Exam.createExam(insert_exam,user[0].SchoolId,function(err, exam) {
        if (err)
        {
            console.log(err);
        }        
        else
        {
            res.send({status:200,success:true,message: exam.Message});
        }
    }); 
}
})(req, res, next);
}

//Web Api
module.exports.updateExam = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
    console.log(user); 
    
    if (!req.file) 
    {
        console.log("No file received");
        //res.status(400).send({ error:true, message: 'Please Provide Exam Document.' });  
        var up_exam = new Exam(req.body);
        if(!up_exam.ExamGroupId){
            res.json({ status: 401, success: false, error: "Please Provide Exam GroupId." });
        }
        if(!up_exam.FromDate){
          res.json({ status: 401, success: false, error: "Please Provide From Date" });
        }
        if(!up_exam.ToDate){
          res.json({ status: 401, success: false, error: "Please Provide To Date." });
        }       
        // if(!up_exam.ClassId){
        //   res.json({ status: 401, success: false, error: "Please Provide Class." });
        // }
        // if(!up_exam.CourseId){
        //   res.json({ status: 401, success: false, error: "Please Provide Course." });
        // }
        if(!up_exam.TotalMarks){
          res.json({ status: 401, success: false, error: "Please Provide Total Marks." });
        }
        if(!up_exam.PassingMarks){
          res.json({ status: 401, success: false, error: "Please Provide Passing Marks." });
        }
        if(!up_exam.StatusId){
          res.json({ status: 401, success: false, error: "Please Provide Status." });
        }
        up_exam.SchoolId = user[0].SchoolId;
        up_exam.TeacherId = user[0].TeacherId;       
        up_exam.ModifiedById = user[0].TeacherId;
        up_exam.ModificationDate = new Date();
        console.log('Data', up_exam);
        Exam.updateById(req.body.ExamId,up_exam,function(err, exam) {
        if (err)
        {
            console.log(err);
        }
        else if(exam.length == 0)
        {
          res.send({status:200,success:true,message:"Exam Details not updated."}); 
        }
        else
        {
            res.send({status:200,success:true,message:"Exam Details updated successfully."});
        }
    });        
    } 
    else 
    {
    filename = req.file.filename;      
      var up_exam = new Exam(req.body,filename);
      if(!up_exam.ExamGroupId){
            res.json({ status: 401, success: false, error: "Please Provide Exam GroupId." });
        }
        if(!up_exam.ExamTopic){
            res.json({ status: 401, success: false, error: "Please Provide Exam Topic." });
        }
        if(!up_exam.FromDate){
          res.json({ status: 401, success: false, error: "Please Provide From Date" });
        }
        if(!up_exam.ToDate){
          res.json({ status: 401, success: false, error: "Please Provide To Date." });
        }       
        // if(!up_exam.ClassId){
        //   res.json({ status: 401, success: false, error: "Please Provide Class." });
        // }
        // if(!up_exam.CourseId){
        //   res.json({ status: 401, success: false, error: "Please Provide Course." });
        // } 

        if(!up_exam.TotalMarks){
          res.json({ status: 401, success: false, error: "Please Provide Total Marks." });
        }
        if(!up_exam.PassingMarks){
          res.json({ status: 401, success: false, error: "Please Provide Passing Marks." });
        }
        if(!up_exam.StatusId){
          res.json({ status: 401, success: false, error: "Please Provide Status." });
        }
        up_exam.SchoolId = user[0].SchoolId;
        up_exam.TeacherId = user[0].TeacherId;       
        up_exam.ModifiedById = user[0].TeacherId;
        up_exam.ModificationDate = new Date();
        console.log('Data', up_exam);
        Exam.updateById(req.body.ExamId,up_exam,function(err, exam) {
        if (err)
        {
            console.log(err);
        }
        else if(exam.length == 0)
        {
          res.send({status:200,success:true,message:"Exam Details not updated."}); 
        }
        else
        {
            res.send({status:200,success:true,message:"Exam Details updated successfully."});
        }
    }); 
}
})(req, res, next);
}


//Web Api
module.exports.getExamByTeacherId = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
     var page = parseInt(req.query.page)
     var size = parseInt(req.query.size)
     var classId = req.query.classId;
     var courseId = req.query.courseId;
     var status = req.query.status;
     console.log(user[0].TeacherId);
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size
  //var classId = req.query.classId;
  var search_query;

  if(classId)
  {
    if(courseId)
    {
        search_query = `select count(*) as Total from exam Where TeacherId = ${user[0].TeacherId} 
                        AND SchoolId = ${user[0].SchoolId} AND ClassId = ${classId}
                        AND CourseId = ${courseId} AND StatusId = ${status}`;
    }
    else
    {
          search_query = `select count(*) as Total from exam Where TeacherId = ${user[0].TeacherId} 
                  AND SchoolId = ${user[0].SchoolId} AND ClassId = ${classId} AND StatusId = ${status}`;

    }
  } 
  else
  {
      if(courseId)
      {
        search_query = `select count(*) as Total from exam Where TeacherId = ${user[0].TeacherId} 
                        AND SchoolId = ${user[0].SchoolId} AND CourseId = ${courseId} AND StatusId = ${status}`;
      }
      else
      {
        search_query = `select count(*) as Total from exam Where TeacherId = ${user[0].TeacherId} AND 
                  SchoolId = ${user[0].SchoolId} AND StatusId = ${status}`;  
      }
      
  }
  pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }
    if(classId)
    {
      if(courseId)
      {
            search_query = `select e.*, sc.StudentClass, t.TeacherName, 
                    c.CourseName, sm.SchoolName from exam as e 
                    LEFT JOIN studentclass as sc ON (e.ClassId = sc.ClassId) 
                    LEFT JOIN teacher as t ON (e.TeacherId = t.TeacherId) 
                    LEFT JOIN course as c ON (e.CourseId = c.CourseId) 
                    LEFT JOIN schoolmaster as sm ON (e.SchoolId = sm.SchoolId) 
                    Where e.TeacherId = ${user[0].TeacherId} AND e.SchoolId = ${user[0].SchoolId}
                    AND e.StatusId = ${status} AND e.ClassId = ${classId} AND e.CourseId = ${courseId}
                    Order By e.ExamId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
      }
      else
      {
            search_query = `select e.*, sc.StudentClass, t.TeacherName, 
                    c.CourseName, sm.SchoolName from exam as e 
                    LEFT JOIN studentclass as sc ON (e.ClassId = sc.ClassId) 
                    LEFT JOIN teacher as t ON (e.TeacherId = t.TeacherId) 
                    LEFT JOIN course as c ON (e.CourseId = c.CourseId) 
                    LEFT JOIN schoolmaster as sm ON (e.SchoolId = sm.SchoolId) 
                    Where e.TeacherId = ${user[0].TeacherId} AND e.SchoolId = ${user[0].SchoolId}
                    AND e.StatusId = ${status} AND e.ClassId = ${classId}
                    Order By e.ExamId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
      }
    }
    else
    {
      if(courseId)
      {
            search_query = `select e.*, sc.StudentClass, t.TeacherName, 
                    c.CourseName, sm.SchoolName from exam as e 
                    LEFT JOIN studentclass as sc ON (e.ClassId = sc.ClassId) 
                    LEFT JOIN teacher as t ON (e.TeacherId = t.TeacherId) 
                    LEFT JOIN course as c ON (e.CourseId = c.CourseId) 
                    LEFT JOIN schoolmaster as sm ON (e.SchoolId = sm.SchoolId) 
                    Where e.TeacherId = ${user[0].TeacherId} AND e.SchoolId = ${user[0].SchoolId}
                    AND e.StatusId = ${status} AND e.CourseId = ${courseId}
                    Order By e.ExamId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
      }
      else
      {
            search_query = `select e.*, sc.StudentClass, t.TeacherName, 
                    c.CourseName, sm.SchoolName from exam as e 
                    LEFT JOIN studentclass as sc ON (e.ClassId = sc.ClassId) 
                    LEFT JOIN teacher as t ON (e.TeacherId = t.TeacherId) 
                    LEFT JOIN course as c ON (e.CourseId = c.CourseId) 
                    LEFT JOIN schoolmaster as sm ON (e.SchoolId = sm.SchoolId) 
                    Where e.TeacherId = ${user[0].TeacherId} AND e.SchoolId = ${user[0].SchoolId}                    
                    AND e.StatusId = ${status}
                    Order By e.ExamId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
      }
    }


    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found."};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "Exam": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      

  })(req,res,next);
}





//App Api
module.exports.getExamByClassId = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
     var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  console.log(user.student[0].SchoolId);
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size
  //var classId = req.query.classId;
  var search_query;
    
  search_query = `select count(*) as Total from exam Where ClassId = ${user.student[0].ClassId} AND 
                  SchoolId = ${user.student[0].SchoolId} AND StatusId = 1`;
  pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }
    search_query = `select e.*, sc.StudentClass, t.TeacherName, 
                    c.CourseName, sm.SchoolName from exam as e 
                    LEFT JOIN studentclass as sc ON (e.ClassId = sc.ClassId) 
                    LEFT JOIN teacher as t ON (e.TeacherId = t.TeacherId) 
                    LEFT JOIN course as c ON (e.CourseId = c.CourseId) 
                    LEFT JOIN schoolmaster as sm ON (e.SchoolId = sm.SchoolId) 
                    Where e.ClassId = ${user.student[0].ClassId} 
                    AND e.SchoolId = ${user.student[0].SchoolId}
                    AND e.StatusId = 1 limit ${query.limit}  offset  ${query.skip}`;

    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data"};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : true, message : "No Data Found."};
    }
    else 
    {
      console.log("MyData",data);    
      var fromDate = data[0].FromDate;
      console.log('FD', data[0].FromDate);
      var today = new Date();
      console.log('ET',data[0].ToDate); //date 27
      if(today >= fromDate && today <= data[0].ToDate)
      {
        var totalPages = Math.ceil(totalCount / size);    
        response = {status: 200, success : true, message : "Data Found", "Exam": data,"Pages":totalPages,"TotalCount":totalCount};
      }
      else
      {
        response = {status: 200, success : true, message : "No Exam Available."};
      }
      
    }
    res.json(response);
    });
  })      

  })(req,res,next);
}

//App Api
module.exports.getExamBySchoolAndClass = function (req, res, next) { 
  passport.authenticate('jwt', function(err,user)
  {
     if (err || !user) 
     {
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     };
     
     console.log('Student',user);
     var classId = req.query.classId;
     var schoolId = req.query.schoolId;
     var status = req.query.status;
     var studentId = user.student[0].StudentId;
     var search_query
     
     if(status == 'pending')
     {
        search_query = `SELECT a.*, sc.StudentClass, t.TeacherName, 
                c.CourseName, sm.SchoolName
                from exam as a 
                LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) 
                LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
                LEFT JOIN course as c ON (a.CourseId = c.CourseId) 
                LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) 
                where a.StatusId = 1 AND a.ClassId = ${classId} AND a.SchoolId = ${schoolId} AND a.ExamId 
                not in 
                (select examId from examsubmit es where es.examId = a.examId and 
                es.StudentId = ${studentId})`
     }
     else if(status == 'submitted' || status == 'reject' || status == 'accept')
     {
        search_query = `SELECT a.*, sc.StudentClass, sm.SchoolName,
                        e.FromDate, e.ToDate, e.TotalMarks, e.PassingMarks,
                        f.TeacherName, d.CourseName, e.ExamTopic
                      from examsubmit as a
                      LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)                                                              
                      LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)
                      LEFT JOIN exam as e ON (a.ExamId = e.ExamId)
                      LEFT JOIN teacher as f ON (f.TeacherId = e.TeacherId)
                      LEFT JOIN course as d ON (d.CourseId = e.CourseId)
                      where a.ClassId = ${classId} AND a.SchoolId = ${schoolId} 
                      AND a.ExamStatus = '${status}' AND a.StudentId = ${studentId}
                      AND a.StatusId = 1`
//SELECT a.*, sc.StudentClass, sm.SchoolName from examsubmit as a LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) LEFT JOIN exam as assign ON (a.ExamId = assign.ExamId) where a.ClassId = 1 AND a.SchoolId = 31 AND a.ExamStatus = 'accept' AND a.StudentId = 1 



                      //Need to add about reject case----
     }
      else if (status == 'history'){
        search_query = `SELECT a.*, sc.StudentClass, sm.SchoolName,
                    e.FromDate, e.ToDate, e.TotalMarks, e.PassingMarks
                      from examsubmit as a
                      LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)                                             
                      LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)
                      LEFT JOIN exam as e ON (a.ExamId = e.ExamId)
                      where a.ClassId = ${classId} AND a.SchoolId = ${schoolId} 
                      AND a.StudentId = ${studentId} AND a.StatusId = 1 AND a.ExamStatus = '${status}'`
     
  }
     console.log(search_query);
      pool.query(search_query,function(err,data){
       if(err) 
       {
          response = {status:400,success:false,Error:"Error fetching data"  + err};
       } 
       else if(data.length == 0)
       {
          response = {status: 200, success : false, message : "No Data Found"};
       }
       else 
       {   
          if(status == 'pending'){
            
            data.forEach((e,i)=>
            {
              data[i].ExamStatus="pending"

            });
            response = {status: 200, success : true, message : "Data Found", "Exam": data};
          }
          else{
      response = {status: 200, success : true, message : "Data Found", "Exam": data};
          }
          
       }
        res.json(response);
    });
  })(req, res, next);
}

//-----------------------------------------------------------



//----------------------Revised Test as on 21st Sept-------------------------

//Web Api
module.exports.insertTest = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
    console.log(user); 
    
    if (!req.file) 
    {
        console.log("No file received");
        res.status(400).send({ error:true, message: 'Please Provide Test Document.' });  
       
    } 
    else 
    {
    filename = req.file.filename;      
      var insert_test = new Test(req.body, filename);
        if(!insert_test.TestTopic){
            res.json({ status: 401, success: false, error: "Please Provide Test Topic." });
        }
        if(!insert_test.FromDate){
          res.json({ status: 401, success: false, error: "Please Provide From Date" });
        }
        if(!insert_test.ToDate){
          res.json({ status: 401, success: false, error: "Please Provide To Date." });
        }       
        if(!insert_test.ClassId){
          res.json({ status: 401, success: false, error: "Please Provide Class." });
        }
        if(!insert_test.CourseId){
          res.json({ status: 401, success: false, error: "Please Provide Course." });
        }
        if(!insert_test.TotalMarks){
          res.json({ status: 401, success: false, error: "Please Provide Total Marks." });
        }
        if(!insert_test.PassingMarks){
          res.json({ status: 401, success: false, error: "Please Provide Passing Marks." });
        }
        insert_test.SchoolId = user[0].SchoolId;
        insert_test.TeacherId = user[0].TeacherId;
        insert_test.StatusId = 1;
        insert_test.CreatedById = user[0].TeacherId;
        insert_test.CreationDate = new Date();
        console.log('Data', insert_test);
        Test.createTest(insert_test,function(err, test) {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send({status:200,success:true,message:"Test Details saved successfully."});
        }
    }); 
}
})(req, res, next);
}

//Web Api
module.exports.updateTest = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
    console.log(user); 
    
    if (!req.file) 
    {
        console.log("No file received");
        //res.status(400).send({ error:true, message: 'Please Provide Exam Document.' });  
        var up_test = new Test(req.body);
        if(!up_test.TestTopic){
            res.json({ status: 401, success: false, error: "Please Provide Test Topic." });
        }
        if(!up_test.FromDate){
          res.json({ status: 401, success: false, error: "Please Provide From Date" });
        }
        if(!up_test.ToDate){
          res.json({ status: 401, success: false, error: "Please Provide To Date." });
        }       
        // if(!up_test.ClassId){
        //   res.json({ status: 401, success: false, error: "Please Provide Class." });
        // }
        // if(!up_test.CourseId){
        //   res.json({ status: 401, success: false, error: "Please Provide Course." });
        // }
        if(!up_test.TotalMarks){
          res.json({ status: 401, success: false, error: "Please Provide Total Marks." });
        }
        if(!up_test.PassingMarks){
          res.json({ status: 401, success: false, error: "Please Provide Passing Marks." });
        }
        if(!up_test.StatusId){
          res.json({ status: 401, success: false, error: "Please Provide Status." });
        }
        up_test.SchoolId = user[0].SchoolId;
        up_test.TeacherId = user[0].TeacherId;       
        up_test.ModifiedById = user[0].TeacherId;
        up_test.ModificationDate = new Date();
        console.log('Data', up_test);
        Test.updateById(req.body.TestId,up_test,function(err, test) {
        if (err)
        {
            console.log(err);
        }
        else if(test.length == 0)
        {
          res.send({status:200,success:true,message:"Test Details not updated."}); 
        }
        else
        {
            res.send({status:200,success:true,message:"Test Details updated successfully."});
        }
    });        
    } 
    else 
    {
    filename = req.file.filename;      
      var up_test = new Test(req.body,filename);
        if(!up_test.TestTopic){
            res.json({ status: 401, success: false, error: "Please Provide Test Topic." });
        }
        if(!up_test.FromDate){
          res.json({ status: 401, success: false, error: "Please Provide From Date" });
        }
        if(!up_test.ToDate){
          res.json({ status: 401, success: false, error: "Please Provide To Date." });
        }       
        // if(!up_test.ClassId){
        //   res.json({ status: 401, success: false, error: "Please Provide Class." });
        // }
        // if(!up_test.CourseId){
        //   res.json({ status: 401, success: false, error: "Please Provide Course." });
        // } 
        if(!up_test.TotalMarks){
          res.json({ status: 401, success: false, error: "Please Provide Total Marks." });
        }
        if(!up_test.PassingMarks){
          res.json({ status: 401, success: false, error: "Please Provide Passing Marks." });
        }
        if(!up_test.StatusId){
          res.json({ status: 401, success: false, error: "Please Provide Status." });
        }
        up_test.SchoolId = user[0].SchoolId;
        up_test.TeacherId = user[0].TeacherId;       
        up_test.ModifiedById = user[0].TeacherId;
        up_test.ModificationDate = new Date();
        console.log('Data', up_test);
        Test.updateById(req.body.TestId,up_test,function(err, test) {
        if (err)
        {
            console.log(err);
        }
        else if(test.length == 0)
        {
          res.send({status:200,success:true,message:"Test Details not updated."}); 
        }
        else
        {
            res.send({status:200,success:true,message:"Test Details updated successfully."});
        }
    }); 
}
})(req, res, next);
}

// module.exports.getTestByTeacherId = async function(req,res,next)
// {   
//   passport.authenticate('jwt',function(err,user)
//   {
//      console.log("IS Next", user);
//      if (err || !user) 
//      {
//         console.log("Test1")
//         console.log("User",err);
//         return res.json({ status: 401, success: false, error: "Authentication Fail." });
//      }
//      var page = parseInt(req.query.page)
//   var size = parseInt(req.query.size)
//   console.log(user[0].TeacherId);
          
//   var query = {}
//   if(page < 0 || page === 0) 
//   {
//     response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
//     return res.json(response)
//   }
//   query.skip = size * (page - 1)
//   query.limit = size
//   //var classId = req.query.classId;
//   var search_query;
    
//   search_query = `select count(*) as Total from test Where TeacherId = ${user[0].TeacherId} AND 
//                   SchoolId = ${user[0].SchoolId} AND StatusId = 1`;
//   pool.query(search_query,function(err,totalCount){
//     if(err) 
//     {
//       response = {status:400,success:false,Error:"Error fetching data."};
//     }
//     search_query = `select e.*, sc.StudentClass, t.TeacherName, 
//                     c.CourseName, sm.SchoolName from test as e 
//                     LEFT JOIN studentclass as sc ON (e.ClassId = sc.ClassId) 
//                     LEFT JOIN teacher as t ON (e.TeacherId = t.TeacherId) 
//                     LEFT JOIN course as c ON (e.CourseId = c.CourseId) 
//                     LEFT JOIN schoolmaster as sm ON (e.SchoolId = sm.SchoolId) 
//                     Where e.TeacherId = ${user[0].TeacherId} AND e.SchoolId = ${user[0].SchoolId}
//                     AND e.StatusId = 1
//                     limit ${query.limit}  offset  ${query.skip}`;

//     pool.query(search_query,function(err,data){
//     if(err) 
//     {
//       response = {status:400,success:false,Error:"Error fetching data" + err};
//     } 
//     else if(data.length == 0)
//     {
//       response = {status: 200, success : false, message : "No Data Found."};
//     }
//     else 
//     {
//       var totalPages = Math.ceil(totalCount / size);    
//       response = {status: 200, success : true, message : "Data Found", "Test": data,"Pages":totalPages,"TotalCount":totalCount};
//     }
//     res.json(response);
//     });
//   })      

//   })(req,res,next);
// }


//Web Api
module.exports.getTestByTeacherId = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
     var page = parseInt(req.query.page)
     var size = parseInt(req.query.size)
     var classId = req.query.classId;
     var courseId = req.query.courseId;
     var status = req.query.status;
     console.log(user[0].TeacherId);
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size
  //var classId = req.query.classId;
  var search_query;

  if(classId)
  {
    if(courseId)
    {
        search_query = `select count(*) as Total from test Where TeacherId = ${user[0].TeacherId} 
                        AND SchoolId = ${user[0].SchoolId} AND ClassId = ${classId}
                        AND CourseId = ${courseId} AND StatusId = ${status}`;
    }
    else
    {
          search_query = `select count(*) as Total from test Where TeacherId = ${user[0].TeacherId} 
                  AND SchoolId = ${user[0].SchoolId} AND ClassId = ${classId} AND StatusId = ${status}`;

    }
  } 
  else
  {
      if(courseId)
      {
        search_query = `select count(*) as Total from test Where TeacherId = ${user[0].TeacherId} 
                        AND SchoolId = ${user[0].SchoolId} AND CourseId = ${courseId} AND StatusId = ${status}`;
      }
      else
      {
        search_query = `select count(*) as Total from test Where TeacherId = ${user[0].TeacherId} AND 
                  SchoolId = ${user[0].SchoolId} AND StatusId = ${status}`;  
      }
      
  }
  pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }
    if(classId)
    {
      if(courseId)
      {
            search_query = `select e.*, sc.StudentClass, t.TeacherName, 
                    c.CourseName, sm.SchoolName from test as e 
                    LEFT JOIN studentclass as sc ON (e.ClassId = sc.ClassId) 
                    LEFT JOIN teacher as t ON (e.TeacherId = t.TeacherId) 
                    LEFT JOIN course as c ON (e.CourseId = c.CourseId) 
                    LEFT JOIN schoolmaster as sm ON (e.SchoolId = sm.SchoolId) 
                    Where e.TeacherId = ${user[0].TeacherId} AND e.SchoolId = ${user[0].SchoolId}
                    AND e.StatusId = ${status} AND e.ClassId = ${classId} AND e.CourseId = ${courseId}
                    Order By e.TestId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
      }
      else
      {
            search_query = `select e.*, sc.StudentClass, t.TeacherName, 
                    c.CourseName, sm.SchoolName from test as e 
                    LEFT JOIN studentclass as sc ON (e.ClassId = sc.ClassId) 
                    LEFT JOIN teacher as t ON (e.TeacherId = t.TeacherId) 
                    LEFT JOIN course as c ON (e.CourseId = c.CourseId) 
                    LEFT JOIN schoolmaster as sm ON (e.SchoolId = sm.SchoolId) 
                    Where e.TeacherId = ${user[0].TeacherId} AND e.SchoolId = ${user[0].SchoolId}
                    AND e.StatusId = ${status} AND e.ClassId = ${classId}
                    Order By e.TestId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
      }
    }
    else
    {
      if(courseId)
      {
            search_query = `select e.*, sc.StudentClass, t.TeacherName, 
                    c.CourseName, sm.SchoolName from test as e 
                    LEFT JOIN studentclass as sc ON (e.ClassId = sc.ClassId) 
                    LEFT JOIN teacher as t ON (e.TeacherId = t.TeacherId) 
                    LEFT JOIN course as c ON (e.CourseId = c.CourseId) 
                    LEFT JOIN schoolmaster as sm ON (e.SchoolId = sm.SchoolId) 
                    Where e.TeacherId = ${user[0].TeacherId} AND e.SchoolId = ${user[0].SchoolId}
                    AND e.StatusId = ${status} AND e.CourseId = ${courseId}
                    Order By e.TestId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
      }
      else
      {
            search_query = `select e.*, sc.StudentClass, t.TeacherName, 
                    c.CourseName, sm.SchoolName from test as e 
                    LEFT JOIN studentclass as sc ON (e.ClassId = sc.ClassId) 
                    LEFT JOIN teacher as t ON (e.TeacherId = t.TeacherId) 
                    LEFT JOIN course as c ON (e.CourseId = c.CourseId) 
                    LEFT JOIN schoolmaster as sm ON (e.SchoolId = sm.SchoolId) 
                    Where e.TeacherId = ${user[0].TeacherId} AND e.SchoolId = ${user[0].SchoolId}                    
                    AND e.StatusId = ${status} 
                    Order By e.TestId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
      }
    }


    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found."};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "Test": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      

  })(req,res,next);
}





//App Api
module.exports.getTestByClassId = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
     var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  console.log(user.student[0].SchoolId);
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size
  //var classId = req.query.classId;
  var search_query;
    
  search_query = `select count(*) as Total from test Where ClassId = ${user.student[0].ClassId} AND 
                  SchoolId = ${user.student[0].SchoolId} AND StatusId = 1`;
  pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }
    search_query = `select e.*, sc.StudentClass, t.TeacherName, 
                    c.CourseName, sm.SchoolName from test as e 
                    LEFT JOIN studentclass as sc ON (e.ClassId = sc.ClassId) 
                    LEFT JOIN teacher as t ON (e.TeacherId = t.TeacherId) 
                    LEFT JOIN course as c ON (e.CourseId = c.CourseId) 
                    LEFT JOIN schoolmaster as sm ON (e.SchoolId = sm.SchoolId) 
                    Where e.ClassId = ${user.student[0].ClassId} 
                    AND e.SchoolId = ${user.student[0].SchoolId}
                    AND e.StatusId = 1 limit ${query.limit}  offset  ${query.skip}`;

    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data"};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : true, message : "No Data Found."};
    }
    else 
    {
      console.log("MyData",data);    
      var fromDate = data[0].FromDate;
      console.log('FD', data[0].FromDate);
      var today = new Date();
      console.log('ET',data[0].ToDate); //date 27
      if(today >= fromDate && today <= data[0].ToDate)
      {
        var totalPages = Math.ceil(totalCount / size);    
        response = {status: 200, success : true, message : "Data Found", "Test": data,"Pages":totalPages,"TotalCount":totalCount};
      }
      else
      {
        response = {status: 200, success : true, message : "No Test Available."};
      }
      
    }
    res.json(response);
    });
  })      

  })(req,res,next);
}

//App Api
module.exports.getTestBySchoolAndClass = function (req, res, next) { 
  passport.authenticate('jwt', function(err,user)
  {
     if (err || !user) 
     {
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     };
     
     console.log('Student',user);
     var classId = req.query.classId;
     var schoolId = req.query.schoolId;
     var status = req.query.status;
     var studentId = user.student[0].StudentId;
     var search_query
     
     if(status == 'pending')
     {
        search_query = `SELECT a.*, sc.StudentClass, t.TeacherName, 
                c.CourseName, sm.SchoolName 
                from test as a 
                LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) 
                LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
                LEFT JOIN course as c ON (a.CourseId = c.CourseId) 
                LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) 
                where a.StatusId = 1 AND a.ClassId = ${classId} AND 
                a.SchoolId = ${schoolId} AND a.TestId 
                not in (select TestId from testsubmit es where es.testId = a.testId and 
                es.StudentId = ${studentId})`
     }
     else if(status == 'submitted' || status == 'reject' || status == 'accept')
     {
        search_query = `SELECT a.*, sc.StudentClass, sm.SchoolName,
                      e.FromDate, e.ToDate, e.TotalMarks, e.PassingMarks, f.TeacherName,
                      d.CourseName, e.TestTopic
                      from testsubmit as a
                      LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)                                                            
                      LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)
                      LEFT JOIN test as e ON (a.TestId = e.TestId)
                      LEFT JOIN teacher as f ON (f.TeacherId = e.TeacherId)
                      LEFT JOIN course as d ON (d.CourseId = e.CourseId)
                      where a.ClassId = ${classId} AND a.SchoolId = ${schoolId} 
                      AND a.TestStatus = '${status}' AND a.StudentId = ${studentId}
                      AND a.StatusId = 1`
                      //Need to add about reject case----
     }
      else if (status == 'history'){
        search_query = `SELECT a.*, sc.StudentClass, sm.SchoolName,
                      e.FromDate, e.ToDate, e.TotalMarks, e.PassingMarks                     
                      from testsubmit as a
                      LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)                       
                      LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)
                      LEFT JOIN test as e ON (a.TestId = e.TestId)
                      where a.ClassId = ${classId} AND a.SchoolId = ${schoolId} 
                      AND a.StudentId = ${studentId} AND a.StatusId = 1 AND a.TestStatus = '${status}'`
     
  }
     console.log(search_query);
      pool.query(search_query,function(err,data){
       if(err) 
       {
          response = {status:400,success:false,Error:"Error fetching data"  + err};
       } 
       else if(data.length == 0)
       {
          response = {status: 200, success : false, message : "No Data Found"};
       }
       else 
       {   
          if(status == 'pending'){
            
            data.forEach((e,i)=>
            {
              data[i].TestStatus="pending"

            });
            response = {status: 200, success : true, message : "Data Found", "Test": data};
          }
          else{
      response = {status: 200, success : true, message : "Data Found", "Test": data};
          }
          
       }
        res.json(response);
    });
  })(req, res, next);
}



//---------------------------------------------------------------------------



//-----------------------------------------Exam Submit Start--------------------------------------------

//App Api
module.exports.insertExamSubmit = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
    console.log(user); 
    
    if (!req.file) 
    {
        console.log("No file received");
        res.status(400).send({ error:true, message: 'Please Provide Exam Document.' });  
       
    }
    else if(req.file.size >= 5*1024*1024){
      return res.json({"status":400, success:false, message: 'File Too Large. It Should be less than 5MB.' });      
    } 
    else 
    {
      filename = req.file.filename;     
      var insert_examSub = new ExamSubmit(req.body, filename);
        if(!insert_examSub.ClassId){
            res.json({ status: 401, success: false, error: "Please Provide Class." });
        }
        if(!insert_examSub.SchoolId){
          res.json({ status: 401, success: false, error: "Please Provide School." });
        }
        if(!insert_examSub.ExamId){
          res.json({ status: 401, success: false, error: "Please Provide Exam." });
        }
        // if(!insert_examSub.StudentId){
        //   res.json({ status: 401, success: false, error: "Please Provide Student." });
        // }
        if(!insert_examSub.ExamStatus){
          res.json({ status: 401, success: false, error: "Please Provide Assignment Status." });
        }
        // if(!insert_examSub.RejectReason){
        //   res.json({ status: 401, success: false, error: "Please Provide Reject Reason." });
        // }

        insert_examSub.StudentId = user.student[0].StudentId;
        insert_examSub.StatusId = 1;
        insert_examSub.CreatedById = user.student[0].StudentId;
        insert_examSub.CreationDate = new Date();

        console.log('Data', insert_examSub);
        ExamSubmit.createExam(insert_examSub, req.body.SchoolId,function(err, assignment) {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send({status:200,success:true,message:"Details saved successfully."});
        }
    }); 
}
})(req, res, next);
}

//Marks assignmnet accept kiya..number
//Teacher Id
module.exports.updateExamSubmitStatus = async function(req,res,next)
{ 
  passport.authenticate('jwt', function(err, user){
  if (err || !user) 
  {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
  }
  if (!req.RejectReason) 
  {
        console.log("No file received", user);
        //filename = req.file.filename;    
        var update_exam = new ExamSubmit(req.body);
        update_exam.ModifiedById = user[0].TeacherId;
        update_exam.ModificationDate = new Date();
        ExamSubmit.updateExamStatus(req.body.ExamSubmitId,update_exam,function(err, assignment) {
        if(!update_exam.ExamStatus){
            res.json({ status: 401, success: false, error: "Please Provide Exam Status." });
        }
        else{
        console.log('Data', update_exam);
        if(err)
        {
              res.json({status:200,success:false,message:"Details not updated"});
        }
        else
        {
              res.send({status:200,success:true,message:"Details updated successfully."});
        } 
      }
    });   
  } 
  else
  {
    try{ 
      var update_exam = new ExamSubmit(req.body);
        if(!update_exam.ExamStatus){
            res.json({ status: 401, success: false, error: "Please Provide Exam Status." });
        }
        if(!update_exam.RejectReason){
          res.json({ status: 401, success: false, error: "Please Provide Reject Reason." });
        }
        update_exam.ModifiedById = user[0].TeacherId;
        update_exam.ModificationDate = new Date();

        console.log('Data', update_exam);
        ExamSubmit.updateExamStatus(req.body.ExamSubmitId,update_exam,function(err, assignment) {
        if (err)
        {
            res.send({status:200,success:false,message:"Details not updated."});
        }
        else
        {
            res.send({status:200,success:true,message:"Details updated successfully."});
        }
    }); 
         
  
  }catch(e){ console.log("catch",e);   }
  
  }    

  })(req,res,next);
}


//App Api..

module.exports.updateRejectExamStatus = function(req, res, next){
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
    if (!req.file) 
    {
        console.log("No file received");
        res.status(400).send({ error:true, message: 'Please Provide Exam Document.' });  
    }
    else if(req.file.size >= 5*1024*1024){
      return res.json({"status":400, success:false, message: 'File Too Large. It Should be less than 5MB.' });      
    }
    else{
        filename = req.file.filename;    
        var update_exam = new ExamSubmit(req.body, filename); 

        ExamSubmit.updateExamRejectStatus(req.body.ExamSubmitId,update_exam,function(err, assignment) {
        if(!update_exam.ExamStatus){
            res.json({ status: 401, success: false, error: "Please Provide Exam Status." });
        }
        else{
        console.log('Data', update_exam);
        if(err)
        {
              res.json({status:200,success:false,message:"Details not updated"});
        }
        else
        {
              res.send({status:200,success:true,message:"Details updated successfully."});
        } 
      }
    });
      }

  })(req, res, next);
}

//Web Api
module.exports.getExamSubmitByTeacherId = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  };
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  console.log(user[0].TeacherId);
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size
  //var classId = req.query.classId;
  var examId = req.query.examId;
  var examStatus = req.query.examStatus;
  var classId = req.query.classId;
  var courseId = req.query.courseId;
  var search_query;
    
    //if(classId)
    if(examId)
    {
      if(examStatus)
      {
        if(classId)
        {
          search_query = `select count(*) as Total from examsubmit 
          where ExamId =${examId} AND ExamStatus = '${examStatus}' 
          AND ClassId = ${classId} AND StatusId = 1
          Order By ExamSubmitId DESC`  
        }
        else
        {
          search_query = `select count(*) as Total from examsubmit 
          where ExamId =${examId} AND ExamStatus = '${examStatus}' 
          Order By ExamSubmitId DESC`  
        }
      }
      else
      {  
          search_query = `select count(*) as Total from examsubmit 
          where ExamId =${examId} AND StatusId = 1 Order By ExamSubmitId DESC`  
      }
   }
   else
   {
      search_query = `select count(*) as Total from examsubmit 
          where StatusId = 1 Order By ExamSubmitId DESC` 
   }
   console.log('Count', search_query)
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }

    if(examId)
    {
      if(examStatus)
      {
          if(classId)
          {
            search_query = `SELECT a.*, sc.StudentClass,   
          sm.SchoolName, st.StudentName, exam.ExamTopic, exam.TotalMarks, 
          exam.ExamGroupId, exam.CourseId,ch.CourseName
          from examsubmit as a 
          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)                      
          LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) 
          LEFT JOIN studentmain as st ON (a.StudentId = st.StudentId) 
          LEFT JOIN exam as exam ON (a.ExamId = exam.ExamId)
          LEFT JOIN course as ch ON (exam.CourseId = ch.CourseId)          
          where a.ExamId = ${examId} AND a.ExamStatus = '${examStatus}' 
          AND a.ClassId = ${classId} AND a.StatusId = 1
          Order By ExamSubmitId DESC
          limit ${query.limit}  offset  ${query.skip}`;
       }
       else
       {
            search_query = `SELECT a.*, sc.StudentClass,  
          sm.SchoolName, st.StudentName, exam.ExamTopic, exam.TotalMarks,
          exam.ExamGroupId, exam.CourseId,ch.CourseName
          from examsubmit as a 
          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)           
          LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) 
          LEFT JOIN studentmain as st ON (a.StudentId = st.StudentId) 
          LEFT JOIN exam as exam ON (a.ExamId = exam.ExamId)
          LEFT JOIN course as ch ON (exam.CourseId = ch.CourseId)
          where a.ExamId = ${examId} AND a.ExamStatus = '${examStatus}' AND a.StatusId = 1
          Order By ExamSubmitId DESC
          limit ${query.limit}  offset  ${query.skip}`;
       }
     }
      else
      {
        
            search_query = `SELECT a.*, sc.StudentClass,  
          sm.SchoolName, st.StudentName, exam.ExamTopic, exam.TotalMarks,
          exam.ExamGroupId, exam.CourseId,ch.CourseName
          from examsubmit as a 
          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)           
          LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) 
          LEFT JOIN studentmain as st ON (a.StudentId = st.StudentId) 
          LEFT JOIN exam as exam ON (a.ExamId = exam.ExamId) 
          LEFT JOIN course as ch ON (exam.CourseId = ch.CourseId)
          where a.ExamId = ${examId} AND a.StatusId = 1
          Order By ExamSubmitId DESC
          limit ${query.limit}  offset  ${query.skip}`;


      }
   }
   else
   {

            search_query = `SELECT a.*, sc.StudentClass,  
          sm.SchoolName, st.StudentName, exam.ExamTopic, exam.TotalMarks,
          exam.ExamGroupId, exam.CourseId,ch.CourseName
          from examsubmit as a 
          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)           
          LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) 
          LEFT JOIN studentmain as st ON (a.StudentId = st.StudentId) 
          LEFT JOIN exam as exam ON (a.ExamId = exam.ExamId)
          LEFT JOIN course as ch ON (exam.CourseId = ch.CourseId)
          AND a.StatusId = 1
          Order By ExamSubmitId DESC
          limit ${query.limit}  offset  ${query.skip}`;
   } 
   
    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "Exam": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}


//---------------------------------------------Exam Submit End----------------------------------------




//-----------------------------------------Test Submit Start--------------------------------------------

//App Api
module.exports.insertTestSubmit = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
    console.log(user); 
    
    if (!req.file) 
    {
        console.log("No file received");
        res.status(400).send({ error:true, message: 'Please Provide Test Document.' });  
       
    }
    else if(req.file.size >= 5*1024*1024){
      return res.json({"status":400, success:false, message: 'File Too Large. It Should be less than 5MB.' });      
    }
    else 
    {
      filename = req.file.filename;     
      var insert_testSub = new TestSubmit(req.body, filename);
        if(!insert_testSub.ClassId){
            res.json({ status: 401, success: false, error: "Please Provide Class." });
        }
        if(!insert_testSub.SchoolId){
          res.json({ status: 401, success: false, error: "Please Provide School." });
        }
        if(!insert_testSub.TestId){
          res.json({ status: 401, success: false, error: "Please Provide Test." });
        }
        if(!insert_testSub.TestStatus){
          res.json({ status: 401, success: false, error: "Please Provide Assignment Status." });
        }
        insert_testSub.StudentId = user.student[0].StudentId;
        insert_testSub.StatusId = 1;
        insert_testSub.CreatedById = user.student[0].StudentId;
        insert_testSub.CreationDate = new Date();

        console.log('Data', insert_testSub);
        TestSubmit.createTest(insert_testSub, req.body.SchoolId,function(err, assignment) {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send({status:200,success:true,message:"Details saved successfully."});
        }
    }); 
}
})(req, res, next);
}

//Marks assignmnet accept kiya..number
//Teacher Id
module.exports.updateTestSubmitStatus = async function(req,res,next)
{ 
  passport.authenticate('jwt', function(err, user){
  if (err || !user) 
  {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
  }
  if (!req.RejectReason) 
  {
        console.log("No file received", user);
        //filename = req.file.filename;    
        var update_test = new TestSubmit(req.body);
        update_test.ModifiedById = user[0].TeacherId;
        update_test.ModificationDate = new Date();
        TestSubmit.updateTestStatus(req.body.TestSubmitId,update_test,function(err, assignment) {
        if(!update_test.TestStatus){
            res.json({ status: 401, success: false, error: "Please Provide Test Status." });
        }
        else{
        console.log('Data', update_test);
        if(err)
        {
              res.json({status:200,success:false,message:"Details not updated"});
        }
        else
        {
              res.send({status:200,success:true,message:"Details updated successfully."});
        } 
      }
    });   
  } 
  else
  {
    try{ 
      var update_test = new TestSubmit(req.body);
        if(!update_test.TestStatus){
            res.json({ status: 401, success: false, error: "Please Provide Test Status." });
        }
        if(!update_test.RejectReason){
          res.json({ status: 401, success: false, error: "Please Provide Reject Reason." });
        }
        update_test.ModifiedById = user[0].TeacherId;
        update_test.ModificationDate = new Date();

        console.log('Data', update_test);
        TestSubmit.updateTestStatus(req.body.TestSubmitId,update_test,function(err, test) {
        if (err)
        {
            res.send({status:200,success:false,message:"Details not updated."});
        }
        else
        {
            res.send({status:200,success:true,message:"Details updated successfully."});
        }
    }); 
         
  
  }catch(e){ console.log("catch",e);   }
  
  }    

  })(req,res,next);
}


//App Api..

module.exports.updateRejectTestStatus = function(req, res, next){
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
    if (!req.file) 
    {
        console.log("No file received");
        res.status(400).send({ error:true, message: 'Please Provide Test Document.' });  
    }
    else if(req.file.size >= 5*1024*1024){
      return res.json({"status":400, success:false, message: 'File Too Large. It Should be less than 5MB.' });      
    }
    else{
        filename = req.file.filename;    
        var update_test = new TestSubmit(req.body, filename); 

        TestSubmit.updateTestRejectStatus(req.body.TestSubmitId,update_test,function(err, assignment) {
        if(!update_test.TestStatus){
            res.json({ status: 401, success: false, error: "Please Provide Test Status." });
        }
        else{
        console.log('Data', update_test);
        if(err)
        {
              res.json({status:200,success:false,message:"Details not updated"});
        }
        else
        {
              res.send({status:200,success:true,message:"Details updated successfully."});
        } 
      }
    });
      }

  })(req, res, next);
}


//Web Api
module.exports.getTestSubmitByTeacherId = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  };
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  console.log(user[0].TeacherId);
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size
  //var classId = req.query.classId;
  var testId = req.query.testId;
  var testStatus = req.query.testStatus;
  var classId = req.query.classId;
  var search_query;
    
    //if(classId)
    if(testId)
    {
      if(testStatus)
      {
        if(classId)
        {
          search_query = `select count(*) as Total from testsubmit 
          where TestId = ${testId} AND TestStatus = '${testStatus}' 
          AND ClassId = ${classId} AND StatusId = 1`  
        }
        else
        {
          search_query = `select count(*) as Total from testsubmit 
          where TestId =${testId} AND TestStatus = '${testStatus}' 
          AND StatusId = 1` 
        }
      }
      else{
        
          search_query = `select count(*) as Total from testsubmit 
          where TestId = ${testId} AND StatusId = 1`
      }
   }
   else
   {
      search_query = `select count(*) as Total from testsubmit 
          where StatusId = 1`
   }
   console.log('Count',search_query);
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }
    //if(classId)
    if(testId)
    {
      if(testStatus)
      {
          if(classId)
          {
            search_query = `SELECT a.*, sc.StudentClass,   
          sm.SchoolName, st.StudentName, t.TestTopic, t.TotalMarks
          from testsubmit as a 
          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)                      
          LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) 
          LEFT JOIN studentmain as st ON (a.StudentId = st.StudentId) 
          LEFT JOIN test as t ON (a.TestId = t.TestId)
          where t.TestId = ${testId} AND a.TestStatus = '${testStatus}' 
          AND a.ClassId = ${classId} AND a.StatusId = 1
          limit ${query.limit}  offset  ${query.skip}`;        
       }
       else
       {
           search_query = `SELECT a.*, sc.StudentClass,   
          sm.SchoolName, st.StudentName, t.TestTopic, t.TotalMarks
          from testsubmit as a 
          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)                      
          LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) 
          LEFT JOIN studentmain as st ON (a.StudentId = st.StudentId) 
          LEFT JOIN test as t ON (a.TestId = t.TestId)
          where t.TestId =${testId} AND a.TestStatus = '${testStatus}' 
          AND a.StatusId = 1
          limit ${query.limit}  offset  ${query.skip}`;
       }
     }
      else
      {
        
           search_query = `SELECT a.*, sc.StudentClass,   
          sm.SchoolName, st.StudentName, t.TestTopic, t.TotalMarks
          from testsubmit as a 
          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)                      
          LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) 
          LEFT JOIN studentmain as st ON (a.StudentId = st.StudentId) 
          LEFT JOIN test as t ON (a.TestId = t.TestId)
          where t.TestId =${testId} AND a.StatusId = 1
          limit ${query.limit}  offset  ${query.skip}`;
      }
   }
   else
   {
          search_query = `SELECT a.*, sc.StudentClass,   
          sm.SchoolName, st.StudentName, t.TestTopic, t.TotalMarks
          from testsubmit as a 
          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)                      
          LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) 
          LEFT JOIN studentmain as st ON (a.StudentId = st.StudentId) 
          LEFT JOIN test as t ON (a.TestId = t.TestId)
          where a.StatusId = 1
          limit ${query.limit}  offset  ${query.skip}`;
   }
   
    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "Test": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}

//---------------------------------------------Test Submit End----------------------------------------

//---------------------------------------Grade Master Start-------------------------------------------

//Web Api school token
module.exports.insertGM = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }    
      var insert_gm = new GradeMaster(req.body);
        if(!insert_gm.ClassId){
          res.json({ status: 401, success: false, error: "Please Provide Class" });
        }
        if(!insert_gm.CourseId){
          res.json({ status: 401, success: false, error: "Please Provide Course." });
        }       
        insert_gm.SchoolId = user[0].SchoolId;       
        insert_gm.StatusId = 1;
        insert_gm.CreatedById = user[0].SchoolId;
        insert_gm.CreationDate = new Date();
        console.log('Data', insert_gm);
        GradeMaster.createGradeMaster(insert_gm, user[0].SchoolId, function(err, gm) {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send({status:200,success:true,message:gm.Message,id:gm.Id});
        }
    }); 

})(req, res, next);
}


//Web Api school token
module.exports.updateGM = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }    
      var update_gm = new GradeMaster(req.body);
        if(!update_gm.ClassId){
          res.json({ status: 401, success: false, error: "Please Provide Class" });
        }
        if(!update_gm.CourseId){
          res.json({ status: 401, success: false, error: "Please Provide Course." });
        }       
        //update_gm.SchoolId = user[0].SchoolId;              
        update_gm.ModifiedById = user[0].SchoolId;
        update_gm.ModificationDate = new Date();
        console.log('Data', update_gm);
        GradeMaster.updateById(req.body.GradeMasterId,update_gm,function(err, gm) {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send({status:200,success:true,message:"Grade Master Details updated successfully."});
        }
    }); 

})(req, res, next);
}

//View Api School Token

module.exports.getGMBySchoolANDClassAndCourseId = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  };
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  console.log(user[0].TeacherId);
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size  
  var schoolId = user[0].SchoolId;
  var classId = req.query.classId;
  var courseId = req.query.courseId;
  var status = req.query.statusId;
  var search_query;

  if(classId)
  {
      if(courseId)
      {
        search_query = `select count(*) as Total from grademaster 
          where SchoolId = ${schoolId} and ClassId = ${classId}
          and CourseId = ${courseId} and StatusId = ${status}
          order BY GradeMasterId DESC`
      }
      else
      {
        search_query = `select count(*) as Total from grademaster 
          where SchoolId = ${schoolId} and ClassId = ${classId}
          and StatusId = ${status} order BY GradeMasterId DESC`
      }
  }
  else
  {
      if(courseId)
      {
        search_query = `select count(*) as Total from grademaster 
          where SchoolId = ${schoolId} and CourseId = ${courseId} 
          and StatusId = ${status} order BY GradeMasterId DESC`
      }
      else{
        search_query = `select count(*) as Total from grademaster 
          where SchoolId = ${schoolId} and StatusId = ${status} order BY GradeMasterId DESC`
      }
  }
    
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }
    if(classId)
    {
        if(courseId)
        {
          search_query = `SELECT a.*, sc.StudentClass,   
          sm.SchoolName, ch.CourseName
          from grademaster as a 
          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)                      
          LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) 
          LEFT JOIN course as ch ON (a.CourseId = ch.CourseId)           
          where a.SchoolId = ${schoolId} AND a.ClassId = ${classId}
          AND a.StatusId = ${status} AND a.CourseId = ${courseId}
          order BY GradeMasterId DESC
          limit ${query.limit}  offset  ${query.skip}`;
        }
        else
        {
          search_query = `SELECT a.*, sc.StudentClass,   
          sm.SchoolName, ch.CourseName
          from grademaster as a 
          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)                      
          LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) 
          LEFT JOIN course as ch ON (a.CourseId = ch.CourseId)           
          where a.SchoolId = ${schoolId} AND a.ClassId = ${classId}
          AND a.StatusId = ${status}
          order BY GradeMasterId DESC
          limit ${query.limit}  offset  ${query.skip}`;
        }
    }
    else{
      if(courseId)
      {
          search_query = `SELECT a.*, sc.StudentClass,   
          sm.SchoolName, ch.CourseName
          from grademaster as a 
          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)                      
          LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) 
          LEFT JOIN course as ch ON (a.CourseId = ch.CourseId)           
          where a.SchoolId = ${schoolId} AND
          a.StatusId = ${status} AND a.CourseId = ${courseId}
          order BY GradeMasterId DESC
          limit ${query.limit}  offset  ${query.skip}`;
      }
      else{
      search_query = `SELECT a.*, sc.StudentClass,   
          sm.SchoolName, ch.CourseName
          from grademaster as a 
          LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)                      
          LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) 
          LEFT JOIN course as ch ON (a.CourseId = ch.CourseId)           
          where a.SchoolId = ${schoolId} AND a.StatusId = ${status}
          order BY GradeMasterId DESC
          limit ${query.limit}  offset  ${query.skip}`;
    }
  }
    
      
   
    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "GradeMaster": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}


//----------------------------------------------------------------------------------------------------



//---------------------------------------Grade Detail Start-------------------------------------------

//Web Api school token
// module.exports.insertGD = async function(req,res,next)
// {   
//   passport.authenticate('jwt',function(err,user)
//   {
//      console.log("IS Next", user);
//      if (err || !user) 
//      {
//         console.log("Test1")
//         console.log("User",err);
//         return res.json({ status: 401, success: false, error: "Authentication Fail." });
//      }    
//       var insert_gd = new GradeDetail(req.body);
//         if(!insert_gd.FromRange){
//           res.json({ status: 401, success: false, error: "Please Provide From Range" });
//         }
//         if(!insert_gd.ToRange){
//           res.json({ status: 401, success: false, error: "Please Provide To Range" });
//         } 
//         if(!insert_gd.Grade){
//           res.json({ status: 401, success: false, error: "Please Provide To Grade" });
//         }                    
//         insert_gd.StatusId = 1;
//         insert_gd.CreatedById = user[0].SchoolId;
//         insert_gd.CreationDate = new Date();
//         console.log('Data', insert_gd);
//         GradeDetail.createGradeDetail(insert_gd,function(err, gm) {
//         if (err)
//         {
//             res.send({status:200,success:false,message:"Something went wrong" + gm});
//         }
//         else
//         {
//             res.send({status:200,success:true,message:"Grade Details saved successfully."});
//         }
//     }); 

// })(req, res, next);
// }



module.exports.insertGD = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
   
     console.log("Body",req.body);
     let gdData = req.body;
     var value,insert_gd,count=0;
     for(i=0;i<gdData.length;i++)
     {
       console.log("Index",gdData[i]); //Index { GradeMasterId: 1, FromRange: 100, ToRange: 90, Grade: 'A+' }
       value = gdData[i];
       console.log(Object.values(value));   
       insert_gd = new GradeDetail(gdData[i]);

       //insertGDData(insert_gd,res);
    
       
        if(!insert_gd.FromRange){
          res.json({ status: 401, success: false, error: "Please Provide From Range" });
        }
        if(!insert_gd.ToRange){
          res.json({ status: 401, success: false, error: "Please Provide To Range" });
        } 
        if(!insert_gd.Grade){
          res.json({ status: 401, success: false, error: "Please Provide To Grade" });
        }                    
        insert_gd.StatusId = 1;
        insert_gd.CreatedById = user[0].SchoolId;
        insert_gd.CreationDate = new Date();
        console.log('Data', insert_gd);
        var json = {status:200,success:true,message:"Grade Details saved successfully."};
        GradeDetail.createGradeDetail(insert_gd,function(err, gd) {
        if (err)
        {
            res.send({status:200,success:false,message:"Something went wrong"});
        }
        else
        {   
              count++;
              if(count==gdData.length)
              {
                console.log("I"+i+"Count"+count);
                 res.send({status:200,success:true,message:"Grade Details saved successfully."});
              }
        }

    }); 
         
      }
     
})(req, res, next);
}





//Web Api school token
// module.exports.updateGD = async function(req,res,next)
// {   
//   passport.authenticate('jwt',function(err,user)
//   {
//      console.log("IS Next", user);
//      if (err || !user) 
//      {
//         console.log("Test1")
//         console.log("User",err);
//         return res.json({ status: 401, success: false, error: "Authentication Fail." });
//      }    
//       var update_gd = new GradeDetail(req.body);
//          if(!update_gd.FromRange){
//           res.json({ status: 401, success: false, error: "Please Provide From Range" });
//         }
//         if(!update_gd.ToRange){
//           res.json({ status: 401, success: false, error: "Please Provide To Range" });
//         } 
//         if(!update_gd.Grade){
//           res.json({ status: 401, success: false, error: "Please Provide To Grade" });
//         }                 
//         update_gd.ModifiedById = user[0].SchoolId;
//         update_gd.ModificationDate = new Date();
//         console.log('Data', update_gd);
//         GradeDetail.updateById(req.body.GradeDetailId,update_gd,function(err, gm) {
//         if (err)
//         {
//             console.log(err);
//         }
//         else
//         {
//             res.send({status:200,success:true,message:"Grade Details updated successfully."});
//         }
//     }); 

// })(req, res, next);
// }


module.exports.updateGD = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }    
     console.log("Body",req.body);
     let gdData = req.body;
     var value,update_gd,count=0;
     var gm = gdData[0].GradeMasterId;
     pool.query(`delete from gradedetail where GradeMasterId = ?`,gm,function(err,data)
      {
        if(err){

        }
        else{

        }
      });

     for(i=0;i<gdData.length;i++)
     {
       console.log("Index",gdData[i]); 
       value = gdData[i];       
       update_gd = new GradeDetail(gdData[i]);   
       var detailId = gdData[i].GradeDetailId;
      
        if(!update_gd.FromRange){
          res.json({ status: 401, success: false, error: "Please Provide From Range" });
        }
        if(!update_gd.ToRange){
          res.json({ status: 401, success: false, error: "Please Provide To Range" });
        } 
        if(!update_gd.Grade){
          res.json({ status: 401, success: false, error: "Please Provide Grade" });
        }                 
        update_gd.ModifiedById = user[0].SchoolId;
        update_gd.ModificationDate = new Date();
        console.log('Data', update_gd);

        GradeDetail.createGradeDetail(update_gd,function(err, gd) {
        if (err)
        {
            res.send({status:200,success:false,message:"Something went wrong" + err});
        }
        else
        {
           count++;
              if(count==gdData.length)
              {
                console.log("I"+i+"Count"+count+gd.res);
                 res.send({status:200,success:true,message:"Grade Details updated successfully."});
              }  
        }
    }); 
}
})(req, res, next);
}




//View Api School Token

module.exports.getGDBySchoolANDClassAndCourseId = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size  
  var schoolId = user[0].SchoolId;
  var classId = req.query.classId;
  var courseId = req.query.courseId;
  var status = req.query.status;
  var grademaster = req.query.grademasterId;
  var search_query;

    if(classId)
    {
      if(courseId)
      {
        search_query = `select count(*) as Total from gradedetail as gd 
                        LEFT JOIN grademaster as gm ON(gm.GradeMasterId = gd.GradeMasterId)
                        where gm.schoolId=${schoolId}
                        AND gd.StatusId = ${status} AND gm.CourseId = ${courseId} 
                        AND gm.ClassId = ${classId} and gd.GradeMasterId = ${grademaster}`;
      }
      else
      {
        search_query = `select count(*) as Total from gradedetail as gd 
                        LEFT JOIN grademaster as gm ON(gm.GradeMasterId = gd.GradeMasterId)
                        where gm.schoolId=${schoolId}
                        AND gd.StatusId = ${status} AND gm.ClassId = ${classId} and gd.GradeMasterId = ${grademaster}`;
      }
    }
    else
    {
      if(courseId)
      {
          search_query = `select count(*) as Total from gradedetail as gd 
                        LEFT JOIN grademaster as gm ON(gm.GradeMasterId = gd.GradeMasterId)
                        where gm.schoolId=${schoolId}
                        AND gd.StatusId = ${status} AND gm.CourseId = ${courseId} and gd.GradeMasterId = ${grademaster}`;
      }
      else
      {
          search_query = `select count(*) as Total from gradedetail as gd 
                        LEFT JOIN grademaster as gm ON(gm.GradeMasterId = gd.GradeMasterId)
                        where gm.schoolId=${schoolId}
                        AND gd.StatusId = ${status} and gd.GradeMasterId = ${grademaster}`;
      }
    }
    
    console.log('Count',search_query);
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }

    if(classId)
    {
        if(courseId)
        {
              search_query = `SELECT gd.*, sc.StudentClass, sm.SchoolName, 
                    ch.CourseName, gm.ClassId,gm.CourseId 
                    from gradedetail as gd 
                    LEFT JOIN grademaster as gm ON(gm.GradeMasterId = gd.GradeMasterId) 
                    LEFT JOIN studentclass as sc ON (gm.ClassId = sc.ClassId) 
                    LEFT JOIN schoolmaster as sm ON (gm.SchoolId = sm.SchoolId) 
                    LEFT JOIN course as ch ON (gm.CourseId = ch.CourseId) 
                    where gm.SchoolId = ${schoolId} AND gd.StatusId = ${status} 
                    AND gm.CourseId = ${courseId} AND gm.ClassId = ${classId} 
                    and gd.GradeMasterId = ${grademaster}
                    limit ${query.limit}  offset  ${query.skip}`;
        }
        else
        {
                  search_query = `SELECT gd.*, sc.StudentClass, sm.SchoolName, 
                    ch.CourseName, gm.ClassId,gm.CourseId 
                    from gradedetail as gd 
                    LEFT JOIN grademaster as gm ON(gm.GradeMasterId = gd.GradeMasterId) 
                    LEFT JOIN studentclass as sc ON (gm.ClassId = sc.ClassId) 
                    LEFT JOIN schoolmaster as sm ON (gm.SchoolId = sm.SchoolId) 
                    LEFT JOIN course as ch ON (gm.CourseId = ch.CourseId) 
                    where gm.SchoolId = ${schoolId} AND gd.StatusId = ${status} 
                    AND gm.ClassId = ${classId} and gd.GradeMasterId = ${grademaster}
                    limit ${query.limit}  offset  ${query.skip}`;
        }
    }
    else
    {
        if(courseId)
        {
              search_query = `SELECT gd.*, sc.StudentClass, sm.SchoolName, 
                    ch.CourseName, gm.ClassId,gm.CourseId 
                    from gradedetail as gd 
                    LEFT JOIN grademaster as gm ON(gm.GradeMasterId = gd.GradeMasterId) 
                    LEFT JOIN studentclass as sc ON (gm.ClassId = sc.ClassId) 
                    LEFT JOIN schoolmaster as sm ON (gm.SchoolId = sm.SchoolId) 
                    LEFT JOIN course as ch ON (gm.CourseId = ch.CourseId) 
                    where gm.SchoolId = ${schoolId} AND gd.StatusId = ${status} 
                    AND gm.CourseId = ${courseId} and gd.GradeMasterId = ${grademaster}
                    limit ${query.limit}  offset  ${query.skip}`;
        }
        else
        {
                search_query = `SELECT gd.*, sc.StudentClass, sm.SchoolName, 
                    ch.CourseName, gm.ClassId,gm.CourseId 
                    from gradedetail as gd 
                    LEFT JOIN grademaster as gm ON(gm.GradeMasterId = gd.GradeMasterId) 
                    LEFT JOIN studentclass as sc ON (gm.ClassId = sc.ClassId) 
                    LEFT JOIN schoolmaster as sm ON (gm.SchoolId = sm.SchoolId) 
                    LEFT JOIN course as ch ON (gm.CourseId = ch.CourseId) 
                    where gm.SchoolId = ${schoolId} AND gd.StatusId = ${status} 
                    and gd.GradeMasterId = ${grademaster}
                    limit ${query.limit}  offset  ${query.skip}`;
        }
    }

    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "GradeDetail": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}

//Web api Teacher Token changes required.
module.exports.getExamDetailSchoolANDClassAndCourseId = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size  
  var schoolId = user[0].SchoolId;
  var classId = req.query.classId;
  var courseId = req.query.courseId;
  var status = req.query.status;
  var search_query;

    if(classId)
    {
      if(courseId)
      {
        search_query = `select count(*) as Total from examresultdetail as ed 
                        LEFT JOIN examresultmaster as em ON(em.ExamResultMasterId = ed.ExamResultMasterId)
                        where em.schoolId=${schoolId}
                        AND ed.StatusId = ${status} AND em.CourseId = ${courseId} 
                        AND em.ClassId = ${classId}`;
      }
      else
      {
        search_query = `select count(*) as Total from examresultdetail as ed 
                        LEFT JOIN examresultmaster as em ON(em.ExamResultMasterId = ed.ExamResultMasterId)
                        where em.schoolId=${schoolId}
                        AND ed.StatusId = ${status} AND em.ClassId = ${classId} `;
      }
    }
    else
    {
      if(courseId)
      {
          search_query = `select count(*) as Total from examresultdetail as ed 
                        LEFT JOIN examresultmaster as em ON(em.ExamResultMasterId = ed.ExamResultMasterId)
                        where em.schoolId=${schoolId}
                        AND ed.StatusId = ${status} AND em.CourseId = ${courseId}`;
      }
      else
      {
          search_query = `select count(*) as Total from examresultdetail as ed 
                        LEFT JOIN examresultmaster as em ON(em.ExamResultMasterId = ed.ExamResultMasterId)
                        where em.schoolId=${schoolId}
                        AND ed.StatusId = ${status}`;
      }
    }
    
    console.log('Count',search_query);
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }

    if(classId)
    {
        if(courseId)
        {
              search_query = `SELECT gd.ExamResultDetailId,gd.Question,gd.QuestionMark,sc.StudentClass, sm.SchoolName, ch.CourseName 
                              from examresultdetail as gd 
                              LEFT JOIN examresultmaster as erm ON (gd.ExamResultMasterId = erm.ExamResultMasterId) 
                              LEFT JOIN studentclass as sc ON (erm.ClassId = sc.ClassId) 
                              LEFT JOIN schoolmaster as sm ON (erm.SchoolId = sm.SchoolId) 
                              LEFT JOIN course as ch ON (erm.CourseId = ch.CourseId) 
                              where erm.SchoolId = ${schoolId} AND gd.StatusId = ${status} 
                              AND erm.CourseId = ${courseId} AND erm.ClassId = ${classId} 
                              Order BY gd.Question
                              limit ${query.limit}  offset  ${query.skip}`;
        }
        else
        {
                  search_query = `SELECT gd.ExamResultDetailId,gd.Question,gd.QuestionMark,sc.StudentClass, sm.SchoolName, ch.CourseName 
                              from examresultdetail as gd 
                              LEFT JOIN examresultmaster as erm ON (gd.ExamResultMasterId = erm.ExamResultMasterId) 
                              LEFT JOIN studentclass as sc ON (erm.ClassId = sc.ClassId) 
                              LEFT JOIN schoolmaster as sm ON (erm.SchoolId = sm.SchoolId) 
                              LEFT JOIN course as ch ON (erm.CourseId = ch.CourseId) 
                              where erm.SchoolId = ${schoolId} AND gd.StatusId = ${status} 
                              AND erm.ClassId = ${classId} 
                              limit ${query.limit}  offset  ${query.skip}`;
        }
    }
    else
    {
        if(courseId)
        {
              search_query = `SELECT gd.ExamResultDetailId,gd.Question,gd.QuestionMark,sc.StudentClass, sm.SchoolName, ch.CourseName 
                              from examresultdetail as gd 
                              LEFT JOIN examresultmaster as erm ON (gd.ExamResultMasterId = erm.ExamResultMasterId) 
                              LEFT JOIN studentclass as sc ON (erm.ClassId = sc.ClassId) 
                              LEFT JOIN schoolmaster as sm ON (erm.SchoolId = sm.SchoolId) 
                              LEFT JOIN course as ch ON (erm.CourseId = ch.CourseId) 
                              where erm.SchoolId = ${schoolId} AND gd.StatusId = ${status} 
                              AND erm.CourseId = ${courseId} 
                              limit ${query.limit}  offset  ${query.skip}`;
        }
        else
        {
                search_query = `SELECT gd.ExamResultDetailId,gd.Question,gd.QuestionMark,sc.StudentClass, sm.SchoolName, ch.CourseName 
                              from examresultdetail as gd 
                              LEFT JOIN examresultmaster as erm ON (gd.ExamResultMasterId = erm.ExamResultMasterId) 
                              LEFT JOIN studentclass as sc ON (erm.ClassId = sc.ClassId) 
                              LEFT JOIN schoolmaster as sm ON (erm.SchoolId = sm.SchoolId) 
                              LEFT JOIN course as ch ON (erm.CourseId = ch.CourseId) 
                              where erm.SchoolId = ${schoolId} AND gd.StatusId = ${status}
                              limit ${query.limit}  offset  ${query.skip}`;
        }
    }

    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);
      response = {status: 200, success : true, message : "Data Found", "ExamDetail": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}

//----------------------------------------------------------------------------------------------------

  
//------------------------------------ExamGroup Start------------------------------------------------

//Web Api School Token

module.exports.insertExamGroup = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }    
      var insert_eg = new ExamGroup(req.body);
        if(!insert_eg.ExamName){
          res.json({ status: 401, success: false, error: "Please Provide Exam Name" });
        }
        if(!insert_eg.ExamStartDate){
          res.json({ status: 401, success: false, error: "Please Provide Exam Start Date." });
        }
        if(!insert_eg.ExamEndDate){
          res.json({ status: 401, success: false, error: "Please Provide Exam End Date." });
        }
        if(!insert_eg.ExamResultDate){
          res.json({ status: 401, success: false, error: "Please Provide Exam Result Date." });
        } 
        insert_eg.SchoolId = user[0].SchoolId;       
        insert_eg.StatusId = 1;
        insert_eg.CreatedById = user[0].SchoolId;
        insert_eg.CreationDate = new Date();
        console.log('Data', insert_eg);
        ExamGroup.createExamGroup(insert_eg,function(err, gm) {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send({status:200,success:true,message:"Exam Group Details saved successfully."});
        }
    }); 

})(req, res, next);
}

//Web Api school token
module.exports.updateExamGroup = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }    
      var update_eg = new ExamGroup(req.body);
        if(!update_eg.ExamName){
          res.json({ status: 401, success: false, error: "Please Provide Exam Name" });
        }
        if(!update_eg.ExamStartDate){
          res.json({ status: 401, success: false, error: "Please Provide Exam Start Date." });
        }
        if(!update_eg.ExamEndDate){
          res.json({ status: 401, success: false, error: "Please Provide Exam End Date." });
        }
        if(!update_eg.ExamResultDate){
          res.json({ status: 401, success: false, error: "Please Provide Exam Result Date." });
        }        
        //update_eg.SchoolId = user[0].SchoolId;              
        update_eg.ModifiedById = user[0].SchoolId;
        update_eg.ModificationDate = new Date();
        console.log('Data', update_eg);
        ExamGroup.updateById(req.body.ExamGroupId,update_eg,function(err, gm) {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send({status:200,success:true,message:"Exam Group Details updated successfully."});
        }
    }); 

})(req, res, next);
}


//View Api School Token

module.exports.getEGBySchool = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size  
  var schoolId = user[0].SchoolId; 
  var status = req.query.status;  
  var search_query;

    //if(status)
   // {
        search_query = `select count(*) as Total from examgroup as eg 
                        LEFT JOIN schoolmaster as sm ON(sm.SchoolId = eg.SchoolId)
                        where eg.schoolId=${schoolId}
                        AND eg.StatusId = ${status} order BY ExamGroupId DESC`;

    console.log('Count',search_query);
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }
      search_query = `SELECT eg.*, sm.SchoolName              
                    from examgroup as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)                     
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status}
                    order BY ExamGroupId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
        
    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "ExamGroup": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}

//App Api Student Token

module.exports.getAllExamGroupBySchoolId = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size  
  var schoolId = req.query.schoolId; 
  var status = req.query.status;  
  var search_query;

    //if(status)
   // {
        search_query = `select count(*) as Total from examgroup as eg 
                        LEFT JOIN schoolmaster as sm ON(sm.SchoolId = eg.SchoolId)
                        where eg.schoolId=${schoolId}
                        AND eg.StatusId = ${status}`;

    console.log('Count',search_query);
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }
      search_query = `SELECT eg.*, sm.SchoolName              
                    from examgroup as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)                     
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status}
                    `;
        
    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "Exam Group": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}

//App Api Student Token
// module.exports.getAllExamGroupBySchoolIdAndClass = function (req, res, next) { 
// passport.authenticate('jwt', function(err,user)
// {
//   if (err || !user) 
//   {
//     return res.json({ status: 401, success: false, error: "Authentication Fail." });
//   }
//   var page = parseInt(req.query.page)
//   var size = parseInt(req.query.size)
  
          
//   var query = {}
//   if(page < 0 || page === 0) 
//   {
//     response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
//     return res.json(response)
//   }
//   query.skip = size * (page - 1)
//   query.limit = size  
//   var schoolId = user.student[0].SchoolId; 
//   var status = req.query.status;  
//   var classId = req.query.classId;
//   var examgroup = req.query.examgroupId;
//   var examStatus = req.query.examStatus;
//   var search_query;

//     //if(status)
//    // {
//         search_query = `select count(*) as Total from exam as eg 
//                         LEFT JOIN schoolmaster as sm ON(sm.SchoolId = eg.SchoolId)
//                         LEFT JOIN examsubmit as e ON (e.ExamId = eg.ExamId)
//                         where eg.schoolId=${schoolId}
//                         AND eg.StatusId = ${status} AND eg.ClassId = ${classId} 
//                         AND eg.ExamGroupId = ${examgroup} AND e.ExamStatus = '${examStatus}'`;

//     console.log('Count',search_query);
//     pool.query(search_query,function(err,totalCount){
//     if(err) 
//     {
//       response = {status:400,success:false,Error:"Error fetching data."};
//     }
//       search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass, t.TeacherName, es.ExamStatus,
//                     ch.CourseName from exam as eg                     
//                     LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
//                     LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
//                     LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
//                     LEFT JOIN teacher as t ON (t.TeacherId = eg.TeacherId)
//                     LEFT JOIN examsubmit as es ON (es.ExamId = eg.ExamId)
//                     LEFT JOIN course as ch ON (ch.CourseId = eg.CourseId)
//                     where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
//                     AND eg.ClassId = ${classId} AND eg.ExamGroupId = ${examgroup}
//                     AND es.ExamStatus = '${examStatus}'`;
        
//     console.log(search_query);
//     pool.query(search_query,function(err,data){
//     if(err) 
//     {
//       response = {status:400,success:false,Error:"Error fetching data" + err};
//     } 
//     else if(data.length == 0)
//     {
//       response = {status: 200, success : false, message : "No Data Found"};
//     }
//     else 
//     {
//       var totalPages = Math.ceil(totalCount / size);    
//       response = {status: 200, success : true, message : "Data Found", "Exam": data,"Pages":totalPages,"TotalCount":totalCount};
//     }
//     res.json(response);
//     });
//   })      
//   })(req, res, next);
// }


// module.exports.getAllExamGroupBySchoolIdAndClass = function (req, res, next) { 
//   passport.authenticate('jwt', function(err,user)
//   {
//      if (err || !user) 
//      {
//         return res.json({ status: 401, success: false, error: "Authentication Fail." });
//      };
     
//      console.log('Student',user);
//      var classId = req.query.classId;
//      var schoolId = user.student[0].SchoolId;
//      var status = req.query.status;
//      var studentId = user.student[0].StudentId;
//      var examgroup = req.query.examgroupId;
//      var examStatus = req.query.examStatus;
//      var search_query
     
//      if(examStatus == 'pending')
//      {
//               search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass, t.TeacherName, es.ExamStatus,
//                     ch.CourseName from exam as eg                     
//                     LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
//                     LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
//                     LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
//                     LEFT JOIN teacher as t ON (t.TeacherId = eg.TeacherId)
//                     LEFT JOIN examsubmit as es ON (es.ExamId = eg.ExamId)
//                     LEFT JOIN course as ch ON (ch.CourseId = eg.CourseId)
//                     where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
//                     AND eg.ClassId = ${classId} AND eg.ExamGroupId = ${examgroup}
//                     AND es.ExamStatus = '${examStatus}' 
//                     AND eg.ExamId not in(select examId from examsubmit ex where 
//                     ex.ExamId = eg.ExamId and 
//                     ex.StudentId = ${studentId})`;
//      }
//      else if(examStatus == 'submitted' || examStatus == 'reject' || examStatus == 'accept')
//      {

//               search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass, t.TeacherName,
//                     ch.CourseName from examsubmit as eg                     
//                     LEFT JOIN schoolmaster as sm ON (eg.SchoolId = sm.SchoolId)
//                     LEFT JOIN studentclass as sc ON (eg.ClassId = sc.classId)                                        
//                     LEFT JOIN exam as es ON (eg.ExamId = es.ExamId)
//                     LEFT JOIN course as ch ON (es.CourseId = ch.CourseId)
//                     LEFT JOIN teacher as t ON (es.TeacherId = t.TeacherId)
//                     LEFT JOIN examgroup as e ON (es.ExamGroupId = e.ExamGroupId)
//                     where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
//                     AND eg.ClassId = ${classId} AND es.ExamGroupId = ${examgroup}
//                     AND eg.ExamStatus = '${examStatus}'`;


//      }
//      console.log(search_query);
//       pool.query(search_query,function(err,data){
//        if(err) 
//        {
//           response = {status:400,success:false,Error:"Error fetching data"  + err};
//        } 
//        else if(data.length == 0)
//        {
//           response = {status: 200, success : false, message : "No Data Found"};
//        }
//        else 
//        {   
//           if(status == 'pending'){
            
//             data.forEach((e,i)=>
//             {
//               data[i].ExamStatus="pending"

//             });
//             response = {status: 200, success : true, message : "Data Found", "Exam": data};
//           }
//           else{
//       response = {status: 200, success : true, message : "Data Found", "Exam": data};
//           }
          
//        }
//         res.json(response);
//     });
//   })(req, res, next);
// }


module.exports.getAllExamGroupBySchoolIdAndClass = function (req, res, next) { 
  passport.authenticate('jwt', function(err,user)
  {
     if (err || !user) 
     {
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     };
     
     console.log('Student',user);
     var classId = req.query.classId;
     var schoolId = req.query.schoolId;
     var status = req.query.status;
     var studentId = user.student[0].StudentId;
     var examgroup = req.query.examgroupId;
     var search_query
     
     if(status == 'pending')
     {
        search_query = `SELECT a.*, sc.StudentClass, t.TeacherName, 
                c.CourseName, sm.SchoolName
                from exam as a 
                LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId) 
                LEFT JOIN teacher as t ON (a.TeacherId = t.TeacherId) 
                LEFT JOIN course as c ON (a.CourseId = c.CourseId) 
                LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId) 
                where a.StatusId = 1 AND a.ClassId = ${classId} AND 
                a.SchoolId = ${schoolId} AND a.ExamGroupId = ${examgroup}
                AND a.ExamId 
                not in (select ExamId from examsubmit es where es.examId = a.examId and 
                es.StudentId = ${studentId})`

     }
     else if(status == 'submitted' || status == 'reject' || status == 'accept')
     {
        search_query = `SELECT a.*, sc.StudentClass, sm.SchoolName,
                      e.FromDate, e.ToDate, e.TotalMarks, e.PassingMarks, f.TeacherName,
                      d.CourseName, e.ExamTopic, e.ExamGroupId
                      from examsubmit as a
                      LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)                                                            
                      LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)
                      LEFT JOIN exam as e ON (a.ExamId = e.ExamId)
                      LEFT JOIN teacher as f ON (f.TeacherId = e.TeacherId)
                      LEFT JOIN course as d ON (d.CourseId = e.CourseId)
                      where a.ClassId = ${classId} AND a.SchoolId = ${schoolId} 
                      AND a.ExamStatus = '${status}' AND a.StudentId = ${studentId}
                      AND a.StatusId = 1 AND e.ExamGroupId = ${examgroup}`

// SELECT a.*, sc.StudentClass, sm.SchoolName,
//                       e.FromDate, e.ToDate, e.TotalMarks, e.PassingMarks, f.TeacherName,
//                       d.CourseName, e.ExamTopic, e.ExamGroupId
//                       from examsubmit as a
//                       LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)                                          
//                       LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)
//                       LEFT JOIN exam as e ON (a.ExamId = e.ExamId)
//                       LEFT JOIN teacher as f ON (f.TeacherId = e.TeacherId)
//                       LEFT JOIN course as d ON (d.CourseId = e.CourseId)
//                       where a.ClassId = 2 AND a.SchoolId = 31
//                       AND a.ExamStatus = 'accept' AND a.StudentId = 751
//                       AND a.StatusId = 1 AND e.ExamGroupId = 1


                      //Need to add about reject case----

     }
      else if (status == 'history'){
        search_query = `SELECT a.*, sc.StudentClass, sm.SchoolName,
                      e.FromDate, e.ToDate, e.TotalMarks, e.PassingMarks                     
                      from examsubmit as a
                      LEFT JOIN studentclass as sc ON (a.ClassId = sc.ClassId)                       
                      LEFT JOIN schoolmaster as sm ON (a.SchoolId = sm.SchoolId)
                      LEFT JOIN exam as e ON (a.ExamId = e.ExamId)
                      where a.ClassId = ${classId} AND a.SchoolId = ${schoolId} 
                      AND a.StudentId = ${studentId} AND a.StatusId = 1 
                      AND a.ExamStatus = '${status}' AND e.ExamGroupId = ${examgroup}`
     
  }
     console.log(search_query);
      pool.query(search_query,function(err,data){
       if(err) 
       {
          response = {status:400,success:false,Error:"Error fetching data"  + err};
       } 
       else if(data.length == 0)
       {
          response = {status: 200, success : false, message : "No Data Found"};
       }
       else 
       {   
          if(status == 'pending'){
            
            data.forEach((e,i)=>
            {
              data[i].ExamStatus="pending"

            });
            response = {status: 200, success : true, message : "Data Found", "Exam": data};
          }
          else{
      response = {status: 200, success : true, message : "Data Found", "Exam": data};
          }
          
       }
        res.json(response);
    });
  })(req, res, next);
}




//------------------------------------ExamGroup End--------------------------------------------------


//------------------------------------Grade Calculation Api------------------------------------------

module.exports.gradeCalculation = function(req, res, next)
{
  passport.authenticate('jwt', function(err,user)
  {
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }

  var schoolId = user[0].SchoolId;  
  var classId = req.query.classId;
  var courseId = req.query.courseId;
  var status = req.query.status;
  var grademaster = req.query.grademasterId;
  var marks = req.query.marks;
  var search_query,value;
  var count = 0;
  search_query = `SELECT gd.*, sc.StudentClass, sm.SchoolName, 
                    ch.CourseName, gm.ClassId,gm.CourseId 
                    from gradedetail as gd 
                    LEFT JOIN grademaster as gm ON(gm.GradeMasterId = gd.GradeMasterId) 
                    LEFT JOIN studentclass as sc ON (gm.ClassId = sc.ClassId) 
                    LEFT JOIN schoolmaster as sm ON (gm.SchoolId = sm.SchoolId) 
                    LEFT JOIN course as ch ON (gm.CourseId = ch.CourseId) 
                    where gm.SchoolId = ${schoolId} AND gd.StatusId = ${status} 
                    AND gm.CourseId = ${courseId} AND gm.ClassId = ${classId} 
                    and gd.GradeMasterId = ${grademaster}`
console.log("Search", search_query);
pool.query(search_query, function(err,data)
  {
    if(err)
    {
      res.json({status:400,success:false,Error:"Error fetching data" + err});
    }
    else if(data.length==0)
    {
      res.json({status:400,success:false,Error:"No Data Found"});
    }
    else
    {
      console.log("Data Length", data.length);
      var is_gradeFound=true;
      for(i=0;i<data.length;i++)
      {
        console.log("Test 1");
        console.log("From Range", data[i].FromRange); // 1
        console.log("To Range", data[i].ToRange); // 20
        if(marks>=data[i].FromRange && marks<=data[i].ToRange)
        {
          console.log("Test 1.1");
            
            console.log("Count"+ count + "I" + i);
            if(count==i)
            {
              res.json({status:200,success:true,"Grade":data[i].Grade});
              break;
            }
            count++;
        }
        else
        {
           
            if(count==i)
            {
              //res.json({status:400,success:false,Error:"No Grade"}) //
              is_gradeFound = false;
              console.log('No Grade');
            //break;
            }
          count++;    
        }

      }
      
    }
    if(!is_gradeFound){
      res.json({status:200,success:false,Error:"No Grade Found"}) 
  }

  });


})(req,res,next);
}

//--------------------------------------End---------------------------------------------------------


//-------------------------------------Exam Result Master-----------------------------------------

//Web Api Teacher Token

module.exports.insertExamMasterResult = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }    
      var insert_em = new ExamResultMaster(req.body);
        // if(!insert_em.SchoolId){
        //   res.json({ status: 401, success: false, error: "Please Provide School" });
        // }
        if(!insert_em.ClassId){
          res.json({ status: 401, success: false, error: "Please Provide Class" });
        }
        if(!insert_em.ExamGroupId){
          res.json({ status: 401, success: false, error: "Please Provide Exam Group" });
        }
        if(!insert_em.CourseId){
          res.json({ status: 401, success: false, error: "Please Provide Course" });
        }
        if(!insert_em.StudentId){
          res.json({ status: 401, success: false, error: "Please Provide Student" });
        }
        if(!insert_em.TotalMarks){
          res.json({ status: 401, success: false, error: "Please Provide Total Marks" });
        }
        if(!insert_em.MarksObtained){
          res.json({ status: 401, success: false, error: "Please Provide Marks Obtained" });
        }
        if(!insert_em.GradeObtained){
          res.json({ status: 401, success: false, error: "Please Provide Grade Obtained" });
        }
        if(!insert_em.ResultType ){
          res.json({ status: 401, success: false, error: "Please Provide Result Type" });
        }
        insert_em.SchoolId = user[0].SchoolId;              
        insert_em.StatusId = 1;
        insert_em.CreatedById = user[0].TeacherId;
        insert_em.CreationDate = new Date();
        console.log('Data', insert_em);
        ExamResultMaster.createResultMaster(insert_em,function(err, em) {
        if (err)
        {
            //console.log(err);
            res.send({status:200,success:false,message:"Something went wrong"});
        }
        else
        {
            res.send({status:200,success:true,message:"Exam Result saved successfully.",id:em.Id});
        }
    }); 

})(req, res, next);
}


module.exports.updateExamMasterResult = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }    
      var update_em = new ExamResultMaster(req.body);
        if(!update_em.ClassId){
          res.json({ status: 401, success: false, error: "Please Provide Class" });
        }
        if(!update_em.CourseId){
          res.json({ status: 401, success: false, error: "Please Provide Course" });
        }
        if(!update_em.MarksObtained){
          res.json({ status: 401, success: false, error: "Please Provide Marks Obtained" });
        }
        if(!update_em.GradeObtained){
          res.json({ status: 401, success: false, error: "Please Provide Grade Obtained" });
        }
        if(!update_em.ResultType){
          res.json({ status: 401, success: false, error: "Please Provide Result Type" });
        }
        if(!update_em.StatusId)
        {
          res.json({ status: 401, success: false, error: "Please Provide StatusId" });
        }
        update_em.SchoolId = user[0].SchoolId;           
        update_em.ModifiedById = user[0].TeacherId;
        update_em.ModificationDate = new Date();
        console.log('Data', update_em);
        ExamResultMaster.updateById(req.body.ExamResultMasterId,update_em,function(err, em) {
        if (err)
        {
            //console.log(err);
            res.send({status:200,success:false,message:"Something went wrong"});
        }
        else
        {
            res.send({status:200,success:true,message:"Exam Result updated successfully."});
        }
    }); 

})(req, res, next);
}

//Web Api Teacher Token
module.exports.getExamAccToType = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size  
  var schoolId = user[0].SchoolId; 
  var status = req.query.status;  
  var classId = req.query.classId;
  var examgroup = req.query.examgroupId;
  var resulttype = req.query.resulttype;
  var courseId = req.query.courseId;
  var search_query;

    if(classId)
    {
        if(examgroup)
        {
          if(resulttype)
          {
              if(courseId)
              {
                search_query = `select count(*) as Total from examresultmaster                        
                              where schoolId=${schoolId} AND StatusId = ${status} 
                              AND ClassId = ${classId} AND ExamGroupId = ${examgroup}
                              AND ResultType = '${resulttype}' AND CourseId = ${courseId}
                              order BY ExamResultMasterId DESC`;
              }
              else{
                search_query = `select count(*) as Total from examresultmaster                        
                              where schoolId=${schoolId} AND StatusId = ${status} 
                              AND ClassId = ${classId} AND ExamGroupId = ${examgroup}
                              AND ResultType = '${resulttype}' order BY ExamResultMasterId DESC`;
                }
          }
          else
          {
              search_query = `select count(*) as Total from examresultmaster                        
                  where schoolId=${schoolId} AND StatusId = ${status} 
                  AND ClassId = ${classId} AND ExamGroupId = ${examgroup}
                  order BY ExamResultMasterId DESC`;
          }
        }
        else
        {
          if(resulttype)
          {
            if(courseId)
            {
                search_query = `select count(*) as Total from examresultmaster                        
                  where schoolId=${schoolId} AND StatusId = ${status} 
                  AND ClassId = ${classId} AND resulttype = '${resulttype}' AND CourseId = ${courseId}
                  order BY ExamResultMasterId DESC`;
            }
            else{
                search_query = `select count(*) as Total from examresultmaster                        
                  where schoolId=${schoolId} AND StatusId = ${status} 
                  AND ClassId = ${classId} AND resulttype = '${resulttype}' 
                  order BY ExamResultMasterId DESC`;
             }
          }
          else if(courseId)
          {
            search_query = `select count(*) as Total from examresultmaster                        
                              where schoolId=${schoolId} AND StatusId = ${status} 
                              AND ClassId = ${classId} AND CourseId = ${courseId}
                              order BY ExamResultMasterId DESC`
          }
          else
          {
           search_query = `select count(*) as Total from examresultmaster                        
               where schoolId=${schoolId} AND StatusId = ${status} 
               AND ClassId = ${classId} order BY ExamResultMasterId DESC`;
          
        
          }
        }
    }
    else
    {
      if(examgroup)
      {
          search_query = `select count(*) as Total from examresultmaster                        
            where schoolId=${schoolId} AND StatusId = ${status} 
            AND ExamGroupId = ${examgroup} order BY ExamResultMasterId DESC`;
      }
      else if(resulttype)
      {
         search_query = `select count(*) as Total from examresultmaster                        
            where schoolId=${schoolId} AND StatusId = ${status} 
            AND ResultType = '${resulttype}' order BY ExamResultMasterId DESC`;
      }
      else if(courseId)
      {
            search_query = `select count(*) as Total from examresultmaster                        
            where schoolId=${schoolId} AND StatusId = ${status} 
            AND CourseId = ${courseId} order BY ExamResultMasterId DESC`;  
      }
      else
      {
          search_query = `select count(*) as Total from examresultmaster                        
                where schoolId=${schoolId} AND StatusId = ${status} order BY ExamResultMasterId DESC`;
      }
    }
    console.log('Count',search_query);
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }

 if(classId)
    {
        if(examgroup)
        {
          if(resulttype)
          {    
              if(courseId)
              {
              search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, e.ExamName
                    from examresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.ClassId = ${classId} AND eg.ExamGroupId = ${examgroup}
                    AND eg.resulttype = '${resulttype}'  AND eg.CourseId = ${courseId}
                    order BY ExamResultMasterId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
              }
              else{
              search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, e.ExamName
                    from examresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.ClassId = ${classId} AND eg.ExamGroupId = ${examgroup}
                    AND eg.resulttype = '${resulttype}'
                    order BY ExamResultMasterId DESC 
                    limit ${query.limit}  offset  ${query.skip}`;
                }
          }      
          else
          {

                  search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, e.ExamName
                    from examresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.ClassId = ${classId} AND eg.ExamGroupId = ${examgroup}
                    order BY ExamResultMasterId DESC
                    limit ${query.limit}  offset  ${query.skip}`;      
          }
        }
        else
        {
             if(resulttype)
             {
              // search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass            
              //       from examresultmaster as eg                     
              //       LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
              //       LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
              //       LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
              //       where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
              //       AND eg.ClassId = ${classId} AND eg.resulttype = '${resulttype}'
              //       limit ${query.limit}  offset  ${query.skip}`;
              if(courseId)
              {
              search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, e.ExamName
                    from examresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.ClassId = ${classId} AND eg.resulttype = '${resulttype}' 
                    AND eg.CourseId = ${courseId}
                    order BY ExamResultMasterId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
              }
              else{
              search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, e.ExamName
                    from examresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.ClassId = ${classId} AND eg.resulttype = '${resulttype}' 
                    order BY ExamResultMasterId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
             }
           }
             else if(courseId)
             {
                 search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, e.ExamName
                    from examresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.ClassId = ${classId} AND eg.CourseId = ${courseId} 
                    order BY ExamResultMasterId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
             }
             else{
              // search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass            
              //       from examresultmaster as eg                     
              //       LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
              //       LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
              //       LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
              //       where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
              //       AND eg.ClassId = ${classId}
              //       limit ${query.limit}  offset  ${query.skip}`;

                search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, e.ExamName
                    from examresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.ClassId = ${classId} 
                    order BY ExamResultMasterId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
        }
      }
    }
    else
    {
      if(examgroup)
      {
         // search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass            
         //            from examresultmaster as eg                     
         //            LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
         //            LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
         //            LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
         //            where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
         //            eg.ExamGroupId = ${examgroup}
         //            limit ${query.limit}  offset  ${query.skip}`;

                       search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, e.ExamName
                    from examresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.ExamGroupId = ${examgroup}
                    order BY ExamResultMasterId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
      }
      else if(resulttype)
      {
         // search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass            
         //            from examresultmaster as eg                     
         //            LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
         //            LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
         //            LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
         //            where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
         //            AND eg.resulttype = '${resulttype}'
         //            limit ${query.limit}  offset  ${query.skip}`;

                  search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, e.ExamName
                    from examresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status}                     
                    AND eg.resulttype = '${resulttype}'
                    order BY ExamResultMasterId DESC 
                    limit ${query.limit}  offset  ${query.skip}`;
      }
      else if(courseId)
      {
              search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, e.ExamName
                    from examresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status}                     
                    AND eg.CourseId = ${courseId} 
                    order BY ExamResultMasterId DESC
                    limit ${query.limit}  offset  ${query.skip}`; 
      }
      else
      {
         // search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass            
         //            from examresultmaster as eg                     
         //            LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
         //            LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
         //            LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
         //            where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
         //            limit ${query.limit}  offset  ${query.skip}`;

                       search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, e.ExamName
                    from examresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status}
                    order BY ExamResultMasterId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
      }
    }


        
    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "ExamResult": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}

//App Api Student Token
module.exports.getExamResult = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }  
  var schoolId = req.query.schoolId;
  var studentId = user.student[0].StudentId 
  var status = req.query.status;  
  var classId = req.query.classId;
  var examgroup = req.query.examgroupId;
  var resulttype = 'final';
  var search_query;

              search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, e.ExamName, e.ExamStartDate,
                    e.ExamEndDate, e.ExamResultDate, exam.ExamTopic, t.TeacherName
                    from examresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    LEFT JOIN exam as exam ON (exam.ExamGroupId = eg.ExamGroupId)
                    LEFT JOIN teacher as t ON (exam.TeacherId = t.TeacherId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.ClassId = ${classId} AND eg.ExamGroupId = ${examgroup}
                    AND eg.resulttype = '${resulttype}'`;


        
    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      response = {status: 200, success : true, message : "Data Found", "ExamResult": data};
    }
    res.json(response);
    });      
  })(req, res, next);
}




//---------------------------------------End-----------------------------------------------------



//--------------------------------------ExamResult Detail Start-------------------------------------

//Web Api Teacher Token
module.exports.insertExamDetailResult = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
   
     console.log("Body",req.body);
     let edData = req.body;
     var value,insert_ed,count=0;
     for(i=0;i<edData.length;i++)
     {        
       value = edData[i];
       console.log(Object.values(value));   
       insert_ed = new ExamResultDetail(edData[i]);
        if(!insert_ed.ExamResultMasterId){
          res.json({ status: 401, success: false, error: "Please Provide Exam Master" });
        }
        if(!insert_ed.Question){
          res.json({ status: 401, success: false, error: "Please Provide Question" });
        }
        if(!insert_ed.QuestionMark){
          res.json({ status: 401, success: false, error: "Please Provide Question Mark" });
        } 
        if(!insert_ed.MarksObtained){
          res.json({ status: 401, success: false, error: "Please Provide Marks Obtained" });
        }                    
        insert_ed.StatusId = 1;
        insert_ed.CreatedById = user[0].TeacherId;
        insert_ed.CreationDate = new Date();
        console.log('Data', insert_ed);        
        ExamResultDetail.createResultDetail(insert_ed,function(err, gd) {
        if (err)
        {
            res.send({status:200,success:false,message:"Something went wrong" + err});
        }
        else
        {   
              count++;
              if(count==edData.length)
              {
                console.log("I"+i+"Count"+count);
                 res.send({status:200,success:true,message:"Exam Result Details saved successfully."});
              }
        }

    }); 
         
      }
     
})(req, res, next);
}



module.exports.updateExamDetailResult = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }    
     console.log("Body",req.body);
     let edData = req.body;
     var value,update_ed,count=0;
     for(i=0;i<edData.length;i++)
     {        
       value = edData[i];
       console.log(Object.values(value)); 
       var detailId = edData[i].ExamResultDetailId;  
       update_ed = new ExamResultDetail(edData[i]);
        if(!update_ed.Question){
          res.json({ status: 401, success: false, error: "Please Provide Question" });
        }
        if(!update_ed.QuestionMark){
          res.json({ status: 401, success: false, error: "Please Provide Question Mark" });
        } 
        if(!update_ed.MarksObtained){
          res.json({ status: 401, success: false, error: "Please Provide Marks Obtained" });
        }
        if(!update_ed.StatusId){
          res.json({ status: 401, success: false, error: "Please Provide StatusId" });
        }                
        update_ed.ModifiedById = user[0].SchoolId;
        update_ed.ModificationDate = new Date();
        console.log('Data', update_ed);

        ExamResultDetail.updateById(detailId,update_ed,function(err, ed) {
        if (err)
        {
            res.send({status:200,success:false,message:"Something went wrong" + err});
        }
        else
        {
           count++;
              if(count==edData.length)
              {
               
                 res.send({status:200,success:true,message:"Exam Result Details updated successfully."});
              }  
        }
    }); 
}
})(req, res, next);
}

//Web Api Teacher Token
module.exports.getExamResultDetailByMasterId = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size  
  var schoolId = user[0].SchoolId; 
  var status = req.query.status;
  var exammaster = req.query.examResultMasterId;
  var search_query;

                search_query = `select count(*) as Total 
                              from examresultdetail as er
                              LEFT JOIN examresultmaster as em ON (em.ExamResultMasterId = er.ExamResultMasterId)
                              LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)                        
                              where em.schoolId=${schoolId} AND er.StatusId = ${status} 
                              AND er.ExamResultMasterId = ${exammaster}`;

    console.log('Count',search_query);
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }
              // search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
              //       c.CourseName,st.StudentName, e.ExamName
              //       from examresultmaster as eg                     
              //       LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
              //       LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
              //       LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
              //       LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
              //       LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
              //       where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
              //       AND eg.ClassId = ${classId} AND eg.ExamGroupId = ${examgroup}
              //       AND eg.resulttype = '${resulttype}'  AND eg.CourseId = ${courseId}
              //       limit ${query.limit}  offset  ${query.skip}`;

                // search_query = `select er.*, 
                //               em.ExamGroupId, em.ResultType, sm.SchoolName
                //               from examresultdetail as er
                //               LEFT JOIN examresultmaster as em ON (em.ExamResultMasterId = er.ExamResultMasterId)
                //               LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)                        
                //               where em.schoolId=${schoolId} AND er.StatusId = ${status} 
                //               AND er.ExamResultMasterId = ${exammaster}
                //               limit ${query.limit}  offset  ${query.skip}`;

                search_query = `select er.*, em.ExamGroupId, em.ResultType, em.TotalMarks,sm.SchoolName,
                              st.StudentName, sc.StudentClass,sc.ClassId, c.CourseName, c.CourseId, eg.ExamName
                              from examresultdetail as er
                              LEFT JOIN examresultmaster as em ON (em.ExamResultMasterId = er.ExamResultMasterId)
                              LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)
                              LEFT JOIN course as c ON (c.CourseId = em.CourseId)
                              LEFT JOIN studentclass as sc ON (sc.ClassId = em.ClassId)
                              LEFT JOIN studentmain as st ON (st.StudentId = em.StudentId)
                              LEFT JOIN examgroup as eg ON (eg.ExamGroupId = em.ExamGroupId)                        
                              where em.schoolId=${schoolId} AND er.StatusId = ${status} 
                              AND er.ExamResultMasterId = ${exammaster}
                              limit ${query.limit}  offset  ${query.skip}`;        
    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "ExamResultDetail": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}


//App Api Student Token
module.exports.getExamResultDetailByMasterIdApp = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  } 
  var schoolId = req.query.schoolId; 
  var status = req.query.status;
  var exammaster = req.query.examResultMasterId;
  var search_query;

                search_query = `select er.*, em.ExamGroupId, em.ResultType, em.TotalMarks,sm.SchoolName,
                              st.StudentName, sc.StudentClass,sc.ClassId, c.CourseName, c.CourseId, eg.ExamName,
                              em.GradeObtained, em.TotalMarks, em.MarksObtained as MarksObtainedFromResult
                              from examresultdetail as er
                              LEFT JOIN examresultmaster as em ON (em.ExamResultMasterId = er.ExamResultMasterId)
                              LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)
                              LEFT JOIN course as c ON (c.CourseId = em.CourseId)
                              LEFT JOIN studentclass as sc ON (sc.ClassId = em.ClassId)
                              LEFT JOIN studentmain as st ON (st.StudentId = em.StudentId)
                              LEFT JOIN examgroup as eg ON (eg.ExamGroupId = em.ExamGroupId)                        
                              where em.schoolId=${schoolId} AND er.StatusId = ${status} 
                              AND er.ExamResultMasterId = ${exammaster}`;        
    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {   
      response = {status: 200, success : true, message : "Data Found", "ExamResultDetail": data};
    }
    res.json(response);
    });

  })(req, res, next);
}

//------------------------------------------------------------------------------------------------

//--------------------------------------------Details---------------------------------------------

module.exports.getExamDetailByStudent = function(req,res,next)
{
  passport.authenticate('jwt', function(err,user)
  {
    if (err || !user) 
    {
      return res.json({ status: 401, success: false, error: "Authentication Fail." });
    }
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)

  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size  
  var schoolId = user[0].SchoolId; 
  var status = req.query.status;
  var examId = req.query.examId;
  var studentId = req.query.studentId;
  var teacherId = user[0].TeacherId;
  var examStatus = req.query.examStatus;
  var examSubmitId = req.query.examSubmitId;
  var search_query;

                // search_query = `select count(*) as Total 
                //               from exam as em
                //               LEFT JOIN examgroup as eg ON (em.ExamGroupId = eg.ExamGroupId)
                //               LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)
                //               LEFT JOIN examsubmit as es ON (es.ExamId = es.ExamId)
                //               LEFT JOIN exam as exam ON (exam.ExamId = es.ExamId)                        
                //               where em.schoolId=${schoolId} AND em.StatusId = ${status} 
                //               AND em.StudentId = ${studentId} and exam.ExamId = ${examId}
                //               AND es.ExamStatus = '${examStatus}' AND es.ExamSubmitId = ${examSubmitId}`;

      search_query = `select count(*) as Total from exam as em
                              LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)
                              LEFT JOIN examsubmit as es ON (es.ExamId = es.ExamId)
                              LEFT JOIN exam as exam ON (exam.ExamId = em.ExamId)
                              LEFT JOIN examgroup as eg ON (em.ExamGroupId = eg.ExamGroupId)
                              LEFT JOIN course as c ON (c.CourseId = em.CourseId)
                              LEFT JOIN studentmain as st ON (st.StudentId = es.StudentId)
                              LEFT JOIN studentclass as sc ON (sc.ClassId = em.ClassId)                                         
                              where em.schoolId=${schoolId} AND em.StatusId = ${status} 
                              AND es.StudentId = ${studentId} AND exam.ExamId = ${examId}
                              AND es.ExamStatus = '${examStatus}'  AND es.ExamSubmitId = ${examSubmitId}`;
    console.log('Count',search_query);
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }

      search_query = `select em.*, sm.SchoolName, c.CourseName, st.StudentId,st.StudentName,
                              sc.StudentClass, es.ExamStatus, eg.ExamName,
                              es.ExamSubmitId from exam as em
                              LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)
                              LEFT JOIN examsubmit as es ON (es.ExamId = es.ExamId)
                              LEFT JOIN exam as exam ON (exam.ExamId = em.ExamId)
                              LEFT JOIN examgroup as eg ON (em.ExamGroupId = eg.ExamGroupId)
                              LEFT JOIN course as c ON (c.CourseId = em.CourseId)
                              LEFT JOIN studentmain as st ON (st.StudentId = es.StudentId)
                              LEFT JOIN studentclass as sc ON (sc.ClassId = em.ClassId)                                         
                              where em.schoolId=${schoolId} AND em.StatusId = ${status} 
                              AND es.StudentId = ${studentId} AND exam.ExamId = ${examId}
                              AND es.ExamStatus = '${examStatus}'  AND es.ExamSubmitId = ${examSubmitId}
                              limit ${query.limit}  offset  ${query.skip}`;
    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "ExamDetail": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })
  })(req,res,next);
}


module.exports.getStudentMarks = function(req,res,next)
{
  passport.authenticate('jwt', function(err,user)
  {
    if (err || !user) 
    {
      return res.json({ status: 401, success: false, error: "Authentication Fail." });
    }
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)

  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size  
  var schoolId = user[0].SchoolId; 
  var status = req.query.status;
  var examId = req.query.examId;
  var studentId = req.query.studentId;
  var teacherId = user[0].TeacherId;
  var examStatus = req.query.examStatus;
  var examSubmitId = req.query.examSubmitId;
  var examGroupId = req.query.examGroupId;
  var classId = req.query.classId;
  var courseId = req.query.courseId;
  var search_query;

                search_query = `select count(*) as Total 
                              from examresultmaster as em
                              LEFT JOIN examgroup as eg ON (em.ExamGroupId = eg.ExamGroupId)
                              LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)
                              LEFT JOIN examsubmit as es ON (es.ExamId = es.ExamId)
                              LEFT JOIN exam as exam ON (exam.ExamId = es.ExamId)                        
                              where em.schoolId=${schoolId} AND em.StatusId = ${status} 
                              AND em.StudentId = ${studentId} and exam.ExamId = ${examId}
                              AND es.ExamStatus = '${examStatus}' AND es.ExamSubmitId = ${examSubmitId}
                              AND eg.ExamGroupId = ${examGroupId} 
                              AND em.ClassId = ${classId}
                              AND em.CourseId = ${courseId}`;

      // search_query = `select count(*) as Total from 
      //                         examresultmaster as em
      //                         LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)
      //                         LEFT JOIN examsubmit as es ON (es.ExamId = es.ExamId)
      //                         LEFT JOIN exam as exam ON (exam.ExamId = es.ExamId)
      //                         LEFT JOIN examgroup as eg ON (em.ExamGroupId = eg.ExamGroupId)
      //                         LEFT JOIN course as c ON (c.CourseId = em.CourseId)
      //                         LEFT JOIN studentmain as st ON (st.StudentId = es.StudentId)
      //                         LEFT JOIN studentclass as sc ON (sc.ClassId = em.ClassId)                                         
      //                         where em.schoolId=${schoolId} AND em.StatusId = ${status} 
      //                         AND es.StudentId = ${studentId} AND exam.ExamId = ${examId}
      //                         AND es.ExamStatus = '${examStatus}'  AND es.ExamSubmitId = ${examSubmitId}`;
    
    console.log('Count',search_query);
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }

      // search_query = `select em.*, sm.SchoolName, c.CourseName, st.StudentId,st.StudentName,
      //                         sc.StudentClass, es.ExamStatus, eg.ExamName,
      //                         es.ExamSubmitId from examresultmaster as em
      //                         LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)
      //                         LEFT JOIN examsubmit as es ON (es.ExamId = es.ExamId)
      //                         LEFT JOIN exam as exam ON (exam.ExamId = es.ExamId)
      //                         LEFT JOIN examgroup as eg ON (em.ExamGroupId = eg.ExamGroupId)
      //                         LEFT JOIN course as c ON (c.CourseId = em.CourseId)
      //                         LEFT JOIN studentmain as st ON (st.StudentId = es.StudentId)
      //                         LEFT JOIN studentclass as sc ON (sc.ClassId = em.ClassId)                                         
      //                         where em.schoolId=${schoolId} AND em.StatusId = ${status} 
      //                         AND es.StudentId = ${studentId} AND exam.ExamId = ${examId}
      //                         AND es.ExamStatus = '${examStatus}'  AND es.ExamSubmitId = ${examSubmitId}
      //                         limit ${query.limit}  offset  ${query.skip}`


                      search_query = `select em.*, sm.SchoolName, es.ExamStatus,
                              es.ExamSubmitId,eg.ExamName
                              from examresultmaster as em
                              LEFT JOIN examgroup as eg ON (em.ExamGroupId = eg.ExamGroupId)
                              LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)
                              LEFT JOIN examsubmit as es ON (es.ExamId = es.ExamId)
                              LEFT JOIN exam as exam ON (exam.ExamId = es.ExamId)                        
                              where em.schoolId=${schoolId} AND em.StatusId = ${status} 
                              AND em.StudentId = ${studentId} and exam.ExamId = ${examId}
                              AND es.ExamStatus = '${examStatus}' AND es.ExamSubmitId = ${examSubmitId}
                              AND eg.ExamGroupId = ${examGroupId} AND em.ClassId = ${classId}
                              AND em.CourseId = ${courseId}`;
                            
    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "ExamDetail": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })
  })(req,res,next);
}

//-------------------------------------------------------------------------------------------------




//-------------------------------------Test Result Master-----------------------------------------

//Web Api Teacher Token

module.exports.insertTestMasterResult = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }    
      var insert_em = new TestResultMaster(req.body);
        // if(!insert_em.SchoolId){
        //   res.json({ status: 401, success: false, error: "Please Provide School" });
        // }
        if(!insert_em.ClassId){
          res.json({ status: 401, success: false, error: "Please Provide Class" });
        }
        if(!insert_em.TestId){
          res.json({ status: 401, success: false, error: "Please Provide Test" });
        }
        if(!insert_em.CourseId){
          res.json({ status: 401, success: false, error: "Please Provide Course" });
        }
        if(!insert_em.StudentId){
          res.json({ status: 401, success: false, error: "Please Provide Student" });
        }
        if(!insert_em.TotalMarks){
          res.json({ status: 401, success: false, error: "Please Provide Total Marks" });
        }
        if(!insert_em.MarksObtained){
          res.json({ status: 401, success: false, error: "Please Provide Marks Obtained" });
        }
        if(!insert_em.GradeObtained){
          res.json({ status: 401, success: false, error: "Please Provide Grade Obtained" });
        }
        if(!insert_em.ResultType ){
          res.json({ status: 401, success: false, error: "Please Provide Result Type" });
        }
        insert_em.SchoolId = user[0].SchoolId;              
        insert_em.StatusId = 1;
        insert_em.CreatedById = user[0].TeacherId;
        insert_em.CreationDate = new Date();
        console.log('Data', insert_em);
        TestResultMaster.createResultMaster(insert_em,function(err, em) {
        if (err)
        {
            //console.log(err);
            res.send({status:200,success:false,message:"Something went wrong"});
        }
        else
        {
            res.send({status:200,success:true,message:"Test Result saved successfully.",id:em.Id});
        }
    }); 

})(req, res, next);
}


module.exports.updateTestMasterResult = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }    
      var update_em = new ExamResultMaster(req.body);
        if(!update_em.ClassId){
          res.json({ status: 401, success: false, error: "Please Provide Class" });
        }
        if(!update_em.CourseId){
          res.json({ status: 401, success: false, error: "Please Provide Course" });
        }
        if(!update_em.MarksObtained){
          res.json({ status: 401, success: false, error: "Please Provide Marks Obtained" });
        }
        if(!update_em.GradeObtained){
          res.json({ status: 401, success: false, error: "Please Provide Grade Obtained" });
        }
        if(!update_em.ResultType){
          res.json({ status: 401, success: false, error: "Please Provide Result Type" });
        }
        if(!update_em.StatusId)
        {
          res.json({ status: 401, success: false, error: "Please Provide StatusId" });
        }
        update_em.SchoolId = user[0].SchoolId;           
        update_em.ModifiedById = user[0].TeacherId;
        update_em.ModificationDate = new Date();
        console.log('Data', update_em);
        TestResultMaster.updateById(req.body.TestResultMasterId,update_em,function(err, em) {
        if (err)
        {
            //console.log(err);
            res.send({status:200,success:false,message:"Something went wrong"});
        }
        else
        {
            res.send({status:200,success:true,message:"Test Result updated successfully."});
        }
    }); 

})(req, res, next);
}

//Web Api Teacher Token
module.exports.getTestAccToType = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size  
  var schoolId = user[0].SchoolId; 
  var status = req.query.status;  
  var classId = req.query.classId;
  //var examgroup = req.query.examgroupId;
  var resulttype = req.query.resulttype;
  var courseId = req.query.courseId;
  var search_query;

    if(classId)
    {
          if(resulttype)
          {
              if(courseId)
              {
                search_query = `select count(*) as Total from testresultmaster                        
                              where schoolId=${schoolId} AND StatusId = ${status} 
                              AND ClassId = ${classId} AND ResultType = '${resulttype}' 
                              AND CourseId = ${courseId}
                              order BY TestResultMasterId DESC`;
              }
              else{
                search_query = `select count(*) as Total from testresultmaster                        
                              where schoolId=${schoolId} AND StatusId = ${status} 
                              AND ClassId = ${classId} AND ResultType = '${resulttype}' 
                              order BY TestResultMasterId DESC`;
                }
          }
          else
          {
              search_query = `select count(*) as Total from testresultmaster                        
                  where schoolId=${schoolId} AND StatusId = ${status} 
                  AND ClassId = ${classId} order BY TestResultMasterId DESC`;
          }
        }
        else
        {
          if(resulttype)
          {
            if(courseId)
            {
                search_query = `select count(*) as Total from testresultmaster                        
                  where schoolId=${schoolId} AND StatusId = ${status} 
                  AND resulttype = '${resulttype}' AND CourseId = ${courseId}
                  order BY TestResultMasterId DESC`;
            }
            else{
                search_query = `select count(*) as Total from testresultmaster                        
                  where schoolId=${schoolId} AND StatusId = ${status} 
                  AND resulttype = '${resulttype}' 
                  order BY TestResultMasterId DESC`;
             }
          }
          else if(courseId)
          {
            search_query = `select count(*) as Total from testresultmaster                        
                              where schoolId=${schoolId} AND StatusId = ${status} 
                              AND ClassId = ${classId} AND CourseId = ${courseId}
                              order BY TestResultMasterId DESC`
          }
          else if(classId)
          {
              search_query = `select count(*) as Total from testresultmaster                        
                              where schoolId=${schoolId} AND StatusId = ${status} 
                              AND ClassId = ${classId} 
                              order BY TestResultMasterId DESC` 
          }
          else
          {
           search_query = `select count(*) as Total from testresultmaster                        
               where schoolId=${schoolId} AND StatusId = ${status} 
               AND ClassId = ${classId} order BY TestResultMasterId DESC`;
          
        
          }
    }

    // else
    // {
    //   if(resulttype)
    //   {
    //      search_query = `select count(*) as Total from testresultmaster                        
    //         where schoolId=${schoolId} AND StatusId = ${status} 
    //         AND ResultType = '${resulttype}' order BY TestResultMasterId DESC`;
    //   }
    //   else if(courseId)
    //   {
    //         search_query = `select count(*) as Total from Testresultmaster                        
    //         where schoolId=${schoolId} AND StatusId = ${status} 
    //         AND CourseId = ${courseId} order BY TestResultMasterId DESC`;  
    //   }
    //   else
    //   {
    //       search_query = `select count(*) as Total from testresultmaster                        
    //             where schoolId=${schoolId} AND StatusId = ${status} order BY TestResultMasterId DESC`;
    //   }
    // }
    console.log('Count',search_query);
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }

    if(classId)
    {
          if(resulttype)
          {    
              if(courseId)
              {
              search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, t.TestTopic
                    from testresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    LEFT JOIN test as t ON (t.TestId = eg.TestId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.ClassId = ${classId} AND eg.resulttype = '${resulttype}'  
                    AND eg.CourseId = ${courseId}
                    order BY TestResultMasterId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
              }
              else{
              search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, t.TestTopic
                    from testresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    LEFT JOIN test as t ON (t.TestId = eg.TestId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.ClassId = ${classId} AND eg.resulttype = '${resulttype}'
                    order BY TestResultMasterId DESC 
                    limit ${query.limit}  offset  ${query.skip}`;
                }
          }      
          else
          {

                  search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, t.TestTopic
                    from testresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    LEFT JOIN test as t ON (t.TestId = eg.TestId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.ClassId = ${classId} 
                    order BY ExamResultMasterId DESC
                    limit ${query.limit}  offset  ${query.skip}`;      
          }
    }
    else
    {
             if(resulttype)
             {
              if(courseId)
              {
              search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, t.TestTopic
                    from testresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    LEFT JOIN test as t ON (t.TestId = eg.TestId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.resulttype = '${resulttype}' 
                    AND eg.CourseId = ${courseId}
                    order BY TestResultMasterId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
              }
              else{
              search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, t.TestTopic
                    from testresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    LEFT JOIN test as t ON (t.TestId = eg.TestId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.resulttype = '${resulttype}' 
                    order BY TestResultMasterId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
             }
           }
         
         else if(courseId)
         {
                 search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, t.TestTopic
                    from testresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    LEFT JOIN test as t ON (t.TestId = eg.TestId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.ClassId = ${classId}  
                    order BY TestResultMasterId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
          }
          else if(classId)
          {
                 search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, t.TestTopic
                    from testresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    LEFT JOIN test as t ON (t.TestId = eg.TestId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.ClassId = ${classId}  
                    order BY TestResultMasterId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
          }
          
          else
          {
              // search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass            
              //       from examresultmaster as eg                     
              //       LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
              //       LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
              //       LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
              //       where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
              //       AND eg.ClassId = ${classId}
              //       limit ${query.limit}  offset  ${query.skip}`;

                search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, t.TestTopic
                    from testresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    LEFT JOIN test as t ON (t.TestId = eg.TestId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.ClassId = ${classId} 
                    order BY TestResultMasterId DESC
                    limit ${query.limit}  offset  ${query.skip}`;
        }
  }
    
    // else
    // {
    //   if(resulttype)
    //   {

    //               search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
    //                 c.CourseName,st.StudentName, e.ExamName
    //                 from testresultmaster as eg                     
    //                 LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
    //                 LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
    //                 LEFT JOIN examgroup as e ON (e.ExamGroupId = eg.ExamGroupId)
    //                 LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
    //                 LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
    //                 where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status}                     
    //                 AND eg.resulttype = '${resulttype}'
    //                 order BY TestResultMasterId DESC 
    //                 limit ${query.limit}  offset  ${query.skip}`;
    //   }
    //   else if(courseId)
    //   {
    //           search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
    //                 c.CourseName,st.StudentName, e.ExamName
    //                 from testresultmaster as eg                     
    //                 LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
    //                 LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
    //                 LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
    //                 LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
    //                 where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status}                     
    //                 AND eg.CourseId = ${courseId} 
    //                 order BY TestResultMasterId DESC
    //                 limit ${query.limit}  offset  ${query.skip}`; 
    //   }
    //   else
    //   {

    //                    search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
    //                 c.CourseName,st.StudentName, e.ExamName
    //                 from testresultmaster as eg                     
    //                 LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
    //                 LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
    //                 LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
    //                 LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
    //                 where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status}
    //                 order BY TestResultMasterId DESC
    //                 limit ${query.limit}  offset  ${query.skip}`;
    //   }
    // }

        
    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "TestResult": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  }) 
  })(req, res, next);
}

//App Api Student Token
module.exports.getTestResult = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }  
  var schoolId = req.query.schoolId;
  var studentId = user.student[0].StudentId;
  var status = req.query.status;  
  var classId = req.query.classId;
  var resulttype = 'final';
  var search_query;

      search_query = `SELECT eg.*, sm.SchoolName, sc.StudentClass,
                    c.CourseName,st.StudentName, test.TestTopic, test.FromDate, test.ToDate,
                    test.TeacherId, te.TeacherName
                    from testresultmaster as eg                     
                    LEFT JOIN schoolmaster as sm ON (sm.SchoolId = eg.SchoolId)
                    LEFT JOIN studentclass as sc ON (sc.ClassId = eg.classId)
                    LEFT JOIN course as c ON (c.CourseId = eg.CourseId)
                    LEFT JOIN studentmain as st ON (st.StudentId = eg.StudentId)
                    LEFT JOIN test as test ON (test.TestId = eg.TestId)
                    LEFT JOIN teacher as te ON (test.TeacherId = te.TeacherId)
                    where eg.SchoolId = ${schoolId} AND eg.StatusId = ${status} 
                    AND eg.ClassId = ${classId} 
                    AND eg.resulttype = '${resulttype}'`;


    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      response = {status: 200, success : true, message : "Data Found", "TestResult": data};
    }
    res.json(response);
    });      
  })(req, res, next);
}




//---------------------------------------End-----------------------------------------------------

//--------------------------------------TestResult Detail Start-------------------------------------

//Web Api Teacher Token
module.exports.insertTestDetailResult = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
   
     console.log("Body",req.body);
     let edData = req.body;
     var value,insert_ed,count=0;
     for(i=0;i<edData.length;i++)
     {        
       value = edData[i];
       console.log(Object.values(value));   
       insert_ed = new TestResultDetail(edData[i]);
        if(!insert_ed.TestResultMasterId){
          res.json({ status: 401, success: false, error: "Please Provide Test Master" });
        }
        if(!insert_ed.Question){
          res.json({ status: 401, success: false, error: "Please Provide Question" });
        }
        if(!insert_ed.QuestionMark){
          res.json({ status: 401, success: false, error: "Please Provide Question Mark" });
        } 
        if(!insert_ed.MarksObtained){
          res.json({ status: 401, success: false, error: "Please Provide Marks Obtained" });
        }                    
        insert_ed.StatusId = 1;
        insert_ed.CreatedById = user[0].TeacherId;
        insert_ed.CreationDate = new Date();
        console.log('Data', insert_ed);        
        TestResultDetail.createResultDetail(insert_ed,function(err, gd) {
        if (err)
        {
            res.send({status:200,success:false,message:"Something went wrong" + err});
        }
        else
        {   
              count++;
              if(count==edData.length)
              {
                console.log("I"+i+"Count"+count);
                 res.send({status:200,success:true,message:"Test Result Details saved successfully."});
              }
        }

    }); 
         
      }
     
})(req, res, next);
}




module.exports.updateTestDetailResult = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }    
     console.log("Body",req.body);
     let edData = req.body;
     var value,update_ed,count=0;
     for(i=0;i<edData.length;i++)
     {        
       value = edData[i];
       console.log(Object.values(value)); 
       var detailId = edData[i].TestResultDetailId;  
       update_ed = new TestResultDetail(edData[i]);
        if(!update_ed.Question){
          res.json({ status: 401, success: false, error: "Please Provide Question" });
        }
        if(!update_ed.QuestionMark){
          res.json({ status: 401, success: false, error: "Please Provide Question Mark" });
        } 
        if(!update_ed.MarksObtained){
          res.json({ status: 401, success: false, error: "Please Provide Marks Obtained" });
        }
        if(!update_ed.StatusId){
          res.json({ status: 401, success: false, error: "Please Provide StatusId" });
        }                
        update_ed.ModifiedById = user[0].SchoolId;
        update_ed.ModificationDate = new Date();
        console.log('Data', update_ed);

        TestResultDetail.updateById(detailId,update_ed,function(err, ed) {
        if (err)
        {
            res.send({status:200,success:false,message:"Something went wrong"});
        }
        else
        {
           count++;
              if(count==edData.length)
              {
               
                 res.send({status:200,success:true,message:"Test Result Details updated successfully."});
              }  
        }
    }); 
}
})(req, res, next);
}

//Web Api Teacher Token
module.exports.getTestResultDetailByMasterId = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size  
  var schoolId = user[0].SchoolId; 
  var status = req.query.status;
  var testmaster = req.query.testResultMasterId;
  var search_query;

                search_query = `select count(*) as Total 
                              from testresultdetail as er
                              LEFT JOIN testresultmaster as em ON (em.TestResultMasterId = er.TestResultMasterId)
                              LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)                        
                              where em.schoolId=${schoolId} AND er.StatusId = ${status} 
                              AND er.TestResultMasterId = ${testmaster}`;

    console.log('Count',search_query);
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }

                search_query = `select er.*, em.ResultType, em.TotalMarks,sm.SchoolName,
                              st.StudentName, sc.StudentClass,sc.ClassId, c.CourseName, c.CourseId,
                              t.TestTopic
                              from testresultdetail as er
                              LEFT JOIN testresultmaster as em ON (em.TestResultMasterId = er.TestResultMasterId)
                              LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)
                              LEFT JOIN course as c ON (c.CourseId = em.CourseId)
                              LEFT JOIN studentclass as sc ON (sc.ClassId = em.ClassId)
                              LEFT JOIN studentmain as st ON (st.StudentId = em.StudentId)                     
                              LEFT JOIN test as t ON (t.TestId = em.TestId)
                              where em.schoolId=${schoolId} AND er.StatusId = ${status} 
                              AND er.TestResultMasterId = ${testmaster}
                              limit ${query.limit}  offset  ${query.skip}`;        
    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "TestResultDetail": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}


//App Api Student Token
module.exports.getTestResultDetailByMasterIdApp = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  } 
  var schoolId = req.query.schoolId; 
  var status = req.query.status;
  var testmaster = req.query.testResultMasterId;
  var search_query;

                search_query = `select er.*, em.ResultType, em.TotalMarks,sm.SchoolName, sm.SchoolLogo,
                              st.StudentName, sc.StudentClass,sc.ClassId, c.CourseName, c.CourseId,
                              em.GradeObtained, em.TotalMarks, em.MarksObtained as MarksObtainedFromResult
                              from testresultdetail as er
                              LEFT JOIN testresultmaster as em ON (em.TestResultMasterId = er.TestResultMasterId)
                              LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)
                              LEFT JOIN course as c ON (c.CourseId = em.CourseId)
                              LEFT JOIN studentclass as sc ON (sc.ClassId = em.ClassId)
                              LEFT JOIN studentmain as st ON (st.StudentId = em.StudentId)
                              where em.schoolId=${schoolId} AND er.StatusId = ${status} 
                              AND er.TestResultMasterId = ${testmaster}`;  

    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {   
      response = {status: 200, success : true, message : "Data Found", "TestResultDetail": data};
    }
    res.json(response);
    });

  })(req, res, next);
}

// App Api Student token
module.exports.getTestDetailByStudent = function(req,res,next)
{
  passport.authenticate('jwt', function(err,user)
  {
    if (err || !user) 
    {
      return res.json({ status: 401, success: false, error: "Authentication Fail." });
    }
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)

  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size  
  var schoolId = user[0].SchoolId; 
  var status = req.query.status;
  var testId = req.query.testId;
  var studentId = req.query.studentId;
  var teacherId = user[0].TeacherId;
  var testStatus = req.query.testStatus;
  var testSubmitId = req.query.testSubmitId;
  var search_query;

      search_query = `select count(*) as Total from test as em
                              LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)
                              LEFT JOIN testsubmit as es ON (es.TestId = es.TestId)
                              LEFT JOIN test as test ON (test.TestId = em.TestId)
                              LEFT JOIN course as c ON (c.CourseId = em.CourseId)
                              LEFT JOIN studentmain as st ON (st.StudentId = es.StudentId)
                              LEFT JOIN studentclass as sc ON (sc.ClassId = em.ClassId)                                         
                              where em.schoolId=${schoolId} AND em.StatusId = ${status} 
                              AND es.StudentId = ${studentId} AND test.TestId = ${testId}
                              AND es.TestStatus = '${testStatus}'  AND es.TestSubmitId = ${testSubmitId}`;
    console.log('Count',search_query);
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }

      search_query = `select em.*, sm.SchoolName, c.CourseName, st.StudentId,st.StudentName,
                              sc.StudentClass, es.TestStatus,
                              es.TestSubmitId from test as em
                              LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)
                              LEFT JOIN testsubmit as es ON (es.TestId = es.TestId)
                              LEFT JOIN test as test ON (test.TestId = em.TestId)
                              LEFT JOIN course as c ON (c.CourseId = em.CourseId)
                              LEFT JOIN studentmain as st ON (st.StudentId = es.StudentId)
                              LEFT JOIN studentclass as sc ON (sc.ClassId = em.ClassId)                                         
                              where em.schoolId=${schoolId} AND em.StatusId = ${status} 
                              AND es.StudentId = ${studentId} AND test.TestId = ${testId}
                              AND es.TestStatus = '${testStatus}'  AND es.TestSubmitId = ${testSubmitId}
                              limit ${query.limit}  offset  ${query.skip}`;

    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "TestDetail": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })
  })(req,res,next);
}


module.exports.getStudentMarksTest = function(req,res,next)
{
  passport.authenticate('jwt', function(err,user)
  {
    if (err || !user) 
    {
      return res.json({ status: 401, success: false, error: "Authentication Fail." });
    }
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)

  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size  
  var schoolId = user[0].SchoolId; 
  var status = req.query.status;
  var testId = req.query.testId;
  var studentId = req.query.studentId;
  var teacherId = user[0].TeacherId;
  var testStatus = req.query.testStatus;
  var testSubmitId = req.query.testSubmitId;
  var classId = req.query.classId;
  var courseId = req.query.courseId;
  var search_query;

                search_query = `select count(*) as Total 
                              from testesultmaster as em
                              LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)
                              LEFT JOIN testsubmit as es ON (es.TestId = em.TestId)
                              LEFT JOIN test as test ON (test.TestId = em.TestId)                        
                              where em.schoolId=${schoolId} AND em.StatusId = ${status} 
                              AND em.StudentId = ${studentId} and test.TestId = ${testId}
                              AND es.TestStatus = '${testStatus}' AND es.TestSubmitId = ${testSubmitId}
                              AND em.ClassId = ${classId}
                              AND em.CourseId = ${courseId}`;
    
    console.log('Count',search_query);
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }


                      search_query = `select em.*, sm.SchoolName, es.TestStatus,
                              es.TestSubmitId
                              from testresultmaster as em
                              LEFT JOIN schoolmaster as sm ON (sm.SchoolId = em.SchoolId)
                              LEFT JOIN testsubmit as es ON (es.TestId = em.TestId)
                              LEFT JOIN test as test ON (test.TestId = em.TestId)                        
                              where em.schoolId=${schoolId} AND em.StatusId = ${status} 
                              AND em.StudentId = ${studentId} and test.TestId = ${testId}
                              AND es.TestStatus = '${testStatus}' AND es.TestSubmitId = ${testSubmitId}
                              AND em.ClassId = ${classId}
                              AND em.CourseId = ${courseId}`;
                            
    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "TestDetail": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })
  })(req,res,next);
}

//Web api Teacher Token
module.exports.getTestDetailSchoolANDClassAndCourseId = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size  
  var schoolId = user[0].SchoolId;
  var classId = req.query.classId;
  var courseId = req.query.courseId;
  var status = req.query.status;
  var search_query;

    if(classId)
    {
      if(courseId)
      {
        search_query = `select count(*) as Total from testresultdetail as ed 
                        LEFT JOIN testresultmaster as em ON(em.TestResultMasterId = ed.TestResultMasterId)
                        where em.schoolId=${schoolId}
                        AND ed.StatusId = ${status} AND em.CourseId = ${courseId} 
                        AND em.ClassId = ${classId}`;
      }
      else
      {
        search_query = `select count(*) as Total from testresultdetail as ed 
                        LEFT JOIN testresultmaster as em ON(em.TestResultMasterId = ed.TestResultMasterId)
                        where em.schoolId=${schoolId}
                        AND ed.StatusId = ${status} AND em.ClassId = ${classId} `;
      }
    }
    else
    {
      if(courseId)
      {
          search_query = `select count(*) as Total from testresultdetail as ed 
                        LEFT JOIN testresultmaster as em ON(em.TestResultMasterId = ed.TestResultMasterId)
                        where em.schoolId=${schoolId}
                        AND ed.StatusId = ${status} AND em.CourseId = ${courseId}`;
      }
      else
      {
          search_query = `select count(*) as Total from testresultdetail as ed 
                        LEFT JOIN testresultmaster as em ON(em.TestResultMasterId = ed.TestResultMasterId)
                        where em.schoolId=${schoolId}
                        AND ed.StatusId = ${status}`;
      }
    }
    
    console.log('Count',search_query);
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }

    if(classId)
    {
        if(courseId)
        {
              search_query = `SELECT gd.Question,gd.QuestionMark,sc.StudentClass, sm.SchoolName, ch.CourseName 
                              from testresultdetail as gd 
                              LEFT JOIN testresultmaster as erm ON (gd.TestResultMasterId = erm.TestResultMasterId) 
                              LEFT JOIN studentclass as sc ON (erm.ClassId = sc.ClassId) 
                              LEFT JOIN schoolmaster as sm ON (erm.SchoolId = sm.SchoolId) 
                              LEFT JOIN course as ch ON (erm.CourseId = ch.CourseId) 
                              where erm.SchoolId = ${schoolId} AND gd.StatusId = ${status} 
                              AND erm.CourseId = ${courseId} AND erm.ClassId = ${classId} 
                              limit ${query.limit}  offset  ${query.skip}`;
        }
        else
        {
                  search_query = `SELECT gd.Question,gd.QuestionMark,sc.StudentClass, sm.SchoolName, ch.CourseName 
                              from testresultdetail as gd 
                              LEFT JOIN testresultmaster as erm ON (gd.TestResultMasterId = erm.TestResultMasterId) 
                              LEFT JOIN studentclass as sc ON (erm.ClassId = sc.ClassId) 
                              LEFT JOIN schoolmaster as sm ON (erm.SchoolId = sm.SchoolId) 
                              LEFT JOIN course as ch ON (erm.CourseId = ch.CourseId) 
                              where erm.SchoolId = ${schoolId} AND gd.StatusId = ${status} 
                              AND erm.ClassId = ${classId} 
                              limit ${query.limit}  offset  ${query.skip}`;
        }
    }
    else
    {
        if(courseId)
        {
              search_query = `SELECT gd.Question,gd.QuestionMark,sc.StudentClass, sm.SchoolName, ch.CourseName 
                              from testresultdetail as gd 
                              LEFT JOIN testresultmaster as erm ON (gd.TestResultMasterId = erm.TestResultMasterId) 
                              LEFT JOIN studentclass as sc ON (erm.ClassId = sc.ClassId) 
                              LEFT JOIN schoolmaster as sm ON (erm.SchoolId = sm.SchoolId) 
                              LEFT JOIN course as ch ON (erm.CourseId = ch.CourseId) 
                              where erm.SchoolId = ${schoolId} AND gd.StatusId = ${status} 
                              AND erm.CourseId = ${courseId} 
                              limit ${query.limit}  offset  ${query.skip}`;
        }
        else
        {
                search_query = `SELECT gd.Question,gd.QuestionMark,sc.StudentClass, sm.SchoolName, ch.CourseName 
                              from testresultdetail as gd 
                              LEFT JOIN testresultmaster as erm ON (gd.TestResultMasterId = erm.TestResultMasterId) 
                              LEFT JOIN studentclass as sc ON (erm.ClassId = sc.ClassId) 
                              LEFT JOIN schoolmaster as sm ON (erm.SchoolId = sm.SchoolId) 
                              LEFT JOIN course as ch ON (erm.CourseId = ch.CourseId) 
                              where erm.SchoolId = ${schoolId} AND gd.StatusId = ${status}
                              limit ${query.limit}  offset  ${query.skip}`;
        }
    }

    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "TestDetail": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}

//------------------------------------------------------------------------------------------------


//------------------------------------Device Token Api's------------------------------------------------

module.exports.appLoginNewDevice = function(req,res)
{
  var value = req.body.value;  
  var password = req.body.password;
  var deviceToken = req.body.deviceToken;
  console.log("Value", value)  
  
  pool.query('SELECT * FROM parentmain WHERE ParentMobile = ? AND StatusId=1',[value], function (error, results, fields) 
{
  {
  if (error) {
    console.log("error ocurred",error);
    res.json({ status: 400, success: false, error: "Invalid Input." });
  }
  else
  {
     console.log('The solution is: ', results);
     console.log('Length', results.length);
     console.log('Password',password);   

   if(results.length > 0)
   {
        console.log("beforeeeeee",results[0].ParentPassword)
        if(passwordHash.verify(password, results[0].ParentPassword))
        //if(results[0].ParentPassword == password)
        {
          var token = "";
          var secret = "";
          secret = { parentmobile: results[0].ParentMobile,type: 'parent', _id: results[0].ParentId, password: results[0].ParentPassword};
                        token = jwt.sign(secret, 'iloveindia', {
                            expiresIn: 31557600000
          });
          console.log("Demo=" + token);
          res.send({
            "status": 200,
            "success": true,
            "isParent": true,
            "Message":"Login Successfull","Data":results,
            "Token": token
            });
        }
        else{
         res.json({ status: 401, success: false, error: "Password Mismatch." });
        }
    } 
    else
    {
   pool.query('SELECT studentmain.*, studentclass.StudentClass FROM studentmain LEFT JOIN studentclass ON (studentmain.ClassId = studentclass.ClassId)  WHERE studentmain.StudentUsername = ? AND studentmain.StatusId=1',[value], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
   res.json({ status: 400, success: false, error: "Invalid Input." }); 
  }
  else{
    console.log('The solution is: ', results);
    if(results.length > 0)
   {     
        if(passwordHash.verify(password, results[0].StudentPassword))
        {
          var themeData;
          console.log("Test")
          var token = "";
          var secret = "";
          
          ClassTheme.getClassThemeByClassId(results[0].ClassId,function(err,themedata){
            if(err)
            {

            }
            else{
                themeData = themedata;
                console.log("Res",themeData);
            }

            if(results[0].DeviceIMEI == null || results[0].DeviceIMEI == '0') //by default null
            {
                //res.send({"status": 200, "success":true, "Message": "Token is null"});
                //update run
                query = `update studentmain set DeviceIMEI = '${deviceToken}' where StudentId = ${results[0].StudentId}`;

                pool.query(query, function(err, data){
                if(err)
                {
                    res.json({ status: 401, success: false, message: "Cannot update device token."}); 
                }
                else
                {

                    secret = { studentusername: results[0].StudentUsername, type: 'student', _id: results[0].StudentId, password: results[0].StudentPassword};
                    token = jwt.sign(secret, 'iloveindia', { expiresIn: 31557600000 });

                    results[0].DeviceIMEI = deviceToken;
                    res.send({ "status": 200, "success": true, "isParent": false,
                    "Message":"Login Successfull", "StudentData": results, 
                    "ClassTheme": themeData, "Token" :token });
                }
              });
            }
            else if(results[0].DeviceIMEI != null){
                if(deviceToken == results[0].DeviceIMEI)
                {
                    //res.send({"status": 200, "success":true, "Message": "Token Match"}); 
                    secret = { studentusername: results[0].StudentUsername, type: 'student', _id: results[0].StudentId, password: results[0].StudentPassword};
                        token = jwt.sign(secret, 'iloveindia', { expiresIn: 31557600000 });

                    res.send({ "status": 200, "success": true, "isParent": false,
                    "Message":"Login Successfull", "StudentData": results,
                    "ClassTheme": themeData, "Token" :token });
                }
                else
                {
                   res.send({"status": 200, "success":true, "Message": "Token Mismatch", "StudentId": results[0].StudentId}); 
                }
            }

          
          });
        }
        else{
         res.json({ status: 401, success: false, error: "Password Mismatch." });

        }
    } 
    else{
    res.json({ status: 204, success: false, error: "Record does not exists." }); 
    }
  }
  })
  }
  }
}
})
}


module.exports.UpdateStudentDeviceToken = function(req,res)
{
   var dt = req.query.deviceToken;
   var studentId = req.query.studentId;

   query = `update studentmain set DeviceIMEI = '${dt}' where StudentId = ${studentId}`;

   pool.query(query, function(err, data){
      if(err)
      {
          res.json({ status: 401, success: false, message: "Cannot update device token." }); 
      }
      else
      {
        res.json({ status: 200, success: true, message: "Device token updated." }); 
      }
   });

}

module.exports.getStudentDeviceToken = function(req, res)
{
   var dt = req.query.deviceToken;
   var studentId = req.query.studentId;

   query = `select * from  studentmain Where DeviceIMEI = '${dt}' and StudentId = ${studentId}`;
   try{
   pool.query(query, function(err, data){
      console.log(data);
      if(err)
      {
          res.json({ status: 401, success: false, message: "Error" }); 
      }
      else
      {
        if(data.length == 0)
          res.json({ status: 200, success: true, message: "False" });
        else if(dt == data[0].DeviceIMEI)
          res.json({ status: 200, success: true, message: "True" }); 
 
      }
   });
 }catch(e) {console.log(e);}
}

//--------------------------------------Device Token End--------------------------------------------


//---------------------------------Notes Start------------------------------------------

// Web api teacher token
module.exports.insertNotes = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
    console.log(user); 
    
    if (!req.file) 
    {
        console.log("No file received");
        res.status(400).send({ error:true, message: 'Please Provide Notes Document.' });  
       
    } 
    else 
    {
    filename = req.file.filename;      
      var insert_notes = new Notes(req.body, filename);
        if(!insert_notes.ClassId){
            res.json({ status: 401, success: false, error: "Please Provide Class." });
        }
        if(!insert_notes.CourseId){
          res.json({ status: 401, success: false, error: "Please Provide Course." });
        }
        if(!insert_notes.ChapterId){
          res.json({ status: 401, success: false, error: "Please Provide Chapter." });
        }
        if(!insert_notes.NotesTitle){
          res.json({ status: 401, success: false, error: "Please Provide Notes Title." });
        }
        insert_notes.SchoolId = user[0].SchoolId;
        insert_notes.TeacherId = user[0].TeacherId;
        insert_notes.StatusId = 1;
        insert_notes.CreatedById = user[0].TeacherId;
        insert_notes.CreationDate = new Date();

        console.log('Data', insert_notes);
        Notes.createNotes(insert_notes,function(err, notes) {
        if (err)
        {
            //console.log(err);
            res.send({status:200,success:false,message:"Details not saved."});
        }
        else
        {
         res.send({status:200,success:true,message:"Details saved successfully."});
        } 
    });
      }
})(req, res, next);
}

module.exports.updateNotes = async function(req,res,next)
{ 
  passport.authenticate('jwt', function(err, user){
  if (err || !user) 
  {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
  }
 // console.log(req.file.filename); 
  if (!req.file) 
  {
        console.log("No file received", user);
        //filename = req.file.filename;    
        var update_notes = new Notes(req.body);
        console.log('TID',user[0].TeacherId);
        update_notes.TeacherId = user[0].TeacherId;
        update_notes.SchoolId = user[0].SchoolId;
        update_notes.ModifiedById = user[0].TeacherId;
        update_notes.ModificationDate = new Date();
        
        Notes.updateNotes(req.body.NotesId,update_notes,function(err, notes) {
        if(!update_notes.ClassId){
            res.json({ status: 401, success: false, error: "Please Provide Class." });
        }
        if(!update_notes.CourseId){
          res.json({ status: 401, success: false, error: "Please Provide Course." });
        }
        if(!update_notes.ChapterId){
          res.json({ status: 401, success: false, error: "Please Provide Chapter." });
        }
        if(!update_notes.NotesTitle){
          res.json({ status: 401, success: false, error: "Please Provide Notes Title." });
        }
        if(!update_notes.StatusId){
          res.json({ status: 401, success: false, error: "Please Provide Status Id." });
        }
        else{
        console.log('Data', update_notes);
        if(err)
        {
              res.json({status:200,success:false,message:"Details not updated"});
        }
        else
        {
              res.send({status:200,success:true,message:"Details updated successfully."});
        } 
      }
    });   
  } 
  else
  {
    try{
    if (!req.file) 
    {
        console.log("No file received");
       res.json({ status: 401, success: false, error: "Please Provide Assignment Document." });
    } 
    else 
    {
      filename = req.file.filename;    
      var update_notes = new Notes(req.body, filename);
        if(!update_notes.ClassId){
            res.json({ status: 401, success: false, error: "Please Provide Class." });
        }
        if(!update_notes.CourseId){
          res.json({ status: 401, success: false, error: "Please Provide Course." });
        }
        if(!update_notes.ChapterId){
          res.json({ status: 401, success: false, error: "Please Provide Chapter." });
        }
        if(!update_notes.NotesTitle){
          res.json({ status: 401, success: false, error: "Please Provide Notes Title." });
        }
        if(!update_notes.StatusId){
          res.json({ status: 401, success: false, error: "Please Provide Status Id." });
        }
        update_notes.TeacherId = user[0].TeacherId;
        update_notes.ModifiedById = user[0].TeacherId;
        update_notes.ModificationDate = new Date();
        update_notes.SchoolId = user[0].SchoolId;
        
        console.log('Data', update_notes);
        Notes.updateNotes(req.body.NotesId,update_notes,function(err, notes) {
        if (err)
        {
            res.send({status:200,success:false,message:"Details not updated."});
        }
        else
        {
            res.send({status:200,success:true,message:"Details updated successfully."});
        }
    }); 
         
  }
  }catch(e){ console.log("catch",e);   }
  
  }    

  })(req,res,next);
}

//Web api Teacher Token
module.exports.getNotesByTeacherId = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size  
  var schoolId = user[0].SchoolId;
  var teacherId = user[0].TeacherId
  var status = req.query.status;
  var search_query;

    search_query = `select count(*) as Total from notes 
              where TeacherId=${teacherId} AND StatusId = ${status}`;
    
    console.log('Count',search_query);
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }

      search_query = `SELECT n.*, sc.StudentClass, t.TeacherName,
                      c.CourseName, ch.ChapterName, sm.SchoolName
                      from notes as n
                      LEFT JOIN studentclass as sc ON (n.ClassId = sc.ClassId) 
                      LEFT JOIN teacher as t ON (n.TeacherId = t.TeacherId) 
                      LEFT JOIN course as c ON (n.CourseId = c.CourseId)
                      LEFT JOIN chapter as ch ON (n.ChapterId = ch.ChapterId)
                      LEFT JOIN schoolmaster as sm ON (n.SchoolId = sm.SchoolId)
                      where n.TeacherId = ${teacherId} AND n.StatusId = ${status}
                      limit ${query.limit}  offset  ${query.skip}`;

    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "NotesDetail": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}
//web api teacher token
module.exports.deleteNotes = function(req, res, next) {
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  console.log('Data',req.query);  
  Notes.deleteById(req.query.NotesId, function(err, ress) {
    if (err){
      
     res.json({status : "200",  error:true, message: 'Cannot delete Notes.' });
    }
    else{

      res.json({status : "200",  error:true, message: 'Notes Deleted.' }); 
    }
  });
})(req,res,next);
}

//App Api Student token
module.exports.getNotesBySchoolAndClass = function (req, res, next) { 
  passport.authenticate('jwt', function(err,user)
  {
     if (err || !user) 
     {
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     };
     
     console.log('Student',user);
     var classId = req.query.classId;
     var schoolId = req.query.schoolId;
     var status = req.query.status;
     var studentId = user.student[0].StudentId;
     console.log (classId + ': '+ status + ' : ' + schoolId);
     var search_query
     
        search_query = `SELECT n.*, sc.StudentClass, t.TeacherName,
                      c.CourseName, ch.ChapterName, sm.SchoolName
                      from notes as n
                      LEFT JOIN studentclass as sc ON (n.ClassId = sc.ClassId) 
                      LEFT JOIN teacher as t ON (n.TeacherId = t.TeacherId) 
                      LEFT JOIN course as c ON (n.CourseId = c.CourseId)
                      LEFT JOIN chapter as ch ON (n.ChapterId = ch.ChapterId)
                      LEFT JOIN schoolmaster as sm ON (n.SchoolId = sm.SchoolId)
                      where n.ClassId = ${classId} AND n.SchoolId = ${schoolId} 
                      AND n.StatusId = ${status}`
     
     console.log(search_query);
      pool.query(search_query,function(err,data){
       if(err) 
       {
          response = {status:400,success:false,Error:"Error fetching data"  + err};
       } 
       else if(data.length == 0)
       {
          response = {status: 200, success : false, message : "No Data Found"};
       }
       else 
       {   
          response = {status: 200, success : true, message : "Data Found", "Notes": data};
       }
        res.json(response);
    });
  })(req, res, next);
}




//------------------------------------Notes End----------------------------------------

//-------------------------------------Teacher Video------------------------------------

// App api teacher token

//const request = require('request');
var FormData = require('form-data');
var querystring = require('querystring');
var fs = require('fs');
const route = require('../router/aarambh.route');

module.exports.insertTeacherVideo = async function(req,res,next)
{
try{
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
    if (!req.file) 
    {
        console.log("No file received", err);
        res.status(400).send({ error:false, message: 'Please Provide Video.' });  
       
    }
    else if(req.file.size >= 5*1024*1024){
      return res.json({"status":400, success:false, message: 'File Too Large.It Should be less than 5MB.' });      
    }
    else 
    {
    filename = req.file.filename;
    var formData = new FormData();
    var vd = '../AARAMBH_API-s/public/teachervideo/' + filename
          const options = {
              method: "POST",
              url: `http://139.59.77.127:5080/LiveApp/rest/v2/vods/create?name=${req.file.filename}`,
              port: 5080,
              headers: {
                  "Content-Type": "multipart/form-data"
              },
              formData : {
                  "file" : fs.createReadStream(vd)
              }
          };  


            request(options,function(err, response, body)
            {  
              if (err) 
              {
                console.log(err)
                throw err;
              }
              else
              {
                  console.log('JSON',body);
                  var x = JSON.parse(body);
                  console.log('DataId', x.dataId);
                  
                  var insert_tv = new TeacherVideo(req.body, x.dataId);
                  if(!insert_tv.VideoTitle){
                    res.json({ status: 401, success: false, error: "Please Provide Video Title." });
                  }
                  if(!insert_tv.ClassId){
                      res.json({ status: 401, success: false, error: "Please Provide Class." });
                  }
                  if(!insert_tv.CourseId){
                      res.json({ status: 401, success: false, error: "Please Provide Course." });
                  }
                  if(!insert_tv.ChapterId)
                  {
                    res.json({ status: 401, success: false, error: "Please Provide Chapter." });
                  }

                  insert_tv.SchoolId = user[0].SchoolId;
                  insert_tv.TeacherId = user[0].TeacherId;
                  insert_tv.StatusId = 1;
                  insert_tv.CreatedById = user[0].TeacherId;
                  insert_tv.CreationDate = new Date();

                  console.log('Data', insert_tv);
                  TeacherVideo.createTV(insert_tv,function(err, tv) 
                  {
                    if (err)
                    {
                      res.send({status:200,success:false,message:"Details not saved."});
                    }
                    else
                    {
                      console.log('Done')
                      return res.send({status:200,success:true,message:"Details saved successfully."});
                    }
                 });
        }
    }); 
}

})(req, res, next);
}catch(e){console.log("Catch",e)}
}

//app api teacher token
module.exports.getVideoDetail = function(req, res, next)
{
   passport.authenticate('jwt', function(err,user)
  {
     if (err || !user) 
     {
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     };
     
     console.log('Student',user);
     var classId = req.query.classId;
     var schoolId = req.query.schoolId;
     var status = req.query.status;
     //var studentId = user.student[0].StudentId;
     console.log (classId + ': '+ status + ' : ' + schoolId);
     var search_query
     
        search_query = `SELECT n.*, sc.StudentClass, t.TeacherName,
                      c.CourseName, ch.ChapterName, sm.SchoolName
                      from teachervideo as n
                      LEFT JOIN studentclass as sc ON (n.ClassId = sc.ClassId) 
                      LEFT JOIN teacher as t ON (n.TeacherId = t.TeacherId) 
                      LEFT JOIN course as c ON (n.CourseId = c.CourseId)
                      LEFT JOIN chapter as ch ON (n.ChapterId = ch.ChapterId)
                      LEFT JOIN schoolmaster as sm ON (n.SchoolId = sm.SchoolId)
                      where n.ClassId = ${classId} AND n.SchoolId = ${schoolId} 
                      AND n.StatusId = ${status}`
     
     console.log(search_query);
      pool.query(search_query,function(err,data){
       if(err) 
       {
          response = {status:400,success:false,Error:"Error fetching data"  + err};
       } 
       else if(data.length == 0)
       {
          response = {status: 200, success : false, message : "No Data Found"};
       }
       else 
       {   
          response = {status: 200, success : true, message : "Data Found", "TeacherVideo": data};
       }
        res.json(response);
    });
  })(req, res, next);
}

//web api
module.exports.callVideoURL = function(req, res, next)
{
   passport.authenticate('jwt', function(err,user)
  {
     if (err || !user) 
     {
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     };
     
     console.log('Student',user);
     var classId = req.query.classId;
     var schoolId = req.query.schoolId;
     var status = req.query.status;
     //var studentId = user.student[0].StudentId;
     console.log (classId + ': '+ status + ' : ' + schoolId);
     var search_query
     
        search_query = `SELECT video from teachervideo as n
                      where n.ClassId = ${classId} AND n.SchoolId = ${schoolId} 
                      AND n.StatusId = ${status}`
     
     console.log(search_query);
      pool.query(search_query,function(err,data){
       if(err) 
       {
          response = {status:400,success:false,Error:"Error fetching data"  + err};
       } 
       else if(data.length == 0)
       {
          response = {status: 200, success : false, message : "No Data Found"};
       }
       else 
       {   
          response = {status: 200, success : true, message : "Data Found", "TeacherVideo": data};
       }
        res.json(response);
    });
  })(req, res, next);
}


//--------------------------------------------------------------------------------------- 


//-------------------------------------New Inactive apii----------------------------------

//Super admin author token
module.exports.inactiveSchoolTeacherAndStudent = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size  
  var schoolId = req.query.schoolId;
  var status = req.query.status;
  var search_query;

    q1 = `update schoolmaster set StatusId = ${status} where SchoolId = ${schoolId}`;
    q2 = `update studentmain set StatusId = ${status} where SchoolId = ${schoolId}`;
    q3 = `update teacher set StatusId = ${status} where SchoolId = ${schoolId}`;

    pool.query(q1,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      pool.query(q2,function(err,data){
        if(err){
          console.log("StudentMain", err);
        }
        else{
              pool.query(q3,function(err,data){
              if(err){
                  console.log("Teacher", err);
              }
              else{
          
              }

          });
        }

      });
      if(status==0)
          response = {status: 200, success : true, message : "Deactivated."};
      else
          response = {status: 200, success : true, message : "Activated."};
    }
    res.json(response);
    });      
  })(req, res, next);
}

//----------------------------------------------------------------------------------------


//----------------------------------------Holiday---------------------------------------------

// Web api School token
module.exports.insertHoliday = async function(req,res,next)
{   
  passport.authenticate('jwt',function(err,user)
  {
     console.log("IS Next", user);
     if (err || !user) 
     {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, error: "Authentication Fail." });
     }
    console.log(user);      
      var insert_holiday = new Holiday(req.body);
        if(!insert_holiday.HolidayName){
            res.json({ status: 401, success: false, error: "Please Provide Holiday Name" });
        }
        if(!insert_holiday.FromDate){
            res.json({ status: 401, success: false, error: "Please Provide From Date" });
        }
        if(!insert_holiday.ToDate){
            res.json({ status: 401, success: false, error: "Please Provide To Date" });
        }
        insert_holiday.SchoolId = user[0].SchoolId;
        insert_holiday.StatusId = 1;
        insert_holiday.CreatedById = user[0].SchoolId;
        insert_holiday.CreationDate = new Date();

        console.log('Data', insert_holiday);
        Holiday.createHoliday(insert_holiday,function(err, notes) {
        if (err)
        {
            res.send({status:200,success:false,message:"Details not saved."});
        }
        else
        {
         res.send({status:200,success:true,message:"Details saved successfully."});
        } 
    });
})(req, res, next);
}

module.exports.updateHoliday = async function(req,res,next)
{ 
  passport.authenticate('jwt', function(err, user){
  if (err || !user) 
  {
        console.log("Test1")
        console.log("User",err);
        return res.json({ status: 401, success: false, message: "Authentication Fail." });
  }   
  var update_holiday = new Holiday(req.body);
  update_holiday.SchoolId = user[0].SchoolId;
  update_holiday.ModifiedById = user[0].SchoolId;
  update_holiday.ModificationDate = new Date();
        
  Holiday.updateHoliday(req.body.HolidayId,update_holiday,function(err, notes) {
  if(!update_holiday.HolidayName){
      res.json({ status: 401, success: false, error: "Please Provide Holiday Name." });
  }
  if(!update_holiday.FromDate){
      res.json({ status: 401, success: false, error: "Please Provide From Date" });
  }
  if(!update_holiday.ToDate){
      res.json({ status: 401, success: false, error: "Please Provide To Date" });
  }
  if(!update_holiday.StatusId){
    res.json({ status: 401, success: false, error: "Please Provide Status Id." });
  }
  else{
    if(err)
    {
        res.json({status:200,success:false,message:"Details not updated"});
    }
    else
    {
        res.send({status:200,success:true,message:"Details updated successfully."});
    } 
    }
    });       
  })(req,res,next);
}

//Web api School Token
module.exports.getHolidayBySchoolId = function (req, res, next) { 
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  
          
  var query = {}
  if(page < 0 || page === 0) 
  {
    response = {status:400,success:false, Error:"Invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (page - 1)
  query.limit = size  
  var schoolId = user[0].SchoolId;
  var status = req.query.status;
  var FromDate = req.query.FromDate;
  var ToDate = req.query.ToDate;
  var search_query;

  if(FromDate && ToDate)
  {
        search_query = `select count(*) as Total from holiday 
              where SchoolId=${schoolId} AND StatusId = ${status} 
              AND FromDate <= '${FromDate}' AND ToDate >= '${ToDate}'`;
  }
  else{
        search_query = `select count(*) as Total from holiday 
              where SchoolId=${schoolId} AND StatusId = ${status}`;    
  }

    
    console.log('Count',search_query);
    pool.query(search_query,function(err,totalCount){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data."};
    }
    if(FromDate && ToDate)
    {
              search_query = `SELECT h.*, sm.SchoolName
                      from holiday as h
                      LEFT JOIN schoolmaster as sm ON (h.SchoolId = sm.SchoolId)
                      where h.SchoolId = ${schoolId} AND h.StatusId = ${status}
                      AND h.FromDate <= '${FromDate}' AND h.ToDate >= '${ToDate}'
                      limit ${query.limit}  offset  ${query.skip}`;
    }
    else{
      search_query = `SELECT h.*, sm.SchoolName
                      from holiday as h
                      LEFT JOIN schoolmaster as sm ON (h.SchoolId = sm.SchoolId)
                      where h.SchoolId = ${schoolId} AND h.StatusId = ${status}
                      limit ${query.limit}  offset  ${query.skip}`;
    }

    console.log(search_query);
    pool.query(search_query,function(err,data){
    if(err) 
    {
      response = {status:400,success:false,Error:"Error fetching data" + err};
    } 
    else if(data.length == 0)
    {
      response = {status: 200, success : false, message : "No Data Found"};
    }
    else 
    {
      var totalPages = Math.ceil(totalCount / size);    
      response = {status: 200, success : true, message : "Data Found", "HolidayDetail": data,"Pages":totalPages,"TotalCount":totalCount};
    }
    res.json(response);
    });
  })      
  })(req, res, next);
}
//web api school token
module.exports.deleteHoliday = function(req, res, next) {
passport.authenticate('jwt', function(err,user)
{
  if (err || !user) 
  {
    return res.json({ status: 401, success: false, error: "Authentication Fail." });
  }
  console.log('Data',req.query);  
  Holiday.deleteHoliday(req.query.HolidayId, function(err, ress) {
    if (err){
      
     res.json({status : "200",  error:true, message: 'Cannot delete Holiday.' });
    }
    else{

      res.json({status : "200",  error:true, message: 'Holiday Deleted.' }); 
    }
  });
})(req,res,next);
}

//-----------------------------------------------------------------------------------------------

