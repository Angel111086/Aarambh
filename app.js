const express = require('express');
const bodyParser = require('body-parser');// initialize our express app

var mysql = require('mysql');
var multer = require('multer');
var http = require('http')
var path = require('path')

const cors = require('cors');

const myapi = require('./router/aarambh.route');
const app = express();
const passport = require('passport');



const fs = require('fs');
//const authorize = require('./lib/helperauthorize')

const authorize = require('./lib/auth.youtube')

app.use(bodyParser.json({
	limit: '200mb'
}));
app.use(bodyParser.urlencoded({
	limit: '100mb',
	parameterLimit: 100000,
	extended: true}));

app.use(cors());
app.options('*', cors());

app.use(passport.initialize());
app.use(passport.session());
require('./lib/passport')(passport);

app.use('/aarambhTesting', myapi);

// message="";
// app.get('/', function(req, res) {
//     //res.render('index', message);
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

console.log('Path',path.join(__dirname))
app.use(express.static(path.join(__dirname, '/public')));



var port = 1500;

var server = app.listen(port, () => {
    console.log('Server is up and running on port numbner ' + port);
});

server.timeout = 2000;