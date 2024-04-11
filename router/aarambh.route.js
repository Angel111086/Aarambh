const express = require('express');
const router = express.Router();
var multer = require('multer');
var http = require('http')
var path = require('path')
const sharp = require('sharp');
var imager = require('multer-imager');
//const upload = require('../models/uploadMiddleware');
const mycontroller = require('../controller/aarambh.controller');
const checkAuth = require('../authorization/checkAuth');

const readXlsxFile = require('read-excel-file/node');


//const DIR = './public/uploads';
const DIR = './public/course';
let storage = multer.diskStorage({	
    destination: function (req, file, callback) {
      callback(null, DIR);        
    },
    filename: function (req, file, cb) 
    {      
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));      
 	}
});

let upload = multer({storage: storage}); 


// const DIRS = './public/schoollogo';
// let storageSchool = multer.diskStorage({	
//     destination: function (req, file, callback) {
//       callback(null, DIR);        
//     },
//     filename: function (req, file, cb) 
//     {      
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));      
//  	}
// });

// let uploadSchool = multer({storage: storageSchool}); 



const profileDIR = './public/profile/';
let storageProfile = multer.diskStorage({	
    destination: function (req, file, callback) {
      callback(null, profileDIR);        
    },
    filename: function (req, file, cb) 
    {      
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));      
 	}
});

let uploadProfile = multer({storage: storageProfile}); 


const schoolDIRS = './public/school/';
let storageProfile1 = multer.diskStorage({	
    destination: function (req, file, callback) {
      callback(null, schoolDIRS);        
    },
    filename: function (req, file, cb) 
    {      
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));      
 	}
});

let uploadLogo = multer({storage: storageProfile1}); 



// -> Multer Upload Excel Sheet
const ExcelDIR = './public/excelsheet/';
const storageExcel = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, ExcelDIR)
  },
  filename: (req, file, cb) => {
     cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
  }
});
 
const uploadExcel = multer({storage: storageExcel});


const AssignmentDIR = './public/assignment/';
const storageAssignment = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, AssignmentDIR)
  },
  filename: (req, file, cb) => {
     cb(null, file.originalname)
  }
});
 
const uploadAssignment = multer({storage: storageAssignment});


const AssignmentSubDIR = './public/assignmentsubmit/';
const storageAssignmentSubmit = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, AssignmentSubDIR)
  },
  filename: (req, file, cb) => {
     cb(null, file.originalname)
  }
});
 
const uploadAssignmentSubmit = multer({storage: storageAssignmentSubmit});


const YouTubeVideoDIR = './public/youtubechannel/';
const storageYouTubeVideo = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, YouTubeVideoDIR)
  },
  filename: (req, file, cb) => {
     cb(null, file.originalname)
  }
});
 
const uploadYouTubeVideo = multer({storage: storageYouTubeVideo});


const timetableDIR = './public/timetable';
let storageTimetable = multer.diskStorage({  
    destination: function (req, file, callback) {
      callback(null, timetableDIR);        
    },
    filename: function (req, file, cb) 
    {      
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));      
  }
});

let uploadTimetable = multer({storage: storageTimetable}); 


const examDIR = './public/exam';
let storageExam = multer.diskStorage({  
    destination: function (req, file, callback) {
      callback(null, examDIR);        
    },
    filename: function (req, file, cb) 
    {      
      cb(null, file.originalname);      
  }
});

let uploadExam = multer({storage: storageExam}); 


const testDIR = './public/test';
let storageTest = multer.diskStorage({  
    destination: function (req, file, callback) {
      callback(null, testDIR);        
    },
    filename: function (req, file, cb) 
    {      
      cb(null, file.originalname);      
  }
});

let uploadTest = multer({storage: storageTest}); 


const examSubmitDIR = './public/examsubmit';
let storageExamSubmit = multer.diskStorage({  
    destination: function (req, file, callback) {
      callback(null, examSubmitDIR);        
    },
    filename: function (req, file, cb) 
    {      
      cb(null, file.originalname);      
  }
});

