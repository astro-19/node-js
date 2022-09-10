const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dishRouter = require('./routes/dishRouter');
const leaderRouter = require('./routes/leadersRouter');
const promoRouter = require('./routes/promoRouter');

const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/nodeExpressServer';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server...")
}, (err) => { console.log(err); });

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-67890-09876-54321'));

// Basic Authentication
function auth(req, res, next) {
  if (req.method === 'OPTIONS') {
    // console.log('!OPTIONS');
    var headers = {};
    res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.writeHead(200, headers);
    res.end();
  }
  console.log(req.headers);
  var authHeader = req.headers.authorization;
  if (!authHeader) {
    var err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }

  var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  // console.log(auth);
  var username = auth[0];
  var password = auth[1];

  if (username === 'admin' && password === 'password') {
    next();
  }
  else {
    var err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }
}
// Basic Authentication Ends

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
console.log("before calling /dishes");
app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promotions', promoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;







// function auth(req, res, next) {
//   // console.log(req.headers);
//   console.log(req.signedCookies);
//   if (!req.signedCookies.user) {
//     var authHeader = req.headers.authorization;
//     // console.log(authHeader);
//     if (!authHeader) {
//       var err = new Error('You are not authenticated!');
//       res.setHeader('WWW-Authenticate', 'Basic');
//       err.status = 401;
//       return next(err);
//     }

//     var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
//     // console.log(auth);
//     var username = auth[0];
//     var password = auth[1];

//     if (username === 'admin' && password === 'password') {
//       res.cookie('user','admin', {signed: true});
//       next();
//     }
//     else {
//       var err = new Error('You are not authenticated!');
//       res.setHeader('WWW-Authenticate', 'Basic');
//       err.status = 401;
//       return next(err);
//     }
//   }
//   else{
//     if(req.signedCookies.user === 'admin') {
//       next();
//     }else{
//       var err = new Error('You are not authenticated!');

//       err.status = 401;
//       return next(err);
//     }
//   }
// }