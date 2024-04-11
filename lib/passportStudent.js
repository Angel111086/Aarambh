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
        console.log("JWT", jwt_payload._id);
        console.log("JWT Password", jwt_payload.password);
        pool.query('SELECT * FROM studentmain WHERE StudentId = ' +jwt_payload._id+ ' AND StudentPassword = "' + jwt_payload.password +'"', function(err,result){
            if(err){
                console.log("PassportStudent1");
                return done(err,false,{ message: 'Invalid token.' });                
            }
            else if(result){
                console.log("PassportStudent2", result);
                return done(null,result);
            }
            else{
                console.log("PassportStudent3");
                return done(null,false, { message: 'Invalid request.' });
            }
        });

    }));
}