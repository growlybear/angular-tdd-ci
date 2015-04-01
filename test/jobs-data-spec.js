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


describe("GET jobs", function () {
  it("should be seeded with initial values if empty", function (done) {
    mongoose.connect(nconf.get('DB_CONN_STR'), function () {
      resetJobs()
        .then(jobModel.seedJobs)
        .then(function () {
          mongoose.model('Job').find({}).exec(function (err, jobsList) {
            expect(jobsList.length).to.be.above(1);
            done();
          });
      });
    });
  });
});