let uploadExamSubmit = multer({storage: storageExamSubmit}); 



const testSubmitDIR = './public/testsubmit';
let storageTestSubmit = multer.diskStorage({  
    destination: function (req, file, callback) {
      callback(null, testSubmitDIR);        
    },
    filename: function (req, file, cb) 
    {      
      cb(null, file.originalname);      
  }
});

let uploadTestSubmit = multer({storage: storageTestSubmit});


const notesDIR = './public/notes';
let storageNotes = multer.diskStorage({  
    destination: function (req, file, callback) {
      callback(null, notesDIR);        
    },
    filename: function (req, file, cb) 
    {      
      cb(null, file.originalname);      
  }
});

let uploadNotes = multer({storage: storageNotes});

const tvDIR = './public/teachervideo';
let storageTV = multer.diskStorage({  
    destination: function (req, file, callback) 
    {
      callback(null, tvDIR);        
    },
    filename: function (req, file, cb) 
    {      
      cb(null, file.originalname);      
    }
});
let uploadTeacherVideo = multer({storage: storageTV});


router.get("/greetings", mycontroller.greetings);
router.get("/handle_database",mycontroller.handle_database);
//router.get("/getStudentData",mycontroller.getStudentData);

//router.get("/getAllClasses",checkAuth,mycontroller.getAllClasses);
router.get("/getAllCourses",checkAuth,mycontroller.getAllCourses);
router.get("/getAllClassesApp",mycontroller.getAllClassesApp);
router.get("/getAllCoursesApp",checkAuth,mycontroller.getAllCoursesApp);
router.post("/appLogin",mycontroller.appLogin);
router.post("/createStudent",mycontroller.create_a_student);
router.get("/getStudentById",checkAuth,mycontroller.getStudentById);
router.post("/updateStudent",checkAuth,uploadProfile.single('StudentImage'),mycontroller.updateStudent);
router.post("/deleteStudent",checkAuth,mycontroller.deleteStudent);

router.post('/insertCourse',checkAuth,upload.single('CourseImage'),mycontroller.insertCourse);
router.get("/getCourseById",checkAuth,mycontroller.getCourseById);
router.post("/updateCourseById",upload.single('CourseImage'),mycontroller.updateCourseById);

router.post("/updateCourseByIdWeb",upload.single('CourseImage'),mycontroller.updateCourseByIdWeb);

router.post("/insertClass",checkAuth,mycontroller.insertClass);
router.get("/getClassById",checkAuth,mycontroller.getClassById);
router.post("/updateClassById",checkAuth,mycontroller.updateClassById);
router.get("/deleteClassById",checkAuth,mycontroller.deleteClassById);
router.get("/getClassSearch",checkAuth,mycontroller.getClassSearch);

router.post("/insertTopic", checkAuth,mycontroller.insertTopic);
router.get("/getTopicById",checkAuth,mycontroller.getTopicById);
router.post("/updateTopicById",checkAuth,mycontroller.updateTopicById);
router.get("/deleteTopicById",checkAuth,mycontroller.deleteTopicById);
router.get("/getAllTopicApp",checkAuth,mycontroller.getAllTopicApp);

router.post("/insertChapter",checkAuth,mycontroller.insertChapter);
router.get("/getChapterById",checkAuth,mycontroller.getChapterById);
router.post("/updateChapterById",checkAuth,mycontroller.updateChapterById);
router.get("/deleteChapterById",checkAuth,mycontroller.deleteChapterById);
router.get("/getAllChapterApp",checkAuth,mycontroller.getAllChapterApp);

router.post("/insertBookmark",checkAuth,mycontroller.insertBookmark);
router.get("/getBookmarkByStudentId",checkAuth,mycontroller.getBookmarkByStudentId);
router.get("/deleteBookmarkByStudentId",checkAuth,mycontroller.deleteBookmarkByStudentId);


