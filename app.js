var createError = require('http-errors');
var express = require('express');
const session = require('express-session');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const ColorHash = require('color-hash');

const sessionMiddleware = session({
  resave:false,
  saveUninitialized:false,
  secret:'mysecret',
  cookie:{
    httpOnly:true,
    secure:false,
  },
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('sessionMiddleware',sessionMiddleware);
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, 'public')));




app.use((req,res,next)=>{
  if(!req.session.color){
    const colorHash = new ColorHash();
    req.session.color = colorHash.hex(req.sessionID);
  }
  next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
