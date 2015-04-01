var expect = require('expect.js');
var Promise = require('bluebird');

var mongoose = require('mongoose');
var jobModel = require('../app/models/job');

// TODO remove this duplicated code from server.js
var nconf = require('nconf');
nconf.argv().file({
  file: 'config/' + process.env.NODE_ENV + '.json'
});


function resetJobs() {
  return new Promise(function (resolve, reject) {
    mongoose.connection.collections['jobs'].drop(resolve, reject);
  });
}

function findJobs(query) {
  return Promise.cast(mongoose.model('Job').find(query).exec());
}

// NOTE root object required as second param when promisifying internal methods
var connectDB = Promise.promisify(mongoose.connect, mongoose);


describe("GET jobs", function () {

  var jobs;

  before(function (done) {
    connectDB(nconf.get('DB_CONN_STR'))
      .then(resetJobs)
      .then(jobModel.seedJobs)
      .then(findJobs)
      .then(function (collection) {
        jobs = collection
        done();
      });
  });

  it("should be seeded with initial values if empty", function () {
    expect(jobs.length).to.be.above(1);
  });

  it("should have a job with a title", function () {
    expect(jobs[0]).to.exist();
  });
});
