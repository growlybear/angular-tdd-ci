var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var jobsData = require('../lib/jobs-data');

// Heartbeat
router.get('/', function (req, res, next) {
  res.sendStatus(200);
});

// Jobs API
router.get('/jobs', function (req, res, next) {
  jobsData.findJobs()
    .then(function (collection) {
      res.json(collection);
    });
});

module.exports = router;
