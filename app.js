var dotenv = require('dotenv').config();
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var helmet = require('helmet');
// var validateUser = require('./controllers/middlewares/validate-user');
var expressJwt = require('express-jwt');
var authenticate = expressJwt({ secret : process.env.JWT_SECRET });
var Promise = require('es6-promise').Promise;

var appRouter = require('./routes')(express);
var noAuth = require('./routes/no-auth')(express);

var app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', noAuth);
// app.use('/', validateUser);
app.use('/', authenticate);
app.use('/', appRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ success: false, msg: err.message });
});

module.exports = app;
