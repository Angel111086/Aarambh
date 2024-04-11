// var mysql = require('mysql');
// const pool = require('../lib/pool');

// // constructor
// const ClassTheme = function(classtheme) {   
//   this.ClassId = classtheme.ClassId;
//   this.BaseColor  = classtheme.BaseColor;
//   this.BackgroundImage = classtheme.BackgroundImage;
//   this.GradientOne = classtheme.GradientOne;
//   this.GradientTwo = classtheme.GradientTwo;
//   this.BackArrow = classtheme.BackArrow;
//   this.TransparentCode = classtheme.TransparentCode;
//   this.BookmarkIcon = classtheme.BookmarkIcon;
//   this.NotificationIcon = classtheme.NotificationIcon;
//   this.FontFamily1 = classtheme.FontFamily1;
//   this.FontFamily2 = classtheme.FontFamily2;
//   this.CameraIcon = classtheme.CameraIcon;
//   this.CancelIcon = classtheme.CancelIcon;
//   this.EmailIcon = classtheme.EmailIcon;
//   this.MobileIcon = classtheme.MobileIcon;
//   this.UserIcon = classtheme.UserIcon;
//   this.GenderIcon = classtheme.GenderIcon;
//   this.DOBIcon = classtheme.DOBIcon;
//   this.AddressIcon = classtheme.AddressIcon;
//   this.LogoutIcon = classtheme.LogoutIcon;
//   this.NavigationMenuIcon = classtheme.NavigationMenuIcon;
//   this.ThankuBackground = classtheme.ThankuBackground;
//   this.StatusId = classtheme.StatusId;
//   this.CreatedById = classtheme.CreatedById;
//   this.ModifiedById = classtheme.ModifiedById;
//   this.CreationDate = new Date();
//   this.ModificationDate = classtheme.ModificationDate;
// };


// ClassTheme.getClassThemeByClassId = function (classId, result) {
//   console.log(classId,'id')
//         //pool.query(`SELECT * FROM  student WHERE StudentId = ${studentId}` , function (err, res) {             
//         pool.query("SELECT * FROM classtheme WHERE ClassId = ? AND StatusId = 1",[classId] , function (err, res) {                       
//                 if(err) {
//                     console.log("error: ", err);
//                     result(err, null);
//                 }
//                 else{
//                     console.log(res);
//                     result(null, res);
              
//                 }
//             });   
// };

// module.exports = ClassTheme;


var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const ClassTheme = function(classtheme) {  
  this.ClassId = classtheme.ClassId;
  this.BaseColor  = classtheme.BaseColor;
  this.BackgroundImage = classtheme.BackgroundImage;
  this.GradientOne = classtheme.GradientOne;
  this.GradientTwo = classtheme.GradientTwo;
  this.BackArrow = classtheme.BackArrow;
  this.TransparentCode = classtheme.TransparentCode;
  this.BookmarkIcon = classtheme.BookmarkIcon;
  this.NotificationIcon = classtheme.NotificationIcon;
  this.NotificationSmallIcon = classtheme.NotificationSmallIcon;
  this.LiveArrow = classtheme.LiveArrow;
  this.FontFamily1 = classtheme.FontFamily1;
  this.FontFamily2 = classtheme.FontFamily2;
  this.CameraIcon = classtheme.CameraIcon;
  this.EmailIcon = classtheme.EmailIcon;
  this.MobileIcon = classtheme.MobileIcon;
  this.UserIcon = classtheme.UserIcon;
  this.GenderIcon = classtheme.GenderIcon;
  this.DOBIcon = classtheme.DOBIcon;
  this.AddressIcon = classtheme.AddressIcon;
  this.LogoutIcon = classtheme.LogoutIcon;
  this.NavigationMenuIcon = classtheme.NavigationMenuIcon;
  this.ThankuBackground = classtheme.ThankuBackground;
  this.CancelIcon = classtheme.CancelIcon;
  this.BookmarkMenu = classtheme.BookmarkMenu;
  this.NotificationMenu = classtheme.NotificationMenu;
  this.AcademicMenu = classtheme.AcademicMenu;
  this.ExamMenu = classtheme.ExamMenu;
  this.ShareTheAppMenu = classtheme.ShareTheAppMenu;
  this.ParentConnectMenu = classtheme.ParentConnectMenu; 
  this.ContactUsMenu = classtheme.ContactUsMenu;
  this.SubscribeNowMenu = classtheme.SubscribeNowMenu;
  this.ChangePasswordMenu = classtheme.ChangePasswordMenu;
  this.TermsAndConditionMenu = classtheme.TermsAndConditionMenu;
  this.StatusId = classtheme.StatusId;
  this.CreatedById = classtheme.CreatedById;
  this.ModifiedById = classtheme.ModifiedById;
  this.CreationDate = new Date();
  this.ModificationDate = classtheme.ModificationDate;
};