router.post("/insertCourseEnrollment",checkAuth,mycontroller.insertCourseEnrollment);
router.get("/getCourseEnrollmentById",checkAuth,mycontroller.getCourseEnrollmentById);
router.post("/updateCourseEnrollmentById",checkAuth,mycontroller.updateCourseEnrollmentById);
router.get("/deleteCourseEnrollmentById",checkAuth,mycontroller.deleteCourseEnrollmentById);
router.get("/getAllCourseEnrollmentApp",checkAuth,mycontroller.getAllCourseEnrollmentApp);

router.get("/getCourseByClassId",checkAuth,mycontroller.getCourseByClassId);
router.get("/getTopicByCourseId",checkAuth,mycontroller.getTopicByCourseId);
router.get("/getChapterByTopicId",checkAuth,mycontroller.getChapterByTopicId);
router.get("/getChapterByCourse",checkAuth,mycontroller.getChapterByCourse);
router.get("/getTopicByChapter",mycontroller.getTopicByChapter);

//router.post("/insertFeedback",checkAuth,mycontroller.insertFeedback);
router.post('/insertFeedback_New',mycontroller.insertFeedback_New);

router.post("/webLogin",mycontroller.webLogin);



router.get("/getAllCoursesAccordingToClass",checkAuth,mycontroller.getAllCoursesAccordingToClass);
router.get("/getAllTopicAccordingToClass", mycontroller.getAllTopicAccordingToClass);
router.get("/getAllChapterAccordingToClass", checkAuth, mycontroller.getAllChapterAccordingToClass);

router.get("/getAllRegisteredUsers", checkAuth, mycontroller.getAllRegisteredUsers);

//router.get("/getStudentCount",checkAuth,mycontroller.getStudentCount);

router.get("/generateStudentExcelSheet",checkAuth,mycontroller.generateStudentExcelSheet);

router.post("/insertTestYouTubeData",mycontroller.insertTestYouTubeData);

router.post("/insertTestModule", checkAuth,mycontroller.insertTestModule);
router.get("/getTestQuestionAccordingToClassSubjectChapter", checkAuth,mycontroller.getTestQuestionAccordingToClassSubjectChapter);


router.post("/insertPracticeModule", checkAuth,mycontroller.insertPracticeModule);
router.get("/getPracticeQuestionAccordingToClassSubjectChapter", checkAuth,mycontroller.getPracticeQuestionAccordingToClassSubjectChapter);

//router.post("/insertTestMaster", mycontroller.insertTestMaster);
router.get("/getAllChapterTest", checkAuth,mycontroller.getAllChapterTest);

//router.post("/importExcelData2MySQL", uploadExcel.single("uploadfile"),mycontroller.importExcelData2MySQL);

router.post("/insertParentDetail",mycontroller.insertParentDetail);
router.get("/getParentById",mycontroller.getParentById);
router.post("/updateParentMain",mycontroller.updateParentMain);


router.post("/insertStudent",checkAuth,mycontroller.insertStudent);
router.get("/getStudentByParentId",mycontroller.getStudentByParentId);
router.get("/getStudentParentData",mycontroller.getStudentParentData);


router.post("/appLoginNew",mycontroller.appLoginNew);
router.post("/appLoginStudent",mycontroller.appLoginStudent);
router.get("/getTestQuestionAccordingToClassSubjectChapter_New", mycontroller.getTestQuestionAccordingToClassSubjectChapter_New);
router.get("/getPracticeQuestionAccordingToClassSubjectChapter_New", mycontroller.getPracticeQuestionAccordingToClassSubjectChapter_New);
router.get("/getStudentMainById",mycontroller.getStudentMainById);
router.post("/updateStudentMain",uploadProfile.single('StudentImage'),mycontroller.updateStudentMain);
router.post("/insertFeedback_New",mycontroller.insertFeedback_New);

