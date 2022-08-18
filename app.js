var createError = require('http-errors');
var express = require('express');
var path = require('path');
var db=require('./config/connection')
var fordb=require("./fordb/fordb")
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileupload=require('express-fileupload')
var mongodb=require('mongodb')
var session=require('express-session')







var usersRouter = require('./routes/users');
var adminsRouter = require('./routes/admin');
var exphbs=require("express-handlebars");
const { Cookie } = require('express-session');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'),);

app.set('view engine', '.hbs');

app.engine('hbs', exphbs.engine({extname: 'hbs', 
  defaultLayout: 'as', 
  layoutDir: (__dirname + '/views/layout'),
  partialsDir: (__dirname, 'views/Partials/'),
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload());
app.use(session({secret:"Key",cookie:{maxAge:600000}}))
db.connect((err)=>{
  if (err) console.log("err"+err)
  else
       console.log("DAta found")

})
app.use('/', usersRouter);
app.use('/admin', adminsRouter);

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
