//dotenv is a zero-dependency module that loads environment constiables from a .env file into process.env.
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const connectMongoDB = require('./src/dbConnections/mongoConnection');
// const { connectRedis } = require('./src/dbConnections/redisConnection');

function databaseConnection() {
  connectMongoDB();
  // connectRedis();
}

function serverStart() {
  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  const indexRouter = require('./src/routes/index');
  const authRouter = require('./src/routes/auth');
  // const usersRouter = require('./src/routes/users');

  //set up the routes
  app.use('/', indexRouter);
  app.use('/auth', authRouter);
  // app.use('/users', usersRouter);

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
    res.json({ message: `eror ${err.message} ${err.code}`, err: err});
    // res.render('error');
  });


}
databaseConnection();
const app = express();
serverStart();
module.exports = app;