//Practice Api
router.post("/insertPracticeMasterSingle", mycontroller.insertPracticeMasterSingle);
router.post("/insertPracticeMaster", uploadExcel.single("uploadfile"),mycontroller.insertPracticeMaster);
router.get("/getAllChapterPractice", mycontroller.getAllChapterPractice);
router.get("/getPracticeQuestionAccToPracticeId", mycontroller.getPracticeQuestionAccToPracticeId);
router.get("/getPracticeTitleDD", mycontroller.getPracticeTitleDD);
router.post("/insertPracticeDetail", mycontroller.insertPracticeDetail);
router.post("/updatePracticeDetail", mycontroller.updatePracticeDetail);

router.get("/getAllPracticeData", mycontroller.getAllPracticeData);
//router.post("/importPracticeExcelData2MySQL", uploadExcel.single("uploadfile"),mycontroller.importPracticeExcelData2MySQL);


router.post('/insertTestMaster', uploadExcel.single("uploadfile"),mycontroller.insertTestMaster);
router.get('/getTestQuestionAccToTestId', mycontroller.getTestQuestionAccToTestId);
router.get('/getUserTestStatus', mycontroller.getUserTestStatus);
router.get('/getTestTitleDD', mycontroller.getTestTitleDD);
router.post('/insertTestDetail', mycontroller.insertTestDetail);
router.post('/updateTestDetail', mycontroller.updateTestDetail);
//studentTest

router.post('/insertStudentTestDetail', mycontroller.insertStudentTestDetail);
router.get('/getStudentTest', mycontroller.getStudentTest);
router.get('/getStudentTestAccToTestMaster',mycontroller.getStudentTestAccToTestMaster);
router.get('/getAllChapterTestWeb', mycontroller.getAllChapterTestWeb);


//studentPractice
router.post('/insertStudentPracticeDetail', mycontroller.insertStudentPracticeDetail);
router.get('/getAllChapterPracticeWeb', mycontroller.getAllChapterPracticeWeb);

//Admin api's
router.post("/adminLogin", mycontroller.adminLogin);
router.get("/getStudentDataNew", mycontroller.getStudentDataNew);
router.get("/getStudentCountNew", mycontroller.getStudentCountNew);
router.get("/getParentList", mycontroller.getParentList);
// router.get("/searchStudent", mycontroller.searchStudent);
router.get("/getAllClasses", mycontroller.getAllClasses);
router.post("/insertStudentWeb",checkAuth,mycontroller.insertStudentWeb);
router.post("/updateStudentMainWeb",mycontroller.updateStudentMainWeb);
//Author

router.post('/insertAuthor', mycontroller.insertAuthor)

