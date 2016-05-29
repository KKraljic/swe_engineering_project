'use strict';

const path = require('path');

const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const api = require('./routes/api');

mongoose.connect('mongodb://localhost:27017');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'PUT, PATCH, DELETE, OPTIONS');
	next();
});

app.options('*', function(req, res) {
	res.sendStatus(200);
});

app.use('/service', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.sendStatus(err.status || 500);
    /*res.render('error', {
      message: err.message,
      error: err
  });*/
  console.error(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.sendStatus(err.status || 500);
  /*res.render('error', {
    message: err.message,
    error: {}
});*/
console.error(err);
});

app.listen(app.get('port'));
module.exports = app;
