 
var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log("hey",req.headers)
  // console.log(req.userData)
  const token = req.headers.authorization.split(" ")[1]
  console.log(token)
  // var secret = new Buffer('1252', 'base64');
  const decoded = jwt.verify(token,'iloveindia');
      console.log(decoded)
  try {
      const token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token,'iloveindia');
      console.log(decoded)
      req.userData = decoded;    
      next();
  }
  catch (error) {
    console.log('error' + error)
    return res.status(201).json({
      message: 'unauthorized',
      status:402,
      success:false
    })

  }

}