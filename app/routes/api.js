var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

// Heartbeat
router.get('/', function (req, res, next) {
  res.sendStatus(200);
});

// Jobs API
router.get('/jobs', function (req, res, next) {
  mongoose.model('Job')
    .find({})
    .exec(function (err, collection) {
      if (err) return next(err);

      res.json(collection);
    })
});

module.exports = router;