//schoolmaster
 router.post("/insertSchoolDetail",checkAuth,mycontroller.insertSchoolDetail);
 router.post("/updateSchoolMaster",checkAuth,uploadLogo.single('SchoolLogo'),mycontroller.updateSchoolMaster);
 router.post("/deleteschool",checkAuth,mycontroller.deleteschool);
 router.get("/getSchoolList",mycontroller.getSchoolList);
 router.post("/schoolLogin", mycontroller.schoolLogin);
 router.post("/insertParentBySchool",checkAuth,mycontroller.insertParentBySchool);
 router.post('/insertParentMaster',uploadExcel.single("uploadfile"), mycontroller.insertParentMaster);
 //router.post('/insertParentMasterupdated',uploadExcel.single("uploadfile"), mycontroller.insertParentMasterupdated);
 router.get('/getExcelSheetParent',mycontroller.getExcelSheetParent);
 router.get('/getExcelSheetUsers',mycontroller.getExcelSheetUsers);
 router.get('/getExcelSheetTimeTable',mycontroller.getExcelSheetTimeTable)
 router.post('/updateCredential',checkAuth,mycontroller.updateCredential);
 router.post('/insertTeacher',checkAuth,mycontroller.insertTeacher);
 router.post('/updateTeacher',checkAuth,mycontroller.updateTeacher);
 router.post('/deleteTeacher',checkAuth,mycontroller.deleteTeacher)
 //router.post("/updateSchoolLogo",checkAuth,uploadProfile.single("logo"),mycontroller.updateSchoolLogo);
 router.get("/getTeacherList",checkAuth,mycontroller.getTeacherList);
 router.get('/getStudentBySchoolId',checkAuth,mycontroller.getStudentBySchoolId);
 router.post('/insertSchool',checkAuth,uploadLogo.single('SchoolLogo'),mycontroller.insertSchool);
 //router.post('/updateSchoolMaster',checkAuth,uploadProfile.single('SchoolLogo'),mycontroller.updateSchoolMaster)
 router.post('/insertTimeTable',checkAuth,mycontroller.insertTimeTable);
 router.post('/updateTimeTableById',checkAuth,mycontroller.updateTimeTableById);
 router.post('/deletetimetable',checkAuth,mycontroller.deletetimetable);
 router.get('/getTimeTable',checkAuth,mycontroller.getTimeTable);
 router.get('/callURL',mycontroller.callURL);
 router.get('/getInformation',checkAuth,mycontroller.getInformation)


 router.get('/getStudentCourses',checkAuth,mycontroller.getStudentCourses);
 router.get('/getStudentTopics',checkAuth,mycontroller.getStudentTopics);
 router.get('/getStudentChapters',checkAuth,mycontroller.getStudentChapters);
 router.get('/getLiveId',checkAuth,mycontroller.getLiveId)
 router.get('/getURL',checkAuth,mycontroller.getURL)
 router.get('/getCoursesFiltering',checkAuth,mycontroller.getCoursesFiltering)
 router.get('/getChapterListBySchoolId',mycontroller.getChapterListBySchoolId)
 router.get('/getTopicListBySchoolId',mycontroller.getTopicListBySchoolId)
 router.post('/insertLiveLink',checkAuth,mycontroller.insertLiveLink);
 router.post('/updateLivelinkById',checkAuth,mycontroller.updateLivelinkById);
 router.post('/deletelivelink',checkAuth,mycontroller.deletelivelink);
 router.get('/getLinkData',checkAuth,mycontroller.getLinkData);
 router.get('/changePasswordStudent', mycontroller.changePasswordStudent);
 router.post('/insertClassTheme',checkAuth,mycontroller.insertClassTheme)
 router.post('/updateClassTheme',checkAuth,mycontroller.updateClassTheme)
 router.post('/deleteClassTheme',mycontroller.deleteClassTheme)
 router.get('/getTeacherBySchool',checkAuth,mycontroller.getTeacherBySchool)
 router.get('/getSchools',mycontroller.getSchools);
 router.get('/getClassThemeFilterByClassId',mycontroller.getClassThemeFilterByClassId)
 router.post('/importStudentMainExcelData2MySQL',uploadExcel.single("uploadfile"), mycontroller.importStudentMainExcelData2MySQL);

router.get('/getStudentListBySchoolId',mycontroller.getStudentListBySchoolId);

router.get('/getParentListBySchoolId',mycontroller.getParentListBySchoolId);

router.get('/getParentCountBySchool',mycontroller.getParentCountBySchool);
router.get('/getSchoolCountBySchool',mycontroller.getSchoolCountBySchool);


router.post("/insertYouTubeDetails",mycontroller.insertYouTubeDetails);
router.post("/updateYouTubeDetails",mycontroller.updateYouTubeDetails);
router.get("/getURLWeb", mycontroller.getURLWeb);
router.get("/deleteYouTubeDetails", mycontroller.deleteYouTubeDetails);

router.post('/importCourseExcelData2MySQL', uploadExcel.single("uploadfile"),mycontroller.importCourseExcelData2MySQL);
router.post('/importChapterExcelData2MySQL', uploadExcel.single("uploadfile"),mycontroller.importChapterExcelData2MySQL);

router.post('/importTimeTableExcelData2MySQL', uploadTimetable.single("uploadfile"),mycontroller.importTimeTableExcelData2MySQL);


router.get('/getTimeTableByTeacherId', mycontroller.getTimeTableByTeacherId);

