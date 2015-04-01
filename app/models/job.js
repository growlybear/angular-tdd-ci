var mongoose = require('mongoose');
var Promise = require('bluebird');

var jobSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String }
});

var Job = mongoose.model('Job', jobSchema);

var seedJobs = [
  { title: 'Cook', description: 'You will be making bagels' },
  { title: 'Waiter', description: 'You will be putting food on tables' },
  { title: 'Programmer', description: 'You will be typing, googling and arguing' },
  { title: 'Blacksmith', description: 'You will be making horse shoes and axe heads' }
];

function findJobs(query) {
  return Promise.cast(mongoose.model('Job').find(query).exec());
}

var createJob = Promise.promisify(Job.create, Job);

// NOTE export this seed function until we've added POSTing capability to the api
exports.seedJobs = function (resolve) {
  return findJobs({}).then(function (collection) {
    if (collection.length === 0) {
      return Promise.map(seedJobs, function (job) {
        return createJob(job);
      });
    }
  });
};

