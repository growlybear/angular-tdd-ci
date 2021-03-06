var expect = require('expect.js');
var Promise = require('bluebird');

var mongoose = require('mongoose');
var jobModel = require('../app/models/job');
var jobsData = require('../app/lib/jobs-data');


describe("GET jobs", function () {

  var jobs;

  before(function (done) {
    jobsData.connectDB('mongodb://localhost/jobfinder-test')
      .then(jobsData.resetJobs)
      .then(jobsData.seedJobs)
      .then(jobsData.findJobs)
      .then(function (collection) {
        jobs = collection
        done();
      });
  });

  it("should be seeded with initial values if empty", function () {
    expect(jobs.length).to.be.above(1);
  });

  it("should have a job with a title", function () {
    expect(jobs[0].title).to.be.ok();
  });

  it("should have a job with a description", function () {
    expect(jobs[0].description).to.be.ok();
  });
});
