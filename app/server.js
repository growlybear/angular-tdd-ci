var path = require('path');

var nconf = require('nconf');
// Load config IN PRIORITY ORDER from env, argv and a config file (if it exists)
// so that heroku will read from env but locally we'll read from file for convenience
nconf.argv().env().file({
  file: 'config/' + process.env.NODE_ENV + '.json'
});

var express = require('express');
var mongoose = require('mongoose');

var jobModel = require('./models/job');
var jobsData = require('./lib/jobs-data');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();

jobsData.connectDB(nconf.get('DB_CONN_STR'))
  .then(function () {
    console.log('  Connected to mongodb');
    jobsData.seedJobs();
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// serve static content from packages installed by bower
app.use(express.static(path.join(__dirname, 'components')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