router.get('/getTimeTableByClassId', mycontroller.getTimeTableByClassId);
router.get('/getTimeTableByClassIdDD', mycontroller.getTimeTableByClassIdDD);
router.get('/getStudentListBySchool', mycontroller.getStudentListBySchool);

router.post('/updateStudentMainStatus', mycontroller.updateStudentMainStatus);
router.get('/getCourseByClassAndSchoolId', mycontroller.getCourseByClassAndSchoolId);

router.get('/getTimeTableByDay', mycontroller.getTimeTableByDay);

//-------------------------------------------Assignment--------------------------------------
router.post('/insertAssignment', uploadAssignment.single("doc"), mycontroller.insertAssignment);
router.post('/updateAssignment', uploadAssignment.single("doc"), mycontroller.updateAssignment);
router.get('/getAssignmentById', mycontroller.getAssignmentById);
router.get('/getAllAssignment', mycontroller.getAllAssignment);

router.get('/getAssignmentBySchoolAndClass', mycontroller.getAssignmentBySchoolAndClass);


//---------------------------------------------Assignment Submit------------------------------------
router.post('/insertAssignmentSubmit', uploadAssignmentSubmit.single("doc"), mycontroller.insertAssignmentSubmit);

router.get('/getAssignmentByTeacherId', mycontroller.getAssignmentByTeacherId);
router.post('/updateAssignmentStatus', mycontroller.updateAssignmentStatus);

router.get('/getStudentParentCount', mycontroller.getStudentParentCount);
router.post('/insertParentUpdateStudent', mycontroller.insertParentUpdateStudent);

router.get('/viewFeedback', mycontroller.viewFeedback);
//
//router.get('/runSample', mycontroller.runSample);
//router.get('/runSample1', mycontroller.runSample1);
//router.get('/oauth2callback', mycontroller.oauth2callback);

//var cpUpload = uploadYouTubeVideo.fields([{ name: 'channelvideo', maxCount: 1 }, { name: 'thumbnail', maxCount: 4 }])
//router.post('/singleInsertYoutubeDetails', cpUpload, mycontroller.singleInsertYoutubeDetails);
//router.get('/createPlaylistInYoutube', mycontroller.createPlaylistInYoutube);
//router.get('/insertVideoInPlaylist', mycontroller.insertVideoInPlaylist);

router.get('/getLiveRecording', mycontroller.getLiveRecording);

router.get('/getDefaultParent', mycontroller.getDefaultParent);

router.post('/updateRejectAssignmentStatus', uploadAssignmentSubmit.single("doc"), mycontroller.updateRejectAssignmentStatus);


router.get('/getSchoolLiveData', mycontroller.getSchoolLiveData);

router.get('/getSchoolCount', mycontroller.getSchoolCount);

router.post('/insertParentDetailTest', mycontroller.insertParentDetailTest);
router.post('/insertStudentTest', mycontroller.insertStudentTest);

router.post("/appLoginNewTest",mycontroller.appLoginNewTest);

router.post("/insertSchoolTest",uploadLogo.single('SchoolLogo'), mycontroller.insertSchoolTest);

router.post("/schoolLoginTest", mycontroller.schoolLoginTest);

//router.get("/resetPasswordSchool", mycontroller.resetPasswordSchool);

router.get("/assignmentSearch", mycontroller.assignmentSearch);

router.post("/insertAttendance", mycontroller.insertAttendance);

router.get("/getStudentAttendance", mycontroller.getStudentAttendance);

router.get('/changePasswordStudent', mycontroller.changePasswordStudent);

//router.get("/sendNotificationMessage", mycontroller.sendNotificationMessage);

//router.get("/insertSchoolTokenInStudents", mycontroller.insertSchoolTokenInStudents);

//router.get("/addFirebaseTopicInSchool", mycontroller.addFirebaseTopicInSchool);

//router.get("/sendFirebaseMessage", mycontroller.sendFirebaseMessage);

//router.get("/getFBTokenName", mycontroller.getFBTokenName);

//router.get("/sendFirebaseMessage", mycontroller.sendFirebaseMessage);

