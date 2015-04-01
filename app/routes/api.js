var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
  res.send('respond with a list of all jobs');
});

module.exports = router;
