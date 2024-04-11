const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const pool = require('../lib/pool');

module.exports = function (passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); 
    opts.secretOrKey = "iloveindia";
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{ 
        // User.getUserByIdPassword(jwt_payload._id,jwt_payload.password,(err,user)=>{
        //     if(err)
        //         return done(err,false,{ message: 'Invalid token.' });

        //     if(user) 
        //         return done(null,user);
        //     else
        //         return done(null,false,{ message: 'Invalid request.' });
        // });
        console.log('Type=>', jwt_payload.type);
        console.log("JWT ID", jwt_payload._id);
        console.log("JWT Password", jwt_payload.password);
        if(jwt_payload.type == 'parent'){
        pool.query('SELECT * FROM parentmain WHERE ParentId = ' +jwt_payload._id+ ' AND ParentPassword = "' + jwt_payload.password +'"', function(err,result){
            if(err){
                console.log("PassportTest1");
                return done(err,false,{ message: 'Invalid token.' });                
            }
            else if(result){
                console.log("PassportTest2", result);
        
                //return done(null,result);
                // pool.query('SELECT * from schoolmaster where SchoolId ='+result[0].SchoolId , function(err,result1)
                // {
                //     // if(result1[0].SchoolId != 0){
                //         if(result1[0].IncludeAarambh !=0 ){
                //      pool.query('SELECT * from schoolmaster where SchoolId = '+result1[0].IncludeAarambh,function(err,result2){
                //          if(err){
                //              console.log(err)
                //          }
                //          else{
                //              return done(null,{parent:result,school:[result2[0],result1[0]]})
                         
                //          }
                //      })
                //     }
                //     else{
                //         return done(null,{parent:result,school:[result1]})
                //     }


                //     })

                pool.query('SELECT * from schoolmaster where SchoolId ='+result[0].SchoolId , function(err,result1)
               {
                   // if(result1[0].SchoolId != 0){
                    if(result1[0].IncludeAarambh !=0 ){
                        console.log('Inside If', result1[0].IncludeAarambh);
                        pool.query(`SELECT SchoolId from schoolmaster where SchoolName LIKE ?`, ['%AARAMBH%'], function(err, data){
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log(data);
                           
                    //pool.query('SELECT * from schoolmaster where SchoolId='+ result1[0].IncludeAarambh,function(err,result2){    
                    pool.query('SELECT * from schoolmaster where SchoolId='+ data[0].SchoolId,function(err,result2)
                    {
                        if(err){
                            console.log(err)
                        }
                        else{
                            //return done({student:result,school:[result2[0],result1[0]]})
                            return done(null,{parent:result,school:[result2[0],result1[0]]})
                        }
                    })
                     }
                        });
                }
                else{
                    return done(null,{parent:result,school:[result1[0]]})
                }
                });

            }
            else{
                console.log("PassportTest3");
                return done(null,false, { message: 'Invalid request.' });
            }
        });
    }
    else if(jwt_payload.type == 'student')
    {
    pool.query('SELECT studentmain.*,parentmain.ParentName, studentclass.StudentClass FROM studentmain LEFT JOIN parentmain ON (studentmain.ParentId = parentmain.ParentId) LEFT JOIN studentclass ON (studentmain.ClassId = studentclass.ClassId) WHERE studentmain.StudentId = ' +jwt_payload._id+ ' AND studentmain.StudentPassword = "' + jwt_payload.password +'"', function(err,result)
    {
            if(err)
            {
                console.log("PassportStudent1");
                return done(err,false,{ message: 'Invalid token.' });                
            }
            else if(result)
            {
                console.log("Passport",result);
                pool.query('SELECT * from schoolmaster where SchoolId ='+result[0].SchoolId , function(err,result1)
               {
                   // if(result1[0].SchoolId != 0){
                    if(result1[0].IncludeAarambh !=0 ){
                        console.log('Inside If', result1[0].IncludeAarambh);
                        pool.query(`SELECT SchoolId from schoolmaster where SchoolName LIKE ?`, ['%AARAMBH%'], function(err, data){
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log(data);
                           
                    //pool.query('SELECT * from schoolmaster where SchoolId='+ result1[0].IncludeAarambh,function(err,result2){    
                    pool.query('SELECT * from schoolmaster where SchoolId='+ data[0].SchoolId,function(err,result2)
                    {
                        if(err){
                            console.log(err)
                        }
                        else{
                            //return done({student:result,school:[result2[0],result1[0]]})
                            return done(null,{student:result,school:[result2[0],result1[0]]})
                        }
                    })
                     }
                        });
                }
                else{
                    return done(null,{student:result,school:[result1[0]]})
                }
                });

            
               // return done(null,result);
            }
            else{
                console.log("PassportStudent3");
                return done(null,false, { message: 'Invalid request.' });
            }
        });

    }
    else if(jwt_payload.type == 'admin')
    {
    pool.query('SELECT * FROM author WHERE Id = ' +jwt_payload._id+ ' AND Password = "' + jwt_payload.password +'"', function(err,result)
    {
            console.log("rr",result)
            if(err){
                console.log("PassportAdmin1");
                return done(err,false,{ message: 'Invalid token.' });                
            }
            else if(result){
                console.log("rrr",result)
                console.log("PassportAdmin2", result);
                return done(null,result);
            }
            else{
                console.log("PassportAdmin3");
                return done(null,false, { message: 'Invalid request.' });
            }
        });

    }
    else if(jwt_payload.type == 'schooladmin')
    {
    pool.query('SELECT * FROM schoolmaster WHERE SchoolId = ' +jwt_payload._id+ ' AND Password = "' + jwt_payload.password +'"', function(err,result)
    {
            
            if(err){
                console.log("PassportSchoolAdmin1");
                return done(err,false,{ message: 'Invalid token.' });                
            }
            else if(result){
               
            //     console.log("PassportSchoolAdmin2", result);
            //    pool.query('SELECT * from schoolmaster where SchoolId ='+result[0].SchoolId , function(err,result1)
            //    {
            //        // if(result1[0].SchoolId != 0){
            //         if(result1[0].IncludeAarambh !=0 ){
            //             console.log('Inside If', result1[0].IncludeAarambh);
            //             pool.query(`SELECT SchoolId from schoolmaster where SchoolName LIKE ?`, ['%AARAMBH%'], function(err, data){
            //                 if(err){
            //                     console.log(err);
            //                 }
            //                 else{
            //                     console.log(data);
                           
            //         //pool.query('SELECT * from schoolmaster where SchoolId='+ result1[0].IncludeAarambh,function(err,result2){    
            //         pool.query('SELECT * from schoolmaster where SchoolId='+ data[0].SchoolId,function(err,result2)
            //         {
            //             if(err){
            //                 console.log(err)
            //             }
            //             else{
            //                 //return done({student:result,school:[result2[0],result1[0]]})
            //                 //return done(null,{student:result,school:[result2[0],result1[0]]})
            //                 return done(null,result);
            //             }
            //         })
            //          }
            //             });
            //     }
            //     else{
            //         return done(null,{student:result,school:[result1[0]]})
            //     }
            //     });


                return done(null,result);
            }
            else{
                console.log("PassportSchoolAdmin3");
                return done(null,false, { message: 'Invalid request.' });
            }
        });

    }
    else if(jwt_payload.type == 'teacher')
    {
    pool.query('SELECT * FROM teacher WHERE TeacherId = ' +jwt_payload._id+ ' AND Password = "' + jwt_payload.password +'"', function(err,result)
    {
            
            if(err){
                console.log("PassportTeacher1");
                return done(err,false,{ message: 'Invalid token.' });                
            }
            else if(result){
                console.log("PassportTeacher2");
                return done(null,result);
            }
            else{
                console.log("PassportTeacher3");
                return done(null,false, { message: 'Invalid request.' });
            }
        });

    }
    else{
        return done(null,false, { message: 'Invalid request.' });
    }

    }));
}