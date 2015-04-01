var mongoose = require('mongoose');
var Promise = require('bluebird');


var connectDB = Promise.promisify(mongoose.connect, mongoose);

var findJobs = function (query) {
  return Promise.cast(mongoose.model('Job').find(query).exec());
};

var resetJobs = function () {
  return new Promise(function (resolve, reject) {
    mongoose.connection.collections['jobs'].drop(resolve, reject);
  });
};


var seeds = [
  { title: 'Cook', description: 'You will be making bagels' },
  { title: 'Waiter', description: 'You will be putting food on tables' },
  { title: 'Programmer', description: 'You will be typing, googling and arguing' },
  { title: 'Blacksmith', description: 'You will be making horse shoes and axe heads' }
];

var createJob = Promise.promisify(mongoose.model('Job').create, mongoose.model('Job'));

var seedJobs = function (resolve) {
  return findJobs({}).then(function (collection) {
    if (collection.length === 0) {
      return Promise.map(seeds, function (job) {
        return createJob(job);
      });
    }
  });
};

module.exports = {
  connectDB: connectDB,
  findJobs: findJobs,
  resetJobs: resetJobs,
  seedJobs: seedJobs
};