//router.get("/studentChat", mycontroller.studentChat);

//router.get("/decryptPassword", mycontroller.decryptPassword);


//--------------------Exam Module----------------------------------

router.post("/insertExam", uploadExam.single("examfile"),mycontroller.insertExam);
router.post("/updateExam", uploadExam.single("examfile"),mycontroller.updateExam);
router.get("/getExamByTeacherId", mycontroller.getExamByTeacherId);
router.get("/getExamByClassId", mycontroller.getExamByClassId);

//------------------------------------------------------------------

//--------------------Revised Test Module----------------------------------

router.post("/insertTest", uploadTest.single("testfile"),mycontroller.insertTest);
router.post("/updateTest", uploadTest.single("testfile"),mycontroller.updateTest);
router.get("/getTestByTeacherId", mycontroller.getTestByTeacherId);
router.get("/getTestByClassId", mycontroller.getTestByClassId);

//------------------------------------------------------------------


//---------------------Exam Submit----------------------------------------

router.post("/insertExamSubmit", uploadExamSubmit.single("examsubmitfile"),mycontroller.insertExamSubmit);
router.post('/updateExamSubmitStatus', mycontroller.updateExamSubmitStatus);
router.post('/updateRejectExamStatus', uploadExamSubmit.single("examsubmitfile"), mycontroller.updateRejectExamStatus);
router.get('/getExamBySchoolAndClass', mycontroller.getExamBySchoolAndClass);
router.get('/getExamSubmitByTeacherId', mycontroller.getExamSubmitByTeacherId);
//-----------------------------------------------------------------------


//---------------------Test Submit----------------------------------------

router.post("/insertTestSubmit", uploadTestSubmit.single("testsubmitfile"),mycontroller.insertTestSubmit);
router.post('/updateTestSubmitStatus', mycontroller.updateTestSubmitStatus);
router.post('/updateRejectTestStatus', uploadTestSubmit.single("testsubmitfile"), mycontroller.updateRejectTestStatus);
router.get('/getTestBySchoolAndClass', mycontroller.getTestBySchoolAndClass);
router.get('/getTestSubmitByTeacherId', mycontroller.getTestSubmitByTeacherId);
//-----------------------------------------------------------------------


//-----------------------Grade Master------------------------------------------

router.post("/insertGM", mycontroller.insertGM);
router.post("/updateGM", mycontroller.updateGM);
router.get('/getGMBySchoolANDClassAndCourseId', mycontroller.getGMBySchoolANDClassAndCourseId);
//-----------------------------------------------------------------------------


//-----------------------Grade Detail------------------------------------------

router.post("/insertGD", mycontroller.insertGD);
router.post("/updateGD", mycontroller.updateGD);
router.get('/getGDBySchoolANDClassAndCourseId', mycontroller.getGDBySchoolANDClassAndCourseId);
//-----------------------------------------------------------------------------


//---------------------------Exam Group-------------------------------------------

router.post("/insertExamGroup", mycontroller.insertExamGroup);
router.post("/updateExamGroup", mycontroller.updateExamGroup);
router.get('/getEGBySchool', mycontroller.getEGBySchool);
router.get("/getAllExamGroupBySchoolId",mycontroller.getAllExamGroupBySchoolId);
router.get("/getAllExamGroupBySchoolIdAndClass", mycontroller.getAllExamGroupBySchoolIdAndClass);

//--------------------------------------------------------------------------------

router.get("/gradeCalculation", mycontroller.gradeCalculation);


//--------------------------Exam Result Master----------------------------------------

 router.post("/insertExamMasterResult", mycontroller.insertExamMasterResult);
 router.post("/updateExamMasterResult", mycontroller.updateExamMasterResult);
 router.get("/getExamAccToType",mycontroller.getExamAccToType);
 router.get("/getExamResult",mycontroller.getExamResult);

//------------------------------------------------------------------------------------

