var mongoose = require('mongoose');
var Promise = require('bluebird');

exports.findJobs = function (query) {
  return Promise.cast(mongoose.model('Job').find(query).exec());
};

// NOTE root object required as second param when promisifying internal methods
exports.connectDB = Promise.promisify(mongoose.connect, mongoose);
