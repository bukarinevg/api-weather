//dotenv is a zero-dependency module that loads environment constiables from a .env file into process.env.
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const { redisClient, createClient } = require('redis');

const connectMongoDB = require('./dbConnections/mongoConnection');
const { connectRedis } = require('./dbConnections/redisConnection');



// const dbURI = process.env.MONGODB_URI;
// const port = process.env.MONGODB_PORT || 5000;
// mongoose.connect(dbURI, {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
//   // useCreateIndex: true
// })
//   .then((result) => {
//     app.listen(port, () => {
//       const dbName = dbURI.split('/').pop();
//       // console.log(`Database name: ${dbName}`);
//       // console.log(`Server is running on port ${port}`);
//     });
//   })
//   .catch(err => {
//     console.error("Error connecting to MongoDB", err);
//   });


// const client = createClient({
//     password: process.env.REDIS_PASS,
//     socket: {
//         host: process.env.REDIS_HOST ,
//         port: process.env.REDIS_PORT
//     }
// });


// async function connectRedis(client) {
//   if (!client.connected) {
//     await client.connect();
//   }

// }

// connectRedis(client);

// client.on('error', function (error) {
//   console.error('Redis error:', error);
// });

// client.on('connect', function() {
//   console.log('Connected to Redis');
// });


const app = express();

connectMongoDB();
connectRedis();

// Initialize database connections 

console.log('initialization')

app.use(cors());
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


const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
// const usersRouter = require('./routes/users');

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

module.exports = app;