ClassTheme.getClassThemeByClassId = function (classId, result) {
  console.log(classId,'id')            
        pool.query("SELECT * FROM classtheme WHERE ClassId = ? AND StatusId = 1",[classId] , function (err, res) {                      
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

ClassTheme.addTheme = function (theme, result) {  
        pool.query("SELECT classId FROM classtheme WHERE classId = ? AND StatusId = ?",[theme.ClassId, theme.StatusId], function(err,res){
          console.log(res.length);
          if(err){
            console.log(err);
          }
          else
          {
            if(res.length>0){
              result(null, {"Message":"Class Theme is already saved."});
            }
            else
            {
                pool.query("INSERT INTO classtheme SET ?", theme, function (err, res) {                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, {"Message":"Class Theme Details Saved Successfully."});

                }
            });          
            }
          }
        });
};

ClassTheme.UpdateTheme = function (ClassThemeId, theme,result)
{
   pool.query(`UPDATE classtheme SET BaseColor = ?, BackgroundImage = ?, GradientOne = ?, GradientTwo = ?, 
    BackArrow = ?, TransparentCode = ?, BookmarkIcon = ?, NotificationIcon = ?, NotificationSmallIcon = ?, 
    LiveArrow = ?, FontFamily1 = ?, FontFamily2 = ?, CameraIcon = ?, EmailIcon = ?, MobileIcon = ?, UserIcon = ?, 
    GenderIcon = ?, DOBIcon = ?, AddressIcon = ?, LogoutIcon = ?, NavigationMenuIcon = ?, ThankuBackground = ?,
    CancelIcon = ?, BookmarkMenu = ?, NotificationMenu = ?, AcademicMenu= ?, ExamMenu=?, ShareTheAppMenu=?,
    ParentConnectMenu = ?, ContactUsMenu=?, SubscribeNowMenu=?, ChangePasswordMenu=?, TermsAndConditionMenu=?,
    StatusId = ? WHERE ClassThemeId = ?`,
    [theme.BaseColor, theme.BackgroundImage, theme.GradientOne, theme.GradientTwo, theme.BackArrow, theme.TransparentCode, theme.BookmarkIcon,
    theme.NotificationIcon, theme.NotificationSmallIcon, theme.LiveArrow, theme.FontFamily1, theme.FontFamily2, theme.CameraIcon,
    theme.EmailIcon, theme.MobileIcon, theme.UserIcon, theme.GenderIcon,theme.DOBIcon, theme.AddressIcon, theme.LogoutIcon, theme.NavigationMenuIcon,
    theme.ThankuBackground, theme.CancelIcon, theme.BookmarkMenu, theme.NotificationMenu,theme.AcademicMenu,
    theme.ExamMenu, theme.ShareTheAppMenu, theme.ParentConnectMenu, theme.ContactUsMenu, theme.SubscribeNowMenu,
    theme.ChangePasswordMenu, theme.TermsAndConditionMenu, theme.StatusId,  ClassThemeId],
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



ClassTheme.DeleteTheme = function(id, result){
  pool.query(`UPDATE classtheme SET StatusId = ? WHERE ClassThemeId = ?`,
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


module.exports = ClassTheme;