//--------------------------Exam Detail Result----------------------------------------

 router.post("/insertExamDetailResult", mycontroller.insertExamDetailResult);
 router.post("/updateExamDetailResult", mycontroller.updateExamDetailResult);
 router.get("/getExamResultDetailByMasterId", mycontroller.getExamResultDetailByMasterId);
 router.get("/getExamResultDetailByMasterIdApp", mycontroller.getExamResultDetailByMasterIdApp);
 router.get("/getExamDetailByStudent", mycontroller.getExamDetailByStudent);
 router.get("/getStudentMarks", mycontroller.getStudentMarks);
 router.get("/getExamDetailSchoolANDClassAndCourseId", mycontroller.getExamDetailSchoolANDClassAndCourseId);
//------------------------------------------------------------------------------------

//--------------------------Test Result Master----------------------------------------

 router.post("/insertTestMasterResult", mycontroller.insertTestMasterResult);
 router.post("/updateTestMasterResult", mycontroller.updateTestMasterResult);
 router.get("/getTestAccToType",mycontroller.getTestAccToType);
 router.get("/getTestResult",mycontroller.getTestResult);

//------------------------------------------------------------------------------------

//--------------------------Test Detail Result----------------------------------------

 router.post("/insertTestDetailResult", mycontroller.insertTestDetailResult);
 router.post("/updateTestDetailResult", mycontroller.updateTestDetailResult);
 router.get("/getTestResultDetailByMasterId", mycontroller.getTestResultDetailByMasterId);
 router.get("/getTestResultDetailByMasterIdApp", mycontroller.getTestResultDetailByMasterIdApp);
 router.get("/getTestDetailByStudent", mycontroller.getTestDetailByStudent);
 router.get("/getStudentMarksTest", mycontroller.getStudentMarksTest);
 router.get("/getTestDetailSchoolANDClassAndCourseId", mycontroller.getTestDetailSchoolANDClassAndCourseId);

//------------------------------------------------------------------------------------

//------------------------Device Token api's------------------------------------

router.post("/appLoginNewDevice",mycontroller.appLoginNewDevice);
router.get("/UpdateStudentDeviceToken", mycontroller.UpdateStudentDeviceToken);
router.get("/getStudentDeviceToken", mycontroller.getStudentDeviceToken);
//-------------------------------------------------------------------------------


//--------------------------------Notes--------------------------------------
router.post('/insertNotes', uploadNotes.single("doc"), mycontroller.insertNotes);
router.post('/updateNotes', uploadNotes.single("doc"), mycontroller.updateNotes);
router.get('/getNotesByTeacherId', mycontroller.getNotesByTeacherId);
router.get('/deleteNotes', mycontroller.deleteNotes);
router.get('/getNotesBySchoolAndClass', mycontroller.getNotesBySchoolAndClass);
//---------------------------------------------------------------------------

//--------------------------------Teacher Video--------------------------------
router.post('/insertTeacherVideo', uploadTeacherVideo.single("videofile"), mycontroller.insertTeacherVideo);
router.get('/getVideoDetail', mycontroller.getVideoDetail);
router.get('/callVideoURL', mycontroller.callVideoURL);

//-----------------------------------------------------------------------------

//-------------------------------------Count Api's---------------------------------

router.get('/getTeacherCount', mycontroller.getTeacherCount);
router.get('/getClassCount', mycontroller.getClassCount);
router.get('/getCourseCount', mycontroller.getCourseCount);

//-------------------------------------------------------------------------------

//-----------------------------------------Inactive Api's-----------------------
  router.get("/inactiveSchoolTeacherAndStudent", mycontroller.inactiveSchoolTeacherAndStudent);
//----------------------------------------------------------------------------


//---------------------------------------Holiday Api's-------------------------

router.post('/insertHoliday', mycontroller.insertHoliday);
router.post('/updateHoliday', mycontroller.updateHoliday);
router.get('/deleteHoliday', mycontroller.deleteHoliday);
router.get('/getHolidayBySchoolId', mycontroller.getHolidayBySchoolId);
//-----------------------------------------------------------------------------



module.exports = router;


