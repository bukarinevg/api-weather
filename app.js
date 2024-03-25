//dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
require('dotenv').config();
const mongoose = require('mongoose');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

const dbURI = process.env.MONGODB_URI;
const port = process.env.MONGODB_PORT || 5000;
mongoose.connect(dbURI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true
})
  .then((result) => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("Error connecting to MongoDB", err);
  });


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//static files are served from the public directory
//midleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));




//set up the routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
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
